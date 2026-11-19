$(document).on("keyup", ".denomination-input", function () {
    if ($(this).val().length) {
        var amt = parseFloat($(this).val());
    } else {
        var amt = 0;
    }

    var rate = parseFloat($(this).data("rate"));
    var denomination = parseFloat($(this).data("denomination"));
    var id = $(this).data("id");
    var deci = $(this).data("decimal-places");
    var type = $(this).data("type");

    if (isNaN(amt)) {
        amt = cnvFloat("0");
        errormsg("Please enter valid amount");
    }

    var Amount = parseFloat(parseFloat(amt) * parseFloat(denomination)).toFixed(
        deci,
    );
    var convertedAmt = cnvFloat(parseFloat(Amount) * parseFloat(rate));
    if (type == 2) {
        $("#amt2_" + id).html(Amount);
        $("#c_rate2_" + id).html(convertedAmt);
        $("#tot_amt2_" + id).val(Amount);
        $("#opening_amt2_" + id).val(convertedAmt);
        totalOpeningAmont(2);
    } else {
        $("#amt_" + id).html(Amount);
        $("#c_rate_" + id).html(convertedAmt);
        $("#tot_amt_" + id).val(Amount);
        $("#opening_amt_" + id).val(convertedAmt);
        totalOpeningAmont(1);
    }
});

$("input").keypress(function (e) {
    if (e.which == 13) {
        var nextint = parseInt($(this).attr("tabindex"));
        $("[tabindex='" + (nextint + 1) + "']").focus();
        e.preventDefault();
    }
});

function totalOpeningAmont(type) {
    var total = 0;
    $(".opening_amt").each(function () {
        var amt = parseFloat(this.value);
        if (!isNaN(amt)) {
            total += amt;
        }
    });
    if (type == 1) $("#total-opening-amount").val(cnvFloat(total));
    if (type == 2) {
        $("#total-closing-amount").val(cnvFloat(total));
        $("#closing_amt_text").html(cnvFloat(total));
        netClosingAmt(total);
    }
}

function netClosingAmt(total) {
    var cash = cnvFloat($("#float-cash").val());
    var credit_card = cnvFloat($("#credit-card-closing").val());
    var debit_card = cnvFloat($("#debit-card-closing").val());
    var wallet = cnvFloat($("#wallet-closing").val());

    var netCash = parseFloat(total) - parseFloat(cash);
    $("#net-closing-amount").val(cnvFloat(netCash));

    var netTotal =
        parseFloat(total) +
        parseFloat(credit_card) +
        parseFloat(debit_card) +
        parseFloat(wallet);
    $("#net_total_closing_counter_bal").val(cnvFloat(netTotal));
}

$(document).on("submit", "#domination-form", function (e) {
    e.preventDefault();
    var url = atob($(this).attr("action"));
    $.post(
        url,
        $(this).serialize(),
        function (result) {
            if (result.stat == 1) {
                successmsg(result.successmsg);
                $("#dayOpenModal").modal("toggle");
                setTimeout(() => successmsg(result.successmsg2), 1000);
                setTimeout(() => window.location.reload(), 1500);
            } else {
                errormsg(result.errormsg);
            }
        },
        "json",
    );
});
