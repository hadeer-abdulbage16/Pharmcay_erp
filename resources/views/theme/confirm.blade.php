<style>
	.max-z-index{
			z-index: 999999!important;
	}
	</style>
<div class="modal max-z-index" id="confirmModal" style="display: none; z-index: 1070;">
  <div class="modal-dialog">
    <div class="modal-content" style="background-color: #294769;color:#fff;border:none">
		<div class="col-md-10"><h3 style="color:#fff;" id="confirm_title">{{ translate('confirm') }}</h3></div>
      <div class="modal-body" id="confirmMessage">
      </div>
				
		<div class="d-block text-right card-footer">
		<button type="button" class="btn btn-success" id="confirmOk">
		<i class="far fa-check-circle"></i> <span class="btn-text">{{ translate('delete') }}</span></button>
		<button type="button" class="btn btn-danger" id="confirmCancel">
		<i class="fa fa-ban"></i> {{ translate('cancel') }}</button>
		</div>
    </div>
  </div>
</div>
