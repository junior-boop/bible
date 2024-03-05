import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import filtre from './livre'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/bible-ref', async ({json, text, req}) => {
	const {book, chap, v1, v2} = req.queries()
	
	const result = filtre({livre : book[0], chap : chap[0], vers1 : v1[0], vers2 : v2[0] === 'undefined' ? undefined : v2[0]})

	console.log({book, chap, v1, v2, result})

	return json(result)
})
const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
