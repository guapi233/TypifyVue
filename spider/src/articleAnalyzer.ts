/**
 * 文章分析器
 * 负责指定目标路径、存储路径、以及使用拿到的 根元素 找到 目标信息 生成 信息数组
 */

import Crawler from "./crawler";
import path from "path";

// 文章信息格式
interface Article {
  title: string;
  type: string;
}

class ArticleAnalyzer {
  constructor(public url: string, public filePath: string) {}

  /**
   * 生成文章信息
   * @param rawHtml html模板
   */
  analyze($: cheerio.Root) {
    const articleList: Article[] = [];

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

    return articleList;
  }
}

const article = new ArticleAnalyzer(
  "https://88250.b3log.org/",
  path.resolve(__dirname, "../data/articles.json")
);

new Crawler(article);
