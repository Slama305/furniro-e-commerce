import { createproduct, like, copyright, likeitem, subscriber } from "./products.js";

let arr = [];

fetch('productlist.json')
    .then(response => response.json())
    .then(products => {
        let arr2 = products[0].slice(16, -16);
        let arr3 = products[0].slice(32);
        products[0].length = 16;

        createproduct(document.getElementsByClassName("productjs")[0], products[0]);
        createproduct(document.getElementsByClassName("productjs")[1], arr2);
        createproduct(document.getElementsByClassName("productjs")[2], arr3);

        localStorage.setItem("hello", JSON.stringify(products[0]));
        localStorage.setItem("hello2", JSON.stringify(arr2));
        localStorage.setItem("hello3", JSON.stringify(arr3));
    })
    .catch(error => {
        console.error('Error fetching the product list:', error);
    });

    document.querySelector(".mylist").addEventListener("click", () => {
        document.querySelector(".mydivlist").classList.toggle("d-none");
    });


    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("sort") || e.target.parentElement.classList.contains("sort")) {
            document.querySelector(".myullet").classList.toggle("d-none");
        }
    });

document.querySelectorAll("*").forEach((e) => {
    e.addEventListener("click", (ee) => {    
        if (!ee.target.classList.contains("myfilter")) {
            document.querySelector(".mydivlist").classList.add("d-none");
        }
    });
});
document.querySelectorAll("*").forEach((e) => {
    e.addEventListener("click", (ee) => {    
        if (!ee.target.classList.contains("myfilter")) {
            document.querySelector(".myullet").classList.add("d-none");
        }
    });
});
let resetProducts = () => {
    let arr = JSON.parse(localStorage.getItem("hello"));
    let arr2 = JSON.parse(localStorage.getItem("hello2"));
    let arr3 = JSON.parse(localStorage.getItem("hello3"));

    let jsproduct = document.getElementsByClassName("productjs")[0];
    let jsproduct1 = document.getElementsByClassName("productjs")[1];
    let jsproduct2 = document.getElementsByClassName("productjs")[2];
    jsproduct.innerHTML = null;
    jsproduct1.innerHTML = null;
    jsproduct2.innerHTML = null;

    createproduct(jsproduct, arr);
    createproduct(jsproduct1, arr2);
    createproduct(jsproduct2, arr3);
    likeitem();

    // Remove active classes from sorting and filtering options
    document.querySelectorAll(".myul li").forEach((li) => li.classList.remove("active"));
    document.querySelectorAll(".myullet li").forEach((li) => li.classList.remove("active"));
};

let myfilter = () => {
    document.querySelectorAll(".myul li").forEach((e) => {
        e.classList.remove("active");
        e.addEventListener("click", function () {
            document.querySelectorAll(".myul li").forEach((e) => e.classList.remove("active"));
            e.classList.add("active");
            filterAndSort();
            setHeight("asgaardsofa.png", "316px", "63.5833px");
            setHeight("brown.png", "316px", "63.5833px"); 
        });
    });
};

let myfilteralpahapetically = () => {
    document.querySelectorAll(".myullet li").forEach((liElement) => {
        liElement.classList.remove("active");
        liElement.addEventListener("click", function () {
            document.querySelectorAll(".myullet li").forEach((e) => e.classList.remove("active"));
            liElement.classList.add("active");
            filterAndSort();
            setHeight("asgaardsofa.png", "316px", "63.5833px");
            setHeight("brown.png", "316px", "63.5833px"); 
        });
    });
};

let filterAndSort = () => {
    let filteredArr = JSON.parse(localStorage.getItem("hello"));
    let filteredArr2 = JSON.parse(localStorage.getItem("hello2"));
    let filteredArr3 = JSON.parse(localStorage.getItem("hello3"));

    let filterValue = document.querySelector(".myul li.active")?.innerText;
    let sortValue = document.querySelector(".myullet li.active")?.innerText.toLowerCase();

    if (filterValue && filterValue !== 'refresh') {
        filteredArr = filteredArr.filter((e) => e.price == filterValue);
        filteredArr2 = filteredArr2.filter((e) => e.price == filterValue);
        filteredArr3 = filteredArr3.filter((e) => e.price == filterValue);
    }

    if (sortValue) {
        switch (sortValue) {
            case "a-z":
                filteredArr.sort((a, b) => a.name.localeCompare(b.name));
                filteredArr2.sort((a, b) => a.name.localeCompare(b.name));
                filteredArr3.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "z-a":
                filteredArr.sort((a, b) => b.name.localeCompare(a.name));
                filteredArr2.sort((a, b) => b.name.localeCompare(a.name));
                filteredArr3.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "default":
                filteredArr = JSON.parse(localStorage.getItem("hello"));
                filteredArr2 = JSON.parse(localStorage.getItem("hello2"));
                filteredArr3 = JSON.parse(localStorage.getItem("hello3"));
                break;
        }
    }

    let jsproduct = document.getElementsByClassName("productjs")[0];
    let jsproduct1 = document.getElementsByClassName("productjs")[1];
    let jsproduct2 = document.getElementsByClassName("productjs")[2];
    jsproduct.innerHTML = null;
    jsproduct1.innerHTML = null;
    jsproduct2.innerHTML = null;

    createproduct(jsproduct, filteredArr);
    createproduct(jsproduct1, filteredArr2);
    createproduct(jsproduct2, filteredArr3);
    setHeight("asgaardsofa.png", "316px", "63.5833px");
    setHeight("brown.png", "316px", "63.5833px"); 
    likeitem();
};


setTimeout(() => {
document.addEventListener("click",()=>{
    document.querySelector(".show span").innerHTML=document.querySelectorAll(".cont").length
    document.querySelector(".myshow").innerHTML=document.querySelectorAll(".cont").length
})
}, 0);
document.querySelector(".myownfilter").addEventListener("click", () => {
    resetProducts();
});

myfilteralpahapetically();
myfilter();

like();
copyright();
subscriber();
likeitem();

    const setHeight = (imageName, height1, height2) => {
        // Select the image with the specified name
        const targetImage = document.querySelector(`img[src$='${imageName}']`);
        if (targetImage) {
            targetImage.style.height = height1;
            console.log(targetImage);
        }

        // Select the image with the specified name inside the ".dont" class
        const targetImage2 = document.querySelector(`.dont img[src$='${imageName}']`);
        if (targetImage2) {
            targetImage2.style.height = height2;
            console.log(targetImage2);
        }
    };


    setTimeout(() => {
        setHeight("asgaardsofa.png", "316px", "63.5833px");
        setHeight("brown.png", "316px", "63.5833px"); 
        }, 2000);

