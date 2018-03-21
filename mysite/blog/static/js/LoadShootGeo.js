$(function () {
    var locations = [], maptime = [];
    getGeocode();

    //load geocode
    function getGeocode() {
        d3.json("static/json/geocode.json", function (error, data) {
            for (var i = 0; i < data.length; i++) {
                var coords = data[i];
                var time = new Date(data[i].date + ", " + data[i].hr + ":" + data[i].min);
                var str = '{"lat":' + coords['lat'] + ', "lng":' + coords['lng'] + '}';
                //console.log(date);
                locations[i] = str;
                maptime[i] = time.toDateString();
            }
            $("input[id*='Locations']").val("[" + locations + "]");
            $("input[id*='mymap']").val("[\"" + maptime.join("\", \"") + "\"]");

            DrawMap();
        });
    }

    function DrawMap() {
        var script = document.createElement("script");
        script.src = "static/js/shootmap.js";
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
        $.getScript('static/js/shootmap.js', function () {
            ShootMap();
        });
    }

});
