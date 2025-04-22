const express = require("express")
const app = express();
// corsをインポート
const cors = require("cors")

app.use(express.json());

// corsをインポートして、アプリケーションに適用させる記述
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// prismaの読み込み
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// 全タスクの取得処理
app.get("/tasks", async(req, res) => {
  try {
  const AllTasks = await prisma.task.findMany();
  res.json(AllTasks)
  } catch(error) {
  console.log(error)
  }
})


// 全ジャンルの取得処理
app.get("/genres", async(_, res) => {
  try {
  const AllGenres = await prisma.genre.findMany();
  res.json(AllGenres)
  } catch(error) {
  console.log(error)
  }
})

app.listen(3000, () => {
  console.log("listening on localhost 3000")
})
