import events from "./events";
import { chooseWords } from "./word";

let sockets = [];
let inProgress =false;
let gameWord = null;
let painter = null;
let choosePainter = ()=>sockets[Math.floor(Math.random()*sockets.length)]


const socketController = (socket,io)=>{
    const broadcast = (events,data) => socket.broadcast.emit(events,data)
    const superBroadcast =(events,data)=>io.emit(events,data)
    const startGame = ()=>{
        if(sockets.length >1){
            if(inProgress === false){
                inProgress = true;
                painter = choosePainter()
                gameWord = chooseWords()
                setTimeout(() => {
                    superBroadcast(events.gameStart)
                    io.to(painter.id).emit(events.painterNoti,{gameWord})
                }, 2000); 
            }
        }
    }
    const endGame=()=>{
        inProgress = false;
        superBroadcast(events.gameEnded)
    }
    socket.on(events.setUsername,({username})=>{
        socket.username = username;
        sockets.push({id:socket.id,score:0,username})
        broadcast(events.newUser,{username})
        superBroadcast(events.playerUpdate,{sockets})
        startGame();
    })
    socket.on(events.disconnect,()=>{
        sockets = sockets.filter((sock)=>sock.id !== socket.id)
        broadcast(events.disconnected,{username:socket.username})
        superBroadcast(events.playerUpdate,{sockets})
        if(socket.length <=1){
            endGame()
        }else if(painter){
            if(painter.id === socket.id){
                endGame();
            }
        }
    })
    socket.on(events.sendMsg,({message})=>{
        broadcast(events.newMsg,{message,username:socket.username})
    })
    socket.on(events.beginPath,({x,y})=>{
        broadcast(events.beganPath,{x,y})
    })
    socket.on(events.strokePath,({x,y,color})=>{
        broadcast(events.strokedPath,{x,y,color})
    })
    socket.on(events.fill,({color})=>{
        broadcast(events.filled,{color})
    })
}
export default socketController