<style>
	* { margin:0; padding:0; box-sizing:border-box; }
	body { font-size:<?= $style['fontsize'] ?: 12 ?>px; }
	p { margin:0; line-height:16px; }
	table {  width:100%; border-collapse:collapse; }
	table tr td { vertical-align:top; }

    .items { border-collapse:collapse; }
	.items thead th { 
		background-color:<?= $style['items_header_bg'] ?>;
		color:<?= $style['items_header_font_color'] ?: 'black' ?>;
	}
	.items tbody td {  }
	.items tfoot td {  }

	.items thead th,
	.items td,
	.items tfoot td {
		border-top:<?= $style['items_border_top'] ?: '1px solid black' ?>;
		border-bottom:<?= $style['items_border_top'] ?: '1px solid black' ?>;
		border-left:<?= $style['items_border_left'] ?: '1px solid black' ?>;
		border-right:<?= $style['items_border_left'] ?: '1px solid black' ?>;
		padding:<?= $style['items_padding'] ?: '6px 4px;' ?>;
	}

	.items-footer { margin-top:20px; }

	<?php if(!$settings['hide_total_border']){ ?>
		.items-total table td {
			border-top:<?= $style['items_border_top'] ?: '1px solid black' ?>;
			border-bottom:<?= $style['items_border_top'] ?: '1px solid black' ?>;
			border-left:<?= $style['items_border_left'] ?: '1px solid black' ?>;
			border-right:<?= $style['items_border_left'] ?: '1px solid black' ?>;
			padding:<?= $style['items_padding'] ?: '6px 4px;' ?>;
		}
	<?php } ?>

    /* .item-col { display:none; }
	.item-col.show { display:table-cell; } */

	.items-total { width:40%; }
	.items-total tr td:nth-child(2) { text-align:right; }
    .items-total td { padding:6px 12px; border:0px solid #000; white-space:nowrap; }
</style>