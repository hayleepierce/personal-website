const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Read HTML content
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

let dom;
let document;

beforeEach(() => {
    // Create a new JSDOM instance with the HTML content
    dom = new JSDOM(html, {
        runScripts: "dangerously",
        resources: "usable",
        url: "http://localhost"
    });
    document = dom.window.document;
    
    // Ensure DOMContentLoaded has fired
    const event = new dom.window.Event('DOMContentLoaded');
    dom.window.document.dispatchEvent(event);
});

test("All links should work (status 200)", async () => {
    const links = Array.from(document.querySelectorAll("a"));

    for (const link of links) {
        const href = link.href;
        if (href.startsWith("http")) {
            const response = await fetch(href);
            expect(response.status).toBe(200);
        }
    }
});
