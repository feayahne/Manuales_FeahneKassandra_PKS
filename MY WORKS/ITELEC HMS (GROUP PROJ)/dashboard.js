document.addEventListener('DOMContentLoaded', function() {
    // Fetch username from local storage or server
    let username = localStorage.getItem('username') || 'Guest';
    if (username.includes('@gmail.com')) {
        username = username.replace('@gmail.com', '');
    }
    document.getElementById('guestName').textContent = username;
    document.getElementById('booking-details-guest').textContent = username;

    const bookingData = JSON.parse(localStorage.getItem('bookingData'));
    if (bookingData) {
        document.getElementById('bookingId').textContent = bookingData.bookingId;
        document.getElementById('checkInDate').textContent = bookingData.checkInDate;
        document.getElementById('checkOutDate').textContent = bookingData.checkOutDate;
        document.getElementById('numberGuests').textContent = bookingData.numberGuests;
        document.getElementById('roomType').textContent = bookingData.roomType;
        document.getElementById('dueDate').textContent = bookingData.checkOutDate; // Assuming due date is the same as check-out date
        document.getElementById('roomTotal').textContent = `$${bookingData.price}`;
        document.getElementById('summaryNumberGuests').textContent = bookingData.numberGuests;
        document.getElementById('total').textContent = `$${bookingData.price}`;

        // Update booking history
        document.getElementById('historyOrderId').textContent = bookingData.bookingId;
        document.getElementById('historyOrderDate').textContent = bookingData.checkInDate; // Assuming order date is the same as check-in date
        document.getElementById('historyRoom').textContent = bookingData.roomType;
        document.getElementById('historyNumberRoom').textContent = bookingData.roomNumber;
        document.getElementById('historyCheckIn').textContent = bookingData.checkInDate;
        document.getElementById('historyCheckOut').textContent = bookingData.checkOutDate;
        document.getElementById('historyGuest').textContent = bookingData.guestName;

        // Update current booking image
        document.getElementById('currentBookingImage').src = bookingData.imageUrl || 'images/Icon.png';
    } else {
        // Reset values to default
        document.getElementById('bookingId').textContent = '_';
        document.getElementById('checkInDate').textContent = '_';
        document.getElementById('checkOutDate').textContent = '_';
        document.getElementById('numberGuests').textContent = '_';
        document.getElementById('roomType').textContent = '_';
        document.getElementById('dueDate').textContent = '_';
        document.getElementById('roomTotal').textContent = '_';
        document.getElementById('summaryNumberGuests').textContent = '_';
        document.getElementById('total').textContent = '_';

        // Reset booking history
        document.getElementById('historyOrderId').textContent = '_';
        document.getElementById('historyOrderDate').textContent = '_';
        document.getElementById('historyRoom').textContent = '_';
        document.getElementById('historyNumberRoom').textContent = '_';
        document.getElementById('historyCheckIn').textContent = '_';
        document.getElementById('historyCheckOut').textContent = '_';
        document.getElementById('historyGuest').textContent = '_';

        // Reset current booking image
        document.getElementById('currentBookingImage').src = 'images/Icon.png';
    }
});