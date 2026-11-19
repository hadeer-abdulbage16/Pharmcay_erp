@if ($users->count())
    <table class="table table-bordered" id="user_table" data-route="{{ route('user_roles.users.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL.No.') }}</th>
                <th>{{ translate('Name') }}</th>
                <th>{{ translate('Username') }}</th>
                <th>{{ translate('email') }}</th>
                <th>{{ translate('mobile') }}</th>
                <th>{{ translate('role') }}</th>
                <th>{{ translate('status') }}</th>
                <th class="text-right action-col">{{ translate('Action') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($users as $user)
                <tr>
                    @if (method_exists($users, 'currentPage'))
                        <td>{{ ($users->currentPage() - 1) * $users->perPage() + $loop->iteration }}</td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->username }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->mobile }}</td>
                    <td>{{ $user->role?->name }}</td>
                    <td>

                        @if ($user->status == 'active')
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

                                @if (user_can('users', 4))
                                    <a href="#" class="dropdown-item notify-item" data-module="user"
                                        data-id="{{ $user->id }}"
                                        data-route-store="{{ route('user_roles.users.store') }}"
                                        data-route-form="{{ route('user_roles.users.form') }}"
                                        data-route-edit="{{ route('user_roles.users.edit', ':id') }}"
                                        data-route-update="{{ route('user_roles.users.update', ':id') }}"
                                        onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                @endif
                                @if (user_can('users', 5))
                                    <a href="#" class="dropdown-item notify-item" data-module="user"
                                        data-id="{{ $user->id }}"
                                        data-route="{{ route('user_roles.users.delete', ':id') }}"
                                        onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                                @endif
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @if (method_exists($users, 'links'))
        <div class="pagination-wrapper">
            {{ $users->appends(['wrapper' => 'user_table_wrapper'])->links() }}
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
