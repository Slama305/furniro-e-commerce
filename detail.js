import {subscriber,copyright,like} from "/products.js"
like()
subscriber()
copyright()

document.addEventListener("DOMContentLoaded", () => {
    let productId = new URLSearchParams(window.location.search).get('id');
    let products = JSON.parse(localStorage.getItem("myarr"));
    
    if (productId && products) {
        let product = products.find(p => p.id == productId);

        if (product) {
            document.getElementById("product-image").src = product.image;
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("product-price").textContent = `$${product.price}`;
            
            document.getElementById("add-to-cart").onclick = () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let existingProduct = cart.find(p => p.productid == product.id);

                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ productid: product.id, quantity: 1 });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
            };
        }
    }

let listproduct = document.querySelector(".similar .row")
products.length=8
products.filter((e) => e.id != productId).forEach((product)=>{
let newproduct = document.createElement("div")
newproduct.classList.add("col-lg-3")
newproduct.classList.add("col-md-6")
newproduct.innerHTML=`    
    <div>
        <div class="cont">
            <div class="innercontent">
            <a href="/detail.html?id=${product.id}">
            <img class="img-fluid" src=${product.image}></a> 
            </div>
            <div class="des">
            <h2>${product.name}</h2>
            <p class="price text-black-50">${product.price}</p>
            <div style="font-weight: 700;"></div>
            <button class="addcart" data-id=${product.id}>Add To Cart</button>
            </div>
        </div>
    </div>
    `;
listproduct.appendChild(newproduct)
})
});

