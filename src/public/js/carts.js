socket = io()

const listProducts = document.getElementById('products')
const divButtons = document.getElementById('buttons')
const btnEmpty = document.createElement('button');


function appendProduct(product) {
    console.log(product);
    const newProduct = document.createElement('li')
    const btnDelete = document.createElement('button');

    btnDelete.innerHTML = "Borrar";
    btnDelete.addEventListener('click', () => {
        socket.emit('deleteProductToCart', product.productId._id)
        console.log(product._id);
    });
    newProduct.innerHTML = `<strong>Name: </strong>${product.productId.name}, <strong>Description: </strong>${product.productId.description},
    <strong>Price: </strong>${product.productId.price}, <strong>Category: </strong>${product.productId.category}, <strong>Available: </strong>${product.productId.available}`;
    listProducts.append(newProduct)
    listProducts.append(btnDelete)
}



socket.on('productsCart', products => {

    console.log(products);

    btnEmpty.innerHTML = "Vaciar Carrito";
    for (let product = 0; product < products.length; product++) {
        const idCart = products[product];    
        btnEmpty.addEventListener('click', () => {
            socket.emit('emptyCart', idCart)})
    }
    
    divButtons.append(btnEmpty);
    listProducts.innerHTML = ""

    products.forEach(product => {

        product.products.forEach(element => {
            const {productId, _id} = element
            console.log();
            appendProduct(element);
        });
        
    });


})
