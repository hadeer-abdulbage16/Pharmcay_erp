<?php
if ($id) {
    if (!isset($roles['unit_master']['p'])) {
        $roles['unit_master']['p'] = 0;
    }
    if (!isset($roles['division_master']['p'])) {
        $roles['division_master']['p'] = 0;
    }
    if (!isset($roles['category_master']['p'])) {
        $roles['category_master']['p'] = 0;
    }
    if (!isset($roles['hs_code']['p'])) {
        $roles['hs_code']['p'] = 0;
    }
    if (!isset($roles['brand_master']['p'])) {
        $roles['brand_master']['p'] = 0;
    }
    if (!isset($roles['manufacturers_master']['p'])) {
        $roles['manufacturers_master']['p'] = 0;
    }
    if (!isset($roles['delivery_terms']['p'])) {
        $roles['delivery_terms']['p'] = 0;
    }
    
} else {
    $roles['unit_master']['p'] = 5;
    $roles['division_master']['p'] = 5;
    $roles['category_master']['p'] = 5;
    $roles['hs_code']['p'] = 5;
    $roles['brand_master']['p'] = 5;
    $roles['manufacturers_master']['p'] = 5;
    $roles['delivery_terms']['p'] = 5; 
}

?>
<div class="card mb-5">
    <div class="card-header">
        <div class="card-title font-large mb-0" style="float:left">{{ translate('Inventory Master') }}</div>
        <div class="card-title font-large mb-0" style="float:right">
            {{ translate('Select All') }}
            <input class="selectAll" data-type='inventory_all' type="checkbox" checked>
        </div>
    </div>

    <table class="table table-bordered role-table mb-0" id="inventory_all">
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
                <td>{{ translate('unit_master') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="unit_master-full" name="roles[unit_master][p]" value="1"
                            class="form-check-input roles unit_master unit_master1" data-value="<?php echo (int) $roles['unit_master']['p']; ?>"
                            data-type='unit_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="unit_master-view" name="roles[unit_master][p]" value="2"
                            class="form-check-input unit_master unit_master2" data-type='unit_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="unit_master-create" name="roles[unit_master][p]" value="3"
                            class="form-check-input unit_master unit_master3" data-type='unit_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="unit_master-edit" name="roles[unit_master][p]" value="4"
                            class="form-check-input unit_master unit_master4" data-type='unit_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="unit_master-delete" name="roles[unit_master][p]" value="5"
                            class="form-check-input unit_master unit_master5" data-type='unit_master' type="checkbox">
                    </div>
                </td>

            </tr>

            <tr>
                <td>{{ translate('division_master') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="division_master-full" name="roles[division_master][p]" value="1"
                            class="form-check-input roles division_master division_master1" data-value="<?php echo (int) $roles['division_master']['p']; ?>"
                            data-type='division_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="division_master-view" name="roles[division_master][p]" value="2"
                            class="form-check-input division_master division_master2" data-type='division_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="division_master-create" name="roles[division_master][p]" value="3"
                            class="form-check-input division_master division_master3" data-type='division_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="division_master-edit" name="roles[division_master][p]" value="4"
                            class="form-check-input division_master division_master4" data-type='division_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="division_master-delete" name="roles[division_master][p]" value="5"
                            class="form-check-input division_master division_master5" data-type='division_master' type="checkbox">
                    </div>
                </td>

            </tr>
            <tr>
                <td>{{ translate('category_master') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="category_master-full" name="roles[category_master][p]" value="1"
                            class="form-check-input roles category_master category_master1" data-value="<?php echo (int) $roles['category_master']['p']; ?>"
                            data-type='category_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="category_master-view" name="roles[category_master][p]" value="2"
                            class="form-check-input category_master category_master2" data-type='category_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="category_master-create" name="roles[category_master][p]" value="3"
                            class="form-check-input category_master category_master3" data-type='category_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="category_master-edit" name="roles[category_master][p]" value="4"
                            class="form-check-input category_master category_master4" data-type='category_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="category_master-delete" name="roles[category_master][p]" value="5"
                            class="form-check-input category_master category_master5" data-type='category_master' type="checkbox">
                    </div>
                </td>

            </tr>
        



            <tr>
                <td>{{ translate('hs_code') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="hs_code-full" name="roles[hs_code][p]" value="1"
                            class="form-check-input roles hs_code hs_code1"
                            data-value="<?php echo (int) $roles['hs_code']['p']; ?>" data-type='hs_code' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="hs_code-view" name="roles[hs_code][p]" value="2"
                            class="form-check-input hs_code hs_code2" data-type='hs_code'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="hs_code-create" name="roles[hs_code][p]" value="3"
                            class="form-check-input hs_code hs_code3" data-type='hs_code'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="hs_code-edit" name="roles[hs_code][p]" value="4"
                            class="form-check-input hs_code hs_code4" data-type='hs_code'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="hs_code-delete" name="roles[hs_code][p]" value="5"
                            class="form-check-input hs_code hs_code5" data-type='hs_code'
                            type="checkbox">
                    </div>
                </td>

            </tr>
            <tr>
                <td>{{ translate('brand_master') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brand_master-full" name="roles[brand_master][p]" value="1"
                            class="form-check-input roles brand_master brand_master1" data-value="<?php echo (int) $roles['brand_master']['p']; ?>"
                            data-type='brand_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brand_master-view" name="roles[brand_master][p]" value="2"
                            class="form-check-input brand_master brand_master2" data-type='brand_master'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brand_master-create" name="roles[brand_master][p]" value="3"
                            class="form-check-input brand_master brand_master3" data-type='brand_master'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brand_master-edit" name="roles[brand_master][p]" value="4"
                            class="form-check-input brand_master brand_master4" data-type='brand_master'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="brand_master-delete" name="roles[brand_master][p]" value="5"
                            class="form-check-input brand_master brand_master5" data-type='brand_master'
                            type="checkbox">
                    </div>
                </td>

            </tr>
            <tr>
                <td>{{ translate('manufacturers_master') }}</td>
                <td class="permission">
                    <div class="form-check">
                        <input id="manufacturers_master-full" name="roles[manufacturers_master][p]" value="1"
                            class="form-check-input roles manufacturers_master manufacturers_master1" data-value="<?php echo (int) $roles['manufacturers_master']['p']; ?>"
                            data-type='manufacturers_master' type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="manufacturers_master-view" name="roles[manufacturers_master][p]" value="2"
                            class="form-check-input manufacturers_master manufacturers_master2" data-type='manufacturers_master'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="manufacturers_master-create" name="roles[manufacturers_master][p]" value="3"
                            class="form-check-input manufacturers_master manufacturers_master3" data-type='manufacturers_master'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="manufacturers_master-edit" name="roles[manufacturers_master][p]" value="4"
                            class="form-check-input manufacturers_master manufacturers_master4" data-type='manufacturers_master'
                            type="checkbox">
                    </div>
                </td>
                <td class="permission">
                    <div class="form-check">
                        <input id="manufacturers_master-delete" name="roles[manufacturers_master][p]" value="5"
                            class="form-check-input manufacturers_master manufacturers_master5" data-type='manufacturers_master'
                            type="checkbox">
                    </div>
                </td>

            </tr> 
  

        

        </tbody>
    </table>
</div>
