import { Fancybox, galleryFancyboxOptions } from "../../../js/utils/fancybox.js";

export function certificates(context = document) {
    const root = context.querySelector("[data-certificates]");
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    Fancybox.bind(root, "[data-fancybox]", {
        ...galleryFancyboxOptions,
        groupAll: true
    });

    root.addEventListener(
        "destroy",
        () => {
            Fancybox.unbind(root);
            Fancybox.close();
        },
        { once: true }
    );
}
