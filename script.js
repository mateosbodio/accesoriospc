let currentIndex = 0;

function moveCarousel(step) {
    const items = document.querySelectorAll('.Carousel-item');
    currentIndex = (currentIndex + step + items.length) % items.length;
    document.getElementById('carousel').style.transform = `translateX(-${currentIndex * 100}%)`;
}