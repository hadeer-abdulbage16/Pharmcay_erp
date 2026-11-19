<!DOCTYPE html>
<html id="pages" dir="{{ session('direction') == 'rtl' ? 'rtl' : 'ltr' }}"
    lang="{{ session('locale') == 'en' ? 'en' : 'ar' }}"
    style="text-align: {{ session('direction') == 'rtl' ? 'right' : 'left' }};">

<head>
    <meta charset="utf-8" />
    <title>@yield('title', translate('ERP'))</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="ERP" name="description" />
    <meta content="Coderthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="icon" href="{{ asset(main_path() . 'logo.png') }}" sizes="32x32" />
    <link href="{{ asset(main_path() . 'css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"
        id="bootstrap-stylesheet" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
       
    <link href="{{ asset(main_path() . 'css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset(main_path() . 'css/select2.min.css') }}" rel="stylesheet" />
    @if (session('direction') == 'rtl')
         
        <link href="{{ asset(main_path() . 'css/app-rtl.min.css') }}" rel="stylesheet" />
    @else
        <link href="{{ asset(main_path() . 'css/app.min.css') }}" rel="stylesheet" type="text/css"
            id="app-stylesheet" />
    @endif
    {{-- <link href="{{ asset(main_path() . 'css/app-dark.min.css') }}" rel="stylesheet" /> --}}
    {{-- <link href="{{ asset(main_path() . 'css/app-rtl.min.css') }}" rel="stylesheet" /> --}}
    {{-- <link href="{{ asset(main_path() . 'css/app.min.css') }}" rel="stylesheet" type="text/css" id="app-stylesheet" /> --}}
    <link href="{{ asset(main_path() . 'css/style.css') }}?time=<?= time() ?>" rel="stylesheet" type="text/css" />
    <link id="bsdp-css" href="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/css/bootstrap-datepicker3.min.css"
        rel="stylesheet">
    <script type="text/javascript" src="{{ asset(main_path() . 'js/js/jquery-3.1.1.min.js') }}"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <script type="text/javascript" src="{{ asset(main_path() . 'js/js/js.js') }}?time=<?= time() ?>"></script>
    <script src="{{ asset(main_path() . 'js/vendor.min.js') }}"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script src="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/js/bootstrap-datepicker.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.1/css/selectize.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.1/js/standalone/selectize.js"></script>
    <link rel="stylesheet" href="{{ asset(main_path() . 'css/bootstrap-multiselect.css') }}" />
    <script src="{{ asset(main_path() . 'js/bootstrap-multiselect.js') }}"></script>
    <script type="text/javascript"
        src="https://cdn.tiny.cloud/1/sivmoj1u561le7ov0eiguwz73su8taudpdxipk1yyrnklgqn/tinymce/5-stable/tinymce.min.js">
    </script>
    <script type="text/javascript" src="{{ asset(main_path() . 'js/js/JSPrintManager.js') }}"></script>
    <script src="{{ asset(main_path() . 'lib/dropzone/dropzone.min.js') }}"></script>
    <link href="{{ asset(main_path() . 'lib/dropzone/dropzone.min.css') }}" type="text/css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/decimal.js/10.4.3/decimal.min.js"></script>
    <script src="{{ asset(main_path() . 'asset/room-reservation/js.js') }}"></script>
    <link href="{{ asset(main_path() . 'asset/room-reservation/style.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset(main_path() . 'css/menus.css') }}" rel="stylesheet" type="text/css" />

    <style>
        .loader {
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            width: 60px;
            height: 60px;
            -webkit-animation: spin 2s linear infinite;
            /* Safari */
            animation: spin 2s linear infinite;
            display: none;
        }


        /* Safari */
        @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .action-col {
            width: 10%;
            white-space: nowrap;
        }

        .plabel {
            font-weight: bold;
            padding-bottom: 1px;
        }

        .panel>div {
            padding: 5px;
        }

        .panel>div .panel-collapse {
            /* border-top:1px solid #e7e7e7; */
            border-bottom: 1px solid #e7e7e7;
            padding-top: 15px;
        }

        .panel input[type="text"] {
            height: 26px;
            padding: 0.25rem 0.5rem;
            font-size: .7875rem;
            line-height: 1.5;
            border-radius: 0.2rem;
            /* display: block;
    width: 100%; */
            padding: 0.45rem 0.9rem;
            font-size: .9rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-clip: padding-box;
            border: 1px solid #ced4da;
        }

        .report_menu {
            list-style: none;
            padding-left: 0px;
        }

        .report_menu li {
            border-bottom: dotted 1px;
            border-bottom-color: #ced4da;
            padding-top: 5px;
            padding-bottom: 5px;

        }

        .report_menu input[type="text"] {
            height: 26px;
            padding: 0.25rem 0.5rem;
            font-size: .7875rem;
            line-height: 1.5;
            border-radius: 0.2rem;
            display: block;
            width: 100%;
            padding: 0.45rem 0.9rem;
            font-size: .9rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-clip: padding-box;
            border: 1px solid #ced4da;
        }
    </style>
    @yield('css')
</head>

<body>


    @include('theme.msg')
    @include('theme.change_pass')
    @include('theme.confirm')
    @include('theme.search')
    <div id="wrapper">
        @include('theme.header')
        @include('theme.menu')
        <div class="content-page" id="pagediv">

            @yield('content')
        </div>
        @include('theme.footer')
    </div>
    <div class="rightbar-overlay"></div>

    <div id="pageLoader" style="display:none">
        <div
            style="width:100%; height:100%; background:#ece3e366; position:fixed; top:0; left:0; z-index:99999999; display:flex;justify-content:center; align-items:center;">
            <i style="transform: translate(-50%, -50%);" class="fa fa-spinner fa-3x fa-pulse"></i>
        </div>
    </div>

    <script src="{{ asset(main_path() . 'js/morris.min.js') }}"></script>
    <script src="{{ asset(main_path() . 'js/dashboard.init.js') }}"></script>

    <script src="{{ asset(main_path() . 'js/raphael.min.js') }}"></script>
    <script src="{{ asset(main_path() . 'js/app.min.js') }}"></script>
    <script src="{{ asset(main_path() . 'js/select2.min.js') }}"></script>

    <script src="{{ asset(main_path() . 'js/master.js') }}?time=<?= time() ?>"></script>

    @yield('scripts')
</body>

</html>
