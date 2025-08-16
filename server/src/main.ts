import express, { type Request, type Response } from "express";

const app = express();

app.get("/hello", (_req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

const PORT = 12345;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server: ", err);
  return;
  }
  console.log(`Server ready on ${PORT}`);
});
