@extends('theme.main')

@section('title', translate('payment_method'))
@section('css')
   
@endsection
@section('content')

    @include('accounting.payment_method.modal')
    <div class="content">
        <div class="container-fluid">
            <div class="page-title-box">
                <div class="row">
                    <div class="col-md-3">
                        <h4 class="page-title ml-2">{{ translate('payment_method') }}</h4>
                    </div>
                    <div class="col-md-9">
                        @include('theme.other_menu', [
                            'menus' => [
                                ['route' => 'inventory.store.list', 'label' => 'store'],
                                ['route' => 'company.currency.list', 'label' => 'currency'],
                                ['route' => 'company.company.list', 'label' => 'company'],
                                ['route' => 'inventory.product.list' , 'label' => 'product'],
                            ],
                        ])
                        <div class="page-title-right">
                            <div class="titlemenu" style="padding-right:0px">
                                <a class="btn btn-primary" data-module="unit_master"
                                    data-table="#unit_master_table" onclick="form_modal(this)"
                                    data-fields='["code","title","fractional","is_weighing","status"]'
                                    data-route-store="{{ route('accounting.payment_method.store') }}"
                                    data-route-form="{{ route('accounting.payment_method.form') }}"
                                    data-route-edit="{{ route('accounting.payment_method.edit', ':id') }}"
                                    data-route-update="{{ route('accounting.payment_method.update', ':id') }}"><i
                                        class="icon-plus"></i>
                                    {{ translate('Add New') }}</a>
                                <a class="btn btn-primary show_all_btn" data-val="1" onclick="list_all(this)">
                                    <i class="fa fa-list"></i> {{ translate('Show All') }}
                                </a>
                                <a href="#" class="btn btn-primary"
                                    data-url="{{ route('accounting.payment_method.search_form') }}"
                                    data-title="Search" data-modalwidth="50" onclick="return search_form(this)"
                                    data-route="{{ route('accounting.payment_method.search_results') }}">
                                    <i class="ti-search"></i>{{ translate('Search') }}
                                </a>
                                <a href="#" class="btn btn-primary clearsearch d-none"
                                    style=" background-color: #ff5d48; border-color: #ff5d48;"
                                    data-url="{{ route('accounting.payment_method.table') }}"
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
                    <div class="card-box ajax-wrapper" id="payment_method_table_wrapper"
                        data-wrapper="payment_method_table_wrapper">
                        @include('accounting.payment_method.table')
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')

@endsection
