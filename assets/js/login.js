import { initSocket } from "./socket"

const user_LS = 'username'
const switchTologin = 'login'
const switchToLogout = 'logout'
const userName = "loginUser-name"

const body = document.querySelector("body")
const loggedIn = document.querySelector(".loginStatus")
const chat__messages = document.querySelector(".chat__messages")
const logout = document.querySelector(".logoutStatus")
const loginForm = document.querySelector(".loginForm")

const checkUser = localStorage.getItem(user_LS)

if(checkUser){
    body.className=switchTologin
    paintUserName(checkUser)
    loginUser(checkUser)
}else{
    body.className=switchToLogout
}
function loginUser(username){
    const socket= io("/");
    socket.emit(window.events.setUsername,{username})
    initSocket(socket)
}
function handleSetName(event){
    event.preventDefault();
    const input = document.querySelector(".loginInput");
    const {value}=input;
    paintUserName(value)
    localStorage.setItem(user_LS,value)
    input.value = '';
    loginUser(value)
}

function paintUserName(name){
    const welcome = document.createElement("h2");
    body.className = switchTologin;
    welcome.className = userName;
    welcome.innerText = `${name} 🧚🏻‍♀️`;
    chat__messages.append(welcome);
}

if(loginForm){
    loginForm.addEventListener("submit",handleSetName)
}