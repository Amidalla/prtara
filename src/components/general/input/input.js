import IMask from "imask";

export function input(context = document) {
    const roots = context.querySelectorAll('[data-mask="phone"]');
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const mask = IMask(root, {
            mask: "+{7} (000) 000-00-00",
            lazy: true,
            placeholderChar: "_"
        });

        root.addEventListener("destroy", () => mask.destroy(), { once: true });
    });
}
