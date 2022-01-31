const socket = io();
btn = document.querySelector(".button");
console.log(name);
btn.addEventListener("click", (e) => {
  var ip = document.querySelector("input");
  var t = ip.value;
  if (ip) {
    ip.value = "";
    socket.emit("receive-msg", t, name);
    var msgsbox = document.querySelector(".msgs-box");
    msgsbox.innerHTML += `
            <div class="output-msg">
          ${t}
        </div>
    `;
  }
});

socket.on("send-msg", (t, userName) => {
  var msgsbox = document.querySelector(".msgs-box");
  msgsbox.innerHTML += `
            <div class="input-msg">
            <p class="name">
                ${userName}
            </p>
            <p>
                ${t}
            </p>
        </div>
    `;
});
