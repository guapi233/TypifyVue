// 如果想使用 TS 去引用 JS 的项目，需要在二者中间穿插一个格式为 .d.ts 的翻译文件
// 例如想在TS中直接引用 superagent，就需要去下载其翻译文件 @types/superagent
import superagent from "superagent"; // superagent：发请求用的
import cheerio from "cheerio"; // cheerio：可以生成模拟页面，让我们像用jQuery操作页面一样操作数据

interface Article {
  title: string;
  type: string;
}

class Crawler {
  // 目标地址
  private url = "https://88250.b3log.org/";

  constructor() {
    this.getRawHtml();
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.getArticleInfo(result.text);
  }

  async getArticleInfo(rawHtml: string) {
    const articleList: Article[] = [];

    // 生成模拟页面
    const $ = cheerio.load(rawHtml);
    // 获取标题
    const titleItems = $(".articles .item > .item__title > a");

    titleItems.map((index, item) => {
      articleList.push({
        title: $(item).text().trim().replace("\n", ""),
        type: "",
      });
    });

    // 获取访问量
    const visitNumItems = $(".articles .item .fn__clear");

    visitNumItems.map((index, item) => {
      articleList[index].type = $(item)
        .find("a")
        .eq(1)
        .text()
        .trim()
        .replace("\n", "");
    });

    console.log(articleList);
  }
}

const crawler = new Crawler();
