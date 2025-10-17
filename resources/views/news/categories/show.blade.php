@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold text-secondary">Detalles de Categoría</h1>
        <div class="flex flex-col md:flex-row gap-2">
            <a href="{{ route('news.categories.edit', $category) }}"
                class="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-edit-line mr-1"></i>Editar
            </a>
            <a href="{{ route('news.categories.index') }}"
                class="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-arrow-left-line mr-1"></i>Volver
            </a>
        </div>
    </div>

    <div class="bg-white shadow-md p-6">
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ $category->name }}</h2>
            <p class="text-sm text-gray-500">Slug: {{ $category->slug }}</p>
        </div>

        @if ($category->description)
        <div class="mb-6 border-t pt-4">
            <h3 class="text-lg font-medium text-gray-800 mb-2">Descripción</h3>
            <p class="text-gray-700">{{ $category->description }}</p>
        </div>
        @endif

        <div class="border-t pt-4">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Noticias en esta categoría</h3>

            @if ($category->newsArticles->count() > 0)
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                @foreach ($category->newsArticles as $article)
                <div class="border p-4 hover:shadow-md transition-shadow">
                    <h4 class="font-medium text-gray-900 mb-1">{{ $article->title }}</h4>
                    <div class="flex items-center justify-between text-sm">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        {{ $article->status === 'published' ? 'bg-green-100 text-green-800' : 
                                           ($article->status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800') }}">
                            {{ $article->status === 'published' ? 'Publicado' : 
                                           ($article->status === 'scheduled' ? 'Programado' : 'Borrador') }}
                        </span>
                        <span class="text-gray-500">
                            {{ $article->published_at ? $article->published_at->format('d/m/Y') : 'No publicado' }}
                        </span>
                    </div>
                    <div class="mt-2 flex justify-end">
                        <a href="{{ route('news.articles.edit', $article) }}"
                            class="text-blue-600 hover:text-blue-800 mr-2">Editar</a>
                        <a href="{{ route('news.articles.show', $article) }}"
                            class="text-green-600 hover:text-green-800">Ver</a>
                    </div>
                </div>
                @endforeach
            </div>
            @else
            <div class="bg-gray-50 p-4 text-center">
                <p class="text-gray-500">No hay noticias en esta categoría.</p>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection