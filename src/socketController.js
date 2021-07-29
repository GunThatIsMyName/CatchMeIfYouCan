import events from "./events";

const socketController = (socket)=>{
    const broadcast = (events,data) => socket.broadcast.emit(events,data)
    socket.on(events.setUsername,({username})=>{
        socket.username = username;
        broadcast(events.newUser,{username})
    })
    socket.on(events.disconnect,()=>{
        console.log("연결이 끊겼습니다.")
        broadcast(events.disconnected,{username:socket.username})
    })
    socket.on(events.sendMsg,({message})=>{
        console.log("tocuhed")
        broadcast(events.newMsg,{message,username:socket.username})
    })
}
export default socketController