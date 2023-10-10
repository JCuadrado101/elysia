import { Elysia } from 'elysia'

new Elysia()
  .get("/", () => "hello world")
  .get("test", () => "new page")
  .listen(3000)

  console.log("port 3000");