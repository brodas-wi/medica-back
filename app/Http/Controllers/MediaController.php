<?php

namespace App\Http\Controllers;

use App\Models\MediaFile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Initialize controller with authentication middleware
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of media files with filtering options
     */
    public function index(Request $request)
    {
        // Check view permission
        if (
            !auth()->user()->hasPermissionTo('view_media') &&
            !auth()->user()->hasPermissionTo('manage_media')
        ) {
            abort(403, 'No tienes permiso para ver archivos multimedia.');
        }

        $query = MediaFile::with(['uploader', 'reviewer']);

        // Apply permission-based filters
        if (!auth()->user()->hasAnyPermission(['review_media', 'manage_media'])) {
            if ($request->filled('status')) {
                if ($request->status === 'approved') {
                    $query->where('status', 'approved');
                } else {
                    $query->where('status', $request->status)
                        ->where('uploaded_by', auth()->id());
                }
            } else {
                $query->where(function ($q) {
                    $q->where('status', 'approved')
                        ->orWhere('uploaded_by', auth()->id());
                });
            }
        } else {
            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }
        }

        // Apply search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('filename', 'LIKE', "%{$search}%")
                    ->orWhere('alt_text', 'LIKE', "%{$search}%");
            });
        }

        // Filter by file type
        if ($request->filled('type')) {
            $query->where('file_type', $request->type);
        }

        // Filter by uploader
        if ($request->filled('uploaded_by')) {
            $query->where('uploaded_by', $request->uploaded_by);
        }

        // Get pagination value from request, default to 10
        $perPage = $request->input('perPage', 10);

        // Validate per_page is one of allowed values
        if (!in_array($perPage, [10, 20, 30])) {
            $perPage = 10;
        }

        // Use dynamic pagination
        $mediaFiles = $query->orderBy('created_at', 'desc')->paginate($perPage);

        // Get uploaders list for filter dropdown
        $uploaders = User::whereIn(
            'id',
            MediaFile::select('uploaded_by')->distinct()->pluck('uploaded_by')
        )->get();

        return view('media.index', compact('mediaFiles', 'uploaders'));
    }

    /**
     * Show the form for creating/uploading new media files
     */
    public function create()
    {
        // Check upload permission
        if (
            !auth()->user()->hasPermissionTo('upload_media') &&
            !auth()->user()->hasPermissionTo('manage_media')
        ) {
            abort(403, 'No tienes permiso para subir archivos multimedia.');
        }

        return view('media.create');
    }

    /**
     * Store newly uploaded media files in storage
     */
    public function store(Request $request)
    {
        // Check upload permission
        if (
            !auth()->user()->hasPermissionTo('upload_media') &&
            !auth()->user()->hasPermissionTo('manage_media')
        ) {
            abort(403, 'No tienes permiso para subir archivos multimedia.');
        }

        $request->validate([
            'files' => 'required|array|max:10',
            'files.*' => 'required|file|max:20480',
            'alt_texts' => 'required|array',
            'alt_texts.*' => 'required|string|max:255',
        ]);

        $files = $request->file('files');
        $altTexts = $request->input('alt_texts');
        $uploadedFiles = [];
        $errors = [];

        foreach ($files as $index => $file) {
            try {
                $originalName = $file->getClientOriginalName();
                $filename = MediaFile::generateFilename($originalName);
                $relativePath = 'media/' . date('Y/m');
                $mimeType = $file->getMimeType();
                $fileType = MediaFile::determineFileType($mimeType);
                $altText = $altTexts[$index] ?? pathinfo($originalName, PATHINFO_FILENAME);

                $storedPath = $file->storeAs($relativePath, $filename, 'public');
                $path = $storedPath;

                $metadata = MediaFile::extractMetadata($file->getRealPath(), $mimeType);

                // Check for auto-approve permission
                $status = auth()->user()->hasAnyPermission(['auto_approve_media', 'manage_media'])
                    ? 'approved'
                    : 'pending';

                $mediaFile = MediaFile::create([
                    'filename' => $filename,
                    'alt_text' => $altText,
                    'path' => $path,
                    'disk' => 'public',
                    'mime_type' => $mimeType,
                    'file_type' => $fileType,
                    'size' => $file->getSize(),
                    'metadata' => $metadata,
                    'status' => $status,
                    'uploaded_by' => Auth::id(),
                ]);

                $uploadedFiles[] = $mediaFile;
            } catch (\Exception $e) {
                $errors[] = 'Error uploading file: ' . $e->getMessage();
            }
        }

        if (!empty($uploadedFiles)) {
            $message = count($uploadedFiles) . ' archivo(s) subido(s) correctamente.';
            if (auth()->user()->hasAnyPermission(['auto_approve_media', 'manage_media'])) {
                $message .= ' Los archivos están disponibles para su uso.';
            } else {
                $message .= ' Los archivos están pendientes de revisión.';
            }
            $type = 'success';
        } else {
            $message = 'No se pudo subir ningún archivo.';
            $type = 'error';
        }

        if (!empty($errors)) {
            $message .= ' Errores: ' . implode(', ', $errors);
        }

        return redirect()->route('media.index')->with($type, $message);
    }

    /**
     * Display detailed information for a specific media file
     */
    public function show(MediaFile $media)
    {
        // Check view permission
        if (
            !auth()->user()->hasPermissionTo('view_media') &&
            !auth()->user()->hasPermissionTo('manage_media')
        ) {
            abort(403, 'No tienes permiso para ver archivos multimedia.');
        }

        // Additional check for non-approved files
        if (
            !$media->isApproved() &&
            !auth()->user()->hasAnyPermission(['review_media', 'manage_media']) &&
            $media->uploaded_by !== auth()->id()
        ) {
            abort(403, 'No tienes permisos para ver este archivo.');
        }

        return view('media.show', compact('media'));
    }

    /**
     * Show the form for editing a media file's metadata
     */
    public function edit(MediaFile $media)
    {
        // Check edit permission
        if (
            !auth()->user()->hasAnyPermission(['edit_all_media', 'manage_media']) &&
            $media->uploaded_by !== auth()->id()
        ) {
            abort(403, 'No tienes permisos para editar este archivo.');
        }

        return view('media.edit', compact('media'));
    }

    /**
     * Update metadata for the specified media file
     */
    public function update(Request $request, MediaFile $media)
    {
        // Check edit permission
        if (
            !auth()->user()->hasAnyPermission(['edit_all_media', 'manage_media']) &&
            $media->uploaded_by !== auth()->id()
        ) {
            abort(403, 'No tienes permisos para editar este archivo.');
        }

        $request->validate([
            'alt_text' => 'required|string|max:255',
        ]);

        $media->update([
            'alt_text' => $request->alt_text,
        ]);

        return redirect()->route('media.index')->with('success', 'Archivo actualizado correctamente.');
    }

    /**
     * Remove a media file from storage and database
     */
    public function destroy(MediaFile $media)
    {
        // Check delete permission
        if (
            !auth()->user()->hasAnyPermission(['delete_all_media', 'manage_media']) &&
            $media->uploaded_by !== auth()->id()
        ) {
            abort(403, 'No tienes permisos para eliminar este archivo.');
        }

        Storage::disk($media->disk)->delete($media->path);
        $media->delete();

        return redirect()->route('media.index')->with('success', 'Archivo eliminado correctamente.');
    }

    /**
     * Approve a pending media file for use in the system
     */
    public function approve(MediaFile $media)
    {
        // Check review permission
        if (!auth()->user()->hasAnyPermission(['review_media', 'manage_media'])) {
            abort(403, 'No tienes permisos para revisar archivos.');
        }

        $media->update([
            'status' => 'approved',
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
            'rejection_reason' => null,
        ]);

        return back()->with('success', 'Archivo aprobado correctamente.');
    }

    /**
     * Reject a pending media file with a reason
     */
    public function reject(Request $request, MediaFile $media)
    {
        // Check review permission
        if (!auth()->user()->hasAnyPermission(['review_media', 'manage_media'])) {
            abort(403, 'No tienes permisos para revisar archivos.');
        }

        $request->validate([
            'rejection_reason' => 'required|string|max:500',
        ]);

        $media->update([
            'status' => 'rejected',
            'reviewed_by' => Auth::id(),
            'reviewed_at' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return back()->with('success', 'Archivo rechazado correctamente.');
    }

    /**
     * API endpoint to retrieve approved media files for editors
     */
    public function apiIndex(Request $request)
    {
        // Check view permission
        // if (
        //     !auth()->user()->hasPermissionTo('view_media') &&
        //     !auth()->user()->hasPermissionTo('manage_media')
        // ) {
        //     abort(403, 'No tienes permiso para ver archivos multimedia.');
        // }

        $query = MediaFile::approved();

        // Apply type filter
        if ($request->filled('type')) {
            if ($request->type === 'pdf') {
                $query->where(function ($q) {
                    $q->where('file_type', 'document')
                        ->orWhere('mime_type', 'application/pdf');
                });
            } else if ($request->type === 'image') {
                $query->where('file_type', 'image');
            } else {
                $query->where('file_type', $request->type);
            }
        }

        // Apply search filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('filename', 'LIKE', "%{$search}%")
                    ->orWhere('alt_text', 'LIKE', "%{$search}%");
            });
        }

        // Get the results
        $mediaFiles = $query
            ->orderBy('created_at', 'desc')
            ->limit($request->get('limit', 50))
            ->get();

        return response()->json([
            'data' => $mediaFiles->map(function ($media) {
                return [
                    'id' => $media->id,
                    'src' => $media->url,
                    'name' => $media->alt_text,
                    'alt' => $media->alt_text,
                    'type' => $media->file_type,
                    'size' => $media->formatted_size,
                    'metadata' => $media->metadata,
                ];
            })
        ]);
    }

    /**
     * API endpoint for uploading files from the editor interface
     */
    public function apiUpload(Request $request)
    {
        // Check upload permission
        if (
            !auth()->user()->hasPermissionTo('upload_media') &&
            !auth()->user()->hasPermissionTo('manage_media')
        ) {
            abort(403, 'No tienes permiso para subir archivos multimedia.');
        }

        $request->validate([
            'files' => 'required|array',
            'files.*' => 'required|file|max:20480',
        ]);

        $uploadedFiles = [];

        foreach ($request->file('files') as $file) {
            $originalName = $file->getClientOriginalName();
            $filename = MediaFile::generateFilename($originalName);
            $relativePath = 'media/' . date('Y/m');
            $mimeType = $file->getMimeType();
            $fileType = MediaFile::determineFileType($mimeType);

            $storedPath = $file->storeAs($relativePath, $filename, 'public');
            $path = $storedPath;

            $metadata = MediaFile::extractMetadata($file->getRealPath(), $mimeType);

            // Check for auto-approve permission
            $status = auth()->user()->hasAnyPermission(['auto_approve_media', 'manage_media'])
                ? 'approved'
                : 'pending';

            $mediaFile = MediaFile::create([
                'filename' => $filename,
                'alt_text' => pathinfo($originalName, PATHINFO_FILENAME),
                'path' => $path,
                'disk' => 'public',
                'mime_type' => $mimeType,
                'file_type' => $fileType,
                'size' => $file->getSize(),
                'metadata' => $metadata,
                'status' => $status,
                'uploaded_by' => Auth::id(),
            ]);

            if ($mediaFile->isApproved()) {
                $uploadedFiles[] = [
                    'id' => $mediaFile->id,
                    'src' => $mediaFile->url,
                    'name' => $mediaFile->alt_text,
                    'alt' => $mediaFile->alt_text,
                ];
            }
        }

        return response()->json(['data' => $uploadedFiles]);
    }
}
