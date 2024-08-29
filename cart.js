import {like,copyright,subscriber} from '/products.js'
like()
subscriber()
copyright()

document.querySelector(".myhome").addEventListener("click",(e)=>{
    e.preventDefault()  
    document.querySelector(".going").classList.add("hello")      
        e.target.classList.toggle("go")
        document.querySelector(".nxt").classList.add("go2")
        
    setTimeout(() => {
    location.assign("furniro.html")
    }, 3000);
    console.log(e.target);
    
})