import express from 'express'
import config from './config.json'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from './models/user'
import { Request, Response, ServerCodes } from './@types/cc-server'

const app: express.Application = express()

const port = config.port
const dbUri = encodeURI(config.uri)
console.log(dbUri)

app.use(cors())
app.use(express.json())

mongoose.connect(dbUri).then((db) => {})

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})

interface RegistrationRequest {
  name: string
  password: string
}
interface RegistrationResponse {
  token: string
  user: {
    name: string  
  }
}

app.post('/register', (req: Request<RegistrationRequest>, res: Response<RegistrationResponse>) => {
  const { name, password } = req.body

  User.findOne({ name }).then((candidates) => {
    if (candidates) {
      return res.json({ code: ServerCodes.Error, message: 'Уже есть пользователь с таким именем!' })
    }
    bcrypt.hash(password, 4).then((hashedPassword) => {
      const user = new User({ name, password: hashedPassword })
      user.save().then(() => {
        const token = jwt.sign({ name: user.name }, config.secret, { expiresIn: '1h' })
        return res.json({
          code: ServerCodes.Success,
          data: {
            token,
            user: {
              name: user.name,
            },
          },
        })
      })
    })
  })
})

interface LoginResponse {
  token: string
  user: {
    name: string
  }
}

interface LoginRequest {
  name: string
  password: string
}

app.post('/login', (req: Request<LoginRequest>, res: Response<LoginResponse>) => {
  const { name, password } = req.body

  User.findOne({ name }).then((user) => {
    if (!user) {
      return res.json({ code: ServerCodes.Error, message: 'Нет пользователя с таким именем!' })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      return res.json({ code: ServerCodes.Error, message: 'Неверный пароль!' })
    }

    const token = jwt.sign({ name: user.name }, config.secret, { expiresIn: '1h' })

    return res.json({
      code: ServerCodes.Success,
      data: {
        token,
        user: {
          name: user.name,
        },
      },
    })
  })
})
