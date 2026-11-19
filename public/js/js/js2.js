// focusSearchBar();

function ItsCreditNote() {
    $("#return_type").val("creditnote");
}

function ItsSalesReturn() {
    $("#return_type").val("replace");
}

function returnType() {
    var val = $("#return_type").val();
    var value = $.trim(val);
    return value;
}

function validateCreditNote(event) {
    var total = parseFloat($("#GROSS_NET_TOTAL").val());
    var type = returnType();
    if (type == "replace") {
        if (total < 0) {
            alert("Please add more items to proceed.");
            event.stopPropagation();
            return false;
        }
    }
}

function focusSearchBar(element = document.getElementById("live_search")) {
    element.focus();
}

// document.getElementById('live_search').addEventListener('input',function(e){
// afterScan(e);
// },false);

function shouldFocusSearchBar(num) {
    $("#shouldFocusSearchBar").val(num);
    $("#shouldFocusSearchBar").trigger("input");
}
$(document).on("input", "#shouldFocusSearchBar", function () {
    if ($(this).val() == "1") {
        setTimeout(() => focusSearchBar(), 300);
    }
});
function afterScan(e) {
    // setTimeout( () => {
    if ($("#search_result li").length == 1) {
        // if(e.keyCode === 13){
        var keyword = e.target.value;
        var barcode = $("#search_result li").attr("barcode");
        var barcode2 = $("#search_result li").attr("barcode2");
        if (keyword == barcode || keyword == barcode2) {
            console.log("trigger");
            $("#search_result li:first").trigger("click");
        }

        // }
    }

    // },200);
}

function copyToWhatsapp(number) {
    $("#whatsapp").val(number);
}

/////////js3.js////////////////////////////

function checkLoginStatus() {
    url = atob($("#update-login-status-url").val());
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { id: 1 },
        success: function (result) {
            if (result.loginstatus == 0) {
                window.location.href = result.url;
            }
        },
    });
}
setInterval(() => checkLoginStatus(), 60000);

function pointThisKeypadButton3(element) {
    element.select();
    var id = element.getAttribute("id");
    $("#activeElement3").val("#" + id);
    $("#selected3").attr("event", 1);
}
$(".keypad-button3").click(function (e) {
    var is_validate = false;
    var decimals = 0;

    var number = $(this).data("n");

    if ($("#activeElement3").val()) {
        if ($($("#activeElement3").val()).prop("readonly")) {
            return;
        }

        $($("#activeElement3").val()).focus();
        var eventType = $("#selected3").attr("event");

        var curr_val = $($("#activeElement3").val()).val();

        if (number == "backspace") {
            var str = curr_val;
            var final_val = str.substring(0, str.length - 1);
        } else if (number == "delete") {
            var str = curr_val;
            var final_val = str.substring(0, str.length - str.length);
        } else {
            if (eventType == 1) {
                var final_val = number;
            } else {
                // typing
                var final_val = curr_val + number;
            }
        }
        $($("#activeElement3").val()).val(final_val);

        // $( "#" +   $('#activeElement').val() ).trigger('input');
        var ELEMENT = $("#activeElement3").val();
        if (ELEMENT == "#bill_search") {
            $(ELEMENT).trigger("keyup");
        } else {
            $(ELEMENT).trigger("keyup");
        }

        if ($("#is_valid3").val() == "2") {
            $("#selected3").attr("event", 1);
            $("#is_valid3").val("");
        } else {
            $("#selected3").attr("event", 2);
        }
    }
});

function validateDayOpen() {
    if (document.getElementById("is-counter-day-open").value == 0) {
        $("#dayOpenModal").modal({
            backdrop: "static",
            keyboard: false,
        });
    }
}

$(document).ready(function () {
    validateDayOpen();
});

$(document).on("click", 'a[data-toggle="modal"]', function (event) {
    if (document.getElementById("is-counter-day-open").value == 0) {
        if ($(this).data("validation") && $(this).data("validation") == 1) {
            return;
        }
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        swal("Error!", "Please open the counter first.", "error");
    }
});

function validateDayOpenForTakeAway() {
    if (document.getElementById("is-counter-day-open").value == 0) {
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        swal("Error!", "Please open the counter first.", "error");
    } else {
        var el = event.currentTarget;
        auth_login_required(el).then(function (res) {
            if (res === 1) {
                gotoPosScreenByTakeaway();
            }
        });
    }
}
function validateDayOpenForRetailPOS(id = 0) {
    if (document.getElementById("is-counter-day-open").value == 0) {
        $(".modal").modal("hide");
        $(".modal-backdrop").remove();
        swal("Error!", "Please open the counter first.", "error");
    } else {
        var el = event.currentTarget;
        auth_login_required(el).then(function (res) {
            if (res === 1) {
                gotoRetailPOS(id);
            }
        });
    }
}

function gotoRetailPOS(id = 0) {
    var url = makeAtob("set-pos-for-retail");
    $.post(
        url,
        { is_settle: id },
        function (data, status) {
            window.location.href = data.url;
        },
        "json",
    );
}
function changeTheme(themeId, obj) {
    var url =   $(obj).attr("data-url") ;
    console.log(url);
    $.ajax({
        url: url, // Replace with your actual server-side script
        type: "GET",
        data: { theme: themeId },
        success: function (response) {
            if (response.success == 1) {
                toastr.success("Theme changed successfully:");
                window.location.reload();
            } else {
                console.log(url);
                toastr.error("Error changing theme:");
            }
        },
        error: function (xhr, status, error) {
            console.log(url);
            toastr.error("Error changing theme:", error);
        },
    });
}
function openReceipts(url) {
    // window.open(url, '_blank', 'location=yes,height=650,width=1200,scrollbars=yes,status=yes');
    // $('#reciept-iframe').attr('src',atob(url) + "/?output=embed");
    // $('#customerRecieptModal123').modal('toggle');
    var el = event.currentTarget;
    auth_login_required(el).then(function (res) {
        if (res === 1) {
            window.location = atob(url);
        }
    });
}

function ZetcaInvoiceStatus(url, counter = 0, type = 0) {
    $.ajax({
        url: atob(url),
        type: "POST",
        dataType: "json",
        data: { id: 1, counter: counter, type: type },
        success: function (res) {
            console.log(res);
            $("#zetca-bills-data").html(res.data);
            $("#zetca-page-data").html(res.pagination);
        },
    });
}
function CompleteInvoice(obj) {
    var id = $(obj).attr("data-id");
    var url = atob($("#complete-pending-bills-url").val());
    var multiQuotaEnabled = isNAN($("#multi_quota_enabled").val());
    if (multiQuotaEnabled == 0) {
        url = atob($("#complete-pending-bills-url").attr("data-url2"));
    }
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: { id: id },
        success: function (data) {
            if (data.saveStatus == 1) {
                swal("success", data.successmsg, "success");
                if (data.refresh_page == 1) {
                    window.location.reload();
                }
            } else {
                errormsg(data.errormsg);
            }
        },
    });
}
function getAllBillsForPrint() {
    var url = makeAtob("get-all-bills-for-print");
    $.get(
        url,
        function (data, status) {
            $("#take-away-payment-bill-data").html(data);
            $(".reprintt-show").removeClass("d-none");
            $(".reprintt-hide").addClass("d-none");
        },
        "html",
    );

    $("#ttake-away-pay-heading").html("Re-Print Bills");
}
function printHere(obj) {
    $.get($(obj).attr("data-url"), function (html) {
        $("#contentContainer").html(html);

        printJS("contentContainer", "html");
    }).fail(function () {
        console.error("Error fetching content");
    });
}
function setPOSFromFnbSession() {
    var url = makeAtob("set-pos-in-fnb");
    $.get(url, function (data, status) {}, "json");
}
function buttonsConfig(obj) {
    $(obj).closest(".modal").modal("hide");
    var siteurl = $("#siteurl").val();
    url = siteurl + "dine-in/dine-in/ajax/layout/form.php";

    $.ajax({
        url: url,
        type: "GET",
        dataType: "text",
        success: function (response) {
            erp_open_moal(response, 75);
            var siteurl = $("#siteurl").val();
            var action = btoa(siteurl + "dine-in/dine-in/ajax/layout/save.php");
            var title = "Configurations";
            $("#innerform").attr("action", action);
            $("#innerModalLabel").html(title);
            // window.location.reload();
        },
    });
}
$(document).on("change", ".ready-status-select", function () {
    let $select = $(this);
    let newValue = $select.val();
    let recordId = $select.data("id"); // adjust if you use a different attribute
    let oldValue =
        $select.data("old") || $select.find("option[selected]").val(); // fallback
    var readyUrl = atob($("#comp_tax_status").attr("data-ready"));

    swal({
        title: "Are you sure?",
        text: "Do you want to change the status?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, change it!",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.value) {
            // ✅ Proceed with AJAX
            $.ajax({
                url: readyUrl, // your endpoint
                method: "POST",
                data: {
                    id: recordId,
                    status: newValue,
                },
                success: function (response) {
                    swal("Updated!", "Status has been updated.", "success");
                    // optionally handle response here
                },
                error: function () {
                    swal("Error", "Failed to update status.", "error");
                    $select.val(oldValue); // revert back on error
                },
            });
        } else {
            $select.val(oldValue); // Revert back on cancel
        }
    });
});
