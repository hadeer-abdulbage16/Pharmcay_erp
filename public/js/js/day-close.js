$(document).on("submit", "#counter_day_close", function (e) {
    e.preventDefault();
    var close_type = $(this).attr("type-closing-name");
    if (
        confirm(
            "This is a " +
                close_type +
                " closing procedure. If there is any hold orders, it will be deleted automatically. Do you want to proceed or not?",
        )
    ) {
        var url = atob($(this).attr("action"));
        $.post(
            url,
            $(this).serialize(),
            function (result) {
                if (result.stat == 0) {
                    errormsg(result.errormsg);
                    $("#unpaid-bill-pending-order-cancellation-modal").modal(
                        "toggle",
                    );
                    getUnpaidOrdersBills(result.url, result.tab);
                } else if (result.stat == 1) {
                    // successmsg(result.successmsg);
                    // setTimeout(  () =>  {
                    $("#dayCloseModal").modal("toggle");
                    // window.location.reload();
                    validateDayClosed();

                    // }, 1000 );
                } else {
                    errormsg(result.errormsg);
                }
            },
            "json",
        );
    }
});

function getUnpaidOrdersBills(url, tab) {
    var url = atob(url);
    $.get(
        url + "?tab=" + tab,
        function (result) {
            if (result.stat == 1) {
                $("#unpaid-bill-pending-order-cancellation-tbody1").html(
                    result.billData,
                );
                $("#unpaid-bill-pending-order-cancellation-tbody2").html(
                    result.orderData,
                );

                $("#unapidBills .cancel-all-btn").hide();
                if (result.billIds) {
                    $("#unapidBills .cancel-all-btn")
                        .attr("data-id", result.billIds)
                        .show();
                }

                $("#pendingOrdersTab .cancel-all-btn").hide();
                if (result.orderIds) {
                    $("#pendingOrdersTab .cancel-all-btn")
                        .attr("data-id", result.orderIds)
                        .show();
                }

                if (tab == 2) {
                    $('a[href="#pendingOrdersTab"]').trigger("click");
                }
            }
        },
        "json",
    );
}

function cancelCounterClosingOrder(type, id, url, tab, approved_user_id = 0) {
    if (confirm("Are you sure . You want to cancel this order ?")) {
        $.post(
            atob(url),
            { type: type, id: id, approved_user_id: approved_user_id },
            function (result) {
                if (result.stat == 1) {
                    getUnpaidOrdersBills(result.url, tab);
                }
            },
            "json",
        );
    }
}
// Delegate from document so it works for dynamically loaded modal content
$(document).on(
    "click",
    "#take-away-payment-bill-data td.toggle-cell, #take-away-payment-bill-data td.toggle-cell + td",
    function (e) {
        // prevent double toggle when clicking the checkbox itself
        if ($(e.target).is('input[type="checkbox"]')) return;

        let $td = $(this);

        // if clicked on the "next td", step back to the toggle-cell td
        if (!$td.hasClass("toggle-cell")) {
            $td = $td.prev("td.toggle-cell");
        }

        let $checkbox = $td.find('input[type="checkbox"]').first();
        if ($checkbox.length) {
            $checkbox
                .prop("checked", !$checkbox.prop("checked"))
                .trigger("change");
        }
    },
);

function cancelKOTs(status) {
    var url = $("#siteurl").val() + "dine-in/dine-in/ajax/cancel-kot.php";
    let selected = [];
    $('#take-away-payment-bill-data input[type="checkbox"]:checked').each(
        function () {
            selected.push($(this).val());
        },
    );

    if (selected.length === 0) {
        toastr.error("Please select at least one order!");
        return;
    }

    // post to your PHP file (update status)
    $.ajax({
        url: url, // change to your endpoint
        type: "POST",
        data: {
            status: status,
            items: selected,
        },
        success: function (response) {
            console.log(response);
            if (response.saveStatus == 1) toastr.success(response.successmsg);
            else toastr.error(response.errormsg);
        },
        error: function (xhr) {
            console.error(xhr.responseText);
            toastr.error("Error updating status!");
        },
    });
}

$(document).on("submit", "#domination-form2", function (e) {
    e.preventDefault();
    var url = atob($(this).attr("action"));
    $.post(
        url,
        $(this).serialize(),
        function (result) {
            if (result.stat == 1) {
                var locate = result.url;
                successmsg(result.successmsg);
                $("#saveClosingBalModal").modal("toggle");
                setTimeout(() => successmsg(result.successmsg2), 1000);
                setTimeout(() => (window.location.href = locate), 1500);
            } else {
                errormsg(result.errormsg);
            }
        },
        "json",
    );
});

$(document).on(
    "keyup",
    "#credit-card-closing , #debit-card-closing , #wallet-closing",
    function () {
        totalOpeningAmont(2);
    },
);
$(document).on(
    "focusout",
    "#credit-card-closing , #debit-card-closing , #wallet-closing",
    function () {
        // $(this).val(cnvFloat($(this).val()));
    },
);
$(document).on(
    "click",
    "#credit-card-closing , #debit-card-closing, #wallet-closing",
    function () {
        $(this).select();
    },
);

function itsAShift() {
    $("#its-a-shift").val(1);
    $("#heading-h5-closing").text("Shift Closing");
    $("#button-closing").text("Shift Closing");
    $("#counter_day_close").attr("type-closing-name", "Shift");
}
function itsACounter() {
    $("#its-a-shift").val(0);
    $("#heading-h5-closing").text("Counter Closing");
    $("#button-closing").text("Counter Closing");
    $("#counter_day_close").attr("type-closing-name", "Counter");
}
function validateDayClosed() {
    // if(document.getElementById('is-counter-billing-closed').value == 2 ){
    $("#saveClosingBalModal").modal({
        backdrop: "static",
        keyboard: false,
    });
    // }
}

$(document).on("click", ".cancel-all-btn", function () {
    var fname = $(this).data("fname");

    if (fname == "cancelCounterClosingOrder") {
        var typo = $(this).data("typo");
        var id = $(this).data("id");
        var cancel_url = $(this).data("cancel-url");
        var tab = $(this).data("tab");

        window[fname](typo, id, cancel_url, tab);
    } else if (fname == "validate_with_password") {
        window[fname](this);
    }
});
