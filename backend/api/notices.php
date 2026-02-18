<?php
require_once 'common.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode($pdo->query('SELECT * FROM notices ORDER BY id DESC')->fetchAll());
        break;
    case 'POST':
        $stmt = $pdo->prepare('INSERT INTO notices (notice_type, notice_content) VALUES (?,?)');
        $stmt->execute([$input['notice_type'], $input['notice_content']]);
        echo json_encode(['success' => true]);
        break;
}
