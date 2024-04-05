// const { sentryRendererInit } = require('./sentryRenderer');
// sentryRendererInit();

var Renderer_hierarchy = {
    Tag                 : "[ Renderer_hierarchy ] ",
    hierarchyData       : [],
    nodeInstanceIDMap   : {},
    arrNodeIDToDelete   : [],
    rootLayer           : null,
    curTargetNode       : null,

    MenuPrefix : {
        Node                : "Node",
        Sprite              : "SpriteNode",
        PopupComponent      : "Popup",      // 컴포넌트 이름과 같아야 함.
        ARGroupComponent    : "ARGroup",    //
        CodeComponent       : "Code",
        EmptyComponent      : "Empty",

        UI_ROOT             : "UI Root",
        UI_Layout           : "UI Layout",
        UI_Image            : "UI Image",
        UI_Button           : "UI Button",
        UI_BMFont           : "UI BITMAP Font",
        UI_TEXT             : "UI True Type Font"
    },

    init : function( rootLayer ) {
        this.rootLayer = rootLayer;
        this._initJSTree();

        cc.eventManager.addCustomListener('onRefreshHierarchy', this.onRefreshTree.bind(this));
        cc.eventManager.addCustomListener( 'onSelectNodeInMainView', this.onSelectNode.bind(this));
        cc.eventManager.addCustomListener('onRenameTreeNode', this.renameTreeNode.bind(this) );
    },

    //region [ jsTree ]
    _initJSTree : function() {
        // root node 생성 ( main layer )
        this.addTreeNode(
            this.rootLayer.__instanceId,
            "#",
            "Root"
        );
        this.nodeInstanceIDMap[ this.rootLayer.__instanceId ] = this.rootLayer;

        var self = this;
        this._jstreeConfig = {
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
                    "addNode"       : {
                        "label"     : "add Node",
                        "submenu"   : {}
                    },
                    "addUI"         : {
                        "label"     : "add UI",
                        "submenu"   : {}
                    },
                    "addComponent"  : {
                        "label"     : "add Component",
                        "submenu"   : {}
                    },
                    "deleteNode"    : {
                        "label"     : "delete Node",
                        "action"    : self.onDeleteNodeByMenu.bind(self)
                    },
                    "deleteComponent" : {
                        "label"     : "delete Component",
                        "submenu"   : {}
                    },
                }
            },
            "plugins": ["search", "contextmenu"],
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        }

        this._initContextMenu();

        $('#hierarchy').jstree( this._jstreeConfig );

        // 트리 노드 선택 시 이벤트 등록
        $('#hierarchy').on("changed.jstree", this.onchangeSelectedNode.bind(this));

        // tree node 드레그 스타트 리스너 등록
        // $('#hierarchy').on("dragstart", this.onDragStartTreeNode );

        // 노드 검색 시 이벤트 등록
        $('#hierarchy_findInput').change( this.onchangeInputFind );
    },

    _initContextMenu : function() {
        var addNodeSubMenu = this._jstreeConfig["contextmenu"]["items"]["addNode"]["submenu"];
        this._addSubMenu( addNodeSubMenu, this.MenuPrefix.Node, this.onAddNodeByMenu, this );
        this._addSubMenu( addNodeSubMenu, this.MenuPrefix.Sprite, this.onAddNodeByMenu, this );

        var addUISubMenu = this._jstreeConfig["contextmenu"]["items"]["addUI"]["submenu"];
        this._addSubMenu( addUISubMenu, this.MenuPrefix.UI_ROOT, this.onAddUIByMenu, this );
        this._addSubMenu( addUISubMenu, this.MenuPrefix.UI_Layout, this.onAddUIByMenu, this );
        this._addSubMenu( addUISubMenu, this.MenuPrefix.UI_Image, this.onAddUIByMenu, this );
        this._addSubMenu( addUISubMenu, this.MenuPrefix.UI_Button, this.onAddUIByMenu, this );
        this._addSubMenu( addUISubMenu, this.MenuPrefix.UI_BMFont, this.onAddUIByMenu, this );
        this._addSubMenu( addUISubMenu, this.MenuPrefix.UI_TEXT, this.onAddUIByMenu, this );

        var addComponentSubMenu = this._jstreeConfig["contextmenu"]["items"]["addComponent"]["submenu"];
        this._addSubMenu( addComponentSubMenu, this.MenuPrefix.PopupComponent, this.onAddComponentByMenu, this );
        this._addSubMenu( addComponentSubMenu, this.MenuPrefix.CodeComponent, this.onAddComponentByMenu, this );
        this._addSubMenu( addComponentSubMenu, this.MenuPrefix.EmptyComponent, this.onAddComponentByMenu, this );
        // this._addSubMenu( addComponentSubMenu, this.MenuPrefix.ARGroupComponent, this.onAddComponentByMenu, this )
    },

    _addSubMenu : function( targetMenu, strMenu, selector, target ) {
        targetMenu[ strMenu ] = { "label" : strMenu, "action" : selector.bind( target ) };
    },

    onAddNodeByMenu : function( obj ) {
        var parentNodeId = parseInt( obj.reference.prevObject[0].id );
        var parentNode   = this.nodeInstanceIDMap[parentNodeId];

        if( parentNode ) {
            var newNode = new cc.Node();
            newNode.setName( "newNode");

            parentNode.addChild( newNode );
            this.addTreeNode( newNode.__instanceId, parentNodeId, "newNode", newNode );
            $(`#hierarchy`).jstree("refresh");
        }
    },

    onAddUIByMenu : function( obj ) {
        var currNodeId  = parseInt( obj.reference.prevObject[0].id );
        var currNode    = this.nodeInstanceIDMap[ currNodeId ];
        var ui_name     = obj.item.label; // ex) ui_root, ui_layout ...
        var uiNode, uiWidget;
        if( currNode ) {
            switch ( ui_name ) {
                case this.MenuPrefix.UI_ROOT:
                    uiNode = new ccui.Layout();
                    uiNode.addComponent( new Genie.Component.UIRoot );
                    uiNode.addComponent( new Genie.Component.UIActionView );
                    currNode.addChild( uiNode );

                    this.addTreeNode( uiNode.__instanceId, currNodeId, "default", uiNode );
                    break;

                case this.MenuPrefix.UI_Layout:
                    uiWidget = new ccui.Layout();
                    currNode.addChild( uiWidget );
                    this.addTreeNode( uiWidget.__instanceId, currNodeId, "panel", uiWidget );
                    break;

                case this.MenuPrefix.UI_Image:
                    uiWidget = new ccui.ImageView();
                    currNode.addChild( uiWidget );
                    this.addTreeNode( uiWidget.__instanceId, currNodeId, "image", uiWidget );
                    break;

                case this.MenuPrefix.UI_Button:
                    uiWidget = new ccui.Button();
                    currNode.addChild( uiWidget );
                    this.addTreeNode( uiWidget.__instanceId, currNodeId, "button", uiWidget );
                    break;

                case this.MenuPrefix.UI_BMFont:
                    uiWidget = new ccui.LabelBMFont();
                    currNode.addChild( uiWidget );
                    this.addTreeNode( uiWidget.__instanceId, currNodeId, "bm font", uiWidget );
                    break;

                case this.MenuPrefix.UI_TEXT:
                    uiWidget = new ccui.Text();
                    currNode.addChild( uiWidget );
                    this.addTreeNode( uiWidget.__instanceId, currNodeId, "ttf", uiWidget );
                    break;

            }
        }

        $(`#hierarchy`).jstree("refresh");
    },

    onAddComponentByMenu : function( obj ) {
        var currNodeId = parseInt( obj.reference.prevObject[0].id );
        var currNode = this.nodeInstanceIDMap[ currNodeId ];
        var compName = obj.item.label;
        if( currNode ) {
            var component = new Genie.Component[ compName ];
            if( component ) {
                currNode.addComponent( component );
                component.drawInspector();
            }
        }
    },

    onDeleteNodeByMenu : function( obj ) {
        var targetNodeID = parseInt( obj.reference.prevObject[0].id );
        var targetNode   = this.nodeInstanceIDMap[targetNodeID];
        var parentNode   = targetNode.getParent();

        this.arrNodeIDToDelete.length = 0;

        if( targetNode && parentNode ) {
            this.setIDListToDelete( targetNode );

            var i, nodeID, node;
            for( i = 0; i < this.arrNodeIDToDelete.length; ++i ) {
                nodeID = this.arrNodeIDToDelete[i];
                node   = this.nodeInstanceIDMap[nodeID];
                this.deleteTreeNode( node.__instanceId );
            }

            Genie.GizmoController.detachGizmoByTargetNode( targetNode );
            targetNode.removeFromParent();

            this.onRefreshTree();
        }
    },

    setIDListToDelete : function( targetNode ) {
        var i, child, children = targetNode.getChildren();
        if( this.arrNodeIDToDelete.indexOf(targetNode.__instanceId) < 0) {
            this.arrNodeIDToDelete.push( targetNode.__instanceId );
        }

        for( i = 0; i < children.length; ++i ) {
            child = children[i];
            this.setIDListToDelete( child );
        }
    },


    // 트리 노드 드레그 시작
    onDragStartTreeNode : function( e ) {
        cc.log( Renderer_hierarchy.Tag, "*** drag start *** : ", e.target.innerText );
        e.originalEvent.dataTransfer.setData( "nodeName", e.target.innerText );
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

        if( data.node && data.node.id ) {
            var realNode = this.nodeInstanceIDMap[data.node.id];
            if( realNode ) {
                cc.eventManager.dispatchCustomEvent( "onChangeNodeInHierarchy", { node : realNode } );
                cc.eventManager.dispatchCustomEvent( "refreshInspector", { node : realNode });
                cc.eventManager.dispatchCustomEvent( EVT.TOOL.SELECT_NODE, { targetNode : realNode } );
                this.curTargetNode = realNode;
            }
            else {
                console.log( "not exist node in nodeInstanceIDMap : ", data.node.id );
            }
        }
    },

    // main view 에서 노드 선택 시
    onSelectNode : function( event ) {
        var userData= event.getUserData();
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
        this.addTreeNode( id, parentID, cocosNode.getName(), cocosNode );

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
                loc_parentID = cocosNode.__instanceId;
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

    renameTreeNode : function( event ) {
        var userData= event.getUserData();
        var name    = userData.name;
        var id      = userData.id;

        var treeNode    = $('#hierarchy').jstree(true).get_node( id );
        if( treeNode ) {
            var findIdx = this.hierarchyData.findIndex( function( item ){
                return item.id === id;
            });

            if( findIdx >= 0 ) {
                this.hierarchyData[findIdx].text = name;
            }

            $('#hierarchy').jstree('refresh');
        }
    },

    deleteTreeNode : function( id) {
        var findIdx = this.hierarchyData.findIndex( function( treeNode ) {
            return ( treeNode.id === id );
        } );

        if( findIdx < 0 ) {
            return;
        }

        this.hierarchyData.splice( findIdx, 1 );
        delete this.nodeInstanceIDMap[id];
    },

    isExistNode : function( id, parentID ) {
        var findOjb = this.hierarchyData.find( function (item){
            return ( item.parent === parentID && item.id === id );
        })

        return !!findOjb;
    },

    getTargetNode : function () {
        return this.curTargetNode;
    }
}