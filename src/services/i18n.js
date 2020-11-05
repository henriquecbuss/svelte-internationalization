import {
    get,
    derived,
    writable
} from "svelte/store";
import {
    _,
    date,
    init,
    time,
    number,
    locale,
    dictionary,
    addMessages,
    getLocaleFromNavigator
} from "svelte-i18n"
import {
    fallbackLocale,
    locales
} from "../config/l10n";

const MESSAGE_FILE_URL_TEMPLATE = "/lang/{locale}.json";

// Internal store for tracking network loading state
const isDownloading = writable(false);

let _activeLocale;


// If the svelte-i18n dictionary has an entry for the locale, then the locale
// has already been added
const hasLoadedLocale = locale => get(dictionary)[locale];

const loadJson = url => fetch(url).then((response) => response.json());

const setupI18n = (options = {}) => {
    // If we're given an explicit locale, we use it. Otherwise, we attempot to
    // auto-detect the user's locale
    const locale_ = supported(options.withLocale ||
        language(getLocaleFromNavigator()));

    // Initialize svelte-i18n
    init({
        initialLocale: locale_
    });

    // Don't redownload translation files
    if (!hasLoadedLocale(locale_)) {
        const messagesFileUrl = MESSAGE_FILE_URL_TEMPLATE.replace("{locale}",
            locale_)

        isDownloading.set(true);

        // Download translation file for given locale/language
        return loadJson(messagesFileUrl).then((messages) => {
            _activeLocale = locale_;

            // Configure svelte-i18n to use the locale
            addMessages(locale_, messages);

            locale.set(locale_);

            isDownloading.set(false);
        })
    }
}

const isLocaleLoaded = derived([isDownloading, dictionary],
    ([$isDownloading, $dictionary]) =>
    !$isDownloading &&
    $dictionary[_activeLocale] &&
    Object.keys($dictionary[_activeLocale]).length > 0);


// Extract the "en" bit from fully qualified locales, like "en-US"
const language = locale => locale.replace("_", "-").split("-")[0];

const supported = locale => Object.keys(locales).includes(locale) ?
    locale : fallbackLocale

// Get the direction (LTR or RTL) of the active locale
const dir = derived(locale, ($locale) => $locale === "ar" ? "rtl" : "ltr");


// Expose svelte-i18n's so there's only one API for i18n
export {
    _,
    dir,
    date,
    time,
    locale,
    number,
    setupI18n,
    isLocaleLoaded,
};