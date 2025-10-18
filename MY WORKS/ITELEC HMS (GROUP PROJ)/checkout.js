document.addEventListener('DOMContentLoaded', function() {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));

    if (bookingData) {
        document.getElementById('guestName').textContent = bookingData.guestName;
        document.getElementById('numberGuests').textContent = bookingData.numberGuests;
        document.getElementById('checkInDate').textContent = bookingData.checkInDate;
        document.getElementById('checkOutDate').textContent = bookingData.checkOutDate;
        document.getElementById('roomNumber').textContent = bookingData.roomNumber;
        document.getElementById('roomType').textContent = bookingData.roomType;
        document.getElementById('totalPrice').textContent = `$${bookingData.price}`;

        document.getElementById('confirmCheckout').addEventListener('click', function() {
            alert('Check Out Completed!');
            // Redirect to dashboard or another page
            window.location.href = 'dashboard.html';
        });
    } else {
        console.error('No booking data found in local storage');
    }
});