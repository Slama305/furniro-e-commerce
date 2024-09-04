import { likeitem } from "/products.js";
let products = JSON.parse(localStorage.getItem("myarr2")) || [];
console.log(products);
const stars = document.querySelectorAll('.stars input');
const stars2 = document.querySelectorAll('.stars2 input');
const ratingValue = document.getElementById('rating-value');
const ratingValue2 = document.getElementById('rating-value2');


document.addEventListener("DOMContentLoaded", () => {
    let productId = new URLSearchParams(window.location.search).get('id');
   
    document.addEventListener("click", (e) => {
        const productId2 = e.target.dataset.id;
        const product2 = products.find(p => p.id == productId2);
        
        if (product2) {
            const savedRating2 = JSON.parse(localStorage.getItem(`rate${product2.id}`));
            const ratingValue2 = document.getElementById('rating-value2');
            
            if (savedRating2 !== null) {
                ratingValue2.textContent = savedRating2;
                product2.rate = savedRating2;
                
                let vv = document.querySelectorAll(".stars2 label svg path");
                vv.forEach((path, index) => {
                    path.style.color = index < savedRating2 ? "#FFC700" : "lightgray";
                });
    
                localStorage.setItem("myarr2", JSON.stringify(products));
            } else {
                ratingValue2.textContent = 0;
                product2.rate = 0;
    
                // Change the color of the stars to gray if no rating
                let vv = document.querySelectorAll(".stars2 label svg path");
                vv.forEach((path) => {
                    path.style.color = "lightgray";
                });
    
                localStorage.setItem("myarr2", JSON.stringify(products));
            }
    
            // Update product image
            if (product2) {
                document.getElementById("product-imagee").src = product2.image;
            }
    
            // Update the star inputs
            const stars2 = document.querySelectorAll(".stars2 input[type='radio']");
            stars2.forEach(star => {
                star.checked = star.value == savedRating2;
            });
    
            // Handle star rating changes
            stars2.forEach((star) => {
                star.addEventListener('change', function () {
                    const selectedRating2 = this.value;
                    ratingValue2.textContent = selectedRating2;
                    product2.rate = selectedRating2;
                    localStorage.setItem(`rate${product2.id}`, JSON.stringify(selectedRating2));
                    localStorage.setItem("myarr2", JSON.stringify(products));
                    
                    // Update star colors
                    vv.forEach((path, index) => {
                        path.style.color = index < selectedRating2 ? "gold" : "gray";
                    });
                });
            });
        }
    });
    

   
    
    const ul = document.getElementById('item-list');
    products.forEach(item => {
        const li = document.createElement('li');
        li.setAttribute('data-id', item.id);
        if (item.rate == undefined) {
            item.rate=0
        }
        li.innerHTML=item.name
        li.id="myli"
        ul.appendChild(li);
      });

    if (productId && products) {
        let product = products.find(p => p.id == productId);

        
        
        if (product) {
            document.getElementById("product-image").src = product.image;
            console.log(localStorage.getItem(`rate${productId}`));
            


            const savedRating = localStorage.getItem(`rate${product.id}`);
            if (savedRating) {
                ratingValue.textContent = savedRating;
                product.rate = savedRating
                localStorage.setItem("myarr2",JSON.stringify(products))
                stars.forEach(star => {
                    if (star.value === savedRating) {
                        star.checked = true;
                    }
                });
            }
            stars.forEach((star) => {
                star.addEventListener('change', function() {
                    const selectedRating = product.rate;
                    
                    ratingValue.textContent = selectedRating;
                    localStorage.setItem(`rate${product.id}`, selectedRating);
                    localStorage.setItem("myarr2",JSON.stringify(products))
                });
            });

        }

    }



    likeitem();
});


document.querySelector("#proudctsname").onclick = () =>{
    document.querySelector("#item-list").classList.toggle("d-none")
}
document.querySelector("*").addEventListener("click",(e)=>{
        if (e.target.id != "proudctsname") {
            if (e.target.id != "myli") {
    document.querySelector("#item-list").classList.add("d-none")
            }
        }
})