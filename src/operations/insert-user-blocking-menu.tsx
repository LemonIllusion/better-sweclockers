import { h, render } from "preact";
import { P, Preferences } from "~src/preferences";
import * as SITE from "../site";

const blockLevelToStringOrWhatever = [
    "Inte blockerad",
    "Rödmarkera inläggshuvuden",
    "Dölj inläggsinnehåll",
    "Dölj hela inlägg",
];

export default (e: { menuSection: HTMLElement }) => {
    render((
        <h5 title="Blockera">Blockera</h5>
    ), e.menuSection);

    const p = P.general._.blocked_users;
    const blocked = Preferences.get(p);
    const userId = +(document.location.pathname.match(SITE.PATH.MEMBER_PROFILE) || "")[1];
    const blockLevel = blocked[userId] || 0;
    render((
        <ul class="menuItems">
            <li class="menuItem">
                (Under utveckling)
            </li>
            <li class="menuItem">
                <input type="range" min="0" max="3" value={blockLevel} onInput={e => {
                    const blockLevel = +(e.target as HTMLInputElement).value;
                    if (blockLevel) {
                        blocked[userId] = blockLevel;
                    } else {
                        delete blocked[userId];
                    }
                    Preferences.set(p, blocked);
                    (document.getElementById("BSC_block_status") as HTMLSpanElement).textContent = blockLevelToStringOrWhatever[blockLevel];
                }}></input>
                <span id="BSC_block_status">{blockLevelToStringOrWhatever[blockLevel]}</span>
            </li>
        </ul>
    ), e.menuSection);
}
