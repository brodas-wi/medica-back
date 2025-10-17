@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold text-secondary">Detalles de Noticia</h1>
        <div class="flex flex-col md:flex-row gap-2">
            <a href="{{ route('news.articles.edit', $article) }}"
                class="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-edit-line mr-1"></i>Editar
            </a>
            @if ($article->status === 'published')
            <a href="{{ url('noticias/' . $article->slug) }}" target="_blank"
                class="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-external-link-line mr-1"></i>Ver en sitio
            </a>
            @endif
            <a href="{{ route('news.articles.index') }}"
                class="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-arrow-left-line mr-1"></i>Volver
            </a>
        </div>
    </div>

    <div class="bg-white shadow-md overflow-hidden">
        <!-- Encabezado del artículo -->
        <div class="relative">
            @if ($article->featured_image)
            <div class="h-64 w-full overflow-hidden">
                <img src="{{ asset('storage/' . $article->featured_image) }}" alt="{{ $article->title }}"
                    class="w-full h-full object-cover">
            </div>
            @else
            <div class="h-32 bg-gray-200 flex items-center justify-center">
                <i class="ri-image-line text-5xl text-gray-400"></i>
            </div>
            @endif
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div class="text-sm font-medium text-white">
                    <span class="px-2 py-1 bg-primary/80 rounded-full text-xs mr-2">
                        {{ $article->category->name }}
                    </span>
                    <span class="px-2 py-1 rounded-full text-xs 
                            {{ $article->status === 'published' ? 'bg-green-500/80' : 
                               ($article->status === 'scheduled' ? 'bg-blue-500/80' : 'bg-gray-500/80') }}">
                        {{ $article->status === 'published' ? 'Publicado' : 
                               ($article->status === 'scheduled' ? 'Programado' : 'Borrador') }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Contenido del artículo -->
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ $article->title }}</h2>

            <div class="flex items-center text-sm text-gray-500 mb-6">
                <div class="mr-4">
                    <i class="ri-time-line mr-1"></i>
                    @if ($article->published_at)
                    Publicado: {{ $article->published_at->format('d/m/Y H:i') }}
                    @else
                    No publicado
                    @endif
                </div>
                <div>
                    <i class="ri-link mr-1"></i>
                    <span class="text-gray-600">{{ $article->slug }}</span>
                </div>
            </div>

            <div class="prose max-w-none">
                {!! $article->content !!}
            </div>
        </div>

        <!-- Metadatos del artículo -->
        <div class="border-t border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Información adicional</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-600 mb-1"><strong>Fecha de creación:</strong> {{ $article->created_at->format('d/m/Y H:i') }}</p>
                    <p class="text-sm text-gray-600 mb-1"><strong>Última actualización:</strong> {{ $article->updated_at->format('d/m/Y H:i') }}</p>
                    <p class="text-sm text-gray-600"><strong>Estado:</strong>
                        <span class="px-2 py-0.5 rounded text-xs 
                                {{ $article->status === 'published' ? 'bg-green-100 text-green-800' : 
                                   ($article->status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800') }}">
                            {{ $article->status === 'published' ? 'Publicado' : 
                                   ($article->status === 'scheduled' ? 'Programado' : 'Borrador') }}
                        </span>
                    </p>
                </div>
                <div>
                    <p class="text-sm text-gray-600 mb-1"><strong>Categoría:</strong> {{ $article->category->name }}</p>
                    @if ($article->status === 'published' || $article->status === 'scheduled')
                    <p class="text-sm text-gray-600"><strong>Fecha de publicación:</strong>
                        {{ $article->published_at ? $article->published_at->format('d/m/Y H:i') : 'N/A' }}
                    </p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection