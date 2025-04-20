const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Read HTML content
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
// Read JavaScript content
const js = fs.readFileSync(path.resolve(__dirname, "../assets/js/carousel.js"), "utf8");

let dom;
let document;

describe('moveCarousel', () => {
    let carouselContainer;

    beforeEach(() => {
        // Create a new JSDOM instance with the HTML content
        dom = new JSDOM(html, {
            runScripts: "dangerously",
            resources: "usable",
            url: "http://localhost"
        });
        document = dom.window.document;
        
        // Execute the script in the context of the JSDOM window
        const scriptElement = document.createElement("script");
        scriptElement.textContent = js;
        document.body.appendChild(scriptElement);
        
        // Ensure DOMContentLoaded has fired
        const event = new dom.window.Event('DOMContentLoaded');
        dom.window.document.dispatchEvent(event);
        
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