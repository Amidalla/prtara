export function menu(context = document) {
    const root = context.querySelector('[data-dropdown="menu"]');
    if (!root || root.dataset.init === "true") return;

    const menuToggles = context.querySelectorAll('[data-toggle="menu"]');
    const catalogToggles = context.querySelectorAll("[data-toggle-catalog]");
    if (!menuToggles.length) return;

    root.dataset.init = "true";

    const body = document.body;
    const overlay = document.querySelector(".overlay");
    const header = document.querySelector("header.header");
    const catalogMenu = header?.querySelector(".header-catalog-menu");
    const catalogHost = root.querySelector("#mobile-catalog-menu");
    const catalogBreakpoint = window.matchMedia("(max-width: 1023.98px)");
    const catalogMenuAnchor = document.createComment("header catalog menu");
    const controller = new AbortController();
    const { signal } = controller;
    const syncMenuOffset = () => {
        root.style.setProperty("--header-height", `${header?.getBoundingClientRect().height ?? 0}px`);
    };
    const headerObserver = header ? new ResizeObserver(syncMenuOffset) : null;
    const moveCatalogMenu = () => {
        if (!catalogMenu || !catalogHost) return;

        if (catalogBreakpoint.matches) {
            catalogHost.append(catalogMenu);
            return;
        }

        catalogMenuAnchor.after(catalogMenu);
    };

    catalogMenu?.after(catalogMenuAnchor);
    moveCatalogMenu();

    root.setAttribute("aria-hidden", "true");
    menuToggles.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    catalogToggles.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    syncMenuOffset();
    headerObserver?.observe(header);
    window.addEventListener("resize", syncMenuOffset, { signal });

    const open = (mode = "navigation") => {
        root.classList.add("is-open");
        root.classList.toggle("is-catalog", mode === "catalog");
        header?.classList.toggle("is-catalog", mode === "catalog");
        root.setAttribute("aria-hidden", "false");
        body.classList.add("is-fixed");
        overlay?.classList.add("is-active");
        menuToggles.forEach((btn) => {
            btn.classList.toggle("is-active", mode === "navigation");
            btn.setAttribute("aria-expanded", String(mode === "navigation"));
        });
        catalogToggles.forEach((btn) => {
            btn.setAttribute("aria-expanded", String(mode === "catalog"));
        });
    };

    const close = () => {
        if (root.contains(document.activeElement)) {
            menuToggles[0]?.focus();
        }

        root.classList.remove("is-open");
        root.classList.remove("is-catalog");
        header?.classList.remove("is-catalog");
        root.setAttribute("aria-hidden", "true");
        body.classList.remove("is-fixed");
        overlay?.classList.remove("is-active");
        menuToggles.forEach((btn) => {
            btn.classList.remove("is-active");
            btn.setAttribute("aria-expanded", "false");
        });
        catalogToggles.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    };

    const toggle = (e) => {
        e.preventDefault();

        if (root.classList.contains("is-open") && !root.classList.contains("is-catalog")) {
            close();
            return;
        }

        open();
    };

    const openCatalog = (e) => {
        if (!catalogBreakpoint.matches) return;
        e.preventDefault();

        if (root.classList.contains("is-open") && root.classList.contains("is-catalog")) {
            close();
            return;
        }

        open("catalog");
    };

    const onCatalogBreakpointChange = () => {
        close();
        moveCatalogMenu();
    };

    const onDocClick = (e) => {
        if (!document.contains(root)) return;
        if (e.target.closest('[data-dropdown="menu"], [data-toggle="menu"], [data-toggle-catalog]')) return;
        close();
    };

    const onEsc = (e) => {
        if (e.key === "Escape" && root.classList.contains("is-open")) {
            close();
        }
    };

    menuToggles.forEach((btn) => btn.addEventListener("click", toggle, { signal }));
    catalogToggles.forEach((btn) => btn.addEventListener("click", openCatalog, { signal }));
    overlay?.addEventListener("click", close, { signal });

    document.addEventListener("click", onDocClick, { signal });
    document.addEventListener("keydown", onEsc, { signal });
    catalogBreakpoint.addEventListener("change", onCatalogBreakpointChange);

    // авто-очистка при удалении компонента
    root.addEventListener(
        "destroy",
        () => {
            controller.abort();
            headerObserver?.disconnect();
            catalogBreakpoint.removeEventListener("change", onCatalogBreakpointChange);
            if (catalogMenu) catalogMenuAnchor.after(catalogMenu);
        },
        { once: true },
    );
}
