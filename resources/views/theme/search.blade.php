<div class="modal fade " id="Search_myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-10">
                        <h3 id="search_modal_title">{{ translate('Search') }}</h3>
                    </div>
                    <div class="col-md-2">
                        <button type="button" class="close model_close_btn" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="clearfix"></div>
                    <form method="post" id="filter_form" action="">
                        {{-- <input type="hidden" id="counter" name ="counter" value="0">
                        <input type="hidden" id="showall" name ="showall" value="0"> --}}

                        <div class="card-body" id="defaultform">

                        </div>
                        <div id="search_results" class="mt-3"></div>

                        <div class="text-right card-footer">
                            <button class="btn btn-success btnSearch" name="searchBtn" type="button"
                                onclick="return erp_search(this)"  data-url="" >
                                <i class="fa fa-plus-circle"></i> {{ translate('Search') }}
                            </button>

                            <button class="btn  btn-danger" name="ResetData" type="button" data-dismiss="modal">
                                <i class="fa fa-ban"></i> {{ translate('Close') }}
                            </button>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    </div>
</div>
