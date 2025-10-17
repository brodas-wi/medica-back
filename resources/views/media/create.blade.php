@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="max-w-4xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-secondary">Subir Archivos</h1>
                <a href="{{ route('media.index') }}"
                    class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-arrow-left-line mr-1"></i>Volver
                </a>
            </div>

            <div class="bg-white shadow p-6">
                <form action="{{ route('media.store') }}" method="POST" enctype="multipart/form-data" id="uploadForm">
                    @csrf

                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Archivos a subir
                        </label>

                        <div id="dropzone"
                            class="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                            <div class="mb-4">
                                <i class="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2 block"></i>
                                <h3 class="text-lg font-medium text-gray-600 mb-2">Arrastra tus archivos aquí</h3>
                                <p class="text-gray-500 mb-4">o haz clic para seleccionar archivos</p>
                                <button type="button" id="browse-btn"
                                    class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full">
                                    Seleccionar archivos
                                </button>
                            </div>
                        </div>

                        <input type="file" id="file-input" name="files[]" multiple
                            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                            style="display: none;">

                        <div class="mt-4 text-sm text-gray-600">
                            <p><strong>Archivos permitidos:</strong> Imágenes, videos, audio, PDF, documentos de Office y
                                archivos de texto</p>
                            <p><strong>Tamaño máximo:</strong> 20MB por archivo</p>
                            <p><strong>Máximo:</strong> 10 archivos por vez</p>
                            @if (!auth()->user()->hasPermissionTo('auto_approve_media'))
                                <div class="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                    <i class="ri-information-line text-yellow-600 mr-1"></i>
                                    <span class="text-yellow-700">Los archivos subidos estarán pendientes de revisión antes
                                        de estar disponibles para su uso.</span>
                                </div>
                            @endif
                        </div>
                    </div>

                    <div id="files-preview" class="hidden mb-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Archivos seleccionados</h3>
                        <div id="preview-grid" class="space-y-4"></div>
                    </div>

                    <div class="flex items-center justify-between">
                        <button type="submit" id="submit-btn" disabled
                            class="bg-primary cursor-pointer hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none flex items-center rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed">
                            <i class="ri-upload-line mr-1"></i>Subir Archivos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const dropzone = document.getElementById('dropzone');
            const fileInput = document.getElementById('file-input');
            const browseBtn = document.getElementById('browse-btn');
            const filesPreview = document.getElementById('files-preview');
            const previewGrid = document.getElementById('preview-grid');
            const submitBtn = document.getElementById('submit-btn');
            const form = document.getElementById('uploadForm');
            let selectedFiles = [];
            let fileAltTexts = {};

            // Handle browse button click
            browseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                fileInput.click();
            });

            // Handle dropzone click
            dropzone.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target === dropzone || e.target.closest('#dropzone')) {
                    fileInput.click();
                }
            });

            // Handle drag over events
            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('border-primary', 'bg-blue-50');
            });

            // Handle drag leave events
            dropzone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropzone.classList.remove('border-primary', 'bg-blue-50');
            });

            // Handle file drop
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('border-primary', 'bg-blue-50');
                const files = Array.from(e.dataTransfer.files);
                handleFiles(files);
            });

            // Handle file input change
            fileInput.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                handleFiles(files);
            });

            // Process selected files
            function handleFiles(files) {
                selectedFiles = files.slice(0, 10);

                if (selectedFiles.length > 0) {
                    displayPreview();
                    submitBtn.disabled = false;
                } else {
                    filesPreview.classList.add('hidden');
                    submitBtn.disabled = true;
                }
            }

            // Display file preview with editable alt text
            function displayPreview() {
                previewGrid.innerHTML = '';
                filesPreview.classList.remove('hidden');

                selectedFiles.forEach((file, index) => {
                    const fileId = `file_${index}`;
                    const defaultAltText = getDefaultAltText(file.name);
                    fileAltTexts[fileId] = defaultAltText;

                    const fileItem = document.createElement('div');
                    fileItem.className = 'border border-gray-200 rounded-2xl p-4';

                    fileItem.innerHTML = `
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0">
                                ${file.type.startsWith('image/')
                                    ? `<img src="${URL.createObjectURL(file)}" alt="" class="w-16 h-16 object-cover rounded-xl">`
                                    : `<div class="w-16 h-16 flex items-center justify-center bg-gray-100 rounded">
                                             <i class="${getFileIcon(file.type)} text-2xl text-gray-400"></i>
                                           </div>`
                                }
                            </div>
                            <div class="flex-1">
                                <div class="mb-2">
                                    <p class="text-sm font-medium text-gray-900">${file.name}</p>
                                    <p class="text-sm text-gray-500">${formatFileSize(file.size)}</p>
                                </div>
                                <div class="mb-2">
                                    <label for="alt_text_${index}" class="block text-xs font-medium text-gray-700 mb-1">
                                        Alt Text / Nombre para mostrar *
                                    </label>
                                    <input type="text"
                                           id="alt_text_${index}"
                                           value="${defaultAltText}"
                                           data-file-id="${fileId}"
                                           class="w-full px-2 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-primary alt-text-input"
                                           required
                                           maxlength="255">
                                </div>
                            </div>
                            <div class="flex-shrink-0">
                                <button type="button" onclick="removeFile(${index})" class="text-red-600 cursor-pointer hover:text-red-700 p-1">
                                    <i class="ri-close-line text-lg"></i>
                                </button>
                            </div>
                        </div>
                    `;

                    previewGrid.appendChild(fileItem);
                });

                // Add event listeners for alt text inputs
                document.querySelectorAll('.alt-text-input').forEach(input => {
                    input.addEventListener('input', function() {
                        const fileId = this.getAttribute('data-file-id');
                        fileAltTexts[fileId] = this.value;
                    });
                });
            }

            // Remove file from selection
            window.removeFile = function(index) {
                const fileId = `file_${index}`;
                delete fileAltTexts[fileId];
                selectedFiles.splice(index, 1);

                if (selectedFiles.length > 0) {
                    displayPreview();
                } else {
                    filesPreview.classList.add('hidden');
                    submitBtn.disabled = true;
                    fileInput.value = '';
                }
            };

            // Get default alt text from filename
            function getDefaultAltText(filename) {
                return filename.substring(0, filename.lastIndexOf('.')) || filename;
            }

            // Get appropriate icon for file type
            function getFileIcon(mimeType) {
                if (mimeType.startsWith('image/')) return 'ri-image-line';
                if (mimeType.startsWith('video/')) return 'ri-video-line';
                if (mimeType.startsWith('audio/')) return 'ri-music-line';
                if (mimeType === 'application/pdf') return 'ri-file-pdf-line';
                if (mimeType.includes('word')) return 'ri-file-word-line';
                if (mimeType.includes('excel') || mimeType.includes('sheet')) return 'ri-file-excel-line';
                if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'ri-file-ppt-line';
                return 'ri-file-line';
            }

            // Format file size for display
            function formatFileSize(bytes) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            }

            // Validate form before submission
            function validateForm() {
                const altTextInputs = document.querySelectorAll('.alt-text-input');
                let isValid = true;

                altTextInputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.classList.add('border-red-500');
                        isValid = false;
                    } else {
                        input.classList.remove('border-red-500');
                    }
                });

                return isValid;
            }

            // Handle form submission with validation
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                if (selectedFiles.length === 0) {
                    showAlert('Debes seleccionar al menos un archivo', 'warning');
                    return;
                }

                if (!validateForm()) {
                    showAlert('Por favor completa el Alt Text/Nombre para todos los archivos', 'warning');
                    return;
                }

                const formData = new FormData();

                selectedFiles.forEach((file, index) => {
                    const fileId = `file_${index}`;
                    const altText = fileAltTexts[fileId] || getDefaultAltText(file.name);

                    const newFile = new File([file], file.name, {
                        type: file.type
                    });
                    formData.append('files[]', newFile);
                    formData.append(`alt_texts[]`, altText);
                });

                formData.append('_token', document.querySelector('meta[name="csrf-token"]').getAttribute(
                    'content'));

                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin mr-1"></i>Subiendo...';
                showLoadingIndicator();

                fetch('{{ route('media.store') }}', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(data => {
                        hideLoadingIndicator();
                        showAlert('Archivos subidos correctamente', 'success');

                        setTimeout(() => {
                            window.location.href = '{{ route('media.index') }}';
                        }, 1500);
                    })
                    .catch(error => {
                        hideLoadingIndicator();
                        console.error('Error:', error);
                        showAlert('Error al subir los archivos', 'error');

                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="ri-upload-line mr-1"></i>Subir Archivos';
                    });
            });
        });
    </script>
@endsection
@endsection
