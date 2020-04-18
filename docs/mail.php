<?php

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$mail = new PHPMailer\PHPMailer\PHPMailer();

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$comment = $_POST['comment'];

$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
$mail->CharSet = 'UTF-8';
$mail->Username = '24ll02@mail.ru';
$mail->Password = 'www03983ru';

$mail->Host = 'ssl://smtp.mail.ru';
$mail->Port = 465;


$mail->setFrom($email, $name);
$mail->addAddress('24ll02@mail.ru');
$mail->isHTML(true);
$mail->Subject = 'Заявка с visual';
$mail->Body = 'Сообщение отправил: <b>'.$name.'</b><br>Номер телефона: <b>'.$phone.'</b><br>Почта: <b>'.$email.'</b><br>';

if ($comment) $mail->Body .= '<br>Комментарий: <b>'.$comment.'</b><br>';

for ($i = 0; $i < count($_FILES); $i++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES[$i]['name']));
        $filename = $_FILES[$i]['name'];
        if (move_uploaded_file($_FILES[$i]['tmp_name'], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        }
    }


$mail->send();

echo 'success';