/**
 * Lozad load handler for img / picture (data-src, data-srcset).
 */
export function lazyLoad(element) {
    const picture =
        element.nodeName.toLowerCase() === "picture"
            ? element
            : element.parentElement?.nodeName.toLowerCase() === "picture"
              ? element.parentElement
              : null;

    if (picture) {
        picture.querySelectorAll("source[data-srcset]").forEach((source) => {
            source.setAttribute("srcset", source.getAttribute("data-srcset"));
        });
    }

    if (element.getAttribute("data-src")) {
        element.src = element.getAttribute("data-src");
    }

    if (element.getAttribute("data-srcset")) {
        element.setAttribute("srcset", element.getAttribute("data-srcset"));
    }
}
