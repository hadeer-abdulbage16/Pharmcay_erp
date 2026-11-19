@extends('theme.main')
@section('css')
@endsection
@section('content')
    <div class="card-box pt-0" id="filter_div">
        <div class="card-body row menu-list" id="sidebar-menu" style="min-height:75vh">
            <div class="col-sm-3 ">
                <ul class="metismenu report_menu" id="side-menu">
                     
                     <li>
                        <a href="{{ route('company.currency.list') }}" class="nav_link">
                            {{ translate('Currency') }}<span class="menu-arrow"></span>
                        </a>
                    </li>
                    
                     
                     <li>
                        <a href="{{ route('company.company.list') }}" class="nav_link">
                            {{ translate('Company') }}<span class="menu-arrow"></span>
                        </a>
                    </li>
                </ul>
            </div>


        </div>

    </div>
@endsection
