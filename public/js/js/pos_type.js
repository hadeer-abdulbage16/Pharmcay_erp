function retailPOSBillPayment(type = 0) {
    var url = makeAtob("get-one-to-one-bills");
    if (type == 2) var url = makeAtob("get-many-to-one-bills");

    $.ajax({
        type: "POST",
        dataType: "html",
        url: url,
        // data: {type:type},
        success: function (result) {
            if (type == 2) $("#many-to-one-bills-data").html(result);
            else $("#one-to-one-bills-data").html(result);
        },
    });
}

function payPOSBill(total, billID) {
    resetForm();
    var final_total = cnvFloat(total);
    $("#prepared-bill-id").val(billID);
    $("#sales-type").val(0);
    $("#pay-cash").val(final_total);
    $("#pay-net-amount").val(final_total);
    $("#amount-received").val(final_total);
    $("#pay-cash-enabled").val(final_total);
    $("#show-pay-cash-enabled").html(final_total);
    $("#balance").val(parseFloat("0").toFixed(no_decimal));

    $("#largeModal").modal("toggle");
}

$(document).on("click", "#payAllBills", function () {
    if ($('input[type="checkbox"][class="MTO-checkbox"]:checked').length == 0) {
        alert("Please select bill.");
        return;
    }
    var is_error = false;
    var customer = "";
    var temp_customer = "";
    var bills = [];
    $('input[type="checkbox"][class="MTO-checkbox"]:checked').each(
        function (index, item) {
            bills.push($(this).val());
            if (index == 0) customer = item.getAttribute("data-customer");
            if (index > 0) {
                temp_customer = item.getAttribute("data-customer");
                console.log(item);
                console.log(customer + " ==" + temp_customer);
                if (customer != temp_customer) {
                    is_error = true;
                }
            }
        },
    );
    if (is_error) {
        alert("Please select the bills of same customer.");
        return;
    }
    setPendingBillsSesion(bills);
});
function setPendingBillsSesion(bills) {
    var url = makeAtob("set-many-to-one-bills");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { bills: bills },
        success: function (result) {
            if (result.saveStatus == 1) {
                successmsg("Loading...");
                window.location = result.url;
            } else {
                errormsg(result.errormsg);
            }
        },
    });
}
const FilterBills = (table_id, inputId) => {
    const trs = document.querySelectorAll("#" + table_id + " tr");
    const filter = document.querySelector("#" + inputId).value;
    const regex = new RegExp(filter, "i");
    const isFoundInTds = (td) => regex.test(td.innerHTML);
    const isFound = (childrenArr) => childrenArr.some(isFoundInTds);

    const setTrStyleDisplay = ({ style, children }) => {
        style.display = isFound([
            ...children, // <-- All columns
        ])
            ? ""
            : "none";
    };

    trs.forEach(setTrStyleDisplay);
};
