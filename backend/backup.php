<?php
require_once __DIR__ . '/config.php';
$tables = ['students', 'staff', 'notices', 'meetings', 'contacts'];

$backup = "-- S.D.S Convent School Backup\n-- Generated: " . date('Y-m-d H:i:s') . "\n\n";
foreach ($tables as $table) {
    $create = $pdo->query("SHOW CREATE TABLE $table")->fetch();
    $backup .= "DROP TABLE IF EXISTS `$table`;\n" . $create['Create Table'] . ";\n\n";
    $rows = $pdo->query("SELECT * FROM $table")->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as $row) {
        $values = array_map(fn($v) => $v === null ? 'NULL' : $pdo->quote($v), array_values($row));
        $backup .= "INSERT INTO `$table` VALUES (" . implode(',', $values) . ");\n";
    }
    $backup .= "\n";
}

$file = __DIR__ . '/backups/sds_backup_' . date('Ymd_His') . '.sql';
file_put_contents($file, $backup);
header('Content-Type: application/sql');
header('Content-Disposition: attachment; filename="' . basename($file) . '"');
readfile($file);
