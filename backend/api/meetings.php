<?php
require_once 'common.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode($pdo->query('SELECT * FROM meetings ORDER BY meeting_date ASC')->fetchAll());
        break;
    case 'POST':
        $stmt = $pdo->prepare('INSERT INTO meetings (meeting_date, meeting_time, purpose) VALUES (?,?,?)');
        $stmt->execute([$input['meeting_date'], $input['meeting_time'], $input['purpose']]);
        echo json_encode(['success' => true]);
        break;
}
