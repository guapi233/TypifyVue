// 如果想使用 TS 去引用 JS 的项目，需要在二者中间穿插一个格式为 .d.ts 的翻译文件
// 例如想在TS中直接引用 superagent，就需要去下载其翻译文件 @types/superagent
import superagent from "superagent";

class Crawler {
  // 目标地址
  private url = "https://88250.b3log.org/";
  // 生页面
  private rawHtml = "";

  constructor() {
    this.getRawHtml();
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.rawHtml = result.text;
  }
}

const crawler = new Crawler();
