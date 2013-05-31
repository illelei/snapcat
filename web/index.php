<?php

define('ROOT_DIR', dirname(__DIR__));

define('APP_DIR', ROOT_DIR . '/application');

include ROOT_DIR . '/config.php';

require_once ROOT_DIR . '/vendor/autoload.php';

$app = new Silex\Application();

$app['debug'] = true;

include APP_DIR . '/app.start.php';
