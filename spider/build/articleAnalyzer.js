"use strict";
/**
 * 文章分析器
 * 负责指定目标路径、存储路径、以及使用拿到的 根元素 找到 目标信息 生成 信息数组
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ArticleAnalyzer = /** @class */ (function () {
    function ArticleAnalyzer(url, filePath) {
        this.url = url;
        this.filePath = filePath;
    }
    /**
     * 生成文章信息
     * @param rawHtml html模板
     */
    ArticleAnalyzer.prototype.analyze = function ($) {
        var articleList = [];
        // 获取标题
        var titleItems = $(".articles .item > .item__title > a");
        titleItems.map(function (index, item) {
            articleList.push({
                title: $(item).text().trim().replace("\n", ""),
                type: "",
            });
        });
        // 获取访问量
        var visitNumItems = $(".articles .item .fn__clear");
        visitNumItems.map(function (index, item) {
            articleList[index].type = $(item)
                .find("a")
                .eq(1)
                .text()
                .trim()
                .replace("\n", "");
        });
        return articleList;
    };
    return ArticleAnalyzer;
}());
exports.default = ArticleAnalyzer;
