import { handleNewMsg } from "./chat";
import {handleDisconnected, handleUserNoti} from "./notification"
import {    handleBeganPath, handleFilled, handleStrokePath } from "./paint";
import { handleGameEnded, handleGameNoti, handleGameStart, handleUserInfo } from "./player";

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
    socket.on(events.filled,handleFilled)
    socket.on(events.playerUpdate,handleUserInfo)
    socket.on(events.gameStart,handleGameStart)
    socket.on(events.painterNoti,handleGameNoti)
    socket.on(events.gameEnded,handleGameEnded)
}