var ShootMap = function () {
    var Locations, Msg = [], Months, Days, Timestring, markerClusterer, DateSelector;
    var labcount = 0, hasData = 0, month, datetime, locate, day, time;


    function initMap() {
        if (hasData == 0) {
            GetData();
        }
        var map = new google.maps.Map(d3.select("#map").node(), {
            zoom: 9,
            center: new google.maps.LatLng(30.5143465,-90.6490155),
            mapTypeId: google.maps.MapTypeId.TERRAIN

        });

        makeMarkers(Locations, Msg, map);

        //$(document).ready(function () {
        //    makeMarkers(Locations, Msg, map);
        //});
        //在地圖上點擊
        //google.maps.event.addListener(map, 'click', function (event) {
        //    addMarker(event.latLng, map);
        //});

        var rectangle = new google.maps.Rectangle({
            map: map,
            bounds: new google.maps.LatLngBounds(map.getCenter(), map.getCenter()),
            strokeColor: "red",
            strokeWeight: "2",
            strokeOpacity: 1,
            fillColor: "#E6ECEA",
            fillOpacity: 0.2
        });
        map.enableKeyDragZoom({
            key: "shift",
            boxStyle: {
                border: "1px dashed black",
                backgroundColor: "transparent",
                opacity: 1
            }
        });
        var dz = map.getDragZoomObject();
        google.maps.event.addListener(dz, "dragend", function (bnds) {
            rectangle.setOptions({ strokeColor: 'red', fillColor: '#E6ECEA' });
            rectangle.setBounds(bnds);
            SelectTweet(bnds.f.b, bnds.f.f, bnds.b.b, bnds.b.f, map);
        });

        //console.log($("#time_slider").val());
        //$("#Year_val").value = $("#time_slider").val();
        
        $("#Clearbtn").on("click", function (e) {
            $("input[name='daterange']").val("2018/01/01 0:00 - 2018/01/31 23:59");
            rectangle.setOptions({ strokeColor: 'transparent' });
            map.setCenter(new google.maps.LatLng(30.5143465,-90.6490155));
            map.setZoom(9);
            setTimeout(function () { makeMarkers(Locations, Msg, map); }, 300); 

        });

        $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
            rectangle.setMap(map);
            var SD = picker.startDate.format("YYYY/MM/DD HH:mm");
            console.log(SD);
            var ED = picker.endDate.format("YYYY/MM/DD HH:mm");
            console.log(ED);
            $(this).val(picker.startDate.format("YYYY/MM/DD HH:mm") + ' - ' + picker.endDate.format("YYYY/MM/DD HH:mm"));
            var newlocation = [], fakemsg = [], j = 0;
            for (var i = 0; i < datetime.length; i++) {
                if (new Date(datetime[i]).getTime() >= new Date(SD).getTime() && new Date(datetime[i]).getTime() <= new Date(ED).getTime()) {
                    newlocation[j++] = locate[i];
                    //console.log(Timestring[i]);
                }
            }
            makeMarkers(newlocation, fakemsg, map);
        });

        $('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val(picker.minDate.format("YYYY/MM/DD HH:mm") + ' - ' + picker.maxDate.format("YYYY/MM/DD HH:mm"));
            var fakemsg = [];
            makeMarkers(locate, Msg, map);
        });


        //var slider = $("#time_slider")[0];
        //var output = $('#Year_val')[0];
        //output.innerHTML = slider.value;
        //slider.oninput = function () {
        //    var newlocation = [], fakemsg = [], j = 0;
        //    for (var i = 0; i < Months.length; i++) {
        //        if (this.value == Months[i].toString())
        //            newlocation[j++] = Locations[i];
        //    }
        //    rectangle.setOptions({ strokeColor: 'transparent', fillColor: 'transparent' });
        //    console.log(rectangle.strokeColor);
        //    map.setZoom(2);
        //    map.setCenter(new google.maps.LatLng(35.6705839, 1.1435121));
        //    makeMarkers(newlocation, fakemsg, map);
        //    output.innerHTML = this.value;
        //}

        //temp(Locations);
    }
    function GetData() {
        hasData = 1;
        Locations = JSON.parse($("input[id*='Locations']").val());
        //console.log(Locations);
        //Months = JSON.parse($("input[id*='Months']").val());
        //Days = JSON.parse($("input[id*='Days']").val());
        Timestring = JSON.parse($("input[id*='mymap']").val());

        //var Msg1 = $("input[id*='Msg']").val();
        //Msg = Msg1.split("\", \"");
        //$("input[id*='datepicker']").datepicker({
        //    showOn: 'button',
        //    startDate: "2018/01/01",
        //    endDate: "2018/01/31",
        //    autoclose: true,
        //    format: "yyyy/mm/dd"
        //});

        $("input[name='daterange']").daterangepicker({
            locale: {
                format: "YYYY/MM/DD HH:mm"
            },
            timePicker: true,
            timePicker24Hour: true,
            startDate: "2018/01/01 0:00",
            endDate: "2018/01/31 23:59",
            minDate: "2018/01/01 0:00",
            maxDate: "2018/01/31 23:59",
            drops: "up"
        });
        $('#DP').css("display", "none");
        $("#map").css("display", "block");
    }

    function makeMarkers(Locations, Msg, map) {
        if (markerClusterer)
            markerClusterer.clearMarkers();
        var marker = [];
        var markers = Locations.map(function (location, i) {
            marker[i] = new google.maps.Marker({
                position: location
            });
            return marker[i];
        });
        markerClusterer = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    }
    function SelectTweet(latN, latS, lngE, lngW, map) {
        month = [], locate = [], datetime = [];
        var LatN = Math.max(latN, latS), LatS = Math.min(latN, latS),
            LngE = Math.max(lngE, lngW), LngW = Math.min(lngE, lngW);
        var num = 0, newlocation = [], newmsg = [];
        for (var i = 0; i < Locations.length; i++) {
            if (Locations[i].lat < LatN && Locations[i].lat > LatS && Locations[i].lng < LngE && Locations[i].lng > LngW) {
                //newlocation[num] = Locations[i];
                locate[num] = Locations[i];
                datetime[num] = Timestring[i];
                //month[num] = Months[i];
                //newmsg[num] = Msg[i];
                num++;
            }
        }
        makeMarkers(locate, newmsg, map);
        $('#DP').show();
    }
    google.maps.event.addDomListener(window, 'load', initMap);
    
};