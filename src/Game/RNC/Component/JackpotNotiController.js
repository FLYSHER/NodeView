var JackpotNotiController = cc.Class.extend( {
    ctor: function( labels ) {
        cc.assert( cc.isArray( labels ), '[JackpotNotiController] labels is not array' );
        this._lbJackpot = labels;
        this._currJackpotInfo = [];
        for( var i = 0; i < labels.length; i++ ) {
            this._currJackpotInfo[ i ] = 0;
        }

        this._progressEnable = true;

        // 모든 레이블의 자리수 기준이 되는 index 해당 자리의 kmbt기준으로 다른 자리를 맞춘다.
        this._maxdigitStandardIndex = -1;
    },

    /**
     *
     * @param maxDigitArr 최대 길이 값 담고 있는 array
     * @example [ 0, 8, 0, 9, 10 ]
     * 이렇게 세팅한 경우 0번 인덱스 레이블은 1번 인덱스 레이블의 길이보다 작게 세팅,
     * 2번 인덱스 레이블은 3번 인덱스 레이블의 길이보다 작게 세팅,
     * 1번, 3번, 4번 인덱스 레이블의 최대 길이는 각각 8, 9, 10
     */
    setMaxDigit: function( maxDigitArr ) {
        this._maxDigit = maxDigitArr;
    },

    setMaxDigitStandardIndex: function(index){
        if( this._maxDigit.length >= index && this._maxDigit[index] > 0 )
            this._maxdigitStandardIndex = index;
        else
            this._maxdigitStandardIndex = -1;
    },

    setProgress: function( enable, duration ) {
        this._progressEnable = enable;
        this._countingDuration = duration;
    },

    updateJackpotInfo: function( jackpotInfo, isDown ) {
        var i;

        for( i = 0; i < this._currJackpotInfo.length; i++ ) {
            this._currJackpotInfo[ i ] = jackpotInfo;
        }

        var _progressEnable = this._progressEnable;
        var _countingDuration = this._countingDuration ? this._countingDuration : 0.3;

        var divided = 0;
        var str = '';

        // 기준점으로 모든 자리의 kmbt통일
        if( this._maxdigitStandardIndex !== -1 && this._maxDigit[ this._maxdigitStandardIndex ] > 0 ){
            divided = getDivided( jackpotInfo[ this._maxdigitStandardIndex ], this._maxDigit[ this._maxdigitStandardIndex ] );
        }

        for( i = this._lbJackpot.length - 1; i >= 0; i-- ) {
            if( isValidObject( this._lbJackpot[ i ] ) === false ) {
                continue;
            }

            if( 0 === jackpotInfo[ i ] ) {
                _progressEnable = false;
            }
            else {
                _progressEnable = this._progressEnable;
            }

            if( this._maxdigitStandardIndex === -1 ){
                if( this._maxDigit[ i ] > 0 ) {
                    divided = getDivided( jackpotInfo[ i ], this._maxDigit[ i ] );
                }
            }

            if( _progressEnable ) {
                var initValue = localeStringToNumber( this._lbJackpot[ i ].getString() );
                if( isNaN( initValue ) === true ) {
                    initValue = 0;
                }
                var digit = 0;
                if( isDown === true ) {
                    digit = this._getNumberDigit( initValue ) - divided * 3;
                } else {
                    digit = this._getNumberDigit( jackpotInfo[ i ] ) - divided * 3;
                }

                if( 0 === jackpotInfo[ i ] ) {
                    digit = 0;
                }

                this._lbJackpot[ i ].unscheduleAllCallbacks();
                countLabelBase( this._lbJackpot[ i ], initValue, jackpotInfo[ i ], 0, _countingDuration, digit );
            } else {
                str = this._getJackpotNotiString( jackpotInfo[ i ], divided );

                if( 0 === jackpotInfo[ i ] ) {
                    str = '';
                }

                this._lbJackpot[ i ].setString( str );
            }
        }
    },

    _getNumberDigit: function( num ) {
        var logValue = Math.log( num ) / Math.LN10;
        return this._getFloorNumber( logValue ) + 1;
    },

    _getFloorNumber: function( num ) {
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/log
        // Math.log( 1000 ) / Math.log( 10 ) = 2.9999999999999996 이기 때문에 소수점 1의 자리에서 반올림 후 floor 계산
        var temp = num * 10;
        return Math.floor( Math.round( temp ) / 10 );
    },

    _getJackpotNotiString: function( win, divided ) {
        var postfix = [ '', 'K', 'M', 'B', 'T' ];

        var oriNumber = win / Math.pow( 10, divided * 3 );
        var winStr = '';

        if( oriNumber >= 10 ) {
            winStr = toLocale( Math.round( oriNumber ) ) + postfix[ divided ];
        } else {
            winStr = oriNumber.toFixed( 1 ) + postfix[ divided ];
        }

        return winStr;
    },

    //flypodong : GameMode별 UI가 바뀌는 경우 사용
    change : function ( labels ) {
        if(!labels )
            return;

        var templbJackpot = this._lbJackpot;
        this._lbJackpot = labels;
        var len = templbJackpot.length;
        var newlen = this._lbJackpot.length;
        for(var n = 0; n < len; n++){
            if(newlen > n) {
                this._lbJackpot[n].setString(templbJackpot[n].getString());
            }
        }
    },
} );