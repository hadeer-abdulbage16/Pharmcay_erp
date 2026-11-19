  <style>
      
  </style>
 
  <div class="left-side-menu">

      <div class="slimscroll-menu" id="slimscroll">
          <div id="sidebar-menu">
              <ul class="metismenu" id="side-menu">

            

                  <li class="menu-title">{{ translate('MASTER') }}</li> 
                  <li>
                      <a href="{{ route('crm.menu') }}" title="{{ translate('crm') }}">
                          <i class="icon-user"></i>
                          <span>{{ translate('crm') }}</span>
                          <span class="menu-arrow"></span>
                      </a>
                  </li>
                  
                  <li>
                      <a href="{{ route('inventory.menu') }}" title="{{ translate('Inventory') }}">
                          <i class="icon-present"></i>
                           <span>{{ translate('Inventory') }}</span>
                          <span class="menu-arrow"></span>
                      </a>
                  </li>
                  
                  <li>
                      <a href="{{ route('accounting.menu') }}" title="{{ translate('Accounting') }}">
                           <i class="icon-target"></i>
                           <span>{{ translate('Accounting') }}</span>
                          <span class="menu-arrow"></span>
                      </a>
                  </li>
                 
                  <li class="menu-title mt-2">{{ translate('Settings') }}</li>
                 
                  <li>
                      <a href="{{ route('settings.general.menu') }}" title="{{ translate('Settings') }}">
                          <i class="icon-settings"></i>
                          <span>{{ translate('Settings') }}</span>
                          <span class="menu-arrow"></span>
                      </a>
                  </li>
                  <li>
                      <a href="{{ route('invoice.menu') }}" title="{{ translate('Invoice') }}">
                            <i class="icon-docs"></i>
                          <span>{{ translate('Invoice') }}</span>
                          <span class="menu-arrow"></span>
                      </a>
                  </li>
                  <li>
                      <a href="{{ route('purchase.menu') }}" title="{{ translate('Purchase') }}">
                            <i class="icon-docs"></i>
                          <span>{{ translate('Purchase ') }}</span>
                          <span class="menu-arrow"></span>
                      </a>
                  </li>
                  <li>
                      <a href="{{ route('user_roles.menu') }}" title="{{ translate('Users & Roles') }}">
                          <i class="icon-people"></i>
                          <span>{{ translate('Users & Roles') }}</span>
                          <span class="menu-arrow"></span>
                      </a>
                  </li>

                  
                  
                  <li>
                      <a href="{{ route('system_setup.menu') }}" title="{{ translate('system_setup') }}">
                          <i class="fas fa-industry"></i>
                          <span>{{ translate('System Setup') }}</span>
                          <span class="menu-arrow"></span>
                      </a>
                  </li>

                  <li>&nbsp;</li>
                  <li>&nbsp;</li>
                  <li>&nbsp;</li>
                  <li>&nbsp;</li>
              </ul>
          </div>
          <div class="clearfix"></div>
      </div>
  </div>
  <script type="text/javascript">
      function ChangeApprovalLink(link) {
          if (link == 'Voucher') {
              $('.Voucher-un').show();
              $('.Ledger-un').hide();
          } else {
              $('.Voucher-un').hide();
              $('.Ledger-un').show();
          }
      }
      $(document).ready(function() {
          if ($('#approval-process-select').length) {
              setTimeout(() => $('#approval-process-select').trigger('change'), 1000);
          }
      })
  </script>
