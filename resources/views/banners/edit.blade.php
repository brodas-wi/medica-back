@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Editar Banner: {{ $banner->title }}</h1>
            <div class="flex flex-wrap gap-2 w-full md:w-auto">
                <a href="{{ route('banners.index') }}"
                    class="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 flex items-center rounded-full transition justify-center md:justify-start">
                    <i class="ri-arrow-left-line mr-1"></i>Volver al Listado
                </a>
            </div>
        </div>

        <div class="bg-white shadow-md p-6">
            <form action="{{ route('banners.update', $banner->id) }}" method="POST" enctype="multipart/form-data"
                id="bannerEditForm">
                @csrf
                @method('PUT')

                <!-- Basic Information Section -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-information-line mr-2"></i>Información Básica
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Title field -->
                        <div class="md:col-span-2">
                            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
                                Título <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="title" id="title" value="{{ old('title', $banner->title) }}"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('title') border-red-500 @enderror"
                                required>
                            @error('title')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Category field -->
                        <div>
                            <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
                            <input type="text" name="category" id="category"
                                value="{{ old('category', $banner->category) }}"
                                placeholder="Ej: Promoción, Noticia, Evento"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('category') border-red-500 @enderror">
                            @error('category')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Order field -->
                        <div>
                            <label for="order" class="block text-gray-700 text-sm font-bold mb-2">
                                Orden de visualización
                            </label>
                            <input type="number" name="order" id="order" value="{{ old('order', $banner->order) }}"
                                min="0"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('order') border-red-500 @enderror">
                            <p class="text-xs text-gray-600 mt-1">Menor número = mayor prioridad</p>
                            @error('order')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Description field -->
                        <div class="md:col-span-2">
                            <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                            <textarea name="description" id="description" rows="4"
                                placeholder="Descripción del banner que se mostrará al usuario"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-2xl @error('description') border-red-500 @enderror">{{ old('description', $banner->description) }}</textarea>
                            @error('description')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>

                <!-- Image Section -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-image-line mr-2"></i>Imagen del Banner
                    </h3>

                    <div class="mb-6">
                        <label for="image_url" class="block text-gray-700 text-sm font-bold mb-2">Imagen</label>
                        <input type="hidden" name="image_url" id="image_url_path"
                            value="{{ old('image_url', $banner->image_url) }}">

                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <button type="button" onclick="openMediaGallery()"
                                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition flex items-center">
                                <i class="ri-image-add-line mr-1"></i> Cambiar imagen
                            </button>
                            <span class="text-sm text-gray-500">Formatos recomendados: JPG, PNG, GIF, SVG. Tamaño óptimo:
                                1200 x 400 px</span>
                        </div>

                        <div id="image_preview_container" class="{{ $banner->image_url ? '' : 'hidden' }} mt-4">
                            <div class="relative inline-block">
                                <img id="image_preview" src="{{ $banner->image_url }}" alt="Vista previa"
                                    class="max-h-48 rounded-2xl border border-gray-300 shadow-sm">
                                <button type="button" onclick="removeSelectedImage()"
                                    class="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition">
                                    <i class="ri-close-line text-lg"></i>
                                </button>
                            </div>
                        </div>

                        @error('image_url')
                            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- Buttons Section -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-mouse-line mr-2"></i>Botones de Acción
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Primary Button -->
                        <div class="border border-gray-200 p-4 rounded">
                            <h4 class="font-medium text-gray-700 mb-3">Botón Principal</h4>
                            <div class="space-y-4">
                                <div>
                                    <label for="primary_button_text" class="block text-gray-700 text-sm font-bold mb-2">
                                        Texto del Botón
                                    </label>
                                    <input type="text" name="primary_button_text" id="primary_button_text"
                                        value="{{ old('primary_button_text', $banner->primary_button_text) }}"
                                        maxlength="50" placeholder="Ej: Ver más, Comprar ahora"
                                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('primary_button_text') border-red-500 @enderror">
                                    @error('primary_button_text')
                                        <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                                    @enderror
                                </div>
                                <div>
                                    <label for="primary_button_url" class="block text-gray-700 text-sm font-bold mb-2">
                                        URL del Botón
                                    </label>
                                    <input type="text" name="primary_button_url" id="primary_button_url"
                                        value="{{ old('primary_button_url', $banner->primary_button_url) }}"
                                        placeholder="https://ejemplo.com o /ruta-interna"
                                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('primary_button_url') border-red-500 @enderror">
                                    @error('primary_button_url')
                                        <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <!-- Secondary Button -->
                        <div class="border border-gray-200 p-4 rounded">
                            <h4 class="font-medium text-gray-700 mb-3">Botón Secundario</h4>
                            <div class="space-y-4">
                                <div>
                                    <label for="secondary_button_text" class="block text-gray-700 text-sm font-bold mb-2">
                                        Texto del Botón
                                    </label>
                                    <input type="text" name="secondary_button_text" id="secondary_button_text"
                                        value="{{ old('secondary_button_text', $banner->secondary_button_text) }}"
                                        maxlength="50" placeholder="Ej: Más información, Contactar"
                                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('secondary_button_text') border-red-500 @enderror">
                                    @error('secondary_button_text')
                                        <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                                    @enderror
                                </div>
                                <div>
                                    <label for="secondary_button_url" class="block text-gray-700 text-sm font-bold mb-2">
                                        URL del Botón
                                    </label>
                                    <input type="text" name="secondary_button_url" id="secondary_button_url"
                                        value="{{ old('secondary_button_url', $banner->secondary_button_url) }}"
                                        placeholder="https://ejemplo.com o /ruta-interna"
                                        class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('secondary_button_url') border-red-500 @enderror">
                                    @error('secondary_button_url')
                                        <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Visibility Options -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-eye-line mr-2"></i>Opciones de Visualización
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <!-- Show category toggle -->
                            <div class="flex items-center">
                                <input type="checkbox" name="show_category" id="show_category" value="1"
                                    {{ old('show_category', $banner->show_category) ? 'checked' : '' }}
                                    class="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                                <label for="show_category" class="ml-2 text-sm text-gray-700">
                                    Mostrar categoría en el banner
                                </label>
                            </div>

                            <!-- Show description toggle -->
                            <div class="flex items-center">
                                <input type="checkbox" name="show_description" id="show_description" value="1"
                                    {{ old('show_description', $banner->show_description) ? 'checked' : '' }}
                                    class="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                                <label for="show_description" class="ml-2 text-sm text-gray-700">
                                    Mostrar descripción en el banner
                                </label>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <!-- Show primary button toggle -->
                            <div class="flex items-center">
                                <input type="checkbox" name="show_primary_button" id="show_primary_button"
                                    value="1"
                                    {{ old('show_primary_button', $banner->show_primary_button) ? 'checked' : '' }}
                                    class="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                                <label for="show_primary_button" class="ml-2 text-sm text-gray-700">
                                    Mostrar botón principal
                                </label>
                            </div>

                            <!-- Show secondary button toggle -->
                            <div class="flex items-center">
                                <input type="checkbox" name="show_secondary_button" id="show_secondary_button"
                                    value="1"
                                    {{ old('show_secondary_button', $banner->show_secondary_button) ? 'checked' : '' }}
                                    class="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                                <label for="show_secondary_button" class="ml-2 text-sm text-gray-700">
                                    Mostrar botón secundario
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Status Section -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-settings-line mr-2"></i>Estado
                    </h3>

                    <div>
                        <label for="status" class="block text-gray-700 text-sm font-bold mb-2">
                            Estado del Banner <span class="text-red-500">*</span>
                        </label>
                        <select name="status" id="status" required
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('status') border-red-500 @enderror">
                            <option value="">Seleccionar estado</option>
                            <option value="active" {{ old('status', $banner->status) == 'active' ? 'selected' : '' }}>
                                Activo</option>
                            <option value="inactive" {{ old('status', $banner->status) == 'inactive' ? 'selected' : '' }}>
                                Inactivo</option>
                        </select>
                        <p class="text-xs text-gray-600 mt-1">Solo los banners activos se muestran en el sitio web</p>
                        @error('status')
                            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- Meta Information -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-information-line mr-2"></i>Información del Sistema
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-50 p-4 rounded">
                            <h4 class="font-medium text-gray-700 mb-2">Creación</h4>
                            <p class="text-sm text-gray-600">
                                <i class="ri-user-line mr-1"></i>
                                Por: {{ $banner->creator->name ?? 'Usuario eliminado' }}
                            </p>
                            <p class="text-sm text-gray-600">
                                <i class="ri-time-line mr-1"></i>
                                Fecha: {{ $banner->created_at->format('d/m/Y H:i') }}
                            </p>
                        </div>

                        @if ($banner->updated_at && $banner->updated_at != $banner->created_at)
                            <div class="bg-gray-50 p-4 rounded">
                                <h4 class="font-medium text-gray-700 mb-2">Última Modificación</h4>
                                <p class="text-sm text-gray-600">
                                    <i class="ri-user-line mr-1"></i>
                                    Por: {{ $banner->updater->name ?? 'Usuario eliminado' }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    <i class="ri-time-line mr-1"></i>
                                    Fecha: {{ $banner->updated_at->format('d/m/Y H:i') }}
                                </p>
                            </div>
                        @endif
                    </div>
                </div>

                <!-- Submit Buttons -->
                <div class="flex items-center justify-end space-x-4">
                    <button type="submit"
                        class="bg-primary hover:bg-primary/90 text-white rounded-full font-bold py-2 px-6 focus:outline-none focus:shadow-outline transition-colors">
                        <i class="ri-save-line mr-1"></i>Actualizar Banner
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Media Gallery Modal -->
    <div id="media-gallery-modal"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
            <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <h3 class="text-xl font-bold text-gray-900">Galería de Imágenes</h3>
                <button type="button" onclick="closeMediaGallery()"
                    class="text-gray-400 hover:text-gray-600 transition">
                    <i class="ri-close-line text-2xl"></i>
                </button>
            </div>

            <div class="px-6 py-3 border-b border-gray-200">
                <div class="flex flex-col sm:flex-row gap-3">
                    <div class="flex-1">
                        <input type="text" id="media-search" placeholder="Buscar imágenes..."
                            class="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-primary">
                    </div>
                    <button type="button" onclick="searchMedia()"
                        class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition flex items-center justify-center">
                        <i class="ri-search-line mr-1"></i>Buscar
                    </button>
                </div>
            </div>

            <div class="flex-1 overflow-y-auto p-4">
                <div id="media-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <div class="col-span-full text-center py-12 text-gray-500">
                        <i class="ri-loader-4-line text-4xl animate-spin"></i>
                        <p class="mt-2">Cargando imágenes...</p>
                    </div>
                </div>
            </div>

            <div class="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <button type="button" onclick="closeMediaGallery()"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-full transition">
                    Cancelar
                </button>
                <button type="button" onclick="confirmImageSelection()" id="confirm-selection-btn"
                    class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled>
                    Seleccionar imagen
                </button>
            </div>
        </div>
    </div>

@section('scripts')
    <script>
        let selectedMediaItem = null;

        // Initialize the form when document is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Setup loading indicator for form submission
            setupLoadingIndicator('bannerEditForm');

            // Handle Enter key in media search
            document.getElementById('media-search').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchMedia();
                }
            });

            // Check if there's an old image_url value
            const oldImageUrl = document.getElementById('image_url_path').value;
            if (oldImageUrl) {
                document.getElementById('image_preview').src = oldImageUrl;
                document.getElementById('image_preview_container').classList.remove('hidden');
            }
        });

        // Open media gallery modal to select an image
        function openMediaGallery() {
            const modal = document.getElementById('media-gallery-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            loadMediaGallery();
        }

        // Close media gallery modal
        function closeMediaGallery() {
            const modal = document.getElementById('media-gallery-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            selectedMediaItem = null;
            document.getElementById('confirm-selection-btn').disabled = true;
        }

        // Load media gallery from API
        async function loadMediaGallery(searchTerm = '') {
            const mediaGrid = document.getElementById('media-grid');
            mediaGrid.innerHTML =
                '<div class="col-span-full text-center py-12 text-gray-500"><i class="ri-loader-4-line text-4xl animate-spin"></i><p class="mt-2">Cargando imágenes...</p></div>';

            try {
                const url = searchTerm ?
                    `/api/media/list?search=${encodeURIComponent(searchTerm)}&type=image` :
                    '/api/media/list?type=image';

                const response = await fetch(url);
                const data = await response.json();

                if (data.data && data.data.length > 0) {
                    mediaGrid.innerHTML = '';
                    data.data.forEach(item => {
                        const mediaCard = createMediaCard(item);
                        mediaGrid.appendChild(mediaCard);
                    });
                } else {
                    mediaGrid.innerHTML =
                        '<div class="col-span-full text-center py-12 text-gray-500"><i class="ri-image-line text-5xl mb-3"></i><p>No se encontraron imágenes</p></div>';
                }
            } catch (error) {
                mediaGrid.innerHTML =
                    '<div class="col-span-full text-center py-12 text-red-500"><i class="ri-error-warning-line text-5xl mb-3"></i><p>Error al cargar las imágenes</p></div>';
            }
        }

        // Create media card element for the gallery
        function createMediaCard(item) {
            const card = document.createElement('div');
            card.className =
                'border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 bg-white cursor-pointer';
            card.onclick = () => selectMediaItem(item, card);

            const imagePreview = document.createElement('div');
            imagePreview.className = 'relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden';

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.name || item.alt || 'Imagen';
            img.className = 'w-full h-full object-cover';

            img.onerror = function() {
                imagePreview.innerHTML =
                    '<div class="text-center p-2"><i class="ri-image-line text-4xl text-gray-400 mb-2"></i></div>';
            };

            imagePreview.appendChild(img);

            const checkIcon = document.createElement('div');
            checkIcon.className =
                'absolute top-2 right-2 w-6 h-6 bg-primary rounded-full items-center justify-center hidden';
            checkIcon.innerHTML = '<i class="ri-check-line text-white text-sm"></i>';
            imagePreview.appendChild(checkIcon);

            const info = document.createElement('div');
            info.className = 'p-3';

            const name = document.createElement('h3');
            name.className = 'font-medium text-sm text-gray-900 truncate';
            name.textContent = item.name || item.alt || 'Sin nombre';
            name.title = item.name || item.alt || 'Sin nombre';

            const size = document.createElement('p');
            size.className = 'text-xs text-gray-500 mt-1';
            size.textContent = item.size || '';

            info.appendChild(name);
            info.appendChild(size);

            card.appendChild(imagePreview);
            card.appendChild(info);

            card.dataset.itemId = item.id;

            return card;
        }

        // Select media item from the gallery
        function selectMediaItem(item, cardElement) {
            document.querySelectorAll('#media-grid > div').forEach(card => {
                card.classList.remove('ring-2', 'ring-primary');
                const checkIcon = card.querySelector('.absolute.top-2');
                if (checkIcon) {
                    checkIcon.classList.add('hidden');
                    checkIcon.classList.remove('flex');
                }
            });

            cardElement.classList.add('ring-2', 'ring-primary');
            const checkIcon = cardElement.querySelector('.absolute.top-2');
            if (checkIcon) {
                checkIcon.classList.remove('hidden');
                checkIcon.classList.add('flex');
            }

            selectedMediaItem = item;
            document.getElementById('confirm-selection-btn').disabled = false;
        }

        // Confirm image selection from gallery
        function confirmImageSelection() {
            if (!selectedMediaItem) return;

            const imageUrl = selectedMediaItem.src;

            document.getElementById('image_url_path').value = imageUrl;
            document.getElementById('image_preview').src = imageUrl;
            document.getElementById('image_preview_container').classList.remove('hidden');

            closeMediaGallery();
        }

        // Search media in the gallery
        function searchMedia() {
            const searchTerm = document.getElementById('media-search').value;
            loadMediaGallery(searchTerm);
        }

        // Remove selected image
        function removeSelectedImage() {
            document.getElementById('image_url_path').value = '';
            document.getElementById('image_preview').src = '#';
            document.getElementById('image_preview_container').classList.add('hidden');
        }
    </script>
@endsection
@endsection
