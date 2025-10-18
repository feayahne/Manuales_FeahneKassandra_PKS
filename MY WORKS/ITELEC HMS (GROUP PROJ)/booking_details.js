document.addEventListener('DOMContentLoaded', function() {
    const bookButton = document.getElementById("book");

    bookButton.onclick = function(event) {
        event.preventDefault(); // Prevent form submission

        // Get all input fields
        const guestName = document.getElementById("guest-name").value.trim();
        const numberGuests = document.getElementById("number-Guests").value.trim();
        const checkInDate = document.getElementById("Check-in").value.trim();
        const checkOutDate = document.getElementById("Check-out").value.trim();
        const roomNumber = document.getElementById("room-number").textContent.trim();
        const roomType = document.getElementById("room-type").textContent.trim().replace('Room type: ', '');
        const imageUrl = document.getElementById("room-image").src; // Get the image URL

        // Check if all fields are filled
        if (guestName && numberGuests && checkInDate && checkOutDate && roomNumber && roomType) {
            const checkInDateObj = new Date(checkInDate);
            const checkOutDateObj = new Date(checkOutDate);
            const currentDate = new Date();

            // Set the time of currentDate to 00:00:00 to compare only the date part
            currentDate.setHours(0, 0, 0, 0);

            if (checkInDateObj < currentDate || checkOutDateObj <= checkInDateObj) {
                window.alert("Invalid date. Please ensure check-in date is today or in the future and check-out date is after check-in date.");
            } else {
                const roomPrice = calculateRoomPrice(roomType);

                // Store values in localStorage
                const bookingData = {
                    guestName,
                    numberGuests,
                    checkInDate,
                    checkOutDate,
                    roomNumber,
                    roomType,
                    price: roomPrice,
                    imageUrl // Store the image URL
                };
                localStorage.setItem('bookingData', JSON.stringify(bookingData));

                // Redirect to checkout.html
                window.location.href = 'checkout.html';
            }
        } else {
            alert("Please fill in all fields before proceeding.");
        }
    };

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Update the content based on URL parameters
    const imageSrc = getUrlParameter('image');
    const roomNumber = getUrlParameter('roomNumber');
    const roomType = getUrlParameter('roomType');

    if (imageSrc) {
        document.getElementById('room-image').src = imageSrc;
    }
    if (roomNumber) {
        document.getElementById('room-number').textContent = roomNumber;
    }
    if (roomType) {
        document.getElementById('room-type').textContent = `Room type: ${roomType}`;
        const roomPrice = calculateRoomPrice(roomType);
        document.getElementById('room-price').textContent = `Price: $${roomPrice}`;
    }
});

// Function to calculate room price based on room type
function calculateRoomPrice(roomType) {
    switch (roomType) {
        case 'Single':
            return 1000;
        case 'Double':
            return 2000;
        case 'Deluxe':
            return 3500;
        default:
            return 0;
    }
}

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const bookingData = {
        guestName: document.getElementById('guest-name').value,
        numberGuests: document.getElementById('number-Guests').value,
        checkInDate: document.getElementById('Check-in').value,
        checkOutDate: document.getElementById('Check-out').value,
        roomNumber: document.getElementById('room-number').value,
        roomType: document.getElementById('room-type').value,
        price: document.getElementById('price').value
    };
    fetch('save_booking.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    }).then(response => response.text()).then(data => {
        console.log(data);
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        window.location.href = 'checkout.html';
    });
});