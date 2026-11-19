/*$(function(){
	$("a[rel='menu']").click(function(e){
		var pageurl =  $(this).attr('href');
		var siteurl = $(this).attr('data-url');
		var param = $(this).attr('data-param');
		var url = atob(siteurl);
		$('a').removeClass('mm-active');
		$(this).addClass('mm-active');
		ajax_load_page(url,param);
		if(pageurl!=window.location){
			window.history.pushState({path:pageurl},'',pageurl);	
		}
		return false;  
	});
});
*/
$(document).on('click', '.checkbox', function(){
	showDiv(this);
});
$(document).on('change', '.autocheck', function(){
	erp_auto_check(this);
});
/*
jQuery('body').on('change','input.autocheck',function(){
	erp_auto_check(this);
});
*/

function ajax_load_page(page,dbParam){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("pagediv").innerHTML = this.responseText;
	}
	};
	xmlhttp.open("GET", page+"?jsondata=" + dbParam, true);
	xmlhttp.send();
}

//----------------------------
function erp_append_selectBox(data){
	//console.log(data);
	var input = data.input;
	var name = data.name;
	var guid = data.guid;
	var options = '<option value="' + guid + '" selected>' + name + '</option>';
	$('#'+input).append(options);
	$('#'+input).val(guid);
}
function erp_save_form(obj){
	var form = $(obj).closest('form');
    var siteurl = form.attr('action');
	var url = atob(siteurl);
	preloader_on();
	$.ajax({
		   type: "POST",
		   dataType: "json",
		   url: url,
		   data: form.serialize(), // serializes the form's elements.
		   success: function(response)  {
			   console.log(response);
			   //alert("yes");
			   preloader_off();
			   var saveStatus = response.saveStatus;
			   if(saveStatus==0){
				   var input = response.input;
				   errormsg(response.errormsg);
				   $('#'+input).focus();
			   }else{
				    var trigger = response.trigger;
					var edited = response.edited;
					var inner_form = response.inner_form;
				    successmsg(response.successmsg);
					if(inner_form == 1){
						erp_append_selectBox(response.data);
						$('.innerCloseBtn').trigger('click');
					}else{
						filter_page(0,edited);
						$('.model_close_btn').trigger('click');
					}

			   }
			   
		   }
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(jqXHR.responseText);
	});	
	
	return false;
}

//------------------Search
function filter_page(cnt,edited){
	preloader_on()
	if(edited == 0){
		$('#counter').val(cnt);
	}
	var formid = 'filter_form';
	var formdata = $('#'+formid).serialize();
	var siteurl = $('#'+formid).attr('action');
	var url = atob(siteurl);
	$.ajax({         
		url: url,      
		type: "POST",                   
		dataType: "html",                 
		data: formdata,                 
		success: function (result) { 
			preloader_off();
			$('#filter_div').html(result);
		}

	});
}

function paginate(cnt){
	filter_page(cnt,0);
	$('#Search_myModal').modal('hide');
	return false;
}
function erp_search(obj){
	filter_page(0,0);
	$('.clearsearch').show();
	$('#Search_myModal').modal('hide');
	return false;
}
function clear_search(obj){
	$("#filter_form")[0].reset()
	$('.clearsearch').hide();
	filter_page(0,0);
	return false;
}
//-----------------------
function edit_form(obj){
	var modalwidth = "60";
	var dynamic = "0";
	var action = "";
	var hidefooter = 0;
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var title = $(obj).attr('data-title');
	var btnlabel = $(obj).attr('data-btnlabel');
	var param = $(obj).attr('data-param');
	if($(obj).attr('data-modalwidth')){
		modalwidth = $(obj).attr('data-modalwidth');
	}
	if($(obj).attr('data-dynamic')){
		dynamic = $(obj).attr('data-dynamic');
	}
	if($(obj).attr('data-action')){
		action = $(obj).attr('data-action');
	}
	if($(obj).attr('data-hidefooter')){
		hidefooter = Math.abs($(obj).attr('data-hidefooter'));
	}
	
		var url = atob(siteurl);
		preloader_on();
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			preloader_off();
			if(hidefooter==1){
				$('.card-footer').hide();
			}else{
				$('.card-footer').show();
			}
			if(dynamic==1){
				erp_open_moal(this.responseText);
				$('#innerform').attr('action',action);
				$('#innerModalLabel').html(title);
			}else{
				if(action !=""){
					$('#modalform').attr('action',action);
				}
				$('.modal-dialog').css('width', modalwidth+'%');
				$('#myModal').modal('show');
				$('#modal_title').html(title);
				$('#saveBtn').html('<i class="fa fa-plus-circle"></i> '+btnlabel);
				$('#formDiv').html(this.responseText);
			}
			
		}
	};
	xmlhttp.open("GET", url+"?jsondata=" + param, true);
	xmlhttp.send();
}
//------------------------------------------------
function show_search_btn(){
	$('.btnSave').hide();
	$('.btnSearch').show();
}
function show_save_btn(){
	$('.btnSave').show();
	$('.btnSearch').hide();
}
function search_form(obj){
	var modalwidth = "60";
	if($(obj).attr('data-modalwidth')){
		modalwidth = $(obj).attr('data-modalwidth');
	}
	var title = $(obj).attr('data-title');
	$('.modal-dialog').css('width', modalwidth+'%');
	$('#modal_title').html(title);
	$('#Search_myModal').modal('show');
}

//-------------------------------------------------
function confirmDialog(message, onConfirm){
	var fClose = function(){
		  modal.modal("hide");
	};
	var modal = $("#confirmModal");
	modal.modal("show");
	$("#confirmMessage").empty().append(message);
	$("#confirmOk").unbind().one('click', onConfirm).one('click', fClose);
	$("#confirmCancel").unbind().one("click", fClose);
}

//----------------------
function deleteThis(obj){
	var siteurl = $(obj).attr('data-url');
	var id = $(obj).attr('data-id');
	var url = atob(siteurl);
	preloader_on();
	$.ajax({
		   type: "POST",
		   dataType: "json",
		   url: url,
		   data: {id:id}, 
		   success: function(response)  {
			   console.log(response);
			   preloader_off();
			   var deletStatus = response.deletStatus;
			   if(deletStatus==1){
				    successmsg(response.successmsg);
					$(obj).closest('tr').remove();
			   }else{
				    errormsg(response.errormsg);
			   }
			   
		   }
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(error);
	});	
	return false;
}
function delete_data(obj){
	confirmDialog("Are you sure?", function(){
		deleteThis(obj);
	});
}
//------------------------------------
function erp_load_sub_data(obj){
	var guid = $(obj).val();
	var subid = $(obj).attr('data-subid');
	var dflt = $(obj).attr('data-default');
	var type = $(obj).attr('data-type');
	var siteurl = $(obj).attr('data-url');
	var url = atob(siteurl);
	$("#"+subid).html('<option value="0" >'+dflt+'</option>');
	preloader_on();
	$.ajax({
		   type: "POST",
		   dataType: "json",
		   url: url,
		   data: {guid:guid,type:type}, 
		   success: function(response)  {
				preloader_off();
				var load_status = response.load_status;
				if(load_status == 0){
				   return;
				}
				var data = response.data;
				$.each(data, function(i, field) {
					var name = field.name;
					var id = field.id;
					var option = '<option value="'+id+'" >'+name+'</option>';
					$("#"+subid).append(option);
				});
		   }
	}).fail(function (jqXHR, textStatus, error) {
		errormsg(jqXHR.responseText);
	});
}
//-------------------------------------
function erp_auto_check(obj){
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
		data: {guid:guid,code:code},                 
		success: function (result) { 
			console.log(result);
			preloader_off();
			var CheckStatus = result.CheckStatus;
			if(CheckStatus == 0){
				$("#error_"+id).html(result.errormsg);
			}else{
				$("#error_"+id).html('');
			}
		}

	});
}

//--------------------------------------
function errormsg(msg){
	$('.top-msg').show();
	$('#top-msg-content').html(msg);
	$('.top-msg').removeClass('success');
	$('.top-msg').addClass('error');
}

function successmsg(msg){
	$('.top-msg').show();
	$('#top-msg-content').html(msg);
	$('.top-msg').removeClass('error');
	$('.top-msg').addClass('success');
}
function erp_msg_clear(){
	$(".top-msg").hide();
}
setInterval("erp_msg_clear()",10000);
//-----------------------------
	
function preloader_on(){
	$('.body').addClass('modal-open');
}

function preloader_off(){
	$('.body').removeClass('modal-open');
}
//------------------------------------------
//others
function showDiv(obj){
	var div = $(obj).attr('data-div');
	if($(obj).is(":checked")){
		$('#'+div).removeClass('hidden');
	}else{
		$('#'+div).addClass('hidden');
	}
}

function divon(obj){
	var div = $(obj).attr('data-div');
	$('.'+div).removeClass('hidden');
}

function divoff(obj){
	var div = $(obj).attr('data-div');
	$('.'+div).addClass('hidden');
}

//-------------------------------------------
function erp_open_moal(body) {
	var exampleModal = getModal();
	if (!exampleModal) { exampleModal = initModal(); }

	var html ='<div class="modal-header">' +
	'<h5 class="modal-title" id="innerModalLabel">Create Unit</h5>' +
	'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
	  '<span aria-hidden="true">&times;</span>' +
	'</button>' +
	'</div><form method="post" id="innerform" ><input type="hidden" name="inner_form" value="1">' +
	'<div class="modal-body">'+body +'</div>' +
	'<div class="modal-footer">' +
	'<button class="btn  btn-success" name="saveBtn" id="saveBtn" type="button" onclick="return erp_save_form(this)"><i class="fa fa-plus-circle"></i> Save </button>' +
	'<button class="btn  btn-danger innerCloseBtn" name="ResetData" type="button" data-dismiss="modal"> <i class="fa fa-ban"></i> Close</button>' +
	'</div></form>';

	setModalContent(html);
	jQuery(exampleModal).modal('show');

}

function getModal() {
  return document.getElementById('exampleModal');
}

function setModalContent(html) {
  getModal().querySelector('.modal-content').innerHTML = html;
}

function initModal() {
  var modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('id', 'exampleModal');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'exampleModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML =
        '<div class="modal-dialog" role="document">' +
          '<div class="modal-content"></div>' +
        '</div>';
  document.body.appendChild(modal);
  return modal;
}