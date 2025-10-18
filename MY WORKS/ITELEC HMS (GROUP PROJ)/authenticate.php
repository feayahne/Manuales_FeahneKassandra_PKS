<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);

    // Execute the statement
    $stmt->execute();

    // Store the result
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $username, $hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            session_start();
            $_SESSION['username'] = $username; // Store username in session
            echo json_encode(['status' => 'success', 'username' => $username]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid username or password. Please try again.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password. Please try again.']);
    }

    $stmt->close();
    $conn->close();
}
?>