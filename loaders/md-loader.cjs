const marked = require("marked");

function markdownLoader(source) {
  // 获取配置的options
  const options = this.getOptions();
  const html = marked.parse(source, options);
  return JSON.stringify(html);
}
module.exports = markdownLoader;
