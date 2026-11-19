jQuery('body').on('click', '.addBtnSupplier', function () {
	return erp_on_supplier(this);
});

jQuery('body').on('click', '.BookingCustomer', function () {
	return erp_on_supplierCustomer(this);
});
jQuery('body').on('focus', '#supplier', function () {
	return erp_clear_supplier_input(this);
});

jQuery('body').on('click', '.add_orderitem', function (event, data) {
	return erp_add_order_items(this, data);
});
jQuery('body').on('focus', '#product', function () {
	return erp_clear_input(this);
});
jQuery('body').on('focus', '#addBtn', function () {
	
	if (!supplierFound()) {
		toastr.error("Select Supplier First");
		return;
	} else {
		return erp_on_product_item(this);
	}
});

jQuery('body').on('focusout', '#maxdiscount_0', function () {
	return erp_add_order_items(this);
});

jQuery('body').on('keyup', '.oqty', function () {
	erp_set_alter_qty_total(this);
	return erp_set_purchasetotal(this);
});
jQuery('body').on('keyup', '.alter_qty', function () {
	erp_set_alter_qty_total(this);
});

jQuery('body').on('keyup', '.discount', function () {
	return erp_set_discount(this);
});
jQuery('body').on('blur', '.discount', function () {
	// if(isNAN(this.value) > 0){
	if (this.getAttribute('data-fa') == 1) {
		var nameIndex = $(".discount").index(this); // Get index relative to all .oqty elements
		var id = this.getAttribute('data-index');
		var without_slno = this.getAttribute('data-without_slno');
		var qty = $('#qty_' + id).val();
		var name = $('#name_div_' + id).html();
		var unitPrice = $('#net_unit_price_' + id).val();
		var unitName = $('#unit_id_' + id).find('option:selected').text();
		var unitID = $('#unit_id_' + id).find('option:selected').val();
		var prodID = $(this).attr('data-proid');
		var months = $(this).attr('data-months');
		var process_type = 4;
		fixedAssetForm(name, qty, unitPrice, unitName, id, nameIndex, prodID, unitID, months, process_type, 0, without_slno);
	}
	// }
});
function supplierFound() {
	var flag = false;
	
	if ($('#supplier_id').val() > 0) {
		flag = true;
	}
	return flag;
}
jQuery('body').on('keyup', '.invoice_discount', function () {
	var decimals = $('#currency_id_select').find('option:selected').attr('data-decimal');
	var curr_rate = $('#curr_rate').val();

	var doc_discount = cnv_Float($(this).val());
	var foreign_doc_discount = cnv_Float(doc_discount / curr_rate, decimals);

	$('#foreign_doc_discount').val(foreign_doc_discount);
	erp_set_amount_info();
});

jQuery('body').on('change', '#requisition_id', function () {
	return erp_load_requisition_qty(this);
});

jQuery('body').on('change', '.pqty', function () {
	return erp_check_qty(this);
});

jQuery('body').on('click', '#reqsearchBtn', function () {
	return erp_load_pending_items(this);
});

jQuery('body').on('change', '#inquiry_ref', function () {
	$('#reqsearchBtn').trigger('click');
});

jQuery('body').on('click', '.process_btn', function () {
	return erp_process_order(this);
});

jQuery('body').on('click', '#view_amount_info', function () {
	return erp_view_amount_info(this);
});

jQuery('body').on('click', '#all_qty', function () {
	return erp_recieve_all_qty(this);
});

jQuery('body').on('keyup', '.expamount', function () {
	return erp_set_expense_amount(this);
});

jQuery('body').on('click', '#addExpense', function () {
	return erp_on_expense_item(this);
});

jQuery('body').on('click', '.add_expenseitem', function () {
	return erp_add_expense_items(this);
});
jQuery('body').on('change', '#expense_vat_0', function () {
	return erp_add_expense_items(this);
});

jQuery('body').on('click', '.expandBtn', function () {
	return erp_table_expand(this);
});
jQuery('body').on('click', '#button-excel2', function () {
	return m_erp_export_excel(this);
});

function m_erp_export_excel(obj) {
	var export_type = $(obj).attr('data-type');
	$('#export_type').val(export_type);
	var siteurl = $(obj).attr('data-url');
	var formData = $('#filter_form').serialize();
	var url = atob(siteurl);
	$('#spiner_' + export_type).show();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: formData,
		success: function (response) {
			$('#spiner_' + export_type).hide();
			var load_status = response.load_status;
			if (load_status == 1) {
				var download_url = response.download_url;
				if (export_type == 1) {
					window.location = download_url;

				} else {
					msgModal(download_url);
				}
			} else {
				errormsg(response.error_msg);
			}
		}
	}).fail(function (jqXHR, textStatus, error) { });
	return;
}

$(document).on('click', '.unit-price-editable', function () {
	document.execCommand('selectAll', false, null);
})
$(document).on('blur', '.unit-price-editable', function () {
	var amt = $(this).html();
	$(this).html(cnv_Float(amt));
	set_trade_unit(this, 1);
	if (this.getAttribute('data-fa') == 1) {
		var nameIndex = $(".unit-price-editable").index(this); // Get index relative to all .oqty elements
		var id = this.getAttribute('data-id');
		var without_slno = this.getAttribute('data-without_slno');
		var qty = $('#qty_' + id).val();
		var name = $('#name_div_' + id).html();
		var unitPrice = $('#net_unit_price_' + id).val();
		var unitName = $('#unit_id_' + id).find('option:selected').text();
		var unitID = $('#unit_id_' + id).find('option:selected').val();
		var prodID = $(this).attr('data-proid');
		var months = $(this).attr('data-months');
		var process_type = 4;
		fixedAssetForm(name, qty, unitPrice, unitName, id, nameIndex, prodID, unitID, months, process_type, 0, without_slno);
	}
})
$(document).on('keydown', '.unit-price-editable', function (e) {
	if (e.keyCode == 13) {
		$(this).trigger('blur');
	}
})
$(document).on('keyup', '.unit-price-editable', function () {
	var price = cnv_Float($(this).html());
	var id = $(this).data('id');
	$('#unit_price_' + id).val(price);
	erp_set_purchasetotal(document.getElementById('qty_' + id));


	var foreign_decimals = $('#currency_id_select').find('option:selected').attr('data-decimal');
	var curr_rate = $('#curr_rate').val();

	var foreign_unit_price = cnv_Float(price / curr_rate, foreign_decimals);
	$('#foreign_unit_price_' + id).val(foreign_unit_price);
	$('#recomm_sales_price_' + id).val(price);

	erp_foreign_set_line_total(id);
})

async function get_item_unit_list(product_id, sup_code = '') {
	return new Promise((resolve, reject) => {
		var store_id = $('.select_store_id').find('option:selected').val();
		var unit_url = $('#get_units_url').val();
		$.ajax({
			type: "POST",
			dataType: "json",
			timeout: 30000,
			url: atob(unit_url),
			data: {
				'product_id': product_id,
				'store_id': store_id,
				'sup_code': sup_code
			},
			success: (response) => {
				if (response.units != '') {
					resolve(response);
				} else {
					reject(response);
				}
			},
			error: (response) => {
				reject(response);
			}
		});


	})
}

async function erp_addItems(item) {
	var sup_code = $('#supplier_id').attr('code');
	try {
		await get_item_unit_list(item.id, sup_code)
			.then((unitResponse) => {
				var unitHtml = '';
				var unitsJson = btoa(unescape(encodeURIComponent(JSON.stringify(unitResponse.units))));
				$.each(unitResponse.units, function (k, v) {
					$selected = '';
					if (v.punit2 > 0) {
						if (v.punit2 == v.cid) $selected = 'selected="selected"';
					} else {
						if (v.packing_unit == v.punit) {
							selected = 'selected="selected"';
						}
					}
					unitHtml += `<option  
											${$selected}
											data-cost="${v.cost}"
											data-cid="${v.cid}"
											data-tot_unit="${v.tot_unit}"
											data-description="${v.description}"
											data-code="${v.code}"
											data-rate="${v.sales_rate}" 
											data-max_discount="${v.maxDiscount}" 
											data-min_sales_rate="${v.min_sales_rate}" 
											value="${v.id}">${v.name} </option>`;
				});
				var decimal = $('#hidden_decimal').val();
				$('#item_table').show();
				var data = item.data;
				var product_name = data.name;
				var tradeUnit = data.trade_2_unit;
				var product_code = data.code;
				var product_id = data.id;
				var cost = data.cost;
				var max_discount = data.max_discount;
				var tax_id = data.tax_id;
				var tax = data.tax;
				var tax_type = data.tax_type;
				if (tax == null) {
					tax = 0;
				}
				var unit_id = data.unit_id;
				var rowCount = $('.item_row').length;
				$('#ritem_slno').html(rowCount + 1);
				$('#ritem').show();
				$('#product_id_0').val(product_id);
				$('#unit_id_0').html(unitHtml);
				$('#unit_id_0').attr('data-batch', unitResponse.batch);
				$('#unit_id_0').attr('data-expiry', unitResponse.expiry);
				// $('#unit_id_0').attr('data-date_as_batch', unitResponse.date_as_batch);
				$('#unit_id_0').attr('data-auto_expiry_days', unitResponse.auto_expiry_days);
				$('#unit_id_0').attr('data-auto_expiry_after', unitResponse.auto_expiry_after);
				$('#unit_id_0').attr('data-expiry_date', unitResponse.expiry_date);
				$('#unit_id_0').attr('data-batch_number', unitResponse.batch_number);
				$('#unit_id_0').attr('data-srnumber', unitResponse.is_serial_number);
				$('#unit_id_0').attr('data-array', unitsJson);
				$('#unit_id_0').attr('data-is_fa_item', unitResponse.is_fa_item);
				$('#unit_id_0').attr('data-without_slno', unitResponse.without_slno);
				$('#unit_id_0').attr('data-months', unitResponse.months);
				$('#unit_id_0').attr('data-is_air_ticket', unitResponse.air_ticket);
				$('#unit_id_0').attr('data-is_non_inv_item', unitResponse.is_non_inv_item);
				if (unitResponse.is_non_inv_item == 1) $('#unit_id_0').attr('data-conunit', data.con_unit);
				$('#unit_id_0').attr('data-vat', tax);
				$('#unit_id_0').attr('data-trade-unit', tradeUnit);
				$('#unit_price_0').val(cost);
				$('#net_unit_price_0').val(cost);
				$('#tax_0').val(tax);
				$('#tax_0').attr('type', tax_type);
				$('#tax_id_0').val(tax_id);
				$('#ritem_code_0').html(product_code);
				$('#ritem_name_0').html(product_name);
				$('#ritem_unitprice_0').html(parseFloat(cost).toFixed(decimal));
				$('#max_discount_0').attr('data-allowed', max_discount);
				if (tax_id != 0) {
					$('#ritem_vat_0').html(tax + '%');
				}
				var perunit = erp_discount_per_unit();
				$('#ritem_discount_unit_0').html(perunit);
				$('#ritem_totalafterdiscount_0').html(parseFloat(cost).toFixed(decimal));
				$('#qty_0').focus();
				if (unitResponse.is_non_inv_item == 1) $('#qty_0').val(1);
				if (data.is_insurance == 1) {
					$('#qty_0').val(1);

					var siteurl = $('#siteurl').val();
					var supplier_id = $('#supplier_id').val();
					var date = $('#purchase_date').val();

					if ($.isNumeric(supplier_id) && supplier_id > 0) {
						$.ajaxSetup({ async: false });
						$.post(siteurl + 'site/insurance_masters/get_supplier_commision.php', { supplier_id: supplier_id, insurance_id: data.insurance_id, date: date }, function (result) {
							var result = $.parseJSON(result);
							result = result.data;
							$('#ins_comm_perc_0').val(result.commision);
						});
					}
				}

				$('.add_orderitem').trigger('click', [data]);

			}).catch((error) => { // so we can catch
				console.log(error);
				window.alert("Item is not associated with any units.");
				return false;
			});
		// if(item.data.is_insurance == 1){
		// 	get_insurance_commision(item.data.insurance_id);
		// 	$('#qty_0').val(1);
		// }
	} catch (e) {
		console.log(e);
	}
}

function erp_check_qty(obj) {
	var qty = $(obj).val();
	var current = $(obj).attr('data-current');
	var ordered = $(obj).attr('data-ordered');
	var rqty = $(obj).attr('data-rqty');
	var netQty = parseFloat(qty) + parseFloat(ordered);
	if (netQty > rqty) {
		$(obj).val(current);
	}
}

function erp_on_supplier(obj) {
	$('#supplier_input').css('display', 'flex');
	$('#supplier_info').hide();
	$('#btnGroupSupplier').hide();
	$('#supplier').focus();
}


function erp_add_supplier(item, type = 0) {
	var data = item.data;
	var id = data.id;
	if (type == 1) {
		id = item.edited;
	}
	var supplierName = data.name;
	var code = data.code;
	var address = data.address;
	var email = data.email;
	var country = data.country;
	var mobile = data.mobile;
	var html = '<p>To: <br> <b>' + supplierName + '</b><br>';
	html += address + '</br>';
	html += 'Email: ' + email + '<br>';
	html += 'Mobile: ' + mobile + ' <br>';
	html += 'Country: ' + data.countryName + '<br>';
	html += 'Currency: ' + data.currency_code + ' <i class="fa ti-pencil addBtnSupplier"></i></p>';

	$('#supplier_info').html(html);
	$('#is_branch').val(parseInt(cnv_Float(data.is_branch)));
	$('#supplier_input').hide();
	$('#supplier_info').show();
	$('#inquiry_ref').val(0);
	$('#local_taxable').val(data.taxable);
	$('#is_branch').val(data.is_branch);
	$('#supplier').val('');
	$('#supplier_id').val(id).attr('code', code);
	$('#reqsearchBtn').trigger('click');


	var company_country = $('#company_country_id').val();
	if (country == company_country) {
		$('input[name="purchase_type"][value="2"]').removeAttr('checked');
		$('input[name="purchase_type"][value="1"]').prop('checked', true);
		$('input[name="purchase_type"][value="1"]').trigger('change');
	} else {
		$('input[name="purchase_type"][value="1"]').removeAttr('checked');
		$('input[name="purchase_type"][value="2"]').prop('checked', true);
		$('input[name="purchase_type"][value="2"]').trigger('change');
	}
	if (data.supplier_group_id) {
		var pur_grp_attr = $('#voucher_types').find('option:selected').attr('data-sup_grp');
		var pur_ledgr_attr = $('#voucher_types').find('option:selected').attr('data-pur_ledgr');

		if (pur_grp_attr && pur_ledgr_attr) {
			var pur_grp_arr = pur_grp_attr.split(',');
			var pur_ledgr_arr = pur_ledgr_attr.split(',');
			var index = pur_grp_arr.indexOf(data.supplier_group_id);

			if (index !== -1 && pur_ledgr_arr[index]) {
				var corresponding_pur_ledgr = pur_ledgr_arr[index];
				$('#purchase_ledger').val(corresponding_pur_ledgr).trigger('change');
			}
		}

	}
	if (data.currency_id) {
		$('#currency_id_select').val(data.currency_id);
		$('#currency_id_select').trigger('change');
	}

}


function erp_recieve_all_qty(obj) {
	if ($(obj).is(':checked')) {
		$('.oqty').each(function (index) {
			var rqty = $(this).attr('data-rqty');
			$(this).val(rqty);
			erp_set_purchasetotal(this);
		});
	} else {
		$('.oqty').each(function (index) {
			var rqty = '';
			$(this).val(rqty);
			erp_set_purchasetotal(this);
		});
	}
}
function customer_edit_form(obj) {
	$(function () {

		var modalwidth = "60";
		var dynamic = "0";
		var action = "";
		var hidefooter = 0;
		var hidesavebtn = 0;
		var siteurl = $(obj).attr('data-url');
		var id = $(obj).attr('data-id');
		var title = $(obj).attr('data-title');
		var btnlabel = $(obj).attr('data-btnlabel');
		var param = $(obj).attr('data-param');
		if ($(obj).attr('data-modalwidth')) {
			modalwidth = $(obj).attr('data-modalwidth');
		}
		if ($(obj).attr('data-dynamic')) {
			dynamic = $(obj).attr('data-dynamic');
		}
		if ($(obj).attr('data-action')) {
			action = $(obj).attr('data-action');
		}
		if ($(obj).attr('data-hidefooter')) {
			hidefooter = Math.abs($(obj).attr('data-hidefooter'));
		}
		if ($(obj).attr('data-hidesavebtn')) {
			hidesavebtn = Math.abs($(obj).attr('data-hidesavebtn'));
		}

		var url = atob(siteurl);
		preloader_on();
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				preloader_off();
				if (hidefooter == 1) {
					$('#plusModal').find('.card-footer').hide();
					$('#plusModal').find('.closeBtn').show();
				} else {
					$('#plusModal').find('.card-footer').show();
					$('#plusModal').find('.closeBtn').hide();
				}
				if (hidesavebtn == 1) {
					$('#plusModal').find('#plussaveBtn').hide();
				} else {
					$('#plusModal').find('#plussaveBtn').show();
				}
				if (dynamic == 1) {
					erp_open_moal(this.responseText);
					$('#innerform').attr('action', action);
					$('#innerModalLabel').html(title);
				} else {
					if (action != "") {
						$('#plusmodalform').attr('action', action);
					}
					$('.plusmodal-dialog').css('width', modalwidth + '%');
					$('#plusModal').modal('show');
					$('#plusmodal_title').html(title);
					$('#plussaveBtn').html('<i class="fa fa-plus-circle"></i> ' + btnlabel);
					$('#plusformDiv').html(this.responseText);
				}

			}
		};
		xmlhttp.open("GET", url + "?jsondata=" + param, true);
		xmlhttp.send();
	})
}

function erp_push_data(data) {
	$('#requisition_table').show();
	$('.ritem_row').remove();
	let refArray = [];
	var n = 1;
	$.each(data, function (i, field) {
		var rid = field.id;
		var requisition_id = field.requisition_id;
		var product_id = field.product_id;
		var unit_id = field.unit_id;
		var product_name = field.name;
		var product_code = field.code;
		var ref = field.ref;
		var qty = field.qty;
		var ordered_qty = field.received_qty;
		var balance = qty - ordered_qty;
		var required_date = field.required_date;
		refArray.push([requisition_id, ref]);
		var input = '<input type="number" class="form-control form-control-sm pqty" data-current="0" data-ordered ="' + ordered_qty + '" data-rqty="' + qty + '" name="pitem[qty][]" value="">';
		input += '<input type="hidden"  name="pitem[requisition_id][]" value="' + rid + '">';
		input += '<input type="hidden"  name="pitem[product_id][]" value="' + product_id + '">';
		input += '<input type="hidden"  name="pitem[unit_id][]" value="' + unit_id + '">';
		var cancel = '<a href="#" data-id="0" onclick="return delete_row(this)"><i class="ti-trash" style="font-weight: bold;"></i></a>';
		var html = '<tr class="ritem_row" data-id="' + product_id + '">';
		html += '<td class="left bitems" data-id="' + product_id + '">' + required_date + '</td>';
		html += '<td class="left">' + ref + '</td>';
		html += '<td class="left">' + product_name + '</td>';
		html += '<td class="left">' + product_code + '</td>';
		html += '<td class="left">' + qty + '</td>';
		html += '<td class="left">' + ordered_qty + '</td>';
		html += '<td class="left">' + balance + '</td>';
		html += '<td class="left">' + input + '</td>';
		html += '<td class="left">' + cancel + '</td>';
		html += '</tr>';
		$('#requisition_table tr:last').after(html);
		n++;
	});
	erp_set_requisition_ref(refArray);
}

function erp_multiDimensionalUnique(arr) {
	var uniques = [];
	var itemsFound = {};
	for (var i = 0, l = arr.length; i < l; i++) {
		var stringified = JSON.stringify(arr[i]);
		if (itemsFound[stringified]) { continue; }
		uniques.push(arr[i]);
		itemsFound[stringified] = true;
	}
	return uniques;
}

function erp_set_requisition_ref(data) {
	var inquiry_ref = $('#inquiry_ref').val();
	if (inquiry_ref != 0) {
		return;
	}
	var ref = erp_multiDimensionalUnique(data);
	var html = "";
	html += '<option value="0" >Select</option>';
	for (var i = 0; i < ref.length; i++) {
		var refId = ref[i][0];
		var refName = ref[i][1];
		html += '<option value="' + refId + '" >' + refName + '</option>';
	}
	$('#inquiry_ref').html(html);
}

function erp_load_pending_items(obj) {
	var siteurl = $(obj).attr('data-url');
	var supplier_id = $('#supplier_id').val();
	if (supplier_id == 0) {
		erp_on_supplier(obj);
		return;
	}
	var id = $('#inquiry_ref').val();
	var date_from = $('#date_from').val();
	var date_to = $('#date_to').val();
	var url = atob(siteurl);
	var type = 3;
	preloader_on();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: { id: id, type: type, supplier_id: supplier_id, date_from: date_from, date_to: date_to },
		success: function (response) {
			//console.log(response);
			preloader_off();
			var load_status = response.load_status;
			if (load_status == 0) {
				$('#requisition_table').hide();
				$('.ritem_row').remove();
				errormsg("Sorry!. Have no requisition items");
				return;
			}
			var data = response.data;
			erp_push_data(data);
		}
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(error);
	});
}

function erp_load_requisition_qty(obj) {
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).val();
	var product_id = $('#product_id').val();
	var url = atob(siteurl);
	var type = 2;
	preloader_on();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: { id: id, type: type, product_id: product_id },
		success: function (response) {
			//console.log(response);
			preloader_off();
			var load_status = response.load_status;
			if (load_status == 1) {
				var qty = response.qty;
				var balance = response.balance;

				$('#ritem_reqqty').html(qty);
				$('#req_qty').val(qty);
				$('#ritem_reqbalqty').html(balance);
				$('#req_balqty').val(balance);
				if (balance == 0) {
					$('#rqty').attr('disabled', true);
					return;
				}
			} else {
				$('#ritem_reqqty').html('Nil');
				$('#ritem_reqbalqty').html('Nil');
				$('#req_qty').val(0);
				$('#req_qty').val(0);
				$('#rqty').attr('disabled', false);
			}
		}
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(error);
	});
}

function erp_on_product_item(obj) {
 
	$('#product_input').show();
	$('#btnGroup').hide();
	$('#product').focus();
	//---------------
	$('#expense_div').hide();
	$('.expense_btn_group').show();
}

function erp_clear_input(obj) {
	$('#product').val('');
}
function erp_clear_supplier_input(obj) {
	$(obj).val('');
}
function erp_add_items(item) {
	//console.log(1,'a');
	//console.log(item);
	$('#item_table').show();
	var data = item.data;
	var product_name = data.name;
	var product_code = data.code;
	var product_id = data.id;
	var cost = data.cost;
	var max_discount = data.max_discount;
	var tax_id = data.tax_id;
	var tax = data.tax;
	var unit_id = data.unit_id;

	var rowCount = $('#requisition_table tr').length;
	$('#ritem_slno').html(rowCount - 1);
	$('#ritem').show();
	$('#product_id').val(product_id);
	$('#unit_id').val(unit_id);
	$('#unit_price').val(cost);
	$('#tax').val(tax);
	$('#tax_id').val(tax_id);
	$('#ritem_code').html(product_code);
	$('#ritem_name').html(product_name);
	$('#ritem_unitprice').html(cost);
	$('#max_discount').attr('data-allowed', max_discount);
	$('#ritem_vat').html(tax);
	var perunit = erp_discount_per_unit();
	$('#ritem_discount_unit').html(perunit);
	$('#rqty').focus();

}

function erp_discount_per_unit() {
	var decimal = $('#hidden_decimal').val();
	var unit_price = $('#unit_price_0').val();
	var max_discount = $('#maxdiscount_0').val();
	var net = Math.abs(unit_price) * Math.abs(max_discount);
	var perunit = net / 100;
	var netAmount = Math.abs(unit_price) - Math.abs(perunit);
	return perunit.toFixed(decimal);
}
function erp_set_discount(obj, type = 0) {
	var decimal = $('#comp_decimal').val();
	if (type == 0) {
		var index = $(obj).attr('data-index');
		var qty = $('#qty_' + index).val();
		if (qty > 0) {
			var max_discount = $(obj).val();
			var unit_price = cnv_Float($('#unit_price_' + index).val(), decimal);

			var grosstotalAmt = cnv_Float($('#gross_total_' + index).val(), decimal);
			var totDiscountAmt = (Math.abs(grosstotalAmt) * Math.abs(max_discount)) / 100;
			var grosstotalAfterDiscAmt = Math.abs(grosstotalAmt) - Math.abs(totDiscountAmt);
			console.log('grosstotalAfterDiscAmt' + grosstotalAfterDiscAmt);

			var discPerUnit = Math.abs(totDiscountAmt) / qty;
			var netUnitPrice = unit_price - discPerUnit;
			console.log('netUnitPrice' + netUnitPrice);
			$('#ritem_discount_unit_' + index).html(discPerUnit.toFixed(decimal));
			$('#max_discount_item_' + index).val(discPerUnit);
			$('#net_unit_price_' + index).val(netUnitPrice.toFixed(decimal));
			$('#ritem_totalafterdiscount_' + index).html(netUnitPrice.toFixed(decimal));

			var tax = $('#tax_' + index).val();
			if ($('input[name="special_vat_zero"][value="1"]').is(':checked')) {
				tax = 0;
			}
			else if (is_overseas()) {
				tax = 0;
			}
			else if (parseFloat($('#local_taxable').val()) != 1 || parseFloat($('#is_branch').val() == 1)) {
				tax = 0;
			}

			// $('#ritem_totalbeforediscount_'+index).html(toCommas(cnv_Float(net,decimal)));
			// $('#gross_total_'+index).val(grosstotalAmt);

			$('#ritem_grosstotal_' + index).html(toCommas(cnv_Float(grosstotalAfterDiscAmt, decimal)));
			$('#gross_total_after_' + index).val(grosstotalAfterDiscAmt);
			var taxAmount = (tax / 100) * Math.abs(grosstotalAfterDiscAmt);
			$('#ritem_vatamount_' + index).html(toCommas(cnv_Float(taxAmount, decimal)));

			$('#tax_amount_' + index).val(cnv_Float(taxAmount, decimal));
			var netTotal = Math.abs(grosstotalAfterDiscAmt) + Math.abs(cnv_Float(taxAmount, decimal));
			$('#ritem_nettotal_' + index).html(toCommas(cnv_Float(netTotal, decimal)));
			$('#net_amount_' + index).val(cnv_Float(netTotal, decimal));
			// $('#discount_per_unit').val(netdiscount);
		} else {
			var zeroAmt = 0;
			var index = $(obj).attr('data-index');
			$('#ritem_discount_unit_' + index).html(zeroAmt.toFixed(decimal));
			$('#max_discount_item_' + index).val(zeroAmt);
			$('#net_unit_price_' + index).val(zeroAmt.toFixed(decimal));
			$('#ritem_totalafterdiscount_' + index).html(zeroAmt.toFixed(decimal));
		}
		erp_set_purchasetotal(obj, true, 0, 1);
	}

}
function erp_set_purchasetotal(obj, loadAll = true, lastID = 0, type = 0) {
	var index = $(obj).attr('data-index');
	if (type == 0) {
		var decimal = $('#comp_decimal').val();

		var qty = $('#qty_' + index).val();
		if (parseFloat(qty) == NaN) {
			qty = 0;
		}
		var unit_price = cnv_Float($('#unit_price_' + index).val(), decimal);
		var tax = $('#tax_' + index).val();
		var max_discount = $('#maxdiscount_' + index).val();
		var grosstotalAmt = Math.abs(qty) * Math.abs(unit_price);
		var totDiscountAmt = (Math.abs(grosstotalAmt) * Math.abs(max_discount)) / 100;
		var grosstotalAfterDiscAmt = Math.abs(grosstotalAmt) - Math.abs(totDiscountAmt);
		var discPerUnit = Math.abs(totDiscountAmt) / qty;
		var netUnitPrice = unit_price - discPerUnit;
		//mukesh
		if ($('input[name="special_vat_zero"][value="1"]').is(':checked')) {
			tax = 0;
		}
		else if (is_overseas()) {
			tax = 0;
		}
		else if (parseFloat($('#local_taxable').val()) != 1 || parseFloat($('#is_branch').val() == 1)) {
			tax = 0;
		}
		//endmukesh

		$('#ritem_totalbeforediscount_' + index).html(toCommas(cnv_Float(grosstotalAmt, decimal)));
		$('#gross_total_' + index).val(grosstotalAmt);
		$('#ritem_discount_unit_' + index).html(discPerUnit.toFixed(decimal));
		$('#max_discount_item_' + index).val(discPerUnit);
		$('#net_unit_price_' + index).val(netUnitPrice.toFixed(decimal));
		$('#ritem_totalafterdiscount_' + index).html(netUnitPrice.toFixed(decimal));
		$('#ritem_grosstotal_' + index).html(toCommas(cnv_Float(grosstotalAfterDiscAmt, decimal)));
		$('#gross_total_after_' + index).val(grosstotalAfterDiscAmt);
		var taxAmount = (tax / 100) * Math.abs(grosstotalAfterDiscAmt);
		$('#ritem_vatamount_' + index).html(toCommas(cnv_Float(taxAmount, decimal)));
		$('#tax_amount_' + index).val(taxAmount);
		var netTotal = Math.abs(grosstotalAfterDiscAmt) + Math.abs(taxAmount);
		$('#ritem_nettotal_' + index).html(toCommas(cnv_Float(netTotal, decimal)));
		$('#net_amount_' + index).val(cnv_Float(netTotal, decimal));
		// $('#discount_per_unit').val(netdiscount);



	}

	erp_foreign_set_line_total(index);
	if (loadAll) erp_set_amount_info(erp_set_purchasetotal);
	else {
		if (index == lastID) erp_set_amount_info(erp_set_purchasetotal);
	}
}




function erp_add_order_items(obj, data = []) {
	var decimal = $('#hidden_decimal').val();
	var isorder = $(obj).attr('data-isorder');
	var rn = erp_random();
	var slno = $('#ritem_slno').html();
	var company_curr_id = $('#company_curr_id').val();
	var currency_id = $('#currency_id_select').val();
	var curr_rate = $('#curr_rate').val();
	var foreign_decimals = $('#currency_id_select').find('option:selected').attr('data-decimal');
	let foreignn = (company_curr_id == currency_id) ? 0 : 1;
	var product_id = $('#product_id_0').val();

	var unit_id = $("#unit_id_0 option:selected").val();
	var compound_id = $("#unit_id_0 option:selected").attr('data-cid');
	var unitJson = $('#unit_id_0').attr('data-array');

	var is_non_inv_item = $('#unit_id_0').attr('data-is_non_inv_item');
	var is_fa_item = $('#unit_id_0').attr('data-is_fa_item');
	var without_slno = $('#unit_id_0').attr('data-without_slno');
	var months = $('#unit_id_0').attr('data-months');
	var is_batch = isNAN($('#unit_id_0').attr('data-batch'));
	var is_serial_number = isNAN($('#unit_id_0').attr('data-srnumber'));
	var is_expiry = isNAN($('#unit_id_0').attr('data-expiry'));
	// var is_date_as_batch = parseInt(cnv_Float($('#unit_id_0').attr('data-date_as_batch')));
	var is_auto_expiry_days = isNAN($('#unit_id_0').attr('data-auto_expiry_days'));
	var auto_expiry_after = isNAN($('#unit_id_0').attr('data-auto_expiry_after'));
	var expiry_date = $('#unit_id_0').attr('data-expiry_date');
	var tradeUnit = $('#unit_id_0').attr('data-trade-unit');
	var ActualBatchNumber = $('#unit_id_0').attr('data-batch_number');
	var unitResponse = JSON.parse(atob(unitJson));

	var airTicket = $('#unit_id_0').attr('data-is_air_ticket');
	var conUnit = '';
	if (is_non_inv_item == 1) conUnit = $('#unit_id_0').attr('data-conunit');
	var unitHtml = '';
	var selected = '';
	var tot_unit = 1;
	var xcv = 0;
	$.each(unitResponse, function (k, v) {
		selected = '';
		if (xcv == 0) { tot_unit = v.tot_unit; xcv++; }
		if (compound_id == v.cid) {
			selected = 'selected';
			tot_unit = v.tot_unit;
		} else if (v.punit2 > 0) {
			if (v.punit2 == v.cid) {
				selected = 'selected="selected"';
				tot_unit = v.tot_unit;
			}
		} else if (v.punit > 0) {
			if (v.punit == v.packing_unit) {
				selected = 'selected="selected"';
				tot_unit = v.tot_unit;
			}
		}
		else {
			selected = '';
		}
		unitHtml += `<option  ${selected} 
											data-cid="${v.cid}"
											data-description="${v.description}"
											data-packing_desc="${v.packing_desc}"
											data-code="${v.code}"
											data-cost="${v.cost}"
											data-cost="${v.cost}"
											data-tot_unit="${v.tot_unit}" 
											data-max_discount="${v.maxDiscount}" 
											data-min_sales_rate="${v.min_sales_rate}" 
											value="${v.id}">${v.name} ${v.packing_desc} </option>`;
	});
	var unit_price = $('#unit_price_0').val();
	var max_discount = $('#maxdiscount_0').val();
	var discount_perunit = erp_discount_per_unit();
	var unit_price_after_discount = Math.abs(unit_price) - Math.abs(discount_perunit);
	var product_name = $('#ritem_name_0').html();
	var product_code = $('#ritem_code_0').html();
	var qty = $('#qty_0').val();
	var tax_id = $('#tax_id_0').val();
	var tax = $('#tax_0').val();
	var tax_type = $('#tax_0').attr('type');

	// var unit_data = $( "#unit_id_0").html();
	var grossTotal = Math.abs(qty) * Math.abs(unit_price_after_discount);
	grossTotal = grossTotal.toFixed(decimal);
	var total_before_discount = Math.abs(qty) * Math.abs(unit_price);
	var total_after_discount = Math.abs(qty) * Math.abs(unit_price_after_discount);
	var taxAmount = (tax / 100) * Math.abs(grossTotal);
	var netTotal = Math.abs(grossTotal) + Math.abs(taxAmount);
	netTotal = netTotal.toFixed(decimal);
	var requisition_id = $('#requisition_id').val();
	if (requisition_id == 0) {
		var ref = 'Nil';
		var req_qty = 'Nil';
		var req_balqty = 0;

	} else {
		var ref = $("#requisition_id option:selected").text();
		var req_qty = $('#req_qty').val();
		var req_balqty = $('#req_balqty').val();
	}

	var ins_comm_perc = $('#ins_comm_perc_0').val();
	var ins_comm_amount = (Math.abs(grossTotal) * Math.abs(ins_comm_perc)) / 100;

	var SNB = ``;
	if (is_batch || is_serial_number) {
		// SNB = `<span class="batch_number_span" data-id="${rn}" >SN</span>`;
		SNB = `<span class="batch_number_span" onclick="erp_enter_batch_details($(this).closest('tr'))">SN</span>`;
	}
	var rack_bin = `<span class="rack_bin_span" data-id="${rn}" data-product-id="${product_id}">Bin</span>
					<input type="hidden" name="pitem[bin_qty][]" class="bin_qty" id="bin_qty_${rn}" />`;

	var blank = '#';
	var input = '<input type="hidden" class="product_id" name="pitem[product_id][]" value="' + product_id + '">';
	input += '<input type="hidden" name="pitem[requisition_id][]" value="' + requisition_id + '">';
	input += '<input type="hidden" name="pitem[req_qty][]" value="' + req_qty + '">';
	input += '<input type="hidden" name="pitem[req_balqty][]" value="' + req_balqty + '">';
	// input += '<input type="hidden" name="pitem[unit_id][]" id="unit_id_'+rn+'" value="'+unit_id+'">';
	input += `<input type="hidden" name="pitem[compound_id][]" id="compound_id_${rn}" value="${compound_id}">`;
	input += '<input type="hidden" name="pitem[unit_price][]" id="unit_price_' + rn + '" value="' + unit_price + '">';
	input += '<input type="hidden" class="gross_total" name="pitem[gross_total][]" data-index="' + rn + '" id="gross_total_' + rn + '" value="' + total_before_discount + '">';
	input += '<input type="hidden" name="pitem[max_discount_item][]" id="max_discount_item_' + rn + '" value="0">';
	input += '<input type="hidden" name="pitem[net_unit_price][]" id="net_unit_price_' + rn + '" value="' + unit_price_after_discount + '">';
	input += '<input type="hidden" class="gross_total_after" name="pitem[gross_total_after][]" id="gross_total_after_' + rn + '" value="' + total_after_discount + '">';
	input += '<input type="hidden" name="pitem[tax_id][]" id="tax_id_' + rn + '" value="' + tax_id + '">';
	input += '<input type="hidden" name="pitem[tax][]" id="tax_' + rn + '" value="' + tax + '">';
	input += '<input type="hidden" name="pitem[tot_unit][]" id="tot_unit_' + rn + '" value="' + tot_unit + '">';
	input += '<input type="hidden" class="tax_amount" name="pitem[tax_amount][]" id="tax_amount_' + rn + '" value="' + taxAmount + '">';
	input += '<input type="hidden" class="net_tax_amount" name="pitem[net_tax_amount][]" id="net_tax_amount_' + rn + '" value="' + taxAmount + '">';
	input += '<input type="hidden" name="pitem[net_amount][]" id="net_amount_' + rn + '" value="' + netTotal + '">';
	input += '<input type="hidden" class="discount_proportion" name="pitem[discount_proportion][]" id="proportion_' + rn + '" value="0">';
	input += '<input type="hidden" class="addcost_proportion" name="pitem[addcost_proportion][]" id="addproportion_' + rn + '" value="0">';
	input += '<input type="hidden" name="pitem[net_total_excl_vat][]" id="ntev_' + rn + '" value="' + netTotal + '">';
	input += '<input type="hidden" name="pitem[lot_no][]" data-id="' + rn + '" id="lot_no_' + rn + '" class="lot_no" >';
	input += `<input type="hidden" name="pitem[is_batch][]" class="is_batch" value="${is_batch}"  id="is_batch_${rn}" />`;
	input += `<input type="hidden" name="pitem[actual_batch_arr][]" id="actual_batch_arr_${rn}" />`;
	input += `<input type="hidden" value="${is_serial_number}"  name="pitem[is_serial_number][]"    id="is_serial_number_${rn}" />`;
	input += `<input type="hidden" name="pitem[is_expiry][]" class="is_expiry" value="${is_expiry}"  id="is_expiry_${rn}" />`;
	// input += `<input type="hidden" name="pitem[is_date_as_batch][]" class="is_date_as_batch" value="${is_date_as_batch}"  id="is_date_as_batch_${rn}" />`;
	input += `<input type="hidden" name="pitem[is_auto_expiry_days][]" class="is_auto_expiry_days" value="${is_auto_expiry_days}"  id="is_auto_expiry_days_${rn}" />`;
	input += `<input type="hidden" name="pitem[expiry_date][]" class="expiry_date" value="${expiry_date}"  id="expiry_date_${rn}" />`;
	input += `<input type="hidden" name="pitem[actual_batch_number][]" class="actual_batch_number" value="${ActualBatchNumber}"   id="actual_batch_number_${rn}" />`;
	input += `<input type="hidden"  
								name="pitem[batch_numbers_arr][]" 
								id="batch_numbers_${rn}" 
								value="">`;
	input += `<input type="hidden" name="pitem[ins_comm_perc][]" class="ins_comm_perc" value="${ins_comm_perc}"  id="ins_comm_perc_${rn}" />`;
	input += `<input type="hidden" name="pitem[ins_comm_amount][]" class="ins_comm_amount" value="${ins_comm_amount}"  id="ins_comm_amount_${rn}" />`;
	input += `<input type="hidden" attr-fa="${is_fa_item}"  class="non-inv-class" name="pitem[is_non_inv][]"  value="${is_non_inv_item}" />
					<input type="hidden"  class="fixed-assets-class" id="is_fixed_asset_${rn}"  name="pitem[is_fixed_asset][]"  value="${is_fa_item}" />
					<input type="hidden" name="pitem[non_inventory_data][]"  data-id="${rn}" id="non_inventory_item_form_data_${rn}"  />	`;
	input += `<input type="hidden" name="pitem[ledger_id][]" value="${data.acc_group_id || 0}" />`;


	var stock_edit_url = $('#stock_transfer_url').val();
	var store_id = $('.select_store_id').find('option:selected').val();
	var paramStock = {};
	paramStock['serial_no'] = btoa(rn);
	paramStock['unit_id'] = unit_id;
	paramStock['id'] = btoa(product_id);
	paramStock['store_id'] = btoa(store_id);
	paramStock['qty'] = btoa(1);
	paramStock['edit_page'] = 'stock_transfer';
	var paramStockJsonString = JSON.stringify(paramStock);
	var stockParams = btoa(paramStockJsonString);
	var stock_action = $('#stock_transfer_action_url').val();

	var paramLot = {};
	paramLot['serial_no'] = btoa(rn);
	paramLot['id'] = btoa(product_id);
	paramLot['edit_page'] = 'lot_no';
	var paramLotJsonString = JSON.stringify(paramLot);
	var lotParams = btoa(paramLotJsonString);
	var lot_action = $('#lot_action_url').val();

	var $decsriptionOption = '';
	// if(is_non_inv_item == 1){
	$decsriptionOption = NonInvDfescriptionOption(rn, product_id, is_non_inv_item, 'abs', 0, 2);
	//}


	var expand = erp_expand_table(rn);
	var expandDiv = '<div class="expandcontainer"><div class="expand" id="expand_' + rn + '">' + expand + '</div></div>';
	var html = '<tr class="item_row" data-id="' + product_id + '">';
	html += '<td class="left bitems slno2302" data-id="' + product_id + '">' + slno + '</td>';
	html += '<td class="left name-white-sapce f-12" id="code_div_' + rn + '">' + product_code + '</td>';
	html += `<td class="left" style="position: relative;padding-top:15px">
			<div  class="store-dot btn btn-success btn-sm" 
			data-id="${rn}" 
			id="lotNoDott_${rn}"
		  data-url="${stock_edit_url}"
		  data-param="${lotParams}"
		  data-title="Lot No"
		  data-action="${lot_action}"
		  data-btnlabel = "Save"
		  data-modalwidth = "45"
		  onclick="return lotNumberParamsUpdate(this)"
		  style="padding: 0px 3px;
		  height: 12px;
		  line-height: 6px;
		  border-radius: 50%;
		  position: absolute;
		  top: 2px;   
		  /* left: 1.5pc; */
		  background: purple;
		  border: purple;"
		 >
		  <span style="font-size: 11px;">L</span>
	  	</div> ${$decsriptionOption}`;

	html += `<a class="btn btn-success btn-xs text-white" data-type="sales-n-pur-item" onclick="erp_cost_center_allocation_form(this)" style="font-size:9px; padding:0 3px;">CC</a>
			  	  <input type="hidden" class="cost-center-data" name="pitem[cost_center][]">`;

	html += `<p style="margin:0" id="name_div_${rn}">${product_name}</p></td>`;
	if (isorder == 1) {
		html += '<td class="left">' + ref + '</td>';
		html += '<td class="center">' + req_qty + '</td>';
		html += '<td class="center">' + req_balqty + '</td>';
	}
	html += '<td class="left" style="position:relative ;"><input type="text" class="form-control form-control-sm oqty" name="pitem[qty][]" id="qty_' + rn + '" data-index="' + rn + '" data-rqty="' + qty + '" value="' + qty + '" data-proid="' + product_id + '"  data-months="' + months + '" data-without_slno="' + without_slno + '"  data-fa="' + is_fa_item + '">' + rack_bin + SNB;
	html += `<input type="hidden" name="pitem[batch_item][]" class="batch_item" value="${is_batch}">
	         <input type="hidden" name="pitem[serial_no_item][]" class="serial_no_item" value="${is_serial_number}">
             <input type="hidden" name="pitem[batch_data][]" class="batch-data" />
       	     <input type="hidden" name="pitem[serial_no_data][]" class="serial-no-data" />`;
	html += '</td>';
	// html += '<td class="left" style="position:relative ;">'+
	// 			'<input type="text" class="form-control form-control-sm oqty" name="pitem[qty][]" id="qty_' + rn + '" data-index="' + rn + '" data-rqty="' + qty + '" value="' + qty + '">'+SNB+
	// 			'<input type="text" class="form-control form-control-sm" name="pitem[ins_comm_perc][]" id="ins_comm_perc' + rn + '" data-index="' + rn + '" data-rqty="' + qty + '" value="' + ins_comm_perc + '">'+
	// 			'<input type="text" class="form-control form-control-sm" name="pitem[ins_comm_amount][]" id="ins_comm_amount' + rn + '" data-index="' + rn + '" data-rqty="' + qty + '" value="' + ins_comm_perc + '">'+
	// 		'</td>';
	html += `<td class="center">
						<select name="pitem[unit_id][]" data-trade-unit="${tradeUnit}" data-id="${rn}" id="unit_id_${rn}" class="form-control form-control-sm unit-id">
						${unitHtml}
						</select>
						</td>`;
	if (conUnit == 'h' || conUnit == 'd' || conUnit == 'm') {
		updateConCss();
		html += conUnitHtml(conUnit, rn, foreignn);
	} else html += '<td class="con-unit"  style="display:none" colspan="3"></td>';
	var allUnitResponse = JSON.parse(atob($('#all_units').val()));
	var allUnitsHtml = '<option value="" data-unit="" selected>Select Unit</option>';
	$.each(allUnitResponse, function (k, v) {
		allUnitsHtml += `<option value="${v.id}" data-unit="${v.name}">${v.name}</option>`;
	});
	var brokerage_purchase = $('#brokerage_purchase').is(':checked');
	var show_brokerage_col = !brokerage_purchase ? 'display:none' : '';
	html += `<td class="brokerage-col" style="position:relative ;${show_brokerage_col}"><input type="number" data-index="${rn}" class="form-control form-control-sm center alter_qty" id="alter_qty_${rn}" name="pitem[alter_qty][]" value=""></td>`;
	html += `<td class="center brokerage-col" style="${show_brokerage_col}">
				<select name="pitem[alter_unit_id][]" class="form-control form-control-sm alter_unit_id" id="alter_unit_id_${rn}" data-index="${rn}">
					${allUnitsHtml}
				</select>
			 </td>`;
	html += `<td class="center brokerage-col" style="position:relative ;${show_brokerage_col}">
				<span id="SHOW_alter_qty_total_${rn}"></span>
				<input type="hidden" id="alter_qty_total_${rn}" class="form-control form-control-sm" name="pitem[alter_qty_total][]" value="0">
			 </td>`;
	html += `<td class="brokerage-col" style="position:relative ;${show_brokerage_col}"><input type="number" class="form-control form-control-sm right" id="recomm_sales_price_${rn}" name="pitem[recomm_sales_price][]" value=""></td>`;
	html += `<td class="brokerage-col" style="position:relative ;${show_brokerage_col}"><input type="number" class="form-control form-control-sm center" id="brokerage_perc_${rn}" name="pitem[brokerage_perc][]" value=""></td>`;


	var foreign_unit_price = cnv_Float(unit_price / curr_rate, foreign_decimals);

	html += `<td class="right foreign-curr-col" ${(company_curr_id == currency_id) ? 'style="display:none"' : ''}>
				<input type="number" class="form-control form-control-sm unit-price-foreign right" data-id="${rn}" id="foreign_unit_price_${rn}" name="pitem[foreign_unit_price][]" value="${foreign_unit_price}" />
			 </td>`;
	html += `<td class="right foreign-curr-col" ${(company_curr_id == currency_id) ? 'style="display:none"' : ''}>
				<span id="SHOW_foreign_disc_per_unit_${rn}"></span>
				<input type="hidden" id="foreign_disc_per_unit_${rn}" name="pitem[foreign_disc_per_unit][]" />
			 </td>`;
	html += `<td class="right foreign-curr-col" ${(company_curr_id == currency_id) ? 'style="display:none"' : ''}>
				<span id="SHOW_foreign_net_unit_price_${rn}"></span>
				<input type="hidden" id="foreign_net_unit_price_${rn}" name="pitem[foreign_net_unit_price][]" />
			 </td>`;
	html += `<td class="right foreign-curr-col" ${(company_curr_id == currency_id) ? 'style="display:none"' : ''}>
				<span id="SHOW_foreign_net_total_${rn}"></span>
				<input type="hidden" id="foreign_net_total_${rn}" name="pitem[foreign_net_total][]" />
			 </td>`;


	html += '<td class="right unit-price-editable" data-id="' + rn + '"  id="ritem_unitprice_' + rn + '"   data-proid="' + product_id + '"  data-months="' + months + '"  data-without_slno="' + without_slno + '"  data-fa="' + is_fa_item + '" contenteditable>' + cnv_Float(unit_price, decimal) + '</td>';
	if (trade_in_kg()) {
		html += `<td class="center trade-in-kg">
							<input type="hidden" id="tot_unit_2_${rn}" name="pitem[tot_unit_2][]"/>
							<span  id="qty_2v_${rn}"></span>
					   </td>
					   <td class="center trade-in-kg">
							<input type="hidden" id="comp_id_2_${rn}" name="pitem[comp_id_2][]"/>
							<span  id="comp_id_2v_${rn}"></span>
					   </td>
					   <td class="right trade-in-kg">
							<input type="hidden" id="unit_price_2_${rn}" name="pitem[unit_price_2][]"/>
							<span  id="unit_price_2v_${rn}"></span>
					   </td>`;
	}
	html += '<td class="center" class="totalbeforediscount" id="ritem_totalbeforediscount_' + rn + '">' + cnv_Float(total_before_discount, decimal) + '</td>';
	html += '<td class="right"><input type="text" class="form-control form-control-sm discount"  name="pitem[max_discount][]" id="maxdiscount_' + rn + '" data-index="' + rn + '" data-allowed="0"value="' + max_discount + '"   data-proid="' + product_id + '"  data-months="' + months + '" data-without_slno="' + without_slno + '"  data-fa="' + is_fa_item + '"></td>';
	html += '<td class="right" id="ritem_discount_unit_' + rn + '">' + discount_perunit + '</td>';
	html += '<td class="right" id="ritem_totalafterdiscount_' + rn + '">' + parseFloat(unit_price_after_discount).toFixed(decimal) + '</td>';
	html += '<td class="right" id="ritem_grosstotal_' + rn + '">' + grossTotal + '</td>';
	html += `<td class="center vat_cols " >
					<select data-tax="${tax}" data-id=${rn} class="form-control form-control-sm vat-type" name="pitem[tax_type][]" id="tax_type_${rn}">
						<option value="1" ${tax_type == 1 ? 'selected' : ''}>Taxable</option>
						<option value="2" ${tax_type == 2 ? 'selected' : ''}>Zero Rated</option>
						<option value="3" ${tax_type == 3 ? 'selected' : ''}>Exempted</option>
						<option value="4" ${tax_type == 4 ? 'selected' : ''}>Non Taxable</option>
					</select>
				  </td>`;
	html += '<td class="center vat_cols gen_vat" id="ritem_vat_' + rn + '">' + tax + '%</td>';

	html += '<td class="right vat_cols" id="ritem_vatamount_' + rn + '">' + parseFloat(taxAmount).toFixed(decimal) + '</td>';
	html += '<td class="right vat_cols" id="ritem_nettotal_' + rn + '">' + netTotal + '</td>';
	var btn = input + '<a href="#" data-id="0" onclick="return delete_row(this)"><i class="ti-trash" style="font-weight: bold;"></i></a>';
	btn += '&nbsp;<a href="#" data-index="' + rn + '" class="expandBtn" ><i class="ti-plus" style="font-weight: bold;"></i></a>';
	html += '<td class="center">' +
		'<div class="d-flex align-items-center gap-1">' +
		'<button type="button" class="btn btn-secondary btn-sm copyRemark" ' +
		'style="padding:2px 6px; line-height:1; min-width:auto;">C</button>' +
		'<input class="form-control remark-input" type="text" ' +
		'name="remark[]" id="remark_' + rn + '">' +
		'</div>' +
		'</td>';
	$(document).on('click', '.copyRemark', function () {
		let currentRow = $(this).closest('tr');
		let prevRow = currentRow.prev('tr');

		if (!prevRow.length) return;

		let prevInput = prevRow.find('.remark-input');
		let currentInput = currentRow.find('.remark-input');

		currentInput.val(prevInput.val());
	}); 




	// $(document).on('click', '.copyRemark', function () {

	// 	let currentRow = $(this).closest('tr');
	// 	let prevRow = currentRow.prev('tr');

	// 	if (!prevRow.length) return;

	// 	let prevInput = prevRow.find('.remark-input');
	// 	let currentInput = currentRow.find('.remark-input');

	// 	if (prevInput.length) {
	// 		currentInput.val(prevInput.val());
	// 	}
	// });

	html += '<td>' + btn + '' + expandDiv + '</td>';
	html += '</tr>';
	$('#item_row').append(html);
	$('#qty_' + rn).focus();
	$('#ritem').hide();
	$('.ritem').html('');
	$('.ohvalue').val(0);
	$('#qty_0').val('');
	erp_clear_input(this)
	// $('#product').focus();
	erp_set_amount_info();
	var radio_value = 0;
	if ($('input[name="purchase_type"][value="1"]').is(':checked')) {
		radio_value = 1;
	} else {
		radio_value = 2;
	}
	purchaseTypeHideShow(radio_value);
	erp_foreign_set_line_total(rn);
	rearrange_slno2302();
	setTimeout(() => {
		if (airTicket == '1') {
			$('#nonInvFormDot_' + rn).click();
		}
	}, 1000);
}
function rearrange_slno2302() {
	var n = 1;
	$('.slno2302').each(function () {
		$(this).html(n);
		n++;
	});
}
function erp_view_amount_info(obj) {
	var exp = $(obj).attr('aria-expanded');
	if (exp == 'false') {
		$('.amountInfo').show();
		$(obj).attr('aria-expanded', 'true');
	} else {
		$('.amountInfo').hide();
		$(obj).attr('aria-expanded', 'false');
	}
	$('.amountInfo').css({ "transform": "initial", "margin-right": "11px" });
	return false;
}


function erp_process_order_items(obj) {
	var a = [];
	var type = $(obj).attr('data-type');
	if (type == 1) {
		$(".req1:checked").each(function () {
			a.push(this.value);
		});
	}
	if (type == 2) {
		$(".req2:checked").each(function () {
			a.push(this.value);
		});
	}
	return a;
}
function erp_process_order(obj) {
	var type = $(obj).attr('data-type');
	var process_type = $('#process_type_' + type).val();
	var items = erp_process_order_items(obj);
	var len = items.length;
	var id = $(".req1:checked:first").data('id');
	if (len == 0) {
		errormsg("Please Select Products");
		return;
	}
	var param = {};
	param['rquids'] = items;
	param['id'] = btoa(id);
	param['edit_page'] = 'process_order';
	param['push'] = 1;
	param['process_type'] = process_type;
	var myJsonString = JSON.stringify(param);
	var result = btoa(myJsonString);
	$(obj).attr('data-param', result);
	if (type == 2) {
		$('.model_close_btn').trigger('click');
		$("#filter_form")[0].reset();
		$('#quicklist').hide();
		$('#multivalue').html('');
	}
	$('.clearsearch').hide();
	edit_form(obj);
	return;
}

function delete_row(obj) {
	confirmDialog("Are you sure?", function () {
		$(obj).closest('tr').remove();
		erp_set_amount_info();
		erp_index_table_row();
		rearrange_slno2302();
	});
}

function erp_random() {
	return Math.floor((Math.random() * 100000000) + 1);
}

function erp_index_table_row() {
	var n = 1;
	$('.item_row').each(function (index) {
		$(this).closest('td').html(n);
		n++;

	});
}
function erp_clear_process(obj) {
	$('#tbodyRlist').html("");
	$('#quicklist').hide();
}
function erp_on_expense_item(obj) {
	var loadStatus = $('#addExpense').attr('data-load');
	$('#expense_div').show();
	$('.expense_btn_group').hide();
	$('#expense_date').focus();
	$('.item_btn_group').show();
	$('#product_input').hide();
	$('.expand').hide();
	$('.amountInfo').hide();
	if (loadStatus == 0) {
		$('#addExpense').attr('data-load', 1);
		load_expense_ledger(obj);
	}
}

function load_expense_ledger(obj) {
	var siteurl = $(obj).attr('data-expense_url');
	var url = atob(siteurl);
	var type = 2;
	preloader_on();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: { type: type },
		success: function (response) {
			//console.log(response);
			preloader_off();
			var getStatus = response.getStatus;
			var ledger = response.ledger;
			erp_set_option_data(ledger, 'expense_ledger_id');
			var suppliers = response.suppliers;
			erp_set_option_data(suppliers, 'expense_vender_id');
		}
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(error);
	});
}

function erp_set_option_data(data, inputid) {
	$.each(data, function (i, field) {
		var name = field.name;
		var id = field.id;
		var inputoption = '<option value="' + id + '" >' + name + '</option>';
		$("#" + inputid).append(inputoption);
	});
}


function erp_add_expense_items(obj) {
	var decimal = $('#hidden_decimal').val();
	var rn = erp_random();
	var date = $('#expense_date').val();
	var ledger_id = $('#expense_ledger_id').val();
	var ledger = $("#expense_ledger_id option:selected").text();
	var supplier_id = $('#expense_vender_id').val();
	var supplier = $("#expense_vender_id option:selected").text();
	var expense_invoice = $('#expense_invoice').val();
	var expense_invoice_percentage = $('#expense_invoice_percentage').val();
	var expense_amount = $('#expense_amount_0').val();
	var expense_vat = $('#expense_vat_0').val();
	var expense_vat_amount = $('#expense_vat_amount_0').val();
	if (date == '') { $('#expense_date').focus(); return; }
	if (ledger_id == '') { $('#ledger_id').focus(); return; }
	if (supplier_id == '') { $('#supplier_id').focus(); return; }
	if (expense_invoice == '') { $('#expense_invoice').focus(); return; }
	if (expense_amount == '') { $('#expense_amount').focus(); return; }

	var netAmount = parseFloat(expense_amount) + parseFloat(expense_vat_amount);
	var input = '<input type="hidden" name="expense[expense_date][]" value="' + date + '">';
	input += '<input type="hidden" name="expense[ledger_id][]" value="' + ledger_id + '">';
	input += '<input type="hidden" name="expense[supplier_id][]" value="' + supplier_id + '">';
	input += '<input type="hidden" name="expense[invoice_no][]" value="' + expense_invoice + '">';
	input += '<input type="hidden" name="expense[inv_percentage][]" value="' + expense_invoice_percentage + '">';
	input += '<input type="hidden" class="exclvat" name="expense[amount][]"  value="' + expense_amount + '">';
	input += '<input type="hidden" name="expense[tax][]"  value="' + expense_vat + '">';
	input += '<input type="hidden" class="exclvatamount" name="expense[tax_amount][]" value="' + expense_vat_amount + '">';
	input += '<input type="hidden" name="expense[net_amount][]"  value="' + netAmount + '">';
	input += '<input type="hidden" name="expense[edit_ids][]" id="edit_ids" value="0">';

	var html = '<tr class="expenseitem_row">';
	html += '<td class="left" >' + convertToDate(date) + '</td>';
	html += '<td class="left">' + ledger + '</td>';
	html += '<td class="left">' + supplier + '</td>';
	html += '<td class="left">' + expense_invoice + '</td>';
	html += '<td class="right">' + expense_invoice_percentage + '</td>';
	html += '<td class="right">' + cnv_Float(expense_amount) + '</td>';
	html += '<td class="right">' + cnv_Float(expense_vat, 2) + '</td>';
	html += '<td class="right">' + cnv_Float(expense_vat_amount) + '</td>';
	html += '<td class="right">' + cnv_Float(netAmount) + '</td>';
	html += '<td class="center">' + input + '<a href="#" data-id="0" onclick="return delete_expense_row(this)"><i class="ti-trash" style="font-weight: bold;"></i></a></td>';
	html += '</tr>';
	$('#expenserow tr:last').before(html);
	$('.expamount').val('');
	$('.expselect').val(0);
	$('#expense_date').focus();
	erp_set_expense_amount_info();

}

function convertToDate(dateString) {
	function pad(s) { return (s < 10) ? '0' + s : s; }
	let d = dateString.split("-");
	let dat = new Date(d[0] + '/' + d[1] + '/' + d[2]);
	return [pad(dat.getDate()), pad(dat.getMonth() + 1), dat.getFullYear()].join('/');
}



function delete_expense_row(obj) {
	$(obj).closest('tr').remove();
	erp_set_expense_amount();

}

function erp_set_expense_amount(obj) {
	var decimal = $('#hidden_decimal').val();
	var index = $(obj).attr('data-index');
	var expense_amount = $('#expense_amount_' + index).val();
	var vat = $('#expense_vat_' + index).val();
	var vatAmount = (vat / 100) * expense_amount;
	$('#expense_vat_amount_' + index).val(vatAmount.toFixed(decimal));
	var netAmount = parseFloat(expense_amount) + parseFloat(vatAmount);
	$('#expense_net_amount_' + index).val(netAmount.toFixed(decimal));


	if (!$('#expense_invoice_percentage').is(':focus')) {
		setReversePercentage(expense_amount);
	}
	erp_set_expense_amount_info();
}


function erp_set_expense_amount_info() {
	var decimal = $('#hidden_decimal').val();
	var exclvat = 0;
	var exclvatamount = 0;
	var netAmount = 0;
	$(".exclvat").each(function () {
		var amount = Math.abs($(this).val());
		exclvat = exclvat + amount;
	});
	$(".exclvatamount").each(function () {
		var amount = Math.abs($(this).val());
		exclvatamount = exclvatamount + amount;
	});
	$('.netexclvat_expense').html(exclvat.toFixed(decimal));
	$('.input_netexclvat_expense').val(exclvat);
	$('.netVatAmount_expense').html(exclvatamount.toFixed(decimal));
	var netAmount = parseFloat(exclvat) + parseFloat(exclvatamount);
	$('.netincvat_expense').html(netAmount.toFixed(decimal));
	erp_set_landed_costing();

}


function erp_set_amount_info() {
	var decimal = $('#hidden_decimal').val();
	var doc_discount = 0;
	if ($('#doc_discount').val()) {
		doc_discount = parseFloat($('#doc_discount').val());
	}
	var totalbeforediscount = 0;
	var totalafterdiscount = 0;
	var tax_amount = 0;
	var net_amount = 0;
	var net_discount = 0;
	var total_discount = 0;
	var grosstotal_afterdiscount = 0;
	$(".gross_total").each(function () {
		var amount = Math.abs($(this).val());
		totalbeforediscount = totalbeforediscount + amount;
		var idx = $(this).attr('data-index');
		var taxAmount = Math.abs(isNAN($('#tax_amount_' + idx).val()));
		tax_amount = tax_amount + taxAmount;
		var totAmount = Math.abs($('#gross_total_after_' + idx).val());
		totalafterdiscount = totalafterdiscount + totAmount;
	});

	if ($('input[name="special_vat_zero"][value="1"]').is(':checked')) {
		tax_amount = 0;
	}
	else if (is_overseas()) {
		tax_amount = 0;
	}
	else if (parseFloat($('#local_taxable').val()) != 1 || parseFloat($('#is_branch').val() == 1)) {
		tax_amount = 0;
	}


	$('.net_gross_total').html(toCommas(cnv_Float(totalbeforediscount, decimal)));
	$('.net_vat').html(toCommas(cnv_Float(tax_amount, decimal)));
	$('.net_vat2').val(tax_amount);
	$('.vat_amount_without_inv_discount').html(toCommas(cnv_Float(tax_amount, decimal)));
	$('.net_exclvat').html(toCommas(cnv_Float(totalafterdiscount, decimal)));
	net_discount = totalbeforediscount - totalafterdiscount;
	total_discount = net_discount + doc_discount;
	grosstotal_afterdiscount = totalbeforediscount - total_discount;
	net_amount = grosstotal_afterdiscount + tax_amount;
	$('.net_discount').html(toCommas(cnv_Float(net_discount, decimal)));
	$('.total_discount').html(toCommas(cnv_Float(total_discount, decimal)));
	$('.grosstotal_afterdiscount').html(toCommas(cnv_Float(grosstotal_afterdiscount, decimal)));
	$('#net_gross_total').val(totalbeforediscount);
	$('#grosstotal_afterdiscount').val(grosstotal_afterdiscount);

	if (is_non_taxable()) {
		net_amount = grosstotal_afterdiscount;
	}
	$('.net_inclvat').html(toCommas(cnv_Float(net_amount, decimal)));
	$('.netAmount').val(cnv_Float(net_amount, decimal));
	$('.input_amount').val(totalbeforediscount);
	$('.input_discount').val(net_discount);
	$('.input_vat_amount').val(tax_amount);

	$('.net_inclvat_without_inv_discount').html(toCommas(cnv_Float((isNAN(grosstotal_afterdiscount) + isNAN(doc_discount) + isNAN(tax_amount)), decimal)));

	erp_set_discount_base_rate();
	erp_set_landed_costing();
	erp_set_final_amount();

	var net_commision_amount = 0;
	$(".ins_comm_amount").each(function () {
		var amount = Math.abs($(this).val());
		net_commision_amount = net_commision_amount + amount;
	});
	$('.net_insurance_commision').html(toCommas(cnv_Float(net_commision_amount, decimal)));
	erp_foreign_calc_total();
}
function is_non_taxable() { // if yes then overseas else taxable
	var non_taxable = 0;
	if ($('input[name="special_vat_zero"][value="1"]').is(':checked')) {
		non_taxable = 1;
	}
	else if (is_overseas()) {
		non_taxable = 1;
	}
	else if ((parseFloat($('#local_taxable').val()) != 1) || (parseFloat($('#is_branch').val()) == 1)) {
		non_taxable = 1;
	}
	return non_taxable;
}

function erp_set_discount_base_rate() {
	var decimal = $('#hidden_decimal').val();
	var net_gross_total = $('#net_gross_total').val();
	var discount = 0;
	if ($('#doc_discount').val()) {
		discount = parseFloat($('#doc_discount').val());
	}
	$('.net_doc_discount').html(discount.toFixed(decimal));
	var proportion = (discount / net_gross_total) * 100;
	$('.indp').html(proportion.toFixed(decimal));
	$('.discount_proportion').val(proportion);
	$(".gross_total").each(function () {
		var index = $(this).attr('data-index');
		var unitPrice = $('#unit_price_' + index).val();
		if ($('#maxdiscount_' + index).val()) {
			var maxdiscount = $('#maxdiscount_' + index).val();
		} else {
			var maxdiscount = 0;
		}
		var max_discount_item = parseFloat($('#max_discount_item_' + index).val());
		if (!isNaN(max_discount_item)) {
		} else {
			var max_discount_item = 0;
		}
		if ($('#qty_' + index).val()) {
			var qty = $('#qty_' + index).val();
		} else {
			var qty = 0;
		}
		if ($('#tax_' + index).val()) {
			var tax = $('#tax_' + index).val();
		} else {
			var tax = 0;
		}

		var unit_wise_discount = (unitPrice * proportion) / 100;
		if (isNaN(parseFloat(unit_wise_discount))) unit_wise_discount = 0;
		$('#ritem_uwd_' + index).html(unit_wise_discount.toFixed(decimal));
		var totalDiscount = parseFloat(proportion) + parseFloat(maxdiscount);
		$('#ritem_tdp_' + index).html(totalDiscount.toFixed(decimal));
		var netDiscount = parseFloat(max_discount_item) + parseFloat(unit_wise_discount);
		$('#ritem_nuwd_' + index).html(netDiscount.toFixed(decimal));
		var netUnitPrice = parseFloat(unitPrice) - parseFloat(netDiscount);
		$('#ritem_nup_' + index).html(toCommas(cnv_Float(netUnitPrice, decimal)));
		netTotalExlvat = parseFloat(netUnitPrice) * parseFloat(qty);
		$('#ritem_ntev_' + index).html(toCommas(cnv_Float(netTotalExlvat, decimal)));
		$('#ntev_' + index).val(netTotalExlvat);
		var vatTotal = (tax * netTotalExlvat) / 100;
		$('#ritem_vt_' + index).html(toCommas(cnv_Float(vatTotal, decimal)));
		$('#net_tax_amount_' + index).val(vatTotal);
		var netTotalInclvat = parseFloat(vatTotal) + parseFloat(netTotalExlvat);
		$('#ritem_ntiv_' + index).html(toCommas(cnv_Float(netTotalInclvat, decimal)));
	});
	erp_expand_table_status();
	return false;
}

function erp_set_landed_costing() {
	var discount = 0;
	// if($('#doc_discount').val()){
	// 	discount = parseFloat($('#doc_discount').val());
	// }
	var grosstotal_afterdiscount = $('#grosstotal_afterdiscount').val();
	//console.log('grosstotal_afterdiscount ->' + grosstotal_afterdiscount);
	var total_exclvat = $('.input_netexclvat_expense').val();
	//console.log('total_exclvat ->' + total_exclvat);
	var addcost = (total_exclvat / grosstotal_afterdiscount);
	//console.log('addcost ->' + addcost);
	$('.addcost').html(cnv_Float(addcost));
	$('.addcost_proportion').val(addcost);

	$(".gross_total").each(function () {
		var index = $(this).attr('data-index');
		if (discount > 0) {
			var amount = parseFloat($('#ntev_' + index).val());
			//console.log('amount ntev -- > ' + amount);
		} else {
			var amount = Math.abs($(this).val());
			//console.log('amount -- > ' + amount);
		}

		var unitPrice = $('#unit_price_' + index).val();
		var totalAddCostPerItem = (amount * addcost);
		//console.log('amount -- > ' + amount + ' --> totalAddCostPerItem -->' + totalAddCostPerItem);
		var totalCost = parseFloat(amount) + parseFloat(totalAddCostPerItem);

		var total_qty = $('#qty_' + index).val();
		var landedCost = totalCost / total_qty;

		$('#ritem_addcostperitem_' + index).html(toCommas(cnv_Float(totalAddCostPerItem)));
		$('#ritem_totaladdcost_' + index).html(toCommas(cnv_Float(totalCost)));
		$('#ritem_landedcost_' + index).html(toCommas(cnv_Float(landedCost)));

		$('#tot_adl_cost_per_item_' + index).val(cnv_Float(totalAddCostPerItem));
		$('#tot_cost_' + index).val(cnv_Float(totalCost));
		$('#per_unit_landed_cost_' + index).val(cnv_Float(landedCost));

		var net_unit_price = $('#net_unit_price_' + index).val();
		var grossTotal = Math.abs(total_qty) * Math.abs(net_unit_price);

		var ins_comm_perc = $('#ins_comm_perc_' + index).val();
		var ins_comm_amount = (Math.abs(grossTotal) * Math.abs(ins_comm_perc)) / 100;
		$('#ins_comm_amount_' + index).val(cnv_Float(ins_comm_amount));

	});
	erp_expand_table_status();
}

function erp_set_final_amount() {
	var decimal = $('#hidden_decimal').val();
	var discount = 0;
	var tax_amount = 0;
	if ($('#doc_discount').val()) {
		discount = parseFloat($('#doc_discount').val());
	}
	if (discount == 0) {
		return;
	}
	$(".net_tax_amount").each(function () {
		var amount = Math.abs(isNAN($(this).val()));
		tax_amount = tax_amount + amount;
	});
	var grosstotal_afterdiscount = $('#grosstotal_afterdiscount').val();

	$('.net_vat').html(toCommas(cnv_Float(tax_amount, decimal)));
	$('.net_vat2').val(tax_amount);
	$('.input_vat_amount').val(tax_amount);
	var NetToatl = parseFloat(grosstotal_afterdiscount) + parseFloat(tax_amount);

	if (is_non_taxable()) {
		NetToatl = grosstotal_afterdiscount;
	}

	$('.net_inclvat').html(toCommas(cnv_Float(NetToatl, decimal)));
	$('.netAmount').val(cnv_Float(NetToatl, decimal));
	$('input[name="round_off"]').val(0);

}

function erp_expand_table_status() {
	var tableOn = 0;
	var discount = $('.discount_proportion').val();
	var expense = $('.addcost_proportion').val();
	if (discount != 0) {
		tableOn = 1;
		$('.ind').show();
	} else {
		$('.ind').hide();
	}
	if (expense != 0) {
		tableOn = 1;
		$('.costing').show();
	} else {
		$('.costing').hide();
	}
	if (tableOn == 1) {
		$('.expandBtn').show();
	} else {
		$('.expandBtn').hide();
	}
}



function erp_table_expand(obj) {
	var index = $(obj).attr('data-index');
	var isopen = $(obj).attr('data-open');
	$('.expand').hide();
	$('.expandBtn').attr('data-open', 0);
	if (isopen == 0) {
		$('#expand_' + index).show();
		$(obj).attr('data-open', 1);
	} else {
		$('#expand_' + index).hide();
		$(obj).attr('data-open', 0);
	}
}

function erp_expand_table(index) {
	var html = '<table>';
	html += '<tr>';
	html += '<td class="eheader ind">Inv Disc Prop %</td>';
	html += '<td class="eheader ind">Unit Wise Disc</td>';
	html += '<td class="eheader ind">Total Disc %</td>';
	html += '<td class="eheader ind">Net Unit wise Disc</td>';
	html += '<td class="eheader ind">Net Unit Price</td>';
	html += '<td class="eheader ind">Net Total <span class="vat_cols">Excl.VAT</span></td>';
	html += '<td class="eheader ind vat_cols">VAT Total</td>';
	html += '<td class="eheader ind vat_cols">Net Total Incl VAT</td>';
	html += '<td class="eheader costing">Addl Cost</td>';
	html += '<td class="eheader costing">Total Addl Cost Per Item</td>';
	html += '<td class="eheader costing">Total Cost</td>';
	html += '<td class="eheader costing">Per Unit Landed Cost</td>';
	html += '</tr>';
	html += '<tr>';
	html += '<td class="ind indp" id="ritem_indp_' + index + '"></td>';
	html += '<td class="ind uwd" id="ritem_uwd_' + index + '"></td>';
	html += '<td class="ind tdp" id="ritem_tdp_' + index + '"></td>';
	html += '<td class="ind nuwd" id="ritem_nuwd_' + index + '"></td>';
	html += '<td class="ind nup" id="ritem_nup_' + index + '"></td>';
	html += '<td class="ind ntev" id="ritem_ntev_' + index + '"></td>';
	html += '<td class="ind vt vat_cols" id="ritem_vt_' + index + '"></td>';
	html += '<td class="ind ntiv vat_cols" id="ritem_ntiv_' + index + '"></td>';
	html += '<td class="ind costing addcost" id="ritem_addcost_' + index + '"></td>';
	html += '<td class="ind costing addcostperitem" id="ritem_addcostperitem_' + index + '"></td>';
	html += '<td class="ind costing totaladdcost" id="ritem_totaladdcost_' + index + '"></td>';
	html += '<td class="ind costing landedcost" id="ritem_landedcost_' + index + '"></td>';
	html += '</tr>';
	return html;
}





function deleteExistingExpense(obj) {
	let id = $(obj).attr('data-edit-id');
	let url = $(obj).attr('data-edit-url');
	$.post(atob(url), { id: id }, function (result) {

	}, "json");
}

$('#myModal').on('shown.bs.modal', function () {
	// $('#curr-rate').trigger('keyup');
	$('#expense_invoice_percentage').val('0');
	$('#expense_invoice_percentage').trigger('keyup');
	$('#expense_invoice_percentage').val('');
	$('#expense_amount_0').val('');

});

$('.modal').on('show.bs.modal', function (event) {
	var idx = $('.modal:visible').length;
	$(this).css('z-index', 1040 + (10 * idx));
});
$('.modal').on('shown.bs.modal', function (event) {
	var idx = ($('.modal:visible').length) - 1; // raise backdrop after animation.
	$('.modal-backdrop').not('.stacked').css('z-index', 1039 + (10 * idx));
	$('.modal-backdrop').not('.stacked').addClass('stacked');
});

$('body').on('hidden.bs.modal', function () {
	if ($('.modal.show').length > 0) {
		$('body').addClass('modal-open');
	}
});

$(document).on('keyup', '#expense_invoice_percentage', function () {
	var total = cnv_Float($('input[name="netAmount"]').val());
	var percent = cnv_Float(this.value);
	var amt = (parseFloat(total) * parseFloat(percent)) / 100;
	$('#expense_amount_0').val(cnv_Float(amt));
	$('.expamount').trigger('keyup');
})
function delete_expense_row(obj) {
	$(obj).closest('tr').remove();
	erp_set_expense_amount();
	if ($(obj).attr('data-edit-id')) {
		deleteExistingExpense(obj);
	}
}

function setReversePercentage(amt) {
	var total = cnv_Float($('input[name="netAmount"]').val());
	var percentage = (cnv_Float(amt) * 100) / parseFloat(total);
	$('#expense_invoice_percentage').val(cnv_Float(percentage, 2));
}
$(document).on('change', 'input[name="purchase_type"]', function () {
	purchaseTypeHideShow(this.value);
	// //console.log($('.oqty:first').length);
	// $('.oqty_2:first').trigger('keyup');
	// if ($('.oqty:first').length) {
	// 	$('.oqty:first').trigger('keyup');
	// }
	//erp_set_amount_info();
})

$(document).on('shown.bs.modal', '#myModal', function () {
	if ($('#voucher_types').length && ($('.entity_voucher_ref').val().length == 0)) {
		let instantID = sessionStorage.getItem('vtype');
		if ($("#voucher_types option[value='" + instantID + "']").length) {
			$("#voucher_types option[value='" + instantID + "']").prop('selected', true);
		} else {
			$("#voucher_types option").each(function () {
				if ($(this).val() > 0) {
					$(this).attr('selected', true);
					return false;
				}
			});
		}
		$('#voucher_types').trigger('change');
	}
	// $('#currency_id_select').trigger('change');
	setTimeout(() => { if ($('.select2-new').length) select2New(); }, 200);
});
$(document).on('change', '#voucher_types', function () {
	var creditSalesOnly = $('#voucher_types').find('option:selected').attr('data-credit_sales_control');
	if (creditSalesOnly == 1) {
		$('#credit_purchase_only').val('1');
		$('.settlementTR').hide();
	} else {
		$('#credit_purchase_only').val('0');
		$('.settlementTR').show();
	}
})
function ModalOpened() {
	setTimeout(() => { if ($('.select2-new').length) select2New(); }, 200);
}
function changePurchaseType() {
	setTimeout(() => {
		if ($('input[name="purchase_type"]').length) {
			$('input[name="purchase_type"]').trigger('change');
		}
	}, 2000);
}
function vatfree() {

};
function is_overseas() {
	return $('input[name="purchase_type"][value="2"]:checked').length;
}

function is_taxable_local() {
	return $('#local_taxable').val();
}

function purchaseTypeHideShow(purchaseType, loading = false) {
	var cssClass = document.createElement('style');
	cssClass.type = 'text/css';
	var specialVatZero = $('input[name="special_vat_zero"]:checked').val();
	var cssText = '';
	if (purchaseType == 2) {
		cssText += '.vat_cols { display:none!important; }';
		// cssText += '.nettotal1:after { content: "Net Total"; }';
		cssText += '.special_vat { display: none!important; }';
	} else {
		var taxable = parseFloat($('#local_taxable').val());
		if (specialVatZero == 1) {
			cssText += '.vat_cols { display: table-cell!important; }';
			// cssText += '.nettotal1:after { content: "Net Total Incl. VAT"; }';
			cssText += '.special_vat { display:  table-cell!important;}';
			// cssText += '.gen_vat { display: none!important; }';
		} else {
			cssText += '.gen_vat { display: table-cell!important; }';
			if (taxable == 0 || parseInt($('#is_branch').val()) == 1) {
				cssText += '.vat_cols { display: none!important; }';
				// cssText += '.nettotal1:after { content: "Net Total"; }';
			} else {
				cssText += '.vat_cols { display:  table-cell!important; }';
				cssText += '.special_vat { display: none!important; }';
				// cssText += '.nettotal1:after { content: "Net Total Incl. VAT"; }';
			}
		}
	}

	// Set the CSS text for the new class
	if (cssClass.styleSheet) {
		cssClass.styleSheet.cssText = cssText;
	} else {
		cssClass.appendChild(document.createTextNode(cssText));
	}

	// Append the new class to the head of the document
	document.head.appendChild(cssClass);
}


function checkVoucherToVoucher(obj) {

	let option = $('#voucher_types').find('option:selected');

	var item_control = $(option).attr('data-item_control');

	var status = true;
	if (item_control == 1) {
		var inv = $(option).attr('data-inv');
		var non_inv = $(option).attr('data-non_inv');
		var fa = $(option).attr('data-fixed_asset');
		if (non_inv == 0) {
			$('.non-inv-class').each(function () {
				if (this.value == 1) {
					status = false;
					return false;
				}
			})
		}
		if (inv == 0) {
			$('.non-inv-class').each(function () {
				if (this.value == 0) {
					if (this.getAttribute('attr-fa') == 0) {
						status = false;
						return false;
					}
				}
			})
		}
		if (fa == 0) {
			$('.fixed-assets-class').each(function () {
				if (this.value == 1) {
					status = false;
					return false;
				}
			})
		}
	}
	return status;
}

function save_form_new(obj, type = 1) {

	var modal = $(obj).closest('.modal');

	var voucherTypesInput = modal.find("#voucher_types");

	if (voucherTypesInput.length > 0) {
		//console.log("Found voucher_types input in modal:", modal.attr('id'));
		//console.log("Voucher_types value:", voucherTypesInput.val());
		var proceed = checkVoucherToVoucher(obj);
		//console.log(proceed+'proceed');
		if (!proceed) {
			errormsg('Voucher not allowing INV/Non INV items');
			return false;
		}
	} else {
		//console.log("Voucher_types input not found in modal:", modal.attr('id'));
	}
	var form = $(obj).closest('form');
	var siteurl = form.attr('action');
	var id = form.attr('id');
	var url = atob(siteurl);
	var formData = new FormData(document.getElementById(id));
	preloader_on();

	var presentState = $(obj).html();
	var newState = '<i class="fa  fa-spinner  fa-pulse fa-2x fa-fw"></i> Loading....';
	$(obj).attr('disabled', 'disabled');
	$(obj).html(newState);
	var attr_ledger = $(obj).attr('data-ledger');
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: formData,
		success: function (response) {
			// //console.log(response);
			$(obj).html(presentState);
			$(obj).removeAttr('disabled');
			preloader_off();
			var saveStatus = response.saveStatus;
			if (saveStatus == 0) {
				var input = response.input;
				errormsg(response.errormsg);
				//   $('#saveBtn').prop('disabled', true);
				$('#' + input).focus();
			} else {
				var trigger = response.trigger;
				var edited = response.edited;
				var inner_form = response.inner_form;
				successmsg(response.successmsg);

				if (inner_form == 1) {
					erp_append_selectBox(response.data);
					$('.innerCloseBtn').trigger('click');
				}
				else if (type == 2) {
					$('.plusmodel_close_btn').trigger('click');
					if (response.saveStatus == 1 && response.data && response.data.supplier_group_id && attr_ledger == '0') {
						erp_add_supplier(response, 1);
					} else if (attr_ledger == '1') {
						load_expense_ledger(document.getElementById('addExpense'));
					}
					if (response.saveStatus == 1 && response.is_lot_response == 1) {

						if (response.applyToAll) {
							$('.lot_no').each(function () {
								var id = $(this).data('id');
								$('#lot_no_' + id).val(btoa(JSON.stringify(response)));
							})
						} else {
							$('#lot_no_' + response.serial_no).val(btoa(JSON.stringify(response)));
						}
					} else if (response.saveStatus == 1 && response.is_rebate_res == 1) {
						$('.plusmodel_close_btn').trigger('click');
						$('#non_inventory_item_form_data_' + response.serial_no).val(btoaUnicode(JSON.stringify(response)));
						if (response.is_air_ticket == 1) {
							let inputId = `#air_ticket_id_${response.serial_no}`;
							if ($(inputId).length) {
								$(inputId).val(response.air_ticket_id);
							} else {
								let newInput = `<input type="hidden" name="pitem[air_ticket_id][]" id="air_ticket_id_${response.serial_no}" value="${response.air_ticket_id}" />`;
								$(`#non_inventory_item_form_data_${response.serial_no}`).after(newInput);
							}
						}
					}

				}
				else {
					filter_page(0, edited);
					$('.model_close_btn').trigger('click');
				}

			}

		},
		contentType: false,
		processData: false
	});

	return false;
}

function add_new_customer_supplier(obj) {
	$(function () {

		var modalwidth = "60";
		var dynamic = "0";
		var action = "";
		var hidefooter = 0;
		var siteurl = $(obj).attr('data-url');
		var id = $(obj).attr('data-id');
		var title = $(obj).attr('data-title');
		var btnlabel = $(obj).attr('data-btnlabel');
		var param = $(obj).attr('data-param');
		if ($(obj).attr('data-modalwidth')) {
			modalwidth = $(obj).attr('data-modalwidth');
		}
		if ($(obj).attr('data-dynamic')) {
			dynamic = $(obj).attr('data-dynamic');
		}
		if ($(obj).attr('data-action')) {
			action = $(obj).attr('data-action');
		}
		if ($(obj).attr('data-hidefooter')) {
			hidefooter = Math.abs($(obj).attr('data-hidefooter'));
		}

		var url = atob(siteurl);
		preloader_on();
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				preloader_off();
				if (hidefooter == 1) {
					$('.card-footer').hide();
					$('.closeBtn').show();
				} else {
					$('.card-footer').show();
					$('.closeBtn').hide();
				}
				if (dynamic == 1) {
					erp_open_moal(this.responseText);
					$('#innerform').attr('action', action);
					$('#innerModalLabel').html(title);
				} else {
					if (action != "") {
						$('#plusmodalform').attr('action', action);
					}
					$('.plusmodal-dialog').css('width', modalwidth + '%');
					$('#plusModal').modal('show');
					$('#plusmodal_title').html(title);
					$('#plussaveBtn').html('<i class="fa fa-plus-circle"></i> ' + btnlabel);
					$('#plusformDiv').html(this.responseText);
				}

			}
		};
		xmlhttp.open("GET", url + "?jsondata=" + param, true);
		xmlhttp.send();
	})
}

$(document).on('show.bs.modal', '.modal', function (event) {
	var idx = $('.modal:visible').length;
	$(this).css('z-index', 1040 + (10 * idx));
});
$(document).on('shown.bs.modal', '.modal', function (event) {
	var idx = ($('.modal:visible').length) - 1; // raise backdrop after animation.
	$('.modal-backdrop').not('.stacked').css('z-index', 1039 + (10 * idx));
	$('.modal-backdrop').not('.stacked').addClass('stacked');

});

$('body').on('hidden.bs.modal', function () {
	if ($('.modal.show').length > 0) {
		$('body').addClass('modal-open');
	}
});

function lotNumberParamsUpdate(obj) {
	var Eparam = $(obj).data('param');
	var Edata = atob(Eparam);
	var Edata = JSON.parse(Edata);
	var serial_no = atob(Edata.serial_no);
	var ref = $('.entity_voucher_ref').val();
	var lot_no_input = $('#lot_no_' + serial_no).val();

	var param = {};
	param['serial_no'] = Edata.serial_no;
	param['id'] = Edata.id;
	param['edit_page'] = 'lot_no';
	param['pre_data'] = lot_no_input;
	param['ref'] = ref;
	param['is_exists'] = Edata.is_exists;
	param['lot_no'] = Edata.lot_no;

	var myJsonString = JSON.stringify(param);
	var result = btoa(myJsonString);
	$(obj).attr('data-param', result);

	return add_new_customer_supplier(obj);
}

$(document).on('change', '.unit-id', function () {
	var id = $(this).attr('data-id');
	var $selected = $('#unit_id_' + id).find('option:selected');
	var cost = $selected.attr('data-cost');
	var cid = $selected.attr('data-cid');
	var code = $selected.attr('data-code');
	var description = $selected.attr('data-description');
	var tot_unit = $selected.attr('data-tot_unit');

	$('#tot_unit_' + id).val(tot_unit);

	$('#compound_id_' + id).val(cid);
	$('#ritem_unitprice_' + id).html(cnv_Float(cost));

	$('#name_div_' + id).html(description);
	$('#code_div_' + id).html(code);

	/******************** Trigger functiond for calculation *********************/
	$('#unit_price_' + id).val(cost);
	$('#maxdiscount_' + id).trigger('keyup');

})

function generatePdf(obj, type = 0, typo = 0, format = 1) {
	var param = $(obj).data('param');
	var url = atob($(obj).data('url'));
	var id = atob($(obj).data('id'));
	if (format == 'custom') {
		url = atob($(obj).data('url-custom'));
	}

	// window.open(url +'?jsondata=' + param,'_blank');return;
	$.post(url + '?jsondata=' + param, { id: id, type: type, typo: typo }, function (result) {
		if (result.saveStatus == 1) {
			if (type > 0) {
				const link = document.createElement('a');
				link.href = result.url;
				link.setAttribute('download', result.name);
				document.body.appendChild(link);
				link.click();
				// filter_page(0,0);
				// $('.is_mail_sent_checkbox[data-id="'+id+'"]').trigger('click');
				$('#mail_status_' + id).find('option[value="1"]').prop('selected', true);
			} else {
				window.open(result.url, '_blank');
			}
		} else {
			errormsg(result.errormsg);
		}
	}, "json");

	if (type > 0) {
		setTimeout(() => {
			var hreff = $(obj).attr('href');
			$(obj).attr('href', 'javascript:void(0)');
			window.location = hreff;
		}, 2500);
		return false;
	} else {
		return false;
	}
}
function confirmFormat(obj, type = 0, typo = 0) {

	var pdf_preview_loc = atob($('#pdf_preview_loc').val());

	var letterheadprint = $(obj).data('letterheadprint');
	var letterhead_file = (letterheadprint == 1) ? '-lh' : '';

	var customformat = $(obj).data('customformat');
	var customFormatPreview = '';
	if (customformat) {
		customFormatPreview =
			`<div class="sp-bw-center" style="flex-direction: column;">
				<img src="${pdf_preview_loc}format-custom${letterhead_file}.png" style="margin-bottom: 1pc;margin-right: 1pc;height: 220px;border: 1px solid #d1eaf9;"> 
				<input style="zoom:2;" type="radio" name="formatImage" value="custom" checked />Custom Format
			</div>`;
	}

	swal({
		title: '',
		type: 'question',
		customClass: 'image-format',
		showCloseButton: true,
		showCancelButton: true,
		focusConfirm: false,
		confirmButtonText:
			'<i class="fa fa-thumbs-up"></i> Go!',
		confirmButtonAriaLabel: '',
		cancelButtonText:
			'<i class="fa fa-ban"></i> Cancel',
		cancelButtonAriaLabel: 'Thumbs down',
		html:
			` <div class="sp-bw-center" style="justify-content:center;margin-bottom:2.5pc">
	    <h3>Select Format</h3>
	   </div>
	   <div class="sp-bw-center" style="justify-content:center">
	   <div class="sp-bw-center" style="flex-direction: column;">
		   <img src="${pdf_preview_loc}format-1${letterhead_file}.png" style="margin-bottom: 1pc;margin-right: 1pc;height: 220px;border: 1px solid #d1eaf9;"> 
		   <input  style="zoom: 2;"type="radio" id="imageRadio1" name="formatImage" value="1" checked  />Format 1 
	   </div>
	   ${customFormatPreview}
		 </div>`,
	})
		.then(function (isConfirm) {
			if (isConfirm.value == true) {
				var checkedFormat = $('input[name="formatImage"]:checked').val();
				generatePdf(obj, type, typo, checkedFormat);
				return true;
			} else {
				return false;
			}
		});
	return false;
}




$(document).on('blur', ".oqty", function (e) {
	set_trade_unit(this);
	// pos_batch_number(this);
	if (this.getAttribute('data-fa') == 1) {
		var nameIndex = $(".oqty").index(this);
		var qty = this.value;
		var id = this.getAttribute('data-index');
		var without_slno = this.getAttribute('data-without_slno');
		var name = $('#name_div_' + id).html();
		var unitPrice = $('#net_unit_price_' + id).val();
		var unitName = $('#unit_id_' + id).find('option:selected').text();
		var unitID = $('#unit_id_' + id).find('option:selected').val();
		var prodID = $(this).attr('data-proid');
		var months = $(this).attr('data-months');
		var process_type = 4;
		fixedAssetForm(name, qty, unitPrice, unitName, id, nameIndex, prodID, unitID, months, process_type, 0, without_slno);
	}
});

function set_trade_unit(obj, type = 0) {
	if (!trade_in_kg()) return;
	if (type == 0) {
		var id = $(obj).attr('data-index');
		var qty = $(obj).val();
		var unitPrice = $('#unit_price_' + id).val();
		var tradeUnit = $('#unit_id_' + id).attr('data-trade-unit');
		var finder = $('#unit_id_' + id).find('option[data-cid="' + tradeUnit + '"]');
		var totUnit = finder.attr('data-tot_unit');
		var CompName = finder.text();
		var conQty = isNAN(qty) * isNAN(totUnit);
		$('#qty_2v_' + id).html(conQty);
		$('#tot_unit_2_' + id).val(totUnit);
		$('#comp_id_2_' + id).val(tradeUnit);
		$('#comp_id_2v_' + id).html(CompName);
	} else {
		var id = $(obj).attr('data-id');
		var totUnit = $('#tot_unit_2_' + id).val();
		var unitPrice = $('#unit_price_' + id).val();
	}
	var conUnitPrice = isNAN(unitPrice) / isNAN(totUnit);
	$('#unit_price_2_' + id).val(conUnitPrice);
	$('#unit_price_2v_' + id).html(cnv_Float(conUnitPrice));
}

function pos_batch_number(obj) {
	var id = $(obj).attr('data-index');
	var batch = isNAN($('#is_batch_' + id).val());
	var is_sr_no = isNAN($('#is_serial_number_' + id).val());
	var qty = isNAN($(obj).val());
	var url = $('#save-batch-form').val();
	var batchUrl = $('#save-batch-expiry-form').val();
	if ($('#exampleModal').is(':visible')) {
		return;
	}

	if (!qty || (batch == 0 && is_sr_no == 0)) {
		return;
	}
	var is_expiry = isNAN($('#is_expiry_' + id).val());
	var is_auto_expiry_days = isNAN($('#is_auto_expiry_days_' + id).val());
	var is_date_as_batch = 0;
	var ActualBatchNumber = $('#actual_batch_number_' + id).val();
	var expiry_date = $('#expiry_date_' + id).val();


	var batch_number = [];
	if ($('#batch_numbers_' + id).length) {
		var batch_number_json = atob($('#batch_numbers_' + id).val());
		if (batch_number_json) batch_number = JSON.parse(batch_number_json);
	}


	var body = ` <table class="table table-batch table-bordered">
	<tbody>`;
	for (i = 0; i < qty && i < 1000; i++) {
		var sr_number = '';
		var robotID = Robot.makeId();
		if (batch_number.length && typeof batch_number[i]['id'] !== 'undefined') {
			sr_number = batch_number[i]['sn'];
			robotID = batch_number[i]['id'];

		}

		body += `
	   		<tr>
			  	<td class="center" style="vertical-align:middle">${i + 1}</td> 
				<td>
				 <input value="${sr_number}"  id="sr_no_${i}" type="text" placeholder="Serial Number" name="serial_no[${i}][sn]" class="form-control serial-number-input" />
				 <input type="hidden"   name="serial_no[${i}][id]" value="${robotID}" />
			  	</td>
		   	</tr>
	   `;
	}
	body += ` 
	</tbody>
	</table>`;
	var batch_html_li = '';
	var batch_html_tab = '';
	var today = erp_format_date(new Date(), format = 'dd-mm-yyyy');

	if (is_expiry) {
		if (!is_auto_expiry_days) {
			expiry_date = '';
		} else {
			if (expiry_date instanceof Date && !isNaN(expiry_date)) {
				expiry_date = erp_format_date(expiry_date, 'dd-mm-yyyy');
			} else if (typeof expiry_date === 'string' && !isNaN(new Date(expiry_date).getTime())) {
				expiry_date = erp_format_date(expiry_date, 'dd-mm-yyyy');
			} else {
				expiry_date = '';
			}
		}
	}


	var expiryTH = `<th class="center">Exp. Date</td> <th class="center">
						<button class="btn btn-sm btn-info" type="button" onclick="addBacthExpiryRows(${id})">
							<i class="icon-plus"></i>
						</button>
					</td>`;
	var expiryTD = `<td>
						<input class="form-control form-control-sm" data-attr="date" type="text" placeholder="Expiry Date" name="expiry_date[]" value="${expiry_date}" />
					</td> 
				 	<td><i class="fa fa-trash batch-trash"></i></td>  `;
	if (!is_expiry) {
		expiryTH = ``;
		expiryTD = `<td><i class="fa fa-trash batch-trash"></i></td>`;
	}
	//console.log(expiryTD);
	// if (!is_date_as_batch) {
	// 	ActualBatchNumber = '';
	// }
	var TBODY = `<tr>
					<td>
						<input class="form-control form-control-sm batchQty" type="text" placeholder="Qty" name="batch_qty[]" value="${qty}"  />
					</td>
					<td>
						<input class="form-control form-control-sm" type="text" placeholder="Batch No." name="actual_batch_number[]" value="${ActualBatchNumber}" />
					</td>
					<td>
						<input class="form-control form-control-sm" data-attr="date" type="text" placeholder="Mfg. Date" name="mfg_date[]" value="${today}" />
					</td>
					${expiryTD}
					
				</tr>`;
	var actual_batch = [];
	if ($('#actual_batch_arr_' + id).length && $('#actual_batch_arr_' + id).val() != '') {
		var actual_batch_json = atob($('#actual_batch_arr_' + id).val());
		if (actual_batch_json) actual_batch = JSON.parse(actual_batch_json);
		var TBODY = '';
	}
	for (i = 0; i < actual_batch.length; i++) {
		if (actual_batch.length && typeof actual_batch[i]['batch_number'] !== 'undefined') {
			var expiryTD = `<td>
								<input class="form-control form-control-sm" data-attr="date" type="text" placeholder="Expiry Date" name="expiry_date[]" value="${actual_batch[i]['expiry_date']}" />
							</td> 
							<td><i class="fa fa-trash batch-trash"></i></td>  `;
			if (!is_expiry) {
				expiryTD = `<td><i class="fa fa-trash batch-trash"></i></td>`;
			}
			TBODY += `<tr>
					<td>
						<input class="form-control form-control-sm batchQty" type="text" placeholder="Qty" name="batch_qty[]" value="${actual_batch[i]['qty']}"  />
					</td>
					<td>
						<input class="form-control form-control-sm" type="text" placeholder="Batch No." name="actual_batch_number[]" value="${actual_batch[i]['batch_number']}" />
					</td>
					<td>
						<input class="form-control form-control-sm" type="text" data-attr="date" placeholder="Mfg. Date" name="mfg_date[]" value="${actual_batch[i]['mfg_date']}" />
					</td>
					${expiryTD}
				</tr>`;
		}

	}
	var batchBody = ` 
	<input type="hidden" value="${qty}" id="enteredBatchQty"  />
	<table class="table table-batch table-bordered">
		<thead class="thead-sticky">
			<th class="center">Qty</td> 
			<th class="center">Batch</td> 
			<th class="center">Mfg. Date</td> 
			${expiryTH}
			 
		</thead>
		<tbody id="moreExpiryDatesTbody">
	   		${TBODY}
		</tbody>
	</table>`;

	if (batch) {
		batch_html_li = `<li role="presentation" class="tabs inventory productForm"style="width: 50%;">
							<a href="#batchExpiryTab" class=" active" aria-controls="batchExpiryTab" role="tab" data-toggle="tab" aria-selected="true" >
								<i class="ti-alarm-clock"></i>&nbsp; <span>Batch &amp; Expiry</span>
							</a>
						</li>`;
		batch_html_tab = `<div role="tabpanel" class="tab-pane active" id="batchExpiryTab">
					<div class="p-0" style="background-color:#fff">
					<form method="post" action="${batchUrl}" id="batch-expiry-form" style="background-color:#fff">
						<input type="hidden" name="batch_selection_id" value="${id}">
						${batchBody} 
					</form>
					</div>
					<div class="modal-footer" style="background-color:#fff">
						<button class="btn  btn-success" name="saveBtn" form="batch-expiry-form" data-id="${id}" id="addBatchExpiryNumber" type="submit" ><i class="fa fa-plus-circle"></i> Save </button>' 
						<button class="btn  btn-danger innerCloseBtn" name="ResetData" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' 
					</div>
				</div>`;
	}
	var srno_html_li = '';
	var srno_html_tab = '';
	if (is_sr_no) {
		srno_html_li = `<li role="presentation" class="tabs" style="width: 50%;">
							<a href="#SNTab" class="atabs" aria-controls="SNTab" id="hometab" role="tab" data-toggle="tab" aria-selected="false">
								<i class="mdi mdi-format-list-bulleted" ></i>&nbsp; <span>Serial Number</span>
							</a>
						</li>`;
		srno_html_tab = `<div class="tab-pane " role="tabpanel" id="SNTab">
							<div class="modal-body" style="background-color:#fff">
								<form method="post" action="${url}" id="batch-no-form" style="background-color:#fff" onsubmit="return false;">
									<input type="hidden" name="selection_id" value="${id}">
									${body} 
								</form>
							</div>
							<div class="modal-footer" style="background-color:#fff">
								<button class="btn  btn-success" name="saveBtn" data-id="${id}" id="addBatchNumber" type="button" ><i class="fa fa-plus-circle"></i> Add </button>' 
								<button class="btn  btn-danger innerCloseBtn" name="ResetData" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' 
							</div>
						</div>`;
	}
	var exampleModal = getModal();
	if (!exampleModal) { exampleModal = initModal(50); }
	var html = `<div class="modal- mb-1 p-0" style="background-color:#fff">
					<ul class="nav nav-tabs" role="tablist" style="width: 100%;">
						 ${batch_html_li}
						${srno_html_li}
					</ul>
				</div>
	<div class="tab-content">
		 ${batch_html_tab}
		${srno_html_tab}
	</div>`;
	setModalContent(html);
	jQuery(exampleModal).modal('show');
	if (is_sr_no == 1 && batch == 0) setTimeout(() => $('a[href="#SNTab"]').click(), 500);
	// return false;

}
$(document).on('click', '#addBatchNumber', function () {
	return pos_save_batch_no(this);
})
$(document).on('submit', '#batch-expiry-form', function (e) {
	return save_batch_expiry(this);
})
function save_batch_expiry(obj) {
	// var form = document.getElementById('batch-no-form');
	var siteurl = obj.getAttribute('action');
	var id = obj.getAttribute('id');
	var url = atob(siteurl);
	var formData = new FormData(document.getElementById('batch-expiry-form'));
	var srID = $('input[name="batch_selection_id"]').val();
	formData.append('totqty', $('#qty_' + srID).val());
	$.ajax({
		processData: false,
		contentType: false,
		cache: false,
		data: formData,
		type: "POST",
		dataType: "json",
		url: url,
		success: function (result) {
			if (result.saveStatus == 1) {
				successmsg(result.successmsg);
				var serial_no = result.serial_no;
				var inputHTML = `<input type="hidden"  
									name="pitem[actual_batch_arr][]" 
									id="actual_batch_arr_${serial_no}" 
									value="${result.data}">`;
				if ($('#actual_batch_arr_' + serial_no).length)
					$('#actual_batch_arr_' + serial_no).val(result.data);
				else
					$('#is_batch_' + serial_no).after(inputHTML);


				$('#qty_' + serial_no).after(`<span class="batch_number_span" data-id="${serial_no}" >SN</span>`);
				$('.innerCloseBtn').trigger('click');
			} else {
				errormsg(result.errormsg);
			}
		}
	});

	return false;
}

function pos_save_batch_no(obj) {
	var form = document.getElementById('batch-no-form');
	var siteurl = form.getAttribute('action');
	var id = form.getAttribute('id');
	var url = atob(siteurl);
	var formData = new FormData(document.getElementById(id));
	var $qty = isNAN($('#qty_' + obj.getAttribute('data-id')).val());
	formData.append('srno_punched_qty', $qty);
	$.ajax({
		processData: false,
		contentType: false,
		cache: false,
		data: formData,
		type: "POST",
		dataType: "json",
		url: url,
		success: function (result) {
			if (result.saveStatus == 1) {
				successmsg(result.successmsg);
				var serial_no = result.serial_no;
				var $batchInput = $('#batch_numbers_' + serial_no);
				if ($batchInput.length) {
					$batchInput.val(result.data);
				}
				$('#qty_' + serial_no).after(`<span class="batch_number_span" data-id="${serial_no}" >SN</span>`);
				$('.innerCloseBtn').trigger('click');
			} else {
				errormsg(result.errormsg);
			}
		}
	});

	return false;
}

// $(document).on('click', '.batch_number_span', function () {
// 	var id = $(this).attr('data-id');
// 	pos_batch_number(document.getElementById('qty_' + id));
// })

$(document).on('keypress', '.oqty', function (e) {
	if (e.keyCode === 13) {
		erp_enter_batch_details($(this).closest('tr'));
		// pos_batch_number(this);
	}
});

$('#myModal').on('change', '.oqty', function (e) {
	erp_enter_batch_details($(this).closest('tr'));
});

$(document).on('keyup', '.serial-number-input', function (e) {
	var sr_no = $(this).val();
	var siteurl = $('#validateSRNumber').val();
	var that = this;
	var breakout = false;
	if (sr_no) {
		$('.serial-number-input').each(function () {
			//console.log(that.id + sr_no);
			//console.log(this.id + $(this).val());
			if (this.id !== that.id) {
				if ($(this).val() == sr_no) {
					$(that).parent().find('span').remove();
					$(that).after(`<span style="color:red"> Dublicates Not allowed. </span>`);
					$('#addBatchNumber').attr('disabled', 'disabled').css('cursor', 'not-allowed');
					breakout = true;
					return false;
				}
			}
		});
		if (breakout) return false;
		var selectionID = $('input[name="selection_id"]').val();
		var product_id = isNAN($('#qty_' + selectionID).attr('data-proid'));
		$.ajax({

			type: "POST",
			dataType: "json",
			url: atob(siteurl),
			data: { 'product_id': product_id, 'sr_no': sr_no, type: 'purchase' },
			success: function (result) {
				if (result.saveStatus == 1) {
					$(that).parent().find('span').remove();
					$('#addBatchNumber').removeAttr('disabled').css('cursor', 'pointer');
				} else {
					$(that).parent().find('span').remove();
					$(that).after(`<span style="color:red"> ${result.errormsg} </span>`);
					$('#addBatchNumber').attr('disabled', 'disabled').css('cursor', 'not-allowed');
				}
			}
		});
	} else {
		$('#addBatchNumber').attr('disabled', 'disabled').css('cursor', 'not-allowed');
	}
})

function frameItem() {
	$('#reciept-iframe').attr('src', atob($('#frameItemUrl').val()));
	$('#customerRecieptModal123').modal('toggle');
	setTimeout(() => {
		$('#reciept-iframe').contents().find('div').addClass('sidebar-enable enlarged')
	},
		500);
}

function addBacthExpiryRows(id, t = 0) {
	// var today = new Date()
	// 	.toISOString()
	// 	.split("T")[0];
	let remaningQty = getTotalBatchQty($('#enteredBatchQty').val());
	if (remaningQty == 0) return;
	var today = erp_format_date(new Date(), format = 'dd-mm-yyyy');
	var is_expiry = $('#is_expiry_' + id).val();
	var is_auto_expiry_days = $('#is_auto_expiry_days_' + id).val();
	var is_date_as_batch = 0;
	var ActualBatchNumber = $('#actual_batch_number_' + id).val();
	var expiry_date = $('#expiry_date_' + id).val();
	if (is_expiry) {
		if (!is_auto_expiry_days) {
			expiry_date = '';
		} else {
			if (expiry_date instanceof Date && !isNaN(expiry_date)) {
				expiry_date = erp_format_date(expiry_date, 'dd-mm-yyyy');
			} else if (typeof expiry_date === 'string' && !isNaN(new Date(expiry_date).getTime())) {
				expiry_date = erp_format_date(expiry_date, 'dd-mm-yyyy');
			} else {
				expiry_date = '';
			}
		}
	}
	var expiryTD = `<td>
						<input class="form-control form-control-sm "  data-attr="date" type="text"  placeholder="Expiry Date" name="expiry_date[]" value="${expiry_date}" />
					</td> 
				 	<td><i class="fa fa-trash batch-trash"></i></td> `;
	if (!is_expiry) {

		expiryTD = `<td><i class="fa fa-trash batch-trash"></i></td>`;
	}
	// if (!is_date_as_batch) {
	// 	ActualBatchNumber = '';
	// }

	var HTML = ` 
	
	   		<tr class="new-batch-row">
			  	<td>
					<input class="form-control form-control-sm batchQty" type="text" placeholder="Qty" name="batch_qty[]" value="${remaningQty}"  />
				</td>
				<td>
					<input class="form-control form-control-sm" type="text" placeholder="Batch No." name="actual_batch_number[]" value="${ActualBatchNumber}" />
				</td>
				<td><input class="form-control form-control-sm" data-attr="date" type="text"  placeholder="Mfg. Date" name="mfg_date[]" value="${today}" /></td>
				${expiryTD}
				
		   	</tr>
	`;
	$('#moreExpiryDatesTbody tr:last-child').after(HTML);

	// Initialize datepicker only for the newly added inputs
	$('#moreExpiryDatesTbody tr.new-batch-row input[data-attr="date"]').datepicker({
		autoclose: true,
		format: 'dd-mm-yyyy',
		todayHighlight: true
	});

	// Optional: remove the class so it won’t be re-initialized later
	$('#moreExpiryDatesTbody tr.new-batch-row').removeClass('new-batch-row');
}
$(document).on('blur', '.batchQty', function () {
	var enteredQty = parseFloat($(this).val()) || 0;
	var requiredQty = parseFloat($('#enteredBatchQty').val()) || 0;
	if (enteredQty == 0) return;
	if (enteredQty < requiredQty) {
		addBacthExpiryRows($('input[name="batch_selection_id"]').val(), 1);
	}
	else if (enteredQty > requiredQty) {
		toastr.error('Entered quantity cannot exceed the required batch quantity (' + requiredQty + ').');
		$(this).val(requiredQty); // Optional: reset to max allowed
	}
});
function getTotalBatchQty(totQty) {
	let totalQty = 0;
	$('input[name="batch_qty[]"]').each(function () {
		let val = parseFloat($(this).val()) || 0; // Convert to number, default 0
		totalQty += val;
	});
	let rem = isNAN(totQty) - isNAN(totalQty)
	return (rem > 0) ? rem : 0;
}
$('#modalform').on('click', '.ref_manual_entry', function (e) {
	$(this).closest('.wrapper').hide();
	$(this).closest('.wrapper').next('.ref_manual_entry_field').prop('type', 'text');
});

function get_insurance_commision(insurance_id) {
	var siteurl = $('#siteurl').val();
	var supplier_id = $('#supplier_id').val();
	var date = $('#purchase_date').val();

	if (!$.isNumeric(supplier_id) || supplier_id <= 0) {
		return;
	}

	$.post(siteurl + 'site/insurance_masters/get_supplier_commision.php', { supplier_id: supplier_id, insurance_id: insurance_id, date: date }, function (result) {
		//console.log(result);
	});
}

function erp_brokerage_purchase(obj) {
	var checked = $(obj).is(':checked');
	if (checked) {
		$('.brokerage-col').show();
	} else {
		$('.brokerage-col').hide();
	}
}

function erp_set_alter_qty_total(obj) {
	var index = $(obj).attr('data-index');
	var qty = $('#qty_' + index).val();
	var alter_qty = $('#alter_qty_' + index).val();
	var alter_unit = $('#alter_unit_id_' + index).find('option:selected').data('unit');
	if (qty.length == 0) {
		qty = 0;
	}
	if (alter_qty.length == 0) {
		alter_qty = 0;
	}
	var alter_qty_total = parseFloat(qty) / parseFloat(alter_qty);
	var SHOW_alter_qty_total = (alter_qty_total != 0) ? alter_qty_total : '';
	$('#SHOW_alter_qty_total_' + index).text(SHOW_alter_qty_total + ' ' + alter_unit);
	$('#alter_qty_total_' + index).val(alter_qty_total);
}

$(document).on('change', '.alter_unit_id', function () {
	erp_set_alter_qty_total(this);
});

function onchangeCurrency(obj) {
	var company_curr_id = $('#company_curr_id').val();
	var company_curr_code = $('#company_curr_code').val();
	var curr_id = $(obj).val();
	var curr_code = $(obj).find('option:selected').text();
	var curr_rate = $(obj).find('option:selected').attr('data-rate');
	var decimal = $(obj).find('option:selected').attr('data-decimal');

	if (company_curr_id != curr_id) {
		$('#curr_rate').closest('.formrow').show();
		$('.curr-code-foreign').html(`(${curr_code})`).show();
		$('.curr-code-local').html(`(${company_curr_code})`).show();
		$('.foreign-curr-col').show();
		// $('.unit-price-editable').prop('contenteditable','false');
	} else {
		$('#curr_rate').closest('.formrow').hide();
		$('.curr-code-foreign').html('').hide();
		$('.curr-code-local').html('').hide();
		$('.foreign-curr-col').hide();
		// $('.unit-price-editable').prop('contenteditable','true');
	}

	$('#curr_rate').val(curr_rate);
	$('#foreign_doc_discount').trigger('change');
	$('.unit-price-editable').each(function () {
		var id = $(this).data('id');
		var unit_price = cnv_Float($(this).html());
		var unit_price_foreign = cnv_Float(unit_price / curr_rate, decimal);
		$('#foreign_unit_price_' + id).val(unit_price_foreign).trigger('change');
	});
	// $('#doc_discount').val(cnv_Float($('#doc_discount').val())).trigger('keyup');
}

function erp_foreign_set_line_total(rowID) {
	var decimals = $('#currency_id_select').find('option:selected').attr('data-decimal');
	var unit_price = cnv_Float($('#foreign_unit_price_' + rowID).val());
	var qty = cnv_Float($('#qty_' + rowID).val());
	var disc_perc = cnv_Float($('#maxdiscount_' + rowID).val());

	var disc_per_unit = cnv_Float((unit_price * disc_perc) / 100, decimals);
	var net_unit_price = cnv_Float(unit_price - disc_per_unit, decimals);
	var net_total = cnv_Float(net_unit_price * qty, decimals);

	$('#foreign_disc_per_unit_' + rowID).val(disc_per_unit);
	$('#foreign_net_unit_price_' + rowID).val(net_unit_price);
	$('#foreign_net_total_' + rowID).val(net_total);
	$('#SHOW_foreign_disc_per_unit_' + rowID).text(disc_per_unit);
	$('#SHOW_foreign_net_unit_price_' + rowID).text(net_unit_price);
	$('#SHOW_foreign_net_total_' + rowID).text(net_total);
	// erp_foreign_calc_total();
}

function erp_foreign_calc_total() {
	var decimals = $('#currency_id_select').find('option:selected').attr('data-decimal');
	var tot_bef_disc = 0;
	var tot_discount = 0;
	// var net_total = 0;
	$('.unit-price-foreign').each(function () {
		var id = $(this).data('id');
		var qty = parseFloat($('#qty_' + id).val());
		tot_bef_disc += parseFloat($('#foreign_unit_price_' + id).val() * qty);
		tot_discount += parseFloat($('#foreign_disc_per_unit_' + id).val() * qty);
		// net_total += cnv_Float($('#foreign_net_total_'+ id).val());
	});
	var doc_discount = parseFloat($('#foreign_doc_discount').val());
	tot_discount += doc_discount;
	var net_total = tot_bef_disc - tot_discount;

	$('#foreign_doc_tot_bef_disc').val(cnv_Float(tot_bef_disc, decimals));
	$('#foreign_doc_tot_discount').val(cnv_Float(tot_discount, decimals));
	$('#foreign_doc_net_total').val(cnv_Float(net_total, decimals));
	$('.fg-show-total').html(cnv_Float(net_total, decimals));
}

// $(document).on('change', '.unit-price-foreign', function () {
// 	$(this).val(unit_price);
// });

$(document).on('change', '.unit-price-foreign', function () {
	var id = $(this).data('id');
	var decimals = $('#currency_id_select').find('option:selected').attr('data-decimal');
	var curr_rate = $('#curr_rate').val();

	var unit_price = cnv_Float($(this).val(), decimals);
	var local_unit_price = cnv_Float(unit_price * curr_rate);

	// $(this).val(unit_price,decimals);
	$('#ritem_unitprice_' + id).text(local_unit_price).trigger('keyup');
	erp_foreign_set_line_total(id);
});

$(document).on('change', '#curr_rate', function () {
	$('.unit-price-foreign').each(function () {
		$(this).trigger('change');
	});
	$('#foreign_doc_discount').trigger('change');
});

$(document).on('change', '#foreign_doc_discount', function () {
	var decimals = $('#currency_id_select').find('option:selected').attr('data-decimal');
	var curr_rate = $('#curr_rate').val();

	var foreign_doc_discount = cnv_Float($(this).val(), decimals);
	var doc_discount = cnv_Float(foreign_doc_discount * curr_rate);

	$('#doc_discount').val(doc_discount).trigger('keyup');
});
// dev-6
function Check_nt_transaction(obj) {
	var modal = $(obj).closest('.modal');
	var voucherTypesInput = modal.find("#voucher_types");
	if (voucherTypesInput.length > 0) {
		let option = $('#voucher_types').find('option:selected');
		var nt_transation = $(option).attr('data-nt_transaction');
		if (nt_transation == 1) {
			swal({
				title: "Warning",
				text: 'You are using NT Sales, Do you want to continue?',
				type: "warning",
				confirmButtonText: "Yes",
				showCancelButton: true
			})
				.then((result) => {
					if (result.value) {
						erp_save_form(obj);
					} else if (result.dismiss === 'cancel') {
						success = 0;
					}
				})
		}
		else {
			erp_save_form(obj);
		}
	}
	else {
		erp_save_form(obj);
	}
}
// dev-6
function getLedgers(obj) {
	var selected = $(obj).attr('data-selected');
	var siteurl = $('#siteurl').val();
	var url = siteurl + "site/products/account_group/get_data.php";
	//	$(obj).find('option:not(:first)').remove();
	var type = 'service';
	var ledgerType = "purchase";
	$.ajax({
		url: url,
		method: "POST",
		dataType: "json",
		data: { type: type, ledgerType: ledgerType },
		success: function (data) {
			$(obj).empty().append('<option value="0" selected disabled>Select Ledger</option>');
			$.each(data, function (i, field) {
				var name = field.name;
				var id = field.id;
				var is_ledger = field.is_ledger;
				var disabled = '';
				if (is_ledger != 1) {
					disabled = 'disabled';
				}
				var main_id = field.main_id;
				if (id == selected && selected != 0) {
					var option = '<option ' + disabled + ' value="' + id + '" selected>' + name + '</option>';
				} else {
					var option = '<option ' + disabled + ' value="' + id + '" >' + name + '</option>';
				}
				$(obj).append(option);
			});
		}
	});

}
// function showLedger()
// {
// 	setTimeout(()=> {getLedgers($('#purchase_ledger'))},4000);
// }
// $(document).on('shown.bs.modal', '#myModal', function () {
// getLedgers($('#purchase_ledger'));
// $('#currency_id_select').trigger('change');
// });

// $(document).on('change', '#purchase_ledger', function () {
//     var ledger_id = $(this).val();
//     $('.ledger_id.non_inventory_0').val(ledger_id);
// });
// dev-6

// Handle keyup event
$(document).ready(function () {

	$(document).on('keyup', '#booking-gl + .btn-group .multiselect-search', function () {
		// Fetch data based on user input
		var userInput = $(this).val(); // Get the user's input
		$('#booking-gl + #multiselect + .btn-group .multiselect-search').val(userInput);
		if (userInput.length > 3)
			fetchDataGL(userInput); // Call a function to fetch data based on the input
	});

	// Function to fetch data based on user input
	function fetchDataGL(input) {
		// Perform AJAX call to fetch data
		var siteurl = $('#siteurl').val();
		var url = siteurl + "site/products/account_group/search_ledgers.php";
		$.ajax({
			url: url, // URL to fetch data from
			method: 'GET',
			data: { query: input }, // Send user input as a query parameter
			success: function (response) {
				// Process the response and populate the multiselect options
				if (response.saveStatus == 1) {
					$('#booking-gl').empty(); // Clear existing options
					$.each(response.data, function (index, item) {
						$('#booking-gl').append($('<option>', {
							value: item.id,
							text: item.name
						}));
					});
					$('#booking-gl').multiselect('rebuild'); // Rebuild the multiselect
					$('#booking-gl + .btn-group .multiselect-search').val(input);
					$('#booking-gl + .btn-group .multiselect-search').focus();


				}
			},
			error: function (xhr, status, error) {
				console.error('Error fetching data:', error);
			}
		});
	}

	//    $(document).on('keyup','#purchase_ledger + .btn-group .multiselect-search', function() 
	//    {

	// 		var userInput = $(this).val(); // Get the user's input
	// 		$('#purchase_ledger + #multiselect + .btn-group .multiselect-search').val(userInput);
	// 		setTimeout( ()=>{
	// 		if(userInput.length > 3) 
	// 			fetchDataLedger(userInput); // Call a function to fetch data based on the input

	// 	 	},500);
	// 		// Fetch data based on user input
	// 		});

	// Function to fetch data based on user input
	// function fetchDataLedger(input) {
	// 	// Perform AJAX call to fetch data
	// 	var siteurl = $('#siteurl').val();
	// 	var ledgerGroupIds = $("#ledger_group_id").val();
	// 	var url = siteurl+"site/products/account_group/search_default_ledgers.php";
	// 	$.ajax({
	// 		url: url, // URL to fetch data from
	// 		method: 'GET',
	// 		data: { query: input,ledgerGroupIds:ledgerGroupIds }, // Send user input as a query parameter
	// 		success: function(response) {
	// 			// Process the response and populate the multiselect options
	// 			if(response.saveStatus == 1){
	// 					$('#purchase_ledger').empty(); // Clear existing options
	// 					var option ="";
	// 					$.each(response.data, function(index, item) {
	// 					 	var is_ledger = item.is_ledger;
	// 		                var disabled= '';
	// 		                // if(item.id == 0){
	// 		                //     disabled = 'disabled';
	// 		                // }
	//                     option = '<option '+disabled+' value="'+ item.id+'" >'+item.name+'</option>';
	//                 	$('#purchase_ledger').append(option);
	// 					$('#purchase_ledger').multiselect('rebuild'); // Rebuild the multiselect
	// 					$('#purchase_ledger + .btn-group .multiselect-search').val(input);
	// 					$('#purchase_ledger + .btn-group .multiselect-search').focus();
	// 					});



	// 			}
	// 		},
	// 		error: function(xhr, status, error) {
	// 			console.error('Error fetching data:', error);
	// 		}
	// 	});
	// }
});

function FilterVoucher(value) {
	$('#voucher_select').val(value);
	filter_page(0, 0);
}
function roundoff(val) {
	var grosstotal_afterdiscount = isNAN($('#grosstotal_afterdiscount').val());
	// var decimals = $('#currency_id_select').find('option:selected').attr('data-decimal');
	if (is_non_taxable()) {
		var amtAfterRoundOff = isNAN(grosstotal_afterdiscount) + isNAN(val);
		// $('#grosstotal_afterdiscount').val(amtAfterRoundOff);
		amtAfterRoundOff = toCommas(cnv_Float(amtAfterRoundOff));
		$('.net_inclvat').html(amtAfterRoundOff);
		// $('.grosstotal_afterdiscount').html(amtAfterRoundOff);
	} else {

		var tax_amount = isNAN($('.net_vat').html());
		var amtAfterRoundOff = isNAN(grosstotal_afterdiscount) + isNAN(tax_amount) + isNAN(val);
		$('.net_inclvat').html(toCommas(cnv_Float(amtAfterRoundOff)));
	}
}
function nonInventoryItem(obj) {
	var Eparam = $(obj).data('param');
	var Edata = atob(Eparam);
	var Edata = JSON.parse(Edata);
	var serial_no = $(obj).attr('data-id');
	// var ref = $('#entity_voucher_ref').find('option:selected').text();
	var lot_no_input = $('#non_inventory_item_form_data_' + serial_no).val();
	var air_tickets = $('#air_ticket_id_' + serial_no).val();
	var voucher_id = $('#voucher_types').val();

	var param = {};
	param['serial_no'] = serial_no;
	param['id'] = Edata.id;
	param['is_non_inv'] = Edata.is_non_inv;
	param['edit_page'] = 'rebate_form';
	param['pre_data'] = lot_no_input;
	param['voucher_id'] = voucher_id;
	param['is_sales'] = 1;
	param['air_ticket'] = air_tickets;

	// param['ref'] = ref;
	// param['is_exists'] = Edata.is_exists;
	// param['lot_no'] = Edata.lot_no;

	var myJsonString = JSON.stringify(param);
	var result = btoa(myJsonString);
	$(obj).attr('data-param', result);

	return add_new_customer_supplier(obj);
}
$(document).ready(function () {
	if ($('.select2-new').length) select2New();
});
$(document).on('change', '#voucher_select', function () {
	var filter = $(this).find('option:selected').attr('data-filter');
	if (filter) {
		filter = JSON.parse(atob(filter));
		$('#pr_filter').val(isNAN(filter.pr));
		$('#po_filter').val(isNAN(filter.po));
		$('#grn_filter').val(isNAN(filter.grn));
		$('#pur_filter').val(isNAN(filter.pur));
	} else {
		$('#pr_filter').val(0);
		$('#po_filter').val(0);
		$('#grn_filter').val(0);
		$('#pur_filter').val(0);
	}
});

function push_to_pdn(obj) {
	var id = $(obj).data('id');
	var consume_stock = $(obj).data('consume-stock') || 0;

	$.post(site_url + 'site/purchase/ajax/push-to-pdn.php', { id: id, consume_stock: consume_stock }, function (data) {
		if (data.status) {
			successmsg(data.msg);
			window.location = site_url + 'project-management/deliverynote';
		} else {
			errormsg(data.msg);
		}
	}, 'json');
}
function pushToSalesRate(obj) {
	var id = $(obj).data('id');

	$.post(site_url + 'site/purchase/sales-rate/push.php', { id: id }, function (data) {
		if (data.status) {
			successmsg(data.msg);
			window.location = site_url + 'sales-rate';
		} else {
			errormsg(data.msg);
		}
	}, 'json');
}

function addTickets() {
	var newRow = `
		<tr>
			<td>
				<select class="form-control form-control-sm mode-select" name="air_mode[]">
					<option value="oneway">One Way</option>
					<option value="return">Return</option>
					<option value="multicity">Multi-City</option>
				</select>
			</td>
			<td><input type="text" class="form-control form-control-sm" name="air_name[]"></td>
			<td>
				<select class="form-control form-control-sm" name="air_gender[]">
					<option value="M">Male</option>
					<option value="F">Female</option>
					<option value="C">Child</option>
				</select>
			</td>
			<td><input type="text" data-attr="date2" class="form-control form-control-sm departure-date" name="air_departure_date[]"></td>
			<td><input type="text" data-attr="date2" class="form-control form-control-sm return-date d-none" name="air_return_date[]"></td>
			<td>
				<div class="sector-group ">
					<select class="form-control form-control-sm from-city" name="air_from_city[]">
						<option value="">From</option>
						<option value="New York">New York</option>
						<option value="London">London</option>
						<option value="Dubai">Dubai</option>
					</select>
					→
					<select class="form-control to-city form-control-sm " name="air_to_city[]">
						<option value="">To</option>
						<option value="Paris">Paris</option>
						<option value="Tokyo">Tokyo</option>
						<option value="Sydney">Sydney</option>
					</select>
				</div>
				<button type="button" style="float:right" class="mt-2 btn btn-sm btn-primary add-multi-city d-none">+</button>
			</td>
			<td><input type="text" class="form-control form-control-sm" name="airline[]"></td>
			<td><input type="text" class="form-control form-control-sm" name="id_no[]"></td>
			<td class="text-center">
				<button type="button" class="btn btn-sm btn-danger removeTicket">
					<i class="icon-minus">-</i>
				</button>
			</td>
		</tr>
	`;
	$("#air-ticket").append(newRow);
	$('input[data-attr="date2"]').datepicker({
		autoclose: true,
		format: 'dd-mm-yyyy',
		todayHighlight: true
	});
}

// Handle mode selection
$(document).on("change", ".mode-select", function () {
	var mode = $(this).val();
	var row = $(this).closest("tr");
	if (mode === "return") {
		row.find(".return-date").removeClass("d-none");
	} else {
		row.find(".return-date").addClass("d-none");
	}
	if (mode === "multicity") {
		row.find(".add-multi-city").removeClass("d-none");
	} else {
		row.find(".add-multi-city").addClass("d-none");
	}
});

// Add extra city selection in case of Multi-City
$(document).on("click", ".add-multi-city", function () {
	var parentRow = $(this).closest("tr");

	var newMultiCityRow = `
		<tr class="multicity-row">
			<td class="text-center" colspan="3">↳</td>
			<td><input type="text" data-attr="date2" class="form-control form-control-sm departure-date" name="air_departure_date[]"></td>
			<td><input type="text" data-attr="date2" class="form-control form-control-sm return-date d-none" name="air_return_date[]"></td>
		  
			<td>
				<div class="sector-group">
					<select class="form-control form-control-sm from-city" name="air_from_city[]">
						<option value="">From</option>
						<option value="New York">New York</option>
						<option value="London">London</option>
						<option value="Dubai">Dubai</option>
					</select>
					→
					<select class="form-control form-control-sm to-city" name="air_to_city[]">
						<option value="">To</option>
						<option value="Paris">Paris</option>
						<option value="Tokyo">Tokyo</option>
						<option value="Sydney">Sydney</option>
					</select>
				</div>
			</td>
			<td colspan="2"></td>
			<td class="text-center">
				<button type="button" class="btn btn-sm btn-danger remove-multicity">
					<i class="icon-minus">-</i>
				</button>
			</td>
		</tr>
	`;

	parentRow.after(newMultiCityRow);
	$('input[data-attr="date2"]').datepicker({
		autoclose: true,
		format: 'dd-mm-yyyy',
		todayHighlight: true
	});

});

// Remove dynamically added sectors
$(document).on("click", ".remove-sector", function () {
	$(this).closest(".sector-group").remove();
});
$(document).on("click", ".remove-multicity", function () {
	$(this).closest(".multicity-row").remove();
});

// Remove entire row
$(document).on("click", ".removeTicket", function () {
	$(this).closest("tr").remove();
});
$(document).on("click", ".removeTicket2", function () {
	if (confirm('Are you sure you want to delete this ?')) {
		let closestForm = $(this).closest('form');
		var id = $(this).attr('data-id');
		let newInput = $('<input>', {
			type: 'hidden',
			name: 'delete_air[]',
			value: id,
		});

		closestForm.append(newInput);
		$(this).closest("tr").remove();
	}
});


function copytoCreationDate(obj) {

	let newDate = $(obj).val(); // Get selected supplier invoice date
	let minDate = $(".trn-date").attr("min"); // Get min date from creation date input
	if (minDate) {
		let newDateObj = new Date(newDate.split("-").reverse().join("-"));
		let minDateObj = new Date(minDate.split("-").reverse().join("-"));
		if (newDateObj >= minDateObj) {
			$(".trn-date").val(newDate).trigger('change');
		} else {
			// $(".trn-date").val(minDate); // Reset to min if invalid
		}
	} else {
		$(".trn-date").val(newDate).trigger('change');
	}
	toastr.warning('Creation Date changed to Supplier invoice date');
}
$(document).on('change', '.vat-type', function () {
	const selectedValue = parseInt($(this).val());
	const rowId = $(this).data('id');
	const targetInput = $(`#tax_${rowId}`);
	if (selectedValue === 1) {
		const taxValue = $(this).data('tax');
		targetInput.val(taxValue);
		$('#ritem_vat_' + rowId).html(taxValue + '%');
	} else {
		targetInput.val(0);
		$('#ritem_vat_' + rowId).html('0%');
	}
	erp_set_purchasetotal(document.getElementById('qty_' + rowId));
});
function SpecialCase(val) {

	var lastHiddenInputTr = $('#item_row input.oqty').last();
	var dataIndexValue = 0;
	if (lastHiddenInputTr.length > 0) {
		dataIndexValue = lastHiddenInputTr.attr('data-index');
	}
	var loadAll = true;
	if (dataIndexValue > 0) {
		loadAll = false;
	}
	$('.oqty').each(function (index) {
		const rowId = $(this).data('index');
		const targetInput = $(`#tax_${rowId}`);
		const taxType = $(`#tax_type_${rowId}`);
		if (val == 1 || val == 0) {
			const taxValue = taxType.data('tax');
			targetInput.val(taxValue);
			$('#ritem_vat_' + rowId).html(taxValue + '%');
		} else if (val == 2 || val == 3 || val == 4) {
			targetInput.val(0);
			$('#ritem_vat_' + rowId).html('0%');
		}
		taxType.val(val);
		erp_set_purchasetotal(this, loadAll, dataIndexValue);
	});
}

function purchase_change_paid_status(obj) {
	var id = $(obj).data('id');
	var status = $(obj).data('status') || 0;
	// confirmDialog('This cannot be undone. Are you sure to cancel ?', function(){
	$('#pageLoader').show();
	var url = site_url + 'site/purchase/ajax/change_paid_status.php';
	$.ajaxSetup({ async: true });
	$.post(url, { id: id, status: status }, function (res) {
		$('#pageLoader').hide();
		if (res.status == 1) {
			filter_page(0, 1);
			successmsg(res.msg);
		} else {
			errormsg(res.msg);
		}
	}).fail(function (response) {
		$('#pageLoader').hide();
		errormsg('Something went wrong');
		console.log(response.responseText);
	});
	// }, 'Confirm');
}
$(document).on('click', '.batch-trash', function () {
	$(this).parent('td').parent('tr').remove();
})