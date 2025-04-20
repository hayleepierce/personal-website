
describe('moveCarousel', () => {
    let carouselItems;

    beforeEach(() => {
        document.body.innerHTML = `
            <div class="carousel">
                <div class="carousel-item" style="display: none;">Item 1</div>
                <div class="carousel-item" style="display: none;">Item 2</div>
                <div class="carousel-item" style="display: none;">Item 3</div>
            </div>
        `;
        carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems[0].style.display = 'block'; // Initialize first item as visible
    });

    it('should show the next item and hide the current item when moving forward', () => {
        moveCarousel(1);
        expect(carouselItems[0].style.display).toBe('none');
        expect(carouselItems[1].style.display).toBe('block');
        expect(carouselItems[2].style.display).toBe('none');
    });

    it('should show the previous item and hide the current item when moving backward', () => {
        moveCarousel(-1);
        expect(carouselItems[0].style.display).toBe('none');
        expect(carouselItems[1].style.display).toBe('none');
        expect(carouselItems[2].style.display).toBe('block');
    });

    it('should loop to the last item when moving backward from the first item', () => {
        moveCarousel(-1);
        expect(carouselItems[0].style.display).toBe('none');
        expect(carouselItems[2].style.display).toBe('block');
    });

    it('should loop to the first item when moving forward from the last item', () => {
        moveCarousel(1); // Move to second item
        moveCarousel(1); // Move to third item
        moveCarousel(1); // Move forward from the last item
        expect(carouselItems[0].style.display).toBe('block');
        expect(carouselItems[2].style.display).toBe('none');
    });
});