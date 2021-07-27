import express from "express"
import {join}from "path"
import socketIO from "socket.io"

const app = express();
const PORT = 4102;

app.set("view engine","pug")
app.set("views",join(__dirname,"views"))

app.use(express.static(join(__dirname,"static")));

app.get("/",(req,res)=>res.render("home"))

const server = app.listen(PORT,()=>console.log(`my server http://localhost:${PORT}`))

const io = socketIO(server);

io.on("connection",()=>{
    console.log("출쳌")
})