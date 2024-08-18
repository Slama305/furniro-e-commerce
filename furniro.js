import { createproduct,like,copyright,likeitem, subscriber } from "./products.js"


       
fetch('productlist.json')
    .then(response => response.json())
    .then(products => {
        products[0].length = 8;
        createproduct(document.getElementById("products-show"), products[0]);
    })
    .catch(error => {
        console.error('Error fetching the product list:', error);
    });
like()
copyright()
subscriber()
likeitem()