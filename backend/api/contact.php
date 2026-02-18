<?php
require_once 'common.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?,?,?,?)');
    $stmt->execute([$input['name'], $input['email'], $input['phone'], $input['message']]);
    echo json_encode(['success' => true]);
}
