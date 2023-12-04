var Renderer_hierarchy = {
    Tag                 : "[ Renderer_hierarchy ] ",
    hierarchyData       : [],
    nodeInstanceIDMap   : {},
    rootLayer           : null,

    init : function( rootLayer ) {
        this.rootLayer = rootLayer;

        $('#hierarchy').jstree({
            'core' : {
                'themes' : {
                    "name": "default-dark",
                    "dots": false,
                    "icons": false
                },
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
                                    var instanceID = obj.reference.prevObject[0].id;
                                    var realNode = Renderer_hierarchy.nodeInstanceIDMap[ instanceID ];

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
                            var instanceID = obj.reference.prevObject[0].id;
                            var realNode = Renderer_hierarchy.nodeInstanceIDMap[ instanceID ];
                            cc.eventManager.dispatchCustomEvent('onDeleteNode', { cocosNode : realNode })
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

        // 트리 노드 선택 시 이벤트 등록
        $('#hierarchy').on("changed.jstree", this.onchangeSelectedNode.bind(this));

        // 노드 검색 시 이벤트 등록
        $('#hierarchy_findInput').change( this.onchangeInputFind );

        cc.eventManager.addCustomListener('onRefreshHierarchy', this.onRefreshTree.bind(this));
        cc.eventManager.addCustomListener( 'onSelectNodeInMainView', this.onSelectNode.bind(this));
    },

    onchangeInputFind : function( event ) {
        console.log("find assets > ", event.target.value );
        var searchString = event.target.value;
        $('#hierarchy').jstree('search', searchString);
    },

    // hierarchy view 에서 선택 노드 변경시
    onchangeSelectedNode : function (e, data) {
        console.log( e, data );
        var selectedFileName = data.selected[0];
        cc.log("selectedFileName > ", selectedFileName );

        if( data.node && data.node.id ) {
            var realNode = this.nodeInstanceIDMap[data.node.id];
            if( realNode ) {
                cc.eventManager.dispatchCustomEvent( "onChangeNodeInHierarchy", { node : realNode } );
                cc.eventManager.dispatchCustomEvent( "refreshInspector", { node : realNode });

            }
            else {
                console.log( "not exist node in nodeInstanceIDMap : ", data.node.id );
            }
        }
    },

    // main view 에서 노드 선택 시
    onSelectNode : function( event ) {
        var userData    = event.getUserData();
        var node    = userData.node;
        var id      = node.__instanceId;

        $("#hierarchy").jstree("deselect_all");
        $("#hierarchy").jstree(true).select_node( id.toString() );

    },

    // jstree를 데이터 대로 재구성
    onRefreshTree : function() {
        this.rootLayer && this.refreshTree( this.rootLayer, "#" );

        $("#hierarchy").jstree(true).settings.core.data = this.hierarchyData;
        $(`#hierarchy`).jstree("refresh");
    },

    // 최상위 노드부터 다시 트리 데이터 세팅
    refreshTree : function( cocosNode, parentID ) {
        console.log("** refreshTree ** ");
        // console.log("   > ", cocosNode.getName(), cocosNode.__instanceId, cocosNode._className );

        var id       = cocosNode.__instanceId;

        if( id !== this.rootLayer.__instanceId ) {
            this.addTreeNode( id, parentID, cocosNode.getName(), cocosNode );
        }

        if( !!cocosNode && cocosNode.getChildren ) {

            var i, loc_parentID, child,
                children = cocosNode.getChildren();


            for( i = 0; i < children.length; ++i ) {
                child = children[i];

                // armature 의 자식들 본 중에 부모가 없는거만 처리
                if( cocosNode._className === "Armature" ) {
                    if( child._className === "Bone" && child._parentBone ) {
                        continue;
                    }
                }
                console.log("       > ", child.getName(), child.__instanceId, child._className );
                loc_parentID = cocosNode.__instanceId === this.rootLayer.__instanceId ? "#" : cocosNode.__instanceId;
                this.refreshTree( children[i], loc_parentID, cocosNode  );
            }
        }
    },

    /** 계층 패널에 노드 추가
     *   ㄴ 실제로 jstree에 추가할 트리 데이터 세팅
     * @param id        추가할 노드 인스턴스 아이디
     * @param parentID  부모 노드 인스턴스 아이디
     * @param text      계층 패널에 보일 노드명 ( 실제 코코스 노드와 같은 이름 )
     * @param realNode  실제 코코스 노드
     */
    addTreeNode : function( id, parentID, text, realNode  ) {
        // cc.log( Renderer_hierarchy.Tag, " ** addTreeNode ** ", id, parentID, text, realNode );

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

}