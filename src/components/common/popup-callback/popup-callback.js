import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export function popupCallback(context = document) {
    const popup = context.querySelector("#popup-callback");
    const titleEl = popup?.querySelector(".heading .title");
    const defaultTitle = titleEl?.textContent?.trim() || "Заказать звонок";
    const triggers = context.querySelectorAll('*[data-src="popup-callback"]');
    if (!triggers.length) return;

    triggers.forEach((item) => {
        if (item.dataset.init === "true") return;
        item.dataset.init = "true";

        const controller = new AbortController();
        const { signal } = controller;

        item.addEventListener(
            "click",
            (e) => {
                e.preventDefault();

                if (titleEl) {
                    titleEl.textContent = item.dataset.popupTitle || defaultTitle;
                }

                Fancybox.show(
                    [
                        {
                            src: "#popup-callback",
                            type: "inline"
                        }
                    ],
                    {
                        closeButton: false,
                        on: {
                            destroy: () => {
                                if (titleEl) {
                                    titleEl.textContent = defaultTitle;
                                }
                            }
                        }
                    }
                );
            },
            { signal }
        );

        item.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}
