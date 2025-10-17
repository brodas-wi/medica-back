import { showAlert } from "./toast";

/**
 * Initialize flash messages from session
 */
export function initFlashMessages() {
    // Process flash messages placed as hidden elements in the DOM
    const processFlashMessages = () => {
        const successEl = document.getElementById("flash-success");
        const errorEl = document.getElementById("flash-error");
        const warningEl = document.getElementById("flash-warning");
        const infoEl = document.getElementById("flash-info");

        if (successEl && successEl.dataset.message) {
            showAlert(successEl.dataset.message, "success");
        }

        if (errorEl && errorEl.dataset.message) {
            showAlert(errorEl.dataset.message, "error");
        }

        if (warningEl && warningEl.dataset.message) {
            showAlert(warningEl.dataset.message, "warning");
        }

        if (infoEl && infoEl.dataset.message) {
            showAlert(infoEl.dataset.message, "info");
        }
    };

    // Process messages when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", processFlashMessages);
    } else {
        processFlashMessages();
    }
}
