<p class="setting-title">{{ translate('General Settings') }}</p>
<hr>
<form method="post" id="setting" action="{{ route('settings.general.store') }} ">
    @csrf
    <div class="card-body row">
        <div class="col-sm-6 ">
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Name') }} </div>
                <div class="col-sm-7">
                    <input type="text" class="form-control form-control-sm" name="title" id="title"
                        value="{{ $settings->title ?? '' }} " autocomplete="nope" required>
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('start_date') }} </div>
                <div class="col-sm-7">
                    <input type="date" data-attr="date" name="start_date" id="start_date" class="form-control ">
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Financial_year_start_month') }} </div>
                <div class="col-sm-7">

                    <select name="financial_year_start_month" id="financial_year_start_month"
                        class="form-control form-control-sm">
                        <option value="" selected="selected">{{ translate('Select Month') }}</option>
                        <option value="1" {{ $settings->financial_year_start_month == 1 ? 'selected' : '' }}>
                            {{ translate('January') }}</option>
                        <option value="2" {{ $settings->financial_year_start_month == 2 ? 'selected' : '' }}>
                            {{ translate('February') }}</option>
                        <option value="3" {{ $settings->financial_year_start_month == 3 ? 'selected' : '' }}>
                            {{ translate('March') }}</option>
                        <option value="4" {{ $settings->financial_year_start_month == 4 ? 'selected' : '' }}>
                            {{ translate('April') }}</option>
                        <option value="5" {{ $settings->financial_year_start_month == 5 ? 'selected' : '' }}>
                            {{ translate('May') }}</option>
                        <option value="6" {{ $settings->financial_year_start_month == 6 ? 'selected' : '' }}>
                            {{ translate('June') }}</option>
                        <option value="7" {{ $settings->financial_year_start_month == 7 ? 'selected' : '' }}>
                            {{ translate('July') }}</option>
                        <option value="8" {{ $settings->financial_year_start_month == 8 ? 'selected' : '' }}>
                            {{ translate('August') }}</option>
                        <option value="9" {{ $settings->financial_year_start_month == 9 ? 'selected' : '' }}>
                            {{ translate('September') }}</option>
                        <option value="10" {{ $settings->financial_year_start_month == 10 ? 'selected' : '' }}>
                            {{ translate('October') }}</option>
                        <option value="11" {{ $settings->financial_year_start_month == 11 ? 'selected' : '' }}>
                            {{ translate('November') }}</option>
                        <option value="12" {{ $settings->financial_year_start_month == 12 ? 'selected' : '' }}>
                            {{ translate('December') }}</option>
                    </select>
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Financial_year_start_month') }} </div>
                <div class="col-sm-7">
                    <select name="currency_id" id="currency_id" class="form-control form-control-sm">
                        <option value="" selected="selected">{{ translate('Select Currency') }}</option>
                        @foreach ($currencies as $currency)
                            <option value="{{ $currency->id }}"
                                {{ $settings->currency_id == $currency->id ? 'selected' : '' }}>
                                {{ $currency->name }} ({{ $currency->symbol }})
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Time Zone') }}</div>
                <div class="col-sm-7">
                    <select class="form-control form-control-sm" name="timezone" id="timezone">
                        <option value="">{{ translate('Select Time Zone') }}</option>
                        <option {{ $settings->timezone == 'Pacific/Midway' ? 'selected' : '' }} value="Pacific/Midway">
                            Midway Island (UTC-11:00)</option>
                        <option {{ $settings->timezone == 'Pacific/Samoa' ? 'selected' : '' }} value="Pacific/Samoa">
                            Samoa (UTC-11:00)</option>
                        <option {{ $settings->timezone == 'Pacific/Honolulu' ? 'selected' : '' }}
                            value="Pacific/Honolulu">Hawaii (UTC-10:00)</option>
                        <option {{ $settings->timezone == 'US/Alaska' ? 'selected' : '' }} value="US/Alaska">Alaska
                            (UTC-09:00)</option>
                        <option {{ $settings->timezone == 'America/Los_Angeles' ? 'selected' : '' }}
                            value="America/Los_Angeles">Pacific Time (US &amp; Canada) (UTC-08:00) </option>
                        <option {{ $settings->timezone == 'America/Tijuana' ? 'selected' : '' }}
                            value="America/Tijuana">Tijuana (UTC-08:00) </option>
                        <option {{ $settings->timezone == 'US/Arizona' ? 'selected' : '' }} value="US/Arizona">Arizona
                            (UTC-07:00) </option>
                        <option {{ $settings->timezone == 'America/Chihuahua' ? 'selected' : '' }}
                            value="America/Chihuahua">Chihuahua (UTC-07:00) </option>
                        <option {{ $settings->timezone == 'America/Chihuahua' ? 'selected' : '' }}
                            value="America/Chihuahua">La Paz (UTC-07:00) </option>
                        <option {{ $settings->timezone == 'America/Mazatlan' ? 'selected' : '' }}
                            value="America/Mazatlan">Mazatlan (UTC-07:00) </option>
                        <option {{ $settings->timezone == 'US/Mountain' ? 'selected' : '' }} value="US/Mountain">
                            Mountain Time (US &amp; Canada) (UTC-07:00) </option>
                        <option {{ $settings->timezone == 'America/Managua' ? 'selected' : '' }}
                            value="America/Managua">Central America (UTC-06:00) </option>
                        <option {{ $settings->timezone == 'US/Central' ? 'selected' : '' }} value="US/Central">Central
                            Time (US &amp; Canada) (UTC-06:00)</option>
                        <option {{ $settings->timezone == 'America/Mexico_City' ? 'selected' : '' }}
                            value="America/Mexico_City">Guadalajara (UTC-06:00) </option>
                        <option {{ $settings->timezone == 'America/Mexico_City' ? 'selected' : '' }}
                            value="America/Mexico_City">Mexico City (UTC-06:00) </option>
                        <option {{ $settings->timezone == 'America/Monterrey' ? 'selected' : '' }}
                            value="America/Monterrey">Monterrey (UTC-06:00) </option>
                        <option {{ $settings->timezone == 'Canada/Saskatchewan' ? 'selected' : '' }}
                            value="Canada/Saskatchewan">Saskatchewan (UTC-06:00) </option>
                        <option {{ $settings->timezone == 'America/Bogota' ? 'selected' : '' }} value="America/Bogota">
                            Bogota (UTC-05:00) </option>
                        <option {{ $settings->timezone == 'US/Eastern' ? 'selected' : '' }} value="US/Eastern">Eastern
                            Time (US &amp; Canada) (UTC-05:00) </option>
                        <option {{ $settings->timezone == 'US/East-Indiana' ? 'selected' : '' }}
                            value="US/East-Indiana">Indiana (East) (UTC-05:00)</option>
                        <option {{ $settings->timezone == 'America/Lima' ? 'selected' : '' }} value="America/Lima">Lima
                            (UTC-05:00) </option>
                        <option {{ $settings->timezone == 'America/Bogota' ? 'selected' : '' }} value="America/Bogota">
                            Quito (UTC-05:00) </option>
                        <option {{ $settings->timezone == 'Canada/Atlantic' ? 'selected' : '' }}
                            value="Canada/Atlantic">Atlantic Time (Canada) (UTC-04:00)</option>
                        <option {{ $settings->timezone == 'America/Caracas' ? 'selected' : '' }}
                            value="America/Caracas">Caracas (UTC-04:30) </option>
                        <option {{ $settings->timezone == 'America/La_Paz' ? 'selected' : '' }} value="America/La_Paz">
                            La Paz (UTC-04:00) </option>
                        <option {{ $settings->timezone == 'America/Santiago' ? 'selected' : '' }}
                            value="America/Santiago">Santiago (UTC-04:00) </option>
                        <option {{ $settings->timezone == 'Canada/Newfoundland' ? 'selected' : '' }}
                            value="Canada/Newfoundland">Newfoundland (UTC-03:30) </option>
                        <option {{ $settings->timezone == 'America/Sao_Paulo' ? 'selected' : '' }}
                            value="America/Sao_Paulo">Brasilia (UTC-03:00) </option>
                        <option {{ $settings->timezone == 'America/Argentina/Buenos_Aires' ? 'selected' : '' }}
                            value="America/Argentina/Buenos_Aires">Buenos Aires (UTC-03:00) </option>
                        <option {{ $settings->timezone == 'America/Argentina/Buenos_Aires' ? 'selected' : '' }}
                            value="America/Argentina/Buenos_Aires">Georgetown (UTC-03:00) </option>
                        <option {{ $settings->timezone == 'America/Godthab' ? 'selected' : '' }}
                            value="America/Godthab">Greenland (UTC-03:00) </option>
                        <option {{ $settings->timezone == 'America/Noronha' ? 'selected' : '' }}
                            value="America/Noronha">Mid-Atlantic (UTC-02:00) </option>
                        <option {{ $settings->timezone == 'Atlantic/Azores' ? 'selected' : '' }}
                            value="Atlantic/Azores">Azores (UTC-01:00) </option>
                        <option {{ $settings->timezone == 'Atlantic/Cape_Verde' ? 'selected' : '' }}
                            value="Atlantic/Cape_Verde">Cape Verde Is.(UTC-01:00) </option>
                        <option {{ $settings->timezone == 'Africa/Casablanca' ? 'selected' : '' }}
                            value="Africa/Casablanca">Casablanca (UTC+00:00) </option>
                        <option {{ $settings->timezone == 'Europe/London' ? 'selected' : '' }} value="Europe/London">
                            Edinburgh (UTC+00:00) </option>
                        <option {{ $settings->timezone == 'Etc/Greenwich' ? 'selected' : '' }} value="Etc/Greenwich">
                            Greenwich Mean Time : Dublin (UTC+00:00) </option>
                        <option {{ $settings->timezone == 'Europe/Lisbon' ? 'selected' : '' }} value="Europe/Lisbon">
                            Lisbon (UTC+00:00) </option>
                        <option {{ $settings->timezone == 'Europe/London' ? 'selected' : '' }} value="Europe/London">
                            London(UTC+00:00) </option>
                        <option {{ $settings->timezone == 'Africa/Monrovia' ? 'selected' : '' }}
                            value="Africa/Monrovia">Monrovia (UTC+00:00) </option>
                        <option {{ $settings->timezone == 'UTC' ? 'selected' : '' }} value="UTC">UTC (UTC+00:00)
                        </option>
                        <option {{ $settings->timezone == 'Europe/Amsterdam' ? 'selected' : '' }}
                            value="Europe/Amsterdam">Amsterdam (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Belgrade' ? 'selected' : '' }}
                            value="Europe/Belgrade">Belgrade (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Berlin' ? 'selected' : '' }} value="Europe/Berlin">
                            Berlin (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Berlin' ? 'selected' : '' }} value="Europe/Berlin">
                            Bern (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Bratislava' ? 'selected' : '' }}
                            value="Europe/Bratislava">Bratislava (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Brussels' ? 'selected' : '' }}
                            value="Europe/Brussels">Brussels (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Budapest' ? 'selected' : '' }}
                            value="Europe/Budapest">Budapest (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Copenhagen' ? 'selected' : '' }}
                            value="Europe/Copenhagen">Copenhagen (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Ljubljana' ? 'selected' : '' }}
                            value="Europe/Ljubljana">Ljubljana (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Madrid' ? 'selected' : '' }} value="Europe/Madrid">
                            Madrid (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Paris' ? 'selected' : '' }} value="Europe/Paris">
                            Paris (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Prague' ? 'selected' : '' }} value="Europe/Prague">
                            Prague (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Rome' ? 'selected' : '' }} value="Europe/Rome">Rome
                            (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Sarajevo' ? 'selected' : '' }}
                            value="Europe/Sarajevo">Sarajevo (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Skopje' ? 'selected' : '' }} value="Europe/Skopje">
                            Skopje (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Stockholm' ? 'selected' : '' }}
                            value="Europe/Stockholm">Stockholm (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Vienna' ? 'selected' : '' }} value="Europe/Vienna">
                            Vienna (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Warsaw' ? 'selected' : '' }} value="Europe/Warsaw">
                            Warsaw (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Africa/Lagos' ? 'selected' : '' }} value="Africa/Lagos">
                            West Central Africa (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Zagreb' ? 'selected' : '' }} value="Europe/Zagreb">
                            Zagreb (UTC+01:00) </option>
                        <option {{ $settings->timezone == 'Europe/Athens' ? 'selected' : '' }} value="Europe/Athens">
                            Athens (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Europe/Bucharest' ? 'selected' : '' }}
                            value="Europe/Bucharest">Bucharest (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Africa/Cairo' ? 'selected' : '' }} value="Africa/Cairo">
                            Cairo (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Africa/Harare' ? 'selected' : '' }} value="Africa/Harare">
                            Harare (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Europe/Helsinki' ? 'selected' : '' }}
                            value="Europe/Helsinki">Helsinki (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Europe/Istanbul' ? 'selected' : '' }}
                            value="Europe/Istanbul">Istanbul (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Asia/Jerusalem' ? 'selected' : '' }}
                            value="Asia/Jerusalem">Jerusalem (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Europe/Kyiv' ? 'selected' : '' }} value="Europe/Kyiv">Kyiv
                            (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Africa/Johannesburg' ? 'selected' : '' }}
                            value="Africa/Johannesburg">Pretoria (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Europe/Riga' ? 'selected' : '' }} value="Europe/Riga">Riga
                            (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Europe/Sofia' ? 'selected' : '' }} value="Europe/Sofia">
                            Sofia (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Europe/Tallinn' ? 'selected' : '' }}
                            value="Europe/Tallinn">Tallinn (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Europe/Vilnius' ? 'selected' : '' }}
                            value="Europe/Vilnius">Vilnius (UTC+02:00) </option>
                        <option {{ $settings->timezone == 'Asia/Baghdad' ? 'selected' : '' }} value="Asia/Baghdad">
                            Baghdad (UTC+03:00) </option>
                        <option {{ $settings->timezone == 'Asia/Kuwait' ? 'selected' : '' }} value="Asia/Kuwait">
                            Kuwait (UTC+03:00) </option>
                        <option {{ $settings->timezone == 'Europe/Minsk' ? 'selected' : '' }} value="Europe/Minsk">
                            Minsk (UTC+03:00) </option>
                        <option {{ $settings->timezone == 'Africa/Nairobi' ? 'selected' : '' }}
                            value="Africa/Nairobi">Nairobi (UTC+03:00) </option>
                        <option {{ $settings->timezone == 'Asia/Riyadh' ? 'selected' : '' }} value="Asia/Riyadh">
                            Riyadh (UTC+03:00) </option>
                        <option {{ $settings->timezone == 'Europe/Volgograd' ? 'selected' : '' }}
                            value="Europe/Volgograd">Volgograd (UTC+03:00) </option>
                        <option {{ $settings->timezone == 'Asia/Tehran' ? 'selected' : '' }} value="Asia/Tehran">
                            Tehran (UTC+03:30) </option>
                        <option {{ $settings->timezone == 'Asia/Muscat' ? 'selected' : '' }} value="Asia/Muscat">Abu
                            Dhabi (UTC+04:00) </option>
                        <option {{ $settings->timezone == 'Asia/Baku' ? 'selected' : '' }} value="Asia/Baku">Baku
                            (UTC+04:00) </option>
                        <option {{ $settings->timezone == 'Europe/Moscow' ? 'selected' : '' }} value="Europe/Moscow">
                            Moscow (UTC+04:00) </option>
                        <option {{ $settings->timezone == 'Asia/Muscat' ? 'selected' : '' }} value="Asia/Muscat">
                            Muscat (UTC+04:00) </option>
                        <option {{ $settings->timezone == 'Europe/Moscow' ? 'selected' : '' }} value="Europe/Moscow">
                            St. Petersburg (UTC+04:00) </option>
                        <option {{ $settings->timezone == 'Asia/Tbilisi' ? 'selected' : '' }} value="Asia/Tbilisi">
                            Tbilisi (UTC+04:00) </option>
                        <option {{ $settings->timezone == 'Asia/Yerevan' ? 'selected' : '' }} value="Asia/Yerevan">
                            Yerevan (UTC+04:00) </option>
                        <option {{ $settings->timezone == 'Asia/Kabul' ? 'selected' : '' }} value="Asia/Kabul">Kabul
                            (UTC+04:30) </option>
                        <option {{ $settings->timezone == 'Asia/Karachi' ? 'selected' : '' }} value="Asia/Karachi">
                            Islamabad (UTC+05:00) </option>
                        <option {{ $settings->timezone == 'Asia/Karachi' ? 'selected' : '' }} value="Asia/Karachi">
                            Karachi (UTC+05:00) </option>
                        <option {{ $settings->timezone == 'Asia/Tashkent' ? 'selected' : '' }} value="Asia/Tashkent">
                            Tashkent (UTC+05:00) </option>
                        <option {{ $settings->timezone == 'Asia/Calcutta' ? 'selected' : '' }} value="Asia/Calcutta">
                            Chennai (UTC+05:30) </option>
                        <option {{ $settings->timezone == 'Asia/Kolkata' ? 'selected' : '' }} value="Asia/Kolkata">
                            Kolkata (UTC+05:30) </option>
                        <option {{ $settings->timezone == 'Asia/Calcutta' ? 'selected' : '' }} value="Asia/Calcutta">
                            Mumbai (UTC+05:30) </option>
                        <option {{ $settings->timezone == 'Asia/Calcutta' ? 'selected' : '' }} value="Asia/Calcutta">
                            New Delhi (UTC+05:30)</option>
                        <option {{ $settings->timezone == 'Asia/Calcutta' ? 'selected' : '' }} value="Asia/Calcutta">
                            Sri Jayawardenepura (UTC+05:30) </option>
                        <option {{ $settings->timezone == 'Asia/Katmandu' ? 'selected' : '' }} value="Asia/Katmandu">
                            Kathmandu (UTC+05:45) </option>
                        <option {{ $settings->timezone == 'Asia/Almaty' ? 'selected' : '' }} value="Asia/Almaty">
                            Almaty (UTC+06:00) </option>
                        <option {{ $settings->timezone == 'Asia/Dhaka' ? 'selected' : '' }} value="Asia/Dhaka">Astana
                            (UTC+06:00) </option>
                        <option {{ $settings->timezone == 'Asia/Dhaka' ? 'selected' : '' }} value="Asia/Dhaka">Dhaka
                            (UTC+06:00) </option>
                        <option {{ $settings->timezone == 'Asia/Yekaterinburg' ? 'selected' : '' }}
                            value="Asia/Yekaterinburg">Ekaterinburg (UTC+06:00) </option>
                        <option {{ $settings->timezone == 'Asia/Rangoon' ? 'selected' : '' }} value="Asia/Rangoon">
                            Rangoon (UTC+06:30) </option>
                        <option {{ $settings->timezone == 'Asia/Bangkok' ? 'selected' : '' }} value="Asia/Bangkok">
                            Bangkok (UTC+07:00) </option>
                        <option {{ $settings->timezone == 'Asia/Bangkok' ? 'selected' : '' }} value="Asia/Bangkok">
                            Hanoi (UTC+07:00) </option>
                        <option {{ $settings->timezone == 'Asia/Jakarta' ? 'selected' : '' }} value="Asia/Jakarta">
                            Jakarta (UTC+07:00) </option>
                        <option {{ $settings->timezone == 'Asia/Novosibirsk' ? 'selected' : '' }}
                            value="Asia/Novosibirsk">Novosibirsk (UTC+07:00) </option>
                        <option {{ $settings->timezone == 'Asia/Hong_Kong' ? 'selected' : '' }}
                            value="Asia/Hong_Kong">Beijing (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Asia/Chongqing' ? 'selected' : '' }}
                            value="Asia/Chongqing">Chongqing (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Asia/Hong_Kong' ? 'selected' : '' }}
                            value="Asia/Hong_Kong">Hong Kong (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Asia/Krasnoyarsk' ? 'selected' : '' }}
                            value="Asia/Krasnoyarsk">Krasnoyarsk (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Asia/Kuala_Lumpur' ? 'selected' : '' }}
                            value="Asia/Kuala_Lumpur">Kuala Lumpur (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Australia/Perth' ? 'selected' : '' }}
                            value="Australia/Perth">Perth (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Asia/Singapore' ? 'selected' : '' }}
                            value="Asia/Singapore">Singapore (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Asia/Taipei' ? 'selected' : '' }} value="Asia/Taipei">
                            Taipei (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Asia/Ulan_Bator' ? 'selected' : '' }}
                            value="Asia/Ulan_Bator">Ulaan Bataar (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Asia/Urumqi' ? 'selected' : '' }} value="Asia/Urumqi">
                            Urumqi (UTC+08:00) </option>
                        <option {{ $settings->timezone == 'Asia/Irkutsk' ? 'selected' : '' }} value="Asia/Irkutsk">
                            Irkutsk (UTC+09:00) </option>
                        <option {{ $settings->timezone == 'Asia/Tokyo' ? 'selected' : '' }} value="Asia/Tokyo">Osaka
                            (UTC+09:00) </option>
                        <option {{ $settings->timezone == 'Asia/Tokyo' ? 'selected' : '' }} value="Asia/Tokyo">
                            Sapporo (UTC+09:00) </option>
                        <option {{ $settings->timezone == 'Asia/Seoul' ? 'selected' : '' }} value="Asia/Seoul">Seoul
                            (UTC+09:00) </option>
                        <option {{ $settings->timezone == 'Asia/Tokyo' ? 'selected' : '' }} value="Asia/Tokyo">Tokyo
                            (UTC+09:00) </option>
                        <option {{ $settings->timezone == 'Australia/Adelaide' ? 'selected' : '' }}
                            value="Australia/Adelaide">Adelaide (UTC+09:30) </option>
                        <option {{ $settings->timezone == 'Australia/Darwin' ? 'selected' : '' }}
                            value="Australia/Darwin">Darwin (UTC+09:30) </option>
                        <option {{ $settings->timezone == 'Australia/Brisbane' ? 'selected' : '' }}
                            value="Australia/Brisbane">Brisbane (UTC+10:00) </option>
                        <option {{ $settings->timezone == 'Australia/Canberra' ? 'selected' : '' }}
                            value="Australia/Canberra">Canberra (UTC+10:00) </option>
                        <option {{ $settings->timezone == 'Pacific/Guam' ? 'selected' : '' }} value="Pacific/Guam">
                            Guam (UTC+10:00) </option>
                        <option {{ $settings->timezone == 'Australia/Hobart' ? 'selected' : '' }}
                            value="Australia/Hobart">Hobart (UTC+10:00) </option>
                        <option {{ $settings->timezone == 'Australia/Melbourne' ? 'selected' : '' }}
                            value="Australia/Melbourne">Melbourne (UTC+10:00) </option>
                        <option {{ $settings->timezone == 'Pacific/Port_Moresby' ? 'selected' : '' }}
                            value="Pacific/Port_Moresby">Port Moresby (UTC+10:00) </option>
                        <option {{ $settings->timezone == 'Australia/Sydney' ? 'selected' : '' }}
                            value="Australia/Sydney">Sydney (UTC+10:00) </option>
                        <option {{ $settings->timezone == 'Asia/Yakutsk' ? 'selected' : '' }} value="Asia/Yakutsk">
                            Yakutsk (UTC+10:00) </option>
                        <option {{ $settings->timezone == 'Asia/Vladivostok' ? 'selected' : '' }}
                            value="Asia/Vladivostok">Vladivostok (UTC+11:00) </option>
                        <option {{ $settings->timezone == 'Pacific/Auckland' ? 'selected' : '' }}
                            value="Pacific/Auckland">Auckland (UTC+12:00) </option>
                        <option {{ $settings->timezone == 'Pacific/Fiji' ? 'selected' : '' }} value="Pacific/Fiji">
                            Fiji (UTC+12:00) </option>
                        <option {{ $settings->timezone == 'Pacific/Kwajalein' ? 'selected' : '' }}
                            value="Pacific/Kwajalein">International Date Line West (UTC+12:00) </option>
                        <option {{ $settings->timezone == 'Asia/Kamchatka' ? 'selected' : '' }}
                            value="Asia/Kamchatka">Kamchatka (UTC+12:00) </option>
                        <option {{ $settings->timezone == 'Asia/Magadan' ? 'selected' : '' }} value="Asia/Magadan">
                            Magadan (UTC+12:00) </option>
                        <option {{ $settings->timezone == 'Pacific/Fiji' ? 'selected' : '' }} value="Pacific/Fiji">
                            Marshall Is. (UTC+12:00) </option>
                        <option {{ $settings->timezone == 'Asia/Magadan' ? 'selected' : '' }} value="Asia/Magadan">
                            New Caledonia (UTC+12:00) </option>
                        <option {{ $settings->timezone == 'Asia/Magadan' ? 'selected' : '' }} value="Asia/Magadan">
                            Solomon Is. (UTC+12:00) </option>
                        <option {{ $settings->timezone == 'Pacific/Auckland' ? 'selected' : '' }}
                            value="Pacific/Auckland">Wellington (UTC+12:00)</option>
                        <option {{ $settings->timezone == 'Pacific/Tongatapu' ? 'selected' : '' }}
                            value="Pacific/Tongatapu">Nuku'alofa (UTC+13:00) </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-sm-6 ">
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Logo Width') }} </div>
                <div class="col-sm-7">
                    <input type="text" class="form-control form-control-sm" name="logo_width"
                        value="{{ $settings->logo_width ?? ' ' }}" autocomplete="nope" required>
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Logo Height') }} </div>
                <div class="col-sm-7">
                    <input type="text" class="form-control form-control-sm" name="logo_height"
                        value="{{ $settings->logo_height ?? ' ' }}" autocomplete="nope" required>
                </div>
            </div>


            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Default Credit Limit') }}</div>
                <div class="col-sm-7">
                    <input type="number" class="form-control form-control-sm" name="credit_amount"
                        value="{{ $settings->credit_amount ?? ' ' }}" autocomplete="nope">
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Default Credit Days') }}</div>
                <div class="col-sm-7">
                    <input type="number" class="form-control form-control-sm" name="credit_days"
                        value="{{ $settings->credit_days ?? ' ' }}" autocomplete="nope">
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('currency_symbol_placement') }}</div>
                <div class="col-sm-7">
                    <select name="currency_symbol_placement" id="" class="form-control form-control-sm">
                        <option value="before"
                            {{ $settings->currency_symbol_placement == 'before' ? 'selected' : '' }}>
                            {{ translate('Before Amount') }}
                        </option>
                        <option value="after"
                            {{ $settings->currency_symbol_placement == 'after' ? 'selected' : '' }}>
                            {{ translate('After Amount') }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('currency_precision') }}</div>
                <div class="col-sm-7">
                    <select name="currency_precision" id="" class="form-control form-control-sm">
                        <option value="1" {{ $settings->currency_precision == '1' ? 'selected' : '' }}>
                            1
                        </option>
                        <option value="2" {{ $settings->currency_precision == '2' ? 'selected' : '' }}>
                            2
                        </option>
                        <option value="3" {{ $settings->currency_precision == '3' ? 'selected' : '' }}>
                            3
                        </option>
                        <option value="4" {{ $settings->currency_precision == '4' ? 'selected' : '' }}>
                            4
                        </option>
                    </select>
                </div>
            </div>



        </div>
        <span></span>
        <hr>

        <div class="col-sm-6">
            <div class="row formrow">
                <div class="col-sm-5">{{ Translate('default purchase store ') }}</div>
                <div class="col-sm-7">
                    <select name="default_purchase_store_id" id="" class="form-control form-control-sm">
                        <option value="" selected>{{ translate('select defult purchase store') }}</option>
                        @foreach ($stores as $store)
                            <option value="{{ $store->id }}">{{ $store->name }}</option>
                        @endforeach
                    </select>

                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ Translate('default Sales store ') }}</div>
                <div class="col-sm-7">
                    <select name="default_sales_store_id" id="" class="form-control form-control-sm">
                        <option value="" selected>{{ translate('select defult sales store') }}</option>
                        @foreach ($stores as $store)
                            <option value="{{ $store->id }}">{{ $store->name }}</option>
                        @endforeach
                    </select>

                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Allow expaird Products') }}</div>
                <div class="col-sm-7">
                    <input type="checkbox" name="allow_expired_products" class="form-conrtol form-control-sm">
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Expiry date warning') }}</div>
                <div class="col-sm-7">
                    <input type="checkbox" name="expiry_date_warning" class="form-conrtol form-control-sm">
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Prevent Expired sales') }}</div>
                <div class="col-sm-7">
                    <input type="checkbox" name="prevent_expired_sales" class="form-conrtol form-control-sm">
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Show Payment Summary On Save') }}</div>
                <div class="col-sm-7">
                    <input type="checkbox" name="show_payment_summary_on_save" class="form-conrtol form-control-sm">
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('Return Days Limit ') }}</div>
                <div class="col-sm-7">
                    <input type="number" name="return_days_limit" class="form-control form-control-sm">
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('cash supply account ') }}</div>
                <div class="col-sm-7">
                    <input type="number" name="cash_supply_account_id" class="form-control form-control-sm">
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('cash expense account ') }}</div>
                <div class="col-sm-7">
                    <input type="number" name="cash_expense_account_id" class="form-control form-control-sm">
                </div>
            </div>
            <div class="row formrow">
                <div class="col-sm-5">{{ translate('incoming cheques account ') }}</div>
                <div class="col-sm-7">
                    <input type="text" name="incoming_cheques_account" class="form-control form-control-sm">
                </div>
            </div>
        </div>
    </div> 
    <div class="text-right card-footer">
        <div id="product_error_message"></div>
        <button class="btn  btn-success" type="submit" data-status='1'>
            <i class="fa fa-plus-circle"></i> {{ translate('Save') }} </button>

    </div>

</form>
 