@extends('theme.main')

@section('title', translate('User List'))
@section('css')
    <script type="text/javascript" src="{{ asset(main_path() . 'js/bootstrap-multiselect.js') }}"></script>
    <link rel="stylesheet" href="{{ asset(main_path() . 'css/bootstrap-multiselect.css') }}" type="text/css" />
    <script src="{{ asset(main_path() . 'js/bootstrap3-typeahead.js') }}"></script>
    <script src="{{ asset(main_path() . 'asset/room-reservation/js.js') }}"></script>
    <link href="{{ asset(main_path() . 'asset/room-reservation/style.css') }}" rel="stylesheet" type="text/css" />
@endsection
@section('content')
    @include('user_roles.users.modal')

    <div class="content">
        <div class="container-fluid">

            <div class="page-title-box">
                <div class="row">
                    <div class="col-md-3">
                        <h4 class="page-title ml-2">{{ translate('User') }}</h4>
                    </div>

                    <div class="col-md-9">

                        @include('theme.other_menu', [
                            'menus' => [['route' => 'user_roles.roles.list', 'label' => translate('roles')]],
                        ])
                        <div class="page-title-right">
                            <div class="titlemenu">
                                @if (user_can('users', 3))
                                    <a class="btn btn-primary" data-module="user" data-table="#user_table"
                                        onclick="form_modal(this)" data-fields='["name","code","phone_no","email"]'
                                        data-route-store="{{ route('user_roles.users.store') }}"
                                        data-route-form="{{ route('user_roles.users.form') }}"
                                        data-route-edit="{{ route('user_roles.users.edit', ':id') }}"
                                        data-route-update="{{ route('user_roles.users.update', ':id') }}"><i
                                            class="icon-plus"></i>
                                        {{ translate('Add New') }}</a>
                                @endif
                                @if (user_can('users', 2))
                                    <a class="btn btn-primary show_all_btn" data-val="1" onclick="list_all(this)">
                                        <i class="fa fa-list"></i> {{ translate('Show All') }}
                                    </a>

                                    <a href="#" class="btn btn-primary"
                                        data-url="{{ route('user_roles.users.search_form') }}" data-title="Search"
                                        data-modalwidth="50" onclick="return search_form(this)"
                                        data-route="{{ route('user_roles.users.search_results') }}">
                                        <i class="ti-search"></i>{{ translate('Search') }}
                                    </a>
                                @endif
                                @if (user_can('users', 2))
                                    <a href="#" class="btn btn-primary clearsearch d-none"
                                        style=" background-color: #ff5d48; border-color: #ff5d48;"
                                        data-url="{{ route('user_roles.users.table') }}"
                                        onclick="return clear_search(this)">
                                        <i class="icon-plus"></i> {{ translate('Clear Search') }}
                                    </a>
                                @endif


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-xl-12">
                    <div class="card-box ajax-wrapper" id="countries_table_wrapper" data-wrapper="user_table_wrapper">
                        @include('user_roles.users.table')
                    </div>

                </div>
            </div>
        </div>
    </div>


@endsection
@section('scripts')




@endsection
