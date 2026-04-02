RockN.TimeStamp = legacy_cc.Class.extend({

    _tTargetTime: 0,            //시간

    ctor: function () {
        this._tTargetTime = 0;

    },

    clear : function(){
        this.setTimeStamp(0);
    },
    //시간 세팅
    setTimeStamp : function (time)
    {
        this._tTargetTime = time;
    },

    //남은시간으로 세팅
    setRemainTime : function (remainTimeInMS) {

        if ( remainTimeInMS  > 0)
        {
            this._tTargetTime = Date.now() + remainTimeInMS;       //서비스 종료시간
        }
        else
        {
            this._tTargetTime = 0;
        }
    },

    //남은시간 GET
    getRemainTime: function() {
        var now = Date.now();
        if( this._tTargetTime > now)
        {
            var remainTime = this._tTargetTime - now;
            return remainTime;
        }
        return 0;
    },

    getRemainSec : function(){

        return Math.floor(this.getRemainTime() /1000);
    },

    // 타겟 시간이 지났는가
    isExpired : function () {
        return (this.getRemainTime() <= 0);
    },

    //남은시간 Text
    getRemainTime_HHMMSS : function(){
        var remainSec = this.getRemainSec();
        return this.convertSecToHHMMSS(remainSec);
    },

    //초를 HH:MM:SS 형식으로 반환
    convertSecToHHMMSS : function (remainSec){

        var padToTwo = function(number) {
            if (number < 10) return "0" + number;
            return number;
        };

        var HOUR_SEC = 3600;
        var strHour;
        var hour = Math.floor(remainSec / HOUR_SEC);
        var underHourSec = Math.floor(remainSec % HOUR_SEC);
        var min = Math.floor(underHourSec / 60);
        var sec = Math.floor(underHourSec % 60);

        return  padToTwo(hour) + ":" + padToTwo(min) + ":" + padToTwo(sec);
    },

    //남은시간 Text
    getRemainTime_MMSS : function(){
        var remainSec = this.getRemainSec();
        return this.convertSecToMMSS(remainSec);
    },

    //초를 HH:MM:SS 형식으로 반환
    convertSecToMMSS : function (remainSec){

        var padToTwo = function(number) {
            if (number < 10) return "0" + number;
            return number;
        };

        var HOUR_SEC = 3600;
        var strHour;
        var underHourSec = Math.floor(remainSec % HOUR_SEC);
        var min = Math.floor(underHourSec / 60);
        var sec = Math.floor(underHourSec % 60);

        return  padToTwo(min) + ":" + padToTwo(sec);
    },

    //남은시간 Text
    getRemainTime_HHMM : function(){
        var remainSec = this.getRemainSec();
        return this.convertSecToHHMM(remainSec);
    },

    //초를 HH:MM:SS 형식으로 반환
    convertSecToHHMM : function (remainSec){

        var padToTwo = function(number) {
            if (number < 10) return "0" + number;
            return number;
        };

        var HOUR_SEC = 3600;
        var strHour;
        var hour = Math.floor(remainSec / HOUR_SEC);
        var underHourSec = Math.floor(remainSec % HOUR_SEC);
        var min = Math.floor(underHourSec / 60);

        return  padToTwo(hour) + ":" + padToTwo(min);
    },

    //남은시간 Text
    getRemainTimeString : function(){

        var remainSec = this.getRemainTime() /1000;

        var HOUR_SEC = 3600;
        var DAY_SEC = HOUR_SEC * 24;
        var MONTH_SEC = DAY_SEC * 30;
        var month = Math.floor(remainSec / MONTH_SEC);
        if (month > 1)
            return month.toString() + " Months";
        else if (month === 1)
            return month.toString() + " Month";
        else
        {

            var day = Math.floor(remainSec / DAY_SEC);
            if (day > 1)
                return day.toString()+ " Days";
            else if (day === 1)
                return day.toString()+ " Day";
            else
            {
                return this.convertSecToHHMMSS(remainSec);
                /*var hour = Math.floor(remainSec / HOUR_SEC);
                if (hour > 1)
                    return hour.toString()+ " Hours";
                else if (hour === 1)
                    return hour.toString()+ " Hour";
                else
                {
                    var padToTwo = function(number) {
                        if (number < 10) return "0" + number;
                        return number;
                    };

                    var min = Math.floor(remainSec / 60);
                    var sec = Math.floor(remainSec % 60);

                    return padToTwo(min) + ":" + padToTwo(sec);
                }*/
            }
        }
    },

    // 1day 이상일 경우 : 3D 7H
    // 1day 미만일 경우 : 0D 15H
    // 1H 미만일 경우 : 00:00 (시:분)
    getRemainTimeStringVersion2 : function(){
        var remainSec = this.getRemainTime() /1000;

        var HOUR_SEC = 3600;
        var DAY_SEC = HOUR_SEC * 24;
        var MONTH_SEC = DAY_SEC * 30;
        var month = Math.floor(remainSec / MONTH_SEC);
        if (month > 1)
            return month.toString() + " Months";
        else if (month === 1)
            return month.toString() + " Month";
        else
        {
            if( remainSec < HOUR_SEC ) {
                return this.convertSecToMMSS( remainSec )
            }
            else {
                var day  = Math.floor(remainSec / DAY_SEC);
                var hour = Math.floor( remainSec % DAY_SEC / HOUR_SEC );

                var strDay  = day.toString() + "D";
                var strHour = hour.toString()+ "H";
                return strDay + " " + strHour;
            }
        }
    },

    // 1일 이상 : N day NN h
    // 1일 이내 : HHMMSS
    getRemainTimeStringVersion3 : function() {
        var remainSec = this.getRemainTime() / 1000;

        var HOUR_SEC = 3600;
        var DAY_SEC = HOUR_SEC * 24;

        var day = Math.floor(remainSec / DAY_SEC);

        if( day < 1 ) {
            return this.convertSecToHHMMSS( remainSec )
        }
        else {
            var hour = Math.floor( remainSec % DAY_SEC / HOUR_SEC );

            var strDay = day > 1 ? day + ' days ' : day + ' day ';
            var strHour = hour.toString() + " h";
            return strDay + strHour;
        }
    },

    // 1일 이상 : 1 Day Left / N Days Left
    // 1일 이내 : HH : MM : SS
    getRemainTimeStringVersion4 : function() {
        var remainSec = this.getRemainTime() /1000;

        var HOUR_SEC = 3600;
        var DAY_SEC = HOUR_SEC * 24;

        var day = Math.floor(remainSec / DAY_SEC);

        if( day === 1 ) {
            return '1 Day Left';
        }
        else if( day > 1 ) {
            return day + ' Days Left'
        }
        else {
            return this.convertSecToHHMMSS( remainSec )
        }
    },

    /*
     * 현재 날짜 시간을 반환 포멧은
     * 2018-03-22-13시 50분이라면 => 1803221350 형태로..
     * @returns {Date}
     */
    getDateString : function() {
        var today = new Date();
        today.setTime(this._tTargetTime);
        var hh = today.getHours();
        var minutes = today.getMinutes();
        var mm = today.getMonth()+1 ;
        var dd = today.getDate();


        today = mm +"/"+ dd +" " + hh+":" + minutes ;
        return today;
    },

    //Util Day 표현
    getUtilDateString : function() {
        var  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var today = new Date();
        today.setTime(this._tTargetTime);
        var hh = today.getHours();
        var minutes = today.getMinutes();
        var mm = today.getMonth()+1 ;
        var dd = null;
        if(today.getDate() < 10){
            dd = "0"+today.getDate();
        }
        return "Until " + monthNames[today.getMonth()] + ". " + dd;
    },

    clone : function (){
        var clone = new RockN.TimeStamp();
        clone._tTargetTime = this._tTargetTime;
        return clone;
    }
});