import { Router, Request, Response } from "express";
import Crawler from "./crawler";
import ArticleAnalyzer from "./articleAnalyzer";
import path from "path";
import fs from "fs";

// 解决 Request 为 any 的问题
// interface RequestPlus extends Request {
//   body: {
//     [key: string]: string | undefined;
//   };
// }

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // 通过 TS 注解融合，来为 req 中添加 teach 属性
  res.send("???");
});

router.get("/getData", (req: Request, res: Response) => {
  const article = new ArticleAnalyzer(
    "https://88250.b3log.org/",
    path.resolve(__dirname, "../data/articles.json")
  );

  new Crawler(article);
  res.send("success");
});

router.get("/showData", (req: Request, res: Response) => {
  const position = path.resolve(__dirname, "../data/articles.json");
  const result = fs.readFileSync(position, "utf8");
  res.json(result);
});

export default router;
