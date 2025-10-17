@extends('layouts.app')

@section('styles')
    <style>
        .ck-editor__editable_inline {
            min-height: 300px;
        }

        .document-editor__toolbar {
            background-color: #f8f9fa;
            border: 1px solid #c4c4c4;
            border-bottom: none;
            border-radius: 1rem 1rem 0 0;
            padding: 8px;
        }

        #editor-container {
            border: 1px solid #c4c4c4;
            border-top: none;
            border-radius: 0 0 1rem 1rem;
            min-height: 400px;
            padding: 20px;
            background-color: white;
        }

        .ck-content h1 {
            font-size: 1.75rem;
            font-weight: 700;
        }

        .ck-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
        }

        .ck-content h3 {
            font-size: 1.25rem;
            font-weight: 600;
        }
    </style>
@endsection

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-secondary">Editar Noticia</h1>
            <a href="{{ route('news.dashboard') }}"
                class="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-arrow-left-line mr-1"></i>Volver al Listado
            </a>
        </div>

        @if (!auth()->user()->hasAnyPermission(['auto_approve_news', 'review_news', 'manage_news']))
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-2xl">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="ri-information-line text-yellow-400 text-xl"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                            Las modificaciones que realices serán revisadas por un administrador antes de ser publicadas.
                        </p>
                    </div>
                </div>
            </div>
        @endif

        <div class="bg-white shadow-md rounded-2xl p-6">
            <form action="{{ route('news.articles.update', $article) }}" method="POST" enctype="multipart/form-data"
                id="article-form">
                @csrf
                @method('PUT')

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Título *</label>
                        <input type="text" name="title" id="title" value="{{ old('title', $article->title) }}"
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('title') border-red-500 @enderror"
                            required>
                        @error('title')
                            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="news_category_id" class="block text-gray-700 text-sm font-bold mb-2">Categoría *</label>
                        <select name="news_category_id" id="news_category_id"
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('news_category_id') border-red-500 @enderror"
                            required>
                            <option value="">Seleccionar categoría</option>
                            @foreach ($categories as $category)
                                <option value="{{ $category->id }}"
                                    {{ old('news_category_id', $article->news_category_id) == $category->id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                        @error('news_category_id')
                            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="mb-6">
                    <label for="featured_image" class="block text-gray-700 text-sm font-bold mb-2">Imagen destacada</label>
                    <input type="hidden" name="featured_image" id="featured_image_path"
                        value="{{ old('featured_image', $article->featured_image) }}">

                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <button type="button" onclick="openMediaGallery()"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition flex items-center">
                            <i class="ri-image-add-line mr-1"></i> Cambiar imagen
                        </button>
                        <span class="text-sm text-gray-500">Recomendado: 1200 x 630 px (JPG, PNG, GIF)</span>
                    </div>

                    <div id="image_preview_container" class="{{ $article->featured_image ? '' : 'hidden' }} mt-4">
                        <div class="relative inline-block">
                            <img id="image_preview" src="{{ $article->featured_image ? $article->featured_image : '#' }}"
                                alt="Vista previa" class="max-h-48 rounded-2xl border border-gray-300 shadow-sm">
                            <button type="button" onclick="removeSelectedImage()"
                                class="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition">
                                <i class="ri-close-line text-lg"></i>
                            </button>
                        </div>
                    </div>

                    @error('featured_image')
                        <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-6">
                    <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Contenido *</label>
                    <textarea name="content" id="content" class="hidden">{{ old('content', $article->content) }}</textarea>
                    <div id="editor-container"></div>
                    @error('content')
                        <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                    @enderror
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Estado *</label>
                        <select name="status" id="status"
                            class="shadow custom-select appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('status') border-red-500 @enderror"
                            required onchange="togglePublishedAt()">
                            <option value="draft" {{ old('status', $article->status) == 'draft' ? 'selected' : '' }}>
                                Borrador</option>

                            @if (auth()->user()->hasAnyPermission(['auto_approve_news', 'review_news', 'manage_news']))
                                <option value="published"
                                    {{ old('status', $article->status) == 'published' ? 'selected' : '' }}>Publicar ahora
                                </option>
                                <option value="scheduled"
                                    {{ old('status', $article->status) == 'scheduled' ? 'selected' : '' }}>Programar
                                    publicación</option>
                            @else
                                <option value="pending"
                                    {{ old('status', $article->status) == 'pending' ? 'selected' : '' }}>Enviar para
                                    revisión</option>
                            @endif
                        </select>
                        @error('status')
                            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                        @enderror
                    </div>

                    <div id="published_at_container"
                        class="{{ old('status', $article->status) == 'scheduled' ? '' : 'hidden' }}">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Programar publicación</label>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <input type="date" name="publish_date" id="publish_date"
                                    value="{{ old('publish_date', $article->published_at ? $article->published_at->format('Y-m-d') : '') }}"
                                    class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('published_at') border-red-500 @enderror">
                            </div>
                            <div>
                                <input type="time" name="publish_time" id="publish_time"
                                    value="{{ old('publish_time', $article->published_at ? $article->published_at->format('H:i') : '09:00') }}"
                                    class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary rounded-full @error('published_at') border-red-500 @enderror">
                            </div>
                        </div>
                        <input type="hidden" name="published_at" id="published_at_hidden">
                        @error('published_at')
                            <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="flex items-center justify-end">
                    <button type="button" id="submit-btn"
                        class="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 focus:outline-none focus:shadow-outline rounded-full transition">
                        <i class="ri-save-line mr-1"></i>Actualizar Noticia
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
@endsection

@section('scripts')
    <script>
        let editor;
        let selectedMediaItem = null;

        // Toggle published date field visibility
        function togglePublishedAt() {
            const statusSelect = document.getElementById('status');
            const publishedAtContainer = document.getElementById('published_at_container');

            if (statusSelect.value === 'scheduled') {
                publishedAtContainer.classList.remove('hidden');
            } else {
                publishedAtContainer.classList.add('hidden');
            }
        }

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

            document.getElementById('featured_image_path').value = imageUrl;
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
            document.getElementById('featured_image_path').value = '';
            document.getElementById('image_preview').src = '#';
            document.getElementById('image_preview_container').classList.add('hidden');
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize CKEditor
            if (typeof DecoupledEditor !== 'undefined') {
                DecoupledEditor
                    .create(document.getElementById('editor-container'), {
                        toolbar: [
                            'heading', '|',
                            'fontFamily', 'fontSize', '|',
                            'bold', 'italic', 'underline', 'strikethrough', '|',
                            'fontColor', 'fontBackgroundColor', '|',
                            'link', 'bulletedList', 'numberedList', '|',
                            'outdent', 'indent', '|',
                            'alignment', '|',
                            'blockQuote', 'insertTable', 'undo', 'redo'
                        ],
                        heading: {
                            options: [{
                                    model: 'paragraph',
                                    title: 'Párrafo',
                                    class: 'ck-heading_paragraph'
                                },
                                {
                                    model: 'heading1',
                                    view: 'h1',
                                    title: 'Encabezado 1',
                                    class: 'ck-heading_heading1'
                                },
                                {
                                    model: 'heading2',
                                    view: 'h2',
                                    title: 'Encabezado 2',
                                    class: 'ck-heading_heading2'
                                },
                                {
                                    model: 'heading3',
                                    view: 'h3',
                                    title: 'Encabezado 3',
                                    class: 'ck-heading_heading3'
                                }
                            ]
                        }
                    })
                    .then(editorInstance => {
                        const toolbarContainer = document.createElement('div');
                        toolbarContainer.classList.add('document-editor__toolbar');
                        document.getElementById('editor-container').parentNode.insertBefore(
                            toolbarContainer,
                            document.getElementById('editor-container')
                        );

                        toolbarContainer.appendChild(editorInstance.ui.view.toolbar.element);
                        window.editor = editorInstance;

                        const oldContent = document.getElementById('content').value;
                        if (oldContent) {
                            editorInstance.setData(oldContent);
                        }
                    })
                    .catch(error => {
                        console.error('Error initializing editor:', error);
                        document.getElementById('content').classList.remove('hidden');
                        document.getElementById('content').style.minHeight = '300px';
                    });
            } else {
                console.warn('CKEditor not loaded, using normal textarea');
                document.getElementById('content').classList.remove('hidden');
                document.getElementById('content').style.minHeight = '300px';
            }

            // Handle form submission
            document.getElementById('submit-btn').addEventListener('click', function() {
                try {
                    if (window.editor) {
                        const editorData = window.editor.getData();
                        document.getElementById('content').value = editorData;
                    }

                    const status = document.getElementById('status').value;
                    if (status === 'scheduled') {
                        const date = document.getElementById('publish_date').value;
                        const time = document.getElementById('publish_time').value;

                        if (date && time) {
                            const datetime = `${date}T${time}`;
                            document.getElementById('published_at_hidden').value = datetime;
                        }
                    }

                    document.getElementById('article-form').submit();
                } catch (error) {
                    console.error('Error submitting form:', error);
                    alert('Hubo un error al guardar. Por favor, intente de nuevo.');
                }
            });

            // Handle Enter key in media search
            document.getElementById('media-search').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    searchMedia();
                }
            });
        });
    </script>
@endsection
