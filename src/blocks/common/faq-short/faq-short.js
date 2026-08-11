export function faqShort(context = document) {
    const roots = context.querySelectorAll("[data-faq-short]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const items = root.querySelectorAll(".faq-item");
        if (!items.length) return;

        const controller = new AbortController();
        const { signal } = controller;

        const setOpen = (item, open) => {
            const trigger = item.querySelector(".faq-trigger");
            if (!trigger) return;

            item.classList.toggle("is-open", open);
            trigger.setAttribute("aria-expanded", open ? "true" : "false");
        };

        items.forEach((item) => {
            const trigger = item.querySelector(".faq-trigger");
            if (!trigger) return;

            trigger.addEventListener(
                "click",
                () => {
                    const willOpen = !item.classList.contains("is-open");

                    items.forEach((other) => {
                        if (other !== item) setOpen(other, false);
                    });

                    setOpen(item, willOpen);
                },
                { signal }
            );
        });

        root.addEventListener(
            "destroy",
            () => {
                controller.abort();
            },
            { once: true }
        );
    });
}
