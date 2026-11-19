<?php

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>{{ translate('login') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="ERP" name="description" />
    <meta content="Coderthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="icon" href="{{ asset(main_path() . 'logo.png') }}" sizes="32x32" />
    <link href="{{ asset(main_path() . 'css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"
        id="bootstrap-stylesheet" />
    <link href="{{ asset(main_path() . 'css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset(main_path() . 'css/app.min.css') }}" rel="stylesheet" type="text/css" id="app-stylesheet" />
    <link href="{{ asset(main_path() . 'css/style.css') }}" rel="stylesheet" type="text/css" />
    <script src="{{ asset(main_path() . 'js/js/js.js') }}"></script>

</head>

<body class="authentication-bg">
    @include('theme.msg')

    <div class="account-pages pt-5 my-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="account-card-box">
                        <div class="card mb-0">
                            <div class="card-body p-4">

                                <div class="text-center">
                                    <div class="my-3">
                                        <a href="#">
                                            <span><img src="{{ asset(main_path() . 'logo.png') }}"
                                                    alt="" style="width:200px;"></span>
                                        </a>
                                    </div>
                                    <h5 class="text-muted text-uppercase py-3 font-16">{{ translate('sign_in') }}</h5>
                                </div>

                                <form action="{{ route('login.authenticate') }}" method="POST" class="mt-2">
                                    @csrf
                                    <div class="form-group mb-3">
                                        <input type="text" name="username" class="form-control"
                                            value="<?php echo 'admin'; //if($_SESSION['username'])echo $_SESSION['username'] ?>"
                                            placeholder="{{ translate('enter_your_username') }}">

                                    </div>

                                    <div class="form-group mb-3">
                                        <input class="form-control" type="password" name="pwd" id="pwd"
                                            value="12345" placeholder="{{ translate('enter_your_password') }}">
                                    </div>

                                    <div class="form-group mb-3">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="checkbox-signin"
                                                checked>
                                            <label class="custom-control-label"
                                                for="checkbox-signin">{{ translate('remember_me') }}</label>
                                        </div>
                                    </div>

                                    <div class="form-group text-center">
                                        <button class="btn btn-primary btn-block waves-effect waves-light"
                                            type="submit"> {{ translate('log_in') }} </button>
                                    </div>

                                   

                                </form>

                                <div class="text-center mt-4">

 
                                </div>

                            </div> <!-- end card-body -->
                        </div>
                        <!-- end card -->
                    </div>


                    <!-- end row -->

                </div> <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>



    <!-- Vendor js -->
    <script src="{{ asset(main_path() . 'js/vendor.min.js') }}"></script>

    <!--Morris Chart-->
    <script src="{{ asset(main_path() . 'js/morris.min.js') }}"></script>
    <script src="{{ asset(main_path() . 'js/raphael.min.js') }}"></script>

    <!-- Dashboard init js-->
    <script src="{{ asset(main_path() . 'js/dashboard.init.js') }}"></script>

    <!-- App js -->
    <script src="{{ asset(main_path() . 'js/app.min.js') }}"></script>

</body>

</html>
