let currentIndex = 0;
function moveCarousel(direction) {
const items = document.querySelectorAll('.carousel-item');
items[currentIndex].style.display = 'none';
currentIndex = (currentIndex + direction + items.length) % items.length;
items[currentIndex].style.display = 'block';
}
document.addEventListener('DOMContentLoaded', () => {
const items = document.querySelectorAll('.carousel-item');
items.forEach((item, index) => item.style.display = index === 0 ? 'block' : 'none');
});