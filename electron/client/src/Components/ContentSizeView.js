var GST = GST || {};

GST.Component = GST.Component || {};
GST.Component.Base = cc.Component.extend({
    ctor : function () {
        this._super();
    },

    onEnter : function () {
        this._super();
    },

    // 인스펙터에 그리고 싶으면 한다.
    drawInspector : function() {
        throw Error('Do Override ');
    },
});
GST.Component.ContentSizeViewer = GST.Component.Base.extend({
    ctor : function () {
        this._super();
    },

    onEnter : function () {
        this._super();

    },

    // do overried
    drawInspector : function() {

    },
});

// 소유자의 타입이 uiWidget 이어야 함.
GST.Component.UIActionView = GST.Component.Base.extend({
    ctor : function( name, jsonName ) {
        this._super();
        this.setName( name );
        this._jsonName = jsonName;
    },

    onEnter : function() {
        this._super();
    },

    checkValid : function() {
        var ok = this._owner;
        ok &&= this._owner instanceof  ccui.Widget;
        ok &&= cc.isString( this._jsonName );
        return ok;
    },

    //override
    drawInspector : function() {
        var rootDiv = document.createElement('div');
        rootDiv.className = 'component_root';
        $(`#inspector`).append( rootDiv );

        // title
        var title = document.createElement('p');
        title.className = 'component_title';
        title.innerText = this._jsonName;
        rootDiv.append( title );

        var actionList = ccs.actionManager.getActionList( this._jsonName );
        if( !actionList ||  actionList.length <= 0 ) {
            var p = document.createElement('div');
            p.innerText = "not exist uiAction";
            rootDiv.appendChild( p );
        }
        else {
            var ul_ActionList = document.createElement('ul');
            rootDiv.appendChild( ul_ActionList);

            var i, actionObj, actionName, li_actionObj, btn_actionObj;
            for( i = 0; i < actionList.length; ++i ){
                actionObj   = actionList[i];
                actionName  = actionObj.getName();

                li_actionObj = document.createElement('li');
                btn_actionObj = document.createElement('button');
                btn_actionObj.innerText = actionName;
                btn_actionObj.onclick = function( jsonName, uiActionName ) {
                    ccs.actionManager.playActionByName( jsonName, uiActionName, cc.callFunc( function(){
                        // todo 종료
                    }, this));
                }.bind( this, this._jsonName, actionName );

                li_actionObj.appendChild( btn_actionObj );
                ul_ActionList.append( li_actionObj );
            }
        }
    },
});

// 기본 노드 프로퍼티
GST.Component.NodePropertyView = GST.Component.Base.extend({
    ctor : function ( name ) {
        this._super();
        var loc_name = name || "GST.Component.NodePropertyView";
        this.setName( loc_name );
    },

    onEnter : function () {
        this._super();
        this.initJQPG(); // jqPropertygrid initialize
    },

    // do overried
    drawInspector : function() {

        this.refreshNodeAllProperty();
        // $('#inspector').jqPropertyGrid( this.formData, this.options );

        // In order to get back the modified values:
        var theNewObj = $('#node_property').jqPropertyGrid('get');
        console.log( "theNewObj > ", theNewObj );
    },

    // 프로퍼티 그리드 폼 세팅.
    initJQPG : function() {
        this.formData = {};

        // 프로퍼티 그리드 컨피그 세팅
        var formMeta = {
            x   : { group : 'transform', type : "number", name : "x", options: { min: -3000, max: 3000, step: 1.0 } },
            y   : { group : 'transform', type : "number", name : "y", options: { min: -3000, max: 3000, step: 1.0 }  },
            scaleX      : { group : 'transform', type : "number", name : "scaleX" , options: { min: 0, max: 10.0, step: 0.01 }},
            scaleY      : { group : 'transform', type : "number", name : "scaleY" , options: { min: 0, max: 10.0, step: 0.01 }},
            anchorX     : { group : 'transform', type : "number", name : "anchorX", options: { min: 0, max: 1.0, step: 0.1 }  },
            anchorY     : { group : 'transform', type : "number", name : "anchorY", options: { min: 0, max: 1.0, step: 0.1 }  },

            _className   : { group : 'property', type : "label",   name : "_className" },
            name        : { group : 'property', type : "label",   name : "name" },
            visible     : { group : 'property', type : "boolean", name : "visible" },
            width       : { group : 'property', type : "number",  name : "width" },
            height       : { group : 'property', type : "number",  name : "height" },
        }

        var theCustomTypes = {
            ref: { // name of custom type
                html: function(elemId, name, value, meta) { // custom renderer for type (required)
                    var onclick = '';
                    valueHTML = value + ' <i class="fa fa-external-link" onclick="selectRef(\'' + value + '\')"></i>';
                    return valueHTML;
                },
                valueFn: true // value-return function (optional). If unset, default will be "function() { return $('#' + elemId).val(); }", set to false to disable it
                // You can also put a makeValueFn function (taking elemId, name, value, meta parameters) to create value-return function on the fly (it will override valuefn setting), returning non-function will disable getting value for this property
            }
        };

        function propertyChangedCallback(grid, name, value) {
            // handle callback
            console.log(name + ' ' + value);
        }

        // 옵션 세팅
        this.options = {
            meta        : formMeta,
            customTypes : theCustomTypes,
            helpHtml    : '[?]', // default help "icon" is text in brackets, can also provide FontAwesome HTML for an icon (see examples)
            callback    :  this.onChangeProperty.bind(this),//propertyChangedCallback,
            isCollapsible: false,    // Allow collapsing property group. default to false.
            sort        : false,             // Sort properties, accept boolean or a sort function. default to false.
        }

    },

    refreshNodeAllProperty : function() {
        var owner = this.getOwner();
        this.setPropertyValue( 'x', owner.getPositionX() );
        this.setPropertyValue( 'y', owner.getPositionY() );
        this.setPropertyValue( 'anchorX', owner._getAnchorX() );
        this.setPropertyValue( 'anchorY', owner._getAnchorY() );
        this.setPropertyValue( 'scaleX', owner.getScaleX() );
        this.setPropertyValue( 'scaleY', owner.getScaleY() );

        this.setPropertyValue( 'name', owner.getName() );
        this.setPropertyValue( '_className', owner._className );
        this.setPropertyValue( 'visible', owner.isVisible() );
        this.setPropertyValue( 'width', owner.width );
        this.setPropertyValue( 'height', owner.height );

        $('#inspector').jqPropertyGrid( this.formData, this.options );
    },

    // 실제 노드의 값을 바꾸고 폽 데이터도 바꿈.
    setPropertyValue : function( name, value ) {
        if( this.getOwner() ) {
            this.getOwner()[ name ] = value;
        }

        this.formData[ name ] = value;
    },

    // inspector 에서 속성이 바뀌면 호출됨.
    onChangeProperty : function( grid, name, value ) {

        // In order to get back the modified values:
        // var theNewObj = $('#node_property').jqPropertyGrid('get');
        // cc.log("theNewObj", theNewObj );

        this.setPropertyValue( name, value );

    },

});