import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

import appRoute from './app/app.routing';

const app = express()

// 包山包海法 , 每當有資料進來的時候都會去執行它，這樣的做法是最簡單的，但也是比較不好的做法 ：
// 個別使用法的做法是 最推薦的 ex : router.post('/', express.json(), (req, res) => {} )
app.use(express.json());

// 動態選擇環境變數的檔案 , 因為 prod , dev 路徑不同，需用 ../退到根目錄再指定 src 資料夾內的 env
dotenv.config({
  path: path.resolve(
    __dirname,
    `../src/environments/${process.env.NODE_ENV}.env`
  )
})

// route 入口
app.use('/', appRoute);

app.get('/', (req, res, next) => {
  res.send('Hello, Express')
})


// 監控 process.env.PORT
app.listen(process.env.PORT, () =>
  console.log(`http server is running at port ${process.env.PORT}.`)
)
