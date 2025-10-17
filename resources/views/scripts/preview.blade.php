@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-secondary">Previsualización: {{ $script->name }}</h1>
            <div class="flex gap-2">
                <a href="{{ route('scripts.edit', $script->id) }}"
                    class="bg-primary hover:bg-primary/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-edit-line mr-1"></i>Editar
                </a>
                <a href="{{ route('scripts.index') }}"
                    class="bg-gray-500 hover:bg-gray-500/90 text-white px-4 py-2 flex items-center rounded-full">
                    <i class="ri-arrow-left-line mr-1"></i>Volver
                </a>
            </div>
        </div>

        <div class="bg-white shadow-md overflow-hidden">
            <div class="p-4 bg-gray-100 border-b">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="flex items-center">
                        <span class="text-gray-700">
                            Estado:
                            @if ($script->is_active)
                                <span class="text-green-600 font-medium">Activo</span>
                            @else
                                <span class="text-gray-600 font-medium">Inactivo</span>
                            @endif
                        </span>
                    </div>
                    <div class="flex flex-col md:flex-row items-start md:items-center text-sm text-gray-500 gap-2 md:gap-4">
                        <span><i class="ri-map-pin-line mr-1"></i>Ubicación: <span
                                class="capitalize">{{ $script->location }}</span> (Prioridad:
                            {{ $script->priority }})</span>
                        <span><i class="ri-time-line mr-1"></i>{{ $script->updated_at->diffForHumans() }}</span>
                        <span><i class="ri-user-line mr-1"></i>{{ $script->creator->name ?? 'Desconocido' }}</span>
                    </div>
                </div>
            </div>

            <div class="preview-container" style="min-height: 600px;">
                <iframe id="preview-iframe" class="w-full h-full border-none" style="min-height: 600px;"></iframe>
            </div>
        </div>
    </div>

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {

            // Load script preview in iframe
            const iframe = document.getElementById('preview-iframe');
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const scriptCode = @json($script->code);
            const scriptLocation = "{{ $script->location }}";

            iframeDoc.open();
            iframeDoc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Script Preview - {{ $script->name }}</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
                </head>
                <body class="p-4">
                    <div class="bg-gray-100 p-4 mb-6 rounded-md">
                        <h1 class="text-xl font-bold mb-2">Previsualización del Script: {{ $script->name }}</h1>
                        <p class="text-gray-600">Este es un entorno de prueba para ver cómo funciona el script.</p>
                    </div>

                    <div class="border p-4 rounded-md mb-6">
                        <h2 class="text-lg font-semibold mb-3">Área de Salida</h2>
                        <div id="outputArea" class="min-h-[300px] bg-gray-50 p-3 rounded">
                            <p class="text-gray-500">Los resultados o efectos del script se mostrarán aquí.</p>
                        </div>
                    </div>

                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <i class="ri-information-line text-yellow-400"></i>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-yellow-700">
                                    Esta es una previsualización aislada. El comportamiento puede variar cuando se integre con el resto del sitio.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="text-xs text-gray-500 mt-8 border-t pt-4">
                        <p>Script "${scriptLocation}" - ID: {{ $script->id }} - Prioridad: {{ $script->priority }}</p>
                    </div>
                </body>
                </html>
            `);
            iframeDoc.close();

            const scriptElement = iframeDoc.createElement('script');
            scriptElement.textContent = scriptCode;

            if (scriptLocation === 'header') {
                iframeDoc.head.appendChild(scriptElement);
            } else if (scriptLocation === 'body') {
                iframeDoc.body.insertBefore(scriptElement, iframeDoc.body.firstChild);
            } else {
                iframeDoc.body.appendChild(scriptElement);
            }

            // Adjust iframe height to content
            setTimeout(() => {
                const bodyHeight = iframeDoc.body.scrollHeight;
                iframe.style.height = (bodyHeight + 50) + 'px';
            }, 500);
        });
    </script>
@endsection
@endsection
