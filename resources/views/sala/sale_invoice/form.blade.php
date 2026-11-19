
<div class="tab-content pl-0 pr-0 pt-0">
    <div class="tab-pane active pb-0" role="tabpanel" id="tab_general">


        <div class="row n_newpurchasecustiom">
            <div class="col-lg-4 ">
                <div class=" row formrow">
                    <label class="col-sm-7" for="supplier_id">{{ translate('supplier') }}</label>
                    <select class="col-sm-5 select2"name="supplier_id" id="supplier_id" class="form-control select2 ">
                        <option value='' selected>{{ translate('select_supplier') }}</option>
                        @foreach ($suppliers as $supplier)
                            <option value="{{ $supplier->id }}">{{ $supplier->f_name }}</option> 
                            
                        @endforeach
                    </select>
                </div>
        

                <div class="row formrow ">
                    
                        <div class="col-sm-7 ">{{ translate('Notes') }}</div>
                        <div class="col-sm-5">
                           <input class=" form-control form-control-sm" name="notes" id="notes" >
                        </div>
                        
                    
                </div>
                <div class="row formrow ">
                    
                        <div class="col-sm-7 ">{{ translate('Invoice Number') }}</div>
                        <div class="col-sm-5">
                            <input class=" form-control form-control-sm invoice_number" name="invoice_number" id="invoice_number" >
                        </div>
                        
                    
                </div>
                <div class="row formrow ">
                    
                        <div class="col-sm-7 ">{{ translate('Serial Number') }}</div>
                        <div class="col-sm-5">
                            <input class=" form-control form-control-sm sln_number" name="sln_number" id="sln_number" >
                        </div>
                        
                    
                </div>
                <div class="row formrow ">
                        <div class="col-sm-7 ">{{ translate('Item Count') }}</div>
                        <div class="col-sm-5">
                            <input class=" form-control form-control-sm items_count" name="items_count" id="items_count" >
                        </div>
                </div>
                <div class="row formrow ">                  
                        <div class="col-sm-7 ">{{ translate('Barcode Count') }}</div>
                        <div class="col-sm-5">
                             <input class=" form-control form-control-sm barcode_count" name="barcode_count" id="barcode_count" >
                        </div>                   
                </div>
            

            </div>
            <div class="col-lg-4 ">
                

                <div class="row formrow">
                    <div class="col-sm-5 ">{{ translate('Purchase Price Total') }}</div>
                    <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm entity_voucher_ref voucher-ref purchase_price_total" step="0.01"
                            name="purchase_price_total" id="purchase_price_total" readonly value="{{ $purchase_price_total ?? 0 }}">
                    </div>
                </div>
               
                <div class="row formrow">
                    <div class="col-sm-5 ">{{ translate('Sales Price Total') }}</div>
                    <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm sale_price_total entity_voucher_ref voucher-ref" step="0.01"
                            name="sale_price_total" id="sale_price_total" readonly value="{{ $sale_price_total ?? 0 }}">
                    </div>
                </div>
                <div class="row formrow">
                    <div class="col-sm-5 ">{{ translate('Vat Total') }}</div>
                    <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm vat_total voucher-ref"
                            name="vat_total" id="vat_total" readonly value="{{ $vat_total ?? 0 }}">
                    </div>
                </div>
               

               
                <div class="row formrow">
                    <div class="col-sm-5 ">{{ translate('Discount Value') }}</div>
                    <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm discount_value entity_voucher_ref voucher-ref"
                            name="discount_value" id="discount_value" readonly value="{{ $discount_value ?? 0 }}">
                    </div>
                </div>
                <div class="row formrow">
                    <div class="col-sm-5 ">{{ translate('Discount Percent') }}</div>
                    <div class="col-sm-7">
                        <input type="text" class="form-control form-control-sm discount_percent entity_voucher_ref voucher-ref"
                            name="discount_percent" id="discount_percent" readonly value="{{ $discount_percent ?? 0 }}">
                    </div>
                </div>
                </div>

            </div>

            <div class="col-lg-4 ">
                <div>
                    <div class="row nnuser formrow n_dlex575">
                        <div class="col-sm-5 ">{{ translate('User Code') }}</div>
                        <div class="col-sm-7">
                            <input type="hidden" value="{{ auth()->user()?->id }}" name="user_id" id="user_code">
                            {{ auth()->user()?->name }}
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-sm-5 pr-0 ">
                            {{ translate('Creation Date') }}
                        </div>
                        <div class="col-sm-7 mb-1 ">
                            <input type="text" data-attr="date" class="form-control form-control-sm trn-date"
                                name="invoice_date" onchange="update_voucher_ref(this)"
                                value="{{ today()->format('d-m-Y') }}" id="creation_date" readonly>
                        </div>
                    </div>
                    <div class="row formrow">
                        <div class="col-sm-5 ">{{ translate('Profit value') }}</div>
                        <div class="col-sm-7">
                            <input type="text" class="form-control form-control-sm profit_value entity_voucher_ref voucher-ref"
                                name="profit_value" id="profit_value" value="{{ $profit_value ?? '' }}">
                        </div>
                    </div>
                    <div class="row formrow">
                        <div class="col-sm-5 ">{{ translate('Profit percent') }}</div>
                        <div class="col-sm-7">
                            <input type="text" class="form-control form-control-sm profit_percent entity_voucher_ref voucher-ref"
                                name="profit_percent" id="profit_percent" >
                        </div>
                    </div>
                   

                    <div class="row formrow">
                        <div class="col-sm-5 ">{{ translate('Store') }}</div>
                        <div class="col-sm-7">
                            <select name="store_id" id="branch_guid"
                                class="form-control select2 form-control-sm select_store_guid store-guid">
                                <option value="" selected>{{ translate('Select Store') }}</option>
                                @foreach ($stores as $store_item)
                                    <option value="{{ $store_item->id }}">{{ $store_item->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="row formrow">
                        <div class="col-sm-5 ">{{ translate('Payment Method') }}</div>
                        <div class="col-sm-7">
                            <select name="payment_method" id="payment_method"
                                class="form-control form-control-sm select2 select_payment_method payment-method">
                                <option value="" selected>{{ translate('Select Payment Method') }}</option>
                                @foreach ($payment_methods as $payment_method)
                                    <option value="{{ $payment_method->id }}">{{ $payment_method->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="row formrow">
                        <div class="col-sm-5 ">{{ translate('Grand Total ') }}</div>
                        <div class="col-sm-7">
                            <input type="text"  name="grand_total" id="grand_total" readonly value="{{ $grand_total ?? 0 }}"
                                class="form-control form-control-sm grand_total entity_voucher_ref voucher-ref" >
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div style="clear:both"></div>

    </div>

    <div class="tab-pane" role="tabpanel" id="tab_project">

    </div>
</div>


<style>
    .table-sm th,
    .table-sm td {
        font-size: 12px;
    }

    /* faraz css start */
    @media only screen and (max-width: 768px) {
        .n_orderitems .new1 {
            justify-content: initial !important;
        }



    }

    @media only screen and (max-width: 575px) {
        .nf_orderitembtn .new {
            display: initial !important;
        }

        .nf_orderitembtn .new1 {
            display: initial !important;
        }

        .new.nf_orderitembtn {
            display: initial !important;
        }

        .nf_orderitembtn .new4 {
            padding: 10px !important;
            width: 100% !important;
        }

        .nf_orderitembtn button#addBtn {
            width: 100% !important;
            margin: 5px 0px !important;
        }

        .nf_orderinput a#view_amount_info {
            width: 100% !important;
        }

    }
</style>


<div class="row n_orderitems">
    <div class="col-sm-12" style="padding-left: 0px; padding-right: 0px;">
        <div id="item_table" style=" overflow-x: auto;
     max-height: 400px;
     min-height: 100px;">
            <table class="table table-striped table-bordered table-sm items-table" id="requisition_table"
                tabindex="1">
                <thead class="wv-table__header" style="position: sticky;z-index: 100;top: 0;">
                    <tr class="wv-table__row">

                        <th class="center" style="min-width:50px;">{{ translate('Barcode') }}</th>
                        <th class="center" style="min-width:110px;">{{ translate('Product Code') }}</th>
                        <th class="center" style="min-width:290px;">{{ translate('Product Name') }}</th>
                        <th class="center" style="min-width:100px;">{{ translate('Unit') }}</th>
                        <th class="center" style="min-width:100px;">{{ translate('Qty') }}</th>
                        <th class="center" style="min-width:100px;">{{ translate('Balance') }}</th>
                        <th class="center" style="min-width:100px;">{{ translate('Expiry Date') }}</th>
                        <th class="center foreign-curr-col" style="min-width:100px;  ">{{ translate('Sale Price') }}
                            <span
                                class="curr-code-foreign">({{ get_general_settings('currency_symbol') }})</span></th>
                        <th class="center foreign-curr-col" style="min-width:100px; ">
                            {{ translate('Purchase Price') }}
                            <span class="curr-code-foreign">({{ get_general_settings('currency_symbol') }})</span>
                        </th>
                        <th class="center con-unit" style="min-width:100px; ">{{ translate('Tax Value') }}
                            <span class="curr-code-foreign">({{ get_general_settings('currency_symbol') }})</span>
                        </th>
                        <th class="center foreign-curr-col" style="min-width:100px; ">
                            {{ translate('Tax Percent') }}</th>

                        <th class="center con-unit" style="min-width:100px; ">{{ translate('Discount Value') }}
                            <span class="curr-code-foreign">({{ get_general_settings('currency_symbol') }})</span>
                        </th>
                        <th class="center foreign-curr-col" style="min-width:100px; ">
                            {{ translate('Discount Percent') }}</th>

                        <th class="center vat_cols" style="min-width:80px;">{{ translate('Profit Value') }}
                            <span class="curr-code-local">({{ get_general_settings('currency_symbol') }})</span>
                        </th>

                        <th class="center vat_cols" style="min-width:100px;">{{ translate('Profit Percent') }}
                            </th>
                        <th class="center vat_cols" style="min-width:100px;">
                            {{ translate('Total') }}<span
                                class="curr-code-local">({{ get_general_settings('currency_symbol') }})</span> </th>


                        <th style="text-align:center;min-width:60px">#</th>
                    </tr>
                </thead>
                <tbody id="item_row">
                    <tr>
                        <td class="center" style="min-width:50px;">
                               <input type="text" class="form-control form-control-sm barcode" id="barcode" name="items[0][barcode]" >
                        </td>
                       
                        <td style="display:none;">
                          <input type="hidden" class="form-control form-control-sm product_id"  name="items[0][product_id]" >
                        </td>
                    
                        <td class="center" style="min-width:50px;">
                               <input type="text" class="form-control form-control-sm product_code"  name="items[0][product_code]" >
                        </td>
                    
                        <td class="center" style="min-width:50px;">
                               <input type="text" class="form-control form-control-sm product_name" 
                                name="items[0][product_name]" >
                        </td>
                    
                        <td class="center" style="min-width:50px;">
                            <select name="items[0][unit]" id="unit" class=" form-control form-control-sm unit ">
                                <option value="" selected>{{ translate('Select Unit') }}</option>
                               <option value="piece">{{ translate('Piece') }}</option>
                                <option value="box">{{ translate('Box') }}</option>
                                <option value="bottle">{{ translate('Bottle') }}</option>
                                <option value="strip">{{ translate('Strip') }}</option>
                            </select>
                               
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm qty"
                             name="items[0][qty]" >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm balance" 
                             name="items[0][balance]" >
                        </td>
                        <td>
                            <input type="date" class="form-control form-control-sm expiry_date" 
                             name="items[0][expiry_date]" >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm sale_price"  step="0.01"
                             name="items[0][sale_price]" >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm purchase_price"  step="0.01"
                              name="items[0][purchase_price]" >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm tax_value"  step="0.01"
                             name="items[0][tax_value]" readonly >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm tax_percent"  step="0.01"
                             name="items[0][tax_percent]" readonly >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm discount_value"  step="0.01"
                             name="items[0][discount_value]" >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm discount_percent"  step="0.01"
                             name="items[0][discount_percent]" >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm profit_value"  step="0.01"
                             name="items[0][profit_value]" readonly >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm profit_percent"  step="0.01"
                             name="items[0][profit_percent]" readonly >
                        </td>
                        <td>
                            <input type="number" class="form-control form-control-sm total"  step="0.01"
                             name="items[0][total]"  readonly >
                        </td>
                         <td id="" style=" background: whitesmoke;">
                            
                            <a href="#" id="add_row" class="action add_row" data-toggle="tooltip" title="">
                                <i class="icon-plus" style="font-weight: bold;"></i>
                            </a>
                           
                        </td>

                    </tr>
                   



                </tbody>
                <tfoot style="bottom: 0;position: sticky;">

                </tfoot>
                <tfoot>

                </tfoot>
            </table>


        </div>

        <div class="sp-bw-center">

        </div>
     <!--
        <div class="new nf_orderitembtn"
            style="width:100%;display: flex;justify-content: space-between;align-items: center;">
            <div id="product_input" class="tp-container" style=" width: 40%;display:none">
                <input type="text" name="product" id="product" data-type=""
                    data-url="" data-balance_qty="0" class="form-control autocomplete "
                    value="" placeholder="Type an item name, item code" autocomplete="off" />
            </div>
            <div id="item_input" class=" text-center">

                <div style="text-align:center;" class="item_btn_group" id="btnGroup"
                    style="background-color: #fff;">
                    <button class="btn  btn-success new4" name="addBtn" id="addBtn" type="button"
                        data-status='1' style=" padding-left: 100px;   padding-right: 100px;  color: #000;">
                        <i class="fa fa-plus-circle" style="color: #000;"></i> {{ translate('Select Items') }}
                    </button>
                </div>

            </div>
        </div>
    

    -->


    </div>


</div>



<script>
     $(document).on('change', '.barcode, .product_code, .product_name' , function () {

    let row = $(this).closest('tr');
    let currentValue = $(this).val();

    let searchType = '';
    if($(this).hasClass('barcode')){
        searchType = 'barcode';
    }else if ($(this).hasClass('product_code')){
        searchType = 'code';
    }else if($(this).hasClass('product_name')){
        searchType = 'name';
    }

    

    if (currentValue.length > 0) {

        $.ajax({

            url: "/pharmacy-code/purchase/purchase_invoice/get_product_info",

            method: 'POST',

            data: {
                search_query: currentValue,
                search_type: searchType,
                _token: $('meta[name="csrf-token"]').attr('content')
            },

            success: function (response) {

                if (response.success) {

                    row.find('.barcode')
                        .val(response.data.barcode);

                    

                    row.find('.product_name')
                        .val(response.data.product_name);

                    row.find('.product_code')
                        .val(response.data.product_code);

                    row.find('.unit')
                        .val(response.data.unit);

                    row.find('.tax_value')
                        .val(response.data.tax_value);

                    row.find('.tax_percent')
                        .val(response.data.tax_percent);

                    row.find('.discount_value')
                        .val(response.data.discount_value);

                    row.find('.discount_percent')
                        .val(response.data.discount_percent);

                    row.find('.product_id')
                        .val(response.data.id);
                        let rowId = row.data('row') || 0;
                       updateQty(rowId);

                } else {

                    row.find('input').val('');

                }
                
            },
            error: function(xhr) {
                  console.log(xhr);
             }


        });

    }

  });

  function addrow(e) {
     
        e.preventDefault();
        var lastRow = $('#item_row tr:last');
        var newRow = lastRow.clone();
        newRow.find('input').val('');
        newRow.find('input').removeAttr('id');
        newRow.find('select').prop('selectedIndex' , 0);
        newRow.find('.action').hide();
        newRow.find('td:last').html(`
                            <a href="#" id="delete_row" class="delete_row" data-toggle="tooltip" title="">
                                <i class=" ti-trash" style="font-weight: bold;"></i>
                            </a>
                           `
                         )
        $('#item_row').append(newRow);            
   }
  function deleteRow(e) {
    e.preventDefault();
    $(this).closest('tr').remove();
  }

  $(document).on('click', '#add_row', addrow);
  $(document).on('click', '.delete_row', deleteRow);

</script>


   



