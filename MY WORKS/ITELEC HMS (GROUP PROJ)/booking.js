function displayRoom() {
    const selectedRoomType = document.getElementById("roomtype").value.toLowerCase();
    const minPrice = Number(document.getElementById("min").value) || 0;
    const maxPrice = Number(document.getElementById("max").value) || Infinity;
 
    const rooms = document.querySelectorAll(".img-container .room");

    rooms.forEach(room => {
        const altText = room.querySelector('img').alt.toLowerCase();
        const price = Number(room.querySelector('img').getAttribute('data-price'));

        if ((altText === selectedRoomType || selectedRoomType === "") && price >= minPrice && price <= maxPrice) {
            room.style.display = '';
        } else {
            room.style.display = 'none';
        }
    });
}

document.querySelectorAll('.room').forEach(room => {
    room.addEventListener('mouseenter', () => {
        const img = room.querySelector('img');
        const roomType = img.alt;
        const price = img.getAttribute('data-price');
        
        let roomInfo = room.querySelector('.room-info');
        if (!roomInfo) {
            roomInfo = document.createElement('div');
            roomInfo.classList.add('room-info');
            room.appendChild(roomInfo);
        }
        
        roomInfo.innerHTML = `
            <p><strong>TYPE: ${roomType.toLocaleUpperCase()}</strong></p>
            <p><strong>PRICE: $${price}</strong></p>
        `;
    });
});

// go to the booking_details html and change the room number and room type

function navigateToDetails(imageSrc, roomNumber, roomType) {
    const url = `booking_details.html?image=${encodeURIComponent(imageSrc)}
    &roomNumber=${encodeURIComponent(roomNumber)}
    &roomType=${encodeURIComponent(roomType)}`;
    window.location.href = url;
}

function generateBookingID() {
    return 'BID' + Math.floor(Math.random() * 1000000);
}

// Store the booking ID in local storage
localStorage.setItem('bookingID', generateBookingID());
