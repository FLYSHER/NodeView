// 사용하지 않음 (Test용)

var NewContainerStrategy = cc.ContainerStrategy.extend({
	apply: function ( view, designedResolution ) {
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;
		if( newHeight > 6 * newWidth / 8 ) {
			newHeight = Math.round(6 * newWidth / 8);
		}
		return this._setupContainer(view, newWidth, newHeight);
	}
});

var NewContentStrategy = cc.ContentStrategy.extend({
	apply: function (view, designedResolution) {
		var innerWidth = window.innerWidth;
		var innerHeight = window.innerHeight;
		if( innerHeight > 6 * innerWidth / 8 ) {
			innerHeight = Math.round( 6 * innerWidth / 8 );
		}
		var newInnerWidth = innerWidth;
		var newInnerHeight = innerHeight;
		var contentScale = 1;
		if( 860 > newInnerHeight ) {
			contentScale = 430 > newInnerHeight ? 430 / 860 : newInnerHeight / 860;
			newInnerHeight = 860;
			newInnerWidth /= contentScale;
		} else {
			if( 1000 < newInnerHeight ) {
				contentScale = newInnerHeight / 1000;
				newInnerHeight = 1000;
				newInnerWidth /= contentScale;
			}
		}

		if( 1700 > newInnerWidth ) {
			contentScale = contentScale * newInnerWidth / 1700;
			newInnerWidth = 1700;
			newInnerHeight = newInnerHeight / contentScale;
		} else {
			if( 2700 < newInnerWidth ) {
				newInnerWidth = 2700;
			}
		}

		designedResolution.width = newInnerWidth;
		designedResolution.height = newInnerHeight;
		return this._buildResult(innerWidth, innerHeight, innerWidth, innerHeight, contentScale, contentScale);
	}
});