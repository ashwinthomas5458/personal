

window.addEventListener('scroll', ()=>{
    navfade();
});

const navfade=()=>{
    var screenposition=window.innerHeight/2.1;
    const navbar=document.querySelector('header');

    if(window.pageYOffset<screenposition){
        navbar.classList.remove('t-navbaractive');
    }
    if(window.pageYOffset>screenposition){
        navbar.classList.add('t-navbaractive');
    }
}

const tiltSettings = {
    maxX: 3,
    maxY: 2,
    perspective: 1000,
    speed: 600,
    // easing: "ease-in-out" //cubic-bezier(.03,.98,.52,.99) 
};

const cardWappers = document.querySelectorAll(".t-work-wrapper");
const mockupsLarge = document.querySelectorAll(".t-mockup-large");
const mockupsSmall = document.querySelectorAll(".t-mockup-small");

cardWappers.forEach((card, i) => {
    const currentTransformLarge = mockupsLarge[i].style.transform;
    const currentTransformSmall = mockupsSmall[i].style.transform;

    // card.addEventListener("mouseenter", (event)=> {
    //     setTransition(event);
    // });

    card.addEventListener("mousemove", (event)=> {
        const card = event.currentTarget;
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const centerX = card.offsetLeft + cardWidth / 2;
        const centerY = card.getBoundingClientRect().top + cardHeight / 2;
        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;
        const rotateX = (+1) * tiltSettings.maxX * mouseY / (cardHeight / 2);
        const rotateY = (-1) * tiltSettings.maxY * mouseX / (cardWidth / 2);
        console.log(currentTransformLarge, currentTransformSmall)
        mockupsSmall[i].style.transform = `${currentTransformSmall} perspective(${tiltSettings.perspective}px) rotateX(${rotateX*4}deg) rotateY(${rotateY*4}deg) `;
        mockupsLarge[i].style.transform = `${currentTransformLarge} perspective(${tiltSettings.perspective}px) rotateX(${rotateX*4}deg) rotateY(${rotateY*4}deg) `;
        card.style.transform = `perspective(${tiltSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) `;
    });
    card.addEventListener("mouseleave", (event)=> {
        mockupsSmall[i].style.transform = `${currentTransformSmall} perspective(${tiltSettings.perspective}px) rotateX(0deg) rotateY(0deg)`;
        mockupsLarge[i].style.transform = `${currentTransformLarge} perspective(${tiltSettings.perspective}px) rotateX(0deg) rotateY(0deg)`;
        card.style.transform = `perspective(${tiltSettings.perspective}px) rotateX(0deg) rotateY(0deg)`;
        setTransition(event);
    });
});

// const setTransition=(event)=> {
//     const card = event.currentTarget;
//     clearTimeout(card.transitionTimeoutId);
//     card.style.transition = `transform ${tiltSettings.speed}ms ${tiltSettings.easing}`;
//     card.transitionTimeoutId = setTimeout(() => {
//         card.style.transition = "";
//     }, tiltSettings.speed);
// }