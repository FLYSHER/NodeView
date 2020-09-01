var UIScrollTreeViewCtrl = cc.Node.extend({
    _scrolling:false,
    _lastPoint:null,
    TAG_CLIPPERNODE  : 1,
    TAG_CONTENTNODE  : 2,
    _selectNode : [],
    _masterNode : null,
    _treeWidgetObj : {},
    _treeString : "",
    ctor : function () {
        this._super("");
        $('#widgetTree').jstree({
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

        $(document).ready(function () {
            $(".searchNode").keyup(function () {
                var searchString = $(this).val();
                $('#widgetTree').jstree('search', searchString);
            });
        });

        var self = this;
        $('#widgetTree').on("changed.jstree", function (e, data) {
            if( !!data.node === false)
                return;

            if( data.selected.length < 2 ){
                var selectedObj = self._treeWidgetObj[ data.node.id ];
                if( !!selectedObj === false )
                    return;

                if( selectedObj.obj.getNumberOfRunningActions() === 0 ) {

                    var actionBy = cc.scaleBy(0.15, 1.2).easing( cc.easeElasticOut( 1.5 ));

                    $('#scaleValue').html("("+selectedObj.initScaleX+" , "+selectedObj.initScaleY+")");
                    selectedObj.obj.runAction(cc.sequence(actionBy, actionBy.reverse())).setTag(100);
                }

                self.selectNode(selectedObj.obj);
            }
            else {
                var objArr = [];
                for ( var i = 0 ; i < data.selected.length ; i ++ ){
                    var selectedObj = self._treeWidgetObj[ data.selected[i] ];
                    if( !!selectedObj === false )
                        return;

                    if( selectedObj.obj.getNumberOfRunningActions() === 0 ) {

                        var actionBy = cc.scaleBy(0.15, 1.2).easing( cc.easeElasticOut( 1.5 ));

                        $('#scaleValue').html("("+selectedObj.initScaleX+" , "+selectedObj.initScaleY+")");
                        selectedObj.obj.runAction(cc.sequence(actionBy, actionBy.reverse())).setTag(100);
                    }

                    objArr.push( selectedObj.obj);
                }
                self.selectNodeMulti(objArr);
            }

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
        var self = this;
        $('#toggleVisible').click( function(){
            this._selectNode.forEach( item => {
                item.setVisible( !item.isVisible());
            });
            // if(this._selectNode){
            //
            //     this._selectNode.setVisible(!this._selectNode.isVisible());
            //     this.selectNode(this._selectNode);
            //
            // }
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

        // console.log($("input[name=opacity]").val());
        $("input[name=opacity]").change(function(){
            this._selectNode.forEach( item => {
                item.setOpacity($("input[name=opacity]").val());
                $('#opacityValue').html(item.getOpacity());
            });
        }.bind(this));

        $("input[name=lPosX]").change(function(){
            this._selectNode.forEach( item => {
                item.setPositionX(parseFloat($("input[name=lPosX]").val()));
                var position = item.getPosition();
                var anchorPP = item.getParent()._renderCmd._anchorPointInPoints;
                position.x -= anchorPP.x;
                position.y -= anchorPP.y;
                changePosition(g_currentObj, item.getName(), position );
            });
        }.bind(this));

        $("input[name=lPosY]").change(function(){
            this._selectNode.forEach( item => {
                item.setPositionY(parseFloat($("input[name=lPosY]").val()));
                var position = item.getPosition();
                var anchorPP = item.getParent()._renderCmd._anchorPointInPoints;
                position.x -= anchorPP.x;
                position.y -= anchorPP.y;
                changePosition(g_currentObj, item.getName(), position );
            });
        }.bind(this));
    },

    setNode :function (node, finalNode) {
        delete this.treeInfo;
        this._selectNode.length = 0;
        this._selectNode = [];
        this._masterNode = node;
        this._treeWidgetObj = {};

        var treeObj = [];
        var actionObj = [];

        if(node && node.ui) {
            var childTree = this.createUIChildList(node.ui);

            this.treeInfo = [{
                info :{
                    id : node.ui.__instanceId,
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

        var self = this;

        if(!!finalNode){
            setTimeout(function(){
                $('#widgetTree').jstree("deselect_all");
                $('#widgetTree').jstree('select_node',self.recursiveTreeCheck(treeObj,finalNode.name));
            },50);
        }

        $('#actionTree').jstree(true).settings.core.data = actionObj;
        $('#actionTree').jstree("refresh");

        var uiAnimationContainer = document.getElementById( "uiAnimationContainer" );

        if( actionObj.length > 0 ) {

            uiAnimationContainer.style.display = "block";
        }
        else {
            uiAnimationContainer.style.display = "none";
        }

        var searchBox = document.getElementById( "searchNode" );
        var visibleBtn = document.getElementById( "toggleVisible" );
        var openBtn = document.getElementById( "openAll" );
        var closeBtn = document.getElementById( "closeAll" );
        var copyBtn = document.getElementById( "copyBtn" );

        if( treeObj.length > 0 ) {
            searchBox.style.visibility = 'visible';
            visibleBtn.style.visibility = 'visible';
            openBtn.style.visibility = 'visible';
            closeBtn.style.visibility = 'visible';
            copyBtn.style.visibility = 'visible';
        }
        else {
            searchBox.style.visibility = 'hidden';
            visibleBtn.style.visibility = 'hidden';
            openBtn.style.visibility = 'hidden';
            closeBtn.style.visibility = 'hidden';
            copyBtn.style.visibility = 'hidden';
        }
    },

    recursiveTreeCheck : function(arr, name){
        for(var idx = 0; idx < arr.length;idx++){
            if(arr[idx].text === name) return arr[idx].id;

            if(!!arr[idx] && !!arr[idx].children){
                return this.recursiveTreeCheck(arr[idx].children, name);
            }
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
            childList[i].info.initScaleX = children[i].getScaleX();
            childList[i].info.initScaleY = children[i].getScaleY();

            childList[i].info.id = children[i].__instanceId;
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
                "id" : info.info.id,
                "text" : info.info.name,
                "state": {
                    "opened": true
                },
                "instanceID" : 0
            };
            if( info.childList.length > 0){
                obj.children = [];
            }
            this._treeWidgetObj[ info.info.id ] = {};
            this._treeWidgetObj[ info.info.id ].obj = info.info.obj;
            this._treeWidgetObj[ info.info.id ].id = info.info.id;
            this._treeWidgetObj[ info.info.id ].name = info.info.name;
            this._treeWidgetObj[ info.info.id ].initScale = info.info.obj.getScale();
            this._treeWidgetObj[ info.info.id ].initScaleX = info.info.obj.getScaleX();
            this._treeWidgetObj[ info.info.id ].initScaleY = info.info.obj.getScaleY();


            dataObj.push( obj );

            line = this.drawTree(info.childList, depth+1, line, obj.children);
        }
        return line;
    },

    selectNode :function (nodeObj) {
        this._selectNode.length = 0;
        this._selectNode = [nodeObj];

        if(nodeObj.isVisible() )
            $('#toggleVisible').html('Hide');
        else
            $('#toggleVisible').html('Show');
        
        $('#localPos').html("(" + nodeObj.getPosition().x.toFixed(2) + " , " +nodeObj.getPosition().y.toFixed(2) + ")");
        $("input[name=lPosX]").val(nodeObj.getPosition().x.toFixed(2));
        $("input[name=lPosY]").val(nodeObj.getPosition().y.toFixed(2));
        $('#LocalSize').html("(" + nodeObj.getContentSize().width.toFixed(2) + " , " +nodeObj.getContentSize().height.toFixed(2) + ")");

        $("input[name=opacity]").val(nodeObj.getOpacity());
        $('#opacityValue').html(nodeObj.getOpacity());

        $('#anchorValue').html("("+ nodeObj._getAnchorX()+" , "+nodeObj._getAnchorY()+")");

        var rect = nodeObj.getBoundingBox();
        var po =   nodeObj.getParent().convertToWorldSpace( cc.p(rect.x, rect.y));



        if(rect.width < 5)
            rect.width = 10;
        if (rect.height < 5 )
            rect.height = 10;

        Gizmo_DrawTouchLayerByRect(
            cc.rect(po.x, po.y, rect.width, rect.height)
        );

    },

    selectNodeMulti :function (nodeArr) {
        this._selectNode.length = 0;
        this._selectNode = nodeArr;


        var posX = this._selectNode[0].getPosition().x.toFixed(2);
        var posY= this._selectNode[0].getPosition().y.toFixed(2);
        var sizeW= this._selectNode[0].getContentSize().width;
        var sizeH= this._selectNode[0].getContentSize().height;
        var opa= this._selectNode[0].getOpacity();
        var ancX= this._selectNode[0].getAnchorPoint().x;
        var ancY= this._selectNode[0].getAnchorPoint().y;

        this._selectNode.forEach( item => {
            posX = posX === item.getPosition().x.toFixed(2) ? posX : "-";
            posY = posY === item.getPosition().y.toFixed(2) ? posY : "-";
            sizeW = sizeW === item.getContentSize().width ? sizeW : "-";
            sizeH = sizeH === item.getContentSize().height ? sizeH : "-";
            opa = opa === item.getOpacity() ? opa : "-";
            ancX = ancX === item.getAnchorPoint().x ? ancX : "-";
            ancY = ancY === item.getAnchorPoint().x ? ancY : "-";

        });

        if(this._selectNode[0].isVisible() )
            $('#toggleVisible').html('Hide');
        else
            $('#toggleVisible').html('Show');



        $('#localPos').html("(" + posX + " , " + posY + ")");
        $("input[name=lPosX]").val(posX);
        $("input[name=lPosY]").val(posY);
        $('#LocalSize').html("(" + sizeW + " , " + sizeH + ")");

        $("input[name=opacity]").val( opa);
        $('#opacityValue').html( opa );

        $('#anchorValue').html("("+ ancX+" , "+ancY+")");


        var rectNode = cc.director.getRunningScene().getChildByTag(gizmoNodTag);
        if(!rectNode) {
            rectNode = new cc.DrawNode();
            rectNode.setTag(gizmoNodTag);
            cc.director.getRunningScene().addChild(rectNode, 999999, gizmoNodTag);
        }
        else{
            rectNode.clear();
        }
    },

    getTreeObjName: function() {
        var length = Object.keys( this._treeWidgetObj ).length;
        var treeArrName = {};
        var treeObjName = [];

        for( var key1 in this._treeWidgetObj ) {
            treeArrName [ key1 ] = {};
            treeArrName [ key1 ].name = this._treeWidgetObj[ key1 ].name;
            treeArrName [ key1 ].copyString = this._treeWidgetObj[ key1 ].name + " : null,\n";
            treeObjName[ treeObjName.length ] = treeArrName [ key1 ].name;
        }

        for( var loop1 = 0; loop1 < length; loop1++ ) {
            var name = treeObjName[ loop1 ];
            var firstSubString1 = name.substring( 0, name.length - 2 );
            var firstSubString2 = name.substring( name.length - 2, name.length );

            if( firstSubString2 === '01' ) {
                var find = false;
                var idx = 1;
                var addTreeNameArr = null;

                for( var loop2 = 0; loop2 < length; loop2++ ) {
                    name = treeObjName[ loop2 ];
                    var secondSubString1 = name.substring( 0, name.length - 2 );
                    var secondSubString2 = name.substring( name.length - 2, name.length );
                    secondSubString2 = name.substring( name.length - 2, name.length );

                    if( firstSubString1 === secondSubString1 && secondSubString2 === '02' ) {
                        find = true;
                    }
                }

                while( find ) {
                    for( var key2 in treeArrName ) {
                        // console.log( key + '=>' + this._treeWidgetObj[ key ] );

                        var objName = firstSubString1 + ( idx < 10 ? '0' + idx : idx );
                        var objName2 = treeArrName[ key2 ].name;
                        find = false;

                        if( objName2 === objName ) {
                            addTreeNameArr = firstSubString1;
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



