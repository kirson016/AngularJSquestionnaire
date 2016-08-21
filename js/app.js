(function() {
    var app = angular.module('store', []);

    app.directive('optionButtons', function() {
        return {
            restrict: 'E',
            templateUrl: 'option-buttons.html',
            controller: function() {
                this.nazwa = gem;
            },
            controllerAs: 'tab'
        };
    });

    var gem = {
        name: 'asdasdasdasd',
        price: 123123123,
        desc: 'tak jak ja',
    };

    app.directive('inputsSystem', function() {
        return {
            restrict: 'E',
            templateUrl: 'inputs-system.html',
            controller: function() {
                this.inpSys = gem;
            },
            controllerAs: 'inputs'
        };
    });

})();
