socket = io()


const btnSend = document.getElementById('btn-send-update')
const btnVolver = document.getElementById('btn-back')


btnSend.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const availableChecked = document.getElementById('available');
    const available = availableChecked.checked;

    socket.emit('addProduct', { name, description, price, category, available});


    console.log('botontocado');
})

btnVolver.addEventListener('click', () => {
    socket.emit('addProductsRealTime', {url:'/addproducts'})
})

socket.on('redirect', (data) => {
    console.log(data);
    window.location.href = data.url;
}) 