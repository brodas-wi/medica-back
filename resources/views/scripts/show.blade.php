@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-secondary">Detalles del Script: {{ $script->name }}</h1>
            <div class="flex gap-2">
                <a href="{{ route('scripts.edit', $script->id) }}"
                    class="bg-primary hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-edit-line mr-1"></i>
                    Editar
                </a>
                <a href="{{ route('scripts.index') }}"
                    class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-arrow-left-line mr-1"></i>
                    Volver
                </a>
            </div>
        </div>

        <div class="bg-white shadow-md overflow-hidden">
            <div class="p-6 border-b">
                <div class="flex justify-between">
                    <div>
                        <h2 class="text-xl font-bold text-secondary mb-2">{{ $script->name }}</h2>
                        @if ($script->description)
                            <p class="text-gray-600 mt-2">{{ $script->description }}</p>
                        @endif
                    </div>
                    <div>
                        <span
                            class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full
                            {{ $script->is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800' }}">
                            {{ $script->is_active ? 'Activo' : 'Inactivo' }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="p-6 border-b">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-sm font-bold text-gray-700 uppercase mb-2">Información</h3>
                        <table class="min-w-full text-sm">
                            <tbody>
                                <tr>
                                    <td class="py-2 pr-4 font-semibold">ID:</td>
                                    <td>{{ $script->id }}</td>
                                </tr>
                                <tr>
                                    <td class="py-2 pr-4 font-semibold">Ubicación:</td>
                                    <td class="capitalize">{{ $script->location }}</td>
                                </tr>
                                <tr>
                                    <td class="py-2 pr-4 font-semibold">Prioridad:</td>
                                    <td>{{ $script->priority }}</td>
                                </tr>
                                <tr>
                                    <td class="py-2 pr-4 font-semibold">Estado:</td>
                                    <td>{{ $script->is_active ? 'Activo' : 'Inactivo' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold text-gray-700 uppercase mb-2">Historial</h3>
                        <table class="min-w-full text-sm">
                            <tbody>
                                <tr>
                                    <td class="py-2 pr-4 font-semibold">Creado por:</td>
                                    <td>{{ $script->creator->name ?? 'Desconocido' }}</td>
                                </tr>
                                <tr>
                                    <td class="py-2 pr-4 font-semibold">Fecha de creación:</td>
                                    <td>{{ $script->created_at->format('d/m/Y H:i') }}</td>
                                </tr>
                                <tr>
                                    <td class="py-2 pr-4 font-semibold">Actualizado por:</td>
                                    <td>{{ $script->updater->name ?? 'Desconocido' }}</td>
                                </tr>
                                <tr>
                                    <td class="py-2 pr-4 font-semibold">Última actualización:</td>
                                    <td>{{ $script->updated_at->format('d/m/Y H:i') }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="p-6">
                <h3 class="text-sm font-bold text-gray-700 uppercase mb-4">Código</h3>
                <div class="bg-gray-800 rounded-md p-4 overflow-auto">
                    <pre class="text-gray-100 text-sm"><code>{{ $script->code }}</code></pre>
                </div>
            </div>

            <div class="p-6 bg-gray-50 flex justify-end">
                <a href="{{ route('scripts.preview', $script->id) }}" target="_blank"
                    class="bg-blue-600 hover:bg-blue-600/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-eye-line mr-1"></i> Previsualizar
                </a>
            </div>
        </div>
    </div>
@endsection
