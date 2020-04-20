var UIScrollTreeViewCtrl = cc.Node.extend({
    _scrolling:false,
    _lastPoint:null,
    TAG_CLIPPERNODE  : 1,
    TAG_CONTENTNODE  : 2,
    _selectNode : null,
    _treeWidgetObj : {},
    _treeString : "",
    ctor : function () {
        this._super("");
        $('#widgetTree').jstree({
            'core' : {
                'data' : [
                ]
            }
        });
        var self = this;
        $('#widgetTree').on("changed.jstree", function (e, data) {
            if( !!data.node === false)
                return;
            var selectedObj = self._treeWidgetObj[ data.node.text ];
            if( !!selectedObj === false )
                return;

            if( selectedObj.obj.getNumberOfRunningActions() === 0 ) {
                var actionBy = cc.scaleBy(0.15, 1.2).easing( cc.easeElasticOut( 1.5 ));
                // selectedObj.obj.setScale(selectedObj.initScale);
                // selectedObj.obj.stopActionByTag(100);
                selectedObj.obj.runAction(cc.sequence(actionBy, actionBy.reverse())).setTag(100);
            }

            self.selectNode(selectedObj.obj);
        });


        $('#actionTree').jstree({
            'core' : {
                'data' : [
                ],
                'themes' : {
                    "dots" : false,
                    "icons" : null,
                }
            }
        });
        $('#actionTree').on("changed.jstree", function (e, data) {
            if( !!data.node === false)
                return;
            ccs.actionManager.playActionByName( self._jsonName , data.node.text );
        });

        this._jsonName = null;
    },

    setup:function () {

        $('#toggleVisible').click( function(){
            if(this._selectNode){
                this._selectNode.setVisible(!this._selectNode.isVisible());
                this.selectNode(this._selectNode);

            }
        }.bind(this));

        $('#openAll').click( function(){
            if( this.treeInfo ){
                $('#widgetTree').jstree("open_all");
            }
        }.bind(this));

        $('#closeAll').click( function(){
            if( this.treeInfo ){
                $('#widgetTree').jstree("close_all");
            }
        }.bind(this));

        $('#copyBtn').click( function(){
            if( this.treeInfo ){
                var obj = this.getTreeObjName();

                this._treeString = "this._uiWidgets = {\n";

                for( var key in obj ) {
                    this._treeString += obj[ key ].copyString;
                }

                this._treeString += "};";

                copyStringToClipboard( this._treeString );
            }
        }.bind(this));
    },


    setNode :function (node) {
        delete this.treeInfo;
        
        this._treeWidgetObj = {};
        this._selectNode = null;
        var treeObj = [];
        var actionObj = [];

        if(node && node.ui) {
            var childTree = this.createUIChildList(node.ui);

            this.treeInfo = [{
                info :{
                    obj : node.ui,
                    name : node.ui.getName(),
                    initScale : node.ui.getScale(),
                },
                childList : childTree
            }] ;

            //treeWidget
            this.drawTree(this.treeInfo, 0, 0, treeObj);


            //UI Action 추가되는 부분
            this._jsonName = node.getName() + '.ExportJson';
            var actionList = ccs.actionManager.getActionList(this._jsonName);
            for( var i = 0 ; i < actionList.length ; i++ ){
                var obj = {
                    'text' : actionList[i].getName()
                }
                actionObj.push(obj);
            }

        }


        $('#widgetTree').jstree(true).settings.core.data = treeObj;
        $('#widgetTree').jstree("refresh");
        $('#actionTree').jstree(true).settings.core.data = actionObj;
        $('#actionTree').jstree("refresh");

        var uiAnimationContainer = document.getElementById( "uiAnimationContainer" );

        if( actionObj.length > 0 ) {

            uiAnimationContainer.style.display = "block";
        }
        else {
            uiAnimationContainer.style.display = "none";
        }

        var visibleBtn = document.getElementById( "toggleVisible" );
        var openBtn = document.getElementById( "openAll" );
        var closeBtn = document.getElementById( "closeAll" );
        var copyBtn = document.getElementById( "copyBtn" );

        if( treeObj.length > 0 ) {
            visibleBtn.style.visibility = 'visible';
            openBtn.style.visibility = 'visible';
            closeBtn.style.visibility = 'visible';
            copyBtn.style.visibility = 'visible';
        }
        else {
            visibleBtn.style.visibility = 'hidden';
            openBtn.style.visibility = 'hidden';
            closeBtn.style.visibility = 'hidden';
            copyBtn.style.visibility = 'hidden';
        }
    },

    createUIChildList :function (node) {
        if(!node)
            return null;
        var childList = [];
        var children = node.getChildren();
        for(var  i=0; i< children.length; i++)  {
            childList[i] = {};
            childList[i].info ={};
            childList[i].info.obj = children[i];
            childList[i].info.name = children[i].getName();
            childList[i].info.initScale = children[i].getScale();
            childList[i].childList = this.createUIChildList(children[i]);
        }
        return childList;
    },

    createArChildList :function (node) {
        if(!node)
            return null;

        var childList = [];

        var boneDic = node.armatureData.getBoneDataDic();
        var i = 0;
        for (var b in boneDic){

            childList[i] = {};
            childList[i].info ={};
            childList[i].info.obj = boneDic[b];
            childList[i].info.name =  boneDic[b].name;
            i++;
        }
        return childList;
    },

    drawTree :function (treeInfo, depth, line, dataObj) {
        if(!treeInfo)
            return line;

        var len = treeInfo.length;
        for(var i = 0; i < len; i++) {
            line++;

             var info = treeInfo[i];
            var obj = {
                "text" : info.info.name,
                "state": {
                    "opened": false
                },
            };
            if( info.childList.length > 0){
                obj.children = [];
            }
            this._treeWidgetObj[ info.info.name ] = {};
            this._treeWidgetObj[ info.info.name ].obj = info.info.obj;
            this._treeWidgetObj[ info.info.name ].initScale = info.info.obj.getScale();
            dataObj.push( obj );

            line = this.drawTree(info.childList, depth+1, line, obj.children);
        }
        return line;
    },

    selectNode :function (nodeObj)
    {
        this._selectNode = nodeObj;

        if(this._selectNode.isVisible() )
            $('#toggleVisible').html('Hide');
        else
            $('#toggleVisible').html('Show');
        
        $('#localPos').html("(" + this._selectNode.getPosition().x.toFixed(2) + " , " +this._selectNode.getPosition().y.toFixed(2) + ")");
        $('#LocalSize').html("(" + this._selectNode.getContentSize().width.toFixed(2) + " , " +this._selectNode.getContentSize().height.toFixed(2) + ")");

        //TODO 이거 왜 안되냐
        if( typeof nodeObj.setString === 'function'  ){
            if( nodeObj.getString() === ''){
                nodeObj.setString("434510");
            }
        }


        var rect = this._selectNode.getBoundingBox();
        var po = this._selectNode.getParent().convertToWorldSpace( cc.p(rect.x, rect.y));



        if(rect.width < 5)
            rect.width = 10;
        if (rect.height < 5 )
            rect.height = 10;

        Gizmo_DrawTouchLayerByRect(
            cc.rect(po.x, po.y, rect.width, rect.height)
        );

    },

    getTreeObjName: function() {
        var length = Object.keys( this._treeWidgetObj ).length;
        var treeArrName = {};
        var treeObjName = [];

        for( var key1 in this._treeWidgetObj ) {
            treeArrName [ key1 ] = {};
            treeArrName [ key1 ].name = key1;
            treeArrName [ key1 ].copyString = key1 + " : null,\n";
            treeObjName[ treeObjName.length ] = key1;
        }

        for( var loop1 = 0; loop1 < length; loop1++ ) {
            var name = treeObjName[ loop1 ];
            var subString1 = name.substring( 0, name.length - 2 );
            var subString2 = name.substring( name.length - 2, name.length );

            if( subString2 === '01' ) {
                var find = true;
                var idx = 1;
                var addTreeNameArr = null;

                while( find ) {
                    for( var key2 in treeArrName ) {
                        // console.log( key + '=>' + this._treeWidgetObj[ key ] );

                        var objName = subString1 + ( idx < 10 ? '0' + idx : idx );
                        find = false;

                        if( objName === 'lbFpTt03' ) {
                            console.log( objName );
                        }

                        if( key2 === objName ) {
                            addTreeNameArr = subString1;
                            find = true;
                            idx++;

                            delete treeArrName[ key2 ];

                            break;
                        }
                    }
                }
            }

            if( addTreeNameArr ) {
                treeArrName [ addTreeNameArr ] = {};
                treeArrName [ addTreeNameArr ].name = addTreeNameArr;
                treeArrName [ addTreeNameArr ].copyString = addTreeNameArr + " : [],\n";
                addTreeNameArr = null;
            }
        }

        return treeArrName;
    }
});

