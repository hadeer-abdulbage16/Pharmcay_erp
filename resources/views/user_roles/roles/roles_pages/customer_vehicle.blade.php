<?php
if ($id) {
    if (!isset($roles['brands_master']['p'])) {
        $roles['brands_master']['p'] = 0;
    }
    if (!isset($roles['models_master']['p'])) {
        $roles['models_master']['p'] = 0;
    }
    if (!isset($roles['body_type']['p'])) {
        $roles['body_type']['p'] = 0;
    }
    
    if (!isset($roles['color_master']['p'])) {
        $roles['color_master']['p'] = 0;
    }
    
} else {
    $roles['brands_master']['p'] = 5;
    $roles['models_master']['p'] = 5; 
    $roles['body_type']['p'] = 5; 
    $roles['color_master']['p'] = 5; 
}

?>
<div class="card mb-5">
    <div class="card-header">
        <div class="card-title font-large mb-0" style="float:left">{{ translate('Customer Vehicle') }}</div>
        <div class="card-title font-large mb-0" style="float:right">
            {{ translate('Select All') }}
            <input class="selectAll" data-type='customer_vehicle_all' type="checkbox" checked>
        </div>
    </div>

    <table class="table table-bordered role-table mb-0" id="customer_vehicle_all">
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
                <td>{{ translate('brands_master') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brands_master-full" name="roles[brands_master][p]" value="1"
                            class="form-check-input roles brands_master brands_master1" data-value="<?php echo (int) $roles['brands_master']['p']; ?>"
                            data-type='brands_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brands_master-view" name="roles[brands_master][p]" value="2"
                            class="form-check-input brands_master brands_master2" data-type='brands_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brands_master-create" name="roles[brands_master][p]" value="3"
                            class="form-check-input brands_master brands_master3" data-type='brands_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brands_master-edit" name="roles[brands_master][p]" value="4"
                            class="form-check-input brands_master brands_master4" data-type='brands_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brands_master-delete" name="roles[brands_master][p]" value="5"
                            class="form-check-input brands_master brands_master5" data-type='brands_master' type="checkbox">
                    </div>
                </td>

            </tr>

            <tr>
                <td>{{ translate('models_master') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="models_master-full" name="roles[models_master][p]" value="1"
                            class="form-check-input roles models_master models_master1" data-value="<?php echo (int) $roles['models_master']['p']; ?>"
                            data-type='models_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="models_master-view" name="roles[models_master][p]" value="2"
                            class="form-check-input models_master models_master2" data-type='models_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="models_master-create" name="roles[models_master][p]" value="3"
                            class="form-check-input models_master models_master3" data-type='models_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="models_master-edit" name="roles[models_master][p]" value="4"
                            class="form-check-input models_master models_master4" data-type='models_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="models_master-delete" name="roles[models_master][p]" value="5"
                            class="form-check-input models_master models_master5" data-type='models_master' type="checkbox">
                    </div>
                </td>

            </tr>
            <tr>
                <td>{{ translate('body_type') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="body_type-full" name="roles[body_type][p]" value="1"
                            class="form-check-input roles body_type body_type1" data-value="<?php echo (int) $roles['body_type']['p']; ?>"
                            data-type='body_type' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="body_type-view" name="roles[body_type][p]" value="2"
                            class="form-check-input body_type body_type2" data-type='body_type' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="body_type-create" name="roles[body_type][p]" value="3"
                            class="form-check-input body_type body_type3" data-type='body_type' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="body_type-edit" name="roles[body_type][p]" value="4"
                            class="form-check-input body_type body_type4" data-type='body_type' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="body_type-delete" name="roles[body_type][p]" value="5"
                            class="form-check-input body_type body_type5" data-type='body_type' type="checkbox">
                    </div>
                </td>

            </tr>
          
            <tr>
                <td>{{ translate('color_master') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="color_master-full" name="roles[color_master][p]" value="1"
                            class="form-check-input roles color_master color_master1" data-value="<?php echo (int) $roles['color_master']['p']; ?>"
                            data-type='color_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="color_master-view" name="roles[color_master][p]" value="2"
                            class="form-check-input color_master color_master2" data-type='color_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="color_master-create" name="roles[color_master][p]" value="3"
                            class="form-check-input color_master color_master3" data-type='color_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="color_master-edit" name="roles[color_master][p]" value="4"
                            class="form-check-input color_master color_master4" data-type='color_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="color_master-delete" name="roles[color_master][p]" value="5"
                            class="form-check-input color_master color_master5" data-type='color_master' type="checkbox">
                    </div>
                </td>

            </tr>
          
 

        </tbody>
    </table>
</div>
