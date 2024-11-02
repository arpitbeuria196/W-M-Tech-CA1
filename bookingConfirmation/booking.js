// On document load
document.addEventListener('DOMContentLoaded', () => {
    const productName = localStorage.getItem('bookingProductName');
    const bookingSection = document.getElementById('bookingSection');

    // Check if productName exists
    if (productName) {
        bookingSection.innerHTML = `
            <h2>Book a Viewing for <span>${productName}</span></h2>
            <form id="bookingForm">
                <label for="name">Your Name:</label>
                <input type="text" id="name" required>
                <label for="email">Your Email:</label>
                <input type="email" id="email" required>
                <button type="submit">Submit</button>
            </form>
            <div id="confirmationMessage" style="display:none;"></div>
        `;

        // Add event listener for form submission
        const bookingForm = document.getElementById('bookingForm');
        bookingForm.addEventListener('submit', submitBooking);
    } else {
        bookingSection.innerHTML = '<p>Error: No product selected for booking.</p>';
    }
});

// Function to handle form submission
function submitBooking(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.innerText = `Thank you ${name}! Your viewing has been booked.`;
    confirmationMessage.style.display = 'block';

    // Reset the form fields
    document.getElementById('bookingForm').reset();
}
