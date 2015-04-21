﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('TutorialController', TutorialController)
        .animation('.slide-animation', function () {
            return {
                beforeAddClass: function (element, className, done) {
                    var scope = element.scope();

                    if (className == 'ng-hide') {
                        var finishPoint = element.parent().width();
                        if(scope.direction !== 'right') {
                            finishPoint = -finishPoint;
                        }
                        TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                    }
                    else {
                        done();
                    }
                },
                removeClass: function (element, className, done) {
                    var scope = element.scope();

                    if (className == 'ng-hide') {
                        element.removeClass('ng-hide');

                        var startPoint = element.parent().width();
                        if(scope.direction === 'right') {
                            startPoint = -startPoint;
                        }

                        TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                    }
                    else {
                        done();
                    }
                }
            };
        });

    TutorialController.$inject = ['$rootScope'];
    function TutorialController($rootScope) {
        var vm = this;

        vm.slides = [
            {image: 'assets/img/img00.jpg', description: 'Image 00'},
            {image: 'assets/img/img01.jpg', description: 'Image 01'},
            {image: 'assets/img/img02.jpg', description: 'Image 02'},
            {image: 'assets/img/img03.jpg', description: 'Image 03'},
            {image: 'assets/img/img04.jpg', description: 'Image 04'}
        ];

        vm.currentIndex = 0;

        vm.setCurrentSlideIndex = function (index) {
            vm.currentIndex = index;
        };

        vm.isCurrentSlideIndex = function (index) {
            return vm.currentIndex === index;
        };

        vm.prevSlide = function () {
            vm.currentIndex = (vm.currentIndex < vm.slides.length - 1) ? ++vm.currentIndex : 0;
        };

        vm.nextSlide = function () {
            vm.currentIndex = (vm.currentIndex > 0) ? --vm.currentIndex : vm.slides.length - 1;
        };
    }

    function TutorialAnimator() {
    }

})();

