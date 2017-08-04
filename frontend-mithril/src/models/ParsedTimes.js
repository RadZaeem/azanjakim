var m = require(mithril)

// basically copy contents
var ParsedTimes = {
    jsonToday: {},
    jsonTomorrow: {},
    view : function(vnode) {

    },

    // token is string
    getJsonWithToken : function(token) {
        //api.request, then copy to retrievedJson
    }
}

/*
    loadList: function() {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users",
            withCredentials: true,
        })
        .then(function(result) {
            User.list = result.data
        })
    },

    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + id,
            withCredentials: true,
        })
        .then(function(result) {
            User.current = result
        })
    },

    save: function() {
        return m.request({
            method: "PUT",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
            data: User.current,
            withCredentials: true,
        })
    }

*/
/*
owner = models.ForeignKey('auth.User', related_name='parsed_times', on_delete=models.CASCADE)
    zone = models.ForeignKey(ParsedZone, related_name='parsed_times', on_delete=models.CASCADE, default=init_zone_code)#, on_delete=models.CASCADE)
    subuh   = models.TimeField(default=datetime.time(6, 0))
    syuruk   = models.TimeField(default=datetime.time(6, 0))
    zuhur   = models.TimeField(default=datetime.time(6, 0))
    asar    = models.TimeField(default=datetime.time(6, 0))
    maghrib = models.TimeField(default=datetime.time(6, 0))
    isha    = models.TimeField(default=datetime.time(6, 0))

    date_time_parsed = models.DateTimeField(default=timezone.now)

    ip_address = models.CharField(max_length=20, default=202.75.5.204)
    
{id:153,zone:{id:148,esolat_zone:{id:7,state_name:JOHOR,zone_name:Pontian,code_name:JHR03,lat:1.4869255,lng:103.388961},lat:1.0,lng:103.0,did_autolocate:true},owner:qweqweqwe,subuh:05:37:00,syuruk:05:47:00,zuhur:07:07:00,asar:13:15:00,maghrib:16:37:00,isha:19:20:00,date_time_parsed:2017-08-01T02:56:05.646109Z,ip_address:127.0.0.1}

    {
        id:0,
        zone:
        {
            id:0,
            esolat_zone:
            {
                id:7,
                state_name:JOHOR,zone_name:Pontian,code_name:JHR03,lat:1.4869255,lng:103.388961
            },
            lat:1.0,lng:103.0,did_autolocate:true
        },
        owner:qweqweqwe,
        subuh:05:37:00,
        syuruk:05:47:00,
        zuhur:07:07:00,
        asar:13:15:00,
        maghrib:16:37:00,
        isha:19:20:00,
        date_time_parsed:"",
        ip_address:127.0.0.1
    }

*/