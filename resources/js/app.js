import "./bootstrap";
import "./toast";
import Swal from "sweetalert2";
import { initFlashMessages } from "./flash-messages";

// Initialize flash messages when the DOM is ready
initFlashMessages();

/**
 * Shows a delete confirmation dialog with context-aware messages
 */
window.confirmDelete = function (itemName, formElement, itemType = "elemento") {
    let message;

    // Determine message based on current URL path
    if (window.location.pathname.includes("/pages")) {
        message = `¿Deseas eliminar la página <strong>${itemName}</strong>?`;
        itemType = "página";
    } else if (window.location.pathname.includes("/users")) {
        message = `¿Deseas eliminar al usuario <strong>${itemName}</strong>?`;
        itemType = "usuario";
    } else if (window.location.pathname.includes("/roles")) {
        message = `¿Deseas eliminar el rol <strong>${itemName}</strong>?`;
        itemType = "rol";
    } else {
        message = `¿Deseas eliminar este ${itemType} <strong>${itemName}</strong>?`;
    }

    // Show SweetAlert confirmation dialog
    Swal.fire({
        title: "¿Estás seguro?",
        html: message,
        icon: "warning",
        iconColor: "#dc2626",
        showCancelButton: true,
        confirmButtonText: `Sí, eliminar`,
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        focusCancel: true,
        buttonsStyling: true,
        confirmButtonColor: "#23366A",
        cancelButtonColor: "#dc2626",
        padding: "1.5rem",
        width: "auto",
        showClass: {
            popup: "swal2-show",
            backdrop: "swal2-backdrop-show",
            icon: "swal2-icon-show",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            // Show loading overlay and submit form when confirmed
            const loadingOverlay = document.getElementById("loading-overlay");
            if (loadingOverlay) {
                loadingOverlay.style.display = "flex";
            }
            formElement.submit();
        }
    });
};

/**
 * Adds loading indicator for form submissions
 */
window.setupLoadingIndicator = function (formId) {
    const form = document.getElementById(formId);
    const loadingOverlay = document.getElementById("loading-overlay");

    if (form && loadingOverlay) {
        form.addEventListener("submit", function () {
            loadingOverlay.style.display = "flex";
        });
    }
};

// Initialize toggle switches when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const toggleCheckbox = document.getElementById('is_active');
    const toggleStatus = document.getElementById('toggle-status');

    if (toggleCheckbox && toggleStatus) {
        toggleCheckbox.addEventListener('change', function() {
            toggleStatus.textContent = this.checked ? 'Activo' : 'Inactivo';
        });
    }
});

// Global SweetAlert2 configuration
Swal.mixin({
    customClass: {
        title: "text-lg font-bold text-gray-900",
        htmlContainer: "text-base text-gray-700 mt-4 mb-4",
    },
});

// Make Swal globally available
window.Swal = Swal;
