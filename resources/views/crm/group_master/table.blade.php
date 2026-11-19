
@if ($group_masters->count())
    <table class="table table-bordered" id="group_master_table" data-route="{{ route('crm.group_master.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL No') }}</th>
                <th>{{ translate('Code') }}</th>
                <th>{{ translate('Title') }}</th>
             
                <th>{{ translate('Created Date') }}</th>
                <th>{{ translate('Edited Data') }}</th>
                <th>{{ translate('Status') }}</th>
                <th class="text-right action-col">{{ translate('Action') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($group_masters as $item)
                <tr>
                    @if (method_exists($group_masters, 'currentPage'))
                        <td>{{ ($group_masters->currentPage() - 1) * $group_masters->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    <td>{{ $item->code }}</td>
                    <td>{{ $item->title }}</td>

                  
                    <td>{{ date('d-m-Y', strtotime($item->created_at)) }}</td>
                    <td>{{ date('d-m-Y', strtotime($item->updated_at)) }}</td>

                    <td>

                        @if ($item->status == 'active')
                            <span class="badge badge-success mr-1">{{ translate('Active') }}</span>
                        @else
                            <span class="badge badge-danger mr-1">{{ translate('Inactive') }}</span>
                        @endif
                    </td>

                    <td class="right">
                        <div class="dropdown notification-list dropdown">
                            <a class="btaction" data-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="false">{{ translate('Action') }} <i
                                    class="icon-arrow-down-circle"></i></a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route-store="{{ route('crm.group_master.store') }}"
                                    data-route-form="{{ route('crm.group_master.form') }}"
                                    data-route-edit="{{ route('crm.group_master.edit', ':id') }}"
                                    data-route-update="{{ route('crm.group_master.update', ':id') }}"
                                    onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route="{{ route('crm.group_master.delete', ':id') }}"
                                    onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @if (method_exists($group_masters, 'links'))
        <div class="pagination-wrapper">
            {{ $group_masters->appends(['wrapper' => 'group_master_table_wrapper'])->links() }}
        </div>
    @endif
    @else
    <div class="col-md-12 col-md-12-padding">
        <div class="box ">
            <div class="box-body">
                <div class="intro text-center">
                    <div class="videoimg"> </div>
                    <h3>{{ translate('Empty List') }}</h3>
                    <p class="text-muted">{{ translate('No Data Found') }}</p>
                </div>
            </div>
            <div class="box-footer clearfix">
            </div>
        </div>
    </div>


@endif
