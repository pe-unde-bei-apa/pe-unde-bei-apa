! function(e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var s = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(s.exports, s, s.exports, n), s.l = !0, s.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var s in e) n.d(i, s, function(t) {
                return e[t]
            }.bind(null, s));
        return i
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 9)
}([function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(10),
        s = n(32),
        r = new i.GlobalState;
    t.globalState = r;
    const o = new s.GlobalUser;
    t.globalUser = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.logger = function(...e) {}
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(0),
        s = n(1);

    function r(e, t, n = "forward") {
        let i = t;
        if (!isFinite(i)) return 0;
        for (; i >= 0 && i < e.length && "\n" === e[i];) "forward" === n ? i += 1 : i -= 1;
        return i
    }
    t.isHidden = function(e) {
        const t = window.getComputedStyle(e);
        return "none" === t.display || "hidden" == t.visibility
    }, t.separators = [":", ".", ";", "!", "?", "…", "\n"], t.isAbbreviation = (e, n) => !t.separators.includes(e[n - 1]) && "." === e[n - 2] || !t.separators.includes(e[n + 1]) && "." === e[n + 2], t.isSeparator = function(e, n) {
        return t.separators.includes(e[n]) && !t.isAbbreviation(e, n)
    }, t.getStartOfSentence = function(e, n, i = !1) {
        let s = n;
        if (!isFinite(s) || n <= 0) return 0;
        for (; s;) {
            if (t.separators.includes(e[s])) {
                if (i && !t.separators.includes(e[s + 1]) && !t.isAbbreviation(e, s)) {
                    s += 1;
                    break
                }
                t.isAbbreviation(e, s) || (i = !0)
            }
            s -= 1
        }
        return s
    }, t.getEndOfSentence = function(e, n, i = !1) {
        let s = n;
        if (!isFinite(s)) return 0;
        for (; s < e.length;) {
            if (t.separators.includes(e[s])) {
                if (i && !t.separators.includes(e[s - 1]) && !t.isAbbreviation(e, s)) {
                    s += 1;
                    break
                }
                t.isAbbreviation(e, s) || (i = !0)
            }
            s += 1
        }
        return s
    }, t.skipNewLines = r, t.getStartOfParagraph = function(e, t, n = !1) {
        let i = t;
        if (!isFinite(i)) return 0;
        for (; i;) {
            if ("\n" === e[i] && "\n" !== e[i - 1]) {
                if (!n) {
                    i += 1, s.logger("Final paragraph start found at", i);
                    const t = r(e, i, "forward");
                    return s.logger("Final paragraph start after skipping new lines", t), t
                }
                s.logger("First paragraph start found at", i), n = !1
            }
            i -= 1
        }
        return i
    }, t.getEndOfParagraph = function(e, t, n = !1) {
        let i = t;
        if (!isFinite(i)) return 0;
        for (; i < e.length;) {
            if ("\n" === e[i] && "\n" !== e[i + 1]) {
                if (!n) {
                    s.logger("Final paragraph end found at", i);
                    const t = r(e, i, "backward");
                    return s.logger("Final paragraph end after skipping new lines", t), Math.min(t + 1, e.length)
                }
                s.logger("First paragraph end found at", i), n = !1
            }
            i += 1
        }
        return i
    }, t.isGroupedPurchase = function(e) {
        return e && "userInfo" in e && Number(e.userInfo[23]) > 1
    }, t.isIframe = function() {
        try {
            return window.self !== window.top
        } catch (e) {
            return !0
        }
    }, t.createScribensElement = function(e) {
        e instanceof HTMLElement && e.isConnected && (e.parentElement.closest('[contenteditable="true"]') || i.globalState.hostIsDisabled() || i.globalState.getCore(e) || i.globalState.createCore(e))
    }, t.isFirefox = function() {
        return window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1
    }, t.regexpMode = function(e) {
        return "^corModeNone$" === e ? new RegExp(e) : "^Cor$" === e ? new RegExp("^Cor$|^Rephrased$") : new RegExp(e + "|^Cor$|^Rephrased$")
    }, t.debounce = (e, t) => {
        let n;
        return function(...i) {
            clearTimeout(n), n = setTimeout(() => {
                e(...i)
            }, t)
        }
    };
    var o = "",
        a = p(document.documentElement.lang),
        l = window.location.href;
    if ((l.indexOf("/reformulation-texte/") > 0 || l.indexOf("/paraphrasing-tool/") > 0) && (o = "../"), "fr" != a && "en" != a) {
        o = "../";
        var d = l.indexOf("/" + a + "/");
        d > 0 && l.indexOf("/", d + 4) > 0 && (o = "../../")
    }

    function g(e) {
        return e.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim()
    }

    function c(e, t = "") {
        const n = e.querySelector(".styled-grid"),
            i = [...n.children],
            s = window.Util.getCustomLanguages();
        let r = 0;
        i.sort((e, n) => {
            if (t.length > 0) return e.textContent.localeCompare(n.textContent);
            const i = e.getAttribute("rel"),
                r = n.getAttribute("rel"),
                o = Number(e.dataset.index),
                a = Number(n.dataset.index),
                l = "fr" === i;
            if (l !== ("fr" === r)) return l ? -1 : 1;
            const d = s.indexOf(i),
                g = s.indexOf(r),
                c = -1 !== d,
                p = -1 !== g;
            return c && p ? d - g : c !== p ? c ? -1 : 1 : o - a
        }).forEach(e => {
            if (0 === t.length) return 1 === Number(e.dataset.defaultSelection) || s.includes(e.getAttribute("rel")) ? (e.dataset.visible = "1", r += 1) : e.dataset.visible = "0", void n.append(e);
            const i = g(e.textContent.trim().toLowerCase());
            t = g(t.trim().toLowerCase()), i.startsWith(t) ? (e.dataset.visible = "1", r += 1) : e.dataset.visible = "0", n.append(e)
        }), e.classList.toggle("grid-is-filtered", t.length > 0), e.classList.toggle("grid-is-empty", 0 === r)
    }

    function p(e) {
        return "kk-Latn" === e ? "kk" : e
    }
    t.listOfTones = [{
        id: "nope",
        label: window.Labels.none,
        image: o + "images/tones/Aucun.svg"
    }, {
        id: "formal",
        label: window.Labels.tone_formal,
        image: o + "images/tones/Formel.svg"
    }, {
        id: "professional",
        label: window.Labels.tone_professional,
        image: o + "images/tones/Professionnel.svg"
    }, {
        id: "neutral",
        label: window.Labels.tone_neutral,
        image: o + "images/tones/Neutre.svg"
    }, {
        id: "informal",
        label: window.Labels.tone_informal,
        image: o + "images/tones/Informel.svg"
    }, {
        id: "friendly",
        label: window.Labels.tone_friendly,
        image: o + "images/tones/Amical.svg"
    }, {
        id: "happy",
        label: window.Labels.tone_happy,
        image: o + "images/tones/Joyeux.svg"
    }, {
        id: "sad",
        label: window.Labels.tone_sad,
        image: o + "images/tones/Triste.svg"
    }, {
        id: "angry",
        label: window.Labels.tone_angry,
        image: o + "images/tones/Furieux.svg"
    }, {
        id: "persuasive",
        label: window.Labels.tone_persuasive,
        image: o + "images/tones/Persuasif.svg"
    }, {
        id: "literary",
        label: window.Labels.tone_literary,
        image: o + "images/tones/Lit.svg"
    }, {
        id: "romantic",
        label: window.Labels.tone_romantic,
        image: o + "images/tones/Romantique.svg"
    }, {
        id: "spiritual",
        label: window.Labels.tone_spiritual,
        image: o + "images/tones/Spirituel.svg"
    }, {
        id: "educative",
        label: window.Labels.tone_educative,
        image: o + "images/tones/Educatif.svg"
    }, {
        id: "funny",
        label: window.Labels.tone_funny,
        image: o + "images/tones/Humoristique.svg"
    }, {
        id: "kind",
        label: window.Labels.tone_kind,
        image: o + "images/tones/Bienveillant.svg"
    }, {
        id: "optimistic",
        label: window.Labels.tone_optimistic,
        image: o + "images/tones/Optimistic.svg"
    }, {
        id: "pessimistic",
        label: window.Labels.tone_pessimistic,
        image: o + "images/tones/Pessimistic.svg"
    }, {
        id: "direct",
        label: window.Labels.tone_direct,
        image: o + "images/tones/Direct.svg"
    }, {
        id: "brief",
        label: window.Labels.tone_brief,
        image: o + "images/tones/Short.svg"
    }], t.listOfLanguages = [{
        id: "fr",
        code: "FR",
        label: window.Labels.lang_french,
        image: o + "images/flags/fr.svg",
        showInGrid: !0
    }, {
        id: "en",
        code: "EN",
        label: window.Labels.lang_english,
        image: o + "images/flags/en.svg",
        showInGrid: !0
    }, {
        id: "es",
        code: "ES",
        label: window.Labels.lang_spanish,
        image: o + "images/flags/es.svg",
        showInGrid: !0
    }, {
        id: "de",
        code: "DE",
        label: window.Labels.lang_german,
        image: o + "images/flags/de.svg",
        showInGrid: !0
    }, {
        id: "pt",
        code: "PT",
        label: window.Labels.lang_portuguese,
        image: o + "images/flags/pt.svg",
        showInGrid: !0
    }, {
        id: "it",
        code: "IT",
        label: window.Labels.lang_italian,
        image: o + "images/flags/it.svg",
        showInGrid: !0
    }, {
        id: "nl",
        code: "NL",
        label: window.Labels.lang_dutch,
        image: o + "images/flags/nl.svg",
        showInGrid: !0
    }, {
        id: "pl",
        code: "PL",
        label: window.Labels.lang_polish,
        image: o + "images/flags/pl.svg",
        showInGrid: !0
    }, {
        id: "da",
        code: "DA",
        label: window.Labels.lang_danish,
        image: o + "images/flags/da.svg",
        showInGrid: !0
    }, {
        id: "sv",
        code: "SV",
        label: window.Labels.lang_swedish,
        image: o + "images/flags/sv.svg",
        showInGrid: !0
    }, {
        id: "no",
        code: "NO",
        label: window.Labels.lang_norwegian,
        image: o + "images/flags/no.svg",
        showInGrid: !0
    }, {
        id: "fi",
        code: "FI",
        label: window.Labels.lang_finnish,
        image: o + "images/flags/fi.svg",
        showInGrid: !0
    }, {
        id: "el",
        code: "EL",
        label: window.Labels.lang_greek,
        image: o + "images/flags/el.svg",
        showInGrid: !0
    }, {
        id: "ca",
        code: "CA",
        label: window.Labels.lang_catalan,
        image: o + "images/flags/ca.svg",
        showInGrid: !0
    }, {
        id: "ro",
        code: "RO",
        label: window.Labels.lang_romanian,
        image: o + "images/flags/ro.svg",
        showInGrid: !0
    }, {
        id: "cs",
        code: "CS",
        label: window.Labels.lang_czech,
        image: o + "images/flags/cs.svg",
        showInGrid: !0
    }, {
        id: "sk",
        code: "SK",
        label: window.Labels.lang_slovak,
        image: o + "images/flags/sk.svg",
        showInGrid: !0
    }, {
        id: "sl",
        code: "SL",
        label: window.Labels.lang_slovenian,
        image: o + "images/flags/sl.svg",
        showInGrid: !0
    }, {
        id: "hu",
        code: "HU",
        label: window.Labels.lang_hungarian,
        image: o + "images/flags/hu.svg",
        showInGrid: !0
    }, {
        id: "bg",
        code: "BG",
        label: window.Labels.lang_bulgarian,
        image: o + "images/flags/bg.svg",
        showInGrid: !0
    }, {
        id: "hr",
        code: "HR",
        label: window.Labels.lang_croatian,
        image: o + "images/flags/hr.svg",
        showInGrid: !0
    }, {
        id: "sr",
        code: "SR",
        label: window.Labels.lang_serbian,
        image: o + "images/flags/sr.svg",
        showInGrid: !0
    }, {
        id: "sq",
        code: "SQ",
        label: window.Labels.lang_albanian,
        image: o + "images/flags/sq.svg",
        showInGrid: !0
    }, {
        id: "mk",
        code: "MK",
        label: window.Labels.lang_macedonian,
        image: o + "images/flags/mk.svg",
        showInGrid: !0
    }, {
        id: "bs",
        code: "BS",
        label: window.Labels.lang_bosnian,
        image: o + "images/flags/bs.svg",
        showInGrid: !0
    }, {
        id: "et",
        code: "ET",
        label: window.Labels.lang_estonian,
        image: o + "images/flags/et.svg",
        showInGrid: !0
    }, {
        id: "lt",
        code: "LT",
        label: window.Labels.lang_lithuanian,
        image: o + "images/flags/lt.svg",
        showInGrid: !0
    }, {
        id: "lv",
        code: "LV",
        label: window.Labels.lang_latvian,
        image: o + "images/flags/lv.svg",
        showInGrid: !0
    }, {
        id: "uk",
        code: "UK",
        label: window.Labels.lang_ukrainian,
        image: o + "images/flags/uk.svg",
        showInGrid: !0
    }, {
        id: "ru",
        code: "RU",
        label: window.Labels.lang_russian,
        image: o + "images/flags/ru.svg",
        showInGrid: !0
    }, {
        id: "tr",
        code: "TR",
        label: window.Labels.lang_turkish,
        image: o + "images/flags/tr.svg",
        showInGrid: !0
    }, {
        id: "ar",
        code: "AR",
        label: window.Labels.lang_arabic,
        image: o + "images/flags/ar.svg",
        showInGrid: !0
    }, {
        id: "zh",
        code: "ZH",
        label: window.Labels.lang_chinese,
        image: o + "images/flags/zh.svg",
        showInGrid: !0
    }, {
        id: "ja",
        code: "JA",
        label: window.Labels.lang_japanese,
        image: o + "images/flags/ja.svg",
        showInGrid: !0
    }, {
        id: "ko",
        code: "KO",
        label: window.Labels.lang_korean,
        image: o + "images/flags/ko.svg",
        showInGrid: !0
    }, {
        id: "he",
        code: "HE",
        label: window.Labels.lang_hebrew,
        image: o + "images/flags/he.svg",
        showInGrid: !0
    }, {
        id: "hi",
        code: "HI",
        label: window.Labels.lang_hindi,
        image: o + "images/flags/hi.svg",
        showInGrid: !0
    }, {
        id: "bn",
        code: "BN",
        label: window.Labels.lang_bengali,
        image: o + "images/flags/bn.svg",
        showInGrid: !0
    }, {
        id: "vi",
        code: "VI",
        label: window.Labels.lang_vietnamese,
        image: o + "images/flags/vi.svg",
        showInGrid: !0
    }, {
        id: "th",
        code: "TH",
        label: window.Labels.lang_thai,
        image: o + "images/flags/th.svg",
        showInGrid: !0
    }, {
        id: "id",
        code: "ID",
        label: window.Labels.lang_indonesian,
        image: o + "images/flags/id.svg",
        showInGrid: !0
    }, {
        id: "kk",
        code: "KK",
        label: window.Labels.lang_kazakh,
        image: o + "images/flags/kk.svg",
        showInGrid: !0
    }, {
        id: "tk",
        code: "TK",
        label: window.Labels.lang_turkmen,
        image: o + "images/flags/tk.svg",
        showInGrid: !0
    }, {
        id: "ms",
        code: "MS",
        label: window.Labels.lang_malay,
        image: o + "images/flags/ms.svg",
        showInGrid: !0
    }, {
        id: "eu",
        code: "EU",
        label: window.Labels.lang_basque,
        image: o + "images/flags/eu.svg"
    }, {
        id: "br",
        code: "BR",
        label: window.Labels.lang_breton,
        image: o + "images/flags/br.svg"
    }, {
        id: "gl",
        code: "GL",
        label: window.Labels.lang_galician,
        image: o + "images/flags/gl.svg"
    }, {
        id: "oc",
        code: "OC",
        label: window.Labels.lang_occitan,
        image: o + "images/flags/oc.svg"
    }, {
        id: "sc",
        code: "SC",
        label: window.Labels.lang_sardinian,
        image: o + "images/flags/sc.svg"
    }, {
        id: "ast",
        code: "AST",
        label: window.Labels.lang_asturian,
        image: o + "images/flags/ast.svg"
    }, {
        id: "cy",
        code: "CY",
        label: window.Labels.lang_welsh,
        image: o + "images/flags/cy.svg"
    }, {
        id: "ga",
        code: "GA",
        label: window.Labels.lang_irish,
        image: o + "images/flags/ga.svg"
    }, {
        id: "is",
        code: "IS",
        label: window.Labels.lang_icelandic,
        image: o + "images/flags/is.svg"
    }, {
        id: "lb",
        code: "LB",
        label: window.Labels.lang_luxembourgish,
        image: o + "images/flags/lb.svg"
    }, {
        id: "mt",
        code: "MT",
        label: window.Labels.lang_maltese,
        image: o + "images/flags/mt.svg"
    }, {
        id: "cnr",
        code: "CNR",
        label: window.Labels.lang_montenegrin,
        image: o + "images/flags/cnr.svg"
    }, {
        id: "be",
        code: "BE",
        label: window.Labels.lang_belarusian,
        image: o + "images/flags/be.svg"
    }, {
        id: "hy",
        code: "HY",
        label: window.Labels.lang_armenian,
        image: o + "images/flags/hy.svg"
    }, {
        id: "ka",
        code: "KA",
        label: window.Labels.lang_georgian,
        image: o + "images/flags/ka.svg"
    }, {
        id: "az",
        code: "AZ",
        label: window.Labels.lang_azerbaijani,
        image: o + "images/flags/az.svg"
    }, {
        id: "tt",
        code: "TT",
        label: window.Labels.lang_tatar,
        image: o + "images/flags/tt.svg"
    }, {
        id: "fa",
        code: "FA",
        label: window.Labels.lang_persian,
        image: o + "images/flags/fa.svg"
    }, {
        id: "ku",
        code: "KU",
        label: window.Labels.lang_kurdish,
        image: o + "images/flags/ku.svg"
    }, {
        id: "ps",
        code: "PS",
        label: window.Labels.lang_pashto,
        image: o + "images/flags/ps.svg"
    }, {
        id: "uz",
        code: "UZ",
        label: window.Labels.lang_uzbek,
        image: o + "images/flags/uz.svg"
    }, {
        id: "ky",
        code: "KY",
        label: window.Labels.lang_kyrgyz,
        image: o + "images/flags/ky.svg"
    }, {
        id: "tg",
        code: "TG",
        label: window.Labels.lang_tajik,
        image: o + "images/flags/tg.svg"
    }, {
        id: "ug",
        code: "UG",
        label: window.Labels.lang_uyghur,
        image: o + "images/flags/ug.svg"
    }, {
        id: "ur",
        code: "UR",
        label: window.Labels.lang_urdu,
        image: o + "images/flags/ur.svg"
    }, {
        id: "mr",
        code: "MR",
        label: window.Labels.lang_marathi,
        image: o + "images/flags/mr.svg"
    }, {
        id: "gu",
        code: "GU",
        label: window.Labels.lang_gujarati,
        image: o + "images/flags/gu.svg"
    }, {
        id: "ta",
        code: "TA",
        label: window.Labels.lang_tamil,
        image: o + "images/flags/ta.svg"
    }, {
        id: "te",
        code: "TE",
        label: window.Labels.lang_telugu,
        image: o + "images/flags/te.svg"
    }, {
        id: "kn",
        code: "KN",
        label: window.Labels.lang_kannada,
        image: o + "images/flags/kn.svg"
    }, {
        id: "ml",
        code: "ML",
        label: window.Labels.lang_malayalam,
        image: o + "images/flags/ml.svg"
    }, {
        id: "or",
        code: "OR",
        label: window.Labels.lang_odia,
        image: o + "images/flags/or.svg"
    }, {
        id: "as",
        code: "AS",
        label: window.Labels.lang_assamese,
        image: o + "images/flags/as.svg"
    }, {
        id: "ne",
        code: "NE",
        label: window.Labels.lang_nepali,
        image: o + "images/flags/ne.svg"
    }, {
        id: "si",
        code: "SI",
        label: window.Labels.lang_sinhala,
        image: o + "images/flags/si.svg"
    }, {
        id: "pa",
        code: "PA",
        label: window.Labels.lang_punjabi,
        image: o + "images/flags/pa.svg"
    }, {
        id: "mai",
        code: "MAI",
        label: window.Labels.lang_maithili,
        image: o + "images/flags/mai.svg"
    }, {
        id: "yue",
        code: "YUE",
        label: window.Labels.lang_cantonese,
        image: o + "images/flags/yue.svg"
    }, {
        id: "bo",
        code: "BO",
        label: window.Labels.lang_tibetan,
        image: o + "images/flags/bo.svg"
    }, {
        id: "mn",
        code: "MN",
        label: window.Labels.lang_mongolian,
        image: o + "images/flags/mn.svg"
    }, {
        id: "my",
        code: "MY",
        label: window.Labels.lang_burmese,
        image: o + "images/flags/my.svg"
    }, {
        id: "km",
        code: "KM",
        label: window.Labels.lang_khmer,
        image: o + "images/flags/km.svg"
    }, {
        id: "lo",
        code: "LO",
        label: window.Labels.lang_lao,
        image: o + "images/flags/lo.svg"
    }, {
        id: "fil",
        code: "FIL",
        label: window.Labels.lang_filipino,
        image: o + "images/flags/fil.svg"
    }, {
        id: "ceb",
        code: "CEB",
        label: window.Labels.lang_cebuano,
        image: o + "images/flags/ceb.svg"
    }, {
        id: "jv",
        code: "JV",
        label: window.Labels.lang_javanese,
        image: o + "images/flags/jv.svg"
    }, {
        id: "su",
        code: "SU",
        label: window.Labels.lang_sundanese,
        image: o + "images/flags/su.svg"
    }, {
        id: "kab",
        code: "KAB",
        label: window.Labels.lang_kabyle,
        image: o + "images/flags/kab.svg"
    }, {
        id: "am",
        code: "AM",
        label: window.Labels.lang_amharic,
        image: o + "images/flags/am.svg"
    }, {
        id: "ti",
        code: "TI",
        label: window.Labels.lang_tigrinya,
        image: o + "images/flags/ti.svg"
    }, {
        id: "om",
        code: "OM",
        label: window.Labels.lang_oromo,
        image: o + "images/flags/om.svg"
    }, {
        id: "so",
        code: "SO",
        label: window.Labels.lang_somali,
        image: o + "images/flags/so.svg"
    }, {
        id: "ha",
        code: "HA",
        label: window.Labels.lang_hausa,
        image: o + "images/flags/ha.svg"
    }, {
        id: "yo",
        code: "YO",
        label: window.Labels.lang_yoruba,
        image: o + "images/flags/yo.svg"
    }, {
        id: "ig",
        code: "IG",
        label: window.Labels.lang_igbo,
        image: o + "images/flags/ig.svg"
    }, {
        id: "fuc",
        code: "FUC",
        label: window.Labels.lang_pulaar,
        image: o + "images/flags/fuc.svg"
    }, {
        id: "wo",
        code: "WO",
        label: window.Labels.lang_wolof,
        image: o + "images/flags/wo.svg"
    }, {
        id: "bm",
        code: "BM",
        label: window.Labels.lang_bambara,
        image: o + "images/flags/bm.svg"
    }, {
        id: "ak",
        code: "AK",
        label: window.Labels.lang_akan,
        image: o + "images/flags/ak.svg"
    }, {
        id: "ee",
        code: "EE",
        label: window.Labels.lang_ewe,
        image: o + "images/flags/ee.svg"
    }, {
        id: "mos",
        code: "MOS",
        label: window.Labels.lang_mossi,
        image: o + "images/flags/mos.svg"
    }, {
        id: "sw",
        code: "SW",
        label: window.Labels.lang_swahili,
        image: o + "images/flags/sw.svg"
    }, {
        id: "rw",
        code: "RW",
        label: window.Labels.lang_kinyarwanda,
        image: o + "images/flags/rw.svg"
    }, {
        id: "rn",
        code: "RN",
        label: window.Labels.lang_kirundi,
        image: o + "images/flags/rn.svg"
    }, {
        id: "lug",
        code: "LUG",
        label: window.Labels.lang_luganda,
        image: o + "images/flags/lug.svg"
    }, {
        id: "ny",
        code: "NY",
        label: window.Labels.lang_chichewa,
        image: o + "images/flags/ny.svg"
    }, {
        id: "sn",
        code: "SN",
        label: window.Labels.lang_shona,
        image: o + "images/flags/sn.svg"
    }, {
        id: "zu",
        code: "ZU",
        label: window.Labels.lang_zulu,
        image: o + "images/flags/zu.svg"
    }, {
        id: "xh",
        code: "XH",
        label: window.Labels.lang_xhosa,
        image: o + "images/flags/xh.svg"
    }, {
        id: "st",
        code: "ST",
        label: window.Labels.lang_sesotho,
        image: o + "images/flags/st.svg"
    }, {
        id: "tn",
        code: "TN",
        label: window.Labels.lang_setswana,
        image: o + "images/flags/tn.svg"
    }, {
        id: "nso",
        code: "NSO",
        label: window.Labels.lang_sepedi,
        image: o + "images/flags/nso.svg"
    }, {
        id: "af",
        code: "AF",
        label: window.Labels.lang_afrikaans,
        image: o + "images/flags/af.svg"
    }, {
        id: "hat",
        code: "HAT",
        label: window.Labels.lang_haitian,
        image: o + "images/flags/hat.svg"
    }, {
        id: "gn",
        code: "GN",
        label: window.Labels.lang_guarani,
        image: o + "images/flags/gn.svg"
    }, {
        id: "qu",
        code: "QU",
        label: window.Labels.lang_quechua,
        image: o + "images/flags/qu.svg"
    }, {
        id: "pap",
        code: "PAP",
        label: window.Labels.lang_papiamento,
        image: o + "images/flags/pap.svg"
    }, {
        id: "mi",
        code: "MI",
        label: window.Labels.lang_maori,
        image: o + "images/flags/mi.svg"
    }, {
        id: "tpi",
        code: "TPI",
        label: window.Labels.lang_tok,
        image: o + "images/flags/tpi.svg"
    }, {
        id: "sm",
        code: "SM",
        label: window.Labels.lang_samoan,
        image: o + "images/flags/sm.svg"
    }, {
        id: "fj",
        code: "FJ",
        label: window.Labels.lang_fijian,
        image: o + "images/flags/fj.svg"
    }, {
        id: "eo",
        code: "EO",
        label: window.Labels.lang_esperanto,
        image: o + "images/flags/eo.svg"
    }, {
        id: "la",
        code: "LA",
        label: window.Labels.lang_latin,
        image: o + "images/flags/la.svg"
    }], t.createLanguageGrid = function(e, n, i, s) {
        const r = document.createElement("div");
        r.className = "styled-grid", t.listOfLanguages.forEach(t => {
            const o = document.createElement("div");
            if (o.setAttribute("rel", t.id), o.dataset.visible = String(t.showInGrid ? 1 : 0), o.dataset.defaultSelection = String(t.showInGrid ? 1 : 0), o.className = "styled-grid-item", o.innerHTML = `\n        <img src="${t.image}"/> \n        <span>${t.label}</span>\n      `, o.onclick = () => {
                    i(t)
                }, !t.showInGrid) {
                let n = document.createElement("button"),
                    i = window.Util.getCustomLanguages().includes(t.id);
                n.className = "styled-grid-item--action-button", n.classList.add(i ? "styled-grid-item--minus-button" : "styled-grid-item--plus-button"), n.onclick = t => {
                    t.preventDefault(), t.stopPropagation();
                    let i = n.closest(".styled-grid-item").getAttribute("rel");
                    window.Util.getCustomLanguages().includes(i) ? (window.Util.removeCustomLanguage(i), n.classList.remove("styled-grid-item--minus-button"), n.classList.add("styled-grid-item--plus-button")) : (window.Util.addCustomLanguage(i), n.classList.add("styled-grid-item--minus-button"), n.classList.remove("styled-grid-item--plus-button")), e.querySelector(".language-search--input").value = "", c(e, "")
                }, o.append(n)
            }
            r.appendChild(o), -1 !== n.indexOf("-") && (n = n.split("-")[0]), t.id === n && s(t)
        }), e.classList.add("language-grid"), e.append(r);
        let o = document.createElement("div");
        o.className = "grid-is-empty--layout", o.innerHTML = `\n      <div class="grid-is-empty--image">\n        <img src="${window.Cor.PrefixFolder}images/icone/fi-rr-exclamation.svg" />\n      </div>\n      <div class="grid-is-empty--header-text">\n        ${window.Labels.lang_notfound}\n      </div>\n      <div class="grid-is-empty--subheader-text">\n        ${window.Labels.lang_notfound_instructions}\n      </div>\n    `, e.append(o);
        let a = document.createElement("div");
        a.className = "language-search--row";
        let l = document.createElement("input");
        l.type = "text", l.classList.add("language-search--input"), l.addEventListener("input", () => {
            c(e, l.value)
        }), a.appendChild(l);
        const d = e => {
                const t = window.Labels.lang_search;
                let n = window.Labels.lang_search;
                e && (n = t.substring(0, t.indexOf("("))), l.placeholder = n
            },
            g = window.matchMedia("(max-width: 768px)");
        g.addEventListener("change", () => {
            d(g.matches)
        }), d(g.matches), e.append(a), c(e, "")
    }, t.normalizedString = g, t.refreshLanguageGrid = c, t._normalizeLocale = p
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(7),
        s = n(1),
        r = n(0);
    class o {
        getUrl() {
            return `https://www.${this.domain||window.Labels.scribens_domain}/${this.tomcatInstance()}/${this.servlet}`
        }
        tomcatInstance() {
            return "Scribens"
        }
        findDomain(e, t) {
            return "fr" === t ? "scribens.fr" : "scribens.com"
        }
        async request(e, t = null) {
            return await fetch(this.getUrl(), {
                body: this.generateParameters(e),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                method: "POST",
                signal: t || (new AbortController).signal
            }).then(e => e.json()).then(e => (s.logger(e), e)).catch(e => {
                if (console.log(e), ![20].includes(e.code)) throw new i.NetworkError(e.message);
                throw e
            })
        }
        premiumUser() {
            return r.globalUser.isAuthorized() ? {
                Id: r.globalUser.info[7],
                Password: r.globalUser.info[8]
            } : {}
        }
        generateParameters(e) {
            return Object.keys(e).map(t => `${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join("&")
        }
    }
    o.plugin = "Website_desktop", t.HttpBase = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(0),
        s = n(14),
        r = n(1),
        o = n(2),
        a = n(5);
    t.storageDetailedUsageKey = "detailed-explanation/usage", t.storageDetailedStartDateKey = "detailed-explanation/first-use-date", t.onDocumentClick = function(e) {
        const t = e.target;
        t instanceof HTMLElement && (t.closest("scribens-ui") || t.classList.contains("main-button") || (i.globalState.hidePopupSettings(e), i.globalState.cores.forEach(e => {
            e.tooltip.hide("invalid-identification"), e.tooltip.hide("api-trial-expired"), e.tooltip.hide("api-quota-reached"), e.tooltip.hide("session-limit-exceeded")
        })))
    }, t.onDocumentKeyUp = function(e) {
        "Escape" === e.key && i.globalState.hidePopupSettings()
    }, t.onDocumentScroll = function(e) {
        i.globalState.cores.forEach(e => {
            e.expandTextareaIfRequired(), e.syncMirror(), e.updatePosition()
        })
    }, t.onWindowResize = function(e) {
        i.globalState.cores.forEach(e => {
            e.expandTextareaIfRequired(), e.syncMirror(), e.updatePosition();
            let t = null;
            const n = e.ui.settingsWrapper.querySelector(".list-of-languages--wrapper"),
                i = e.rephraser && e.rephraser.wrapper ? e.rephraser.wrapper.querySelector(".rephraser-wrapper--languages") : null,
                s = e.rephraser && e.rephraser.wrapper ? e.rephraser.wrapper.querySelector(".rephraser-wrapper--tones") : null;
            n && n.classList.contains("container--is-open") ? t = n : i && i.classList.contains("container--is-open") ? t = i : s && s.classList.contains("container--is-open") && (t = s), t && e.autoResize(t), e.clearSolutionWrapperIfRequired()
        })
    };
    t.onKeyDownEvent = function(e) {
        if (r.logger("onKeyDownEvent", e), !e.isTrusted) return;
        if ((e => (e.ctrlKey || e.metaKey) && /^key(x|v)$/i.test(e.code))(e)) return;
        const t = i.globalState.getCore(e.target);
        t && (t.clearSolutionWrapperIfRequired(), t.editorState.pushState(e.key), setTimeout(() => {
            t.expandTextareaIfRequired(), t.syncMirror(), t.updatePosition();
            const e = t.editorState.shiftState();
            r.logger("IQueueState", e), e && (t.editorState.setState(), t.storageMapPos.handleState(e, t.editorState.getState()))
        }, 15))
    }, t.onInputEvent = function(e) {
        r.logger("onInputEvent", e);
        const t = i.globalState.getCore(e.target);
        if (!t) return;
        if (0 === t.editorState.array.length && ["historyUndo", "historyRedo"].includes(e.inputType)) {
            t.expandTextareaIfRequired(), t.syncMirror(), t.updatePosition();
            const n = t.editorState.getState();
            r.logger("onInputEvent", e.inputType, n), t.editorState.setState(), t.storageMapPos.handleState(n, t.editorState.getState())
        }
    }, t.onFocusEvent = function(e) {
        const t = i.globalState.getCore(e.target);
        if (t && 0 === t.editorState.array.length) {
            t.syncMirror(), t.updatePosition();
            const n = t.editorState.getState();
            r.logger("onFocusInEvent", e.inputType, n), t.editorState.setState(), t.storageMapPos.handleState(n, t.editorState.getState())
        }
    }, t.onClickButton = function(e) {
        e.preventDefault();
        const t = i.globalState.getCoreOfButton(e.target);
        if (t) {
            if (t.ui.button.classList.contains("new-glow")) {
                const e = t.ui.shadowRoot.querySelector('.tooltip[data-name="first-install"]');
                e && (t.ui.button.classList.remove("new-glow"), e && e.parentNode.removeChild(e))
            }
            if (t.ui.button.classList.contains("expired-glow")) t.tooltip.limitExceeded();
            else if (t.ui.button.classList.contains("session-limit")) t.tooltip.sessionLimitExceeded();
            else if (t.ui.button.classList.contains("limit-nb-char") && (t.tooltip.hide("limit-nb-char"), t.ui.button.classList.remove("limit-nb-char")), i.globalUser.isAuthorized())
                if (i.globalUser.autoCheckEnabled() || t.autoCheck || 0 === t.editorState.getState().text.trim().length) {
                    const n = t.ui.settingsWrapper;
                    if (n.classList.contains("show")) n.classList.remove("show"), n.classList.remove("settings-wrapper-reverse");
                    else {
                        const t = e.target.getBoundingClientRect(),
                            s = n.getBoundingClientRect();
                        t.bottom + s.height < window.innerHeight || t.top - s.height < 0 ? n.style.top = window.scrollY + t.bottom + 10 + "px" : (n.style.top = window.scrollY + t.top - s.height - 10 + "px", n.classList.add("settings-wrapper-reverse")), i.globalState.hidePopupSettings(), window.scrollX + t.right - s.width > 0 ? n.style.left = window.scrollX + t.right - s.width + "px" : n.style.left = window.scrollX + t.left + "px", n.classList.add("show")
                    }
                } else {
                    if (t.editorState.setState(), !t.editorState.text.length) return;
                    if (t.ui.button.classList.contains("in-progress") || t.ui.button.classList.contains("await-update")) return;
                    t.storageMapPos.removeAll(), t.ui.solutionWrapper.innerHTML = "", t.autoCheck = !0, t.network.request([0, t.editorState.text.length])
                }
            else t.tooltip.invalidIdentification()
        }
    };

    function l(e) {
        r.logger("onClickElement", e);
        const t = i.globalState.getCore(e.target);
        if (t && t.storageMapPos.array.length) {
            t.editorState.setState();
            const e = t.editorState.caret,
                n = t.editorState.selectedText;
            r.logger("onClickElement - caretIndex", e);
            const i = o.regexpMode(t.mode),
                s = t.storageMapPos.array.filter(t => i.test(t.TypeName) && "Rephrased" !== t.TypeName && e >= t.LeftPos && e <= t.RightPos).sort(e => "Cor" === e.TypeName ? 1 : -1);
            if (t.ui.solutionWrapper.classList.remove("detailed-explanation", "rephrase-solutions", "is-premium"), delete t.ui.solutionWrapper.dataset.error, s.length && 0 === n.length) {
                const e = document.createElement("div");
                s.forEach((n, i) => {
                    if (i > 0 && "Cor" === n.TypeName && "Cor" !== s[i - 1].TypeName) return;
                    const o = document.createElement("div");
                    o.className = "suggestion-wrapper ";
                    const a = new Set;
                    n.MotSolution.vectSolution.forEach(e => {
                        const t = `${e.Left}|${e.Right}`;
                        if (!a.has(t)) {
                            const i = document.createElement("div");
                            i.dataset.type = n.MotSolution.Type, i.dataset.typeName = n.TypeName, i.dataset.estSuggestion = String("Cor" === n.TypeName && n.MotSolution.EstSuggestion), i.className = "suggestion", i.innerHTML = `\n              <div class="suggestion-text">\n                ${e.Right.replace(/\n/g,"<br>")}\n              </div>`, i.vectSolution = {
                                text: e.Left,
                                start: n.LeftPos,
                                end: n.RightPos
                            }, o.appendChild(i), a.add(t)
                        }
                    }), e.dataset.count = String(a.size), e.appendChild(o), t.activeSuggestionData = n, t.ui.solutionWrapper.dataset.lang = t.correction_language;
                    const l = window.Labels.scribens_domain;
                    let g = "",
                        c = !1;
                    n.detailedExplanation && n.detailedExplanation.ResultSt ? (g = n.detailedExplanation.ResultSt, c = !0) : n.MotSolution && n.MotSolution.ExplicationSolution && (g = n.MotSolution.ExplicationSolution);
                    const p = g.replace(/href=('|")(?!http|\/\/)/gm, `href=$1https://www.${l}/`);
                    if (p.length > 0) {
                        const i = document.createElement("div");
                        i.className = "description", i.innerHTML = `<div>${p}</div>`, i.dataset.lang = t.correction_language;
                        const s = !c && "Cor" === n.TypeName && "fr" !== t.correction_language && !n.MotSolution.vectSolution.some(e => e.Right.replace(/\n/, "") === n.MotSolution.WordSt),
                            o = !c && ["sent_redundancies", "sent_unclear", "sent_contradictory", "sent_heavy", "sent_stackednouns", "sent_exccoord", "sent_excneg", "sent_registershift", "pl", "pv", "pp", "Redundancy"].includes(n.TypeName);
                        if (("fr" !== t.correction_language || o) && i.classList.add("clickable"), r.logger("onClickElement - detailed explanation", "hasDetailedExplanation", c, "needDisplayDetailsButton", s), c) t.ui.solutionWrapper.classList.add("detailed-explanation"), t.ui.solutionWrapper.classList.add("is-premium");
                        else if (s) {
                            const e = document.createElement("button");
                            e.className = "details-button", i.appendChild(e)
                        } else if (o) {
                            i.classList.add("show-solutions");
                            const e = document.createElement("div");
                            e.className = "solutions-wrapper";
                            const s = document.createElement("button");
                            s.className = "solutions-link", s.innerHTML = window.Labels.see_solutions, s.onclick = async e => {
                                e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), s.remove(), await t.getSelectionSentences(n), t.ui.solutionWrapper.classList.add("rephrase-solutions")
                            }, e.appendChild(s), i.appendChild(e)
                        }
                        e.appendChild(i)
                    } else e.classList.add("no-description");
                    d(e, n, t.website)
                }), t.ui.solutionWrapper.innerHTML = "", t.ui.solutionWrapper.appendChild(e), Object.assign(t.ui.solutionWrapper.style, t.ui.getStyleSolutionWrapper(s[0].markElements[0]))
            } else t.ui.solutionWrapper.childNodes.length && (t.ui.solutionWrapper.innerHTML = "")
        }
    }
    t.onClickElement = l;
    const d = (e, t, n) => {
        const s = t.MotSolution.Vect_SolId.findIndex(e => "UNKNOWN_WORD" === e);
        if (i.globalUser.isPremium() && s >= 0) {
            const i = document.createElement("div");
            i.className = "unknown-word--group";
            const r = document.createElement("div");
            r.className = "unknown-word--add-row", r.innerHTML = `<div>${window.Labels.perso_dict_add_question}</div>`;
            const o = document.createElement("button");
            o.className = "unknown-word--yes-button", o.innerHTML = window.Labels.yes.toLowerCase(), o.vectSolution = {
                start: t.LeftPos,
                end: t.RightPos
            }, r.appendChild(o);
            const a = document.createElement("button");
            if (a.className = "unknown-word--no-button", a.innerHTML = window.Labels.no.toLowerCase(), r.appendChild(a), i.appendChild(r), e.classList.add("unknown-word"), e.appendChild(i), "fr" == n) {
                const t = document.createElement("button");
                t.className = "unknown-word--plus-button", t.title = window.Labels.perso_dict_add_question.replace(/\?/g, "");
                const n = e.querySelector(".description");
                if (n && n.childNodes[s]) {
                    const e = n.childNodes[s];
                    e.classList.add("plus-button-row"), e.appendChild(t)
                }
            }
        }
    };

    function g(e, n, s) {
        const o = n.closest(".description"),
            a = o.querySelector("div");
        n.remove();
        const l = (new Date).toISOString().split("T")[0];
        let d = null;
        if (!i.globalUser.isPremium()) {
            d = JSON.parse(localStorage.getItem(t.storageDetailedUsageKey)) || {}, d.date !== l && (d.date = l, d.count = 0);
            const e = localStorage.getItem(t.storageDetailedStartDateKey) === l ? 15 : 5;
            d.count > e && (r.logger("detailed explanation - force limit reached (after request)"), s.Error = "lim_request_per_day_reached")
        }
        if (!s || s.Error || !s.ResultSt || 0 === s.ResultSt.length) return o.dataset.error = s.Error, void("lim_request_per_day_reached" === s.Error ? a.innerHTML = `\n        <img src="${e.prefixFolder}images/rephrase_limit_image.png" />\n        <p class="title">${window.Labels.detailed_explanation_upgrade_title}</p>\n        <small>${window.Labels.detailed_explanation_upgrade_message}</small>\n        <a href="${window.Labels.premium_link}" target="_blank" class="premium-link">\n            ${window.Labels.limit_upgrade_premium}\n        </a>\n    ` : a.innerHTML = `\n        <img src="${e.prefixFolder}images/rephrase_error_image.png" />\n        <p class="title">${window.Labels.detailed_explanation_not_found}</p>\n    `);
        const g = o.closest(".popup");
        g && g.isConnected && (g.classList.add("detailed-explanation"), g.classList.add("positioning"), g.classList.add("is-premium"), g.offsetWidth, a.innerHTML = s.ResultSt, Object.assign(e.ui.solutionWrapper.style, e.ui.getStyleSolutionWrapper(e.activeSuggestionData.markElements[0])), g.classList.remove("positioning"), d && (d.count = (d.count || 0) + 1, localStorage.setItem(t.storageDetailedUsageKey, JSON.stringify(d)), localStorage.getItem(t.storageDetailedStartDateKey) || localStorage.setItem(t.storageDetailedStartDateKey, l)), e.storageMapPos.array.forEach(t => {
            t.TypeName === e.activeSuggestionData.TypeName && t.LeftPos === e.activeSuggestionData.LeftPos && t.RightPos === e.activeSuggestionData.RightPos && (t.detailedExplanation = s)
        }))
    }
    t.onClickPopup = function(e) {
        r.logger("onClickPopup", e);
        const n = e.target;
        if (n && "suggestion" === n.className) {
            const e = i.globalState.getCoreOfSolutionPopup(n),
                t = n.vectSolution.start,
                s = n.vectSolution.end,
                r = n.vectSolution.text;
            if (!e.util.replaceNode(t, s, r)) return;
            const a = s - t,
                l = r.length;
            e.storageMapPos.redrawAfter(t, l - a);
            const d = e.storageMapPos.findInRange(t, t + r.length, !1);
            e.storageMapPos.remove(d);
            const g = e.editorState.getState();
            e.editorState.setState();
            const c = e.editorState.getState().text,
                p = o.getStartOfSentence(c, t, !0),
                h = o.getEndOfSentence(c, s, !0);
            "fr" === e.correction_language && e.network.patchHistory.push({
                start: t,
                end: s,
                time: window.performance.now()
            });
            const u = o.regexpMode(e.mode);
            if (e.storageMapPos.array.filter(e => u.test(e.TypeName) && e.LeftPos >= p && e.RightPos <= h).length && "^Cor$" === e.mode) e.ui.button.classList.contains("in-progress") && "fr" === e.correction_language && e.network.request([t, s], !0);
            else {
                -1 === e.storageMapPos.array.findIndex(e => u.test(e.TypeName)) && (e.ui.settingsWrapper.querySelector(".ext-option").querySelector(`input[value="${e.mode}"]`).closest("label").style.display = "none"), e.session.addUncheckedRange([t, s]), e.session.findConsumedText(g, e.editorState.getState()), "fr" === e.correction_language && e.network.request([t, s], e.ui.button.classList.contains("in-progress"))
            }
            e.dispatchScrollEvent()
        } else if (n instanceof HTMLElement)
            if ("A" === n.tagName) e.stopPropagation(), window.open(n.href, "_blank");
            else if (n.classList.contains("unknown-word--plus-button") || n.classList.contains("details-button")) {
            e.stopPropagation();
            const s = i.globalState.getCoreOfSolutionPopup(n);
            if (n.classList.contains("unknown-word--plus-button")) {
                s.freezePopupSuggestion = !0;
                s.ui.shadowRoot.querySelector(".popup > .unknown-word").classList.add("show")
            } else if (n.classList.contains("details-button")) {
                s.freezePopupSuggestion = !0;
                const e = (new Date).toISOString().split("T")[0];
                let l = null;
                if (!i.globalUser.isPremium()) {
                    l = JSON.parse(localStorage.getItem(t.storageDetailedUsageKey)) || {}, l.date !== e && (l.date = e, l.count = 0);
                    const i = localStorage.getItem(t.storageDetailedStartDateKey) === e ? 15 : 5;
                    if (l.count >= i) {
                        r.logger("detailed explanation - force limit reached (before request)");
                        return void g(s, n, {
                            Error: "lim_request_per_day_reached"
                        })
                    }
                }
                n.classList.add("spinner");
                const d = s.editorState.getState().text,
                    c = o.getStartOfParagraph(d, s.activeSuggestionData.LeftPos, !1),
                    p = o.getEndOfParagraph(d, s.activeSuggestionData.RightPos, !1),
                    h = {
                        Text: d.substring(c, p),
                        Solution: s.activeSuggestionData.MotSolution.vectSolution[0].Left,
                        LeftPos_Mistake: s.activeSuggestionData.LeftPos - c,
                        RightPos_Mistake: s.activeSuggestionData.RightPos - c,
                        IdLanguage: i.globalUser.resolveLangVariant(s.correction_language, s.userLocationLangVariants),
                        IsLong: !0
                    };
                new a.TextSolutionServlet(s.website, s.correction_language, i.globalUser.isPremium()).getDetailedExplanation(h, (new AbortController).signal).then(e => g(s, n, e)).finally(() => {
                    s.freezePopupSuggestion = !1
                })
            }
        } else if (n.closest(".unknown-word--group")) {
            e.stopPropagation();
            const t = i.globalState.getCoreOfSolutionPopup(n),
                r = t.ui.shadowRoot.querySelector(".popup > .unknown-word");
            if (r)
                if (n.classList.contains("unknown-word--no-button")) r.classList.remove("show"), document.addEventListener("mousedown", e => {
                    t.freezePopupSuggestion = !1
                }, {
                    once: !0,
                    capture: !0
                });
                else if (n.classList.contains("unknown-word--yes-button")) {
                t.freezePopupSuggestion = !1, t.element.dispatchEvent(new Event("blur"));
                const e = n.vectSolution.start,
                    r = n.vectSolution.end,
                    o = t.storageMapPos.findInRange(e, r, !1);
                t.storageMapPos.remove(o);
                const a = t.editorState.text.substring(e, r);
                (new s.DictServlet).addWordPersonalDictionary(i.globalUser.info[7], a)
            }
        }
    }, t.onScroll = function(e) {
        const t = i.globalState.getCore(e.target);
        t && (t.expandTextareaIfRequired(), t.syncMirror(), t.updatePosition(), t.rephraser.adjustPopupPosition(!0))
    }, t.onWheel = function(e) {
        const t = i.globalState.getCore(e.target);
        t && t.dispatchScrollEvent()
    }, t.onBlur = function(e) {
        r.logger("onBlur", e);
        const t = i.globalState.getCore(e.target);
        t && (t.clearSolutionWrapperIfRequired(), setTimeout(() => {
            t.dispatchScrollEvent()
        }, 50))
    }, t.onPasteEvent = function(e) {
        e.preventDefault(), r.logger("onPasteEvent", e);
        const t = i.globalState.getCore(e.target);
        if (t) {
            let n = e.clipboardData.getData("text/plain");
            n.trim().length > 0 && t.firstRequest && t.dispatchScribensEvent({
                type: "panelWait",
                value: !0
            }), n = n.split("\n").map(e => e.trim().length > 0 ? e.replace(/^\s+/g, "") : e).join("\n"), t.insertText(n)
        }
    }, t.onCutEvent = function(e) {
        r.logger("onCutEvent", e);
        const t = i.globalState.getCore(e.target);
        if (t) {
            t.editorState.pushState();
            const e = t.editorState.caret,
                n = t.editorState.selectedText,
                i = t.storageMapPos.findInRange(e, e + n.length);
            t.storageMapPos.remove(i), setTimeout(() => {
                t.expandTextareaIfRequired(), t.syncMirror(), t.updatePosition();
                const e = t.editorState.shiftState();
                r.logger("IQueueState", e), e && (t.editorState.setState(), t.storageMapPos.handleState(e, t.editorState.getState()))
            }, 15)
        }
    }, t.displayDetailExplanation = g
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(3),
        s = n(1);
    class r extends i.HttpBase {
        constructor(e, t, n, i = !1) {
            super(), this.servlet = "TextSolution_Servlet", this.isMultiThread = !1, this.websiteLang = "", this.isTest = !1, this.websiteLang = e, this.domain = this.findDomain(e, t), this.isPremium = n, this.isMultiThread = i, s.logger("TextSolutionServlet", this.domain, this.isPremium, this.isMultiThread)
        }
        async getSolutionsByPos(e, t) {
            return this.request({
                FunctionName: "GetSolutionsByPos",
                plugin: i.HttpBase.plugin,
                ...e
            }, t)
        }
        async getDetailedExplanation(e, t) {
            return this.request({
                FunctionName: "Get_Detailed_Explanation",
                plugin: i.HttpBase.plugin,
                ...e,
                ...this.premiumUser()
            }, t)
        }
        async getLanguageVariant_Location(e, t) {
            return this.request({
                FunctionName: "Get_LanguageVariant_Location",
                plugin: i.HttpBase.plugin,
                ...e,
                ...this.premiumUser()
            }, t)
        }
        async getStyle(e, t) {
            return this.request({
                FunctionName: "Get_Style",
                plugin: i.HttpBase.plugin,
                ...e
            }, t)
        }
        async getStats(e, t) {
            return this.request({
                FunctionName: "GetStats",
                plugin: i.HttpBase.plugin,
                ...e,
                ...this.premiumUser()
            }, t)
        }
        tomcatInstance() {
            return this.isTest ? "TEST_S1_TEST" : this.isMultiThread ? "ScribensRandom" : this.isPremium ? "ScribensPremium" : "Scribens"
        }
    }
    t.TextSolutionServlet = r
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(3);
    class s extends i.HttpBase {
        constructor() {
            super(...arguments), this.servlet = "OtherAlg_Ref_Servlet"
        }
        async getSelectionSentences(e, t) {
            return "fr" === e.IdLanguage ? this.domain = "scribens.fr" : this.domain = "scribens.com", this.request({
                FunctionName: "Get_Selection_Sentences",
                IdLanguage: window.chrome.i18n.lang,
                ...e,
                ...this.premiumUser()
            }, t)
        }
        async getRephrase(e, t) {
            return this.request({
                FunctionName: "Get_Rephrase",
                Plugin: i.HttpBase.plugin,
                ...e,
                ...this.premiumUser()
            }, t)
        }
        async getSynonyms(e, t) {
            return "fr" === e.IdLanguage ? this.domain = "scribens.fr" : this.domain = "scribens.com", this.request({
                FunctionName: "Get_Synonyms",
                Plugin: i.HttpBase.plugin,
                ...e,
                ...this.premiumUser()
            }, t)
        }
        async getSummarizing(e, t) {
            return this.request({
                FunctionName: "Get_Summarizing",
                Plugin: i.HttpBase.plugin,
                ...e,
                ...this.premiumUser()
            }, t)
        }
        async getTranslation(e, t) {
            return this.request({
                FunctionName: "Get_Translation",
                Plugin: i.HttpBase.plugin,
                ...e,
                ...this.premiumUser()
            }, t)
        }
        async getRewriting(e, t) {
            return this.request({
                FunctionName: "Get_Rewriting",
                Plugin: i.HttpBase.plugin,
                ...e,
                ...this.premiumUser()
            }, t)
        }
        async getUsePremium() {
            return this.request({
                FunctionName: "Get_Use_Premium",
                Plugin: i.HttpBase.plugin,
                ...this.premiumUser()
            })
        }
    }
    t.OtherAlg_Servlet = s
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    class i extends Error {
        constructor(e) {
            super(e), this.name = "NetworkError"
        }
    }
    t.NetworkError = i
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.stringToObject = function(e) {
        return e && /\|/.test(e) ? e.split("|").map(e => {
            const t = e.split(":"),
                n = {},
                i = String(t[0]).trim(),
                s = String(t[1]).trim();
            return n[i] = s, n
        }).reduce((e, t) => ({
            ...e,
            ...t
        }), {}) : {}
    }, t.objectToString = function(e) {
        return Object.keys(e).map(t => `${t}: ${e[t]}`).join("|").replace(/\s+/g, "")
    }, t.scribens_i18n = function() {
        [...document.querySelectorAll("[data-scribens-i18n]")].forEach(e => {
            let t = "";
            if (/^attr/.test(e.dataset.scribensI18n)) {
                const [t, n] = e.dataset.scribensI18n.split("|")
            } else t = e.dataset.scribensI18n;
            if (/^html/.test(e.dataset.scribensI18n)) e.innerHTML = window.chrome.i18n.getMessage(e.dataset.scribensI18n);
            else if (/^attr/.test(e.dataset.scribensI18n)) {
                const [t, n] = e.dataset.scribensI18n.split("|"), [, i] = t.split(":");
                e.setAttribute(i, window.chrome.i18n.getMessage(n))
            } else e.innerText = window.chrome.i18n.getMessage(e.dataset.scribensI18n)
        })
    }
}, function(e, t, n) {
    "use strict";
    var i = this && this.__importStar || function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const s = n(0),
        r = n(4),
        o = n(2);
    s.globalState.currentScript = document.currentScript;
    const a = () => {
        const e = {
            capture: !0,
            passive: !0
        };
        document.addEventListener("click", r.onDocumentClick, e), document.addEventListener("keyup", r.onDocumentKeyUp, e), window.addEventListener("resize", r.onWindowResize, e);
        let t = null;
        if (s.globalState.currentScript && s.globalState.currentScript.src.indexOf("?") > 0) {
            const e = s.globalState.currentScript.src,
                n = new URLSearchParams(e.substring(e.indexOf("?") + 1));
            n && n.get("lang") && (t = n.get("lang"))
        }
        const a = o._normalizeLocale(t || document.documentElement.lang || "fr");
        window.chrome = window.chrome || {}, "i18n" in window.chrome || (window.chrome.i18n = {
            lang: a,
            locales: {},
            getMessage(e) {
                const t = window.chrome.i18n.lang;
                return t in window.chrome.i18n.locales && e in window.chrome.i18n.locales[t] ? window.chrome.i18n.locales[t][e].message : ""
            }
        }, ["fr", "en"].forEach(e => {
            Promise.resolve().then(() => i(n(33)(`./${e}/messages.json`))).then(t => {
                window.chrome.i18n.locales[e] = t
            }).then(() => {
                document.dispatchEvent(new CustomEvent("scribens-i18n"))
            })
        }));
        const l = document.querySelector("#editor-wrapper");
        if (l) {
            const e = document.createElement("textarea");
            e.id = "editor-textarea", e.setAttribute("spellcheck", "false"), document.addEventListener("scribens-i18n", () => {
                e.setAttribute("placeholder", window.Labels.textarea_placeholder)
            }, {
                once: !0
            }), l.appendChild(e), o.createScribensElement(e), window.scribensEditor = s.globalState.getCore(e), document.dispatchEvent(new CustomEvent("scribens-editor-loaded"))
        }
    };
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", a) : a()
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(11);
    t.GlobalState = class {
        constructor() {
            this.cores = []
        }
        hostIsDisabled() {
            return !1
        }
        createCore(e) {
            e.setAttribute("spellcheck", "false");
            const t = new i.Core(e);
            this.cores.push(t)
        }
        getCore(e) {
            let t = this.cores.find(t => t.element === e);
            if (t || (t = this.getCoreOfIframe(e)), t || (t = this.getCoreOfMirror(e)), t || (t = this.getCoreOfScrollElement(e)), !t && e instanceof HTMLElement && e.closest('[contenteditable="true"]') && (t = [...this.cores].filter(t => t.element === e.closest('[contenteditable="true"]')).shift()), !t && e instanceof HTMLElement && e.parentElement && e.parentElement.closest('[contenteditable="true"]') && (t = [...this.cores].filter(t => t.element === e.closest('[contenteditable="true"]')).shift()), !t && "closest" in e && e.closest('[contenteditable="true"]') && e.closest('[contenteditable="true"]').parentElement.closest('[contenteditable="true"]')) {
                const n = e.closest('[contenteditable="true"]').parentElement.closest('[contenteditable="true"]');
                t = [...this.cores].filter(e => e.element === n).shift()
            }
            return t
        }
        getCoreOfIframe(e) {
            return e instanceof HTMLIFrameElement ? [...this.cores].filter(t => t.iframe === e).shift() : null
        }
        getCoreOfButton(e) {
            const t = e.closest(".main-button");
            return t ? [...this.cores].filter(e => e.ui.button === t).shift() : null
        }
        getCoreOfSolutionPopup(e) {
            let t = this.cores.find(t => t.ui.solutionWrapper === e);
            return !t && e.closest(".popup") && (t = [...this.cores].filter(t => t.ui.solutionWrapper === e.closest(".popup")).shift()), t
        }
        getCoreOfMirror(e) {
            return this.cores.find(t => t.mirrorLayout === e)
        }
        getCoreOfScrollElement(e) {
            return this.cores.find(t => t.scrollElement === e)
        }
        hidePopupSettings(e = null) {
            this.cores.forEach(t => {
                t.ui.settingsWrapper && t.ui.settingsWrapper.classList.contains("show") && (t.ui.settingsWrapper.classList.remove("show"), t.ui.settingsWrapper.classList.remove("settings-wrapper-reverse"), t.ui.settingsWrapper.querySelector("ul").dataset.expand = "false"), t.clearSolutionWrapperIfRequired(e)
            })
        }
        isReady() {
            return !0
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const s = i(n(12)),
        r = n(0),
        o = n(3),
        a = n(1),
        l = n(8),
        d = n(13),
        g = n(4),
        c = n(15),
        p = n(17),
        h = n(18),
        u = n(27),
        m = n(28),
        y = n(29),
        M = n(30),
        w = n(31),
        f = n(2),
        b = n(6),
        x = n(5);
    t.Core = class {
        constructor(e) {
            if (this.autoCheck = !1, this.firstRequest = !0, this.freezePopupSuggestion = !1, this.lang = r.globalUser.getLang(), this.mode = "^Cor$", this.website = "", this.correction_language = r.globalUser.getLang(), this.prefixFolder = ["fr", "en"].includes(document.documentElement.lang) ? "" : "../", this.activeSuggestionData = null, this.userLocationLangVariants = [], this.autoExpandableTextarea = !1, this.isRtl = !1, this.solPropositions = [], this.solSelectionResponse = null, this.current = {
                    top: 0,
                    left: 0,
                    position: "relative",
                    height: "0px",
                    width: "fit-content"
                }, this.dmp = new s.default, this.editorState = new d.EditorState(this), this.storageMapPos = new m.StorageMapPos(this), this.ui = new w.UI(this), this.network = new p.Network(this), this.tooltip = new M.Tooltip(this), this.session = new u.Session(this), this.rephraser = new h.Rephraser(this), this.synonymer = new y.Synonymer(this), e instanceof HTMLElement) {
                if (e instanceof HTMLIFrameElement) {
                    if (this.iframe = e, !(e = this.iframe.contentDocument.querySelector('[contenteditable="true"]'))) return;
                    e.setAttribute("spellcheck", "false")
                }
                this.element = e, this.tagName = e.nodeName.toLowerCase(), this.parentElement = e.parentElement, this.attach()
            }
        }
        attach() {
            if (("textarea" === this.tagName || "input" === this.tagName && "text" === this.element.type) && (this.util = new c.SimpleUtil(this)), !this.util) return void this.detach();
            const e = this.iframe ? this.iframe.dataset.scribensSLN : this.element.dataset.scribensSLN;
            this.session.addStorageItem("consumed_chars_limit", e), this.iframe && delete this.iframe.dataset.scribensSLN, delete this.element.dataset.scribensSLN, this.parentElement.addEventListener("editor:settings", e => {
                a.logger("editor:settings", e.detail);
                const {
                    type: t,
                    value: n
                } = e.detail;
                if ("fontSize" === t && (this.element.style.fontSize = n + "px", this.storageMapPos.redrawAll()), "corMode" === t) {
                    if (this.mode === n) return;
                    this.mode = n, this.storageMapPos.redrawAll(!0)
                }
                "authorize" === t && (n ? (r.globalUser.info = {
                    ...n
                }, r.globalUser.options = l.stringToObject(r.globalUser.info[16])) : (r.globalUser.info = {}, r.globalUser.options = {}), setTimeout(() => {
                    this.rephraser.adjustPopupPosition(), this.synonymer.adjustPopupPosition(), this.setAutoExpandableTextarea()
                }, 300)), "user-settings" === t && (n && (r.globalUser.options = l.stringToObject(n)), this.setAutoExpandableTextarea())
            }), this.parentElement.addEventListener("editor:action", e => {
                a.logger("editor:action", e.detail);
                const {
                    action: t
                } = e.detail;
                if ("correction" === t) {
                    const {
                        type: t,
                        text: n,
                        leftPos: i,
                        rightPos: s
                    } = e.detail;
                    if (this.replaceText(n, i, s), "synonym" === t && ["connexion", "forum"].includes(n)) {
                        const e = {
                            fr: s + 2,
                            en: s - 5
                        } [this.lang];
                        this.parentElement.dispatchEvent(new CustomEvent("guide-tour:event", {
                            detail: {
                                type: "rects",
                                value: this.util.findClientRects({
                                    LeftPos: i,
                                    RightPos: e
                                }),
                                debug: !1
                            }
                        }))
                    }
                }
                if ("selection" === t) {
                    const {
                        leftPos: t,
                        rightPos: n
                    } = e.detail;
                    this.util.setSelection(t, n)
                }
                if ("guide-tour:selection" === t) {
                    const {
                        leftPos: t,
                        rightPos: n
                    } = e.detail;
                    this.util.setSelection(t, n), this.parentElement.dispatchEvent(new CustomEvent("guide-tour:event", {
                        detail: {
                            type: "rects",
                            value: this.util.findClientRects({
                                LeftPos: t,
                                RightPos: n
                            }),
                            debug: !1
                        }
                    }))
                }
                if ("guide-tour:click" === t) {
                    const {
                        index: t
                    } = e.detail;
                    this.util.setSelection(t, t);
                    const n = new MouseEvent("click", {
                        view: window,
                        bubbles: !0,
                        cancelable: !0
                    });
                    this.element.dispatchEvent(n)
                }
            });
            const t = r.globalUser.localOptionCor();
            t && (this.element.style.fontSize = (t.FontSize || "17") + "px"), this.setBoundsAndStyle(), this.createLayouts(), this.findScrollElement(), this.util.attach(), this.syncMirror(), this.connectParentObserver(), this.updatePosition(), this.editorState.setState(), this.checkIfNotEmpty(), a.logger(this)
        }
        detach() {
            a.logger("detach", this.element), this.util && this.util.detach(), this.layout && this.layout.isConnected && this.layout.parentElement.removeChild(this.layout), this.parentMutationObserver && this.parentMutationObserver.disconnect(), this.tooltip.layer && this.tooltip.layer.remove(), this.ui.detach();
            const e = r.globalState.cores.findIndex(e => e === this);
            e >= 0 && r.globalState.cores.splice(e, 1), f.isIframe() && "body" === this.tagName && document.body.isConnected && g.onDocumentClick({
                target: document.body
            })
        }
        setBoundsAndStyle() {
            this.elementBounds = this.element.getBoundingClientRect(), this.elementStyle = window.getComputedStyle(this.element), this.frameLayout && (this.frameBounds = this.frameLayout.getBoundingClientRect())
        }
        shouldUpdateRelativeLayout() {
            return Math.abs(this.elementBounds.top - this.current.top) > 0 || Math.abs(this.elementBounds.left - this.current.left) > 0
        }
        updatePosition() {
            this.setBoundsAndStyle(), this.shouldUpdateRelativeLayout() && (this.current = this.getStyleRelativeLayout(), Object.assign(this.relativeLayout.style, this.currentValuesToString())), Object.assign(this.overlayLayout.style, this.getStyleOverlayLayout()), Object.assign(this.frameLayout.style, this.getStyleFrameLayout(this.overlayLayout.style.paddingBottom)), Object.assign(this.canvasLayout.style, this.getStyleCanvasLayout());
            const {
                scrollTop: e,
                scrollLeft: t
            } = this.element;
            this.frameLayout.scrollTop = e, this.frameLayout.scrollLeft = t
        }
        syncMirror() {
            this.mirrorLayout && (this.element instanceof HTMLTextAreaElement || this.element instanceof HTMLInputElement) && (this.mirrorLayout.textContent = this.element.value + "\r\n", this.element.dataset.characterLimit && setTimeout(() => {
                this.syncMirror()
            }, 500))
        }
        dispatchScrollEvent() {
            "input" === this.tagName && this.element.dispatchEvent(new Event("scroll"))
        }
        dispatchState(e) {
            this.dispatchScribensEvent({
                type: "state",
                value: e
            })
        }
        expandTextareaIfRequired() {
            if (this.autoExpandableTextarea) {
                this.element.style.height = "auto", a.logger(`autoExpandableTextarea: resize textarea height: ${this.element.clientHeight}px -> ${this.element.scrollHeight}px`);
                const e = window.screen.height > 768 ? 1030 : 265;
                this.element.scrollHeight > e ? this.element.style.height = this.element.scrollHeight + "px" : this.element.style.height = e + "px"
            } else this.element.style.removeProperty("height")
        }
        dispatchScribensEvent(e) {
            this.parentElement.dispatchEvent(new CustomEvent("editor:event", {
                detail: {
                    ...e,
                    debug: !1
                }
            }))
        }
        getStorageMapPosArray() {
            return this.storageMapPos.array
        }
        copyToClipboard() {
            this.editorState.text.length > 0 && (a.logger("copyToClipboard", this.editorState.text), navigator.clipboard.writeText(this.editorState.text))
        }
        pasteFromClipboard(e = !1) {
            navigator.clipboard.readText().then(t => {
                a.logger("pasteFromClipboard", t), t.trim().length > 0 && e && (this.dispatchScribensEvent({
                    type: "panelWait",
                    value: !0
                }), this.storageMapPos.removeAll(), this.editorState.clearStates(), this.clearTextEditor()), this.insertText(t)
            })
        }
        insertText(e, t = !0) {
            const n = this.element,
                i = this.editorState.getState();
            a.logger("IQueueState", i);
            const s = n.selectionStart,
                r = n.selectionEnd,
                o = n.value.substring(0, s),
                l = n.value.substring(r);
            e = e.replace(/<[^>]*>/g, ""), n.value = o + e + l;
            const d = o.length + e.length;
            n.selectionStart = d, n.selectionEnd = d, this.editorState.setState();
            const g = this.storageMapPos.findInRange(s, r, !1);
            this.storageMapPos.remove(g), t && this.storageMapPos.handleState(i, this.editorState.getState()), this.expandTextareaIfRequired()
        }
        clearTextEditor() {
            a.logger("clearTextEditor"), this.element.value = "", this.storageMapPos.removeAll()
        }
        getEditorText() {
            return this.editorState.text
        }
        setEditorText(e, t = !0) {
            a.logger("setEditorText", e), this.clearTextEditor(), this.insertText(e, t)
        }
        checkEditorText() {
            a.logger("checkEditorText"), this.network.request([0, this.editorState.text.length], !0)
        }
        getSelectedText() {
            return a.logger("getSelectedText"), this.editorState.selectedText
        }
        getOptionsStyle() {
            return r.globalUser.optionsStyle()
        }
        getListOfTones() {
            return f.listOfTones
        }
        getListOfLanguages() {
            return f.listOfLanguages
        }
        async getSummarizing(e, t) {
            return a.logger("getSummarizing"), (new b.OtherAlg_Servlet).getSummarizing({
                ...e,
                Nbc: this.session.nbc(e.Text)
            }, t)
        }
        async getTranslation(e, t) {
            return a.logger("getTranslation"), (new b.OtherAlg_Servlet).getTranslation({
                ...e,
                Nbc: this.session.nbc(e.Text)
            }, t)
        }
        async getRewriting(e, t) {
            return a.logger("getRewriting"), (new b.OtherAlg_Servlet).getRewriting({
                ...e,
                Nbc: this.session.nbc(e.Text)
            }, t)
        }
        async getUsePremium() {
            return a.logger("getUsePremium"), (new b.OtherAlg_Servlet).getUsePremium()
        }
        setStorageMapPosArray(e) {
            this.storageMapPos.handleResponse(e, 0, this.editorState.text.length), e.StatText && this.dispatchScribensEvent({
                type: "editor:StatText",
                value: e.StatText
            })
        }
        toggleCanvasVisibility(e) {
            a.logger("toggleCanvasVisibility", e), this.canvasLayout.style.visibility = e ? "visible" : "hidden"
        }
        setPlugin(e) {
            a.logger("setPlugin", e), o.HttpBase.plugin = e
        }
        extendSelectionToEndOfSentence() {
            a.logger("extendSelection");
            const e = this.element,
                t = f.getEndOfSentence(this.editorState.text, e.selectionEnd, !0);
            e.selectionEnd = t
        }
        getClientRectsOfSelection() {
            a.logger("getPositionOfSelection");
            const e = this.element;
            return this.util.findClientRects({
                LeftPos: e.selectionStart,
                RightPos: e.selectionEnd
            })
        }
        runRephraser() {
            a.logger("runRephraser"), this.rephraser.Start()
        }
        runSynonymer() {
            a.logger("runSynonymer"), this.synonymer.showPopup()
        }
        setLang(e, t = !0) {
            a.logger("setLang", e, t), e = f._normalizeLocale(e), this.correction_language = e, this.rephraser.setLanguage(e, t), this.element.dispatchEvent(new CustomEvent("langChanged", {
                detail: {
                    lang: e
                }
            })), r.globalUser.stylePanelIsOpen = r.globalUser.stylePanelIsOpen && "en" === e
        }
        setWebsite(e) {
            a.logger("setWebsite", e), this.website = f._normalizeLocale(e), r.globalUser.lang_display = this.website
        }
        setDailyLimit(e) {
            a.logger("setDailyLimit", e), this.session.initialize(), this.session.addStorageItem("daily_chars_limit", e)
        }
        recheckText() {
            this.storageMapPos.removeAll(), this.ui.solutionWrapper.innerHTML = "", this.autoCheck = !0, this.network.request([0, this.editorState.text.length])
        }
        autoResize(e, t = !0) {
            e.classList.remove("container--top-aligned");
            const n = e.classList.contains("container--is-open");
            if (a.logger(`autoResize (${e.id||e.className}): containerIsOpen ${n}, fixedWidth ${t}`), n) {
                const t = e.classList.contains("language-grid");
                t && (e = e.querySelector(".styled-grid")), e.removeAttribute("style");
                const n = e.getBoundingClientRect(),
                    i = n.bottom > window.innerHeight,
                    s = n.right > window.innerWidth || n.left < 0;
                if (a.logger("autoResize: yOverflow", i, "xOverflow", s), i || s) {
                    if (i) {
                        const i = t ? 70 : 40,
                            s = window.innerHeight - n.top - i;
                        if (s > 150) n.height > s && (e.style.maxHeight = s + "px", e.style.overflowY = "auto", e.style.minHeight = "auto");
                        else {
                            e.classList.add("container--top-aligned");
                            const t = e.getBoundingClientRect();
                            if (t.top < 80) {
                                const n = t.bottom - 40;
                                e.style.maxHeight = n + "px", e.style.overflowY = "auto", e.style.minHeight = "auto"
                            }
                        }
                    }
                    if (s) {
                        const t = e.parentElement.getBoundingClientRect();
                        e.style.left = `-${t.left-10}px`, e.style.overflowX = "auto", e.style.width = "auto", e.style.maxWidth = window.outerWidth - 20 + "px"
                    }
                } else e.removeAttribute("style");
                n.right > window.innerWidth && (e.style.left = window.innerWidth - n.width + "px")
            }
        }
        clearSolutionWrapperIfRequired(e = null) {
            if (!this.ui.solutionWrapper) return;
            if (!this.ui.solutionWrapper.childNodes.length) return;
            if (this.freezePopupSuggestion) return;
            const t = this.ui.solutionWrapper instanceof HTMLElement && this.ui.solutionWrapper.querySelector(".solutions-link");
            if (!e && this.activeSuggestionData && ("fr" !== this.ui.solutionWrapper.dataset.lang || t)) return;
            const n = e && "target" in e ? e.target : null;
            n && n.closest(".clickable") || (this.activeSuggestionData = null, this.ui.solutionWrapper.innerHTML = "", this.solAbortController && (this.solAbortController.abort(), this.solAbortController = null))
        }
        resolveUserVariantLang(e) {
            return r.globalUser.resolveLangVariant(e, this.userLocationLangVariants)
        }
        setUserLanguageVariantByLocation() {
            const e = this.website + "/variants/location";
            new x.TextSolutionServlet(this.website, this.correction_language, r.globalUser.isPremium()).getLanguageVariant_Location({}, (new AbortController).signal).then(t => {
                let n = [...JSON.parse(localStorage.getItem(e) || "[]") || [], ...t || []];
                n = [...new Set(n.map(e => f._normalizeLocale(e)))], this.userLocationLangVariants = n, localStorage.setItem(e, JSON.stringify(this.userLocationLangVariants))
            })
        }
        setAutoExpandableTextarea() {
            if (r.globalUser.isPremium()) {
                const e = JSON.parse(localStorage.getItem("settings/expandable_textarea")) || [];
                this.autoExpandableTextarea = e.includes(r.globalUser.info[7]), this.element.classList.toggle("auto-expandable-textarea", this.autoExpandableTextarea), a.logger("autoExpandableTextarea", this.autoExpandableTextarea)
            } else this.autoExpandableTextarea = !1;
            this.expandTextareaIfRequired()
        }
        getAiStyle() {
            const e = this.editorState.getState().text;
            if (0 === e.trim().length) return Promise.resolve();
            const t = {
                Text: `<p>${e.replace(/[\r\n]/g,"<br>").replace(/<br>$/,"")}</p>`,
                IdLanguage: r.globalUser.resolveLangVariant(this.correction_language, this.userLocationLangVariants),
                ...r.globalUser.isAuthorized() ? {
                    Id: r.globalUser.info[7],
                    Password: r.globalUser.info[8]
                } : {}
            };
            return new x.TextSolutionServlet(this.website, this.correction_language, r.globalUser.isPremium()).getStyle(t, (new AbortController).signal).then(t => {
                t && "object" == typeof t.Map_PosSol && this.storageMapPos.handleResponse(t, 0, e.length)
            })
        }
        setPanelOpenState(e, t, n = !0) {
            if ("ai-style" === e ? (r.globalUser.stylePanelIsOpen = t, r.globalUser.statsPanelIsOpen = !1) : "statistics" === e && (r.globalUser.statsPanelIsOpen = t, r.globalUser.stylePanelIsOpen = !1), !n) return;
            let i = {
                "ai-style": "settings/style_panel_open_count",
                statistics: "settings/statistics_panel_open_count"
            } [e];
            const s = i + "/first_open_date";
            let o = (new Date).toISOString().split("T")[0],
                a = JSON.parse(localStorage.getItem(i)) || {};
            if (localStorage.getItem(s) || localStorage.setItem(s, o), t && !r.globalUser.isPremium()) {
                a[o] ? a[o] += 1 : a[o] = 1;
                for (let e in a) e !== o && delete a[e];
                localStorage.setItem(i, JSON.stringify(a))
            }
            this.element.dispatchEvent(new CustomEvent("sidebar:panel-state", {
                detail: {
                    mode: e,
                    state: t,
                    openCount: r.globalUser.isPremium() ? 0 : a[o] || 0,
                    isFirstDay: localStorage.getItem(s) === o
                }
            }))
        }
        updateUserPassword(e) {
            r.globalUser.info[8] = e, this.element.dispatchEvent(new CustomEvent("userPasswordUpdated", {
                detail: {
                    newPassword: e
                }
            }))
        }
        updateRtlState() {
            this.isRtl = ["ar", "he", "fa", "ur", "ps", "ug"].includes(this.correction_language), this.isRtl ? this.element.setAttribute("dir", "rtl") : this.element.removeAttribute("dir")
        }
        normalizedString(e) {
            return f.normalizedString(e)
        }
        getStats() {
            const e = {
                    Text: `<p>${this.editorState.getState().text.replace(/[\r\n]/g,"<br>").replace(/<br>$/,"")}</p>`,
                    LangId: this.correction_language
                },
                t = (new AbortController).signal;
            return new x.TextSolutionServlet(this.lang, this.correction_language, r.globalUser.isPremium()).getStats(e, t)
        }
        normalizeLocale(e) {
            return f._normalizeLocale(e)
        }
        async getSelectionSentences(e) {
            if (!r.globalUser.isPremium()) {
                const e = this.website + "/selection_sentences",
                    t = (new Date).toISOString().split("T")[0];
                let n = JSON.parse(localStorage.getItem(e) || "{}");
                if (n[t] || (n = {}, n[t] = 0), n[t] >= 10) return this.activeSuggestionData = null, this.suggestionWrapperErrorContent({
                    Error: "lim_request_per_day_reached"
                }), !1;
                localStorage.setItem(e, JSON.stringify(n))
            }
            this.solPropositions = [], this.solSelectionResponse = null, this.solAbortController && (this.solAbortController.abort(), this.solAbortController = null);
            const t = document.createElement("div");
            t.className = "spinner-wrapper";
            const n = document.createElement("div");
            n.className = "spinner", t.appendChild(n), this.ui.solutionWrapper.querySelector(".suggestion-wrapper").appendChild(t);
            const i = {
                TextHTML: `<p>${this.getEditorText().replace(/[\r\n]/g,"<br>")}</p>`,
                LeftPos_Sel: e.LeftPos,
                RightPos_Sel: e.RightPos,
                IdLanguage: this.correction_language
            };
            this.solAbortController = new AbortController, a.logger("getSelectionSentences", i);
            try {
                const e = await (new b.OtherAlg_Servlet).getSelectionSentences(i, this.solAbortController.signal);
                if (e.Error) return this.solSelectionResponse = null, this.suggestionWrapperErrorContent(e), !1;
                this.solSelectionResponse = e
            } catch {
                return this.solSelectionResponse = null, this.suggestionWrapperErrorContent({
                    Error: "unable_display_result"
                }), !1
            }
            return this.solSelectionResponse.Type = e.TypeName, await this.getRephrase(), !0
        }
        async getRephrase(e = !1) {
            const t = this.solSelectionResponse,
                n = {
                    Text: t.Text,
                    Nbc: this.session.nbc(t.Text),
                    NbSentences: t.NbSentences,
                    Tone: "nope",
                    IdLanguage: this.correction_language,
                    IdLangDisplay: this.lang,
                    Others: e,
                    Type: {
                        pl: "sent_long",
                        pv: "sent_exccommas",
                        pp: "sent_excparenthesis",
                        Redundancy: "sent_redundancies"
                    } [t.Type] || t.Type
                };
            this.solAbortController = new AbortController, a.logger("getRephrase", n);
            try {
                const t = await (new b.OtherAlg_Servlet).getRephrase(n, this.solAbortController.signal);
                if (t.Error) return this.solPropositions = [], this.solSelectionResponse = null, this.solAbortController = null, void this.suggestionWrapperErrorContent(t);
                if (this.renderRephraseList(t, e), !r.globalUser.isPremium()) {
                    const e = this.website + "/selection_sentences",
                        t = (new Date).toISOString().split("T")[0];
                    let n = JSON.parse(localStorage.getItem(e) || "{}");
                    n[t] += 1, localStorage.setItem(e, JSON.stringify(n))
                }
            } catch {
                return this.solPropositions = [], this.solSelectionResponse = null, this.solAbortController = null, void this.suggestionWrapperErrorContent({
                    Error: "unable_display_result"
                })
            }
        }
        renderRephraseList(e, t = !1) {
            if (!e || !Array.isArray(e.Vect_Propositions)) return;
            const n = this.ui.solutionWrapper.querySelector(".suggestion-wrapper");
            let i = n.querySelector(".sol-wrapper"),
                s = n.querySelector(".rephrase-list--wrapper"),
                o = Number(n.parentElement.dataset.count || 0);
            n.parentElement.dataset.count = String(o + e.Vect_Propositions.length), t || (n.innerHTML = "", s = null, i = null), i || (i = document.createElement("div"), i.className = "sol-wrapper", n.appendChild(i)), s || (s = document.createElement("div"), s.className = "rephrase-list--wrapper", i.appendChild(s));
            for (let t = 0; t < e.Vect_Propositions.length; t += 1) {
                if (this.solPropositions.includes(e.Vect_Propositions[t])) continue;
                this.solPropositions.push(e.Vect_Propositions[t]);
                const n = document.createElement("div");
                n.className = "rephrase-list--item", n.innerHTML = e.Vect_Propositions[t].replace(/[\r\n]/g, "<br>"), n.onclick = () => {
                    this.replaceRephraseSentence(e.Vect_Propositions[t]), this.activeSuggestionData = null, this.element.focus()
                }, s.appendChild(n)
            }
            if (!t && (i.appendChild(s), r.globalUser.isPremium())) {
                const e = document.createElement("div");
                e.className = "rephrase-list--load-more-wrapper";
                const t = document.createElement("button");
                t.className = "rephrase-list--load-more", t.innerHTML = window.Labels.rephrase_other_propositions + " <span></span>", t.onclick = async e => {
                    e.preventDefault(), e.stopPropagation(), t.classList.add("loading"), t.disabled = !0, t.querySelector("span").classList.add("spinner"), await this.getRephrase(!0), t.classList.remove("loading"), t.disabled = !1, t.querySelector("span").classList.remove("spinner")
                }, e.appendChild(t), i.appendChild(e)
            }
        }
        replaceRephraseSentence(e) {
            const t = this.solSelectionResponse.Pos_Start,
                n = this.solSelectionResponse.Pos_End;
            if (!this.util.replaceNode(t, n, e)) return;
            const i = n - t,
                s = e.length;
            this.storageMapPos.redrawAfter(t, s - i);
            const r = this.storageMapPos.findInRange(t, t + e.length, !1);
            this.storageMapPos.remove(r);
            const o = this.editorState.getState();
            this.editorState.setState();
            const a = this.editorState.getState().text,
                l = f.getStartOfSentence(a, t, !0),
                d = f.getEndOfSentence(a, n, !0),
                g = f.regexpMode(this.mode);
            if (!this.storageMapPos.array.filter(e => g.test(e.TypeName) && e.LeftPos >= l && e.RightPos <= d).length || "^Cor$" !== this.mode) {
                if (-1 === this.storageMapPos.array.findIndex(e => g.test(e.TypeName))) {
                    const e = this.ui.settingsWrapper.querySelector(".ext-option").querySelector(`input[value="${this.mode}"]`);
                    e && (e.closest("label").style.display = "none")
                }
                this.session.addUncheckedRange([t, n]), this.session.findConsumedText(o, this.editorState.getState()), this.dispatchScribensEvent({
                    type: "storageMapPos"
                })
            }
        }
        suggestionWrapperErrorContent(e) {
            const t = document.createElement("div");
            t.className = "error-content";
            let n = window.Labels.unable_display_result;
            "max_length_request" === e.Error ? n = window.Labels.max_length_request : "no_word" === e.Error ? n = window.Labels.rephrase_sel_noword : "no_prop" === e.Error ? n = window.Labels.rephrase_no_prop : "max_sentences_reached" === e.Error ? n = window.Labels.rephrase_max_sentences_reached : "lim_request_per_day_reached" === e.Error ? n = window.Labels.rephrase_lim_request_per_day_reached : "lim_char_premium_reached" === e.Error ? n = window.Labels.rephrase_lim_char_premium_reached : "premium_max_sentences_reached" === e.Error ? n = window.Labels.rephrase_premium_max_sentences_reached : "premium_unlimited_rephrase" === e.Error && (n = window.Labels.rephrase_premium_unlimited_rephrase);
            let i = {
                lim_request_per_day_reached: this.prefixFolder + "images/rephrase_limit_image.png"
            } [e.Error] || this.prefixFolder + "images/rephrase_error_image.png";
            "max_sentences_reached" === e.Error && r.globalUser.isPremium() && (n = window.Labels.rephrase_premium_max_sentences_reached), t.innerHTML = `<div class="image-container"><img src="${i}"/></div> <p class="error-title">${n}</p>`, "lim_request_per_day_reached" !== e.Error || r.globalUser.isPremium() || (t.innerHTML += `\n        <div class="premium-version-block">\n          <p>${window.Labels.rephrase_premium_unlimited_rephrase}</p>\n          <a href="${window.Labels.premium_link}" id="premium-link" target="_blank">\n            ${window.Labels.limit_upgrade_premium}\n          </a>\n        </div>\n        `);
            const s = this.ui.solutionWrapper.querySelector(".suggestion-wrapper");
            s.innerHTML = "", s.appendChild(t), this.ui.solutionWrapper.dataset.error = e.Error
        }
        findScrollElement() {
            if (this.iframe && "body" === this.tagName) return void(this.scrollElement = this.element);
            let e = this.element,
                t = window.getComputedStyle(e);
            for (; e && !["auto", "scroll", "overlay"].includes(t.overflowY) && e !== document.body;) e = e.parentElement, t = window.getComputedStyle(e);
            this.scrollElement = e
        }
        createLayouts() {
            this.layout = document.createElement("div"), this.layout.className = "scribens-layout", this.layout.setAttribute("style", "all: initial;"), this.layout.attachShadow({
                mode: "open"
            }), this.shadowRoot = this.layout.shadowRoot, this.shadowRoot.appendChild(this.canvasStyles()), this.relativeLayout = document.createElement("div"), this.relativeLayout.className = "scribens-relative-layout", this.shadowRoot.appendChild(this.relativeLayout), this.overlayLayout = document.createElement("div"), this.overlayLayout.className = "scribens-overlay-layout", this.relativeLayout.appendChild(this.overlayLayout), this.frameLayout = document.createElement("div"), this.frameLayout.className = "scribens-frame-layout", this.overlayLayout.appendChild(this.frameLayout), this.canvasLayout = document.createElement("div"), this.canvasLayout.className = "scribens-canvas-layer", this.frameLayout.appendChild(this.canvasLayout), this.util.useMirror && (this.mirrorLayout = document.createElement("div"), this.mirrorLayout.className = "scribens-mirror-layout", this.frameLayout.appendChild(this.mirrorLayout));
            this.util.getAnchor().appendChild(this.layout)
        }
        getStyleRelativeLayout() {
            const e = this.current,
                t = this.element.getBoundingClientRect(),
                n = this.relativeLayout.getBoundingClientRect(),
                i = t.top - n.top,
                s = t.left - n.left;
            return {
                top: Math.abs(i) > 0 ? e.top + i : e.top,
                left: Math.abs(s) > 0 ? e.left + s : e.left,
                position: "relative",
                height: "0px",
                width: "fit-content"
            }
        }
        currentValuesToString() {
            return {
                top: this.current.top + "px",
                left: this.current.left + "px",
                position: this.current.position,
                height: this.current.height,
                width: "fit-content"
            }
        }
        getStyleOverlayLayout() {
            const e = {
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                lineHeight: null,
                height: null,
                width: null
            };
            ["position", "direction", "boxSizing", "writingMode", "width", "height", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize", "display", "visibility"].forEach(t => {
                e[t] = this.elementStyle[t]
            });
            const t = {
                anchor: this.element,
                computedWidth: e.width,
                computedOverflow: this.elementStyle.overflowY || "",
                boxSizing: this.elementStyle.boxSizing,
                isInput: "input" === this.tagName
            };
            if ("input" === this.tagName) {
                const t = this.elementStyle,
                    n = t.boxSizing && "content-box" !== t.boxSizing ? parseFloat(t.height) - parseFloat(t.paddingTop) - parseFloat(t.paddingBottom) - parseFloat(t.borderTopWidth) - parseFloat(t.borderBottomWidth) : this.elementStyle.height;
                e.lineHeight = Number.isNaN(Number(n)) ? n : n + "px", e.whiteSpace = "pre", e.overflow = "hidden"
            }
            if ("function" == typeof this.util.getStyleOverlayLayout && this.util.getStyleOverlayLayout(e), f.isFirefox()) {
                const n = this.elementStyle;
                if (e.top = (parseFloat(n.borderTopWidth) || 0) + "px", e.left = (parseFloat(n.borderLeftWidth) || 0) + "px", "input" !== this.tagName) {
                    const t = this.elementBounds.height - (this.element.offsetHeight - this.element.clientHeight),
                        n = this.elementBounds.width - (this.element.offsetWidth - this.element.clientWidth);
                    e.boxSizing = "content-box", e.height = t + "px", e.width = n + "px"
                } else e.height = Number.isNaN(e.height) ? "unset" : e.height, e.width = Number.isNaN(e.width) ? "unset" : this.getWidth(t)
            } else e.top = "0px", e.left = "0px", e.height = Number.isNaN(e.height) ? "unset" : e.height, e.width = Number.isNaN(e.width) ? "unset" : this.getWidth(t);
            return Object.assign(Object.assign({}, e), {
                position: "absolute",
                pointerEvents: "none",
                resize: "unset",
                backgroundColor: "transparent",
                borderColor: "transparent",
                WebkitTextFillColor: "none",
                color: "transparent",
                willChange: "contents",
                outline: "none",
                lineHeight: Number.isNaN(e.lineHeight) ? "unset" : e.lineHeight,
                padding: "0px"
            })
        }
        getStyleFrameLayout(e) {
            return "function" == typeof this.util.getStyleFrameLayout ? this.util.getStyleFrameLayout() : {
                width: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
                paddingTop: this.elementStyle.paddingTop,
                paddingRight: this.elementStyle.paddingRight,
                paddingBottom: this.elementStyle.paddingBottom,
                paddingLeft: this.elementStyle.paddingLeft,
                height: this.element.scrollHeight > this.element.clientHeight ? `calc(100% + ${e||"2px"})` : "calc(100% + 2px)",
                position: "relative"
            }
        }
        getStyleCanvasLayout() {
            return {
                position: "absolute",
                top: "0px",
                left: "0px",
                height: this.element.scrollHeight - (parseFloat(this.elementStyle.marginTop) || 0) - (parseFloat(this.elementStyle.marginBottom) || 0) + "px",
                width: this.element.scrollWidth - (parseFloat(this.elementStyle.marginLeft) || 0) - (parseFloat(this.elementStyle.marginRight) || 0) + "px",
                mixBlendMode: "darken",
                textAlign: "left"
            }
        }
        getWidth(e) {
            if ("function" == typeof this.util.getWidth) return this.util.getWidth();
            const t = !e.isInput && "hidden" !== e.computedOverflow && e.anchor.scrollHeight - e.anchor.clientHeight && "content-box" !== e.boxSizing && !navigator.platform.startsWith("mac"),
                n = Number.parseFloat(e.computedWidth);
            return t ? n - (() => {
                const e = window.document.createElement("div");
                e.style.width = "100px", e.style.height = "100px", e.style.top = "-9999px", e.style.overflow = "scroll", e.style.position = "absolute", window.document.body.appendChild(e);
                const t = e.offsetWidth - e.clientWidth;
                return window.document.body.removeChild(e), t
            })() + "px" : e.computedWidth
        }
        canvasStyles() {
            const e = document.createElement("style");
            return e.appendChild(document.createTextNode('\n    .mark {\n      position: absolute;\n      pointer-events: none;\n    }\n    \n    .mark:before {\n      content: \'\';\n      position: absolute;\n      width: 0;\n      height: 100%;\n      transition: 0.3s linear;\n      opacity: 0.2;\n      top: 1px; /* remove if underline is enabled */\n      left: 0;\n    }\n    \n    .mark.visible:before {\n      width: 100%;\n    }\n    \n    .mark[data-type="0"]:before {\n      background-color: #d55a43;\n    }\n    \n    .mark[data-type="1"]:before {\n      background-color: #3a8b47;\n    }\n    \n    .mark[data-type="2"]:before {\n      background-color: #ff9d00;\n    }\n    \n    .mark[data-type="3"]:before {\n      background-color: #478aa8;\n    }\n    \n    .mark[data-type-name]:not([data-type-name="Cor"]):before {\n      background-color: #fffa84;\n      opacity: 1;\n      z-index: 1; /* should be over Cor */\n    }\n    \n    .mark[data-type-name="Cor"]:before {\n      /*background-color: #d55a43;*/\n      opacity: 0.2;\n    }\n    \n    .mark[data-type-name="Cor"][data-est-suggestion="true"]:before {\n      background-color: #ff9d00;\n    }\n\n    /* Rephraser */\n    .mark[data-type="Rephrased"][data-type-name="Rephrased"]:before {\n      background-color: #77d5ff;\n      opacity: 0.2;\n    }\n    \n    .mark:after {\n      /*content: \'\';*/\n      position: absolute;\n      bottom: -2px;\n      height: 2px;\n      transition: 0.3s linear;\n      width: 0;\n    }\n    \n    .mark.visible:after {\n      width: 100%;\n    }\n    \n    .mark[data-type="0"]:after {\n      background-color: #d55a43;\n    }\n    \n    .mark[data-type="1"]:after {\n      background-color: #3a8b47;\n    }\n    \n    .mark[data-type="2"]:after {\n      background-color: #ff9d00;\n    }\n    \n    .mark[data-type="3"]:after {\n      background-color: #478aa8;\n    }\n    \n    .mark[data-type-name]:not([data-type-name="Cor"]):after {\n      background-color: #ff9d00;\n      opacity: 0;\n    }\n    \n    .mark[data-type-name="Cor"]:after {\n      /*background-color: #d55a43;*/\n      z-index: 1;\n      opacity: 1;\n    }\n    \n    .mark[data-type-name="Cor"][data-est-suggestion="true"]:after {\n      background-color: #ff9d00;\n    }\n\n    .scribens-canvas-layer[style*="visibility: hidden"] .mark:before,\n    .scribens-canvas-layer[style*="visibility: hidden"] .mark:after {\n      transition: none;\n    }\n\n    @media print {\n      .mark {\n          display: none !important;\n      }\n    }\n    ')), e
        }
        connectParentObserver() {
            this.parentMutationObserver = new MutationObserver(e => {
                this.updatePosition()
            }), this.parentMutationObserver.observe(this.util.getAnchor(), {
                childList: !0
            })
        }
        checkIfNotEmpty() {
            this.autoCheck = !0, this.editorState.text.trim().length > 0 && this.network.request([0, this.editorState.text.length])
        }
        replaceText(e, t, n) {
            if (!this.util.replaceNode(t, n, e)) return;
            const i = n - t,
                s = e.length;
            this.storageMapPos.redrawAfter(t, s - i);
            const r = this.storageMapPos.findInRange(t, t + e.length, !1);
            this.storageMapPos.remove(r);
            const o = this.editorState.getState();
            this.editorState.setState();
            const a = this.editorState.getState().text,
                l = f.getStartOfSentence(a, t, !0),
                d = f.getEndOfSentence(a, n, !0);
            this.network.patchHistory.push({
                start: t,
                end: n,
                time: window.performance.now()
            });
            const g = f.regexpMode(this.mode);
            this.storageMapPos.array.filter(e => g.test(e.TypeName) && e.LeftPos >= l && e.RightPos <= d).length && "^Cor$" === this.mode ? this.ui.button.classList.contains("in-progress") && this.network.request([t, n], !0) : (this.session.addUncheckedRange([t, n]), this.session.findConsumedText(o, this.editorState.getState()), this.network.request([t, n], this.ui.button.classList.contains("in-progress"))), this.dispatchScrollEvent()
        }
    }
}, function(e, t) {
    var n = function() {
        this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = .5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = .5, this.Patch_Margin = 4, this.Match_MaxBits = 32
    };
    n.Diff = function(e, t) {
        return [e, t]
    }, n.prototype.diff_main = function(e, t, i, s) {
        void 0 === s && (s = this.Diff_Timeout <= 0 ? Number.MAX_VALUE : (new Date).getTime() + 1e3 * this.Diff_Timeout);
        var r = s;
        if (null == e || null == t) throw new Error("Null input. (diff_main)");
        if (e == t) return e ? [new n.Diff(0, e)] : [];
        void 0 === i && (i = !0);
        var o = i,
            a = this.diff_commonPrefix(e, t),
            l = e.substring(0, a);
        e = e.substring(a), t = t.substring(a), a = this.diff_commonSuffix(e, t);
        var d = e.substring(e.length - a);
        e = e.substring(0, e.length - a), t = t.substring(0, t.length - a);
        var g = this.diff_compute_(e, t, o, r);
        return l && g.unshift(new n.Diff(0, l)), d && g.push(new n.Diff(0, d)), this.diff_cleanupMerge(g), g
    }, n.prototype.diff_compute_ = function(e, t, i, s) {
        var r;
        if (!e) return [new n.Diff(1, t)];
        if (!t) return [new n.Diff(-1, e)];
        var o = e.length > t.length ? e : t,
            a = e.length > t.length ? t : e,
            l = o.indexOf(a);
        if (-1 != l) return r = [new n.Diff(1, o.substring(0, l)), new n.Diff(0, a), new n.Diff(1, o.substring(l + a.length))], e.length > t.length && (r[0][0] = r[2][0] = -1), r;
        if (1 == a.length) return [new n.Diff(-1, e), new n.Diff(1, t)];
        var d = this.diff_halfMatch_(e, t);
        if (d) {
            var g = d[0],
                c = d[1],
                p = d[2],
                h = d[3],
                u = d[4],
                m = this.diff_main(g, p, i, s),
                y = this.diff_main(c, h, i, s);
            return m.concat([new n.Diff(0, u)], y)
        }
        return i && e.length > 100 && t.length > 100 ? this.diff_lineMode_(e, t, s) : this.diff_bisect_(e, t, s)
    }, n.prototype.diff_lineMode_ = function(e, t, i) {
        var s = this.diff_linesToChars_(e, t);
        e = s.chars1, t = s.chars2;
        var r = s.lineArray,
            o = this.diff_main(e, t, !1, i);
        this.diff_charsToLines_(o, r), this.diff_cleanupSemantic(o), o.push(new n.Diff(0, ""));
        for (var a = 0, l = 0, d = 0, g = "", c = ""; a < o.length;) {
            switch (o[a][0]) {
                case 1:
                    d++, c += o[a][1];
                    break;
                case -1:
                    l++, g += o[a][1];
                    break;
                case 0:
                    if (l >= 1 && d >= 1) {
                        o.splice(a - l - d, l + d), a = a - l - d;
                        for (var p = this.diff_main(g, c, !1, i), h = p.length - 1; h >= 0; h--) o.splice(a, 0, p[h]);
                        a += p.length
                    }
                    d = 0, l = 0, g = "", c = ""
            }
            a++
        }
        return o.pop(), o
    }, n.prototype.diff_bisect_ = function(e, t, i) {
        for (var s = e.length, r = t.length, o = Math.ceil((s + r) / 2), a = o, l = 2 * o, d = new Array(l), g = new Array(l), c = 0; c < l; c++) d[c] = -1, g[c] = -1;
        d[a + 1] = 0, g[a + 1] = 0;
        for (var p = s - r, h = p % 2 != 0, u = 0, m = 0, y = 0, M = 0, w = 0; w < o && !((new Date).getTime() > i); w++) {
            for (var f = -w + u; f <= w - m; f += 2) {
                for (var b = a + f, x = (S = f == -w || f != w && d[b - 1] < d[b + 1] ? d[b + 1] : d[b - 1] + 1) - f; S < s && x < r && e.charAt(S) == t.charAt(x);) S++, x++;
                if (d[b] = S, S > s) m += 2;
                else if (x > r) u += 2;
                else if (h) {
                    if ((I = a + p - f) >= 0 && I < l && -1 != g[I])
                        if (S >= (N = s - g[I])) return this.diff_bisectSplit_(e, t, S, x, i)
                }
            }
            for (var L = -w + y; L <= w - M; L += 2) {
                for (var N, I = a + L, D = (N = L == -w || L != w && g[I - 1] < g[I + 1] ? g[I + 1] : g[I - 1] + 1) - L; N < s && D < r && e.charAt(s - N - 1) == t.charAt(r - D - 1);) N++, D++;
                if (g[I] = N, N > s) M += 2;
                else if (D > r) y += 2;
                else if (!h) {
                    if ((b = a + p - L) >= 0 && b < l && -1 != d[b]) {
                        var S;
                        x = a + (S = d[b]) - b;
                        if (S >= (N = s - N)) return this.diff_bisectSplit_(e, t, S, x, i)
                    }
                }
            }
        }
        return [new n.Diff(-1, e), new n.Diff(1, t)]
    }, n.prototype.diff_bisectSplit_ = function(e, t, n, i, s) {
        var r = e.substring(0, n),
            o = t.substring(0, i),
            a = e.substring(n),
            l = t.substring(i),
            d = this.diff_main(r, o, !1, s),
            g = this.diff_main(a, l, !1, s);
        return d.concat(g)
    }, n.prototype.diff_linesToChars_ = function(e, t) {
        var n = [],
            i = {};

        function s(e) {
            for (var t = "", s = 0, o = -1, a = n.length; o < e.length - 1;) {
                -1 == (o = e.indexOf("\n", s)) && (o = e.length - 1);
                var l = e.substring(s, o + 1);
                (i.hasOwnProperty ? i.hasOwnProperty(l) : void 0 !== i[l]) ? t += String.fromCharCode(i[l]): (a == r && (l = e.substring(s), o = e.length), t += String.fromCharCode(a), i[l] = a, n[a++] = l), s = o + 1
            }
            return t
        }
        n[0] = "";
        var r = 4e4,
            o = s(e);
        return r = 65535, {
            chars1: o,
            chars2: s(t),
            lineArray: n
        }
    }, n.prototype.diff_charsToLines_ = function(e, t) {
        for (var n = 0; n < e.length; n++) {
            for (var i = e[n][1], s = [], r = 0; r < i.length; r++) s[r] = t[i.charCodeAt(r)];
            e[n][1] = s.join("")
        }
    }, n.prototype.diff_commonPrefix = function(e, t) {
        if (!e || !t || e.charAt(0) != t.charAt(0)) return 0;
        for (var n = 0, i = Math.min(e.length, t.length), s = i, r = 0; n < s;) e.substring(r, s) == t.substring(r, s) ? r = n = s : i = s, s = Math.floor((i - n) / 2 + n);
        return s
    }, n.prototype.diff_commonSuffix = function(e, t) {
        if (!e || !t || e.charAt(e.length - 1) != t.charAt(t.length - 1)) return 0;
        for (var n = 0, i = Math.min(e.length, t.length), s = i, r = 0; n < s;) e.substring(e.length - s, e.length - r) == t.substring(t.length - s, t.length - r) ? r = n = s : i = s, s = Math.floor((i - n) / 2 + n);
        return s
    }, n.prototype.diff_commonOverlap_ = function(e, t) {
        var n = e.length,
            i = t.length;
        if (0 == n || 0 == i) return 0;
        n > i ? e = e.substring(n - i) : n < i && (t = t.substring(0, n));
        var s = Math.min(n, i);
        if (e == t) return s;
        for (var r = 0, o = 1;;) {
            var a = e.substring(s - o),
                l = t.indexOf(a);
            if (-1 == l) return r;
            o += l, 0 != l && e.substring(s - o) != t.substring(0, o) || (r = o, o++)
        }
    }, n.prototype.diff_halfMatch_ = function(e, t) {
        if (this.Diff_Timeout <= 0) return null;
        var n = e.length > t.length ? e : t,
            i = e.length > t.length ? t : e;
        if (n.length < 4 || 2 * i.length < n.length) return null;
        var s = this;

        function r(e, t, n) {
            for (var i, r, o, a, l = e.substring(n, n + Math.floor(e.length / 4)), d = -1, g = ""; - 1 != (d = t.indexOf(l, d + 1));) {
                var c = s.diff_commonPrefix(e.substring(n), t.substring(d)),
                    p = s.diff_commonSuffix(e.substring(0, n), t.substring(0, d));
                g.length < p + c && (g = t.substring(d - p, d) + t.substring(d, d + c), i = e.substring(0, n - p), r = e.substring(n + c), o = t.substring(0, d - p), a = t.substring(d + c))
            }
            return 2 * g.length >= e.length ? [i, r, o, a, g] : null
        }
        var o, a, l, d, g, c = r(n, i, Math.ceil(n.length / 4)),
            p = r(n, i, Math.ceil(n.length / 2));
        return c || p ? (o = p ? c && c[4].length > p[4].length ? c : p : c, e.length > t.length ? (a = o[0], l = o[1], d = o[2], g = o[3]) : (d = o[0], g = o[1], a = o[2], l = o[3]), [a, l, d, g, o[4]]) : null
    }, n.prototype.diff_cleanupSemantic = function(e) {
        for (var t = !1, i = [], s = 0, r = null, o = 0, a = 0, l = 0, d = 0, g = 0; o < e.length;) 0 == e[o][0] ? (i[s++] = o, a = d, l = g, d = 0, g = 0, r = e[o][1]) : (1 == e[o][0] ? d += e[o][1].length : g += e[o][1].length, r && r.length <= Math.max(a, l) && r.length <= Math.max(d, g) && (e.splice(i[s - 1], 0, new n.Diff(-1, r)), e[i[s - 1] + 1][0] = 1, s--, o = --s > 0 ? i[s - 1] : -1, a = 0, l = 0, d = 0, g = 0, r = null, t = !0)), o++;
        for (t && this.diff_cleanupMerge(e), this.diff_cleanupSemanticLossless(e), o = 1; o < e.length;) {
            if (-1 == e[o - 1][0] && 1 == e[o][0]) {
                var c = e[o - 1][1],
                    p = e[o][1],
                    h = this.diff_commonOverlap_(c, p),
                    u = this.diff_commonOverlap_(p, c);
                h >= u ? (h >= c.length / 2 || h >= p.length / 2) && (e.splice(o, 0, new n.Diff(0, p.substring(0, h))), e[o - 1][1] = c.substring(0, c.length - h), e[o + 1][1] = p.substring(h), o++) : (u >= c.length / 2 || u >= p.length / 2) && (e.splice(o, 0, new n.Diff(0, c.substring(0, u))), e[o - 1][0] = 1, e[o - 1][1] = p.substring(0, p.length - u), e[o + 1][0] = -1, e[o + 1][1] = c.substring(u), o++), o++
            }
            o++
        }
    }, n.prototype.diff_cleanupSemanticLossless = function(e) {
        function t(e, t) {
            if (!e || !t) return 6;
            var i = e.charAt(e.length - 1),
                s = t.charAt(0),
                r = i.match(n.nonAlphaNumericRegex_),
                o = s.match(n.nonAlphaNumericRegex_),
                a = r && i.match(n.whitespaceRegex_),
                l = o && s.match(n.whitespaceRegex_),
                d = a && i.match(n.linebreakRegex_),
                g = l && s.match(n.linebreakRegex_),
                c = d && e.match(n.blanklineEndRegex_),
                p = g && t.match(n.blanklineStartRegex_);
            return c || p ? 5 : d || g ? 4 : r && !a && l ? 3 : a || l ? 2 : r || o ? 1 : 0
        }
        for (var i = 1; i < e.length - 1;) {
            if (0 == e[i - 1][0] && 0 == e[i + 1][0]) {
                var s = e[i - 1][1],
                    r = e[i][1],
                    o = e[i + 1][1],
                    a = this.diff_commonSuffix(s, r);
                if (a) {
                    var l = r.substring(r.length - a);
                    s = s.substring(0, s.length - a), r = l + r.substring(0, r.length - a), o = l + o
                }
                for (var d = s, g = r, c = o, p = t(s, r) + t(r, o); r.charAt(0) === o.charAt(0);) {
                    s += r.charAt(0), r = r.substring(1) + o.charAt(0), o = o.substring(1);
                    var h = t(s, r) + t(r, o);
                    h >= p && (p = h, d = s, g = r, c = o)
                }
                e[i - 1][1] != d && (d ? e[i - 1][1] = d : (e.splice(i - 1, 1), i--), e[i][1] = g, c ? e[i + 1][1] = c : (e.splice(i + 1, 1), i--))
            }
            i++
        }
    }, n.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, n.whitespaceRegex_ = /\s/, n.linebreakRegex_ = /[\r\n]/, n.blanklineEndRegex_ = /\n\r?\n$/, n.blanklineStartRegex_ = /^\r?\n\r?\n/, n.prototype.diff_cleanupEfficiency = function(e) {
        for (var t = !1, i = [], s = 0, r = null, o = 0, a = !1, l = !1, d = !1, g = !1; o < e.length;) 0 == e[o][0] ? (e[o][1].length < this.Diff_EditCost && (d || g) ? (i[s++] = o, a = d, l = g, r = e[o][1]) : (s = 0, r = null), d = g = !1) : (-1 == e[o][0] ? g = !0 : d = !0, r && (a && l && d && g || r.length < this.Diff_EditCost / 2 && a + l + d + g == 3) && (e.splice(i[s - 1], 0, new n.Diff(-1, r)), e[i[s - 1] + 1][0] = 1, s--, r = null, a && l ? (d = g = !0, s = 0) : (o = --s > 0 ? i[s - 1] : -1, d = g = !1), t = !0)), o++;
        t && this.diff_cleanupMerge(e)
    }, n.prototype.diff_cleanupMerge = function(e) {
        e.push(new n.Diff(0, ""));
        for (var t, i = 0, s = 0, r = 0, o = "", a = ""; i < e.length;) switch (e[i][0]) {
            case 1:
                r++, a += e[i][1], i++;
                break;
            case -1:
                s++, o += e[i][1], i++;
                break;
            case 0:
                s + r > 1 ? (0 !== s && 0 !== r && (0 !== (t = this.diff_commonPrefix(a, o)) && (i - s - r > 0 && 0 == e[i - s - r - 1][0] ? e[i - s - r - 1][1] += a.substring(0, t) : (e.splice(0, 0, new n.Diff(0, a.substring(0, t))), i++), a = a.substring(t), o = o.substring(t)), 0 !== (t = this.diff_commonSuffix(a, o)) && (e[i][1] = a.substring(a.length - t) + e[i][1], a = a.substring(0, a.length - t), o = o.substring(0, o.length - t))), i -= s + r, e.splice(i, s + r), o.length && (e.splice(i, 0, new n.Diff(-1, o)), i++), a.length && (e.splice(i, 0, new n.Diff(1, a)), i++), i++) : 0 !== i && 0 == e[i - 1][0] ? (e[i - 1][1] += e[i][1], e.splice(i, 1)) : i++, r = 0, s = 0, o = "", a = ""
        }
        "" === e[e.length - 1][1] && e.pop();
        var l = !1;
        for (i = 1; i < e.length - 1;) 0 == e[i - 1][0] && 0 == e[i + 1][0] && (e[i][1].substring(e[i][1].length - e[i - 1][1].length) == e[i - 1][1] ? (e[i][1] = e[i - 1][1] + e[i][1].substring(0, e[i][1].length - e[i - 1][1].length), e[i + 1][1] = e[i - 1][1] + e[i + 1][1], e.splice(i - 1, 1), l = !0) : e[i][1].substring(0, e[i + 1][1].length) == e[i + 1][1] && (e[i - 1][1] += e[i + 1][1], e[i][1] = e[i][1].substring(e[i + 1][1].length) + e[i + 1][1], e.splice(i + 1, 1), l = !0)), i++;
        l && this.diff_cleanupMerge(e)
    }, n.prototype.diff_xIndex = function(e, t) {
        var n, i = 0,
            s = 0,
            r = 0,
            o = 0;
        for (n = 0; n < e.length && (1 !== e[n][0] && (i += e[n][1].length), -1 !== e[n][0] && (s += e[n][1].length), !(i > t)); n++) r = i, o = s;
        return e.length != n && -1 === e[n][0] ? o : o + (t - r)
    }, n.prototype.diff_prettyHtml = function(e) {
        for (var t = [], n = /&/g, i = /</g, s = />/g, r = /\n/g, o = 0; o < e.length; o++) {
            var a = e[o][0],
                l = e[o][1].replace(n, "&amp;").replace(i, "&lt;").replace(s, "&gt;").replace(r, "&para;<br>");
            switch (a) {
                case 1:
                    t[o] = '<ins style="background:#e6ffe6;">' + l + "</ins>";
                    break;
                case -1:
                    t[o] = '<del style="background:#ffe6e6;">' + l + "</del>";
                    break;
                case 0:
                    t[o] = "<span>" + l + "</span>"
            }
        }
        return t.join("")
    }, n.prototype.diff_text1 = function(e) {
        for (var t = [], n = 0; n < e.length; n++) 1 !== e[n][0] && (t[n] = e[n][1]);
        return t.join("")
    }, n.prototype.diff_text2 = function(e) {
        for (var t = [], n = 0; n < e.length; n++) - 1 !== e[n][0] && (t[n] = e[n][1]);
        return t.join("")
    }, n.prototype.diff_levenshtein = function(e) {
        for (var t = 0, n = 0, i = 0, s = 0; s < e.length; s++) {
            var r = e[s][0],
                o = e[s][1];
            switch (r) {
                case 1:
                    n += o.length;
                    break;
                case -1:
                    i += o.length;
                    break;
                case 0:
                    t += Math.max(n, i), n = 0, i = 0
            }
        }
        return t += Math.max(n, i)
    }, n.prototype.diff_toDelta = function(e) {
        for (var t = [], n = 0; n < e.length; n++) switch (e[n][0]) {
            case 1:
                t[n] = "+" + encodeURI(e[n][1]);
                break;
            case -1:
                t[n] = "-" + e[n][1].length;
                break;
            case 0:
                t[n] = "=" + e[n][1].length
        }
        return t.join("\t").replace(/%20/g, " ")
    }, n.prototype.diff_fromDelta = function(e, t) {
        for (var i = [], s = 0, r = 0, o = t.split(/\t/g), a = 0; a < o.length; a++) {
            var l = o[a].substring(1);
            switch (o[a].charAt(0)) {
                case "+":
                    try {
                        i[s++] = new n.Diff(1, decodeURI(l))
                    } catch (e) {
                        throw new Error("Illegal escape in diff_fromDelta: " + l)
                    }
                    break;
                case "-":
                case "=":
                    var d = parseInt(l, 10);
                    if (isNaN(d) || d < 0) throw new Error("Invalid number in diff_fromDelta: " + l);
                    var g = e.substring(r, r += d);
                    "=" == o[a].charAt(0) ? i[s++] = new n.Diff(0, g) : i[s++] = new n.Diff(-1, g);
                    break;
                default:
                    if (o[a]) throw new Error("Invalid diff operation in diff_fromDelta: " + o[a])
            }
        }
        if (r != e.length) throw new Error("Delta length (" + r + ") does not equal source text length (" + e.length + ").");
        return i
    }, n.prototype.match_main = function(e, t, n) {
        if (null == e || null == t || null == n) throw new Error("Null input. (match_main)");
        return n = Math.max(0, Math.min(n, e.length)), e == t ? 0 : e.length ? e.substring(n, n + t.length) == t ? n : this.match_bitap_(e, t, n) : -1
    }, n.prototype.match_bitap_ = function(e, t, n) {
        if (t.length > this.Match_MaxBits) throw new Error("Pattern too long for this browser.");
        var i = this.match_alphabet_(t),
            s = this;

        function r(e, i) {
            var r = e / t.length,
                o = Math.abs(n - i);
            return s.Match_Distance ? r + o / s.Match_Distance : o ? 1 : r
        }
        var o = this.Match_Threshold,
            a = e.indexOf(t, n); - 1 != a && (o = Math.min(r(0, a), o), -1 != (a = e.lastIndexOf(t, n + t.length)) && (o = Math.min(r(0, a), o)));
        var l, d, g = 1 << t.length - 1;
        a = -1;
        for (var c, p = t.length + e.length, h = 0; h < t.length; h++) {
            for (l = 0, d = p; l < d;) r(h, n + d) <= o ? l = d : p = d, d = Math.floor((p - l) / 2 + l);
            p = d;
            var u = Math.max(1, n - d + 1),
                m = Math.min(n + d, e.length) + t.length,
                y = Array(m + 2);
            y[m + 1] = (1 << h) - 1;
            for (var M = m; M >= u; M--) {
                var w = i[e.charAt(M - 1)];
                if (y[M] = 0 === h ? (y[M + 1] << 1 | 1) & w : (y[M + 1] << 1 | 1) & w | (c[M + 1] | c[M]) << 1 | 1 | c[M + 1], y[M] & g) {
                    var f = r(h, M - 1);
                    if (f <= o) {
                        if (o = f, !((a = M - 1) > n)) break;
                        u = Math.max(1, 2 * n - a)
                    }
                }
            }
            if (r(h + 1, n) > o) break;
            c = y
        }
        return a
    }, n.prototype.match_alphabet_ = function(e) {
        for (var t = {}, n = 0; n < e.length; n++) t[e.charAt(n)] = 0;
        for (n = 0; n < e.length; n++) t[e.charAt(n)] |= 1 << e.length - n - 1;
        return t
    }, n.prototype.patch_addContext_ = function(e, t) {
        if (0 != t.length) {
            if (null === e.start2) throw Error("patch not initialized");
            for (var i = t.substring(e.start2, e.start2 + e.length1), s = 0; t.indexOf(i) != t.lastIndexOf(i) && i.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin;) s += this.Patch_Margin, i = t.substring(e.start2 - s, e.start2 + e.length1 + s);
            s += this.Patch_Margin;
            var r = t.substring(e.start2 - s, e.start2);
            r && e.diffs.unshift(new n.Diff(0, r));
            var o = t.substring(e.start2 + e.length1, e.start2 + e.length1 + s);
            o && e.diffs.push(new n.Diff(0, o)), e.start1 -= r.length, e.start2 -= r.length, e.length1 += r.length + o.length, e.length2 += r.length + o.length
        }
    }, n.prototype.patch_make = function(e, t, i) {
        var s, r;
        if ("string" == typeof e && "string" == typeof t && void 0 === i) s = e, (r = this.diff_main(s, t, !0)).length > 2 && (this.diff_cleanupSemantic(r), this.diff_cleanupEfficiency(r));
        else if (e && "object" == typeof e && void 0 === t && void 0 === i) r = e, s = this.diff_text1(r);
        else if ("string" == typeof e && t && "object" == typeof t && void 0 === i) s = e, r = t;
        else {
            if ("string" != typeof e || "string" != typeof t || !i || "object" != typeof i) throw new Error("Unknown call format to patch_make.");
            s = e, r = i
        }
        if (0 === r.length) return [];
        for (var o = [], a = new n.patch_obj, l = 0, d = 0, g = 0, c = s, p = s, h = 0; h < r.length; h++) {
            var u = r[h][0],
                m = r[h][1];
            switch (l || 0 === u || (a.start1 = d, a.start2 = g), u) {
                case 1:
                    a.diffs[l++] = r[h], a.length2 += m.length, p = p.substring(0, g) + m + p.substring(g);
                    break;
                case -1:
                    a.length1 += m.length, a.diffs[l++] = r[h], p = p.substring(0, g) + p.substring(g + m.length);
                    break;
                case 0:
                    m.length <= 2 * this.Patch_Margin && l && r.length != h + 1 ? (a.diffs[l++] = r[h], a.length1 += m.length, a.length2 += m.length) : m.length >= 2 * this.Patch_Margin && l && (this.patch_addContext_(a, c), o.push(a), a = new n.patch_obj, l = 0, c = p, d = g)
            }
            1 !== u && (d += m.length), -1 !== u && (g += m.length)
        }
        return l && (this.patch_addContext_(a, c), o.push(a)), o
    }, n.prototype.patch_deepCopy = function(e) {
        for (var t = [], i = 0; i < e.length; i++) {
            var s = e[i],
                r = new n.patch_obj;
            r.diffs = [];
            for (var o = 0; o < s.diffs.length; o++) r.diffs[o] = new n.Diff(s.diffs[o][0], s.diffs[o][1]);
            r.start1 = s.start1, r.start2 = s.start2, r.length1 = s.length1, r.length2 = s.length2, t[i] = r
        }
        return t
    }, n.prototype.patch_apply = function(e, t) {
        if (0 == e.length) return [t, []];
        e = this.patch_deepCopy(e);
        var n = this.patch_addPadding(e);
        t = n + t + n, this.patch_splitMax(e);
        for (var i = 0, s = [], r = 0; r < e.length; r++) {
            var o, a, l = e[r].start2 + i,
                d = this.diff_text1(e[r].diffs),
                g = -1;
            if (d.length > this.Match_MaxBits ? -1 != (o = this.match_main(t, d.substring(0, this.Match_MaxBits), l)) && (-1 == (g = this.match_main(t, d.substring(d.length - this.Match_MaxBits), l + d.length - this.Match_MaxBits)) || o >= g) && (o = -1) : o = this.match_main(t, d, l), -1 == o) s[r] = !1, i -= e[r].length2 - e[r].length1;
            else if (s[r] = !0, i = o - l, d == (a = -1 == g ? t.substring(o, o + d.length) : t.substring(o, g + this.Match_MaxBits))) t = t.substring(0, o) + this.diff_text2(e[r].diffs) + t.substring(o + d.length);
            else {
                var c = this.diff_main(d, a, !1);
                if (d.length > this.Match_MaxBits && this.diff_levenshtein(c) / d.length > this.Patch_DeleteThreshold) s[r] = !1;
                else {
                    this.diff_cleanupSemanticLossless(c);
                    for (var p, h = 0, u = 0; u < e[r].diffs.length; u++) {
                        var m = e[r].diffs[u];
                        0 !== m[0] && (p = this.diff_xIndex(c, h)), 1 === m[0] ? t = t.substring(0, o + p) + m[1] + t.substring(o + p) : -1 === m[0] && (t = t.substring(0, o + p) + t.substring(o + this.diff_xIndex(c, h + m[1].length))), -1 !== m[0] && (h += m[1].length)
                    }
                }
            }
        }
        return [t = t.substring(n.length, t.length - n.length), s]
    }, n.prototype.patch_addPadding = function(e) {
        for (var t = this.Patch_Margin, i = "", s = 1; s <= t; s++) i += String.fromCharCode(s);
        for (s = 0; s < e.length; s++) e[s].start1 += t, e[s].start2 += t;
        var r = e[0],
            o = r.diffs;
        if (0 == o.length || 0 != o[0][0]) o.unshift(new n.Diff(0, i)), r.start1 -= t, r.start2 -= t, r.length1 += t, r.length2 += t;
        else if (t > o[0][1].length) {
            var a = t - o[0][1].length;
            o[0][1] = i.substring(o[0][1].length) + o[0][1], r.start1 -= a, r.start2 -= a, r.length1 += a, r.length2 += a
        }
        if (0 == (o = (r = e[e.length - 1]).diffs).length || 0 != o[o.length - 1][0]) o.push(new n.Diff(0, i)), r.length1 += t, r.length2 += t;
        else if (t > o[o.length - 1][1].length) {
            a = t - o[o.length - 1][1].length;
            o[o.length - 1][1] += i.substring(0, a), r.length1 += a, r.length2 += a
        }
        return i
    }, n.prototype.patch_splitMax = function(e) {
        for (var t = this.Match_MaxBits, i = 0; i < e.length; i++)
            if (!(e[i].length1 <= t)) {
                var s = e[i];
                e.splice(i--, 1);
                for (var r = s.start1, o = s.start2, a = ""; 0 !== s.diffs.length;) {
                    var l = new n.patch_obj,
                        d = !0;
                    for (l.start1 = r - a.length, l.start2 = o - a.length, "" !== a && (l.length1 = l.length2 = a.length, l.diffs.push(new n.Diff(0, a))); 0 !== s.diffs.length && l.length1 < t - this.Patch_Margin;) {
                        var g = s.diffs[0][0],
                            c = s.diffs[0][1];
                        1 === g ? (l.length2 += c.length, o += c.length, l.diffs.push(s.diffs.shift()), d = !1) : -1 === g && 1 == l.diffs.length && 0 == l.diffs[0][0] && c.length > 2 * t ? (l.length1 += c.length, r += c.length, d = !1, l.diffs.push(new n.Diff(g, c)), s.diffs.shift()) : (c = c.substring(0, t - l.length1 - this.Patch_Margin), l.length1 += c.length, r += c.length, 0 === g ? (l.length2 += c.length, o += c.length) : d = !1, l.diffs.push(new n.Diff(g, c)), c == s.diffs[0][1] ? s.diffs.shift() : s.diffs[0][1] = s.diffs[0][1].substring(c.length))
                    }
                    a = (a = this.diff_text2(l.diffs)).substring(a.length - this.Patch_Margin);
                    var p = this.diff_text1(s.diffs).substring(0, this.Patch_Margin);
                    "" !== p && (l.length1 += p.length, l.length2 += p.length, 0 !== l.diffs.length && 0 === l.diffs[l.diffs.length - 1][0] ? l.diffs[l.diffs.length - 1][1] += p : l.diffs.push(new n.Diff(0, p))), d || e.splice(++i, 0, l)
                }
            }
    }, n.prototype.patch_toText = function(e) {
        for (var t = [], n = 0; n < e.length; n++) t[n] = e[n];
        return t.join("")
    }, n.prototype.patch_fromText = function(e) {
        var t = [];
        if (!e) return t;
        for (var i = e.split("\n"), s = 0, r = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/; s < i.length;) {
            var o = i[s].match(r);
            if (!o) throw new Error("Invalid patch string: " + i[s]);
            var a = new n.patch_obj;
            for (t.push(a), a.start1 = parseInt(o[1], 10), "" === o[2] ? (a.start1--, a.length1 = 1) : "0" == o[2] ? a.length1 = 0 : (a.start1--, a.length1 = parseInt(o[2], 10)), a.start2 = parseInt(o[3], 10), "" === o[4] ? (a.start2--, a.length2 = 1) : "0" == o[4] ? a.length2 = 0 : (a.start2--, a.length2 = parseInt(o[4], 10)), s++; s < i.length;) {
                var l = i[s].charAt(0);
                try {
                    var d = decodeURI(i[s].substring(1))
                } catch (e) {
                    throw new Error("Illegal escape in patch_fromText: " + d)
                }
                if ("-" == l) a.diffs.push(new n.Diff(-1, d));
                else if ("+" == l) a.diffs.push(new n.Diff(1, d));
                else if (" " == l) a.diffs.push(new n.Diff(0, d));
                else {
                    if ("@" == l) break;
                    if ("" !== l) throw new Error('Invalid patch mode "' + l + '" in: ' + d)
                }
                s++
            }
        }
        return t
    }, (n.patch_obj = function() {
        this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0
    }).prototype.toString = function() {
        for (var e, t = ["@@ -" + (0 === this.length1 ? this.start1 + ",0" : 1 == this.length1 ? this.start1 + 1 : this.start1 + 1 + "," + this.length1) + " +" + (0 === this.length2 ? this.start2 + ",0" : 1 == this.length2 ? this.start2 + 1 : this.start2 + 1 + "," + this.length2) + " @@\n"], n = 0; n < this.diffs.length; n++) {
            switch (this.diffs[n][0]) {
                case 1:
                    e = "+";
                    break;
                case -1:
                    e = "-";
                    break;
                case 0:
                    e = " "
            }
            t[n + 1] = e + encodeURI(this.diffs[n][1]) + "\n"
        }
        return t.join("").replace(/%20/g, " ")
    }, e.exports = n, e.exports.diff_match_patch = n, e.exports.DIFF_DELETE = -1, e.exports.DIFF_INSERT = 1, e.exports.DIFF_EQUAL = 0
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.EditorState = class {
        constructor(e) {
            this.array = [], this.core = e
        }
        setState() {
            const {
                text: e,
                caret: t,
                selectedText: n,
                timeStamp: i
            } = this.core.util.getState();
            this.text = e, this.caret = t, this.selectedText = n, this.timeStamp = i, this.core.dispatchScribensEvent({
                type: "editorStateChange",
                value: {
                    caretPos: this.caret,
                    selectedText: this.selectedText
                }
            })
        }
        getState() {
            return {
                text: this.text,
                caret: this.caret,
                selectedText: this.selectedText,
                timeStamp: this.timeStamp
            }
        }
        pushState(e) {
            this.setState();
            const t = {
                text: this.text,
                timeStamp: window.performance.now(),
                selectedText: this.selectedText,
                caret: this.caret,
                key: e
            };
            this.array.push(t)
        }
        shiftState() {
            return this.array.shift()
        }
        getLastState() {
            return this.array[this.array.length - 1]
        }
        cleanState(e) {
            this.array = this.array.filter(t => t.timeStamp >= e)
        }
        clearStates() {
            this.array = [], this.text = "", this.caret = 0, this.selectedText = "", this.timeStamp = 0
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(3);
    class s extends i.HttpBase {
        constructor() {
            super(...arguments), this.servlet = "Dict_Servlet", this.shareInstance = !1
        }
        async getPersonalDictionary(e) {
            const t = window.chrome.runtime.getManifest();
            return this.request({
                FunctionName: "Get_Personal_Dictionary",
                LangId: t.default_locale,
                Id: e
            })
        }
        async addWordPersonalDictionary(e, t) {
            return this.shareInstance = !0, this.request({
                FunctionName: "Add_Word_Personal_Dictionary",
                LangId: window.chrome.i18n.lang,
                Id: e,
                Word: t
            })
        }
        async removeWordPersonalDictionary(e, t) {
            this.shareInstance = !0;
            const n = window.chrome.runtime.getManifest();
            return this.request({
                FunctionName: "Remove_Word_Personal_Dictionary",
                LangId: n.default_locale,
                Id: e,
                Word: t
            })
        }
        tomcatInstance() {
            return this.shareInstance ? "ScribensShare" : "Scribens"
        }
    }
    t.DictServlet = s
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(4),
        s = n(16);
    t.SimpleUtil = class {
        constructor(e) {
            this.useMirror = !0, this.eventOptions = {
                capture: !0,
                passive: !0
            }, this.core = e
        }
        attach() {
            const e = this.core.element;
            e.isConnected && (e.addEventListener("click", i.onClickElement, this.eventOptions), e.addEventListener("scroll", i.onScroll, this.eventOptions), e.addEventListener("wheel", i.onWheel, this.eventOptions), e.addEventListener("blur", i.onBlur, this.eventOptions), e.addEventListener("paste", i.onPasteEvent, {
                capture: !0
            }), e.addEventListener("cut", i.onCutEvent, this.eventOptions), e.addEventListener("keydown", i.onKeyDownEvent, this.eventOptions), e.addEventListener("input", i.onInputEvent, this.eventOptions), e.addEventListener("focusin", i.onFocusEvent, this.eventOptions), e.addEventListener("focusout", i.onFocusEvent, this.eventOptions), this.core.element !== this.core.scrollElement && this.core.scrollElement.addEventListener("scroll", i.onScroll, this.eventOptions), s.resizeObserver(this.core))
        }
        detach() {
            const e = this.core.element;
            e.isConnected && (e.removeEventListener("click", i.onClickElement, this.eventOptions), e.removeEventListener("scroll", i.onScroll, this.eventOptions), e.removeEventListener("wheel", i.onWheel, this.eventOptions), e.removeEventListener("blur", i.onBlur, this.eventOptions), e.removeEventListener("paste", i.onPasteEvent, this.eventOptions), e.removeEventListener("cut", i.onCutEvent, this.eventOptions), e.removeEventListener("keydown", i.onKeyDownEvent, this.eventOptions), e.removeEventListener("input", i.onInputEvent, this.eventOptions), e.removeEventListener("focusin", i.onFocusEvent, this.eventOptions), e.removeEventListener("focusout", i.onFocusEvent, this.eventOptions), this.core.element !== this.core.scrollElement && this.core.scrollElement.removeEventListener("scroll", i.onScroll, this.eventOptions), this.core.resizeObserver.disconnect())
        }
        getAnchor() {
            if ("body" !== this.core.tagName.toLowerCase() && this.core.parentElement) {
                if (!this.core.parentElement || this.core.element === document.body) return document.body;
                if ("absolute" !== this.core.elementStyle.position) return this.core.parentElement;
                let e = this.core.parentElement,
                    t = window.getComputedStyle(e);
                for (; e && "relative" !== t.position && e !== document.body;) e = e.parentElement, t = window.getComputedStyle(e);
                return e
            }
            return this.core.parentElement || window.document.body
        }
        getState() {
            const e = this.core.element,
                t = e.value,
                n = e.selectionStart,
                i = e.selectionStart,
                s = e.selectionEnd;
            return {
                text: t,
                caret: n,
                selectedText: e.value.substring(i, s),
                timeStamp: window.performance.now()
            }
        }
        findClientRects(e) {
            const t = document.createRange();
            return t.setStart(this.core.mirrorLayout.firstChild, e.LeftPos), t.setEnd(this.core.mirrorLayout.firstChild, e.RightPos), [...t.getClientRects()]
        }
        computeArrangement(e) {
            let {
                top: t,
                left: n
            } = e;
            return t = Math.abs(this.core.frameBounds.top - this.core.frameLayout.scrollTop - t), n = Math.abs(this.core.frameBounds.left - this.core.frameLayout.scrollLeft - n), {
                top: t + "px",
                left: n + "px",
                width: e.width + "px",
                height: e.height + "px"
            }
        }
        replaceNode(e, t, n) {
            const i = this.core.element,
                s = i.value.length,
                r = Math.min(e, s),
                o = Math.min(e + (t - e), s);
            i.setRangeText(n, r, o, "end");
            const a = new Event("input", {
                bubbles: !0
            });
            return i.dispatchEvent(a), this.core.syncMirror(), this.core.updatePosition(), !0
        }
        setSelection(e, t) {
            this.core.element.setSelectionRange(e, t)
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(1);
    t.resizeObserver = e => {
        e.resizeObserver = new window.ResizeObserver(t => {
            null !== e.element.closest("#editor-wrapper").offsetParent && (e.toggleCanvasVisibility(!1), window.requestAnimationFrame(() => {
                i.logger("resizeObserver", t), e.syncMirror(), e.updatePosition(), e.storageMapPos.redrawAll(), e.toggleCanvasVisibility(!0)
            }))
        }), e.resizeObserver.observe(e.element)
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(0),
        s = n(2),
        r = n(5),
        o = n(1),
        a = n(7);
    t.Network = class {
        constructor(e) {
            this.range = [], this.timer = null, this.isEmpty = !1, this.abortController = new AbortController, this.time = null, this.patchHistory = [], this.queueRequest = [], this.consumedText = "", this.addStyle = !1, this.core = e
        }
        request(e, t = !1, n = !0) {
            if (!this.core.autoCheck && !i.globalUser.autoCheckEnabled()) return;
            Array.isArray(e) ? this.range.push(...e) : this.range.push(e), this.range = [...new Set(this.range.filter(e => e >= 0))];
            const l = this.core.ui.button,
                d = this.core.editorState.getState().text;
            if (!d.replace(/\s/g, "").length) return clearInterval(this.timer), this.range = [], this.isEmpty = !0, l.classList.remove("in-progress"), l.classList.remove("await-update"), this.core.dispatchState("idle"), this.core.storageMapPos.removeAll(), void[...this.core.ui.settingsWrapper.querySelectorAll('.ext-option input[type="radio"]')].forEach(e => {
                e.closest("label").style.display = "none"
            });
            if (!this.range.length) return;
            this.core.tooltip.hide("limit-nb-char"), this.core.ui.button.classList.remove("limit-nb-char", "session-limit"), this.isEmpty = !1, t || (l.classList.remove("await-update"), l.offsetHeight, l.classList.add("await-update"), this.core.dispatchState("pending"));
            const g = "fr" !== this.core.correction_language && n;
            o.logger("range", this.range, "singleParagraph", g);
            const c = n ? s.getStartOfParagraph(d, Math.min(...this.range), !g) : Math.min(...this.range),
                p = n ? s.getEndOfParagraph(d, Math.max(...this.range), !g) : Math.max(...this.range);
            if (this.consumedText = this.core.session.getLastConsumedText(), this.core.session.isReachedDailyLimit()) return l.classList.add("daily-limit"), l.classList.remove("await-update"), this.core.dispatchState("idle"), this.core.dispatchScribensEvent({
                type: "panelWait",
                value: !1
            }), void this.core.dispatchScribensEvent({
                type: "dailyLimitExceeded"
            });
            p - c > this.getChunkSize() ? this.mutlithreadRequest(c, p) : (l.classList.contains("in-progress") && (this.abortController.abort(), this.abortController = new AbortController, l.classList.remove("in-progress"), this.core.dispatchState("idle")), this.core.ui.button.dispatchEvent(new CustomEvent("scribens-check", {
                detail: {
                    range: this.range
                }
            })), this.core.element.dispatchEvent(new CustomEvent("networkRequestStart")), this.time = window.performance.now(), clearInterval(this.timer), this.timer = setTimeout(() => {
                const e = d.substring(c, p),
                    t = this.generateParameters(e);
                this.core.tooltip.hide("session-limit-exceeded"), l.classList.remove("await-update"), l.classList.add("in-progress"), this.core.dispatchState("checking"), new r.TextSolutionServlet(this.core.website, this.core.correction_language, i.globalUser.isPremium()).getSolutionsByPos(t, this.abortController.signal).then(e => {
                    if (this.isEmpty) return;
                    this.core.dispatchScribensEvent({
                        type: "panelWait",
                        value: !1
                    }), this.core.dispatchScribensEvent({
                        type: "editor:StatText",
                        value: e.StatText
                    }), this.core.firstRequest = !1, e && e.LimiteNbChar > 0 ? (this.core.tooltip.limitNbChar(), this.core.ui.button.classList.add("limit-nb-char")) : e && "lim_char_premium_reached" === e.Error ? (l.classList.add("premium-char-limit"), l.classList.remove("await-update"), this.core.dispatchState("idle"), this.core.dispatchScribensEvent({
                        type: "panelWait",
                        value: !1
                    }), this.core.dispatchScribensEvent({
                        type: "lim_char_premium_reached"
                    })) : this.core.session.setCurrentDayUsage(this.consumedText.length);
                    if (!this.patchHistory.filter(e => e.time > this.time).length) return e;
                    this.request([c, p], !0)
                }).then(e => this.core.storageMapPos.handleResponse(e, c, p)).then(() => {
                    this.range = [], this.patchHistory = [], l.classList.remove("in-progress"), this.core.dispatchState("idle"), this.core.element.dispatchEvent(new CustomEvent("networkRequestEnd"))
                }).catch(e => {
                    o.logger("network", e), e instanceof a.NetworkError ? setTimeout(() => {
                        this.request([Math.min(...this.range), Math.max(...this.range)])
                    }, 1e3) : (l.classList.remove("in-progress"), this.core.dispatchState("idle"))
                })
            }, t ? 0 : 1500))
        }
        async mutlithreadRequest(e, t) {
            this.core.dispatchScribensEvent({
                type: "panelWait",
                value: !0
            });
            const n = this.core.editorState.getState().text,
                i = t - e,
                r = Math.ceil(i / this.getChunkSize());
            if (r > this.getChunkLimit()) return this.range = [], this.core.dispatchState("idle"), void this.core.dispatchScribensEvent({
                type: "PanelMaxChar",
                value: this.getTotalCharLimit().toLocaleString(this.core.lang)
            });
            let a = [];
            for (let e = 0; e < r; e += 1) {
                const e = a.length ? a[a.length - 1].end : 0,
                    t = s.getStartOfSentence(n, e + 1, !0),
                    i = Math.min(s.getEndOfSentence(n, e + this.getChunkSize(), !0), n.length),
                    r = {
                        start: t,
                        end: i,
                        text: n.substring(t, i),
                        id: Math.floor(Math.random() * Date.now()).toString(16),
                        signal: (new AbortController).signal,
                        splittable: !0
                    };
                a.push(r)
            }
            o.logger("Chunks", a.length, "Chunk size", this.getChunkSize()), this.queueRequest = [...a], await Promise.all(a.map(e => this.chunkRequest(e))), this.range = [], this.patchHistory = [], this.core.dispatchState("idle"), this.core.session.setCurrentDayUsage(this.consumedText.length)
        }
        async splitChunkIntoSmallChunks(e) {
            const t = this.core.editorState.getState().text,
                n = e.end - e.start,
                i = Math.ceil(n / this.getSmallChunkSize());
            let r = [];
            for (let n = 0; n < i; n += 1) {
                const n = r.length ? r[r.length - 1].end : e.start;
                if (n + 1 >= e.end) break;
                const i = s.getStartOfSentence(t, n + 1, !0),
                    o = Math.min(s.getEndOfSentence(t, n + this.getSmallChunkSize(), !0), t.length),
                    a = {
                        start: i,
                        end: o,
                        text: t.substring(i, o),
                        id: Math.floor(Math.random() * Date.now()).toString(16),
                        signal: (new AbortController).signal,
                        splittable: !1
                    };
                r.push(a)
            }
            o.logger("Chunks", r.length, "Small chunk size", this.getSmallChunkSize()), this.queueRequest = [...r], await Promise.all(this.queueRequest.map(e => this.chunkRequest(e)))
        }
        async chunkRequest(e) {
            o.logger("Chunk request", e);
            const t = this.generateParameters(e.text);
            return new r.TextSolutionServlet(this.core.website, this.core.correction_language, i.globalUser.isPremium(), !0).getSolutionsByPos(t, this.abortController.signal).then(e => (this.core.firstRequest = !1, e)).then(t => {
                this.core.storageMapPos.handleResponse(t, e.start, e.end)
            }).catch(t => {
                if (o.logger("network", t), t instanceof a.NetworkError)
                    if (e.splittable) this.splitChunkIntoSmallChunks(e);
                    else {
                        o.logger("Small chunk failed", e);
                        const t = this.core.storageMapPos.findInRange(e.start, e.end);
                        this.core.storageMapPos.remove(t)
                    }
            }).finally(() => {
                this.queueRequest = this.queueRequest.filter(t => t.id !== e.id), o.logger("Queue length", this.queueRequest.length), this.queueRequest.length || this.core.dispatchScribensEvent({
                    type: "panelWait",
                    value: !1
                })
            })
        }
        generateParameters(e) {
            const t = e.replace(/[\r\n]/g, "<br>").replace(/<br>$/, "");
            console.log(`>>> <p>${t}</p>`);
            const n = {
                texteHTML: `<p>${t}</p>`,
                optionsCor: i.globalUser.optionsCor(),
                optionsStyle: i.globalUser.optionsStyle(),
                firstRequest: this.core.firstRequest,
                cntRequest30: 0,
                langId: i.globalUser.resolveLangVariant(this.core.correction_language, this.core.userLocationLangVariants),
                nbc: this.core.session.nbc(t),
                Uid: i.globalUser.getUid()
            };
            return i.globalUser.isPremium() && (n.identifier = i.globalUser.info[7], n.password = i.globalUser.info[8]), i.globalUser.stylePanelIsOpen && (n.AddStyle = !0), n
        }
        getChunkSize() {
            return "fr" === this.core.correction_language ? i.globalUser.isPremium() ? 25e3 : 3500 : i.globalUser.isPremium() ? 5e4 : 2500
        }
        getSmallChunkSize() {
            return this.getChunkSize() / 5
        }
        getChunkLimit() {
            return "fr" === this.core.correction_language ? i.globalUser.isPremium() ? 8 : 2 : i.globalUser.isPremium() ? 1 : 2
        }
        getTotalCharLimit() {
            return this.getChunkSize() * this.getChunkLimit()
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(0),
        s = n(6),
        r = n(1),
        o = n(2),
        a = n(19);
    t.Rephraser = class {
        constructor(e) {
            this.abortController = new AbortController, this.isDemo = !1, this.inlineMode = !1, this.mobileMode = !1, this.quotaReached = !1, this.storageKey = "rephraser-first-time", this.selectedTone = "nope", this.selectedToneKey = "reformulation-selected-tone", this.propositions = [], this.selectedLangKey = "reformulation-selected-lang", this.customTonesKey = "reformulation-custom-tones", this.core = e, this.attach()
        }
        attach() {
            const e = this.core.ui;
            e.shadowRoot.appendChild(this.css()), this.layout = document.createElement("div"), this.layout.className = "rephrase-layout", e.shadowRoot.appendChild(this.layout), this.selectedTone = localStorage.getItem(this.selectedToneKey) || "nope", this.selectedLang = localStorage.getItem(this.selectedLangKey) || this.core.correction_language, document.addEventListener("mousedown", e => {
                if (r.logger("rephraser.mousedown", e), this.lastFocusedElement = document.activeElement, !this.wrapper) return;
                const t = this.wrapper.querySelector("#rephrase-selected-tone"),
                    n = this.wrapper.querySelector("#rephrase-tones"),
                    i = this.wrapper.querySelector("#rephrase-selected-lang"),
                    s = this.wrapper.querySelector("#rephrase-languages"),
                    o = e.composedPath()[0];
                e.target === this.core.element ? this.hidePopup() : !this.wrapper.classList.contains("view-tones") || n.contains(o) || t.contains(o) ? !this.wrapper.classList.contains("view-languages") || s.contains(o) || i.contains(o) || this.wrapper.classList.remove("view-languages") : this.wrapper.classList.remove("view-tones")
            }, {
                capture: !0,
                passive: !0
            }), this.setMobileModeIf(window.screen.width < 768), window.addEventListener("resize", () => {
                this.setMobileModeIf(window.screen.width < 768), this.debounceAdjustPopupPosition()
            })
        }
        debounceAdjustPopupPosition() {
            clearTimeout(this.debounceTimeout), this.debounceTimeout = setTimeout(() => {
                this.adjustPopupPosition(!1)
            }, 50)
        }
        setMobileModeIf(e) {
            this.mobileMode = e, this.wrapper instanceof HTMLElement && this.wrapper.classList.toggle("mobile-page", this.mobileMode)
        }
        detach() {
            this.core.ui.shadowRoot.removeChild(this.layout)
        }
        setLanguage(e, t = !0) {
            this.selectedLang = e, t && localStorage.setItem(this.selectedLangKey, this.selectedLang)
        }
        async Start() {
            this.inlineMode = this.lastFocusedElement === this.core.element, this.quotaReached = this.IsQuotaReached(), this.inlineMode && !this.quotaReached ? await this.getSelectionSentences() : this.showPopup()
        }
        async start_demo() {
            this.isDemo = !0, this.lastFocusedElement = this.core.element, this.inlineMode = !0, this.core.util.setSelection(0, this.core.editorState.text.length), await this.getSelectionSentences()
        }
        showPopup(e = -1) {
            this.layout.innerHTML = "", this.highlight && this.core.storageMapPos.remove(this.highlight), this.wrapper = document.createElement("div"), this.wrapper.className = "rephrase-wrapper", this.wrapper.classList.toggle("is-premium", Boolean(i.globalUser.isPremium()));
            const t = this.isDemo ? "professional" : localStorage.getItem(this.selectedToneKey);
            this.selectedTone = t || "nope", this.selectedLang = localStorage.getItem(this.selectedLangKey) || this.core.correction_language, this.adjustPopupPosition(!1, e), this.wrapper.classList.toggle("inline-mode", this.inlineMode);
            const n = null === localStorage.getItem(this.storageKey);
            this.wrapper.classList.toggle("is-first-time", !this.isDemo && n), this.wrapper.classList.toggle("mobile-page", this.mobileMode), this.wrapper.classList.toggle("quota-reached", this.quotaReached);
            const s = document.createElement("div");
            s.className = "rephrase-container";
            const r = document.createElement("button");
            r.className = "close-button", r.onclick = () => {
                this.isDemo || localStorage.setItem(this.storageKey, "false"), this.wrapper.remove(), this.isDemo = !1, this.core.storageMapPos.remove(this.highlight)
            }, s.appendChild(r), s.appendChild(this.createInfoContent()), s.appendChild(this.createQuotaReachedContent()), s.appendChild(this.errorContent()), s.appendChild(this.createRephraseContent()), this.wrapper.appendChild(s), this.layout.appendChild(this.wrapper)
        }
        hidePopup() {
            this.isDemo || localStorage.setItem(this.storageKey, "false"), this.wrapper.remove(), this.isDemo = !1, this.highlight && this.core.storageMapPos.remove(this.highlight), this.abortController.abort()
        }
        showError(e) {
            if (!this.inlineMode) return this.inlineMode = !1, this.lastFocusedElement = null, void this.showPopup();
            this.wrapper.classList.add("has-error");
            const t = this.wrapper.querySelector(".error-content"),
                n = t.querySelector(".error-title");
            this.wrapper.dataset.error = e.Error, t.dataset.error = e.Error;
            let s = window.Labels.unable_display_result;
            if ("max_length_request" === e.Error ? s = window.Labels.max_length_request : "no_word" === e.Error ? s = window.Labels.rephrase_sel_noword : "no_prop" === e.Error ? s = window.Labels.rephrase_no_prop : "max_sentences_reached" === e.Error ? s = window.Labels.rephrase_max_sentences_reached : "lim_request_per_day_reached" === e.Error ? s = window.Labels.rephrase_lim_request_per_day_reached : "lim_char_premium_reached" === e.Error ? s = window.Labels.rephrase_lim_char_premium_reached : "premium_max_sentences_reached" === e.Error ? s = window.Labels.rephrase_premium_max_sentences_reached : "premium_unlimited_rephrase" === e.Error && (s = window.Labels.rephrase_premium_unlimited_rephrase), n.innerHTML = s, "max_sentences_reached" === e.Error)
                if (i.globalUser.isPremium()) n.innerHTML = window.Labels.rephrase_premium_max_sentences_reached;
                else {
                    t.querySelector(".image-container img").setAttribute("src", this.core.prefixFolder + "images/rephrase_limit_image.png")
                } if ("no_prop" === e.Error) {
                const e = this.wrapper.querySelector(".rephrase-content .rephrase-body");
                e.innerHTML = "", e.appendChild(t), this.wrapper.classList.remove("has-error")
            }
        }
        adjustPopupPosition(e = !1, t = -1) {
            if (this.wrapper instanceof HTMLElement)
                if (r.logger("rephraser.adjustPopupPosition"), this.inlineMode || this.mobileMode) {
                    const n = this.core.element,
                        i = this.core.getClientRectsOfSelection(),
                        s = Math.min(...i.map(e => e.left + window.scrollX));
                    e || -1 == t || /[\r\n]/.test(this.core.editorState.text[n.selectionStart]) || (n.selectionEnd = t);
                    const r = this.core.getClientRectsOfSelection(),
                        o = n.getBoundingClientRect(),
                        a = this.getClipY(o);
                    let l = Math.max(a.min, Math.min(a.max, Math.max(...r.map(e => e.bottom + window.scrollY + 5))));
                    isFinite(s) && isFinite(l) ? (e || this.mobileMode ? this.mobileMode && this.wrapper.style.removeProperty("left") : this.wrapper.style.left = s + "px", this.wrapper.style.top = l + "px") : (this.wrapper.removeAttribute("style"), this.inlineMode = !1)
                } else this.wrapper.removeAttribute("style")
        }
        getClipY(e) {
            let t = e.top + window.scrollY;
            return this.mobileMode && this.core.element.scrollHeight > this.core.element.clientHeight && (t = i.globalUser.isPremium() ? window.innerHeight / 4 : e.top + e.height / 2), {
                min: t,
                max: e.top + e.height + window.scrollY
            }
        }
        async getSelectionSentences() {
            const e = new s.OtherAlg_Servlet;
            this.abortController = new AbortController;
            const t = this.core.element,
                n = {
                    TextHTML: `<p>${this.core.editorState.text.replace(/[\r\n]/g,"<br>")}</p>`,
                    LeftPos_Sel: t.selectionStart,
                    RightPos_Sel: t.selectionEnd,
                    IdLanguage: this.selectedLang
                };
            return e.getSelectionSentences(n, this.abortController.signal).then(e => {
                this.response_GetSelectionSentences = e, this.showPopup(e.Pos_End);
                const t = null === localStorage.getItem(this.storageKey);
                !this.isDemo && t || this.applyResponseSelection()
            })
        }
        applyResponseSelection(e = !0) {
            const t = this.response_GetSelectionSentences;
            if ("Error" in t) return this.showError(t), Promise.resolve(t);
            e && (this.createHighlight(t), this.selectionStart = t.Pos_Start, this.selectionEnd = t.Pos_End, this.mobileMode && this.core.element.blur());
            const n = null === localStorage.getItem(this.storageKey);
            if (!this.isDemo && n) return Promise.resolve(t);
            this.wrapper.classList.add("loading"), this.wrapper.dataset.error = "", this.rephrasePayload = {
                Text: t.Text,
                Nbc: this.core.session.nbc(t.Text),
                NbSentences: t.NbSentences,
                Tone: this.selectedTone,
                IdLanguage: this.selectedLang,
                IdLangDisplay: this.core.lang,
                Others: !1
            };
            const i = new s.OtherAlg_Servlet;
            return this.abortController = new AbortController, i.getRephrase(this.rephrasePayload, this.abortController.signal).then(t => {
                "Error" in t ? this.showError(t) : this.Increment_Counter_Usage(e), this.wrapper.classList.remove("loading"), this.renderRephrasedTexts(t)
            })
        }
        renderRephrasedTexts(e, t = !1) {
            const n = this.wrapper.querySelector("#rephrase-list");
            if (n && !t && (n.innerHTML = "", this.propositions = []), e && "Vect_Propositions" in e)
                for (let t = 0; t < e.Vect_Propositions.length; t += 1) {
                    if (this.propositions.includes(e.Vect_Propositions[t])) continue;
                    this.propositions.push(e.Vect_Propositions[t]);
                    const i = document.createElement("div");
                    i.className = "rephrase-item", i.innerHTML = e.Vect_Propositions[t].replace(/[\r\n]/g, "<br>"), i.onclick = () => {
                        this.core.storageMapPos.remove(this.highlight), this.core.element.focus(), this.core.element.selectionStart = this.selectionStart, this.core.element.selectionEnd = this.selectionEnd, this.core.insertText(e.Vect_Propositions[t]), this.hidePopup()
                    }, n.appendChild(i)
                }
        }
        IsQuotaReached() {
            if (i.globalUser.isPremium()) return !1;
            let e = (new Date).toISOString().split("T")[0];
            const t = JSON.parse(localStorage.getItem("rephraseUsage")) || {};
            return t.date !== e && (t.date = e, t.count = 0, localStorage.setItem("rephraseUsage", JSON.stringify(t))), t.count >= 10
        }
        Increment_Counter_Usage(e = !1) {
            if (e && !i.globalUser.isPremium()) {
                const e = JSON.parse(localStorage.getItem("rephraseUsage")) || {};
                e.count += 1, localStorage.setItem("rephraseUsage", JSON.stringify(e))
            }
            this.core.dispatchScribensEvent({
                type: "event:rephrase"
            })
        }
        createInfoContent() {
            const e = document.createElement("div");
            return e.className = "info-content", e.innerHTML = `\n      <div class="image-container">\n        <img src='${this.core.prefixFolder}images/icone/picto-magic-wand-blue.png'/>\n      </div>\n      <p class="rephrase-title">${window.Labels.rephrase_welcome}</p>\n      <p class="rephrase-desc">\n        ${window.Labels.rephrase_select_sentences}${this.inlineMode?".":" "+window.Labels.rephrase_click_btn}\n      </p>\n      <button id="rephrase-continue" class="rephrase-button">\n        ${this.inlineMode?window.Labels.continue_title:"OK"}\n      </button>\n    `, e.querySelector("#rephrase-continue").addEventListener("click", () => {
                this.isDemo || localStorage.setItem(this.storageKey, "false"), this.inlineMode ? (this.wrapper.classList.remove("is-first-time"), this.wrapper.classList.add("loading"), this.applyResponseSelection()) : this.hidePopup()
            }), e
        }
        createQuotaReachedContent() {
            const e = document.createElement("div");
            return e.className = "quotareached-content", e.innerHTML = `\n      <div class="image-container">\n        <img src='${this.core.prefixFolder}images/rephrase_limit_image.png'/>\n      </div>\n      <p class="quotareached-title">${window.Labels.rephrase_lim_request_per_day_reached}<br><br>${window.Labels.rephrase_premium_unlimited_rephrase}</p>\n      <a href="${window.Labels.premium_link}" id="premium-link" target="_blank">\n        ${window.Labels.limit_upgrade_premium}\n      </a>\n    `, e
        }
        createRephraseToneItem(e) {
            const t = document.createElement("div");
            if (t.className = "rephrase-tone", t.innerHTML = `<img src="${e.image}"/> <span>${e.label}</span>`, e.custom) {
                t.classList.add("custom-tone");
                const n = document.createElement("button");
                n.className = "delete-tone", n.onclick = n => {
                    n.stopPropagation();
                    const i = JSON.parse(localStorage.getItem(this.customTonesKey)) || [],
                        s = i.indexOf(e.id);
                    if (i.splice(s, 1), localStorage.setItem(this.customTonesKey, JSON.stringify(i)), t.remove(), this.selectedTone === e.id) {
                        this.selectedTone = "nope", localStorage.setItem(this.selectedToneKey, this.selectedTone);
                        const e = o.listOfTones.find(e => "nope" === e.id),
                            t = this.layout.querySelector("#rephrase-selected-tone");
                        t.innerHTML = `<img src="${e.image}"/> <span>${e.label}</span>`, t.classList.remove("custom-tone")
                    }
                }, t.appendChild(n)
            }
            return t.onclick = () => {
                const n = this.layout.querySelector("#rephrase-selected-tone");
                this.selectedTone = e.id, localStorage.setItem(this.selectedToneKey, this.selectedTone);
                const i = this.formatLabel(e.label);
                n.innerHTML = `<img src="${e.image}"/> <span>${i}</span>`, n.classList.toggle("custom-tone", t.classList.contains("custom-tone")), this.wrapper.classList.remove("view-tones"), this.wrapper.classList.add("loading");
                const s = this.wrapper.querySelector("#rephrase-list");
                if (!s || this.wrapper.classList.contains("has-error")) {
                    this.wrapper.classList.remove("has-error");
                    const e = this.wrapper.querySelector(".rephrase-container"),
                        t = this.wrapper.querySelector(".rephrase-content"),
                        n = this.createRephraseContent();
                    e.replaceChild(n, t), e.appendChild(this.errorContent())
                } else s.innerHTML = "";
                this.applyResponseSelection(!1)
            }, t
        }
        formatLabel(e) {
            const t = e.toLowerCase();
            return t.charAt(0).toUpperCase() + t.slice(1)
        }
        createRephraseContent() {
            const e = document.createElement("div");
            e.className = "rephrase-content", e.innerHTML = `\n      <div id="rephrase-tones">\n        <div class="rephrase-tones--grid"></div>\n        <div class="rephrase-tones--custom-tone"></div>\n      </div>\n      <div id="rephrase-languages"></div>\n\n      <div class="rephrase-header">\n        <img src='${this.core.prefixFolder}images/icone/picto-magic-wand-blue.png'/>\n\n        <div class="rephrase-header--buttons">\n            <div id="rephrase-selected-tone"></div> \n            <div id="rephrase-selected-lang"></div> \n        </div>\n      </div>\n\n      <div class="rephrase-body">\n        <div id="loading-layout">\n          <div class="spinner"></div>\n        </div>\n\n        <div id="rephrase-list"></div>\n\n        <div>\n          <button type="button" id="load-more-row">\n            ${window.Labels.rephrase_other_propositions}\n\n            <span class="load-more-spinner"></span>\n          </button>\n        </div>\n      </div>\n\n      <div id="rephrase-advert-block"></div>\n    `;
            const t = e.querySelector("#rephrase-selected-tone"),
                n = e.querySelector("#rephrase-tones .rephrase-tones--grid"),
                r = e.querySelector("#rephrase-selected-lang"),
                l = e.querySelector("#rephrase-languages"),
                d = e.querySelector("#load-more-row"),
                g = e.querySelector("#rephrase-advert-block");
            t.onclick = () => {
                this.wrapper.classList.toggle("view-tones"), this.wrapper.classList.contains("view-tones") && setTimeout(() => {
                    const e = this.wrapper.querySelector("#rephrase-tones");
                    e.classList.add("container--is-open"), this.core.autoResize(e)
                }, 350)
            }, o.listOfTones.forEach(e => {
                const i = this.createRephraseToneItem(e);
                n.appendChild(i), e.id === this.selectedTone && (t.innerHTML = `<img src="${e.image}"/> <span>${e.label}</span>`)
            });
            (JSON.parse(localStorage.getItem(this.customTonesKey)) || []).forEach(e => {
                const i = this.createRephraseToneItem({
                    id: e,
                    label: this.formatLabel(e),
                    image: a.ICONS["/images/star.svg"],
                    custom: !0
                });
                if (n.appendChild(i), e === this.selectedTone) {
                    const n = this.formatLabel(e);
                    t.innerHTML = `<img src="${a.ICONS["/images/star.svg"]}"/> <span>${n}</span>`, t.classList.add("custom-tone")
                }
            });
            const c = e.querySelector("#rephrase-tones .rephrase-tones--custom-tone");
            c.innerHTML = "";
            const p = document.createElement("div");
            p.className = "custom-tone-label", p.innerHTML = `<img src="${a.ICONS["/images/star.svg"]}"/>`, c.appendChild(p);
            const h = document.createElement("div");
            h.className = "custom-tone-input-group";
            const u = document.createElement("input"),
                m = document.createElement("button");
            u.className = "custom-tone-input", u.type = "text", u.value = "", u.onkeydown = e => {
                "Enter" === e.key && e.target.nextElementSibling.click()
            }, u.onkeyup = e => {
                m.disabled = !u.value.trim()
            }, u.placeholder = window.Labels.rewriting_custom_tone, h.appendChild(u), m.className = "custom-tone-validation", m.disabled = !0, m.innerHTML = window.Labels.validate, m.onclick = () => {
                if (!u.value.trim()) return void u.focus();
                this.wrapper.classList.remove("view-tones"), this.selectedTone = u.value.trim().toLowerCase(), this.wrapper.classList.add("loading");
                const e = this.wrapper.querySelector("#rephrase-list");
                if (!e || this.wrapper.classList.contains("has-error")) {
                    this.wrapper.classList.remove("has-error");
                    const e = this.wrapper.querySelector(".rephrase-container"),
                        t = this.wrapper.querySelector(".rephrase-content"),
                        n = this.createRephraseContent();
                    e.replaceChild(n, t), e.appendChild(this.errorContent())
                } else e.innerHTML = "";
                this.applyResponseSelection(!1)
            }, h.appendChild(m), c.appendChild(h);
            const y = document.createElement("button");
            return y.className = "custom-tone-button", y.title = window.Labels.add_to_list, y.onclick = () => {
                const e = JSON.parse(localStorage.getItem(this.customTonesKey)) || [],
                    t = u.value.trim().toLowerCase();
                if (e.includes(t)) return u.value = "", void u.focus();
                if (t) {
                    e.push(t), localStorage.setItem(this.customTonesKey, JSON.stringify(e)), u.value = "";
                    const i = this.createRephraseToneItem({
                        id: t,
                        label: t,
                        image: a.ICONS["/images/star.svg"],
                        custom: !0
                    });
                    n.appendChild(i)
                } else u.focus()
            }, c.appendChild(y), r.onclick = () => {
                this.wrapper.classList.toggle("view-languages"), this.wrapper.classList.contains("view-languages") && setTimeout(() => {
                    const e = this.wrapper.querySelector("#rephrase-languages");
                    e.classList.add("container--is-open"), this.core.autoResize(e)
                }, 350)
            }, o.createLanguageGrid(l, this.selectedLang ? this.selectedLang.toLowerCase() : "", e => {
                this.selectedLang = e.id, localStorage.setItem(this.selectedLangKey, this.selectedLang), r.innerHTML = `\n          <img src="${e.image}"/> \n          <span>${e.code}</span>\n        `, this.wrapper.classList.remove("view-languages"), this.wrapper.classList.add("loading");
                const t = this.wrapper.querySelector("#rephrase-list");
                if (!t || this.wrapper.classList.contains("has-error")) {
                    this.wrapper.classList.remove("has-error");
                    const e = this.wrapper.querySelector(".rephrase-container"),
                        t = this.wrapper.querySelector(".rephrase-content"),
                        n = this.createRephraseContent();
                    e.replaceChild(n, t), e.appendChild(this.errorContent())
                } else t.innerHTML = "";
                this.applyResponseSelection(!1), o.refreshLanguageGrid(l, "")
            }, e => {
                r.innerHTML = `\n          <img src="${e.image}"/> \n          <span>${e.code} </span>\n        `
            }), i.globalUser.isPremium() ? (g.remove(), d.onclick = () => {
                d.classList.contains("loading") || (this.rephrasePayload.Others = !0, d.classList.add("loading"), (new s.OtherAlg_Servlet).getRephrase(this.rephrasePayload, this.abortController.signal).then(e => {
                    this.renderRephrasedTexts(e, !0), this.rephrasePayload.Others = !1, d.classList.remove("loading")
                }))
            }) : (g.remove(), d.remove()), e
        }
        errorContent() {
            const e = document.createElement("div");
            return e.className = "error-content", e.innerHTML = `\n      <div class="image-container">\n        <img src="${this.core.prefixFolder}images/rephrase_error_image.png"/>\n      </div>\n      <p class="error-title">\n        ${window.Labels.unable_display_result}\n      </p>\n      <a href="${window.Labels.premium_link}" id="premium-link" target="_blank">\n        ${window.Labels.limit_upgrade_premium}\n      </a>\n    `, e
        }
        createHighlight(e) {
            const t = {
                LeftPos: e.Pos_Start,
                RightPos: e.Pos_End,
                TypeName: "Rephrased",
                MotSolution: {
                    WordSt: "Rephrased",
                    Start_Pos: e.Pos_Start,
                    End_Pos: e.Pos_End,
                    Type: "Rephrased",
                    EstSuggestion: "",
                    Vect_SolId: [],
                    vectSolution: [],
                    ExplicationSolution: ""
                }
            };
            this.highlight = this.core.storageMapPos.draw(t), this.core.storageMapPos.array.push(this.highlight)
        }
        css() {
            const e = `\n    .rephrase-wrapper p {\n      margin: 0;\n      line-height: 1.5;\n    }\n\n    .rephrase-wrapper {\n      position: fixed;\n      inset: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 100;\n      pointer-events: none;\n      border-radius: 10px;\n      /*overflow: hidden;*/\n      color: #64676e;\n    }\n\n    .rephrase-wrapper .rephrase-container {\n      position: relative;\n      background-color: #fff;\n      width: 470px;\n      max-width: 470px;\n      border-radius: 10px;\n      box-shadow: 0 0 10px rgba(0,0,0,0.1);\n      box-sizing: border-box;\n      pointer-events: auto;\n    }\n\n    .rephrase-wrapper .rephrase-content,\n    .rephrase-wrapper .error-content {\n      display: none;\n    }\n\n    .rephrase-wrapper.inline-mode:not(.is-first-time) .info-content,\n    .rephrase-wrapper.quota-reached .info-content {\n      display: none;\n    }\n\n    .rephrase-wrapper:not(.quota-reached) .quotareached-content {\n      display: none;\n    }\n\n    .rephrase-wrapper.quota-reached .quotareached-content {\n      display: flex;\n      flex-direction: column;\n      justify-items: center;\n      align-items: center;\n      padding: 30px 20px;\n      font-size: 16px;\n      font-weight: bold;\n    }\n\n    .rephrase-wrapper.inline-mode:not(.is-first-time):not(.quota-reached):not(.has-error) .rephrase-content {\n      display: block;\n    }\n\n    .rephrase-wrapper.has-error .info-content,\n    .rephrase-wrapper.has-error .quota-reached,\n    .rephrase-wrapper.has-error .rephrase-content{\n      display: none;\n    }\n\n    .rephrase-wrapper.has-error:not(.quota-reached) .error-content {\n      display: flex;\n      flex-direction: column;\n      justify-items: center;\n      align-items: center;\n      padding: 30px 20px;\n      font-size: 16px;\n      font-weight: bold;\n    }\n\n    .rephrase-wrapper.has-error .error-content .error-title,\n    .rephrase-wrapper .rephrase-body .error-content .error-title {\n      text-align: center;\n      font-weight: bold;\n    }\n\n    .rephrase-wrapper.has-error .error-content .image-container img,\n    .rephrase-wrapper .rephrase-body .error-content .image-container img {\n      width: 140px;\n      height: auto;\n    }\n\n    .rephrase-wrapper.has-error .error-content #premium-link,\n    .rephrase-wrapper .rephrase-body .error-content #premium-link {\n      display: none;\n      margin-top: 25px;\n      padding: 10px 35px;\n      background-color: #297bbf;\n      color: #fff;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-size: 16px;\n      text-decoration: none;\n      font-weight: normal;\n    }\n\n    .rephrase-wrapper .quotareached-content #premium-link {\n      margin-top: 25px;\n      padding: 10px 35px;\n      background-color: #297bbf;\n      color: #fff;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-size: 16px;\n      text-decoration: none;\n      font-weight: normal;\n    }\n\n    .rephrase-wrapper .quotareached-content .image-container img {\n      width: 60px;\n      margin-bottom: 20px;\n    }\n\n    .rephrase-wrapper.has-error:not(.is-premium) .error-content[data-error="max_sentences_reached"] .image-container img {\n      width: 60px;\n      margin-bottom: 20px;\n    }\n\n    .rephrase-wrapper.has-error:not(.is-premium) .error-content[data-error="max_sentences_reached"] #premium-link {\n      display: block;\n    }\n\n    .rephrase-wrapper .rephrase-container .close-button {\n      border: none;\n      background-color: transparent;\n      background-image: url(${this.core.prefixFolder}images/icone/cross.svg);\n      background-size: 12px;\n      background-repeat: no-repeat;\n      background-position: center;\n      position: absolute;\n      top: 18px;\n      right: 15px;\n      width: 15px;\n      height: 15px;\n      cursor: pointer;\n    }\n\n    .rephrase-wrapper.inline-mode:not(.has-error) .rephrase-container .close-button {\n      width: 20px;\n      height: 20px;\n      top: 18px;\n      right: 10px;\n    }\n\n    .rephrase-wrapper .info-content {\n      display: flex;\n      flex-direction: column;\n      justify-items: center;\n      align-items: center;\n      text-align: center;\n      row-gap: 15px;\n      padding: 30px;\n    }\n\n    .rephrase-wrapper .image-container img {\n      width: 60px;\n      height: 60px;\n    }\n\n    .rephrase-wrapper .rephrase-title {\n      font-size: 15px;\n    }\n\n    .rephrase-wrapper:not(.is-first-time) .rephrase-title {\n      display: none;\n    }\n\n    .rephrase-wrapper .quotareached-title {\n      font-size: 16px;\n      font-weight: bold;\n      text-align: center;\n    }\n\n    .rephrase-wrapper .rephrase-desc {\n      font-size: 18px;\n    }\n\n    .rephrase-wrapper .image-container {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n\n    .rephrase-wrapper .rephrase-button {\n      margin-top: 15px;\n      padding: 10px 35px;\n      background-color: #297bbf;\n      color: #fff;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-size: 16px;\n    }\n    \n    .rephrase-wrapper.inline-mode {\n      position: absolute;\n      inset: auto;\n    }\n\n    .rephrase-wrapper.inline-mode .rephrase-container {\n      width: 370px;\n      max-width: 370px;\n      border: 1px solid #d7d9df;\n    }\n\n    .rephrase-wrapper.inline-mode .info-content {\n      padding: 20px;\n    }\n\n    .rephrase-wrapper.inline-mode .rephrase-desc {\n      font-size: 16px;\n    }\n\n    .rephrase-wrapper.inline-mode .rephrase-button {\n      width: 100%;\n    }\n\n    .rephrase-wrapper .rephrase-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 10px 50px 10px 15px;\n      background-color: #fff;\n      border-bottom: 1px solid #d7d9df;\n      border-top-left-radius: 10px;\n      border-top-right-radius: 10px;\n    }\n    \n    .rephrase-wrapper .rephrase-header .rephrase-header--buttons {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      column-gap: 10px;\n    }\n\n    .rephrase-wrapper .rephrase-header #rephrase-selected-tone,\n    .rephrase-wrapper .rephrase-header #rephrase-selected-lang {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      column-gap: 5px;\n      font-size: 16px;\n      border: 1px solid #d7d9df;\n      color: #64676e;\n      border-radius: 4px;\n      overflow: hidden;\n      padding: 3px 25px 3px 10px;\n      cursor: pointer;\n      position: relative;\n    }\n    \n    .rephrase-wrapper .rephrase-header #rephrase-selected-tone span {\n      max-width: 110px;\n      overflow: hidden;\n      /*text-overflow: ellipsis;*/\n      white-space: nowrap;\n      padding: 3px 0;\n    }\n    \n    .rephrase-wrapper .rephrase-header #rephrase-selected-lang {\n      font-size: 14px;\n    }\n\n    .rephrase-wrapper .rephrase-header #rephrase-selected-tone:after,\n    .rephrase-wrapper .rephrase-header #rephrase-selected-lang:after {\n      content: '';\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      width: 25px;\n      background-image: url(${this.core.prefixFolder}images/icone/chevron-down.svg);\n      background-repeat: no-repeat;\n      background-position: right;\n      background-size: 25px;\n      transition: transform 0.3s ease;\n    }\n\n    .rephrase-wrapper .rephrase-header #rephrase-selected-tone img {\n      width: 25px;\n      height: 25px;\n    }\n    \n    .rephrase-wrapper .rephrase-header #rephrase-selected-tone.custom-tone img {\n      width: 13px;\n      height: 13px;\n      border: 1px solid #198FCF;\n      border-radius: 50%;\n      padding: 2px;\n    }\n    \n    .rephrase-wrapper .rephrase-header #rephrase-selected-lang img {\n      width: 15px;\n      height: 15px;\n      padding: 5px 0;\n    }\n    \n    .rephrase-wrapper .rephrase-header img {\n      width: 35px;\n      height: 35px;\n    }\n\n    .rephrase-wrapper .rephrase-body {\n      background-color: #f6f6f6;\n      padding: 15px;\n      font-size: 16px;\n      display: flex;\n      flex-direction: column;\n      row-gap: 10px;\n      position: relative;\n      min-height: 30px;\n      border-bottom-left-radius: 10px;\n      border-bottom-right-radius: 10px;\n    }\n    \n    .rephrase-wrapper[data-error="no_prop"] .rephrase-body {\n      background-color: #fff;\n    }\n\n    .rephrase-wrapper .rephrase-body #loading-layout {\n      position: absolute;\n      inset: 0;\n      display: none;\n      align-items: center;\n      justify-content: center;\n      border-radius: 10px;\n    }\n\n    .rephrase-wrapper .rephrase-body #loading-layout .spinner {\n\n    }\n\n    .rephrase-wrapper .rephrase-body #load-more-row {\n      color: #118ece;\n      font-weight: bold;\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      column-gap: 5px;\n      border: none;\n      background-color: transparent;\n      font-size: 16px;\n      cursor: pointer;\n    }\n\n    .rephrase-wrapper .rephrase-body #load-more-row .load-more-spinner {\n      display: inline-block;\n      box-sizing: border-box;\n    }\n\n    .rephrase-wrapper .rephrase-body #load-more-row.loading .load-more-spinner {\n      border: 2px solid #118ece;\n      border-bottom-color: #deeaf2;\n      border-radius: 50%;\n      animation: rotation .7s linear infinite;\n      width: 15px;\n      height: 15px;\n    }\n\n    .rephrase-wrapper .rephrase-body #load-more-row:not(.loading) .load-more-spinner:before {\n      content: '+';\n    }\n\n    .rephrase-wrapper.loading .rephrase-body #loading-layout {\n      display: flex;\n    }\n\n    .rephrase-wrapper.loading .rephrase-body #load-more-row {\n      display: none;\n    }\n\n    .rephrase-wrapper .rephrase-body #rephrase-list {\n      display: flex;\n      flex-direction: column;\n      row-gap: 10px;\n    }\n\n    .rephrase-wrapper .rephrase-body .rephrase-item {\n      background-color: #fff;\n      border: 1px solid transparent;\n      padding: 5px 10px;\n      border-radius: 10px;\n      box-shadow: 0 0 5px rgba(0,0,0,0.1);\n      cursor: pointer;\n      transition: color 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;\n    }\n\n    .rephrase-wrapper .rephrase-body .rephrase-item:hover {\n      color: #118ece;\n      border-color: #118ece;\n    }\n\n    .rephrase-wrapper .rephrase-body .error-content {\n      display: flex;\n      flex-direction: column;\n      justify-items: center;\n      align-items: center;\n      row-gap: 15px;\n    }\n\n    .rephrase-wrapper #rephrase-tones {\n      position: absolute;\n      top: 50px;\n      left: 10px;\n      right: 0;\n      width: 430px;\n      max-width: 100%;\n      border: 1px solid #d7d9df;\n      background-color: #fff;\n      border-radius: 7px;\n      font-size: 16px;\n      transform-origin: top;\n      z-index: 1;\n      transform: scaleY(0);\n      transition: transform 0.3s ease;\n    }\n    \n    .rephrase-wrapper #rephrase-languages {\n      position: absolute;\n      top: 40px;\n      left: 0;\n      right: 0;\n      background-color: #fff;\n      border: 1px solid #d7d9df;\n      margin-top: 10px;\n      border-radius: 7px;\n      font-size: 16px;\n      transform-origin: top;\n      z-index: 1;\n      transform: scaleY(0);\n      transition: transform 0.3s ease;\n      width: 100%;\n      display: flex;\n      flex-direction: column;\n    }\n    \n    #rephrase-languages.language-grid {\n        width: 300px;\n    }\n    \n    .rephrase-wrapper #rephrase-languages .styled-grid {\n      display: grid;\n      gap: 3px;\n      grid-template-columns: repeat(2, 1fr);\n      padding: 10px;\n      overflow-y: auto;\n      grid-auto-columns: auto;\n      grid-auto-rows: auto;\n      align-content: start;\n      align-items: start;\n      box-sizing: border-box;\n    }\n    \n    .language-grid .styled-grid-item > span {\n      flex: 1; \n    }\n    \n    .rephrase-wrapper #rephrase-tones .rephrase-tones--grid {\n      display: grid;\n      gap: 3px;\n      grid-template-columns: repeat(2, 1fr);\n      background-color: #fff;\n      border-radius: 7px;\n      padding: 10px;\n      font-size: 16px;\n    }\n\n    .rephrase-wrapper.view-tones #rephrase-tones,\n    .rephrase-wrapper.view-languages #rephrase-languages {\n      transform: scaleY(1);\n    }\n\n    .rephrase-wrapper.view-tones #rephrase-selected-tone:after,\n    .rephrase-wrapper.view-languages #rephrase-selected-lang:after {\n      transform: rotate(180deg);\n    }\n    \n    .rephrase-wrapper #rephrase-wrapper-languages::-webkit-scrollbar,\n    .rephrase-wrapper #rephrase-wrapper-tones::-webkit-scrollbar {\n      width: 7px;\n    }\n\n    .rephrase-wrapper #rephrase-wrapper-tones::-webkit-scrollbar-track,\n    .rephrase-wrapper #rephrase-wrapper-languages::-webkit-scrollbar-track {\n      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.10);\n    }\n\n    .rephrase-wrapper #rephrase-wrapper-tones::-webkit-scrollbar-thumb,\n    .rephrase-wrapper #rephrase-wrapper-languages::-webkit-scrollbar-thumb {\n      background-color: #0085ca;\n      border-radius: 6px;\n    }\n\n    .rephrase-wrapper #rephrase-wrapper-tones.container--top-aligned,\n    .rephrase-wrapper #rephrase-wrapper-languages.container--top-aligned {\n      bottom: 40px;\n      top: auto;\n      transform-origin: bottom;\n    }\n\n    .rephrase-wrapper #rephrase-tones .rephrase-tones--grid .rephrase-tone {\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      column-gap: 5px;\n      padding: 5px 10px;\n    }\n    .rephrase-wrapper #rephrase-languages .styled-grid-item {\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      column-gap: 5px;\n      padding: 5px 10px;\n      color: #64676e;\n      white-space: nowrap;\n    }\n    \n    /*.rephrase-wrapper #rephrase-languages .styled-grid-item {\n      font-size: 14px;\n    }*/\n    .rephrase-wrapper #rephrase-languages .styled-grid-item:not([data-visible="1"]) {\n      display: none;\n    }\n\n    .rephrase-wrapper #rephrase-tones .rephrase-tones--grid .rephrase-tone img {\n      width: 25px;\n      height: 25px;\n    }\n    \n    .rephrase-wrapper #rephrase-languages .styled-grid-item img {\n      width: 21px;\n      height: 25px;\n    }\n\n    .rephrase-wrapper #rephrase-tones .rephrase-tones--grid .rephrase-tone:hover,\n    .rephrase-wrapper #rephrase-languages .styled-grid-item:hover {\n      background-color: #f4f9fd;\n      color: #178fcf;\n      border-radius: 5px;\n      cursor: pointer;\n    }\n    \n    /*.rephrase-wrapper #rephrase-languages .styled-grid-item:last-child {\n      display: none;\n    }*/\n\n    .rephrase-wrapper #rephrase-advert-block {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding: 0 0 20px 0;\n      background-color: #f6f6f6;\n      font-size: 16px;\n      border-bottom-left-radius: 10px;\n      border-bottom-right-radius: 10px;\n      overflow: hidden;\n    }\n\n    .spinner {\n      border: 2px solid #118ece;\n      border-bottom-color: #deeaf2;\n      border-radius: 50%;\n      animation: rotation .7s linear infinite;\n      width: 15px;\n      height: 15px;\n    }\n\n    .rephrase-wrapper.mobile-page {\n      width: 100%;\n    }\n\n    .rephrase-wrapper.mobile-page .rephrase-container {\n      width: 100%;\n      max-width: 370px;\n    }\n    \n    .rephrase-tones--custom-tone {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      column-gap: 10px;\n      padding: 15px;\n      background-color: #f2f2f2;\n      border-bottom-left-radius: 7px;\n      border-bottom-right-radius: 7px;\n    }\n    \n    .custom-tone-input-group {\n      display: flex;\n      justify-content: center;\n      flex: 1;\n    }\n    \n    button.custom-tone-validation {\n      border: none;\n      color: #fff;\n      background-color: #198FCF;\n      border-top-right-radius: 3px;\n      border-bottom-right-radius: 3px;\n      transition: background-color 0.3s ease;\n      font-size: 16px;\n      padding: 0 10px;\n      cursor: pointer;\n    }\n    \n    button[disabled].custom-tone-validation {\n      background-color: #B7B7B7;\n    }\n    \n    .custom-tone-label {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    }\n  \n    .custom-tone-label img {\n      max-width: 13px;\n      min-width: 13px;\n      width: 13px;\n      height: 13px;\n      border: 1px solid #198FCF;\n      border-radius: 50%;\n      padding: 2px;\n    }\n  \n    .custom-tone-input {\n      flex: 1;\n      padding: 5px;\n      border-left: 1px solid #B7B7B7;\n      border-top: 1px solid #B7B7B7;\n      border-bottom: 1px solid #B7B7B7;\n      border-right: none;\n      border-top-left-radius: 3px;\n      border-bottom-left-radius: 3px;\n      outline: none;\n    }\n\n    .custom-tone-input::placeholder {\n      color: #b0aeae;\n    }\n    \n    .custom-tone-button {\n      background-image: url('${a.ICONS["/images/plus-circle-thin.svg"]}');\n      background-size: 18px;\n      background-position: center;\n      background-repeat: no-repeat;\n      background-color: #198FCF;\n      border: none;\n      border-radius: 3px;\n      outline: none;\n      width: 27px;\n      height: 27px;\n      min-width: 27px;\n      max-width: 27px;\n      cursor: pointer;\n    }\n    \n    .delete-tone {\n      background-image: url('${a.ICONS["/images/minus.svg"]}');\n      background-size: 8px;\n      background-position: center;\n      background-repeat: no-repeat;\n      background-color: transparent;\n      border: 1px solid #B7B7B7;\n      border-radius: 50%;\n      outline: none;\n      width: 15px;\n      height: 15px;\n      visibility: hidden;\n      cursor: pointer;\n    }\n    \n    .delete-tone:hover {\n      background-image: url('${a.ICONS["/images/minus-blue.svg"]}');\n      border: 1px solid #198FCF;\n    }\n    \n    .rephrase-tone:hover .delete-tone {\n      visibility: visible;\n    }\n    \n    .rephrase-tone span {\n      flex: 1;\n    }\n    \n    .rephrase-wrapper #rephrase-tones .rephrase-tones--grid .rephrase-tone.custom-tone img {\n      margin: 3px;\n      width: 13px;\n      height: 13px;\n      border: 1px solid #198FCF;\n      border-radius: 50%;\n      padding: 2px;\n    }\n    \n    /*#rephrase-selected-tone.custom-tone {\n      text-transform: capitalize;\n    }*/\n    \n    .language-grid.grid-is-filtered .styled-grid {\n        grid-auto-flow: column;\n        grid-template-rows: repeat(11, auto);\n    }\n\n    .language-grid .grid-is-empty--layout {\n      display: none;\n    }\n    \n    .language-grid.grid-is-filtered.grid-is-empty .styled-grid {\n        display: none;\n    }\n    \n    .rephrase-wrapper #rephrase-languages.language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--layout {\n      display: flex;\n      flex-direction: column;\n      row-gap: 20px;\n      height: 380px;\n      justify-content: center;\n      align-items: center;\n      color: #333;\n    }\n    \n    .language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--image {\n        background-color: #edf3fb;\n        width: 64px;\n        height: 64px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n    \n    .language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--header-text {\n        font-weight: bold;\n        text-transform: none;\n    }\n    \n    .language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--subheader-text {\n        color: #64676e;\n        font-size: 14px;\n        text-transform: none;\n        white-space: normal;\n        text-align: center;\n        padding: 0 25px;\n    }\n    \n    .language-grid .styled-grid-item--action-button {\n        width: 16px;\n        min-width: 16px;\n        height: 16px;\n        border: none;\n        background-color: transparent;\n        cursor: default;\n        background-repeat: no-repeat;\n        background-position: center;\n        background-size: 14px 14px;\n        visibility: hidden;\n    }\n    \n    .language-grid .styled-grid-item--plus-button {\n        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTE2NjcgNi40MTY2N0g3LjU4MzMzVjQuMDgzMzNDNy41ODMzMyAzLjkyODYyIDcuNTIxODcgMy43ODAyNSA3LjQxMjQ4IDMuNjcwODVDNy4zMDMwOCAzLjU2MTQ2IDcuMTU0NzEgMy41IDcgMy41QzYuODQ1MjkgMy41IDYuNjk2OTIgMy41NjE0NiA2LjU4NzUyIDMuNjcwODVDNi40NzgxMiAzLjc4MDI1IDYuNDE2NjcgMy45Mjg2MiA2LjQxNjY3IDQuMDgzMzNWNi40MTY2N0g0LjA4MzMzQzMuOTI4NjIgNi40MTY2NyAzLjc4MDI1IDYuNDc4MTIgMy42NzA4NSA2LjU4NzUyQzMuNTYxNDYgNi42OTY5MiAzLjUgNi44NDUyOSAzLjUgN0MzLjUgNy4xNTQ3MSAzLjU2MTQ2IDcuMzAzMDggMy42NzA4NSA3LjQxMjQ4QzMuNzgwMjUgNy41MjE4NyAzLjkyODYyIDcuNTgzMzMgNC4wODMzMyA3LjU4MzMzSDYuNDE2NjdWOS45MTY2N0M2LjQxNjY3IDEwLjA3MTQgNi40NzgxMiAxMC4yMTk3IDYuNTg3NTIgMTAuMzI5MUM2LjY5NjkyIDEwLjQzODUgNi44NDUyOSAxMC41IDcgMTAuNUM3LjE1NDcxIDEwLjUgNy4zMDMwOCAxMC40Mzg1IDcuNDEyNDggMTAuMzI5MUM3LjUyMTg3IDEwLjIxOTcgNy41ODMzMyAxMC4wNzE0IDcuNTgzMzMgOS45MTY2N1Y3LjU4MzMzSDkuOTE2NjdDMTAuMDcxNCA3LjU4MzMzIDEwLjIxOTcgNy41MjE4NyAxMC4zMjkxIDcuNDEyNDhDMTAuNDM4NSA3LjMwMzA4IDEwLjUgNy4xNTQ3MSAxMC41IDdDMTAuNSA2Ljg0NTI5IDEwLjQzODUgNi42OTY5MiAxMC4zMjkxIDYuNTg3NTJDMTAuMjE5NyA2LjQ3ODEyIDEwLjA3MTQgNi40MTY2NyA5LjkxNjY3IDYuNDE2NjdaIiBmaWxsPSIjOTg5ODk4Ii8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF80MDA1XzQ4NzApIj4KPHBhdGggZD0iTTcgMEM1LjYxNTUzIDAgNC4yNjIxNiAwLjQxMDU0MyAzLjExMTAxIDEuMTc5NzFDMS45NTk4NyAxLjk0ODg4IDEuMDYyNjYgMy4wNDIxMyAwLjUzMjg0NiA0LjMyMTIyQzAuMDAzMDMzIDUuNjAwMyAtMC4xMzU1OSA3LjAwNzc3IDAuMTM0NTA2IDguMzY1NjNDMC40MDQ2MDMgOS43MjM1IDEuMDcxMjkgMTAuOTcwOCAyLjA1MDI2IDExLjk0OTdDMy4wMjkyMiAxMi45Mjg3IDQuMjc2NSAxMy41OTU0IDUuNjM0MzcgMTMuODY1NUM2Ljk5MjI0IDE0LjEzNTYgOC4zOTk3IDEzLjk5NyA5LjY3ODc5IDEzLjQ2NzJDMTAuOTU3OSAxMi45MzczIDEyLjA1MTEgMTIuMDQwMSAxMi44MjAzIDEwLjg4OUMxMy41ODk1IDkuNzM3ODUgMTQgOC4zODQ0NyAxNCA3QzEzLjk5OCA1LjE0NDEgMTMuMjU5OSAzLjM2NDc5IDExLjk0NzUgMi4wNTI0N0MxMC42MzUyIDAuNzQwMTUgOC44NTU5IDAuMDAyMDA3MyA3IDBWMFpNNyAxMi44MzMzQzUuODQ2MjggMTIuODMzMyA0LjcxODQ2IDEyLjQ5MTIgMy43NTkxOCAxMS44NTAyQzIuNzk5ODkgMTEuMjA5MyAyLjA1MjIyIDEwLjI5ODIgMS42MTA3MSA5LjIzMjMyQzEuMTY5MTkgOC4xNjY0MiAxLjA1MzY4IDYuOTkzNTMgMS4yNzg3NiA1Ljg2MTk3QzEuNTAzODQgNC43MzA0MiAyLjA1OTQxIDMuNjkxMDIgMi44NzUyMSAyLjg3NTIxQzMuNjkxMDIgMi4wNTk0IDQuNzMwNDIgMS41MDM4MyA1Ljg2MTk4IDEuMjc4NzVDNi45OTM1MyAxLjA1MzY3IDguMTY2NDIgMS4xNjkxOSA5LjIzMjMyIDEuNjEwN0MxMC4yOTgyIDIuMDUyMjEgMTEuMjA5MyAyLjc5OTg5IDExLjg1MDIgMy43NTkxN0MxMi40OTEyIDQuNzE4NDYgMTIuODMzMyA1Ljg0NjI4IDEyLjgzMzMgN0MxMi44MzE2IDguNTQ2NTggMTIuMjE2NSAxMC4wMjkzIDExLjEyMjkgMTEuMTIyOUMxMC4wMjkzIDEyLjIxNjUgOC41NDY1OCAxMi44MzE2IDcgMTIuODMzM1YxMi44MzMzWiIgZmlsbD0iIzk4OTg5OCIvPgo8cGF0aCBkPSJNNy41ODM2NyAxMC40OTk0QzcuNTgzNjcgMTAuMTc3MiA3LjMyMjUgOS45MTYwMiA3LjAwMDMzIDkuOTE2MDJDNi42NzgxNiA5LjkxNjAyIDYuNDE2OTkgMTAuMTc3MiA2LjQxNjk5IDEwLjQ5OTRDNi40MTY5OSAxMC44MjE1IDYuNjc4MTYgMTEuMDgyNyA3LjAwMDMzIDExLjA4MjdDNy4zMjI1IDExLjA4MjcgNy41ODM2NyAxMC44MjE1IDcuNTgzNjcgMTAuNDk5NFoiIGZpbGw9IiM5ODk4OTgiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF80MDA1XzQ4NzAiPgo8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==);\n    }\n\n    .language-grid .styled-grid-item:hover .styled-grid-item--action-button {\n        visibility: visible;\n    }\n    \n    .language-grid .styled-grid-item--action-button:hover {\n        cursor: pointer;\n    }\n    \n    .language-grid .styled-grid-item--plus-button:hover {\n        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTE2NjcgNi40MTY2N0g3LjU4MzMzVjQuMDgzMzNDNy41ODMzMyAzLjkyODYyIDcuNTIxODcgMy43ODAyNSA3LjQxMjQ4IDMuNjcwODVDNy4zMDMwOCAzLjU2MTQ2IDcuMTU0NzEgMy41IDcgMy41QzYuODQ1MjkgMy41IDYuNjk2OTIgMy41NjE0NiA2LjU4NzUyIDMuNjcwODVDNi40NzgxMiAzLjc4MDI1IDYuNDE2NjcgMy45Mjg2MiA2LjQxNjY3IDQuMDgzMzNWNi40MTY2N0g0LjA4MzMzQzMuOTI4NjIgNi40MTY2NyAzLjc4MDI1IDYuNDc4MTIgMy42NzA4NSA2LjU4NzUyQzMuNTYxNDYgNi42OTY5MiAzLjUgNi44NDUyOSAzLjUgN0MzLjUgNy4xNTQ3MSAzLjU2MTQ2IDcuMzAzMDggMy42NzA4NSA3LjQxMjQ4QzMuNzgwMjUgNy41MjE4NyAzLjkyODYyIDcuNTgzMzMgNC4wODMzMyA3LjU4MzMzSDYuNDE2NjdWOS45MTY2N0M2LjQxNjY3IDEwLjA3MTQgNi40NzgxMiAxMC4yMTk3IDYuNTg3NTIgMTAuMzI5MUM2LjY5NjkyIDEwLjQzODUgNi44NDUyOSAxMC41IDcgMTAuNUM3LjE1NDcxIDEwLjUgNy4zMDMwOCAxMC40Mzg1IDcuNDEyNDggMTAuMzI5MUM3LjUyMTg3IDEwLjIxOTcgNy41ODMzMyAxMC4wNzE0IDcuNTgzMzMgOS45MTY2N1Y3LjU4MzMzSDkuOTE2NjdDMTAuMDcxNCA3LjU4MzMzIDEwLjIxOTcgNy41MjE4NyAxMC4zMjkxIDcuNDEyNDhDMTAuNDM4NSA3LjMwMzA4IDEwLjUgNy4xNTQ3MSAxMC41IDdDMTAuNSA2Ljg0NTI5IDEwLjQzODUgNi42OTY5MiAxMC4zMjkxIDYuNTg3NTJDMTAuMjE5NyA2LjQ3ODEyIDEwLjA3MTQgNi40MTY2NyA5LjkxNjY3IDYuNDE2NjdaIiBmaWxsPSIjMTc4ZmNmIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF80MDA1XzQ4NzApIj4KPHBhdGggZD0iTTcgMEM1LjYxNTUzIDAgNC4yNjIxNiAwLjQxMDU0MyAzLjExMTAxIDEuMTc5NzFDMS45NTk4NyAxLjk0ODg4IDEuMDYyNjYgMy4wNDIxMyAwLjUzMjg0NiA0LjMyMTIyQzAuMDAzMDMzIDUuNjAwMyAtMC4xMzU1OSA3LjAwNzc3IDAuMTM0NTA2IDguMzY1NjNDMC40MDQ2MDMgOS43MjM1IDEuMDcxMjkgMTAuOTcwOCAyLjA1MDI2IDExLjk0OTdDMy4wMjkyMiAxMi45Mjg3IDQuMjc2NSAxMy41OTU0IDUuNjM0MzcgMTMuODY1NUM2Ljk5MjI0IDE0LjEzNTYgOC4zOTk3IDEzLjk5NyA5LjY3ODc5IDEzLjQ2NzJDMTAuOTU3OSAxMi45MzczIDEyLjA1MTEgMTIuMDQwMSAxMi44MjAzIDEwLjg4OUMxMy41ODk1IDkuNzM3ODUgMTQgOC4zODQ0NyAxNCA3QzEzLjk5OCA1LjE0NDEgMTMuMjU5OSAzLjM2NDc5IDExLjk0NzUgMi4wNTI0N0MxMC42MzUyIDAuNzQwMTUgOC44NTU5IDAuMDAyMDA3MyA3IDBWMFpNNyAxMi44MzMzQzUuODQ2MjggMTIuODMzMyA0LjcxODQ2IDEyLjQ5MTIgMy43NTkxOCAxMS44NTAyQzIuNzk5ODkgMTEuMjA5MyAyLjA1MjIyIDEwLjI5ODIgMS42MTA3MSA5LjIzMjMyQzEuMTY5MTkgOC4xNjY0MiAxLjA1MzY4IDYuOTkzNTMgMS4yNzg3NiA1Ljg2MTk3QzEuNTAzODQgNC43MzA0MiAyLjA1OTQxIDMuNjkxMDIgMi44NzUyMSAyLjg3NTIxQzMuNjkxMDIgMi4wNTk0IDQuNzMwNDIgMS41MDM4MyA1Ljg2MTk4IDEuMjc4NzVDNi45OTM1MyAxLjA1MzY3IDguMTY2NDIgMS4xNjkxOSA5LjIzMjMyIDEuNjEwN0MxMC4yOTgyIDIuMDUyMjEgMTEuMjA5MyAyLjc5OTg5IDExLjg1MDIgMy43NTkxN0MxMi40OTEyIDQuNzE4NDYgMTIuODMzMyA1Ljg0NjI4IDEyLjgzMzMgN0MxMi44MzE2IDguNTQ2NTggMTIuMjE2NSAxMC4wMjkzIDExLjEyMjkgMTEuMTIyOUMxMC4wMjkzIDEyLjIxNjUgOC41NDY1OCAxMi44MzE2IDcgMTIuODMzM1YxMi44MzMzWiIgZmlsbD0iIzE3OGZjZiIvPgo8cGF0aCBkPSJNNy41ODM2NyAxMC40OTk0QzcuNTgzNjcgMTAuMTc3MiA3LjMyMjUgOS45MTYwMiA3LjAwMDMzIDkuOTE2MDJDNi42NzgxNiA5LjkxNjAyIDYuNDE2OTkgMTAuMTc3MiA2LjQxNjk5IDEwLjQ5OTRDNi40MTY5OSAxMC44MjE1IDYuNjc4MTYgMTEuMDgyNyA3LjAwMDMzIDExLjA4MjdDNy4zMjI1IDExLjA4MjcgNy41ODM2NyAxMC44MjE1IDcuNTgzNjcgMTAuNDk5NFoiIGZpbGw9IiMxNzhmY2YiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF80MDA1XzQ4NzAiPgo8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==)\n    }\n    \n    .language-grid .styled-grid-item--minus-button:hover {\n        border-color: #198FCF;\n        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iIzE5OEZDRiIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHZpZXdCb3g9IjAgMCA1Mi4xNjEgNTIuMTYxIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik01Mi4xNjEsMjYuMDgxYzAsMy4yNDYtMi42Myw1Ljg3NS01Ljg3NSw1Ljg3NUg1Ljg3NUMyLjYzLDMxLjk1NiwwLDI5LjMyNywwLDI2LjA4MWwwLDBjMC0zLjI0NSwyLjYzLTUuODc1LDUuODc1LTUuODc1DQoJCWg0MC40MTFDNDkuNTMxLDIwLjIwNiw1Mi4xNjEsMjIuODM1LDUyLjE2MSwyNi4wODFMNTIuMTYxLDI2LjA4MXoiLz4NCjwvZz4NCjwvc3ZnPg0K)\n    }\n    \n    .language-grid .styled-grid-item--minus-button {\n        border: 1px solid #B7B7B7;\n        border-radius: 50%;\n        background-size: 8px;\n        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iI0I3QjdCNyIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHZpZXdCb3g9IjAgMCA1Mi4xNjEgNTIuMTYxIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik01Mi4xNjEsMjYuMDgxYzAsMy4yNDYtMi42Myw1Ljg3NS01Ljg3NSw1Ljg3NUg1Ljg3NUMyLjYzLDMxLjk1NiwwLDI5LjMyNywwLDI2LjA4MWwwLDBjMC0zLjI0NSwyLjYzLTUuODc1LDUuODc1LTUuODc1DQoJCWg0MC40MTFDNDkuNTMxLDIwLjIwNiw1Mi4xNjEsMjIuODM1LDUyLjE2MSwyNi4wODFMNTIuMTYxLDI2LjA4MXoiLz4NCjwvZz4NCjwvc3ZnPg0K)\n    }\n    \n    .language-grid .language-search--row {\n        width: 100%;\n        padding: 10px 15px;\n        background-color: #fafafa;\n        border-top: 1px solid #d7d9df;\n        border-bottom-right-radius: 10px;\n        border-bottom-left-radius: 10px;\n        box-sizing: border-box;\n    }\n    \n    .language-grid .language-search--input {\n        width: 100%;\n        padding: 5px 15px;\n        font-size: 15px;\n        outline-color: #d7d9df;\n        border: 1px solid #d7d9df;\n        box-sizing: border-box;\n    }\n    \n    @media screen and (min-width: 768px) {\n      /*.rephrase-wrapper #rephrase-languages .styled-grid {\n        width: 520px;\n        grid-template-columns: repeat(4, 1fr);\n      }*/\n      /*.rephrase-wrapper #rephrase-languages .styled-grid-item:last-child {\n        display: flex;\n      }*/\n      \n      #rephrase-languages.language-grid {\n          width: 600px;\n      }\n      #rephrase-languages.language-grid .styled-grid {\n          grid-template-columns: repeat(4, 1fr);\n          min-height: 435px;\n          height: auto;\n      }\n      .language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--layout {\n          height: 435px;\n      }\n    }\n  \n    @keyframes rotation {\n      0% {\n          transform: rotate(0deg);\n      }\n      100% {\n          transform: rotate(360deg);\n      }\n    } \n    `,
                t = document.createElement("style");
            return t.appendChild(document.createTextNode(e)), t
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const s = i(n(20)),
        r = i(n(21)),
        o = i(n(22)),
        a = i(n(23)),
        l = i(n(24)),
        d = i(n(25)),
        g = i(n(26));
    t.ICONS = {
        "/images/plus.svg": s.default,
        "/images/plus-circle-thin.svg": r.default,
        "/images/minus.svg": o.default,
        "/images/minus-blue.svg": a.default,
        "/images/star.svg": l.default,
        "/images/star-round.svg": d.default,
        "/images/settings-adjust.svg": g.default
    }
}, function(e, t, n) {
    "use strict";
    n.r(t), t.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0ibTEyLjc1IDVjMC0uNDE0MjEtLjMzNTgtLjc1LS43NS0uNzVzLS43NS4zMzU3OS0uNzUuNzV2Ni4yNWgtNi4yNWMtLjQxNDIxIDAtLjc1LjMzNTgtLjc1Ljc1cy4zMzU3OS43NS43NS43NWg2LjI1djYuMjVjMCAuNDE0Mi4zMzU4Ljc1Ljc1Ljc1cy43NS0uMzM1OC43NS0uNzV2LTYuMjVoNi4yNWMuNDE0MiAwIC43NS0uMzM1OC43NS0uNzVzLS4zMzU4LS43NS0uNzUtLjc1aC02LjI1eiIgZmlsbD0iIzE5OEZDRiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+Cg=="
}, function(e, t, n) {
    "use strict";
    n.r(t), t.default = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xMS41IDBjNi4zNDcgMCAxMS41IDUuMTUzIDExLjUgMTEuNXMtNS4xNTMgMTEuNS0xMS41IDExLjUtMTEuNS01LjE1My0xMS41LTExLjUgNS4xNTMtMTEuNSAxMS41LTExLjV6bTAgMWM1Ljc5NSAwIDEwLjUgNC43MDUgMTAuNSAxMC41cy00LjcwNSAxMC41LTEwLjUgMTAuNS0xMC41LTQuNzA1LTEwLjUtMTAuNSA0LjcwNS0xMC41IDEwLjUtMTAuNXptLjUgMTBoNnYxaC02djZoLTF2LTZoLTZ2LTFoNnYtNmgxdjZ6Ii8+PC9zdmc+Cg=="
}, function(e, t, n) {
    "use strict";
    n.r(t), t.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iI0I3QjdCNyIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHZpZXdCb3g9IjAgMCA1Mi4xNjEgNTIuMTYxIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik01Mi4xNjEsMjYuMDgxYzAsMy4yNDYtMi42Myw1Ljg3NS01Ljg3NSw1Ljg3NUg1Ljg3NUMyLjYzLDMxLjk1NiwwLDI5LjMyNywwLDI2LjA4MWwwLDBjMC0zLjI0NSwyLjYzLTUuODc1LDUuODc1LTUuODc1DQoJCWg0MC40MTFDNDkuNTMxLDIwLjIwNiw1Mi4xNjEsMjIuODM1LDUyLjE2MSwyNi4wODFMNTIuMTYxLDI2LjA4MXoiLz4NCjwvZz4NCjwvc3ZnPg0K"
}, function(e, t, n) {
    "use strict";
    n.r(t), t.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iIzE5OEZDRiIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHZpZXdCb3g9IjAgMCA1Mi4xNjEgNTIuMTYxIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik01Mi4xNjEsMjYuMDgxYzAsMy4yNDYtMi42Myw1Ljg3NS01Ljg3NSw1Ljg3NUg1Ljg3NUMyLjYzLDMxLjk1NiwwLDI5LjMyNywwLDI2LjA4MWwwLDBjMC0zLjI0NSwyLjYzLTUuODc1LDUuODc1LTUuODc1DQoJCWg0MC40MTFDNDkuNTMxLDIwLjIwNiw1Mi4xNjEsMjIuODM1LDUyLjE2MSwyNi4wODFMNTIuMTYxLDI2LjA4MXoiLz4NCjwvZz4NCjwvc3ZnPg0K"
}, function(e, t, n) {
    "use strict";
    n.r(t), t.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBmaWxsPSIjMTk4RkNGIiBkPSJNMTc1LjEsMTY4LjlMMTMuNywxODYuOGMtNS44LDAuNy0xMSw0LjYtMTIuOSwxMC41Yy0xLjksNS45LDAsMTIuMSw0LjMsMTZjNDgsNDMuOCwxMjAuMSwxMDkuNCwxMjAuMSwxMDkuNA0KCQljLTAuMSwwLTE5LjgsOTUuNC0zMi45LDE1OS4xYy0xLjEsNS44LDEsMTEuOSw2LDE1LjVjNSwzLjcsMTEuNCwzLjcsMTYuNSwwLjlDMTcxLjMsNDY2LDI1Niw0MTcuNywyNTYsNDE3LjdsMTQxLjEsODAuNQ0KCQljNS4xLDIuOCwxMS42LDIuOCwxNi42LTAuOWM1LTMuNyw3LjEtOS43LDYtMTUuNWwtMzIuOC0xNTkuMUw1MDcsMjEzLjRjNC4zLTQsNi4yLTEwLjIsNC4zLTE2LjFjLTEuOS01LjktNy4xLTkuOC0xMi45LTEwLjQNCgkJYy02NC42LTcuMi0xNjEuNS0xOC0xNjEuNS0xOEwyNjkuOSwyMC44Yy0yLjUtNS4zLTcuOC05LTE0LTljLTYuMiwwLTExLjUsMy43LTEzLjksOUwxNzUuMSwxNjguOXoiLz4NCjwvZz4NCjwvc3ZnPg0K"
}, function(e, t, n) {
    "use strict";
    n.r(t), t.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIGZpbGw9IiMxOThGQ0YiIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDU2IDU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMjcuOTk5OSA1MS45MDYzIEMgNDEuMDU0NiA1MS45MDYzIDUxLjkwNjMgNDEuMDc4MSA1MS45MDYzIDI4IEMgNTEuOTA2MyAxNC45NDUzIDQxLjAzMTIgNC4wOTM3IDI3Ljk3NjUgNC4wOTM3IEMgMTQuODk4MyA0LjA5MzcgNC4wOTM3IDE0Ljk0NTMgNC4wOTM3IDI4IEMgNC4wOTM3IDQxLjA3ODEgMTQuOTIxOCA1MS45MDYzIDI3Ljk5OTkgNTEuOTA2MyBaIE0gMTguNjQ4MyA0MS4wNTQ3IEMgMTguMDg1OCA0MC42MzI4IDE3Ljk5MjEgMzkuOTUzMSAxOC4zMjAyIDM4Ljk5MjIgTCAyMS4xNzk2IDMwLjQzNzUgTCAxMy44NjcxIDI1LjIxMDkgQyAxMy4wMjM0IDI0LjYyNTAgMTIuNzE4NyAyMy45Njg4IDEyLjkwNjIgMjMuMzEyNSBDIDEzLjExNzEgMjIuNjc5NyAxMy43NzMzIDIyLjM1MTYgMTQuNzgxMiAyMi4zNTE2IEwgMjMuNzgxMiAyMi40MjE5IEwgMjYuNTIzNCAxMy44MjAzIEMgMjYuODA0NiAxMi44NTk0IDI3LjI5NjggMTIuMzQzNyAyNy45OTk5IDEyLjM0MzcgQyAyOC43MDMwIDEyLjM0MzcgMjkuMTcxOCAxMi44NTk0IDI5LjQ3NjUgMTMuODIwMyBMIDMyLjIxODcgMjIuNDIxOSBMIDQxLjE5NTIgMjIuMzUxNiBDIDQyLjIyNjUgMjIuMzUxNiA0Mi44MzU4IDIyLjY3OTcgNDMuMDcwMiAyMy4zMTI1IEMgNDMuMzA0NiAyMy45Njg4IDQyLjk1MzAgMjQuNjI1MCA0Mi4xMzI3IDI1LjIxMDkgTCAzNC43OTY4IDMwLjQzNzUgTCAzNy42NTYyIDM4Ljk5MjIgQyAzNy45ODQzIDM5Ljk1MzEgMzcuODkwNSA0MC42MzI4IDM3LjM1MTQgNDEuMDU0NyBDIDM2Ljc2NTUgNDEuNTAwMCAzNi4wODU4IDQxLjMzNTkgMzUuMjY1NSA0MC43MjY2IEwgMjcuOTk5OSAzNS40MDYzIEwgMjAuNzM0MyA0MC43MjY2IEMgMTkuODkwNSA0MS4zMzU5IDE5LjIxMDkgNDEuNTAwMCAxOC42NDgzIDQxLjA1NDcgWiIvPjwvc3ZnPgo="
}, function(e, t, n) {
    "use strict";
    n.r(t), t.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyBmaWxsPSIjMTk4RkNGIiB2ZXJzaW9uPSIxLjEiIGlkPSJpY29uIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgoJIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDpub25lO30KPC9zdHlsZT4KPHRpdGxlPnNldHRpbmdzLS1hZGp1c3Q8L3RpdGxlPgo8cGF0aCBkPSJNMzAsOGgtNC4xYy0wLjUtMi4zLTIuNS00LTQuOS00cy00LjQsMS43LTQuOSw0SDJ2MmgxNC4xYzAuNSwyLjMsMi41LDQsNC45LDRzNC40LTEuNyw0LjktNEgzMFY4eiBNMjEsMTJjLTEuNywwLTMtMS4zLTMtMwoJczEuMy0zLDMtM3MzLDEuMywzLDNTMjIuNywxMiwyMSwxMnoiLz4KPHBhdGggZD0iTTIsMjRoNC4xYzAuNSwyLjMsMi41LDQsNC45LDRzNC40LTEuNyw0LjktNEgzMHYtMkgxNS45Yy0wLjUtMi4zLTIuNS00LTQuOS00cy00LjQsMS43LTQuOSw0SDJWMjR6IE0xMSwyMGMxLjcsMCwzLDEuMywzLDMKCXMtMS4zLDMtMywzcy0zLTEuMy0zLTNTOS4zLDIwLDExLDIweiIvPgo8cmVjdCBpZD0iX1RyYW5zcGFyZW50X1JlY3RhbmdsZV8iIGNsYXNzPSJzdDAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIvPgo8L3N2Zz4K"
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(1),
        s = n(2),
        r = n(0);
    t.Session = class {
        constructor(e) {
            this.api_key = "", this.storage = {}, this.freemiumStorageKey = "fdl/web", this.n1 = parseInt("5f8", 16), this.n2 = parseInt("3bb4", 16), this.n3 = parseInt("186a0", 16), this.range = [
                [1, 1001],
                [2, "b"],
                [11, 1e3],
                [4, 6],
                [101, 1010],
                [3, 7],
                [100, 1e3],
                [1, 5]
            ], this.core = e, this.addStorageItem("consumed_chars_total", 0), this.addStorageItem("unchecked_range", [])
        }
        initialize() {
            this.addStorageItem("consumed_chars_total", this.getCurrentDayUsage()), i.logger("Session storage initialized", JSON.stringify(this.storage))
        }
        addStorageItem(e, t) {
            this.storage[e] = t
        }
        removeStorageItem(e) {
            delete this.storage[e]
        }
        addConsumedChars(e) {
            const t = Number(e) || 0;
            this.storage.consumed_chars_total += t
        }
        getConsumedCharsLimit() {
            return this.storage.consumed_chars_limit
        }
        isReachedConsumedCharsLimit(e = 0) {
            const t = Number(this.storage.consumed_chars_total),
                n = Number(this.storage.consumed_chars_limit);
            return t && n && t + e > n
        }
        isReachedDailyLimit(e = 0) {
            if (r.globalUser.isPremium() || "fr" === this.core.correction_language) return i.logger("Check daily limit: Ignore daily limit for Premium or French language"), !1;
            const t = Number(this.storage.consumed_chars_total),
                n = Number(this.storage.daily_chars_limit);
            return i.logger(`Daily limit: ${t} / ${n}`), t && n && t + e > n
        }
        getCurrentDayUsage() {
            if (r.globalUser.isPremium()) return 0;
            const e = JSON.parse(localStorage.getItem(this.freemiumStorageKey) || "[]");
            if (e && e.length) {
                const t = (new Date).toISOString().split("T")[0],
                    n = e.find(e => e.date === t);
                if (n) return n.value
            }
            return 0
        }
        setCurrentDayUsage(e) {
            if (r.globalUser.isPremium() || "fr" === this.core.correction_language) return void i.logger("Set daily usage: Ignore daily limit for Premium or French language");
            this.addConsumedChars(e);
            let t = JSON.parse(localStorage.getItem(this.freemiumStorageKey) || "[]");
            const n = (new Date).toISOString().split("T")[0];
            if (i.logger(">>> setCurrentDayUsage", n, JSON.stringify(t)), t && t.length) {
                const i = t.find(e => e.date === n);
                i ? i.value += e : t = [{
                    date: n,
                    value: e
                }]
            } else t = [{
                date: n,
                value: e
            }];
            i.logger("<<< setCurrentDayUsage", n, JSON.stringify(t)), localStorage.setItem(this.freemiumStorageKey, JSON.stringify(t))
        }
        addUncheckedRange(e) {
            Array.isArray(e) ? this.storage.unchecked_range.push(...e) : this.storage.unchecked_range.push(e), this.storage.unchecked_range = [...new Set(this.storage.unchecked_range.filter(e => e >= 0))]
        }
        addUncheckedRangeIfEmpty(e) {
            this.storage.unchecked_range.length || this.addUncheckedRange(e)
        }
        unsetUncheckedRange() {
            this.addStorageItem("unchecked_range", [])
        }
        findConsumedText(e, t) {
            const {
                diff: n,
                startIndex: s,
                endIndex: r
            } = this.core.storageMapPos.findIndeciesOfChange(e.text, t.text), o = this.findTextStart(t.text, s), a = this.findTextEnd(t.text, r), l = t.text.substring(o, a);
            i.logger(`Consumed text: «${l}» [${o}; ${a}]`), this.addStorageItem("consumed_text", l)
        }
        getLastConsumedText(e = !0) {
            let t;
            return void 0 !== this.storage.consumed_text ? (i.logger("getLastConsumedText is defined"), t = this.storage.consumed_text) : (i.logger("getLastConsumedText is not defined"), t = this.core.editorState.text), e && this.removeStorageItem("consumed_text"), t
        }
        setSessionLimitPopupStatus() {
            this.addStorageItem("session_limit_popup_status", !0)
        }
        getSessionLimitPopupStatus() {
            return this.storage.session_limit_popup_status
        }
        nbc(e) {
            const t = e.replace(/<br>|<\/br>|<p>|<\/p>/g, "");
            var n = t.length;
            n >= 755 && (n = 755);
            let i = 0;
            for (let e = 0; e < n; e += 1) {
                const n = t.codePointAt(e),
                    s = n.toString().length;
                i = i + n + s
            }
            const s = i + t.length + this.n1,
                r = String(s * s + this.n2);
            return (r.slice(-1) + r.slice(1, -1) + r[0]).split("").reverse().join("")
        }
        isLineBreak(e, t) {
            return t >= 0 && /^[\r\n]$/.test(e[t])
        }
        findTextStart(e, t) {
            let n = t;
            if (!isFinite(n) || t <= 0) return 0;
            for (; n;) {
                if (s.separators.includes(e[n]) && !s.isAbbreviation(e, n)) {
                    n += 1;
                    break
                }
                n -= 1
            }
            return n
        }
        findTextEnd(e, t) {
            let n = t;
            if (!isFinite(n)) return 0;
            for (; n < e.length;) {
                if (s.separators.includes(e[n]) && !s.isAbbreviation(e, n)) {
                    n += 1;
                    break
                }
                n += 1
            }
            return n
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(1),
        s = n(2),
        r = n(0);
    t.StorageMapPos = class {
        constructor(e) {
            this.array = [], this.core = e
        }
        handleState(e, t) {
            this.core.syncMirror(), this.core.updatePosition();
            const n = performance.now(),
                {
                    diff: s,
                    startIndex: r,
                    endIndex: o,
                    isModified: a
                } = this.findIndeciesOfChange(e.text, t.text);
            if (i.logger("handleState: startIndex: ", r, "; endIndex: ", o, "; diff: ", s, "; isModified: ", a), 0 !== s || a) {
                if (e.selectedText.length > 0) {
                    const t = this.findInRange(r, r + e.selectedText.length);
                    this.remove(t)
                }
                const n = this.findInRange(r, s > 0 ? t.caret : o);
                this.remove(n), this.core.session.addUncheckedRange([r, o]), this.core.session.findConsumedText(e, t), this.array.forEach(e => {
                    if (e.LeftPos > r) {
                        e.LeftPos += s, e.RightPos += s;
                        const t = this.draw(e);
                        t && (t.isDrawn = !0)
                    }
                }), this.core.network.request([r, o])
            } else this.array.forEach(e => {
                const t = this.draw(e);
                t && (t.isDrawn = !0)
            });
            const l = this.findOutRange();
            this.remove(l), this.core.dispatchScrollEvent(), this.core.editorState.cleanState(n), this.core.dispatchScribensEvent({
                type: "storageMapPos"
            })
        }
        handleResponse(e, t, n) {
            if (e && "Map_PosSol" in e) {
                i.logger("handleResponse", t, n), this.core.syncMirror(), this.core.updatePosition();
                let o = [];
                const a = Object.keys(e.Map_PosSol),
                    l = a.length > 1 && a.includes("Cor");
                a.forEach(t => {
                    const n = e.Map_PosSol[t].map(e => ({
                        ...e,
                        TypeName: t
                    }));
                    o.push(...n)
                });
                const d = s.regexpMode(this.core.mode);
                i.logger(d, "PanelIsOpen", r.globalUser.stylePanelIsOpen, "corWithStyles", l, a);
                const g = this.array.filter(e => d.test(e.TypeName) && e.LeftPos >= t && e.RightPos <= n).filter(e => !r.globalUser.stylePanelIsOpen || l);
                for (let e = 0; e < o.length; e += 1) {
                    const n = o[e];
                    n.LeftPos += t, n.RightPos += t;
                    const i = [...this.array].filter(e => e.TypeName === n.TypeName && e.LeftPos === n.LeftPos && e.RightPos === n.RightPos).shift(),
                        s = g.findIndex(e => e === i);
                    if (s >= 0) g.splice(s, 1);
                    else if (d.test(n.TypeName)) {
                        const e = this.draw(n);
                        e && (e.isDrawn = !0, this.array.push(e))
                    } else i || this.array.push(n)
                }
                this.remove(g), o.length = 0, this.core.ui.hideEmptyOptions(), this.core.dispatchScribensEvent({
                    type: "storageMapPos"
                })
            }
        }
        draw(e) {
            if (e.LeftPos < 0 || e.RightPos < 0) return this.remove(e), null;
            if (!s.regexpMode(this.core.mode).test(e.TypeName)) return null;
            const t = this.core.util.findClientRects(e);
            if (e.deferred) return e;
            if (this.clearingDomRects(t), !t.length) return this.remove(e), null;
            "markElements" in e ? e.markElements.forEach(e => {
                e.dataset.time = 0
            }) : e.markElements = [];
            const n = [e.MotSolution.WordSt, e.MotSolution.Start_Pos, e.MotSolution.End_Pos, e.MotSolution.Type, String(e.MotSolution.EstSuggestion)],
                i = this.hashMotSolution(n.join("-"));
            for (let n = 0; n < t.length; n += 1) {
                const s = this.core.util.computeArrangement(t[n]);
                let r = !0,
                    o = [...e.markElements].filter(e => e.dataset.hash === `${i}.${n}`).shift();
                o ? (r = !1, o.className = "mark visible") : (o = document.createElement("div"), o.className = "mark", o.dataset.type = e.MotSolution.Type, o.dataset.typeName = e.TypeName, o.dataset.estSuggestion = String("Cor" === e.TypeName && e.MotSolution.EstSuggestion), o.dataset.hash = `${i}.${n}`), Object.assign(o.style, s), o.dataset.time = window.performance.now(), r && (this.core.canvasLayout.appendChild(o), e.markElements.push(o), setTimeout(() => {
                    o.classList.add("visible")
                }, 50))
            }
            return e.markElements.forEach(t => {
                if ("0" === t.dataset.time && t.parentNode) {
                    t.parentNode.removeChild(t);
                    const n = e.markElements.findIndex(e => e === t);
                    n >= 0 && e.markElements.splice(n, 1)
                }
            }), e
        }
        remove(e) {
            if (Array.isArray(e)) e.forEach(e => this.remove(e));
            else {
                e && Array.isArray(e.markElements) && e.markElements.forEach(e => {
                    e.parentNode && e.parentNode.removeChild(e)
                });
                const t = this.array.findIndex(t => t === e);
                t >= 0 && this.array.splice(t, 1)
            }
            Object.keys(e).length > 0 && this.core.ui.solutionWrapper.childNodes.length && (this.core.ui.solutionWrapper.innerHTML = "")
        }
        redrawAll(e = !1) {
            e && (this.core.canvasLayout.innerHTML = ""), this.core.syncMirror(), this.core.updatePosition(), this.array.forEach(t => {
                e && (t.markElements = [], t.isDrawn = ["Cor"].includes(t.TypeName), delete t.cache);
                const n = this.draw(t);
                n && n.isDrawn && Array.isArray(n.markElements) && n.markElements.forEach(e => {
                    e.className = "mark visible"
                })
            })
        }
        redrawAfter(e, t) {
            this.core.syncMirror(), this.core.updatePosition(), this.array.forEach(n => {
                n.LeftPos > e && (n.LeftPos += t, n.RightPos += t, this.draw(n))
            }), this.core.dispatchScribensEvent({
                type: "storageMapPos"
            })
        }
        redrawIndecies(e, t, n, i) {
            this.core.syncMirror(), this.core.updatePosition(), this.array.forEach(s => {
                s.LeftPos >= e && s.LeftPos <= t && (s.LeftPos > n && (s.LeftPos += i, s.RightPos += i), this.draw(s))
            }), this.core.dispatchScribensEvent({
                type: "storageMapPos"
            })
        }
        removeAll() {
            this.core.canvasLayout.innerHTML = "", this.array.length = 0, this.core.dispatchScribensEvent({
                type: "storageMapPos"
            })
        }
        findInRange(e, t, n = !0) {
            return this.array.filter(i => {
                const s = i.LeftPos >= e && i.RightPos <= t,
                    r = e >= i.LeftPos && e <= i.RightPos && t >= i.LeftPos && t <= i.RightPos;
                if (n) {
                    const n = i.RightPos >= e && i.RightPos <= t && i.LeftPos < e,
                        o = i.LeftPos >= e && i.LeftPos <= t && i.RightPos > t;
                    return s || n || o || r
                }
                const o = i.RightPos > e && i.RightPos <= t && i.LeftPos < e,
                    a = i.LeftPos > t && i.LeftPos <= t && i.RightPos > t;
                return s || o || a || r
            })
        }
        findOutRange() {
            const e = this.core.editorState.getState().text.length;
            return this.array.filter(t => t.LeftPos < 0 || t.LeftPos >= e || t.RightPos > e)
        }
        findIndeciesOfChange(e, t) {
            let n = 0,
                s = 0,
                r = t.length - e.length,
                o = !1;
            if (e === t) return {
                startIndex: n,
                endIndex: s,
                diff: r,
                isModified: o
            };
            const a = this.core.dmp.diff_main(e, t);
            if (i.logger("dmp", e.length, t.length, a), 1 === a.length && ("" === e || "" === t)) return {
                startIndex: n,
                isModified: o,
                endIndex: Math.max(t.length, e.length),
                diff: t.length - e.length
            };
            for (let e = 0; e < a.length; e += 1) {
                if (0 !== a[e][0]) {
                    o = !0;
                    break
                }
                n += a[e][1].length
            }
            for (let e = a.length - 1; e >= 0; e -= 1) {
                if (0 !== a[e][0]) {
                    o = !0;
                    break
                }
                s += a[e][1].length
            }
            return {
                startIndex: n,
                diff: r,
                isModified: o,
                endIndex: t.length - s
            }
        }
        clearingDomRects(e) {
            if (e.length > 1) {
                let t = !1;
                for (let n = 0; n < e.length; n += 1) {
                    if (t) continue;
                    const i = e[n];
                    if (e.filter(e => e !== i && e.top === i.top && e.left === i.left && e.width >= i.width).shift()) {
                        e.splice(e.findIndex(e => e === i), 1), t = !0;
                        break
                    }
                    const s = e.filter(e => e !== i && (e.top === i.top && i.right >= e.left && i.right === e.right || e.top === i.top && e.left >= i.left && e.right <= i.right)).shift();
                    if (s) {
                        e.splice(e.findIndex(e => e === s), 1), t = !0;
                        break
                    }
                    const r = e.filter(e => e !== i && e.left === i.right && e.top === i.top).shift();
                    if (r) {
                        e[n] = new DOMRect(i.x, Math.min(i.y, r.y), i.width + r.width, Math.max(i.height, r.height)), e.splice(e.findIndex(e => e === r), 1), t = !0;
                        break
                    }
                }
                t && this.clearingDomRects(e)
            }
        }
        hashMotSolution(e) {
            let t = 0;
            if (0 === e.length) return t;
            for (let n = 0; n < e.length; n += 1) {
                t = (t << 5) - t + e.codePointAt(n), t &= t
            }
            return t
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(0),
        s = n(6),
        r = n(1),
        o = n(2);
    t.Synonymer = class {
        constructor(e) {
            this.abortController = new AbortController, this.inlineMode = !1, this.quotaReached = !1, this.storageKey = "synonymer-first-time", this.selectedTone = "nope", this.selectedToneKey = "synonyms-selected-tone", this.selectedLangKey = "synonyms-selected-lang", this.propositions = [], this.core = e, this.attach()
        }
        attach() {
            const e = this.core.ui;
            e.shadowRoot.appendChild(this.css()), this.layout = document.createElement("div"), this.layout.className = "synonyms-layout", e.shadowRoot.appendChild(this.layout), document.addEventListener("mousedown", e => {
                if (r.logger("synonymer.mousedown", e), this.lastFocusedElement = document.activeElement, !this.wrapper) return;
                const t = this.wrapper.querySelector("#synonyms-selected-tone"),
                    n = this.wrapper.querySelector("#synonyms-tones"),
                    i = this.wrapper.querySelector("#synonyms-selected-lang"),
                    s = this.wrapper.querySelector("#synonyms-languages"),
                    o = e.composedPath()[0];
                e.target === this.core.element ? this.hidePopup() : n.contains(o) || t.contains(o) ? s.contains(o) || i.contains(o) || this.wrapper.classList.remove("view-languages") : this.wrapper.classList.remove("view-tones")
            }, {
                capture: !0,
                passive: !0
            })
        }
        detach() {
            this.core.ui.shadowRoot.removeChild(this.layout)
        }
        showPopup() {
            this.layout.innerHTML = "", this.highlight && this.core.storageMapPos.remove(this.highlight), this.abortController = new AbortController, this.wrapper = document.createElement("div"), this.wrapper.className = "synonyms-wrapper", this.wrapper.classList.toggle("is-premium", Boolean(i.globalUser.isPremium())), this.selectedTone = localStorage.getItem(this.selectedToneKey) || "nope", this.selectedLang = localStorage.getItem(this.selectedLangKey) || this.core.correction_language;
            const e = null === localStorage.getItem(this.storageKey);
            this.inlineMode = this.lastFocusedElement === this.core.element, this.adjustPopupPosition(), this.wrapper.classList.toggle("inline-mode", this.inlineMode), this.wrapper.classList.toggle("is-first-time", e), this.quotaReached = this.IsQuotaReached(), this.wrapper.classList.toggle("quota-reached", this.quotaReached);
            const t = document.createElement("div");
            t.className = "synonyms-container";
            const n = document.createElement("button");
            n.className = "close-button", n.onclick = () => {
                localStorage.setItem(this.storageKey, "false"), this.wrapper.remove(), this.core.storageMapPos.remove(this.highlight)
            }, t.appendChild(n), t.appendChild(this.createInfoContent()), t.appendChild(this.createQuotaReachedContent()), t.appendChild(this.errorContent()), t.appendChild(this.createSynynomsContent()), this.wrapper.appendChild(t), this.layout.appendChild(this.wrapper), !this.inlineMode || e || this.quotaReached || (this.wrapper.classList.add("loading"), this.wrapper.dataset.error = "", this.getSynonyms())
        }
        hidePopup() {
            localStorage.setItem(this.storageKey, "false"), this.wrapper.remove(), this.highlight && this.core.storageMapPos.remove(this.highlight), this.abortController.abort()
        }
        showError(e) {
            if (!this.inlineMode) return this.inlineMode = !1, this.lastFocusedElement = null, void this.showPopup();
            this.wrapper.classList.add("has-error");
            const t = this.wrapper.querySelector(".error-content"),
                n = t.querySelector(".error-title");
            this.wrapper.dataset.error = e.Error, t.dataset.error = e.Error;
            let s = window.Labels.unable_display_result;
            if ("max_length_request" === e.Error ? s = window.Labels.max_length_request : "no_word" === e.Error ? s = window.Labels.rephrase_sel_noword : "no_prop" === e.Error ? s = window.Labels.rephrase_no_prop : "lim_request_per_day_reached" === e.Error ? s = window.Labels.synonyms_lim_request_per_day_reached : "lim_char_premium_reached" === e.Error ? s = window.Labels.synonyms_lim_char_premium_reached : "premium_unlimited_synonyms" === e.Error && (s = window.Labels.synonyms_premium_unlimited_synonyms), n.innerHTML = s, "max_sentences_reached" === e.Error)
                if (i.globalUser.isPremium()) n.innerHTML = window.Labels.rephrase_premium_max_sentences_reached;
                else {
                    t.querySelector(".image-container img").setAttribute("src", this.core.prefixFolder + "images/rephrase_limit_image.png")
                } if ("no_prop" === e.Error) {
                const e = this.wrapper.querySelector(".synonyms-content .synonyms-body");
                e.innerHTML = "", e.appendChild(t), this.wrapper.classList.remove("has-error")
            }
        }
        adjustPopupPosition(e = !1) {
            if (this.wrapper instanceof HTMLElement)
                if (r.logger("synonymer.adjustPopupPosition"), this.inlineMode) {
                    const t = this.core.element,
                        n = this.core.getClientRectsOfSelection(),
                        i = Math.min(...n.map(e => e.left + window.scrollX)),
                        s = this.core.getClientRectsOfSelection(),
                        r = t.getBoundingClientRect(),
                        o = r.top + r.height + window.scrollY,
                        a = Math.min(o, Math.max(...s.map(e => e.top + e.height + window.scrollY + 5)));
                    isFinite(i) && isFinite(a) ? (e || (this.wrapper.style.left = i + "px"), this.wrapper.style.top = a + "px") : (this.wrapper.removeAttribute("style"), this.inlineMode = !1)
                } else this.wrapper.removeAttribute("style")
        }
        async getSynonyms(e = !0, t = !1) {
            const n = new s.OtherAlg_Servlet,
                i = this.core.element,
                r = `<p>${this.core.editorState.text.replace(/[\r\n]/g,"<br>")}</p>`,
                o = {
                    TextHTML: r,
                    Nbc: this.core.session.nbc(r),
                    StartPos_Sel: i.selectionStart,
                    EndPos_Sel: i.selectionEnd,
                    Tone: this.selectedTone,
                    IdLanguage: this.selectedLang,
                    IdLangDisplay: this.core.lang,
                    Others: t
                };
            return n.getSynonyms(o, this.abortController.signal).then(n => {
                if (this.highlight && this.core.storageMapPos.remove(this.highlight), t) {
                    this.wrapper.querySelector("#load-more-row").classList.remove("loading")
                }
                if ("Error" in n) return this.showError(n), Promise.resolve(n);
                this.Increment_Counter_Usage(e), this.abortController = new AbortController, e && (this.createHighlight(n), this.selectionStart = n.Pos_Start, this.selectionEnd = n.Pos_End), this.wrapper.classList.remove("loading"), this.renderSynonymsTexts(n, t)
            })
        }
        renderSynonymsTexts(e, t = !1) {
            const n = this.wrapper.querySelector("#synonyms-list");
            if (n.innerHTML = "", t || (this.propositions = []), e && "Vect_Propositions" in e)
                for (let t = 0; t < e.Vect_Propositions.length; t += 1) {
                    if (this.propositions.includes(e.Vect_Propositions[t])) continue;
                    this.propositions.push(e.Vect_Propositions[t]);
                    const i = document.createElement("div");
                    i.className = "synonyms-item", i.innerHTML = e.Vect_Propositions[t].replace(/[\r\n]/g, "<br>"), i.onclick = () => {
                        this.core.storageMapPos.remove(this.highlight), this.core.element.focus(), this.core.element.selectionStart = this.selectionStart, this.core.element.selectionEnd = this.selectionEnd, this.core.insertText(e.Vect_Propositions[t]), this.hidePopup()
                    }, n.appendChild(i)
                }
        }
        IsQuotaReached() {
            if (i.globalUser.isPremium()) return !1;
            let e = (new Date).toISOString().split("T")[0];
            const t = JSON.parse(localStorage.getItem("synonymsUsage")) || {};
            return t.date !== e && (t.date = e, t.count = 0, localStorage.setItem("synonymsUsage", JSON.stringify(t))), t.count >= 15
        }
        Increment_Counter_Usage(e = !1) {
            if (e && !i.globalUser.isPremium()) {
                const e = JSON.parse(localStorage.getItem("synonymsUsage")) || {};
                e.count += 1, localStorage.setItem("synonymsUsage", JSON.stringify(e))
            }
        }
        createInfoContent() {
            const e = document.createElement("div");
            return e.className = "info-content", e.innerHTML = `\n      <div class="image-container">\n        <img src='${this.core.prefixFolder}images/icone/picto-magic-wand-blue.png'/>\n      </div>\n      <p class="synonyms-title">${window.Labels.synonyms_welcome}</p>\n      <p class="synonyms-desc">\n        ${window.Labels.synonyms_select}${this.inlineMode?".":" "+window.Labels.synonyms_click_btn}\n      </p>\n      <button id="synonyms-continue" class="synonyms-button">\n        ${this.inlineMode?window.Labels.continue_title:window.Labels.ok.toUpperCase()}\n      </button>\n    `, e.querySelector("#synonyms-continue").addEventListener("click", () => {
                this.inlineMode ? (localStorage.setItem(this.storageKey, "false"), this.wrapper.classList.remove("is-first-time"), this.wrapper.classList.add("loading"), this.wrapper.dataset.error = "", this.getSynonyms()) : (localStorage.setItem(this.storageKey, "false"), this.hidePopup())
            }), e
        }
        createQuotaReachedContent() {
            const e = document.createElement("div");
            return e.className = "quotareached-content", e.innerHTML = `\n      <div class="image-container">\n        <img src='${this.core.prefixFolder}images/rephrase_limit_image.png'/>\n      </div>\n      <p class="quotareached-title">${window.Labels.synonyms_lim_request_per_day_reached}<br><br>${window.Labels.synonyms_premium_unlimited_synonyms}</p>\n      <a href="${window.Labels.premium_link}" id="premium-link" target="_blank">\n        ${window.Labels.limit_upgrade_premium}\n      </a>\n    `, e
        }
        createSynynomsContent() {
            const e = document.createElement("div");
            e.className = "synonyms-content", e.innerHTML = `\n      <div id="synonyms-tones"></div>\n      <div id="synonyms-languages"></div>\n\n      <div class="synonyms-header">\n        <img src="${this.core.prefixFolder}images/icone/picto-synonyms-blue.png"/>\n\n        <div class="synonyms-header--buttons">\n            <div id="synonyms-selected-tone"></div> \n            <div id="synonyms-selected-lang"></div> \n        </div>\n      </div>\n\n      <div class="synonyms-body">\n        <div id="loading-layout">\n          <div class="spinner"></div>\n        </div>\n\n        <div id="synonyms-list"></div>\n\n        <div>\n          <button type="button" id="load-more-row">\n            ${window.Labels.rephrase_other_propositions}\n\n            <span class="load-more-spinner"></span>\n          </button>\n        </div>\n      </div>\n\n      <div id="synonyms-advert-block"></div>\n    `;
            const t = e.querySelector("#synonyms-selected-tone"),
                n = e.querySelector("#synonyms-tones"),
                s = e.querySelector("#synonyms-selected-lang"),
                r = e.querySelector("#synonyms-languages"),
                a = e.querySelector("#load-more-row"),
                l = e.querySelector("#synonyms-advert-block");
            return t.onclick = () => {
                this.wrapper.classList.toggle("view-tones"), this.wrapper.classList.contains("view-tones") && setTimeout(() => {
                    const e = this.wrapper.querySelector("#synonyms-tones");
                    e.classList.add("container--is-open"), this.core.autoResize(e)
                }, 350)
            }, o.listOfTones.forEach(e => {
                const i = document.createElement("div");
                i.className = "synonyms-tone", i.innerHTML = `\n        <img src="${e.image}"/> \n        ${e.label}\n      `, i.onclick = () => {
                    this.selectedTone = e.id, localStorage.setItem(this.selectedToneKey, this.selectedTone), t.innerHTML = `\n          <img src="${e.image}"/> \n          ${e.label} \n        `, this.wrapper.classList.remove("view-tones"), this.wrapper.classList.add("loading"), this.wrapper.dataset.error = "";
                    const n = this.wrapper.querySelector("#synonyms-list");
                    if (!n || this.wrapper.classList.contains("has-error")) {
                        this.wrapper.classList.remove("has-error");
                        const e = this.wrapper.querySelector(".synonyms-container"),
                            t = this.wrapper.querySelector(".synonyms-content"),
                            n = this.createSynynomsContent();
                        e.replaceChild(n, t), e.appendChild(this.errorContent())
                    } else n.innerHTML = "";
                    this.getSynonyms(!0)
                }, n.appendChild(i), e.id === this.selectedTone && (t.innerHTML = `\n          <img src="${e.image}"/> \n          ${e.label} \n        `)
            }), s.onclick = () => {
                this.wrapper.classList.toggle("view-languages"), this.wrapper.classList.contains("view-languages") && setTimeout(() => {
                    const e = this.wrapper.querySelector("#synonyms-languages");
                    e.classList.add("container--is-open"), this.core.autoResize(e)
                }, 350)
            }, o.createLanguageGrid(r, this.selectedLang ? this.selectedLang.toLowerCase() : "", e => {
                this.selectedLang = e.id, localStorage.setItem(this.selectedLangKey, this.selectedLang), s.innerHTML = `\n          <img src="${e.image}"/> \n          ${e.code} \n        `, this.wrapper.classList.remove("view-languages"), this.wrapper.classList.add("loading"), this.wrapper.dataset.error = "";
                const t = this.wrapper.querySelector("#synonyms-list");
                if (!t || this.wrapper.classList.contains("has-error")) {
                    this.wrapper.classList.remove("has-error");
                    const e = this.wrapper.querySelector(".synonyms-container"),
                        t = this.wrapper.querySelector(".synonyms-content"),
                        n = this.createSynynomsContent();
                    e.replaceChild(n, t), e.appendChild(this.errorContent())
                } else t.innerHTML = "";
                this.getSynonyms(!0), o.refreshLanguageGrid(r, "")
            }, e => {
                s.innerHTML = `\n          <img src="${e.image}"/> \n          <span>${e.code} </span>\n        `
            }), i.globalUser.isPremium() ? (l.remove(), a.onclick = () => {
                a.classList.contains("loading") || (a.classList.add("loading"), this.getSynonyms(!0, !0))
            }) : (l.remove(), a.remove()), e
        }
        errorContent() {
            const e = document.createElement("div");
            return e.className = "error-content", e.innerHTML = `\n      <div class="image-container">\n        <img src="${this.core.prefixFolder}images/rephrase_error_image.png"/>\n      </div>\n      <p class="error-title">\n        ${window.Labels.unable_display_result}\n      </p>\n      <a href="${window.Labels.premium_link}" id="premium-link" target="_blank">\n        ${window.Labels.limit_upgrade_premium}\n      </a>\n    `, e
        }
        createHighlight(e) {
            const t = {
                LeftPos: e.Pos_Start,
                RightPos: e.Pos_End,
                TypeName: "Rephrased",
                MotSolution: {
                    WordSt: "Rephrased",
                    Start_Pos: e.Pos_Start,
                    End_Pos: e.Pos_End,
                    Type: "Rephrased",
                    EstSuggestion: "",
                    Vect_SolId: [],
                    vectSolution: [],
                    ExplicationSolution: ""
                }
            };
            this.highlight = this.core.storageMapPos.draw(t), this.core.storageMapPos.array.push(this.highlight)
        }
        css() {
            const e = `\n    .synonyms-wrapper p {\n      margin: 0;\n      line-height: 1.5;\n    }\n\n    .synonyms-wrapper {\n      position: fixed;\n      inset: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      z-index: 100;\n      pointer-events: none;\n      border-radius: 10px;\n      /*overflow: hidden;*/\n      color: #64676e;\n    }\n\n    .synonyms-wrapper .synonyms-container {\n      position: relative;\n      background-color: #fff;\n      width: 470px;\n      max-width: 470px;\n      border-radius: 10px;\n      box-shadow: 0 0 10px rgba(0,0,0,0.1);\n      box-sizing: border-box;\n      pointer-events: auto;\n    }\n\n    .synonyms-wrapper .synonyms-content,\n    .synonyms-wrapper .error-content {\n      display: none;\n    }\n\n    .synonyms-wrapper.inline-mode:not(.is-first-time) .info-content,\n    .synonyms-wrapper.quota-reached .info-content {\n      display: none;\n    }\n\n    .synonyms-wrapper:not(.quota-reached) .quotareached-content {\n      display: none;\n    }\n\n    .synonyms-wrapper.quota-reached .quotareached-content {\n      display: flex;\n      flex-direction: column;\n      justify-items: center;\n      align-items: center;\n      padding: 30px 20px;\n      font-size: 16px;\n      font-weight: bold;\n    }\n\n    .synonyms-wrapper.inline-mode:not(.is-first-time):not(.quota-reached):not(.has-error) .synonyms-content {\n      display: block;\n    }\n\n    .synonyms-wrapper.has-error .info-content,\n    .synonyms-wrapper.has-error .quota-reached,\n    .synonyms-wrapper.has-error .synonyms-content{\n      display: none;\n    }\n\n    .synonyms-wrapper.has-error:not(.quota-reached) .error-content {\n      display: flex;\n      flex-direction: column;\n      justify-items: center;\n      align-items: center;\n      padding: 30px 20px;\n      font-size: 16px;\n      font-weight: bold;\n    }\n\n    .synonyms-wrapper.has-error .error-content .error-title,\n    .synonyms-wrapper .synonyms-body .error-content .error-title {\n      text-align: center;\n      font-weight: bold;\n    }\n\n    .synonyms-wrapper.has-error .error-content .image-container img,\n    .synonyms-wrapper .synonyms-body .error-content .image-container img {\n      width: 140px;\n      height: auto;\n    }\n\n    .synonyms-wrapper.has-error .error-content #premium-link,\n    .synonyms-wrapper .synonyms-body .error-content #premium-link {\n      display: none;\n      margin-top: 25px;\n      padding: 10px 35px;\n      background-color: #297bbf;\n      color: #fff;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-size: 16px;\n      text-decoration: none;\n      font-weight: normal;\n    }\n\n    .synonyms-wrapper .quotareached-content #premium-link {\n      margin-top: 25px;\n      padding: 10px 35px;\n      background-color: #297bbf;\n      color: #fff;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-size: 16px;\n      text-decoration: none;\n      font-weight: normal;\n    }\n\n    .synonyms-wrapper .quotareached-content .image-container img {\n      width: 60px;\n      margin-bottom: 20px;\n    }\n\n    .synonyms-wrapper.has-error:not(.is-premium) .error-content[data-error="max_sentences_reached"] .image-container img {\n      width: 60px;\n      margin-bottom: 20px;\n    }\n\n    .synonyms-wrapper.has-error:not(.is-premium) .error-content[data-error="max_sentences_reached"] #premium-link {\n      display: block;\n    }\n\n    .synonyms-wrapper .synonyms-container .close-button {\n      border: none;\n      background-color: transparent;\n      background-image: url(${this.core.prefixFolder}images/icone/cross.svg);\n      background-size: 12px;\n      background-repeat: no-repeat;\n      background-position: center;\n      position: absolute;\n      top: 18px;\n      right: 15px;\n      width: 15px;\n      height: 15px;\n      cursor: pointer;\n    }\n\n    .synonyms-wrapper.inline-mode:not(.has-error) .synonyms-container .close-button {\n      width: 20px;\n      height: 20px;\n      top: 18px;\n      right: 10px;\n    }\n\n    .synonyms-wrapper .info-content {\n      display: flex;\n      flex-direction: column;\n      justify-items: center;\n      align-items: center;\n      text-align: center;\n      row-gap: 15px;\n      padding: 30px;\n    }\n\n    .synonyms-wrapper .image-container img {\n      width: 60px;\n      height: 60px;\n    }\n\n    .synonyms-wrapper .synonyms-title {\n      font-size: 15px;\n    }\n\n    .synonyms-wrapper:not(.is-first-time) .synonyms-title {\n      display: none;\n    }\n\n    .synonyms-wrapper .quotareached-title {\n      font-size: 16px;\n      font-weight: bold;\n      text-align: center;\n    }\n\n    .synonyms-wrapper .synonyms-desc {\n      font-size: 18px;\n    }\n\n    .synonyms-wrapper .image-container {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n\n    .synonyms-wrapper .synonyms-button {\n      margin-top: 15px;\n      padding: 10px 35px;\n      background-color: #297bbf;\n      color: #fff;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-size: 16px;\n    }\n    \n    .synonyms-wrapper.inline-mode {\n      position: absolute;\n      inset: auto;\n      border: 1px solid #d7d9df;\n    }\n\n    .synonyms-wrapper.inline-mode .synonyms-container {\n      width: 370px;\n      max-width: 370px;\n    }\n\n    .synonyms-wrapper.inline-mode .info-content {\n      padding: 20px;\n    }\n\n    .synonyms-wrapper.inline-mode .synonyms-desc {\n      font-size: 16px;\n    }\n\n    .synonyms-wrapper.inline-mode .synonyms-button {\n      width: 100%;\n    }\n\n    .synonyms-wrapper .synonyms-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 10px 50px 10px 15px;\n      background-color: #fff;\n      border-bottom: 1px solid #d7d9df;\n      border-top-left-radius: 10px;\n      border-top-right-radius: 10px;\n    }\n    \n    .synonyms-wrapper .synonyms-header .synonyms-header--buttons {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      column-gap: 10px;\n    }\n\n    .synonyms-wrapper .synonyms-header #synonyms-selected-tone,\n    .synonyms-wrapper .synonyms-header #synonyms-selected-lang {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      column-gap: 5px;\n      font-size: 16px;\n      border: 1px solid #d7d9df;\n      color: #64676e;\n      border-radius: 4px;\n      overflow: hidden;\n      padding: 3px 25px 3px 10px;\n      cursor: pointer;\n      position: relative;\n    }\n    \n    .synonyms-wrapper .synonyms-header #synonyms-selected-lang {\n      font-size: 14px;\n    }\n\n    .synonyms-wrapper .synonyms-header #synonyms-selected-tone:after,\n    .synonyms-wrapper .synonyms-header #synonyms-selected-lang:after {\n      content: '';\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      width: 25px;\n      background-image: url(${this.core.prefixFolder}images/icone/chevron-down.svg);\n      background-repeat: no-repeat;\n      background-position: right;\n      background-size: 25px;\n      transition: transform 0.3s ease;\n    }\n\n    .synonyms-wrapper .synonyms-header #synonyms-selected-tone img {\n      width: 25px;\n      height: 25px;\n    }\n    \n    .synonyms-wrapper .synonyms-header #synonyms-selected-lang img {\n      width: 15px;\n      height: 15px;\n      padding: 5px 0;\n    }\n    \n    .synonyms-wrapper .synonyms-header img {\n      width: 35px;\n      height: 35px;\n    }\n\n    .synonyms-wrapper .synonyms-body {\n      background-color: #f6f6f6;\n      padding: 15px;\n      font-size: 16px;\n      display: flex;\n      flex-direction: column;\n      row-gap: 10px;\n      position: relative;\n      min-height: 30px;\n      border-bottom-left-radius: 10px;\n      border-bottom-right-radius: 10px;\n    }\n    \n    .synonyms-wrapper[data-error="no_prop"] .synonyms-body {\n      background-color: #fff;\n    }\n\n    .synonyms-wrapper .synonyms-body #loading-layout {\n      position: absolute;\n      inset: 0;\n      display: none;\n      align-items: center;\n      justify-content: center;\n      border-radius: 10px;\n    }\n\n    .synonyms-wrapper .synonyms-body #loading-layout .spinner {\n\n    }\n\n    .synonyms-wrapper .synonyms-body #load-more-row {\n      color: #118ece;\n      font-weight: bold;\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      column-gap: 5px;\n      border: none;\n      background-color: transparent;\n      font-size: 16px;\n      cursor: pointer;\n    }\n\n    .synonyms-wrapper .synonyms-body #load-more-row .load-more-spinner {\n      display: inline-block;\n      box-sizing: border-box;\n    }\n\n    .synonyms-wrapper .synonyms-body #load-more-row.loading .load-more-spinner {\n      border: 2px solid #118ece;\n      border-bottom-color: #deeaf2;\n      border-radius: 50%;\n      animation: rotation .7s linear infinite;\n      width: 15px;\n      height: 15px;\n    }\n\n    .synonyms-wrapper .synonyms-body #load-more-row:not(.loading) .load-more-spinner:before {\n      content: '+';\n    }\n\n    .synonyms-wrapper.loading .synonyms-body #loading-layout {\n      display: flex;\n    }\n\n    .synonyms-wrapper.loading .synonyms-body #load-more-row {\n      display: none;\n    }\n\n    .synonyms-wrapper .synonyms-body #synonyms-list {\n      display: flex;\n      flex-direction: column;\n      row-gap: 10px;\n    }\n\n    .synonyms-wrapper .synonyms-body .synonyms-item {\n      background-color: #fff;\n      border: 1px solid transparent;\n      padding: 5px 10px;\n      border-radius: 10px;\n      box-shadow: 0 0 5px rgba(0,0,0,0.1);\n      cursor: pointer;\n      transition: color 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;\n    }\n\n    .synonyms-wrapper .synonyms-body .synonyms-item:hover {\n      color: #118ece;\n      border-color: #118ece;\n    }\n    \n    .synonyms-wrapper .synonyms-body .error-content {\n      display: flex;\n      flex-direction: column;\n      justify-items: center;\n      align-items: center;\n      row-gap: 15px;\n    }\n\n    .synonyms-wrapper #synonyms-tones {\n      position: absolute;\n      top: 40px;\n      left: 0;\n      right: 0;\n      display: grid;\n      gap: 3px;\n      grid-template-columns: repeat(2, 1fr);\n      background-color: #fff;\n      border: 1px solid #d7d9df;\n      margin: 10px;\n      border-radius: 7px;\n      padding: 10px;\n      font-size: 16px;\n      transform-origin: top;\n      z-index: 1;\n      transform: scaleY(0);\n      transition: transform 0.3s ease;\n    }\n    \n    .synonyms-wrapper #synonyms-languages {\n      position: absolute;\n      top: 40px;\n      left: 0;\n      right: 0;\n      background-color: #fff;\n      border: 1px solid #d7d9df;\n      margin-top: 10px;\n      border-radius: 7px;\n      font-size: 16px;\n      transform-origin: top;\n      z-index: 1;\n      transform: scaleY(0);\n      transition: transform 0.3s ease;\n      width: 520px;\n      display: flex;\n      flex-direction: column;\n    }\n    \n    #synonyms-languages.language-grid {\n        width: 300px;\n    }\n    \n    .synonyms-wrapper #synonyms-languages .styled-grid {\n      display: grid;\n      gap: 3px;\n      grid-template-columns: repeat(2, 1fr);\n      padding: 10px;\n      overflow-y: auto;\n      grid-auto-columns: auto;\n      grid-auto-rows: auto;\n      align-content: start;\n      align-items: start;\n      box-sizing: border-box;\n    }\n    \n    .language-grid .styled-grid-item > span {\n      flex: 1; \n    }\n\n    .synonyms-wrapper.view-tones #synonyms-tones,\n    .synonyms-wrapper.view-languages #synonyms-languages {\n      transform: scaleY(1);\n    }\n\n    .synonyms-wrapper.view-tones #synonyms-selected-tone:after,\n    .synonyms-wrapper.view-languages #synonyms-selected-lang:after {\n      transform: rotate(180deg);\n    }\n    \n    .synonyms-wrapper-wrapper #synonyms-wrapper-languages::-webkit-scrollbar,\n    .synonyms-wrapper-wrapper #synonyms-wrapper-tones::-webkit-scrollbar {\n      width: 7px;\n    }\n\n    .synonyms-wrapper-wrapper #synonyms-wrapper-tones::-webkit-scrollbar-track,\n    .synonyms-wrapper-wrapper #synonyms-wrapper-languages::-webkit-scrollbar-track {\n      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.10);\n    }\n\n    .synonyms-wrapper-wrapper #synonyms-wrapper-tones::-webkit-scrollbar-thumb,\n    .synonyms-wrapper-wrapper #synonyms-wrapper-languages::-webkit-scrollbar-thumb {\n      background-color: #0085ca;\n      border-radius: 6px;\n    }\n\n    .synonyms-wrapper-wrapper #synonyms-wrapper-tones.container--top-aligned,\n    .synonyms-wrapper-wrapper #synonyms-wrapper-languages.container--top-aligned {\n      bottom: 40px;\n      top: auto;\n      transform-origin: bottom;\n    }\n\n    .synonyms-wrapper #synonyms-tones .synonyms-tone {\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      column-gap: 5px;\n      padding: 5px 10px;\n    }\n\n    .synonyms-wrapper #synonyms-languages .styled-grid-item {\n      display: flex;\n      align-items: center;\n      justify-content: flex-start;\n      column-gap: 5px;\n      padding: 5px 10px;\n      color: #64676e;\n      white-space: nowrap;\n    }\n    \n    /*.synonyms-wrapper #synonyms-languages .styled-grid-item {\n      font-size: 14px;\n    }*/\n    .synonyms-wrapper #synonyms-languages .styled-grid-item:not([data-visible="1"]) {\n      display: none;\n    }\n\n    .synonyms-wrapper #synonyms-tones .synonyms-tone img {\n      width: 25px;\n      height: 25px;\n    }\n    \n    .synonyms-wrapper #synonyms-languages .styled-grid-item img {\n      width: 21px;\n      height: 25px;\n    }\n\n    .synonyms-wrapper #synonyms-tones .synonyms-tone:hover,\n    .synonyms-wrapper #synonyms-languages .styled-grid-item:hover {\n      background-color: #f4f9fd;\n      color: #178fcf;\n      border-radius: 5px;\n      cursor: pointer;\n    }\n\n    .synonyms-wrapper #synonyms-advert-block {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      padding: 0 0 20px 0;\n      background-color: #f6f6f6;\n      font-size: 16px;\n      border-bottom-left-radius: 10px;\n      border-bottom-right-radius: 10px;\n      overflow: hidden;\n    }\n\n    .spinner {\n      border: 2px solid #118ece;\n      border-bottom-color: #deeaf2;\n      border-radius: 50%;\n      animation: rotation .7s linear infinite;\n      width: 15px;\n      height: 15px;\n    }\n    \n    \n    .language-grid.grid-is-filtered .styled-grid {\n        grid-auto-flow: column;\n        grid-template-rows: repeat(11, auto);\n    }\n\n    .language-grid .grid-is-empty--layout {\n      display: none;\n    }\n    \n    .language-grid.grid-is-filtered.grid-is-empty .styled-grid {\n        display: none;\n    }\n    \n    .synonyms-wrapper #synonyms-languages.language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--layout {\n      display: flex;\n      flex-direction: column;\n      row-gap: 20px;\n      height: 380px;\n      justify-content: center;\n      align-items: center;\n      color: #333;\n    }\n    \n    .language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--image {\n        background-color: #edf3fb;\n        width: 64px;\n        height: 64px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n    \n    .language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--header-text {\n        font-weight: bold;\n        text-transform: none;\n    }\n    \n    .language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--subheader-text {\n        color: #64676e;\n        font-size: 14px;\n        text-transform: none;\n        white-space: normal;\n        text-align: center;\n        padding: 0 25px;\n    }\n    \n    .language-grid .styled-grid-item--action-button {\n        width: 16px;\n        min-width: 16px;\n        height: 16px;\n        border: none;\n        background-color: transparent;\n        cursor: default;\n        background-repeat: no-repeat;\n        background-position: center;\n        background-size: 14px 14px;\n        visibility: hidden;\n    }\n    \n    .language-grid .styled-grid-item--plus-button {\n        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTE2NjcgNi40MTY2N0g3LjU4MzMzVjQuMDgzMzNDNy41ODMzMyAzLjkyODYyIDcuNTIxODcgMy43ODAyNSA3LjQxMjQ4IDMuNjcwODVDNy4zMDMwOCAzLjU2MTQ2IDcuMTU0NzEgMy41IDcgMy41QzYuODQ1MjkgMy41IDYuNjk2OTIgMy41NjE0NiA2LjU4NzUyIDMuNjcwODVDNi40NzgxMiAzLjc4MDI1IDYuNDE2NjcgMy45Mjg2MiA2LjQxNjY3IDQuMDgzMzNWNi40MTY2N0g0LjA4MzMzQzMuOTI4NjIgNi40MTY2NyAzLjc4MDI1IDYuNDc4MTIgMy42NzA4NSA2LjU4NzUyQzMuNTYxNDYgNi42OTY5MiAzLjUgNi44NDUyOSAzLjUgN0MzLjUgNy4xNTQ3MSAzLjU2MTQ2IDcuMzAzMDggMy42NzA4NSA3LjQxMjQ4QzMuNzgwMjUgNy41MjE4NyAzLjkyODYyIDcuNTgzMzMgNC4wODMzMyA3LjU4MzMzSDYuNDE2NjdWOS45MTY2N0M2LjQxNjY3IDEwLjA3MTQgNi40NzgxMiAxMC4yMTk3IDYuNTg3NTIgMTAuMzI5MUM2LjY5NjkyIDEwLjQzODUgNi44NDUyOSAxMC41IDcgMTAuNUM3LjE1NDcxIDEwLjUgNy4zMDMwOCAxMC40Mzg1IDcuNDEyNDggMTAuMzI5MUM3LjUyMTg3IDEwLjIxOTcgNy41ODMzMyAxMC4wNzE0IDcuNTgzMzMgOS45MTY2N1Y3LjU4MzMzSDkuOTE2NjdDMTAuMDcxNCA3LjU4MzMzIDEwLjIxOTcgNy41MjE4NyAxMC4zMjkxIDcuNDEyNDhDMTAuNDM4NSA3LjMwMzA4IDEwLjUgNy4xNTQ3MSAxMC41IDdDMTAuNSA2Ljg0NTI5IDEwLjQzODUgNi42OTY5MiAxMC4zMjkxIDYuNTg3NTJDMTAuMjE5NyA2LjQ3ODEyIDEwLjA3MTQgNi40MTY2NyA5LjkxNjY3IDYuNDE2NjdaIiBmaWxsPSIjOTg5ODk4Ii8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF80MDA1XzQ4NzApIj4KPHBhdGggZD0iTTcgMEM1LjYxNTUzIDAgNC4yNjIxNiAwLjQxMDU0MyAzLjExMTAxIDEuMTc5NzFDMS45NTk4NyAxLjk0ODg4IDEuMDYyNjYgMy4wNDIxMyAwLjUzMjg0NiA0LjMyMTIyQzAuMDAzMDMzIDUuNjAwMyAtMC4xMzU1OSA3LjAwNzc3IDAuMTM0NTA2IDguMzY1NjNDMC40MDQ2MDMgOS43MjM1IDEuMDcxMjkgMTAuOTcwOCAyLjA1MDI2IDExLjk0OTdDMy4wMjkyMiAxMi45Mjg3IDQuMjc2NSAxMy41OTU0IDUuNjM0MzcgMTMuODY1NUM2Ljk5MjI0IDE0LjEzNTYgOC4zOTk3IDEzLjk5NyA5LjY3ODc5IDEzLjQ2NzJDMTAuOTU3OSAxMi45MzczIDEyLjA1MTEgMTIuMDQwMSAxMi44MjAzIDEwLjg4OUMxMy41ODk1IDkuNzM3ODUgMTQgOC4zODQ0NyAxNCA3QzEzLjk5OCA1LjE0NDEgMTMuMjU5OSAzLjM2NDc5IDExLjk0NzUgMi4wNTI0N0MxMC42MzUyIDAuNzQwMTUgOC44NTU5IDAuMDAyMDA3MyA3IDBWMFpNNyAxMi44MzMzQzUuODQ2MjggMTIuODMzMyA0LjcxODQ2IDEyLjQ5MTIgMy43NTkxOCAxMS44NTAyQzIuNzk5ODkgMTEuMjA5MyAyLjA1MjIyIDEwLjI5ODIgMS42MTA3MSA5LjIzMjMyQzEuMTY5MTkgOC4xNjY0MiAxLjA1MzY4IDYuOTkzNTMgMS4yNzg3NiA1Ljg2MTk3QzEuNTAzODQgNC43MzA0MiAyLjA1OTQxIDMuNjkxMDIgMi44NzUyMSAyLjg3NTIxQzMuNjkxMDIgMi4wNTk0IDQuNzMwNDIgMS41MDM4MyA1Ljg2MTk4IDEuMjc4NzVDNi45OTM1MyAxLjA1MzY3IDguMTY2NDIgMS4xNjkxOSA5LjIzMjMyIDEuNjEwN0MxMC4yOTgyIDIuMDUyMjEgMTEuMjA5MyAyLjc5OTg5IDExLjg1MDIgMy43NTkxN0MxMi40OTEyIDQuNzE4NDYgMTIuODMzMyA1Ljg0NjI4IDEyLjgzMzMgN0MxMi44MzE2IDguNTQ2NTggMTIuMjE2NSAxMC4wMjkzIDExLjEyMjkgMTEuMTIyOUMxMC4wMjkzIDEyLjIxNjUgOC41NDY1OCAxMi44MzE2IDcgMTIuODMzM1YxMi44MzMzWiIgZmlsbD0iIzk4OTg5OCIvPgo8cGF0aCBkPSJNNy41ODM2NyAxMC40OTk0QzcuNTgzNjcgMTAuMTc3MiA3LjMyMjUgOS45MTYwMiA3LjAwMDMzIDkuOTE2MDJDNi42NzgxNiA5LjkxNjAyIDYuNDE2OTkgMTAuMTc3MiA2LjQxNjk5IDEwLjQ5OTRDNi40MTY5OSAxMC44MjE1IDYuNjc4MTYgMTEuMDgyNyA3LjAwMDMzIDExLjA4MjdDNy4zMjI1IDExLjA4MjcgNy41ODM2NyAxMC44MjE1IDcuNTgzNjcgMTAuNDk5NFoiIGZpbGw9IiM5ODk4OTgiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF80MDA1XzQ4NzAiPgo8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==);\n    }\n\n    .language-grid .styled-grid-item:hover .styled-grid-item--action-button {\n        visibility: visible;\n    }\n    \n    .language-grid .styled-grid-item--action-button:hover {\n        cursor: pointer;\n    }\n    \n    .language-grid .styled-grid-item--plus-button:hover {\n        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTE2NjcgNi40MTY2N0g3LjU4MzMzVjQuMDgzMzNDNy41ODMzMyAzLjkyODYyIDcuNTIxODcgMy43ODAyNSA3LjQxMjQ4IDMuNjcwODVDNy4zMDMwOCAzLjU2MTQ2IDcuMTU0NzEgMy41IDcgMy41QzYuODQ1MjkgMy41IDYuNjk2OTIgMy41NjE0NiA2LjU4NzUyIDMuNjcwODVDNi40NzgxMiAzLjc4MDI1IDYuNDE2NjcgMy45Mjg2MiA2LjQxNjY3IDQuMDgzMzNWNi40MTY2N0g0LjA4MzMzQzMuOTI4NjIgNi40MTY2NyAzLjc4MDI1IDYuNDc4MTIgMy42NzA4NSA2LjU4NzUyQzMuNTYxNDYgNi42OTY5MiAzLjUgNi44NDUyOSAzLjUgN0MzLjUgNy4xNTQ3MSAzLjU2MTQ2IDcuMzAzMDggMy42NzA4NSA3LjQxMjQ4QzMuNzgwMjUgNy41MjE4NyAzLjkyODYyIDcuNTgzMzMgNC4wODMzMyA3LjU4MzMzSDYuNDE2NjdWOS45MTY2N0M2LjQxNjY3IDEwLjA3MTQgNi40NzgxMiAxMC4yMTk3IDYuNTg3NTIgMTAuMzI5MUM2LjY5NjkyIDEwLjQzODUgNi44NDUyOSAxMC41IDcgMTAuNUM3LjE1NDcxIDEwLjUgNy4zMDMwOCAxMC40Mzg1IDcuNDEyNDggMTAuMzI5MUM3LjUyMTg3IDEwLjIxOTcgNy41ODMzMyAxMC4wNzE0IDcuNTgzMzMgOS45MTY2N1Y3LjU4MzMzSDkuOTE2NjdDMTAuMDcxNCA3LjU4MzMzIDEwLjIxOTcgNy41MjE4NyAxMC4zMjkxIDcuNDEyNDhDMTAuNDM4NSA3LjMwMzA4IDEwLjUgNy4xNTQ3MSAxMC41IDdDMTAuNSA2Ljg0NTI5IDEwLjQzODUgNi42OTY5MiAxMC4zMjkxIDYuNTg3NTJDMTAuMjE5NyA2LjQ3ODEyIDEwLjA3MTQgNi40MTY2NyA5LjkxNjY3IDYuNDE2NjdaIiBmaWxsPSIjMTc4ZmNmIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF80MDA1XzQ4NzApIj4KPHBhdGggZD0iTTcgMEM1LjYxNTUzIDAgNC4yNjIxNiAwLjQxMDU0MyAzLjExMTAxIDEuMTc5NzFDMS45NTk4NyAxLjk0ODg4IDEuMDYyNjYgMy4wNDIxMyAwLjUzMjg0NiA0LjMyMTIyQzAuMDAzMDMzIDUuNjAwMyAtMC4xMzU1OSA3LjAwNzc3IDAuMTM0NTA2IDguMzY1NjNDMC40MDQ2MDMgOS43MjM1IDEuMDcxMjkgMTAuOTcwOCAyLjA1MDI2IDExLjk0OTdDMy4wMjkyMiAxMi45Mjg3IDQuMjc2NSAxMy41OTU0IDUuNjM0MzcgMTMuODY1NUM2Ljk5MjI0IDE0LjEzNTYgOC4zOTk3IDEzLjk5NyA5LjY3ODc5IDEzLjQ2NzJDMTAuOTU3OSAxMi45MzczIDEyLjA1MTEgMTIuMDQwMSAxMi44MjAzIDEwLjg4OUMxMy41ODk1IDkuNzM3ODUgMTQgOC4zODQ0NyAxNCA3QzEzLjk5OCA1LjE0NDEgMTMuMjU5OSAzLjM2NDc5IDExLjk0NzUgMi4wNTI0N0MxMC42MzUyIDAuNzQwMTUgOC44NTU5IDAuMDAyMDA3MyA3IDBWMFpNNyAxMi44MzMzQzUuODQ2MjggMTIuODMzMyA0LjcxODQ2IDEyLjQ5MTIgMy43NTkxOCAxMS44NTAyQzIuNzk5ODkgMTEuMjA5MyAyLjA1MjIyIDEwLjI5ODIgMS42MTA3MSA5LjIzMjMyQzEuMTY5MTkgOC4xNjY0MiAxLjA1MzY4IDYuOTkzNTMgMS4yNzg3NiA1Ljg2MTk3QzEuNTAzODQgNC43MzA0MiAyLjA1OTQxIDMuNjkxMDIgMi44NzUyMSAyLjg3NTIxQzMuNjkxMDIgMi4wNTk0IDQuNzMwNDIgMS41MDM4MyA1Ljg2MTk4IDEuMjc4NzVDNi45OTM1MyAxLjA1MzY3IDguMTY2NDIgMS4xNjkxOSA5LjIzMjMyIDEuNjEwN0MxMC4yOTgyIDIuMDUyMjEgMTEuMjA5MyAyLjc5OTg5IDExLjg1MDIgMy43NTkxN0MxMi40OTEyIDQuNzE4NDYgMTIuODMzMyA1Ljg0NjI4IDEyLjgzMzMgN0MxMi44MzE2IDguNTQ2NTggMTIuMjE2NSAxMC4wMjkzIDExLjEyMjkgMTEuMTIyOUMxMC4wMjkzIDEyLjIxNjUgOC41NDY1OCAxMi44MzE2IDcgMTIuODMzM1YxMi44MzMzWiIgZmlsbD0iIzE3OGZjZiIvPgo8cGF0aCBkPSJNNy41ODM2NyAxMC40OTk0QzcuNTgzNjcgMTAuMTc3MiA3LjMyMjUgOS45MTYwMiA3LjAwMDMzIDkuOTE2MDJDNi42NzgxNiA5LjkxNjAyIDYuNDE2OTkgMTAuMTc3MiA2LjQxNjk5IDEwLjQ5OTRDNi40MTY5OSAxMC44MjE1IDYuNjc4MTYgMTEuMDgyNyA3LjAwMDMzIDExLjA4MjdDNy4zMjI1IDExLjA4MjcgNy41ODM2NyAxMC44MjE1IDcuNTgzNjcgMTAuNDk5NFoiIGZpbGw9IiMxNzhmY2YiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF80MDA1XzQ4NzAiPgo8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==)\n    }\n    \n    .language-grid .styled-grid-item--minus-button:hover {\n        border-color: #198FCF;\n        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iIzE5OEZDRiIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHZpZXdCb3g9IjAgMCA1Mi4xNjEgNTIuMTYxIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik01Mi4xNjEsMjYuMDgxYzAsMy4yNDYtMi42Myw1Ljg3NS01Ljg3NSw1Ljg3NUg1Ljg3NUMyLjYzLDMxLjk1NiwwLDI5LjMyNywwLDI2LjA4MWwwLDBjMC0zLjI0NSwyLjYzLTUuODc1LDUuODc1LTUuODc1DQoJCWg0MC40MTFDNDkuNTMxLDIwLjIwNiw1Mi4xNjEsMjIuODM1LDUyLjE2MSwyNi4wODFMNTIuMTYxLDI2LjA4MXoiLz4NCjwvZz4NCjwvc3ZnPg0K)\n    }\n    \n    .language-grid .styled-grid-item--minus-button {\n        border: 1px solid #B7B7B7;\n        border-radius: 50%;\n        background-size: 8px;\n        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iI0I3QjdCNyIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHZpZXdCb3g9IjAgMCA1Mi4xNjEgNTIuMTYxIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik01Mi4xNjEsMjYuMDgxYzAsMy4yNDYtMi42Myw1Ljg3NS01Ljg3NSw1Ljg3NUg1Ljg3NUMyLjYzLDMxLjk1NiwwLDI5LjMyNywwLDI2LjA4MWwwLDBjMC0zLjI0NSwyLjYzLTUuODc1LDUuODc1LTUuODc1DQoJCWg0MC40MTFDNDkuNTMxLDIwLjIwNiw1Mi4xNjEsMjIuODM1LDUyLjE2MSwyNi4wODFMNTIuMTYxLDI2LjA4MXoiLz4NCjwvZz4NCjwvc3ZnPg0K)\n    }\n    \n    .language-grid .language-search--row {\n        width: 100%;\n        padding: 10px 15px;\n        background-color: #fafafa;\n        border-top: 1px solid #d7d9df;\n        border-bottom-right-radius: 10px;\n        border-bottom-left-radius: 10px;\n        box-sizing: border-box;\n    }\n    \n    .language-grid .language-search--input {\n        width: 100%;\n        padding: 5px 15px;\n        font-size: 15px;\n        outline-color: #d7d9df;\n        border: 1px solid #d7d9df;\n        box-sizing: border-box;\n    }\n    \n    @media screen and (min-width: 768px) {\n      /*.synonyms-wrapper #synonyms-languages .styled-grid {\n        width: 520px;\n        grid-template-columns: repeat(4, 1fr);\n      }*/\n      /*.synonyms-wrapper #synonyms-languages .styled-grid-item:last-child {\n        display: flex;\n      }*/\n      \n      #synonyms-languages.language-grid {\n          width: 600px;\n      }\n      #synonyms-languages.language-grid .styled-grid {\n          grid-template-columns: repeat(4, 1fr);\n          min-height: 435px;\n          height: auto;\n      }\n      .language-grid.grid-is-filtered.grid-is-empty .grid-is-empty--layout {\n          height: 435px;\n      }\n    }\n  \n    @keyframes rotation {\n      0% {\n          transform: rotate(0deg);\n      }\n      100% {\n          transform: rotate(360deg);\n      }\n    } \n    `,
                t = document.createElement("style");
            return t.appendChild(document.createTextNode(e)), t
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(0);
    t.Tooltip = class {
        constructor(e) {
            this.core = e, this.layer = document.createElement("scribens-dialog"), document.documentElement.appendChild(this.layer)
        }
        find(e) {
            return this.layer.querySelector(`.tooltip[data-name="${e}"]`)
        }
        show(e, t) {
            const n = {
                ...t
            };
            if (n.name && n.unique && this.computeArrangement(n.name), n.name && n.hideOnDuplicate) {
                const e = this.find(n.name);
                if (e && e.isConnected) return void this.layer.removeChild(e)
            }
            const i = this.core.ui.buttonContainer.getBoundingClientRect(),
                s = document.createElement("div");
            s.className = "tooltip", e instanceof HTMLElement ? s.appendChild(e) : s.innerHTML = e, n.name && (s.dataset.name = n.name), n.position && (s.dataset.position = n.position), this.layer.appendChild(s);
            const r = s.getBoundingClientRect(),
                o = window.getComputedStyle(s, ":after");
            let a = i.top + window.scrollY - i.height - (r.height - (parseInt(o.borderTopWidth, 10) || 0)),
                l = i.left - r.width + window.scrollX + i.width / 2 + (parseInt(o.borderLeftWidth, 10) || 0) + (parseInt(o.right, 10) || 0);
            const d = a > 0 && "bottom" !== n.position;
            s.classList.toggle("arrow-bottom", d), s.classList.toggle("arrow-top", !d), d || (a = window.scrollY + i.bottom + (parseInt(o.borderTopWidth, 10) || 0)), s.classList.toggle("arrow-left", l < 0), l < 0 && (l = window.screenX + i.left + parseInt(o.borderLeftWidth, 10) / 2 - i.width / 2), s.style.setProperty("top", a + "px", "important"), s.style.setProperty("left", l + "px", "important"), s.style.setProperty("z-index", this.core.ui.buttonContainer.style.zIndex, "important"), s.classList.add("show")
        }
        computeArrangement(e) {
            const t = this.core.ui.buttonContainer.getBoundingClientRect(),
                n = this.find(e),
                i = this.core.ui.shadowRoot.querySelector(".main-button");
            if (!n || !i) return;
            const s = i.getBoundingClientRect(),
                r = n.getBoundingClientRect(),
                o = window.getComputedStyle(n, ":after");
            let a = s.top + window.scrollY - s.height - (r.height - (parseInt(o.borderTopWidth, 10) || 0));
            const l = s.left - r.width + window.scrollX + t.width / 2 + (parseInt(o.borderLeftWidth, 10) || 0) + (parseInt(o.right, 10) || 0),
                d = n.dataset.position || "auto",
                g = a > 0 && "bottom" !== d;
            n.classList.toggle("arrow-bottom", g), n.classList.toggle("arrow-top", !g), g || (a = window.scrollY + t.bottom + (parseInt(o.borderTopWidth, 10) || 0)), n.style.setProperty("top", a + "px", "important"), n.style.setProperty("left", l + "px", "important"), n.style.setProperty("z-index", this.core.ui.buttonContainer.style.zIndex, "important")
        }
        hide(e) {
            const t = this.find(e);
            t && t.isConnected && this.layer.removeChild(t)
        }
        limitExceeded() {
            "API_TRIAL" === i.globalUser.info[9] ? this.apiTrialExpired() : "API" === i.globalUser.info[9] && this.apiQuotaReached()
        }
        limitNbChar() {
            const e = document.createElement("div");
            e.attachShadow({
                mode: "open"
            }), e.shadowRoot.innerHTML = `\n      <style>\n        p {\n          text-align: center;\n          font-weight: bold;\n          font-size: 15px;\n          line-height: 30px;\n          padding: 15px;\n          margin: 0;\n        }\n      </style>\n      <p>\n        ${window.chrome.i18n.getMessage("tooltip_limit_nb_char")}\n      </p>\n    `, this.show(e, {
                name: "limit-nb-char"
            })
        }
        invalidIdentification() {
            this.show(`<p style="text-align: center;font-weight: bold;font-size: 16px;line-height: 1.5;">\n      ${window.chrome.i18n.getMessage("invalid_identification")}\n    </p>`, {
                name: "invalid-identification",
                hideOnDuplicate: !0
            })
        }
        apiTrialExpired() {
            this.show(`<p style="text-align: center;font-weight: bold;line-height: 1.5;">\n      ${window.chrome.i18n.getMessage("tooltip_limit_exceeded_01")}\n    </p>\n    <p style="text-align: center;font-size: 15px;color: #606160;line-height: 1.5;">\n      ${window.chrome.i18n.getMessage("html_tooltip_limit_exceeded_07")}\n    </p>`, {
                name: "api-trial-expired",
                hideOnDuplicate: !0
            })
        }
        apiQuotaReached() {
            this.show(`<p style="text-align: center;font-weight: bold;line-height: 1.5;">\n      ${window.chrome.i18n.getMessage("tooltip_limit_exceeded_08")}\n    </p>\n    <p style="text-align: center;font-size: 15px;color: #606160;line-height: 1.5;">\n      ${window.chrome.i18n.getMessage("html_tooltip_limit_exceeded_07")}\n    </p>`, {
                name: "api-quota-reached",
                hideOnDuplicate: !0
            })
        }
        sessionLimitExceeded() {
            this.core.session.setSessionLimitPopupStatus(), this.show(`<p style="text-align: center;line-height: 1.5;">\n      ${window.chrome.i18n.getMessage("tooltip_session_limit_exceeded")}\n    </p>`, {
                name: "session-limit-exceeded",
                hideOnDuplicate: !0
            })
        }
        stopPropagation(e) {
            Array.isArray(e) ? e.forEach(e => this.stopPropagation(e)) : e.addEventListener("keydown", e => {
                e.stopPropagation()
            }, !0)
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(4),
        s = n(0),
        r = n(1);
    t.UI = class {
        constructor(e) {
            this.lastTimer = 0, this.core = e, this.attach()
        }
        attach() {
            this.layer = document.createElement("scribens-ui"), this.layer.attachShadow({
                mode: "open"
            }), this.shadowRoot = this.layer.shadowRoot, this.shadowRoot.appendChild(this.uiCss()), document.documentElement.appendChild(this.layer), this.addButton(), this.addPopupSettings(), this.addPopupSolution(), setTimeout(() => {
                this.buttonContainer.classList.add("margin-transition")
            }, 2e3), window.requestAnimationFrame(this.updatePosition.bind(this))
        }
        detach() {
            this.layer && this.layer.isConnected && this.layer.parentNode.removeChild(this.layer)
        }
        hideEmptyOptions() {
            this.popupOptions().options.map(e => e.value).forEach(e => {
                const t = new RegExp(e),
                    n = this.core.storageMapPos.array.findIndex(e => t.test(e.TypeName));
                this.settingsWrapper.querySelector(`.ext-option input[value="${e}"]`).closest("label").style.display = n >= 0 ? "flex" : "none"
            }), this.settingsWrapper.querySelector(".first-row").classList.remove("hide-clear-button")
        }
        getStyleSolutionWrapper(e) {
            const t = this.solutionWrapper,
                n = this.core.iframe ? this.core.iframe.getBoundingClientRect() : {
                    top: 0,
                    left: 0
                },
                i = t.getBoundingClientRect(),
                s = e.getBoundingClientRect();
            let o = 8 + window.pageYOffset + s.bottom,
                a = s.left;
            const l = window.scrollY + s.top - i.height - 8;
            if (o + i.height > window.innerHeight + window.scrollY && l > 0 ? (t.classList.add("popup-reverse"), o = l) : t.classList.remove("popup-reverse"), t.classList.contains("detailed-explanation") && window.screen.width < 768) return r.logger("detailed-explanation mobile fixed position"), {
                top: n.top + o + "px",
                left: "10px",
                right: "10px"
            };
            let d = "auto";
            const g = s.right - i.width;
            return a + i.width > window.innerWidth + window.scrollX && g > 0 ? a = g : a + i.width > window.innerWidth && (a = null, d = "10px"), r.logger("getStyleSolutionWrapper", {
                top: o,
                left: a,
                right: d
            }), {
                top: n.top + o + "px",
                left: a ? n.left + a + "px" : "auto",
                right: d
            }
        }
        updatePosition(e) {
            if (!this.lastTimer || e - this.lastTimer >= 300) {
                const t = this.getStyleButton();
                t.top === this.buttonContainer.style.top && t.left === this.buttonContainer.style.left && t.marginLeft === this.buttonContainer.style.marginLeft && t.transform === this.buttonContainer.style.transform || (Object.assign(this.buttonContainer.style, this.getStyleButton()), [...this.core.tooltip.layer.querySelectorAll(".tooltip")].forEach(e => {
                    this.core.tooltip.computeArrangement(e.dataset.name)
                })), this.core.element.isConnected || this.core.detach(), this.lastTimer = e
            }
            this.layer && this.layer.isConnected ? window.requestAnimationFrame(this.updatePosition.bind(this)) : this.core.detach()
        }
        addButton() {
            this.buttonContainer = document.createElement("div"), this.buttonContainer.className = "button-container";
            try {
                Object.assign(this.buttonContainer.style, this.getStyleButton())
            } catch {}
            this.button = document.createElement("button"), this.button.className = "main-button", this.button.addEventListener("click", i.onClickButton), this.buttonContainer.appendChild(this.button), this.shadowRoot.appendChild(this.buttonContainer), setTimeout(() => {
                this.buttonContainer.classList.add("animated")
            }, 100)
        }
        addPopupSettings() {
            this.settingsWrapper = document.createElement("div"), this.settingsWrapper.classList.add("settings-wrapper");
            const e = this.popupOptions(),
                t = document.createElement("div");
            t.className = "first-row hide-clear-button";
            const n = document.createElement("div");
            n.className = "langs-block-in-row";
            const i = document.createElement("ul");
            i.classList.add("ext-langs");
            e.languages.sort((e, t) => t.value === this.core.lang ? 1 : -1).forEach(e => {
                const t = document.createElement("li");
                t.innerHTML = `\n      <a href="#" data-value="${e.value}">\n        ${e.title}\n      </a>\n      `, i.appendChild(t)
            }), n.appendChild(i), t.appendChild(n);
            const s = document.createElement("div");
            s.className = "separator-in-row", t.appendChild(s);
            const r = document.createElement("div");
            r.className = "button-block-in-row";
            const o = document.createElement("button");
            o.className = "clear-button", r.appendChild(o), t.appendChild(r), this.settingsWrapper.appendChild(t);
            const a = document.createElement("form");
            a.classList.add("ext-option"), e.options.forEach(e => {
                const t = document.createElement("label"),
                    n = e.default ? "checked" : "";
                t.innerHTML = `\n      <input type="radio" name="ScribensOption" value="${e.value}" ${n}>\n      <div>\n        <div>${e.title}</div>\n      </div>\n      `, a.appendChild(t)
            }), this.settingsWrapper.appendChild(a), this.settingsWrapper.addEventListener("click", e => {
                const t = e.target;
                if (t) {
                    const n = t.closest(".settings-wrapper").querySelector(".ext-langs");
                    if ("A" === t.tagName) {
                        e.preventDefault();
                        const i = Array.from(n.children),
                            s = t.parentNode;
                        if (i.indexOf(s) >= 1) {
                            s.parentNode.insertBefore(s, s.previousSibling), this.core.lang = t.dataset.value, this.core.mode = "^Cor$";
                            this.settingsWrapper.querySelector(".ext-option").reset(), n.dataset.expand = !1, n.style.pointerEvents = "none", setTimeout(() => {
                                n.removeAttribute("style"), this.core.editorState.setState(), this.core.editorState.text.length && (this.core.storageMapPos.removeAll(), this.core.network.request([0, this.core.editorState.text.length]))
                            }, 300)
                        } else n.dataset.expand = !("true" === n.dataset.expand)
                    } else if ("LABEL" === t.tagName) n.dataset.expand = "false", this.core.mode = t.querySelector("input").value, this.core.storageMapPos.redrawAll(!0);
                    else if ("BUTTON" === t.tagName && t.classList.contains("clear-button")) {
                        this.core.ui.solutionWrapper.innerHTML = "", this.core.autoCheck = !1;
                        [...this.settingsWrapper.querySelector(".ext-option").querySelectorAll("label")].forEach(e => {
                            e.style.display = "none"
                        }), this.settingsWrapper.querySelector(".first-row").classList.add("hide-clear-button"), this.core.storageMapPos.removeAll()
                    } else n.dataset.expand = "false"
                }
            }), this.shadowRoot.appendChild(this.settingsWrapper)
        }
        addPopupSolution() {
            this.solutionWrapper = document.createElement("div"), this.solutionWrapper.className = "popup", this.solutionWrapper.addEventListener("mousedown", i.onClickPopup, {
                capture: !0,
                passive: !0
            }), this.shadowRoot.appendChild(this.solutionWrapper)
        }
        getStyleButton() {
            let e = window.scrollY,
                t = window.scrollX,
                n = "translate(0)";
            let i = 0;
            if ("function" == typeof this.core.util.buttonPosition) {
                const n = this.core.util.buttonPosition();
                e = n.top, t = n.left
            } else if (this.core.iframe) {
                const n = this.core.iframe.getBoundingClientRect();
                e += n.top + 5, t += n.right - 27, this.core.element.clientHeight > this.core.iframe.clientHeight && (i = -22)
            } else {
                const r = this.core.element.getBoundingClientRect(),
                    o = this.core.parentElement.getBoundingClientRect(),
                    a = this.core.scrollElement.getBoundingClientRect(),
                    l = o.top < r.top ? o.top : 0;
                if (e += Math.max(r.top, l, a.top), t += r.right - 22, "object" == typeof s.globalUser && "object" == typeof s.globalUser.options && "ButtonPosition" in s.globalUser.options && "bottom" === s.globalUser.options.ButtonPosition) {
                    const t = [r.bottom - e + window.scrollY, o.bottom - e + window.scrollY, a.bottom - e + window.scrollY].filter(e => e > 0);
                    n = `translate(-4px, ${Math.min(...t)-29}px)`
                }
                this.core.element.scrollHeight > this.core.element.clientHeight && (i = -22), e += (parseInt(this.core.elementStyle.borderTopWidth, 10) || 0) + 1, t -= (parseInt(this.core.elementStyle.borderRightWidth, 10) || 0) + 1
            }
            const r = document.elementFromPoint(t - 30, e);
            return r ? r != this.lastElementFromPoint && (this.lastZIndex = this.findMaxZIndex(this.core.element), r.contains(this.core.element) || this.core.element.contains(r) || (this.lastZIndex = 0), this.lastElementFromPoint = r) : this.lastZIndex = this.findMaxZIndex(this.core.element), {
                transform: n,
                position: "absolute",
                top: Math.round(100 * e) / 100 + "px",
                left: Math.round(100 * t) / 100 + "px",
                zIndex: this.lastZIndex,
                visibility: 0 === this.lastZIndex ? "hidden" : null,
                pointerEvents: "all",
                marginLeft: i + "px"
            }
        }
        findMaxZIndex(e) {
            const t = [1];
            for (; e && e !== document.body;) {
                const n = window.getComputedStyle(e).zIndex,
                    i = parseFloat(n) || 0;
                t.push(i), e = e.parentElement
            }
            return Math.max(...t) + 1
        }
        popupOptions() {
            return {
                languages: [{
                    title: "FR",
                    value: "fr"
                }, {
                    title: "EN",
                    value: "en"
                }],
                options: [{
                    default: !0,
                    title: "Correction",
                    value: "^Cor$"
                }, {
                    title: "Répétitions",
                    value: "^WordRepetition$"
                }, {
                    title: "Redondances",
                    value: "^Redundancy$"
                }, {
                    title: "Phrases longues",
                    value: "^pl$"
                }, {
                    title: "Vocabulary enhancement",
                    value: "^Vocabulary_enhancement$"
                }, {
                    title: "Subjectivité positive",
                    value: "^Subjectivity_Positive$"
                }, {
                    title: "Subjectivité négative",
                    value: "^Subjectivity_Pejorative$"
                }, {
                    title: "Reformulations",
                    value: "^Rephrase_inelegantforms$"
                }, {
                    title: "Réductions de mots",
                    value: "^Rephrase_wordreducing$"
                }, {
                    title: "Synonymes",
                    value: "^Synonyms$"
                }]
            }
        }
        uiCss() {
            const e = document.createElement("style");
            return e.appendChild(document.createTextNode('\n    .button-container {\n      display: none;\n      box-sizing: border-box;\n    }\n    .settings-wrapper {\n      display: none;\n    }\n\n    .popup {\n      position: absolute;\n      width: 310px;\n      z-index: 2147483647;\n      border: 1px solid #d6d9df;\n      border-radius: 5px;\n      font-family: "Segoe-UI", "Helvetica Neue", Helvetica, Arial, sans-serif;\n      line-height: 1.5;\n    }\n    .popup:empty {\n      border: none;\n    }\n    .popup.popup-reverse > div {\n      display: flex;\n      flex-direction: column-reverse;\n    }\n    .popup.popup-reverse > div .suggestion {\n      border-bottom: none;\n    }\n    .popup.popup-reverse > div .suggestion:first-child {\n      border-top-left-radius: 0px;\n      border-top-right-radius: 0px;\n      border-bottom-left-radius: 0px;\n      border-bottom-right-radius: 0px;\n    }\n    .popup.popup-reverse > div .suggestion:last-child {\n      border-top-left-radius: 0px;\n      border-top-right-radius: 0px;\n      border-bottom-left-radius: 5px;\n      border-bottom-right-radius: 5px;\n    }\n    .popup.popup-reverse > div .description {\n      border-top-left-radius: 5px;\n      border-top-right-radius: 5px;\n      border-bottom-right-radius: 0px;\n      border-bottom-left-radius: 0px;\n      box-shadow: none;\n      border-bottom: 1px solid #d6d9df;\n    }\n    .popup:not([data-error]) .suggestion-wrapper {\n      max-height: 304px;\n      overflow-y: auto;\n    }\n    .popup .suggestion-wrapper .sol-wrapper {\n      background-color: #f6f6f6;\n      display: flex;\n      flex-direction: column;\n      border-top-left-radius: 7px;\n      border-top-right-radius: 7px;\n     }\n    .popup .suggestion-wrapper .rephrase-list--wrapper {\n      display: flex;\n      flex-direction: column;\n      row-gap: 10px;\n      padding: 10px;\n    }\n    .popup .suggestion-wrapper .rephrase-list--item {\n      background-color: #fff;\n      border: 1px solid transparent;\n      padding: 5px 10px;\n      border-radius: 10px;\n      box-shadow: 0 0 5px rgba(0,0,0,0.1);\n      cursor: pointer;\n      color: #64676e;\n      font-size: 16px;\n      transition: color 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;\n    }\n    .popup .suggestion-wrapper .rephrase-list--item:hover {\n      color: #118ece;\n      border-color: #118ece;\n    }\n    .popup .suggestion-wrapper .rephrase-list--load-more-wrapper {\n      padding: 0 10px 10px 10px;\n    }\n    .popup .suggestion-wrapper .rephrase-list--load-more {\n      border: none;\n      outline: none;\n      background-color: transparent;\n      color: #118ece;\n      font-weight: bold;\n      font-size: 16px;\n      display: flex;\n      align-items: center;\n      column-gap: 7px;\n      cursor: pointer;\n    }\n    .popup .suggestion-wrapper .rephrase-list--load-more:not(.loading) > span:after {\n      content: \'+\';\n    }\n    .popup .suggestion-wrapper .rephrase-list--load-more.loading {\n      cursor: wait;\n    }\n    .popup .suggestion-wrapper .rephrase-list--load-more.loading > span {\n      display: inline-block;\n    }\n    .popup .suggestion-wrapper .suggestion {\n      display: flex;\n      padding: 10px 15px;\n      font-size: 15px;\n      background-color: #fff;\n      transition: all 0.3s ease;\n      border-bottom: 1px solid #d6d9df;\n      color: #3a8b47;\n      cursor: pointer;\n    }\n    .popup .suggestion-wrapper .suggestion[data-type="0"] .s-rg {\n      color: #d55a43;\n    }\n    .popup .suggestion-wrapper .suggestion[data-type="1"] .s-ve {\n      color: #3a8b47;\n    }\n    .popup .suggestion-wrapper .suggestion[data-type="2"] .s-or {\n      color: #ff9d00;\n    }\n    .popup .suggestion-wrapper .suggestion[data-type="3"] .s-bl {\n      color: #478aa8;\n    }\n    .popup .suggestion-wrapper .suggestion[data-type-name] {\n      color: #64676e;\n    }\n    /*.popup .suggestion-wrapper .suggestion[data-type-name="Cor"] {\n      color: #d55a43;\n    }\n    .popup .suggestion-wrapper .suggestion[data-est-suggestion="true"] {\n      color: #ff9d00;\n    }*/\n    .popup .suggestion-wrapper .suggestion:hover .s-rg,\n    .popup .suggestion-wrapper .suggestion:hover .s-ve,\n    .popup .suggestion-wrapper .suggestion:hover .s-or,\n    .popup .suggestion-wrapper .suggestion:hover .s-bl {\n      color: #fff;\n    }\n    .popup .suggestion-wrapper .suggestion:hover {\n      background-color: #287bbf;\n      color: #fff;\n    }\n    .popup .suggestion-wrapper .suggestion:first-child {\n      border-top-left-radius: 5px;\n      border-top-right-radius: 5px;\n    }\n    .popup .suggestion-wrapper .suggestion:last-child {\n      border-bottom: none;\n    }\n    .popup .suggestion-wrapper .suggestion .suggestion-text {\n      margin-right: 5px;\n      pointer-events: none;\n    }\n    .popup .suggestion-wrapper .suggestion .suggestion-info {\n      pointer-events: none;\n    }\n    .popup .description:not([data-lang="fr"]) {\n      display: flex;\n      justify-content: space-between;\n      column-gap: 15px;\n    }\n    .popup > div[data-count="0"] .description {\n      border-top: none;\n      border-top-right-radius: 7px;\n      border-top-left-radius: 7px;\n    }\n    .popup .details-button {\n      width: 16px;\n      min-width: 16px;\n      height: 16px;\n      border: none;\n      background-color: transparent;\n      cursor: default;\n      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTE2NjcgNi40MTY2N0g3LjU4MzMzVjQuMDgzMzNDNy41ODMzMyAzLjkyODYyIDcuNTIxODcgMy43ODAyNSA3LjQxMjQ4IDMuNjcwODVDNy4zMDMwOCAzLjU2MTQ2IDcuMTU0NzEgMy41IDcgMy41QzYuODQ1MjkgMy41IDYuNjk2OTIgMy41NjE0NiA2LjU4NzUyIDMuNjcwODVDNi40NzgxMiAzLjc4MDI1IDYuNDE2NjcgMy45Mjg2MiA2LjQxNjY3IDQuMDgzMzNWNi40MTY2N0g0LjA4MzMzQzMuOTI4NjIgNi40MTY2NyAzLjc4MDI1IDYuNDc4MTIgMy42NzA4NSA2LjU4NzUyQzMuNTYxNDYgNi42OTY5MiAzLjUgNi44NDUyOSAzLjUgN0MzLjUgNy4xNTQ3MSAzLjU2MTQ2IDcuMzAzMDggMy42NzA4NSA3LjQxMjQ4QzMuNzgwMjUgNy41MjE4NyAzLjkyODYyIDcuNTgzMzMgNC4wODMzMyA3LjU4MzMzSDYuNDE2NjdWOS45MTY2N0M2LjQxNjY3IDEwLjA3MTQgNi40NzgxMiAxMC4yMTk3IDYuNTg3NTIgMTAuMzI5MUM2LjY5NjkyIDEwLjQzODUgNi44NDUyOSAxMC41IDcgMTAuNUM3LjE1NDcxIDEwLjUgNy4zMDMwOCAxMC40Mzg1IDcuNDEyNDggMTAuMzI5MUM3LjUyMTg3IDEwLjIxOTcgNy41ODMzMyAxMC4wNzE0IDcuNTgzMzMgOS45MTY2N1Y3LjU4MzMzSDkuOTE2NjdDMTAuMDcxNCA3LjU4MzMzIDEwLjIxOTcgNy41MjE4NyAxMC4zMjkxIDcuNDEyNDhDMTAuNDM4NSA3LjMwMzA4IDEwLjUgNy4xNTQ3MSAxMC41IDdDMTAuNSA2Ljg0NTI5IDEwLjQzODUgNi42OTY5MiAxMC4zMjkxIDYuNTg3NTJDMTAuMjE5NyA2LjQ3ODEyIDEwLjA3MTQgNi40MTY2NyA5LjkxNjY3IDYuNDE2NjdaIiBmaWxsPSIjOTg5ODk4Ii8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF80MDA1XzQ4NzApIj4KPHBhdGggZD0iTTcgMEM1LjYxNTUzIDAgNC4yNjIxNiAwLjQxMDU0MyAzLjExMTAxIDEuMTc5NzFDMS45NTk4NyAxLjk0ODg4IDEuMDYyNjYgMy4wNDIxMyAwLjUzMjg0NiA0LjMyMTIyQzAuMDAzMDMzIDUuNjAwMyAtMC4xMzU1OSA3LjAwNzc3IDAuMTM0NTA2IDguMzY1NjNDMC40MDQ2MDMgOS43MjM1IDEuMDcxMjkgMTAuOTcwOCAyLjA1MDI2IDExLjk0OTdDMy4wMjkyMiAxMi45Mjg3IDQuMjc2NSAxMy41OTU0IDUuNjM0MzcgMTMuODY1NUM2Ljk5MjI0IDE0LjEzNTYgOC4zOTk3IDEzLjk5NyA5LjY3ODc5IDEzLjQ2NzJDMTAuOTU3OSAxMi45MzczIDEyLjA1MTEgMTIuMDQwMSAxMi44MjAzIDEwLjg4OUMxMy41ODk1IDkuNzM3ODUgMTQgOC4zODQ0NyAxNCA3QzEzLjk5OCA1LjE0NDEgMTMuMjU5OSAzLjM2NDc5IDExLjk0NzUgMi4wNTI0N0MxMC42MzUyIDAuNzQwMTUgOC44NTU5IDAuMDAyMDA3MyA3IDBWMFpNNyAxMi44MzMzQzUuODQ2MjggMTIuODMzMyA0LjcxODQ2IDEyLjQ5MTIgMy43NTkxOCAxMS44NTAyQzIuNzk5ODkgMTEuMjA5MyAyLjA1MjIyIDEwLjI5ODIgMS42MTA3MSA5LjIzMjMyQzEuMTY5MTkgOC4xNjY0MiAxLjA1MzY4IDYuOTkzNTMgMS4yNzg3NiA1Ljg2MTk3QzEuNTAzODQgNC43MzA0MiAyLjA1OTQxIDMuNjkxMDIgMi44NzUyMSAyLjg3NTIxQzMuNjkxMDIgMi4wNTk0IDQuNzMwNDIgMS41MDM4MyA1Ljg2MTk4IDEuMjc4NzVDNi45OTM1MyAxLjA1MzY3IDguMTY2NDIgMS4xNjkxOSA5LjIzMjMyIDEuNjEwN0MxMC4yOTgyIDIuMDUyMjEgMTEuMjA5MyAyLjc5OTg5IDExLjg1MDIgMy43NTkxN0MxMi40OTEyIDQuNzE4NDYgMTIuODMzMyA1Ljg0NjI4IDEyLjgzMzMgN0MxMi44MzE2IDguNTQ2NTggMTIuMjE2NSAxMC4wMjkzIDExLjEyMjkgMTEuMTIyOUMxMC4wMjkzIDEyLjIxNjUgOC41NDY1OCAxMi44MzE2IDcgMTIuODMzM1YxMi44MzMzWiIgZmlsbD0iIzk4OTg5OCIvPgo8cGF0aCBkPSJNNy41ODM2NyAxMC40OTk0QzcuNTgzNjcgMTAuMTc3MiA3LjMyMjUgOS45MTYwMiA3LjAwMDMzIDkuOTE2MDJDNi42NzgxNiA5LjkxNjAyIDYuNDE2OTkgMTAuMTc3MiA2LjQxNjk5IDEwLjQ5OTRDNi40MTY5OSAxMC44MjE1IDYuNjc4MTYgMTEuMDgyNyA3LjAwMDMzIDExLjA4MjdDNy4zMjI1IDExLjA4MjcgNy41ODM2NyAxMC44MjE1IDcuNTgzNjcgMTAuNDk5NFoiIGZpbGw9IiM5ODk4OTgiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF80MDA1XzQ4NzAiPgo8cmVjdCB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==);\n      background-repeat: no-repeat;\n      background-position: center;\n      background-size: 14px 14px;\n    }\n    .popup .spinner {\n      border: 1px solid #118ece;\n      border-bottom-color: #deeaf2;\n      border-radius: 50%;\n      animation: rotation .7s linear infinite;\n      width: 15px;\n      height: 15px;\n      background-image: none;\n    }\n    .popup .spinner-wrapper {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 10px 0;\n      background-color: #fafafa;\n      border-top-right-radius: 7px;\n      border-top-left-radius: 7px;\n    }\n    .popup .details-button:not(.spinner):hover {\n      cursor: pointer;\n      opacity: 0.8;\n     }\n    .popup .description {\n      flex: 1;\n      position: relative;\n      padding: 10px;\n      font-size: 15px;\n      background-color: #fafafa;\n      box-shadow: 1px 1px 2px #d4d4d4;\n      border-bottom-right-radius: 5px;\n      border-bottom-left-radius: 5px;\n      color: #64676e;\n      border-top: 1px solid #d6d9df;\n    }\n    .popup .description.show-solutions {\n      display: flex;\n      flex-direction: column;\n      row-gap: 10px;\n    }\n    .popup.detailed-explanation {\n      width: calc(100% - 20px);\n    }\n    .popup.detailed-explanation .description {\n      padding: 0;\n    }\n    .popup.detailed-explanation .description > div {\n      max-height: 400px;\n      overflow-y: auto;\n      padding: 10px;\n    }\n    .popup.positioning {\n      opacity: 0;\n    }\n    .popup > div[data-count="0"] .description:not(.show-solutions) {\n      border-top-left-radius: 5px;\n      border-top-right-radius: 5px;\n      border-top: none;\n    }\n    .popup .description[data-error] > div {\n      display: flex;\n      flex-direction: column;\n      row-gap: 15px;\n      align-items: center;\n      justify-content: center;\n      width: 100%;\n    }\n    .popup .description[data-error] > div img {\n      width: 140px;\n      height: auto;\n    }\n    .popup .description[data-error="lim_request_per_day_reached"] > div img {\n      width: 60px;\n    }\n    .popup .description[data-error] > div p,\n    .popup .description[data-error] > div small {\n      text-align: center;\n      margin: 0;\n    }\n    .popup .description[data-error] > div p.title {\n      font-weight: bold;\n    }\n    .popup .description[data-error] > div a.premium-link {\n      padding: 10px 35px;\n      margin-bottom: 10px;\n      background-color: #297bbf;\n      color: #fff;\n      font-size: 16px;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      text-decoration: none;\n      font-weight: normal;\n    }\n    .popup .description[data-error] > div a.premium-link:before,\n    .popup .description[data-error] > div a.premium-link:after,\n    .popup .description[data-error] > div a.premium-link:hover:after {\n      content: none;\n    }\n    .popup.detailed-explanation .description > div::-webkit-scrollbar {\n      width: 7px;\n    }\n    .popup.detailed-explanation .description > div::-webkit-scrollbar-track {\n      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.10);\n    }\n    .popup.detailed-explanation .description > div::-webkit-scrollbar-thumb {\n      background-color: #0085ca;\n      border-radius: 6px;\n    }\n    .popup .no-description .suggestion:last-child {\n      border-bottom-right-radius: 5px;\n      border-bottom-left-radius: 5px;\n    }\n    .popup .description a,\n    .popup .description button.solutions-link {\n      display: table;\n      position: relative;\n      color: #e04343;\n      padding-left: 10px;\n      text-decoration: none;\n    }\n    .popup .description button.solutions-link {\n      display: flex;\n      align-items: center;\n      outline: none;\n      border: none;\n      background-color: transparent;\n      font-family: "Segoe-UI", "Helvetica Neue", Helvetica, Arial, sans-serif;\n      font-size: 15px;\n      cursor: pointer;\n    }\n    .popup .description a:before,\n    .popup .description button.solutions-link:before {\n      content: "";\n      width: 0;\n      height: 0;\n      border-style: solid;\n      border-width: 5.5px 0 5.5px 5px;\n      position: absolute;\n      top: 5px;\n      left: 0;\n      border-color: transparent transparent transparent #da5952;\n    }\n    .popup .description button.solutions-link:before {\n      top: 7px;\n    }\n    .popup .solutions-wrapper:empty {\n      display: none;\n    }\n    .popup .description a:after,\n    .popup .description button.solutions-link:after  {\n      content: "";\n      display: block;\n      position: absolute;\n      bottom: -2px;\n      left: 0;\n      height: 1px;\n      width: 0;\n      background: transparent;\n      transition: width 0.5s ease, background-color 0.5s ease;\n    }\n    .popup .description a:hover:after,\n    .popup .description button.solutions-link:hover:after {\n      background: #e04343;\n      width: 100%;\n    }\n    .popup .description p {\n      margin-bottom: 0.5rem;\n    }\n    .popup .description p:first-child {\n      margin-top: 0;\n    }\n    .popup .description p:last-child {\n      margin-bottom: 0;\n    }\n    .popup .description p.plus-button-row {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n    .popup .description ul li::marker {\n      color: #287bbf;\n    }\n    .popup > .unknown-word.show .description {\n      border-bottom-right-radius: 0px;\n      border-bottom-left-radius: 0px;\n    }\n    .popup .unknown-word--group {\n      background-color: #fafafa;\n      color: #64676e;\n      border-bottom-right-radius: 5px;\n      border-bottom-left-radius: 5px;\n    }\n    .popup .unknown-word--plus-row,\n    .popup .unknown-word--add-row {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      padding: 10px;\n      border-top: 1px solid #d6d9df;\n    }\n    .popup .unknown-word--add-row {\n      max-height: 0;\n      overflow: hidden;\n      transition: max-height .1s;\n      border: none;\n      padding: 0 10px;\n    }\n    .popup .unknown-word.show .unknown-word--add-row {\n      max-height: 50px;\n      padding: 10px;\n      border-top: 1px solid #d6d9df;\n    }\n    .popup .unknown-word--add-row > div {\n      flex: 1;\n      font-size: 13px;\n    }\n    .popup .unknown-word--plus-button {\n      background-image: url(\'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIADoAeAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQQGBwgCBQP/2gAIAQEAAAAAiPSduVb/AB6OQBSyZT5h4deIO2/AKmgmbyH3BlD62pYqUDHQNBRavutNZOfaRp+bfGjQNBsIP1fGTHOlorOKtqEC/wC4xILltZBaHk1R8AHfoulZeMgAAAogKgB//8QAGwEAAgIDAQAAAAAAAAAAAAAAAAQBBQIDBgf/2gAIAQIQAAAA9tqNNozjmRxb4zVdG/Hn03dhS9M0aFXNoH//xAAaAQACAwEBAAAAAAAAAAAAAAAEBQABBgcC/9oACAEDEAAAAOBvzEYF+JfRQhRWmWX306Z5a6ygkMapx6k//8QAQRAAAQMDAQMGCAoLAAAAAAAAAQIDBAAFEQYHEjETICEiQVEQFTNhcYGUszI1NlJUVnKT0dIUFiYwQlVidYOWtP/aAAgBAQABPwCh1QCePZXWWe0k0GnCQNwj0g0Iox1lmv0VHYo0tkoON5J9YFGiokAHs7awCRudvZzkjJ6eA6TROTk1oXRY1NIl8vMEWDEQhUl4DeVlZwlKR3mrzpPZ/YrjItVw1PcUSWN3fAi7w6wCh0gV4p2Z/Wu5exmhaNmh4asuPsRrXOlWNN3bxbHkOSGeQadS6tIScuDOKI3SQeIOKxx8CIcuSOUjxXXB2lCCoA+qltuNKKHUKQocQoEHmfw+DZR8Wau9Nv8AemtXiOvajcWJNsZnpeUy2lh58x0FSmU4JWKMPT4ODpbT3+wVq9mDFNuZi2CFAU4OVDsSeZYcRw9VbW0pGkW1hI3jcY3/AD055Rf2jUcBS1g8Cg1o/RkdTDV1u7PKKXhTDCx1QnsUoduamXC3WhhC5jyI7KlhCSRgZ9VXC1QLqypifFQ6k8CR1k+dJ4g1qXT72n53IFRXHcBWy53p7j/UObso+LNXem3+9NbUvl1e/Sx7pPgT8JPpFbXPke1/cY3uKc8ov7Rq1NB6cwyo4C1oQfWoCrpOYs8B+a62tTLCU5S2MqxkCtWatgX+CxFiMPIWh3fJcAxjdI7DUDXtruE2NBaiyg4+4EJJSCAT34NbRY7btibfKRyjMhG6e3C8gjm7JULct+rUISVKPi/AAyfKmto+mtQz9ZXiVCss19hZZ3HGmVKScNJHQRX6nar+rlx9nXSdHar3k/s5ceP0ddbXQU6QbSoYIuMb3FOeUX9o1BWpqQl1BwpGFA+cEGrbcWLrCjz2FZQ6kEjuUOIPnBrXlvm3G2RWoUZbyxJBIQMkApIz4NpN1bDES0NqSXFLDzvekDoSPXzdkkl5LGrIdvfCLk/GZVFTvJSpe4Vb24VdGRmuQe7Ympva0fnrkHfompva0fnrkXfoepvakfnraa0trRXXbmI3ru2oCasLdxyRHEE9FOHK1kfONNr3N4jiU4Faf1NP0+6rkcOxlnLjCz0E/OHcajbRLC62C+mQwvtSUbw9RTV12kMBtTdoirU4U+VewAk+ZIzmpMl+Y+7KlOqcecVvLWriTzY0x6KoLaWpKk/BUlRSoegik365EgGdKH+dVC63M8LlJ++X+NeNLn/MZX3y/wAamT5UlAZkXB5aM53VrUsZpWAeqcjwn9yCRwJFFSjxUeYr4R53/8QAMBEAAgEDAQQIBQUAAAAAAAAAAQIDAAQRBRIhMVEGEBMyNGFxcxQVIEGBkpOhwdH/2gAIAQIBAT8AqbV4I52tlVncDJCqWxXzT77E/wC0atLlLqJZUbIIzwxXpQdCcBhnlnr51Gu3rF6ucZjYZ/C1HZtE22Z2YAHdlv7Jrox4ST3GrVbmWNxbxEgyAZxTWlzFHHMocPklt/DFadcNc2yu/eBKk88dd1dSWWqXMqKpJ3YbkQKOvXJGOxj/AJ/2ujHhJPcatRsHuhtx99eA518JfSrHB2DDZJ3nzqzthawJFnJ4k+fW9tC5LNGCaNrHnGF/SKiiWJcLw9MfT//EAC8RAAEDAwICBwkBAAAAAAAAAAECAwQABREhQRIxBhAyUXFy0RMUICJhg5KhscH/2gAIAQMBAT8AGgzvtUewuuMIkOrCUqO5AoWhnGMMn7gq4wlQ3igowM455rOe1rSm1p1KTjY46900pXDa4qsZwsf7SpIcHAGkjJGox6V0s0fZ8o/lWiIw7HEl5IIaUedJmxXnXGFKQUYSE6c81c4yYstSEdggKA7s9W4qMw3KtzDZUe/I8TQtDIIPtF/r0rpWQX2fKKtlybiISy52FElR7qMy3tKcke8JJWB8o56VOlGZIW9jA5JH0HW1OlNJSlDp4RtSbi4UcWD+RqTJVJXxLGviTW2fg//Z\');\n      background-size: contain;\n      border: none;\n      width: 45px;\n      height: 23px;\n      border-radius: 4px;\n    }\n    .popup .unknown-word--add-row button {\n      text-transform: capitalize;\n      background-color: #ef6d72;\n      border: none;\n      border-radius: 4px;\n      padding: 5px 10px;\n      color: #fff;\n      width: 48px;\n      margin-left: 10px;\n    }\n    .popup .unknown-word--plus-button:hover,\n    .popup .unknown-word--add-row button:hover {\n      cursor: pointer;\n      opacity: .7;\n    }\n    .popup.popup-reverse > div .description {\n      order: 2;\n    }\n    .popup.popup-reverse > div .unknown-word--group {\n      order: 1;\n    }\n    .popup.popup-reverse .unknown-word.show .unknown-word--add-row {\n      border-top: none;\n      border-bottom: 1px solid #d6d9df;\n    }\n    .popup .error-content {\n      color: #64676e;\n      font-size: 16px;\n      font-weight: bold;\n      background-color: #fff;\n      border-bottom: 1px solid #d6d9df;\n      padding: 10px;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n      border-top-left-radius: 4px;\n      border-top-right-radius: 4px;\n    }\n    .popup .error-content img {\n      width: 140px;\n      height: auto;\n    }\n    .popup[data-error="lim_request_per_day_reached"] .image-container img {\n      width: 60px; \n    }\n    .popup .error-content #premium-link {\n      padding: 10px 35px;\n      background-color: #297bbf;\n      color: #fff;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-size: 16px;\n      text-decoration: none;\n      font-weight: normal;\n    }\n    .popup .premium-version-block {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n    }\n    \n    @media print {\n      .popup {\n        display: none !important;\n      }\n    } \n\n    .tooltip {\n      position: absolute;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 25%, rgba(240, 247, 251, 1) 100%);\n      background-color: #fff;\n      border: 1px solid #dce5ed;\n      padding: 10px;\n      border-radius: 10px;\n      width: 300px;\n      opacity: 0;\n      transition: all 0.3s;\n      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);\n      font-family: "Segoe-UI", "Helvetica Neue", Helvetica, Arial, sans-serif;\n    }\n    .tooltip:after, .tooltip:before {\n      border: solid transparent;\n      content: " ";\n      height: 0;\n      width: 0;\n      position: absolute;\n      pointer-events: none;\n    }\n    .tooltip:after {\n      border-color: rgba(136, 183, 213, 0);\n      border-width: 7px;\n      right: 10px;\n    }\n    .tooltip.arrow-left:after {\n      right: auto;\n      left: 10px;\n    }\n    .tooltip:before {\n      border-color: rgba(194, 225, 245, 0);\n      border-width: 8px;\n      right: 9px;\n    }\n    .tooltip.arrow-left:before {\n      right: auto;\n      left: 9px;\n    }\n    .tooltip.arrow-top:after, .tooltip.arrow-top:before {\n      bottom: 100%;\n    }\n    .tooltip.arrow-top:after {\n      border-bottom-color: #fff;\n    }\n    .tooltip.arrow-top:before {\n      border-bottom-color: #dce5ed;\n    }\n    .tooltip.arrow-bottom:after, .tooltip.arrow-bottom:before {\n      top: 100%;\n    }\n    .tooltip.arrow-bottom:after {\n      border-top-color: #eff7fa;\n    }\n    .tooltip.arrow-bottom:before {\n      border-top-color: #dce5ed;\n    }\n    .tooltip.show {\n      opacity: 1;\n    }\n    .tooltip[data-name="gdocs-welcome"] {\n      width: 275px;\n    }\n    .tooltip > p {\n      margin: 0 0 15px 0;\n    }\n    .tooltip > p:last-child {\n      margin: 0;\n    }\n    \n    @media print {\n      .tooltip {\n        display: none !important;\n      }\n    }\n    \n    @media screen and (min-width: 768px) {\n      .popup {\n        width: 310px;\n      }\n      .popup.detailed-explanation {\n        max-width: 388px;\n      }\n      .popup.detailed-explanation.is-premium {\n        max-width: 600px;\n      }\n      .popup.rephrase-solutions {\n        width: 465px;\n      }\n      .popup[data-error] {\n        width: 368px;\n      }\n    }\n    \n    @keyframes rotation {\n      0% {\n          transform: rotate(0deg);\n      }\n      100% {\n          transform: rotate(360deg);\n      }\n    } \n    ')), e
        }
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    const i = n(8),
        s = n(2),
        r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    t.GlobalUser = class {
        constructor() {
            this.stylePanelIsOpen = !1, this.statsPanelIsOpen = !1
        }
        singleLineAllowed() {
            return this.options && "CorrectionSingleLine" in this.options && this.options.CorrectionSingleLine
        }
        autoCheckEnabled() {
            return this.options && this.options.AutoCheck
        }
        getLang() {
            return this.options && "DefaultLanguage" in this.options ? this.options.DefaultLanguage : window.chrome.i18n.lang
        }
        isPremium() {
            return this.isAuthorized() && new Date(this.info[10]).getTime() > (new Date).getTime()
        }
        isGroupedPurchase() {
            return this.info && Number(this.info[23]) > 1
        }
        localOptionCor() {
            return i.stringToObject(localStorage.getItem("OptionCor") || "")
        }
        getUid() {
            return this.Uid || (this.Uid = localStorage.getItem("Uid"), this.Uid || (this.Uid = this.Generate_Uid(), localStorage.setItem("Uid", this.Uid))), this.Uid
        }
        Generate_Uid() {
            let e = "";
            const t = r.length;
            for (let n = 0; n < 8; n++) e += r.charAt(Math.floor(Math.random() * t));
            return e
        }
        optionsCor() {
            const e = {
                    Genre_Je: 0,
                    Genre_Tu: 0,
                    Genre_Nous: 0,
                    Genre_Vous: 0,
                    Genre_On: 0,
                    RefOrth: 0,
                    UsBr: -1,
                    ShowUPSol: 1
                },
                t = this.localOptionCor();
            return Object.keys(e).forEach(n => {
                n in t && (e[n] = t[n])
            }), i.objectToString(e)
        }
        optionsStyle() {
            const e = {
                    RepMin: 3,
                    GapRep: 3,
                    AllWords: 0,
                    FamilyWords: 0,
                    MinPhLg: 30,
                    MinPhCt: 5,
                    Ttr: 250,
                    Tts: 150
                },
                t = i.stringToObject(localStorage.getItem("OptionStyle") || "");
            Object.keys(e).forEach(n => {
                n in t && (e[n] = t[n])
            });
            const n = i.stringToObject(localStorage.getItem("OptionAutres") || "");
            return Object.keys(e).forEach(t => {
                t in n && (e[t] = n[t])
            }), i.objectToString(e)
        }
        isAuthorized() {
            return this.api_key || this.info && Object.keys(this.info).length > 0
        }
        resolveLangVariant(e, t) {
            if (!["en", "fr", "es", "pt", "de", "zh", "ar"].includes(e)) return e;
            const n = this.isPremium() && this.options && Object.keys(this.options).length > 0 ? this.options : null;
            return n && n[e] ? n[e] : this.resolveUserVariants(e, t)
        }
        resolveUserVariants(e, t) {
            let n = this.localOptionCor();
            const i = (t || []).filter(t => t.startsWith(e + "-"));
            return n && n[e] || (n[e] = i.length > 0 ? i[0] : e), n && n[e] ? n[e] : s._normalizeLocale(e)
        }
    }
}, function(e, t, n) {
    var i = {
        "./en/messages.json": 34,
        "./fr/messages.json": 35
    };

    function s(e) {
        var t = r(e);
        return n(t)
    }

    function r(e) {
        if (!n.o(i, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }
        return i[e]
    }
    s.keys = function() {
        return Object.keys(i)
    }, s.resolve = r, e.exports = s, s.id = 33
}, function(e) {
    e.exports = JSON.parse("{}")
}, function(e) {
    e.exports = JSON.parse("{}")
}]); // This is just a sample script. Paste your real code (javascript or HTML) here.

if ('this_is' == /an_example/) {
    of_beautifier();
} else {
    var a = b ? (c % d) : e[f];
}