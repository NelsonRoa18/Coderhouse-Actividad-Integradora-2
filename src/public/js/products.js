socket = io()

const divProducts = document.getElementById('divProducts')
const listProducts = document.getElementById('products');

const limitDiv = document.getElementById('limitDiv');
const pageDiv = document.getElementById('pageDiv');
const queryDiv = document.getElementById('queryDiv');
const sortDiv = document.getElementById('sortDiv');


const btnAddCart = document.createElement('button');
const btnAply = document.createElement('button');



const limit = document.getElementById('limit')
const page = document.getElementById('page')
const query = document.getElementById('query')
const sort = document.getElementById('sort')

let divs = [limitDiv, pageDiv, queryDiv, sortDiv];

const sorteo = ["asc", "desc"]

const allCategorys = [];
sorteo.forEach(formToSort => {
    let option = document.createElement("option");
    option.value = formToSort;
    option.text = formToSort;
    sort.appendChild(option);

})

socket.on('allProducts', allProducts => {
    allProds = [...allProducts.docs];

    allProds.forEach(allP => {

        if (!allCategorys.includes(allP.category)) {
            let option = document.createElement("option");
            allCategorys.push(allP.category)
            option.value = allP.category;
            option.text = allP.category;
            query.appendChild(option);
        }

    })

    listProducts.innerHTML = ""
    allProds.forEach(prods => {
        const newProduct = document.createElement('li')
        const btnAddCart = document.createElement('button');

        btnAddCart.innerHTML = "Agregar al carrito";
        btnAddCart.addEventListener('click', () => {
            socket.emit('addProductToCart', prods._id)
        })
        newProduct.innerHTML = `<strong>Name: </strong>${prods.name}, <strong>Description: </strong>${prods.description},
        <strong>Price: </strong>${prods.price}, <strong>Category: </strong>${prods.category}, <strong>Available: </strong>${prods.available}`;
        listProducts.append(newProduct)
        listProducts.append(btnAddCart)
    })

    limit.value = 10;
    page.value = parseInt(allProducts.page);

})
socket.on('products', products => {
    console.log("recibiendo socket");
    prods = [...products.docs];
    console.log(prods);


    listProducts.innerHTML = "";
    prods.forEach(prods => {
        const newProduct = document.createElement('li')
        const btnAddCart = document.createElement('button');

        btnAddCart.innerHTML = "Agregar al carrito";
        btnAddCart.addEventListener('click', () => {
            socket.emit('addProductToCart', prods._id)
        })
        newProduct.innerHTML = `<strong>Name: </strong>${prods.name}, <strong>Description: </strong>${prods.description},
        <strong>Price: </strong>${prods.price}, <strong>Category: </strong>${prods.category}, <strong>Available: </strong>${prods.available}`;
        listProducts.append(newProduct)
        listProducts.append(btnAddCart)
    })

    limit.value = parseInt(products.limit);
    page.value = parseInt(products.page);

    const nextPage = products.nextPage;
    const backPage = products.backPage;




    const btnBack = document.getElementById('btnBack');
    btnBack.innerHTML = "Back Page";
    const newBtnBack = btnBack.cloneNode(true);
    btnBack.parentNode.replaceChild(newBtnBack, btnBack);

    if (backPage) {
        newBtnBack.disabled = false;
        newBtnBack.addEventListener('click', () => {
            console.log('click');
            const categorysValue = query.value;
            const sortValue = sort.value;
            const limitValue = parseInt(limit.value);
            socket.emit('dataToPaginate', { categorysValue, sortValue, limitValue, pageValue: backPage });
        });
    } else {
        newBtnBack.disabled = true;
    }
    
    const btnNext = document.getElementById('btnNext');
    btnNext.innerHTML = "Next Page";
    const newBtnNext = btnNext.cloneNode(true);
    btnNext.parentNode.replaceChild(newBtnNext, btnNext);

    if (nextPage) {
        newBtnNext.disabled = false;
        newBtnNext.addEventListener('click', () => {
            console.log('click');
            const categorysValue = query.value;
            const sortValue = sort.value;
            const limitValue = parseInt(limit.value);
            socket.emit('dataToPaginate', { categorysValue, sortValue, limitValue, pageValue: nextPage });
        });
    } else {
        newBtnNext.disabled = true;
    }
})

divs.forEach(div => {

    let btnAply = document.createElement('button');
    btnAply.innerHTML = "Aplicar";
    div.appendChild(btnAply)
    btnAply.addEventListener('click', () => {
        categorysValue = query.value;
        sortValue = sort.value;
        limitValue = parseInt(limit.value);
        pageValue = parseInt(page.value);

        socket.emit('dataToPaginate', { categorysValue, sortValue, limitValue, pageValue })
    })


})



