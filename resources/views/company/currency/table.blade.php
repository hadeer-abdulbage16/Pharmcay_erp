
@if ($currency->count())
    <table class="table table-bordered" id="currency_table" data-route="{{ route('company.currency.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL No') }}</th>
                <th>{{ translate('Name') }}</th>
                <th>{{ translate('Code') }}</th>
                <th>{{ translate('symbol') }}</th>
                <th>{{ translate('no_decimal') }}</th> 
                <th>{{ translate('symbol_decimal') }}</th> 
                <th>{{ translate('Created Date') }}</th>
                <th>{{ translate('Edited Data') }}</th>
                
                <th class="text-right action-col">{{ translate('Action') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($currency as $item)
                <tr>
                    @if (method_exists($currency, 'currentPage'))
                        <td>{{ ($currency->currentPage() - 1) * $currency->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->code }}</td>
                    <td>{{ $item->symbol }}</td>
                    <td>{{ $item->no_decimal }}</td> 
                    <td>{{ $item->decimal_digits }}</td> 

                    <td>{{ date('d-m-Y', strtotime($item->created_at)) }}</td>
                    <td>{{ date('d-m-Y', strtotime($item->updated_at)) }}</td>

                    

                    <td class="right">
                        <div class="dropdown notification-list dropdown">
                            <a class="btaction" data-toggle="dropdown" href="#" role="button"
                                aria-haspopup="false" aria-expanded="false">{{ translate('Action') }} <i
                                    class="icon-arrow-down-circle"></i></a>
                            <div class="dropdown-menu dropdown-menu-right profile-dropdown">
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route-store="{{ route('company.currency.store') }}"
                                    data-route-form="{{ route('company.currency.form') }}"
                                    data-route-edit="{{ route('company.currency.edit', ':id') }}"
                                    data-route-update="{{ route('company.currency.update', ':id') }}"
                                    onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route="{{ route('company.currency.delete', ':id') }}"
                                    onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    @if (method_exists($currency, 'links'))
        <div class="pagination-wrapper">
            {{ $currency->appends(['wrapper' => 'currency_table_wrapper'])->links() }}
        </div>
    @endif
    @else
    <div class="col-md-12 col-md-12-padding">
        <div class="box ">
            <div class="box-body">
                <div class="intro text-center">
                    <div class="videoimg"> </div>
                    <h3>{{ translate('Empty List') }}</h3>
                    <p class="text-muted">{{ translate('No Data Found') }}</p>
                </div>
            </div>
            <div class="box-footer clearfix">
            </div>
        </div>
    </div>


@endif
