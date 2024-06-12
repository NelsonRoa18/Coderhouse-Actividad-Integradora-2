const socket = io()

function enviarMensaje() {
    const user = document.getElementById('user').value;
    const message = document.getElementById('mensaje').value
    socket.emit('addMensaje', {user, message})
}

const boton = document.getElementById('btn-send')
boton.addEventListener('click', () => {
    console.log('click en boton')
})

const chat = document.getElementById('chats');

socket.on('mensaje', chats => {
 
    chat.innerHTML = ""

    chats.forEach(message => {
        const newMessage = document.createElement('p')
        newMessage.innerHTML = `${message.user} escribio ${message.message}<br>`
        chat.appendChild(newMessage);
    });

})