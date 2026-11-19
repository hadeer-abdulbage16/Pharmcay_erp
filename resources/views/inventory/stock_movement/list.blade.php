@extends('theme.main')

@section('title', translate('Stock Movement List'))
@section('css')
    <script type="text/javascript" src="{{ asset(main_path() . 'js/bootstrap-multiselect.js') }}"></script>
    <link rel="stylesheet" href="{{ asset(main_path() . 'css/bootstrap-multiselect.css') }}" type="text/css" />
    <script src="{{ asset(main_path() . 'js/bootstrap3-typeahead.js') }}"></script>
    <script src="{{ asset(main_path() . 'asset/room-reservation/js.js') }}"></script>
    <link href="{{ asset(main_path() . 'asset/room-reservation/style.css') }}" rel="stylesheet" type="text/css" />
@endsection
@section('content')
 
    <div class="content">
        <div class="container-fluid">

            <div class="page-title-box">
                <div class="row">
                    <div class="col-md-3">
                        <h4 class="page-title ml-2">{{ translate('Stock Movement List') }}</h4>
                    </div>

                    <div class="col-md-9">
                        <!-- Can use database-->
                        @include('theme.other_menu', [
                            'menus' => [ 
                                ['route' => 'accounting.category.list', 'label' => 'category'],
                                ['route' => 'company.currency.list', 'label' => 'currency'],
                                ['route' => 'company.company.list', 'label' => 'company'],
                                ['route' => 'inventory.store.list' , 'label' => 'store'],
                                ['route' => 'inventory.product.list' , 'label' => 'product'],
                            ]
                        ])
                        <div class="page-title-right">
                            <div class="titlemenu" style="padding-right:0px">
                                 
                                <a class="btn btn-primary show_all_btn" data-val="1" onclick="list_all(this)">
                                    <i class="fa fa-list"></i> {{ translate('Show All') }}
                                </a>
                                <a href="#" class="btn btn-primary"
                                    data-url="{{ route('inventory.stock_movement.search_form') }}" data-title="Search"
                                    data-modalwidth="50" onclick="return search_form(this)"
                                    data-route="{{ route('inventory.stock_movement.search_results') }}">
                                    <i class="ti-search"></i>{{ translate('Search') }}
                                </a>
                                <a href="#" class="btn btn-primary clearsearch d-none"
                                    style=" background-color: #ff5d48; border-color: #ff5d48;"
                                    data-url="{{ route('inventory.stock_movement.table') }}"
                                    onclick="return clear_search(this)">
                                    <i class="icon-plus"></i> {{ translate('Clear Search') }}
                                </a>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-xl-12">
                    <div class="card-box ajax-wrapper" id="stock_movement_table_wrapper"
                        data-wrapper="stock_movement_table_wrapper">
                        @include('inventory.stock_movement.table')
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')

@endsection
