<p class="setting-title">{{ translate('Invoice Settings') }}</p>
<hr>
<form method="post" id="setting" action="{{ route('invoice.settings.store') }} ">
    @csrf
    <div class="card-body row">
        <div class="col-sm-6 ">
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('organization_name') }} </div>
                <div class="col-sm-7">
                    <input type="text" class="form-control form-control-sm" name="organization_name" id="organization_name"
                        autocomplete="nope" required>
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Invoice Header') }} </div>
                <div class="col-sm-7">
                    <input type="text" class="form-control form-control-sm" name="invoice_header" id="invoice_header"
                        autocomplete="nope" required>
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Invoice Footer') }} </div>
                <div class="col-sm-7">
                    <input type="text" class="form-control form-control-sm" name="invoice_footer" id="invoice_footer"
                        autocomplete="nope" required>
                </div>
            </div>
                <div class="row formrow">
                    <div class="col-sm-5">{{ translate('Show Seller Name') }} </div>
                    <div class="col-sm-7">
                        <label class="switch">
                            <input type="checkbox" name="show_seller_name" id="show_seller_name">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
                <div class="row formrow">
                    <div class="col-sm-5">{{ translate('Show Customer Name') }} </div>
                    <div class="col-sm-7">
                        <label class="switch">
                            <input type="checkbox" name="show_customer_name" id="show_customer_name">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

           
           
            
        </div>

       <div class="col-sm-6">
                <div class="row formrow">
                    <div class="col-sm-5">{{ translate('Store') }} </div>
                    <div class="col-sm-7">
                        <select name="store_id" id="store_id" class="form-control form-control-sm" required>
                            <option value="" selected disabled>{{ translate('Select Store') }}</option>
                            @foreach ($stores as $store)
                                <option value="{{ $store->id }}">{{ $store->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
               <div class="row formrow">
                    <div class="col-sm-5">{{ translate('Min invoice amount') }} </div>
                    <div class="col-sm-7">
                        <input type="number" class="form-control form-control-sm" name="min_invoice_amount" id="min_invoice_amount"
                            autocomplete="nope" required>
                    </div>
                </div>
               <div class="row formrow">
                    <div class="col-sm-5">{{ translate('Print Copies') }} </div>
                    <div class="col-sm-7">
                        <input type="number" class="form-control form-control-sm" name="print_copies" id="print_copies"
                            autocomplete="nope" required>
                    </div>
                </div>
                <div class="row formrow">
                    <div class="col-sm-5">{{ translate('Invoice Template') }} </div>
                    <div class="col-sm-7">
                        <select name="template" id="template" class="form-control form-control-sm" required>
                            <option value="" selected disabled>{{ translate('Select Template') }}</option>
                            <option value="template1">Template 1</option>
                            <option value="template2">Template 2</option>
                            <option value="template3">Template 3</option>
                        </select>
                    </div>
                <div class="row formrow">
                    <div class="col-sm-5">{{ translate('Print Type') }} </div>
                    <div class="col-sm-7">
                        <select name="print_type" id="print_type" class="form-control form-control-sm" required>
                            <option value="" selected disabled>{{ translate('Select Print Type') }}</option>
                            <option value="a4">A4</option>
                            <option value="thermal">Thermal</option>
                            <option value="no_print">dont print</option>
                        </select>
                    </div>
        </div> 
        
        <span></span>
        <hr>

       
    </div> 
    <div class="text-right card-footer">
        <div id="product_error_message"></div>
        <button class="btn  btn-success" type="submit" data-status='1'>
            <i class="fa fa-plus-circle"></i> {{ translate('Save') }} </button>

    </div>

</form>
 