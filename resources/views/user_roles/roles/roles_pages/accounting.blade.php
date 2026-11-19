<?php
if ($id) {
    if (!isset($roles['currency']['p'])) {
        $roles['currency']['p'] = 0;
    }
    if (!isset($roles['salesman']['p'])) {
        $roles['salesman']['p'] = 0;
    }
   
    
} else {
    $roles['currency']['p'] = 5;
    $roles['salesman']['p'] = 5;
    
}

?>
<div class="card mb-5">
    <div class="card-header">
        <div class="card-title font-large mb-0" style="float:left">{{ translate('Accounting Master') }}</div>
        <div class="card-title font-large mb-0" style="float:right">
            {{ translate('Select All') }}
            <input class="selectAll" data-type='accounting_all' type="checkbox" checked>
        </div>
    </div>

    <table class="table table-bordered role-table mb-0" id="accounting_all">
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

            </tr>
        </thead>
        <tbody>
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
