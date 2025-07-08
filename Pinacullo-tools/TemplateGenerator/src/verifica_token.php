<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);
$token = $input['token'] ?? '';

$conn = new mysqli('localhost', 'root', '', 'user_template_generator');

if ($conn->connect_error) {
    echo json_encode(["success" => false]);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE cookie = ?");
$stmt->bind_param("s", $token);
$stmt->execute();
$result = $stmt->get_result();

echo json_encode(["success" => $result->num_rows > 0]);

$stmt->close();
$conn->close();
