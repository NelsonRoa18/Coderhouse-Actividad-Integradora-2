socket = io()

const listProducts = document.getElementById('productsRealTime')

const btnSend = document.getElementById('btn-send')

btnSend.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const availableChecked = document.getElementById('available');
    const available = availableChecked.checked;

    socket.emit('addProduct', { name, description, price, category, available});

})

socket.on('addProductsRealTime', products => {
    listProducts.innerHTML = ``;
    console.log(products);
    products.forEach(product => {
  
        const newProduct = document.createElement('li');
        const btnUpdate = document.createElement('button');
        const btnDelete = document.createElement('button');

        btnDelete.innerHTML = 'Eliminar';
        btnDelete.addEventListener('click', () => {
            socket.emit('deleteProduct', product._id)
            console.log(product._id);
        });
        btnUpdate.innerHTML = 'Modificar'; 
        btnUpdate.addEventListener('click',() => {

            console.log(product._id);
            socket.emit('updateProductPage', {url:'/update', id: product._id})
            
        });
        newProduct.innerHTML = `<strong>Title: </strong>${product.name}, <strong>Description: </strong>${product.description},
        <strong>Price: </strong>${product.price}, <strong>Code: </strong>${product.category},
        `;
        listProducts.appendChild(newProduct);
        listProducts.appendChild(btnDelete);
        listProducts.appendChild(btnUpdate)
    });
})

socket.on('redirect', (data) => {
    console.log(data);
    socket.emit('idProduct', data.id)
    window.location.href = data.url;


}) 