@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 class="text-2xl font-bold text-secondary">Respuestas del Formulario</h1>
                <h2 class="text-lg text-gray-600">{{ $form->title }}</h2>
            </div>
            <a href="{{ route('forms.index') }}"
                class="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-4 py-2 flex items-center rounded-full transition w-full md:w-auto justify-center md:justify-start">
                <i class="ri-arrow-left-line mr-1"></i>Volver
            </a>
        </div>

        @if ($submissions->isEmpty())
            <div class="bg-white shadow-md p-6 text-center">
                <i class="ri-inbox-line text-5xl text-gray-400 mb-3"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-1">No hay respuestas todavía</h3>
                <p class="text-gray-500">Aún no se han recibido respuestas para este formulario.</p>
            </div>
        @else
            <div class="bg-white shadow-md overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 class="text-xl font-semibold text-gray-700">
                        <i class="ri-inbox-archive-line mr-2"></i>Total: {{ $submissions->total() }} respuestas
                    </h3>
                    <div>
                        <button id="downloadCsvBtn"
                            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center">
                            <i class="ri-file-excel-line mr-1"></i>Exportar CSV
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#
                                </th>
                                @foreach ($form->fields as $field)
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {{ $field['label'] }}
                                    </th>
                                @endforeach
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @foreach ($submissions as $index => $submission)
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ $submissions->firstItem() + $index }}
                                    </td>
                                    @foreach ($form->fields as $field)
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            @if (isset($submission->data[$field['name']]))
                                                @if (is_array($submission->data[$field['name']]))
                                                    {{ implode(', ', $submission->data[$field['name']]) }}
                                                @else
                                                    {{ $submission->data[$field['name']] }}
                                                @endif
                                            @else
                                                <span class="text-gray-400">-</span>
                                            @endif
                                        </td>
                                    @endforeach
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ $submission->created_at->format('d/m/Y H:i') }}
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                @if ($submissions->hasPages())
                    <div class="px-6 py-4 border-t border-gray-200 bg-white">
                        <div class="flex items-center justify-center">
                            {{ $submissions->appends(request()->except('page'))->links() }}
                        </div>
                    </div>
                @endif
            </div>
        @endif
    </div>

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Setup CSV export
            const downloadCsvBtn = document.getElementById('downloadCsvBtn');
            if (downloadCsvBtn) {
                downloadCsvBtn.addEventListener('click', function() {
                    // Prepare CSV data
                    let csvContent = [];

                    // Add BOM for Excel to recognize UTF-8
                    let csvString = '\ufeff';

                    // Add headers row
                    let headers = ['#'];
                    @foreach ($form->fields as $field)
                        headers.push('{{ $field['label'] }}');
                    @endforeach
                    headers.push('Fecha');

                    // Process each cell to handle commas and quotes properly
                    const processCell = function(cell) {
                        if (cell === null || cell === undefined) {
                            return '';
                        }
                        // Convert to string
                        cell = String(cell);
                        // If cell contains commas, quotes, or newlines, enclose in quotes
                        if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
                            // Replace any quotes with double quotes (CSV standard)
                            return '"' + cell.replace(/"/g, '""') + '"';
                        }
                        return cell;
                    };

                    // Add headers to CSV
                    csvString += headers.map(processCell).join(',') + '\r\n';

                    // Add data rows
                    @foreach ($submissions as $index => $submission)
                        let row = [];
                        row.push('{{ $submissions->firstItem() + $index }}');

                        @foreach ($form->fields as $field)
                            @if (isset($submission->data[$field['name']]))
                                @if (is_array($submission->data[$field['name']]))
                                    row.push(processCell(
                                        '{{ implode(', ', $submission->data[$field['name']]) }}'));
                                @else
                                    row.push(processCell('{{ $submission->data[$field['name']] }}'));
                                @endif
                            @else
                                row.push('');
                            @endif
                        @endforeach

                        row.push(processCell('{{ $submission->created_at->format('d/m/Y H:i') }}'));
                        csvString += row.join(',') + '\r\n';
                    @endforeach

                    // Create download link with correct encoding
                    // Using Blob instead of data URI for better handling of large files and encoding
                    const blob = new Blob([csvString], {
                        type: 'text/csv;charset=utf-8;'
                    });
                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.setAttribute('href', url);
                    link.setAttribute('download', '{{ $form->title }}_respuestas.csv');
                    document.body.appendChild(link);

                    // Trigger download and clean up
                    link.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(link);
                });
            }
        });
    </script>
@endsection
@endsection
