<?php
require_once 'common.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode($pdo->query('SELECT * FROM staff ORDER BY id DESC')->fetchAll());
        break;
    case 'POST':
        $stmt = $pdo->prepare('INSERT INTO staff (name, designation, subject, mobile, photo) VALUES (?,?,?,?,?)');
        $stmt->execute([$input['name'], $input['designation'], $input['subject'], $input['mobile'], $input['photo'] ?? null]);
        echo json_encode(['success' => true]);
        break;
    case 'PUT':
        $stmt = $pdo->prepare('UPDATE staff SET name=?, designation=?, subject=?, mobile=?, photo=? WHERE id=?');
        $stmt->execute([$input['name'], $input['designation'], $input['subject'], $input['mobile'], $input['photo'] ?? null, $input['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        $stmt = $pdo->prepare('DELETE FROM staff WHERE id=?');
        $stmt->execute([$input['id']]);
        echo json_encode(['success' => true]);
        break;
}
