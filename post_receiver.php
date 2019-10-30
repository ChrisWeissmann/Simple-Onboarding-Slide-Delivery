<?php
// Simple endpoint that digests json and sends an email with the data posted.
// 
// Responds with 500 if something goes wrong, such as not a json file
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
$data = file_get_contents('php://input');
$json = json_decode($data, true);
$str = $data;
// in our case the address is saved in another file.
$adr = file_get_contents('../../../mail.txt');
// $adr = "xxxxxx@mailprovider.com";
$to_email = $adr;
$subject = "BackUp Survey response";
$body = $str;
$headers = "From: ".$adr;

if (mail($to_email, $subject, $body, $headers) && (json_last_error() == JSON_ERROR_NONE)) {
   http_response_code(201);
} else {
   http_response_code(500);
}

return;

?>