class NodeInfo {

    constructor( ccNode ) {
        this._ccNode = ccNode;
    }
}

var InspectorRenderer = {
    formData : {},
    formMeta : {},
    options  : {},
    currCocosNode : null,

    init : function() {
        cc.eventManager.addCustomListener( 'refreshInspector', this.onChangeCurrentNode.bind(this) );
    },

    // 메인뷰 나 hierarchy 뷰에서 현재 노드를 바꿨을 때 호출
    onChangeCurrentNode : function( event ) {
        var userData = event.getUserData();
        var node = userData.node;
        if( !node || node === this.currCocosNode ) {
            return;
        }

        this.currCocosNode = node;

        this.clear();
        GST.Utils.drawAllComponentInspector( node );
    },

    clear : function() {
        $(`#inspector`).empty();
    },

    // inspector 에서 속성이 바뀌면 호출
    onChangeProperty : function( grid, name, value ) {
        console.log(name + ' ' + value);
        this.formData[ name ] = value;
        cc.eventManager.dispatchCustomEvent( "onChangeProperty", {
            property : name,
            value    : value
        })
    },

//region [ sample ]
    //     var theObj = {
    //         font: 'Consolas',
    //         fontSize: 14,
    //         fontColor: '#a3ac03',
    //         jQuery: true,
    //         modernizr: false,
    //         framework: 'angular',
    //         iHaveNoMeta: 'Never mind...',
    //         iAmReadOnly: 'I am a label which is not editable'
    //     };
    //
    //     var theMeta = {
    //         // Since string is the default no nees to specify type
    //         font: { group: 'Editor', name: 'Font', description: 'The font editor to use'},
    //         // The "options" would be passed to jQueryUI as its options
    //         fontSize: { group: 'Editor', name: 'Font size', type: 'number', options: { min: 0, max: 20, step: 2 }},
    //         // The "options" would be passed to Spectrum as its options
    //         fontColor: { group: 'Editor', name: 'Font color', type: 'color', options: { preferredFormat: 'hex' }},
    //         // since typeof jQuery is boolean no need to specify type, also since "jQuery" is also the display text no need to specify name
    //         jQuery: { group: 'Plugins', description: 'Whether or not to include jQuery on the page' },
    //         // We can specify type boolean if we want...
    //         modernizr: {group: 'Plugins', type: 'boolean', description: 'Whether or not to include modernizr on the page'},
    //         framework: {name: 'Framework', group: 'Plugins', type: 'options', options: ['None', {text:'AngularJS', value: 'angular'}, {text:'Backbone.js', value: 'backbone'}], description: 'Whether to include any additional framework'},
    //         iAmReadOnly: { name: 'I am read only', type: 'label', description: 'Label types use a label tag for read-only properties', showHelp: false }
    //
    //     };
    //
    //     // Options object
    //     var options = {
    //         meta: theMeta,
    //         customTypes: theCustomTypes,
    //         // default help "icon" is text in brackets, can also provide FontAwesome HTML for an icon (see examples)
    //         helpHtml: '[?]',
    //         callback: propertyChangedCallback,
    //         // Allow collapsing property group. default to false.
    //         isCollapsible: true,
    //         // Sort properties, accept boolean or a sort function. default to false.
    //         sort: true,
    //     };
    //
    //     // Callback function. Called when any entry in the grid is changedCallback
    //     function propertyChangedCallback(grid, name, value) {
    //     // handle callback
    //     console.log(name + ' ' + value);
    // }
    // // This is the customTypes object that describes additionnal types, and their renderers (optional)
    // var theCustomTypes = {
    //     ref: { // name of custom type
    //         html: function(elemId, name, value, meta) { // custom renderer for type (required)
    //             var onclick = '';
    //             valueHTML = value + ' <i class="fa fa-external-link" onclick="selectRef(\'' + value + '\')"></i>';
    //             return valueHTML;
    //         },
    //         valueFn: false // value-return function (optional). If unset, default will be "function() { return $('#' + elemId).val(); }", set to false to disable it
    //         // You can also put a makeValueFn function (taking elemId, name, value, meta parameters) to create value-return function on the fly (it will override valuefn setting), returning non-function will disable getting value for this property
    //     }
    // };
    //
    // $(`#inspector`).jqPropertyGrid( theObj, options );
//endregion

}



