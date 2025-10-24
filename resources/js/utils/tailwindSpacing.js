/**
 * Tailwind spacing editor with white color scheme
 */
export function setupTailwindSpacingEditor(editor) {
    // Add button to editor panel for spacing
    editor.Panels.addButton("options", {
        id: "tailwind-spacing",
        className: "fa fa-th-large",
        command: {
            run: function (editor) {
                openSpacingDialog(editor);
            },
        },
        attributes: {
            title: "Espaciado",
        },
    });

    // Add button to editor panel for text styling
    editor.Panels.addButton("options", {
        id: "tailwind-text",
        className: "fa fa-font",
        command: {
            run: function (editor) {
                openTextStyleDialog(editor);
            },
        },
        attributes: {
            title: "Estilo de texto",
        },
    });

    // Add necessary styles
    addEditorStyles();
}

/**
 * Open spacing dialog
 */
function openSpacingDialog(editor) {
    const component = editor.getSelected();
    if (!component) return;

    // Get current classes
    const currentClasses = component.getClasses() || [];

    // Extract current spacing classes
    const spacingValues = extractSpacingClasses(currentClasses);

    // Create and open modal
    editor.Modal.open({
        title: "Espaciado Tailwind",
        content: createSpacingDialogHTML(spacingValues),
    }).onceClose(() => {
        // When modal closes, make sure component is properly updated
        editor.refresh();
    });

    // After modal is opened, setup event handlers
    setTimeout(() => {
        setupSpacingDialogEvents(editor, component, currentClasses);
        setupModalScrolling();
    }, 100);
}

/**
 * Open text styling dialog
 */
function openTextStyleDialog(editor) {
    const component = editor.getSelected();
    if (!component) return;

    // Check if component is a text component
    if (!isTextComponent(component)) {
        editor.Modal.open({
            title: "Error",
            content:
                '<div style="padding: 20px;">El componente seleccionado no es un elemento de texto</div>',
        });
        return;
    }

    // Get current classes
    const currentClasses = component.getClasses() || [];

    // Extract current text styling classes
    const textAlignValue = extractTextAlignClass(currentClasses);
    const textSizeValue = extractTextSizeClass(currentClasses);
    const textColorValue = extractTextColorClass(currentClasses);

    // Find and remove responsive text size classes
    const responsiveSizes = findResponsiveTextSizes(currentClasses);

    // Create and open modal
    editor.Modal.open({
        title: "Estilo de Texto Tailwind",
        content: createTextStyleDialogHTML(
            textAlignValue,
            textSizeValue,
            textColorValue,
            responsiveSizes,
        ),
    }).onceClose(() => {
        // When modal closes, make sure component is properly updated
        editor.refresh();
    });

    // After modal is opened, setup event handlers
    setTimeout(() => {
        setupTextStyleDialogEvents(editor, component, currentClasses);
        setupModalScrolling();
    }, 100);
}

/**
 * Setup fixed header/footer with scrollable content
 */
function setupModalScrolling() {
    const modalDialog = document.querySelector(".gjs-mdl-dialog");
    const modalHeader = document.querySelector(".gjs-mdl-header");
    const modalContent = document.querySelector(".gjs-mdl-content");

    if (!modalDialog || !modalHeader || !modalContent) return;

    // Make the modal have a max height
    modalDialog.classList.add("tw-modal-fixed-layout");

    // Find action buttons container
    const actionsContainer =
        document.querySelector(".tw-spacing-actions") ||
        document.querySelector(".tw-text-actions");
    if (actionsContainer) {
        // Move actions outside of scrollable area
        actionsContainer.classList.add("tw-modal-footer");
        modalContent.parentNode.insertBefore(
            actionsContainer,
            modalContent.nextSibling,
        );
    }

    // Make content scrollable
    modalContent.classList.add("tw-modal-scrollable");

    // Calculate max height for content area
    const windowHeight = window.innerHeight;
    const headerHeight = modalHeader.offsetHeight;
    const footerHeight = actionsContainer ? actionsContainer.offsetHeight : 0;
    const padding = 40; // Additional padding

    // Set max height for content area
    modalContent.style.maxHeight = `${windowHeight - headerHeight - footerHeight - padding}px`;
}

/**
 * Extract spacing classes
 */
function extractSpacingClasses(classes) {
    const spacingMap = {};
    const spacingPrefixes = [
        "p",
        "pt",
        "pr",
        "pb",
        "pl",
        "px",
        "py",
        "m",
        "mt",
        "mr",
        "mb",
        "ml",
        "mx",
        "my",
    ];

    spacingPrefixes.forEach((prefix) => {
        const regex = new RegExp(`^${prefix}-([0-9]+|auto)$`);
        const foundClass = classes.find((cls) => regex.test(cls));

        if (foundClass) {
            const value = foundClass.replace(`${prefix}-`, "");
            spacingMap[prefix] = value;
        }
    });

    return spacingMap;
}

/**
 * Extract text alignment class
 */
function extractTextAlignClass(classes) {
    const alignmentClasses = [
        "text-left",
        "text-center",
        "text-right",
        "text-justify",
    ];
    return classes.find((cls) => alignmentClasses.includes(cls)) || "";
}

/**
 * Extract text size class
 */
function extractTextSizeClass(classes) {
    const sizeClasses = [
        "text-xs",
        "text-sm",
        "text-base",
        "text-lg",
        "text-xl",
        "text-2xl",
        "text-3xl",
        "text-4xl",
        "text-5xl",
        "text-6xl",
    ];
    return (
        classes.find(
            (cls) => sizeClasses.includes(cls) && !cls.includes(":"),
        ) || ""
    );
}

/**
 * Find responsive text size classes
 */
function findResponsiveTextSizes(classes) {
    const breakpoints = ["sm", "md", "lg", "xl", "2xl"];
    const sizes = [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
    ];

    const responsiveSizes = {};

    breakpoints.forEach((bp) => {
        const bpRegex = new RegExp(`^${bp}:text-(${sizes.join("|")})$`);
        const foundClass = classes.find((cls) => bpRegex.test(cls));

        if (foundClass) {
            responsiveSizes[bp] = foundClass;
        }
    });

    return responsiveSizes;
}

/**
 * Extract text color class
 */
function extractTextColorClass(classes) {
    // Common Tailwind color patterns
    const colorRegex =
        /^text-(primary|gray|black|white|blue|green|red|yellow|orange|purple|indigo|pink|teal|cyan|gray|slate|zinc|neutral|stone|red|rose|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink)(?:-(\d+))?$/;
    return classes.find((cls) => colorRegex.test(cls)) || "";
}

/**
 * Create spacing dialog HTML
 */
function createSpacingDialogHTML(spacingValues) {
    // Create spacing options
    const spacingOptions = [
        { value: "", label: "Ninguno" },
        { value: "0", label: "0" },
        { value: "1", label: "0.25rem (1)" },
        { value: "2", label: "0.5rem (2)" },
        { value: "3", label: "0.75rem (3)" },
        { value: "4", label: "1rem (4)" },
        { value: "5", label: "1.25rem (5)" },
        { value: "6", label: "1.5rem (6)" },
        { value: "8", label: "2rem (8)" },
        { value: "10", label: "2.5rem (10)" },
        { value: "12", label: "3rem (12)" },
        { value: "16", label: "4rem (16)" },
        { value: "20", label: "5rem (20)" },
        { value: "24", label: "6rem (24)" },
        { value: "32", label: "8rem (32)" },
        { value: "auto", label: "Auto" },
    ];

    const createSpacingSelect = (prefix, label) => {
        const options = spacingOptions
            .map(
                (opt) =>
                    `<option value="${opt.value}" ${spacingValues[prefix] === opt.value ? "selected" : ""}>${opt.label}</option>`,
            )
            .join("");

        return `
      <div class="tw-spacing-field">
        <label for="tw-${prefix}">${label}</label>
        <select id="tw-${prefix}" data-spacing="${prefix}">
          ${options}
        </select>
      </div>
    `;
    };

    return `
    <div class="tw-spacing-editor">
      <!-- Padding Section -->
      <div class="tw-spacing-section">
        <h3><i class="fa fa-expand"></i> Padding (relleno)</h3>
        
        <div class="tw-spacing-row tw-spacing-cols-3">
          ${createSpacingSelect("p", "Todos")}
          ${createSpacingSelect("px", "Horizontal")}
          ${createSpacingSelect("py", "Vertical")}
        </div>
        
        <div class="tw-spacing-row tw-spacing-cols-4">
          ${createSpacingSelect("pt", "Superior")}
          ${createSpacingSelect("pr", "Derecho")}
          ${createSpacingSelect("pb", "Inferior")}
          ${createSpacingSelect("pl", "Izquierdo")}
        </div>
      </div>
      
      <!-- Margin Section -->
      <div class="tw-spacing-section">
        <h3><i class="fa fa-arrows-alt"></i> Margin (margen)</h3>
        
        <div class="tw-spacing-row tw-spacing-cols-3">
          ${createSpacingSelect("m", "Todos")}
          ${createSpacingSelect("mx", "Horizontal")}
          ${createSpacingSelect("my", "Vertical")}
        </div>
        
        <div class="tw-spacing-row tw-spacing-cols-4">
          ${createSpacingSelect("mt", "Superior")}
          ${createSpacingSelect("mr", "Derecho")}
          ${createSpacingSelect("mb", "Inferior")}
          ${createSpacingSelect("ml", "Izquierdo")}
        </div>
      </div>
      
      <div class="tw-spacing-actions">
        <button id="tw-spacing-cancel" class="tw-spacing-btn tw-spacing-btn-cancel">Cancelar</button>
        <button id="tw-spacing-apply" class="tw-spacing-btn tw-spacing-btn-apply">Aplicar</button>
      </div>
    </div>
  `;
}

/**
 * Create text styling dialog HTML
 */
function createTextStyleDialogHTML(
    textAlignValue,
    textSizeValue,
    textColorValue,
    responsiveSizes,
) {
    // Define text size options
    const textSizes = [
        { value: "", label: "Predeterminado" },
        { value: "text-xs", label: "Extra pequeño" },
        { value: "text-sm", label: "Pequeño" },
        { value: "text-base", label: "Base" },
        { value: "text-lg", label: "Grande" },
        { value: "text-xl", label: "Extra grande" },
        { value: "text-2xl", label: "2XL" },
        { value: "text-3xl", label: "3XL" },
        { value: "text-4xl", label: "4XL" },
        { value: "text-5xl", label: "5XL" },
        { value: "text-6xl", label: "6XL" },
    ];

    // Define color options - focusing on primary and grays
    const textColors = [
        { value: "", label: "Predeterminado", hex: "#333333" },
        { value: "text-primary", label: "Primario", hex: "#23366A" },
        { value: "text-gray-600", label: "Gris 600", hex: "#4B5563" },
        { value: "text-gray-700", label: "Gris 700", hex: "#374151" },
        { value: "text-gray-800", label: "Gris 800", hex: "#1F2937" },
        { value: "text-gray-900", label: "Gris 900", hex: "#111827" },
        { value: "text-black", label: "Negro", hex: "#000000" },
        { value: "text-white", label: "Blanco", hex: "#FFFFFF" },
        { value: "text-blue-500", label: "Azul", hex: "#3B82F6" },
        { value: "text-red-500", label: "Rojo", hex: "#EF4444" },
        { value: "text-green-500", label: "Verde", hex: "#10B981" },
        { value: "text-yellow-500", label: "Amarillo", hex: "#F59E0B" },
    ];

    // Create text size options HTML
    const textSizeOptions = textSizes
        .map(
            (size) =>
                `<option value="${size.value}" ${textSizeValue === size.value ? "selected" : ""}>${size.label}</option>`,
        )
        .join("");

    // Create text color options HTML
    const textColorOptionsHTML = textColors
        .map(
            (color) => `
            <div class="tw-color-option ${textColorValue === color.value ? "active" : ""}" 
                 data-value="${color.value}" 
                 title="${color.label}">
                <span class="color-swatch" style="background-color: ${color.hex}"></span>
                <span class="color-label">${color.label}</span>
            </div>
        `,
        )
        .join("");

    // Create responsive sizes info if any
    const responsiveSizesInfo =
        Object.keys(responsiveSizes).length > 0
            ? `<div class="tw-responsive-notice">
            <div class="tw-notice-title">
                <i class="fa fa-exclamation-triangle"></i>
                <span>Tamaños responsivos detectados</span>
            </div>
            <div class="tw-responsive-sizes">
                ${Object.entries(responsiveSizes)
                    .map(
                        ([bp, cls]) =>
                            `<span class="tw-responsive-tag">${bp}:${cls.split(":")[1]}</span>`,
                    )
                    .join("")}
            </div>
            <div class="tw-notice-text">
                Se eliminarán estos tamaños responsivos al aplicar un tamaño único
            </div>
           </div>`
            : "";

    return `
    <div class="tw-text-style-editor">
      <!-- Text Alignment Section -->
      <div class="tw-spacing-section">
        <h3><i class="fa fa-align-left"></i> Alineación de Texto</h3>
        
        <div class="tw-text-align-controls">
          <div class="tw-text-align-options">
            <div class="tw-text-align-option ${textAlignValue === "text-left" ? "active" : ""}" data-value="text-left">
              <i class="fa fa-align-left"></i>
              <span>Izquierda</span>
            </div>
            <div class="tw-text-align-option ${textAlignValue === "text-center" ? "active" : ""}" data-value="text-center">
              <i class="fa fa-align-center"></i>
              <span>Centro</span>
            </div>
            <div class="tw-text-align-option ${textAlignValue === "text-right" ? "active" : ""}" data-value="text-right">
              <i class="fa fa-align-right"></i>
              <span>Derecha</span>
            </div>
            <div class="tw-text-align-option ${textAlignValue === "text-justify" ? "active" : ""}" data-value="text-justify">
              <i class="fa fa-align-justify"></i>
              <span>Justificado</span>
            </div>
          </div>
        </div>
        
        <input type="hidden" id="tw-text-align" value="${textAlignValue}">
      </div>
      
      <!-- Text Size Section -->
      <div class="tw-spacing-section">
        <h3><i class="fa fa-text-height"></i> Tamaño de Texto</h3>
        
        ${responsiveSizesInfo}
        
        <div class="tw-spacing-field">
          <select id="tw-text-size">
            ${textSizeOptions}
          </select>
        </div>
      </div>
      
      <!-- Text Color Section -->
      <div class="tw-spacing-section">
        <h3><i class="fa fa-palette"></i> Color de Texto</h3>
        
        <div class="tw-color-options">
            ${textColorOptionsHTML}
        </div>
        
        <input type="hidden" id="tw-text-color" value="${textColorValue}">
      </div>
      
      <div class="tw-spacing-actions">
        <button id="tw-text-cancel" class="tw-spacing-btn tw-spacing-btn-cancel">Cancelar</button>
        <button id="tw-text-apply" class="tw-spacing-btn tw-spacing-btn-apply">Aplicar</button>
      </div>
    </div>
  `;
}

/**
 * Setup spacing dialog events
 */
function setupSpacingDialogEvents(editor, component, originalClasses) {
    // Store original classes
    const originalClassesStr = originalClasses.join(" ");

    // Setup spacing select change handlers
    const spacingSelects = document.querySelectorAll("select[data-spacing]");
    spacingSelects.forEach((select) => {
        select.addEventListener("change", () => {
            previewChanges(editor, component, "spacing");
        });
    });

    // Setup cancel button
    const cancelBtn = document.getElementById("tw-spacing-cancel");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            // Restore original classes
            component.setClass(originalClasses);

            // Force update
            editor.select(component);

            // Close modal
            editor.Modal.close();
        });
    }

    // Setup apply button
    const applyBtn = document.getElementById("tw-spacing-apply");
    if (applyBtn) {
        applyBtn.addEventListener("click", () => {
            // Apply changes
            applySpacingChanges(editor, component);

            // Force update
            editor.select(component);

            // Close modal
            editor.Modal.close();
        });
    }
}

/**
 * Setup text styling dialog events
 */
function setupTextStyleDialogEvents(editor, component, originalClasses) {
    // Store original classes
    const originalClassesStr = originalClasses.join(" ");

    // Setup text alignment options
    const textAlignOptions = document.querySelectorAll(".tw-text-align-option");
    const textAlignInput = document.getElementById("tw-text-align");

    // Setup text alignment click handlers
    textAlignOptions.forEach((option) => {
        option.addEventListener("click", () => {
            // Remove active class from all options
            textAlignOptions.forEach((opt) => opt.classList.remove("active"));

            // Add active class to clicked option
            option.classList.add("active");

            // Update hidden input
            textAlignInput.value = option.getAttribute("data-value");

            // Preview change
            previewChanges(editor, component, "text");
        });
    });

    // Setup text size change handler
    const textSizeSelect = document.getElementById("tw-text-size");
    if (textSizeSelect) {
        textSizeSelect.addEventListener("change", () => {
            previewChanges(editor, component, "text");
        });
    }

    // Setup text color options
    const textColorOptions = document.querySelectorAll(".tw-color-option");
    const textColorInput = document.getElementById("tw-text-color");

    // Setup text color click handlers
    textColorOptions.forEach((option) => {
        option.addEventListener("click", () => {
            // Remove active class from all options
            textColorOptions.forEach((opt) => opt.classList.remove("active"));

            // Add active class to clicked option
            option.classList.add("active");

            // Update hidden input
            textColorInput.value = option.getAttribute("data-value");

            // Preview change
            previewChanges(editor, component, "text");
        });
    });

    // Setup cancel button
    const cancelBtn = document.getElementById("tw-text-cancel");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            // Restore original classes
            component.setClass(originalClasses);

            // Force update
            editor.select(component);

            // Close modal
            editor.Modal.close();
        });
    }

    // Setup apply button
    const applyBtn = document.getElementById("tw-text-apply");
    if (applyBtn) {
        applyBtn.addEventListener("click", () => {
            // Apply changes
            applyTextChanges(editor, component);

            // Force update
            editor.select(component);

            // Close modal
            editor.Modal.close();
        });
    }
}

/**
 * Preview changes to component
 */
function previewChanges(editor, component, type = "spacing") {
    // Get current classes
    let classes = [...component.getClasses()];

    if (type === "spacing") {
        // Update spacing classes
        classes = updateSpacingClasses(classes);
    } else if (type === "text") {
        // Update text styling classes
        classes = updateTextClasses(classes);
    }

    // Apply classes to component
    component.setClass(classes);

    // Force update in editor
    editor.select(component);
}

/**
 * Update spacing classes
 */
function updateSpacingClasses(classes) {
    // Get all spacing selects
    const spacingSelects = document.querySelectorAll("select[data-spacing]");

    // Process each spacing select
    spacingSelects.forEach((select) => {
        const prefix = select.getAttribute("data-spacing");
        const value = select.value;

        // Remove existing class with this prefix
        classes = classes.filter(
            (cls) => !cls.match(new RegExp(`^${prefix}-([0-9]+|auto)$`)),
        );

        // Add new class if value is set
        if (value) {
            classes.push(`${prefix}-${value}`);
        }
    });

    return classes;
}

/**
 * Update text styling classes
 */
function updateTextClasses(classes) {
    // Text alignment
    const textAlignInput = document.getElementById("tw-text-align");
    if (textAlignInput) {
        const textAlignValue = textAlignInput.value;

        // Remove existing text alignment classes
        const alignmentClasses = [
            "text-left",
            "text-center",
            "text-right",
            "text-justify",
        ];
        classes = classes.filter((cls) => !alignmentClasses.includes(cls));

        // Add new text alignment class if set
        if (textAlignValue) {
            classes.push(textAlignValue);
        }
    }

    // Text size
    const textSizeSelect = document.getElementById("tw-text-size");
    if (textSizeSelect) {
        const textSizeValue = textSizeSelect.value;

        // Remove existing text size classes (including responsive ones)
        const breakpoints = ["sm", "md", "lg", "xl", "2xl"];
        const sizeClasses = [
            "text-xs",
            "text-sm",
            "text-base",
            "text-lg",
            "text-xl",
            "text-2xl",
            "text-3xl",
            "text-4xl",
            "text-5xl",
            "text-6xl",
        ];

        // Remove non-responsive size classes
        classes = classes.filter((cls) => !sizeClasses.includes(cls));

        // Remove responsive size classes
        classes = classes.filter((cls) => {
            for (const bp of breakpoints) {
                if (cls.startsWith(`${bp}:text-`)) {
                    return false;
                }
            }
            return true;
        });

        // Add new text size class if set
        if (textSizeValue) {
            classes.push(textSizeValue);
        }
    }

    // Text color
    const textColorInput = document.getElementById("tw-text-color");
    if (textColorInput) {
        const textColorValue = textColorInput.value;

        // Remove existing text color classes
        classes = classes.filter(
            (cls) =>
                !cls.match(
                    /^text-(primary|gray|black|white|blue|green|red|yellow|orange|purple|indigo|pink|teal|cyan|gray|slate|zinc|neutral|stone|red|rose|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink)(?:-\d+)?$/,
                ),
        );

        // Add new text color class if set
        if (textColorValue) {
            classes.push(textColorValue);
        }
    }

    return classes;
}

/**
 * Apply spacing changes
 */
function applySpacingChanges(editor, component) {
    // Get current classes
    let classes = [...component.getClasses()];

    // Update spacing classes
    classes = updateSpacingClasses(classes);

    // Apply classes to component
    component.setClass(classes);
}

/**
 * Apply text styling changes
 */
function applyTextChanges(editor, component) {
    // Get current classes
    let classes = [...component.getClasses()];

    // Update text classes
    classes = updateTextClasses(classes);

    // Apply classes to component
    component.setClass(classes);
}

/**
 * Check if component is a text component
 */
function isTextComponent(component) {
    const textTags = [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "span",
        "div",
        "a",
        "button",
        "label",
        "li",
        "td",
        "th",
    ];
    const tag = component.get("tagName");

    return tag && textTags.includes(tag.toLowerCase());
}

/**
 * Add editor styles
 */
function addEditorStyles() {
    if (document.getElementById("tw-spacing-styles")) return;

    const style = document.createElement("style");
    style.id = "tw-spacing-styles";
    style.textContent = `
    /* Override GrapesJS modal styles for a clean white design */
    .gjs-mdl-dialog {
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1) !important;
      border-radius: 8px !important;
      background-color: #ffffff !important;
      color: #333333 !important;
    }
    
    .gjs-mdl-header {
      background-color: #ffffff !important;
      border-bottom: 1px solid #f0f0f0 !important;
      padding: 15px 20px !important;
      border-radius: 8px 8px 0 0 !important;
    }
    
    .gjs-mdl-title {
      font-size: 18px !important;
      font-weight: 600 !important;
      color: #333333 !important;
    }
    
    .gjs-mdl-btn-close {
      color: #999 !important;
      font-size: 20px !important;
    }
    
    .gjs-mdl-btn-close:hover {
      color: #333 !important;
    }
    
    .gjs-mdl-content {
      padding: 0 !important;
      background-color: #ffffff !important;
      border-radius: 0 0 8px 8px !important;
    }
    
    /* Modal fixed layout styles */
    .tw-modal-fixed-layout {
      display: flex !important;
      flex-direction: column !important;
      max-height: 85vh !important;
      height: auto !important;
    }
    
    .tw-modal-scrollable {
      overflow-y: auto !important;
      overflow-x: hidden !important;
      padding: 0 !important;
    }
    
    .tw-modal-footer {
      padding: 15px 20px !important;
      border-top: 1px solid #f0f0f0 !important;
      background-color: #ffffff !important;
      border-radius: 0 0 8px 8px !important;
      position: sticky !important;
      bottom: 0 !important;
      z-index: 1 !important;
      margin-top: auto !important;
    }
    
    /* Tailwind spacing editor styles */
    .tw-spacing-editor, .tw-text-style-editor {
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    
    .tw-spacing-section {
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .tw-spacing-section:last-of-type {
      margin-bottom: 10px;
      border-bottom: none;
    }
    
    .tw-spacing-section h3 {
      margin: 0 0 15px 0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .tw-spacing-section h3 i {
      color: #757575;
      font-size: 14px;
    }
    
    .tw-spacing-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 12px;
    }
    
    .tw-spacing-row:last-child {
      margin-bottom: 0;
    }
    
    .tw-spacing-cols-3 .tw-spacing-field {
      flex: 1;
      min-width: calc(33.333% - 10px);
    }
    
    .tw-spacing-cols-4 .tw-spacing-field {
      flex: 1;
      min-width: calc(25% - 10px);
    }
    
    .tw-spacing-field {
      display: flex;
      flex-direction: column;
    }
    
    .tw-spacing-field label {
      display: block;
      margin-bottom: 6px;
      font-size: 13px;
      color: #666;
      font-weight: 500;
    }
    
    .tw-spacing-field select {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      background-color: white;
      color: #333;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      transition: all 0.2s;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555555'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 8px center;
      background-size: 16px;
      padding-right: 30px;
    }
    
    .tw-spacing-field select:focus {
      border-color: #23366A;
      outline: none;
      box-shadow: 0 0 0 3px rgba(35, 54, 106, 0.1);
    }
    
    .tw-spacing-field select:hover {
      border-color: #ccc;
    }
    
    /* Text alignment styles */
    .tw-text-align-controls {
      margin-top: 10px;
    }
    
    .tw-text-align-options {
      display: flex;
      gap: 8px;
    }
    
    .tw-text-align-option {
      flex: 1;
      padding: 12px 8px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
      background-color: #fff;
    }
    
    .tw-text-align-option:hover {
      background-color: #f9f9f9;
      border-color: #d0d0d0;
    }
    
    .tw-text-align-option.active {
      background-color: #f0f7ff;
      border-color: #23366A;
    }
    
    .tw-text-align-option i {
      display: block;
      font-size: 18px;
      margin-bottom: 6px;
      color: #666;
    }
    
    .tw-text-align-option.active i {
      color: #23366A;
    }
    
    .tw-text-align-option span {
      display: block;
      font-size: 13px;
      color: #555;
    }
    
    .tw-text-align-option.active span {
      color: #23366A;
      font-weight: 500;
    }
    
    /* Color options */
    .tw-color-options {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }
    
    .tw-color-option {
      width: calc(16.666% - 10px);
      aspect-ratio: 1;
      position: relative;
      cursor: pointer;
      border-radius: 6px;
      overflow: hidden;
      border: 2px solid transparent;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .tw-color-option:hover {
      transform: scale(1.05);
    }
    
    .tw-color-option.active {
      border-color: #23366A;
      box-shadow: 0 0 0 2px rgba(35, 54, 106, 0.3);
    }
    
    .tw-color-option .color-swatch {
      width: 100%;
      height: 100%;
      display: block;
    }
    
    .tw-color-option .color-label {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      font-size: 10px;
      padding: 3px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    /* Responsive sizes notice */
    .tw-responsive-notice {
      margin-bottom: 15px;
      padding: 12px;
      background-color: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 6px;
      font-size: 13px;
    }
    
    .tw-notice-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      font-weight: 600;
      color: #92400e;
    }
    
    .tw-notice-title i {
      color: #d97706;
    }
    
    .tw-responsive-sizes {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 8px;
    }
    
    .tw-responsive-tag {
      display: inline-block;
      padding: 3px 8px;
      background-color: #f59e0b20;
      border: 1px solid #f59e0b40;
      border-radius: 4px;
      font-size: 12px;
      font-family: monospace;
      color: #92400e;
    }
    
    .tw-notice-text {
      color: #78350f;
      font-size: 12px;
    }
    
    /* Action buttons */
    .tw-spacing-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
    }
    
    .tw-spacing-btn {
      padding: 10px 18px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    
    .tw-spacing-btn-cancel {
      background-color: #f5f5f5;
      color: #555;
      border: 1px solid #e0e0e0;
    }
    
    .tw-spacing-btn-cancel:hover {
      background-color: #ebebeb;
    }
    
    .tw-spacing-btn-apply {
      background-color: #23366A;
      color: white;
    }
    
    .tw-spacing-btn-apply:hover {
      background-color: #1a2b4e;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    /* Responsive adjustments */
    @media (max-width: 480px) {
      .tw-spacing-cols-3 .tw-spacing-field,
      .tw-spacing-cols-4 .tw-spacing-field {
        min-width: 100%;
      }
      
      .tw-spacing-row {
        flex-direction: column;
        gap: 10px;
      }
      
      .tw-spacing-editor {
        padding: 15px;
      }
      
      .tw-text-align-option {
        padding: 8px 5px;
      }
      
      .tw-text-align-option i {
        font-size: 16px;
        margin-bottom: 4px;
      }
      
      .tw-text-align-option span {
        font-size: 11px;
      }
      
      .tw-color-option {
        width: calc(33.333% - 10px);
      }
    }
  `;

    document.head.appendChild(style);
}

/**
 * Cleanup function
 */
export function cleanupTailwindEditors() {
    const styles = document.getElementById("tw-spacing-styles");
    if (styles) {
        styles.parentNode.removeChild(styles);
    }
}
