window.convertObjToArr = function( obj ) {
    var tempArr = [];
    for( var item in obj ) {
        if( obj.hasOwnProperty( item ) ) {
            tempArr.push( obj[ item ] );
        }
    }

    // cc.log('***[obj first element] : ' + tempArr[0]);
    return tempArr;
};