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
    },

    init : function( rootLayer ) {
        this.rootLayer = rootLayer;
        this._initJSTree();

        cc.eventManager.addCustomListener('onRefreshHierarchy', this.onRefreshTree.bind(this));
        cc.eventManager.addCustomListener( 'onSelectNodeInMainView', this.onSelectNode.bind(this));
        cc.eventManager.addCustomListener('onRenameTreeNode', this.renameTreeNode.bind(this) );
    },

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
                    "addComponent"  : {
                        "label"     : "add Component",
                        "submenu"   : {}
                    },
                    "deleteNode"    : {
                        "label"     : "delete Node",
                        "action"    : self.onDeleteNodeByMenu.bind(self)
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

    //region [ jsTree ]

    _initContextMenu : function() {
        const addNodeSubMenu = this._jstreeConfig["contextmenu"]["items"]["addNode"]["submenu"];
        this._addSubMenu( addNodeSubMenu, this.MenuPrefix.Node, this.onAddNodeByMenu, this );
        this._addSubMenu( addNodeSubMenu, this.MenuPrefix.Sprite, this.onAddNodeByMenu, this );

        const addComponentSubMenu = this._jstreeConfig["contextmenu"]["items"]["addComponent"]["submenu"];
        this._addSubMenu( addComponentSubMenu, this.MenuPrefix.PopupComponent, this.onAddComponentByMenu, this );
        this._addSubMenu( addComponentSubMenu, this.MenuPrefix.CodeComponent, this.onAddComponentByMenu, this );
        this._addSubMenu( addComponentSubMenu, this.MenuPrefix.EmptyComponent, this.onAddComponentByMenu, this );
        // this._addSubMenu( addComponentSubMenu, this.MenuPrefix.ARGroupComponent, this.onAddComponentByMenu, this )
    },

    _addSubMenu : function( targetMenu, strMenu, selector, target ) {
        targetMenu[ strMenu ] = { "label" : strMenu, "action" : selector.bind( target ) };
    },

    onAddNodeByMenu : function( obj ) {
        const parentNodeId = parseInt( obj.reference.prevObject[0].id );
        const parentNode   = this.nodeInstanceIDMap[parentNodeId];

        if( parentNode ) {
            const newNode = new cc.Node();
            newNode.setName( "newNode");

            parentNode.addChild( newNode );
            this.addTreeNode( newNode.__instanceId, parentNodeId, "newNode", newNode );
            $(`#hierarchy`).jstree("refresh");
        }
    },

    onAddComponentByMenu : function( obj ) {
        const currNodeId = parseInt( obj.reference.prevObject[0].id );
        const currNode = this.nodeInstanceIDMap[ currNodeId ];
        const compName = obj.item.label;
        if( currNode ) {
            const component = new Genie.Component[ compName ];
            if( component ) {
                currNode.addComponent( component );
                component.drawInspector();
            }
        }
    },

    onDeleteNodeByMenu : function( obj ) {
        const targetNodes = Genie.ToolController.getSelectedNodes();
        this.deleteSelectedNodes(targetNodes);
    },

    /**
     * delete every selected nodes
     * @param nodes {Array}
     */
    deleteSelectedNodes : function (nodes) {
        const idsToDelete = new Set();
        // mainLayer can't be deleted.
        const nodesToDelete = nodes.filter((node) => {
            return node.getName() !== "mainLayer";
        });

        // 삭제할 ID 수집
        nodesToDelete.forEach((node) => {
            this.collectIDsToDelete(node, idsToDelete);
            if (node.getParent()) {
                Genie.GizmoController.detachGizmoByTargetNode( node );
                node.removeFromParent();
            }
        });

        // 삭제 수행
        idsToDelete.forEach((id) => {
            const nodeToDelete = this.nodeInstanceIDMap[id];
            if (nodeToDelete) {
                this.deleteTreeNode( nodeToDelete.__instanceId );
                // .ExportJson 파일이 캐싱되어 있으면 캐싱도 삭제
                const tempFileName = nodeToDelete.getName() + '.ExportJson';
                if (cc.loader.cache[tempFileName]) {
                    // 관련 종속 파일도 확인해야 함.
                        // 관련 종속 파일 레퍼런스가 추가로 있으면 ?
                            // 지우면 안됨
                        // 현재 파일만 종속되어 있다면 ?
                            // 관련 파일도 같이 날려야 함.
                    Genie.RefChecker.decrease(tempFileName);
                    const configFilePath = cc.loader.cache[tempFileName].config_file_path;
                    const configFilePng = cc.loader.cache[tempFileName].config_png_path;

                    configFilePath.forEach((path) => {
                        const pathArr = path.split('/')
                        const name = pathArr[pathArr.length - 1];
                        Genie.RefChecker.decrease(name);
                    });

                    configFilePng.forEach((name) => {
                        Genie.RefChecker.decrease(name);
                    });

                    const removeFiles = Genie.RefChecker.getRemoveFileList();
                    removeFiles.forEach((fileName) => {
                        const extName = cc.path.extname( fileName ).toLowerCase();
                        let key = 'image/' + fileName;
                        switch ( extName ) {
                            case '.plist':
                                cc.log("[Resource] plist spriteFrameCache 에서 삭제 : ", key);
                                cc.spriteFrameCache.removeSpriteFramesFromFile(key);
                                break;
                            case '.png':
                                cc.log("[Resource] png textureCache 에서 삭제 : ", key);
                                cc.textureCache.removeTextureForKey(key);
                                cc.log("[Resource] png loader.cache 에서 삭제 : ", fileName);
                                cc.loader.release(fileName);
                                break;
                            case '.fnt':

                                break;
                            case '.exportjson':
                                return;
                        }
                        cc.log("[Resource] 파일 loader.cache 에서 삭제 : ", key);
                        Renderer_assets.deleteAssetFile(key);
                        cc.loader.release(key);
                    });
                    if (Genie.RefChecker.canRemove(tempFileName)) {
                        cc.log("[Resource] 파일 loader.cache 에서 삭제 : ", tempFileName);

                        cc.loader.release(tempFileName);
                        Renderer_assets.deleteAssetFile(tempFileName);
                    }
                    Renderer_assets.onRefreshTree();
                }
            }
        });

        this.onRefreshTree();
    },

    /**
     * 삭제할 노드에게 종속 된 모든 instanceId >> idsToDelete 로 수집
     * @param targetNode {Object}
     * @param idsToDelete {Set}
     */
    collectIDsToDelete : function (targetNode, idsToDelete) {
        const stack = [targetNode];
        while (stack.length > 0) {
            const currNode = stack.pop();
            if (!idsToDelete.has(currNode.__instanceId)) {
                idsToDelete.add(currNode.__instanceId);

                const children = currNode.getChildren();
                children.forEach((child) => stack.push(child));
            }
        }
    },

    /**
     * @deprecated use collectIDsToDelete instead
     */
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
        const searchString = event.target.value;
        $('#hierarchy').jstree('search', searchString);
    },

    // hierarchy view 에서 선택 노드 변경시
    onchangeSelectedNode : function (e, data) {
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
        const userData = event.getUserData();
        const node     = userData.node;
        const id       = node.__instanceId;

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

        const cocosNodeId = cocosNode.__instanceId;
        this.addTreeNode(cocosNodeId, parentID, cocosNode.getName(), cocosNode);

        if(cocosNode.getChildren) {
            const children = cocosNode.getChildren();
            children.forEach((child) => {
                const isContinue = cocosNode._className === "Armature" && (child._className === "Bone" && child._parentBone);
                !isContinue && this.refreshTree( child, cocosNodeId, cocosNode);
            });
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
        if(this.isExistNode(id, parentID))
            return;
        this.nodeInstanceIDMap[id] = realNode;
        this.hierarchyData.push({
            "id"        : id,
            "parent"    : parentID,
            "text"      : text
        });
    },

    renameTreeNode : function( event ) {
        const userData = event.getUserData();
        const name     = userData.name;
        const id       = userData.id;

        const treeNode    = $('#hierarchy').jstree(true).get_node( id );
        if( treeNode ) {
            this.hierarchyData.some((item) => {
                if (item.id === id) {
                    item.text = name;
                    return true;
                }
                return false;
            });
            $('#hierarchy').jstree('refresh');
        }
    },

    deleteTreeNode : function(id) {
        this.hierarchyData = this.hierarchyData.filter((node) => {
            return node.id !== id;
        });
        if (this.nodeInstanceIDMap.hasOwnProperty(id)) {
            delete this.nodeInstanceIDMap[id];
        }
    },

    /** @returns {boolean} */
    isExistNode : function( id, parentID ) {
        return this.hierarchyData.some(item => item.parent === parentID && item.id === id);
    },

    getTargetNode : function () {
        return this.curTargetNode;
    },

    getRealNodeByInstanceId : function (instanceId) {
        return this.nodeInstanceIDMap[instanceId] || null;
    },
}