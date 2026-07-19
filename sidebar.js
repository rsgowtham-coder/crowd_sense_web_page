const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");

if(menuBtn){
    menuBtn.addEventListener("click",()=>{

        sidebar.classList.toggle("active");

    });
}

// Active Menu

const links=document.querySelectorAll(".menu li");

links.forEach(item=>{

    item.addEventListener("click",()=>{

        links.forEach(i=>i.classList.remove("active"));

        item.classList.add("active");

    });

});

// Dark Mode

const themeBtn=document.querySelector(".theme-btn");

if(themeBtn){

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

}