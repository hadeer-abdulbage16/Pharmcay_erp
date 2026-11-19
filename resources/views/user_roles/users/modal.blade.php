
  <div class="modal fade " id="myModal" style="padding:0px" data-keyboard="false" data-backdrop="static" tabindex="-1"
      role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog  modal-lg" role="document">
          <div class="modal-content">
              <div class="modal-body" >
                  <div class="row">
                      <div class="col-md-10">
                          <h3 id="modal_title" class="m-0">{{ translate('Create user') }}</h3>
                      </div>
                      <div class="col-md-2">
                          <button type="button" class="close model_close_btn" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true"  >&times;</span></button>
                      </div> 

                      <div class="clearfix"></div>
                      <form method="post" id="modalform" action="" autocomplete="off">
                          @csrf

                          <div class="card-body" id="formDiv">
                          </div>
                          <div class="card-footer d-flex justify-content-end gap-2">
                              <div id="ajax_error"></div>

                              <button class="btn  btn-success" name="saveBtn" id="saveBtn" type="button"
                                  data-status='1' onclick="save_modal_data(this)">
                                  <i class="fa fa-plus-circle"></i> {{ translate('Save') }} </button>
                              <button class="btn  btn-danger model_close_btn" name="ResetData" type="button"
                                  data-dismiss="modal"> <i class="fa fa-ban"></i> {{ translate('Close') }}</button>

                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
