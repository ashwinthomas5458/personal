const tesseractWrapper = document.querySelector('.t-tesseract-wrapper');
const tesseract = document.querySelector('.tesseract');

function tesseractAnime(){
    tesseractWrapper.addEventListener("mouseenter", (e)=>{
        tesseract.classList.remove('tesseractAnime');
    });

    tesseractWrapper.addEventListener("mousemove", (event)=> {
        const wrapperWidth = tesseractWrapper.offsetWidth;
        const wrapperHeight = tesseractWrapper.offsetHeight;
        const centerX = tesseractWrapper.offsetLeft + wrapperWidth / 2;
        const centerY = tesseractWrapper.getBoundingClientRect().top + wrapperHeight / 2;
        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;
        const rotateX = (-1) * 10 * mouseY / (wrapperHeight / 2);
        const rotateY =  10 * mouseX / (wrapperWidth / 2);
        tesseract.style.transform = `rotateX(${rotateX*4}deg) rotateY(${rotateY*4}deg) `;
    });

    tesseractWrapper.addEventListener("mouseleave", (e)=>{
        tesseract.style.transform="";
        tesseract.classList.add('tesseractAnime');
    });
}

tesseractAnime();