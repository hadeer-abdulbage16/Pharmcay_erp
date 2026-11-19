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
                 <i class="icon-present"></i>&nbsp; <span> {{ translate('Stock_Plan') }}</span>
             </a>
         </li>


     </ul>
     <div class="tab-content">
         <div role="tabpanel" class="tab-pane active" id="home">



             <div class="row">
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="barcode">{{ translate('Barbarcode') }}</label>
                         <input type="text" id="barcode" name="barcode" class="form-control" required>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="name">{{ translate('English Name') }}</label>
                         <input type="text" id="name" name="name_en" class="form-control autocheck" required>
                     </div>
                 </div>
                 <div class="col-3">

                     <div class="mb-3">
                         <label for="name">{{ translate('Arabic Name') }}</label>
                         <input type="text" id="name" name="name_ar" class="form-control autocheck" required>
                     </div>
                 </div>

                 <div class="col-3">
                     <div class="mb-3">
                         <label for="code">{{ translate('code') }}</label>
                         <input type="text" id="code" name="code" class="form-control" required>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="short_code">{{ translate('Short Code') }}</label>
                         <input type="text" id="short_code" name="short_code" class="form-control" required>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="inter_code">{{ translate('International Code') }}</label>
                         <input type="text" id="inter_code" name="inter_code" class="form-control">
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="active_ingredient">{{ translate('active ingredient') }}</label>
                         <input type="text" id="active_ingredient" name="active_ingredient" class="form-control"
                             required>
                     </div>
                 </div>
                 
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="manufacturing_type">{{ translate('Manufacturing Type') }}</label>
                         <select name="manufacturing_type" id="manufacturing_type" class="form-control">
                             <option value="local">{{ translate('Local') }}</option>
                             <option value="international">{{ translate('international') }}</option>
                         </select>
                     </div>
                 </div>
                 <div class="col-3">

                     <div class="mb-3">
                         <label for="price">{{ translate('Price') }}</label>
                         <input type="number" step="0.001" id="price" name="price" class="form-control" required>
                     </div>
                 </div>
                 <div class="col-3">

                     <div class="mb-3">
                         <label for="price">{{ translate('Purchase_Price') }}</label>
                         <input type="number" step="0.001" id="purchase_price" name="purchase_price" class="form-control" required>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="expiry_date">{{ translate('Expiry Date') }}</label>
                         <input type="text" id="expiry_date" data-attr="date" name="expiry_date"
                             class="form-control">
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="tax_value">{{ translate('Tax Value') }}</label>
                         <input type="number" id="tax_value" name="tax_value" class="form-control" step="0.01"
                             required>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="tax_percent">{{ translate('Tax Percent') }}</label>
                         <input type="number" id="tax_percent" name="tax_percent" class="form-control"
                             step="0.01" required>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="discount_value">{{ translate('Discount Value') }}</label>
                         <input type="number" id="discount_value" name="discount_value" class="form-control"
                             step="0.01" required>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="discount_percent">{{ translate('Discount Percent') }}</label>
                         <input type="number" id="discount_percent" name="discount_percent" class="form-control"
                             step="0.01" required>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="unit">{{ translate('Unit') }}</label>
                         <select type="text" id="unit" name="unit" class="form-control">
                             <option value="piece">{{ translate('Piece') }}</option>
                             <option value="box">{{ translate('Box') }}</option>
                             <option value="bottle">{{ translate('Bottle') }}</option>
                             <option value="strip">{{ translate('Strip') }}</option>
                         </select>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="company_id">{{ translate('Company') }}</label>
                         <select name="company_id" id="company_id" class="form-control " required>
                             <option value="" selected disabled>{{ translate('Select Company') }}</option>
                             @foreach ($companies as $company)
                                 <option value="{{ $company->id }}">{{ $company->name }}</option>
                             @endforeach
                         </select>
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="category_id">{{ translate('Category') }}</label>
                         <select name="category_id" id="category_id" class="form-control " required>
                             <option value="" selected disabled>{{ translate('Select Category') }}</option>
                             @foreach ($categories as $category)
                                 <option value="{{ $category->id }}">{{ $category->title }}</option>
                             @endforeach
                         </select>
                     </div>
                 </div>
                 
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="is_medicine">{{ translate('Is Medicine') }}</label>
                         <input type="checkbox" id="is_medicine" name="is_medicine" value="active">
                     </div>
                 </div>
                 <div class="col-3">
                     <div class="mb-3">
                         <label for="is_general_shortage">{{ translate('Is General Shortage') }}</label>
                         <input type="checkbox" id="is_general_shortage" name="is_general_shortage" value="active">
                     </div>

                 </div>
                 <div class="col-12">
                     <div class="mb-3">
                         <label for="description">{{ translate('description') }}</label>
                         <textarea name="" id="" cols="30" id="description" name="description"  class="form-control"  ></textarea>
                      </div>
                 </div>
             </div>
         </div>
         <div role="tabpanel" class="tab-pane " id="more_info">

             <div class="row">

                 <div class="col-sm-12" id="single">

                     <h4 class="header-title">{{ translate('Storewise Stock Details') }}</h4>
                     <table class="table table-bordered  ">
                         <thead>
                             <tr>
                                 <th style="min-width: 250px;">{{ translate('Store Name') }}</th>
                                 <th>{{ translate('Opening Stock') }}</th>
                                 <th>{{ translate('min_purchase_quantity') }}</th>
                                 <th>{{ translate('min_sale_quantity') }}</th>
                                 <th>{{ translate('alert_quantity') }}</th>
                             </tr>
                         </thead>
                         <tbody>
                             @foreach ($stores as $store_item)
                                 <tr>
                                     <td>
                                         {{ $store_item->name }}
                                         <input type="hidden" name="store_id[]" value="{{ $store_item->id }}">
                                     </td>
                                     <td>
                                         <div class="input-group">
                                             <input type="number"
                                                 class="form-control form-control-sm qty opining_stock"
                                                 id="opening_stock" data-id="opining_stock" min="0"
                                                 step="1" value="0"
                                                 name="opining_stock-{{ $store_item->id }}"
                                                 data-error="Opening Quantity Missing" onchange="check_qty(this)">
                                             <div class="input-group-prepend">
                                                 <span class="input-group-text culabel"></span>
                                             </div>
                                         </div>
                                     </td>

                                     <td>
                                         <div class="input-group">
                                             <input type="number"
                                                 class="form-control form-control-sm qty min_purchase_quantity"
                                                 id="min_purchase_quantity" data-id="min_purchase_quantity"
                                                 data-error="Minimum Purchase Quantity Missing" min="0"
                                                 step="1" value="1"
                                                 name="min_purchase_quantity-{{ $store_item->id }}"
                                                 onchange="check_qty(this)">
                                             <div class="input-group-prepend">
                                                 <span class="input-group-text culabel"></span>
                                             </div>
                                         </div>
                                     </td>
                                     <td>
                                         <div class="input-group">
                                             <input type="number"
                                                 class="form-control form-control-sm qty min_sale_quantity"
                                                 id="min_sale_quantity" data-id='min_sale_quantity'
                                                 data-error="Maximum Sale Quantity Missing" min="0"
                                                 step="1" value="1"
                                                 name="min_sale_quantity-{{ $store_item->id }}"
                                                 onchange="check_qty(this)">
                                             <div class="input-group-prepend">
                                                 <span class="input-group-text culabel"></span>
                                             </div>
                                         </div>
                                     </td>
                                     <td>
                                         <div class="input-group">
                                             <input type="number"
                                                 class="form-control form-control-sm qty alert_quantity"
                                                 id="creorderqty" data-id='alert_quantity' min="0"
                                                 step="1" value="0" data-error="Alert Quantity Missing"
                                                 name="alert_quantity-{{ $store_item->id }}"
                                                 onchange="check_qty(this)">
                                             <div class="input-group-prepend">
                                                 <span class="input-group-text culabel"></span>
                                             </div>
                                         </div>
                                     </td>
                                 </tr>
                             @endforeach
                         </tbody>
                     </table>
                 </div>
             </div>




         </div>
     </div>

     <script></script>
