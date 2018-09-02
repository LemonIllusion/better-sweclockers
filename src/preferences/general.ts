import * as T from "../text";
import {
    BooleanPreference,
    MultichoicePreference,
} from "ts-preferences";

export const enum SearchEngine {
    // Be careful! This mapping to URLs IS meaningful.
    GOOGLE = "https://google.com/search?q=",
    DUCKDUCKGO = "https://duckduckgo.com/?q=",
}

export default {
    lock_heights: new BooleanPreference({
        key: "lock_heights",
        default: true,
        label: T.preferences.general.lock_heights,
    }),
    disable_scroll_restoration: new BooleanPreference({
        key: "disable_scroll_restoration",
        default: false,
        label: T.preferences.general.disable_scroll_restoration,
    }),
    prevent_accidental_signout: new BooleanPreference({
        key: "prevent_accidental_signout",
        default: true,
        label: T.preferences.general.prevent_accidental_signout,
    }),
    prevent_accidental_unload: new BooleanPreference({
        key: "prevent_accidental_unload",
        default: true,
        label: T.preferences.general.prevent_accidental_unload,
    }),
    compact_layout: new BooleanPreference({
        key: "compact_layout",
        default: true,
        label: T.preferences.general.compact_layout,
    }),
    improved_corrections: new BooleanPreference({
        key: "improved_corrections",
        default: true,
        label: T.preferences.general.improved_corrections,
    }),
    highlight_own_posts: new BooleanPreference({
        key: "highlight_own_posts",
        default: true,
        label: T.preferences.general.highlight_own_posts,
    }),
    hide_image_controls: new BooleanPreference({
        key: "hide_image_controls",
        default: true,
        label: T.preferences.general.hide_image_controls,
    }),
    hide_carousel: new BooleanPreference({
        key: "hide_carousel",
        default: false,
        label: T.preferences.general.hide_carousel,
    }),
    place_caret_at_end: new BooleanPreference({
        key: "place_caret_at_end",
        default: true,
        label: T.preferences.general.place_caret_at_end,
    }),
    remember_caret_position: new BooleanPreference({
        key: "remember_caret_position",
        default: true,
        label: T.preferences.general.remember_caret_position,
    }),
    search_engine: new MultichoicePreference({
        key: "search_engine",
        default: SearchEngine.GOOGLE,
        label: T.preferences.general.search_engine.label,
        options: [
            {
                value: SearchEngine.GOOGLE,
                label: T.preferences.general.search_engine.google,
            },
            {
                value: SearchEngine.DUCKDUCKGO,
                label: T.preferences.general.search_engine.duckduckgo,
            },
        ],
    }),
}
