/**
 * PDF Blocks - Creates components for displaying PDF files
 */
export default function loadPDFBlocks(editor) {
    const blockManager = editor.BlockManager;

    // Simple PDF viewer block
    blockManager.add("pdf-viewer-block", {
        label: "Visor PDF",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        media: '<i class="fa fa-file-pdf-o" style="font-size: 30px; display: block; margin: 0 auto;"></i>',
        content: `
        <div class="pdf-viewer-container bg-white shadow-lg rounded-lg overflow-hidden" data-gjs-type="pdf-viewer" style="min-height: 500px; width: 100%;">
            <div class="p-4 bg-primary text-white font-semibold flex justify-between items-center">
                <span class="pdf-title">Documento PDF</span>
            </div>
            <div class="pdf-placeholder flex flex-col items-center justify-center p-8 bg-gray-100 h-64">
                <i class="ri-file-pdf-line text-5xl text-gray-400 mb-3"></i>
                <p class="text-gray-500 text-center">Haga clic para seleccionar un archivo PDF</p>
            </div>
        </div>
        `,
    });

    // PDF with text block (two columns) - sin botón de descarga
    blockManager.add("pdf-with-text-block", {
        label: "PDF con Texto",
        category: "Secciones",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="2" y="4" width="9" height="16" fill="#e74c3c"/>
            <rect x="13" y="5" width="8" height="2" fill="#333"/>
            <rect x="13" y="9" width="7" height="1" fill="#777"/>
            <rect x="13" y="12" width="8" height="1" fill="#777"/>
            <rect x="13" y="15" width="6" height="1" fill="#777"/>
        </svg>`,
        content: `
        <section class="py-8 md:py-14 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex flex-col md:flex-row items-stretch gap-8 md:gap-12">
                    <div class="w-full md:w-1/2 flex flex-col justify-center">
                        <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">Título del Documento</h2>
                        <p class="text-gray-500 text-base md:text-lg mb-6 leading-relaxed">Descripción detallada del documento PDF. Puede incluir información sobre su contenido, propósito o instrucciones para el usuario.</p>
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="pdf-viewer-container bg-white shadow-lg rounded-lg overflow-hidden h-full" data-gjs-type="pdf-viewer">
                            <div class="p-4 bg-primary text-white font-semibold flex justify-between items-center">
                                <span class="pdf-title">Documento PDF</span>
                            </div>
                            <div class="pdf-placeholder flex flex-col items-center justify-center p-8 bg-gray-100 h-64">
                                <i class="ri-file-pdf-line text-5xl text-gray-400 mb-3"></i>
                                <p class="text-gray-500 text-center">Haga clic para seleccionar un archivo PDF</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
    });
}
