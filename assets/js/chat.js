import { getSocket } from "./socket";

const chatMessages = document.querySelector(".chat__messages")
const chatForm = document.querySelector(".chat__form")

function handleSendMsg(event){
    event.preventDefault();
    const input = chatForm.querySelector("input")
    const {value}=input
    if(value === ''){
        return;
    }
    getSocket().emit(window.events.sendMsg,{message:value})
    input.value='';
    paintMSG(value)
}

export const handleNewMsg =({message,username})=>{
    paintMSG(message,username)
}
const paintMSG =(text,nickname)=>{
    const li = document.createElement("li")
    li.innerHTML=`
        <span class="message ${nickname? 'out':'self'}">${nickname? nickname: 'You'}</span>  :  ${text}
    `
    chatMessages.append(li)
}

chatForm.addEventListener("submit",handleSendMsg)