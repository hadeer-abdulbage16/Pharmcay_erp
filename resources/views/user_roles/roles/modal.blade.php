<div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog modal-lg modal_full "  style="max-width: 90%;"role="document">
		<div class="modal-content">
			<div class="modal-body">
				<div class="row">
				<div class="col-md-10"><h3 id="modal_title">{{ translate('Role') }}</h3></div>
				<div class="col-md-2"> 
					<button type="button" class="close model_close_btn" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span></button>
				</div>
				<div class="clearfix"></div>
				<form method="post" id="modalform" action="">
					<div class="card-body" id="formDiv">						 
					</div>
					<div class="d-block text-right card-footer" style="background-color: #f8f9fa;">
						<div id="ajax_error"></div>
					<button onclick="save_modal_data(this)" class="btn  btn-success" name="saveBtn" id="saveBtn" type="button" > 
					<i class="fa fa-plus-circle"></i> {{ translate('Save') }}  </button>
					<button class="btn  btn-danger" name="ResetData" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> {{ translate('Close') }}</button>
					</div>
				</form>
				</div>
			</div>
		</div>
	</div>
</div>