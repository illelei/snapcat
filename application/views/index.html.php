<?php foreach ($photos as $photo) : ?>

<div class="photo">
<a target="_blank" href="<?= $photo->getWebUrl() ?>"><img src="<?= $photo->getThumbUrl('h', '200') ?>"></a>
</div>

<?php endforeach ?>
