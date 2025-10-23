/**
 * Tailwind spacing and text alignment editor with white color scheme
 */
export function setupTailwindSpacingEditor(editor) {
    // Add button to editor panel
    editor.Panels.addButton("options", {
        id: "tailwind-spacing",
        className: "fa fa-th-large",
        command: {
            run: function (editor) {
                openSpacingDialog(editor);
            },
        },
        attributes: {
            title: "Espaciado y alineación",
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

    // Extract current text alignment
    const textAlignValue = extractTextAlignClass(currentClasses);

    // Create and open modal
    editor.Modal.open({
        title: "Espaciado y Alineación Tailwind",
        content: createDialogHTML(spacingValues, textAlignValue),
    }).onceClose(() => {
        // When modal closes, make sure component is properly updated
        editor.refresh();
    });

    // After modal is opened, setup event handlers
    setTimeout(() => {
        setupDialogEvents(editor, component, currentClasses);
    }, 100);
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
 * Create dialog HTML
 */
function createDialogHTML(spacingValues, textAlignValue) {
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
      
      <!-- Text Alignment Section -->
      <div class="tw-spacing-section" id="tw-text-section">
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
      
      <div class="tw-spacing-actions">
        <button id="tw-spacing-cancel" class="tw-spacing-btn tw-spacing-btn-cancel">Cancelar</button>
        <button id="tw-spacing-apply" class="tw-spacing-btn tw-spacing-btn-apply">Aplicar</button>
      </div>
    </div>
  `;
}

/**
 * Setup dialog events
 */
function setupDialogEvents(editor, component, originalClasses) {
    // Store original classes
    const originalClassesStr = originalClasses.join(" ");

    // Setup text alignment options
    const textSection = document.getElementById("tw-text-section");
    const textAlignOptions = document.querySelectorAll(".tw-text-align-option");
    const textAlignInput = document.getElementById("tw-text-align");

    // Check if component is a text component and hide text alignment if not
    if (!isTextComponent(component)) {
        textSection.style.display = "none";
    }

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
            previewChanges(editor, component);
        });
    });

    // Setup spacing select change handlers
    const spacingSelects = document.querySelectorAll("select[data-spacing]");
    spacingSelects.forEach((select) => {
        select.addEventListener("change", () => {
            previewChanges(editor, component);
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
            applyChanges(editor, component);

            // Force update
            editor.select(component);

            // Close modal
            editor.Modal.close();

            // Log action for debugging
            console.log(
                "Applied spacing changes. Original:",
                originalClassesStr,
                "New:",
                component.getClasses().join(" "),
            );
        });
    }
}

/**
 * Preview changes without closing modal
 */
function previewChanges(editor, component) {
    // Get updated classes
    const updatedClasses = getUpdatedClasses(component);

    // Apply to component
    component.setClass(updatedClasses);

    // Force update
    editor.select(component);
}

/**
 * Apply changes and close modal
 */
function applyChanges(editor, component) {
    // Get updated classes
    const updatedClasses = getUpdatedClasses(component);

    try {
        // Apply classes directly using DOM approach
        const el = component.view.el;
        if (el && el.classList) {
            // Clear all classes
            el.className = "";

            // Add updated classes
            updatedClasses.forEach((cls) => {
                el.classList.add(cls);
            });

            // Force update component with new classes from DOM
            component.setClass(Array.from(el.classList));
        } else {
            // Fallback if direct DOM manipulation fails
            component.setClass(updatedClasses);
        }

        // Force component update
        component.trigger("change:classes");
        editor.select(component);
    } catch (error) {
        console.error("Error updating classes:", error);

        // Fallback if there's an error
        component.setClass(updatedClasses);
        editor.select(component);
    }
}

/**
 * Get updated classes based on form values
 */
function getUpdatedClasses(component) {
    // Get current classes and filter out spacing and alignment
    const currentClasses = component.getClasses() || [];
    const filteredClasses = filterOutSpacingAndAlignment(currentClasses);

    // Get spacing classes from form
    const spacingClasses = collectSpacingClasses();

    // Get text alignment from form
    const textAlignInput = document.getElementById("tw-text-align");
    const textAlignClass =
        textAlignInput && textAlignInput.value ? textAlignInput.value : "";

    // Combine classes
    const updatedClasses = [...filteredClasses, ...spacingClasses];

    // Add text alignment if present
    if (textAlignClass) {
        updatedClasses.push(textAlignClass);
    }

    return updatedClasses;
}

/**
 * Filter out spacing and alignment classes
 */
function filterOutSpacingAndAlignment(classes) {
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
    const alignmentClasses = [
        "text-left",
        "text-center",
        "text-right",
        "text-justify",
    ];

    return classes.filter((cls) => {
        // Check if it's a spacing class
        const isSpacingClass = spacingPrefixes.some((prefix) => {
            const regex = new RegExp(`^${prefix}-(\\d+|auto)$`);
            return regex.test(cls);
        });

        // Check if it's an alignment class
        const isAlignmentClass = alignmentClasses.includes(cls);

        // Keep class only if it's not spacing or alignment
        return !isSpacingClass && !isAlignmentClass;
    });
}

/**
 * Collect spacing classes from form
 */
function collectSpacingClasses() {
    const spacingClasses = [];
    const spacingSelects = document.querySelectorAll("select[data-spacing]");

    spacingSelects.forEach((select) => {
        const spacing = select.getAttribute("data-spacing");
        const value = select.value;

        if (value) {
            spacingClasses.push(`${spacing}-${value}`);
        }
    });

    return spacingClasses;
}

/**
 * Check if component is text-based
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
    
    /* Tailwind spacing editor styles */
    .tw-spacing-editor {
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
    }
  `;

    document.head.appendChild(style);
}

/**
 * Cleanup function
 */
export function cleanupTailwindSpacingEditor() {
    const styles = document.getElementById("tw-spacing-styles");
    if (styles) {
        styles.parentNode.removeChild(styles);
    }
}
