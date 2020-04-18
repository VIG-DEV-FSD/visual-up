<?php

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$mail = new PHPMailer\PHPMailer\PHPMailer();

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$comment = $_POST['comment'];

$mail->setFrom($email, $name);
$mail->addAddress('24ll02@mail.ru');
$mail->isHTML(true);
$mail->Subject = 'Заявка с visual';
$mail->Body = 'Сообщение отправил: <b>'.$name.'</b><br>Номер телефона: <b>'.$phone.'</b><br>Почта: <b>'.$email.'</b><br>';

if ($comment) $mail->Body .= '<br>Комментарий: <b>'.$comment.'</b><br>';

if (!empty($_FILES['file']['name'][0])) {
    for ($ct = 0; $ct < count($_FILES['myfile']['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['myfile']['name'][$ct]));
        $filename = $_FILES['myfile']['name'][$ct];
        if (move_uploaded_file($_FILES['myfile']['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        }
    }   
}

$mail->send();

echo 'success';

// $subject = "=?utf-8?B?".base64_encode('Заявка с Visual.up')."?=";
// $to = "24ll02@mail.ru";

// $msg = ;

// if ($data->comment) $msg .= '<br>Комментарий: <b>'.$data->comment.'</b><br>';

// $headers = "From: $data->email\r\nReply-to: $data->email\r\nContent-type: text/html;charset=utf-8";

// mail($to, $subject, $msg, $headers);

// echo 'success';