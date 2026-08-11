import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

const POPUP_ID = "popup-success";

const fancyboxOptions = {
    closeButton: false
};

function setTitle(title) {
    const titleEl = document.querySelector(`#${POPUP_ID} .title`);
    if (!titleEl || title == null || title === "") return;
    titleEl.textContent = title;
}

export const PopupSuccess = {
    open(options = {}) {
        const target = document.getElementById(POPUP_ID);
        if (!target) return;

        const title = typeof options === "string" ? options : options.title;
        setTitle(title);

        Fancybox.show(
            [
                {
                    src: `#${POPUP_ID}`,
                    type: "inline"
                }
            ],
            fancyboxOptions
        );
    },

    close() {
        Fancybox.close();
    }
};

/** @deprecated Используйте PopupSuccess */
export const PopupFeedbackSuccess = PopupSuccess;

export function popupSuccess() {
    // API: window.PopupSuccess.open() / .close()
    // open({ title: "Заказать звонок" }) — опциональный заголовок
}
