import lozad from "lozad";
import { menu } from "../components/general/menu/menu.js";
import { form } from "../components/general/form/form.js";
import { input } from "../components/general/input/input.js";
import { select } from "../components/general/select/select.js";
import { inputFile } from "../components/general/input-file/input-file.js";
import { consentNotice } from "../components/general/consent-notice/consent-notice.js";
import { navigationMobile } from "../components/general/navigation-mobile/navigation-mobile.js";
import { popupCallback } from "../components/common/popup-callback/popup-callback.js";
import { popupFeedback } from "../components/common/popup-feedback/popup-feedback.js";
import {
    popupFeedbackSuccess,
    PopupFeedbackSuccess
} from "../components/common/popup-feedback-success/popup-feedback-success.js";
import { langSwitcher } from "../components/common/lang-switcher/lang-switcher.js";
import { header } from "../blocks/general/header/header.js";
import { footer } from "../blocks/general/footer/footer.js";
import { hero } from "../blocks/common/hero/hero.js";
import { partnersShort } from "../blocks/common/partners-short/partners-short.js";
import { worksShort } from "../blocks/common/works-short/works-short.js";
import { newsShort } from "../blocks/common/news-short/news-short.js";
import { showPopup } from "./utils/popup.js";
import { lazyLoad } from "./utils/lazy-load.js";

const components = [
    menu,
    form,
    input,
    select,
    inputFile,
    consentNotice,
    navigationMobile,
    popupCallback,
    popupFeedback,
    popupFeedbackSuccess,
    langSwitcher,
    header,
    footer,
    hero,
    partnersShort,
    worksShort,
    newsShort
];

function init(context = document) {
    components.forEach((fn) => fn(context));
}

document.addEventListener("DOMContentLoaded", () => {
    lozad(".lazy", {
        rootMargin: "1200px 1200px",
        threshold: 0.1,
        enableAutoReload: true,
        load: lazyLoad
    }).observe();

    init();
});

window.showPopup = showPopup;
window.PopupFeedbackSuccess = PopupFeedbackSuccess;

window.reinit = (context = document) => {
    init(context);
};
