// 通过 注解融合 为 Express.req 中添加 teach 属性
declare namespace Express {
  interface Request {
    teach: string;
    [key: string]: string | object | undefined;
  }
}
