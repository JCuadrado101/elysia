import { Elysia, t } from 'elysia'
import { swagger } from "@elysiajs/swagger"

const getUserById = (id: string) => {
  return `This is ${id}`
}

const signIn = (credentials: any) => {
  return credentials.username === 'admin' && credentials.password === 'password';
}

new Elysia()
  .use(swagger(
    {
      path: "/swagger"
    }
  ))
  .get("/", () => "hello world")
  .get("test", () => "new page")

  // state and decorate
  .state('version', 1)
  .decorate("getDate", () => Date.now().toLocaleString())
  .get('/version', ({
    getDate,
    store: { version }
  }) => `${version} ${getDate()}`
  )

  // route and params with context
  .get('/id/:id', (context) => context.params.id) 

  // post example through body
  .post(
    "/profile",
    ({ body }) => body,
    {
      body: t.Object({
        username: t.String()
      })
    }
  )

  // hander example
  .post('/sign', ({ body, set }) => {
    const signed = signIn(body);

    if(signed)
      return "Welcome back"

      set.status = 403
      return "Invalid username and password"
  })

  .listen(3000)

  console.log("port 3000");