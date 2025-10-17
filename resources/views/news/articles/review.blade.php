@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div class="flex items-center gap-2">
                <h1 class="text-2xl font-bold text-secondary">Revisar Noticia</h1>
            </div>
            <div class="flex gap-2">
                <button type="button" onclick="showApproveConfirmation()"
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center">
                    <i class="ri-check-line mr-1"></i>Aprobar
                </button>
                <button type="button" onclick="showRejectModal()"
                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center">
                    <i class="ri-close-line mr-1"></i>Rechazar
                </button>
                <a href="{{ route('news.dashboard') }}"
                    class="text-center bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 rounded-full flex items-center">
                    <i class="ri-arrow-left-line mr-1"></i>Volver
                </a>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Article preview -->
            <div class="lg:col-span-3">
                <div class="bg-white shadow-md rounded-lg overflow-hidden">
                    <!-- Article header -->
                    <div class="p-6 pb-2">
                        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ $article->title }}</h1>

                        <div class="flex flex-wrap items-center text-gray-500 text-sm mb-6">
                            <div class="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold mr-4">
                                {{ $article->category->name }}
                            </div>
                            <div class="flex items-center mr-4">
                                <i class="ri-user-line mr-1"></i>
                                <span>{{ $article->uploader->name ?? 'Desconocido' }}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="ri-time-line mr-1"></i>
                                <span>Creado {{ $article->created_at->diffForHumans() }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Featured image -->
                    @if ($article->featured_image)
                        <div class="px-6 pb-6">
                            <div class="overflow-hidden shadow-md rounded-lg">
                                <img src="{{ $article->featured_image_url }}" alt="{{ $article->title }}"
                                    class="w-full h-[300px] object-cover">
                            </div>
                        </div>
                    @endif

                    <!-- Article content with styled prose -->
                    <div class="px-6 pb-6">
                        <div class="prose prose-lg max-w-none">
                            <style>
                                .prose h1 {
                                    font-size: 2.25rem;
                                    font-weight: 700;
                                    margin-top: 1rem;
                                    margin-bottom: 0.5rem;
                                    color: #1a202c;
                                }

                                .prose h2 {
                                    font-size: 1.875rem;
                                    font-weight: 600;
                                    margin-top: 0.5rem;
                                    margin-bottom: 0.25rem;
                                    color: #1a202c;
                                }

                                .prose h3 {
                                    font-size: 1.5rem;
                                    font-weight: 600;
                                    margin-top: 0.5rem;
                                    margin-bottom: 0.25rem;
                                    color: #1a202c;
                                }

                                .prose ul {
                                    list-style-type: disc;
                                    padding-left: 1.25rem;
                                    margin-top: 1rem;
                                    margin-bottom: 1rem;
                                }

                                .prose ol {
                                    list-style-type: decimal;
                                    padding-left: 1.25rem;
                                    margin-top: 1rem;
                                    margin-bottom: 1rem;
                                }

                                .prose strong {
                                    font-weight: 700;
                                }

                                .prose p {
                                    margin-top: 1rem;
                                    margin-bottom: 1rem;
                                }

                                .prose img {
                                    margin-top: 1.5rem;
                                    margin-bottom: 1.5rem;
                                }
                            </style>
                            {!! $article->content !!}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Metadata sidebar -->
            <div class="lg:col-span-1">
                <div class="bg-white shadow-md rounded-lg overflow-hidden">
                    <div class="p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">Información de Revisión</h3>

                        <div class="space-y-4 mb-6">
                            <div>
                                <h4 class="text-sm font-medium text-gray-600">Estado Actual</h4>
                                <div class="mt-1">
                                    <span
                                        class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-700">
                                        Pendiente de Revisión
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h4 class="text-sm font-medium text-gray-600">Categoría</h4>
                                <p class="mt-1 text-sm text-gray-900">{{ $article->category->name }}</p>
                            </div>

                            <div>
                                <h4 class="text-sm font-medium text-gray-600">Autor</h4>
                                <p class="mt-1 text-sm text-gray-900">{{ $article->uploader->name ?? 'Desconocido' }}</p>
                            </div>

                            <div>
                                <h4 class="text-sm font-medium text-gray-600">Fecha de Creación</h4>
                                <p class="mt-1 text-sm text-gray-900">{{ $article->created_at->format('d/m/Y H:i') }}</p>
                            </div>

                            <div>
                                <h4 class="text-sm font-medium text-gray-600">Slug</h4>
                                <p class="mt-1 text-sm text-gray-900 font-mono text-xs overflow-auto">{{ $article->slug }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Approve Confirmation Modal -->
    <div id="approve-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 class="text-lg font-bold mb-4">Confirmar Aprobación</h3>
            <p class="mb-4">¿Estás seguro que deseas aprobar esta noticia? Se publicará inmediatamente.</p>
            <div class="flex justify-end space-x-3">
                <button type="button" onclick="closeApproveModal()"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full transition-colors">
                    Cancelar
                </button>
                <form action="{{ route('news.articles.approve', $article) }}" method="POST" class="inline">
                    @csrf
                    <button type="submit"
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors">
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Reject Modal -->
    <div id="reject-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 class="text-lg font-bold mb-4">Rechazar Noticia</h3>
            <form action="{{ route('news.articles.reject', $article) }}" method="POST">
                @csrf
                <div class="mb-4">
                    <label for="rejection_reason" class="block text-sm font-medium text-gray-700 mb-2">Motivo del
                        rechazo</label>
                    <textarea id="rejection_reason" name="rejection_reason" rows="4"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" required></textarea>
                    <p class="text-xs text-gray-500 mt-1">Por favor, proporciona feedback constructivo para el autor.</p>
                </div>
                <div class="flex justify-end space-x-3">
                    <button type="button" onclick="closeRejectModal()"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full transition-colors">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors">
                        Rechazar
                    </button>
                </div>
            </form>
        </div>
    </div>

@section('scripts')
    <script>
        function showApproveConfirmation() {
            document.getElementById('approve-modal').classList.remove('hidden');
            document.getElementById('approve-modal').classList.add('flex');
        }

        function closeApproveModal() {
            document.getElementById('approve-modal').classList.remove('flex');
            document.getElementById('approve-modal').classList.add('hidden');
        }

        function showRejectModal() {
            document.getElementById('reject-modal').classList.remove('hidden');
            document.getElementById('reject-modal').classList.add('flex');
        }

        function closeRejectModal() {
            document.getElementById('reject-modal').classList.remove('flex');
            document.getElementById('reject-modal').classList.add('hidden');
        }

        document.addEventListener('click', function(event) {
            const approveModal = document.getElementById('approve-modal');
            const rejectModal = document.getElementById('reject-modal');

            if (event.target === approveModal) {
                closeApproveModal();
            }

            if (event.target === rejectModal) {
                closeRejectModal();
            }
        });
    </script>
@endsection
@endsection
