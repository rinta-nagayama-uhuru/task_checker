const express = require("express");
const app = express();
app.use(express.json());

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
app.get("/genres", async(req, res) => {
  try {
  const AllGenres = await prisma.genre.findMany();
  res.json(AllGenres)
  } catch(error) {
  console.log(error)
  }
})

app.listen(3000, () =>{
  console.log("Listening on localhost 3000")
})