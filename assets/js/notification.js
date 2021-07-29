const loginNotification = document.querySelector("#loginNotification")


export const handleUserNoti= ({username})=>{
    PaintNotification(`🙋🏼‍♀️ HELLO ${username}  -Wlocome!`,'#F8AFA6')
}

const PaintNotification = (name,color)=>{
    loginNotification.classList.add("showing");
    loginNotification.innerText= '';
    loginNotification.style.backgroundColor=color;
    loginNotification.innerText = `${name}`
    setTimeout(() => {
        loginNotification.classList.remove("showing");
    }, 2000);
}

export const handleDisconnected =({username})=>{
    PaintNotification(`🧤 ${username}  -BYE BYE`,"#900020")
}