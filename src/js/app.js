require("../styles/main.scss")

var topDiv = document.getElementById("markdown");

window.markdownChanged = function markdownChanged(b64) {
  var str = atob(b64);
  var js = JSON.parse(str)
  topDiv.innerHTML = md.render(js.markdown);
  return "ok"
}

var mdOpts = {
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />).
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
  linkify:      false,        // Autoconvert URL-like text to links
  typographer:  false,
  quotes:				 '“”‘’',
  highlight: 		function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return '';
  }
}

var md = require('markdown-it')(mdOpts);
var markdownitContainer = require('markdown-it-container')
md.use(markdownitContainer, "slide", {
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return '<section>\n';
    } else {
      return '</section>\n';
    }
  }
});
var markdownItAttrs = require('markdown-it-attrs')
md.use(markdownItAttrs);
var markdownitEmoji = require('markdown-it-emoji')
md.use(markdownitEmoji);
var markdownitDeflist = require('markdown-it-deflist')
md.use(markdownitDeflist);
var markdownitVideo = require('markdown-it-video')
md.use(markdownitVideo);
var markdownitLinkAttributes = require('markdown-it-link-attributes')
md.use(markdownitLinkAttributes, {
  target: '_blank',
  rel: 'noopener'
});
