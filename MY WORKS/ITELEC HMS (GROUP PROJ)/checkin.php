<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the form data
$bookingId = trim($_POST['bookingId']);
$guestName = trim($_POST['guestName']);

// Validate the form data
if (empty($bookingId) || empty($guestName)) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all fields.']);
    exit();
}

// Write the received data to a log file for debugging
file_put_contents('debug_log.txt', "Received bookingId: '$bookingId', guestName: '$guestName'\n", FILE_APPEND);

// Check if the booking exists
$sql = "SELECT * FROM bookings WHERE bookingID = ? AND guestName = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $bookingId, $guestName);
$stmt->execute();
$result = $stmt->get_result();

// Write the number of rows found to the log file for debugging
file_put_contents('debug_log.txt', "Number of rows found: " . $result->num_rows . "\n", FILE_APPEND);

// Log the exact query being executed
file_put_contents('debug_log.txt', "Executed query: SELECT * FROM bookings WHERE bookingID = '$bookingId' AND guestName = '$guestName'\n", FILE_APPEND);

if ($result->num_rows > 0) {
    // Update the check-in status
    $updateSql = "UPDATE bookings SET checkInStatus = 'checked_in' WHERE bookingID = ? AND guestName = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("ss", $bookingId, $guestName);
    if ($updateStmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Check-in successful!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update check-in status.']);
    }
    $updateStmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Booking not found.']);
}

// Close connections
$stmt->close();
$conn->close();
?>
