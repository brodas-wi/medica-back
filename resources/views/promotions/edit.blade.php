@extends('layouts.app')

@section('styles')
    <style>
        .custom-dropdown {
            position: relative;
        }

        .dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-height: 200px;
            overflow-y: auto;
            background-color: white;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            margin-top: 4px;
            z-index: 50;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .dropdown-menu.show {
            display: block;
        }

        .dropdown-item {
            padding: 8px 12px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .dropdown-item:hover {
            background-color: #f3f4f6;
        }
    </style>
@endsection

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Editar Promoción</h1>
            <a href="{{ route('promotions.index') }}"
                class="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-arrow-left-line mr-1"></i>Volver al Listado
            </a>
        </div>

        <div class="bg-white shadow-md p-6">
            <form action="{{ route('promotions.update', $promotion->id) }}" method="POST" enctype="multipart/form-data"
                id="promotionForm">
                @csrf
                @method('PUT')

                <!-- Basic Information -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-information-line mr-2"></i>Información Básica
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Title -->
                        <div class="md:col-span-2">
                            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
                                Título <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="title" id="title"
                                value="{{ old('title', $promotion->title) }}"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('title') border-red-500 @enderror"
                                required>
                            @error('title')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Category -->
                        <div>
                            <label for="category" class="block text-gray-700 text-sm font-bold mb-2">
                                Categoría <span class="text-red-500">*</span>
                            </label>
                            <div class="relative custom-dropdown">
                                <input type="text" name="category" id="category"
                                    value="{{ old('category', $promotion->category ?? '') }}" autocomplete="off"
                                    class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('category') border-red-500 @enderror"
                                    required>
                                <div
                                    class="dropdown-icon pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                                    <i class="ri-arrow-down-s-line"></i>
                                </div>
                                <div class="dropdown-menu">
                                    @foreach ($categories as $cat)
                                        <div class="dropdown-item" data-value="{{ $cat }}">{{ $cat }}
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                            <p class="text-xs text-gray-600 mt-1">Escribe una nueva o selecciona una existente</p>
                            @error('category')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Order -->
                        <div>
                            <label for="order" class="block text-gray-700 text-sm font-bold mb-2">
                                Orden de visualización
                            </label>
                            <input type="number" name="order" id="order"
                                value="{{ old('order', $promotion->order) }}" min="0"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('order') border-red-500 @enderror">
                            <p class="text-xs text-gray-600 mt-1">Menor número = mayor prioridad</p>
                            @error('order')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Short Description -->
                        <div class="md:col-span-2">
                            <label for="short_description" class="block text-gray-700 text-sm font-bold mb-2">
                                Descripción Corta <span class="text-red-500">*</span>
                            </label>
                            <textarea name="short_description" id="short_description" rows="2" maxlength="500"
                                placeholder="Descripción breve para la tarjeta (máx. 500 caracteres)"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-2xl @error('short_description') border-red-500 @enderror"
                                required>{{ old('short_description', $promotion->short_description) }}</textarea>
                            <p class="text-xs text-gray-600 mt-1">Esta descripción se mostrará en la tarjeta de la promoción
                            </p>
                            @error('short_description')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Long Description -->
                        <div class="md:col-span-2">
                            <label for="long_description" class="block text-gray-700 text-sm font-bold mb-2">
                                Descripción Detallada <span class="text-red-500">*</span>
                            </label>
                            <textarea name="long_description" id="long_description" rows="6"
                                placeholder="Descripción completa que se mostrará en el modal"
                                class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-2xl @error('long_description') border-red-500 @enderror"
                                required>{{ old('long_description', $promotion->long_description) }}</textarea>
                            <p class="text-xs text-gray-600 mt-1">Esta descripción se mostrará en el modal al hacer clic en
                                "Ver más"</p>
                            @error('long_description')
                                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>

                <!-- Image Section -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-image-line mr-2"></i>Imagen Destacada <span class="text-red-500">*</span>
                    </h3>

                    <input type="hidden" name="image_url" id="image_url_path"
                        value="{{ old('image_url', $promotion->image_url) }}">

                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <button type="button" onclick="openMediaGallery()"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition flex items-center">
                            <i class="ri-image-add-line mr-1"></i> Seleccionar imagen
                        </button>
                    </div>

                    <div id="image_preview_container" class="{{ $promotion->image_url ? '' : 'hidden' }} mt-4">
                        <div class="relative inline-block">
                            <img id="image_preview" src="{{ $promotion->image_url }}" alt="Vista previa"
                                class="max-h-48 rounded-2xl border border-gray-300 shadow-sm">
                            <button type="button" onclick="removeSelectedImage()"
                                class="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition">
                                <i class="ri-close-line text-lg"></i>
                            </button>
                        </div>
                    </div>

                    <p class="text-xs text-gray-600 mt-2">Selecciona una imagen para la promoción</p>

                    @error('image_url')
                        <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Validity Period -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-calendar-line mr-2"></i>Configuración de Vigencia
                    </h3>

                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-3">Tipo de vigencia</label>

                        <div class="flex flex-col md:flex-row gap-4 mb-6">
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="vigencia_type" value="days" class="mr-2"
                                    {{ old('vigencia_type', !empty($promotion->active_days) ? 'days' : ($promotion->end_date ? 'date' : 'days')) == 'days' ? 'checked' : '' }}>
                                <span class="text-sm">Por días de la semana</span>
                            </label>
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="vigencia_type" value="date" class="mr-2"
                                    {{ old('vigencia_type', !empty($promotion->active_days) ? 'days' : ($promotion->end_date ? 'date' : 'days')) == 'date' ? 'checked' : '' }}>
                                <span class="text-sm">Por fecha de finalización</span>
                            </label>
                        </div>
                    </div>

                    <div id="days-section"
                        class="vigencia-section {{ old('vigencia_type', !empty($promotion->active_days) ? 'days' : ($promotion->end_date ? 'date' : 'days')) == 'date' ? 'hidden' : '' }}">
                        <label class="block text-gray-700 text-sm font-bold mb-3">Días activos de la semana</label>
                        <p class="text-xs text-gray-600 mb-3">Selecciona los días en que la promoción estará visible (dejar
                            vacío para todos los días)</p>

                        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                            @php
                                $activeDays = old('active_days', $promotion->active_days ?? []);
                            @endphp
                            <label
                                class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="active_days[]" value="monday" class="mr-2"
                                    {{ in_array('monday', $activeDays) ? 'checked' : '' }}>
                                <span class="text-sm">Lunes</span>
                            </label>
                            <label
                                class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="active_days[]" value="tuesday" class="mr-2"
                                    {{ in_array('tuesday', $activeDays) ? 'checked' : '' }}>
                                <span class="text-sm">Martes</span>
                            </label>
                            <label
                                class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="active_days[]" value="wednesday" class="mr-2"
                                    {{ in_array('wednesday', $activeDays) ? 'checked' : '' }}>
                                <span class="text-sm">Miércoles</span>
                            </label>
                            <label
                                class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="active_days[]" value="thursday" class="mr-2"
                                    {{ in_array('thursday', $activeDays) ? 'checked' : '' }}>
                                <span class="text-sm">Jueves</span>
                            </label>
                            <label
                                class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="active_days[]" value="friday" class="mr-2"
                                    {{ in_array('friday', $activeDays) ? 'checked' : '' }}>
                                <span class="text-sm">Viernes</span>
                            </label>
                            <label
                                class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="active_days[]" value="saturday" class="mr-2"
                                    {{ in_array('saturday', $activeDays) ? 'checked' : '' }}>
                                <span class="text-sm">Sábado</span>
                            </label>
                            <label
                                class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="active_days[]" value="sunday" class="mr-2"
                                    {{ in_array('sunday', $activeDays) ? 'checked' : '' }}>
                                <span class="text-sm">Domingo</span>
                            </label>
                        </div>
                    </div>

                    <div id="date-section"
                        class="vigencia-section {{ old('vigencia_type', !empty($promotion->active_days) ? 'days' : ($promotion->end_date ? 'date' : 'days')) == 'days' ? 'hidden' : '' }}">
                        <label for="end_date" class="block text-gray-700 text-sm font-bold mb-2">
                            Fecha de Finalización
                        </label>
                        <input type="date" name="end_date" id="end_date"
                            value="{{ old('end_date', $promotion->end_date?->format('Y-m-d')) }}"
                            min="{{ date('Y-m-d') }}"
                            class="shadow appearance-none border w-full md:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('end_date') border-red-500 @enderror">
                        <p class="text-xs text-gray-600 mt-1">Fecha hasta la cual estará disponible la promoción</p>
                        @error('end_date')
                            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- Status -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                        <i class="ri-settings-line mr-2"></i>Estado
                    </h3>

                    <div>
                        <label for="status" class="block text-gray-700 text-sm font-bold mb-2">
                            Estado de la Promoción <span class="text-red-500">*</span>
                        </label>
                        <select name="status" id="status" required
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('status') border-red-500 @enderror">
                            <option value="">Seleccionar estado</option>
                            <option value="active" {{ old('status', $promotion->status) == 'active' ? 'selected' : '' }}>
                                Activo</option>
                            <option value="inactive"
                                {{ old('status', $promotion->status) == 'inactive' ? 'selected' : '' }}>Inactivo</option>
                        </select>
                        <p class="text-xs text-gray-600 mt-1">Solo las promociones activas se muestran en el sitio web</p>
                        @error('status')
                            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- Submit Buttons -->
                <div class="flex items-center justify-end space-x-4">
                    <button type="submit"
                        class="bg-primary hover:bg-primary/90 text-white rounded-full font-bold py-2 px-6 focus:outline-none focus:shadow-outline transition-colors">
                        <i class="ri-save-line mr-1"></i>Actualizar Promoción
                    </button>
                </div>
            </form>
        </div>
    </div>

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
        document.addEventListener('DOMContentLoaded', function() {
            setupLoadingIndicator('promotionForm');

            const categoryInput = document.getElementById('category');
            if (!categoryInput) return;

            const dropdown = categoryInput.parentElement.querySelector('.dropdown-menu');
            const items = dropdown.querySelectorAll('.dropdown-item');

            categoryInput.addEventListener('click', function() {
                dropdown.classList.add('show');
            });

            categoryInput.addEventListener('focus', function() {
                dropdown.classList.add('show');
            });

            categoryInput.addEventListener('input', function() {
                const value = this.value.toLowerCase();
                let visibleCount = 0;

                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(value)) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });

                if (visibleCount === 0 && this.value.trim() !== '') {
                    dropdown.classList.remove('show');
                } else {
                    dropdown.classList.add('show');
                }
            });

            items.forEach(item => {
                item.addEventListener('click', function() {
                    categoryInput.value = this.getAttribute('data-value');
                    dropdown.classList.remove('show');
                });
            });

            document.addEventListener('click', function(e) {
                if (!categoryInput.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });

            const vigenciaRadios = document.querySelectorAll('input[name="vigencia_type"]');
            const daysSection = document.getElementById('days-section');
            const dateSection = document.getElementById('date-section');
            const endDateInput = document.getElementById('end_date');
            const activeDaysCheckboxes = document.querySelectorAll('input[name="active_days[]"]');

            vigenciaRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'days') {
                        daysSection.classList.remove('hidden');
                        dateSection.classList.add('hidden');
                        endDateInput.value = '';
                    } else {
                        daysSection.classList.add('hidden');
                        dateSection.classList.remove('hidden');
                        activeDaysCheckboxes.forEach(cb => cb.checked = false);
                    }
                });
            });

            // Check if there's an old image value
            const oldImageUrl = document.getElementById('image_url_path').value;
            if (oldImageUrl) {
                document.getElementById('image_preview').src = oldImageUrl;
                document.getElementById('image_preview_container').classList.remove('hidden');
            }
        });

        let selectedMediaItem = null;

        // Open media gallery modal
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

        // Create media card element
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

        // Select media item
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

        // Confirm image selection
        function confirmImageSelection() {
            if (!selectedMediaItem) return;

            const imageUrl = selectedMediaItem.src;

            document.getElementById('image_url_path').value = imageUrl;
            document.getElementById('image_preview').src = imageUrl;
            document.getElementById('image_preview_container').classList.remove('hidden');

            closeMediaGallery();
        }

        // Search media
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
