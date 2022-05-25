let textHoverRefresh = false;

function activeCardMouseMove(i, event){
    const activeCards = document.querySelectorAll('.t-card-active');
    const activeCard = activeCards[i]

    const cardImages = activeCard.querySelector('.t-mockup-image');
    const cardImagesSmall = activeCard.querySelector('.t-mockup-image-small');
    const cardElement = activeCard.children[0];

    const wrapperWidth = activeCard.offsetWidth;
    const wrapperHeight = activeCard.offsetHeight;
    const centerX = activeCard.getBoundingClientRect().left + wrapperWidth / 2;
    const centerY = activeCard.getBoundingClientRect().top + wrapperHeight / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateX = (-1) * mouseY / (wrapperHeight / 2);
    const rotateY = mouseX / (wrapperWidth / 2);
    cardElement.style.transform = `rotateX(${rotateX*2}deg) rotateY(${rotateY}deg) `;
    cardImages.style.transform = `rotateX(${-rotateX}deg) rotateY(${-rotateY*0.5}deg) translateZ(20px)`;
    cardImagesSmall.style.transform = `rotateX(${-rotateX}deg) rotateY(${-rotateY*0.5}deg) translateZ(30px)`;
}

function activeCardMouseLeave(i, e){
    const activeCards = document.querySelectorAll('.t-card-active');
    const activeCard = activeCards[i]
    
    const cardImages = activeCard.querySelector('.t-mockup-image');
    const cardImagesSmall = activeCard.querySelector('.t-mockup-image-small');
    const cardElement = activeCard.children[0];

    cardElement.style.transform=`rotateX(0deg) rotateY(0deg) `;
    cardImages.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(20px)`;
    cardImagesSmall.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(30px)`;
}

const replaceImages=()=>{
    const mockups = document.querySelectorAll(".i-responsive-img");
    mockups.forEach(mockup=>{
        let currentSrc = mockup.src;
        let newSrc="";
        newSrc = currentSrc.replace("SM", "LG");
        mockup.src = newSrc;
    });
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

const navItemClick = ()=>{
    let navLink = document.querySelectorAll('.t-nav-item-link');

    navLink.forEach(link=>{
        link.addEventListener('click',()=>{
            let targetId = link.dataset.navTarget; 
            let targetItem = document.querySelector(`#${targetId}`);
            window.scrollTo(0, targetItem.offsetTop);
        });
    });
}

function tesseractAnime(){
    const coverWrapper = document.querySelector('.t-cover-wrapper');
    const tesseract = document.querySelector('.tesseract');

    coverWrapper.addEventListener("mousemove", (event)=> {
        const wrapperWidth = coverWrapper.offsetWidth;
        const wrapperHeight = coverWrapper.offsetHeight;
        const centerX = coverWrapper.offsetLeft + wrapperWidth / 2;
        const centerY = coverWrapper.getBoundingClientRect().top + wrapperHeight / 2;
        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;
        const rotateX = (-1) * 10 * mouseY / (wrapperHeight / 2);
        const rotateY =  10 * mouseX / (wrapperWidth / 2);
        tesseract.style.transform = `rotateX(${-6+rotateX*4}deg) rotateY(${20+rotateY*4}deg) `;
    });

    coverWrapper.addEventListener("mouseleave", (e)=>{
        tesseract.style.transform=`rotateX(-6deg) rotateY(20deg) `;
    });
}

const cardAnime = ()=>{
    const activeCards = document.querySelectorAll('.t-card-active');
    activeCards.forEach((activeCard, i)=>{
        activeCard.addEventListener("mousemove", e=> activeCardMouseMove(i, e));
        activeCard.addEventListener("mouseleave", e=> activeCardMouseLeave(i, e));
    });
}

const loaderRemove=()=>{
    const coverText = document.querySelector('.t-text');
    const body = document.querySelector('.t-body');
    const tesseractWrapper = document.querySelector('.t-tesseract-wrapper');
    const tesseract = document.querySelector('.tesseract');
    const navBar = document.querySelector('.t-navBar');

    tesseractWrapper.classList.add('t-nav-fade');
    setTimeout(()=>{
        navBar.classList.remove('t-nav-fade');
        tesseractWrapper.classList.add('d-none');
        coverText.classList.remove('t-text-compressed');
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

    setTimeout(()=>{
        coverText.classList.remove('t-text-compressed');
        coverText.classList.remove('t-cover-scroll');
        navBar.classList.remove('t-nav-fade');
        body.classList.remove('position-fixed');
        tesseract.classList.remove('tesseractAnime');
    },300);
    setTimeout(()=>{
        tesseract.classList.add('tesseractPosition');
    },1000);
    // setTimeout(() => {
    //     textFadeIn();
    // }, 2000);
    setTimeout(()=>{
        tesseract.classList.remove('t-tesseract-slow');
        tesseractAnime();
    },3000);
}

// const textFadeIn = ()=>{

//     const charAppear=()=>{
//         titleAlphabets[count].classList.add("t-title-alphabet-fade-in");
//         count = count + 1;
//         if(count=== titleAlphabets.length) clearTimer();
//     }

//     const clearTimer=()=>{
//         clearInterval(timer);
//         setTimeout(() => {
//             titleAlphabets.forEach(alphabet=>{
//                 alphabet.style.opacity = 1;
//                 alphabet.classList.remove("t-title-alphabet-fade-in");
//             });
//         }, 1000);
//     }

//     let count = 0;

//     let titleAlphabets = document.querySelectorAll(".t-title-alphabet");
//     let timer = setInterval(charAppear, 120);
// }

const scrollListeners=()=>{
    window.addEventListener('scroll', (e)=>{
        navbarActive();
        appearOnScroll('.t-translate-normal', 't-translate-down');
        appearOnScroll('.t-sketch-bg', 't-sketch-bg-translate-down');
    })
}

const formListeners=()=>{
    let numberValid; let emailValid; let nameValid;
    const nameInput = document.querySelector('#t-name-input');
    const numberInput = document.querySelector('#t-mob-input');
    const mailInput = document.querySelector('#t-email-input');
    const submitBtnWrapper = document.querySelector('.t-btn-wrapper');

    submitBtnWrapper.addEventListener('click',()=>{
        if(nameInput.value.length<2) nameInput.parentElement.classList.add('t-input-invalid');
        if(!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(numberInput.value) || !numberInput.value.length==10) numberInput.parentElement.classList.add('t-input-invalid');
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(mailInput.value)) mailInput.parentElement.classList.add('t-input-invalid');
    });

    nameInput.addEventListener('blur',e=>{
        if(typeof(e.target.value)=="string"&&e.target.value.length>2){
            nameValid=true;
            nameInput.parentElement.classList.remove('t-input-invalid');
            if(numberValid&&emailValid&&nameValid){
                submitBtnWrapper.classList.remove('t-disable-btn');
                submitBtnWrapper.children[0].setAttribute('type', 'submit');
            }
        }
        else{
            nameValid=false;
            nameInput.parentElement.classList.add('t-input-invalid');
            submitBtnWrapper.classList.add('t-disable-btn');
        }
    });

    numberInput.addEventListener('blur',e=>{
        if(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(e.target.value)&&e.target.value.length==10){
            numberValid=true;
            numberInput.parentElement.classList.remove('t-input-invalid');
            if(numberValid&&emailValid&&nameValid){
                submitBtnWrapper.classList.remove('t-disable-btn');
                submitBtnWrapper.children[0].setAttribute('type', 'submit');
            }
        }
        else{
            numberValid=false;
            numberInput.parentElement.classList.add('t-input-invalid');
            submitBtnWrapper.classList.add('t-disable-btn');
        }
    });

    mailInput.addEventListener('blur', e=>{
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.target.value)){
            emailValid=true;
            mailInput.parentElement.classList.remove('t-input-invalid');
            if(numberValid&&emailValid&&nameValid) {
                submitBtnWrapper.classList.remove('t-disable-btn');
                submitBtnWrapper.children[0].setAttribute('type', 'submit');
            }
        }
        else{
            emailValid=false;
            mailInput.parentElement.classList.add('t-input-invalid');
            submitBtnWrapper.classList.add('t-disable-btn');
        }
    });

    nameInput.addEventListener('focus', ()=>nameInput.parentElement.classList.remove('t-input-invalid'));
    numberInput.addEventListener('focus', ()=>numberInput.parentElement.classList.remove('t-input-invalid'))
    mailInput.addEventListener('focus', ()=>mailInput.parentElement.classList.remove('t-input-invalid'))
}

const splitUpText=()=>{
    const coverTexts = document.querySelectorAll(".t-cover-text");
    coverTexts.forEach(item=>{
        let coverText = item.textContent;
        addSpans(coverText, item);
    });
    textHoverEffect();
}

const textHoverEffect=()=>{
    let titleAlphabets = document.querySelectorAll(".t-title-alphabet");
    titleAlphabets.forEach(alphabet=>{
        alphabet.addEventListener("mouseover", ()=>{
            if(!alphabet.classList.contains("t-title-alphabet-animation")&& !textHoverRefresh){
                alphabet.classList.add("t-title-alphabet-animation");
                textHoverRefresh = true;
                setTimeout(()=>{
                    alphabet.classList.remove("t-title-alphabet-animation");
                    textHoverRefresh = false;
                },1000)
            }
        });
    })
}

const addSpans=(coverText, element)=>{
    let txtArray = coverText.split("");
    let updatedInnerHTML = `${txtArray.map(alph=>{
        if(alph===" ") return `<span class="t-title-alphabet px-1"></span>`;
        else return `<span class="t-title-alphabet">${alph}</span>`;
    }).join("")}`;
    element.innerHTML = updatedInnerHTML;
}

window.addEventListener('load', ()=>{
    splitUpText();
    if(window.innerWidth>767){
        loaderFade();
        cardAnime();
    }
    else{
        loaderRemove();
    }
    navItemClick();
    scrollListeners();
    formListeners();
    replaceImages();
});