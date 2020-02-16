import * as SITE from "../site";
import { h, render } from "preact";
import { log } from "userscripter";
import { only } from "ts-type-guards";
import { P, Preferences } from "~src/preferences";

export default () => {
    const forumPosts = document.getElementsByClassName(SITE.CLASS.forumPost);
    const bbQuotes = document.getElementsByClassName("bbQuote");

    for (const post of only(HTMLElement)(Array.from(forumPosts))) {
        try {
            const userId = JSON.parse(post.dataset.post || "").userid;
            const blockLevel = Preferences.get(P.general._.blocked_users)[userId] || 0;
            for (const i of Array(blockLevel).keys()) {
                post.classList.add(`isBlocked_${i + 1}`);
            }
            if (blockLevel >= 2) {
                const bottomRow = post.querySelector(".postBody .row:last-child");
                if (bottomRow === null) {
                    log.warning("something else happened");
                    continue;
                }
                render((
                    <td class="cell controls unblock">
                        <div class="btnGroup">
                            <span class="button" onClick={() => post.classList.remove("isBlocked_2")}>
                                <span class="icon"></span>
                                <span class="label">Visa inlägg</span>
                            </span>
                        </div>
                    </td>
                ), bottomRow);
            }
        } catch (_) {
            log.warning("Something Happened\nThis error message was brought to you by Microsoft");
        }
    }

    for (const quote of only(HTMLElement)(Array.from(bbQuotes))) {
        try {
            const scriptEl = quote.nextElementSibling;
            if (scriptEl === null) {
                log.warning("very not yes");
                continue;
            }
            const userId = JSON.parse(((scriptEl.textContent || "").match(/{\s*"[^}]+}/) || "")[0]).userid;
            const blockLevel = Preferences.get(P.general._.blocked_users)[userId] || 0;
            if (blockLevel) {
                quote.classList.add("isBlocked");
            }
        } catch (_) {
            log.warning("qwertyuiop");
        }
    }
}
