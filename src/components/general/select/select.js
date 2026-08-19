import { bind as niceSelectBind } from "nice-select2";

export function select(context = document) {
    const roots = context.querySelectorAll(".select");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const selects = root.querySelectorAll("select");
        const niceSelectInstances = [];

        selects.forEach((selectEl) => {
            const placeholder = root.dataset.placeholder || "";
            const instance = niceSelectBind(selectEl, {
                searchable: false,
                placeholder
            });
            niceSelectInstances.push(instance);
        });

        root.addEventListener(
            "destroy",
            () => {
                niceSelectInstances.forEach((instance) => instance.destroy());
            },
            { once: true }
        );
    });
}
