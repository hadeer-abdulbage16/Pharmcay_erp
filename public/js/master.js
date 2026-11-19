$(document).ready(function () {
    if ($("select.select2").length && $("select.select2 option").length > 2) {
        $("select.select2").select2({
            templateResult: function (data) {
                // Check if data has data-color attribute
                if ($(data.element).data('color')) {
                    return $('<span class="' + $(data.element).data('color') + '-color">' + $(
                        data.element).text() + '</span>');
                }
                return data.text;
            },
            templateSelection: function (data) {
                // Check if data has data-color attribute
                if ($(data.element).data('color')) {
                    return $('<span class="' + $(data.element).data('color') + '-color">' + $(
                        data.element).text() + '</span>');
                }
                return data.text;
            }

        });
    } else {
        setTimeout(() => {
            $("select.select2").select2({
                templateResult: function (data) {
                    // Check if data has data-color attribute
                    if ($(data.element).data('color')) {
                        return $('<span class="' + $(data.element).data('color') +
                            '-color">' + $(data.element).text() + '</span>');
                    }
                    return data.text;
                },
                templateSelection: function (data) {
                    // Check if data has data-color attribute
                    if ($(data.element).data('color')) {
                        return $('<span class="' + $(data.element).data('color') +
                            '-color">' + $(data.element).text() + '</span>');
                    }
                    return data.text;
                }

            });
        }, 2500);
    }
});
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$(document).on('shown.bs.modal', '#myModal , #exampleModal', function (e) {
    if ($("select.select2").length && $("select.select2 option").length > 2) {
        $("select.select2").select2({
            templateResult: function (data) {
                // Check if data has data-color attribute
                if ($(data.element).data('color')) {
                    return $('<span class="' + $(data.element).data('color') + '-color">' + $(
                        data.element).text() + '</span>');
                }
                return data.text;
            },
            templateSelection: function (data) {
                // Check if data has data-color attribute
                if ($(data.element).data('color')) {
                    return $('<span class="' + $(data.element).data('color') + '-color">' + $(
                        data.element).text() + '</span>');
                }
                return data.text;
            }
        });
    } else {
        setTimeout(() => {
            $("select.select2").select2({
                templateResult: function (data) {
                    // Check if data has data-color attribute
                    if ($(data.element).data('color')) {
                        return $('<span class="' + $(data.element).data('color') +
                            '-color">' + $(data.element).text() + '</span>');
                    }
                    return data.text;
                },
                templateSelection: function (data) {
                    // Check if data has data-color attribute
                    if ($(data.element).data('color')) {
                        return $('<span class="' + $(data.element).data('color') +
                            '-color">' + $(data.element).text() + '</span>');
                    }
                    return data.text;
                }
            });
        }, 2500);
    }
})

function erp_menu(menu) {
    var menus = [];

    if (menus.includes(menu)) {
        return true;
    }
    return false;
}

function save_modal_data(btn) {

    let $btn = $(btn);
    let $form = $btn.closest("form");
    let action = $form.attr("action");
    let table = $btn.data("table");
    let formData = new FormData($form[0]);
    let originalHtml = $btn.html();
    $btn.prop("disabled", true).html("Saving...");
    $.ajax({
        url: action,
        method: $form.attr("method") ?? "POST",
        data: formData,
        processData: false,
        contentType: false,

        success: function (res) {
            $("#myModal").modal('hide');
            $("#change_pass_Modal").modal('hide');
            let wrapper = $(".ajax-wrapper");
            let route = wrapper.data('route');
            $.get(route, function (html) {
                wrapper.html(html);
            });
            if (res.msg) {
                erp_msg_show(res.msg, res.status ?? 'success');
            }

        },

        error: function (xhr) {
            let errors = xhr.responseJSON?.errors ?? {};
            let html = '';
            $.each(errors, function (k, v) {
                html += `<div class="alert alert-danger">${v[0]}</div>`;
            });
            $form.find("#ajax_error").html(html);
        },

        complete: function () {
            $btn.prop("disabled", false).html(originalHtml);
        }
    });
}
$(document).on('click', '.pagination a', function (e) {
    e.preventDefault();

    let url = $(this).attr('href');
    let wrapper = new URL(url).searchParams.get('wrapper');

    if (!wrapper) return;

    $.get(url, function (data) {
        $("#" + wrapper).html(data);
    });
});

function erp_delete(obj) {
    var module = $(obj).data('module');
    var id = $(obj).data('id') || 0;
    var wrapperSelector = $(obj).data('wrapper') || ".ajax-wrapper";

    confirmDialog('This cannot be undone. Are you sure to delete ?', function () {
        $('#pageLoader').show();

        var urlTemplate = $(obj).data('route');
        if (!urlTemplate) {
            console.error('No route defined for deletion');
            $('#pageLoader').hide();
            return;
        }
        var url = urlTemplate.replace(':id', id);

        $.ajax({
            url: url,
            type: 'POST',
            data: {
                module: module,
                id: id
            },
            success: function (res) {
                $('#pageLoader').hide();
                if (res.status == 200) {
                    if(res.redirect) {
                        document.location.href = res.redirect;
                        return;
                    }
                    let wrapper = $(".ajax-wrapper");
                    let route = wrapper.data('route');
                    $.get(route, function (html) {
                        wrapper.html(html);
                    });
                    erp_msg_show(res.msg, 'success');
                } else {
                    erp_msg_show(res.msg ?? 'Something went wrong', 'error');
                }
            },
            error: function (xhr) {
                $('#pageLoader').hide();
                erp_msg_show('Something went wrong', 'error');
                console.log(xhr.responseText);
            }
        });
    });
}
function change_status(obj) {
    var module = $(obj).data('module');
    var id = $(obj).data('id') || 0;
    var code = $(obj).data('code') || 0;
    var wrapperSelector = $(obj).data('wrapper') || ".ajax-wrapper";

    confirmDialog('Are you sure to update status ?', function () {
        $('#pageLoader').show();

        var urlTemplate = $(obj).data('route');
        if (!urlTemplate) {
            console.error('No route defined for deletion');
            $('#pageLoader').hide();
            return;
        }
        var url = urlTemplate.replace(':id', id);

        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                module: module,
                id: id,
                code: code
            },
            success: function (res) {
                $('#pageLoader').hide();
                if (res.status == 200) {
                    
                    erp_msg_show(res.msg, 'success');
                    document.location.reload();
                } else {
                    erp_msg_show(res.msg ?? 'Something went wrong', 'error');
                }
            },
            error: function (xhr) {
                $('#pageLoader').hide();
                erp_msg_show('Something went wrong', 'error');
            }
        });
    }, 'update');
}
function erp_msg_show(msg, type = 'success') {
    let $msgDiv = $('.top-msg-2');
    $msgDiv.removeClass('success error').addClass(type);
    $('#top-msg-ajax-content').text(msg);
    $msgDiv.show();

    setTimeout(() => {
        $msgDiv.fadeOut();
        $('#top-msg-ajax-content').text('');
    }, 3000);
}



function form_modal(el = null) {
    if (!el) return;

    let $el = $(el);
    let id = $el.data('id') ?? '';
    let module = $el.data('module');
    let table = $el.data('table') ?? ".ajax-wrapper";

    let routes = {
        store: $el.data('route-store') ?? `/${module}/store`,
        edit: $el.data('route-edit') ?? `/${module}/edit/:id`,
        update: $el.data('route-update') ?? `/${module}/update/:id`,
        form: $el.data('route-form') ?? `/form-fields/${module}`
    };

    let action = routes.store;
    let data_action = null;

    if (id) {
        action = routes.update.replace(':id', id);
        data_action = routes.edit.replace(':id', id);
    }

    $("#saveBtn").data('table', table);
    $("#modalform").attr('action', action);

    $.get(routes.form, { id: id }, function (html) {
        $("#formDiv").html(html);

        if (id && data_action) {
            $.get(data_action, function (res) {
                let data = res;
                for (let key in res) {
                    if (typeof res[key] === 'object' && res[key] !== null) {
                        let match = false;
                        $("#formDiv [name]").each(function () {
                            if (res[key][$(this).attr('name')] !== undefined) {
                                match = true;
                                return false;
                            }
                        });
                        if (match) {
                            data = res[key];
                            break;
                        }
                    }
                }

                $("#formDiv [name]").each(function () {
                    let name = $(this).attr('name');
                    if (data[name] !== undefined) {
                        let $field = $(this);
                        if ($field.is('select[multiple]')) {
                            $field.val(data[name]);
                            if ($field.hasClass('mlt')) $field.multiselect('refresh');
                            if ($field.hasClass('selectize')) $field[0].selectize.setValue(data[name]);
                        }
                        else if ($field.is('select')) {
                            $field.val(data[name]);
                            if ($field.hasClass('mlt')) $field.multiselect('refresh');
                            if ($field.hasClass('selectize')) $field[0].selectize.setValue(data[name]);
                        } else if ($field.attr('type') === 'radio') {
                            if ($field.val() == data[name]) {
                                $field.prop('checked', true);
                            }
                        } else if ($field.attr('type') === 'checkbox') {
                            if (data[name] == 'active' || data[name] == 1) {
                                $field.prop('checked', true);
                            } else {
                                $field.prop('checked', false);
                            }

                        }
                        else {
                            if ($field.data('attr') === 'date') {
                                if (data[name]) {
                                    let parts = data[name].split('-'); // YYYY-MM-DD
                                    if (parts.length === 3) {
                                        $field.val(`${parts[2]}-${parts[1]}-${parts[0]}`); // DD-MM-YYYY
                                    }
                                }
                            } else {
                                $field.val(data[name]);
                            }
                        }
                    }
                });
            });
        }

        $("#myModal").modal('show');
    });
}


function list_all(el) {
    let $el = $(el);
    let wrapper = $(".ajax-wrapper");
    let route = wrapper.data('route');
    $.get(route, {
        show_all: 1
    }, function (html) {
        wrapper.html(html);
    });
    $('.clearsearch').removeClass('d-none').show();
}


function search_form(el) {
    if (!el) return false;

    let $el = $(el);
    let url = $el.data('url');
    let result_route = $el.data('route');
    let title = $el.data('title') ?? 'Search';
    let modalWidth = $el.data('modalwidth') ?? 90;
    $('#search_modal_title').text(title);
    $('#Search_myModal .modal-dialog').css('max-width', modalWidth + '%');

    if (url) {
        $.get(url, function (html) {
            $('#defaultform').html(html);
            $('#Search_myModal').modal('show');

            $('#Search_myModal .btnSearch').data('url', result_route);
        });
    } else {
        $('#Search_myModal').modal('show');
    }

    return false;
}


function erp_search(el) {
    let $btn = $(el);
    let $form = $('#filter_form');
    // let url = "{{ route('building.search_results') }}";
    let route = $btn.data('url');
    console.log(route);
    $.ajax({
        url: route,
        type: 'GET',
        data: $form.serialize(),
        success: function (response) {
            let wrapper = $(".ajax-wrapper");
            let route = wrapper.data('route');
            $.get(route, function (html) {
                wrapper.html(response);
            });
            $('#Search_myModal').modal('hide');
            $('.clearsearch').removeClass('d-none').show();
        },
        error: function (err) {

        }
    });

    return false;
}

function clear_search(el) {
    let $el = $(el);
    let url = $el.data('url');

    $.get(url, function (response) {
        let wrapper = $(".ajax-wrapper");
        wrapper.html(response);

        $el.addClass('d-none').hide();
    });

    return false;
}

