import { Router, Request, Response } from "express";
import Crawler from "./crawler";
import ArticleAnalyzer from "./articleAnalyzer";
import path from "path";

const router = Router();

router.get("/", (req: Request, res: Response) => {
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

export default router;
