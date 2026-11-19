@if ($roles->count())
    <table class="table table-bordered" id="role_table" data-route="{{ route('user_roles.roles.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL.No.') }}</th>
                <th>{{ translate('name') }}</th>
                <th>{{ translate('Description') }}</th>
                <th class="text-right action-col">{{ translate('Action') }}</th>

            </tr>
        </thead>
        <tbody>
            @foreach ($roles as $item)
                <tr>
                    @if (method_exists($roles, 'currentPage'))
                        <td>{{ ($roles->currentPage() - 1) * $roles->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->description }}</td>

                    <td class="right">
                        <div class="dropdown notification-list dropdown">
                            <a class="btaction" data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                                aria-expanded="false">{{ translate('Action') }} <i
                                    class="icon-arrow-down-circle"></i></a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                                @if (user_can('roles', 4))
                                    <a href="#" class="dropdown-item notify-item" data-module="role"
                                        data-id="{{ $item->id }}"
                                        data-route-store="{{ route('user_roles.roles.store') }}"
                                        data-route-form="{{ route('user_roles.roles.form') }}"
                                        data-route-edit="{{ route('user_roles.roles.edit', ':id') }}"
                                        data-route-update="{{ route('user_roles.roles.update', ':id') }}"
                                        onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                @endif
                                @if (user_can('roles', 5))
                                    <a href="#" class="dropdown-item notify-item" data-module="role"
                                        data-id="{{ $item->id }}"
                                        data-route="{{ route('user_roles.roles.delete', ':id') }}"
                                        onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                                @endif
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @if (method_exists($roles, 'links'))
        <div class="pagination-wrapper">
            {{ $roles->appends(['wrapper' => 'role_table_wrapper'])->links() }}
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
