
var randomno = '';


function showmodel(obj){
	/*var id = $(obj).attr('data-id');
	var save = 0;
	var title = $(obj).attr('data-title');
	var type = $(obj).attr('data-type');
	var siteurl = $(obj).attr('data-url');
	var message = "Loading...";
	var button = 'save';
	if($(obj).attr("data-message")){
		message = $(obj).attr("data-message");
	}
	if($(obj).attr('data-save')){
		save = $(obj).attr('data-save');
		var saveurl = $(obj).attr('data-save-url');
	}
	if($(obj).attr('data-button')){
		button = $(obj).attr('data-button');
	}*/
	
	$('#exampleModalLong').modal('show');
	/*+
	$('.modal-dialog').css({width:'60%', height:'auto','max-height':'100%'});
	$('.modal-title').html(title);
	$('.modal-body').html('<i class="fa fa-refresh fa-spin"></i>...'+message);
	
	$.post(siteurl,{'guid': id,'type':type},function(data, textStatus){ 
		if(save == 1){
			$(".modal-content").wrap('<form role="form" method="post" action="'+saveurl+'" enctype="multipart/form-data">');	
		}
		$('.modal-body').html(data);
		$('.modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
		if(save == 1){
			$('.modal-footer').prepend('<button type="submit" class="btn btn-primary" onClick="return ajax_save(this)">'+button+'</button>');
		}
		
	});
	*/
	return false;
}



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


function page_load(obj){
	pageurl =  $(obj).attr('href');
	var page = $(obj).attr('data-page');
	var siteurl = $(obj).attr('data-siteurl');
	var param = $(obj).attr('data-param');
	//$(obj).addClass('mm-active')
	var url = siteurl+"site/"+page+"/index.php";

	ajax_load_page(url,param);
	if(pageurl!=window.location){
		window.history.pushState({path:pageurl},'',pageurl);	
	}
	return false;  
}


function erp_save_form(obj){
	var form = $(obj).closest('form');
    var url = form.attr('action');
	
	$.ajax({
		   type: "POST",
		   dataType: "json",
		   url: url,
		   data: form.serialize(), // serializes the form's elements.
		   success: function(response)  {
			   console.log(response);
			   var status = response.status;
			   if(status==0){
				   var focusid = response.focusid;
				   errormsg(response.errormsg);
				   $('#'+focusid).focus();
			   }else{
				    var trigger = response.trigger;
				    successmsg(response.successmsg);
					$('#'+trigger).trigger('click');

			   }
		   }
	});	
	$('#model_close_btn').trigger('click');
	return false;
}
///////////

function erp_delete(obj){
	var status = $(obj).attr('data-status');
	$('.modal-footer').show();
	if(status==0){
		var inputid = $(obj).attr('id');
		$('#modelbtn').trigger('click');
		$('#model_main').removeClass();
		$('#model_main').addClass("modal-dialog modal-sm");
		$('#model_title').html("Delete");
		$('.modal-body').html("Want to delete this ?");
		$('#model_save_btn').attr('data-input',inputid);
		$('#model_save_btn').attr('data-remove',1);
	}else{
		//alert("remove");model_btn_action
			var url = $(obj).attr('href');  
			var data = $(obj).attr('data-param'); 
			$.ajax({
			   type: "POST",
			   dataType: "json",
			   url: url,
			   data: {'jsondata':data}, // serializes the form's elements.
			   success: function(response)  {
				  // console.log(response);
				   var status = response.status;
				   if(status==0){
					   var focusid = response.focusid;
					   errormsg(response.errormsg);
					   $('#'+focusid).focus();
				   }else{
						var trigger = response.trigger;
						successmsg(response.successmsg);
						$('#'+trigger).trigger('click');
				   }
			   }
		});	
	}
	
	
	return false;
}

function model_btn_action(obj){
	var remove = $(obj).attr('data-remove');
	$('#model_close_btn').trigger('click');
	if(remove==1){
		var input = $(obj).attr('data-input');
		$('#'+input).attr('data-status',1);
		$('#'+input).trigger('click');
	}
	
}

function erp_search(obj){
	var page = $(obj).attr('data-page');
	var siteurl = $(obj).attr('data-siteurl');
	var param = $(obj).attr('data-param');
	var link = $(obj).attr('href');
	var status = $(obj).attr('data-status');
	var title = $(obj).attr('data-title');
	var size = $(obj).attr('data-size');
	var url = siteurl+"site/"+page+"/"+link;
		$('#aditem').trigger('click');
		$('#model_main').removeClass();
		$('#model_main').addClass(size);
		$('#model_title').html(title);
		if(status==0){
        	$(".modal-body").load(url);
        	$(obj).attr('data-status',1);

		
    	}

	   $('.modal-footer').hide();
		$('#model_close_btn').trigger('click');
	   return false;
}

function erp_search_action(obj){
	var status = $("#erp_search_btn").attr('data-status');

	if(status==1){
		var data =  $(obj).closest('form').serialize();
		var url = $(obj).closest('form').attr('action');//siteurl+"site/"+page+"/"+"vndordetails.php";
	}else{
		var counter = $(obj).attr('data-counter');
		
		var data = {'counter':counter};
		var url = $(obj).attr('href');//siteurl+"site/"+page+"/"+"vndordetails.php";
	
	}
	$.ajax({
			   type: "POST",
			   dataType: "html",
			   url: url,
			   data: data,// {'jsondata':data,'type':'search'}, // serializes the form's elements.
			   success: function(response)  {
			   		//alert(response);
		 		$('#search_result').html(response);
				$('#model_close_btn').trigger('click');
				 $('.pag').hide();
		
			   }
		});	
	return false;
}

function shiptobill()
    {
        var ClientSAddress=document.getElementById("Attention").value;
        var ClientAddress=document.getElementById("Sattention").value;
        document.getElementById('Sattention').value =ClientSAddress;



             var country=document.getElementById("country").value;
        var country=document.getElementById("country").value;
        document.getElementById('scountry').value =country;

             var street1=document.getElementById("street1").value;
        var sstreet1=document.getElementById("sstreet1").value;
        document.getElementById('sstreet1').value =street1;
             var street2=document.getElementById("street2").value;
        var sstreet2=document.getElementById("sstreet2").value;
        document.getElementById('sstreet2').value =street2;
             var city=document.getElementById("city").value;
        var scity=document.getElementById("scity").value;
        document.getElementById('scity').value =city;
             var state=document.getElementById("state").value;
        var sstate=document.getElementById("sstate").value;
        document.getElementById('sstate').value =state;
             var zipcode=document.getElementById("zipcode").value;
        var szipcode=document.getElementById("szipcode").value;
        document.getElementById('szipcode').value =zipcode;
             var phone=document.getElementById("phone").value;
        var sphone=document.getElementById("sphone").value;
        document.getElementById('sphone').value =phone;
         var fax=document.getElementById("fax").value;
        var sfax=document.getElementById("sfax").value;
        document.getElementById('sfax').value =fax;
    }
function preview_image() 
{
 var total_file=document.getElementById("upload_file").files.length;
 for(var i=0;i<total_file;i++)
 {
  $('#image_preview').append("<img src='"+URL.createObjectURL(event.target.files[i])+"' height='100px' width='100px'><br>");
 }
}
function hideshow()
{
	  $("#show").toggle();   
}
function hideshow2()
{
	  $("#show2").toggle();   
}

function paginate(obj){
	var counter = $(obj).attr('data-counter');
	var status = $("#erp_search_btn").attr('data-status');
	if(status==1){
		$('#erp_search_counter').val(counter);
		$("#erp_search_action_btn").trigger('click');
	}else{
		erp_search_action(obj);
	}
	return false;
}
function page_load_view(obj){
	pageurl =  $(obj).attr('href');
	var page = $(obj).attr('data-page');
	var siteurl = $(obj).attr('data-siteurl');
	var param = $(obj).attr('data-param');
	//$(obj).addClass('mm-active')
	var url = siteurl+"site/"+page+"/view.php";

	ajax_load_page(url,param);
	if(pageurl!=window.location){
		window.history.pushState({path:pageurl},'',pageurl);	
	}
	return false;  
}


function qtychange()
{
$('.qty').each(function(i, qty){
  $(qty).change(function(){
    calcFP(i);
  });
});

}
function calcFP(index){
  var subTotal=0;
  var discount=0;
  var price = $('.price').get(index).value;
  var qty = $('.qty').get(index).value;
  var finalPrice= price * qty;
     $('.fp').val(finalPrice.toFixed(2));
 }

function disconchange()
{
$('.discount').each(function(i, discount){
  $(discount).change(function(){
    calcFP(i);
  });
});
}

function adjstmntchange()
{
var adjustmnt=document.getElementById("adjustmnt").value;
var sub_total=document.getElementById("sub_total").value;
c=parseFloat(adjustmnt)+parseFloat(sub_total);
document.getElementById('total_amount').value = c.toFixed(2);
}
function discountcalc()
{
var discPerc=document.getElementById("discount").value;
var finalPrice=document.getElementById("sub_total").value;
var grandtotal=document.getElementById("total_amount").value;
var discount = finalPrice * discPerc/100;
document.getElementById('discamount').value = discount.toFixed(2);
var gtotal = grandtotal - discount;
document.getElementById('total_amount').value = gtotal.toFixed(2);
}
function add_new()
{

	$("#dynamic_field").each(function () {
      
        var tds = '<tr>';
        jQuery.each($('tr:last td', this), function () {
            tds += '<td>' + $(this).html() + '</td>';
        });
        tds += '</tr>';
        if ($('tbody', this).length > 0) {
            $('tbody', this).append(tds);
        } else {
            $(this).append(tds);
            
        }
    });
}

function printData()
{
 window.print();
}

function deleteRow(row) {
	    var didConfirm = confirm("Are you sure You want to delete");
     if (didConfirm == true) {
  var i = row.parentNode.parentNode.rowIndex;
  document.getElementById('dynamic_field').deleteRow(i);
   return true;
  } else {
    return false;
  }
}



  function test() {
  
        update_amounts();
        $(document).on('change','.price',function(){
            update_amounts();
        });

        $(document).on('change','.qty',function(){
            update_amounts();
        }); 
    }
  function update_amounts()
{
    var sum = 0.0;
    $('.product').each(function() {
        var qty = $(this).find('.qty').val();
        var price = $(this).find('.price').val();
        var amount = (qty*price)
        sum+= amount;
        $(this).find('.amount').val(amount); 
 
    //just update the total to sum  
 });  
    $('.total').val(sum);
}




function calc()
{
    $('#dynamic_field tbody tr').each(function(i, element) {
        var html = $(this).html();
        if(html!='')
        {
            var qty = $(this).find('.qty').val();
            var price = $(this).find('.price').val();
            $(this).find('.total').val(qty*price);
            
            calc_total();
        }
    });
}

function calc_total()
{
    total=0;
    $('.total').each(function() {
        total += parseInt($(this).val());
    });
    $('#sub_total').val(total.toFixed(2));
    //tax_sum=total/100*$('#tax').val();
    //$('#tax_amount').val(tax_sum.toFixed(2));
    $('#total_amount').val((total).toFixed(2));
}      



jQuery(document).delegate('a.delete-record', 'click', function(e) {
     e.preventDefault();    
     var didConfirm = confirm("Are you sure You want to delete");
     if (didConfirm == true) {
      var id = jQuery(this).attr('data-id');
      var targetDiv = jQuery(this).attr('targetDiv');
      jQuery('#rec-' + id).remove();
      
    //regnerate index number on table
    $('#tbl_posts_body tr').each(function(index) {
      //alert(index);
      $(this).find('span.sn').html(index+1);
    });
    return true;
  } else {
    return false;
  }
});


jQuery(document).delegate('a.add-record', 'click', function(e) {
     e.preventDefault();    
     var content = jQuery('#sample_table tr'),
     size = jQuery('#tbl_posts >tbody >tr').length + 1,
     element = null,    
     element = content.clone();
     element.attr('id', 'rec-'+size);
     element.find('.delete-record').attr('data-id', size);
     element.appendTo('#tbl_posts_body');
     element.find('.sn').html(size);
   });


function showPrice()
{
	var prodcut=document.getElementById("prodcut").value;
	    $.ajax({
         url: 'https://bluecoreerp.com/erpp/site/purchase_orders/Getprice.php',

       //url: 'http://localhost/erp/site/purchase_orders/Getprice.php',
        type: 'GET',
        data: {option : prodcut},
        success: function(data) {
           document.getElementById('price').value=data;
           //$('.total_leave').html(data);
        }
    });
}