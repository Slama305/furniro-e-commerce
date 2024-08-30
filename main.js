// like
function like() {
    let like = document.getElementById("heart")
    let likesvg = document.querySelector(".likesvg .pathsvg")
if (localStorage.getItem("color")) {
    like.classList.add(localStorage.getItem("color"))
    likesvg.setAttribute("fill",localStorage.getItem("fill"))
}

like.addEventListener("click",()=>{
    like.classList.toggle("red")
    if (like.classList.contains("red")) {
        likesvg.setAttribute("fill","currentColor")
        localStorage.setItem("color","red")
        localStorage.setItem("fill","currentColor")
    }else{
        localStorage.setItem("color","black")
        likesvg.setAttribute("fill","none")
        localStorage.setItem("fill","none")
    }
})
}

// copy right 
let copyright = () =>{
let date = new Date()
document.getElementById("copyright").innerHTML=`<span>${date.getFullYear()}</span>`
}
//subscribe
let subscriber = () => {
    let vali = document.querySelector(".vali");
    let sub = document.querySelector(".subscribe");
    let myemail = document.querySelector(".myemail");
    
    let arr = JSON.parse(localStorage.getItem("mails")) || [];
    
    let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (localStorage.getItem("mails")) {
        vali.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-PersonCheck">
            <circle cx="12" cy="7" r="5"/>
            <path d="M17 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"/>
            <path d="M17 16.5l1.5 1.5 2.5-3"/>
        </svg>
    `;
    sub.innerHTML="Subscribed"
    myemail.disabled = true
    }
    let handleSubscription = () => {
        if (emailregex.test(myemail.value) && myemail.value !== "") {
            vali.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ai ai-PersonCheck">
                    <circle cx="12" cy="7" r="5"/>
                    <path d="M17 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7"/>
                    <path d="M17 16.5l1.5 1.5 2.5-3"/>
                </svg>
            `;
            sub.innerHTML="Subscribed"
            arr.push(myemail.value);
            localStorage.setItem("mails", JSON.stringify([...new Set(arr)]));
    
            myemail.value = "";
            myemail.disabled = true
    
            // console.log(arr);
        }
    };
    sub.addEventListener("click", handleSubscription);
    
    if (sub.innerHTML=="Subscribed") {
        sub.onclick=()=>{
            localStorage.clear()
            location.reload()
        }
    }
    
    // console.log(arr);
    
    
    }
    
    
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