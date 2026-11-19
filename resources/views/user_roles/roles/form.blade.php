<div class="row">
    <div class="col-sm-7 ">
        <div class="row formrow">
            <div class="col-sm-2">{{ translate('Role Name') }}</div>
            <div class="col-sm-10">
                <input id="name" name="name" class="form-control autocheck" type="text" data-url="< "
                    data-guid=" ">
                <span id="error_name" class="help-block"></span>
            </div>
        </div>
        <div class="row formrow">
            <div class="col-sm-2">{{ translate('Description') }}</div>
            <div class="col-sm-10">
                <textarea rows="3" placeholder="Max. 500 characters" id="description" name="description" class="form-control"></textarea>
            </div>
        </div>
    </div>

    <div class="col-sm-5 ">
        <div class="row formrow">
            <div class="col-sm-5">{{ translate('Retail POS Login') }}</div>
            <div class="col-sm-7">
                <input id="retail_pos" name="retail_pos" value="1" class="form-check-input" type="checkbox">
            </div>
        </div>
    </div>
</div>


<div style="clear:both"></div>


<div id="roles_list" class="ember-view" style="padding-top:5px;  ">
    <div class="row">
        <div class="col-lg-6">
            @include('user_roles.roles.roles_pages.roles_hierarchy')
        </div>
        {{-- <div class="col-lg-6">
            @include('user_roles.roles.roles_pages.accounting')
        </div>
        <div class="col-lg-6">
            @include('user_roles.roles.roles_pages.inventory')
        </div> --}}
        <div class="col-lg-6">
            {{-- @include('user_roles.roles.roles_pages.accounts') --}}
            @include('user_roles.roles.roles_pages.user_roles')
        </div>
        {{-- <div class="col-lg-6">
            @include('user_roles.roles.roles_pages.customer_vehicle')
        </div> --}}

    </div>
</div>


<script>
    jQuery('body').on('click', '.form-check-input', function() {
        return erp_set_roles(this);
    });

    jQuery('body').on('click', '#reportAll', function() {
        return erp_enable_roles_report(this);
    });

    jQuery('body').on('click', '.selectAll', function() {
        return erp_select_all(this);
    });

    $(document).on('click', '.roles-more .dropdown-menu', function(e) {
        e.stopPropagation();
    });

    function erp_checked_all() {
        $('.roles').each(function(index) {
            var type = $(this).attr('data-type');
            var val = $(this).attr('data-value');
            erp_checked_roles(type, val);
        });
        var reportAll = $('#reportAll').attr('data-value');
        if (reportAll == 1) {
            $('#reportAll').attr('checked', true);
            $('.report').attr('readonly', true);
        }
    }

    function erp_set_roles(obj) {
        var type = $(obj).attr('data-type');
        var isItemMaster = false;
        if (type == 'item_master') {
            isItemMaster = true;
            var $class = 'item_master_NT';
        }
        var val = $(obj).val();
        var st = 0;
        if ($(obj).is(":checked")) {
            if (val == 1) {
                for (var i = 1; i <= 5; i++) {
                    $("." + type + "." + type + "" + i).prop("checked", true);
                    if (isItemMaster) $("." + $class + "." + $class + "" + i).prop("checked", true);
                }
                if (isItemMaster) $("." + $class + "." + $class + "1").prop("checked", true);
            } else {
                for (var i = 1; i <= val; i++) {
                    $("." + type + "." + type + "" + i).prop("checked", true);
                    if (isItemMaster) $("." + $class + "." + $class + "" + i).prop("checked", true);
                }
            }
        } else {
            if (val < 5) {
                for (var i = val; i <= 5; i++) {
                    $("." + type + "." + type + "" + i).prop("checked", false);
                    if (isItemMaster) {
                        $("." + $class + "." + $class + "" + i).prop("checked", false);
                        $("#" + $class + "-full").prop("indeterminate", false);
                        $("#" + $class + "-full").prop("checked", false);
                    }
                }
            }
            if (val == 5)
                if (isItemMaster) $("." + $class + "." + $class + "" + val).prop("checked", false);
        }
        for (var i = 2; i < 6; i++) {
            if ($("." + type + "." + type + "" + i).is(":checked")) {
                st = Math.abs(st) + 1;
            }
        }
        if (st == 4) {
            $("#" + type + "-full").prop("checked", true);
            if (isItemMaster) $("#" + $class + "-full").prop("checked", true);
        } else {
            if (val != 1) {
                $("#" + type + "-full").prop("indeterminate", true);
                if (isItemMaster) $("#" + $class + "-full").prop("indeterminate", true);
            }
        }
        if (val == 2) {
            if ($(obj).is(":checked")) {} else {
                $("#" + type + "-full").prop("indeterminate", false);
                $("#" + type + "-full").prop("checked", false);
                if (isItemMaster) $("#" + $class + "-full").prop("indeterminate", false);
                if (isItemMaster) $("#" + $class + "-full").prop("checked", false);
            }
        }
        if (val == 1) {
            var voucher = $(obj).attr('data-voucher');
            if ($(obj).is(":checked")) {
                // $('.tr_'+voucher).show();
                $(".voucher_" + voucher).prop("indeterminate", false);
                $(".voucher_" + voucher).prop("checked", true);
            } else {
                // $('.tr_'+voucher).hide();
                $(".voucher_" + voucher).prop("checked", false);
            }
        }
    }

    function erp_checked_roles(type, val) {
        var st = 0;
        if (val == 1) {
            for (var i = 1; i <= 5; i++) {
                $("." + type + "." + type + "" + i).prop("checked", true);
            }
        } else {
            for (var i = 1; i <= val; i++) {
                $("." + type + "." + type + "" + i).prop("checked", true);
            }
        }

        for (var i = 2; i < 6; i++) {
            if ($("." + type + "." + type + "" + i).is(":checked")) {
                st = Math.abs(st) + 1;
            }
        }
        if (st == 4) {
            $("#" + type + "-full").prop("checked", true);
        } else {
            if (val != 1) {
                $("#" + type + "-full").prop("indeterminate", true);
            }
        }

        if ($("." + type + "." + type + "1").is(":not(:checked)")) {
            if ($("." + type + "1").attr('data-voucher')) {
                var voucher = $("." + type + "1").attr('data-voucher');
                // $('.tr_'+voucher).hide();
            }
        }
    }

    function erp_enable_roles_report(obj) {
        if ($(obj).is(":checked")) {
            $(".report").prop("checked", true);
        } else {
            $(".report").prop("checked", false);
        }
    }

    function erp_select_all(obj) {
        var type = $(obj).attr('data-type');
        $("#" + type).find('input[type=checkbox]').each(function() {
            if ($(obj).is(":checked")) {
                this.checked = true;
            } else {
                this.checked = false;
                $(this).prop("indeterminate", false);
            }
        });
    }
    erp_checked_all();
</script>
