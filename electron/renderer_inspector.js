
var Renderer_inspector = {
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
        Genie.Utils.drawAllComponentInspector( node );
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

}



