var HierarchyRenderer = {
    hierarchyData       : [],
    nodeInstanceIDMap   : {},
    rootLayer           : null,

    init : function( rootLayer ) {
        this.rootLayer = rootLayer;
        this.addTreeNode(
            this.rootLayer.__instanceId,
            "#",
            "mainLayer"
        );

        $('#hierarchy').jstree({
            'core' : {
                'data' : [
                ]
            },
            "contextmenu" : {
                "items" : {
                    "add" : {
                        "label" : "add",
                        "action" : function( obj ){
                            console.log("add > ", obj );
                        },
                        "submenu" : {
                            "node" : {
                                "label"     : "node",
                                "action"    : function( obj ) {
                                    console.log("add node > ", obj );
                                },
                            },

                            "component" : {
                                "label"     : "component",
                                "action"    : function( obj ) {
                                    console.log("add component > ", obj );
                                },
                            }
                        }
                    },
                    "delete" : {
                        "label" : "delete",
                        "action" : function( obj ){
                            if( !obj.hasOwnProperty( 'reference') ) {
                                console.log("check! : ", obj );
                            }

                            cc.eventManager.dispatchCustomEvent('onDeleteNode', { selectedID : obj.reference.prevObject[0].id })
                        },
                    }
                }

            },
            "plugins": ["search", "contextmenu"],
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        });
        $('#hierarchy').on("changed.jstree", function (e, data) {
            console.log( e, data );
            var selectedFileName = data.selected[0];

            if( data.node && data.node.id ) {
                var realNode = this.nodeInstanceIDMap[data.node.id];
                if( realNode ) {
                    cc.eventManager.dispatchCustomEvent( "refreshInspector", { node : realNode });
                }
                else {
                    console.log( "not exist node in nodeInstanceIDMap : ", data.node.id );
                }

            }
        }.bind(this));

        cc.eventManager.addCustomListener('onRefreshHierarchy', this.onRefreshTree.bind(this));
    },

    onRefreshTree : function() {
        this.rootLayer && this.refreshTree( this.rootLayer, "#" );
        $("#hierarchy").jstree(true).settings.core.data = this.hierarchyData;
        $(`#hierarchy`).jstree("refresh");
    },

    refreshTree : function( cocosNode, parentID ) {
        var id       = cocosNode.__instanceId;
        this.addTreeNode( id, parentID, cocosNode.getName(), cocosNode );

        if( !!cocosNode && cocosNode.getChildren ) {
            var i, loc_parentID,
                children = cocosNode.getChildren();

            for( i = 0; i < children.length; ++i ) {
                loc_parentID = cocosNode.__instanceId;
                this.refreshTree( children[i], loc_parentID, cocosNode  );
            }
        }

    },

    addTreeNode : function( id, parentID, text, realNode  ) {
        if( this.isExistNode( id, parentID ) ) {
            return;
        }

        this.nodeInstanceIDMap[id] = realNode;

        this.hierarchyData.push({
            "id"        : id,
            "parent"    : parentID,
            "text"      : text
        });
    },

    isExistNode : function( id, parentID ) {
        var findOjb = this.hierarchyData.find( function (item){
            return ( item.parent === parentID && item.id === id );
        })

        return !!findOjb;
    },



    // refreshTree : function( cocosNode, _parentID ) {
    //
    //     var parentID = _parentID;
    //
    //     if( !parentID ) {
    //         parentID =  cocosNode.getParent() ?  cocosNode.getParent().getName() : '#';
    //     }
    //
    //     if( parentID === "" ) {
    //         parentID = '#';
    //     }
    //
    //     var id       = cocosNode.getName();
    //
    //     console.log( "** refreshTree *** ", id, parentID );
    //     if( id === "" ) {
    //
    //     }
    //     else {
    //         this.addTreeNode( parentID, id, id );
    //     }
    //
    //     if( cocosNode && cocosNode.getChildren  ) {
    //         var child, children = cocosNode.getChildren();
    //         parentID = undefined;
    //         // scrollview, listview, pageview
    //         if( cocosNode instanceof  ccui.ScrollView ) {
    //             var widgetParent = cocosNode.getInnerContainer().getWidgetParent();
    //             if( widgetParent ) {
    //                 parentID = widgetParent.getName();
    //             }
    //         }
    //         for( var i = 0; i < children.length; ++i ) {
    //             child = children[i];
    //             this.refreshTree( child, parentID );
    //         }
    //     }
    // },
    //
    // isExistNode : function( parentID, id ) {
    //     var findOjb = this.hierarchyData.find( function (item){
    //         return ( item.parent === parentID && item.id === id );
    //     })
    //
    //     return !!findOjb;
    // },
    //
    // addTreeNode : function( parentID, id, text  ) {
    //     if( this.isExistNode( parentID, id ) ) {
    //         return;
    //     }
    //
    //     this.hierarchyData.push({
    //         "id"        : id,
    //         "parent"    : parentID,
    //         "text"      : text
    //     });
    // },





}