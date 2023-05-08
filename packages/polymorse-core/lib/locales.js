'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

class LOCALES {
    constructor() {

        this._primary = {
            af: "af-ZA",
            ar: "ar",
            bg: "bg-BG",
            ca: "ca-AD",
            cs: "cs-CZ",
            cy: "cy-GB",
            da: "da-DK",
            de: "de-DE",
            el: "el-GR",
            en: "en-US",
            es: "es-ES",
            et: "et-EE",
            eu: "eu",
            fa: "fa-IR",
            fi: "fi-FI",
            fr: "fr-FR",
            he: "he-IL",
            hi: "hi-IN",
            hr: "hr-HR",
            hu: "hu-HU",
            id: "id-ID",
            is: "is-IS",
            it: "it-IT",
            ja: "ja-JP",
            km: "km-KH",
            ko: "ko-KR",
            la: "la",
            lt: "lt-LT",
            lv: "lv-LV",
            mn: "mn-MN",
            nb: "nb-NO",
            nl: "nl-NL",
            nn: "nn-NO",
            pl: "pl-PL",
            pt: "pt-PT",
            ro: "ro-RO",
            ru: "ru-RU",
            sk: "sk-SK",
            sl: "sl-SI",
            sr: "sr-RS",
            sv: "sv-SE",
            th: "th-TH",
            tr: "tr-TR",
            uk: "uk-UA",
            vi: "vi-VN",
            zh: "zh-CN"
        };

        let list = [
            Object.freeze({ id: "af-ZA", o: "Afrikaans", name: "Afrikaans" }),
            Object.freeze({ id: "ar", o: "العربية", name: "Arabic" }),
            Object.freeze({ id: "bg-BG", o: "Български", name: "Bulgarian" }),
            Object.freeze({ id: "ca-AD", o: "Català", name: "Catalan" }),
            Object.freeze({ id: "cs-CZ", o: "Čeština", name: "Czech" }),
            Object.freeze({ id: "cy-GB", o: "Cymraeg", name: "Welsh" }),
            Object.freeze({ id: "da-DK", o: "Dansk", name: "Danish" }),
            Object.freeze({ id: "de-AT", o: "Deutsch (Österreich)", name: "German (Austria)" }),
            Object.freeze({ id: "de-CH", o: "Deutsch (Schweiz)", name: "German (Switzerland)" }),
            Object.freeze({ id: "de-DE", o: "Deutsch (Deutschland)", name: "German (Germany)" }),
            Object.freeze({ id: "el-GR", o: "Ελληνικά", name: "Greek" }),
            Object.freeze({ id: "en-GB", o: "English (UK)", name: "English (UK)" }),
            Object.freeze({ id: "en-US", o: "English (US)", name: "English (US)" }),
            Object.freeze({ id: "es-CL", o: "Español (Chile)", name: "Spanish (Chile)" }),
            Object.freeze({ id: "es-ES", o: "Español (España)", name: "Spanish (Spain)" }),
            Object.freeze({ id: "es-MX", o: "Español (México)", name: "Spanish (Mexico)" }),
            Object.freeze({ id: "et-EE", o: "Eesti keel", name: "Estonian" }),
            Object.freeze({ id: "eu", o: "Euskara", name: "Basque" }),
            Object.freeze({ id: "fa-IR", o: "فارسی", name: "Persian" }),
            Object.freeze({ id: "fi-FI", o: "Suomi", name: "Finnish" }),
            Object.freeze({ id: "fr-CA", o: "Français (Canada)", name: "French (Canada)" }),
            Object.freeze({ id: "fr-FR", o: "Français (France)", name: "French (France)" }),
            Object.freeze({ id: "he-IL", o: "עברית", name: "Hebrew" }),
            Object.freeze({ id: "hi-IN", o: "हिंदी", name: "Hindi" }),
            Object.freeze({ id: "hr-HR", o: "Hrvatski", name: "Croatian" }),
            Object.freeze({ id: "hu-HU", o: "Magyar", name: "Hungarian" }),
            Object.freeze({ id: "id-ID", o: "Bahasa Indonesia", name: "Indonesian" }),
            Object.freeze({ id: "is-IS", o: "Íslenska", name: "Icelandic" }),
            Object.freeze({ id: "it-IT", o: "Italiano", name: "Italian" }),
            Object.freeze({ id: "ja-JP", o: "日本語", name: "Japanese" }),
            Object.freeze({ id: "km-KH", o: "ភាសាខ្មែរ", name: "Khmer" }),
            Object.freeze({ id: "ko-KR", o: "한국어", name: "Korean" }),
            Object.freeze({ id: "la", o: "Latina", name: "Latin" }),
            Object.freeze({ id: "lt-LT", o: "Lietuvių kalba", name: "Lithuanian" }),
            Object.freeze({ id: "lv-LV", o: "Latviešu", name: "Latvian" }),
            Object.freeze({ id: "mn-MN", o: "Монгол", name: "Mongolian" }),
            Object.freeze({ id: "nb-NO", o: "Norsk bokmål", name: "Norwegian (Bokmål)" }),
            Object.freeze({ id: "nl-NL", o: "Nederlands", name: "Dutch" }),
            Object.freeze({ id: "nn-NO", o: "Norsk nynorsk", name: "Norwegian (Nynorsk)" }),
            Object.freeze({ id: "pl-PL", o: "Polski", name: "Polish" }),
            Object.freeze({ id: "pt-BR", o: "Português (Brasil)", name: "Portuguese (Brazil)" }),
            Object.freeze({ id: "pt-PT", o: "Português (Portugal)", name: "Portuguese (Portugal)" }),
            Object.freeze({ id: "ro-RO", o: "Română", name: "Romanian" }),
            Object.freeze({ id: "ru-RU", o: "Русский", name: "Russian" }),
            Object.freeze({ id: "sk-SK", o: "Slovenčina", name: "Slovak" }),
            Object.freeze({ id: "sl-SI", o: "Slovenščina", name: "Slovenian" }),
            Object.freeze({ id: "sr-RS", o: "Српски / Srpski", name: "Serbian" }),
            Object.freeze({ id: "sv-SE", o: "Svenska", name: "Swedish" }),
            Object.freeze({ id: "th-TH", o: "ไทย", name: "Thai" }),
            Object.freeze({ id: "tr-TR", o: "Türkçe", name: "Turkish" }),
            Object.freeze({ id: "uk-UA", o: "Українська", name: "Ukrainian" }),
            Object.freeze({ id: "vi-VN", o: "Tiếng Việt", name: "Vietnamese" }),
            Object.freeze({ id: "zh-CN", o: "中文 (中国大陆)", name: "Chinese (PRC)" }),
            Object.freeze({ id: "zh-TW", o: "中文 (台灣)", name: "Chinese (Taiwan)" }),
        ];

        this._locales = {};
        list.forEach(l => { this._locales[l.id] = l; });

    }

    getInfos(p_id) {
        let
            prim = this._primary,
            locales = this._locales;

        if (p_id in prim) { return locales[prim[p_id]]; }

        for (let id in locales) {
            let infos = locales[id];
            if (infos.id == p_id ||
                infos.o == p_id ||
                infos.name == p_id) {
                return infos;
            }
        }
        throw new Error(`Request locale (${p_id}) does not exists.`);
    }

    getName(p_locale) {
        let infos = this.getInfos(p_locale);
        return infos.name;
    }

    getLocalizedName(p_locale) {
        let infos = this.getInfos(p_locale);
        return infos.o;
    }

    getId(p_locale) {
        let infos = this.getInfos(p_locale);
        return infos.id;
    }


}

module.exports = new LOCALES();