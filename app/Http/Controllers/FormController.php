<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class FormController extends Controller
{
    /**
     * Create a new controller instance
     */
    public function __construct()
    {
        $this->middleware('auth')->except(['submitForm', 'createPrecalificador']);
    }

    /**
     * Display a listing of forms
     */
    public function index(Request $request)
    {
        // Check permission
        if (!Auth::user()->hasPermissionTo('manage_forms') && !Auth::user()->hasPermissionTo('view_forms')) {
            abort(403, 'No tienes permiso para ver los formularios');
        }

        // Get pagination value from request, default to 10
        $perPage = $request->input('per_page', 10);

        // Validate per_page is one of allowed values
        if (!in_array($perPage, [10, 20, 30])) {
            $perPage = 10;
        }

        $query = Form::with(['creator', 'updater'])->latest();

        // Apply search filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by creator
        if ($request->filled('created_by')) {
            $query->where('created_by', $request->created_by);
        }

        // Use dynamic pagination
        $forms = $query->paginate($perPage);

        // Get creators list for filter dropdown
        $creators = \App\Models\User::select('users.id', 'users.name')
            ->join('forms', 'users.id', '=', 'forms.created_by')
            ->distinct()
            ->get();

        return view('forms.index', compact('forms', 'creators'));
    }

    /**
     * Show the form for creating a new form
     */
    public function create()
    {
        // Check permission
        if (!Auth::user()->hasPermissionTo('manage_forms') && !Auth::user()->hasPermissionTo('create_forms')) {
            abort(403, 'No tienes permiso para crear formularios');
        }

        return view('forms.create');
    }

    /**
     * Store a newly created form in storage
     */
    public function store(Request $request)
    {
        if (!Auth::user()->hasPermissionTo('manage_forms') && !Auth::user()->hasPermissionTo('create_forms')) {
            abort(403, 'No tienes permiso para crear formularios');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fields' => 'required|array',
            'fields.*.type' => 'required|string|in:text,email,tel,number,textarea,select,radio,checkbox',
            'fields.*.label' => 'required|string|max:255',
            'fields.*.name' => 'required|string|max:100',
            'fields.*.required' => 'boolean',
            'fields.*.options' => 'nullable|array',
            'submit_button_text' => 'required|string|max:50',
            'success_message' => 'required|string|max:255',
            'redirect_url' => 'nullable|url',
            'status' => 'required|in:active,inactive'
        ]);

        $fields = [];
        foreach ($request->fields as $field) {
            if (isset($field['type']) && isset($field['label']) && isset($field['name'])) {
                if (isset($field['required'])) {
                    $field['required'] = (bool)$field['required'];
                } else {
                    $field['required'] = false;
                }

                $fields[] = $field;
            }
        }

        $validated['fields'] = $fields;
        $validated['slug'] = Str::slug($validated['title']);
        $validated['created_by'] = Auth::id();
        $validated['order'] = Form::max('order') + 1;

        Form::create($validated);

        return redirect()->route('forms.index')->with('success', 'Formulario creado correctamente.');
    }

    /**
     * Show the form for editing the specified form
     */
    public function edit(Form $form)
    {
        // Check permission
        if (!Auth::user()->hasPermissionTo('manage_forms') && !Auth::user()->hasPermissionTo('edit_forms')) {
            abort(403, 'No tienes permiso para editar formularios');
        }

        return view('forms.edit', compact('form'));
    }

    /**
     * Update the specified form in storage
     */
    public function update(Request $request, Form $form)
    {
        if (!Auth::user()->hasPermissionTo('manage_forms') && !Auth::user()->hasPermissionTo('edit_forms')) {
            abort(403, 'No tienes permiso para editar formularios');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fields' => 'required|array',
            'fields.*.type' => 'required|string|in:text,email,tel,number,textarea,select,radio,checkbox',
            'fields.*.label' => 'required|string|max:255',
            'fields.*.name' => 'required|string|max:100',
            'fields.*.required' => 'boolean',
            'fields.*.options' => 'nullable|array',
            'submit_button_text' => 'required|string|max:50',
            'success_message' => 'required|string|max:255',
            'redirect_url' => 'nullable|url',
            'status' => 'required|in:active,inactive'
        ]);

        $fields = [];
        foreach ($request->fields as $field) {
            if (isset($field['type']) && isset($field['label']) && isset($field['name'])) {
                if (isset($field['required'])) {
                    $field['required'] = (bool)$field['required'];
                } else {
                    $field['required'] = false;
                }

                $fields[] = $field;
            }
        }

        $validated['fields'] = $fields;

        if ($form->title != $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $validated['updated_by'] = Auth::id();

        $form->update($validated);

        return redirect()->route('forms.index')->with('success', 'Formulario actualizado correctamente.');
    }

    /**
     * Remove the specified form from storage
     */
    public function destroy(Form $form)
    {
        // Check permission
        if (!Auth::user()->hasPermissionTo('manage_forms') && !Auth::user()->hasPermissionTo('delete_forms')) {
            abort(403, 'No tienes permiso para eliminar formularios');
        }

        $form->delete();

        return redirect()->route('forms.index')->with('success', 'Formulario eliminado correctamente.');
    }

    /**
     * Create a precalificador form specifically for the form block
     */
    public function createPrecalificador(Request $request)
    {
        try {
            // Set default user ID if authenticated
            $userId = Auth::id() ?: 1; // Default to admin user if not authenticated

            // Add created_by and slug to the form data
            $formData = $request->all();
            $formData['created_by'] = $userId;
            $formData['slug'] = Str::slug($formData['title']);
            $formData['order'] = Form::max('order') + 1;

            // Create the form
            $form = Form::create($formData);

            return response()->json([
                'success' => true,
                'message' => 'Formulario creado correctamente',
                'formId' => $form->id
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear formulario: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * View form submissions
     */
    public function submissions(Form $form)
    {
        // Check permission
        if (!Auth::user()->hasPermissionTo('manage_forms') && !Auth::user()->hasPermissionTo('view_forms')) {
            abort(403, 'No tienes permiso para ver las respuestas de formularios');
        }

        $submissions = $form->submissions()->latest()->paginate(20);

        return view('forms.submissions', compact('form', 'submissions'));
    }

    /**
     * Handle form submission from public site
     */
    public function submitForm(Request $request, $formId)
    {
        $form = Form::where(function ($query) use ($formId) {
            $query->where('id', $formId)
                ->orWhere('slug', $formId);
        })->where('status', 'active')->firstOrFail();

        $rules = [];
        $messages = [];

        foreach ($form->fields as $field) {
            if (!empty($field['name'])) {
                $rule = 'string';

                switch ($field['type']) {
                    case 'email':
                        $rule = 'email';
                        break;
                    case 'tel':
                        $rule = 'regex:/^[0-9]{4}-?[0-9]{4}$/';
                        break;
                    case 'number':
                        $rule = 'numeric';
                        break;
                }

                if (!empty($field['required']) && $field['required']) {
                    $rule = 'required|' . $rule;
                    $messages[$field['name'] . '.required'] = 'El campo ' . $field['label'] . ' es obligatorio.';
                } else {
                    $rule = 'nullable|' . $rule;
                }

                $rules[$field['name']] = $rule;
            }
        }

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        FormSubmission::create([
            'form_id' => $form->id,
            'data' => $validatedData
        ]);

        return response()->json([
            'success' => true,
            'message' => $form->success_message,
            'redirect_url' => $form->redirect_url
        ]);
    }

    /**
     * Get active forms for API
     */
    public function getActive()
    {
        $forms = Form::where('status', 'active')
            ->orderBy('order')
            ->get();

        return response()->json($forms);
    }
}
