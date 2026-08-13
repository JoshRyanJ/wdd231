import { initFooterDate, initNavToggle } from "./shared.js";

document.addEventListener("DOMContentLoaded", () => {
    initFooterDate();
    initNavToggle();

    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toString();
    }
});