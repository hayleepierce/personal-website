describe('moveCarousel', () => {
    let carouselContainer;

    beforeEach(() => {
        // Set up a mock DOM structure for the carousel
        document.body.innerHTML = `
            <div class="carousel">
                <div class="carousel-item" style="display: none;">Item 1</div>
                <div class="carousel-item" style="display: none;">Item 2</div>
                <div class="carousel-item" style="display: none;">Item 3</div>
            </div>
        `;
        carouselContainer = document.querySelector('.carousel');
        const items = document.querySelectorAll('.carousel-item');
        items[0].style.display = 'block'; // Set the first item to be visible initially
    });

    afterEach(() => {
        // Clean up the DOM
        document.body.innerHTML = '';
    });

    it('should move to the next item when direction is 1', () => {
        moveCarousel(1);
        const items = document.querySelectorAll('.carousel-item');
        expect(items[0].style.display).toBe('none');
        expect(items[1].style.display).toBe('block');
        expect(items[2].style.display).toBe('none');
    });

    it('should move to the previous item when direction is -1', () => {
        moveCarousel(-1);
        const items = document.querySelectorAll('.carousel-item');
        expect(items[0].style.display).toBe('none');
        expect(items[1].style.display).toBe('none');
        expect(items[2].style.display).toBe('block');
    });

    it('should wrap around to the last item when moving backward from the first item', () => {
        moveCarousel(-1);
        const items = document.querySelectorAll('.carousel-item');
        expect(items[0].style.display).toBe('none');
        expect(items[1].style.display).toBe('none');
        expect(items[2].style.display).toBe('block');
    });

    it('should wrap around to the first item when moving forward from the last item', () => {
        moveCarousel(1); // Move to the second item
        moveCarousel(1); // Move to the third item
        moveCarousel(1); // Wrap around to the first item
        const items = document.querySelectorAll('.carousel-item');
        expect(items[0].style.display).toBe('block');
        expect(items[1].style.display).toBe('none');
        expect(items[2].style.display).toBe('none');
    });
});