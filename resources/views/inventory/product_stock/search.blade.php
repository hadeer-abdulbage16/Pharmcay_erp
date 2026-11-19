<div class="row">
    <div class="col-12"> 
        <div class="form-group">
            <label>{{ translate('name ') }}</label>
            <input type="text" class="form-control" name="name_ar"> 
        </div>
    </div>
    
    <div class="col-12"> 
        <div class="form-group">
            <label>{{ translate('Code') }}</label>
            <input type="text" class="form-control" name="code"> 
        </div>
    </div>
 
 
    <div class="col-12"> 
        <div class="form-group">
            <label>{{ translate('price') }}</label>
            <input type="number" class="form-control" name="price"> 
        </div>
    </div>
 
    <div class="mb-3">
    <label for="store_id">{{ translate('Store') }}</label>
    <select name="store_id" id="store_id" class="form-control form-control-sm" required>
        <option value="" selected disabled>{{ translate('Select Store') }}</option>
        @foreach ($stores as $store)
            <option value="{{ $store->id }}">{{ $store->name }}</option>
        @endforeach
    </select>
 </div>
 
   
</div>
