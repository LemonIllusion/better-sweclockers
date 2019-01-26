import * as SITE from "globals-site";
import * as CONFIG from "globals-config";
import { FAILURE, SUCCESS } from "lib/operation-manager";

export default () => {
    const forumPosts = document.getElementsByClassName(SITE.CLASS.forumPost);
    return Array.from(forumPosts).every(post => {
        const message = post.querySelector("." + SITE.CLASS.forumPostMessage);
        if (message === null) return FAILURE;
        // We ignore links whose textContent is literally m.sweclockers.com, to
        // avoid modifying the auto-generated notice in posts sent from the
        // mobile site. In other cases, such links are probably actually
        // intended to point to the mobile site anyway.
        //
        // We also only modify links that actually point to the mobile site.
        // Without this restriction, we would add an empty href attribute to
        // (for example) every .bbImage .clickArea.
        Array.from(message.getElementsByTagName("a"))
        .filter(a =>
            SITE.REGEX_MOBILE_LINK.test(a.href)
            &&
            a.textContent !== SITE.HOSTNAME_MOBILE
        )
        .forEach(a => {
            a.href = a.href.replace(SITE.REGEX_MOBILE_LINK, "$1" + SITE.HOSTNAME);
        });
        return SUCCESS;
    });
}