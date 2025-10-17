@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Gestión de Medios</h1>
            <a href="{{ route('media.create') }}"
                class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-upload-line mr-1"></i>Subir Archivos
            </a>
        </div>

        <div class="bg-white shadow p-6 mb-0">
            <form action="{{ route('media.index') }}" method="GET" id="filterForm"
                class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                    <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Buscar</label>
                    <input type="text" name="search" id="search" value="{{ request('search') }}"
                        placeholder="Nombre o alt text"
                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                </div>
                <div>
                    <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Tipo</label>
                    <select name="type" id="type"
                        class="custom-select shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                        <option value="">Todos</option>
                        <option value="image" {{ request('type') == 'image' ? 'selected' : '' }}>Imágenes</option>
                        <option value="video" {{ request('type') == 'video' ? 'selected' : '' }}>Videos</option>
                        <option value="audio" {{ request('type') == 'audio' ? 'selected' : '' }}>Audio</option>
                        <option value="document" {{ request('type') == 'document' ? 'selected' : '' }}>Documentos</option>
                        <option value="other" {{ request('type') == 'other' ? 'selected' : '' }}>Otros</option>
                    </select>
                </div>

                @if (auth()->user()->hasAnyPermission(['review_media', 'manage_media']))
                    <div>
                        <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                        <select name="status" id="status"
                            class="custom-select shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="">Todos</option>
                            <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pendientes
                            </option>
                            <option value="approved" {{ request('status') == 'approved' ? 'selected' : '' }}>Aprobados
                            </option>
                            <option value="rejected" {{ request('status') == 'rejected' ? 'selected' : '' }}>Rechazados
                            </option>
                        </select>
                    </div>
                @else
                    <div>
                        <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                        <select name="status" id="status"
                            class="custom-select shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="">Todos mis archivos</option>
                            <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Mis pendientes
                            </option>
                            <option value="approved" {{ request('status') == 'approved' ? 'selected' : '' }}>Aprobados
                            </option>
                            <option value="rejected" {{ request('status') == 'rejected' ? 'selected' : '' }}>Mis rechazados
                            </option>
                        </select>
                        <input type="hidden" name="my_files_only" value="1">
                    </div>
                @endif

                @if (count($uploaders) > 1 &&
                        auth()->user()->hasAnyPermission(['review_media', 'manage_media']))
                    <div>
                        <label for="uploaded_by" class="block text-gray-700 text-sm font-bold mb-2">Subido por</label>
                        <select name="uploaded_by" id="uploaded_by"
                            class="custom-select shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full">
                            <option value="">Todos</option>
                            @foreach ($uploaders as $uploader)
                                <option value="{{ $uploader->id }}"
                                    {{ request('uploaded_by') == $uploader->id ? 'selected' : '' }}>
                                    {{ $uploader->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                @endif

                <div class="flex items-end gap-2">
                    <button type="submit"
                        class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                        <i class="ri-search-line mr-1"></i>Filtrar
                    </button>
                    <a href="{{ route('media.index') }}"
                        class="bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full">
                        <i class="ri-refresh-line mr-1"></i>Limpiar
                    </a>
                </div>
            </form>
        </div>

        <!-- Pagination selector -->
        <div class="bg-white shadow px-6 py-3 mt-0 border-t border-gray-200 flex justify-between items-center">
            <div class="flex items-center gap-2">
                <label for="perPage" class="text-sm text-gray-600">Mostrar:</label>
                <select name="perPage" id="perPage"
                    class="border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:border-primary"
                    onchange="updatePerPage(this.value)">
                    <option value="10" {{ request('perPage', 10) == 10 ? 'selected' : '' }}>10</option>
                    <option value="20" {{ request('perPage') == 20 ? 'selected' : '' }}>20</option>
                    <option value="30" {{ request('perPage') == 30 ? 'selected' : '' }}>30</option>
                </select>
                <span class="text-sm text-gray-600">elementos</span>
            </div>
            <div class="text-sm text-gray-600">
                Total: {{ $mediaFiles->total() }} archivo(s)
            </div>
        </div>

        @if ($mediaFiles->isEmpty())
            <div class="bg-white shadow-md p-6 text-center">
                <i class="ri-folder-2-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">No hay archivos disponibles</h3>
                <p class="text-gray-500 mb-4">Comienza subiendo tu primer archivo.</p>
                <a href="{{ route('media.create') }}"
                    class="bg-primary cursor-pointer hover:bg-primary/90 text-white px-4 py-2 inline-flex items-center rounded-full">
                    <i class="ri-upload-line mr-1"></i> Subir Archivos
                </a>
            </div>
        @else
            <div class="bg-white shadow overflow-hidden">
                <!-- Media Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
                    @foreach ($mediaFiles as $media)
                        <div
                            class="media-item border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 bg-white">
                            <!-- Media Preview -->
                            <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                                @if ($media->isImage())
                                    <img src="{{ $media->url }}" alt="{{ $media->alt_text }}"
                                        class="w-full h-full object-cover">
                                @elseif ($media->isVideo())
                                    <div class="text-center p-2">
                                        <i class="ri-video-line text-4xl text-blue-400 mb-2"></i>
                                        <p class="text-xs text-gray-500 truncate px-2">
                                            {{ Str::limit($media->alt_text, 20) }}</p>
                                    </div>
                                @elseif ($media->file_type === 'audio')
                                    <div class="text-center p-2">
                                        <i class="ri-music-line text-4xl text-purple-400 mb-2"></i>
                                        <p class="text-xs text-gray-500 truncate px-2">
                                            {{ Str::limit($media->alt_text, 20) }}</p>
                                    </div>
                                @elseif ($media->isDocument())
                                    <div class="text-center p-2">
                                        <i class="ri-file-text-line text-4xl text-orange-400 mb-2"></i>
                                        <p class="text-xs text-gray-500 truncate px-2">
                                            {{ Str::limit($media->alt_text, 20) }}</p>
                                    </div>
                                @else
                                    <div class="text-center p-2">
                                        <i class="ri-file-line text-4xl text-gray-400 mb-2"></i>
                                        <p class="text-xs text-gray-500 truncate px-2">
                                            {{ Str::limit($media->alt_text, 20) }}</p>
                                    </div>
                                @endif

                                <!-- Status Badge -->
                                <div class="absolute top-2 right-2">
                                    @if ($media->isPending())
                                        <span
                                            class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold">
                                            Pendiente
                                        </span>
                                    @elseif ($media->isApproved())
                                        <span
                                            class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                                            Aprobado
                                        </span>
                                    @else
                                        <span class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-semibold">
                                            Rechazado
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <!-- Media Info -->
                            <div class="p-3">
                                <h3 class="font-medium text-sm text-gray-900 mb-2 truncate"
                                    title="{{ $media->alt_text }}">
                                    {{ $media->alt_text }}
                                </h3>

                                <div class="space-y-1 mb-3">
                                    <div class="flex items-center justify-between text-xs text-gray-500">
                                        <span>{{ $media->formatted_size }}</span>
                                        @if ($media->metadata && isset($media->metadata['dimensions']))
                                            <span>{{ $media->metadata['dimensions'] }}</span>
                                        @elseif ($media->file_type === 'document' || $media->file_type === 'other')
                                            <span
                                                class="uppercase">{{ pathinfo($media->filename, PATHINFO_EXTENSION) }}</span>
                                        @endif
                                    </div>
                                    <div class="flex items-center justify-between text-xs text-gray-400">
                                        <span class="truncate mr-1">{{ $media->uploader->name }}</span>
                                        <span class="flex-shrink-0">{{ $media->created_at->format('d/m/Y') }}</span>
                                    </div>

                                    @if ($media->isRejected() && !empty($media->rejection_reason))
                                        <div class="mt-2 p-2 bg-red-50 rounded text-xs text-red-600">
                                            <strong>Motivo:</strong>
                                            <span class="block mt-1">{{ Str::limit($media->rejection_reason, 60) }}</span>
                                        </div>
                                    @endif
                                </div>

                                <!-- Actions -->
                                <div class="flex gap-1">
                                    <a href="{{ route('media.show', $media->id) }}"
                                        class="flex-1 flex items-center justify-center px-2 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                        <i class="ri-eye-line mr-1"></i>Ver
                                    </a>

                                    @if (auth()->user()->hasAnyPermission(['edit_all_media', 'manage_media']) || $media->uploaded_by === auth()->id())
                                        <a href="{{ route('media.edit', $media->id) }}"
                                            class="flex-1 flex items-center justify-center px-2 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-full transition-colors">
                                            <i class="ri-edit-line mr-1"></i>Editar
                                        </a>
                                    @endif

                                    @if (auth()->user()->hasAnyPermission(['delete_all_media', 'manage_media']) || $media->uploaded_by === auth()->id())
                                        <form action="{{ route('media.destroy', $media->id) }}" method="POST"
                                            class="flex-1 delete-form" id="delete-form-{{ $media->id }}">
                                            @csrf
                                            @method('DELETE')
                                            <button type="button"
                                                onclick="confirmDelete('{{ $media->alt_text }}', document.getElementById('delete-form-{{ $media->id }}'))"
                                                class="w-full flex items-center justify-center px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer">
                                                <i class="ri-delete-bin-line mr-1"></i>Eliminar
                                            </button>
                                        </form>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

                <!-- Pagination -->
                @if ($mediaFiles->hasPages())
                    <div class="px-6 py-4 border-t border-gray-200 bg-white">
                        <div class="flex items-center justify-center">
                            {{ $mediaFiles->appends(request()->except('page'))->links() }}
                        </div>
                    </div>
                @endif
            </div>
        @endif
    </div>

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Setup loading indicator for filter form
            setupLoadingIndicator('filterForm');

            // Setup loading indicators for all delete forms
            document.querySelectorAll('.delete-form').forEach(form => {
                setupLoadingIndicator(form.id);
            });

            // Function to update per_page parameter and reload
            window.updatePerPage = function(value) {
                const url = new URL(window.location.href);
                url.searchParams.set('perPage', value);
                url.searchParams.set('page', '1'); // Reset to first page
                showLoadingIndicator();
                window.location.href = url.toString();
            };

            // Function to confirm media deletion
            window.confirmDelete = function(filename, formElement) {
                Swal.fire({
                    title: '¿Eliminar archivo?',
                    html: `¿Estás seguro de eliminar <strong>${filename}</strong>? Esta acción no se puede deshacer.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true,
                    focusCancel: true,
                    confirmButtonColor: '#ef4444',
                    cancelButtonColor: '#6b7280',
                }).then((result) => {
                    if (result.isConfirmed) {
                        showLoadingIndicator();
                        formElement.submit();
                    }
                });
            };
        });
    </script>
@endsection
@endsection
