@extends('theme.main')

@section('title', translate('Role List'))
@section('css')
    <script type="text/javascript" src="{{ asset(main_path() . 'js/bootstrap-multiselect.js') }}"></script>
    <link rel="stylesheet" href="{{ asset(main_path() . 'css/bootstrap-multiselect.css') }}" type="text/css" />
    <script src="{{ asset(main_path() . 'js/bootstrap3-typeahead.js') }}"></script>
    <script src="{{ asset(main_path() . 'js/roles.js') }}"></script>
    <style>
        .custom-checkbox input[type="checkbox"] {
            display: none;
        }

        .custom-checkbox.green input[type="checkbox"]:checked+.checkbox {
            background-color: #009900;
        }

        .custom-checkbox .checkbox {
            display: inline-block;
            width: 17px;
            height: 17px;
            background-color: #E91E63;
            border-radius: 4px;
            position: relative;
            cursor: pointer;
            vertical-align: middle;
        }

        .custom-checkbox input[type="checkbox"]:checked+.checkbox:after {
            display: block;
        }

        .custom-checkbox .checkbox:after {
            content: "";
            position: absolute;
            display: none;
            left: 5px;
            top: 2px;
            width: 7px;
            height: 11px;
            border: solid #fff;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
        }

        .dropdown-menu.show {
            display: block !important;
        }
    </style>

@endsection
@section('content')

    @include('user_roles.roles.modal')
    <div class="content">
        <div class="container-fluid">

            <div class="page-title-box">
                <div class="row">
                    <div class="col-md-3">
                        <h4 class="page-title ml-2">{{ translate('Role') }}</h4>
                    </div>

                    <div class="col-md-9">
                        <!-- Can use database-->
                        @include('theme.other_menu', [
                            'menus' => [['route' => 'user_roles.users.list', 'label' => translate('users')]],
                        ])
                        <div class="page-title-right">
                            <div class="titlemenu" style="padding-right:0px">
                                @if (user_can('roles', 3))
                                    <a class="btn btn-primary" data-module="role" data-table="#role_table"
                                        onclick="form_modal(this)" data-fields='["code","title"]'
                                        data-route-store="{{ route('user_roles.roles.store') }}"
                                        data-route-form="{{ route('user_roles.roles.form') }}"
                                        data-route-edit="{{ route('user_roles.roles.edit', ':id') }}"
                                        data-route-update="{{ route('user_roles.roles.update', ':id') }}"><i
                                            class="icon-plus"></i>
                                        {{ translate('Add New') }}</a>
                                @endif
                                @if (user_can('roles', 2))
                                    <a class="btn btn-primary show_all_btn" data-val="1" onclick="list_all(this)">
                                        <i class="fa fa-list"></i> {{ translate('Show All') }}
                                    </a>
                                    <a href="#" class="btn btn-primary"
                                        data-url="{{ route('user_roles.roles.search_form') }}" data-title="Search"
                                        data-modalwidth="50" onclick="return search_form(this)"
                                        data-route="{{ route('user_roles.roles.search_results') }}">
                                        <i class="ti-search"></i>{{ translate('Search') }}
                                    </a>
                                    <a href="#" class="btn btn-primary clearsearch d-none"
                                        style=" background-color: #ff5d48; border-color: #ff5d48;"
                                        data-url="{{ route('user_roles.roles.table') }}"
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
                    <div class="card-box ajax-wrapper" id="role_table_wrapper" data-wrapper="role_table_wrapper">
                        @include('user_roles.roles.table')
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')

@endsection
