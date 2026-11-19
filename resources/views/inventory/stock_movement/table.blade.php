@if ($stock_movements->count())
    <table class="table table-bordered" id="stock_movement_table"
        data-route="{{ route('inventory.stock_movement.table') }}">
        <thead>
            <tr>
                <th style="width:60px">{{ translate('SL.No.') }}</th>
                <th>{{ translate('Date') }}</th>

                <th>{{ translate('Product') }}</th>

                <th>{{ translate('Store') }}</th>

                <th>{{ translate('Type') }}</th>

                <th>{{ translate('Movement') }}</th>

                
                <th class="text-center">{{ translate('Before') }}</th> 
                <th class="text-center">{{ translate('Qty') }}</th>
                <th class="text-center">{{ translate('After') }}</th>

                <th class="text-center">{{ translate('Cost') }}</th>

                <th>{{ translate('store') }}</th>
                <th>{{ translate('Reference') }}</th>

                <th>{{ translate('Notes') }}</th>

            </tr>
        </thead>
        <tbody>
            @foreach ($stock_movements as $item)
                <tr>
                    @if (method_exists($stock_movements, 'currentPage'))
                        <td>{{ ($stock_movements->currentPage() - 1) * $stock_movements->perPage() + $loop->iteration }}
                        </td>
                    @else
                        <td>{{ $loop->iteration }}</td>
                    @endif
                    <td>{{ $item->created_at->format('Y-m-d H:i') }}</td>
                    <td>{{ $item->product->name ?? '-' }}</td>
                    <td>{{ $item->store->name ?? '-' }}</td> 
                    <td><span class="badge bg-info">{{ ucfirst($item->ref_type) }}</span></td> 
                    <td>
                        @if ($item->movement == 'in')
                            <span class="badge bg-success">
                                {{ translate('IN') }}
                            </span>
                        @else
                            <span class="badge bg-danger">
                                {{ translate('OUT') }}
                            </span>
                        @endif
                    </td>
                    <td class="text-center">{{ (int)$item->before_qty }}</td>
                    <td class="text-center">{{ (int)$item->qty }}</td>
                    <td class="text-center">{{ (int)$item->after_qty }}</td>
                    <td class="text-center">{{ cnv($item->cost_price) }}</td>
                    <td>{{ $item->store?->name ?? '-' }}</td>
                    <td>{{ $item->ref_number }}</td>
                    <td>{{ $item->notes }}</td>



                </tr>
            @endforeach
        </tbody>
    </table>

    @if (method_exists($stock_movements, 'links'))
        <div class="pagination-wrapper">
            {{ $stock_movements->appends(['wrapper' => 'stock_movement_table_wrapper'])->links() }}
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
