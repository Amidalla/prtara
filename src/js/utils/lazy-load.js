/**
 * Lozad load handler with support for <picture> + source[data-srcset].
 * Based on lozad default load().
 */
export function lazyLoad(element) {
    if (element.nodeName.toLowerCase() === "picture") {
        let img = element.querySelector("img");
        let append = false;

        if (img === null) {
            img = document.createElement("img");
            append = true;
        }

        if (element.getAttribute("data-alt")) {
            img.alt = element.getAttribute("data-alt");
        }

        if (append) {
            element.append(img);
        }
    }

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

    if (element.nodeName.toLowerCase() === "video" && !element.getAttribute("data-src")) {
        if (element.children) {
            const children = element.children;

            for (let i = 0; i <= children.length - 1; i++) {
                const childSrc = children[i].getAttribute("data-src");

                if (childSrc) {
                    children[i].src = childSrc;
                }
            }

            element.load();
        }
    }

    if (element.getAttribute("data-poster")) {
        element.poster = element.getAttribute("data-poster");
    }

    if (element.getAttribute("data-src")) {
        element.src = element.getAttribute("data-src");
    }

    if (element.getAttribute("data-srcset")) {
        element.setAttribute("srcset", element.getAttribute("data-srcset"));
    }

    let backgroundImageDelimiter = ",";

    if (element.getAttribute("data-background-delimiter")) {
        backgroundImageDelimiter = element.getAttribute("data-background-delimiter");
    }

    if (element.getAttribute("data-background-image")) {
        element.style.backgroundImage = `url('${element
            .getAttribute("data-background-image")
            .split(backgroundImageDelimiter)
            .join("'),url('")}')`;
    } else if (element.getAttribute("data-background-image-set")) {
        const imageSetLinks = element.getAttribute("data-background-image-set").split(backgroundImageDelimiter);
        let firstUrlLink = imageSetLinks[0].substr(0, imageSetLinks[0].indexOf(" ")) || imageSetLinks[0];
        firstUrlLink = firstUrlLink.indexOf("url(") === -1 ? `url(${firstUrlLink})` : firstUrlLink;

        if (imageSetLinks.length === 1) {
            element.style.backgroundImage = firstUrlLink;
        } else {
            element.setAttribute(
                "style",
                `${element.getAttribute("style") || ""}background-image: ${firstUrlLink}; background-image: -webkit-image-set(${imageSetLinks}); background-image: image-set(${imageSetLinks})`
            );
        }
    }

    if (element.getAttribute("data-toggle-class")) {
        element.classList.toggle(element.getAttribute("data-toggle-class"));
    }
}
