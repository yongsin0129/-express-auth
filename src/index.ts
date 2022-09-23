import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import { Database } from './database'

import appRoute from './app/app.routing'

const app = express()

// 設定跨域存取的限定，目前是開放所有網域
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)

// 包山包海法 , 每當有資料進來的時候都會去執行它，這樣的做法是最簡單的，但也是比較不好的做法 ：
// 個別使用法的做法是最推薦的 ex : router.post('/', express.json(), (req, res) => {} )
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

// Express 安全防護,當前設定為全開啟並使用預設值
app.use(helmet())

// 動態選擇環境變數的檔案 , 因為 prod , dev 路徑不同，需用 ../退到根目錄再指定 src 資料夾內的 env
dotenv.config({
  path: path.resolve(
    __dirname,
    `../src/environments/${process.env.NODE_ENV}.env`
  )
})
Database.connect()

// debug
app.get('/', (req, res, next) => {
  const debugObj = {
    headers: req.headers,
    method: req.method,
    body: req.body
  }
  // res.json(debugObj)
  next()
})

// route 入口
app.use('/', appRoute)
app.get('/', (req, res, next) => {
  res.send('hello , express')
})

// global error message handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message || err })
})

// 監控 process.env.PORT
app.listen(process.env.PORT, () =>
  console.log(`http server is running at port ${process.env.PORT}.`)
)
