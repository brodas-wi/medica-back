@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 class="text-2xl font-bold text-secondary">Nueva Categoría</h1>
        <a href="{{ route('news.dashboard', ['#categories']) }}"
            class="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
            <i class="ri-arrow-left-line mr-1"></i>Volver al Listado
        </a>
    </div>

    <div class="bg-white shadow-md p-6">
        <form action="{{ route('news.categories.store') }}" method="POST">
            @csrf

            <div class="mb-4">
                <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                <input type="text" name="name" id="name" value="{{ old('name') }}"
                    class="shadow rounded-full appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary @error('name') border-red-500 @enderror"
                    required>
                @error('name')
                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-6">
                <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                <textarea name="description" id="description" rows="4"
                    class="shadow rounded-2xl appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary @error('description') border-red-500 @enderror">{{ old('description') }}</textarea>
                @error('description')
                <p class="text-red-500 text-xs italic mt-2">{{ $message }}</p>
                @enderror
            </div>

            <div class="flex items-center justify-end">
                <button type="submit"
                    class="bg-primary rounded-full hover:bg-primary/90 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
                    Guardar Categoría
                </button>
            </div>
        </form>
    </div>
</div>
@endsection