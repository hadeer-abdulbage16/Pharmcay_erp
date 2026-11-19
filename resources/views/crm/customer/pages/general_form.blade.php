  <style>
      .multiselect-container {
          width: 100%;
      }
  </style>
  @php
      

  if (isset($customer)) {
      $type_status = $customer->type == 'company' ? 'company' : 'individual';
  }else{
      $type_status = 'individual';
  }
    @endphp
  <div class="row">
      <div class="col-lg-6">
          <div>
              <div class="mb-3">
                  <label class="me-3">
                      <input type="radio" name="type" value="individual" checked> Individual
                  </label>

                  <label>
                      <input type="radio" name="type" value="company"> Company
                  </label>
              </div>

          </div>
          <div class="row">
              <div class="mb-3 col-md-6 @if ($type_status == 'individual') d-none @endif" id="company_div">
                  <label>{{ translate('Company') }}
                      <span class="text-danger" style="font-size: 16px;">*</span>
                  </label>
                  <input type="text" onkeyup="$('#display_name').val(this.value)" name="company_name"
                      id="company_name" class="form-control vendor_name">
              </div>

              <!-- First Name -->
              <div class="mb-3 col-md-6" id="first_name_div">
                  <label>{{ translate('First Name') }}
                      <span class="text-danger" style="font-size: 16px;">*</span>
                  </label>
                  <input type="text" onkeyup="$('#display_name').val(this.value)" name="f_name" id="f_name"
                      class="form-control vendor_name">
              </div>

              <!-- Last Name -->
              <div class="mb-3 col-md-6" id="last_name_div">
                  <label>{{ translate('Last Name') }}</label>
                  <input type="text" name="l_name" class="form-control">
              </div>

              <div class="col-md-6">
                  <div class=" mb-3" style="min-width: 47%;">
                      <label for="validationCustom01">{{ translate('Code') }}</label>
                      <input type="text" name="code" id="vendor_code"
                          class="form-control form-control-sm vendor_code" required>
                  </div>
              </div>
              <div class=" mb-3 col-md-6">
                  <label for="validationCustom01">{{ translate('Email') }} </label>
                  <input type="text" name="email" class="form-control form-control-sm">
              </div>
              <div class="form-check paddingbtm mb-3 col-md-12">
                  <input class="form-check-input" type="checkbox" checked value="1" name="status" id="status">
                  <label class="form-check-label" for="flexCheckDefault">
                      {{ translate('Is Active') }}
                  </label>
              </div>

          </div>

      </div>

      <div class="col-lg-6">
          <div class=" mb-3">
              <label for="validationCustom01">{{ translate('Address') }}</label>
              <input type="text" name="address1" id="address1" class="form-control form-control-sm" value=" ">

          </div>

          <div class=" mb-3">

              <label for="group_id">{{ translate('Group') }}</label>
              <select name="group_id" id="group_id" class="form-control select2 ">
                  <option value=''>{{ translate('select_groups') }}</option>
                  @foreach ($groups as $groups_item)
                      <option value="{{ $groups_item->id }}">{{ $groups_item->title }}</option>
                  @endforeach
              </select>
          </div>
          <div class="row">
              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('phone') }}</label>
                  <input type="text" name="phone" id="phone" class="form-control form-control-sm"
                      value=" ">
              </div>

              <div class="col-lg-6 mb-3">
                  <label for="validationCustom01">{{ translate('mobile') }}</label>
                  <input type="text" name="mobile" id="mobile" class="form-control form-control-sm"
                      value=" ">
              </div>

          </div>

      </div>


  </div>
  <script>
    //   $('#group_id').multiselect({
    //       buttonWidth: '100%',
    //       maxHeight: 200,
    //       enableFiltering: true,
    //       numberDisplayed: 1,
    //       enableCaseInsensitiveFiltering: true, 
    //   });
    //   $('#group_id').hide();

      $(document).on('change', '.vendor_name', function() {
          setAutoCodeVendor();
          //   setAutoCodeCV();
      })

      function setAutoCodeVendor() {
          var name = $('#f_name').val().trim() || $('#company_name').val().trim();
          if (name == '') return;
          var words = name.split(/\s+/);
          var code = '';
          words.forEach(function(word) {
              code += word.charAt(0).toUpperCase();
          });
          var randomNum = Math.floor(Math.random() * 90) + 10;
          code = code + '0' + randomNum;
          $('#vendor_code').val(code);
          //   $('#vendor_code').attr('readonly', true);
      }
  </script>
  <script>
      $(document).ready(function() {

          $('input[name="type"]').on('change', function() {
              let type = $(this).val();

              if (type === 'company') {
                  $('#company_div').removeClass('d-none');
                  $('#first_name_div, #last_name_div').addClass('d-none');
              } else {
                  $('#company_div').addClass('d-none');
                  $('#first_name_div, #last_name_div').removeClass('d-none');
              }
          });

      });
  </script>
