  <style>
      .multiselect-container {
          width: 100%;
      }
  </style>
  <div class="row">
      <div class="col-lg-6">
          <div class=" mb-3">
              <label for="validationCustom01">{{ translate('Tax Number') }}</label>
              <input type="text" name="tax_no" id="tax_no" class="form-control form-control-sm" value=" ">
          </div>

          <div class=" mb-3">
              <label for="validationCustom01">{{ translate('opening_balance') }}</label>
              <input type="number" step="0.001" name="opening_balance" id="opening_balance" class="form-control form-control-sm"
                  value="0">
          </div>
      </div>
      <div class="col-lg-6">


          <div class=" mb-3">
              <label for="validationCustom01">{{ translate('Address Line 1') }}</label>
              <input type="text" name="address_line_1" id="address_line_1" class="form-control form-control-sm" value=" ">

          </div>


          <div class=" mb-3">
              <label for="validationCustom01">{{ translate('Address Line 2') }}</label>
              <input type="text" name="address_line_2" id="address_line_2" class="form-control form-control-sm" value=" ">
          </div>
          <div class="row">


              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('City') }}</label>
                  <input type="text" name="city" id="city" class="form-control form-control-sm"
                      value=" ">
              </div>

              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('State') }}</label>
                  <input type="text" name="state" id="state" class="form-control form-control-sm"
                      value=" ">
              </div>

              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('Country') }}</label>
                  <input type="text" name="country" id="country" class="form-control form-control-sm"
                      value=" ">
              </div>
              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('zip_code') }}</label>
                  <input type="text" name="zip_code" id="zip_code" class="form-control form-control-sm"
                      value=" ">
              </div>
              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('landmark') }}</label>
                  <input type="text" name="landmark" id="landmark" class="form-control form-control-sm"
                      value=" ">
              </div>
              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('street_name') }}</label>
                  <input type="text" name="street_name" id="street_name" class="form-control form-control-sm"
                      value=" ">
              </div>
              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('building_number') }}</label>
                  <input type="text" name="building_number" id="building_number" class="form-control form-control-sm"
                      value=" ">
              </div>
              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('additional_number') }}</label>
                  <input type="text" name="additional_number" id="additional_number"
                      class="form-control form-control-sm" value=" ">
              </div>
          </div>

      </div>
    
  </div>
