@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="max-w-4xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-secondary">Editar Archivo</h1>
                <a href="{{ route('media.index') }}"
                    class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-arrow-left-line mr-1"></i>Volver
                </a>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Preview -->
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
                                <audio controls class="w-full">
                                    <source src="{{ $media->url }}" type="{{ $media->mime_type }}">
                                    Tu navegador no soporta el elemento audio.
                                </audio>
                            </div>
                        @elseif ($media->isDocument())
                            <div class="p-8 text-center">
                                <i class="ri-file-text-line text-5xl text-gray-400 mb-4"></i>
                                <p class="text-gray-600 mb-4">{{ $media->original_filename }}</p>
                                <a href="{{ $media->url }}" target="_blank"
                                    class="bg-primary hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                                    <i class="ri-download-line mr-1"></i>Descargar
                                </a>
                            </div>
                        @else
                            <div class="p-8 text-center">
                                <i class="ri-file-line text-5xl text-gray-400 mb-4"></i>
                                <p class="text-gray-600 mb-4">{{ $media->original_filename }}</p>
                                <a href="{{ $media->url }}" target="_blank"
                                    class="bg-primary hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                                    <i class="ri-download-line mr-1"></i>Descargar
                                </a>
                            </div>
                        @endif
                    </div>

                    <!-- Información del archivo -->
                    <div class="mt-4 space-y-2 text-sm text-gray-600">
                        <div class="flex justify-between">
                            <span>Nombre:</span>
                            <span class="font-medium">{{ $media->original_filename }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Tamaño:</span>
                            <span>{{ $media->formatted_size }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Tipo:</span>
                            <span class="capitalize">{{ $media->file_type }}</span>
                        </div>
                        @if ($media->metadata && isset($media->metadata['dimensions']))
                            <div class="flex justify-between">
                                <span>Dimensiones:</span>
                                <span>{{ $media->metadata['dimensions'] }}</span>
                            </div>
                        @endif
                        <div class="flex justify-between">
                            <span>Subido por:</span>
                            <span>{{ $media->uploader->name }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Fecha:</span>
                            <span>{{ $media->created_at->format('d/m/Y H:i') }}</span>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <div class="bg-white shadow p-6">
                    <h2 class="text-lg font-semibold mb-4">Información del archivo</h2>

                    <form action="{{ route('media.update', $media->id) }}" method="POST" id="mediaForm">
                        @csrf
                        @method('PUT')

                        <!-- Alt Text (solo para imágenes) -->
                        @if ($media->isImage())
                            <div class="mb-6">
                                <label for="alt_text" class="block text-gray-700 text-sm font-bold mb-2">
                                    Texto alternativo (Alt Text)
                                </label>
                                <input type="text" name="alt_text" id="alt_text"
                                    class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('alt_text') border-red-500 @enderror"
                                    value="{{ old('alt_text', $media->alt_text) }}"
                                    placeholder="Describe brevemente la imagen">
                                @error('alt_text')
                                    <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                                @enderror
                                <p class="text-gray-500 text-xs mt-1">
                                    El texto alternativo mejora la accesibilidad y el SEO de tu sitio web.
                                </p>
                            </div>
                        @endif

                        <!-- Estado del archivo -->
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Estado actual</label>
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
                                        Por {{ $media->reviewer->name ?? 'Sistema' }} el
                                        {{ $media->reviewed_at ? $media->reviewed_at->format('d/m/Y H:i') : 'N/A' }}
                                    </p>
                                    @if ($media->rejection_reason)
                                        <p class="text-sm text-red-600 mt-2 font-medium">Motivo:</p>
                                        <p class="text-sm text-red-600">{{ $media->rejection_reason }}</p>
                                    @endif
                                @endif
                            </div>
                        </div>

                        <div class="flex items-center justify-between">
                            <button type="submit"
                                class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                                <i class="ri-save-line mr-1"></i>Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            setupLoadingIndicator('mediaForm');
        });
    </script>
@endsection
@endsection
