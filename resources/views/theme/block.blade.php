
@extends('theme.main')

@section('title', translate('User List'))
@section('css')
 
@endsection
@section('content')


<div class="content">
    <div class="container-fluid">
        <div class="page-title-box">
            <div class="row">

            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-xl-12">
                <div class="card-box" id="filter_div">
                    <h4 class="page-title"><i class="icon-lock"></i>&nbsp;{{ translate('Blocked') }}</h4>
                    {{ translate('You have no privilages to access this section') }}
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
@section('scripts')
   



@endsection