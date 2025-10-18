<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Get the form data
$data = json_decode(file_get_contents('php://input'), true);
$bookingID = $data['bookingID'] ?? null;
$guestName = $data['guestName'] ?? null;
$numberGuests = $data['numberGuests'] ?? null;
$checkInDate = $data['checkInDate'] ?? null;
$checkOutDate = $data['checkOutDate'] ?? null;
$roomNumber = $data['roomNumber'] ?? null;
$roomType = $data['roomType'] ?? null;
$price = $data['price'] ?? null;
$paymentMode = $data['paymentMode'] ?? null;
$checkInStatus = 'not_checked_in'; // Default status

// Validate the form data
if (empty($bookingID) || empty($guestName) || empty($numberGuests) || empty($checkInDate) || empty($checkOutDate) || empty($roomNumber) || empty($roomType) || empty($price) || empty($paymentMode)) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all fields.']);
    exit();
}

// Insert the booking into the database
$sql = "INSERT INTO bookings (bookingID, guestName, numberGuests, checkInDate, checkOutDate, roomNumber, roomType, price, paymentMode, checkInStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Prepare failed: ' . htmlspecialchars($conn->error)]);
    exit();
}
$stmt->bind_param("ssissssiss", $bookingID, $guestName, $numberGuests, $checkInDate, $checkOutDate, $roomNumber, $roomType, $price, $paymentMode, $checkInStatus);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Booking successful!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to book: ' . htmlspecialchars($stmt->error)]);
}

// Close connections
$stmt->close();
$conn->close();
?>