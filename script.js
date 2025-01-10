async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const headerHTML = await response.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;
    } catch (error) {
        console.error('Error loading header:', error);
        // Handle error, e.g., display a fallback header
        document.getElementById('header-placeholder').innerHTML = "<p>Error loading header</p>";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader(); // Load the header

    const images = ['tropp4.jpg','tropp/final-design4.jpg','menos1.jpg', 'tropp/final-design3.jpg','menos2.jpg','binder/final-design3.jpg'];
    let currentIndex = 0;

    const mainImage = document.getElementById('main-image');

    const moveThreshold = 20;

    let x = 0;
    let y = 0;
    let isImageChanging = false;

    function handleImageSwitch(event) {
        if (isImageChanging) return;

        const distanceMoved = Math.sqrt(
            Math.pow(event.clientX - x, 2) + Math.pow(event.clientY - y, 2)
        );

        if (distanceMoved > moveThreshold) {
            isImageChanging = true;

            currentIndex = (currentIndex + 1) % images.length;

            mainImage.src = images[currentIndex];

            x = event.clientX;
            y = event.clientY;

            mainImage.addEventListener('load', () => {
                isImageChanging = false;
            }, { once: true });
        }
    }
    mainImage.src = images[currentIndex];
    mainImage.addEventListener('mousemove', handleImageSwitch);
});