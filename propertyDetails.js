document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProperty'));
    const productName = localStorage.getItem('bookingProductName');
    
    const coffeeDetails = document.getElementById('coffeeDetails');
    const bookingSection = document.getElementById('bookingSection');

    if (product) {
        // Populate coffee details
        coffeeDetails.innerHTML = '';
        const card = document.createElement('div');
        card.classList.add('coffeeDetail');

        // Slider container
        const slider = document.createElement('div');
        slider.classList.add('slider');
        
        // Images for the slider
        let currentImageIndex = 0;
        const images = [product.featuredMedia, ...product.otherMedia.map(m => m.src)];
        const imgElement = document.createElement('img');
        imgElement.src = images[currentImageIndex];
        slider.appendChild(imgElement);

        // Slider arrows
        const leftArrow = document.createElement('div');
        leftArrow.classList.add('arrow', 'left');
        leftArrow.innerHTML = '&#10094;';
        leftArrow.onclick = () => {
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
            imgElement.src = images[currentImageIndex];
        };

        const rightArrow = document.createElement('div');
        rightArrow.classList.add('arrow', 'right');
        rightArrow.innerHTML = '&#10095;';
        rightArrow.onclick = () => {
            currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
            imgElement.src = images[currentImageIndex];
        };

        slider.appendChild(leftArrow);
        slider.appendChild(rightArrow);
        card.appendChild(slider);

        // Title
        const title = document.createElement('h2');
        title.innerText = product.name;
        title.classList.add('title'); // Optional: Add a class for additional styles if needed
        card.appendChild(title);

        // Description
        const description = document.createElement('p');
        description.innerText = product.description;
        description.classList.add('description'); // Optional: Add a class for additional styles if needed
        card.appendChild(description);


        coffeeDetails.appendChild(card);

        // Populate booking section with a modal for the booking form
        if (productName) {
            bookingSection.innerHTML = `
                <!-- Modal for booking form -->
                <div id="bookingModal" class="modal" style="display: none;">
                    <div class="modal-content">
                        <span class="close-button">&times;</span>
                        <h2>Booking Form</h2>
                        <form id="bookingForm">
                            <label for="name">Your Name:</label>
                            <input type="text" id="name" required>
                            <label for="email">Your Email:</label>
                            <input type="email" id="email" required>
                            <button type="submit">Submit</button>
                        </form>
                        <div id="confirmationMessage" style="display:none;"></div>
                    </div>
                </div>
            `;

            // Event listener for the "Proceed to Book" button
            document.getElementById('bookViewingButton').onclick = () => {
                document.getElementById('bookingModal').style.display = 'block';
            };

            // Close button event listener
            document.querySelector('.close-button').onclick = () => {
                document.getElementById('bookingModal').style.display = 'none';
            };

            // Add form submission event
            document.getElementById('bookingForm').addEventListener('submit', submitBooking);
        } else {
            coffeeDetails.innerHTML = '<p>Error: No product selected for booking.</p>';
        }
    } else {
        coffeeDetails.innerHTML = '<p>Error: Product details not found.</p>';
    }
});

// Form submission handler
function submitBooking(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.innerText = `Thank you ${name}! Your viewing has been booked.`;
    confirmationMessage.style.display = 'block';

    // Clear form fields
    document.getElementById('bookingForm').reset();
}
