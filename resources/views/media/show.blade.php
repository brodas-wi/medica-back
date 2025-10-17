@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="max-w-4xl mx-auto">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h1 class="text-2xl font-bold text-secondary">Detalles del Archivo</h1>
                <div class="flex flex-wrap gap-2">
                    @if (auth()->user()->hasPermissionTo('edit_all_media') || $media->uploaded_by === auth()->id())
                        <a href="{{ route('media.edit', $media->id) }}"
                            class="bg-primary hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full">
                            <i class="ri-edit-line mr-1"></i>Editar
                        </a>
                    @endif
                    <a href="{{ route('media.index') }}"
                        class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                        <i class="ri-arrow-left-line mr-1"></i>Volver
                    </a>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- File preview -->
                <div class="bg-white shadow p-6">
                    <h2 class="text-lg font-semibold mb-4">Vista previa</h2>

                    <div class="border border-gray-200 rounded-lg overflow-hidden">
                        @if ($media->isImage())
                            <img src="{{ $media->url }}" alt="{{ $media->alt_text }}" class="w-full h-auto">
                        @elseif ($media->isVideo())
                            <video controls class="w-full h-auto">
                                <source src="{{ $media->url }}" type="{{ $media->mime_type }}">
                                Tu navegador no soporta el elemento video.
                            </video>
                        @elseif ($media->file_type === 'audio')
                            <div class="p-8 text-center">
                                <i class="ri-music-line text-5xl text-gray-400 mb-4"></i>
                                <h3 class="text-lg font-medium text-gray-700 mb-4">{{ $media->original_filename }}</h3>
                                <audio controls class="w-full">
                                    <source src="{{ $media->url }}" type="{{ $media->mime_type }}">
                                    Tu navegador no soporta el elemento audio.
                                </audio>
                            </div>
                        @elseif ($media->isDocument())
                            <div class="p-8 text-center">
                                <i class="ri-file-text-line text-5xl text-gray-400 mb-4"></i>
                                <h3 class="text-lg font-medium text-gray-700 mb-4">{{ $media->original_filename }}</h3>
                                <a href="{{ $media->url }}" target="_blank"
                                    class="bg-primary hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                                    <i class="ri-download-line mr-1"></i>Descargar archivo
                                </a>
                            </div>
                        @else
                            <div class="p-8 text-center">
                                <i class="ri-file-line text-5xl text-gray-400 mb-4"></i>
                                <h3 class="text-lg font-medium text-gray-700 mb-4">{{ $media->original_filename }}</h3>
                                <a href="{{ $media->url }}" target="_blank"
                                    class="bg-primary hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                                    <i class="ri-download-line mr-1"></i>Descargar archivo
                                </a>
                            </div>
                        @endif
                    </div>

                    <!-- File URL (hidden to copy) -->
                    <input type="text" id="file-url" value="{{ $media->url }}" class="opacity-0 h-0 w-0 absolute">

                    <!-- Quick actions -->
                    <div class="mt-4 flex flex-wrap gap-2">
                        <button type="button" onclick="copyToClipboard('{{ $media->url }}')"
                            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-sm flex items-center">
                            <i class="ri-link mr-1"></i>Copiar URL
                        </button>
                        <a href="{{ $media->url }}" download="{{ $media->original_filename }}"
                            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-sm flex items-center">
                            <i class="ri-download-line mr-1"></i>Descargar
                        </a>
                    </div>
                </div>

                <!-- File info -->
                <div class="bg-white shadow p-6">
                    <h2 class="text-lg font-semibold mb-4">Información del archivo</h2>

                    <!-- Status -->
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                        <div
                            class="p-3 {{ $media->isApproved() ? 'bg-green-50 border border-green-200' : ($media->isPending() ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200') }}">
                            <div class="flex items-center">
                                @if ($media->isApproved())
                                    <i class="ri-checkbox-circle-line text-green-600 mr-1"></i>
                                    <span class="text-green-700 font-medium">Aprobado</span>
                                @elseif ($media->isPending())
                                    <i class="ri-time-line text-yellow-600 mr-1"></i>
                                    <span class="text-yellow-700 font-medium">Pendiente de revisión</span>
                                @else
                                    <i class="ri-close-circle-line text-red-600 mr-1"></i>
                                    <span class="text-red-700 font-medium">Rechazado</span>
                                @endif
                            </div>

                            @if ($media->isApproved() && $media->reviewer)
                                <p class="text-sm text-green-600 mt-1">
                                    Por {{ $media->reviewer->name }} el
                                    {{ $media->reviewed_at->format('d/m/Y H:i') }}
                                </p>
                            @elseif ($media->isRejected())
                                <p class="text-sm text-red-600 mt-1">
                                    Por {{ $media->reviewer->name ?? 'Sistema' }}
                                    @if ($media->reviewed_at)
                                        el {{ $media->reviewed_at->format('d/m/Y H:i') }}
                                    @endif
                                </p>
                                @if ($media->rejection_reason)
                                    <div class="mt-2 p-2 bg-red-100 rounded">
                                        <p class="text-sm text-red-700 font-medium">Motivo del rechazo:</p>
                                        <p class="text-sm text-red-600">{{ $media->rejection_reason }}</p>
                                    </div>
                                @endif
                            @endif
                        </div>
                    </div>

                    <!-- Details -->
                    <div class="space-y-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1">Nombre original</label>
                            <p class="text-gray-900">{{ $media->original_filename }}</p>
                        </div>

                        @if ($media->alt_text)
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-1">Texto alternativo</label>
                                <p class="text-gray-900">{{ $media->alt_text }}</p>
                            </div>
                        @endif

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-1">Tipo</label>
                                <p class="text-gray-900 capitalize">{{ $media->file_type }}</p>
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-1">Tamaño</label>
                                <p class="text-gray-900">{{ $media->formatted_size }}</p>
                            </div>
                        </div>

                        @if ($media->metadata && isset($media->metadata['dimensions']))
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-1">Dimensiones</label>
                                <p class="text-gray-900">{{ $media->metadata['dimensions'] }} píxeles</p>
                            </div>
                        @endif

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1">MIME Type</label>
                            <p class="text-gray-900 font-mono text-sm">{{ $media->mime_type }}</p>
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1">Subido por</label>
                            <p class="text-gray-900">{{ $media->uploader->name }}</p>
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-1">Fecha de subida</label>
                            <p class="text-gray-900">{{ $media->created_at->format('d/m/Y H:i') }}</p>
                        </div>
                    </div>

                    <!-- Review actions (just for reviewers) -->
                    @if ($media->isPending() && auth()->user()->hasPermissionTo('review_media'))
                        <div class="mt-6 pt-6 border-t border-gray-200">
                            <h3 class="text-md font-semibold mb-4">Acciones de revisión</h3>
                            <div class="flex gap-2">
                                <form action="{{ route('media.approve', $media->id) }}" method="POST" class="inline">
                                    @csrf
                                    <button type="submit"
                                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 flex items-center rounded-full">
                                        <i class="ri-check-line mr-1"></i>Aprobar
                                    </button>
                                </form>
                                <button onclick="rejectMedia()"
                                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 flex items-center rounded-full">
                                    <i class="ri-close-line mr-1"></i>Rechazar
                                </button>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <!-- Hidden form for rejection -->
    <form id="reject-form" action="{{ route('media.reject', $media->id) }}" method="POST" style="display: none;">
        @csrf
        <input type="hidden" name="rejection_reason" id="rejection-reason">
    </form>

@section('scripts')
    <script>
        function copyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;

            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';

            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            window.showAlert('URL copiada al portapapeles', 'success');
        }

        function rejectMedia() {
            Swal.fire({
                title: '¿Rechazar archivo?',
                html: 'Especifica el motivo por el cual rechazas este archivo:',
                input: 'textarea',
                inputPlaceholder: 'Motivo del rechazo...',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Debes especificar un motivo para el rechazo';
                    }
                },
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, rechazar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#6b7280'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('rejection-reason').value = result.value;
                    document.getElementById('reject-form').submit();
                }
            });
        }
    </script>
@endsection
@endsection
