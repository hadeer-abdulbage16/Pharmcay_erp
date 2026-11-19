$(document).ready(function () {
    $("#add-event").submit(function () {
        alert("Submitted");
        var values = {};
        $.each($("#add-event").serializeArray(), function (i, field) {
            values[field.name] = field.value;
        });
        console.log(values);
    });
});

$(document).ready(function () {
    var url = atob($("#events-url").val());
    var formdata = "";
    // page is ready
    $("#calendar").fullCalendar({
        // themeSystem: 'bootstrap4',
        // emphasizes business hours
        businessHours: false,
        defaultView: "month",
        selectable: true,
        // event dragging & resizing
        editable: true,
        // header
        header: {
            left: "title",
            center: "month,agendaWeek,agendaDay",
            right: "today prev,next",
        },
        // events: [
        //     {
        //         title: 'Barber',
        //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
        //         start: '2022-01-25',
        //         end: '2022-01-25',
        //         className: 'fc-bg-default',
        //         icon : "circle"
        //     },
        //     {
        //         title: 'Flight Paris',
        //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
        //         start: '2022-01-25T14:00:00',
        //         end: '2022-01-25T20:00:00',
        //         className: 'fc-bg-deepskyblue',
        //         icon : "cog",
        //         allDay: false
        //     },

        // ],
        events: {
            url: url,
            cache: true,
            type: "POST",
            data: formdata,
        },

        eventRender: function (event, element) {
            if (event.icon) {
                element
                    .find(".fc-title")
                    .prepend("<i class='fa fa-" + event.icon + "'></i>");
            }
        },
        dayClick: function (date, jsEvent, view) {
            $("#modal-view-event-add").modal();
            $("#add-party-order")[0].reset();
            $("#customer-id-for-party-order").val("");

            $("#addBtnCustomer").show();
            $("#showBtnCustomer").hide();
            $("#selected-customer-details").html("");
            $("#update-input").val("0");

            var dateVal = date.format();
            $("#booking-date").val(dateVal);
        },

        eventClick: function (info) {
            $("#customer-id-for-party-order").val(info.customer_id);
            $("#booking-date").val(info.booking_date);

            $("#addBtnCustomer").hide();
            $("#showBtnCustomer").show();
            $("#selected-customer-details").html(
                info.name + "<br>" + info.mobile,
            );
            var time_from = info.time_from;
            var time_to = info.time_to;
            if (time_from != "00:00") $("#time_from").val(time_from);
            if (time_to != "00:00") $("#time_to").val(time_to);

            $("#remarks").val(info.remarks);
            $("#update-input").val(info.update_id);

            $("#modal-view-event-add").modal("toggle");
        },
    });
});

$(document).on("submit", "#search_customer_form_for_party_order", function (e) {
    e.preventDefault();
    var url = atob($(this).attr("action"));
    $.post(
        url,
        $(this).serialize(),
        function (result) {
            $("#customer-search-data-for-party-order").html(result);
        },
        "html",
    );
});
$(document).on("keyup", "#keyword-for-party", function () {
    if (this.value.length) {
        $("#search_customer_form_for_party_order").submit();
    } else {
        $("#search_customer_form_for_party_order").submit();
    }
});

$(document).on("show.bs.modal", "#Search_Customer", function () {
    var url = atob($("#search_customer_form_for_party_order").attr("action"));
    $.post(
        url + "?init=1",
        $("#search_customer_form_for_party_order").serialize(),
        function (result) {
            $("#customer-search-data-for-party-order").html(result);
        },
        "html",
    );
});

function selectCustomerForPartyOrder(ele, id) {
    $("#customer-id-for-party-order").val(id);
    $("#addBtnCustomer").hide();
    $("#showBtnCustomer").show();

    $("#Search_Customer").modal("toggle");

    var name = $(ele).data("name");
    var mobile = $(ele).data("mobile");
    $("#selected-customer-details").html(name + "<br>" + mobile);
}

$(document).on("submit", "#add-party-order", function (e) {
    e.preventDefault();
    var url = atob($(this).attr("action"));
    $.post(
        url,
        $(this).serialize(),
        function (result) {
            if (result.stat == 1) {
                successmsg(result.successmsg);
                window.location.href = result.url;
            } else {
                errormsg(result.errormsg);
            }
        },
        "json",
    );
});
