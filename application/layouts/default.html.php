<!doctype html>
<html>
<head>

  <meta charset="utf-8">

  <meta name="viewport" content="width=device-width">

  <title>EyeEm Boilerplate</title>

  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="stylesheet" type="text/css" media="screen" href="/components/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" type="text/css" media="screen" href="/components/bootstrap/css/bootstrap-responsive.css">
  <link rel="stylesheet" type="text/css" media="screen" href="/css/default.css">

</head>
<body>

<div class="navbar navbar-inverse navbar-fixed-top">
  <div class="navbar-inner">
    <div class="container">

      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <a class="brand" href="/">EyeEm Boilerplate</a>

      <div class="nav-collapse collapse">

        <ul class="nav">
          <li><a href="/">Popular</a></li>
          <?php if ($eyeem->getAccessToken()) : ?>
          <li><a href="/friends">Friends</a></li>
          <?php endif ?>
        </ul>

        <ul class="nav pull-right">
            <?php if ($eyeem->getAccessToken()) : ?>
            <li>
              <img width="40" height="40" src="<?= $eyeem->getAuthUser()->getThumbUrl('sq', 40) ?>">
            </li>
            <li>
              <a><?= $eyeem->getAuthUser()->getFullname() ?></a>
            </li>
            <li>
              <a href="/auth/signout">Sign Out</a>
            </li>
            <?php else : ?>
            <li>
              <a href="/auth/signin">Sign In with EyeEm</a>
            </li>
            <?php endif ?>
        </ul>

      </div> <!-- nav-collapse -->

    </div>
  </div> <!-- navbar-inner -->
</div>

<div id="content" class="container">
  <?= $content ?>
</div>

<script src="/components/jquery/jquery.min.js"></script>
<script src="/components/bootstrap/js/bootstrap.min.js"></script>

</body>
</html>