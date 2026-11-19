 <style>
     .multiselect-container {
         width: 100%;
     }
 </style>
 <div class="card">
     <ul class="nav nav-tabs" role="tablist">
         <li role="presentation" class="tabs active1" style="width:50%">
             <a href="#home" aria-controls="home" id="hometab" role="tab" data-toggle="tab" class="active"
                 aria-selected="true">
                 <i class="mdi mdi-view-dashboard"></i>&nbsp; <span>{{ translate('General Info') }}</span>
             </a>
         </li>
         <li role="presentation" class="tabs" style="width:50%">
             <a href="#more_info" class="atabs pr-0 pl-0" aria-controls="moreForm" role="tab" data-toggle="tab"
                 aria-selected="false">
                 <i class="icon-people"></i>&nbsp; <span> {{ translate('More Info') }}</span>
             </a>
         </li>
        

     </ul>
     <div class="tab-content">
         <div role="tabpanel" class="tab-pane active" id="home">
             @include('crm.customer.pages.general_form')
         </div>
         <div role="tabpanel" class="tab-pane " id="more_info">
             @include('crm.customer.pages.more_info_form')
         </div> 
        
     </div>

 </div>
 <script></script>
