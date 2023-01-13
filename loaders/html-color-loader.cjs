function htmlColorLoader(source) {
  // 获取配置的options
  const options = this.getOptions();
  const newStr = source.replace("hello", `<span>hello ${options.text}</span>`);
  const code = `module.exports = ${newStr}`;
  return code;
}

module.exports = htmlColorLoader;
