import { handleNewMsg } from "./chat";
import {handleDisconnected, handleUserNoti} from "./notification"
import { handleBeganPath, handleStrokePath } from "./paint";

let socket = null
export const getSocket = ()=> socket;


export const initSocket =(aSocket)=> {
    const {events} = window
    socket = aSocket
    socket.on(events.newUser,handleUserNoti);
    socket.on(events.disconnected,handleDisconnected)
    socket.on(events.newMsg,handleNewMsg)
    socket.on(events.beganPath,handleBeganPath)
    socket.on(events.strokedPath,handleStrokePath)
}