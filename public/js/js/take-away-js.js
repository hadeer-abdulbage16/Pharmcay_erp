function gotoPosScreenByTakeaway(id = null) {
    var url = makeAtob("set-pos-for-take-away");
    $.get(
        url,
        function (data, status) {
            window.location.href = data.url;
        },
        "json",
    );
}

function getTakeAwayBills(id = 0) {
    var url = makeAtob("get-take-away-bills");
    $.get(
        url,
        function (data, status) {
            $("#take-away-payment-bill-data").html(data);
            if (id > 0) $("#pay-this-take-away-bill-" + id).trigger("click");
            else {
                setTimeout(() => {
                    $("#searchBillInput").focus();
                }, 100);
            }
            $(".reprintt-show").addClass("d-none");
            $(".reprintt-hide").removeClass("d-none");
        },
        "html",
    );
    $("#ttake-away-pay-heading").html("Take Away Bill Payment");
}

function openLargeModalForTakeAway(total, id, obj) {
    resetForm();
    var final_total = cnvFloat(total);
    var salesType = parseInt(cnv_Float($(obj).attr("data-salestype")));
    $("#prepared-bill-id").val(id);
    $("#sales-type").val(salesType);
    $("#pay-cash").val(final_total);
    $("#pay-net-amount").val(final_total);
    $("#amount-received").val(final_total);
    $("#pay-cash-enabled").val(final_total);
    $("#show-pay-cash-enabled").html(final_total);
    $("#balance").val(parseFloat("0").toFixed(no_decimal));
    if (salesType == 3) {
        if ($("#direct-delivery").length) {
            $("#direct-delivery").val(1);
        } else {
            $("#payment-form").append(
                '<input type="hidden" id="direct-delivery" name="direct_delivery" value="1" />',
            );
        }
    } else {
        if ($("#direct-delivery").length) {
            $("#direct-delivery").val(0);
        }
    }
    $("#largeModal").modal("toggle");
    if ($(obj).attr("data-customer")) {
        var customerObj = {};
        customerObj = JSON.parse(atob($(obj).attr("data-customer")));
        if ($(obj).attr("data-orderid")) {
            var orderID = isNAN($(obj).attr("data-orderid"));
            if (orderID > 0)
                $("#prepared-bill-id").attr("data-orderid", orderID);
        }
        setTimeout(() => {
            autoSelectCustomer(customerObj);
            $("#credit-row").removeClass("d-none");
        }, 400);
        setTimeout(() => {
            var avaialbleCredit = isNAN(
                $("#adv-receipt-arr").attr("data-paid"),
            );
            if (avaialbleCredit > 0) {
                // $('#cn-adj-input').prop('checked',true);
                // $('#cn-adj-input').trigger('change');
            }
        }, 1000);
    }
}
function cleanString(text) {
    return text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

function performSearch() {
    var searchText = cleanString($("#searchBillInput").val());
    if (searchText.length > 2) {
        $("#billPaymentTable tbody tr").each(function () {
            var itemCode = cleanString($(this).find("td:eq(3)").text());
            var itemName = cleanString($(this).find("td:eq(2)").text());

            if (
                itemCode.includes(searchText) ||
                itemName.includes(searchText)
            ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    } else {
        $("#billPaymentTable tbody tr").show(); // Show all if input is too short
    }
}

// Debounce timer
let searchTimer = null;

// Handle keyup for debounce and Enter key
$(document).on("keyup", "#searchBillInput", function (e) {
    clearTimeout(searchTimer); // Clear previous timer

    if (e.key === "Enter") {
        performSearch(); // Immediate search on Enter
    } else {
        // Delay search by 2 seconds
        searchTimer = setTimeout(() => {
            performSearch();
        }, 1000);
    }
});

$(document).on("shown.bs.modal", "#takeAwayPaymentBillModal", function (event) {
    $("#searchBillInput").val("");
});
