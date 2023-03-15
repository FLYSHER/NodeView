var HierarchyRenderer = {
    hierarchyData : [],
    rootLayer     : null,

    init : function( rootLayer ) {
        this.rootLayer = rootLayer;

        $('#hierarchy').jstree({
            'core' : {
                'data' : [
                ]
            },
            "plugins": ["search"],
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        });
        $('#hierarchy').on("changed.jstree", function (e, data) {
            console.log( e, data );
            var selectedFileName = data.selected[0];
        });

        cc.eventManager.addCustomListener('onRefreshHierarchy', this.onRefreshTree.bind(this));
    },

    onRefreshTree : function() {
        console.log("start");
        this.rootLayer && this.refreshTree( this.rootLayer );
        console.log("end");
        $("#hierarchy").jstree(true).settings.core.data = this.hierarchyData;
        $(`#hierarchy`).jstree("refresh");
    },

    refreshTree : function( cocosNode, _parentID ) {

        var parentID = _parentID;

        if( !parentID ) {
            parentID =  cocosNode.getParent() ?  cocosNode.getParent().getName() : '#';
        }

        if( parentID === "" ) {
            parentID = '#';
        }

        var id       = cocosNode.getName();

        console.log( "** refreshTree *** ", id, parentID );
        if( id === "" ) {

        }
        else {
            this.addTreeNode( parentID, id, id );
        }

        if( cocosNode && cocosNode.getChildren  ) {
            var child, children = cocosNode.getChildren();
            parentID = undefined;
            // scrollview, listview, pageview
            if( cocosNode instanceof  ccui.ScrollView ) {
                var widgetParent = cocosNode.getInnerContainer().getWidgetParent();
                if( widgetParent ) {
                    parentID = widgetParent.getName();
                }
            }
            for( var i = 0; i < children.length; ++i ) {
                child = children[i];
                this.refreshTree( child, parentID );
            }
        }


    },

    isExistNode : function( parentID, id ) {
        var findOjb = this.hierarchyData.find( function (item){
            return ( item.parent === parentID && item.id === id );
        })

        return !!findOjb;
    },

    addTreeNode : function( parentID, id, text  ) {
        if( this.isExistNode( parentID, id ) ) {
            return;
        }

        this.hierarchyData.push({
            "id"        : id,
            "parent"    : parentID,
            "text"      : text
        });
    }





}