document.querySelectorAll(".icon-cart").forEach(e => {
  e.onclick = () => {
    document.querySelectorAll("#listcardparent").forEach(listCard => {
      listCard.classList.toggle("disp");
    });
    document.querySelectorAll(".page").forEach(page => {
      page.classList.toggle("darken");
    });
  };
});

document.querySelector(".closing").onclick = () => {
  document.querySelector("#listcardparent").classList.toggle("disp")
  document.querySelector(".page").classList.toggle("darken")
};





let cart = [];
let myArray = [];


async function fetchData() {
  try {
    let response = await fetch("productlist.json");
    let data = await response.json();
    myArray = data[0];
    localStorage.setItem("myarr", JSON.stringify(myArray)); 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


fetchData();

function getProductData() {
  let storedProducts = localStorage.getItem("myarr");
  return storedProducts ? JSON.parse(storedProducts) : [];
}

function getCartData() {
  let storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}


let addtocart = (idproduct, quantity, position, price) => {
  if (quantity > 0) {
    if (position < 0) {
      let product = myArray.find(value => value.id == idproduct);
      price = product ? product.price : 0;  
      cart.push({
        productid: idproduct,
        quantity: quantity,
        price: price,
      });
    } else {
      cart[position].quantity = quantity;
    }
  } else {
    if (position >= 0) {
      cart.splice(position, 1);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart)); 
  refreshcart();
};

let refreshcart = () => {
  let listcart = document.querySelector("#listcard");
  let tot = document.querySelector(".icon-cart span");
  let totq = 0;
  let finalreset = 0;

  listcart.innerHTML = null;
  cart.forEach(item => {
    finalreset += (item.price * item.quantity)
    localStorage.setItem("finalreset",JSON.stringify(finalreset))
    totq += item.quantity;
    let position = myArray.findIndex(value => value.id == item.productid);
    let info = myArray[position]; 
    let newitem = document.createElement("div");
    newitem.classList.add("item");
    newitem.classList.add("dont");    
    newitem.innerHTML = `
 <div class="myitem d-flex justify-content-between align-items-center px-2 dont">
    <div class="image dont">
        <a class="dont" href="/detail.html?id=${info.id}">
          <img class="dont" src="${info.image || ''}"alt="">
        </a>
      </div>
      <div class="mx-4 dont">
        <div class="dont name mb-2">${info.name || 'Unknown'}</div>
        <div class="dont">
            ${item.quantity} x <span class="dont" style="color:var(--primary);">rs ${info.price * item.quantity}.00</span>
        </div>
      </div>
      <div class="dont">
        <img data-id=${info.id} class="deleteitem dont ms-4" style="width:20px; cursor:pointer;" src="images/x.png">
      </div>
</div>
    `
if (window.location.pathname == "/cart.html") {
      newitem.innerHTML = `
    <div class="myitem">
    <div class="image">
    <a href="/detail.html?id=${info.id}">
    <img src="${info.image || ''}"alt="">
    </a>
      </div>
        <div class="name mb-2">${info.name || 'Unknown'}</div>
        <div class="quantity">
          Rs  ${item.price}
        </div>
        <div class="price">
            ${item.quantity}
        </div>
        <div class="quantity">
            ${item.price * item.quantity}
        </div>
      
      <div>
        <img data-id=${info.id} class="deleteitem mt-3" style="width:20px; cursor:pointer;" src="images/basket.png">
      </div>
</div>
    `
    }
    if(window.location.pathname == "/checkout.html") {
  document.querySelector(".subtotal").innerHTML=`<span class="ms-5">Rs ${finalreset}</span>`
    newitem.classList="";
      newitem.innerHTML = 
      `
      <div class="d-flex fs-7 justify-content-between">
      <div  class="text-black-50 ms-3 mb-3 w-50">${info.name}  <span class="text-dark"> <span class="mx-2">x</span> ${item.quantity}</span></div>
      <div class="w-50 me-3"> ${item.price * item.quantity},000,00</div>
      </div>
      
      `
    }

    ;
    listcart.appendChild(newitem);
  });
  tot.innerText = totq;
  document.querySelector(".subtotal").innerHTML=`Subtotal : <span class="ms-5 fw-bold" style="color: var(--primary);">Rs ${finalreset},000.00</span>`
  document.querySelector(".total").innerHTML=`Total : <span style="color:var(--primary);" class="ms-5 mt-5 fs-5">Rs ${finalreset},00.00</span>`
  if(window.location.pathname == "/checkout.html") {
    document.querySelector(".subtotal").innerHTML=`<span>Rs ${finalreset},000.00</span>`
    document.querySelector(".total").innerHTML=` <span style="color:var(--primary);" class="fw-bold me-2 mt-5 fs-4">Rs ${finalreset},000.00</span>`
    
    }
};


document.addEventListener("click", (e) => {
  let buttonclick = e.target;
  let idproduct = e.target.dataset.id;
  let position = cart.findIndex(value => value.productid == idproduct);
  let quantity = position < 0 ? 0 : cart[position].quantity;
  let price = position < 0 ? 0 : cart[position].price; 

  if (buttonclick.classList.contains("addbutton") || buttonclick.classList.contains("plus") || buttonclick.classList.contains("addcart")) {
    quantity = quantity ? quantity + 1 : 1; 
    addtocart(idproduct, quantity, position, price);
    setTimeout(() => {
      setHeight("asgaardsofa.png", "316px", "63.5833px");
      setHeight("brown.png", "316px", "63.5833px"); 
    if (location.pathname == "/detail.html") {
      setHeight("asgaardsofa.png", "", "63.5833px");
      setHeight("brown.png", "", "63.5833px"); 
    }
    if (location.pathname == "/cart.html") {
      setHeight("asgaardsofa.png", "", "73.93333px");
      setHeight("brown.png", "", "73.93333px"); 
    }
      }, 2000);
    
  } else if (buttonclick.classList.contains("minus")) {
    quantity = quantity ? quantity - 1 : 0; 
    addtocart(idproduct, quantity, position, price);
  } else if (buttonclick.classList.contains("deleteitem")) {
    quantity = 0; 
    addtocart(idproduct, quantity, position, price);
  }
});

let initapp = () => {
  cart = getCartData(); 
  myArray = getProductData();
  refreshcart();
};

initapp();
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};
scrollToTopBtn.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

let carting = () => {
  location.assign("cart.html");
};

let checkout = () => {
  location.assign("checkout.html");
};


if (location.pathname != "/checkout.html") {
  document.querySelectorAll("*").forEach((e)=>{
    e.addEventListener("click",(ee)=>{    
    if ((!ee.target.parentElement.parentElement.classList.contains("icon-cart")) && (document.querySelector("#listcardparent").classList.contains("disp")) && !ee.target.classList.contains("dont")) {
        document.querySelector("#listcardparent").classList.remove("disp")
        document.querySelector(".page").classList.remove("darken")
      }
    })
  })
}

const setHeight = (imageName, height1, height2) => {
  // Select the image with the specified name
  const targetImage = document.querySelector(`img[src$='${imageName}']`);
  if (targetImage) {
      targetImage.style.height = height1;
     
  }

  // Select the image with the specified name inside the ".dont" class
  const targetImage2 = document.querySelector(`.dont img[src$='${imageName}']`);
  if (targetImage2) {
      targetImage2.style.height = height2;
  }
};


setTimeout(() => {
  setHeight("asgaardsofa.png", "316px", "63.5833px");
  setHeight("brown.png", "316px", "63.5833px"); 
if (location.pathname == "/detail.html") {
  setHeight("asgaardsofa.png", "", "63.5833px");
  setHeight("brown.png", "", "63.5833px"); 
}
if (location.pathname == "/cart.html") {
  setHeight("asgaardsofa.png", "", "73.93333px");
  setHeight("brown.png", "", "73.93333px"); 
}
  }, 2000);

