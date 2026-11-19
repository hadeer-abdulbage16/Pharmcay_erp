  <div class="modal fade " id="change_pass_Modal" tabindex="-1" role="dialog" aria-labelledby="change_pass_ModalLabel">
      <div class="modal-dialog modal-small" role="document">
          <div class="modal-content">
              <div class="modal-body">
                  <div class="row">
                      <div class="col-md-10">
                          <h3 id="modal_title">{{ translate('Change Password') }}</h3>
                      </div>
                      <div class="col-md-2">
                          <button type="button" class="close model_close_btn" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="clearfix"></div>

                      <form method="post"  action="{{ route('user_roles.users.change_pass') }}"
                          autocomplete="off">
                          @csrf
                          <div class="card-body" >
                              <div class="row">

                                  <div class="col-lg-12">
                                      <div class=" mb-3">
                                          <label for="validationCustom01">{{ translate('User') }}</label>
                                          <b>{{ auth()->user()->name }}</b>

                                      </div>
                                  </div>
                                  <div class="col-lg-12">
                                      <div class=" mb-3">
                                          <label for="validationCustom01">{{ translate('New Password') }}</label>
                                          <div class="sp-bw-center">
                                              <input type="password" name="pwd" autocomplete="off" id="pwd"
                                                  class="form-control">
                                              <button id="pass-btn" type="button" class="btn btn-info ">
                                                  <i class="icon-eye" id="eye-icon"></i>
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="text-right card-footer">
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
