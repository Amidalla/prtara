export function header(context = document) {
    const root = context.querySelector("header.header");
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";
    const controller = new AbortController();
    const { signal } = controller;

    const toggleSticky = () => {
        root.classList.toggle("is-sticky", window.scrollY > 0);
    };

    window.addEventListener("scroll", toggleSticky, { passive: true, signal });
    toggleSticky();

    const searchForm = root.querySelector(".header-search");
    const searchInput = searchForm?.querySelector('input[type="search"]');
    const searchClear = searchForm?.querySelector(".header-search-clear");

    if (searchInput && searchClear) {
        const toggleSearchClear = () => {
            searchClear.hidden = searchInput.value.length === 0;
        };

        searchInput.addEventListener("input", toggleSearchClear, { signal });

        searchClear.addEventListener(
            "click",
            () => {
                searchInput.value = "";
                toggleSearchClear();
                searchInput.focus();
                searchInput.dispatchEvent(new Event("input", { bubbles: true }));
            },
            { signal }
        );

        toggleSearchClear();
    }

    const phones = root.querySelector("[data-header-phones]");
    if (phones) {
        const toggle = phones.querySelector(".header-phones-toggle");
        const list = phones.querySelector(".header-phones-list");

        const closePhones = () => {
            phones.classList.remove("is-open");
            if (toggle) toggle.setAttribute("aria-expanded", "false");
            if (list) list.hidden = true;
        };

        const openPhones = () => {
            phones.classList.add("is-open");
            if (toggle) toggle.setAttribute("aria-expanded", "true");
            if (list) list.hidden = false;
        };

        toggle?.addEventListener(
            "click",
            (event) => {
                event.stopPropagation();
                if (phones.classList.contains("is-open")) {
                    closePhones();
                } else {
                    openPhones();
                }
            },
            { signal }
        );

        document.addEventListener(
            "click",
            (event) => {
                if (!phones.contains(event.target)) {
                    closePhones();
                }
            },
            { signal }
        );

        document.addEventListener(
            "keydown",
            (event) => {
                if (event.key === "Escape") {
                    closePhones();
                }
            },
            { signal }
        );
    }

    root.addEventListener("destroy", () => controller.abort(), { once: true });
}
