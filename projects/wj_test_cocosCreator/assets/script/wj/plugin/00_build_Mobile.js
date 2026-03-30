/**
 * hasOwnProperty.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function pomelo_require( path, parent, orig ) {
    var resolved = pomelo_require.resolve( path );

    // lookup failed
    if( null == resolved ) {
        orig        = orig || path;
        parent      = parent || 'root';
        var err     = new Error( 'Failed to require "' + orig + '" from "' + parent + '"' );
        err.path    = orig;
        err.parent  = parent;
        err.require = true;
        throw err;
    }

    var module = pomelo_require.modules[ resolved ];

    // perform real require()
    // by invoking the module's
    // registered function
    if( !module.exports ) {
        module.exports = {};
        module.client  = module.component = true;
        module.call( this, module.exports, pomelo_require.relative( resolved ), module );
    }

    return module.exports;
}

/**
 * Registered modules.
 */

pomelo_require.modules = {};

/**
 * Registered aliases.
 */

pomelo_require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

pomelo_require.resolve = function( path ) {
    if( path.charAt( 0 ) === '/' ) {
        path = path.slice( 1 );
    }
    var index = path + '/index.js';

    var paths = [
        path,
        path + '.js',
        path + '.json',
        path + '/index.js',
        path + '/index.json'
    ];

    for( var i = 0; i < paths.length; i++ ) {
        var path = paths[ i ];
        if( has.call( pomelo_require.modules, path ) ) {
            return path;
        }
    }

    if( has.call( pomelo_require.aliases, index ) ) {
        return pomelo_require.aliases[ index ];
    }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

pomelo_require.normalize = function( curr, path ) {
    var segs = [];

    if( '.' != path.charAt( 0 ) ) {
        return path;
    }

    curr = curr.split( '/' );
    path = path.split( '/' );

    for( var i = 0; i < path.length; ++i ) {
        if( '..' == path[ i ] ) {
            curr.pop();
        }
        else if( '.' != path[ i ] && '' != path[ i ] ) {
            segs.push( path[ i ] );
        }
    }

    return curr.concat( segs ).join( '/' );
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

pomelo_require.register = function( path, definition ) {
    pomelo_require.modules[ path ] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

pomelo_require.alias = function( from, to ) {
    if( !has.call( pomelo_require.modules, from ) ) {
        throw new Error( 'Failed to alias "' + from + '", it does not exist' );
    }
    pomelo_require.aliases[ to ] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

pomelo_require.relative = function( parent ) {
    var p = pomelo_require.normalize( parent, '..' );

    /**
     * lastIndexOf helper.
     */

    function lastIndexOf( arr, obj ) {
        var i = arr.length;
        while( i-- ) {
            if( arr[ i ] === obj ) {
                return i;
            }
        }
        return -1;
    }

    /**
     * The relative require() itself.
     */

    function localRequire( path ) {
        var resolved = localRequire.resolve( path );
        return pomelo_require( resolved, parent, path );
    }

    /**
     * Resolve relative to the parent.
     */

    localRequire.resolve = function( path ) {
        var c = path.charAt( 0 );
        if( '/' == c ) {
            return path.slice( 1 );
        }
        if( '.' == c ) {
            return pomelo_require.normalize( p, path );
        }

        // resolve deps by returning
        // the dep in the nearest "deps"
        // directory
        var segs = parent.split( '/' );
        var i    = lastIndexOf( segs, 'deps' ) + 1;
        if( !i ) {
            i = 0;
        }
        path = segs.slice( 0, i + 1 ).join( '/' ) + '/deps/' + path;
        return path;
    };

    /**
     * Check if module is defined at `path`.
     */

    localRequire.exists = function( path ) {
        return has.call( pomelo_require.modules, localRequire.resolve( path ) );
    };

    return localRequire;
};
pomelo_require.register( "component-indexof/index.js", function( exports, require, module ) {

    var indexOf = [].indexOf;

    module.exports = function( arr, obj ) {
        if( indexOf ) {
            return arr.indexOf( obj );
        }
        for( var i = 0; i < arr.length; ++i ) {
            if( arr[ i ] === obj ) {
                return i;
            }
        }
        return -1;
    };
} );
pomelo_require.register( "component-emitter/index.js", function( exports, require, module ) {

    /**
     * Module dependencies.
     */

    var index = require( 'indexof' );

    /**
     * Expose `Emitter`.
     */

    module.exports = Emitter;

    /**
     * Initialize a new `Emitter`.
     *
     * @api public
     */

    function Emitter( obj ) {
        if( obj ) {
            return mixin( obj );
        }
    }

    /**
     * Mixin the emitter properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */

    function mixin( obj ) {
        for( var key in Emitter.prototype ) {
            obj[ key ] = Emitter.prototype[ key ];
        }
        return obj;
    }

    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */

    Emitter.prototype.on = function( event, fn ) {
        this._callbacks = this._callbacks || {};
        (this._callbacks[ event ] = this._callbacks[ event ] || []).push( fn );
        return this;
    };

    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */

    Emitter.prototype.once = function( event, fn ) {
        var self        = this;
        this._callbacks = this._callbacks || {};

        function on() {
            self.off( event, on );
            fn.apply( this, arguments );
        }

        fn._off = on;
        this.on( event, on );
        return this;
    };

    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */

    Emitter.prototype.off =
        Emitter.prototype.removeListener =
            Emitter.prototype.removeAllListeners = function( event, fn ) {
                this._callbacks = this._callbacks || {};

                // all
                if( 0 == arguments.length ) {
                    this._callbacks = {};
                    return this;
                }

                // specific event
                var callbacks = this._callbacks[ event ];
                if( !callbacks ) {
                    return this;
                }

                // remove all handlers
                if( 1 == arguments.length ) {
                    delete this._callbacks[ event ];
                    return this;
                }

                // remove specific handler
                var i = index( callbacks, fn._off || fn );
                if( ~i ) {
                    callbacks.splice( i, 1 );
                }
                return this;
            };

    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */

    Emitter.prototype.emit = function( event ) {
        this._callbacks = this._callbacks || {};
        var args        = [].slice.call( arguments, 1 )
            , callbacks = this._callbacks[ event ];

        if( callbacks ) {
            callbacks = callbacks.slice( 0 );
            for( var i = 0, len = callbacks.length; i < len; ++i ) {
                callbacks[ i ].apply( this, args );
            }
        }

        return this;
    };

    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */

    Emitter.prototype.listeners = function( event ) {
        this._callbacks = this._callbacks || {};
        return this._callbacks[ event ] || [];
    };

    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */

    Emitter.prototype.hasListeners = function( event ) {
        return !!this.listeners( event ).length;
    };

} );
pomelo_require.register( "NetEase-pomelo-protocol/lib/protocol.js", function( exports, require, module ) {
    (function( exports, ByteArray, global ) {
        var Protocol = exports;

        var PKG_HEAD_BYTES       = 4;
        var MSG_FLAG_BYTES       = 1;
        var MSG_ROUTE_CODE_BYTES = 2;
        var MSG_ID_MAX_BYTES     = 5;
        var MSG_ROUTE_LEN_BYTES  = 1;

        var MSG_ROUTE_CODE_MAX = 0xffff;

        var MSG_COMPRESS_ROUTE_MASK = 0x1;
        var MSG_TYPE_MASK           = 0x7;

        var Package = Protocol.Package = {};
        var Message = Protocol.Message = {};

        Package.TYPE_HANDSHAKE     = 1;
        Package.TYPE_HANDSHAKE_ACK = 2;
        Package.TYPE_HEARTBEAT     = 3;
        Package.TYPE_DATA          = 4;
        Package.TYPE_KICK          = 5;

        Message.TYPE_REQUEST  = 0;
        Message.TYPE_NOTIFY   = 1;
        Message.TYPE_RESPONSE = 2;
        Message.TYPE_PUSH     = 3;

        /**
         * pomele client encode
         * id message id;
         * route message route
         * msg message body
         * socketio current support string
         */
        Protocol.strencode = function( str ) {
            var byteArray = new ByteArray( str.length * 3 );
            var offset    = 0;
            for( var i = 0; i < str.length; i++ ) {
                var charCode = str.charCodeAt( i );
                var codes    = null;
                if( charCode <= 0x7f ) {
                    codes = [ charCode ];
                }
                else if( charCode <= 0x7ff ) {
                    codes = [ 0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f) ];
                }
                else {
                    codes = [ 0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f) ];
                }
                for( var j = 0; j < codes.length; j++ ) {
                    byteArray[ offset ] = codes[ j ];
                    ++offset;
                }
            }
            var _buffer = new ByteArray( offset );
            copyArray( _buffer, 0, byteArray, 0, offset );
            return _buffer;
        };

        /**
         * client decode
         * msg String data
         * return Message Object
         */
        Protocol.strdecode = function( buffer ) {
            var bytes    = new ByteArray( buffer );
            var array    = [];
            var offset   = 0;
            var charCode = 0;
            var end      = bytes.length;
            while( offset < end ) {
                if( bytes[ offset ] < 128 ) {
                    charCode = bytes[ offset ];
                    offset += 1;
                }
                else if( bytes[ offset ] < 224 ) {
                    charCode = ((bytes[ offset ] & 0x3f) << 6) + (bytes[ offset + 1 ] & 0x3f);
                    offset += 2;
                }
                else {
                    charCode = ((bytes[ offset ] & 0x0f) << 12) + ((bytes[ offset + 1 ] & 0x3f) << 6) + (bytes[ offset + 2 ] & 0x3f);
                    offset += 3;
                }
                array.push( charCode );
            }

            //return String.fromCharCode.apply( null, array ); //@terry array length가 일정 개수 이상 커지면  apply에서 인수를 다 처리하지 못하는 현상으로 인해 아래 코드로 변경
            return array.reduce(function(acc, i) { return acc += String.fromCharCode.apply(null, [i])}, '');
        };

        /**
         * Package protocol encode.
         *
         * Pomelo package format:
         * +------+-------------+------------------+
         * | type | body length |       body       |
         * +------+-------------+------------------+
         *
         * Head: 4bytes
         *   0: package type,
         *      1 - handshake,
         *      2 - handshake ack,
         *      3 - heartbeat,
         *      4 - data
         *      5 - kick
         *   1 - 3: big-endian body length
         * Body: body length bytes
         *
         * @param  {Number}    type   package type
         * @param  {ByteArray} body   body content in bytes
         * @return {ByteArray}        new byte array that contains encode result
         */
        Package.encode = function( type, body ) {
            var length        = body ? body.length : 0;
            var buffer        = new ByteArray( PKG_HEAD_BYTES + length );
            var index         = 0;
            buffer[ index++ ] = type & 0xff;
            buffer[ index++ ] = (length >> 16) & 0xff;
            buffer[ index++ ] = (length >> 8) & 0xff;
            buffer[ index++ ] = length & 0xff;
            if( body ) {
                copyArray( buffer, index, body, 0, length );
            }
            return buffer;
        };

        /**
         * Package protocol decode.
         * See encode for package format.
         *
         * @param  {ByteArray} buffer byte array containing package content
         * @return {Object}           {type: package type, buffer: body byte array}
         */
        Package.decode = function( buffer ) {
            var bytes  = new ByteArray( buffer );
            var type   = bytes[ 0 ];
            var index  = 1;
            var length = ((bytes[ index++ ]) << 16 | (bytes[ index++ ]) << 8 | bytes[ index++ ]) >>> 0;
            var body   = length ? new ByteArray( length ) : null;
            copyArray( body, 0, bytes, PKG_HEAD_BYTES, length );
            return {
                'type' : type,
                'body' : body
            };
        };

        /**
         * Message protocol encode.
         *
         * @param  {Number} id            message id
         * @param  {Number} type          message type
         * @param  {Number} compressRoute whether compress route
         * @param  {Number|String} route  route code or route string
         * @param  {Buffer} msg           message body bytes
         * @return {Buffer}               encode result
         */
        Message.encode = function( id, type, compressRoute, route, msg ) {
            // caculate message max length
            var idBytes = msgHasId( type ) ? caculateMsgIdBytes( id ) : 0;
            var msgLen  = MSG_FLAG_BYTES + idBytes;

            if( msgHasRoute( type ) ) {
                if( compressRoute ) {
                    if( typeof route !== 'number' ) {
                        throw new Error( 'error flag for number route!' );
                    }
                    msgLen += MSG_ROUTE_CODE_BYTES;
                }
                else {
                    msgLen += MSG_ROUTE_LEN_BYTES;
                    if( route ) {
                        route = Protocol.strencode( route );
                        if( route.length > 255 ) {
                            throw new Error( 'route maxlength is overflow' );
                        }
                        msgLen += route.length;
                    }
                }
            }

            if( msg ) {
                msgLen += msg.length;
            }

            var buffer = new ByteArray( msgLen );
            var offset = 0;

            // add flag
            offset = encodeMsgFlag( type, compressRoute, buffer, offset );

            // add message id
            if( msgHasId( type ) ) {
                offset = encodeMsgId( id, idBytes, buffer, offset );
            }

            // add route
            if( msgHasRoute( type ) ) {
                offset = encodeMsgRoute( compressRoute, route, buffer, offset );
            }

            // add body
            if( msg ) {
                offset = encodeMsgBody( msg, buffer, offset );
            }

            return buffer;
        };

        /**
         * Message protocol decode.
         *
         * @param  {Buffer|Uint8Array} buffer message bytes
         * @return {Object}            message object
         */
        Message.decode = function( buffer ) {
            var bytes    = new ByteArray( buffer );
            var bytesLen = bytes.length || bytes.byteLength;
            var offset   = 0;
            var id       = 0;
            var route    = null;

            // parse flag
            var flag          = bytes[ offset++ ];
            var compressRoute = flag & MSG_COMPRESS_ROUTE_MASK;
            var type          = (flag >> 1) & MSG_TYPE_MASK;

            // parse id
            if( msgHasId( type ) ) {
                var m = 0, shiftIndex = 0;
                for( var i = offset; i < offset + 4; i++ ) {
                    m = bytes[ i ];
                    id += m << ( 24 - ( shiftIndex * 8 ) );
                    shiftIndex++;
                }

                offset = offset + 4;
            }

            // parse route
            if( msgHasRoute( type ) ) {
                if( compressRoute ) {
                    route = (bytes[ offset++ ]) << 8 | bytes[ offset++ ];
                }
                else {
                    var routeLen = bytes[ offset++ ];
                    if( routeLen ) {
                        route = new ByteArray( routeLen );
                        copyArray( route, 0, bytes, offset, routeLen );
                        route = Protocol.strdecode( route );
                    }
                    else {
                        route = '';
                    }
                    offset += routeLen;
                }
            }

            // parse body
            var bodyLen = bytesLen - offset;
            var body    = new ByteArray( bodyLen );

            copyArray( body, 0, bytes, offset, bodyLen );

            return {
                'id'            : id,
                'type'          : type,
                'compressRoute' : compressRoute,
                'route'         : route,
                'body'          : body
            };
        };

        var copyArray = function( dest, doffset, src, soffset, length ) {
            if( 'function' === typeof src.copy ) {
                // Buffer
                src.copy( dest, doffset, soffset, soffset + length );
            }
            else {
                // Uint8Array
                for( var index = 0; index < length; index++ ) {
                    dest[ doffset++ ] = src[ soffset++ ];
                }
            }
        };

        var msgHasId = function( type ) {
            return type === Message.TYPE_REQUEST || type === Message.TYPE_RESPONSE;
        };

        var msgHasRoute = function( type ) {
            return type === Message.TYPE_REQUEST || type === Message.TYPE_NOTIFY ||
                type === Message.TYPE_PUSH;
        };

        var caculateMsgIdBytes = function( id ) {
            return 4;
        };

        var encodeMsgFlag = function( type, compressRoute, buffer, offset ) {
            if( type !== Message.TYPE_REQUEST && type !== Message.TYPE_NOTIFY &&
                type !== Message.TYPE_RESPONSE && type !== Message.TYPE_PUSH ) {
                throw new Error( 'unkonw message type: ' + type );
            }

            buffer[ offset ] = (type << 1) | (compressRoute ? 1 : 0);

            return offset + MSG_FLAG_BYTES;
        };

        var encodeMsgId = function( id, idBytes, buffer, offset ) {
            buffer[ offset++ ] = (id >> 24) & 0xFF;
            buffer[ offset++ ] = (id >> 16) & 0xFF;
            buffer[ offset++ ] = (id >> 8) & 0xFF;
            buffer[ offset++ ] = id & 0xFF;

            return offset;
        };

        var encodeMsgRoute = function( compressRoute, route, buffer, offset ) {
            if( compressRoute ) {
                if( route > MSG_ROUTE_CODE_MAX ) {
                    throw new Error( 'route number is overflow' );
                }

                buffer[ offset++ ] = (route >> 8) & 0xff;
                buffer[ offset++ ] = route & 0xff;
            }
            else {
                if( route ) {
                    buffer[ offset++ ] = route.length & 0xff;
                    copyArray( buffer, offset, route, 0, route.length );
                    offset += route.length;
                }
                else {
                    buffer[ offset++ ] = 0;
                }
            }

            return offset;
        };

        var encodeMsgBody = function( msg, buffer, offset ) {
            copyArray( buffer, offset, msg, 0, msg.length );
            return offset + msg.length;
        };

        module.exports = Protocol;
    })( 'object' === typeof module ? module.exports : (this.Protocol = {}), 'object' === typeof module ? Buffer : Uint8Array, this );

} );
pomelo_require.register( "pomelonode-pomelo-protobuf/lib/client/protobuf.js", function( exports, require, module ) {
    /* ProtocolBuffer client 0.1.0*/

    /**
     * pomelo-protobuf
     * @author <zhang0935@gmail.com>
     */

    /**
     * Protocol buffer root
     * In browser, it will be window.protbuf
     */
    (function( exports, global ) {
        var Protobuf = exports;

        Protobuf.init = function( opts ) {
            //On the serverside, use serverProtos to encode messages send to client
            Protobuf.encoder.init( opts.encoderProtos );

            //On the serverside, user clientProtos to decode messages receive from clients
            Protobuf.decoder.init( opts.decoderProtos );
        };

        Protobuf.encode = function( key, msg ) {
            return Protobuf.encoder.encode( key, msg );
        };

        Protobuf.decode = function( key, msg ) {
            return Protobuf.decoder.decode( key, msg );
        };

        // exports to support for components
        module.exports = Protobuf;
    })( 'object' === typeof module ? module.exports : (this.protobuf = {}), this );

    /**
     * constants
     */
    (function( exports, global ) {
        var constants = exports.constants = {};

        constants.TYPES = {
            'uInt32'  : 0,
            'sInt32'  : 0,
            'int32'   : 0,
            'double'  : 1,
            'string'  : 2,
            'message' : 2,
            'float'   : 5
        };

    })( 'undefined' !== typeof protobuf ? protobuf : module.exports, this );

    /**
     * util module
     */
    (function( exports, global ) {

        var Util = exports.util = {};

        Util.isSimpleType = function( type ) {
            return ( type === 'uInt32' ||
                type === 'sInt32' ||
                type === 'int32' ||
                type === 'uInt64' ||
                type === 'sInt64' ||
                type === 'float' ||
                type === 'double' );
        };

    })( 'undefined' !== typeof protobuf ? protobuf : module.exports, this );

    /**
     * codec module
     */
    (function( exports, global ) {

        var Codec = exports.codec = {};

        var buffer       = new ArrayBuffer( 8 );
        var float32Array = new Float32Array( buffer );
        var float64Array = new Float64Array( buffer );
        var uInt8Array   = new Uint8Array( buffer );

        Codec.encodeUInt32 = function( n ) {
            var n = parseInt( n );
            if( isNaN( n ) || n < 0 ) {
                return null;
            }

            var result = [];
            do {
                var tmp  = n % 128;
                var next = Math.floor( n / 128 );

                if( next !== 0 ) {
                    tmp = tmp + 128;
                }
                result.push( tmp );
                n = next;
            } while( n !== 0 );

            return result;
        };

        Codec.encodeSInt32 = function( n ) {
            var n = parseInt( n );
            if( isNaN( n ) ) {
                return null;
            }
            n = n < 0 ? (Math.abs( n ) * 2 - 1) : n * 2;

            return Codec.encodeUInt32( n );
        };

        Codec.decodeUInt32 = function( bytes ) {
            var n = 0;

            for( var i = 0; i < bytes.length; i++ ) {
                var m = parseInt( bytes[ i ] );
                n     = n + ((m & 0x7f) * Math.pow( 2, (7 * i) ));
                if( m < 128 ) {
                    return n;
                }
            }

            return n;
        };

        Codec.decodeSInt32 = function( bytes ) {
            var n    = this.decodeUInt32( bytes );
            var flag = ((n % 2) === 1) ? -1 : 1;

            n = ((n % 2 + n) / 2) * flag;

            return n;
        };

        Codec.encodeFloat = function( _float ) {
            float32Array[ 0 ] = _float;
            return uInt8Array;
        };

        Codec.decodeFloat = function( bytes, offset ) {
            if( !bytes || bytes.length < (offset + 4) ) {
                return null;
            }

            for( var i = 0; i < 4; i++ ) {
                uInt8Array[ i ] = bytes[ offset + i ];
            }

            return float32Array[ 0 ];
        };

        Codec.encodeDouble = function( _double ) {
            float64Array[ 0 ] = _double;
            return uInt8Array.subarray( 0, 8 );
        };

        Codec.decodeDouble = function( bytes, offset ) {
            if( !bytes || bytes.length < (8 + offset) ) {
                return null;
            }

            for( var i = 0; i < 8; i++ ) {
                uInt8Array[ i ] = bytes[ offset + i ];
            }

            return float64Array[ 0 ];
        };

        Codec.encodeStr = function( bytes, offset, str ) {
            for( var i = 0; i < str.length; i++ ) {
                var code  = str.charCodeAt( i );
                var codes = encode2UTF8( code );

                for( var j = 0; j < codes.length; j++ ) {
                    bytes[ offset ] = codes[ j ];
                    offset++;
                }
            }

            return offset;
        };

        /**
         * Decode string from utf8 bytes
         */
        Codec.decodeStr = function( bytes, offset, length ) {
            var array = [];
            var end   = offset + length;

            while( offset < end ) {
                var code = 0;

                if( bytes[ offset ] < 128 ) {
                    code = bytes[ offset ];

                    offset += 1;
                }
                else if( bytes[ offset ] < 224 ) {
                    code = ((bytes[ offset ] & 0x3f) << 6) + (bytes[ offset + 1 ] & 0x3f);
                    offset += 2;
                }
                else {
                    code = ((bytes[ offset ] & 0x0f) << 12) + ((bytes[ offset + 1 ] & 0x3f) << 6) + (bytes[ offset + 2 ] & 0x3f);
                    offset += 3;
                }

                array.push( code );

            }

            var str = '';
            for( var i = 0; i < array.length; ) {
                str += String.fromCharCode.apply( null, array.slice( i, i + 10000 ) );
                i += 10000;
            }

            return str;
        };

        /**
         * Return the byte length of the str use utf8
         */
        Codec.byteLength = function( str ) {
            if( typeof(str) !== 'string' ) {
                return -1;
            }

            var length = 0;

            for( var i = 0; i < str.length; i++ ) {
                var code = str.charCodeAt( i );
                length += codeLength( code );
            }

            return length;
        };

        /**
         * Encode a unicode16 char code to utf8 bytes
         */
        function encode2UTF8( charCode ) {
            if( charCode <= 0x7f ) {
                return [ charCode ];
            }
            else if( charCode <= 0x7ff ) {
                return [ 0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f) ];
            }
            else {
                return [ 0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f) ];
            }
        }

        function codeLength( code ) {
            if( code <= 0x7f ) {
                return 1;
            }
            else if( code <= 0x7ff ) {
                return 2;
            }
            else {
                return 3;
            }
        }
    })( 'undefined' !== typeof protobuf ? protobuf : module.exports, this );

    /**
     * encoder module
     */
    (function( exports, global ) {

        var protobuf   = exports;
        var MsgEncoder = exports.encoder = {};

        var codec    = protobuf.codec;
        var constant = protobuf.constants;
        var util     = protobuf.util;

        MsgEncoder.init = function( protos ) {
            this.protos = protos || {};
        };

        MsgEncoder.encode = function( route, msg ) {
            //Get protos from protos map use the route as key
            var protos = this.protos[ route ];

            //Check msg
            if( !checkMsg( msg, protos ) ) {
                return null;
            }

            //Set the length of the buffer 2 times bigger to prevent overflow
            var length = codec.byteLength( JSON.stringify( msg ) );

            //Init buffer and offset
            var buffer     = new ArrayBuffer( length );
            var uInt8Array = new Uint8Array( buffer );
            var offset     = 0;

            if( !!protos ) {
                offset = encodeMsg( uInt8Array, offset, protos, msg );
                if( offset > 0 ) {
                    return uInt8Array.subarray( 0, offset );
                }
            }

            return null;
        };

        /**
         * Check if the msg follow the defination in the protos
         */
        function checkMsg( msg, protos ) {
            if( !protos ) {
                return false;
            }

            for( var name in protos ) {
                var proto = protos[ name ];

                //All required element must exist
                switch( proto.option ) {
                    case 'required' :
                        if( typeof(msg[ name ]) === 'undefined' ) {
                            return false;
                        }
                    case 'optional' :
                        if( typeof(msg[ name ]) !== 'undefined' ) {
                            if( !!protos.__messages[ proto.type ] ) {
                                checkMsg( msg[ name ], protos.__messages[ proto.type ] );
                            }
                        }
                        break;
                    case 'repeated' :
                        //Check nest message in repeated elements
                        if( !!msg[ name ] && !!protos.__messages[ proto.type ] ) {
                            for( var i = 0; i < msg[ name ].length; i++ ) {
                                if( !checkMsg( msg[ name ][ i ], protos.__messages[ proto.type ] ) ) {
                                    return false;
                                }
                            }
                        }
                        break;
                }
            }

            return true;
        }

        function encodeMsg( buffer, offset, protos, msg ) {
            for( var name in msg ) {
                if( !!protos[ name ] ) {
                    var proto = protos[ name ];

                    switch( proto.option ) {
                        case 'required' :
                        case 'optional' :
                            offset = writeBytes( buffer, offset, encodeTag( proto.type, proto.tag ) );
                            offset = encodeProp( msg[ name ], proto.type, offset, buffer, protos );
                            break;
                        case 'repeated' :
                            if( msg[ name ].length > 0 ) {
                                offset = encodeArray( msg[ name ], proto, offset, buffer, protos );
                            }
                            break;
                    }
                }
            }

            return offset;
        }

        function encodeProp( value, type, offset, buffer, protos ) {
            switch( type ) {
                case 'uInt32':
                    offset = writeBytes( buffer, offset, codec.encodeUInt32( value ) );
                    break;
                case 'int32' :
                case 'sInt32':
                    offset = writeBytes( buffer, offset, codec.encodeSInt32( value ) );
                    break;
                case 'float':
                    writeBytes( buffer, offset, codec.encodeFloat( value ) );
                    offset += 4;
                    break;
                case 'double':
                    writeBytes( buffer, offset, codec.encodeDouble( value ) );
                    offset += 8;
                    break;
                case 'string':
                    var length = codec.byteLength( value );

                    //Encode length
                    offset = writeBytes( buffer, offset, codec.encodeUInt32( length ) );
                    //write string
                    codec.encodeStr( buffer, offset, value );
                    offset += length;
                    break;
                default :
                    if( !!protos.__messages[ type ] ) {
                        //Use a tmp buffer to build an internal msg
                        var tmpBuffer = new ArrayBuffer( codec.byteLength( JSON.stringify( value ) ) );
                        var length    = 0;

                        length = encodeMsg( tmpBuffer, length, protos.__messages[ type ], value );
                        //Encode length
                        offset = writeBytes( buffer, offset, codec.encodeUInt32( length ) );
                        //contact the object
                        for( var i = 0; i < length; i++ ) {
                            buffer[ offset ] = tmpBuffer[ i ];
                            offset++;
                        }
                    }
                    break;
            }

            return offset;
        }

        /**
         * Encode reapeated properties, simple msg and object are decode differented
         */
        function encodeArray( array, proto, offset, buffer, protos ) {
            var i = 0;

            if( util.isSimpleType( proto.type ) ) {
                offset = writeBytes( buffer, offset, encodeTag( proto.type, proto.tag ) );
                offset = writeBytes( buffer, offset, codec.encodeUInt32( array.length ) );
                for( i = 0; i < array.length; i++ ) {
                    offset = encodeProp( array[ i ], proto.type, offset, buffer );
                }
            }
            else {
                for( i = 0; i < array.length; i++ ) {
                    offset = writeBytes( buffer, offset, encodeTag( proto.type, proto.tag ) );
                    offset = encodeProp( array[ i ], proto.type, offset, buffer, protos );
                }
            }

            return offset;
        }

        function writeBytes( buffer, offset, bytes ) {
            for( var i = 0; i < bytes.length; i++, offset++ ) {
                buffer[ offset ] = bytes[ i ];
            }

            return offset;
        }

        function encodeTag( type, tag ) {
            var value = constant.TYPES[ type ] || 2;
            return codec.encodeUInt32( (tag << 3) | value );
        }
    })( 'undefined' !== typeof protobuf ? protobuf : module.exports, this );

    /**
     * decoder module
     */
    (function( exports, global ) {
        var protobuf   = exports;
        var MsgDecoder = exports.decoder = {};

        var codec = protobuf.codec;
        var util  = protobuf.util;

        var buffer;
        var offset = 0;

        MsgDecoder.init = function( protos ) {
            this.protos = protos || {};
        };

        MsgDecoder.setProtos = function( protos ) {
            if( !!protos ) {
                this.protos = protos;
            }
        };

        MsgDecoder.decode = function( route, buf ) {
            var protos = this.protos[ route ];

            buffer = buf;
            offset = 0;

            if( !!protos ) {
                return decodeMsg( {}, protos, buffer.length );
            }

            return null;
        };

        function decodeMsg( msg, protos, length ) {
            while( offset < length ) {
                var head = getHead();
                var type = head.type;
                var tag  = head.tag;
                var name = protos.__tags[ tag ];

                switch( protos[ name ].option ) {
                    case 'optional' :
                    case 'required' :
                        msg[ name ] = decodeProp( protos[ name ].type, protos );
                        break;
                    case 'repeated' :
                        if( !msg[ name ] ) {
                            msg[ name ] = [];
                        }
                        decodeArray( msg[ name ], protos[ name ].type, protos );
                        break;
                }
            }

            return msg;
        }

        /**
         * Test if the given msg is finished
         */
        function isFinish( msg, protos ) {
            return (!protos.__tags[ peekHead().tag ]);
        }

        /**
         * Get property head from protobuf
         */
        function getHead() {
            var tag = codec.decodeUInt32( getBytes() );

            return {
                type : tag & 0x7,
                tag  : tag >> 3
            };
        }

        /**
         * Get tag head without move the offset
         */
        function peekHead() {
            var tag = codec.decodeUInt32( peekBytes() );

            return {
                type : tag & 0x7,
                tag  : tag >> 3
            };
        }

        function decodeProp( type, protos ) {
            switch( type ) {
                case 'uInt32':
                    return codec.decodeUInt32( getBytes() );
                case 'int32' :
                case 'sInt32' :
                    return codec.decodeSInt32( getBytes() );
                case 'float' :
                    var _float = codec.decodeFloat( buffer, offset );
                    offset += 4;
                    return _float;
                case 'double' :
                    var _double = codec.decodeDouble( buffer, offset );
                    offset += 8;
                    return _double;
                case 'string' :
                    var length = codec.decodeUInt32( getBytes() );

                    var str = codec.decodeStr( buffer, offset, length );
                    offset += length;

                    return str;
                default :
                    if( !!protos && !!protos.__messages[ type ] ) {
                        var length = codec.decodeUInt32( getBytes() );
                        var msg    = {};
                        decodeMsg( msg, protos.__messages[ type ], offset + length );
                        return msg;
                    }
                    break;
            }
        }

        function decodeArray( array, type, protos ) {
            if( util.isSimpleType( type ) ) {
                var length = codec.decodeUInt32( getBytes() );

                for( var i = 0; i < length; i++ ) {
                    array.push( decodeProp( type ) );
                }
            }
            else {
                array.push( decodeProp( type, protos ) );
            }
        }

        function getBytes( flag ) {
            var bytes = [];
            var pos   = offset;
            flag      = flag || false;

            var b;

            do {
                b = buffer[ pos ];
                bytes.push( b );
                pos++;
            } while( b >= 128 );

            if( !flag ) {
                offset = pos;
            }
            return bytes;
        }

        function peekBytes() {
            return getBytes( true );
        }

    })( 'undefined' !== typeof protobuf ? protobuf : module.exports, this );

} );
pomelo_require.register( "pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js", function( exports, require, module ) {
    (function() {
        var JS_WS_CLIENT_TYPE    = 'js-websocket';
        var JS_WS_CLIENT_VERSION = '0.0.1';

        var Protocol     = window.Protocol;
        var Package      = Protocol.Package;
        var Message      = Protocol.Message;
        var EventEmitter = window.EventEmitter;

        var RES_OK         = 200;
        var RES_FAIL       = 500;
        var RES_OLD_CLIENT = 501;

        var MAX_REQ_ID = 2147483646;

        if( typeof Object.create !== 'function' ) {
            Object.create = function( o ) {
                function F() {
                }

                F.prototype = o;
                return new F();
            };
        }

        var root             = window;
        var pomelo           = Object.create( EventEmitter.prototype ); // object extend from object
        root.pomelo          = pomelo;
        var socket           = null;
        var reqId            = 0;
        var callbacks        = {};
        var handlers         = {};
        //Map from request id to route
        var routeMap         = {};
        var msgMap           = {};

        // 2017.11.03 spin retry, OBG
        var spinMsgMap       = {};
        var responseCaptureCb   = null;

        var responseTimerMap = {};

        var heartbeatInterval    = 0;
        var heartbeatTimeout     = 0;
        var nextHeartbeatTimeout = 0;
        var gapThreshold         = 100;   // heartbeat gap threashold
        var heartbeatId          = null;
        var heartbeatTimeoutId   = null;

        var handshakeCallback = null;

        var handshakeBuffer = {
            'sys'  : {
                type    : JS_WS_CLIENT_TYPE,
                version : JS_WS_CLIENT_VERSION
            },
            'user' : {}
        };

        var initCallback  = null;
        var retryCount    = 0;
        var timeoutTimer  = null;
        var closeTimer    = null;
        var locCheckTimer = null;
        var SEND_TIMEOUT  = 10 * 1000;

        var _initiatedNetworkType = 'wifi';
        var _webSocket_connected  = false;

        pomelo.disconnecting = false;
        pomelo.disconnectCallback = null;
        pomelo.disconnectTime = 0;

        pomelo.init = function( params, cb , caFilePath = 'res/CAChain.pem' ) {
            initCallback = cb;
            var host     = params.host;
            var port     = params.port;

            var protocol = 'wss://';

            /**
             * todo : 커밋 전 무조건 주석. for local server
             */
                // host = '192.168.1.4';
                // protocol = 'ws://';

            var url      = protocol + host;

            if( port ) {
                url += ':' + port;
            }

            if( cc.sys.isNative ) {
                _initiatedNetworkType = g_JSB().getNetworkType();
            } else {
                _initiatedNetworkType = 'web';
            }
            // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ _initiatedNetworkType : ', _initiatedNetworkType );

            handshakeBuffer.user = params.user;
            handshakeCallback    = params.handshakeCallback;
            retryCount           = 0;

            initWebSocket( url, 'wss', caFilePath );
        };

        var initWebSocket = function( url, protocol, caFilePath ) {
            //RockN.Util.printDebugMessage( '[ pomelo ] initWebSocket ', 3 );
            cc.log( '##### [ pomelo ] initWebSocket' );
            //g_JSB().crashlyticsLog(3,"[NETWORK]", "initWebSocket");

            var initTimerID = null;

            var onopen = function( event ) {
                _webSocket_connected = true;
                RockN.ReceiveKickEvent = false;
                var obj              = Package.encode( Package.TYPE_HANDSHAKE, Protocol.strencode( JSON.stringify( handshakeBuffer ) ) );
                sendDirect( obj );

                clearResponseTimerAll();
                var eventStr = JSON.stringify( event );
                cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ onopen. event : ',eventStr );
                //g_JSB().crashlyticsLog(3,"[NETWORK]", "onopen :" + eventStr );

                clearTimeoutCB();
            };

            var onmessage = function( event ) {
                processPackage( Package.decode( event.data ) );
                // new package arrived, update the heartbeat timeout
                if( heartbeatTimeout ) {
                    nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
                }

                clearTimeoutCB();
            };

            var onerror = function( event ) {
                var eventStr = JSON.stringify( event );
                cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ onError. event : ', eventStr );
                //g_JSB().crashlyticsLog(3,"[NETWORK]", "onerror :" + eventStr );

                // if( RockN.NET.isReconnecting ) {
                //     if( typeof initCallback === 'function' ) {
                //         initCallback( 'Connection Error' );
                //         initCallback = null;
                //     } else {
                //         pomelo.emit( 'io-error', event );
                //     }
                // } else {
                //     pomelo.emit( 'io-error', event );
                // }

                if( typeof initCallback === 'function' ) {
                    initCallback( 'Connection Error' );
                    initCallback = null;
                } else {
                    pomelo.emit( 'io-error', event );
                }


                clearTimeoutCB();
                handleErrorConnection();
                handleDisconnectCallback();
            };

            var onclose = function( event ) {
                _webSocket_connected = false;
                var eventStr =JSON.stringify( event );
                cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ onClose. event : ', eventStr );
                //g_JSB().crashlyticsLog(3,"[NETWORK]", "onclose :" + eventStr );
                if( null !== socket ) {
                    // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ onClose. emit close | disconnect event.' );
                    pomelo.emit( 'close', event );
                    pomelo.emit( 'disconnect', event );

                    socket = null;

                    if( null !== heartbeatId ) {
                        clearTimeout( heartbeatId );
                        heartbeatId = null;
                    }

                    if( null !== heartbeatTimeoutId ) {
                        clearTimeout( heartbeatTimeoutId );
                        heartbeatTimeoutId = null;
                    }
                }
                clearTimeoutCB();
                handleErrorConnection();
                handleDisconnectCallback();
            };

            var initTimeoutCB = function() {
                // stopSubLoading();
                pomelo.disconnect();
                initCallback = null;
                initTimerID = null;

                // ShowReconnectLayer();
                cc.log( '[NETWORK] initTimeoutCB' );
                //g_JSB().crashlyticsLog(3,"[NETWORK]", "initTimeoutCB");
            };

            var clearTimeoutCB = function() {
                if( null !== initTimerID ) {
                    clearTimeout( initTimerID );
                    initTimerID = null;
                }
            };

            var handleErrorConnection = function() {
                // initCallback 있는 경우에는 이전 initWebsocket process 가 제대로 처리되지 않은 경우
                // initCallback을 null 로 만들고 reconnect 띄운다.
                if( initCallback ) {
                    initCallback = null;
                    stopSubLoading();
                    ShowReconnectLayer();
                }
            };

            initTimerID = setTimeout( initTimeoutCB, 10 * 1000 );

            socket            = new WebSocket( url, protocol, caFilePath ); // TODO: Test [ "ws://echo.websocket.org." - connected, "wss://echo.websocket.org" - not connected.. ]
            socket.binaryType = 'arraybuffer';
            socket.onopen     = onopen;
            socket.onmessage  = onmessage;
            socket.onerror    = onerror;
            socket.onclose    = onclose;

            //g_JSB().crashlyticsLog(3,"[NETWORK]", "initWebSocket end" );
        };

        pomelo.getSocket = function() {
            return socket;
        };

        var handleDisconnectCallback = function() {
            // 강제로 disconnect 시 close 이벤트 받은 후 콜백 처리
            if( typeof pomelo.disconnectCallback === 'function' ) {
                // 아래와 같이 직접 실행하는 경우 바로 재연결 시도 시 크래쉬
                // pomelo.disconnectCallback();

                // 아래와 같이 다음 태스크 큐에서 실행하게 하는 경우 크래쉬 발생하지 않음
                // setTimeout( pomelo.disconnectCallback, 0 );

                // 안정적인 실행을 위해선 100ms 이상 딜레이
                setTimeout( function() {
                    // 100ms 사이에 바뀔 수 있으므로 한번 더 검사
                    if( typeof pomelo.disconnectCallback === 'function' ) {
                        pomelo.disconnectCallback();
                    }
                    pomelo.disconnectCallback = null;
                    pomelo.disconnecting = false;
                }, 100 );

                cc.log( '[pomelo] close time: ' + ( Date.now() - pomelo.disconnectTime ) + 'ms' );
                //RockN.Util.printDebugMessage( '[ pomelo:handleDisconnect ] close time: ' + ( Date.now() - pomelo.disconnectTime ) + 'ms', 3 );
            } else {
                pomelo.disconnectCallback = null;
                pomelo.disconnecting = false;
            }

            if( closeTimer ) {
                clearTimeout( closeTimer );
            }
            closeTimer = null;

            pomelo.disconnectTime = 0;
        };

        pomelo.disconnect = function( callback ) {
            cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ DISCONNECT request' );
            //g_JSB().crashlyticsLog(3,"[NETWORK]", "disconnect start" );
            //RockN.Util.printDebugMessage( '[ pomelo:disconnect ]', 3 );
            if( socket ) {
                if( socket.disconnect ) {
                    //g_JSB().crashlyticsLog(3,"[NETWORK]", "disconnect  socket.disconnect" );
                    cc.log("[NETWORK] disconnect  socket.disconnect" );
                    socket.disconnect();
                }
                if( socket.close ) {
                    //g_JSB().crashlyticsLog(3,"[NETWORK]", "disconnect  socket.close" );
                    cc.log("[NETWORK] disconnect  socket.close" );
                    socket.close();
                }

                pomelo.disconnecting = true;
                pomelo.disconnectCallback = callback;
                pomelo.disconnectTime = Date.now();

                if( closeTimer ) {
                    clearTimeout( closeTimer );
                }
                closeTimer = setTimeout( handleDisconnectCallback, 10 * 1000 );

                cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ SOCKET is not null' );

                socket = null;
            } else {
                if( typeof callback === 'function' ) {
                    pomelo.disconnecting = true;
                    setTimeout( function() {
                        callback();
                        pomelo.disconnecting = false;
                    }, 300 );
                } else {
                    pomelo.disconnecting = false;
                }
                pomelo.disconnectCallback = null;

                cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ SOCKET is NULL.' );
            }

            //clearResponseTimerAll();
            // pomelo.resetAllPackets();

            if( null !== heartbeatId ) {
                clearTimeout( heartbeatId );
                heartbeatId = null;
            }

            if( null !== heartbeatTimeoutId ) {
                clearTimeout( heartbeatTimeoutId );
                heartbeatTimeoutId = null;
            }

            //g_JSB().crashlyticsLog(3,"[NETWORK]", "disconnect end" );
            cc.log("[NETWORK] disconnect end" );
        };

        pomelo.request = function( route, msg, cb ) {
            // //RockN.KEYBOARD_STATUS.LOCK = false;
            if( arguments.length === 2 && typeof msg === 'function' ) {
                cb  = msg;
                msg = {};
            }
            else {
                msg = msg || {};
            }
            route = route || msg.route;
            if( !route ) {
                return;
            }

            reqId++;
            if( reqId >= MAX_REQ_ID ) {
                reqId = 0;
            }

            sendMessage( reqId, route, msg );

            // 2017.11.03 spin retry, OBG
            if( msg.hasOwnProperty( 'retryCount' ) === false ) {
                msg.retryCount = 0;
            } else {
                msg.retryCount++;
            }
            if( typeof cb === 'function' ) { // callback 있는 경우에만 처리
                spinMsgMap[ reqId ] = msg;
            }

            callbacks[ reqId ] = cb;
            routeMap[ reqId ]  = route;
            msgMap[ reqId ] = msg;

            //fbinst
            cc.log("[PACKET REQUEST] " + route + " : " + JSON.stringify(msg));
        };

        ////////////////////////////////////////////////////////
        // 2019.05.21 OBG
        // Gate 서버 connector http로 변경하면서 함수 추가

        pomelo.webRequest = function( params, route, msg, cb ) {

            if (!route) {
                return;
            }

            reqId++;
            if (reqId >= MAX_REQ_ID) {
                reqId = 0;
            }

            msg = msg || {};

            var url;
            if (params==null)  {
                url = route + "?id=" + reqId + "&passport=rockncash";
            }
            else {
                url = "https://" + params.host + ":" + params.port + "/" + route + "?id=" + reqId + "&passport=rockncash";
            }
            sendXHRRequest( url, msg, cb );
        };

        pomelo.gateRequest = function( route, msg, cb ) {
            this.webRequest( {
                host : SERVER_CONFIG.GATE_HOST,
                port : SERVER_CONFIG.GATE_PORT
            }, route, msg, cb );
        };

        var sendXHRRequest = function( url, msg, cb ) {
            var xhr = new XMLHttpRequest(); //cc.loader.getXMLHttpRequest();
            streamXHREvents( xhr, cb );

            // Gate 서버 연결은 POST 로만
            xhr.open( 'POST', url );
            xhr.timeout = 10000;
            //xhr.setRequestHeader( "Content-Type", "application/json" );
            xhr.setRequestHeader( "Content-Type", "text/plain" );       //preflight 방지를 위해

            if( msg ) {
                if( legacy_cc.isObject( msg ) ) {
                    msg = JSON.stringify( msg );
                } else {
                    cc.warn( '[Pomelo:sendXHRRequest] msg is not object' );
                }
                xhr.send( msg );
            } else {
                cc.warn( '[Pomelo:sendXHRRequest] msg is undefined' );
                xhr.send();
            }
        };

        var streamXHREvents = function( xhr, cb ) {
            // Simple events
            // [ 'loadstart', 'abort', 'error', 'load', 'loadend', 'timeout' ].forEach( function( eventname ) {
            //     xhr[ "on" + eventname ] = function() {
            //         cc.log( 'xhr listen ' + 'on' + eventname );
            //     }
            // } );
            xhr.onload = function () {
                if( xhr._timeoutId === 0 || !!xhr._timeoutId ) {
                    clearTimeout( xhr._timeoutId );
                }

                if( xhr.readyState === 4 ) {
                    if( xhr.status === 200 ) {
                        if( legacy_cc.isFunction( cb ) ) {

                            var res = null;
                            try {
                                res = JSON.parse( xhr.responseText );
                            } catch( e ) {
                                cb( { code: RockN.CODE.ERROR, msg: e.message } );
                            }

                            !!res && cb( res.body );
                        }
                    } else {
                        if( legacy_cc.isFunction( cb ) ) {
                            cb( { code: RockN.CODE.ERROR } );
                        }
                    }
                }
            };

            xhr.onerror = function () {
                cb( { code: RockN.CODE.ERROR } );
            };
            if (xhr.ontimeout === undefined) {
                xhr._timeoutId = setTimeout(function () {
                    xhr.ontimeout();
                }, xhr.timeout);
            }
            xhr.ontimeout = function () {
                cb( { code: RockN.CODE.ERROR } );
            };
        };

        ////////////////////////////////////////////////////////

        pomelo.notify = function( route, msg ) {
            msg = msg || {};
            sendMessage( 0, route, msg );
        };

        /**
         * response-timeout 이벤트 리시버에서 사용되나 현재는 response-timeout 가 사용되지 않음
         * @param restoreData
         */
        pomelo.restoreRequest = function( restoreData ) {
            var keys = Object.keys( restoreData );
            if( keys.length !== 1 ) {
                cc.error( '########## restoreRequest ########## keys : ', JSON.stringify( keys ) );
            }
            var locItem = restoreData[ keys[ 0 ] ];
            send( locItem[ 'packet' ] );
        };

        pomelo.isSocketValid = function() {
            if( null === socket ) {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ socket is invalid. socket is null.' );
                return false;
            }

            if( socket.readyState !== WebSocket.OPEN ) {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ socket is invalid. socket state is not open. state : ', socket.readyState );
            }

            return socket.readyState === WebSocket.OPEN;
        };

        pomelo.isNetworkReachable = function() {

            return  navigator.onLine;
            //
            // var isOnLine = g_JSB().getNetworkStatus();
            // if( false === isOnLine ) {
            //     // 네트워크가 NotReachable 임. 즉, 3G/LTE 나 WIFI 상태가 아님
            //     // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ device network is off-line' );
            // }
            // return isOnLine;
        };

        pomelo.isNetworkDisConnected = function() {
            var isOpen = (!!socket && socket.readyState === WebSocket.OPEN);
            if( false === isOpen ) {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ web socket is closed.' );
            }

            var isOnLine = pomelo.isNetworkReachable();
            if( false === isOnLine ) {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ device network is off-line' );
            }

            RockN.IS_NETWORK_OFF_LINE = ( false === isOpen ) || ( false === isOnLine );
            return RockN.IS_NETWORK_OFF_LINE;
        };

        /**
         * 소켓이 연결되었을 때에는 와이파이였다가 패킷을 보내는 시점에는 3G / LTE 로 변경되었을 때
         * 패킷 응답을 못받는 것 때문에 추가한 함수
         * @return {boolean}
         */
        pomelo.isNetworkChangedToMobile = function() {
            if( 'wifi' === _initiatedNetworkType ) {
                var currNetworkType = g_JSB().getNetworkType();
                if( 'mobile' === currNetworkType ) {
                    return true;
                } else if( 'wifi' === currNetworkType ) {
                    // wifi -> wifi
                    return false;
                }
            }
            return false;
        };

        pomelo.checkNetworkState = function( cb ) {
            var locCheckCount = 0, callback = cb;
            RockN.IS_CHECKING_NETWORK = true;
            cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ start network check timer' );
            locCheckTimer = setInterval( function() {
                locCheckCount += 1;
                cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ curr. check count : ', locCheckCount );
                //RockN.Util.printDebugMessage( '[ pomelo:check ] curr. check count : ' + locCheckCount, 1 );
                var disconnected = pomelo.isNetworkDisConnected();
                if( true === disconnected || true === pomelo.isNetworkChangedToMobile() ) {
                    //if( false === pomelo.isNetworkReachable() || locCheckCount >= 7 ) {
                    if( true === pomelo.isNetworkReachable() || locCheckCount >= 7 ) {  //terry  리커넥트 복구 시간 단축. 조건을 (true === pomelo.isNetworkReachable()) 로 수정
                        cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ clear network check timer' );
                        clearInterval( locCheckTimer );
                        locCheckTimer             = null;
                        RockN.IS_CHECKING_NETWORK = false;
                        callback( false );
                    }

                } else {
                    cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ network restore' );
                    clearInterval( locCheckTimer );
                    locCheckTimer             = null;
                    RockN.IS_CHECKING_NETWORK = false;
                    callback( true );
                }
            }, 100 );       //terry  setInterval 간격을 1000 에서 100으로 단축
        };

        pomelo.resetAllPackets = function() {
            cc.log( '[Pomelo:resetAllPackets] routeMap count: ' + Object.keys( routeMap ).length );
            cc.log( '[Pomelo:resetAllPackets] callbacks count: ' + Object.keys( callbacks ).length );
            routeMap = {};
            callbacks = {};
            msgMap = {};
            spinMsgMap = {};

            // 버퍼 비움. 2019.01.30
            pomelo.clearBuffer();

            // 2019.02.18 @OBG
            // reconnect 또는 scene 전환 이전에 check network 중이었다면 clear 시킴
            if( locCheckTimer ) {
                clearInterval( locCheckTimer );
                locCheckTimer = null;
            }

            // 2019.02.20 @OBG
            // packet 초기화 후 response timer 도 초기화시킴
            clearResponseTimerAll();
        };

        pomelo.resendAllPackets = function() {
            for( var reqId in routeMap ) {
                if( routeMap.hasOwnProperty( reqId ) && callbacks.hasOwnProperty( reqId ) && msgMap.hasOwnProperty( reqId ) ) {
                    sendMessage( reqId, routeMap[ reqId ], msgMap[ reqId ] );
                }
            }
        };

        pomelo.clearBuffer = function() {
            __buffer__ = [];
            __checkNetworkBuffer__ = [];
        };

        pomelo.sendHeartBeat = function (){
            if (pomelo.isNetworkDisConnected()===false) {
                var packet = Package.encode(Package.TYPE_HEARTBEAT);
                !!socket && socket.send( packet.buffer );
            }
        };

        //패킷 응답 캡처
        pomelo.setResponseCaptureCallback = function (cb){
            responseCaptureCb = cb; //bool function(route, request, response)
        };

        // reConnect 함수로 리커넥트 중일 때 true
        // netHandler 에서만 컨트롤할 것!
        pomelo.isReconnecting = false;

        var __buffer__ = [];
        var __checkNetworkBuffer__ = [];

        var sendMessage = function( reqId, route, msg ) {

            if( -1 !== route.indexOf('request') ) {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ SEND MESSAGE. route : %s // protocol : %s', route, msg['protocol'] );
            }
            else {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ SEND MESSAGE. route : ', route );
            }

            var packetObj = {
                id    : reqId,
                route : route,
                msg   : msg
            };

            // 2019.01.30 @OBG
            // 패킷 복구를 위해 _send 직전 buffer 에 푸쉬
            // 이렇게 안하면 unstable 후 재연결할 때 __buffer__ 비움

            // __buffer__.push( {
            //     id    : reqId,
            //     route : route,
            //     msg   : msg
            // } );

            var routeServer = '';

            function _send() {
                var locID = null, locRoute = null, locMsg = null;
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ buffer length : ', __buffer__.length );

                if( pomelo.isReconnecting ) {
                    // 패킷 복구를 위해 리커넥트 중엔 __checkNetworkBuffer__ 사용하지 않음
                    __buffer__.push( packetObj );
                } else {
                    __checkNetworkBuffer__.push( packetObj );
                    __buffer__ = __buffer__.concat( __checkNetworkBuffer__ );
                    __checkNetworkBuffer__ = [];
                }

                while( __buffer__.length > 0 ) {
                    var tempItem = __buffer__.shift();
                    // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ BUFFER ITEM : ', JSON.stringify(tempItem) );
                    locID        = tempItem[ 'id' ];
                    locRoute     = tempItem[ 'route' ];
                    locMsg       = tempItem[ 'msg' ];

                    var type = locID ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;

                    //compress message by protobuf
                    var protos = !!pomelo.data.protos ? pomelo.data.protos.client : {};
                    if( !!protos[ locRoute ] ) {
                        locMsg = protobuf.encode( locRoute, locMsg );
                    }
                    else {
                        locMsg = Protocol.strencode( JSON.stringify( locMsg ) );
                    }

                    var compressRoute = 0;
                    if( pomelo.dict && pomelo.dict[ locRoute ] ) {
                        locRoute      = pomelo.dict[ locRoute ];
                        compressRoute = 1;
                    }

                    locMsg     = Message.encode( locID, type, compressRoute, locRoute, locMsg );
                    var packet = Package.encode( Package.TYPE_DATA, locMsg );

                    if( typeof locRoute === 'string' ) {
                        routeServer = locRoute.split('.')[ 0 ];
                    }

                    // 2019.01.30 @OBG
                    // cashRace 는 playerID 인자를 받아들이지 않아 자주 에러가 나므로 timeout 콜백에서 제외
                    if( locID !== 0 && routeServer !== 'cashRace' ) {
                        // cc.log( '[pomelo:sendMessage] ' + locID + ': ' + locRoute + ', ' + JSON.stringify( tempItem[ 'msg' ] ) );
                        var responseTimerID       = setTimeout( responseTimeoutCB.bind( null, locRoute, tempItem[ 'msg' ] ), 30 * 1000 );
                        responseTimerMap[ locID ] = responseTimerID;
                    }

                    send( packet );
                }

            }

            // 임시 버퍼에 패킷 저장
            if( true === RockN.IS_CHECKING_NETWORK ) {
                cc.log( '>>>>>>>>> checking network. packetObj: ' + JSON.stringify( packetObj ) );
                __checkNetworkBuffer__.push( packetObj );
                return;
            }

            if( true === RockN.IS_SHOWING_CHECK_NETWORK ) {
                if( typeof route === 'string' ) {
                    routeServer = route.split('.')[ 0 ];
                }

                // 2019.01.30 @OBG
                // unstable 팝업이 떠 있는 상태에서 cashRace 패킷은 리턴
                // cashRace 아닌 패킷은 대부분 reconnect 관련 패킷임
                if( routeServer === 'cashRace' ) {
                    return;
                }

                // 2019.03.07 @OBG
                // unstable 팝업이 떠 있는 상태에서 reconnect 관련 패킷 아닌 인게임 관련 패킷도 리턴
                if( route === 'connector.gameHandler.request' || route === 'connector.gameHandler.requestBonusCenter' ) {
                    return;
                }
            }

            // disconnecting 중엔 send 안되게
            if( pomelo.disconnecting ) {
                return;
            }

            /**
             * 패킷을 보내기 전 소켓이 invalid 하고 reachable 상태가 아니면 상태 체크
             */

            if( true === pomelo.isNetworkDisConnected() || true === pomelo.isNetworkChangedToMobile() ) {

                pomelo.checkNetworkState( function( isConnected ) {
                    //RockN.Util.printDebugMessage( '[ pomelo:checkNetworkState ] callback', 3 );
                    //RockN.Util.printDebugMessage( '[ pomelo:checkNetworkState ] isConnected: ' + isConnected , 5 );

                    if( false === isConnected ) {
                        if( RockN.IS_SHOWING_CHECK_NETWORK === false ) {
                            // var pLayer = new CheckNetwork( function() {
                            //     _send();
                            // } );
                            // RockN.GameScene.addChild( pLayer, 9999 );

                            cc.log( '>>>>>>>>> network disconnected. packetObj: ' + JSON.stringify( packetObj ) );
                            //소켓이 끊긴경우
                            //1. 네트워크 Online 경우 : Connection Lost 팝업을 띄움
                            //2. 네트워크 Offline의 경우 : Unstable Network 팝업을 띄움
                            if (pomelo.isNetworkReachable())
                            {
                                //1번째 안 : Connection Lost 팝업을 띄움 (백그라운드 재접속 시킴, 실패시 게임 재시작)
                                /*var pRecLayer = new ReconnectLayer(function () {
                                    NetConnector.doReConnectProcess(function(){
                                        _send();
                                    }, function(){
                                        RockN.NET.clearResponseTimerWhenOnShow();
                                        SceneManager.getInstance().goToSplashScene();
                                    });
                                });
                                RockN.GameScene.addChild( pRecLayer, 9998 );
                                */

                                //2번째 안 : ConnectionLost팝업을 띄우지않고 자연스럽게 백그라운드 연결
                                reConnect(function(isSucceed) {
                                    if (true === isSucceed) {
                                        _send();
                                    } else {
                                        ShowReconnectLayer();
                                    }
                                });
                            }
                            else
                            {
                                //Unstable Network 팝업을 띄움
                                createCheckNetwork(function() {
                                    _send();
                                } );
                            }

                        }
                    }
                    else {
                        _send();
                    }
                } );

            }
            else {
                _send();
            }
        };

        var send = function( packet ) {
            // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ send heart beat' );
            !!socket && socket.send( packet.buffer );
        };

        var sendDirect = function( packet ) {
            !!socket && socket.send( packet.buffer );
        };

        pomelo.clearResponseTimerWhenOnShow = function() {
            clearResponseTimerAll();
        };

        /**
         * 서버로 패킷 보낸 뒤 응답이 늦어지면(30초 이상) reconnect 팝업 spawn
         */
        var responseTimeoutCB = function( route, msg ) {
            // cc.error( '########## [ responseTimeoutCB ] ########## response time out' );
            cc.error( '########## [ responseTimeoutCB ] ########## responseTimerMap : ', JSON.stringify(responseTimerMap) );
            //RockN.Util.printDebugMessage( '[ pomelo:responseTimeoutCB ]', 5 );
            if( route ) {
                //RockN.Util.printDebugMessage( '[ pomelo:responseTimeoutCB ] route: ' + route , 5 );
                cc.error( '########## [ responseTimeoutCB ] ########## route : ' + route );
            }
            if( msg ) {
                //RockN.Util.printDebugMessage( '[ pomelo:responseTimeoutCB ] msg: ' + JSON.stringify( msg ) , 5 );
                cc.error( '########## [ responseTimeoutCB ] ########## msg : ' + JSON.stringify( msg ) );
            }
            //RockN.Util.printDebugMessage( '[ pomelo:responseTimeoutCB ] socket valid: ' + pomelo.isSocketValid(), 5 );

            //socket = null;
            //pomelo.emit( 'response-timeout', responseTimerMap );

            // var pLayer = new ReconnectLayer();
            // if( !!RockN.GameScene ) {
            //     RockN.GameScene.addChild( pLayer, 9998 );
            // }
            if( RockN.IS_SHOWING_CHECK_NETWORK === false ) {
                ShowReconnectLayer();
            }

            //pomelo.disconnect();

            clearResponseTimerAll();
        };

        var clearResponseTimer = function( id ) {
            var locTimerID = responseTimerMap[ id ];
            // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ clear response. : ', locTimerID);
            if( undefined === locTimerID || null === locTimerID ) {
                // cc.log( '[ pomelo:responseTimeoutCB ] no response timer: ' + id );
                // cc.log( '[ pomelo:responseTimeoutCB ] maps: ' + JSON.stringify( Object.keys( responseTimerMap ) ) );
                return;
            }

            clearTimeout( locTimerID );
            delete responseTimerMap[ id ];
        };

        var clearResponseTimerAll = function() {
            for( var key in responseTimerMap ) {
                var timerID = responseTimerMap[ key ];
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ clearResponseTimerAll. id and timer id : ', key, timerID );
                clearTimeout( timerID );
                delete responseTimerMap[ key ];
            }
        };

        var handler = {};

        var sendHeartBeat = function( packet ) {
            if( true === pomelo.isNetworkChangedToMobile() ) {
                if( null === timeoutTimer ) {
                    timeoutTimer = setTimeout( function() {
                        //RockN.Util.printDebugMessage( '[ pomelo:sendHeartBeat ] mobile time out. wifi -> mobile', 3 );
                        // var pLayer = new ReconnectLayer();
                        // if( !!RockN.GameScene ) {
                        //     RockN.GameScene.addChild( pLayer, 9998 );
                        // }

                        // ShowReconnectLayer();
                        //
                        // pomelo.disconnect();

                        // 2019.01.30 @OBG
                        // unstable 후 복구 시도
                        createCheckNetwork(function() {
                            !!socket && socket.send( packet.buffer );
                        } );
                    }, SEND_TIMEOUT );
                }
            } else {
                if( null !== timeoutTimer ) {
                    clearTimeout( timeoutTimer );
                    timeoutTimer = null;
                }
            }

            !!socket && socket.send( packet.buffer );
        };

        var heartbeat = function( data ) {
            // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ receive heartbeat.' );
            if( !heartbeatInterval ) {
                // no heartbeat
                return;
            }

            if( !!timeoutTimer ) {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ 서버로 심박수 체크를 받았는데,, 네트워크 변경 체크 타이머가 있다?' );
                // clearTimeout( timeoutTimer );
                // timeoutTimer = null;
            }

            var obj = Package.encode( Package.TYPE_HEARTBEAT );
            if( heartbeatTimeoutId ) {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ clear heart beat time out id : ', heartbeatTimeoutId );
                clearTimeout( heartbeatTimeoutId );
                heartbeatTimeoutId = null;
            }

            if( heartbeatId ) {
                // already in a heartbeat interval
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ already in a heartbeat interval' );
                return;
            }

            heartbeatId = setTimeout( function() {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ web socket. SEND TYPE_HEARTBEAT.' );
                sendHeartBeat( obj );

                nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
                heartbeatTimeoutId   = setTimeout( heartbeatTimeoutCb, heartbeatTimeout );

                clearTimeout( heartbeatId );
                heartbeatId = null;
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ heart beat timeout id : ', heartbeatTimeoutId );
            }, heartbeatInterval );
            // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ heart beat id : ', heartbeatId );
        };

        var heartbeatTimeoutCb = function() {
            var gap = nextHeartbeatTimeout - Date.now();
            if( gap > gapThreshold ) {
                heartbeatTimeoutId = setTimeout( heartbeatTimeoutCb, gap );
            }
            else {
                cc.error( 'server heartbeat timeout' );
                pomelo.emit( 'heartbeat timeout' );
                pomelo.disconnect();
            }
        };

        var handshake = function( data ) {
            data = JSON.parse( Protocol.strdecode( data ) );
            if( data.code === RES_OLD_CLIENT ) {
                //RockN.Util.printDebugMessage( '[ pomelo:handshake ] client version not fullfill', 7 );
                pomelo.emit( 'error', 'client version not fullfill' );
                return;
            }

            if( data.code !== RES_OK ) {
                //RockN.Util.printDebugMessage( '[ pomelo:handshake ] handshake fail', 7 );
                pomelo.emit( 'error', 'handshake fail' );
                return;
            }

            //RockN.Util.printDebugMessage( '[ pomelo ] handshake ', 3 );
            handshakeInit( data );

            var obj = Package.encode( Package.TYPE_HANDSHAKE_ACK );
            sendDirect( obj );
            if( initCallback ) {
                initCallback( null );
                initCallback = null;
            }
        };

        var onData = function( data ) {
            var msg = Message.decode( data );

            if( !!timeoutTimer ) {
                // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ 서버로 부터 데이터를 받았을 때, network 변경 감지 타이머 삭제' );
                clearTimeout( timeoutTimer );
                timeoutTimer = null;
            }

            var requestMsg = null;
            if( msg.id > 0 ) {
                clearResponseTimer( msg.id );

                msg.route = routeMap[ msg.id ];
                // cc.log( '[pomelo:onData] ' + msg.id + ': ' + msg.route );
                delete routeMap[ msg.id ];
                if( !msg.route ) {
                    return;
                }

                requestMsg = msgMap[ msg.id ];
                delete msgMap[ msg.id ];
            }

            msg.body = deCompose( msg );

            processMessage( pomelo, msg );

            if (responseCaptureCb != null)
            {
                try {
                    responseCaptureCb(msg.route, requestMsg, msg.body);
                }
                catch(e)
                {
                }
            }
        };

        var onKick = function( data ) {
            // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ web socket. receive kick. data : ', JSON.stringify(data) );
            RockN.ReceiveKickEvent = true;
            pomelo.emit( 'onKick' );
        };

        handlers[ Package.TYPE_HANDSHAKE ] = handshake;
        handlers[ Package.TYPE_HEARTBEAT ] = heartbeat;
        handlers[ Package.TYPE_DATA ]      = onData;
        handlers[ Package.TYPE_KICK ]      = onKick;

        var processPackage = function( msg ) {
            handlers[ msg.type ]( msg.body );
        };

        var processMessage = function( pomelo, msg ) {
            if( !msg.id ) {
                if( msg.route !== "crashGame" && msg.route !== "crashGame.update" )
                    cc.log("[PACKET NOTI] " + msg.route  + " : " + JSON.stringify(msg.body));
                // server push message
                pomelo.emit( msg.route, msg.body );
                return;
            }

            //if have a id then find the callback function with the request
            var cb = callbacks[ msg.id ];

            delete callbacks[ msg.id ];
            if( typeof cb !== 'function' ) {
                return;
            }

            // 2017.11.03 spin retry, OBG
            // web의 build.js 에서 가져옴
            var msgObj = spinMsgMap[ msg.id ];
            delete spinMsgMap[ msg.id ];
            if( !!msgObj && msg.body.hasOwnProperty( 'protocol' ) && ( msg.body.protocol === SIG.SIG_SPIN_SLOT || msg.body.protocol === SIG.SIG_AUTO_SPIN ) ) {
                if( msg.body.code !== RockN.CODE.OK && msgObj.retryCount < 3 ) {
                    console.error('##### Spin error and retry: ' + msgObj.retryCount );
                    pomelo.request( msg.route, msgObj, cb );
                    return;
                }
            }

            cc.log("[PACKET RESPONSE] " + msg.route  + " : " + JSON.stringify(msg.body));
            cb( msg.body );
        };

        var processMessageBatch = function( pomelo, msgs ) {
            for( var i = 0, l = msgs.length; i < l; i++ ) {
                processMessage( pomelo, msgs[ i ] );
            }
        };

        var deCompose = function( msg ) {
            var protos = !!pomelo.data.protos ? pomelo.data.protos.server : {};
            var abbrs  = pomelo.data.abbrs;
            var route  = msg.route;

            //Decompose route from dict
            if( msg.compressRoute ) {
                if( !abbrs[ route ] ) {
                    return {};
                }

                route = msg.route = abbrs[ route ];
            }
            if( !!protos[ route ] ) {
                return protobuf.decode( route, msg.body );
            }
            else {
                return JSON.parse( Protocol.strdecode( msg.body ) );
            }

            return msg;
        };

        var handshakeInit = function( data ) {
            // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ hand-shake init : ', JSON.stringify(data) );
            if( data.sys && data.sys.heartbeat ) {
                heartbeatInterval = data.sys.heartbeat * 1000;   // heartbeat interval
                heartbeatTimeout  = heartbeatInterval * 2;        // max heartbeat timeout
            }
            else {
                heartbeatInterval = 0;
                heartbeatTimeout  = 0;
            }

            // cc.log( '★★★★★★★★★★ [ NETWORK ] ★★★★★★★★★★ hand shake init.', data, heartbeatInterval, heartbeatTimeout );
            initData( data );

            if( typeof handshakeCallback === 'function' ) {
                handshakeCallback( data.user );
            }
        };

        //Initilize data used in pomelo client
        var initData = function( data ) {
            if( !data || !data.sys ) {
                return;
            }
            pomelo.data = pomelo.data || {};
            var dict    = data.sys.dict;
            var protos  = data.sys.protos;

            //Init compress dict
            if( dict ) {
                pomelo.data.dict  = dict;
                pomelo.data.abbrs = {};

                for( var route in dict ) {
                    pomelo.data.abbrs[ dict[ route ] ] = route;
                }
            }

            //Init protobuf protos
            if( protos ) {
                pomelo.data.protos = {
                    server : protos.server || {},
                    client : protos.client || {}
                };
                if( !!protobuf ) {
                    protobuf.init( {
                        encoderProtos : protos.client,
                        decoderProtos : protos.server
                    } );
                }
            }
        };

        module.exports = pomelo;
    })();

} );
pomelo_require.register( "boot/index.js", function( exports, require, module ) {
    var Emitter         = require( 'emitter' );
    window.EventEmitter = Emitter;

    var protocol    = require( 'pomelo-protocol' );
    window.Protocol = protocol;

    var protobuf    = require( 'pomelo-protobuf' );
    window.protobuf = protobuf;

    var pomelo    = require( 'pomelo-jsclient-websocket' );
    window.pomelo = pomelo;

} );
pomelo_require.alias( "boot/index.js", "pomelo-client/deps/boot/index.js" );
pomelo_require.alias( "component-emitter/index.js", "boot/deps/emitter/index.js" );
pomelo_require.alias( "component-indexof/index.js", "component-emitter/deps/indexof/index.js" );

pomelo_require.alias( "NetEase-pomelo-protocol/lib/protocol.js", "boot/deps/pomelo-protocol/lib/protocol.js" );
pomelo_require.alias( "NetEase-pomelo-protocol/lib/protocol.js", "boot/deps/pomelo-protocol/index.js" );
pomelo_require.alias( "NetEase-pomelo-protocol/lib/protocol.js", "NetEase-pomelo-protocol/index.js" );

pomelo_require.alias( "pomelonode-pomelo-protobuf/lib/client/protobuf.js", "boot/deps/pomelo-protobuf/lib/client/protobuf.js" );
pomelo_require.alias( "pomelonode-pomelo-protobuf/lib/client/protobuf.js", "boot/deps/pomelo-protobuf/index.js" );
pomelo_require.alias( "pomelonode-pomelo-protobuf/lib/client/protobuf.js", "pomelonode-pomelo-protobuf/index.js" );

pomelo_require.alias( "pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js", "boot/deps/pomelo-jsclient-websocket/lib/pomelo-client.js" );
pomelo_require.alias( "pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js", "boot/deps/pomelo-jsclient-websocket/index.js" );
pomelo_require.alias( "pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js", "pomelonode-pomelo-jsclient-websocket/index.js" );

pomelo_require( 'boot' );




// //앱이 백그라운드에서 포그라운드로 복구되었을때 소켓이 끊긴 상태이면 바로 복구 시켜준다.
// //네트워크 복구
// (function(){
//     // cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
//     // 	//cc.game.pause();
//     // });
//     cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {

//         var sceneType = null;
//         if (RockN && RockN.GameScene)
//         {
//             sceneType = RockN.GameScene.getTypeOfScene();
//         }
//         if ( SCENE_TYPE.LOBBY === sceneType ||
//             SCENE_TYPE.SLOT === sceneType )
//         {
//             if (RockN.NET.isNetworkDisConnected())
//             {
//                 RockN.NET.notify( 'connector.gameHandler.heartbeat', {
//                     playerID : RockN.Player.playerID
//                 } );
//             }
//         }


//     });

// })();

