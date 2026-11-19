 
<div class="mb-3">
    <label for="barcode">{{ translate( 'Barcode' ) }}</label>
    <input type="text" id="barcode" name="barcode" class="form-control autocheck" required>
</div>
<div class="mb-3">
    <label for="product_name">{{ translate( 'Product Name' ) }}</label>
    <input type="hidden" id="product_id" name="product_id">
    <input type="text" id="product_name" name="product_name" class="form-control autocheck" required>
</div>

<div class="mb-3">
    <label for="product_code">{{ translate('Product Code') }}</label>
    <input type="text" id="product_code" name="product_code" class="form-control" required>
</div>


<div class="mb-3">
    <label for="unit">{{ translate('Unit') }}</label>
    <select type="text" id="unit" name="unit" class="form-control" required>
        <option selected>{{ translate('Select Unit') }}</option>
        <option value="piece">{{ translate('Piece') }}</option>
        <option value="box">{{ translate('Box') }}</option>
        <option value="bottle">{{ translate('Bottle') }}</option>
        <option value="strip">{{ translate('Strip') }}</option>
    </select>   
</div>
<div class="mb-3">
    <label for="quantity">{{ translate('Quantity') }}</label>
    <input type="text" id="quantity" name="quantity" class="form-control" required>
</div>


<div class="mb-3">
    <label for="price">{{ translate('Price') }}</label>
    <input type="number" id="price" name="price" class="form-control" required>
</div>
<div class="mb-3">
    <label for="sale_price">{{ translate('Sales Price') }}</label>
    <input type="number" id="sale_price" name="sale_price" class="form-control" required>
</div>
<div class="mb-3">
    <label for="purchase_price">{{ translate('Purchase Price') }}</label>
    <input type="number" id="purchase_price" name="purchase_price" class="form-control" required>
</div>
<div class="mb-3">
    <label for="tax">{{ translate('Tax ') }}</label>
    <input type="number" id="tax" name="tax" class="form-control" required>
</div>

<div class="mb-3">
    <label for="discount">{{ translate('Discount ') }}</label>
    <input type="number" id="discount" name="discount" class="form-control" required>
</div>
<div class="mb-3">
    <label for="min_purchase_quantity">{{ translate('Min Purchase Quantity ') }}</label>
    <input type="number" id="min_purchase_quantity" name="min_purchase_quantity" class="form-control" required>
</div>
<div class="mb-3">
    <label for="min_sale_quantity">{{ translate('Min Sale Quantity ') }}</label>
    <input type="number" id="min_sale_quantity" name="min_sale_quantity" class="form-control" required>
</div>
<div class="mb-3">
    <label for="alert_quantity">{{ translate('Alert Quantity') }}</label>
    <input type="number" id="alert_quantity" name="alert_quantity" class="form-control" required>
</div>


<div class="mb-3">
    <label for="expiry_date">{{ translate('Expiry Date') }}</label>
    <input type="date" id="expiry_date" name="expiry_date" class="form-control">
</div>

<div class="mb-3">
    <label for="store_id">{{ translate('Store') }}</label>
    <select name="store_id" id="store_id" class="form-control form-control-sm" required>
        <option value="" selected disabled>{{ translate('Select Store') }}</option>
        @foreach ($stores as $store)
            <option value="{{ $store->id }}">{{ $store->name }}</option>
        @endforeach
    </select>
</div>

<div class="mb-3">
    <label for="discount_type">
        <select name="discount_type" id="discount_type">
            <option selected disabled>{{translate('Select Discount Type')}}</option>
            <option value="percent">{{translate('percent')}}</option>
            <option value="flat">{{translate('flat')}}</option>
        </select>
    </label>
</div>


 
 

 
<script> 
$(document).ready(function() {
    $('#barcode').on('change', function() {
        var barcode = $(this).val();
        if (barcode.length > 0) {
            $.ajax({
                url: '/pharmacy-code/inventory/product_stock/get_product_info',
                method: 'POST',
                data: { 
                    barcode: barcode,
                     _token: $('meta[name="csrf-token"]').attr('content')

                 },
                success: function(response) {
                    if (response.success) {
                        $('#product_name').val(response.data.name);
                        $('#product_code').val(response.data.code);
                        $('#unit').val(response.data.unit);
                        $('#tax_value').val(response.data.tax_value);
                        $('#tax_percent').val(response.data.tax_percent);
                        $('#discount_value').val(response.data.discount_value);
                        $('#discount_percent').val(response.data.discount_percent);
                        $('#product_id').val(response.data.id);
                       
                    } else {
                        $('#product_name').val('');
                        $('#product_code').val('');
                        $('#unit').val('');
                       
                    }
                }
            });
        } else {
            $('#product_name').val('');
            $('#product_code').val('');
            $('#unit').val('');
           
        }
    });
    
});
</script>
