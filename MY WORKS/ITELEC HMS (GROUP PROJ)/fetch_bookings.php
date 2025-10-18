<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_db"; // Use the existing database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_SESSION['username'];
$sql = "SELECT * FROM bookings WHERE guestName = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$bookings = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
}

echo json_encode($bookings);

$stmt->close();
$conn->close();
?>