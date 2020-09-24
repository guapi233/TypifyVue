"use strict";
/**
 * 爬虫引擎
 * 负责获取页面模板、生成模拟页面返回根元素以及写入数据
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 如果想使用 TS 去引用 JS 的项目，需要在二者中间穿插一个格式为 .d.ts 的翻译文件
// 例如想在TS中直接引用 superagent，就需要去下载其翻译文件 @types/superagent
var superagent_1 = __importDefault(require("superagent")); // superagent：发请求用的
var cheerio_1 = __importDefault(require("cheerio")); // cheerio：可以生成模拟页面，让我们像用jQuery操作页面一样操作数据
var fs_1 = __importDefault(require("fs"));
var Crawler = /** @class */ (function () {
    function Crawler(analyzer) {
        this.initSpiderProcess(analyzer);
    }
    /**
     * 初始化爬虫
     */
    Crawler.prototype.initSpiderProcess = function (analyzer) {
        return __awaiter(this, void 0, void 0, function () {
            var rawHtml, $, filesInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRawHtml(analyzer.url)];
                    case 1:
                        rawHtml = _a.sent();
                        $ = cheerio_1.default.load(rawHtml);
                        filesInfo = analyzer.analyze($);
                        this.writeFile(analyzer.filePath, filesInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取html模板
     * @param url 目标路径
     */
    Crawler.prototype.getRawHtml = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, superagent_1.default.get(url)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.text];
                }
            });
        });
    };
    Crawler.prototype.writeFile = function (filePath, fileInfo) {
        var fileContent = {};
        // 如果已有数据，读出来
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        // 将新数据添入数组中，写入文件中
        fileContent[Date.now()] = fileInfo;
        fs_1.default.writeFileSync(filePath, JSON.stringify(fileContent));
    };
    return Crawler;
}());
exports.default = Crawler;
