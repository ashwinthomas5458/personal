window.addEventListener('load', ()=>{
    if(window.innerWidth>767){
        loaderFade();
        // activateTesseract();
        cardAnime();
    }
    else{
        loaderRemove();
    }
    worksSlider();
    scrollListeners();
});

const loaderRemove=()=>{
    const coverText = document.querySelector('.t-text');
    const body = document.querySelector('.t-body');
    const tesseractWrapper = document.querySelector('.t-tesseract-wrapper');
    const tesseract = document.querySelector('.tesseract');
    const navBar = document.querySelector('.t-navBar');

    tesseractWrapper.classList.add('t-nav-fade');
    navBar.classList.remove('t-nav-fade');
    setTimeout(()=>{
        tesseractWrapper.classList.add('d-none');
        coverText.classList.remove('d-none');
    },600);
    setTimeout(()=>{
        coverText.classList.remove('t-cover-scroll');
        body.classList.remove('position-fixed');
        tesseract.classList.remove('tesseractAnime');
    },700);
}

const loaderFade=()=>{
    const coverText = document.querySelector('.t-text');
    const body = document.querySelector('.t-body');
    const tesseractWrapper = document.querySelector('.t-tesseract-wrapper');
    const tesseract = document.querySelector('.tesseract');
    const navBar = document.querySelector('.t-navBar');

    coverText.classList.remove('d-none');
    tesseractWrapper.classList.remove('container');
    setTimeout(()=>{
        coverText.classList.remove('t-cover-scroll');
        navBar.classList.remove('t-nav-fade');
        body.classList.remove('position-fixed');
        tesseract.classList.remove('tesseractAnime');
    },300);
    setTimeout(()=>{
        tesseract.classList.add('tesseractPosition');
        tesseractAnime();
    },1000);
}

// const activateTesseract=()=>{
//     const cover = document.querySelector('.t-cover');
//     let tesseract = document.createElement('div');
//     tesseract.classList.add('t-tesseract-wrapper', 'position-relative');
//     tesseract.innerHTML = `<div class="position-absolute t-tesseract-glow"></div>
//         <div class="tesseract">
//             <div class="t-outer-cube">
//                 <div class="top"></div>
//                 <div class="front"></div>
//                 <div class="back"></div>
//                 <div class="right"></div>
//                 <div class="left"></div>
//                 <div class="bottom"></div> 
//             </div>
//             <div class="t-inner-cube">
//                 <div class="top"></div>
//                 <div class="front"></div>
//                 <div class="back"></div>
//                 <div class="right"></div>
//                 <div class="left"></div>
//                 <div class="bottom"></div> 
//             </div>
//         </div>`;
//     cover.appendChild(tesseract);
     
//     tesseractAnime(); 
// }

function tesseractAnime(){
    const tesseractWrapper = document.querySelector('.t-tesseract-wrapper');
    const tesseract = document.querySelector('.tesseract');

    tesseractWrapper.addEventListener("mousemove", (event)=> {
        const wrapperWidth = tesseractWrapper.offsetWidth;
        const wrapperHeight = tesseractWrapper.offsetHeight;
        const centerX = tesseractWrapper.offsetLeft + wrapperWidth / 2;
        const centerY = tesseractWrapper.getBoundingClientRect().top + wrapperHeight / 2;
        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;
        const rotateX = (-1) * 10 * mouseY / (wrapperHeight / 2);
        const rotateY =  10 * mouseX / (wrapperWidth / 2);
        tesseract.style.transform = `rotateX(${-6+rotateX*4}deg) rotateY(${20+rotateY*4}deg) `;
    });

    tesseractWrapper.addEventListener("mouseleave", (e)=>{
        tesseract.style.transform=`rotateX(-6deg) rotateY(20deg) `;
    });
}

const worksSlider = ()=>{
    const carousel = document.querySelector('.t-works-carousel');
    const leftBtn = document.querySelector('.t-left-btn');
    const rightBtn = document.querySelector('.t-right-btn');
    const cards = document.querySelectorAll('.t-works-card-wrapper');

    let counter = 1;
    let margin = 30;
    const size = carousel.children[0].clientWidth+margin;
    const offset = -((size+(carousel.children[1].clientWidth+margin)/2)-window.innerWidth/2);
    carousel.style.transform = `translateX(${(offset-(size*(counter-1)))}px)`;

    leftBtn.addEventListener('click', ()=>{
        if(counter<1) return;
        if(window.innerWidth>767) removeCardAnime();
        carousel.style.transition = `transform 0.5s ease-in-out`;
        if(window.innerWidth<575) carousel.style.transition = `transform 0.7s ease-in-out`;
        cards[counter].classList.remove('t-card-active');
        counter = counter-1;
        cards.forEach(card=>{
            card.classList.add('t-card-inactive');
            card.removeAttribute("href");
        });
        carousel.style.transform = `translateX(${(offset-(size*(counter-1)))}px)`;
    });

    rightBtn.addEventListener('click', ()=>{
        if(counter>3) return;
        if(window.innerWidth>767) removeCardAnime();
        carousel.style.transition = `transform 0.5s ease-in-out`;
        if(window.innerWidth<575) carousel.style.transition = `transform 0.7s ease-in-out`;
        cards[counter].classList.remove('t-card-active');
        counter = counter+1;
        cards.forEach(card=>{
            card.classList.add('t-card-inactive');
            card.removeAttribute("href");
        });
        carousel.style.transform = `translateX(${(offset-(size*(counter-1)))}px)`;
    });

    
    cards.forEach((card, i)=>{
        card.addEventListener('click',()=>{
            if(card.classList.contains('t-card-inactive')){
                if(window.innerWidth>767) removeCardAnime();
                carousel.style.transition = `transform 0.5s ease-in-out`;
                cards[counter].classList.remove('t-card-active');
                counter = i;
                cards.forEach(card=>{
                    card.classList.add('t-card-inactive');
                    card.removeAttribute("href");
                });
                carousel.style.transform = `translateX(${(offset-(size*(counter-1)))}px)`;
            }
        })
    })

    carousel.addEventListener('transitionend', ()=>{
        if(counter==0){
            carousel.style.transition = "none";
            counter = 3;
            carousel.style.transform = `translateX(${(offset-(size*(counter-1)))}px)`;
            cards[counter].classList.remove('t-card-inactive');
            cards[counter].classList.add('t-card-active');
            const location = cards[counter].dataset.target;
            cards[counter].href=location;
            if(window.innerWidth>767) cardAnime();
        }
        else if(counter==4){
            carousel.style.transition = "none";
            counter = 1;
            carousel.style.transform = `translateX(${(offset-(size*(counter-1)))}px)`;
            cards[counter].classList.remove('t-card-inactive');
            cards[counter].classList.add('t-card-active');
            const location = cards[counter].dataset.target;
            cards[counter].href=location;
            if(window.innerWidth>767) cardAnime();
        }
        else{
            cards[counter].classList.remove('t-card-inactive');
            cards[counter].classList.add('t-card-active');
            const location = cards[counter].dataset.target;
            cards[counter].href=location;
            if(window.innerWidth>767) cardAnime();
        }
    });
}

const cardAnime = ()=>{
    const activeCard = document.querySelector('.t-card-active');
    activeCard.addEventListener("mousemove", activeCardMouseMove);
    activeCard.addEventListener("mouseleave", activeCardMouseLeave);
}

const removeCardAnime=()=>{
    const activeCard = document.querySelector('.t-card-active');
    activeCard.removeEventListener("mousemove", activeCardMouseMove);
    activeCard.removeEventListener("mouseleave", activeCardMouseLeave);
}

function activeCardMouseMove(event){
    const activeCard = document.querySelector('.t-card-active');
    const cardImages = activeCard.querySelector('.t-mockup-image');
    const cardImagesSmall = activeCard.querySelector('.t-mockup-image-small');
    const cardElement = activeCard.children[0];

    const wrapperWidth = activeCard.offsetWidth;
    const wrapperHeight = activeCard.offsetHeight;
    const centerX = activeCard.getBoundingClientRect().left + wrapperWidth / 2;
    const centerY = activeCard.getBoundingClientRect().top + wrapperHeight / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    console.log(wrapperWidth, wrapperHeight, centerX, centerY, event.clientX, event.clientY);
    const rotateX = (-1) * mouseY / (wrapperHeight / 2);
    const rotateY = mouseX / (wrapperWidth / 2);
    cardElement.style.transform = `rotateX(${rotateX*2}deg) rotateY(${rotateY}deg) `;
    cardImages.style.transform = `rotateX(${-rotateX}deg) rotateY(${-rotateY*0.5}deg) translateZ(20px)`;
    cardImagesSmall.style.transform = `rotateX(${-rotateX}deg) rotateY(${-rotateY*0.5}deg) translateZ(30px)`;
}

function activeCardMouseLeave(e){
    const activeCard = document.querySelector('.t-card-active');
    const cardImages = activeCard.querySelector('.t-mockup-image');
    const cardImagesSmall = activeCard.querySelector('.t-mockup-image-small');
    const cardElement = activeCard.children[0];

    cardElement.style.transform=`rotateX(0deg) rotateY(0deg) `;
    cardImages.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(20px)`;
    cardImagesSmall.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(30px)`;
}

const navbarActive=()=>{
    var screenposition=window.innerHeight/3;
    const navbar=document.querySelector('.t-navBar');

    if(window.pageYOffset<screenposition) navbar.classList.remove('t-navbaractive');
    else if(window.pageYOffset>screenposition) navbar.classList.add('t-navbaractive');
}

const appearOnScroll=(object, translateClass)=>{
    var objects=document.querySelectorAll(object);
    var screenposition=window.innerHeight/1.2;
    objects.forEach(obj =>{
        var objposition=obj.getBoundingClientRect().top;
        if(objposition<screenposition){
            obj.classList.remove(translateClass);
        }
        if(objposition>window.innerHeight){
            obj.classList.add(translateClass);
        }
    })
}

const scrollListeners=()=>{
    window.addEventListener('scroll', (e)=>{
        navbarActive();
        appearOnScroll('.t-translate-normal', 't-translate-down');
        appearOnScroll('.t-sketch', 't-sketch-translate-down');
        appearOnScroll('.t-sketch-bg', 't-sketch-bg-translate-down');
    })
}
