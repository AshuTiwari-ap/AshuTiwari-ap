<?php
require_once 'common.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM students ORDER BY id DESC');
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $stmt = $pdo->prepare('INSERT INTO students (student_photo, full_name, father_name, mother_name, class_name, section, roll_number, dob, address, mobile, aadhaar) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
        $stmt->execute([
            $input['student_photo'] ?? null,
            $input['full_name'],
            $input['father_name'],
            $input['mother_name'],
            $input['class_name'],
            $input['section'],
            $input['roll_number'],
            $input['dob'],
            $input['address'],
            $input['mobile'],
            $input['aadhaar'] ?? null
        ]);
        echo json_encode(['success' => true]);
        break;

    case 'PUT':
        $stmt = $pdo->prepare('UPDATE students SET student_photo=?, full_name=?, father_name=?, mother_name=?, class_name=?, section=?, roll_number=?, dob=?, address=?, mobile=?, aadhaar=? WHERE id=?');
        $stmt->execute([
            $input['student_photo'] ?? null,
            $input['full_name'],
            $input['father_name'],
            $input['mother_name'],
            $input['class_name'],
            $input['section'],
            $input['roll_number'],
            $input['dob'],
            $input['address'],
            $input['mobile'],
            $input['aadhaar'] ?? null,
            $input['id']
        ]);
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $stmt = $pdo->prepare('DELETE FROM students WHERE id=?');
        $stmt->execute([$input['id']]);
        echo json_encode(['success' => true]);
        break;
}
