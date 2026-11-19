<?php
if ($id) {
    if (!isset($roles['users']['p'])) {
        $roles['users']['p'] = 0;
    }
    if (!isset($roles['roles']['p'])) {
        $roles['roles']['p'] = 0;
    }
    
} else {
    $roles['users']['p'] = 5;
    $roles['roles']['p'] = 5; 
}

?>
<div class="card mb-5">
    <div class="card-header">
        <div class="card-title font-large mb-0" style="float:left">{{ translate('User & Roles Master') }}</div>
        <div class="card-title font-large mb-0" style="float:right">
            {{ translate('Select All') }}
            <input class="selectAll" data-type='user_roles_all' type="checkbox" checked>
        </div>
    </div>

    <table class="table table-bordered role-table mb-0" id="user_roles_all">
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
                <td>{{ translate('users') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="users-full" name="roles[users][p]" value="1"
                            class="form-check-input roles users users1" data-value="<?php echo (int) $roles['users']['p']; ?>"
                            data-type='users' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="users-view" name="roles[users][p]" value="2"
                            class="form-check-input users users2" data-type='users' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="users-create" name="roles[users][p]" value="3"
                            class="form-check-input users users3" data-type='users' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="users-edit" name="roles[users][p]" value="4"
                            class="form-check-input users users4" data-type='users' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="users-delete" name="roles[users][p]" value="5"
                            class="form-check-input users users5" data-type='users' type="checkbox">
                    </div>
                </td>

            </tr>

            <tr>
                <td>{{ translate('roles') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="roles-full" name="roles[roles][p]" value="1"
                            class="form-check-input roles roles roles1" data-value="<?php echo (int) $roles['roles']['p']; ?>"
                            data-type='roles' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="roles-view" name="roles[roles][p]" value="2"
                            class="form-check-input roles roles2" data-type='roles' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="roles-create" name="roles[roles][p]" value="3"
                            class="form-check-input roles roles3" data-type='roles' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="roles-edit" name="roles[roles][p]" value="4"
                            class="form-check-input roles roles4" data-type='roles' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="roles-delete" name="roles[roles][p]" value="5"
                            class="form-check-input roles roles5" data-type='roles' type="checkbox">
                    </div>
                </td>

            </tr>
          
 

        </tbody>
    </table>
</div>
