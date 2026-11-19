jQuery("#hall-carousel").owlCarousel({
    autoplay: false,
    lazyLoad: false,
    loop: false,
    margin: 5,
    dots: false,
    navText: [
        "<div class='nav-btn prev-slide text-center'><i class='fa fa-caret-left' style='font-size: 32px;padding-right: 7px;'></i></div>",
        "<div class='nav-btn next-slide text-center'><i class='fa fa-caret-right' style='font-size: 32px;padding-left: 7px;'></i></div>",
    ],
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 7000,
    smartSpeed: 800,
    nav: true,
    responsive: {
        0: {
            items: 1,
        },

        600: {
            items: 4,
        },

        1024: {
            items: 6,
        },

        1366: {
            items: 6,
        },
    },
});

function selectHall(type) {
    if (type == 1) {
        $("#hall-carousel").show();
    } else {
        $("#hall-carousel").hide();
        $("#its-party-order-delivery-address").val("1");
        $("#customerDeliveryAddressModal").modal("toggle");
    }
}

function setPartyHallID(id, url) {
    $.post(
        url,
        { id: id },
        function (result) {
            $("#partyOrderModal").modal("toggle");
            $("#bookCalendarModal").modal("toggle");
        },
        "json",
    );
}

$("#bookCalendarModal").on("shown.bs.modal", function () {
    $(".fc-month-button").trigger("click");
});

$("#modal-view-event-add").on("shown.bs.modal", function () {
    var update_ids = $("#update-input").val();
    if (update_ids < 1 || update_ids == "") {
        console.log("fire api");
        var uri = atob($("#get-delivery-customer-for-party-url").val());
        $.get(
            uri,
            function (data) {
                if (data.stat == 1) {
                    $("#customer-id-for-party-order").val(data.id);
                    $("#addBtnCustomer").hide();
                    $("#showBtnCustomer").show();

                    $("#selected-customer-details").html(
                        data.name + "<br>" + data.mobile,
                    );
                }
            },
            "json",
        );
    }
});

function getPartyOrderList(url) {
    var uri = atob(url);
    $.get(
        uri,
        function (data, status) {
            $("#party-order-data").html(data);
        },
        "html",
    );
}

function convertToSales(id, url) {
    swal({
        title: "Do you want to proceed ?",
        text: "You want to convert this order.",
        type: "warning",
        confirmButtonText: "Continue",
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            $.post(
                atob(url),
                { id: id },
                function (result) {
                    if (result.stat == 1) {
                        window.location.href = result.url;
                    } else {
                        swal(
                            "Error",
                            "Something went Wrong! Please try again.",
                            "error",
                        );
                    }
                },
                "json",
            );
        } else if (result.dismiss === "cancel") {
            success = 0;
        }
    });
}

function fillCustomerDetails(ele) {
    var data = ele.getAttribute("data-customer");
    var customer = JSON.parse(data);
    const $table = `
                <table class="table table-bordered table-striped ">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>${customer.name}</td>
                  </tr>
                  <tr>
                    <th>Mobile No.</th>
                    <td>${customer.mobile}</td>
                  </tr>
                  <tr>
                    <th>Whatsapp No.</th>
                    <td>${customer.whatsapp_number}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>${customer.email}</td>
                  </tr>
                  <tr>
                    <th>Flat No</th>
                    <td>${customer.flat_no}</td>
                  </tr>
                  <tr>
                    <th>Building No</th>
                    <td>${customer.building_no}</td>
                  </tr>
                  <tr>
                    <th>Block</th>
                    <td>${customer.block}</td>
                  </tr>
                  <tr>
                    <th>Road</th>
                    <td>${customer.road}</td>
                  </tr>
                  <tr>
                    <th>Area</th>
                    <td>${customer.area}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>${customer.address1}</td>
                  </tr>
                  <tr>
                    <th>Traveling Time</th>
                    <td>${customer.traveling_hour} : ${customer.traveling_minute}</td>
                  </tr>
                  <tr>
                    <th>Credit</th>
                    <td>${customer.current_credit}</td>
                  </tr>
                  <tr>
                    <th>Debit</th>
                    <td>${customer.current_debit}</td>
                  </tr>

                  <tr>
                    <th>Net Balance</th>
                    <td>${customer.net_balance}</td>
                  </tr>
                  <tr>
                    <th>Limit</th>
                    <td>${customer.variable_credit_limit}</td>
                  </tr>
                </tbody>
                </table>
                `;
    $("#partyCustomerDetailsTable").html($table);
    $("#partyCustomerDetailsModalDialog").css("width", "45%");
    $("#partyCustomerDetailsModalHeading").text("Customer Details");
    $("#partyCustomerDetailsModal").modal("toggle");
}

function removeSkyBlueBack(thiss) {
    $(".btn-info").each(function () {
        $(this).removeClass("bg-skyblue");
    });
    $(thiss).addClass("bg-skyblue");
}

function openBookingDetails(timestring, id, type, url) {
    var uri = atob(url);
    $.post(
        uri,
        { timestring: timestring, id: id, type: type },
        function (html) {
            $("#partyCustomerDetailsTable").html(html);
            $("#partyCustomerDetailsModalDialog").css("width", "75%");
            $("#partyCustomerDetailsModalHeading").text("Booking Details");
            $("#partyCustomerDetailsModal").modal("toggle");
        },
        "html",
    );
}

function filterPartyOrderInit(url) {
    var uri = atob(url);
    $.post(
        uri,
        { type: 1 },
        function (html) {
            $("#party-orders-calendar-table-html").html(html);
        },
        "html",
    );
}

function filterPartyOrder(url) {
    var month = $("#monthFilter option:selected").val();
    var year = $("#yearFilter option:selected").val();
    $("#party-order-calendar-date").html(month + " " + year);
    var uri = atob(url);
    $.post(
        uri,
        { month: month, year: year, type: 2 },
        function (html) {
            $("#party-orders-calendar-table-html").html(html);
        },
        "html",
    );
}
