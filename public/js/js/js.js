/*
Dont make any changes this js
*/
rand = "0001";
toastr.options = {
	closeButton: true,
	progressBar: true,
	positionClass: 'toast-top-right', // Position the messages at the top right corner
	// showDuration: 300,
	// hideDuration: 1000,
	// timeOut: 10000, // Message will automatically close after 5 seconds
	// extendedTimeOut: 1000, // Duration for extended time to close the message on hover
	// showEasing: 'swing',
	// hideEasing: 'linear',
	// showMethod: 'fadeIn',
	// hideMethod: 'fadeOut',

};


$(document).on('click', '.checkbox', function () {
	showDiv(this);
});

$(document).on('change', '.autocheck', function () {
	erp_auto_check(this);
});
function set_total_of_sales(list_type) {
	var siteurl = $("#overall_sales_url").val();
	var formData = $('#filter_form').serializeArray().reduce(function (obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});
	var url = atob(siteurl);
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		async: false,
		data: { formData, list_type },
		success: function (response) {
			var load_status = response.load_status;
			if (load_status == 1) {
				//console.log(response.data);
				//console.log(response.filter);
				if (list_type == "sales_order_item") {
					$("#otbd").text(response.data.page_tot_before_disc);
					$("#od").text(response.data.page_disc);
					//$("#odpu").text(response.data.page_disc_per_unit);
					//$("#onup").text(response.data.page_net_unit_price);
					$("#ogt").text(response.data.page_grosstotal);
					//$("#ov").text(response.data.page_vat);
					$("#ova").text(response.data.page_vat_amount);
					$("#ont").text(response.data.page_nettotal);
					$("#oq").text(response.data.page_qty);
					$("#opq").text(response.data.page_process_qty);
					$("#ocq").text(response.data.page_cancel_qty);
					$("#obal").text(response.data.page_balance);
				}
				if (list_type == 'purchase-return') {
					$("#total_before_disc_th").text(response.data.page_tbd);
					$("#total_disc_th").text(response.data.page_td);
					$("#gross_total_th").text(response.data.page_gt);
					$("#total_vat_th").text(response.data.page_vat);
					$("#net_total_th").text(response.data.page_nt);
					$("#fc_net_total_th").text(response.data.page_fc_nt);
				}
				else {
					$("#otbd").text(response.data.page_total_before_discount);
					$("#otd").text(response.data.page_total_discount);
					$("#otad").text(response.data.page_total_after_discount);
					$("#otv").text(response.data.page_total_vat);
					$("#otiv").text(response.data.page_total_incl_vat);
					if (response.data.page_cost) $("#totcost").text(response.data.page_cost);
				}
			} else {
				errormsg(response.error_msg);
			}
		}
	}).fail(function (jqXHR, textStatus, error) { });
	return;
}
function set_total_of_quotationItem(list_type) {
	var siteurl = $("#overall_sales_url").val();
	var formData = $('#filter_form').serializeArray().reduce(function (obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});
	//console.log(formData['counter']);
	//console.log(formData.productguids);
	var url = atob(siteurl);
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		async: false,
		data: { "formData": formData, "productguids": formData['productguids'], list_type },
		success: function (response) {
			var load_status = response.load_status;
			if (load_status == 1) {
				//console.log(response.data);
				console.log(response.filter);
				$("#ounit_price").text(response.data.page_unit_price);
				$("#otbd").text(response.data.page_tot_before_disc);
				$("#ototal_disc").text(response.data.page_final_disc_total);
				$("#od").text(response.data.page_disc);
				$("#odpu").text(response.data.page_disc_per_unit);
				$("#onup").text(response.data.page_net_unit_price);
				$("#ogt").text(response.data.page_grosstotal);
				$("#ov").text(response.data.page_vat);
				$("#ova").text(response.data.page_vat_amount);
				$("#ont").text(response.data.page_nettotal);
				$("#oq").text(response.data.page_qty);
				$("#opq").text(response.data.page_process_qty);
				$("#obal").text(response.data.page_balance);

			} else {
				errormsg(response.error_msg);
			}
		}
	}).fail(function (jqXHR, textStatus, error) { });
	return;
}
function set_total_of_purchase(list_type) {
	//preloader_on();
	var siteurl = $("#overall_purchase_url").val();
	//var formData = $('#filter_form').serializeArray();
	var formData = $('#filter_form').serializeArray().reduce(function (obj, item) {
		obj[item.name] = item.value;
		return obj;
	}, {});
	var url = atob(siteurl);
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		async: false,
		data: { formData, list_type },
		success: function (response) {
			var load_status = response.load_status;
			if (load_status == 1) {
				//console.log(response.data);
				//console.log(response.filter);
				$("#otbd").text(response.data.page_total_before_discount);
				$("#otd").text(response.data.page_total_discount);
				$("#otad").text(response.data.page_total_after_discount);
				$("#otv").text(response.data.page_total_vat);
				$("#otiv").text(response.data.page_total_incl_vat);
			} else {
				errormsg(response.error_msg);
			}
		}
	}).fail(function (jqXHR, textStatus, error) { });
	return;
}
function ajax_load_page(page, dbParam) {
	preloader_on();
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			preloader_off();
			document.getElementById("pagediv").innerHTML = this.responseText;
		}
	};
	xmlhttp.open("GET", page + "?jsondata=" + dbParam, true);
	xmlhttp.send();
}

//----------------------------
function erp_append_selectBox(data) {

	var input = data.input;
	var name = data.name;
	var guid = data.guid;
	if (data.code) {
		var code = data.code;
	} else {
		var code = "";
	}
	var from_product_master = isNAN(data.from_product_master);
	if (!from_product_master) {
		var options = '<option value="' + guid + '"  data-code="' + code + '" selected>' + name + '</option>';
		if (input == 'unit_guid') {
			$('#unit_guid').multiselect('destroy');
		}

		$('#' + input).append(options);
		$('#' + input).val(guid);
		$('#' + input).trigger('change');

		if (input == 'unit_guid') {
			if ($('#subunit_guid').length) {
				$('#subunit_guid').append(options);
				$('#subunit_guid').val(guid);
			}
			refreshUnitDropdwon();
		}
	} else {

		if (from_product_master) {
			var is_ledger = isNAN(data.is_ledger);
			var $clasName = 'grey';
			if (is_ledger == 1) $clasName = 'red';
			var options = '<option value="' + guid + '" class="' + $clasName + '"  data-name="' + name + '" selected="selected" data-ledger="' + is_ledger + '" data-code="' + code + '" >' + name + '</option>';
			$('#' + input).append(options);
			$('#' + input).multiselect('rebuild');
		}
	}
}
function erp_save_form(obj) {
	var AddExpenseAmount = $("#expense_amount_0").val();
	if (cnv_Float(AddExpenseAmount) > 0) {
		errormsg("Add/Remove Expense to Save");
		return false;
	}
	var form = $(obj).closest('form');
	var print = $(obj).attr('data-print');
	var siteurl = form.attr('action');
	var id = form.attr('id');
	var url = atob(siteurl);
	var formData = new FormData(document.getElementById(id));
	var presentState = $(obj).html();
	var newState = '<i class="fa  fa-spinner  fa-pulse fa-2x fa-fw"></i> Loading....';
	$(obj).attr('disabled', 'disabled');
	$(obj).html(newState);
	preloader_on();

	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: formData,
		success: function (response) {
			// console.log(response);
			preloader_off();
			$(obj).html(presentState);
			$(obj).removeAttr('disabled');
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
				var save_n_print = isNAN(response.save_n_print);

				// successmsg(response.successmsg);
				toastr.success(response.successmsg);
				if (inner_form == 1) {
					if (response.is_mesh_added && response.is_mesh_added == '1') {
						$('#name').val(response.mesh_name);
						$('#content').val(response.mesh_name);
						$('#print_name').val(response.mesh_name);
						$('#mesh_guid').val(response.mesh_guid);
					} else if (response.config && response.config == 1) { }
					else if (response.settlement && response.settlement == 1) {
						$('#settlements-hidden').val(btoa(JSON.stringify(response.settlements)));
					}
					else {
						erp_append_selectBox(response.data);
					}
					$('.innerCloseBtn').trigger('click');
				} else {
					filter_page(0, edited);
					$('.model_close_btn').trigger('click');
				}
				if (response.mail) {
					var mail = response.mail;
					if (mail.mailStatus == 0) {
						errormsg(mail.msg, 2);
					} else if (mail.mailStatus == 1) {
						successmsg(mail.msg, 2);
					}
				}
				if (response.sendApprovalMail == 1) {
					var create_pdf = 0;
					if (response.createPdfByAjax && response.createPdfByAjax == 1) create_pdf = 1;
					var siteurl = $('#siteurl').val();
					$.ajaxSetup({ async: true });
					$.post(siteurl + 'site/mail/ajax/send_approval_mail.php', { voucher_type: response.voucher_type, order_ids: response.order_ids.join(), create_pdf: create_pdf }, function (res) {
						// if(res.mailStatus == 1){
						// 	successmsg(res.msg);
						// } else {
						// 	errormsg(res.msg);
						// }
					});
				}
				if (response.create_dn && response.create_dn > 0) {
					createDN(response.create_dn);
				}
				if (response.refreshStockSummary == 1) {
					var siteurl = $('#siteurl').val();
					$.ajaxSetup({ async: true });
					var popupUrl = 'site/item-stock-report/ajax/popup.php';
					var modalStatus = erp_create_modal(popupUrl);
					$('#' + modalStatus).find('.modal-footer').hide();
					var date = response.date;
					var ids = response.editable_ids;
					var url1 = url2 = siteurl + 'site/item-stock-report/ajax/refresh.php';
					setTimeout(() => {
						Promise.all([
							makeRefreshRequest(url1, date, ids, 1),
							new Promise(function (resolve) {
								// Introduce a delay of, for example, 1000 milliseconds (1 second)
								setTimeout(resolve, 10);
							}).then(function () {
								// Proceed with the second request after the delay
								return makeRefreshRequest(url2, date, ids, 2);
							})
						]).then(function (responses) {
							console.log(responses);
							var response1 = responses[0];
							var response2 = responses[1];
							if (response2.saveStatus == 1) {
								toastr.success('Data Saved.');
								$('#' + modalStatus).find('.close').trigger('click');
							}

						}).catch(function (error) {
							console.error('Error:', error);
							toastr.error(error, 'Error');
						});
					}, 50);
				}
				if (response.pdf_type && response.pdf_disabled != 1 && (print || save_n_print == 1)) {
					var link = document.createElement('a');
					link.setAttribute('href', '#');
					link.setAttribute('data-action', 'print');
					link.setAttribute('data-id', response.order_id);
					link.setAttribute('data-voucherid', response.voucher_id);
					link.setAttribute('data-format', response.pdf_format);
					link.setAttribute('data-url', response.pdf_url);
					link.setAttribute('onclick', 'erp_export_as_pdf(this, "' + response.pdf_type + '")');

					document.body.appendChild(link);
					link.click();
				}
				if (response.pdf_disabled == 1) {
					toastr.error('Printing document not allowed');
				}
				if (response.type && response.type == 17 && response.is_mfg_coating_item && response.is_mfg_coating_item == "1") {
					SaveSubItem(response);
				}
				if (response.bobbins_save && response.bobbins_save == '1') {
					saveBobbinsString(response);
				}
				if (response.generate_cashmemo_receipt == 1) {
					alert("Generating receipts. Please do not close or refresh. Click 'OK' now.");
					$('#pageLoader').show();
					generate_cashmemo_receipt(response.sales_voucher, response.receipt_voucher);
				}
				if (response.generate_salesorder_receipt == 1) {
					alert("Generating receipts. Please do not close or refresh. Click 'OK' now.");
					$('#pageLoader').show();
					generate_salesorder_receipt(response.salesorder_voucher, response.receipt_voucher);
				}
				if (response.data && response.data.voucher_guid) {
					sessionStorage.setItem('vtype', response.data.voucher_guid);
				}

			}

		},
		contentType: false,
		processData: false
	});

	return false;
}

function erp_save_ageAlteration(obj) {
	var form = $(obj).closest('form');
	var siteurl = form.attr('action');
	var id = form.attr('id');
	var url = atob(siteurl);
	var formData = new FormData(document.getElementById(id));
	preloader_on();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: formData,
		success: function (response) {
			// console.log(response);
			preloader_off();
			var saveStatus = response.saveStatus;
			if (saveStatus == 0) {
				var input = response.input;
				var key = response.key;
				errormsg(response.errormsg);
				//   $('#saveBtn').prop('disabled', true);
				$('.' + input).eq(key).focus();
			} else {
				var trigger = response.trigger;
				var edited = response.edited;
				var inner_form = response.inner_form;
				successmsg(response.successmsg);

				if (inner_form == 1) {
					erp_append_selectBox(response.data);
					$('.innerCloseBtn').trigger('click');
				} else {
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
function erp_quotation_save_form(obj) {

	var form = $(obj).closest('form');
	var total_row = $("#total_row").val();
	console.log("total_row", total_row);
	var siteurl = form.attr('action');
	var url = atob(siteurl);
	$("#total_row").val(total_row);
	preloader_on();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: form.serialize(),
		success: function (response) {
			console.log(response);
			preloader_off();
			var saveStatus = response.saveStatus;
			if (saveStatus == 0) {
				var input = response.input;
				errormsg(response.errormsg);
				$('#' + input).focus();
			} else {
				var trigger = response.trigger;
				var edited = response.edited;
				var inner_form = response.inner_form;
				successmsg(response.successmsg);
				var i = 1;
				for (i = 1; i <= total_row; i++) {
					console.log(i);
					$("#invoice_discount_pro_" + i).attr('id', 'sel' + 'invoice_discount_pro_');
					$("#total_before_discount3").attr('id', 'total_before_discount');
					$("#vat" + i).attr('id', 'sel' + 'vat');
					$("#invoice_discount_pro_per" + i).attr('id', 'sel' + 'invoice_discount_pro_per');
					$("#net_total_ex_vat" + i).attr('id', 'sel' + 'net_total_ex_vat');
					$("#main_last_vat" + i).attr('id', 'sel' + 'main_last_vat');
				}
				if (inner_form == 1) {
					erp_append_selectBox(response.data);
					$('.innerCloseBtn').trigger('click');
				} else {
					filter_page(0, edited);
					$('.model_close_btn').trigger('click');
				}

			}

		}
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(jqXHR.responseText);
	});

	return false;
}
function calculateTotalsFromHiddenRows() {
	let total_tbd1 = 0, total_tdsc = 0, total_tad = 0;
	let total_tvat = 0, total_troff = 0, total_tiv = 0;

	$('tr.summary-hidden').each(function () {
		total_tbd1 += parseFloat($(this).attr('tbd1')) || 0;
		total_tdsc += parseFloat($(this).attr('tdsc1')) || 0;
		total_tad += parseFloat($(this).attr('tad1')) || 0;
		total_tvat += parseFloat($(this).attr('tvat1')) || 0;
		total_troff += parseFloat($(this).attr('troff1')) || 0;
		total_tiv += parseFloat($(this).attr('tiv1')) || 0;
	});

	$('#footer-tbd1').text(toCommas(cnv_Float(total_tbd1)));
	$('#footer-tdsc1').text(toCommas(cnv_Float(total_tdsc)));
	$('#footer-tad1').text(toCommas(cnv_Float(total_tad)));
	$('#footer-tvat1').text(toCommas(cnv_Float(total_tvat)));
	$('#footer-troff1').text(toCommas(cnv_Float(total_troff)));
	$('#footer-tiv1').text(toCommas(cnv_Float(total_tiv)));
}

function POOnlyFilter($form) {

	var offset = 0;
	var limit = 50;
	var allLoaded = false;
	var firstLoad = true;
	$('#filter_div').html('');
	var siteurl = $form.attr('action');
	var url = atob(siteurl);
	var showall = $('input#show-all').prop('checked');
	function loadChunk() {
		if (allLoaded) return;

		var formData = new FormData($form[0]);
		formData.append('action', 'load_po_rows');
		formData.append('offset', offset);
		formData.append('limit', limit);
		$.ajax({
			url: url,
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function (result) {
				if (result.trim() == '0') {
					allLoaded = true;
					calculateTotalsFromHiddenRows();
					var clusterize = new Clusterize({
						scrollId: 'scrollArea',
						contentId: 'contentArea-po-rows'
					});
					if ($('#loaderformodal').length) $('#loaderformodal').hide();

					return;
				}
				// if (firstLoad) {
				// 	// First time: insert full table structure
				// 	$('#filter_div').html(result);
				// 	firstLoad = false;
				// } else {
				// 	// Next times: extract <tr> from result and append to #po-rows
				// 	$('#contentArea-po-rows tr:last').after(result);
				// }
				if ($('#contentArea-po-rows tr').length > 0) {
					console.log($('#contentArea-po-rows tr:last').length);
					$('#contentArea-po-rows').append(result);
				} else {
					$('#filter_div').html(result);
				}
				offset += limit;
				if (showall) loadChunk();
			},
			error: function () {
				console.error("Error loading PO data.");
				if ($('#loaderformodal').length) $('#loaderformodal').hide();
			}
		});
	}

	loadChunk();
}
//------------------Search
function filter_page(cnt, edited) {
	preloader_on()
	if (edited == 0) {
		$('#counter').val(cnt);
	}
	var formid = 'filter_form';
	var formdata = $('#' + formid).serialize();
	var is_po = $('#' + formid).attr('is_po');
	if (is_po == "1") {
		var showall = $('input#show-all').prop('checked');
		if (showall) {
			var $form = $('#' + formid);
			POOnlyFilter($form);
			return;
		}
	}
	var siteurl = $('#' + formid).attr('action');
	var url = atob(siteurl);
	var filter_div_ref = $("#filter_div_ref").val();
	$.ajax({
		url: url,
		type: "POST",
		dataType: "html",
		data: formdata,
		async: false,
		success: function (result) {

			if (filter_div_ref == "register_filter_div") {
				$('#register_filter_div').html(result);
			}
			else {
				// renderInChunksFromHTMLString(result, '#filter_div', 50, 20);
				$('#filter_div').html(result);
				setTimeout(() => {
					console.log($('#hideMainColom').length); if ($('#hideMainColom').length) {
						var markets = $('#hideMainColom option:selected');
						var selected = [];

						$(markets).each(function (index, markets) {
							selected.push($(this).val());
						});
						hideAll(selected);
					}
				}, 100);
			}
			if ($('#loaderformodal').length) $('#loaderformodal').hide();
			$(document).ready(function () {
				$('td .btaction[data-toggle="dropdown"]').each(function () {
					$(this).removeAttr('data-toggle')
						.removeAttr('aria-haspopup')
						.removeAttr('aria-expanded');
				});
			});
			// if($('.show_all_btn').length) $('.show_all_btn').removeClass('disabled');
		}

	});
}
// function renderInChunks(elements, container, chunkSize = 50, delay = 20) {
//     let index = 0;

//     function renderNextChunk() {
//         let fragment = document.createDocumentFragment();
//         for (let i = 0; i < chunkSize && index < elements.length; i++, index++) {
//             fragment.appendChild(elements[index]);
//         }
//         container.appendChild(fragment);

//         if (index < elements.length) {
//             setTimeout(renderNextChunk, delay);
//         }
//     }

//     renderNextChunk();
// }
function renderInChunksFromHTMLString(htmlString, targetSelector, chunkSize = 50, delay = 20) {
	const container = document.querySelector(targetSelector);
	container.innerHTML = '';

	// Step 1: Parse HTML into a temporary container
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = htmlString;

	// Step 2: Convert all child nodes into an array
	const nodes = Array.from(tempDiv.childNodes);

	// Step 3: Chunk render
	let index = 0;

	function renderNextChunk() {
		const fragment = document.createDocumentFragment();
		for (let i = 0; i < chunkSize && index < nodes.length; i++, index++) {
			fragment.appendChild(nodes[index]);
		}
		container.appendChild(fragment);

		if (index < nodes.length) {
			setTimeout(renderNextChunk, delay);
		}
	}

	renderNextChunk();
}



function paginate(cnt) {
	filter_page(cnt, 0);
	$('#Search_myModal').modal('hide');
	return false;
}
function erp_search(obj) {
	var presentState = $(obj).html();
	var newState = '<i class="fa  fa-spinner  fa-pulse fa-2x fa-fw"></i> Loading....';
	$(obj).attr('disabled', 'disabled');
	$(obj).html(newState);
	setTimeout(() => {
		filter_page(0, 0);
		$('.clearsearch').show();
		$('#Search_myModal').modal('hide');
		$(obj).html(presentState);
		$(obj).removeAttr('disabled');
	}, 5)

	return false;
}
function clear_search(obj) {
	$("#filter_form")[0].reset();
	$("input[name=date_from]").val('');
	$("input[name=date_to]").val('');
	$("input[name=date_range]").val('0');
	$('.clearsearch').hide();
	filter_page(0, 0);
	return false;
}
function prependZeros(num, digit) {
	var str = ("" + num);
	var digit = parseInt(digit) + parseInt(1);
	return (Array(Math.max(digit - str.length, 0)).join("0") + str);
}
function transaction_report(obj) {
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
				if (hidesavebtn == 1) {
					$('#plusModal').find('#plussaveBtn').hide();
					setTimeout(() => {
						$('#expense_btn_group').hide();
					}, 1000);
				} else {
					$('#plusModal').find('#plussaveBtn').show();
				}
				if (hidefooter == 1) {
					$('#plusModal').find('.card-footer').hide();
					$('#plusModal').find('.closeBtn').show();
				} else {
					$('#plusModal').find('.card-footer').show();
					$('#plusModal').find('.closeBtn').hide();
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
//-----------------------
function edit_form(obj, delay = 0) {
	$(function () {
		$("#suffix").change(function () {
			console.log("as");
			var start_num = $("#start_num").val();
			var total_digit = $("#total_digit").val();
			var prefix = $("#prefix").val();
			var suffix = $("#suffix").val();
			var prefilwithzero = $("#prefilwithzero").val();
			if (prefilwithzero == 'yes') {
				var new_start_num = prependZeros(start_num, total_digit);
			}
			else {
				var new_start_num = start_num;
			}
			var result = prefix + new_start_num + suffix;
			$("#result").val(result);
		});
	});
	$(function () {
		var dtToday = new Date();

		var month = dtToday.getMonth() + 1;
		var day = dtToday.getDate();
		var year = dtToday.getFullYear();
		if (month < 10)
			month = '0' + month.toString();
		if (day < 10)
			day = '0' + day.toString();

		var maxDate = year + '-' + month + '-' + day;
		$('#date_qutref').attr('min', maxDate);
	});
	var modalwidth = "60";
	var dynamic = "0";
	var action = "";
	var hidefooter = 0;
	var hidesavebutton = 0;
	var hidesaveprintbutton = 0;
	var hideheaderrow = 0;
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var title = $(obj).attr('data-title');
	var btnlabel = $(obj).attr('data-btnlabel');
	var param = $(obj).attr('data-param');
	var showSavePrintButton = parseInt($(obj).data('save-print-btn')) || 0;

	var widthComing = false;
	if ($(obj).attr('data-modalwidth')) {
		modalwidth = $(obj).attr('data-modalwidth');
		widthComing = true;
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
	// if ($(obj).attr('data-hidesaveprintbutton')) {
	// 	hidesaveprintbutton = Math.abs($(obj).attr('data-hidesavebutton'));
	// }
	if ($(obj).attr('data-hidesavebutton')) {
		hidesavebutton = Math.abs($(obj).attr('data-hidesavebutton'));
	}
	if ($(obj).attr('data-hideheaderrow')) {
		hideheaderrow = Math.abs($(obj).attr('data-hideheaderrow'));
	}
	var saveBtnOnClick = "";
	if ($(obj).attr('data-saveBtnOnClick')) {
		saveBtnOnClick = $(obj).attr('data-saveBtnOnClick');
	}

	var url = atob(siteurl);
	preloader_on();
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			preloader_off();
			if (hidefooter == 1) {
				// $('.card-footer').hide();
				$('#myModal').find('.card-footer').addClass('hidden');
				$('#myModal').find('.closeBtn').show();

			} else {
				// $('.card-footer').show();
				$('#myModal').find('.card-footer').removeClass('hidden');
				$('#myModal').find('.card-footer').removeAttr('style');
				$('#myModal').find('.closeBtn').hide();
			}
			// if (hidesavebutton == 1) {
			// 	$('#myModal').find('#saveBtn').addClass('hidden');
			// } else {
			// 	// console.log($('#myModal').find('#saveBtn').attr('style'));
			// 	$('#myModal').find('#saveBtn').removeClass('hidden');
			// }
			// if (hidesaveprintbutton == 1) {
			// 	$('#myModal').find('#saveNprintBtn').addClass('hidden').css('display', 'none');
			// } else {
			// 	$('#myModal').find('#saveNprintBtn').removeClass('hidden');
			// }

			$('#myModal').find('#saveBtn').removeClass('hidden');
			$('#myModal').find('#saveNprintBtn').addClass('hidden');
			$('#myModal').find('#saveNprintBtn').hide();
			if (showSavePrintButton == 1) {
				$('#myModal').find('#saveNprintBtn').removeClass('hidden');
				$('#myModal').find('#saveNprintBtn').show();
			}
			if (hidesavebutton == 1) {
				$('#myModal').find('#saveBtn').addClass('hidden');
				$('#myModal').find('#saveNprintBtn').addClass('hidden');
				$('#myModal').find('#saveNprintBtn').hide();
			}

			if (hideheaderrow == 1) {
				$('#myModal').find('.header-row').addClass('hidden');
			} else {
				// console.log($('#myModal').find('#saveBtn').attr('style'));
				$('#myModal').find('.header-row').removeClass('hidden');
			}
			if (dynamic == 1) {
				if (widthComing) erp_open_moal(this.responseText, modalwidth);
				else erp_open_moal(this.responseText);
				$('#innerform').attr('action', action);
				$('#innerModalLabel').html(title);
				if (hidesavebutton == 1) {
					$('#innerform').find('#saveBtn').addClass('hidden');
					$('#innerform').find('#saveNprintBtn').addClass('hidden');
					$('#innerform').find('#saveNprintBtn').hide();
				} else {
					$('#innerform').find('#saveBtn').removeClass('hidden');
					$('#innerform').find('#saveNprintBtn').removeClass('hidden');
					$('#innerform').find('#saveNprintBtn').show();
				}
			} else {
				if (action != "") {
					$('#modalform').attr('action', action);
				}
				$('#myModal').find('.modal-dialog').css('width', modalwidth + '%');
				$('#myModal').modal('show');
				$('#modal_title').html(title);
				$('#saveBtn').html('<i class="fa fa-plus-circle"></i> ' + btnlabel);
				if (delay == 1) {
					$('#formDiv').html('');
					setTimeout(() => $('#formDiv').html(this.responseText), 100);
				} else {
					$('#formDiv').html(this.responseText);
				}
				if (saveBtnOnClick != "") {
					$('#saveBtn').attr('onclick', saveBtnOnClick);
				}
				erp_show_business_activity();

			}

			$.each($('#myModal').find('.selectize-field'), function (i, e) {
				var create = $(e).data('create') || false;
				$(e).selectize({ create: create });
			});

			if ($('#myModal').find('.project-customer-selection').length) {
				$('#myModal').find('.project-customer-selection').typeahead({
					source: function (query, process) {
						map = {};
						url = site_url + 'site/project-management/ajax/get_customers.php';
						$.get(url, { query: query }, function (data) {
							objects = [];
							data = $.parseJSON(data);
							$.each(data, function (i, object) {
								map[object.label] = object;
								objects.push(object.label);
							});
							process(objects);
						});
					},
					autoSelect: true,
					minLength: 0,
					items: 20,
					showHintOnFocus: true,
					updater: function (item) {
						pm_filter_project_selection($('#myModal'), map[item].id);
						return item;
					}
				});
			}
		}
	};

	xmlhttp.open("GET", url + "?jsondata=" + param, true);
	xmlhttp.send();


}
function m_filter_report_item_stock_edit_form(obj) {

	var modalwidth = "60";
	var dynamic = "0";
	var action = "";
	var hidefooter = 0;
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var title = $(obj).attr('data-title');
	var btnlabel = $(obj).attr('data-btnlabel');
	//var param = $(obj).attr('data-param');
	var param = { "guid": btoa(id), "type": "1", "edit_page": "stock", "branch_id": $(obj).val() };
	var params = btoa(JSON.stringify(param));
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
	var saveBtnOnClick = "";
	if ($(obj).attr('data-saveBtnOnClick')) {
		saveBtnOnClick = $(obj).attr('data-saveBtnOnClick');
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
					$('#modalform').attr('action', action);
				}
				$('#myModal').find('.modal-dialog').css('width', modalwidth + '%');
				$('#myModal').modal('show');
				$('#modal_title').html(title);
				$('#saveBtn').html('<i class="fa fa-plus-circle"></i> ' + btnlabel);
				$('#formDiv').html(this.responseText);
				if (saveBtnOnClick != "") {
					$('#saveBtn').attr('onclick', saveBtnOnClick);
				}
				erp_show_business_activity();

			}

		}
	};
	xmlhttp.open("GET", url + "?jsondata=" + params, true);
	xmlhttp.send();


}
function m_edit_production_form(obj) {

	var modalwidth = "60";
	var dynamic = "0";
	var action = "";
	var hidefooter = 0;
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var actiontype = $(obj).attr('data-actiontype');
	var title = $(obj).attr('data-title');
	var btnlabel = $(obj).attr('data-btnlabel');
	var orderguid = $(obj).attr('data-transferguid');
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
	// xmlhttp.open("GET", url+"?jsondata=" + param +"&orderguid=" + orderguid, true);
	xmlhttp.open("GET", url + "?jsondata=" + param + "&orderguid=" + orderguid + "&actiontype=" + actiontype, true);
	xmlhttp.send();

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
					$('#modalform').attr('action', action);
				}
				$('.modal-dialog').css('width', modalwidth + '%');

				//$("#actiontype").val(actiontype);
				$('#myModal').modal('show');
				$('#myModal').css('padding', 'initial');
				$('#modal_title').html(title);

				$('#saveBtn').html('<i class="fa fa-plus-circle"></i> ' + btnlabel);
				$('#formDiv').html(this.responseText);
				$("#actiontype").val(actiontype);

			}
			$(document).on('shown.bs.modal', 'body', function () {
				console.log('trigger keyup');

			})

		}
	};

}
function m_edit_transfer_form(obj) {

	var modalwidth = "60";
	var dynamic = "0";
	var action = "";
	var hidefooter = 0;
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var actiontype = $(obj).attr('data-actiontype');
	var title = $(obj).attr('data-title');
	var btnlabel = $(obj).attr('data-btnlabel');
	var orderguid = $(obj).attr('data-transferguid');
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
	// xmlhttp.open("GET", url+"?jsondata=" + param +"&orderguid=" + orderguid, true);
	xmlhttp.open("GET", url + "?jsondata=" + param + "&orderguid=" + orderguid + "&actiontype=" + actiontype, true);
	xmlhttp.send();

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
					$('#modalform').attr('action', action);
				}
				$('.modal-dialog').css('width', modalwidth + '%');

				//$("#actiontype").val(actiontype);
				$('#myModal').modal('show');
				$('#myModal').css('padding', 'initial');
				$('#modal_title').html(title);

				$('#saveBtn').html('<i class="fa fa-plus-circle"></i> ' + btnlabel);
				$('#formDiv').html(this.responseText);
				$("#actiontype").val(actiontype);

			}
			$(document).on('shown.bs.modal', 'body', function () {
				console.log('trigger keyup');

			})

		}
	};

}

function edit_quotation_form(obj) {
	total_qw = [];
	total_qw_disc = [];
	total_qw_before_disc = [];
	total_qw_proerty_natval_disc = [];
	total_qw_vat_disc = [];
	total_gw_vat_amt_disc = [];
	total_gw_final_vat_adj_disc = [];
	cal_unit_price_after_discount_arr = [];
	cal_total_discount_arr = [];
	cal_gross_total_vat_arr = [];
	cal_net_total_vat_arr = [];
	cal_total_permit_disc_arr = [];
	row_count = 1;
	cal_total__net_permit_disc_arr = [];
	cal_total_net_total_ex_vat_arr = [];
	cal_total_main_vat_arr = [];

	$(function () {
		var dtToday = new Date();

		var month = dtToday.getMonth() + 1;
		var day = dtToday.getDate();
		var year = dtToday.getFullYear();
		if (month < 10)
			month = '0' + month.toString();
		if (day < 10)
			day = '0' + day.toString();

		var maxDate = year + '-' + month + '-' + day;
		$('#date_qutref').attr('min', maxDate);
	});
	var modalwidth = "60";
	var dynamic = "0";
	var action = "";
	var hidefooter = 0;
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var actiontype = $(obj).attr('data-actiontype');
	var title = $(obj).attr('data-title');
	var btnlabel = $(obj).attr('data-btnlabel');
	var orderguid = $(obj).attr('data-orderguid');
	var param = $(obj).attr('data-param');
	var voucher_type = $(obj).attr('data-voucher-type') || 0;

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
	// xmlhttp.open("GET", url+"?jsondata=" + param +"&orderguid=" + orderguid, true);
	xmlhttp.open("GET", url + "?jsondata=" + param + "&orderguid=" + orderguid + "&actiontype=" + actiontype, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			preloader_off();
			if (hidefooter == 1) {
				$('#myModal').find('.card-footer').addClass('hidden');
				$('#myModal').find('.closeBtn').show();
			} else {
				$('#myModal').find('.card-footer').removeClass('hidden');
				$('#myModal').find('.closeBtn').hide();
			}
			if (dynamic == 1) {
				erp_open_moal(this.responseText);
				$('#innerform').attr('action', action);
				$('#innerModalLabel').html(title);
			} else {
				if (action != "") {
					$('#modalform').attr('action', action);
				}
				$('.modal-dialog').css('width', modalwidth + '%');

				//$("#actiontype").val(actiontype);
				$('#myModal').modal('show');
				$('#myModal').css('padding', 'initial');
				$('#modal_title').html(title);
				$('.add_customer').css({ "margin-left": "365px", "padding-bottom": "10px", "margin-bottom": "-54px" });

				// $("#btnGroupVendor").hide();
				// $("#vendor_input").hide();
				// $("#vendor_info").show();

				$('#saveBtn').html('<i class="fa fa-plus-circle"></i> ' + btnlabel);
				$('#formDiv').html(this.responseText);
				$("#actiontype").val(actiontype);
				if (actiontype)
					$("#type_quotation").text(' (' + actiontype + ')');
				// var quotation_ref= $("#quotation_ref").val(quotation_ref);
				// quotation_ref = quotation_ref+"-0.1";
				// console.log(quotation_ref);
				if (actiontype == "revise") {
					var optionText = $("#quotation_ref option:selected").text();
					var optionValue = $("#quotation_ref option:selected").val();
					var ex_version = $("#ex_version").val();
					ex_version = parseFloat(ex_version).toFixed(1);
					var curre_version = Math.abs(ex_version) + 1;
					curre_version = parseFloat(curre_version).toFixed(1);
					optionText = optionText + '-' + curre_version;
					$('#quotation_ref').html('');
					//optionText = 'Premium';1 minutw  wait
					//optionValue = '1';
					$('#quotation_ref').append(`<option value="${optionValue}">
                                       ${optionText}
                                  </option>`)
					$('.quotation_ref option[value=1]').attr('selected', 'selected');
					$('#version').val(curre_version);
					var form_settings = $('#config_hidden_fields').val();
					if (form_settings) {
						form_settings = form_settings.split(',');
					} else {
						console.error('No value found in #config_hidden_fields');
					}
					var form_item_settings = $('#config_hidden_item_fields').val();
					if (form_item_settings) {
						form_item_settings = form_item_settings.split(',');
					} else {
						console.error('No value found in #config_hidden_item_fields');
					}
					erp_hide_form_fields(form_settings, form_item_settings);
				}
				//$("#quotation_ref").val("123");
			}

			$.each($('#myModal').find('.selectize-field'), function (i, e) {
				var create = $(e).data('create') || false;
				$(e).selectize({ create: create });
			});

			$(document).on('shown.bs.modal', 'body', function () {
				// console.log('trigger keyup');
				// $('#INVOICE_DISCOUNT').trigger('keyup');

				if ($('#myModal').find('.select2-project').length) {
					$('#myModal').find('.select2-project').select2({
						width: '100%',
						multiple: false,
						closeOnSelect: true,
						ajax: {
							url: site_url + 'site/project-management/ajax/search.php',
							dataType: 'json',
							delay: 250,
							data: function (params) {
								if (voucher_type == 5) {
									var project_customer = $('#myModal').find('#customer_guid').val();
								}
								var type = $(this).attr('data-type');
								var project_id = $('#myModal').find('select[name="project_id"]').val();
								var project_phase_id = $('#myModal').find('select[name="project_phase_id"]').val();

								return { voucher_type: voucher_type, type: type, project_customer: project_customer, project_id: project_id, project_phase_id: project_phase_id, search: params.term, page: params.page || 1 };
							},
							processResults: function (data, params) {
								params.page = params.page || 1;
								return {
									results: $.map(data.items, function (item) {
										return {
											id: item.id,
											text: item.ref,
											estimation_type: (item.estimation_type || ''),
											sales_type: (item.sales_type || ''),
											store_guid: parseInt(item.store_guid)
										};
									}),
									pagination: {
										more: (params.page * 10) < data.total_count
									}
								};
							},
							cache: true
						},
						placeholder: 'Search',
						minimumInputLength: 0,
						allowClear: true
					});
				}
			})

		}
	};

}
function edit_quotation_form_Approved(obj) {
	total_qw = [];
	total_qw_disc = [];
	total_qw_before_disc = [];
	total_qw_proerty_natval_disc = [];
	total_qw_vat_disc = [];
	total_gw_vat_amt_disc = [];
	total_gw_final_vat_adj_disc = [];
	cal_unit_price_after_discount_arr = [];
	cal_total_discount_arr = [];
	cal_gross_total_vat_arr = [];
	cal_net_total_vat_arr = [];
	cal_total_permit_disc_arr = [];
	row_count = 1;
	cal_total__net_permit_disc_arr = [];
	cal_total_net_total_ex_vat_arr = [];
	cal_total_main_vat_arr = [];

	$(function () {
		var dtToday = new Date();

		var month = dtToday.getMonth() + 1;
		var day = dtToday.getDate();
		var year = dtToday.getFullYear();
		if (month < 10)
			month = '0' + month.toString();
		if (day < 10)
			day = '0' + day.toString();

		var maxDate = year + '-' + month + '-' + day;
		$('#date_qutref').attr('min', maxDate);
	});
	var modalwidth = "60";
	var dynamic = "0";
	var action = "";
	var hidefooter = 0;
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var actiontype = $(obj).attr('data-actiontype');
	var title = $(obj).attr('data-title');
	var btnlabel = $(obj).attr('data-btnlabel');
	var orderguid = $(obj).attr('data-orderguid');
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
	// xmlhttp.open("GET", url+"?jsondata=" + param +"&orderguid=" + orderguid, true);
	xmlhttp.open("GET", url + "?jsondata=" + param + "&orderguid=" + orderguid + "&actiontype=" + actiontype, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			preloader_off();
			// if(hidefooter==1){
			// 	$('#myModal').find('.card-footer').addClass('hidden');
			// 	$('#myModal').find('.closeBtn').show();
			// }else{
			// 	$('#myModal').find('.card-footer').removeClass('hidden');
			// 	$('#myModal').find('.closeBtn').hide();
			// }
			// if(dynamic==1){
			// 	erp_open_moal(this.responseText);
			// 	$('#innerform').attr('action',action);
			// 	$('#innerModalLabel').html(title);
			// }else{
			// 	if(action !=""){
			// 		$('#modalform').attr('action',action);
			// 	}
			// 	$('.modal-dialog').css('width', modalwidth+'%');

			// 	//$("#actiontype").val(actiontype);
			// 	$('#myModal').modal('show');
			// 	$('#myModal').css('padding', 'initial');
			// 	$('#modal_title').html(title);
			// 	$('.add_customer').css({ "margin-left" : "365px", "padding-bottom" : "10px", "margin-bottom" : "-54px" } );

			// $("#btnGroupVendor").hide();
			// $("#vendor_input").hide();
			// $("#vendor_info").show();

			$('#saveBtn').html('<i class="fa fa-plus-circle"></i> ' + btnlabel);
			$('#formDiv').html(this.responseText);
			$("#actiontype").val(actiontype);
			if (actiontype)
				$("#type_quotation").text(' (' + actiontype + ')');
			// var quotation_ref= $("#quotation_ref").val(quotation_ref);
			// quotation_ref = quotation_ref+"-0.1";
			// console.log(quotation_ref);
			if (actiontype == "revise") {
				var optionText = $("#quotation_ref option:selected").text();
				var optionValue = $("#quotation_ref option:selected").val();
				var ex_version = $("#ex_version").val();
				ex_version = parseFloat(ex_version).toFixed(1);
				var curre_version = Math.abs(ex_version) + 1;
				curre_version = parseFloat(curre_version).toFixed(1);
				optionText = optionText + '-' + curre_version;
				$('#quotation_ref').html('');
				//optionText = 'Premium';1 minutw  wait
				//optionValue = '1';
				$('#quotation_ref').append(`<option value="${optionValue}">
                                       ${optionText}
                                  </option>`)
				$('.quotation_ref option[value=1]').attr('selected', 'selected');
				$('#version').val(curre_version);
				// }
				//$("#quotation_ref").val("123");
			}
			// $(document).on('shown.bs.modal','body', function() {
			$("#auth_verified").val("1");
			$('#INVOICE_DISCOUNT').trigger('keyup');
			$("#voucher_types").trigger('change');
			$("#saveBtn").trigger('click');
			// })

		}
	};

}
//------------------------------------------------

function edit_salesorder_form(obj) {

	total_qw = [];
	total_qw_disc = [];
	total_qw_before_disc = [];
	total_qw_proerty_natval_disc = [];
	total_qw_vat_disc = [];
	total_gw_vat_amt_disc = [];
	total_gw_final_vat_adj_disc = [];
	cal_unit_price_after_discount_arr = [];
	cal_total_discount_arr = [];
	cal_gross_total_vat_arr = [];
	cal_net_total_vat_arr = [];
	cal_total_permit_disc_arr = [];
	row_count = 1;
	cal_total__net_permit_disc_arr = [];
	cal_total_net_total_ex_vat_arr = [];
	cal_total_main_vat_arr = [];

	$(function () {
		var dtToday = new Date();

		var month = dtToday.getMonth() + 1;
		var day = dtToday.getDate();
		var year = dtToday.getFullYear();
		if (month < 10)
			month = '0' + month.toString();
		if (day < 10)
			day = '0' + day.toString();

		var maxDate = year + '-' + month + '-' + day;
		$('#date_qutref').attr('min', maxDate);
	});
	var modalwidth = "60";
	var dynamic = "0";
	var action = "";
	var hidefooter = 0;
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var actiontype = $(obj).attr('data-actiontype');
	var title = $(obj).attr('data-title');
	var btnlabel = $(obj).attr('data-btnlabel');
	var orderguid = $(obj).attr('data-orderguid');
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
	xmlhttp.open("GET", url + "?jsondata=" + param + "&orderguid=" + orderguid, true);
	xmlhttp.send();

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
					$('#modalform').attr('action', action);
				}
				$('.modal-dialog').css('width', modalwidth + '%');

				//$("#actiontype").val(actiontype);
				$('#myModal').modal('show');
				$('#myModal').css('padding', 'initial');
				$('#modal_title').html(title);
				$('.add_customer').css({ "margin-left": "365px", "padding-bottom": "10px", "margin-bottom": "-54px" });

				// $("#btnGroupVendor").hide();
				// $("#vendor_input").hide();
				// $("#vendor_info").show();

				$('#saveBtn').html('<i class="fa fa-plus-circle"></i> ' + btnlabel);
				$('#formDiv').html(this.responseText);
				$("#actiontype").val(actiontype);
				if (actiontype)
					$("#type_quotation").text(' (' + actiontype + ')');
				// var quotation_ref= $("#quotation_ref").val(quotation_ref);
				// quotation_ref = quotation_ref+"-0.1";
				// console.log(quotation_ref);
				if (actiontype == "revise") {
					var optionText = $("#quotation_ref option:selected").text();
					var optionValue = $("#quotation_ref option:selected").val();
					var ex_version = $("#ex_version").val();
					ex_version = parseFloat(ex_version).toFixed(1);
					var curre_version = Math.abs(ex_version) + 1;
					curre_version = parseFloat(curre_version).toFixed(1);
					optionText = optionText + '-' + curre_version;
					$('#quotation_ref').html('');
					//optionText = 'Premium';1 minutw  wait
					//optionValue = '1';
					$('#quotation_ref').append(`<option value="${optionValue}">
                                       ${optionText}
                                  </option>`)
					$('.quotation_ref option[value=1]').attr('selected', 'selected');
					$('#version').val(curre_version);
				}
				//$("#quotation_ref").val("123");
			}

		}
	};

}
function show_search_btn() {
	$('.btnSave').hide();
	$('.btnSearch').show();
}
function show_save_btn() {
	$('.btnSave').show();
	$('.btnSearch').hide();
}
function search_form(obj) {
	var modalwidth = "60";
	if ($(obj).attr('data-modalwidth')) {
		modalwidth = $(obj).attr('data-modalwidth');
	}

	var title = $(obj).attr('data-title');
	$('.modal-dialog').css('width', modalwidth + '%');
	$('#modal_title').html(title);
	$('#Search_myModal').modal('show');

	$('.card-footer').show();
}

//-------------------------------------------------
function confirmDialog(message, onConfirm, confirmBtn = 'Delete', onClose, atuoConfirm = 0) {
	var fClose = function () {
		modal.modal("hide");
	};
	var modal = $("#confirmModal");

	var zindex = parseInt($('.modal-backdrop').last().css('z-index'));
	$('#confirmModal').on('shown.bs.modal', function () {
		$('#confirmModal').css('z-index', (zindex + 12));
	});

	modal.modal({ backdrop: 'static', keyboard: false }, 'show');
	$("#confirmMessage").empty().append(message);
	$("#confirmOk").unbind().one('click', onConfirm).one('click', fClose);
	$("#confirmOk").find('.btn-text').text(confirmBtn);
	$("#confirmCancel").unbind().one('click', onClose).one("click", fClose);

	if (atuoConfirm === 1) {
		$("#confirmOk").click();
	}
}
function delete_row_store(obj) {
	var id = $(obj).val();
	if (id > 0) {
		var siteurl = $(obj).attr('data-url');
		var url = atob(siteurl);
		confirmDialog("Are you sure to delete?", function () {
			$.ajax({
				type: "POST",
				dataType: "json",
				url: url,
				data: { id: id, type: "delete" },
				success: function (response) {
					var deletStatus = response.delete_status;
					if (deletStatus == 1) {
						successmsg("store details deleted successfully.");
						$(obj).closest('tr').remove();
					} else {
						errormsg(response.errormsg);
					}

				}
			});
		});

	}
	else {
		$(obj).closest('tr').remove();
	}


}
//----------------------
function deleteThis(obj) {
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var url = atob(siteurl);
	preloader_on();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: { id: id },
		success: function (response) {
			console.log(response);
			preloader_off();
			var deletStatus = response.deletStatus;
			if (deletStatus == 1) {
				successmsg(response.successmsg);
				$(obj).closest('tr').remove();
			} else {
				errormsg(response.errormsg);
			}

		}
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(error);
	});
	return false;
}
function delete_data(obj) {
	confirmDialog("Are you sure?", function () {
		deleteThis(obj);
	});
}
//------------------------------------
function erp_load_sub_data(obj) {
	var guid = $(obj).val();
	var subid = $(obj).attr('data-subid');
	var dflt = $(obj).attr('data-default');
	var type = $(obj).attr('data-type');
	var siteurl = $(obj).attr('data-url');
	var selected = 0;
	if ($(obj).attr('data-selected')) {
		selected = $(obj).attr('data-selected');
	}
	var url = atob(siteurl);
	$("#" + subid).html('<option value="0" >' + dflt + '</option>');
	preloader_on();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: { guid: guid, type: type },
		success: function (response) {
			preloader_off();
			var load_status = response.load_status;
			if (load_status == 0) {
				return;
			}
			var data = response.data;
			$.each(data, function (i, field) {
				var name = field.name;
				var id = field.id;
				if (selected == id) {
					var option = '<option value="' + id + '" selected>' + name + '</option>';
				} else {
					var option = '<option value="' + id + '" >' + name + '</option>';
				}
				$("#" + subid).append(option);
			});
			if ($(obj).attr('data-is-multiselect')) $("#" + subid).multiselect('rebuild');
		}
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(jqXHR.responseText);
	});
}
//-------------------------------------
function erp_auto_check(obj) {
	preloader_on()
	var code = $(obj).val();
	var id = $(obj).attr('id');
	var guid = $(obj).attr('data-guid');
	var siteurl = $(obj).attr('data-url');
	var url = atob(siteurl);
	$.ajax({
		url: url,
		type: "POST",
		dataType: "json",
		data: { guid: guid, code: code },
		success: function (result) {
			console.log(result);
			preloader_off();
			var CheckStatus = result.CheckStatus;
			if (CheckStatus == 0) {
				$("#error_" + id).html(result.errormsg);
			} else {
				$("#error_" + id).html('');
			}
		}

	});
}

//--------------------------------------
function errormsg(msg, count = 1) {
	var css_class = '.top-msg-' + count;
	$(css_class).show();
	$(css_class).find('.top-msg-content').html(msg);
	$(css_class).removeClass('success');
	$(css_class).addClass('error');
	// setTimeout("erp_msg_clear()",10000);

	// $('.top-msg').show();
	// $('#top-msg-content').html(msg);
	// $('.top-msg').removeClass('success');
	// $('.top-msg').addClass('error');
}

function successmsg(msg, count = 1) {
	var css_class = '.top-msg-' + count;
	$(css_class).show();
	$(css_class).find('.top-msg-content').html(msg);
	$(css_class).removeClass('error');
	$(css_class).addClass('success');
	// setTimeout("erp_msg_clear()",10000);

	// $('.top-msg').show();
	// $('#top-msg-content').html(msg);
	// $('.top-msg').removeClass('error');
	// $('.top-msg').addClass('success');
}
function erp_msg_clear() {
	$(".top-msg").hide();
}
setInterval("erp_msg_clear()", 10000);
// setTimeout("erp_msg_clear()",10000);
//-----------------------------

function preloader_on() {
	$('.body').addClass('modal-open');
}

function preloader_off() {
	$('.body').removeClass('modal-open');
}
//------------------------------------------
//others
function showDiv(obj) {
	var div = $(obj).attr('data-div');
	if ($(obj).is(":checked")) {
		$('#' + div).removeClass('hidden');
	} else {
		$('#' + div).addClass('hidden');
	}
}

function divon(obj) {
	var div = $(obj).attr('data-div');
	$('.' + div).removeClass('hidden');
}

function divoff(obj) {
	var div = $(obj).attr('data-div');
	$('.' + div).addClass('hidden');
}

//-------------------------------------------
function erp_open_moal(body, width = 40) {
	var exampleModal = getModal();
	if (!exampleModal) { exampleModal = initModal(width); }

	var html = '<div class="modal-header">' +
		'<h5 class="modal-title" id="innerModalLabel">Create Unit</h5>' +
		'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
		'<span aria-hidden="true">&times;</span>' +
		'</button>' +
		'</div><form method="post" id="innerform" ><input type="hidden" name="inner_form" value="1">' +
		'<div class="modal-body">' + body + '</div>' +
		'<div class="modal-footer">' +
		'<button class="btn  btn-success" name="saveBtn" id="saveBtn" type="button" onclick="return erp_save_form(this)"><i class="fa fa-plus-circle"></i> Save </button>' +
		'<button class="btn  btn-danger innerCloseBtn" name="ResetData" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
		'</div></form>';

	setModalContent(html);
	jQuery(exampleModal).modal('show');

}
function erp_quotation_open_moal(body) {
	var exampleModal = getModal();
	if (!exampleModal) { exampleModal = initModal(); }

	var html = '<div class="modal-header">' +
		'<h5 class="modal-title" id="innerModalLabel">Create Unit</h5>' +
		'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
		'<span aria-hidden="true">&times;</span>' +
		'</button>' +
		'</div><form method="post" id="innerform" ><input type="hidden" name="inner_form" value="1">' +
		'<div class="modal-body">' + body + '</div>' +
		'<div class="modal-footer">' +
		'<button class="btn  btn-success" name="saveBtn" id="saveBtn" type="button" onclick="return erp_quotation_save_form(this)"><i class="fa fa-plus-circle"></i> Save </button>' +
		'<button class="btn  btn-danger innerCloseBtn" name="ResetData" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
		'</div></form>';

	setModalContent(html);
	jQuery(exampleModal).modal('show');

}
function setRand() {
	rand = Math.random() * 1000;
}
function getRand() {
	return rand;
}
function getModal() {
	var rand_no = getRand();
	return document.getElementById('exampleModal');
}

function setModalContent(html) {
	getModal().querySelector('.modal-content').innerHTML = html;
}

function initModal(width = 40) {
	var rand_no = getRand();
	var modal = document.createElement('div');
	modal.classList.add('modal', 'fade');
	//modal.setAttribute('id', 'exampleModal');
	modal.setAttribute('id', 'exampleModal');
	modal.setAttribute('tabindex', '-1');
	modal.setAttribute('role', 'dialog');
	modal.setAttribute('data-backdrop', 'static');
	modal.setAttribute('data-keyboard', 'false');
	modal.setAttribute('aria-labelledby', 'exampleModalLabel');
	modal.setAttribute('aria-hidden', 'true');
	modal.innerHTML =
		'<div class="modal-dialog innerpopup" style="min-width: ' + width + '%;" role="document">' +
		'<div class="modal-content"></div>' +
		'</div>';
	document.body.appendChild(modal);
	return modal;
}


// function cnv_Float(val,no_decimal = -1){
//  	var decimals =  parseInt($('#comp_decimal').val());
// 	if(no_decimal == -1) no_decimal = decimals;
//   var total = parseFloat(remComa(val));
//   if(!isNaN(total))
//   	return parseFloat(total).toFixed(no_decimal);
//   else
//     return parseFloat('0').toFixed(no_decimal);
// }
function cnv_Float(val, no_decimal = -1) {
	var decimals = parseInt($('#comp_decimal').val());
	if (no_decimal == -1) no_decimal = decimals;

	var total = parseFloat(remComa(val));
	if (isNaN(total)) return parseFloat(0).toFixed(no_decimal);
	if (typeof Decimal !== "undefined") {
		total = Number(total.toFixed(no_decimal + 2)); // keep extra precision
		const epsilon = new Decimal('0.00000000001');
		const adjusted = new Decimal(total).plus(epsilon);
		return adjusted
			.toDecimalPlaces(Number(no_decimal), Decimal.ROUND_HALF_UP)
			.toFixed(Number(no_decimal));
	}
	return parseFloat(total).toFixed(no_decimal);
}
function cnv_FloatPow(val, no_decimal = -1) {
	var decimals = parseInt($('#comp_decimal').val());
	if (no_decimal == -1) no_decimal = decimals;
	var total = parseFloat(remComa(val));
	if (!isNaN(total)) {
		// return (Math.round(total * Math.pow(10, no_decimal)) / Math.pow(10, no_decimal)).toFixed(no_decimal);
		total = Number(total.toFixed(no_decimal + 2)); // a couple of extra decimals for safety
		return total.toFixed(no_decimal);
	}
	else
		return (0).toFixed(no_decimal);
}
function toCommas(value) {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function toCommas2(value) {
	var parts = value.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}


function remComa(value) {
	if (value)
		return value.toString().replaceAll(",", "");
	else
		return value;
}



function addMoreContactPerson() {
	var id = parseInt( ($('#moreContactPerson tr').length)) + 1;
	const $html = `
	<tr>
	<td  >
		<input  type="text" class="form-control form-control-sm"
			name="contact_branch_name[]"  >
	</td>
	<td  class="center">
	<input  type="hidden" id="additionalCustomerBranchInfo_${id}" class="form-control form-control-sm"
	name="cbranch[]"  >
		<button data-id="${id}" onclick="pos_customer_branch_info(this)" type="button" class="btn btn-info btn-sm center"> <i class="icon-plus"> </i></button>
	</td>

	<td  >
		<input  type="text" class="form-control form-control-sm"
			name="branch_designation[]"  >
	</td>
	<td  >
		<input  type="text" class="form-control form-control-sm"
			name="branch_telephone[]"  >
	</td>
	<td  >
		<input  type="text" class="form-control form-control-sm"
			name="branch_extension[]"  >
	</td>
	<td  >
		<input  type="text" class="form-control form-control-sm"
			name="branch_mobile[]" onkeyup="$(this).parent().next('td').find('input').val(this.value)"  >
	</td>
	<td  >
		<input  type="text" class="form-control form-control-sm"
			name="branch_whatsapp_no[]"  >
	</td>
	<td  >
		<input  type="text" class="form-control form-control-sm"
			name="branch_email[]"  >
	</td>
	<td  >
		<input  type="text" class="form-control form-control-sm"
			name="branch_contact_code[]"  >
		<input  type="hidden" class="form-control form-control-sm"
			name="branch_c_edit_guid[]" value="0"  >

	</td>
	<td  >
	 <a onclick="$(this).parent().parent().remove();" class="btn btn-light btn-sm" href="javascript:void(0);"><i class="icon-close" style="color:red"></i></a>
	</td>
</tr>
	`;
	$('#moreContactPerson').append($html);
}



function pos_customer_branch_info(obj) {
	var id = $(obj).attr('data-id');
	// var url = $('#customerInfoURL').val();
	// var customerTypeOptions = '<option value="0">Select Customer Type</option>';
	// var is_customer_option_available = $('#customerTypeOptions').val();
	// if(is_customer_option_available.length > 0) customerTypeOptions = atob(is_customer_option_available);
	var existData = $('#additionalCustomerBranchInfo_' + id).val();
	console.log(existData);
	if (existData && existData != '') {
		var infoJson = decodeURIComponent(escape(atob($('#additionalCustomerBranchInfo_' + id).val()))); //atob($('#additionalCustomerBranchInfo_'+id).val());
		console.log(infoJson);
		let infoOBJ = JSON.parse(infoJson);
		let info = infoOBJ;
		let { infoAdd1, infoAdd2, infoAdd3, infoID } = info;
		infoAdd1 = (infoAdd1 != null) ? infoAdd1 : '';
		infoAdd2 = (infoAdd2 != null) ? infoAdd2 : '';
		infoAdd3 = (infoAdd3 != null) ? infoAdd3 : '';
		var body = ` 
	<table class="table table-sm">
	<tbody>
		<tr>
		  	<td >
			 	<label>Address 1</label>
				<input type="hidden" id="additionalCustomerBranchInfo_id" value="${infoID}" />
				<textarea id="infoAdd1" name="infoAdd1" rows="3" class="form-control "  >${infoAdd1}</textarea>
			</td>
		</tr>
		<tr>
			<td>
			 	<label> Address 2</label>
				 <textarea id="infoAdd2" name="infoAdd2" rows="3" class="form-control "  >${infoAdd2}</textarea>
			</td>
		</tr>
		<tr>
			 <td >
			 	<label>Address 3 </label>
				<textarea  id="infoAdd3" name="infoAdd3" rows="3" class="form-control "  >${infoAdd3}</textarea>
			 </td>
		</tr>
	 </tbody>
	</table>`;
	} else {
		let info = { infoID: id, infoAdd1: '', infoAdd2: '', infoAdd3: '' };
		let { infoAdd1, infoAdd2, infoAdd3, infoID } = info;

		var body = ` 
	<table class="table table-sm ">
	<tbody>
		<tr>
			<td >
				<label>Address 1</label>
				<input type="hidden" id="additionalCustomerBranchInfo_id" value="${infoID}" />
				<textarea id="infoAdd1"  name="infoAdd1" rows="3" class="form-control "  >${infoAdd1}</textarea>
			</td>
		</tr>
		<tr>
			<td>
				<label> Address 2</label>
				<textarea id="infoAdd2"  name="infoAdd2" rows="3" class="form-control "  >${infoAdd2}</textarea>
			</td>
		</tr>
		<tr>
			<td >
				<label>Address 3 </label>
				<textarea id="infoAdd3"  name="infoAdd3" rows="3" class="form-control "  >${infoAdd3}</textarea>
			</td>
		</tr>
	 </tbody>
	</table>`;
	}
	var exampleModal = getModal();
	if (!exampleModal) { exampleModal = initModal(); }
	var html = `<div class="modal-header" style="background-color:#fff">
		  <h5 class="modal-title" id="innerModalLabel">Branch  Address</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
			</button>
		  </div>
		
		  <div class="modal-body" style="background-color:#fff">
		  ${body} 
	   </div>
		  <div class="modal-footer" style="background-color:#fff">
		  <button class="btn  btn-success" name="saveBtn" data-id="" id="saveCustomerBranchBtn" type="button" ><i class="fa fa-plus-circle"></i> Save </button>' 
		  <button class="btn  btn-danger innerCloseBtn" name="ResetData" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' 
		  </div>`;
	setModalContent(html);
	jQuery(exampleModal).modal('show');

	// return false;

}


$(document).on('click', '#saveCustomerBranchBtn', function () {
	return pos_save_customer_branch_info(this);
})

function pos_save_customer_branch_info(obj) {
	var id = $('#additionalCustomerBranchInfo_id').val();
	var add1 = $('#infoAdd1').val();
	var add2 = $('#infoAdd2').val();
	var add3 = $('#infoAdd3').val();
	var myArray = {}; // Creating a new array object
	myArray['infoAdd1'] = add1; // Setting the attribute a to 200
	myArray['infoAdd2'] = add2;
	myArray['infoAdd3'] = add3;
	myArray['infoID'] = id;
	console.log(JSON.stringify(myArray));
	var encodeString = JSON.stringify(myArray);
	var json = btoa(unescape(encodeURIComponent(encodeString)));
	$('#additionalCustomerBranchInfo_' + id).val(json);
	$('.innerCloseBtn').trigger('click');


	return false;
}

function erp_purchase_tax(obj) {
	if ($(obj).is(':checked')) {
		$('.ptax').removeClass('hidden');
		$('#purchase_tax').focus();
		$('#sales_taxable').attr('checked', true);
		$('#new_tax').val(1);
		if ($('.taxinfo').length) $('.taxinfo').removeClass('hidden');
	} else {
		$('.ptax').addClass('hidden');
		$('.ptax2').addClass('hidden');
		$('#tax_type').val(0);
		$('#sales_taxable').attr('checked', false);
		$('#vat').val('');
		$('#new_tax').val(0);
		if ($('.taxinfo').length) $('.taxinfo').addClass('hidden');

	}
}

function erp_purchase_taxable(obj) {
	var str = $(obj).val();
	$('#sales_tax_type').val(str);
	$('#purchase_tax_type').val(str);
	$('#purchase_tax').focus();
	if (str == 1) {
		$('.ptax2').removeClass('hidden');
		$('#purchase_tax').val('');
		$('#vat').val('');
	} else {
		$('#purchase_tax').val(0);
		$('#vat').val(0);
	}
}


function erp_account_group_form(obj) {
	var action = "";
	var hidefooter = 0;
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var title = $(obj).attr('data-title');
	var param = $(obj).attr('data-param');
	if ($(obj).attr('data-action')) {
		action = $(obj).attr('data-action');
	}
	var url = atob(siteurl);
	preloader_on();
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			preloader_off();
			erp_open_moal_group_form(this.responseText);
			$('.innerform').attr('action', action);
			$('.innerModalLabel').html(title);
		}
	};
	xmlhttp.open("GET", url + "?jsondata=" + param, true);
	xmlhttp.send();
}

function erp_open_moal_group_form(body) {
	setRand();
	var exampleModal = getModal();
	if (!exampleModal) { exampleModal = initModal(); }

	var html = '<div class="modal-header">' +
		'<h5 class="modal-title" id="innerModalLabel">Create Account Group</h5>' +
		'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
		'<span aria-hidden="true">&times;</span>' +
		'</button>' +
		'</div><form method="post" class="innerform" id="innerform" ><input type="hidden" name="inner_form" value="1">' +
		'<div class="modal-body">' + body + '</div>' +
		'<div class="modal-footer">' +
		'<button class="btn  btn-success" name="innersaveBtn" id="innersaveBtn" type="button" onclick="return erp_save_account_groups(this)" ><i class="fa fa-plus-circle"></i> Save </button>' +
		'<button class="btn  btn-danger innerCloseBtn" name="ResetData" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
		'</div></form>';
	setModalContent(html);
	jQuery(exampleModal).modal('show');
}


function erp_save_account_groups(obj) {
	var form = $(obj).closest('form');
	var siteurl = form.attr('action');
	var url = atob(siteurl);
	preloader_on();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: url,
		data: form.serialize(),
		success: function (response) {
			console.log(response);
			preloader_off();
			var saveStatus = response.saveStatus;
			if (saveStatus == 0) {
				var input = response.input;
				errormsg(response.errormsg);
				$('#' + input).focus();
			} else {
				successmsg(response.successmsg);
				var data = response.data;
				$('#customer_group_guid').find('option').remove();
				$('#customer_group_guid').append(data);
				$('.innerCloseBtn').trigger('click');
			}
		}
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(jqXHR.responseText);
	});

	return false;
}

function erp_enable_credit_limit(obj) {
	if ($(obj).prop('checked') == true) {
		$('.crlimit').show();
	} else {
		$('.crlimit').hide();
	}
}

function erp_enable_pdc_days(obj) {
	if ($(obj).prop('checked') == true) {
		$('.pdc_days_html').show();
	} else {
		$('.pdc_days_html').hide();
	}
}

function enable_opening_balance() {
	var ro = 'readonly';
	prev_opening_bal = $('#opening_balance').val();
	if (!prev_opening_bal && $('#enable_credit_limit').is(':checked')) {
		ro = '';
	}
	$('#opening_balance').prop('readonly', ro);
}

function erp_opening_bills(obj,url) {
	var customer_id = $(obj).closest('form').find('#edit_guid').val();
	var opening_bal = parseFloat($(obj).closest('form').find('#opening_balance').val()) || 0;
	var opening_bills = $(obj).closest('form').find('#opening_bills').val();

	if (!opening_bal) {
		errormsg('Enter opening balance amount');
		return;
	}

	// url = 'site/vendors/ajax/opening_bills_form.php';
	var modal = erp_create_modal(url, { customer_id: customer_id, opening_bal: opening_bal, opening_bills: opening_bills });
	$('#' + modal).find('.saveBtn').on('click', function () {
		erp_opening_bills_save(this);
	});
}

function erp_opening_bills_calculate(obj) {
	var $form = $(obj).closest('form');
	var $trs = $form.find('table').find('tbody tr').not('.row-template');
	var balance = parseFloat($('#opening_balance').val()) || 0;
	var total_bill_amount = 0;

	$.each($trs, function (i, tr) {
		var amount = parseFloat($(tr).find('.amount').val()) || 0;
		var type = $(tr).find('.type').val();
		if (type == 'dr') {
			balance -= amount;
			total_bill_amount += amount;
		} else {
			balance += amount;
			total_bill_amount -= amount;
		}
		$(tr).find('.balance').val(cnv_Float(balance));
	});

	$form.find('.total_bill_amount').val(total_bill_amount);
}

function erp_opening_bills_save(obj) {
	var $form = $(obj).closest('form');
	var $trs = $form.find('table').find('tbody tr').not('.row-template');
	var opening_balance = parseFloat($('#opening_balance').val()) || 0;
	var total_bill_amount = parseFloat($form.find('.total_bill_amount').val());

	if (total_bill_amount && opening_balance != total_bill_amount) {
		errormsg('Net Balance should be zero.');
		return;
	}

	saveStatus = true;
	$.each($trs, function (i, tr) {
		var date = $(tr).find('.date').val();
		var amount = parseFloat($(tr).find('.amount').val());
		if (isNaN(amount) || amount == '') {
			$(tr).remove();
			return;
		}
		if (date == '') {
			return saveStatus = false;
		}
	});

	if (!saveStatus) {
		errormsg('Date is required');
		return saveStatus;
	}
	var formData = $form.serialize();
	var $modal = $(obj).closest('.DynamicModal');
	$('#opening_bills').val(formData);
	$('#opening_bills_total').val(total_bill_amount);
	successmsg('Data added to the form.');
	$modal.modal('hide');
}

jQuery('body').on('click', '.is_company', function () {
	return erp_show_company_input(this);
});


function erp_enable_pricelist(obj) {
	var loadstatus = $(obj).attr('data-status');
	if ($(obj).prop('checked') == true) {
		$('#pricelistDiv').show();
		if (loadstatus == 0) {
			erp_load_sub_data(obj);
			$(obj).attr('data-status', 1);
		}
	} else {
		$('#pricelistDiv').hide();
	}
}
function erp_enable_promotion(obj) {
	var loadstatus = $(obj).attr('data-status');
	if ($(obj).prop('checked') == true) {
		$('#promotionDiv').show();
		if (loadstatus == 0) {
			erp_load_sub_data(obj);
			$(obj).attr('data-status', 1);
		}
	} else {
		$('#promotionDiv').hide();
	}
}
function customer_startup() {
	var edit_guid = $('#edit_guid').val();
	if (edit_guid) {
		var obj = $('#enable_pricing');
		erp_enable_pricelist(obj);
		var obj = $('#enable_promotion');
		erp_enable_promotion(obj);
		var obj = $('.is_company');
		erp_show_company_input(obj);
	}
}
function erp_show_company_input(obj) {
	var val = $("input[name='is_company']:checked").val();
	if (val == 1) {
		$('.personal').hide();
	} else {
		$('.personal').show();
	}
}
function erp_show_business_activity() {
	var val = $("input[name='insurance_client']:checked").val();
	if (val == 1) {
		$('.insurance').show();

	} else {
		$('.insurance').hide();
	}
}

function findCurrency(val) {
	if ($("#currency_guid_123 option[country='" + val + "']").length)
		$("#currency_guid_123 option[country='" + val + "']").prop('selected', true);
	else
		$("#currency_guid_123 option[value='0']").prop('selected', true);
}

function natureChange(obj) {
	var nature = $(obj).find('option:selected').attr('data-nature');
	console.log(nature);
	if (nature == 1) var natureName = 'Balance Sheet';
	if (nature == 2) var natureName = 'Profit & Loss';
	$('#nature').val(natureName);
	$('#natureType').val(nature);
}

function accountGroupParentChange(obj) {
	var parent_guid = $(obj).val();
	$(obj).closest('form').find('.related-fields').hide();
	$(obj).closest('form').find('.related-fields.' + parent_guid).show();
}

// function updateCostCategorySelect(selectedCategories) {
//     var $select = $('#example-getting-started8');
//     $select.find('option').prop('selected', false);

//     selectedCategories.forEach(function(categoryId) {
//         $select.find('option[value="' + categoryId + '"]').prop('selected', true);
//     });

//     // Refresh Bootstrap Multiselect UI
//     $select.multiselect('refresh');
// 	$('.multiselect').css('width', '250px');

// }

// function updateCostCenterSelect(selectedCenters) {
//     var $select = $('#example-getting-started9');
//     $select.find('option').prop('selected', false);

//     selectedCenters.forEach(function(centerId) {
//         $select.find('option[value="' + centerId + '"]').prop('selected', true);
//     });

//     // Refresh Bootstrap Multiselect UI
//     $select.multiselect('refresh');
//     // Set the width
//     $('.multiselect').css('width', '250px');

// }

// function updateSalesostCategorySelect(selectedCategories) {
//     var $select = $('#example-getting-started_sales1');
//     $select.find('option').prop('selected', false);

//     selectedCategories.forEach(function(categoryId) {
//         $select.find('option[value="' + categoryId + '"]').prop('selected', true);
//     });

//     // Refresh Bootstrap Multiselect UI
//     $select.multiselect('refresh');
// 	$('.multiselect').css('width', '250px');
// }

// function updateSalesCostCenterSelect(selectedCenters) {
//     var $select = $('#example-getting-started_sales2');
//     $select.find('option').prop('selected', false);

//     selectedCenters.forEach(function(centerId) {
//         $select.find('option[value="' + centerId + '"]').prop('selected', true);
//     });

//     // Refresh Bootstrap Multiselect UI
//     $select.multiselect('refresh');
//     // Set the width
//     $('.multiselect').css('width', '250px');

// }

// function updateSalesReturncostCategorySelect(selectedCategories) {
//     var $select = $('#example-getting-started_sales_return1');
//     $select.find('option').prop('selected', false);

//     selectedCategories.forEach(function(categoryId) {
//         $select.find('option[value="' + categoryId + '"]').prop('selected', true);
//     });

//     // Refresh Bootstrap Multiselect UI
//     $select.multiselect('refresh');
// 	$('.multiselect').css('width', '250px');
// }

// function updateSalesReturnCostCenterSelect(selectedCenters) {
//     var $select = $('#example-getting-started_sales_return2');
//     $select.find('option').prop('selected', false);

//     selectedCenters.forEach(function(centerId) {
//         $select.find('option[value="' + centerId + '"]').prop('selected', true);
//     });

//     // Refresh Bootstrap Multiselect UI
//     $select.multiselect('refresh');
//     // Set the width
//     $('.multiselect').css('width', '250px');

// }

// function updatePurchaseCostCategorySelect(selectedCategories) {
//     var $select = $('#example-getting-started_purchase1');
//     $select.find('option').prop('selected', false);

//     selectedCategories.forEach(function(categoryId) {
//         $select.find('option[value="' + categoryId + '"]').prop('selected', true);
//     });

//     // Refresh Bootstrap Multiselect UI
//     $select.multiselect('refresh');
// 	$('.multiselect').css('width', '250px');
// }

// function updatePurchaseCostCenterSelect(selectedCenters) {
//     var $select = $('#example-getting-started_purchase2');
//     $select.find('option').prop('selected', false);

//     selectedCenters.forEach(function(centerId) {
//         $select.find('option[value="' + centerId + '"]').prop('selected', true);
//     });

//     // Refresh Bootstrap Multiselect UI
//     $select.multiselect('refresh');
//     // Set the width
//     $('.multiselect').css('width', '250px');

// }

// function formatPaymentDate123(dateString) {
// 	const date = new Date(dateString);
// 	return date.toLocaleDateString('en-GB', {
// 		day: '2-digit',
// 		month: '2-digit',
// 		year: 'numeric'
// 	});
// }

// function getVenderPurchases(obj,val){
// 	var cost_category_guid = $("#example-getting-started8").val();
// 	var cost_center_guid = $("#example-getting-started9").val();

// 	var url = atob($(obj).data('url'));
// 	var vendor_guid = atob($(obj).data('vendor'));

// 	if(cost_center_guid || cost_category_guid){
// 		$.post(url, 
// 			{ cost_category_guid:cost_category_guid , cost_center_guid: cost_center_guid, vendor_guid: vendor_guid} ,
// 			function(result){
// 				if(result.saveStatus == 1){
// 					updatepurchasesTable(result.data);
// 				}else{
// 					const tableBody = document.querySelector("#purchasesTable tbody");
// 					tableBody.innerHTML = ""; 
// 					const emptyRow = document.createElement("tr");
// 					emptyRow.innerHTML = `<td class="center" colspan="6">${result.errormsg}</td>`;
// 					tableBody.appendChild(emptyRow);
// 				}		
// 			}
// 		)
// 	};
// }

// function updatepurchasesTable(trns){
//     const tableBody = document.querySelector("#purchasesTable tbody");
//     tableBody.innerHTML = ""; 
// 	if(!trns || trns.length === 0){
//         const emptyRow = document.createElement("tr");
//         emptyRow.innerHTML = `<td class="center" colspan="6">No records found</td>`;
//         tableBody.appendChild(emptyRow);
//         return;
// 	}
//     trns.forEach((d, i) => {
//         const row = document.createElement("tr");

//         row.innerHTML = `
//             <td class="center">${formatPaymentDate123(d.trn_date)}</td>
//             <td class="center">${d.trn_no}</td>
//             <td class="right">${cnv_Float(d.net_total)}</td>
//             <td class="right">${cnv_Float(d.total_settle_amount)}</td>
//             <td class="right">${cnv_Float(d.net_total - d.total_settle_amount)}</td>
//             <td>
//                 <input type="number" class="form-control form-control-sm invoice_amount right" 
//                     name="trns[${d.id}][amount]" 
//                     data-invoice-id="${d.id}" 
//                     data-due-amount="${d.net_total - d.total_settle_amount}" 
//                     onfocus="set_invoice_amount(this)" 
//                     onchange="fill_policy_amounts(this)">
//                 <input type="hidden" name="trns[${d.id}][voucher_type]" value="${d.voucher_type}">
//             </td>
//             <td class="center">
// 				<input type="checkbox" class="item-select" data-balance-due="${cnv_Float(d.net_total - d.total_settle_amount)}">
// 			</td>
//         `;

//         tableBody.appendChild(row);
//     });
// }

function getVoucherRefference(obj, val) {
	$modal = $(obj).closest('.modal');
	$form = $(obj).closest('form');

	var url = atob($(obj).data('url'));
	var vendor_guid = $(obj).data('vendor');
	if (vendor_guid) {
		try {
			vendor_guid = atob(vendor_guid);
			console.log(vendor_guid);
		} catch (e) {
			console.error("Invalid Base64 string:", e);
		}
	} else {
		console.error("data-vendor attribute is missing or empty");
	}
	var table = $(obj).data('module');
	if (table) {
		try {
			table = atob(table);
			// console.log(table);
		} catch (e) {
			console.error("Invalid Base64 string:", e);
		}
	} else {
		console.error("data-vendor attribute is missing or empty");
	}
	var advance = $('#adv_received').length;
	var invoiced = $('#so_process_settle_amount').length;
	var trn_date = $modal.find('.trn-date').val();

	var id = val;
	if (id) {
		$.post(url,
			{ transactionID: id, table: table, trn_date: trn_date, vendor_guid: vendor_guid },
			function (result) {
				if (result.saveStatus == 1) {
					if (result.type == 2) {
						$('.entity_voucher_ref').val(result.data);
						// dev-6
						if (result.voucher_type == 13) {
							$('.entity_voucher_ref').html(result.data);
						}
						if (result.voucher_type == 28) {
							$('.entity_voucher_ref').html(result.data);
						}
						// dev-6
						var vendor_guid = result.vendor_guid;
						if (vendor_guid) {
							erp_add_vendor(result.vendor_data);
							$('#btnGroupVendor').hide();
							$('i.addBtnVendor').hide();
						}
						if (result.voucher_type == 118) {
							$('#consumption_store').val(result.consumption_store);
							$('#production_store_guid').val(result.production_store);
							$('#scrap_store').val(result.scrap_store);
							$('.production_store_guid').val(result.production_store);
							$('.scrap_store').val(result.scrap_store);
							$('.consumption_store').val(result.consumption_store);
						}
						if (result.voucher_type == 21) {
							if (result.settings.project_physicalstock == 1) {
								$('select[name="transfer_from"]').closest('.formrow').show();
								$('.journal-debit-ledger').hide();
							} else {
								$('select[name="transfer_from"]').closest('.formrow').hide();
								$('.journal-debit-ledger').show();
							}

							$('.table-journal-ledgers tbody').empty();
							if (result.journal_ledgers.cr) {
								$.each(result.journal_ledgers.cr, function (i, v) {
									// ledger_insert_row(v, $(obj).closest('form'));
									tr = `<tr data-type="${v.type || ''}">
											<td class="center">
												<a onclick="erp_delete_table_row(this)"><i class="far fa-trash-alt text-danger"></i></a>
					    		                <input type="hidden" name="journal_ledgers[${v.id}][ledger_id]" class="ledger_id" value="${v.id}">
											</td>
							                <td>${v.name}</td>
							                <td><input type="text" class="form-control form-control-sm center type" name="journal_ledgers[${v.id}][type]" value="Cr" readonly></td>
							                <td><input type="number" class="form-control form-control-sm right amount" name="journal_ledgers[${v.id}][amount]" value="0.000"></td>
					    		        </tr>`;
									$('.table-journal-ledgers tbody[data-type="Cr"]').append(tr);
								});
							}

							if (result.voucher_settings.journal_debit_ledger_from_item_category == 1) {
								get_item_group_ledgers();
							}
							else if (result.journal_ledgers.dr) {
								$.each(result.journal_ledgers.dr, function (i, v) {
									tr = `<tr data-type="${v.type || ''}">
											<td class="center">
												<a onclick="erp_delete_table_row(this)"><i class="far fa-trash-alt text-danger"></i></a>
					            		        <input type="hidden" name="journal_ledgers[${v.id}][ledger_id]" class="ledger_id" value="${v.id}">
											</td>
							                <td>${v.name}</td>
							                <td><input type="text" class="form-control form-control-sm center type" name="journal_ledgers[${v.id}][type]" value="Dr" readonly></td>
					    		            <td><input type="number" class="form-control form-control-sm right amount" name="journal_ledgers[${v.id}][amount]" value="0.000"></td>
							            </tr>`;
									$('.table-journal-ledgers tbody[data-type="Dr"]').append(tr);
								});
							}

							ledger_calculate_values($('#ps_items_table'));
						}
						if (result.voucher_type == 12 && result.ledgers && result.ledgers.length) {
							var ledgerHTML = '<select class="form-control" id="ledgerSelect" multiple="multiple" data-mdb-filter="true">';

							$.each(result.ledgers, function (ind, item) {
								if (item.is_ledger == 1)
									ledgerHTML += `<option data-is-cash="${item.is_cash}" data-is-bank="${item.is_bank}" data-current-balance="${item.current_balance}" value="${item.id}">${item.name}</option>`;
							})
							// $('.addBtnVendor').trigger('click');

							$('.settlement_tr').remove();
							ledgerHTML += `</select>`;
							$('.ledgerSelectHTML').html(ledgerHTML);
							$('#ledgerSelect').multiselect({
								buttonWidth: '50%',
								// enableFiltering: true,
								dropRight: true,
								maxHeight: 200,
								buttonText: function (options, select) {
									if (options.length === 0) {
										return 'Select Ledger';
									}
									if (options.length > 2) {
										return 'Multiple Ledger Selected';
									}
									else {
										var labels = [];
										options.each(function () {
											if ($(this).attr('label') !== undefined) {
												labels.push($(this).attr('label'));
											}
											else {
												labels.push($(this).html());
											}
										});
										return labels.join(', ') + '';
									}
								},
								onChange: function (option, checked, select) {
									var opselected = $(option).val();
									var opselectedText = option[0].innerHTML;

									if (checked == true) {
										var total = '';
										var count_tr = $('.settlement_tr').length;
										if (count_tr == 0) {
											total = cnv_Float(remComa($('.net_inclvat').html()));
											// if(advance){
											// 	var adv_received = cnv_Float($('#adv_received').val());

											// 	if(adv_received > 0 ) total = cnv_Float(parseFloat(total)-parseFloat(adv_received));
											// }
											// if(invoiced){
											// 	var invoiced_amount = cnv_Float($('#so_process_settle_amount').val()); 
											// 	total = cnv_Float(parseFloat(total) + parseFloat($('#so_process_settle_amount').val()));
											// }
										}

										var is_cash = $(option).data('is-cash');
										var is_bank = $(option).data('is-bank');
										var current_balance = $(option).data('current-balance');

										var TR_HTML = `<tr id="settlement_ledger_${opselected}" class="settlement_tr" >`;
										TR_HTML += `<td >${opselectedText}</td>`;
										TR_HTML += `<td>`;
										TR_HTML += `<input  style=" max-width: 8pc;"class="form-control settlement_input2 form-control-sm" type="text" name="settlements[${opselected}][amount]" value="${total}"/>`;
										if (is_cash || is_bank) {
											TR_HTML += `Current Balance : ${cnv_Float(Math.abs(current_balance))} ${(current_balance < 0) ? 'Cr' : 'Dr'}`;
										}
										TR_HTML += `</td>`;
										TR_HTML += `</tr>`;

										$('.settlementTR').parent().find('tr:last-child').after(TR_HTML);

									} else if (checked == false) {
										$('#settlement_ledger_' + opselected).remove();
									}

								}


							});
						}

						if (result.voucher_type == 10 || result.voucher_type == 12) {
							if ($('#consume_stock').length) {
								if (result.default_consume_stock) {
									$('#consume_stock').prop('checked', 'checked').trigger('change');
								} else {
									$('#consume_stock').prop('checked', '').trigger('change');
								}
							}
						}
					} else {
						$('#entity_voucher_ref').html(result.data);
						if (result.ledgers && result.ledgers.length) {
							var ledgerHTML = '<select class="form-control" id="ledgerSelect" multiple="multiple" data-mdb-filter="true">';

							$.each(result.ledgers, function (ind, item) {
								if (item.is_ledger == 1)
									ledgerHTML += `<option value="${item.id}">${item.name}</option>`;
							})
							// $('.addBtnVendor').trigger('click');

							$('.settlement_tr').remove();
							ledgerHTML += `</select>`;
							$('.ledgerSelectHTML').html(ledgerHTML);
							var buttonWidth = '50%';
							if(result.voucher_type == 6){
								buttonWidth = '100%';
							}
							$('#ledgerSelect').multiselect({
								buttonWidth: buttonWidth,
								// enableFiltering: true,
								dropRight: true,
								maxHeight: 200,
								buttonText: function (options, select) {
									if (options.length === 0) {
										return 'Select Ledger';
									}
									if (options.length > 2) {
										return 'Multiple Ledger Selected';
									}
									else {
										var labels = [];
										options.each(function () {
											if ($(this).attr('label') !== undefined) {
												labels.push($(this).attr('label'));
											}
											else {
												labels.push($(this).html());
											}
										});
										return labels.join(', ') + '';
									}
								},
								onChange: function (option, checked, select) {
									var opselected = $(option).val();
									var opselectedText = option[0].innerHTML;

									if (checked == true) {
										var total = '';
										var count_tr = $('.settlement_tr').length;
										if (count_tr == 0) {
											total = cnv_Float($('#SALE_NET_TOTAL_INCL_VAT_WITH_ROUND_OFF').val());
											if (advance) {
												var adv_received = cnv_Float($('#adv_received').val());

												if (adv_received > 0) total = cnv_Float(parseFloat(total) - parseFloat(adv_received));
											}
											if (invoiced) {
												var invoiced_amount = cnv_Float($('#so_process_settle_amount').val());
												total = cnv_Float(parseFloat(total) + parseFloat($('#so_process_settle_amount').val()));
											}
										}
										var TR_HTML = `<tr id="settlement_ledger_${opselected}" class="settlement_tr" >
															<td colspan="${result.voucher_type == 6 ? 1 : 2}">${opselectedText}</td>
															<td><input  style=" max-width: 8pc;"class="form-control settlement_input form-control-sm" type="text" name="settlements[${opselected}][amount]" value="${total}"/></td>
														</tr>`;

										$('.settlementTR').parent().find('tr:last-child').after(TR_HTML);

									} else if (checked == false) {
										$('#settlement_ledger_' + opselected).remove();
									}

								}


							});
						}
					}

					if (result.voucher_type == 5) {
						if (result.credit_sales_control) {
							$('#table_quot_order .advance_receipt_settlement').addClass('dis-none');
						} else {
							$('#table_quot_order .advance_receipt_settlement').removeClass('dis-none');
						}

						if ($('[name="bank_ledger_guid"]').val() == '0') {
							$('[name="bank_ledger_guid"]').val(result.settings.default_bank_ledger);
						}
						// updateSalesostCategorySelect(result.cost_category);
						// updateSalesCostCenterSelect(result.cost_center);
					}

					// if(result.voucher_type == 6){
					// 	updateSalesReturncostCategorySelect(result.cost_category);
					// 	updateSalesReturnCostCenterSelect(result.cost_center);
					// }

					if ([15].includes(result.voucher_type)) {
						if ($form.find('select.project-id').length) {
							select_project = $form.find('select.project-id')[0].selectize;
							select_project.clearOptions();
							select_project.setValue(0);
							$form.find('select.project-id').trigger('change');

							$.each(result.projects, function (i, p) {
								select_project.addOption({ value: p.id, text: p.title });
							});
						}
					}

					if (result.cost_center_data && [5, 12].includes(result.voucher_type)) {
						$form.find('input[name="cost_center"]').val(result.cost_center_data);
					}

					var backToBack = false;
					if ($('.select_store_guid').length) {
						var formExists = $('#modalform').length > 0; // Check if form exists
						if (formExists) {
							var inputExists = $('#modalform input[name="process_type"]').length > 0;
							if (inputExists) {
								var process_type = $('#modalform input[name="process_type"]').val();
								if (process_type > 0) backToBack = true;
							}
						}
						if (backToBack) { } else {
							selectStoreAuto(result.store_guid);
						}
					}
					//					if(result.default_sales_ledger > 0){
					if (result.voucher_type == '3') {
						setTimeout(function () {
							$('#sales_ledger').val(result.default_sales_ledger).trigger('change');
							$('#sales_ledger_default').val(result.default_sales_ledger);
							if (result.default_sales_ledger != '0' && result.sales_ledger_allow_all == '0') {
								$('#sales_ledger').prop('name', '').prop('disabled', 'disabled');
								$('#sales_ledger_default').prop('name', 'sales_ledger');
							} else {
								$('#sales_ledger').prop('name', 'sales_ledger').prop('disabled', '');
								$('#sales_ledger_default').prop('name', '');
							}
							if (result.is_wholesale == 1) {
								if ($('#wholesales').length) $('#wholesales').prop('checked', true);
							}
						}, 400);
						if ($('#intgrt_pr_guid').length && result.settings.intgrt_pr) {
							if (isValidBase64Json(result.settings.intgrt_pr)) {
								const jsonStr = atob(result.settings.intgrt_pr);
								const voucherObj = JSON.parse(jsonStr);
								let select = document.getElementById('intgrt_pr_guid');
								appendOptions(select, voucherObj);
							}
						}
					} else {
						setTimeout(() => $('#sales_ledger').val(result.default_sales_ledger).trigger('change'), 400);
					}
					//					}
					// dev-6 
					if (backToBack) {
						console.log("backtoback");
						if ($('#modalform input[name="process_type"]').attr('is_pr_to_po') == 1) {
							if (result.default_purchase_ledger > 0) {
								$('#purchase_ledger').val(result.default_purchase_ledger).trigger('change');
							}
							var vendor_group_guid = isNAN($('#vendor_info').attr('data-vid'));
							if (vendor_group_guid) {
								var pur_grp_attr = $('#voucher_types').find('option:selected').attr('data-sup_grp');
								var pur_ledgr_attr = $('#voucher_types').find('option:selected').attr('data-pur_ledgr');

								if (pur_grp_attr && pur_ledgr_attr) {
									var pur_grp_arr = pur_grp_attr.split(',');
									var pur_ledgr_arr = pur_ledgr_attr.split(',');
									var index = pur_grp_arr.indexOf(vendor_group_guid);
									if (index !== -1 && pur_ledgr_arr[index]) {
										var corresponding_pur_ledgr = pur_ledgr_arr[index];
										$('#purchase_ledger').val(corresponding_pur_ledgr).trigger('change');
									}
								}

							}
						}
					} else {
						if (result.default_purchase_ledger > 0) {
							$('#purchase_ledger').val(result.default_purchase_ledger).trigger('change');
							// 	$('#purchase_ledger').multiselect('rebuild');
							if (result.voucher_type == '13') {
								if (result.item_ledger) {
									erp_get_accounts_group_GL(result.item_ledger);
									//   $('#lc-item-gl').find('option[value="'+result.item_ledger+'"]').prop('selected',true);
									//   $('#lc-item-gl-name').html(result.item_ledger_name);
								}
							}
						}
						else {
							$('#purchase_ledger').val('0').trigger('change');
							// 	$('#purchase_ledger').multiselect('rebuild');
						}
					}
					// dev-6
					if (result.is_job_card == 1) {
						$('.so-tab-vehicle-info').show();
					} else {
						$('.so-tab-vehicle-info').hide();
						$('#vehicle-info .so_vehicle_id').val('').trigger('change');
					}

					if (!$('#is_process_form').length && $('#brokerage_purchase').length) {
						if (result.brokerage_purchase == 1) {
							$('#brokerage_purchase').prop('checked', true).trigger('change');
						} else {
							$('#brokerage_purchase').prop('checked', false).trigger('change');
						}
					}

					if (!$('#is_process_form').length && $('#brokerage_sales').length) {
						if (result.brokerage_sales == 1) {
							$('#brokerage_sales').prop('checked', true).trigger('change');
						} else {
							$('#brokerage_sales').prop('checked', false).trigger('change');
						}
					}

					if ($('#project_sales').length) {
						if (result.settings.default_project_sales == 1) {
							$('#project_sales').prop('checked', true).trigger('change');
						} else {
							$('#project_sales').prop('checked', false).trigger('change');
						}
					}

					erp_hide_form_fields(result.form_settings, result.form_item_settings);
				} else {
					errormsg(result.errormsg);
				}
			}, "json");
	} else {
		$('#entity_voucher_ref').html('<option value="0" >Select Voucher First</option>');
		$('.entity_voucher_ref').val('Select Voucher First');
		// updateCostCategorySelect([0]);
		// updateCostCenterSelect([0]);
		// updateSalesostCategorySelect([0]);
		// updateSalesCostCenterSelect([0]);
		// updateSalesReturncostCategorySelect([0]);
		// updateSalesReturnCostCenterSelect([0]);
		// updatePurchaseCostCategorySelect([0]);
		// updatePurchaseCostCenterSelect([0]);

		$('.so-tab-vehicle-info').hide();
		$('#vehicle-info .so_vehicle_id').val('').trigger('change');
	}

	if ($(obj).find('option:selected').data('credit_sales_control') == 1) {
		// $('#payment_due_date').closest('.row').show();
	} else {
		// $('#payment_due_date').closest('.row').hide();
	}
}
$(document).on('click', '.settlement_input, .settlement_input2 ', function () {
	this.select();
})

$(document).on('blur', '.settlement_input', function () {
	$(this).val(cnv_Float(this.value));
	fillRemaining();
})
$(document).on('blur', '.settlement_input2', function () {
	$(this).val(cnv_Float(this.value));
	fillRemaining2();
})
function fillRemaining() {
	var sub = 0;
	var total = cnv_Float($('#SALE_NET_TOTAL_INCL_VAT_WITH_ROUND_OFF').val());

	var advance = $('#adv_received').length;
	var invoiced = $('#so_process_settle_amount').length;
	if (advance) {
		var adv_received = cnv_Float($('#adv_received').val());
		total = cnv_Float(parseFloat(total) - parseFloat(adv_received));
	}

	if (invoiced) {
		var invoiced_amount = cnv_Float($('#so_process_settle_amount').val());
		total = cnv_Float(parseFloat(total) + parseFloat(invoiced_amount));
	}

	// setTimeout( () => {
	// if(total > parseFloat(this.value)){
	$('.settlement_input').each(function (index, item) {
		sub += parseFloat(cnv_Float(item.value));

		if (parseFloat(cnv_Float(item.value)) == '' || parseFloat(cnv_Float(item.value)) == 0) {
			var remaining = cnv_Float(parseFloat(total) - parseFloat(sub));
			$(item).val(cnv_Float(remaining));
			return;
		}
	})
	// }
	// },2000);
}
function fillRemaining2() {
	var sub = 0;
	var total = cnv_Float(remComa($('.net_inclvat').html()));

	// var advance = $('#adv_received').length;
	// var invoiced = $('#so_process_settle_amount').length;
	// if(advance){
	// 	var adv_received = cnv_Float($('#adv_received').val());
	// 	total = cnv_Float(parseFloat(total)-parseFloat(adv_received));
	// }

	// if(invoiced){
	// 	var invoiced_amount = cnv_Float($('#so_process_settle_amount').val()); 
	// 	total = cnv_Float(parseFloat(total) + parseFloat(invoiced_amount));
	// }

	// setTimeout( () => {
	// if(total > parseFloat(this.value)){
	$('.settlement_input2').each(function (index, item) {
		sub += parseFloat(cnv_Float(item.value));

		if (parseFloat(cnv_Float(item.value)) == '' || parseFloat(cnv_Float(item.value)) == 0) {
			var remaining = cnv_Float(parseFloat(total) - parseFloat(sub));
			$(item).val(cnv_Float(remaining));
			return false;
		}
	})
	// }
	// },2000);
}

function selectStoreAuto(store_guid) {
	var is_converting_already_avaialble_store = $('#is_converting_already_avaialble_store').length;
	if (!is_converting_already_avaialble_store) {
		if (store_guid) {
			$('.select_store_guid').find('option').prop('disabled', true);
			$('.select_store_guid').find('option[value="' + store_guid + '"]').prop('disabled', false);
			$('.select_store_guid').find('option[value="' + store_guid + '"]').prop('selected', true);
		} else {
			$('.select_store_guid').find('option').prop('disabled', false);
			$('.select_store_guid').find('option[value="0"]').prop('selected', true);
		}

	}
	$('.select_store_guid').trigger('change');
}


$('body').on('hidden.bs.modal', function () {
	if ($('.modal.show').length > 0) {
		$('body').addClass('modal-open');
	}
});

function Robot() {
	this.name = Robot.makeId();
}

Robot.nums = Array.from({ length: 10 }, (_, i) => i);
Robot.chars = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
Robot.idmap = {};
Robot.makeId = function () {
	var text = Array.from({ length: 2 }, _ => Robot.chars[~~(Math.random() * 26)]).join("") +
		Array.from({ length: 3 }, _ => Robot.nums[~~(Math.random() * 10)]).join("");
	return !Robot.idmap[text] ? (Robot.idmap[text] = true, text) : Robot.makeId();
};
function appendOptions(select, data) {
	select.innerHTML = '';
	let selectedValue = $('#selected_pr_voucher').val();
	let defaultOption = document.createElement('option');
	defaultOption.value = '0';
	defaultOption.text = '-- Select --';
	select.appendChild(defaultOption);
	for (let id in data) {
		let option = document.createElement('option');
		option.value = id;
		option.text = data[id];
		if (id === selectedValue) {
			option.selected = true;
		}
		select.appendChild(option);
	}
}
function isValidBase64Json(str) {
	try {
		const jsonStr = atob(str);
		const obj = JSON.parse(jsonStr);
		return obj && typeof obj === 'object' && !Array.isArray(obj);
	} catch (e) {
		return false;
	}
}
function IsJsonString(str) {
	try {
		var obj = JSON.parse(str);
		return obj;
	} catch (e) {
		return false;
	}
	return true;
}
function getCustomerDetailsRow(custID) {
	console.log(custID);
	if (!custID || parseInt(custID) == 0 || parseInt(custID) == NaN) {
		return;
	}
	var url = atob($('#customerDetailsRowURL').val());
	$.ajax({
		type: 'POST',
		url: url,
		dataType: 'text',
		data: { customer_guid: custID },
		success: function (data) {
			$('#customer-details-row-div').html(data);
		}
	})
}
function getCustomerFinancialDetailsTable(custID) {
	if (!custID || parseInt(custID) == 0 || parseInt(custID) == NaN) {
		return;
	}
	var url = atob($('#customerFinancialDetailsTableURL').val());
	$.ajax({
		type: 'POST',
		url: url,
		dataType: 'text',
		data: { customer_guid: custID },
		success: function (data) {
			$('#financial-details-tab').html(data);
		}
	})
}

$(document).on('click', 'a[href="#customer-txn"]', function () {
	var customerID = $('#modalform').find('input[name="customer_id"]').val();
	if (customerID) {
		getCustomerDetailsRow(customerID);
		getCustomerFinancialDetailsTable(customerID);
	}
})


function openBusinessDetailsModal(obj) {
	if (obj.checked == true) {
		enableBusinessDetails(obj)
	} else {

	}
}
function enableBusinessDetails(obj) {
	// showBusinessModal(obj);
}

// function showBusinessModal(obj){
// 	var action = "";
// 	var hidefooter = 0;
// 	var siteurl = $(obj).attr('data-url');
// 	var id = $(obj).attr('data-id');
// 	var title = $(obj).attr('data-title');
// 	var param = $(obj).attr('data-param');
// 	if($(obj).attr('data-action')){
// 		action = $(obj).attr('data-action');
// 	}
// 	var url = atob(siteurl);
// 	preloader_on();
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200) {
// 			preloader_off();
// 			openBusinessDetailsModalBody(this.responseText);
// 			$('#businessinnerform').attr('action',action);
// 			// $('#innerModalLabel').html(title);
// 		}
// 	};
// 	xmlhttp.open("GET", url+"?jsondata=" + param, true);
// 	xmlhttp.send();
// }

// function openBusinessDetailsModalBody(body) {
// 	var exampleModal = getModal();
// 	if (!exampleModal) { exampleModal = initModal(); }

// 	var html =` <div class="modal-header">
// 					<h5 class="modal-title" id="">Business Details</h5>
// 					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
// 					<span aria-hidden="true">&times;</span>
// 					</button>
// 					</div><form method="post" id="business_inner_form" >
// 					<input type="hidden" name="business_inner_form" value="1">
// 					<div class="modal-body">${body}</div>
// 					<div class="modal-footer">
// 						<button class="btn  btn-success" name="businessinnersaveBtn" id="businessinnersaveBtn" type="button" >
// 							<i class="fa fa-plus-circle"></i> Save 
// 						</button>
// 						<button class="btn  btn-danger businessInnerCloseBtn"  type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>
// 					</div>
// 				</form> `;
// 	setModalContent(html);
// 	jQuery(exampleModal).modal('show');
// }

$(document).on('keyup', '.ts_acc_group', function () {
	result_acc_group();
});
$(document).on('change', '#prefilwithzero_acc_group', function () {
	result_acc_group();
});

function result_acc_group() {
	var start_num = $("#start_num_acc_group").val();
	var total_digit = $("#total_digit_acc_group").val();
	var prefix = $("#prefix_acc_group").val();
	// var suffix = $("#suffix").val();
	var prefilwithzero = $("#prefilwithzero_acc_group").find('option:selected').val();
	var new_start_num = '';
	console.log(prefilwithzero);
	if (prefilwithzero == '1' && start_num != '') {
		new_start_num = prependZeros_acc_group(start_num, total_digit);
	}
	if (new_start_num == '' && start_num != '') {
		new_start_num = start_num;
	}
	var result = prefix + new_start_num;// prefix+new_start_num+suffix;
	$("#result_acc_group").val(result);
}

function prependZeros_acc_group(num, digit) {
	if (num == '' || digit == '') {
		return '';
	}
	var str = ("" + num);
	var digit = parseInt(digit) + parseInt(1);
	return (Array(Math.max(digit - str.length, 0)).join("0") + str);
}
function EnableAutoCode_acc_group(obj) {
	if (obj.value == 1) {
		$('.accc-group-code1').removeClass('d-none');
	} else {
		$('.accc-group-code1').addClass('d-none');
	}
}

function vehicle_policy_form(data) {
	var insurancep = "";
	var start_date = "";
	var end_date = "";
	var policy_number = "";
	var amount = "";
	var broker_percent = "";
	var id = $(data).val();
	if (document.getElementById('id_insurancep' + id)) {
		insurancep = $('#id_insurancep' + id).val();
		start_date = $('#id_start_date' + id).val();
		end_date = $('#id_end_date' + id).val();
		policy_number = $('#id_policy_number' + id).val();
		amount = $('#id_amount' + id).val();
		broker_percent = $('#id_broker_percent' + id).val();
	}
	var exampleModal = getModal();
	if (!exampleModal) { exampleModal = initModal(); }
	var option = optionInput();
	body = `<div class="row">
	<div class="col-sm-12">
	<lable>Insurance Provider</lable>
	<select id="insurancep" class="form-control">
		<option value="">Select One</option>
		${option}
		
	</select>
	
	</div>
	<div class="col-sm-6">
	<lable>Coverage From</lable>
	<input type="date" id="start_date" class="form-control" value="${start_date}">
	</div>
	<div class="col-sm-6">
	<lable>Coverage To</lable>
	<input type="date" id="end_date" class="form-control" value="${end_date}">
	</div>
	<div class="col-sm-6">
	<lable>Policy Number</lable>
	<input type="text" id="policy_number" class="form-control" value="${policy_number}">
	</div>
	<div class="col-sm-6">
	<lable>Amount</lable>
	<input type="number" step="0.1" id="amount" class="form-control" value="${amount}">
	</div>
	<div class="col-sm-6">
	<lable>Broker Percentage(%)</lable>
	<input type="number" step="0.1" id="broker_percent" class="form-control" value="${broker_percent}">
	</div>
	</div>`;

	var html = '<div class="modal-header">' +
		'<h5 class="modal-title" id="innerModalLabel">Add Policy</h5>' +
		'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
		'<span aria-hidden="true">&times;</span>' +
		'</button>' +
		'</div><form method="post" class="innerform" id="innerform" ><input type="hidden" name="inner_form" value="1">' +
		'<div class="modal-body">' + body + '</div>' +
		'<div class="modal-footer">' +
		'<button class="btn  btn-success" value="' + $(data).val() + '"  type="button" onclick="return erp_set_field_policy(this)" ><i class="fa fa-plus-circle"></i> Save </button>' +
		'<button class="btn  btn-danger innerCloseBtn" name="ResetData" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
		'</div></form>';
	setModalContent(html);
	jQuery(exampleModal).modal('show');
	$('#insurancep').val(insurancep);

}
function optionInput() {
	var siteurl = $('#siteurl').val();
	var option = '';
	$.ajax({
		type: 'POST',
		async: false,
		url: siteurl + '/site/vendors/get_data.php',
		dataType: 'json',
		data: { is_insurance_company: 1, type: 1 },
		success: function (data) {
			$.each(data, function (i, v) {
				option += '<option value="' + v.id + '">' + v.label + '</option>';
			});
		}
	});

	return option;
}
function erp_set_field_policy(data) {
	var id = $(data).val();
	insurancep = $('#insurancep').val();
	start_date = $('#start_date').val();
	end_date = $('#end_date').val();
	policy_number = $('#policy_number').val();
	amount = $('#amount').val();
	broker_percent = $('#broker_percent').val();
	if (document.getElementById('id_insurancep' + id)) {
		//old update
		$('#id_insurancep' + id).val(insurancep);
		$('#id_start_date' + id).val(start_date);
		$('#id_end_date' + id).val(end_date);
		$('#id_policy_number' + id).val(policy_number);
		$('#id_amount' + id).val(amount);
		$('#id_broker_percent' + id).val(broker_percent);
	}
	else {
		//new add
		body = `
		<input type="hidden" id="id_insurancep${id}" name="policy_inurance_provider[]" class="form-control" value="${insurancep}">
		<input type="hidden" id="id_start_date${id}" name="policy_start_date[]" class="form-control" value="${start_date}">
		<input type="hidden" id="id_end_date${id}" name="policy_last_date[] "class="form-control" value="${end_date}">
		<input type="hidden" id="id_policy_number${id}" name="policy_number[]" class="form-control" value="${policy_number}">
		<input type="hidden"  id="id_amount${id}" name="policy_amount[]" class="form-control" value="${amount}">
		<input type="hidden"  id="id_broker_percent${id}" name="policy_broker_percentage[]" class="form-control" value="${broker_percent}">
		`;
		$('#policy_info').append(body);
	}

	$('.innerCloseBtn').trigger('click');
}

function erp_toggle_vendor_insurance_tabs(obj) {
	if ($(obj).is(':checked')) {
		$('.atabs[href="#tab-commision"]').closest('li').show();
		$('.atabs[href="#tab-insurance-service"]').closest('li').show();
	} else {
		$('.atabs[href="#tab-commision"]').closest('li').hide();
		$('.atabs[href="#tab-insurance-service"]').closest('li').hide();
	}
}
// $(function() {

$(document).on("mouseenter mouseleave", ".notation-icon", function (e) {
	var id = $(this).attr('data-id');
	var target = $(this).attr('data-target') || 'icon_table';
	if (e.type === "mouseenter") {
		$('#' + target + '_' + id).removeClass('d-none');
		$(this).closest("td").css("z-index", "33");
	} else if (e.type === "mouseleave") {
		$('#' + target + '_' + id).addClass('d-none');
		$(this).closest("td").css("z-index", "1");
	}
});
// $(document).on("click", ".btaction", function(e) {
// 	if (e.type === "click") {
// 		$(this).closest("td").css("z-index", "5");
// 	}

// });
// });
// $(document).on('click', '.btaction', function(e) {
//     e.stopPropagation();
//     $('td').removeClass('zindex-top');
//     $(this).closest('td').addClass('zindex-top');
// });

// $(document).on('click', function(e) {
//     const isInsideBtn = $(e.target).closest('.btaction').length;
//     if (!isInsideBtn) {
//         $('td').removeClass('zindex-top');
//     }
// });

$(document).on('click', '.btaction', function (e) {
	e.preventDefault();
	e.stopPropagation();

	const $td = $(this).closest('td');

	// Only proceed if this is inside a td
	if ($td.length) {
		const $dropdown = $td.find('.dropdown-menu').first();
		const isVisible = $dropdown.is(':visible');

		// Hide all dropdowns inside td only
		$('td .dropdown-menu').hide();
		$('td').removeClass('zindex-top');

		// Toggle current dropdown if it was not visible
		if (!isVisible) {
			$dropdown.show();
			$td.addClass('zindex-top');
		}
	}
});

// Hide td dropdowns when clicking outside
$(document).on('click', function () {
	$('td .dropdown-menu').not('.multiselect-container').hide();
	$('td').removeClass('zindex-top');
});

$(document).ready(function () {
	$('td .btaction[data-toggle="dropdown"]').each(function () {
		$(this).removeAttr('data-toggle')
			.removeAttr('aria-haspopup')
			.removeAttr('aria-expanded');
	});
});



var onlineFunc = function fnShowImOnline() {
	var url = atob($('#im-online').val());
	// $.get(url);
	$.ajax({
		url: url,
		method: 'GET',
		// data: { query: query },
		// headers: {
		//   'Connection': 'keep-alive'
		//   // Add other headers as needed
		// },
		success: function (data) {
			// Handle the successful response
			//   console.log(data);
		},
	});
}
$(document).ready(function () {
	onlineFunc();
});
// setTimeout(() =>  onlineFunc() , 1000);
interval = setInterval(function () {
	// clearInterval(interval);
	onlineFunc();
}, 60000);

function add_table_row_from_template(obj, funcName = '') {
	var $table = $(obj).closest('table');
	var $tbody = $table.find('tbody');
	var slno = $tbody.find('tr').length;

	var $html = $table.find('.row-template').clone().removeClass('row-template hidden');
	$.each($html.find('td'), function (i, el) {
		$(el).find('select').attr('name', $(el).find('select').data('name'));
		$(el).find('input').attr('name', $(el).find('input').data('name'));
		$(el).find('textarea').attr('name', $(el).find('textarea').data('name'));
	});
	$html.find('.slno').text(slno);
	$table.find('tbody').append($html);

	if (funcName != '') {
		window[funcName]($html);
	}
}

function erp_table_add_row_from_template(obj, funcName = '') {
	var $table = $(obj).closest('table');
	var $tbody = $table.find('tbody');
	var slno = $tbody.find('tr').length;
	var ms = Date.now();

	var $html = $table.find('.row-template').clone().removeClass('row-template hidden');

	$html.find('input, select, textarea').each(function () {
		if ($(this).data('name')) {
			var name = `${$(this).data('arr')}[${ms}][${$(this).data('name')}]`
			$(this).attr('name', name);
		}
	});

	$html.find('.slno').text(slno);
	$html.find('.datepicker').each(function () {
		var min = $(this).data('min');
		var max = $(this).data('max');
		$(this).datepicker({
			autoclose: true,
			format: 'dd-mm-yyyy',
			todayHighlight: true,
			startDate: min,
			endDate: max,
		});
	});

	$table.find('tbody').append($html);

	if (funcName != '') {
		window[funcName]($html);
	}
}

function erp_create_modal(url, data, options = {}) {
	let ms = Date.now();
	var id = 'DynamicModal_' + ms;
	var width = options.width || 60;
	var fixed_width = options.fixed_width || 0;
	var height = options.height || 'auto';
	var title = options.title || '';
	var paddingTop = typeof (options.paddingTop) !== 'undefined' ? options.paddingTop : 16;
	var padding = typeof (options.padding) !== 'undefined' ? options.padding : 16;
	var save_print_btn = options.save_print_btn || 0;
	// C:\xampp\htdocs\codex\resources\views\accounting\suppliers\pages\opening_bills_form.blade.php
	site_url = "opening_bills_form"
	$.ajaxSetup({ async: false });
	$.post(site_url , data, function (res) {
		var html =
			'<form method="post" enctype="multipart/form-data" id="Form_' + ms + '">' +
			'<div class="modal-header">' +
			'<h5 class="modal-title title">' + title + '</h5>' +
			'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
			'</div>' +
			`<div class="modal-body" style="min-height:${height}; padding-top:${paddingTop}px; padding:${padding}px">${res}</div>` +
			'<div class="modal-footer">';
		if (save_print_btn) {
			html += '<button class="btn btn-success saveBtn" type="button" data-print="1"><i class="fa fa-plus-circle"></i> Save & Print </button>';
		}
		html += '<button class="btn btn-success saveBtn" type="button"><i class="fa fa-plus-circle"></i> Save </button>' +
			'<button class="btn btn-danger closeBtn" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
			'</div>' +
			'</form>';

		var zindex = $('.modal-backdrop').last().css('z-index');
		zindex = parseInt(zindex);

		var modal = document.createElement('div');
		modal.classList.add('modal', 'fade', 'DynamicModal');
		modal.setAttribute('id', id);
		modal.setAttribute('tabindex', '-1');
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('data-backdrop', 'static');
		modal.setAttribute('data-keyboard', 'false');
		modal.setAttribute('aria-labelledby', 'exampleModalLabel');
		modal.setAttribute('aria-hidden', 'true');
		modal.innerHTML =
			`<div class="modal-dialog" style="min-width:${width}%; ${fixed_width ? 'width:' + fixed_width + 'px;' : ''}" role="document">
			  <div class="modal-content">${html}</div>
			</div>`;
		document.body.appendChild(modal);

		$(modal).modal('show');
		$('#' + id).on('shown.bs.modal', function () {
			$('#' + id).css('z-index', (zindex + 11));
		});

		$('#' + id).on('hidden.bs.modal', function () {
			$(this).remove();
		});

		var plugins = (options.plugins) ? (options.plugins).split(',') : [];

		if (plugins.includes('selectize')) {
			$.each($('#' + id).find('.selectize-field'), function (i, e) {
				var create = $(e).data('create') || false;
				$(e).selectize({ create: create });
			});
		}

		if (plugins.includes('tinymce')) {
			// tinymce.remove();
			tinymce.init({
				selector: '.tinymce-field',
				init_instance_callback: function (editor) {
					$('.tox .tox-notification--in').hide();
					// if(freeTiny.length){
					// 	freeTiny.style.display = 'none';
					// }
				},
				setup: function (editor) {
					editor.on('change', function () {
						tinymce.triggerSave();
					});
				}
			});
		}

		if (plugins.includes('multiselect')) {
			$('.multiselect-field').multiselect({
				buttonWidth: '100%',
				maxHeight: 200,
				enableFiltering: true,
				numberDisplayed: 1,
				enableCaseInsensitiveFiltering: true,
				buttonText: function (options, select) {
					if (options.length === 0) {
						return $(this).data('placeholder') || 'Select';
					}
					return options.length + ' item(s) selected';
				}
			});
		}

		$('#' + id).find('.datepicker').each(function () {
			var min = $(this).data('min');
			var max = $(this).data('max');
			$(this).datepicker({
				autoclose: true,
				format: 'dd-mm-yyyy',
				todayHighlight: true,
				startDate: min,
				endDate: max,
			});
		});
	});
	return id;
}

function erp_create_modal_from_html(html = '', options = {}) {
	var id = 'DynamicModal_' + Date.now();
	var width = options.width || 95;
	var fixed_width = options.fixed_width || 0;
	var height = options.height || 'auto';
	var button_size = options.button || 'normal';
	var hideSaveBtn = options.hideSaveBtn;
	var hideCloseBtn = options.hideCloseBtn;

	var button_class = '';
	if (button_size == 'small') {
		button_class = 'btn-sm';
	}

	var html = `<div class="modal-dialog" style="min-width:${width}%; ${fixed_width ? 'width:' + fixed_width + 'px;' : ''}" role="document">
					<div class="modal-content">
						<div class="modal-body" style="min-height:${height}">
							${html}
						</div>
						<div class="modal-footer">
							<button class="btn ${button_class} btn-success saveBtn ${hideSaveBtn ? 'hidden' : ''}" type="button"><i class="fa fa-plus-circle"></i> Save </button>
							<button class="btn ${button_class} btn-danger closeBtn ${hideCloseBtn ? 'hidden' : ''}" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>
						</div>
					</div>
				</div>`;

	var zindex = $('.modal-backdrop').last().css('z-index');
	zindex = parseInt(zindex);

	var modal = document.createElement('div');
	modal.classList.add('modal', 'fade', 'DynamicModal');
	modal.setAttribute('id', id);
	modal.setAttribute('tabindex', '-1');
	modal.setAttribute('role', 'dialog');
	modal.setAttribute('data-backdrop', 'static');
	modal.setAttribute('data-keyboard', 'false');
	modal.setAttribute('aria-labelledby', 'exampleModalLabel');
	modal.setAttribute('aria-hidden', 'true');
	modal.innerHTML = html;
	document.body.appendChild(modal);
	$modal = $(modal);

	$modal.modal('show');
	$modal.on('shown.bs.modal', function () {
		$modal.css('z-index', (zindex + 11));
	});

	$modal.on('hidden.bs.modal', function () {
		$(this).remove();
	});

	return $modal;
}

function erp_customer_vehicle_form(vehicle_id = 0, customer_guid = '', obj = '') {
	if (customer_guid == '') {
		customer_guid = $('#customer_guid').val();
		// 	if(customer_guid <= 0){
		// 		errormsg('Select a customer first.');
		// 		return;
		// 	}
	}

	// url = 'site/vendors/vehicles_form/form.php';
	// data = { id:vehicle_id, customer_guid:customer_guid };
	// erp_create_modal(url, data);
	// return;

	var siteurl = $('#siteurl').val();

	var onclick = (obj == '') ? 'erp_set_field_vehicle(this)' : $(obj).data('onclick');

	let ms = Date.now();
	var id = 'vehicleModal_' + ms;

	$.ajaxSetup({ async: false });
	$.post(siteurl + 'site/vendors/vehicles_form/form.php', { id: vehicle_id, customer_guid: customer_guid }, function (data) {
		var html =
			'<form method="post">' +
			'<div class="modal-header">' +
			'<h5 class="modal-title">Vehicle Form</h5>' +
			'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
			'</div>' +
			'<div class="modal-body">' + data + '</div>' +
			'<div class="modal-footer">' +
			'<button class="btn btn-success saveBtn" type="button" onclick="return ' + onclick + '" ><i class="fa fa-plus-circle"></i> Save </button>' +
			'<button class="btn btn-danger" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
			'</div>' +
			'</form>';

		var zindex = $('.modal-backdrop').last().css('z-index');
		zindex = parseInt(zindex);

		var modal = document.createElement('div');
		modal.classList.add('modal', 'fade', 'vehicleModal');
		modal.setAttribute('id', id);
		modal.setAttribute('tabindex', '-1');
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('data-backdrop', 'static');
		modal.setAttribute('data-keyboard', 'false');
		modal.setAttribute('aria-labelledby', 'exampleModalLabel');
		modal.setAttribute('aria-hidden', 'true');
		modal.innerHTML =
			'<div class="modal-dialog" style="min-width:60%;" role="document">' +
			'<div class="modal-content">' + html + '</div>' +
			'</div>';
		document.body.appendChild(modal);

		$(modal).modal('show');
		$('#' + id).on('shown.bs.modal', function () {
			$('#' + id).css('z-index', (zindex + 11));
		});

		$.each($('#' + id).find('.selectize-field'), function (i, e) {
			var type = $(e).attr('name');
			var create = $(e).data('create');
			$(e).selectize({
				valueField: 'value',
				labelField: 'name',
				searchField: 'name',
				options: [],
				create: create,
				load: function (query, callback) {
					if (!query.length) return callback();
					if (type == 'year') return callback();
					$.ajax({
						url: siteurl + 'site/customer-vehicle/get_data.php',
						type: 'GET',
						dataType: 'json',
						data: { query: query, type: type },
						error: function () {
							callback();
						},
						success: function (res) {
							callback(res);
						}
					});
				}
			});
		});
	});
	return id;
}

function erp_set_field_vehicle(obj) {
	var $form = $(obj).closest('form');
	var reg_no = $form.find('input[name="reg_no"]').val();
	if (reg_no == '') {
		errormsg('Enter registration number');
		return;
	}

	var formData = $form.serialize();
	var input = '<input type="hidden" name="vehicles[]" value="' + formData + '" />';
	$modal = $(obj).closest('.vehicleModal');
	$('.new_vehicles').append(input);
	successmsg('Data added to the form.');
	$modal.modal('hide');
}

function erp_save_vehicle(obj) {
	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.vehicleModal');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/vendors/vehicles_form/save.php';

	var formData = $form.serialize();
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			successmsg(result.successmsg);
			$modal.modal('hide');
		} else {
			errormsg(result.errormsg);
		}
	});
}

function erp_customer_vehicle_delete(id, obj) {
	if (window.confirm('Are you sure ? This cannot be undone!')) {
		var siteurl = $('#siteurl').val();
		$.post(siteurl + 'site/customer-vehicle/delete.php', { id: id }, function (res) {
			if (res.success) {
				$(obj).closest('tr').remove();
				successmsg('Vehicle deleted successfully.');
			} else {
				errormsg(res.msg);
			}
		});
	}
}

function get_customer_vehicles(customer_guid) {
	var siteurl = $('#siteurl').val();
	var result = [];
	$.ajax({
		type: 'POST',
		url: siteurl + 'site/vendors/get_related_vehicles.php',
		dataType: 'json',
		data: { customer_guid: customer_guid },
		async: false,
		success: function (data) {
			result = data;
		}
	});
	return result;
}

function get_related_peoples(customer_guid) { }

function get_insurance_item_td(data, rowID, name, customer_guid = 0, edit_page = 'edit') {
	var menu_insurance_management = parseInt($('#menu_insurance_management').val());
	if (!menu_insurance_management) return '';

	var siteurl = $('#siteurl').val();
	var customer_guid = $('#customer_guid').val();
	var td_1 = td_2 = td_3 = '';
	// if(data.is_endorse){
	// switch(data.insurance_type){
	// 	case 'motor':
	// 		var beneficiaries = `<select class="form-control form-control-sm" name="${name}[${rowID}][endorse]">
	// 								<option value="1">Endorse & Continue</option>
	// 								<option value="1">Endorse & Continue</option>
	// 							</select>`;

	// 		td_1 = `${beneficiaries}<a href="#" onclick="vehicle_insurance_beneficiary_form('${rowID}')"><i class="fa fa-plus"></i> Or Add Vehicle</a>`;
	// 		break;
	// }
	if (data.is_endorse != 1) {
		switch (data.insurance_type) {
			case 'motor':
				if (edit_page == 'edit') {
					var beneficiaries = `<select class="form-control form-control-sm" id="insurance_beneficiary_id_${rowID}" name="${name}[${rowID}][insurance_beneficiary_id]" onchange="erp_set_insurance_coverage_dates(this);erp_check_pending_enquiry_for_vehicle(this);">
											<option value="0">Select Vehicle</option>`;
					var list = get_customer_vehicles(customer_guid);
					$.each(list, function (i, d) {
						beneficiaries += `<option value="${d.id}" data-req-count="${d.req_count}" data-refs="${d.refs}" data-policy-expiry="${d.policy_last_date}">${d.model} - ${d.reg_no}</option>`;
					});

					// $.ajax({
					// 	type:'POST',
					// 	url:siteurl + 'site/vendors/get_related_vehicles.php',
					// 	dataType:'json',
					// 	data:{ customer_guid:customer_guid },
					// 	async:false,
					// 	success:function(data){
					// 		$.each(data, function(i,d) {
					// 			beneficiaries += `<option value="${d.id}" data-req-count="${d.req_count}" data-refs="${d.refs}" data-policy-expiry="${d.policy_last_date}">${d.model} - ${d.reg_no}</option>`;
					// 		});
					// 	}
					// });
					beneficiaries += `</select>`;

					td_1 = `${beneficiaries}<a href="#" onclick="vehicle_insurance_beneficiary_form('${rowID}')"><i class="fa fa-plus"></i> Or Add Vehicle</a>`;
				} else {
					td_1 = `Vehicle : <br>`;
					td_1 += `<a href="#" onclick="vehicle_insurance_beneficiary_form(${rowID}, ${data.beneficiary_id})">${data.vehicle_model} - ${data.vehicle_reg_no}</a>`;
					td_1 += `<input type="hidden" name="${name}[${rowID}][insurance_beneficiary_id]" value="${data.insurance_beneficiary_id}">`;
				}
				td_2 = `<a href="#" onclick="accident_history_form(${rowID}, ${data.beneficiary_id})">Accident History</a><br>
						<a href="#" onclick="insurance_attachments_form(${rowID}, ${data.beneficiary_id}, '${data.insurance_type}')">Attachments</a><br>
						<a href="#" onclick="insurance_services_form(${rowID}, ${data.policy_id})">Insurance Services</a>`;
				break;

			case 'health':
				var beneficiaries = `<select class="form-control form-control-sm" id="insurance_beneficiary_id_${rowID}" name="${name}[${rowID}][insurance_beneficiary_id]">
										<option value="0">Select Beneficiary</option>`;
				$.ajax({
					type: 'POST',
					url: siteurl + 'site/vendors/get_related_peoples.php',
					dataType: 'json',
					data: { customer_guid: customer_guid },
					async: false,
					success: function (data) {
						$.each(data, function (i, d) {
							beneficiaries += `<option value="${d.id}">${d.firstname}</option>`;
						});
					}
				});
				beneficiaries += `</select>`;

				td_1 = `${beneficiaries}<a href="#" onclick="health_insurance_beneficiary_form('${rowID}')"><i class="fa fa-plus"></i> Or Add New</a>`;
				td_2 = `<a href="#" onclick="medical_history_form('${rowID}')">Medical History</a><br>
						<a href="#" onclick="insurance_attachments_form('${rowID}')">Attachments</a><br>
						<a href="#" onclick="insurance_services_form(${rowID})">Insurance Services</a>`;
				break;

			case 'fire':
				td_1 = `<a href="#" onclick="fire_insurance_beneficiary_form('${rowID}')">Fire Policy Details</a>
						<input type="hidden" id="fire_insurance_policy_${rowID}" name="${name}[${rowID}][fire_insurance_policy]">`;
				td_2 = `<p class="mb-0">Interest</p>
						<input type="text" class="form-control form-control-sm" name="${name}[${rowID}][marine_interest]" style="width:120px">`;
				break;

			case 'marine':
				td_1 = `<p class="mb-0 left">Voyage From</p>
						<input type="text" class="form-control form-control-sm" name="${name}[${rowID}][voyage_from]" style="width:120px">
						<p class="mb-0 left">Voyage To</p>
						<input type="text" class="form-control form-control-sm" name="${name}[${rowID}][voyage_to]" style="width:120px">`;
				td_2 = `<p class="mb-0">Policy Type</p>
						<input type="text" class="form-control form-control-sm" name="${name}[${rowID}][coverage]" style="width:120px">`;
				break;

			case 'general':
				td_2 = `<p class="mb-0">Policy Type</p>
						<input type="text" class="form-control form-control-sm" name="${name}[${rowID}][coverage]" style="width:120px">`;
				break;
		}
	}

	// var insurance_startdate = (data.insurance_expiry) ? new Date(data.insurance_expiry) : new Date();
	// // insurance_startdate = new Date(insurance_startdate);
	// if(data.insurance_expiry){
	// 	// insurance_startdate = new Date(data.insurance_expiry);
	// 	if(insurance_startdate < new Date()){
	// 		insurance_startdate = new Date();
	// 	} else {
	// 		insurance_startdate = insurance_startdate.setDate(insurance_startdate.getDate() + 1);
	// 	}
	// }

	if (data.insurance_expiry) {
		insurance_startdate = new Date(data.insurance_expiry);
		if (insurance_startdate < new Date()) {
			insurance_startdate = new Date();
		} else {
			insurance_startdate.setDate(insurance_startdate.getDate() + 1);
		}
	} else {
		insurance_startdate = new Date();
	}

	var insurance_expiry = new Date(insurance_startdate);
	insurance_expiry.setFullYear(insurance_expiry.getFullYear() + 1);
	insurance_expiry.setDate(insurance_expiry.getDate() - 1);

	if (data.is_endorse != 1 && data.insurance_type != 'marine') {
		// td_3 = `<p class="mb-0">Coverage Starts From</p>
		// 		<input type="text" class="insurance_dates insurance_startdate" name="${name}[${rowID}][insurance_startdate]" value="${erp_format_date(insurance_startdate, 'dd/mm/yyyy')}" style="width:120px">
		// 		<p class="mb-0">Coverage Expiry</p>
		// 		<input type="text" class="insurance_dates insurance_expiry" name="${name}[${rowID}][insurance_expiry]" value="${erp_format_date(insurance_expiry, 'dd/mm/yyyy')}" style="width:120px">
		// 		<p class="mb-0 hidden">Ins. Period (in years)</p>
		// 		<input type="number" class="hidden" name="${name}[${rowID}][insurance_period]" style="width:120px" value="1" onfocus="select()">`;
		td_3 = `<p class="mb-0">Coverage Starts From</p>
				<input type="text" class="insurance_dates" data-target="insurance_startdate" value="${erp_format_date(insurance_startdate, 'dd/mm/yyyy')}" onkeydown="return false;" onchange="erp_set_insurance_expiry(this)" style="width:120px">
				<p class="mb-0">Coverage Expiry</p>
				<input type="text" class="insurance_dates" data-target="insurance_expiry" value="${erp_format_date(insurance_expiry, 'dd/mm/yyyy')}" onkeydown="return false;" style="width:120px">
				<p class="mb-0 hidden">Ins. Period (in years)</p>
				<input type="number" class="hidden" name="${name}[${rowID}][insurance_period]" style="width:120px" value="1" onfocus="select()">
				<input type="hidden" class="insurance_startdate" name="${name}[${rowID}][insurance_startdate]" value="${erp_format_date(insurance_startdate)}">
				<input type="hidden" class="insurance_expiry" name="${name}[${rowID}][insurance_expiry]" value="${erp_format_date(insurance_expiry)}">`;
	}

	html = `<td class="center">
				${td_1}
			</td>
			<td>
				${td_2}
			</td>
			<td>
			 	${td_3}
				<input type="hidden" id="insurance_type_${rowID}" name="${name}[${rowID}][insurance_type]" value="${data.insurance_type}">
				<input type="hidden" name="${name}[${rowID}][renewal_ref]" value="${data.policy_id}">
				<input type="hidden" id="insurance_services_${rowID}" name="${name}[${rowID}][insurance_services]" value="${data.insurance_services}">
				<input type="hidden" name="${name}[${rowID}][is_insurance]" value="${data.is_insurance}">
			</td>
			<td>
				<input type="number" class="form-control form-control-sm" name="${name}[${rowID}][sum_insured]" value="${data.sum_insured}">
			</td>`;

	return html;
}


/* Health Insurance */

function health_insurance_beneficiary_form(rowID, beneficiary_id = 0) {
	var customer_guid = $('#customer_guid').val();
	if (customer_guid <= 0) {
		errormsg('Select a customer first.');
		return;
	}
	var siteurl = $('#siteurl').val();
	preloader_on();
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			preloader_off();
			$('#plusModal').modal('show');
			$('.plusmodal-dialog').css('width', '80%');
			$('#plusmodal_title').html('');
			$('#plussaveBtn').html('<i class="fa fa-plus-circle"></i> Save');
			$('#plusformDiv').html(this.responseText);
			$('#plussaveBtn').attr('onclick', 'save_health_insurance(this, "' + rowID + '")');
		}
	};
	xmlhttp.open("GET", siteurl + "site/vendors/health_form.php?id=" + beneficiary_id, true);
	xmlhttp.send();
}

function save_health_insurance(obj, rowID) {
	var $form = $(obj).closest('form');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/vendors/health_form/save.php';
	var customer_guid = $('#customer_guid').val();

	var formData = $form.serialize();
	formData = formData + '&customer_guid=' + customer_guid;
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			$select = $('#insurance_beneficiary_id_' + rowID);
			$select.append('<option value="' + result.id + '" selected>' + result.firstname + '</option>');
			$select.val(result.id).trigger('change');
			successmsg(result.successmsg);
			$('#plusModal').modal('hide');
		} else {
			errormsg(result.errormsg);
		}
	});
}

function medical_history_form(rowID, beneficiary_id = '') {
	if (beneficiary_id == '') {
		beneficiary_id = $('#insurance_beneficiary_id_' + rowID).val();
		if (beneficiary_id == '0') {
			errormsg('Add or select a beneficiary first');
			return;
		}
	}
	var siteurl = $('#siteurl').val();
	preloader_on();
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			preloader_off();
			$('#plusModal').modal('show');
			$('.plusmodal-dialog').css('width', '80%');
			$('#plusmodal_title').html('');
			$('#plussaveBtn').html('<i class="fa fa-plus-circle"></i> Save');
			$('#plusformDiv').html(this.responseText);
			//			$('#plusformDiv').find('insurance_beneficiary_id_' + rowID).val(insurance_beneficiary_id)
			$('#plussaveBtn').attr('onclick', 'save_medical_history(this, "' + rowID + '")');
		}
	};
	xmlhttp.open("GET", siteurl + "site/insurance_masters/medical_history_form.php?people_id=" + beneficiary_id, true);
	xmlhttp.send();
}

function save_medical_history(obj, rowID) {
	var $form = $(obj).closest('form');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/vendors/health_form/save_medical_history.php';
	var customer_guid = $('#customer_guid').val();

	var formData = $form.serialize();
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			successmsg(result.successmsg);
			$('#plusModal').modal('hide');
		} else {
			errormsg(result.errormsg);
		}
	});
}

/* Motor Insurance */

function vehicle_insurance_beneficiary_form(rowID, vehicle_id = 0, customer_guid = '') {
	if (customer_guid == '') {
		$selector = ($('#customer_id').length) ? $('#customer_id') : $('#customer_guid');
		customer_guid = $selector.val();
		if (customer_guid <= 0) {
			errormsg('Select a customer first.');
			return;
		}
	}

	var modal = erp_customer_vehicle_form(vehicle_id, customer_guid);
	$('#' + modal).find('.saveBtn').attr('onclick', 'save_vehicle(this, "' + rowID + '")');
}

function save_vehicle(obj, rowID) {
	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.vehicleModal');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/vendors/vehicles_form/save.php';
	// var customer_guid = $('#customer_guid').val();

	var formData = $form.serialize();
	// formData = formData + '&customer_guid=' + customer_guid;
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			$select = $('#insurance_beneficiary_id_' + rowID);
			$select.append('<option value="' + result.id + '" selected>' + result.model + ' - ' + result.reg_no + '</option>');
			$select.val(result.id).trigger('change');
			successmsg(result.successmsg);
			$modal.modal('hide');
		} else {
			errormsg(result.errormsg);
		}
	});
}

function accident_history_form(rowID, vehicleid = '') {
	if (vehicleid == '') {
		vehicleid = $('#insurance_beneficiary_id_' + rowID).val();
		if (vehicleid == '0') {
			errormsg('Add or select a vehicle first');
			return;
		}
	}

	var siteurl = $('#siteurl').val();
	$.ajaxSetup({ async: false });
	$.post(siteurl + "site/customer-vehicle/accident-history/form.php", { vehicleid: vehicleid }, function (data) {
		$('#plusModal').modal('show');
		$('.plusmodal-dialog').css('width', '80%');
		$('#plusmodal_title').html('');
		$('#plussaveBtn').html('<i class="fa fa-plus-circle"></i> Save');
		$('#plusformDiv').html(data);
		$('#plussaveBtn').attr('onclick', 'save_accident_history(this, "' + rowID + '")');
	});
	// preloader_on();
	// xmlhttp = new XMLHttpRequest();
	// xmlhttp.onreadystatechange = function() {
	// 	if (this.readyState == 4 && this.status == 200) {
	// 		preloader_off();
	// 		$('#plusModal').modal('show');
	// 		$('.plusmodal-dialog').css('width','80%');
	// 		$('#plusmodal_title').html('');
	// 		$('#plussaveBtn').html('<i class="fa fa-plus-circle"></i> Save');
	// 		$('#plusformDiv').html(this.responseText);
	// 		$('#plussaveBtn').attr('onclick','save_accident_history(this, "'+ rowID +'")');
	// 	}
	// };
	// xmlhttp.open("GET", siteurl+"site/insurance_masters/accident_history_form.php?vehicle_id=" + beneficiary_id, true);
	// xmlhttp.send();
}

function save_accident_history(obj, rowID) {
	var $form = $(obj).closest('form');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/customer-vehicle/accident-history/save.php';
	var customer_guid = $('#customer_guid').val();

	var formData = $form.serialize();
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			successmsg(result.successmsg);
			$('#plusModal').modal('hide');
		} else {
			errormsg(result.errormsg);
		}
	});
}

// function set_accident_history_field(obj, rowID){
// 	var $form = $(obj).closest('form');
// 	var formData = $form.serialize();

// 	$('#insurance_history_' + rowID).val(formData);
// 	$('#plusModal').modal('hide');
// }


/* Fire Insurance */

function erp_customer_building_form(building_id = 0) {
	var siteurl = $('#siteurl').val();
	var customer_guid = $('#customer_guid').val();

	let ms = Date.now();
	var id = 'buildingModal_' + ms;

	$.ajaxSetup({ async: false });
	$.post(siteurl + "site/insurance_masters/fire/building_form.php", { id: building_id, customer_guid: customer_guid }, function (data) {
		var html =
			'<form method="post">' +
			'<div class="modal-header">' +
			'<h5 class="modal-title">Add Building</h5>' +
			'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
			'</div>' +
			'<div class="modal-body">' + data + '</div>' +
			'<div class="modal-footer">' +
			'<button class="btn btn-success saveBtn" type="button" onclick="return erp_save_customer_building(this)" ><i class="fa fa-plus-circle"></i> Save </button>' +
			'<button class="btn btn-danger" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
			'</div>' +
			'</form>';

		var zindex = $('.modal-backdrop').last().css('z-index');
		zindex = parseInt(zindex);

		var modal = document.createElement('div');
		modal.classList.add('modal', 'fade', 'buildingModal');
		modal.setAttribute('id', id);
		modal.setAttribute('tabindex', '-1');
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('data-backdrop', 'static');
		modal.setAttribute('data-keyboard', 'false');
		modal.setAttribute('aria-labelledby', 'exampleModalLabel');
		modal.setAttribute('aria-hidden', 'true');
		modal.innerHTML =
			'<div class="modal-dialog" style="min-width:60%;" role="document">' +
			'<div class="modal-content">' + html + '</div>' +
			'</div>';
		document.body.appendChild(modal);

		$(modal).modal('show');
		$('#' + id).on('shown.bs.modal', function () {
			$('#' + id).css('z-index', (zindex + 11));
		});
	});

	return id;
}

function erp_save_customer_building(obj) {
	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.buildingModal');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/insurance_masters/fire/building_save.php';
	// var customer_guid = $('#customer_guid').val();

	var formData = $form.serialize();
	//		formData = formData + '&customer_guid=' + customer_guid;
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			$select = $('#building_id');
			$select.append('<option value="' + result.id + '" selected>' + result.address_1 + '</option>');
			$select.multiselect('rebuild');
			//			$select.val(result.id).trigger('change');
			successmsg(result.successmsg);
			$modal.modal('hide');
		} else {
			errormsg(result.errormsg);
		}
	});
}

function fire_insurance_beneficiary_form(rowID, policy_id = 0, edit_page = 1) {
	var customer_guid = $('#customer_guid').val();
	if (policy_id == 0 && customer_guid == 0) {
		errormsg('Select a customer first.');
		return;
	}
	url = 'site/insurance_masters/fire/fire_insurance_form.php';
	var modal = erp_create_modal(url, { policy_id: policy_id, customer_guid: customer_guid });
	$('#' + modal).find('.saveBtn').attr('onclick', 'set_fire_insurance_field(this, "' + rowID + '")');
	if (!edit_page) {
		$('#' + modal).find('.modal-footer').hide();
	}
	$('#' + modal).find('.building_ids').multiselect({
		buttonWidth: '100%',
		maxHeight: 200,
		buttonText: function (options, select) {
			if (options.length === 0) {
				return 'Select Building';
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
	// var siteurl = $('#siteurl').val();
	// preloader_on();
	// xmlhttp = new XMLHttpRequest();
	// xmlhttp.onreadystatechange = function() {
	// 	if (this.readyState == 4 && this.status == 200) {
	// 		preloader_off();
	// 		$('#plusModal').modal('show');
	// 		$('.plusmodal-dialog').css('width','80%');
	// 		$('#plusmodal_title').html('');
	// 		$('#plussaveBtn').html('<i class="fa fa-plus-circle"></i> Save');
	// 		$('#plusformDiv').html(this.responseText);
	// 		$('#plussaveBtn').attr('onclick','set_fire_insurance_field(this, "'+ rowID +'")');
	// 		$('#building_id').multiselect({
	// 			buttonWidth: '100%',
	// 			maxHeight: 200,
	// 			buttonText: function (options, select) {
	// 				if (options.length === 0) {
	// 					return 'Select Building';
	// 				} else {
	// 					var labels = [];
	// 					options.each(function () {
	// 						if($(this).attr('label') !== undefined) {
	// 							labels.push($(this).attr('label'));
	// 						} else {
	// 							labels.push($(this).html());
	// 						}
	// 					});
	// 					return labels.join(', ') + '';
	// 				}
	// 			}
	// 		});
	// 	}
	// };
	// xmlhttp.open("GET", siteurl+"site/insurance_masters/fire/fire_insurance_form.php?request_itemid="+ request_itemid +"&customer_guid="+customer_guid, true);
	// xmlhttp.send();
}

function set_fire_insurance_field(obj, rowID) {
	var $form = $(obj).closest('form');
	var building_id = $form.find('#building_id').val();
	if (building_id == '') {
		errormsg('Select building');
		return;
	}

	var formData = $form.serialize();
	// var input = '<input type="hidden" name="fire_insurance" value="'+ formData +'" />';
	// $modal = $(obj).closest('#plusModal');
	var $modal = $(obj).closest('.DynamicModal');
	$('#fire_insurance_policy_' + rowID).val(formData);
	successmsg('Data added to the form.');
	$modal.modal('hide');

	// var $form = $(obj).closest('form');
	// var siteurl = $('#siteurl').val();
	// var url = siteurl + 'site/insurance/health_form/save.php';
	// var customer_guid = $('#customer_guid').val();

	// var formData = $form.serialize();
	// 	formData = formData + '&customer_guid=' + customer_guid;
	// $.post(url, formData, function(result){
	// 	if(result.saveStatus == 1){
	// 		$select = $('#insurance_beneficiary_id_' + rowID);
	// 		$select.append('<option value="'+ result.id +'" selected>'+ result.firstname +'</option>');
	// 		$select.val(result.id).trigger('change');
	// 		successmsg(result.successmsg);
	// 		$('#plusModal').modal('hide');
	// 	} else {
	// 		errormsg(result.errormsg);
	// 	}
	// });
}

/* Attachments */

function insurance_attachments_form(rowID, beneficiary_id = '', insurance_type = '') {
	if (beneficiary_id == '') {
		beneficiary_id = $('#insurance_beneficiary_id_' + rowID).val();
		if (beneficiary_id == '0') {
			errormsg('Add or select a beneficiary first');
			return;
		}
	}
	if (insurance_type == '') {
		insurance_type = $('#insurance_type_' + rowID).val();
	}

	var siteurl = $('#siteurl').val();
	$.ajaxSetup({ async: false });
	$.post(siteurl + "site/insurance_masters/attachments_form.php", { beneficiary_id: beneficiary_id, insurance_type: insurance_type }, function (data) {
		$('#plusModal').modal('show');
		$('.plusmodal-dialog').css('width', '80%');
		$('#plusmodal_title').html('');
		$('#plussaveBtn').html('<i class="fa fa-upload"></i> Upload');
		$('#plusformDiv').html(data);
		$('#plussaveBtn').attr('onclick', 'upload_insurance_attachments(this, "' + rowID + '")');
		$('#plusmodalform').attr('enctype', 'multipart/form-data');
	});
}

function upload_insurance_attachments(obj, rowID) {
	var siteurl = $('#siteurl').val();
	var $form = $(obj).closest('form');
	var id = $form.attr('id');
	var formData = new FormData(document.getElementById(id));
	$.ajax({
		type: 'POST',
		url: siteurl + 'site/insurance_masters/upload.php',
		data: formData,
		processData: false,
		contentType: false,
		success: function (res) {
			//			$('#attachments_' + rowID).val(res);
			$('#plusModal').modal('hide');
		}
	});
}

function erp_download_attachment(obj) {
	var file = $(obj).data('file');
	var filename = $(obj).data('filename');
	var target = $(obj).data('target');
	var url = site_url + 'upload/' + target + '/' + file;
	var link = document.createElement('a');
	link.download = filename;
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function insurance_services_form(rowID, service_id = 0) {
	var insurance_type = $('#insurance_type_' + rowID).val();
	var services = $('#insurance_services_' + rowID).val();

	var siteurl = $('#siteurl').val();
	// $.ajaxSetup({ async:false });
	// $.post(siteurl+"site/insurance_masters/services_form.php", { insurance_type:insurance_type }, function(data){
	// 	$('#plusModal').modal('show');
	// 	$('.plusmodal-dialog').css('width','80%');
	// 	$('#plusmodal_title').html('');
	// 	$('#plussaveBtn').html('<i class="fa fa-plus-circle"></i> Save');
	// 	$('#plusformDiv').html(data);
	// 	$('#plussaveBtn').attr('onclick','save_insurance_services(this, "'+ rowID +'")');
	// });

	let ms = Date.now();
	var id = 'serviceModal_' + ms;

	$.ajaxSetup({ async: false });
	$.post(siteurl + "site/insurance_masters/services_form.php", { insurance_type: insurance_type, services: services, type: 'policy' }, function (data) {
		var html =
			'<form method="post">' +
			'<div class="modal-header">' +
			'<h5 class="modal-title">Services Form</h5>' +
			'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
			'</div>' +
			'<div class="modal-body">' + data + '</div>' +
			'<div class="modal-footer">' +
			'<button class="btn btn-success saveBtn" type="button" onclick="save_insurance_services(this, ' + rowID + ')"><i class="fa fa-plus-circle"></i> Save </button>' +
			'<button class="btn btn-danger" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
			'</div>' +
			'</form>';

		var zindex = $('.modal-backdrop').last().css('z-index');
		zindex = parseInt(zindex);

		var modal = document.createElement('div');
		modal.classList.add('modal', 'fade', 'serviceModal');
		modal.setAttribute('id', id);
		modal.setAttribute('tabindex', '-1');
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('data-backdrop', 'static');
		modal.setAttribute('data-keyboard', 'false');
		modal.setAttribute('aria-labelledby', 'exampleModalLabel');
		modal.setAttribute('aria-hidden', 'true');
		modal.innerHTML =
			'<div class="modal-dialog" style="min-width:60%;" role="document">' +
			'<div class="modal-content">' + html + '</div>' +
			'</div>';

		document.body.appendChild(modal);

		$(modal).modal('show');
		$('#' + id).on('shown.bs.modal', function () {
			$('#' + id).css('z-index', (zindex + 11));
		});
	});
}

function save_insurance_services(obj, rowID) {
	var $form = $(obj).closest('form');
	var services = {};
	$form.find('input:checked').each(function () {
		// services.push(this.value);
		var count = $(this).closest('.form-group').find('.count').val();
		services[this.value] = count;
	});

	$('#insurance_services_' + rowID).val(JSON.stringify(services));
	successmsg('Data added to the form.');
	$modal = $(obj).closest('.serviceModal');
	$modal.modal('hide');
}

function vendor_insurance_services_form(obj, service_id = 0) {
	var insurance_type = $(obj).closest('tr').find('.is_insurance_id option:selected').data('insurance-type');

	var siteurl = $('#siteurl').val();
	// $.ajaxSetup({ async:false });
	// $.post(siteurl+"site/insurance_masters/services_form.php", { insurance_type:insurance_type }, function(data){
	// 	$('#plusModal').modal('show');
	// 	$('.plusmodal-dialog').css('width','80%');
	// 	$('#plusmodal_title').html('');
	// 	$('#plussaveBtn').html('<i class="fa fa-plus-circle"></i> Save');
	// 	$('#plusformDiv').html(data);
	// 	$('#plussaveBtn').attr('onclick','save_vendor_insurance_services(this, "'+ obj +'")');
	// });

	let ms = Date.now();
	var id = 'serviceModal_' + ms;

	$.ajaxSetup({ async: false });
	$.post(siteurl + "site/insurance_masters/services_form.php", { insurance_type: insurance_type, id: service_id }, function (data) {
		var html =
			'<form method="post">' +
			'<div class="modal-header">' +
			'<h5 class="modal-title">Services Form</h5>' +
			'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
			'</div>' +
			'<div class="modal-body">' + data + '</div>' +
			'<div class="modal-footer">' +
			'<button class="btn btn-success saveBtn" type="button"><i class="fa fa-plus-circle"></i> Save </button>' +
			'<button class="btn btn-danger" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
			'</div>' +
			'</form>';

		var zindex = $('.modal-backdrop').last().css('z-index');
		zindex = parseInt(zindex);

		var modal = document.createElement('div');
		modal.classList.add('modal', 'fade', 'serviceModal');
		modal.setAttribute('id', id);
		modal.setAttribute('tabindex', '-1');
		modal.setAttribute('role', 'dialog');
		modal.setAttribute('data-backdrop', 'static');
		modal.setAttribute('data-keyboard', 'false');
		modal.setAttribute('aria-labelledby', 'exampleModalLabel');
		modal.setAttribute('aria-hidden', 'true');
		modal.innerHTML =
			'<div class="modal-dialog" style="min-width:60%;" role="document">' +
			'<div class="modal-content">' + html + '</div>' +
			'</div>';

		document.body.appendChild(modal);

		$(modal).modal('show');
		$('#' + id).on('shown.bs.modal', function () {
			$('#' + id).css('z-index', (zindex + 11));
		});
		$(modal).find('.saveBtn').click(function () { save_vendor_insurance_services(this, $(obj)) });
	});
	return id;
}

function save_vendor_insurance_services(obj, rowLink) {
	var $form = $(obj).closest('form');
	var services = {};
	$form.find('input:checked').each(function () {
		// services.push(this.value);
		var count = $(this).closest('.form-group').find('.count').val();
		services[this.value] = count;
	});

	// $('#insurance_services_'+rowID).val(services.join(','));
	$(rowLink).closest('tr').find('.is_services').val(JSON.stringify(services));
	successmsg('Data added to the form. Save the customer to update the data.');
	$modal = $(obj).closest('.serviceModal');
	$modal.modal('hide');
}

function erp_insurance_service_count_trigger(obj) {
	if ($(obj).is(':checked')) {
		$(obj).closest('.form-group').find('.count').prop('disabled', '');
	} else {
		$(obj).closest('.form-group').find('.count').prop('disabled', 'disabled');
	}
}
function erp_endorse_policy_select_form(data) {
	url = 'site/insurance/ajax/endose_policy_select_form.php';
	var modal = erp_create_modal(url, data, { plugins: 'selectize', height: '200px' });
	$('#' + modal).find('.title').text('Select Policy');
	$('#' + modal).find('.saveBtn').attr('onclick', 'erp_endorse_submit(this)').html('<i class="fas fa-exchange-alt"></i> Endorse');
}

function erp_endorse_submit(obj) {
	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.DynamicModal');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/insurance/ajax/endose_policy_save.php';

	var formData = $form.serialize();
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			successmsg(result.successmsg);
			$modal.modal('hide');
			window.location = result.url;
		} else {
			errormsg(result.errormsg);
		}
	});
}

$(document).ready(function () {
	$('#filter_form input[data-attr="date"]').datepicker({
		// uiLibrary: 'bootstrap'
		autoclose: true,
		format: 'dd-mm-yyyy',
		todayHighlight: true,

	});

	$(document).on('shown.bs.modal', '#myModal', function () {
		$('input[data-attr="date"]').each(function () {
			var minDateAttr = $(this).attr('min');  // Check if the input has a 'min' attribute
			var maxDateAttr = $(this).attr('max');
			if (minDateAttr == undefined) {
				minDateAttr = $('#book_begining').val();
			} else if (minDateAttr) {
				var bookBeginingDate = new Date($('#book_begining').val());
				var minDate = new Date(minDateAttr);
				if (minDate < bookBeginingDate) {
					minDateAttr = $('#book_begining').val();
				} else {
					console.log('The minDate is valid.');
				}
			}
			$(this).datepicker({
				autoclose: true,
				format: 'dd-mm-yyyy',
				todayHighlight: true,
				startDate: minDateAttr ? convertDate(minDateAttr) : null,  // Set minDate only if min attribute exists
				endDate: maxDateAttr ? convertDate(maxDateAttr) : null  // Set maxDate if max attribute exists

			});
		});
		function convertDate(dateStr) {
			var [day, month, year] = dateStr.split('-');
			return new Date(year, month - 1, day);  // Create a Date object with format 'YYYY-MM-DD'
		}
		//purchaseHideShow complete ke bad hata dena hai
		// if($('.special_vat').length>0){
		// 	if ($('#special_vat_zero').attr('checked')) {
		// 		$('.gen_vat').hide();
		// 		$('.special_vat').show();
		// 	} else {
		// 		$('.gen_vat').show();
		// 		$('.special_vat').hide();
		// 	}

		// }
		$(function () {
			$('[data-toggle="tooltip"]').tooltip()
		})
	});
	$(document).on('shown.bs.modal', '#exampleModal', function () {
		$('input[data-attr="date"]').datepicker({
			// uiLibrary: 'bootstrap'
			autoclose: true,
			format: 'dd-mm-yyyy',
			todayHighlight: true
		});
	});


})
function setDate(obj, date) {
	$(obj).closest('.suggestions').prev('input[data-attr="date"]').datepicker('setDate', date);
}
$(document).ready(function () {
	$('.viewextra').mouseover(function () {
		var id = $(this).attr('data-div');
		$('#view1' + id).show();
	});
	$('.viewextra').mouseout(function () {
		var id = $(this).attr('data-div');
		$('#view1' + id).hide();
	});
	// $(document).mouseout('.viewextra', function(){ console.log('out');
	// 	var id=$(this).attr('data-div');
	// 	$('#view1'+id).hide();
	// });
	// $(document).mouseout('.mex', function(){ console.log('out');
	// 	//var id=$(this).attr('data-div');
	// 	$('.mex').hide();
	// });
});
function erp_format_date(date = new Date(), format = 'dd/mm/yyyy') {
	var d = new Date(date);
	month = '' + (d.getMonth() + 1);
	day = '' + d.getDate();
	year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;
	switch (format) {
		case 'dd/mm/yyyy':
			return [day, month, year].join('/');
		case 'dd-mm-yyyy':
			return [day, month, year].join('-');
		default:
			return [year, month, day].join('-');

	}
}

function erp_set_insurance_coverage_dates(obj) {
	$selected = $(obj).find('option:selected');
	var expiry = $selected.data('policy-expiry');
	expiry = new Date(expiry);
	var today = new Date();
	if (expiry == '' || expiry == null || expiry == 'Invalid Date' || expiry < today) {
		startdate = today;
	} else {
		startdate = new Date(expiry);
		startdate.setDate(startdate.getDate() + 1);
	}

	var expiry = new Date(startdate);
	expiry.setFullYear(expiry.getFullYear() + 1);
	expiry.setDate(expiry.getDate() - 1);

	$(obj).closest('tr').find('.insurance_startdate').val(erp_format_date(startdate));
	$(obj).closest('tr').find('input[data-target="insurance_startdate"]').val(erp_format_date(startdate, 'dd/mm/yyyy'));
	$(obj).closest('tr').find('.insurance_expiry').val(erp_format_date(expiry));
	$(obj).closest('tr').find('input[data-target="insurance_expiry"]').val(erp_format_date(expiry, 'dd/mm/yyyy'));
}

function erp_set_insurance_expiry(obj) {
	var startdate = $(obj).closest('tr').find('.insurance_startdate').val();
	startdate = new Date(startdate);
	if (startdate == '' || startdate == null || startdate == 'Invalid Date') {
		startdate = new Date();
	}

	var expiry = new Date(startdate);
	expiry.setFullYear(expiry.getFullYear() + 1);
	expiry.setDate(expiry.getDate() - 1);

	$(obj).closest('tr').find('.insurance_expiry').val(erp_format_date(expiry));
	$(obj).closest('tr').find('input[data-target="insurance_expiry"]').val(erp_format_date(expiry, 'dd/mm/yyyy'));
}

function erp_check_pending_enquiry_for_vehicle(obj) {
	$selected = $(obj).find('option:selected');
	var count = $selected.data('req-count');
	if (count > 0) {
		var refs = $selected.data('refs');
		var msg = (count == 1) ? 'There is a pending enquiry for the selected vehicle : ' : 'There are pending enquiries for the selected vehicle : ';
		errormsg(msg + refs);
	}
}

function erp_mail_form(data) {
	url = 'site/mail/new_mail.php';
	var modal = erp_create_modal(url, data, { plugins: 'selectize,tinymce' });
	$('#' + modal).find('.title').text('Send Mail');
	// $('#'+modal).find('.saveBtn').attr('onclick', 'erp_mail_send(this)').html('<i class="fa fa-paper-plane"></i> Send');
	$('#' + modal).find('.saveBtn').html('<i class="fa fa-paper-plane"></i> Send');
	$('#' + modal).on('click', '.saveBtn', function (e) {
		e.preventDefault();
		$('#pageLoader').show();
		setTimeout(() => {
			erp_mail_send(this);
		}, 200);
	});
}

function erp_mail_send(obj) {
	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.DynamicModal');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/mail/send_mail.php';

	var formData = $form.serialize();
	$.post(url, formData, function (result) {
		$('#pageLoader').hide();
		if (result.saveStatus == 1) {
			successmsg(result.successmsg);
			$modal.modal('hide');
			if ($('#filter_form')) {
				filter_page(0, 1);
			}
		} else {
			errormsg(result.errormsg);
		}
	});
}

function erp_policy_list_modal(type, beneficiary_id) {
	url = 'site/insurance/ajax/policy_list.php';
	var modal = erp_create_modal(url, { type: type, beneficiary_id: beneficiary_id });
	$('#' + modal).find('.title').text('Policies');
	$('#' + modal).find('.modal-footer').hide();
}

function erp_policy_view_in_report(type, beneficiary_id) {
	var siteurl = $('#siteurl').val();
	url = 'site/insurance/ajax/view_in_report.php';
	$.post(siteurl + url, { type: type, beneficiary_id: beneficiary_id }, function (data) {
		if (data.saveStatus) {
			successmsg(data.successmsg);
			window.location = data.url;
		} else {
			errormsg(data.errormsg);
		}
	}, "json");
}

function list_all(obj) {
	var val = $(obj).data('val');
	$('#filter_form').find('input[name="show_all"]').val(val);
	filter_page(0, 0);
	if (val) {
		$(obj).css({ 'background-color': '#ff5d48', 'border-color': '#ff5d48' });
		$(obj).data('val', 0);
	} else {
		$(obj).css({ 'background-color': '', 'border-color': '' });
		$(obj).data('val', 1);
	}
	$(obj).find('i').toggleClass('fa-list fa-times');
}
function openCancelReasonGlobal(obj) {
	var id = $(obj).attr('data-id');
	var type = $(obj).attr('data-type');
	var url = $(obj).attr('data-url');
	var title = $(obj).attr('data-title');
	$('#cancel-modal-global').modal('toggle');
	$('#cancel-id-global').val(id);
	$('#cancel-id-type').val(type);
	$('#cancel-form-global').attr('action', url);
	$('.cancel-title-global').html(title);
}

$(document).on('submit', '#cancel-form-global', function (e) {
	e.preventDefault();
	var reason = $('#cancel-text-global').val();
	var id = $('#cancel-id-global').val();
	var type = $('#cancel-id-type').val();
	var url = $(this).attr('action');
	$.post(atob(url), { id: id, reason: reason, type: type }, function (response) {
		if (response.saveStatus == 1) {
			$('#cancel-modal-global').modal('toggle');
			$('#cancel-id-global').val('');
			successmsg(response.successmsg);
			filter_page(0, 0);
		} else {
			errormsg(response.errormsg);
		}
	}, "json");
});




// if($('#expandFButton').length){
$(document).on("click", "#expandFButton", function () {
	$('#all-content-div').addClass("table-fullscreen");
	$("#closeFButton").removeClass("d-none");
	$('.summaryTable').addClass('table-sm');
	$('.summaryTable').css('max-height', '30pc');
	$(this).addClass("d-none");
});
$(document).on("click", "#closeFButton", function () {
	$('#all-content-div').removeClass("table-fullscreen");
	$("#expandFButton").removeClass("d-none");
	$('.summaryTable').removeClass('table-sm');
	$('.summaryTable').css('max-height', '25pc');
	$(this).addClass("d-none");
});
// }
// if(closeButton){
// closeButton.addEventListener("click", function () {
//     table.classList.remove("table-fullscreen");
//     closeButton.classList.add("d-none");
//     expandButton.classList.remove("d-none");
// });
// }




$(document).ready(function () {
	$(document).on('paste', '#product_input input[type="text"]', function () {
		var $this = $(this);
		console.log('working');
		setTimeout(function () {
			$this.val($.trim($this.val()));
		}, 0);
	});
});
$(document).on('focus', 'input[type="text"], input[type="number"]', function () {
	$(this).select();
})

function erp_page_settings(obj) {
	url = 'site/settings/page_settings/form.php';
	var page = $(obj).data('page');
	var modal = erp_create_modal(url, { page: page });
	$('#' + modal).find('.title').text('Page Settings');
	$('#' + modal).find('.saveBtn').attr('onclick', `erp_page_settings_save(this,'${page}')`);
}

function erp_page_settings_save(obj, page) {
	page = page.replace(/-/g, '_');
	const inputs = $('#form-container :input');
	var columnData = {};
	inputs.each(function () {
		var inputName = this.name;
		var inputValue = $(this).prop('type') === 'checkbox' ? ($(this).prop('checked') ? '1' : '0') : $(this).val();
		columnData[inputName] = inputValue;
	});

	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.DynamicModal');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/settings/page_settings/save.php';

	var formData = $form.serialize();
	var combinedData = {
		formData: JSON.stringify(formData),
		columnData: JSON.stringify(columnData),
		page_name: page
	};
	var queryString = $.param(combinedData, true);
	$.post(url, queryString, function (result) {
		if (result.saveStatus == 1) {
			successmsg(result.successmsg);
			$modal.modal('hide');
			$('.btnSearch').click();
		} else {
			errormsg(result.errormsg);
		}
	});
}

function erp_code_format_preview(obj) {
	$container = $(obj).closest('.auto-code-settings');

	var prefix = $container.find('.prefix').val();
	var suffix = $container.find('.suffix').val();
	var leading_zeros = $container.find('.leading_zeros').val();
	var total_digits = $container.find('.total_digits').val() || 0;
	var current_index = $container.find('.current_index').val() || 0;

	var num = current_index;
	if (leading_zeros == 1) {
		num = current_index.padStart(total_digits, '0');
	}
	var preview = prefix + num + suffix;
	$container.find('.preview').val(preview);
}

function getFixedAssestGroups(obj) {
	var url = $(obj).attr("data-asset-url");
	var type = 0;
	if (obj.checked == true) {
		type = 1;
	}
	var calling_from = $('#calling-from').val();
	if (obj.checked == true) {

	} else {
		type = 2;
	}
	if (calling_from == 1) {
		// type = 2;
		$('#myModal').find("#under_group").html('<option value="0" >Primary</option>');
	} else {
		$('#exampleModal').find("#under_group").html('<option value="0" >Primary</option>');
	}
	$.post(atob(url), { type: type }, function (result) {
		$.each(result.data, function (i, field) {
			var name = field.name;
			var id = field.id;
			var fixed_assets = field.fixed_assets;
			var no_month = field.no_month;
			var option = '<option value="' + id + '" data-fixed_assets = "' + fixed_assets + '" data-no_month = "' + no_month + '">' + name + '</option>';
			if (calling_from == 1) {
				$('#myModal').find("#under_group").append(option);
			} else {
				$('#exampleModal').find("#under_group").append(option);
			}
		});
	}, "json");
}
function departmentStatus() {
	if ($('#department-status').length) {
		return $('#department-status').val();
	}
	else {
		return '';
	}
}


/* BIN QUANTITY */
function erp_rack_bin(obj) {
	var id = $(obj).data('id');
	var product_guid = $(obj).data('product-guid');
	// var bin_qty = $('#bin_qty_'+ id).val();
	var bin_qty = $(obj).closest('td').find('.bin_qty').val();

	var store_guid = $('#branch_guid').val();
	var qty = $('#qty_' + id).val();

	if (!qty) {
		errormsg('Enter quantity');
		return;
	};

	url = 'site/bin/ajax/product_bin_form.php?bin_qty=' + bin_qty;
	var modal = erp_create_modal(url, { qty: qty, product_guid: product_guid, store_guid: store_guid }, { plugins: 'selectize' });
	$('#' + modal).find('.title').text('Racks & Bins');
	// $('#'+modal).find('.saveBtn').attr('onclick', 'erp_rack_bin_save(this)').attr('data-id',id);
	$('#' + modal).find('.saveBtn').on('click', function () {
		erp_rack_bin_save(this, obj);
	});
}

function erp_rack_bin_save(obj, bin_span) {
	// var id = $(obj).data('id');
	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.DynamicModal');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/bin/ajax/product_bin_save.php';

	var formData = $form.serialize();
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			// $('#bin_qty_'+ id).val(result.data);
			$(bin_span).closest('td').find('.bin_qty').val(result.data);
			successmsg(result.successmsg);
			$modal.modal('hide');
		} else {
			errormsg(result.errormsg);
		}
	});
}

function erp_bin_alloc_zone_change(obj) {
	var zone_guid = $(obj).val();
	// $.each($(obj).closest('form').find('.bin'), function(i,e){
	// 	$(e).val('');
	// });
	$(obj).closest('form').find('.zones').hide();
	if (zone_guid !== '') {
		$.each(zone_guid, function (i, v) {
			$(obj).closest('form').find('.zones.' + v).show();
		});
	}

	// $.each($('#rack_guid option'), function(i,e){
	// 	console.log('abc1', $(e).dataAttr('zone'));
	// 	if($.inArray($(e).attr('data-zone'), zone_guid) === -1){
	// 		$(e).prop('selected','');
	// 	}
	// });
	// $('#rack_guid').trigger('change');
}

function erp_bin_alloc_rack_change(obj) {
	// var rack_guid = $(obj).val();
	// $(obj).closest('form').find('.racks').hide();
	// if(rack_guid !== ''){
	// 	$.each(rack_guid, function(i,v){
	// 		$(obj).closest('form').find('.racks.' + v).show();
	// 	});
	// }
}

function erp_racks_input_qty(obj) {
	// var balance_qty = parseFloat($(obj).closest('form').find('.balance_qty').val());
	// if($(obj).val() == '' && balance_qty > 0){
	// 	$(obj).val(balance_qty).trigger('change');
	// }
	// $(obj).attr('data-val', $(obj).val());
	// $(obj).select();
}

function erp_racks_change_qty(obj) {
	// var prev = parseFloat($(obj).attr('data-val')) || 0;
	// var qty = parseFloat($(obj).val()) || 0;
	// var balance_qty = parseFloat($(obj).closest('form').find('.balance_qty').val()) + prev;
	// if(qty > balance_qty){
	// 	errormsg('Enter quantity less than or equal to ' + balance_qty);
	// 	$(obj).val('');
	// 	return;
	// }
	// $(obj).attr('data-val', qty);
	// $(obj).closest('form').find('.balance_qty').val(balance_qty - qty);
}

$(document).on('click', '.rack_bin_span', function () {
	erp_rack_bin(this);
});

/* END OF BIN QUANTITY */

$(document).ready(function () {
	$(document).on('shown.bs.modal', '.modal', function () {
		var voucherTypesInput = $(this).find('#is_customer_vendor_form').val();
		if (voucherTypesInput && voucherTypesInput.length > 0) {
			var editGuid = $(this).find('#edit_guid').val();
			if (editGuid == 0 || editGuid < 0) {
				setAutoCodeCV();
				setAutoCodeVendor();
			}
		}
	});
});

$(document).on('change', '#customer_group_guid', function () {
	setAutoCodeCV();
})

$(document).on('change', '.customer_name_0502', function () {
	let parentForm = $(this).closest('form');
	var editGuidInput = 0;
	if (parentForm.length) {
		// console.log(parentForm);
		editGuidInput = isNAN(parentForm.find('#edit_guid').val());
	}
	// console.log(editGuidInput);
	if (editGuidInput > 0) {
	} else {
		setAutoCodeCV();
		setAutoCodeVendor();
	}
})

$(document).on('change', '.customer_group_guid0802', function () {
	setAutoCodeVendor();
})

function setAutoCodeCV() {
	var auto = $('#customer_group_guid').find('option:selected').attr('data-autocode');
	var customerPrefix = $('#customer_group_guid').find('option:selected').attr('data-customerPrefix');
	var codeNumber = $('#customer_group_guid').find('option:selected').attr('data-codeNumber');
	var CLetter = $(".customer_name_0502").val();
	var CustomerFLetter = CLetter.substring(0, 1);
	if (auto == '1') {
		if (customerPrefix == '1') {
			if (CustomerFLetter != "") {
				$('.customer_code_0502').val(CustomerFLetter + codeNumber);
			}
			$('.customer_code_0502').attr('readonly', 'readonly');
		}
		else {
			var code = $('#customer_group_guid').find('option:selected').attr('data-code');
			$('.customer_code_0502').val(code);
			$('.customer_code_0502').attr('readonly', 'readonly');
		}


	} else {
		$('.customer_code_0502').val('');
		$('.customer_code_0502').removeAttr('readonly');
	}
}

function setAutoCodeVendor() {
	var auto = $('.customer_group_guid0802').find('option:selected').attr('data-autocode');
	var customerPrefix = $('.customer_group_guid0802').find('option:selected').attr('data-customerPrefix');
	var codeNumber = $('.customer_group_guid0802').find('option:selected').attr('data-codeNumber');
	var CLetter = $(".customer_name_0502").val();
	var CustomerFLetter = CLetter.substring(0, 1);
	if (auto == '1') {
		if (customerPrefix == '1') {
			if (CustomerFLetter != "") {
				$('.customer_code_0802').val(CustomerFLetter + codeNumber);
			}
			$('.customer_code_0802').attr('readonly', 'readonly');
		}
		else {
			var code = $('.customer_group_guid0802').find('option:selected').attr('data-code');
			$('.customer_code_0802').val(code);
			$('.customer_code_0802').attr('readonly', 'readonly');
		}


	} else {
		$('.customer_code_0802').val('');
		$('.customer_code_0802').removeAttr('readonly');
	}
}
$(document).on('shown.bs.modal', 'body', function () {
	$('#loaderformodal').hide();
});

$(document).on('click', '#pass-btn', function () {
	let btn = document.getElementById('pass-btn');
	let icon = document.getElementById('eye-icon');
	let input = document.getElementById('pwd');
	input.type == 'password' ? [input.type = 'text', icon.setAttribute('class', 'mdi mdi-eye-off')] : [input.type = 'password', icon.setAttribute('class', 'icon-eye')];
	input.focus();
});

function erp_change_password_form(obj, type = 0) {
	url = 'site/user/pwd/form-ajax.php';
	var userid = $(obj).data('userid');
	var modal = erp_create_modal(url, { id: userid, type: type }, { width: 30 });
	$('#' + modal).find('.title').text('Change Password');
	$('#' + modal).find('.saveBtn').attr('onclick', 'erp_change_password_save(this)').html('<i class="fa fa-save"></i> Save');
}

function erp_change_password_save(obj) {
	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.DynamicModal');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/user/pwd/save.php';

	var formData = $form.serialize();
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			successmsg(result.successmsg);
			$modal.modal('hide');
		} else {
			errormsg(result.errormsg);
		}
	});
}

function unserialize(serializedData) {
	let urlParams = new URLSearchParams(serializedData);
	let unserializedData = {};
	for (let [key, value] of urlParams) {
		unserializedData[key] = value;
	}
	return unserializedData;
}

function erp_pdf_format_change(obj) {
	var $form = $(obj).closest('form');
	var voucher_type = $form.find('.voucher_type').val();
	var format = $form.find('[name="format"]').val();

	$form.find('.related-fields').hide();
	$form.find(`.related-fields.${voucher_type}-${format}`).css('display', 'flex');
}

function erp_export_as_pdf(obj, type, filterData = '') {
	var voucher_id = $(obj).data('voucherid') || 0;
	var id = $(obj).data('id') || 0;
	var letterhead = $(obj).data('letterhead') || 0;
	var action = $(obj).data('action') || 'view';
	var format = $(obj).data('format') || '';

	if (format != '' && format != '0') {
		var url = $(obj).data('url');
		var settings = 'format=' + format;
		settings += '&id=' + id;
		settings += '&voucher_id=' + voucher_id;
		settings += '&url=' + url;
		settings += '&letterhead=' + letterhead;
		settings += '&action=' + action;
		erp_generate_pdf(settings, filterData);
		return;
	}

	var modal = erp_create_modal('site/theme/ajax/pdf_format_selection.php', { type: type, voucher_id: voucher_id, action: action }, { width: 40 });

	$('#' + modal).on('shown.bs.modal', function () {
		$('#' + modal).find('[name="format"]').trigger('change');
	});

	$('#' + modal).find('.saveBtn').html('<i class="far fa-file-pdf"></i> Generate PDF').on('click', function (e) {
		var url = $(e.target).closest('form').find('.format option:selected').data('url');
		var settings = $(e.target).closest('form').serialize();
		settings += '&id=' + id;
		settings += '&url=' + url;
		settings += '&letterhead=' + letterhead;
		$('#' + modal).modal('hide');
		erp_generate_pdf(settings, filterData);
	});
}

function erp_generate_pdf(settings, filterData = '') {
	settings = unserialize(settings);

	if (settings.format == '' || settings.format == '0') {
		errormsg('No format selected');
		return;
	}

	filterData = unserialize(filterData);
	$.each(filterData, function (i, v) {
		settings[i] = v;
	});

	$.post(settings.url, settings, function (res) {
		if (res.errormsg) {
			errormsg(res.errormsg);
			return;
		}
		switch (settings.action) {
			case 'view':
				window.open(res.url, '_blank');
				break;

			case 'dl':
				var link = document.createElement("a");
				link.setAttribute('download', '');
				link.href = res.url;
				document.body.appendChild(link);
				link.click();
				link.remove();
				break;

			case 'print':
				var win = window.open(res.url, '_blank');
				win.focus();
				win.addEventListener('load', win.print(), true);
				break;

			case 'print-direct':
				JSPM.JSPrintManager.auto_reconnect = false;
				JSPM.JSPrintManager.start();
				JSPM.JSPrintManager.WS.onStatusChanged = function () {
					if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Open) {
						var printer_name = $('#default-printer').val() || 0;
						var file = new JSPM.PrintFilePDF(res.url, JSPM.FileSourceType.URL, Date.now() + '.pdf', 1);
						var cpj = new JSPM.ClientPrintJob();
						cpj.clientPrinter = new JSPM.InstalledPrinter(printer_name);
						cpj.files.push(file);
						cpj.sendToClient();
					}
					if (JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Closed || JSPM.JSPrintManager.websocket_status == JSPM.WSStatus.Blocked) {
						var win = window.open(res.url, '_blank');
						win.focus();
						win.addEventListener('load', win.print(), true);
					}
				}
				break;

			case 'mail':
				erp_mail_form(res);
				break;

			case 'default':
				window.open(res.url, '_blank');
				break;
		}
	});
}

function erp_excel_format_change(obj) {
	var $form = $(obj).closest('form');
	var voucher_type = $form.find('.voucher_type').val();
	var format = $form.find('[name="format"]').val();

	$form.find('.related-fields').hide();
	$form.find(`.related-fields.${voucher_type}-${format}`).css('display', 'flex');
}

function erp_export_as_excel(obj, type, filterData = '') {
	var voucher_id = $(obj).data('voucherid') || 0;
	var id = $(obj).data('id') || 0;
	var action = $(obj).data('action') || 'view';
	var format = $(obj).data('format') || '';

	if (format != '' && format != '0') {
		var url = $(obj).data('url');
		var settings = 'format=' + format;
		settings += '&id=' + id;
		settings += '&voucher_id=' + voucher_id;
		settings += '&url=' + url;
		settings += '&action=' + action;
		erp_generate_excel(settings, filterData);
		return;
	}

	var modal = erp_create_modal('site/theme/ajax/excel_format_selection.php', { type: type, voucher_id: voucher_id, action: action }, { width: 40 });

	$('#' + modal).on('shown.bs.modal', function () {
		$('#' + modal).find('[name="format"]').trigger('change');
	});

	$('#' + modal).find('.saveBtn').html('<i class="far fa-file-excel"></i> Generate Excel').on('click', function (e) {
		var url = $(e.target).closest('form').find('.format option:selected').data('url');
		var settings = $(e.target).closest('form').serialize();
		settings += '&id=' + id;
		settings += '&url=' + url;
		$('#' + modal).modal('hide');
		erp_generate_excel(settings, filterData);
	});
}

function erp_generate_excel(settings, filterData = '') {
	settings = unserialize(settings);

	if (settings.format == '' || settings.format == '0') {
		errormsg('No format selected');
		return;
	}

	filterData = unserialize(filterData);
	$.each(filterData, function (i, v) {
		settings[i] = v;
	});

	$.post(settings.url, settings, function (res) {
		if (res.errormsg) {
			errormsg(res.errormsg);
			return;
		}
		switch (settings.action) {
			case 'dl':
				var link = document.createElement("a");
				link.setAttribute('download', '');
				link.href = res.url;
				document.body.appendChild(link);
				link.click();
				link.remove();
				break;

			case 'mail':
				erp_mail_form(res);
				break;
		}
	});
}

$(document).on('click', '.icon-pluss', function () {
	$('.convertedPricee').toggleClass('display-table-cell');
})

$(document).on('mouseenter', '.notation-icon2', function (e) {
	var id = $(this).attr('data-id');
	$('#icon_table_' + id).removeClass('d-none');
});

$(document).on('mouseleave', '.notation-icon2', function (e) {
	var id = $(this).attr('data-id');
	$('#icon_table_' + id).addClass('d-none');
});

function erp_update_mail_status(obj) {
	var status = $(obj).data('status');
	if (status == '0') {
		confirmDialog('Do you want to mark as mail sent ?', function () {
			var id = $(obj).data('id');
			var voucher_type = $(obj).data('voucher');
			var url = $(obj).attr('data-url');
			url = atob(url);
			$.post(url, { id: id, status: 1, voucher_type: voucher_type }, function (result) {
				if (result.saveStatus) {
					successmsg('Data Saved');
					filter_page(0, 1);
				} else {
					errormsg('Not Saved');
				}
			});
		}, 'Update');

	}
}
function isNAN(amt) {
	var amount = parseFloat(remComa(amt));
	return isNaN(amount) ? 0 : amount;
}
$(document).on('click', '.copyButton', function () {
	var dataToCopy = $(this).attr('data-copy');

	navigator.clipboard.writeText(dataToCopy)
		.then(function () {

		})
		.catch(function (err) {
			console.error('Failed to copy data to clipboard: ', err);

		});
});

function NonInvDfescriptionOption(rn, product_guid, is_non_inv_item, position = '', top = 0, left = 3) {
	var non_inventory_item_url = $('#non-inventory-item-url').val();
	var paramNonInv = {};
	paramNonInv['serial_no'] = btoa(rn);
	paramNonInv['guid'] = btoa(product_guid);
	paramNonInv['is_non_inv'] = is_non_inv_item;
	paramNonInv['edit_page'] = 'rebate_form';
	var paramNonInvString = JSON.stringify(paramNonInv);
	var nonInvParams = btoa(paramNonInvString);
	var nonInventoryAction = $('#non-inventory-item-action-url').val();
	if (position == 'abs') position = 'position:absolute';
	$decsriptionOption = `<div class=" btn btn-info btn-sm print-icons " data-id="${rn}" id="nonInvFormDot_${rn}" 
										data-url="${non_inventory_item_url}"
										data-param="${nonInvParams}"
										data-title="Non Inventory Form"
										data-action="${nonInventoryAction}"
										data-btnlabel="Save" 
										data-modalwidth="95" 
										onclick="return nonInventoryItem(this)" style="
										padding: 0px 4px;
										height: 18px;
										line-height: 13px;
										top: ${top}px;
										left: ${left}pc;
										${position}
										">
											<span style="font-size: 10px;">D</span>
									</div>`;
	return $decsriptionOption;
}
function NonInvDfescriptionOptionRound(rn, product_guid, is_non_inv_item, position = '', top = 0, left = 3) {
	var non_inventory_item_url = $('#non-inventory-item-url').val();
	var paramNonInv = {};
	paramNonInv['serial_no'] = btoa(rn);
	paramNonInv['guid'] = btoa(product_guid);
	paramNonInv['is_non_inv'] = is_non_inv_item;
	paramNonInv['edit_page'] = 'rebate_form';
	var paramNonInvString = JSON.stringify(paramNonInv);
	var nonInvParams = btoa(paramNonInvString);
	var nonInventoryAction = $('#non-inventory-item-action-url').val();
	if (position == 'abs') position = 'position:absolute';
	$decsriptionOption = `<div class="store-dot btn btn-info btn-sm" data-id="${rn}" id="nonInvFormDot_${rn}" 
										data-url="${non_inventory_item_url}"
										data-param="${nonInvParams}"
										data-title="Non Inventory Form"
										data-action="${nonInventoryAction}"
										data-btnlabel="Save" 
										data-modalwidth="55" 
										onclick="return nonInventoryItem(this)" style="
										padding: 0px 3px;
										height: 14px;
										line-height: 8px;
										top: ${top}px;
										left: ${left}pc;
										border-radius:50%;
										${position}
										">
											<span style="font-size: 10px;">D</span>
									</div>`;
	return $decsriptionOption;
}

$(document).on('mousedown', 'ul.typeahead', function (e) {
	e.preventDefault();
})

function updateIcons(stat) {
	// icon1.className = 'fa fa-check';
	// icon2.className = 'fa fa-check';
	if (stat == 1) {
		$('#stat-i-1').removeClass('fa-spinner fa-pulse').addClass('fa-check-circle text-success');
		$('#stat-i-2').removeClass('fa-clock').addClass('fa-spinner fa-pulse');
	}
	if (stat == 2) {
		$('#stat-i-2').removeClass('fa-spinner fa-pulse').addClass('fa-check-circle text-success');
	}
}


function makeRefreshRequest(url, date, ids, stat) {
	return new Promise(function (resolve, reject) {
		$.post(url, { date: date, ids: ids, stat: stat }, function (data, status) {
			if (status === 'success') {
				if (data.saveStatus == 1) {
					updateIcons(data.stat);
					console.log('update icons');
					resolve(data);
				} else {
					reject(data.errormsg);
				}
			} else {
				reject(status);
			}
		});
	});
}
function trade_in_kg() {
	return isNAN($('#trade_in_kg').val()) == 1;
}

function erp_hide_form_fields(form_settings, form_item_settings) {
	$(`[data-config-field]`).show();
	if (form_settings) {
		$.each(form_settings, function (i, v) {
			$(`[data-config-field='${v}']`).hide();
		});
	}
	var config_hidden_item_fields = [];
	if (form_item_settings) {
		$.each(form_item_settings, function (i, v) {
			$(`[data-config-field='${v}']`).hide();
			config_hidden_item_fields.push(v);
		});
	}
	if ($('#config_hidden_item_fields')) {
		config_hidden_item_fields.join(',');
		$('#config_hidden_item_fields').val(config_hidden_item_fields);
	}
}

function clinic_occupational_therapy_form(obj) {
	var customer_id = $(obj).data('customer-id');
	var item_id = $(obj).data('item-id') || 0;
	url = 'site/clinic/ajax/occupational_therapy_form.php';
	var modal = erp_create_modal(url, { customer_id: customer_id, item_id: item_id }, { width: 80 });
	$('#' + modal).find('.saveBtn').on('click', function () {
		clinic_occupational_therapy_save(this,)
	});
}

function clinic_occupational_therapy_save(obj) {
	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.DynamicModal');
	var siteurl = $('#siteurl').val();
	var url = siteurl + 'site/clinic/ajax/occupational_therapy_save.php';

	var formData = $form.serialize();
	$.post(url, formData, function (result) {
		if (result.saveStatus == 1) {
			successmsg(result.msg);
			$modal.modal('hide');
		} else {
			errormsg(result.msg);
		}
	});
}

function erp_customer_form(obj, onsave = 'erp_display_customer_details') {
	var url = 'site/vendors/edit.php';
	var param = $(obj).data('param');
	var modal = erp_create_modal(url, { jsondata: param }, { width: 80, text: 'Create Customer' });
	var $modal = $('#' + modal);

	$modal.find('.saveBtn').on('click', function () {
		$('#pageLoader').show();
		var $form = $(this).closest('form');
		var formData = $form.serialize();

		var url = site_url + 'site/vendors/save.php';
		$.ajaxSetup({ async: true });
		$.post(url, formData, function (res) {
			$('#pageLoader').hide();
			if (res.saveStatus == 1) {
				successmsg(res.successmsg);
				$modal.modal('hide');
				if (onsave) {
					window[onsave](res);
				}
			} else {
				errormsg(res.errormsg);
			}
		});
	});
}

function erp_display_customer_details(item) {
	var data = item.data;
	var customer_guid = data.id;
	$('#customer_guid').val(customer_guid);

	var name = data.name;
	var code = data.code;
	var address = data.address;
	var email = data.email;
	var mobile = data.mobile;
	var gender = data.gender;
	var html = `Customer : <i class="fa ti-pencil" onclick="erp_change_selected_customer()"></i><br> `;
	html += `<b>${name} (${code})</b><br>`;
	if (address) html += address + `<br>`;
	if (email) html += `Email : ${email}<br>`;
	if (mobile) html += `Mobile : ${mobile}<br>`;
	if (gender) html += `Gender : ${gender}<br>`;

	$('#customer_info').html(html);
	$('#customer_info').show();
	$('#customer_input').hide();
}

function erp_change_selected_customer() {
	$('#customer_guid').val('0');
	$('#customer_info').hide();
	$('#customer_input').show();
	$('#customer').focus();
}

function erp_vendor_form(obj) {
	var url = 'site/vendors/edit.php';
	var param = $(obj).data('param');
	var modal = erp_create_modal(url, { jsondata: param }, { width: 80 });
	$('#' + modal).find('.title').text('Create Vendor');
	$('#' + modal).find('.saveBtn').on('click', function () {
		$('#pageLoader').show();
		setTimeout(() => { erp_vendor_save(this) }, 200);
	});
}

function erp_vendor_save(obj) {
	var $form = $(obj).closest('form');
	var $modal = $(obj).closest('.DynamicModal');
	var url = site_url + 'site/vendors/save.php';

	var formData = $form.serialize();
	$.post(url, formData, function (res) {
		$('#pageLoader').hide();
		if (res.saveStatus == 1) {
			successmsg(res.successmsg);
			erp_show_selected_vendor_details(res);
			$modal.modal('hide');
		} else {
			errormsg(res.errormsg);
		}
	});
}

function erp_show_selected_vendor_details(item) {
	var data = item.data;
	var vendor_guid = data.id;
	$('#vendor_guid').val(vendor_guid);

	var name = data.name;
	var code = data.code;
	var address = data.address;
	var email = data.email;
	var mobile = data.mobile;
	var gender = data.gender;
	var html = `Supplier : <i class="fa ti-pencil" onclick="erp_change_selected_vendor()"></i><br> `;
	html += `<b>${name} (${code})</b><br>`;
	if (address) html += address + `<br>`;
	if (email) html += `Email : ${email}<br>`;
	if (mobile) html += `Mobile : ${mobile}<br>`;
	if (gender) html += `Gender : ${gender}<br>`;

	$('#vendor_info').html(html);
	$('#vendor_info').show();
	$('#vendor_input').hide();
}

function erp_change_selected_vendor() {
	$('#vendor_guid').val('0');
	$('#vendor_info').hide();
	$('#vendor_input').show();
	$('#vendor').focus();
}

$(document).on('blur', '#filter_form input[type="text"]', function (e) {
	e.target.value = $.trim(this.value);
});
setTimeout(() => $("body").removeClass("sidebar-enable").addClass('enlarged'), 200);

function erp_delete_table_row(obj, funcName = '') {
	$table = $(obj).closest('table');
	$tbody = $(obj).closest('tbody');
	$(obj).closest('tr').remove();
	$trs = $tbody.find('tr:not(.row-template) .slno');
	var slno = 1;
	$.each($trs, function (i, e) {
		$(e).text(slno);
		slno++;
	});

	if (funcName) {
		var data = $(obj).data();
		if ($.isArray(funcName)) {
			$.each(funcName, function (i, name) {
				window[name]($table, data);
			});
		} else {
			window[funcName]($table, data);
		}
	}
}

function erp_is_clinic() {
	return parseInt($('#erp_is_clinic').val());
}

function select2New() {
	var searchUrl = atob($('#search-the-gl').val());
	$("select.select2-new").select2({
		placeholder: 'Search for a GL',
		minimumInputLength: 2,
		ajax: {
			url: function (params) {
				// 'this' refers to the select element within this context
				var selectedValue = $(this).data('selected');
				return searchUrl + '?selected=' + selectedValue;
			},
			dataType: 'json',
			delay: 250,
			data: function (params) {
				return {
					q: params.term, // search term
					page: params.page
				};
			},
			processResults: function (data, params) {
				params.page = params.page || 1;
				return {
					results: data.items,
					pagination: {
						more: (params.page * 10) < data.total_count
					}
				};
			},
			cache: true
		},
		templateResult: function (data) {
			// Check if data has data-color attribute
			if ($(data.element).data('color')) {
				return $('<span class="' + $(data.element).data('color') + '-color">' + $(data.element).text() + '</span>');
			}
			return data.text;
		},
		templateResult: formatResult, // Function to format the results
		templateSelection: formatSelection // Function to format the selection

	});

}
function formatResult(repo) {
	if (repo.loading) {
		return repo.text;
	}

	var $container = $(
		"<div class='select2-result-repository clearfix'>" +
		"<div class='select2-result-repository__title'></div>" +
		"</div>"
	);

	$container.find(".select2-result-repository__title").text(repo.name);

	return $container;
}

function formatSelection(repo) {
	return repo.name || repo.text;
}

$(document).on('click', '.checkbox-group label', function () {
	$(this).closest('.checkbox-group').find('input[type=checkbox]').click();
});

/* ATTACHMENT UPLOAD FUNCTION ACROSS THE SITE */
function erp_attachments_add(obj) {
	$(obj).closest('.DynamicModal').modal('hide');

	var master = $(obj).data('master');
	var master_id = $(obj).data('master-id');
	var doc_types = $(obj).data('doc-types') || '';

	url = 'site/ajax/upload/upload_form.php';
	var modal = erp_create_modal(url, { master: master, master_id: master_id, doc_types: doc_types }, { title: 'Upload New', plugins: 'selectize', width: 50 });
	$('#' + modal).find('.saveBtn').html('<i class="fas fa-upload"></i> Upload');
	$('#' + modal).find('.dropzone').dropzone({
		autoProcessQueue: false,
		uploadMultiple: true,
		parallelUploads: 5,
		maxFiles: 5,
		maxFilesize: 5,
		addRemoveLinks: true,
		acceptedFiles: '.jpg, .jpeg, .png, .txt, .pdf, .doc, .docx, .xls, .xlsx',
		dictDefaultMessage: '<i class="fas fa-cloud-upload-alt"></i> Click or Drop files here to upload',
		url: $('#' + modal).find('.post-url').val(),
		init: function () {
			var myDropzone = this;
			$('#' + modal).find('.saveBtn').click(function (e) {
				e.preventDefault();
				if (!myDropzone.files.length) {
					errormsg('Select file');
					return;
				}
				myDropzone.processQueue();
			});

			this.on('sending', function (file, xhr, formData) {
				$('#pageLoader').show();
				var data = $('#' + modal).find('form').serializeArray();
				$.each(data, function (key, el) {
					formData.append(el.name, el.value);
				});
			});

			this.on('maxfilesexceeded', function (file) {
				myDropzone.removeFile(file);
				errormsg('You can upload maximum 5 files at once.');
			});

			// this.on('success', function(file, res, myEvent) {
			// 	$('#pageLoader').hide();
			// 	if(res.status == 0){
			// 		errormsg(res.msg);
			// 	} else {
			// 		success(res.msg);
			// 		$modal.modal('hide');
			// 	}
			// });

			this.on('successmultiple', function (file, res) {
				$('#pageLoader').hide();
				if (res.status == 1) {
					successmsg(res.msg);
					$('#' + modal).modal('hide');
				} else {
					errormsg(res.msg);
				}
			});

			this.on('error', function (file, res) {
				$('#pageLoader').hide();
				errormsg(res.msg || res);
				$.each(myDropzone.files, function (i, file) {
					file.status = Dropzone.QUEUED
				});
			});
		}
	});
}

function erp_attachments_list(obj) {
	var master = $(obj).data('master');
	var master_id = $(obj).data('master-id');

	url = 'site/ajax/upload/uploads_list.php';
	var modal = erp_create_modal(url, { master: master, master_id: master_id }, { title: 'Uploads', width: 80 });
	$('#' + modal).find('.saveBtn').hide();
}

function erp_attachments_download(obj) {
	var url = $(obj).data('url');
	var name = $(obj).data('name');
	var link = document.createElement('a');
	link.download = name;
	link.href = url;
	link.click();
}
/* END OF ATTACHMENT UPLOAD FUNCTION ACROSS THE SITE */

/* SIGNATURE UPLOAD/VIEW/DELETE FUNCTION ACROSS THE SITE */
function erp_signature_upload(obj) {
	$(obj).closest('.DynamicModal').modal('hide');

	var master = $(obj).data('master');
	var master_id = $(obj).data('master-id');

	url = 'site/ajax/signature/signature_form.php';
	var modal = erp_create_modal(url, { master: master, master_id: master_id }, { title: 'Upload Stamp/Signature', width: 40 });
	$('#' + modal).find('.saveBtn').html('<i class="fas fa-upload"></i> Upload');
	$('#' + modal).find('.dropzone').dropzone({
		autoProcessQueue: false,
		uploadMultiple: true,
		parallelUploads: 1,
		maxFiles: 1,
		maxFilesize: 1,
		addRemoveLinks: true,
		acceptedFiles: '.jpg, .jpeg, .png',
		dictDefaultMessage: '<i class="fas fa-cloud-upload-alt"></i> Click or Drop file here to upload',
		url: $('#' + modal).find('.post-url').val(),
		init: function () {
			var myDropzone = this;
			$('#' + modal).find('.saveBtn').click(function (e) {
				e.preventDefault();
				if (!myDropzone.files.length) {
					errormsg('Select file');
					return;
				}
				myDropzone.processQueue();
			});

			this.on('sending', function (file, xhr, formData) {
				$('#pageLoader').show();
				var data = $('#' + modal).find('form').serializeArray();
				$.each(data, function (key, el) {
					formData.append(el.name, el.value);
				});
			});

			this.on('maxfilesexceeded', function (file) {
				myDropzone.removeFile(file);
				errormsg('You can upload only 1 file');
			});

			// this.on('success', function(file, res, myEvent) {
			// 	$('#pageLoader').hide();
			// 	if(res.status == 0){
			// 		errormsg(res.msg);
			// 	} else {
			// 		success(res.msg);
			// 		$modal.modal('hide');
			// 	}
			// });

			this.on('successmultiple', function (file, res) {
				$('#pageLoader').hide();
				if (res.status == 1) {
					toastr.success(res.msg);
					$('#' + modal).modal('hide');
					location.reload();
				} else {
					toastr.error(res.msg);
				}
			});

			this.on('error', function (file, res) {
				$('#pageLoader').hide();
				errormsg(res.msg || res);
				$.each(myDropzone.files, function (i, file) {
					file.status = Dropzone.QUEUED
				});
			});
		}
	});
}

function erp_signature_view(obj) {
	var master = $(obj).data('master');
	var master_id = $(obj).data('master-id');

	url = 'site/ajax/signature/signature_view.php';
	var modal = erp_create_modal(url, { master: master, master_id: master_id }, { title: 'Stamp/Signature', width: 40 });
	$('#' + modal).find('.saveBtn').hide();
}

function erp_signature_delete(obj) {
	var master = $(obj).data('master');
	var master_id = $(obj).data('master-id');

	confirmDialog('This cannot be undone. Are you sure to delete ?', function () {
		$('#pageLoader').show();
		var url = site_url + 'site/ajax/signature/delete.php';
		$.ajaxSetup({ async: true });
		$.post(url, { master: master, master_id: master_id }, function (res) {
			$('#pageLoader').hide();
			if (res.status == 1) {
				$(obj).closest('.modal').modal('hide');
				location.reload();
				toastr.success(res.msg);
			} else {
				toastr.error(res.msg);
			}
		});
	});
}
/* END OF SIGNATURE UPLOAD/VIEW/DELETE FUNCTION ACROSS THE SITE */

function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), wait);
	};
}

function iframe_item(obj) {
	$('#pageLoader').show();

	var product_guid = $(obj).data('product-guid') || 0;
	var action = $(obj).data('action');

	html = '<iframe src="" allowfullscreen="true" style="width:100%; min-height:70vh; border:none"></iframe>';
	$modal = erp_create_modal_from_html(html, { button: 'small' });
	$modal.find('.saveBtn').hide();
	var modal_id = $modal.prop('id');

	$iframe = $modal.find('iframe');
	$iframe.attr('data-modal-id', modal_id);
	$iframe.attr('src', site_url + `products/iframe/?iframe=1&action=${action}&id=${product_guid}`);
	$iframe.on('load', function () {
		$('#pageLoader').hide();
		$iframe.contents().find('.left-side-menu, .logo-box, .navbar-custom, footer').remove();
		$iframe.contents().find('.content-page').css('margin', '0');
		$iframe.contents().find('body').css('padding-bottom', '0');
	});

	$modal.on('hidden.bs.modal', function () {
		var target = $(obj).data('target');
		if (target == 'rooms') {
			filter_page(0, 1);
		}
	});
}

function erp_calulate_age(obj) {
	var dob = $(obj).val();
	if (!dob) return '';

	dob = moment(dob);
	var today = moment();
	return today.diff(dob, 'year');
}
function redirectToMenuUrl(url) {
	window.location.href = $('#siteurl').val() + url;
}

function erp_page_config(obj) {
	url = 'site/settings/page_config/form.php';
	var page = $(obj).data('page');
	var modal = erp_create_modal(url, { page: page }, { title: 'Page Configuration' });
	$('#' + modal).find('.saveBtn').on('click', function () {
		$('#pageLoader').show();
		var $form = $(this).closest('form');
		var formData = $form.serialize();

		var url = site_url + 'site/settings/page_config/save.php';
		$.ajaxSetup({ async: true });
		$.post(url, formData, function (res) {
			$('#pageLoader').hide();
			if (res.status == 1) {
				successmsg(res.msg);
				if ($('.btnSearch')) {
					$('.btnSearch').click();
				}
				$('#' + modal).modal('hide');
			} else {
				errormsg(res.msg);
			}
		});
	});
}

function generate_cashmemo_receipt(sales_voucher, receipt_voucher) {
	var url = site_url + 'site/receipts/ajax/generate_cashmemo_receipts.php';
	$.ajaxSetup({ async: true });
	$.post(url, { sales_voucher: sales_voucher, receipt_voucher: receipt_voucher }, function (res) {
		if (res.status == 0) {
			generate_cashmemo_receipt(sales_voucher, receipt_voucher);
		} else {
			alert("Receipts creation completed");
			$('#pageLoader').hide();
		}
	});
}

function generate_salesorder_receipt(salesorder_voucher, receipt_voucher) {
	var url = site_url + 'site/receipts/ajax/generate_salesorder_receipts.php';
	$.ajaxSetup({ async: true });
	$.post(url, { salesorder_voucher: salesorder_voucher, receipt_voucher: receipt_voucher }, function (res) {
		if (res.status == 0) {
			generate_salesorder_receipt(salesorder_voucher, receipt_voucher);
		} else {
			alert("Receipts creation completed");
			$('#pageLoader').hide();
		}
	});
}

function deleteThisBranch(brID, obj) {
	var url = atob($(obj).attr('data-url'));
	if (confirm('Are you sure ? ')) {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: url,
			async: false,
			data: { id: brID },
			success: function (response) {
				if (response.saveStatus == 1) {
					toastr.success(response.successmsg);
					$(obj).parent().parent().remove();
				} else {
					toastr.error(response.errormsg);
				}
			}
		});
	}
}

function erp_payment_terms($obj, funcName = '') {
	var type = $obj.data('type');

	var url = 'site/payment-terms/ajax/form.php';
	var modal = erp_create_modal(url, { type: type });
	var $modal = $('#' + modal);

	$modal.find('.saveBtn').on('click', function () {
		$('#pageLoader').show();
		var $form = $(this).closest('form');
		var formData = $form.serialize();

		var url = site_url + 'site/payment-terms/ajax/save.php';
		$.ajaxSetup({ async: true });
		$.post(url, formData, function (res) {
			$('#pageLoader').hide();
			if (res.status == 1) {
				successmsg(res.msg);
				$modal.modal('hide');

				if (funcName != '') {
					window[funcName]($obj, res.data);
				}
			} else {
				errormsg(res.msg);
			}
		});
	});
}

var pm_projects = {};

function pm_filter_project_selection($modal, customer_id) {
	if (!$modal.find('select.project-id').length) return;

	select_project = $modal.find('select.project-id')[0].selectize;
	select_project.clearOptions();

	voucher_id = $modal.find('select[name="voucher_guid"]').val() || 0;

	var url = site_url + 'site/project-management/ajax/get_projects.php';
	$.ajaxSetup({ async: true });
	$.post(url, { customer_id: customer_id, voucher_id: voucher_id }, function (res) {
		$('#pageLoader').hide();

		$.each(res, function (i, p) {
			pm_projects[p.id] = p;
			select_project.addOption({ value: p.id, text: p.title });
		});
		select_project.setValue(0);
	});

	$modal.find('select.project-id').val(0).trigger('change');
}

var pm_phases = {};

function pm_project_select_change(obj) {
	$form = $(obj).closest('form');
	var project_id = $(obj).val();
	var type = $(obj).data('type') || 'estimation';

	$select_store = $form.find('select.store-guid');
	select_phase = $form.find('select.project-phase-id')[0].selectize;
	select_phase.clearOptions();

	if (project_id) {
		$select_store.val(0);
		$select_store.prop('disabled', 'disabled');
		$form.find('.project-col').removeClass('dis-none');
		$form.find('.project-customer-name').removeClass('dis-none');
		$form.find('.project-customer-selection').addClass('dis-none');
	} else {
		$select_store.prop('disabled', '');
		$form.find('.project-col').addClass('dis-none');
		$form.find('.project-customer-name').addClass('dis-none').val('');
		$form.find('.project-customer-selection').removeClass('dis-none');
	}

	if (project_id) {
		var sales_type = (type == 'sales') ? pm_projects[project_id].sales_type : '';
		if (type == 'sales' && sales_type == 'project') {
			$form.find('select.project-phase-id').closest('.formrow').addClass('dis-none');
		} else {
			$('#pageLoader').show();
			var url = site_url + 'site/project-management/ajax/get_project_phases.php';
			$.ajaxSetup({ async: true });
			$.post(url, { project_id: project_id }, function (res) {
				$('#pageLoader').hide();
				$.each(res.phases, function (i, p) {
					pm_phases[p.id] = p;
					pm_phases[p.id]['groups'] = [];
					select_phase.addOption({ value: p.id, text: p.title });
				});
				select_phase.setValue(0);
				$form.find('.project-customer-name').val(res.customer.name || '');
			});
			$form.find('select.project-phase-id').closest('.formrow').removeClass('dis-none');
		}
	}

	// var $items_tr = $form.find('.table-items tbody tr');
	// $items_tr.remove();
}

function pm_phase_select_change(obj) {
	var $form = $(obj).closest('form');
	var project_phase_id = $(obj).val();
	var type = $(obj).data('type') || 'estimation';

	$select_store = $form.find('select.store-guid');
	select_group = $form.find('select.project-phase-group-id')[0].selectize;
	select_group.clearOptions();

	$form.find('.project-est-group').addClass('dis-none');
	$form.find('.project-general-inventory-col').hide();
	$form.find('.project-amounts-col').hide();
	$form.find('.project-payment-terms').addClass('dis-none');
	$form.find('.project-payment-terms select option:not(:first)').remove();

	if (project_phase_id) {
		var store_guid = pm_phases[project_phase_id].store_guid;
		$select_store.val(store_guid);

		var estimation_type = pm_phases[project_phase_id].estimation_type;
		var sales_type = pm_phases[project_phase_id].sales_type;

		$form.find('.phase_estimation_type').val(estimation_type);

		$form.find('.project-payment-terms').removeClass('dis-none');
		var pterms = pm_phases[project_phase_id].payment_terms;
		$.each(pterms, function (i, e) {
			$form.find('.project-payment-terms select').append(`<option value="${e.id}" data-amount="${e.inv_amount}">${e.terms}</option>`);
		});

		if (estimation_type == 'phase' || (type == 'sales' && sales_type == 'phase')) {
			var phase = pm_phases[project_phase_id];
			if (phase.general_inventory) {
				$form.find('.project-general-inventory-col').show();
				$form.find('.project-general-inventory-col .project-estimated-amount').val(cnv_Float(phase.gi_estimated_amount));
				$form.find('.project-general-inventory-col .project-processed-amount').val(cnv_Float(phase.gi_processed_amount));
				$form.find('.project-general-inventory-col .project-balance-amount').val(cnv_Float(phase.gi_balance_amount));
			}
			if ($form.find('.project-amounts-col')) {
				$form.find('.project-amounts-col').show();
				$form.find('.project-amounts-col .project-estimated-amount').val(cnv_Float(phase.estimated_amount));
				$form.find('.project-amounts-col .project-invoiced-amount').val(cnv_Float(phase.invoiced_amount));
				$form.find('.project-amounts-col .project-balance-amount').val(cnv_Float(phase.balance_amount));
			}
		}
		else {
			if (estimation_type == 'group') {
				$form.find('.project-est-group .group-by').text('Activity Group');
			}
			else if (estimation_type == 'activity') {
				$form.find('.project-est-group .group-by').text('Activity');
			}

			var url = site_url + 'site/project-management/ajax/get_project_phase_groups.php';
			$.ajaxSetup({ async: true });
			$.post(url, { phase_id: project_phase_id }, function (res) {
				$('#pageLoader').hide();
				$.each(res.groups, function (i, g) {
					pm_phases[project_phase_id]['groups'][g.id] = g;
					select_group.addOption({ value: g.id, text: g.name });
				});
				select_group.setValue(0);
			});
			$form.find('.project-est-group').removeClass('dis-none');
		}
	} else {
		$select_store.val(0);
	}
}

function pm_phase_est_group_change(obj) {
	var $form = $(obj).closest('form');
	var group_id = $(obj).val();
	var project_phase_id = $form.find('select[name="project_phase_id"]').val();

	$form.find('.project-general-inventory-col').hide();
	$form.find('.project-amounts-col').hide();

	if (group_id) {
		var group = pm_phases[project_phase_id]['groups'][group_id];
		if (group.general_inventory) {
			$form.find('.project-general-inventory-col').show();
			$form.find('.project-general-inventory-col .project-estimated-amount').val(cnv_Float(group.gi_estimated_amount));
			$form.find('.project-general-inventory-col .project-processed-amount').val(cnv_Float(group.gi_processed_amount));
			$form.find('.project-general-inventory-col .project-balance-amount').val(cnv_Float(group.gi_balance_amount));
		}
		if ($form.find('.project-amounts-col')) {
			$form.find('.project-amounts-col').show();
			$form.find('.project-amounts-col .project-estimated-amount').val(cnv_Float(group.estimated_amount));
			$form.find('.project-amounts-col .project-invoiced-amount').val(cnv_Float(group.invoiced_amount));
			$form.find('.project-amounts-col .project-balance-amount').val(cnv_Float(group.balance_amount));
		}
	}
}

function update_voucher_ref(obj) {
	$modal = $(obj).closest('.modal');
	$voucher_select = $modal.find('select[name="voucher_guid"]');
	if (!$voucher_select || $voucher_select.prop('disabled')) {
		return;
	}

	var voucher_id = parseInt($voucher_select.val());
	var date = $(obj).val();

	if (!voucher_id || isNaN(voucher_id)) return;

	$.post(site_url + 'site/transcation_settings/ajax/get_voucher_ref.php', { voucher_id: voucher_id, date: date }, function (result) {
		if (result.type == 'options') {
			$modal.find('.voucher-ref').html(result.ref);
		} else {
			$modal.find('.voucher-ref').val(result.ref);
		}
	});
}
function getFraction(ms) {
	var $fraction = isNAN($('#unit_guid_' + ms).find('option:selected').attr('data-fractional'));
	return parseInt($fraction);
}

function erp_user_mail_config(obj) {
	var userid = $(obj).data('userid');
	var url = 'site/user/ajax/mail_config_form.php';
	var modal = erp_create_modal(url, { userid: userid }, { title: 'Email Config', width: 40 });

	$('#' + modal).find('.saveBtn').on('click', function () {
		$('#pageLoader').show();
		var $form = $(this).closest('form');
		var formData = $form.serialize();

		var url = site_url + 'site/user/ajax/mail_config_save.php';
		$.ajaxSetup({ async: true });
		$.post(url, formData, function (res) {
			$('#pageLoader').hide();
			if (res.status == 1) {
				successmsg(res.msg);
				$('#' + modal).modal('hide');
			} else {
				errormsg(res.msg);
			}
		});
	});
}

function erp_mail_delete_config(obj) {
	var id = $(obj).data('id') || 0;
	confirmDialog('This cannot be undone. Are you sure to delete ?', function () {
		$('#pageLoader').show();
		var url = site_url + 'site/mail/config/ajax/delete.php';
		$.ajaxSetup({ async: true });
		$.post(url, { id: id }, function (res) {
			$('#pageLoader').hide();
			if (res.status == 1) {
				$(obj).closest('.modal').modal('hide');
			} else {
				errormsg(res.msg);
			}
		}).fail(function (response) {
			$('#pageLoader').hide();
			errormsg('Something went wrong');
			console.log(response.responseText);
		});
	});
}
$(document).on("click", "#addNewSuggestion", function () {
	$('.dynamicSelect').addClass('hidden');
	$('.dynamicSelect').next('.select2-container').hide();
	$("#newOptionInput").removeClass("hidden").focus();
});
$(document).on("blur keypress", "#newOptionInput", function (event) {
	console.log(event.type);
	if (event.type === "keypress" && event.which === 13) {
		event.preventDefault(); // Prevent form submission if inside a form
		$(this).blur(); // Manually trigger blur event
		return; // Exit to prevent duplicate execution
	}

	if (event.type === "focusout") {
		let newOption = $(this).val().trim();
		if (newOption !== "") {
			var url = atob($('#save-suggestion-url').val());
			$.ajax({
				url: url,  // Change this to your actual endpoint
				type: "POST",
				data: { name: newOption },
				success: function (response) {
					if (response.saveStatus == '1') {
						let newOptionElement = new Option(newOption, response.respid, true, true);
						$('.dynamicSelect').removeClass('hidden');
						$('.dynamicSelect').next('.select2-container').show();
						$(".dynamicSelect").append(newOptionElement).trigger("change");
					} else {
						toastr.error(response.errormsg);
					}
				}
			});
		}
		$(this).addClass("hidden"); // Hide input field
		$('.dynamicSelect').removeClass('hidden');
		$('.dynamicSelect').next('.select2-container').show();
	}
});

function erp_get_available_stock(compound_guids, store_guids) {
	var url = site_url + 'site/products/ajax/get_available_stock.php';

	$('#pageLoader').show();
	return new Promise(function (resolve, reject) {
		$.ajaxSetup({ async: true });
		$.post(url, { store_guids: store_guids, compound_guids: compound_guids }, function (res) {
			$('#pageLoader').hide();
			resolve(res);
		});
	});
}
function totalKG() {
	if (!trade_in_kg()) return;
	var tot = 0;
	$('.total-KG').each(function () {
		tot += isNAN($(this).html());
	});
	return cnv_Float(tot);
}
$(document).on('click', '.depreciation-info', function () {
	let $row = $(this).closest('tr'); // Find the closest row
	let months = $(this).data('months');
	let productId = $(this).data('proid');
	let price = $(this).data('price');
	let type = $(this).data('type');
	let date = $row.find('input[data-attr="date"]').val(); // Get the date value
	let url = atob($('#depreciation-info').val());
	$.ajax({
		url: url, // Replace with your actual PHP file
		type: 'POST',
		data: {
			months: months,
			product_id: productId,
			price: price,
			date: date,
			type: type
		},
		success: function (response) {
			erp_open_moal(response, 50);
			var action = '';
			var title = 'Depreciation';
			$('#innerform').attr('action', action);
			$('#innerModalLabel').html(title);
			$('#innerform').find('#saveBtn').addClass('hidden');
		},
		error: function (xhr, status, error) {
			toastr.error('Error processing depreciation data.');
		}
	});
});

function dp_date(date, default_date = '') {
	if (date == '' && default_date == '') return '';
	if (date == '' && default_date != '') date = default_date;

	date = new Date(date);
	return date.toLocaleDateString('en-GB').replace(/\//g, '-');
}
function getContractBtn(id, ms, voucherID, url, action) {
	var param = {};
	param['serial_no'] = ms;
	param['voucherID'] = voucherID;
	param['guid'] = btoa(id);
	param['edit_page'] = 'contract';
	var param = JSON.stringify(param);
	var param = btoa(param);
	return `<div class="store-dot btn btn-info btn-sm  " 
							data-id="${ms}"  
							data-url="${url}"
							data-param="${param}"
							data-title="Contract Form"
							data-action="${action}"
							data-target-id="contract-hidden-input-${ms}"
							data-btnlabel="Save" 
							data-modalwidth="55" 
							onclick="return add_edit_form_personal(this,1)" style="
							padding: 0px 4px;
							height: 18px;
							line-height: 13px;
							position: absolute;
							background: #db00d0;
    						border-color: #db00d0;
							top: 0px;
							right: 2pc;
							">
								<span style="font-size: 10px;">C</span>
				</div>`;
}

function erp_stocktransfer_view(obj) {
	var id = $(obj).data('id') || 0;

	var title = 'Stock Transfer';
	if ($(obj).data('consumption') == 1) {
		title = 'Stock Consumption';
	}

	var url = 'site/stocktransfer/requests2/ajax/request_view.php';
	var modal = erp_create_modal(url, { id: id }, { width: 98, title: title });
	var $modal = $('#' + modal);

	$modal.on('shown.bs.modal', function () {
		$modal.find('input').attr('readonly', 'readonly');
		$modal.find('textarea').attr('readonly', 'readonly');
	});

	$modal.find('.product-selection').closest('div').hide();
	$modal.find('.project-customer-selection').closest('.formrow').hide();
	$modal.find('.saveBtn').hide();
}

function pm_onchange_project(obj) {
	$form = $(obj).closest('form');

	if (parseInt($(obj).val())) {
		$form.find('select[name="project_customer"]').prop('disabled', true);
	} else {
		$form.find('select[name="project_customer"]').prop('disabled', false);
	}

	$form.find('select[name="project_phase_id"]').val('').trigger('change');
	$form.find('select[name="project_phase_group_id"]').val('').trigger('change');
	$form.find('select[name="project_phase_group_id"]').closest('.formrow').addClass('dis-none');
}

function pm_onchange_phase(obj, e) {
	$form = $(obj).closest('form');
	const data = e.params.data;
	var estimation_type = data.estimation_type;
	// var store_guid = data.store_guid;

	$form.find('select[name="project_phase_group_id"]').val('').trigger('change');

	if (estimation_type == 'activity' || estimation_type == 'group') {
		$form.find('select[name="project_phase_group_id"]').closest('.formrow').removeClass('dis-none');
		if (estimation_type == 'group') {
			$form.find('.phase-group').text('Activity Group');
		} else if (estimation_type == 'activity') {
			$form.find('.phase-group').text('Activity');
		}
	} else {
		$form.find('select[name="project_phase_group_id"]').closest('.formrow').addClass('dis-none');
	}
	// $form.find('.transfer-from').append(`<option value="${store_guid}" selected>${data.text}</option>`).trigger('change');
}

function pm_onselect_project_sales(obj, e) {
	$form = $(obj).closest('form');

	const data = e.params.data;
	var sales_type = data.sales_type;

	// if(parseInt($(obj).val())){
	//     $form.find('select[name="project_customer"]').prop('disabled', true);
	// } else {
	//     $form.find('select[name="project_customer"]').prop('disabled', false);
	// }

	$form.find('select[name="project_phase_id"]').val('').trigger('change');
	$form.find('select[name="project_phase_group_id"]').val('').trigger('change');
	$form.find('select[name="project_phase_group_id"]').closest('.formrow').addClass('dis-none');

	if (sales_type == 'project') {
		$form.find('select[name="project_phase_id"]').closest('.formrow').addClass('dis-none');
	} else {
		$form.find('select[name="project_phase_id"]').closest('.formrow').removeClass('dis-none');
	}
}

function pm_onchange_project_sales(obj) {
	$form = $(obj).closest('form');
	var project_id = parseInt($(obj).val());

	$('.table-project-sales-info').hide();
	$('.col-phase-info').hide();
	$('.col-phasegroup-info').hide();

	$form.find('#items-table').find('.project-id').val(project_id);
	$form.find('#items-table').find('.project-phase-id').val('');
	$form.find('#items-table').find('.project-phasegroup-id').val('');

	if (project_id) {
		$('.table-project-sales-info').show();
		$('.table-project-sales-info .project-cost-amount').prop('readonly', 'readonly');
		$('.table-project-sales-info .project-cost-perc').prop('readonly', 'readonly');

		$.post(site_url + 'site/project-management/ajax/get_project_info.php', { project_id: project_id }, function (res) {
			$('.table-project-sales-info .project-sales-amount').val(res.sales_amount);
			$('.table-project-sales-info .project-invoiced-amount').val(res.invoiced_amount);
			$('.table-project-sales-info .project-balance-amount').val(res.balance_to_invoice);
			$('.table-project-sales-info .project-wip-value').val(res.wip_value);
			$('.table-project-sales-info .project-cost-amount').val(res.net_total_cost);
			$('.table-project-sales-info .project-cost-perc').val(res.cost_perc);
			$('.table-project-sales-info .project-taxable').val(res.taxable);
			$('.project_sales_type_value_ref').val('project'); 
			// $('#SHOW_vat_amount' + project_id).html(toCommas(cnvFloat(0)));
			// // $('#FINAL_SHOW_VAT' ).html(toCommas(cnvFloat(0)));
			// $form.find('#items-table').find('.only_vat_cols').each(function () {
			// 	$(this).text('0.00');
			// }); $('.table-project-sales-info .project-cost-amount').prop('readonly', '');
			// $('.table-project-sales-info .project-cost-perc').prop('readonly', '');

		});
	}
}

function pm_onselect_phase_sales(obj, e) {
	$form = $(obj).closest('form');

	const data = e.params.data;
	var sales_type = data.sales_type;
	var estimation_type = data.estimation_type;

	$form.find('select[name="project_phase_group_id"]').val('').trigger('change');

	var phase_selected = $(obj).find('option:selected');
	const newOption = new Option(phase_selected[0].text, phase_selected[0].value, false, false);
	$form.find('#items-table').find('.project-phase-id').append(newOption).val(phase_selected[0].value).trigger('change');
	$form.find('#items-table').find('.project-phasegroup-id').val('').trigger('change');

	if (sales_type == 'phase_group') {
		$form.find('select[name="project_phase_group_id"]').closest('.formrow').removeClass('dis-none');
		if (estimation_type == 'group') {
			$form.find('.phase-group').text('Activity Group');
		} else if (estimation_type == 'activity') {
			$form.find('.phase-group').text('Activity');
		}
	} else {
		$form.find('select[name="project_phase_group_id"]').closest('.formrow').addClass('dis-none');
	}
}

function pm_onchange_phase_sales(obj) {
	var phase_id = $(obj).val();

	$('.col-phase-info').hide();
	$('.col-phasegroup-info').hide();
	if (phase_id) {
		$('.col-phase-info').show();
		$('.col-phase-info .phase-cost-amount').prop('readonly', 'readonly');
		$('.col-phase-info .phase-cost-perc').prop('readonly', 'readonly');

		$.post(site_url + 'site/project-management/ajax/get_project_info.php', { phase_id: phase_id }, function (res) {
			$('.col-phase-info .phase-sales-amount').val(res.sales_amount);
			$('.col-phase-info .phase-invoiced-amount').val(res.invoiced_amount);
			$('.col-phase-info .phase-balance-amount').val(res.balance_to_invoice);
			$('.col-phase-info .phase-wip-value').val(res.wip_value);
			$('.col-phase-info .phase-cost-amount').val(res.net_total_cost);
			$('.col-phase-info .phase-cost-perc').val(res.cost_perc);
			$('.col-phase-info .phase-taxable').val(res.taxable);
			if (res.sales_type == 'phase' && !parseFloat(res.cost_perc)) {
				$('.col-phase-info .phase-cost-amount').prop('readonly', '');
				$('.col-phase-info .phase-cost-perc').prop('readonly', '');
			}
		});
	}
}

function pm_onchange_phasegroup_sales(obj) {
	var phasegroup_id = $(obj).val();
	var phase_id = $('select[name="project_phase_id"]').val();

	$('.col-phasegroup-info').hide();
	if (phasegroup_id) {
		$('.col-phasegroup-info').show();
		$('.col-phasegroup-info .phasegroup-cost-amount').prop('readonly', 'readonly');
		$('.col-phasegroup-info .phasegroup-cost-perc').prop('readonly', 'readonly');

		$.post(site_url + 'site/project-management/ajax/get_project_info.php', { phase_id: phase_id, phasegroup_id: phasegroup_id }, function (res) {
			$('.col-phasegroup-info .phasegroup-sales-amount').val(res.sales_amount);
			$('.col-phasegroup-info .phasegroup-invoiced-amount').val(res.invoiced_amount);
			$('.col-phasegroup-info .phasegroup-balance-amount').val(res.balance_to_invoice);
			$('.col-phasegroup-info .phasegroup-wip-value').val(res.wip_value);
			$('.col-phasegroup-info .phasegroup-cost-amount').val(res.net_total_cost);
			$('.col-phasegroup-info .phasegroup-cost-perc').val(res.cost_perc);
			$('.col-phasegroup-info .phasegroup-taxable').val(res.taxable);
			if (res.sales_type == 'phase_group' && !parseFloat(res.cost_perc)) {
				$('.col-phasegroup-info .phasegroup-cost-amount').prop('readonly', '');
				$('.col-phasegroup-info .phasegroup-cost-perc').prop('readonly', '');
			}
		});
	}
}

function pm_onselect_phasegroup_sales(obj, e) {
	$form = $(obj).closest('form');

	var phasegroup_selected = $(obj).find('option:selected');
	const newOption = new Option(phasegroup_selected[0].text, phasegroup_selected[0].value, false, false);
	$form.find('#items-table').find('.project-phasegroup-id').append(newOption).val(phasegroup_selected[0].value).trigger('change');
}

function btoaUnicode(str) {
	return btoa(unescape(encodeURIComponent(str)));
}
function atobUnicode(str) {
	return decodeURIComponent(escape(atob(str)));
}
function user_signature(obj, type = 0) {
	var id = $(obj).data('id') || 0;
	var url = 'site/user/ajax/user_signature_form.php';
	var saveURL = site_url + 'site/user/ajax/user_signature_save.php';
	var title = 'User Signature';
	if (type == 2) {
		url = 'site/user/ajax/stamp_form.php';
		saveURL = site_url + 'site/user/ajax/stamp_save.php',
			title = 'Stamp';
	}
	var modal = erp_create_modal(url, { userid: id }, { title: title });
	var $modal = $('#' + modal);

	$modal.find('.saveBtn').html('<i class="fa fa-upload"></i> Upload').on('click', function () {
		$('#pageLoader').show();

		var form_id = $(this).closest('form').attr('id');
		var formData = new FormData(document.getElementById(form_id));

		$.ajaxSetup({ async: true });
		$.ajax({
			type: 'POST',
			url: saveURL,
			data: formData,
			processData: false,
			contentType: false,
			success: function (res) {
				$('#pageLoader').hide();
				if (res.status == 1) {
					successmsg(res.msg);
					$modal.modal('hide');
				} else {
					errormsg(res.msg);
				}
			}
		});
	});
}
function logo_right(obj, type = 0) {
	const encodedId = obj.getAttribute('data-id');
	let decodedId = null;
	decodedId = atob(encodedId);
	var id = $(obj).data('id') || 0;
	var url = 'site/user/ajax/logo_right_form.php';
	var saveURL = site_url + 'site/user/ajax/logo_right_save.php';
	var title = 'Logo (Right)';
	var modal = erp_create_modal(url, { userid: id, record_id: decodedId }, { title: title });
	var $modal = $('#' + modal);

	$modal.find('.saveBtn').html('<i class="fa fa-upload"></i> Upload Logo').on('click', function () {
		$('#pageLoader').show();
		var form_id = $(this).closest('form').attr('id');
		var formData = new FormData(document.getElementById(form_id));
		formData.append('record_id', decodedId);
		$.ajaxSetup({ async: true });
		$.ajax({
			type: 'POST',
			url: saveURL,
			data: formData,
			processData: false,
			contentType: false,
			success: function (res) {
				$('#pageLoader').hide();
				if (res.status == 1) {
					successmsg(res.msg);
					$modal.modal('hide');
				} else {
					errormsg(res.msg);
				}
			}
		});
	});
}
function logo_right_delete(obj, type = 0) {
	const encodedId = obj.getAttribute('data-id');
	let decodedId = null;
	decodedId = atob(encodedId);
	var id = $(obj).data('id') || 0;
	url = site_url + 'site/user/ajax/logo_right_delete.php';
	$('#pageLoader').show();

	$.ajaxSetup({ async: true });
	$.post(url, { userid: id, record_id: decodedId }, function (res) {
		$('#pageLoader').hide();
		if (res.status == 1) {
			successmsg(res.msg);
			$(obj).closest('.formrow').remove();
		} else {
			errormsg(res.msg);
		}
	})

}
function logo_left(obj, type = 0) {
	const encodedId = obj.getAttribute('data-id');
	let decodedId = null;
	decodedId = atob(encodedId);
	var id = $(obj).data('id') || 0;
	var url = 'site/user/ajax/logo_left_form.php';
	var saveURL = site_url + 'site/user/ajax/logo_left_save.php';
	var title = 'Logo (Left)';
	var modal = erp_create_modal(url, { userid: id, record_id: decodedId }, { title: title });
	var $modal = $('#' + modal);

	$modal.find('.saveBtn').html('<i class="fa fa-upload"></i> Upload Logo').on('click', function () {
		$('#pageLoader').show();
		var form_id = $(this).closest('form').attr('id');
		var formData = new FormData(document.getElementById(form_id));
		formData.append('record_id', decodedId);
		$.ajaxSetup({ async: true });
		$.ajax({
			type: 'POST',
			url: saveURL,
			data: formData,
			processData: false,
			contentType: false,
			success: function (res) {
				$('#pageLoader').hide();
				if (res.status == 1) {
					successmsg(res.msg);
					$modal.modal('hide');
				} else {
					errormsg(res.msg);
				}
			}
		});
	});
}
function logo_left_delete(obj, type = 0) {
	const encodedId = obj.getAttribute('data-id');
	let decodedId = null;
	decodedId = atob(encodedId);
	var id = $(obj).data('id') || 0;
	url = site_url + 'site/user/ajax/logo_left_delete.php';
	$('#pageLoader').show();

	$.ajaxSetup({ async: true });
	$.post(url, { userid: id, record_id: decodedId }, function (res) {
		$('#pageLoader').hide();
		if (res.status == 1) {
			successmsg(res.msg);
			$(obj).closest('.formrow').remove();
		} else {
			errormsg(res.msg);
		}
	})

}
function footer(obj, type = 0) {
	const encodedId = obj.getAttribute('data-id');
	let decodedId = null;
	decodedId = atob(encodedId);
	var id = $(obj).data('id') || 0;
	var url = 'site/user/ajax/footer_form.php';
	var saveURL = site_url + 'site/user/ajax/footer_save.php';
	var title = 'Footer';
	var modal = erp_create_modal(url, { userid: id, record_id: decodedId }, { title: title });
	var $modal = $('#' + modal);

	$modal.find('.saveBtn').html('<i class="fa fa-upload"></i> Upload Footer').on('click', function () {
		$('#pageLoader').show();
		var form_id = $(this).closest('form').attr('id');
		var formData = new FormData(document.getElementById(form_id));
		formData.append('record_id', decodedId);
		$.ajaxSetup({ async: true });
		$.ajax({
			type: 'POST',
			url: saveURL,
			data: formData,
			processData: false,
			contentType: false,
			success: function (res) {
				$('#pageLoader').hide();
				if (res.status == 1) {
					successmsg(res.msg);
					$modal.modal('hide');
				} else {
					errormsg(res.msg);
				}
			}
		});
	});
}
function footer_delete(obj, type = 0) {
	const encodedId = obj.getAttribute('data-id');
	let decodedId = null;
	decodedId = atob(encodedId);
	var id = $(obj).data('id') || 0;
	url = site_url + 'site/user/ajax/footer_delete.php';
	$('#pageLoader').show();

	$.ajaxSetup({ async: true });
	$.post(url, { userid: id, record_id: decodedId }, function (res) {
		$('#pageLoader').hide();
		if (res.status == 1) {
			successmsg(res.msg);
			$(obj).closest('.formrow').remove();
		} else {
			errormsg(res.msg);
		}
	})

}

function toggleFooterFields(type) {
	var textFields = document.getElementById('footer_text_fields');
	var imageFields = document.getElementById('footer_image_fields');

	if (type === 'text') {
		textFields.style.display = 'block';
		imageFields.style.display = 'none';
	} else if (type === 'image') {
		textFields.style.display = 'none';
		imageFields.style.display = 'block';
	}
}
function format_color(obj, type = 0) {
	const encodedId = obj.getAttribute('data-id');
	let decodedId = null;
	decodedId = atob(encodedId);
	var id = $(obj).data('id') || 0;
	var url = 'site/user/ajax/format_color.php';
	var saveURL = site_url + 'site/user/ajax/format_color_save.php';
	var title = 'Format Color';
	var modal = erp_create_modal(url, { userid: id, record_id: decodedId }, { title: title });
	var $modal = $('#' + modal);

	$modal.find('.saveBtn').html('<i class="fa fa-upload"></i> Update').on('click', function () {
		$('#pageLoader').show();
		var form_id = $(this).closest('form').attr('id');
		var formData = new FormData(document.getElementById(form_id));
		formData.append('record_id', decodedId);
		$.ajaxSetup({ async: true });
		$.ajax({
			type: 'POST',
			url: saveURL,
			data: formData,
			processData: false,
			contentType: false,
			success: function (res) {
				$('#pageLoader').hide();
				if (res.status == 1) {
					successmsg(res.msg);
					$modal.modal('hide');
				} else {
					errormsg(res.msg);
				}
			}
		});
	});
}
function format_settings(obj, type = 0) {
	const encodedId = obj.getAttribute('data-id');
	let decodedId = null;
	decodedId = atob(encodedId);
	var id = $(obj).data('id') || 0;
	var url = 'site/user/ajax/format_settings.php';
	var saveURL = site_url + 'site/user/ajax/format_settings_save.php';
	var title = 'Format Settings';
	var modal = erp_create_modal(url, { userid: id, record_id: decodedId }, { title: title });
	var $modal = $('#' + modal);

	$modal.find('.saveBtn').html('Update').on('click', function () {
		$('#pageLoader').show();
		var form_id = $(this).closest('form').attr('id');
		var formData = new FormData(document.getElementById(form_id));
		formData.append('record_id', decodedId);
		$.ajaxSetup({ async: true });
		$.ajax({
			type: 'POST',
			url: saveURL,
			data: formData,
			processData: false,
			contentType: false,
			success: function (res) {
				$('#pageLoader').hide();
				if (res.status == 1) {
					successmsg(res.msg);
					$modal.modal('hide');
				} else {
					errormsg(res.msg);
				}
			}
		});
	});
}
















function user_signature_delete(obj, type = 0) {
	var id = $(obj).data('id') || 0;
	if (type == 2) {
		url = site_url + 'site/user/ajax/stamp_delete.php';
		$('#pageLoader').show();

		$.ajaxSetup({ async: true });
		$.post(url, { userid: id }, function (res) {
			$('#pageLoader').hide();
			if (res.status == 1) {
				successmsg(res.msg);
				$(obj).closest('.formrow').remove();
			} else {
				errormsg(res.msg);
			}
		})
	} else {
		confirmDialog('This cannot be undone. Are you sure to delete ?', function () {
			$('#pageLoader').show();
			var url = site_url + 'site/user/ajax/user_signature_delete.php';

			$.ajaxSetup({ async: true });
			$.post(url, { userid: id }, function (res) {
				$('#pageLoader').hide();
				if (res.status == 1) {
					successmsg(res.msg);
					$(obj).closest('.formrow').remove();
				} else {
					errormsg(res.msg);
				}
			})
		});
	}
}

function pm_assign_project(obj) {
	var type = $(obj).data('type');
	var id = $(obj).data('id');

	var url = 'site/project-management/ajax/assign_project_form.php';
	var modal = erp_create_modal(url, { id: id, type: type }, { width: 50, title: 'Assign Project' });
	var $modal = $('#' + modal);

	$modal.on('shown.bs.modal', function () {
		$('.select2-ajax').select2({
			width: '100%',
			multiple: false,
			closeOnSelect: true,
			ajax: {
				url: site_url + 'site/project-management/ajax/search.php',
				dataType: 'json',
				delay: 250,
				data: function (params) {
					var type = $(this).attr('data-type');
					var project_customer = $modal.find('select[name="project_customer"]').val();
					var project_id = $modal.find('select[name="project_id"]').val();
					var project_phase_id = $modal.find('select[name="project_phase_id"]').val();

					return { type: type, project_customer: project_customer, project_id: project_id, project_phase_id: project_phase_id, search: params.term, page: params.page || 1 };
				},
				processResults: function (data, params) {
					params.page = params.page || 1;
					return {
						results: $.map(data.items, function (item) {
							return { id: item.id, text: item.ref, estimation_type: (item.estimation_type || '') };
						}),
						pagination: {
							more: (params.page * 10) < data.total_count
						}
					};
				},
				cache: true
			},
			placeholder: 'Search',
			minimumInputLength: 0,
			allowClear: true
		});
	});

	$modal.on('change', 'select[name="project_id"]', function () {
		$modal.find('select[name="project_phase_id"]').val('').trigger('change');
	});

	$modal.on('change', 'select[name="project_phase_id"]', function () {
		$modal.find('select[name="project_phase_group_id"]').val('');
		$modal.find('select[name="project_phase_group_id"]').closest('.formrow').addClass('dis-none');
	});

	$modal.on('select2:select', 'select[name="project_phase_id"]', function (e) {
		const data = e.params.data;
		var estimation_type = data.estimation_type;

		$modal.find('select[name="project_phase_group_id"]').val('').trigger('change');
		if (estimation_type != 'phase') {
			$modal.find('select[name="project_phase_group_id"]').closest('.formrow').removeClass('dis-none');
			if (estimation_type == 'group') {
				$modal.find('select[name="project_phase_group_id"]').closest('.formrow').find('label').text('Activity Group');
			} else if (estimation_type == 'activity') {
				$modal.find('select[name="project_phase_group_id"]').closest('.formrow').find('label').text('Activity');
			}
		}
	});

	$modal.find('.saveBtn').on('click', function () {
		$('#pageLoader').show();
		var $form = $(this).closest('form');
		var formData = $form.serialize();

		var url = site_url + 'site/project-management/ajax/assign_project_save.php';
		$.ajaxSetup({ async: true });
		$.post(url, formData, function (res) {
			$('#pageLoader').hide();
			if (res.status == 1) {
				filter_page(0, 1);
				successmsg(res.msg);
				$modal.modal('hide');
			} else {
				errormsg(res.msg);
			}
		});
	});
}

function erp_cost_center_allocation_form(obj) {
	var $form = $(obj).closest('form');
	var $wrapper = $(obj).closest('.cc-group');
	var type = $(obj).data('type') || '';
	var view_only = $(obj).data('view-only') || 0;
	var gross_total = 0;
	var title = 'Cost Center';

	switch (type) {
		case 'sales-n-pur-doc':
			title = 'Document Cost Center';
			$form.find('.items-table > tbody > tr').each(function (i, e) {
				var is_non_inv = $(e).find('.non-inv-class').val();
				if (is_non_inv == 0) {
					gross_total += parseFloat($(e).find('.gross_total_after').val());
				}
			});
			break;

		case 'sales-n-pur-entity':
			gross_total = $form.find('.doc_gross_total_after_disc').val();
			break;

		case 'sales-n-pur-item':
			title = 'Item Cost Center';
			$wrapper = $(obj).closest('tr');
			gross_total = $wrapper.find('.gross_total_after').val();
			break;

		case 'journal-item':
			$wrapper = $(obj).closest('tr');

			if ($wrapper.find('.acType').val() == 2) {
				gross_total = $wrapper.find('.dr-input').val();
			} else {
				gross_total = $wrapper.find('.cr-input').val();
			}
			break;

		case 'pay-n-rec-doc':
			title = 'Document Cost Center';
			gross_total = $form.find('[name="amount"]').val();
			break;

		case 'pay-n-rec-entity':
			title = $(obj).data('entity') + ' Cost Center';
			gross_total = $form.find('[name="amount"]').val();
			break;

		case 'pay-n-rec-trns':
			title = 'Settlement Cost Center';
			$wrapper = $(obj).closest('tr');
			gross_total = $wrapper.find('.invoice_amount').val();
			break;

		case 'pay-n-rec-settlement-ledger':
			title = 'Payment Method Cost Center';
			$wrapper = $(obj).closest('.settlement_tr');
			gross_total = $wrapper.find('.settle_amount').val();
			break;

		case 'pdn-doc':
			title = 'Document Cost Center';
			$form.find('.table-items > tbody > tr').each(function (i, e) {
				gross_total += parseFloat($(e).find('.gross_total').val());
			});
			break;

		case 'pdn-item':
			title = 'Item Cost Center';
			$wrapper = $(obj).closest('tr');
			gross_total = $wrapper.find('.gross_total').val();
			break;

		case 'st-doc':
			title = 'Document Cost Center';
			$form.find('.table-items > tbody > tr').each(function (i, e) {
				gross_total += parseFloat($(e).find('.gross_total').val());
			});
			break;

		case 'st-item':
			title = 'Item Cost Center';
			$wrapper = $(obj).closest('tr');
			gross_total = $wrapper.find('.gross_total').val();
			break;

		case 'ps-doc':
			title = 'Document Cost Center';
			$form.find('.table-items > tbody > tr').each(function (i, e) {
				// gross_total += (parseFloat($(e).find('.store_item_variance').val()) || 0) * (parseFloat($(e).find('.manual-cost').val()) || 0);
				gross_total += parseFloat($(e).find('.total_variance').val()) || 0;
			});
			break;
	}

	var edit_data = $wrapper.find('.cost-center-data').val();

	var url = 'site/cost-centre/ajax/cost_center_allocation_form.php';
	var modal = erp_create_modal(url, { gross_total: gross_total, edit_data: edit_data }, { width: 60, title: title });
	var $modal = $('#' + modal);

	$modal.on('shown.bs.modal', function () {
		if (!edit_data && !view_only) {
			$modal.find('.btn-insert-row').click();
		}

		if (view_only) {
			$modal.find('input').attr('readonly', 'readonly');
			$modal.find('textarea').attr('readonly', 'readonly');
			$modal.find('select').attr('disabled', 'disabled');
			$modal.find('table').find('a').remove();
			$modal.find('.saveBtn').hide();
		}
	});

	$modal.on('change', '.cost-category', function () {
		var $tr = $(this).closest('tr');
		var category = parseInt($(this).val());

		$tr.find('.cost-center option:not(:first)').remove();
		$tr.find('.cost-center').trigger('change');

		if (category) {
			$('#pageLoader').show();
			$.ajaxSetup({ async: false });
			$.post(site_url + 'site/cost-centre/ajax/get_cost_centers.php', { category: category }, function (res) {
				$('#pageLoader').hide();
				$.each(res, function (i, e) {
					$tr.find('.cost-center').append(`<option value="${e.id}">${e.name}</option>`);
				});
				$tr.find('.cost-center').trigger('change');
			});
		}
	});

	$modal.on('change', '.cost-center', function () {
		var $options = $(this).closest('tbody').find('tr:not(.row-template) .cost-center');

		let selectedValues = $options.map(function () {
			return $(this).val();
		}).get().filter(val => val !== "0");

		$options.each(function () {
			let currentSelect = $(this);
			let currentValue = currentSelect.val();

			currentSelect.find("option").each(function () {
				if ($(this).val() !== "0") {
					$(this).prop("disabled", false);
				}
			});

			currentSelect.find("option").each(function () {
				let optionVal = $(this).val();
				if (optionVal !== "0" && selectedValues.includes(optionVal) && optionVal !== currentValue) {
					$(this).prop("disabled", true);
				}
			});
		});
	});

	$modal.on('change', '.perc, .amount', function () {
		var $tr = $(this).closest('tr');

		if ($(this).val() < 0) {
			$(this).val(0);
		}

		var gross_total = parseFloat($modal.find('.gross-total').val()) || 0;
		if ($(this).hasClass('perc')) {
			var field = 'perc';
			var perc = parseFloat($(this).val()) || 0;
			var amount = cnv_Float((gross_total * perc) / 100);
			$(this).closest('tr').find('.amount').val(amount);
		}

		if ($(this).hasClass('amount')) {
			var field = 'amount';
			if (gross_total) {
				var amount = parseFloat($(this).val()) || 0;
				var perc = ((amount * 100) / gross_total).toFixed(2);
				$(this).closest('tr').find('.perc').val(perc);
			}
		}

		erp_cost_center_allocation_calc($tr, field);
	});

	$modal.on('click', '.remove-tr', function () {
		$table = $(this).closest('table');
		$(this).closest('tr').remove();

		var edit_guid = $(this).closest('tr').find('.edit-guid').val() || 0;
		if (edit_guid) {
			$form.append(`<input type="hidden" name="delete_costcenters[]" value=${edit_guid}>`);
		}

		erp_cost_center_allocation_calc($table);
	});

	$modal.find('.saveBtn').on('click', function () {
		$('#pageLoader').show();
		var $form = $(this).closest('form');
		var gross_total = parseFloat($form.find('.gross-total').val()) || 0;
		var total_perc = total_amount = 0;
		let valid = true;

		$.each($form.find('tbody tr:not(.row-template)'), function (i, e) {
			cost_center_id = $(e).find('.cost-center').val();
			perc = parseFloat($(e).find('.perc').val()) || 0;

			total_perc += perc;
			total_amount += parseFloat($(e).find('.amount').val()) || 0;

			if (cost_center_id == '0') {
				toastr.error('Select Cost Center');
				valid = false;
				return false;
			}

			if (!perc) {
				toastr.error('Enter Percentage');
				valid = false;
				return false;
			}
		});

		$('#pageLoader').hide();
		if (!valid) {
			return;
		}
		if (total_perc > 0 && cnv_Float(total_perc, 2) != '100.00') {
			toastr.error('Total percentage should be 100');
			return;
		}
		if (cnv_Float(total_amount) > cnv_Float(gross_total)) {
			toastr.error('Total input amount cannot exceed the total value');
			return;
		}

		$wrapper.find('.cost-center-data').val(btoa($form.serialize()));

		$modal.modal('hide');
	});
}

function erp_cost_center_allocation_calc($el, field = '') {
	if ($el.is('tr')) {
		var $table = $el.closest('table');
	} else if ($el.is('table')) {
		var $table = $el;
	}

	var $form = $table.closest('form');
	var $tbody = $table.find('tbody');
	var $tfoot = $table.find('tfoot');

	var gross_total = parseFloat($form.find('.gross-total').val()) || 0;
	var total_perc = total_amount = 0;

	$.each($tbody.find('tr:not(.row-template)'), function (i, e) {
		total_perc += parseFloat($(e).find('.perc').val()) || 0;
		total_amount += parseFloat($(e).find('.amount').val()) || 0;
	});

	$tfoot.find('.perc').text(total_perc.toFixed(2));
	$tfoot.find('.amount').text(cnv_Float(total_amount));

	if (field == 'perc' && total_perc > 100) {
		toastr.error('Total percentage cannot exceed 100');
		return;
	}

	if (field == 'amount' && cnv_Float(total_amount) > cnv_Float(gross_total)) {
		toastr.error('Total input amount cannot exceed the total value');
		return;
	}

	var bal_perc = 100 - total_perc;
	var bal_amount = gross_total - total_amount;

	if (bal_perc < 0) bal_perc = 0;
	if (bal_amount < 0) bal_amount = 0;

	$tbody.find('.row-template .perc').val(bal_perc.toFixed(2));
	$tbody.find('.row-template .amount').val(cnv_Float(bal_amount));
}

function erp_cost_center_allocation_view(obj) {
	var type = $(obj).data('type');
	var guid = $(obj).data('guid');

	var url = 'site/cost-centre/ajax/cost_center_allocation_view.php';
	var modal = erp_create_modal(url, { type: type, guid: guid }, { width: 60, title: 'Cost Center' });
	$('#' + modal).find('.saveBtn').hide();
}

function erp_print_barcode(obj) {
	var product_guid = $(obj).data('product-guid');
	var compound_guid = $(obj).data('compound-guid') || 0;

	var url = 'site/products/barcode-print/print_form.php';
	var modal = erp_create_modal(url, { product_guid: product_guid, compound_guid: compound_guid }, { width: 60, title: 'Print Barcode' });
	var $modal = $('#' + modal);

	$modal.on('shown.bs.modal', function () {
		$modal.find('.saveBtn').html('<i class="fas fa-print"></i> Print');
		$(`<a class="btn btn-info text-white saveBtn" data-dl="1"><i class="fas fa-download"></i> Download</a>`).insertBefore($modal.find('.saveBtn'));
		$modal.find('select[name="format"]').trigger('change');
	});

	$modal.on('change', 'select[name="format"]', function () {
		var value = $(this).val();
		var $selected = $(this).find('option:selected');

		$modal.find('.related-config').hide();
		$modal.find('.related-config.' + value).show();

		var label_info = '';
		label_info += `<p class="mb-0">Size : ${$selected.data('size')}</p>`;
		label_info += `<p class="mb-0">File Type : ${$selected.data('file-type').toUpperCase()}</p>`;
		$modal.find('.label-info').html(label_info);
	});

	$modal.on('click', '.saveBtn', function () {
		$('#pageLoader').show();
		var dl = parseInt($(this).data('dl')) || 0;
		var $form = $(this).closest('form');
		var formData = $form.serialize();

		// var print_type = $form.find('select[name="printer_type"]').val();
		var $format = $form.find('select[name="format"] option:selected');
		var url = $format.data('url');
		var file_type = $format.data('file-type');

		$.ajaxSetup({ async: true });
		$.post(site_url + 'site/' + url, formData, function (res) {
			$('#pageLoader').hide();
			if (res.status == 1) {
				if (dl == 1) {
					var link = document.createElement('a');
					link.setAttribute('download', '');
					link.href = res.url;
					document.body.appendChild(link);
					link.click();
					link.remove();
					successmsg('Barcode Downloaded');
				} else {
					if (file_type == 'pdf') {
						var win = window.open(res.url, '_blank');
						win.focus();
						win.addEventListener('load', win.print(), true);
					}
					else if (file_type == 'zpl') {
						var session_id = $('#session_id').val();
						jsWebClientPrint.print(`pid=${res.printer}&installedPrinterName=${res.printer_name}&sid=${session_id}&printerCommands=${res.zpl}`);
						successmsg('Data sent to printer.');
					}
				}

				$modal.modal('hide');
			} else {
				errormsg(res.msg);
			}
		});
	});
}

function erp_save_and_print(res) {
	if (res.pdf_disabled == 1) {
		toastr.error('Printing document not allowed');
		return;
	}

	if (res.pdf_type && res.pdf_disabled != 1) {
		var link = document.createElement('a');
		link.setAttribute('href', '#');
		link.setAttribute('data-action', 'print');
		link.setAttribute('data-id', res.order_id);
		link.setAttribute('data-voucherid', res.voucher_id);
		link.setAttribute('data-format', res.pdf_format);
		link.setAttribute('data-url', res.pdf_url);
		link.setAttribute('onclick', 'erp_export_as_pdf(this, "' + res.pdf_type + '")');

		document.body.appendChild(link);
		link.click();
	}
}

// Enter Batch/SN details
function erp_enter_batch_details($tr) {
	var product_guid = $tr.find('.product_guid').val();
	var item_qty = parseFloat($tr.find('.oqty').val()) || 0;
	var batch_item = parseInt($tr.find('.batch_item').val()) || 0;
	var serial_no_item = parseInt($tr.find('.serial_no_item').val()) || 0;
	var batch_edit_data = $tr.find('.batch-data').val();
	var serial_no_edit_data = $tr.find('.serial-no-data').val();

	if (!batch_item && !serial_no_item) return;

	url = 'site/batch_number/enter_batch_details.php';
	var modal = erp_create_modal(url, { product_guid: product_guid, qty: item_qty, batch_item: batch_item, serial_no_item: serial_no_item, batch_edit_data: batch_edit_data, serial_no_edit_data: serial_no_edit_data }, { padding: 0 });
	$modal = $('#' + modal);

	$modal.on('shown.bs.modal', function () {
		if (!$modal.find('.table-batch-selection tbody tr:not(.row-template)').length) {
			$modal.find('.table-batch-selection .btn-insert-row').click();
		}

		$modal.on('focus', '.batch-qty', function () {
			var bal_qty = item_qty;

			$modal.find('.batch-qty').each(function () {
				bal_qty -= parseFloat($(this).val()) || 0;
			});

			if (bal_qty > 0 && $(this).val() == '') {
				var decimals = parseFloat($modal.find('.decimals').val());

				$(this).val(bal_qty.toFixed(decimals));
			}

			$(this).select();
		});

		$modal.on('change', '.batch-qty', function () {
			if ($(this).val() == '') return;
			if ($(this).val() < 0) $(this).val(0);

			var qty = parseFloat($(this).val()) || 0;
			var decimals = parseFloat($modal.find('.decimals').val());

			var bal_qty = item_qty;
			$modal.find('.batch-qty').not(this).each(function () {
				bal_qty -= parseFloat($(this).val()) || 0;
			});

			if (qty > bal_qty) {
				toastr.error('Total batch quantity cannot be grater than item quantity');
			}

			$(this).val(qty.toFixed(decimals));
		});

		$modal.on('blur', '.batch-qty', function () {
			var bal_qty = item_qty;
			$modal.find('.batch-qty').each(function () {
				bal_qty -= parseFloat($(this).val()) || 0;
			});

			if (bal_qty > 0) {
				$modal.find('.table-batch-selection .btn-insert-row').click();
			}
		});

		$modal.on('click', '.btn-clear-serial-no', function () {
			$(this).closest('tr').find('.serial-no').val('');
		});
	});

	$modal.find('.saveBtn').on('click', function () {
		$('#pageLoader').show();
		var total_qty = 0;
		let valid = true;

		if (batch_item) {
			$.each($modal.find('.table-batch-selection .batch-qty'), function (i, e) {
				var qty = parseFloat($(this).val()) || 0;

				if (qty < 0) {
					toastr.error('Quantity cannot be -ve');
					valid = false;
					return false;
				}
				total_qty += qty;
			});
		}

		$('#pageLoader').hide();
		if (!valid) {
			return;
		}

		if (batch_item) {
			if (cnv_Float(total_qty) != cnv_Float(item_qty)) {
				toastr.error('Total batch quantity should be equal to item quantity');
				return;
			}
			$tr.find('.batch-data').val(btoa($modal.find('.table-batch-selection :input').serialize()));
		}

		if (serial_no_item) {
			$tr.find('.serial-no-data').val(btoa($modal.find('.table-serial-no-selection :input').serialize()));
		}

		$modal.modal('hide');
	});
}

// Batch/SN selection for GRN/Purchase/Sales Return and Process GRN/LC
function erp_select_batch_for_process(source_voucher_type, $tr) {
	var source_item_id = $tr.find('.source_item_id').val();
	var item_qty = parseFloat($tr.find('.qty').length ? $tr.find('.qty').val() : $tr.find('.oqty').val()) || 0;
	var batch_item = parseInt($tr.find('.batch_item').val()) || 0;
	var serial_no_item = parseInt($tr.find('.serial_no_item').val()) || 0;
	var batch_edit_data = $tr.find('.batch-data').val();
	var serial_no_edit_data = $tr.find('.serial-no-data').val();
	var is_processing = $tr.find('.batch-data').data('is-processing') || 0;

	if (!batch_item && !serial_no_item) return;

	url = 'site/batch_number/select_batch_for_process.php';
	var modal = erp_create_modal(url, { source_voucher_type: source_voucher_type, source_item_id: source_item_id, is_processing: is_processing, qty: item_qty, batch_item: batch_item, serial_no_item: serial_no_item, batch_edit_data: batch_edit_data, serial_no_edit_data: serial_no_edit_data }, { padding: 0 });
	$modal = $('#' + modal);

	$modal.on('shown.bs.modal', function () {
		$modal.on('focus', '.batch-qty', function () {
			var bal_qty = item_qty;

			$modal.find('.batch-qty').each(function () {
				bal_qty -= parseFloat($(this).val()) || 0;
			});

			if (bal_qty > 0 && $(this).val() == '') {
				var decimals = parseFloat($modal.find('.decimals').val());
				var available_qty = parseFloat($(this).data('available-qty')) || 0;
				var input_qty = (bal_qty < available_qty) ? bal_qty : available_qty;

				$(this).val(input_qty.toFixed(decimals));
			}

			$(this).select();
		});

		$modal.on('change', '.batch-qty', function () {
			if ($(this).val() == '') return;
			if ($(this).val() < 0) $(this).val(0);

			var qty = parseFloat($(this).val()) || 0;
			var available_qty = parseFloat($(this).data('available-qty')) || 0;
			var decimals = parseFloat($modal.find('.decimals').val());

			var bal_qty = item_qty;
			$modal.find('.batch-qty').not(this).each(function () {
				bal_qty -= parseFloat($(this).val()) || 0;
			});

			if (qty > bal_qty) {
				toastr.error('Total batch quantity cannot be grater than item quantity');
			}

			if (qty > available_qty) {
				toastr.error('Quantity batch cannot be grater than available quantity');
			}

			$(this).val(qty.toFixed(decimals));
		});
	});

	$modal.find('.saveBtn').on('click', function () {
		$('#pageLoader').show();
		var total_qty = 0;
		let valid = true;

		if (batch_item) {
			$.each($modal.find('.table-batch-selection .batch-qty'), function (i, e) {
				var qty = parseFloat($(this).val()) || 0;
				var available_qty = parseFloat($(this).data('available-qty')) || 0;

				if (qty < 0) {
					toastr.error('Quantity cannot be -ve');
					valid = false;
					return false;
				}
				if (qty > available_qty) {
					toastr.error('Quantity cannot be greater than available quantity');
					valid = false;
					return false;
				}
				total_qty += qty;
			});
		}

		$('#pageLoader').hide();
		if (!valid) {
			return;
		}

		if (batch_item) {
			if (cnv_Float(total_qty) != cnv_Float(item_qty)) {
				toastr.error('Total batch quantity should be equal to item quantity');
				return;
			}
			$tr.find('.batch-data').val(btoa($modal.find('.table-batch-selection :input').serialize()));
		}

		if (serial_no_item) {
			$tr.find('.serial-no-data').val(btoa($modal.find('.table-serial-no-selection :input').serialize()));
		}

		$modal.modal('hide');
	});
}