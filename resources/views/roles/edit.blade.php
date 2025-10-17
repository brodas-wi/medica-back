@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="max-w-3xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-secondary">Editar Rol</h1>
                <a href="{{ route('roles.index') }}" class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-arrow-left-line mr-1"></i>Volver a Roles
                </a>
            </div>

            <div class="bg-white shadow p-6">
                <form action="{{ route('roles.update', $role->id) }}" method="POST" id="roleForm">
                    @csrf
                    @method('PUT')

                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                        <input type="text" name="name" id="name"
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-full @error('name') border-red-500 @enderror"
                            value="{{ old('name', $role->name) }}" required>
                        @error('name')
                            <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="mb-6">
                        <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                        <textarea name="description" id="description" rows="3"
                            class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-primary rounded-2xl @error('description') border-red-500 @enderror">{{ old('description', $role->description) }}</textarea>
                        @error('description')
                            <p class="text-red-500 text-xs italic mt-1">{{ $message }}</p>
                        @enderror
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

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            setupLoadingIndicator('roleForm');

            // Mostrar el indicador de carga al enviar el formulario
            const form = document.getElementById('roleForm');
            const loadingOverlay = document.getElementById('loading-overlay');

            if (form && loadingOverlay) {
                form.addEventListener('submit', function() {
                    loadingOverlay.style.display = 'flex';
                });
            }
        });
    </script>
@endsection
