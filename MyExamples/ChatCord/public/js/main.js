//we have access to io bc we have access bc of script tag we added in chat.html
const socket = io(); 

//now we need to grab some elements from the dom
const chatForm = document.getElementById('chat-form');

//this is the client side in main.js
socket.on('message',message => {
    console.log(message);
    outputMessage(message);

});


//create event listener for submit message of that form
chatForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    // console.log(msg);
    socket.emit('chatMessage',msg);
});

//output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `	<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p`;
    document.querySelector('.chat-messages').appendChild(div);
}