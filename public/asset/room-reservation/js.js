function form_modal(obj){
    var id = $(obj).data('id') || 0;
    var module = $(obj).data('module');

    var form_urls = [];
    var save_urls = [];
    var form_titles = [];

        form_urls['types'] = 'types/ajax/form.php';
        form_urls['facilities'] = 'facilities/ajax/form.php';
        form_urls['options'] = 'options/ajax/form.php';
        form_urls['status'] = 'status/ajax/form.php';
        form_urls['buildings'] = 'buildings/ajax/form.php';
        form_urls['blocks'] = 'blocks/ajax/form.php';
        form_urls['floors'] = 'floors/ajax/form.php';
        form_urls['rooms'] = 'rooms/ajax/form.php';

        save_urls['types'] = 'types/ajax/save.php';
        save_urls['facilities'] = 'facilities/ajax/save.php';
        save_urls['options'] = 'options/ajax/save.php';
        save_urls['status'] = 'status/ajax/save.php';
        save_urls['buildings'] = 'buildings/ajax/save.php';
        save_urls['blocks'] = 'blocks/ajax/save.php';
        save_urls['floors'] = 'floors/ajax/save.php';
        save_urls['rooms'] = 'rooms/ajax/save.php';

        form_titles['types'] = 'Room Type';
        form_titles['facilities'] = 'Room Facilities';
        form_titles['options'] = 'Room Options';
        form_titles['status'] = 'Room Status';
        form_titles['buildings'] = 'Building';
        form_titles['blocks'] = 'Block';
        form_titles['floors'] = 'Floor';
        form_titles['rooms'] = 'Room';

    var url = 'site/room-reservation/'+ form_urls[module];
	var modal = erp_create_modal(url, { id:id }, { plugins:'selectize', title:form_titles[module] || 'Form' });
    var $modal = $('#'+ modal);

    
	$modal.on('shown.bs.modal', function(){
        if(module == 'rooms'){
            erp_get_accounts_group();

            $('#levy_items').multiselect({
                buttonWidth: '100%',
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                maxHeight: 200,
                buttonText: function(options, select) {
                    if(options.length === 0) {
                        return 'Select Items';
                    } else {
                        var labels = [];
                        options.each(function () {
                            if ($(this).attr('label') !== undefined) {
                                labels.push($(this).attr('label'));
                            } else {
                                labels.push($(this).html());
                            }
                        });
                        return labels.join(', ') + '';
                    }
                }
            });
        }
    });

    $modal.find('.saveBtn').on('click', function(){
		$('#pageLoader').show();
        var $form = $(this).closest('form');
        var formData = $form.serialize();

        var url = site_url + 'site/room-reservation/'+ save_urls[module];
        $.ajaxSetup({ async:true });
        $.post(url, formData, function(res){
            $('#pageLoader').hide();
            if(res.status == 1){
                filter_page(0,1);
                successmsg(res.msg);
                $modal.modal('hide');
            } else {
                errormsg(res.msg);
            }
        });
	});
}

function room_reservation_delete(obj){
    var module = $(obj).data('module');
    var id = $(obj).data('id') || 0;
    confirmDialog('This cannot be undone. Are you sure to delete ?', function(){
        $('#pageLoader').show();
        var url = site_url + 'site/room-reservation/ajax/delete.php';
        $.ajaxSetup({ async:true });
        $.post(url, { module:module, id:id }, function(res){
            $('#pageLoader').hide();
            if(res.status == 1){
                filter_page(0,1);
                successmsg(res.msg);
            } else {
                errormsg(res.msg);
            }
        }).fail(function(response) {
            $('#pageLoader').hide();
            errormsg('Something went wrong');
            console.log(response.responseText);
        });
    });
}

function get_building_blocks(obj){
    var building_id = $(obj).val();
    $select = $(obj).closest('form').find('.blocks');
    select = $select[0].selectize;
    select.clearOptions();
    $select.trigger('change');

    if(!building_id) return;

    $('#pageLoader').show();
    var url = site_url + 'site/room-reservation/ajax/get_building_data.php';
    $.ajaxSetup({ async:true });
    $.post(url, { data:'blocks', building_id:building_id }, function(res){
        $('#pageLoader').hide();
        if(res.status == 0){
            errormsg(res.msg);
            return;
        }
        $.each(res.blocks, function(i,d){
            select.addOption({ value:d.id, text:d.name });
        });
    });
}

function get_building_floors(obj){
    var block_id = $(obj).val();
    $select = $(obj).closest('form').find('.floors');
    select2 = $select[0].selectize;
    select2.clearOptions();
    $select.trigger('change');

    if(!block_id) return;

    $('#pageLoader').show();
    var url = site_url + 'site/room-reservation/ajax/get_building_data.php';
    $.ajaxSetup({ async:true });
    $.post(url, { data:'floors', block_id:block_id }, function(res){
        $('#pageLoader').hide();
        if(res.status == 0){
            errormsg(res.msg);
            return;
        }
        $.each(res.floors, function(i,d){
            select2.addOption({ value:d.id, text:d.name });
        });
    });
}

function room_mrp_change(obj){
	var decimal = $('#hidden_decimal').val();
    var mrp = parseFloat($('.mrp').val() || 0);

    if(!$.isNumeric($(obj).val())){
		return;
	}

	$('.mrp').val(mrp.toFixed(decimal));
	$('.sales-rate').val(mrp.toFixed(decimal));
	$('.min-sales-rate').val(mrp.toFixed(decimal));
	$('.max-discount').val('');
}

function room_sales_rate_change(obj){
	var decimal = $('#hidden_decimal').val();
    var mrp = parseFloat($('.mrp').val() || 0);
    var sales_rate = parseFloat($('.sales-rate').val() || 0);

    if(!$.isNumeric($(obj).val())){
		return;
	}

    if(mrp && sales_rate > mrp){
        toastr.error('Sales rate should not be greater than MRP');
        sales_rate = mrp;
    }

	$('.sales-rate').val(sales_rate.toFixed(decimal));
	$('.min-sales-rate').val(sales_rate.toFixed(decimal));
	$('.max-discount').val('');
}

function room_min_sales_rate_change(obj){
	var decimal = $('#hidden_decimal').val();
    var mrp = parseFloat($('.mrp').val() || 0);
    var sales_rate = parseFloat($('.sales-rate').val() || 0);
    var min_sales_rate = parseFloat($('.min-sales-rate').val() || 0);

    if(!$.isNumeric($(obj).val())){
		return;
	}

    if(mrp && min_sales_rate > mrp){
        toastr.error('Sales rate should not be greater than MRP');
        min_sales_rate = mrp;
    }

    if(!sales_rate || min_sales_rate > sales_rate){
        // toastr.error('Min sales rate should not be greater than sales rate');
        sales_rate = min_sales_rate;
    }

    max_discount = ((sales_rate - min_sales_rate) * 100) / sales_rate;

	$('.sales-rate').val(sales_rate.toFixed(decimal));
	$('.min-sales-rate').val(min_sales_rate.toFixed(decimal));
	$('.max-discount').val(max_discount.toFixed(decimal));
}

function room_max_discount_change(obj){
	var decimal = $('#hidden_decimal').val();
    var sales_rate = parseFloat($('.sales-rate').val() || 0);
    var min_sales_rate = parseFloat($('.min-sales-rate').val() || 0);
    var max_discount = parseFloat($('.max-discount').val() || 0);

    if(!$.isNumeric($(obj).val())){
		return;
	}

    if(max_discount > 100){
        max_discount = 100;
    }
    if(max_discount < 0){
        max_discount = 0;
    }

    min_sales_rate = sales_rate - (sales_rate * max_discount) / 100;

	$('.min-sales-rate').val(min_sales_rate.toFixed(decimal));
	$('.max-discount').val(max_discount.toFixed(decimal));
}


function erp_get_accounts_group(){
	var url = site_url + 'site/products/account_group/get_data.php';
	$('#acc_group_guid option:not(:first)').remove();
	$('#acc_group_guid2 option:not(:first)').remove();
	$('#acc_group_guid3 option:not(:first)').remove();

	$.ajax({ 
		url: url,
		method:"POST",
		dataType: "json",
		data:{type:'service'},	
		success: function(data)   {
			$.each(data, function(i, field) {
				var name = field.name;
				var code = field.code;
				var id = field.id;
				var is_ledger = field.is_ledger;
				var main_guid =  field.main_guid;
                var disabled = is_ledger ? '' : 'disabled';
				var Optionclass = "";
				if(is_ledger == 1){
					Optionclass = "class='red'";
				} else if(main_guid == 1){
					Optionclass = "class='blue'";
				} else {
					Optionclass = "class='grey'";
				}

				var option = '<option  '+Optionclass+' data-name="'+name+'" data-ledger="'+is_ledger+'" value="'+id+'" '+ disabled +' >'+name+' ('+code+')</option>';

                $("#acc_group_guid").append(option);
				$("#acc_group_guid2").append(option);
				$("#acc_group_guid3").append(option);

			});	

			$('#acc_group_guid, #acc_group_guid2, #acc_group_guid3').multiselect({
				buttonWidth: '100%',
				enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
				multiple: false,
				selectedList: 1,
				maxHeight: 450,
				enableCaseInsensitiveFiltering: true,
				buttonText: function (options, select) {
					if (options.length === 0) {
					   return 'Account Group';
					}
					else if (options.length > 3) {
						return 'Multiple selected!';
				    }
					else {
						var labels = [];
						options.each(function () {
						   if ($(this).attr('label') !== undefined) {
					   			labels.push($(this).attr('label'));
				   			}
							else {
								var label = $(this).text().trim();
								labels.push(label);
							}
			  			});
					    return labels.join(', ') + '';
					}
				}
			});
		}   
	});
}