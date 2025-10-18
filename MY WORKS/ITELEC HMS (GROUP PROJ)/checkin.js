document.addEventListener('DOMContentLoaded', function() {
    const checkinForm = document.getElementById('checkinForm');

    checkinForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        const bookingId = document.getElementById('bookingId').value.trim();
        const guestName = document.getElementById('guestName').value.trim();

        // Validate the form data
        if (!bookingId || !guestName) {
            alert('Please fill in all fields.');
            return;
        }

        // Create a FormData object to send the data
        const formData = new FormData();
        formData.append('bookingId', bookingId);
        formData.append('guestName', guestName);

        // Send the form data to the server
        fetch('checkin.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Get the response as text
        .then(text => {
            console.log('Response Text:', text); // Log the response text
            return JSON.parse(text); // Parse the text as JSON
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Check-in successful!');
                // Redirect to the dashboard or another page
                window.location.href = 'dashboard.html';
            } else {
                alert('Check-in failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        });
    });
});