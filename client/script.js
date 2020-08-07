const server = new WebSocket('ws://localhost:9876/websocket');

const messages = document.getElementById('messages');
const input = document.getElementById('message');
const button = document.getElementById('send');

button.disabled = true;
button.addEventListener('click', sendMessage, false);

function sendMessage() {
    const text = input.value;
    generateEntryMessage(text, 'client')
    server.send(text);
}   

server.onopen = function() {
    button.disabled = false;
}

server.onmessage = function(event) {
    const { data } = event;
    generateEntryMessage(data, 'Server');
}

function generateEntryMessage(mgs, type) {
    const newMessage = document.createElement('div');
    newMessage.innerText = `${type} says ${mgs}`;
    messages.appendChild(newMessage);
}