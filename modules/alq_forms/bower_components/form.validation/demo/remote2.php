<?php

/**
 * @file
 * This is a sample PHP script which demonstrates the 'remote' validator.
 */

// To make it work, point the web server to root Bootstrap Validate directory
// and open the remote.html file:
// http://domain.com/demo/remote.html
// sleep(5);
$valid   = TRUE;
$message = '';

$users = array(
  'admin'         => 'admin@domain.com',
  'administrator' => 'administrator@domain.com',
  'root'          => 'root@domain.com',
);

if (isset($_POST['username']) && array_key_exists($_POST['username'], $users)) {
  $valid   = FALSE;
  $message = 'The username is not available';
}
elseif (isset($_POST['email'])) {
  $email = $_POST['email'];
  foreach ($users as $k => $v) {
    if ($email == $v) {
      $valid   = FALSE;
      $message = 'The email is not available';
      break;
    }
  }
}

echo json_encode(
    $valid ? array('valid' => $valid) : array('valid' => $valid, 'message' => $message)
);
