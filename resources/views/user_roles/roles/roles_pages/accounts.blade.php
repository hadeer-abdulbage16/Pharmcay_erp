<?php
if ($id) {
    if (!isset($roles['groups']['p'])) {
        $roles['groups']['p'] = 0;
    }
    if (!isset($roles['ledger']['p'])) {
        $roles['ledger']['p'] = 0;
    }
    
} else {
    $roles['groups']['p'] = 5;
    $roles['ledger']['p'] = 5; 
}

?>
<div class="card mb-5">
    <div class="card-header">
        <div class="card-title font-large mb-0" style="float:left">{{ translate('Accounts Master') }}</div>
        <div class="card-title font-large mb-0" style="float:right">
            {{ translate('Select All') }}
            <input class="selectAll" data-type='accounts_all' type="checkbox" checked>
        </div>
    </div>

    <table class="table table-bordered role-table mb-0" id="accounts_all">
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
                <td>{{ translate('groups') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="groups-full" name="roles[groups][p]" value="1"
                            class="form-check-input roles groups groups1" data-value="<?php echo (int) $roles['groups']['p']; ?>"
                            data-type='groups' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="groups-view" name="roles[groups][p]" value="2"
                            class="form-check-input groups groups2" data-type='groups' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="groups-create" name="roles[groups][p]" value="3"
                            class="form-check-input groups groups3" data-type='groups' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="groups-edit" name="roles[groups][p]" value="4"
                            class="form-check-input groups groups4" data-type='groups' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="groups-delete" name="roles[groups][p]" value="5"
                            class="form-check-input groups groups5" data-type='groups' type="checkbox">
                    </div>
                </td>

            </tr>

            <tr>
                <td>{{ translate('ledger') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="ledger-full" name="roles[ledger][p]" value="1"
                            class="form-check-input roles ledger ledger1" data-value="<?php echo (int) $roles['ledger']['p']; ?>"
                            data-type='ledger' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="ledger-view" name="roles[ledger][p]" value="2"
                            class="form-check-input ledger ledger2" data-type='ledger' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="ledger-create" name="roles[ledger][p]" value="3"
                            class="form-check-input ledger ledger3" data-type='ledger' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="ledger-edit" name="roles[ledger][p]" value="4"
                            class="form-check-input ledger ledger4" data-type='ledger' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="ledger-delete" name="roles[ledger][p]" value="5"
                            class="form-check-input ledger ledger5" data-type='ledger' type="checkbox">
                    </div>
                </td>

            </tr>
          
 

        </tbody>
    </table>
</div>
