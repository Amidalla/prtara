export function footer(context = document) {
    const root = context.querySelector("footer.footer");
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";
    const controller = new AbortController();
    const { signal } = controller;

    root.querySelector("[data-scroll-top]")?.addEventListener(
        "click",
        () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        { signal }
    );

    root.addEventListener("destroy", () => controller.abort(), { once: true });
}
