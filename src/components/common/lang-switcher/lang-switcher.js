/**
 * Только UI дропдауна. Перевод — модуль Битрикс redslash.translatorjs
 * (клик по [data-translatorjs-lang] не перехватываем).
 */
export function langSwitcher(context = document) {
    const roots = context.querySelectorAll("[data-lang-switcher]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const controller = new AbortController();
        const { signal } = controller;
        const toggle = root.querySelector(".lang-switcher-toggle");
        const list = root.querySelector(".lang-switcher-list");

        const close = () => {
            root.classList.remove("is-open");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
            if (list) list.hidden = true;
        };

        const open = () => {
            root.classList.add("is-open");
            if (toggle) toggle.setAttribute("aria-expanded", "true");
            if (list) list.hidden = false;
        };

        toggle?.addEventListener(
            "click",
            (event) => {
                event.stopPropagation();
                if (root.classList.contains("is-open")) {
                    close();
                } else {
                    open();
                }
            },
            { signal }
        );

        // После выбора языка модулем — закрываем список, не мешая клику
        list?.addEventListener(
            "click",
            (event) => {
                if (event.target.closest("[data-translatorjs-lang]")) {
                    close();
                }
            },
            { signal }
        );

        document.addEventListener(
            "click",
            (event) => {
                if (!root.contains(event.target)) {
                    close();
                }
            },
            { signal }
        );

        document.addEventListener(
            "keydown",
            (event) => {
                if (event.key === "Escape") {
                    close();
                }
            },
            { signal }
        );

        root.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}
