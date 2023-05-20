'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const locales = {};

locales.raw = Object.freeze({ pair: "raw", o: "Raw", name: "Raw" });

locales.af = Object.freeze({ pair: "af-ZA", o: "Afrikaans", name: "Afrikaans" });
locales.ar = Object.freeze({ pair: "ar", o: "العربية", name: "Arabic" });
locales.bg = Object.freeze({ pair: "bg-BG", o: "Български", name: "Bulgarian" });
locales.ca = Object.freeze({ pair: "ca-AD", o: "Català", name: "Catalan" });
locales.cs = Object.freeze({ pair: "cs-CZ", o: "Čeština", name: "Czech" });
locales.cy = Object.freeze({ pair: "cy-GB", o: "Cymraeg", name: "Welsh" });
locales.da = Object.freeze({ pair: "da-DK", o: "Dansk", name: "Danish" });
locales.de = Object.freeze({ pair: "de-DE", o: "Deutsch (Deutschland)", name: "German (Germany)" });
locales.el = Object.freeze({ pair: "el-GR", o: "Ελληνικά", name: "Greek" });
locales.en = Object.freeze({ pair: "en-US", o: "English (US)", name: "English (US)" });
locales.es = Object.freeze({ pair: "es-ES", o: "Español (España)", name: "Spanish (Spain)" });
locales.et = Object.freeze({ pair: "et-EE", o: "Eesti keel", name: "Estonian" });
locales.eu = Object.freeze({ pair: "eu", o: "Euskara", name: "Basque" });
locales.fa = Object.freeze({ pair: "fa-IR", o: "فارسی", name: "Persian" });
locales.fi = Object.freeze({ pair: "fi-FI", o: "Suomi", name: "Finnish" });
locales.fr = Object.freeze({ pair: "fr-FR", o: "Français (France)", name: "French (France)" });
locales.he = Object.freeze({ pair: "he-IL", o: "עברית", name: "Hebrew" });
locales.hi = Object.freeze({ pair: "hi-IN", o: "हिंदी", name: "Hindi" });
locales.hr = Object.freeze({ pair: "hr-HR", o: "Hrvatski", name: "Croatian" });
locales.hu = Object.freeze({ pair: "hu-HU", o: "Magyar", name: "Hungarian" });
locales.id = Object.freeze({ pair: "id-ID", o: "Bahasa Indonesia", name: "Indonesian" });
locales.is = Object.freeze({ pair: "is-IS", o: "Íslenska", name: "Icelandic" });
locales.it = Object.freeze({ pair: "it-IT", o: "Italiano", name: "Italian" });
locales.ja = Object.freeze({ pair: "ja-JP", o: "日本語", name: "Japanese" });
locales.km = Object.freeze({ pair: "km-KH", o: "ភាសាខ្មែរ", name: "Khmer" });
locales.ko = Object.freeze({ pair: "ko-KR", o: "한국어", name: "Korean" });
locales.la = Object.freeze({ pair: "la", o: "Latina", name: "Latin" });
locales.lt = Object.freeze({ pair: "lt-LT", o: "Lietuvių kalba", name: "Lithuanian" });
locales.lv = Object.freeze({ pair: "lv-LV", o: "Latviešu", name: "Latvian" });
locales.mn = Object.freeze({ pair: "mn-MN", o: "Монгол", name: "Mongolian" });
locales.nb = Object.freeze({ pair: "nb-NO", o: "Norsk bokmål", name: "Norwegian (Bokmål)" });
locales.nl = Object.freeze({ pair: "nl-NL", o: "Nederlands", name: "Dutch" });
locales.nn = Object.freeze({ pair: "nn-NO", o: "Norsk nynorsk", name: "Norwegian (Nynorsk)" });
locales.pl = Object.freeze({ pair: "pl-PL", o: "Polski", name: "Polish" });
locales.pt = Object.freeze({ pair: "pt-PT", o: "Português (Portugal)", name: "Portuguese (Portugal)" });
locales.ro = Object.freeze({ pair: "ro-RO", o: "Română", name: "Romanian" });
locales.ru = Object.freeze({ pair: "ru-RU", o: "Русский", name: "Russian" });
locales.sk = Object.freeze({ pair: "sk-SK", o: "Slovenčina", name: "Slovak" });
locales.sl = Object.freeze({ pair: "sl-SI", o: "Slovenščina", name: "Slovenian" });
locales.sr = Object.freeze({ pair: "sr-RS", o: "Српски / Srpski", name: "Serbian" });
locales.sv = Object.freeze({ pair: "sv-SE", o: "Svenska", name: "Swedish" });
locales.th = Object.freeze({ pair: "th-TH", o: "ไทย", name: "Thai" });
locales.tr = Object.freeze({ pair: "tr-TR", o: "Türkçe", name: "Turkish" });
locales.uk = Object.freeze({ pair: "uk-UA", o: "Українська", name: "Ukrainian" });
locales.vi = Object.freeze({ pair: "vi-VN", o: "Tiếng Việt", name: "Vietnamese" });
locales.zh = Object.freeze({ pair: "zh-CN", o: "中文", name: "Chinese" });

for (let l in locales) { locales.id = l; }

module.exports = {

    ...locales,

    GetName: function (p_locale) { return locales[p_locale].name; },

    GetLocalizedName: function (p_locale) { return locales[p_locale].o; },

    GetPair: function (p_locale) { return locales[p_locale].pair; },

}