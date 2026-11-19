
@if ($stores->count())
    <table class="table table-bordered" id="store_table" data-route="{{ route('inventory.store.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL No') }}</th>
                <th>{{ translate('Name') }}</th>
                <th>{{ translate('Code') }}</th>
                <th>{{ translate('Address') }}</th>
                <th>{{ translate('Email') }}</th> 
                <th>{{ translate('Created Date') }}</th>
                <th>{{ translate('Edited Data') }}</th>
                <th class="text-right action-col">{{ translate('Action') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($stores as $item)
                <tr>
                    @if (method_exists($stores, 'currentPage'))
                        <td>{{ ($stores->currentPage() - 1) * $stores->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->code }}</td>
                    <td>{{ $item->address }}</td>
                    <td>{{ $item->email }}</td> 

                    <td>{{ date('d-m-Y', strtotime($item->created_at)) }}</td>
                    <td>{{ date('d-m-Y', strtotime($item->updated_at)) }}</td>

                  <!--  <td>

                        @if ($item->status == 'active')
                            <span class="badge badge-success mr-1">{{ translate('Active') }}</span>
                        @else
                            <span class="badge badge-danger mr-1">{{ translate('Inactive') }}</span>
                        @endif
                    </td> -->

                    <td class="right">
                        <div class="dropdown notification-list dropdown">
                            <a class="btaction" data-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="false">{{ translate('Action') }} <i
                                    class="icon-arrow-down-circle"></i></a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route-store="{{ route('inventory.store.store') }}"
                                    data-route-form="{{ route('inventory.store.form') }}"
                                    data-route-edit="{{ route('inventory.store.edit', ':id') }}"
                                    data-route-update="{{ route('inventory.store.update', ':id') }}"
                                    onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route="{{ route('inventory.store.delete', ':id') }}"
                                    onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @if (method_exists($stores, 'links'))
        <div class="pagination-wrapper">
            {{ $stores->appends(['wrapper' => 'store_table_wrapper'])->links() }}
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
