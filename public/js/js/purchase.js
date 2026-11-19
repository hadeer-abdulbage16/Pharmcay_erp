function conUnitHtml(conUnit,ms, foreign = 0){
    $html = `
					<td class="con-unit center">
                    	<input name="pitem[sp][]"  type="hidden" value="${conUnit}" />
						<input class="form-control form-control-sm center totalHour" name="pitem[sp_tot][]" onblur="RatePerHour(${ms},this.value,'total',${foreign})" id="total-hour-${ms}" type="number" step="0.001" />
                    </td>
					<td class="con-unit center">${(conUnit == 'm')  ? 'Month' : ((conUnit == 'h') ? 'Hour' : 'Day')}</td>
					<td class="con-unit center">
						<input class="form-control form-control-sm center perHour" name="pitem[sp_rate][]" onblur="RatePerHour(${ms},this.value, 'per',${foreign})" id="per-hour-${ms}" type="number" step="0.001" />
                    </td>
			`;
            return $html;
}
function RatePerHour(ms,value,type, foreign = 0, process= 0 , obj = null){
    if(process == 1){
        let valid = validateMax(obj, value);
        if(!valid){
            value = 0;
            toastr.error('Invalid Input ');
        }  
    }
    var decimal = $('#comp_decimal').val();
	if($('#purchase_order_decimal').length){
		var po_decimal = isNAN($('#purchase_order_decimal').val());
		if(po_decimal >  0) decimal = po_decimal;
	}
    if(foreign == 1) {
        decimal = $('#currency_guid_select').find('option:selected').attr('data-decimal');
    }
    var total = 0;
    if(type == 'total'){
        var per_hour = $('#per-hour-'+ms).val();
        total = value * per_hour;
    }else{
        var total_hour = $('#total-hour-'+ms).val();
        total = value * total_hour;
    }
    if(foreign == 1){
        if($('#foreign_price2_'+ms).length) $('#foreign_price2_'+ms).val(cnv_Float(total,decimal));
        $('#foreign_unit_price_'+ms).val(cnv_Float(total,decimal)).trigger('change');
    }else{
        $('#ritem_unitprice_'+ms).text(cnv_Float(total,decimal));
        $('#unit_price_'+ms).val(total);
        
    }
    erp_set_purchasetotal(document.getElementById('qty_'+ms));
    // forign unit price changing unit price but not total and if we save its saving need to find out and make it 0 
   
}
function updateConCss() {
    const styleId = 'dynamic-con-colom-style';
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
        existingStyle.remove(); // Remove the previous one
    }

    const cssClass = document.createElement('style');
    cssClass.type = 'text/css';
    cssClass.id = styleId;

    let cssText = '';
    cssText += ` th.con-unit  , td.con-unit{
            display: table-cell !important;
        }`;

    if (cssClass.styleSheet) {
        cssClass.styleSheet.cssText = cssText;
    } else {
        cssClass.appendChild(document.createTextNode(cssText));
    }

    document.head.appendChild(cssClass);
}
function validateMax(obj, value){
    let max = isNAN($(obj).attr('data-max'));
    if(max < isNAN(value) ) {
        $(obj).val(0);
        return false;
    }
    else return true;
}