 console.log('purchase.js loaded');

$(document).on('click', '.delete_row', function (e) {
    $(this).closest('tr').remove();
    deleteRow(e);

});

$(document).ready(function () {
    loadDecimals();
});
$(document).on('mousedown', '.typeahead, .typeahead li', function (e) {
    e.preventDefault();
});
//event handler for product input field
$(document).on('click' , '.add_row' , function (e) {
    addrow(e);
});
/*


$(document).on('click', '.copyRemark', function () {
    let currentRow = $(this).closest('tr');
    let prevRow = currentRow.prev('tr');

    if (!prevRow.length) return;

    let prevInput = prevRow.find('.remark-input');
    let currentInput = currentRow.find('.remark-input');

    currentInput.val(prevInput.val());
});*/
function updateTotals() {
    let purchase_total = 0;
    let sale_total = 0;
    let total_vat = 0;
    let total_discount = 0;
    let grand_total = 0;
    let item_count = 0;

    $('#item_table tbody tr').each(function () {
        let row = $(this);
        let qty = parseFloat(row.find('.qty').val()) || 0;
        
        if (qty > 0) {
            item_count++;
            let p_price = parseFloat(row.find('.purchase_price').val()) || 0;
            let s_price = parseFloat(row.find('.sale_price').val()) || 0;
            let d_val = parseFloat(row.find('.discount_value').val()) || 0;
            let t_val = parseFloat(row.find('.tax_value').val()) || 0;
            let row_total = parseFloat(row.find('.total').val()) || 0;

            purchase_total += (p_price * qty);
            sale_total += (s_price * qty);
            total_discount += d_val;
            total_vat += t_val;
            grand_total += row_total;
        }
    });

    $('#purchase_price_total').val(formatNumber(purchase_total));
    $('#sale_price_total').val(formatNumber(sale_total));
    $('#vat_total').val(formatNumber(total_vat));
    $('#discount_value').val(formatNumber(total_discount));
    $('#grand_total').val(formatNumber(grand_total));
    $('#items_count').val(item_count);
}

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


