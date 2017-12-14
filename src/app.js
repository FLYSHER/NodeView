
var MainLayer = cc.Layer.extend({
    DESC_TAG: 99,
    NODE_MENU_TAG: 100,
    JSON_LIST_MENU_TAG: 101,
    NODE_PROP_MENU_TAG: 102,
    CLEAR_BTN_TAG: 103,

    ctor: function () {
        this._super();

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this._currZOrder = 0;
        this._nodeProperties = {};

        var self = this;
		this._loadArmatureListener = cc.eventManager.addCustomListener( 'loadArmature', function( event ) {
			self.onLoadArmature( JSON.parse( event.getUserData() ) );
		} );

		this._loadUIListener = cc.eventManager.addCustomListener( 'loadUI', function( event ) {
            self.onLoadUI( event.getUserData() );
        } );

        var label = new cc.LabelTTF( "파일을 이쪽으로 드래그해 주세요", "Arial", 20 );
        label.setPosition( this.CX, this.CY );
        this.addChild( label, 0, this.DESC_TAG );

        this._clearBtn = new ccui.Button();
		this._clearBtn.setPosition( cc.visibleRect.left.x + 100, cc.visibleRect.top.y - 30 );
		this._clearBtn.setTitleText( "Clear" );
		this._clearBtn.setPressedActionEnabled(true);
		this._clearBtn.addClickEventListener( this.onClearButtonClick.bind( this ) );
		this.addChild( this._clearBtn, 10001, this.CLEAR_BTN_TAG );

        this._nodeMenu = new TopAlignedMenu( [] );
        this._nodeMenu.alignItemsVertically();
        this._nodeMenu.setPosition( cc.visibleRect.left.x + 100, cc.visibleRect.top.y - 70 );
        this.addChild( this._nodeMenu, 9999, this.NODE_MENU_TAG );

        this._jsonListMenu = new TopAlignedMenu( [] );
        this._jsonListMenu.alignItemsVertically();
        this._jsonListMenu.setPosition( cc.visibleRect.right.x - 80, cc.visibleRect.top.y - 50 );
        this.addChild( this._jsonListMenu, 10000, this.JSON_LIST_MENU_TAG );

		// this._nodePropX = new cc.EditBox( cc.size(70, 30), new cc.LayerColor( cc.color( 255, 255, 255 ) ) );
		// this._nodePropX.setString( "123" );
		// this._nodePropX.setPosition( cc.visibleRect.right.x - 80, cc.visibleRect.bottom.y + 50 );
		// this._nodePropX.setFontColor( cc.color( 0, 0, 0 ) );
		// this._nodePropX.setFontSize( 24 );
		// this._nodePropX.setDelegate( this );
		// this.addChild( this._nodePropX, 10002, this.NODE_PROP_MENU_TAG );

        this._nodeMenuItems = {};
        this._jsonListMenuItems = {};
        this._nodeList = {};

        return true;
    },

    onClearButtonClick: function() {
        var name;
        var self = this;
		var children = this.getChildren();
		children.forEach( function( c ) {
			var tag = c.getTag();
			if( tag !== self.NODE_MENU_TAG && tag !== self.JSON_LIST_MENU_TAG && tag !== self.CLEAR_BTN_TAG && tag !== self.NODE_PROP_MENU_TAG ) {
				c.removeFromParent();
			}
		} );
		this._nodeMenu.removeAllChildren();
		this._jsonListMenu.removeAllChildren();

		for( name in this._nodeMenuItems ) {
			this._nodeMenuItems[ name ] = null;
		    delete this._nodeMenuItems[ name ];
        }
		for( name in this._jsonListMenuItems ) {
			this._jsonListMenuItems[ name ] = null;
			delete this._jsonListMenuItems[ name ];
		}
		for( name in this._nodeList ) {
			this._nodeList[ name ] = null;
			delete this._nodeList[ name ];
		}

		this._nodeMenuItems = {};
		this._jsonListMenuItems = {};
		this._nodeList = {};

		Loader.reset();
    },

    onLoadArmature: function( ids )  {
        var child = this.getChildByTag( this.DESC_TAG );
        child && child.removeFromParent();

        cc.each( ids, function( name, index ) {
			var armature = new ccs.Armature( name );

            var node = new DraggableNode( armature.getContentSize() );
            node.setAnchorPoint( 0.5, 0.5 );
            node.setPosition( this.CX , this.CY );

            // addChild 순서 중요!
            // armature가 draggableNode에 addChild되면 contentSize가 바뀜
            this.addChild( node, this._currZOrder++ );
            node.addChildToCenter( armature );
            this._nodeList[ name ] = node;

			this._initNodeMenu( name, armature );
			this._addToJsonListMenu( name );
        }, this );
    },

    onLoadUI: function( url ) {
		var child = this.getChildByTag( this.DESC_TAG );
		child && child.removeFromParent();

        var json = ccs.load( url );
        var ui = json.node;

        var node = new DraggableNode( ui.getContentSize() );
        node.setAnchorPoint( 0.5, 0.5 );
        node.setPosition( this.CX , this.CY );
        this.addChild( node, this._currZOrder++ );

        ui.setAnchorPoint( 0.5, 0.5 );
        node.addChildToCenter( ui );

        var name = cc.path.mainFileName( url );
        this._nodeList[ name ] = node;
        this._addToJsonListMenu( name );
    },

    _initNodeMenu: function( name, armature )  {
        var animations = armature.getAnimation();
        var animNameArr = animations._animationData.movementNames;
        var i;
        var menuItems = [];
        var self = this;

        this._nodeMenu.removeAllChildren();

        var nodeMenuItemCallback = function( index ) {
            animations.playWithIndex( index );
        };

        for( i = 0; i < animNameArr.length; i++ ) {
            menuItems[i] = new cc.MenuItemFont( animNameArr[ i ], nodeMenuItemCallback.bind( null, i ), this );
			menuItems[i].setAnchorPoint( 0, 0.5 );
            this._nodeMenu.addChild( menuItems[ i ], 0 );
        }

        if( this._nodeMenuItems.hasOwnProperty( name ) ) {
            delete this._nodeMenuItems[ name ];
        }

        this._nodeMenuItems[ name ] = menuItems;
        this._nodeMenu.updateAlign();
    },

    _addToJsonListMenu: function( name )  {
        if( this._jsonListMenuItems.hasOwnProperty( name ) ) {
            this._jsonListMenuItems[ name ].removeFromParent();
            delete this._jsonListMenuItems[ name ];
        }

        var jsonListItem = new cc.MenuItemFont( name, function() {
            this.updateMenu( name );
        }, this );
        jsonListItem.setAnchorPoint( 1, 0.5 );
        jsonListItem.setFontSize( 12 );
        this._jsonListMenu.addChild( jsonListItem, 0 );

        this._jsonListMenuItems[ name ] = jsonListItem;
        this._jsonListMenu.updateAlign();

        this.setDraggableItem( name );

        //////////////////////
		this._jsonListMenu.setAnchorPoint( 0.5, 1.0 );
		this._jsonListMenu.setPosition( cc.visibleRect.right.x - 30, cc.visibleRect.top.y - 50 );
    },

    updateMenu: function( name ) {
        this._nodeMenu.removeAllChildren();
        if( this._nodeMenuItems.hasOwnProperty( name ) ) {
            var menuItems = this._nodeMenuItems[ name ];
            for( var i = 0; i < menuItems.length; i++ ) {
                this._nodeMenu.addChild( menuItems[ i ] );
            }
        }

        this.setDraggableItem( name );
    },

    setDraggableItem: function( name ) {
        for( var nodeName in this._nodeList ) {
            if( typeof this._nodeList[ nodeName ].setDraggable === 'function' ) {
                this._nodeList[ nodeName ].setDraggable( false );
            }
        }
        if( this._nodeList.hasOwnProperty( name ) ) {
            this._nodeList[ name ].setDraggable( true );
        }
    },

    onExit: function() {
		cc.eventManager.removeListener( this._loadArmatureListener );
        cc.eventManager.removeListener( this._loadUIListener );

        this._super();
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

		/**
		 * Init loader
		 */
		Loader.init();

        this._layer = new MainLayer();
        this.addChild( this._layer, -1, "MainLayer" );

        var self = this;
		this._resizeListener = cc.eventManager.addCustomListener( 'canvas-resize', function( event ) {
			self.onResize();
		} );
    },

	onResize: function() {
		// cc.log( "window.innerWidth: ", window.innerWidth );
		// cc.log( "window.innerHeight: ", window.innerHeight );
		// cc.log( "cc.winSize.width: ", cc.winSize.width );
		// cc.log( "cc.winSize.height: ", cc.winSize.height );
    }
});
