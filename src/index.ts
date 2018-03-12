import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as moment from 'moment'

const app = new Koa()

const router = new Router()

interface UserEntity {
  id: number
  firstName: string
  lastName: string
  birthDate: Date
}

interface UserResponse {
  user: {
    name: string
    age: number
  }
}



const alice: UserEntity = {
  id: 1,
  firstName: 'Alice',
  lastName: 'Pleasance Liddell',
  birthDate: new Date(1865, 5, 4)
}

const getUser = (id: number) => new Promise<UserEntity | null>((resolve, reject) => {
  setTimeout(() => {
    if (id === 123) resolve(alice)
    else if (id > 1000) reject(new Error('getUser error!'))
    else resolve(null)
  }, 500)
})

router
  .get('/users/:id([0-9]+)', async ctx => {
    const response = await getUser(+ctx.params.id)

    if (response) ctx.body = toUser(response)
    else ctx.throw(404, 'No user found!')
  })

app
  .use(router.routes())
  .listen(3000)





const user1: UserEntity = {
  id: 1,
  firstName: 'Kees',
  lastName: 'Test',
  birthDate: new Date('1989-04-01')
}

const toUser = (entity: UserEntity): UserResponse => {
  // ...return some object based on entity
  return {
    user: {
      name: `${entity.firstName} ${entity.lastName}`,
      age: moment().diff(entity.birthDate, 'years')
    }
  }
}

type Color = 'blue' | 'white'

type Job = {
  description: string
  salary: number
  info?: string
}

interface YourInterface {
  nickname: string
  color: Color
  age: number
  websites: string[]
  job: Job
}

const cheshireCat: YourInterface = {
  nickname: 'cat',
  color: 'blue',
  age: 15,
  websites: [
    'http://www.catsareawesome.com',
    'http://www.dogsarelame.biz'
  ],
  job: {
    description: 'Scare people',
    salary: 500,
    info: 'only works on sundays'
  }
}

const whiteRabbit: YourInterface = {
  nickname: 'rabbie',
  color: 'white',
  age: 7,
  websites: [
    'http://www.rabbitsrule.com',
    'http://www.carrots.net',
    'http://www.rabbitnews.ru'
  ],
  job: {
    description: 'Being fluffy',
    salary: 1500
  }
}

console.log(toUser(user1))
console.log(cheshireCat, whiteRabbit)

interface HTTPResponse<DataType> {
  statusCode: number
  responseTime: number
  data: DataType
}

interface Book {
  books: {
    title: string
    author: string
  }[]
}

interface Article {
  articles: {
    title: string
    content: string
  }[]
}

const bookResponse: HTTPResponse<Book> = {
  statusCode: 200,
  responseTime: 10,
  data: {
    books: [
      {
        title: 'Test',
        author: 'test'
      },
      {
        title: 'Test',
        author: 'test'
      }
    ]
  }
}

const articleResponse: HTTPResponse<Article> = {
  statusCode: 200,
  responseTime: 10,
  data: {
    articles: [
      {
        title: 'Test',
        content: 'test'
      },
      {
        title: 'Test',
        content: 'test'
      }
    ]
  }
}

console.log(bookResponse, articleResponse)