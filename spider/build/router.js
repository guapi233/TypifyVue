"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crawler_1 = __importDefault(require("./crawler"));
var articleAnalyzer_1 = __importDefault(require("./articleAnalyzer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var router = express_1.Router();
router.get("/", function (req, res) {
    // 通过 TS 注解融合，来为 req 中添加 teach 属性
    req.teach = "a";
    res.send("???");
});
router.get("/getData", function (req, res) {
    var article = new articleAnalyzer_1.default("https://88250.b3log.org/", path_1.default.resolve(__dirname, "../data/articles.json"));
    new crawler_1.default(article);
    res.send("success");
});
router.get("/showData", function (req, res) {
    var position = path_1.default.resolve(__dirname, "../data/articles.json");
    var result = fs_1.default.readFileSync(position, "utf8");
    res.json(result);
});
exports.default = router;
