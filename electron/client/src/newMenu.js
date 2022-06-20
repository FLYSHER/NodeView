var TopAlignedMenu = cc.Menu.extend({

	// override
	alignItemsVerticallyWithPadding: function (padding) {
		this._align = 'vertically';
		var height = -padding, locChildren = this._children, len, i, locScaleY, locHeight, locChild;
		if (locChildren && locChildren.length > 0) {
			for (i = 0, len = locChildren.length; i < len; i++)
				height += locChildren[i].height * locChildren[i].scaleY + padding;

			// var y = height / 2.0;
			var y = 0;

			for (i = 0, len = locChildren.length; i < len; i++) {
				locChild = locChildren[i];
				locHeight = locChild.height;
				locScaleY = locChild.scaleY;
				locChild.setPosition(0, y - locHeight * locScaleY / 2);
				y -= locHeight * locScaleY + padding;
			}
		}
	}
});