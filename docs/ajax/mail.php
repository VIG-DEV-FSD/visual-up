<?php

require '../Exception.php';
require '../PHPMailer.php';
require '../SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

# Получить JSON как строку
$json = file_get_contents('php://input');

# Получить объект
$data = json_decode($json);

$mail->setFrom($data->email);
$mail->addAddress('24ll02@mail.ru');
$mail->isHTML(true);
$mail->Subject = 'Заявка с visual';
$mail->Body = 'Сообщение отправил: <b>'.$data->name.'</b><br>Номер телефона: <b>'.$data->phone.'</b><br>Почта: <b>'.$data->email.'</b><br>';

if ($data->comment) $mail->Body .= '<br>Комментарий: <b>'.$data->comment.'</b><br>';

$mail->send();

echo 'success';

// $subject = "=?utf-8?B?".base64_encode('Заявка с Visual.up')."?=";
// $to = "24ll02@mail.ru";

// $msg = ;

// if ($data->comment) $msg .= '<br>Комментарий: <b>'.$data->comment.'</b><br>';

// $headers = "From: $data->email\r\nReply-to: $data->email\r\nContent-type: text/html;charset=utf-8";

// mail($to, $subject, $msg, $headers);

// echo 'success';