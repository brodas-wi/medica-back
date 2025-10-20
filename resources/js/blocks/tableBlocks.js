import { showAlert } from "../toast";

/**
 * Table blocks for GrapesJS with modal configuration interface
 */
export default function loadTableBlocks(editor) {
    const blockManager = editor.BlockManager;
    let currentEditingTable = null;

    // Basic table block
    blockManager.add("basic-table", {
        label: "Tabla Básica",
        category: "Tablas",
        attributes: { class: "gjs-block-section" },
        media: `<svg viewBox="0 0 24 24" width="32" height="32">
            <rect x="0" y="0" width="24" height="24" fill="white" rx="2"/>
            <rect x="2" y="4" width="20" height="16" rx="1" stroke="#23366A" stroke-width="1" fill="none"/>
            <line x1="2" y1="8" x2="22" y2="8" stroke="#23366A" stroke-width="1"/>
            <line x1="12" y1="4" x2="12" y2="20" stroke="#23366A" stroke-width="1"/>
            <rect x="2" y="4" width="20" height="4" fill="#23366A"/>
        </svg>`,
        content: {
            type: "custom-table",
            rows: 5,
            columns: 2,
            padding: "md",
            layout: "auto",
            header: ["Descripción", "Valor por IVA"],
            headerAlign: ["left", "right"],
            data: [
                ["Cargo mensual por servicio*", "$1.00"],
                ["Reposición por extravío, pérdida o robo", "$3.25"],
                ["Reposición por deterioro", "$3.25"],
                ["Por cada transacción en exceso", "$1.25"],
                ["Por cada retiro a nivel internacional en ATM", "$3.00"],
            ],
            dataAlign: [
                ["left", "right"],
                ["left", "right"],
                ["left", "right"],
                ["left", "right"],
                ["left", "right"],
            ],
        },
    });

    // Show alert when a table is added
    editor.on("component:add", (component) => {
        if (component.get("type") === "custom-table") {
            if (!component.get("_tableInitialized")) {
                component.set("_tableInitialized", true);
                setTimeout(() => {
                    showAlert(
                        "Tabla agregada. Usa el botón 'Configurar Tabla' en el panel de ajustes para personalizar la estructura y contenido.",
                        "info",
                        5000,
                    );
                }, 500);
            }
        }
    });

    // Define the table component
    editor.DomComponents.addType("custom-table", {
        isComponent: (el) =>
            el.tagName === "DIV" && el.classList.contains("table-wrapper"),
        model: {
            defaults: {
                tagName: "div",
                droppable: false,
                rows: 3,
                columns: 2,
                padding: "md",
                layout: "auto",
                header: ["Header 1", "Header 2"],
                headerAlign: ["left", "left"],
                data: [
                    ["Cell 1,1", "Cell 1,2"],
                    ["Cell 2,1", "Cell 2,2"],
                    ["Cell 3,1", "Cell 3,2"],
                ],
                dataAlign: [
                    ["left", "left"],
                    ["left", "left"],
                    ["left", "left"],
                ],
                traits: [
                    {
                        type: "button",
                        label: "Tabla",
                        text: "Configurar",
                        full: true,
                        command: "open-table-config",
                    },
                ],
                classes: [
                    "table-wrapper",
                    "overflow-x-auto",
                    "my-8",
                    "rounded-2xl",
                    "shadow-md",
                ],
            },
            toHTML() {
                const tableData = this.getTableData();
                const tableHtml = this.get("components")
                    .map((comp) => comp.toHTML())
                    .join("");

                return `<div class="table-wrapper overflow-x-auto my-8 rounded-2xl shadow-md" 
                                data-gjs-type="custom-table"
                                data-table-json='${JSON.stringify(tableData).replace(/'/g, "&apos;")}'>
                            ${tableHtml}
                        </div>`;
            },
            init() {
                this.listenTo(editor, "component:selected", this.checkSelected);
                this.on(
                    "change:rows change:columns change:padding change:layout change:header change:data change:headerAlign change:dataAlign",
                    this.updateHTML,
                );
                this.on("change", this.handleChange);

                // Generate HTML on init
                this.updateHTML();
            },
            updateHTML() {
                const rows = this.get("rows");
                const columns = this.get("columns");
                const padding = this.get("padding");
                const layout = this.get("layout");
                const header = this.get("header") || [];
                const headerAlign = this.get("headerAlign") || [];
                const data = this.get("data") || [];
                const dataAlign = this.get("dataAlign") || [];

                // Normalize header and data to match column count
                const normalizedHeader = [...header];
                while (normalizedHeader.length < columns) {
                    normalizedHeader.push(
                        `Header ${normalizedHeader.length + 1}`,
                    );
                }
                if (normalizedHeader.length > columns) {
                    normalizedHeader.length = columns;
                }

                // Normalize header alignment
                const normalizedHeaderAlign = [...headerAlign];
                while (normalizedHeaderAlign.length < columns) {
                    normalizedHeaderAlign.push("left");
                }
                if (normalizedHeaderAlign.length > columns) {
                    normalizedHeaderAlign.length = columns;
                }

                // Normalize data and data alignment
                const normalizedData = [];
                const normalizedDataAlign = [];

                for (let i = 0; i < rows; i++) {
                    const rowData = data[i] ? [...data[i]] : [];
                    const rowAlign = dataAlign[i] ? [...dataAlign[i]] : [];

                    // Ensure each row has correct number of columns
                    while (rowData.length < columns) {
                        rowData.push(`Cell ${i + 1},${rowData.length + 1}`);
                    }
                    if (rowData.length > columns) {
                        rowData.length = columns;
                    }

                    // Ensure each row's alignment has correct number of columns
                    while (rowAlign.length < columns) {
                        rowAlign.push("left");
                    }
                    if (rowAlign.length > columns) {
                        rowAlign.length = columns;
                    }

                    normalizedData.push(rowData);
                    normalizedDataAlign.push(rowAlign);
                }

                // Save normalized data back to the model
                this.set("header", normalizedHeader, { silent: true });
                this.set("headerAlign", normalizedHeaderAlign, {
                    silent: true,
                });
                this.set("data", normalizedData, { silent: true });
                this.set("dataAlign", normalizedDataAlign, { silent: true });

                // Generate HTML
                const paddingClass =
                    {
                        xs: "p-1",
                        sm: "p-2",
                        md: "p-3",
                        lg: "p-4",
                    }[padding] || "p-3";

                const layoutClass = layout === "fixed" ? "table-fixed" : "";

                let html = `<table class="w-full border-collapse border border-gray-200 ${layoutClass}">
                                <thead>
                                    <tr>`;

                // Generate header cells
                for (let i = 0; i < columns; i++) {
                    const content = normalizedHeader[i];
                    const align = normalizedHeaderAlign[i];
                    const alignClass =
                        align === "center"
                            ? "text-center"
                            : align === "right"
                              ? "text-right"
                              : "text-left";

                    html += `<th class="bg-primary text-white font-semibold ${alignClass} ${paddingClass} border-b border-r border-gray-200 border-opacity-20 last:border-r-0">${content}</th>`;
                }

                html += `</tr>
                    </thead>
                    <tbody>`;

                // Generate data rows
                for (let i = 0; i < rows; i++) {
                    const rowClass = i % 2 === 1 ? "bg-gray-50" : "";
                    html += `<tr class="${rowClass}">`;

                    for (let j = 0; j < columns; j++) {
                        const content = normalizedData[i][j];
                        const align = normalizedDataAlign[i][j];
                        const alignClass =
                            align === "center"
                                ? "text-center"
                                : align === "right"
                                  ? "text-right"
                                  : "text-left";

                        html += `<td class="text-gray-600 ${alignClass} ${paddingClass} border-b border-r border-gray-200 last:border-r-0">${content}</td>`;
                    }

                    html += "</tr>";
                }

                html += `</tbody>
                    </table>`;

                // Update the component's content
                this.components(html);
            },
            handleChange() {
                // Update internal data based on the HTML content if needed
            },
            checkSelected(model) {
                if (model === this) {
                    // This component has been selected
                }
            },
            getTableData() {
                return {
                    rows: this.get("rows"),
                    columns: this.get("columns"),
                    padding: this.get("padding"),
                    layout: this.get("layout"),
                    header: this.get("header"),
                    headerAlign: this.get("headerAlign"),
                    data: this.get("data"),
                    dataAlign: this.get("dataAlign"),
                };
            },
            setTableData(data) {
                this.set(data);
            },
        },
        view: {
            init() {
                this.listenTo(
                    this.model,
                    "change:rows change:columns change:padding change:layout change:header change:data change:headerAlign change:dataAlign",
                    this.render,
                );
                this.listenTo(this.model, "active", this.onActive);
            },
            events: {
                "dblclick td": "editCell",
                "dblclick th": "editCell",
            },
            onRender() {
                this.el.classList.add("group", "relative");
            },
            onActive() {
                // Highlight the component when active
            },
            openConfigModal(e) {
                if (e) e.stopPropagation();
                currentEditingTable = this.model;
                editor.runCommand("open-table-config");
            },
            editCell(e) {
                const cell = e.target;
                cell.contentEditable = true;
                cell.focus();

                // Save changes when focus is lost
                const onBlur = () => {
                    cell.contentEditable = false;
                    cell.removeEventListener("blur", onBlur);

                    // Update data in the model
                    this.updateCellContent(cell);
                };

                cell.addEventListener("blur", onBlur);

                // Also save on Enter key
                cell.addEventListener("keydown", function (e) {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        cell.blur();
                    }
                });
            },
            updateCellContent(cell) {
                const isHeader = cell.tagName.toLowerCase() === "th";
                const tableData = this.model.getTableData();

                if (isHeader) {
                    // Find index of the header cell
                    const headerCells = this.el.querySelectorAll("th");
                    const index = Array.from(headerCells).indexOf(cell);

                    if (index !== -1 && tableData.header) {
                        tableData.header[index] = cell.textContent;
                        this.model.set("header", tableData.header);
                    }
                } else {
                    // Find row and column index
                    const rowIndex = Array.from(
                        this.el.querySelectorAll("tbody tr"),
                    ).indexOf(cell.parentNode);
                    const colIndex = Array.from(
                        cell.parentNode.children,
                    ).indexOf(cell);

                    if (
                        rowIndex !== -1 &&
                        colIndex !== -1 &&
                        tableData.data &&
                        tableData.data[rowIndex]
                    ) {
                        tableData.data[rowIndex][colIndex] = cell.textContent;
                        this.model.set("data", tableData.data);
                    }
                }
            },
        },
    });

    editor.on("component:selected", (component) => {
        if (component.get("type") === "custom-table") {
            // Forzar actualización de HTML si es necesario
            if (!component.components().length) {
                component.trigger("change:rows");
            }
        }
    });

    // Add command to open table configuration modal
    editor.Commands.add("open-table-config", {
        run(editor) {
            if (!window.Swal) {
                console.error(
                    "SweetAlert2 is required for table configuration modal",
                );
                return;
            }

            const selectedComponent = editor.getSelected();
            if (
                !selectedComponent ||
                selectedComponent.get("type") !== "custom-table"
            ) {
                console.error("No table selected for editing");
                return;
            }

            currentEditingTable = selectedComponent;

            const tableData = currentEditingTable.getTableData();

            // Build table data editor HTML
            let tableEditorHtml = `
            <div class="table-config-modal">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Filas</label>
                        <div class="flex items-center">
                            <input type="number" id="table-rows" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${tableData.rows}" min="1" max="50">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Columnas</label>
                        <div class="flex items-center">
                            <input type="number" id="table-columns" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${tableData.columns}" min="1" max="10">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Espaciado</label>
                        <div class="flex items-center">
                            <select id="table-padding" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="xs" ${tableData.padding === "xs" ? "selected" : ""}>Muy pequeño</option>
                                <option value="sm" ${tableData.padding === "sm" ? "selected" : ""}>Pequeño</option>
                                <option value="md" ${tableData.padding === "md" ? "selected" : ""}>Medio</option>
                                <option value="lg" ${tableData.padding === "lg" ? "selected" : ""}>Grande</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Diseño</label>
                        <div class="flex items-center">
                            <select id="table-layout" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                                <option value="auto" ${tableData.layout === "auto" ? "selected" : ""}>Automático</option>
                                <option value="fixed" ${tableData.layout === "fixed" ? "selected" : ""}>Ancho fijo</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="mb-6">
                    <div class="flex items-center mb-2">
                        <label class="block text-sm font-medium text-gray-700">Encabezados</label>
                    </div>
                    <div class="grid grid-cols-1 gap-2" id="header-inputs">`;

            // Generate header inputs
            for (let i = 0; i < tableData.columns; i++) {
                const headerValue = tableData.header[i] || `Header ${i + 1}`;
                const headerAlign = tableData.headerAlign[i] || "left";

                tableEditorHtml += `
                <div class="flex gap-2">
                    <input type="text" class="header-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${headerValue}">
                    <select class="header-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="left" ${headerAlign === "left" ? "selected" : ""}><i class="ri-align-left"></i> Izq</option>
                        <option value="center" ${headerAlign === "center" ? "selected" : ""}><i class="ri-align-center"></i> Centro</option>
                        <option value="right" ${headerAlign === "right" ? "selected" : ""}><i class="ri-align-right"></i> Der</option>
                    </select>
                </div>`;
            }

            tableEditorHtml += `
                    </div>
                </div>
                
                <div class="mb-4">
                    <div class="flex items-center mb-2">
                        <label class="block text-sm font-medium text-gray-700">Contenido</label>
                    </div>
                    <div class="grid grid-cols-1 gap-4" id="rows-container">`;

            // Generate data inputs for each row
            for (let i = 0; i < tableData.rows; i++) {
                tableEditorHtml += `
                <div class="border border-gray-200 p-3 rounded bg-gray-50">
                    <div class="flex items-center mb-2">
                        <p class="text-sm font-medium">Fila ${i + 1}</p>
                        ${i % 2 === 1 ? '<span class="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">Fila con fondo</span>' : ""}
                    </div>
                    <div class="grid grid-cols-1 gap-2 row-inputs">`;

                for (let j = 0; j < tableData.columns; j++) {
                    const cellValue =
                        (tableData.data[i] && tableData.data[i][j]) ||
                        `Cell ${i + 1},${j + 1}`;
                    const cellAlign =
                        (tableData.dataAlign[i] && tableData.dataAlign[i][j]) ||
                        "left";

                    tableEditorHtml += `
                    <div class="flex gap-2">
                        <input type="text" class="cell-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${cellValue}">
                        <select class="cell-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                            <option value="left" ${cellAlign === "left" ? "selected" : ""}>Izq</option>
                            <option value="center" ${cellAlign === "center" ? "selected" : ""}>Centro</option>
                            <option value="right" ${cellAlign === "right" ? "selected" : ""}>Der</option>
                        </select>
                    </div>`;
                }

                tableEditorHtml += `
                    </div>
                </div>`;
            }

            tableEditorHtml += `
                    </div>
                </div>
            </div>`;

            // Show SweetAlert2 modal
            Swal.fire({
                title: "Configurar Tabla",
                html: tableEditorHtml,
                width: "800px",
                showCloseButton: false,
                showCancelButton: true,
                confirmButtonText: "Guardar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#23366A",
                customClass: {
                    title: "text-lg font-bold mb-0 pb-0",
                    htmlContainer: "max-h-[70vh] overflow-y-auto",
                    popup: "swal2-custom-popup",
                    actions: "sticky bottom-0 bg-white py-3 shadow-inner",
                },
                didOpen: () => {
                    const style = document.createElement("style");
                    style.textContent = `
                        .swal2-custom-popup {
                            padding-top: 0.5rem;
                            padding-bottom: 0px;
                            display: flex;
                            flex-direction: column;
                        }
                        .swal2-html-container {
                            margin-top: 0px;
                        }
                        .swal2-custom-popup .swal2-title {
                            margin-top: 0;
                        }
                        .swal2-title {
                            padding: 0px;
                        }
                        .swal2-actions {
                            margin-top: 0px;
                        }
                        .swal2-custom-popup .swal2-html-container {
                            margin-top: 0.5rem;
                            overflow-y: auto;
                            max-height: 70vh;
                        }
                    `;
                    document.head.appendChild(style);
                    // Add event listeners for rows/columns changes
                    const rowsInput = document.getElementById("table-rows");
                    const columnsInput =
                        document.getElementById("table-columns");

                    rowsInput.addEventListener("change", () =>
                        updateTableEditor(),
                    );
                    columnsInput.addEventListener("change", () =>
                        updateTableEditor(),
                    );

                    function updateTableEditor() {
                        const rows = parseInt(rowsInput.value) || 1;
                        const columns = parseInt(columnsInput.value) || 1;

                        // Update header inputs
                        const headerInputs =
                            document.getElementById("header-inputs");
                        let headerHtml = "";

                        for (let i = 0; i < columns; i++) {
                            const headerValue =
                                i < tableData.header.length
                                    ? tableData.header[i]
                                    : `Header ${i + 1}`;
                            const headerAlign =
                                i < tableData.headerAlign.length
                                    ? tableData.headerAlign[i]
                                    : "left";

                            headerHtml += `
                            <div class="flex gap-2">
                                <input type="text" class="header-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${headerValue}">
                                <select class="header-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                                    <option value="left" ${headerAlign === "left" ? "selected" : ""}>Izq</option>
                                    <option value="center" ${headerAlign === "center" ? "selected" : ""}>Centro</option>
                                    <option value="right" ${headerAlign === "right" ? "selected" : ""}>Der</option>
                                </select>
                            </div>`;
                        }

                        headerInputs.innerHTML = headerHtml;

                        // Update row inputs
                        const rowsContainer =
                            document.getElementById("rows-container");
                        let rowsHtml = "";

                        for (let i = 0; i < rows; i++) {
                            rowsHtml += `
                            <div class="border border-gray-200 p-3 rounded bg-gray-50">
                                <div class="flex items-center mb-2">
                                    <p class="text-sm font-medium">Fila ${i + 1}</p>
                                    ${i % 2 === 1 ? '<span class="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">Fila con fondo</span>' : ""}
                                </div>
                                <div class="grid grid-cols-1 gap-2 row-inputs">`;

                            for (let j = 0; j < columns; j++) {
                                const cellValue =
                                    i < tableData.data.length &&
                                    j < tableData.data[i].length
                                        ? tableData.data[i][j]
                                        : `Cell ${i + 1},${j + 1}`;
                                const cellAlign =
                                    i < tableData.dataAlign.length &&
                                    j < tableData.dataAlign[i].length
                                        ? tableData.dataAlign[i][j]
                                        : "left";

                                rowsHtml += `
                                <div class="flex gap-2">
                                    <input type="text" class="cell-content flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${cellValue}">
                                    <select class="cell-align w-24 px-2 py-2 border border-gray-300 rounded-md shadow-sm">
                                        <option value="left" ${cellAlign === "left" ? "selected" : ""}>Izq</option>
                                        <option value="center" ${cellAlign === "center" ? "selected" : ""}>Centro</option>
                                        <option value="right" ${cellAlign === "right" ? "selected" : ""}>Der</option>
                                    </select>
                                </div>`;
                            }

                            rowsHtml += `
                                </div>
                            </div>`;
                        }

                        rowsContainer.innerHTML = rowsHtml;
                    }
                },
                preConfirm: () => {
                    // Get values from the form
                    const rows =
                        parseInt(document.getElementById("table-rows").value) ||
                        3;
                    const columns =
                        parseInt(
                            document.getElementById("table-columns").value,
                        ) || 2;
                    const padding =
                        document.getElementById("table-padding").value;
                    const layout =
                        document.getElementById("table-layout").value;

                    // Get header values
                    const headerInputs = document.querySelectorAll(
                        "#header-inputs .header-content",
                    );
                    const headerAlignSelects = document.querySelectorAll(
                        "#header-inputs .header-align",
                    );

                    const header = [];
                    const headerAlign = [];

                    headerInputs.forEach((input) => {
                        header.push(input.value);
                    });

                    headerAlignSelects.forEach((select) => {
                        headerAlign.push(select.value);
                    });

                    // Get cell values
                    const rowsData = [];
                    const rowsAlign = [];

                    const rowContainers = document.querySelectorAll(
                        "#rows-container > div",
                    );

                    rowContainers.forEach((rowContainer) => {
                        const cellInputs =
                            rowContainer.querySelectorAll(".cell-content");
                        const cellAlignSelects =
                            rowContainer.querySelectorAll(".cell-align");

                        const rowData = [];
                        const rowAlign = [];

                        cellInputs.forEach((input) => {
                            rowData.push(input.value);
                        });

                        cellAlignSelects.forEach((select) => {
                            rowAlign.push(select.value);
                        });

                        rowsData.push(rowData);
                        rowsAlign.push(rowAlign);
                    });

                    // Return the collected data
                    return {
                        rows,
                        columns,
                        padding,
                        layout,
                        header,
                        headerAlign,
                        data: rowsData,
                        dataAlign: rowsAlign,
                    };
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    // Update table with the new data
                    currentEditingTable.setTableData(result.value);
                }
            });
        },
    });

    // Add CSS for table styling in the editor
    editor.on("load", function () {
        const frame = editor.Canvas.getFrameEl();
        if (frame && frame.contentDocument) {
            const styleEl = frame.contentDocument.createElement("style");
            styleEl.innerHTML = `
                .bg-primary { background-color: #23366A !important; }
                .text-primary { color: #23366A !important; }
                .border-primary { border-color: #23366A !important; }
                
                /* Add hover effect for the settings button */
                .table-wrapper:hover .config-table-button {
                    opacity: 1 !important;
                }
                
                /* Make cells with table-fixed layout handle overflow better */
                .table-fixed td, .table-fixed th { 
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                /* Style for editable cells */
                .table-wrapper th[contenteditable="true"], 
                .table-wrapper td[contenteditable="true"] {
                    outline: 2px solid #4F87FF;
                    outline-offset: -2px;
                }
            `;
            frame.contentDocument.head.appendChild(styleEl);
        }
    });

    // Handle component serialization and loading
    editor.DomComponents.addType("div", {
        model: {
            defaults: {
                tagName: "div",
            },
            // Reemplaza alrededor de la línea 545
            init() {
                // Primero verifica si esta es una tabla por sus clases
                if (this.getClasses().includes("table-wrapper")) {
                    // Establece el tipo inmediatamente
                    this.set("type", "custom-table");

                    const el = this.getEl();
                    if (el && el.getAttribute) {
                        try {
                            // Intenta obtener los datos de la tabla del atributo JSON
                            const tableJsonAttr =
                                el.getAttribute("data-table-json");

                            if (tableJsonAttr) {
                                const tableData = JSON.parse(tableJsonAttr);

                                // Establece todas las propiedades necesarias
                                this.set({
                                    rows: parseInt(tableData.rows) || 3,
                                    columns: parseInt(tableData.columns) || 2,
                                    padding: tableData.padding || "md",
                                    layout: tableData.layout || "auto",
                                    header: Array.isArray(tableData.header)
                                        ? tableData.header
                                        : [],
                                    headerAlign: Array.isArray(
                                        tableData.headerAlign,
                                    )
                                        ? tableData.headerAlign
                                        : [],
                                    data: Array.isArray(tableData.data)
                                        ? tableData.data
                                        : [],
                                    dataAlign: Array.isArray(
                                        tableData.dataAlign,
                                    )
                                        ? tableData.dataAlign
                                        : [],
                                });

                                // Fuerza una actualización del HTML después de un retraso
                                setTimeout(() => {
                                    this.trigger("change:rows");
                                }, 300);
                            }
                        } catch (e) {
                            console.error("Error loading table data:", e);
                        }
                    }
                }
            },
        },
    });

    // Before save, find all tables and save their data
    editor.on("storage:before", (obj) => {
        const tables = [];
        editor.getComponents().forEach((component) => {
            if (component.get("type") === "custom-table") {
                const tableData = component.getTableData();

                tables.push({
                    id: component.getId(),
                    data: {
                        rows: parseInt(tableData.rows) || 3,
                        columns: parseInt(tableData.columns) || 2,
                        padding: tableData.padding || "md",
                        layout: tableData.layout || "auto",
                        header: Array.isArray(tableData.header)
                            ? tableData.header
                            : [],
                        headerAlign: Array.isArray(tableData.headerAlign)
                            ? tableData.headerAlign
                            : [],
                        data: Array.isArray(tableData.data)
                            ? tableData.data
                            : [],
                        dataAlign: Array.isArray(tableData.dataAlign)
                            ? tableData.dataAlign
                            : [],
                    },
                });

                const tableJson = JSON.stringify(
                    tables[tables.length - 1].data,
                );
                component.set("attributes", {
                    ...component.get("attributes"),
                    "data-table-json": tableJson,
                });
            }
        });

        window.grapesJsCustomTableData = tables;
    });

    // Restore table data after load
    editor.on("load", () => {
        setTimeout(() => {
            editor.getComponents().forEach((component) => {
                if (component.get("type") === "custom-table") {
                    const el = component.getEl();
                    if (el && el.getAttribute) {
                        try {
                            const tableJsonAttr =
                                el.getAttribute("data-table-json");
                            if (tableJsonAttr) {
                                const tableData = JSON.parse(tableJsonAttr);

                                component.set({
                                    rows: parseInt(tableData.rows) || 3,
                                    columns: parseInt(tableData.columns) || 2,
                                    padding: tableData.padding || "md",
                                    layout: tableData.layout || "auto",
                                    header: Array.isArray(tableData.header)
                                        ? tableData.header
                                        : [],
                                    headerAlign: Array.isArray(
                                        tableData.headerAlign,
                                    )
                                        ? tableData.headerAlign
                                        : [],
                                    data: Array.isArray(tableData.data)
                                        ? tableData.data
                                        : [],
                                    dataAlign: Array.isArray(
                                        tableData.dataAlign,
                                    )
                                        ? tableData.dataAlign
                                        : [],
                                });

                                component.trigger("change:rows");
                            }
                        } catch (e) {
                            console.error(
                                "Error loading table data from attribute:",
                                e,
                            );
                        }
                    }
                }
            });
        }, 1000);
    });
}
