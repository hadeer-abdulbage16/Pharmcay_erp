
 

<div class="row">
 
    <div class="col-lg-6">
        <div class=" mb-3">
            <label for="validationCustom01">{{ translate('name') }}</label>
            <input type="text" name="name" id="name" class="form-control autocheck"
                required>
        </div>
    </div>
    <div class="col-lg-6">
        <div class=" mb-3">
            <label for="validationCustom01">{{ translate('mobile') }}</label>
            <input type="number" name="mobile" id="mobile" class="form-control" required>
        </div> 
    </div>
    <div class="col-lg-6"> 
        <div class=" mb-3">
            <label for="validationCustom01">{{ translate('username') }}</label>
            <input type="text" name="username" id="username" class="form-control" required>
        </div>
    </div>
    <div class="col-lg-6"> 
        <div class=" mb-3">
            <label for="validationCustom01">{{ translate('email') }}</label>
            <input type="email" name="email" id="email" class="form-control" required>
        </div>
    </div>
    <div class="col-lg-6"> 
        <div class=" mb-3">
            <label for="validationCustom01">{{ translate('password') }}</label>
            <input type="password" name="password" id="password" class="form-control" required>
        </div>
    </div>
    <div class="col-lg-6"> 
        <div class=" mb-3">
            <label for="validationCustom01">{{ translate('role') }}</label>
            <select name="role_id" class="form-control">
				<option value="" disabled>{{ translate('select_role') }}</option>
                @foreach ($roles as $role_item)
				<option value="{{ $role_item->id }}">{{ $role_item->name }}</option>
                    
                @endforeach
            </select>
        </div>
    </div>
    <div class="col-lg-6">
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" value="active" name="status" id="status">
            <label class="form-check-label" for="flexSwitchCheckChecked">{{ translate('Is Active') }}</label>
        </div>
    </div>
</div>
