const { sentryRendererInit } = require('../../sentryRenderer');
sentryRendererInit();

var EventPackage = cc.Class.extend({
    callback: null,
    target: null,
    listener: null,

    ctor: function (callback, target, listener) {
        this.callback = callback;
        this.target = target;
        this.listener = listener;
    }
});

var EventUserData = cc.Class.extend({
    userData: null,

    ctor: function (userData) {
        this.userData = userData;
    },

    getUserData: function() {
        return this.userData;
    }
});

var EventDispatcher = (function () {
    var instance;

    function createInstance() {
        var listenersMap = {};
        var listenersCustomMap = {};
        return {
            /**
             * @param {string} eventName
             * @param {function} callback
             * @param {object} target
             */
            addEventListener: function (eventName, callback, target) {

                var shouldAdd = true;
                var eventPackages = listenersMap[eventName];
                if (cc.isUndefined(eventPackages)) {
                    eventPackages = [];
                    listenersMap[eventName] = eventPackages;
                } else {
                    for (var i = 0; i < eventPackages.length; ++i) {
                        var eventPackage = eventPackages[i];
                        if (eventPackage.callback === callback && eventPackage.target === target) {
                            shouldAdd = false;
                            break;
                        }
                    }
                }

                if (shouldAdd) {
                    eventPackages.push(new EventPackage(callback, target, null));
                }
            },

            /**
             * @param {string} eventName
             * @param {function} callback
             * @param {object} target
             */
            removeEventListener: function (eventName, callback, target) {
                if (listenersMap[eventName]) {
                    /**
                     * @type {Array.<EventPackage>}
                     */
                    var eventPackages = listenersMap[eventName];
                    if (!cc.isUndefined(eventPackages) && eventPackages.length > 0) {
                        var newPackages = [];
                        for (var i = 0; i < eventPackages.length; ++i) {
                            /**
                             * @type {EventPackage}
                             */
                            var eventPackage = eventPackages[i];
                            if (eventPackage.callback === callback && eventPackage.target === target) {
                                //cc.eventManager.removeListener(eventPackage.listener);
                            } else {
                                newPackages.push(eventPackage);
                            }
                        }
                        listenersMap[eventName] = newPackages;
                    }
                }
            },

            /**
             * @param {string} eventName
             * @param {object} userData
             */
            dispatchEvent: function (eventName, userData) {
                if (listenersMap[eventName]) {
                    var eventPackages = listenersMap[eventName];
                    if (!cc.isUndefined(eventPackages) && eventPackages.length > 0) {
                        var eventData = new EventUserData(userData);
                        for (var i = 0; i < eventPackages.length; ++i) {
                            var eventPackage = eventPackages[i];
                            if (eventPackage.callback != null) {
                                eventPackage.callback.call(eventPackage.target, eventData);
                            }
                        }
                    }
                }
            },

            /**
             * @param {string} eventName
             * @param {function} callback
             * @param {object} target
             */
            addCustomListener: function (eventName, callback, target) {
                var eventListener = cc.eventManager.addCustomListener(eventName, function (event) {
                    callback.call(target, event);
                });

                var shouldAdd = true;
                var eventPackages = listenersCustomMap[eventName];
                if (cc.isUndefined(eventPackages)) {
                    eventPackages = [];
                    listenersCustomMap[eventName] = eventPackages;
                } else {
                    for (var i = 0; i < eventPackages.length; ++i) {
                        var eventPackage = eventPackages[i];
                        if (eventPackage.callback === callback && eventPackage.target === target) {
                            shouldAdd = false;
                            break;
                        }
                    }
                }

                if (shouldAdd) {
                    eventPackages.push(new EventPackage(callback, target, eventListener));
                }
            },

            /**
             * @param {string} eventName
             * @param {function} callback
             * @param {object} target
             */
            removeCustomListener: function (eventName, callback, target) {
                if (listenersCustomMap[eventName]) {
                    /**
                     * @type {Array.<EventPackage>}
                     */
                    var eventPackages = listenersCustomMap[eventName];
                    if (!cc.isUndefined(eventPackages) && eventPackages.length > 0) {
                        var newPackages = [];
                        for (var i = 0; i < eventPackages.length; ++i) {
                            /**
                             * @type {EventPackage}
                             */
                            var eventPackage = eventPackages[i];
                            if (eventPackage.callback === callback && eventPackage.target === target) {
                                cc.eventManager.removeListener(eventPackage.listener);
                            } else {
                                newPackages.push(eventPackage);
                            }
                        }
                        listenersCustomMap[eventName] = newPackages;
                    }
                }
            },

            /**
             * @param {string} eventName
             * @param {object} userData
             */
            dispatchCustomEvent: function (eventName, userData) {
                cc.eventManager.dispatchCustomEvent(eventName, userData);
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();