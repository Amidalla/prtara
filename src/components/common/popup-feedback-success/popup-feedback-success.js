import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

const POPUP_ID = "popup-feedback-success";

const fancyboxOptions = {
    closeButton: false
};

export const PopupFeedbackSuccess = {
    open() {
        const target = document.getElementById(POPUP_ID);
        if (!target) return;

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

export function popupFeedbackSuccess() {
    // API доступен через window.PopupFeedbackSuccess
}
