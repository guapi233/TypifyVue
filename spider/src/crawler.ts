/**
 * 爬虫引擎
 * 负责获取页面模板、生成模拟页面返回根元素以及写入数据
 */

// 如果想使用 TS 去引用 JS 的项目，需要在二者中间穿插一个格式为 .d.ts 的翻译文件
// 例如想在TS中直接引用 superagent，就需要去下载其翻译文件 @types/superagent
import superagent from "superagent"; // superagent：发请求用的
import cheerio from "cheerio"; // cheerio：可以生成模拟页面，让我们像用jQuery操作页面一样操作数据
import fs from "fs";

interface Analyzer {
  url: string;
  filePath: string;
  analyze($: cheerio.Root): any[];
}

// 存储时的文章信息格式
interface StorageFile {
  [propName: number]: any[];
}

export default class Crawler {
  constructor(analyzer: Analyzer) {
    this.initSpiderProcess(analyzer);
  }

  /**
   * 初始化爬虫
   */
  async initSpiderProcess(analyzer: any) {
    const rawHtml = await this.getRawHtml(analyzer.url);

    // 生成模拟页面
    const $ = cheerio.load(rawHtml);

    const filesInfo = analyzer.analyze($);

    this.writeFile(analyzer.filePath, filesInfo);
  }

  /**
   * 获取html模板
   * @param url 目标路径
   */
  async getRawHtml(url: string) {
    const result = await superagent.get(url);
    return result.text;
  }

  writeFile(filePath: string, fileInfo: any[]) {
    let fileContent: StorageFile = {};

    // 如果已有数据，读出来
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    // 将新数据添入数组中，写入文件中
    fileContent[Date.now()] = fileInfo;
    fs.writeFileSync(filePath, JSON.stringify(fileContent));
  }
}
