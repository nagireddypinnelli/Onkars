(function() {
    'use strict';
    
    angular.module('ContextMenu', []);
    
    /**
     * @name Right Click - Directive
     * ============================================
     */
    
    angular
        .module('ContextMenu')
        .directive('contextMenu', ["$parse", "$q", function ($parse, $q) {
            var contextMenus = [];

            var removeContextMenus = function (level) {
                while (contextMenus.length && (!level || contextMenus.length > level)) {
                    contextMenus.pop().remove();
                }
                if (contextMenus.length == 0 && $currentContextMenu) {
                    $currentContextMenu.remove();
                }
            };

            var $currentContextMenu = null;

            var renderContextMenu = function ($scope, event, options, model, level) {
                if (!level) { level = 0; }
                if (!$) { var $ = angular.element; }
                $(event.currentTarget).addClass('context');
                var $contextMenu = $('<div>');
                if ($currentContextMenu) {
                    $contextMenu = $currentContextMenu;
                } else {
                    $currentContextMenu = $contextMenu;
                }
                $contextMenu.addClass('dropdown clearfix');
                var $ul = $('<md-menu-content>');
                $ul.attr({ 'md-whiteframe' : '1' });
                $ul.attr({ 'role': 'menu' });
                $ul.css({
                    display: 'block',
                    position: 'absolute',
                    "background-color": '#2f2f2f',
                    left: event.pageX + 'px',
                    top: event.pageY + 'px',
                    "z-index": 10000,
                    "box-shadow": "0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)"
                });
                angular.forEach(options, function (item, i) {
                    var $li = $('<md-menu-item>');
                    $li.css("min-height", "35px");
                    $li.css("min-width", "115px");
                    $li.css("height", "35px");
                    if (item === null) {
                        $li= $('<md-menu-divider>');
                        $li.attr({ 'role': 'separator' });
                    } else {
                        var nestedMenu = angular.isArray(item[1])
                        ? item[1] : angular.isArray(item[2])
                        ? item[2] : angular.isArray(item[3])
                        ? item[3] : null;
                        var $a = $('<button>');
                        $a.addClass('md-button md-ink-ripple font-light');
                        $a.css("padding-right", "8px");
                        $a.css("font-size", "14px");
                        $a.css("font-weight", "100");
                        $a.css("min-width", "100%");
                        $a.attr({ tabindex: '-1', href: '#' });
                        var text = typeof item[0] == 'string' ? item[0] : item[0].call($scope, $scope, event, model);
                        $q.when(text).then(function (text) {
                            $a.text(text);
                            if (nestedMenu) {
                                $a.css("cursor", "default");
                                $a.append($('<strong style="font-family:monospace;font-weight:bold;float:right;">&gt;</strong>'));
                            }
                        });
                        $li.append($a);

                        var enabled = angular.isFunction(item[2]) ? item[2].call($scope, $scope, event, model, text) : true;
                        if (enabled) {
                            var openNestedMenu = function ($event) {
                                removeContextMenus(level + 1);
                                var ev = {
                                    pageX: event.pageX + $ul[0].offsetWidth - 1,
                                    pageY: $ul[0].offsetTop + $li[0].offsetTop - 3
                                };
                                renderContextMenu($scope, ev, nestedMenu, model, level + 1);
                            }
                            $li.on('click', function ($event) {
                                //$event.preventDefault();
                                $scope.$apply(function () {
                                    if (nestedMenu) {
                                        openNestedMenu($event);
                                    } else {
                                        $(event.currentTarget).removeClass('context');
                                        removeContextMenus();
                                        item[1].call($scope, $scope, event, model);
                                    }
                                });
                            });

                            $li.on('mouseover', function ($event) {
                                $scope.$apply(function () {
                                    if (nestedMenu) {
                                        openNestedMenu($event);
                                    }
                                });
                            });
                        } else {
                            $li.on('click', function ($event) {
                                $event.preventDefault();
                            });
                            $li.addClass('disabled');
                        }
                    }
                    $ul.append($li);
                });
                $contextMenu.append($ul);
                var height = Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                );
                $contextMenu.css({
                    width: '100%',
                    height: height + 'px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 9999
                });
                $(document).find('body').append($contextMenu);
                $contextMenu.on("mousedown", function (e) {
                    if ($(e.target).hasClass('dropdown')) {
                        $(event.currentTarget).removeClass('context');
                        removeContextMenus();
                    }
                }).on('contextmenu', function (event) {
                    $(event.currentTarget).removeClass('context');
                    event.preventDefault();
                    removeContextMenus(level);
                });
                $scope.$on("$destroy", function () {
                    removeContextMenus();
                });

                contextMenus.push($ul);
            };
            return function ($scope, element, attrs) {
                element.on('contextmenu', function (event) {
                    event.stopPropagation();
                    $scope.$apply(function () {
                        event.preventDefault();
                         var arg = {
                             'id': attrs.id,
                             'parentId': attrs.parentId,
                             'parentType': attrs.parentType
                         };
                        // var arg = attrs.id;
                        console.log('args:',arg);
                        var options = $scope.$eval(attrs.contextMenu);
                        //var model = $scope.$eval(attrs.model);
						var model = $scope.$eval(attrs.model);
                        if (options instanceof Array) {
                            if (options.length === 0) { return; }
                            renderContextMenu($scope, event, options, arg);
                        } else {
                            throw '"' + attrs.contextMenu + '" not an array';
                        }
                    });
                });
            }
        }]);
})();