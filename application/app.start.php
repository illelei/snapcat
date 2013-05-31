<?php

session_start();

$eyeem = new Eyeem();
$eyeem->setClientId(EYEEM_CLIENT_ID);
$eyeem->setClientSecret(EYEEM_CLIENT_SECRET);
if (isset($_SESSION['access_token'])) {
  $eyeem->setAccessToken($_SESSION['access_token']);
}

function view($name, $params = array())
{
  $filename = APP_DIR . '/views/' . $name . '.html.php';
  if (file_exists($filename)) {
    extract($params);
    ob_start();
    include $filename;
    return ob_get_clean();
  }
}

function layout($content = '', $params = array(), $name = 'default')
{
  $filename = APP_DIR . '/layouts/' . $name . '.html.php';
  if (file_exists($filename)) {
    extract($params);
    ob_start();
    include $filename;
    return ob_get_clean();
  }
}

function render($name, $params = array())
{
  return layout(view($name, $params), $params);
}

$app->get('/auth/signin', function() use($app, $eyeem) {
  $callbackUrl = 'http://' . $_SERVER['HTTP_HOST'] . ' /auth/callback';
  $redirectUrl = $eyeem->getLoginUrl($callbackUrl);
  return $app->redirect($redirectUrl);
});

$app->get('/auth/signout', function() use($app, $eyeem) {
  unset($_SESSION['access_token']);
  return $app->redirect('/');
});

$app->get('/auth/callback', function() use($app, $eyeem) {
  if (isset($_GET['code'])) {
    $token = $eyeem->getToken($_GET['code']);
    $_SESSION['access_token'] = $token['access_token'];
  }
  return $app->redirect('/friends');
});

$app->get('/', function() use($app, $eyeem) {
  return $app->redirect('/popular');
});

$app->get('/popular', function() use($app, $eyeem) {
  $photos = $eyeem->getPopularPhotos();
  return render('index', array('eyeem' => $eyeem, 'photos' => $photos));
});

$app->get('/friends', function() use($app, $eyeem) {
  if ($eyeem->getAccessToken() && $authUser = $eyeem->getAuthUser()) {
    $photos = $authUser->getFriendsPhotos();
    return render('index', array('eyeem' => $eyeem, 'photos' => $photos));
  } else {
    return $app->redirect('/');
  }
});

$app->run();
