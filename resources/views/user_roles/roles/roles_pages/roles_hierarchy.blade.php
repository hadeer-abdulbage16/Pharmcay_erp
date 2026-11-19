<?php
if ($id) {
    if (!isset($roles['store_master']['p'])) {
        $roles['store_master']['p'] = 0;
    }
    if (!isset($roles['currency']['p'])) {
        $roles['currency']['p'] = 0;
    }
    if (!isset($roles['salesman']['p'])) {
        $roles['salesman']['p'] = 0;
    }
} else {
    $roles['store_master']['p'] = 5;
    $roles['currency']['p'] = 5;
    $roles['salesman']['p'] = 5;
}

?>
<div class="card mb-5">
    <div class="card-header">
        <div class="card-title font-large mb-0" style="float:left">{{ translate('Hierarchy Master') }}</div>
        <div class="card-title font-large mb-0" style="float:right">
            {{ translate('Select All') }}
            <input class="selectAll" data-type='hierarchy_all' type="checkbox" checked>
        </div>
    </div>

    <table class="table table-bordered role-table mb-0" id="hierarchy_all">
        <colgroup>
            <col>
            <col style="background: #fcfcfc;">
        </colgroup>
        <thead>
            <tr>
                <td style="min-width:220px;"></td>
                <td class="permission">{{ translate('Full') }}</td>
                <td class="permission text-capitalize">{{ translate('view') }}</td>
                <td class="permission">{{ translate('Create') }}</td>
                <td class="permission">{{ translate('Edit') }}</td>
                <td class="permission">{{ translate('Delete') }}</td>
                {{-- <td class="permission">{{ translate('More') }}</td> --}}

            </tr>
        </thead>
        <tbody>
         
            <tr>
                <td>{{ translate('Store Master') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="store_master-full" name="roles[store_master][p]" value="1"
                            class="form-check-input roles store_master store_master1" data-value="<?php echo (int) $roles['store_master']['p']; ?>"
                            data-type='store_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="store_master-view" name="roles[store_master][p]" value="2"
                            class="form-check-input store_master store_master2" data-type='store_master'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="store_master-create" name="roles[store_master][p]" value="3"
                            class="form-check-input store_master store_master3" data-type='store_master'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="store_master-edit" name="roles[store_master][p]" value="4"
                            class="form-check-input store_master store_master4" data-type='store_master'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="store_master-delete" name="roles[store_master][p]" value="5"
                            class="form-check-input store_master store_master5" data-type='store_master'
                            type="checkbox">
                    </div>
                </td>

            </tr>
             <tr>
                <td>{{ translate('currency') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="currency-full" name="roles[currency][p]" value="1"
                            class="form-check-input roles currency currency1" data-value="<?php echo (int) $roles['currency']['p']; ?>"
                            data-type='currency' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="currency-view" name="roles[currency][p]" value="2"
                            class="form-check-input currency currency2" data-type='currency' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="currency-create" name="roles[currency][p]" value="3"
                            class="form-check-input currency currency3" data-type='currency' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="currency-edit" name="roles[currency][p]" value="4"
                            class="form-check-input currency currency4" data-type='currency' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="currency-delete" name="roles[currency][p]" value="5"
                            class="form-check-input currency currency5" data-type='currency' type="checkbox">
                    </div>
                </td>

            </tr>

            <tr>
                <td>{{ translate('salesman') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="salesman-full" name="roles[salesman][p]" value="1"
                            class="form-check-input roles salesman salesman1" data-value="<?php echo (int) $roles['salesman']['p']; ?>"
                            data-type='salesman' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="salesman-view" name="roles[salesman][p]" value="2"
                            class="form-check-input salesman salesman2" data-type='salesman' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="salesman-create" name="roles[salesman][p]" value="3"
                            class="form-check-input salesman salesman3" data-type='salesman' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="salesman-edit" name="roles[salesman][p]" value="4"
                            class="form-check-input salesman salesman4" data-type='salesman' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="salesman-delete" name="roles[salesman][p]" value="5"
                            class="form-check-input salesman salesman5" data-type='salesman' type="checkbox">
                    </div>
                </td>

            </tr> 

        </tbody>
    </table>
</div>
