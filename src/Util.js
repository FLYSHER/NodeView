var cloneNodeArr = function( arr ) {
    var copy;

    // Handle Array
    if( arr instanceof Array ) {
        copy = [];
        for( var i = 0; i < arr.length; i++ ) {
            copy[ i ] = arr[i].clone();
        }
        return copy;
    }
    else {
        return arr.clone();
    }
};