document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProperty'));

    if (product) {
        const coffeeDetails = document.getElementById('coffeeDetails');
        coffeeDetails.innerHTML = ''; 
        const card = document.createElement('div');
        card.classList.add('coffeeDetail');

        // Image
        const img = document.createElement('img');
        img.src = product.featuredMedia;
        img.alt = product.name;
        card.appendChild(img);

        // Title
        const title = document.createElement('h2');
        title.innerText = product.name;
        card.appendChild(title);

        // Description
        const description = document.createElement('p');
        description.innerText = product.description;
        card.appendChild(description);

        // Origin
        const origin = document.createElement('p');
        origin.innerHTML = `
            <span class="label">Origin:</span>
            <span class="value">${product.origin}</span>`;
        card.appendChild(origin);

        // Roasted In
        const roastedIn = document.createElement('p');
        roastedIn.innerHTML = `
            <span class="label">Roasted In:</span> 
            <span class="value">${product.roastedIn}</span>`;
        card.appendChild(roastedIn);

        // Type
        const type = document.createElement('p');
        type.innerHTML = `
            <span class="label">Type:</span> 
            <span class="value">${product.type}</span>`;
        card.appendChild(type);

        // Caffeinated
        const caffeinated = document.createElement('p');
        caffeinated.innerHTML = `
            <span class="label">Caffeinated:</span> 
            <span class="value">${product.caffinated}</span>`;
        card.appendChild(caffeinated);

        // Extra Images
        const otherMediaC = document.createElement('div');
        otherMediaC.classList.add('other-media');

        product.otherMedia.forEach((m) => {
            const mImg = document.createElement('img');
            mImg.src = m.src; 
            mImg.classList.add("extra-img");
            otherMediaC.appendChild(mImg);
        });
        card.appendChild(otherMediaC);

        // Button
        const button = document.createElement('button');
        button.textContent = "Book Viewing";
        button.onclick = () => {
            localStorage.setItem('bookingProductName', product.name);
            window.location.href = '../bookingConfirmation/booking.html';

        };
        card.appendChild(button);
        coffeeDetails.appendChild(card);
    } else {
        console.error("No product found in localStorage");
    }
});
