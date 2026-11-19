$(document).on('input', '.qty', function () {
    let value = $(this).val();
    if (value.includes('.')) {
        value = Math.floor(value);
    }
    if (value < 0) {
        value = 0;
    }
    $(this).val(value);
});

$(document).on('change', '.product_name', function () {
    setAutoCodeProduct();
})

function setAutoCodeProduct() {
    var name = $('#product_name').val().trim();
    if (name == '') return;
    var words = name.split(/\s+/);
    var code = '';
    words.forEach(function (word) {
        code += word.charAt(0).toUpperCase();
    });
    var randomNum = Math.floor(Math.random() * 90) + 10;
    code = code + '0' + randomNum;
    $('#product_code').val(code);
    //   $('#vendor_code').attr('readonly', true);
}

$(document).ready(function () {

    function calculate() {

        let sale_price = parseFloat($('#sale_price').val()) || 0;
        let purchase_price = parseFloat($('#purchase_price').val()) || 0;
        let discount = parseFloat($('#discount').val()) || 0;

        let discount_type = $('#discount_type').val();
        let tax_type = $('#selling_price_tax_type').val();

        let tax_rate = parseFloat($('#tax_id option:selected').data('rate')) || 0;
        let price_after_discount = sale_price;

        if (discount_type === 'flat') {
            price_after_discount = sale_price - discount;
        } else if (discount_type === 'percent') {
            price_after_discount = sale_price - (sale_price * discount / 100);
        }

        let final_price = price_after_discount;

        if (tax_type === 'excl') {
            final_price += (price_after_discount * tax_rate / 100);
        } else if (tax_type === 'incl') {
            final_price = price_after_discount;
        }

        let net_profit = final_price - purchase_price;

        $('#final_price').val(final_price.toFixed(2));
        $('#net_profit').val(net_profit.toFixed(2));
    }

    $(document).on('input change',
        '#sale_price, #purchase_price, #discount, #discount_type, #tax_id, #selling_price_tax_type',
        function () {
            calculate();
        }
    );

});
$(document).ready(function () {

    $('#image').on('change', function () {

        let file = this.files[0];
        $('#image_error').text('');
        $('#image').removeClass('is-invalid');

        if (!file) return;

        let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        let maxSize = 2 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            $('#image_error').text('Only JPG, PNG, WEBP images are allowed');
            $('#image').addClass('is-invalid');
            $(this).val('');
            $('#image_preview').hide();
            return;
        }

        if (file.size > maxSize) {
            $('#image_error').text('Image must be less than 2MB');
            $('#image').addClass('is-invalid');
            $(this).val('');
            $('#image_preview').hide();
            return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#image_preview').attr('src', e.target.result).show();
        };
        reader.readAsDataURL(file);

    });

});

$(document).ready(function () {

    function loadCategories(parent_id, target_select) {
        if (!parent_id) {
            $(target_select).html(`<option value="">${window.translations.select}</option>`);
            return;
        }

        $.ajax({
            url: window.routes.getCategories.replace(':parent_id', parent_id),
            type: 'GET',
            success: function (data) {

                let options = `<option value="">${window.translations.select}</option>`;

                $.each(data, function (key, category) {
                    options +=
                        `<option value="${category.id}">${category.name}</option>`;
                });

                $(target_select).html(options).trigger('change');
            }
        });
    }
    $('#category_id').on('change', function () {
        let category_id = $(this).val();

        $('#sub_category_id').html(`<option value="">${window.translations.select}</option>`);
        $('#sub_sub_category_id').html(`<option value="">${window.translations.select}</option>`);

        loadCategories(category_id, '#sub_category_id');
    });


    $('#sub_category_id').on('change', function () {
        let sub_category_id = $(this).val();

        $('#sub_sub_category_id').html(`<option value="">${window.translations.select}</option>`);

        loadCategories(sub_category_id, '#sub_sub_category_id');
    });

});