import { disableCanvas, enableCanvas, hideControls, resetCanvas, showControls } from "./paint";
const jsNotification = document.querySelector('.jsNotification')
export const handleUserInfo =({sockets})=> paintPlayer(sockets);
const playBoard = document.querySelector(".player__board");
function paintPlayer(users){
    playBoard.innerText='';
    users.forEach(user => {
        const text = document.createElement("h3")
        text.innerText=`${user.username} : ${user.score}`
        playBoard.appendChild(text)
    });
}

export const handleGameStart =()=>{
    1.//disable to draw
    2.//dissapear the drawing controls
    disableCanvas()
    hideControls()
}
const setNotification = (text)=>{
    jsNotification.innerText='';
    jsNotification.innerText=text;
}
export const handleGameNoti = ({gameWord})=>{
    console.log("111")
    enableCanvas()
    showControls()
    setNotification(` you are the painter, draw follwing word . . . ${gameWord}`);
}

export const handleGameEnded=()=>{
    setNotification("game ENDED")
    disableCanvas();
    hideControls();
    resetCanvas("#f2f2f2")
}