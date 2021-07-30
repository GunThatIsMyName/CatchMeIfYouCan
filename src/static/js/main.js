(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleNewMsg=void 0;var _socket=require("./socket"),chatMessages=document.querySelector(".chat__messages"),chatForm=document.querySelector(".chat__form");function handleSendMsg(e){e.preventDefault();var t=chatForm.querySelector("input"),a=t.value;""!==a&&((0,_socket.getSocket)().emit(window.events.sendMsg,{message:a}),t.value="",paintMSG(a))}var handleNewMsg=function(e){var t=e.message,a=e.username;paintMSG(t,a)};exports.handleNewMsg=handleNewMsg;var paintMSG=function(e,t){var a=document.createElement("li");a.innerHTML='\n        <span class="message '.concat(t?"out":"self",'">').concat(t||"You","</span>  :  ").concat(e,"\n    "),chatMessages.append(a)};chatForm.addEventListener("submit",handleSendMsg);

},{"./socket":7}],2:[function(require,module,exports){
"use strict";var _socket=require("./socket"),user_LS="username",switchTologin="login",switchToLogout="logout",userName="loginUser-name",body=document.querySelector("body"),loggedIn=document.querySelector(".loginStatus"),chat__messages=document.querySelector(".chat__messages"),logout=document.querySelector(".logoutStatus"),loginForm=document.querySelector(".loginForm"),checkUser=localStorage.getItem(user_LS);function loginUser(e){var o=io("/");o.emit(window.events.setUsername,{username:e}),(0,_socket.initSocket)(o)}function handleSetName(e){e.preventDefault();var o=document.querySelector(".loginInput"),t=o.value;paintUserName(t),localStorage.setItem(user_LS,t),o.value="",loginUser(t)}function paintUserName(e){var o=document.createElement("h2");body.className=switchTologin,o.className=userName,o.innerText="".concat(e," 🧚🏻‍♀️"),chat__messages.append(o)}checkUser?(body.className=switchTologin,paintUserName(checkUser),loginUser(checkUser)):body.className=switchToLogout,loginForm&&loginForm.addEventListener("submit",handleSetName);

},{"./socket":7}],3:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSocket=exports.updateSocket=exports.getSocket=void 0,require("./login"),require("./notification"),require("./socket"),require("./paint"),require("./player");var getSocket=function(){return socket};exports.getSocket=getSocket;var updateSocket=function(e){return socket=e};exports.updateSocket=updateSocket;var initSocket=function(e){updateSocket(e),e.on(events.newUser,handleUserNoti),e.on(events.disconnected,handleDisconnected),e.on(events.newMsg,handleNewMsg)};exports.initSocket=initSocket;

},{"./login":2,"./notification":4,"./paint":5,"./player":6,"./socket":7}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleDisconnected=exports.handleUserNoti=void 0;var loginNotification=document.querySelector("#loginNotification"),handleUserNoti=function(i){var o=i.username;PaintNotification("🙋🏼‍♀️ ".concat(o,"  -just joined!"),"#F8AFA6")};exports.handleUserNoti=handleUserNoti;var PaintNotification=function(i,o){loginNotification.classList.add("showing"),loginNotification.innerText="",loginNotification.style.backgroundColor=o,loginNotification.innerText="".concat(i),setTimeout(function(){loginNotification.classList.remove("showing")},2e3)},handleDisconnected=function(i){var o=i.username;PaintNotification("🧤 ".concat(o,"  -BYE BYE"),"#900020")};exports.handleDisconnected=handleDisconnected;

},{}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.enableCanvas=enableCanvas,exports.disableCanvas=disableCanvas,exports.resetCanvas=exports.showControls=exports.hideControls=exports.handleFilled=exports.handleStrokePath=exports.handleBeganPath=void 0;var _socket=require("./socket"),canvas=document.querySelector("canvas"),jsColors=document.querySelector(".canvas-Colors"),jsMode=document.querySelector(".jsMode"),controls=document.querySelector(".controls"),ctx=canvas.getContext("2d");ctx.strokeStyle="#2c2c2c",ctx.fillStyle="#2c2c2c",ctx.lineWidth=2.5;var painting=!1,filling=!1,canvasSize=450;function handleTouch(){painting=!0}function stopPainting(){painting=!1}canvas.width=canvasSize,canvas.height=canvasSize;var beginPath=function(e,t){ctx.beginPath(),ctx.moveTo(e,t)},strokePath=function(e,t,n){var o=ctx.strokeStyle;n&&(ctx.strokeStyle=n),ctx.lineTo(e,t),ctx.stroke(),ctx.strokeStyle=o};function handleMouseMove(e){var t=e.offsetX,n=e.offsetY;painting?(strokePath(t,n),(0,_socket.getSocket)().emit(window.events.strokePath,{x:t,y:n,color:ctx.strokeStyle})):(beginPath(t,n),(0,_socket.getSocket)().emit(window.events.beginPath,{x:t,y:n}))}function handleColor(e){var t=e.target,n=t.style.backgroundColor;"jsColor"===t.className&&(ctx.strokeStyle=n,ctx.fillStyle=n)}function handleFilling(){filling&&(fill(),(0,_socket.getSocket)().emit(window.events.fill,{color:ctx.fillStyle}))}function handleMode(){"FILL"===jsMode.innerText?(jsMode.innerText="PEN",filling=!1):(jsMode.innerText="FILL",filling=!0,canvas.addEventListener("mouseup",handleFilling))}function handleRightClick(e){e.preventDefault()}function fill(e){var t=ctx.fillStyle;e&&(ctx.fillStyle=e),ctx.fillRect(0,0,canvas.width,canvas.height),ctx.fillStyle=t}var handleBeganPath=function(e){var t=e.x,n=e.y;beginPath(t,n)};exports.handleBeganPath=handleBeganPath;var handleStrokePath=function(e){var t=e.x,n=e.y,o=e.color;strokePath(t,n,o)};exports.handleStrokePath=handleStrokePath;var handleFilled=function(e){fill(e.color)};function enableCanvas(){canvas.addEventListener("mousemove",handleMouseMove),canvas.addEventListener("mousedown",handleTouch),canvas.addEventListener("mouseup",stopPainting),canvas.addEventListener("mouseleave",stopPainting)}function disableCanvas(){canvas.removeEventListener("mousemove",handleMouseMove),canvas.removeEventListener("mousedown",handleTouch),canvas.removeEventListener("mouseup",stopPainting),canvas.removeEventListener("mouseleave",stopPainting)}exports.handleFilled=handleFilled;var hideControls=function(){controls.style.display="none"};exports.hideControls=hideControls;var showControls=function(){controls.style.display="block"};exports.showControls=showControls;var resetCanvas=function(e){fill(e)};exports.resetCanvas=resetCanvas,canvas&&(canvas.addEventListener("contextmenu",handleRightClick),hideControls()),jsColors.addEventListener("click",handleColor),jsMode.addEventListener("click",handleMode);

},{"./socket":7}],6:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleGameEnded=exports.handleGameNoti=exports.handleGameStart=exports.handleUserInfo=void 0;var _paint=require("./paint"),jsNotification=document.querySelector(".jsNotification"),handleUserInfo=function(e){return paintPlayer(e.sockets)};exports.handleUserInfo=handleUserInfo;var playBoard=document.querySelector(".player__board");function paintPlayer(e){playBoard.innerText="",e.forEach(function(e){var a=document.createElement("h3");a.innerText="".concat(e.username," : ").concat(e.score),playBoard.appendChild(a)})}var handleGameStart=function(){(0,_paint.disableCanvas)(),(0,_paint.hideControls)()};exports.handleGameStart=handleGameStart;var setNotification=function(e){jsNotification.innerText="",jsNotification.innerText=e},handleGameNoti=function(e){var a=e.gameWord;console.log("111"),(0,_paint.enableCanvas)(),(0,_paint.showControls)(),setNotification(" you are the painter, draw follwing word . . . ".concat(a))};exports.handleGameNoti=handleGameNoti;var handleGameEnded=function(){setNotification("game ENDED"),(0,_paint.disableCanvas)(),(0,_paint.hideControls)(),(0,_paint.resetCanvas)("#f2f2f2")};exports.handleGameEnded=handleGameEnded;

},{"./paint":5}],7:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSocket=exports.getSocket=void 0;var _chat=require("./chat"),_notification=require("./notification"),_paint=require("./paint"),_player=require("./player"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var initSocket=function(e){var t=window.events;(socket=e).on(t.newUser,_notification.handleUserNoti),socket.on(t.disconnected,_notification.handleDisconnected),socket.on(t.newMsg,_chat.handleNewMsg),socket.on(t.beganPath,_paint.handleBeganPath),socket.on(t.strokedPath,_paint.handleStrokePath),socket.on(t.filled,_paint.handleFilled),socket.on(t.playerUpdate,_player.handleUserInfo),socket.on(t.gameStart,_player.handleGameStart),socket.on(t.painterNoti,_player.handleGameNoti),socket.on(t.gameEnded,_player.handleGameEnded)};exports.initSocket=initSocket;

},{"./chat":1,"./notification":4,"./paint":5,"./player":6}]},{},[3]);
