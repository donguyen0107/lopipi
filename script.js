// === Scroll Animation ===
const reveals = document.querySelectorAll('.reveal');

function handleScroll() {
    for (const el of reveals) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80 && rect.bottom > 0) {
            el.classList.add('in-view');
        } else {
            el.classList.remove('in-view');
        }
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
        const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
        bsDropdown.show();
    });
    dropdown.addEventListener('mouseleave', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
        const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
        bsDropdown.hide();
    });
});

// ---------- Slider (comment-section) VỚI CLICK NAVIGATION ----------
let sliderItems = document.querySelectorAll('.slider .item');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');

let activeIndex = Math.floor(sliderItems.length / 2); // start near middle

function updateSliderLayout() {
    // reset
    sliderItems.forEach((el, i) => {
        el.style.transition = 'transform 0.5s, opacity 0.5s';
        el.style.zIndex = 0;
        el.style.opacity = '0';
        el.style.filter = 'blur(4px)';
        el.style.transform = 'translateX(0) scale(0.8)';
        el.style.cursor = 'pointer'; // Thêm cursor pointer cho tất cả items
        el.style.pointerEvents = 'auto'; // Cho phép click
    });

    // center active
    const center = activeIndex;
    sliderItems[center].style.transform = 'none';
    sliderItems[center].style.zIndex = 3;
    sliderItems[center].style.opacity = '1';
    sliderItems[center].style.filter = 'none';
    sliderItems[center].style.cursor = 'default'; // Item active không cần pointer

    // right side
    let offset = 1;
    for (let i = center + 1; i < sliderItems.length && offset <= 3; i++, offset++) {
        sliderItems[i].style.transform = `translateX(${120 * offset}px) scale(${1 - 0.12 * offset}) perspective(16px) rotateY(-1deg)`;
        sliderItems[i].style.zIndex = 2 - offset;
        sliderItems[i].style.opacity = offset > 2 ? 0 : 0.65;
        sliderItems[i].style.filter = 'blur(4px)';
    }
    // left side
    offset = 1;
    for (let i = center - 1; i >= 0 && offset <= 3; i--, offset++) {
        sliderItems[i].style.transform = `translateX(${-120 * offset}px) scale(${1 - 0.12 * offset}) perspective(16px) rotateY(1deg)`;
        sliderItems[i].style.zIndex = 2 - offset;
        sliderItems[i].style.opacity = offset > 2 ? 0 : 0.65;
        sliderItems[i].style.filter = 'blur(4px)';
    }
}

updateSliderLayout();

// THÊM SỰ KIỆN CLICK CHO MỖI ITEM
sliderItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        if (index !== activeIndex) {
            activeIndex = index;
            updateSliderLayout();
        }
    });
});

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (activeIndex + 1 < sliderItems.length) activeIndex++;
        updateSliderLayout();
    });
}
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (activeIndex - 1 >= 0) activeIndex--;
        updateSliderLayout();
    });
}

// ---------- Fade-up effects ----------
const fadeEls = document.querySelectorAll('.fade-up, .aurora-text, .hero-subtitle');
const onScrollFade = () => {
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) el.classList.add('show');
    });
};
window.addEventListener('scroll', onScrollFade);
window.addEventListener('load', onScrollFade);

// ---------- Carousel hover pause (best-effort)
const carouselTrack = document.querySelector('.carousel-track');
const carouselContainer = document.querySelector('.infinite-carousel');
if (carouselContainer && carouselTrack) {
    carouselContainer.addEventListener('mouseenter', () => {
        carouselTrack.style.animationPlayState = 'paused';
    });
    carouselContainer.addEventListener('mouseleave', () => {
        carouselTrack.style.animationPlayState = 'running';
    });
}

// Accessibility: stop animations if prefers-reduced-motion
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery && mediaQuery.matches) {
    if (carouselTrack) carouselTrack.style.animation = 'none';
}

var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});