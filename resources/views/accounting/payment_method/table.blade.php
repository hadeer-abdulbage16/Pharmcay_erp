
@if ($payment_methods->count())
<div class="table-responsive">
 <table class="table table-bordered"  id="payment_method_table" data-route="{{ route('accounting.payment_method.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL No') }}</th>
                <th>{{ translate('Name') }}</th>
                <th>{{ translate('Code') }}</th>
                <th>{{ translate('Created Date') }}</th>
                <th>{{ translate('Edited Data') }}</th>
                
                <th class="text-right action-col">{{ translate('Action') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($payment_methods as $item)
                <tr>
                    @if (method_exists($payment_methods, 'currentPage'))
                        <td>{{ ($payment_methods->currentPage() - 1) * $payment_methods->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    
                   
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->code }}</td>
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
                                    data-route-store="{{ route('accounting.payment_method.store') }}"
                                    data-route-form="{{ route('accounting.payment_method.form') }}"
                                    data-route-edit="{{ route('accounting.payment_method.edit', ':id') }}"
                                    data-route-update="{{ route('accounting.payment_method.update', ':id') }}"
                                    onclick="form_modal(this)">{{ translate('Edit') }}</a>
                                <a href="#" class="dropdown-item notify-item" data-module="unit_master"
                                    data-id="{{ $item->id }}"
                                    data-route="{{ route('accounting.payment_method.delete', ':id') }}"
                                    onclick="erp_delete(this)">{{ translate('Delete') }}</a>
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
   

    @if (method_exists($payment_methods, 'links'))
        <div class="pagination-wrapper">
            {{ $payment_methods->appends(['wrapper' => 'payment_method_table_wrapper'])->links() }}
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
