import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

/**
 * Show a notification alert using Toastify
 * @param {string} message - The message to display
 * @param {string} type - Alert type: success, error, warning, info
 * @param {number} duration - How long to display the toast (in ms)
 */
export function showAlert(message, type = "success", duration = 3000) {
    // Define colors for different alert types
    const backgrounds = {
        success: "#4caf50", // Soft green
        error: "#f44336", // Soft red
        warning: "#ff9800", // Soft orange
        info: "#2196f3", // Soft blue
    };

    Toastify({
        text: message,
        duration: duration,
        gravity: "bottom",
        position: "right",
        style: {
            background: backgrounds[type],
        },
        stopOnFocus: true,
        className: `toast-${type}`,
        onClick: function () {},
    }).showToast();
}

// Make the function available globally
window.showAlert = showAlert;
