import "./login"
import "./notification"
import "./socket"
import "./chat"
import "./paint"



export const getSocket = ()=> socket;


export const updateSocket =(aSocket)=> (socket=aSocket);
export const initSocket =(aSocket)=> {
    updateSocket(aSocket)
    aSocket.on(events.newUser,handleUserNoti);
    aSocket.on(events.disconnected,handleDisconnected)
    aSocket.on(events.newMsg,handleNewMsg)
}