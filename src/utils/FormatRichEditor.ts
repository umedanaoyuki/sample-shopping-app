import * as cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/hybrid.css";

export const formatRichEditor = (richText: string) => {
  const $ = cheerio.load(richText);
  const highlight = (text: string, lang?: string) => {
    if (!lang) return hljs.highlightAuto(text);

    try {
      return hljs.highlight(text, {
        language: lang?.replace(/^language-/, "") || "",
      });
    } catch (e) {
      console.error(e);
      return hljs.highlightAuto(text);
    }
  };

  $("pre code").each((_, elm) => {
    const lang = $(elm).attr("class");
    const res = highlight($(elm).text(), lang);
    $(elm).html(res.value);
  });

  return $.html();
};
