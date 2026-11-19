 
<div class="mb-3">
    <label for="code">{{ translate('Group Code') }}</label>
    <input type="text" id="code" name="code" class="form-control autocheck" required>
</div>

<div class="mb-3">
    <label for="title">{{ translate('Group Name') }}</label>
    <input type="text" id="title" name="title" class="form-control" required>
</div>

 

<div class="mb-3">
    <label for="parent_id">{{ translate('Parent Group') }}</label>

    <select id="parent_id" name="parent_id" class="form-control select2">

        <option value="">{{ translate('Primary') }}</option>

        @foreach ($group_masters as $group)
            <option value="{{ $group->id }}">

                {!! str_repeat('&nbsp;&nbsp;&nbsp;', $group->level ?? 0) !!}
                {{ $group->title }}
            </option>
        @endforeach

    </select>

</div>
<div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" name="status" id="is_active" @if (isset($group_master->status) && $group_master->status=='active') checked @endif>
        <label class="form-check-label" for="flexSwitchCheckChecked">{{ translate('Is Active') }}</label>
    </div>
 
<script> 
</script>
