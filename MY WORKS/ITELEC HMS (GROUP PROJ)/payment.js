document.addEventListener('DOMContentLoaded', function() {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));
    const bookingID = localStorage.getItem('bookingID');

    if (bookingData && bookingID) {
        document.getElementById('numberGuests').textContent = bookingData.numberGuests;
        document.getElementById('roomNumber').textContent = bookingData.roomNumber;
        document.getElementById('roomType').textContent = bookingData.roomType;
        document.getElementById('checkInDate').textContent = bookingData.checkInDate;
        document.getElementById('checkOutDate').textContent = bookingData.checkOutDate;

        // Calculate total days
        const checkInDate = new Date(bookingData.checkInDate);
        const checkOutDate = new Date(bookingData.checkOutDate);
        const totalDays = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
        document.getElementById('totalDays').textContent = totalDays;

        // Calculate total room price
        const totalRoomPrice = bookingData.price * totalDays;
        document.getElementById('totalRoomPrice').textContent = `$${totalRoomPrice.toFixed(2)}`;

        // Assuming platform fee and service fee are fixed values
        const platformFee = 10.00;
        const serviceFee = 5.00;
        document.getElementById('platformFee').textContent = `$${platformFee.toFixed(2)}`;
        document.getElementById('serviceFee').textContent = `$${serviceFee.toFixed(2)}`;

        // Calculate total price
        const totalPrice = totalRoomPrice + platformFee + serviceFee;
        document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;

        document.getElementById('confirm-payment').addEventListener('click', function(event) {
            event.preventDefault();

            const paymentMode = document.getElementById('paymentMode').value;
            bookingData.paymentMode = paymentMode;
            bookingData.bookingID = bookingID;

            fetch('save_booking.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            }).then(response => response.text()).then(text => {
                console.log('Response Text:', text); // Log the response text
                return JSON.parse(text); // Parse the text as JSON
            }).then(data => {
                if (data.status === 'success') {
                    alert('Booking successful!');
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Booking failed: ' + data.message);
                }
            }).catch(error => {
                console.error('Error:', error);
                alert('An error occurred: ' + error.message);
            });
        });
    } else {
        console.error('No booking data found in local storage');
    }

    const bookButton = document.getElementById("book");

    bookButton.onclick = function(event) {
        event.preventDefault(); // Prevent form submission

        // Get all input fields
        const guestName = document.getElementById("guest-name").value.trim();
        const numberGuests = document.getElementById("number-Guests").value.trim();
        const checkInDate = document.getElementById("Check-in").value.trim();
        const checkOutDate = document.getElementById("Check-out").value.trim();
        const roomNumber = document.getElementById("room-number").value.trim();
        const roomType = document.getElementById("room-type").value.trim();
        const price = document.getElementById("price").value.trim();

        // Check if all fields are filled
        if (guestName && numberGuests && checkInDate && checkOutDate && roomNumber && roomType && price) {
            const bookingData = {
                guestName,
                numberGuests,
                checkInDate,
                checkOutDate,
                roomNumber,
                roomType,
                price
            };
            localStorage.setItem('bookingData', JSON.stringify(bookingData));

            // Redirect to checkout.html
            window.location.href = 'checkout.html';
        } else {
            alert("Please fill in all fields before proceeding.");
        }
    };
});