let currentSlideIndex = {
    'food-carousel': 0,
    'rooms-carousel': 0
};

function showSlide(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    const items = carousel.getElementsByClassName('carousel-item');
    if (index >= items.length) {
        currentSlideIndex[carouselId] = 0;
    } else if (index < 0) {
        currentSlideIndex[carouselId] = items.length - 1;
    } else {
        currentSlideIndex[carouselId] = index;
    }
    for (let i = 0; i < items.length; i++) {
        items[i].style.transform = `translateX(-${currentSlideIndex[carouselId] * 100}%)`;
    }
}

function nextSlide(carouselId) {
    showSlide(carouselId, currentSlideIndex[carouselId] + 1);
}

function prevSlide(carouselId) {
    showSlide(carouselId, currentSlideIndex[carouselId] - 1);
}

// Initialize carousels
showSlide('food-carousel', 0);
showSlide('rooms-carousel', 0);