@extends('theme.main')
@section('css')
@endsection
@section('content')
    <div class="card-box pt-0" id="filter_div">
        <div class="card-body row menu-list" id="sidebar-menu" style="min-height:75vh">
            <div class="col-sm-3 ">
                <ul class="metismenu report_menu" id="side-menu">


                    <li>
                        <a href="{{ route('inventory.product.list') }}" class="nav_link">
                            {{ translate('Product') }}<span class="menu-arrow"></span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('inventory.product_stock.list') }}" class="nav_link">
                            {{ translate('Prooduct Stock') }}<span class="menu-arrow"></span>
                        </a>
                    </li>

                    <li>
                        <a href="{{ route('inventory.stock_movement.list') }}" class="nav_link">
                            {{ translate('stock_movements') }}<span class="menu-arrow"></span>
                        </a>
                    </li>


                </ul>
            </div>
            <div class="col-sm-3 ">
                <ul class="metismenu report_menu" id="side-menu">
                    <li>
                        <a href="{{ route('inventory.store.list') }}" class="nav_link">
                            {{ translate('Store') }}<span class="menu-arrow"></span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('company.company.list') }}" class="nav_link">
                            {{ translate('company') }}<span class="menu-arrow"></span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('company.currency.list') }}" class="nav_link">
                            {{ translate('currency') }}<span class="menu-arrow"></span>
                        </a>
                    </li>


                    <li>
                        <a href="{{ route('inventory.category.list') }}" class="nav_link">
                            {{ translate('category') }}<span class="menu-arrow"></span>
                        </a>
                    </li>


                </ul>
            </div>


        </div>

    </div>
@endsection
