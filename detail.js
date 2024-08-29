import { subscriber, copyright, like, likeitem } from "/products.js";
like();
subscriber();
copyright();

document.addEventListener("DOMContentLoaded", () => {
    let productId = new URLSearchParams(window.location.search).get('id');
    let products = JSON.parse(localStorage.getItem("myarr"));
    
    if (productId && products) {
        let product = products.find(p => p.id == productId);

        if (product) {
            document.getElementById("product-image").src = product.image;
            document.getElementById("product-image").style.width="410px"
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("product-price").textContent = `$${product.price}`;
            document.querySelector(".plus").setAttribute("data-id", productId);
            document.querySelector(".minus").setAttribute("data-id", productId);
            document.querySelector(".one img").src=product.image1
            document.querySelector(".two img").src=product.image2
            document.querySelector(".three img").src=product.image3
            document.querySelector(".four img").src=product.image4
            document.getElementById("add-to-cart").onclick = () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let existingProduct = cart.find(p => p.productid == product.id);

                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ productid: product.id, quantity: 1 });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartQuantity(product.id);
                location.reload()
            };
        }
    }

    if (productId <= 4) {
        products.length = 5;
    }
    
    let listproduct = document.querySelector(".similar .row");
    products.length = 8;
    products.filter((e) => e.id != productId).forEach((product) => {
        let newproduct = document.createElement("div");
        newproduct.classList.add("col-md-6", "col-lg-4", "col-hey");
        newproduct.innerHTML = `<div class="cont">
                                    <div class="innercontent">
                                        <a href="detail.html?id=${product.id}">
                                            <img width="100%" class="img-fluid" src=${product.image} alt="">
                                        </a>
                                    </div>
                                    <div class="des">
                                        <h4 class="fw-bold">${product.name}</h4>
                                        <p class="text-black-50">${product.des}</p>
                                        <div style="font-weight: 700;">Rp ${product.price}.000</div>
                                    </div>
                                    <div class="lay d-grid align-items-center">
                                        <div class="text-center">
                                            <button class="addbutton mb-5" data-id=${product.id}>Add To Cart</button>
                                            <div class="d-flex justify-content-center">
                                                <a class="text-white fw-bold" href="">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92"/></svg> Share
                                                </a>
                                                <a class="mx-2 text-white fw-bold" href="/detail.html?id=${product.id}">
                                                    <img class="img-fluid" width="25" src="images/compare.svg"> Compare
                                                </a>
                                                <a class="text-white fw-bold likex" href="">
                                                    <svg class="likesvgitem" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                                        <path class="pathsvgitem" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"/>
                                                    </svg> Like
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        listproduct.appendChild(newproduct);
    });

    likeitem();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart.find(p => p.productid == productId);

    if (cartItem) {
        document.querySelector(".q").textContent = cartItem.quantity;
    }
    // Function to update the cart quantity in the UI
    function updateCartQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItem = cart.find(p => p.productid == productId);

        if (cartItem) {
            document.querySelector(".q").textContent = cartItem.quantity;
        }
    }

    // Event listeners for plus and minus buttons
    document.querySelector(".plus").addEventListener("click", () => {
        updateProductQuantity(productId, 1);
    });

    document.querySelector(".minus").addEventListener("click", () => {
        updateProductQuantity(productId, -1);
    });

    // Function to update product quantity in the cart
    function updateProductQuantity(productId, change) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartItem = cart.find(p => p.productid == productId);

        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity < 0) {
                cart = cart.filter(p => p.productid != productId); // Remove item if quantity is 0 or less
            }
        } else if (change > 0) {
            cart.push({ productid: productId, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartQuantity(productId);
    }
});

    document.querySelectorAll(".ph").forEach((e)=>{
        e.addEventListener("click",(ee)=>{
            document.querySelector("#product-image").src=ee.target.src
        })
    })

    document.addEventListener("DOMContentLoaded", () => {
        const projectLink = encodeURIComponent(window.location.href);
        const projectTitle = encodeURIComponent("Check out this project!");
    
        document.querySelectorAll(".share-icon").forEach(icon => {
            icon.addEventListener("click", (e) => {
                let shareUrl = "";
    
                if (icon.classList.contains("twitter")) {
                    shareUrl = `https://twitter.com/intent/tweet?url=${projectLink}&text=${projectTitle}`;
                } else if (icon.classList.contains("linkedin")) {
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${projectLink}&title=${projectTitle}`;
                } else if (icon.classList.contains("facebook")) {
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${projectLink}`;
                } else if (icon.classList.contains("whatsapp")) {
                    const projectLink = "http://127.0.0.1:5500/detail.html"; // Example project link
                    shareUrl = `https://api.whatsapp.com/send?text=${projectLink}`;
                }
                
    
                if (shareUrl) {
                    window.open(shareUrl, "_blank", "width=600,height=400");
                }
            });
        });
    });
    
    