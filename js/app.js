  var app = angular.module('store', []);

app.directive('optionButtons', function() {
    return {
        restrict: 'E',
        templateUrl: 'option-buttons.html',
        controller: function() {
            app.controller('buttonsController', function() {
              this.nazwa = gem;
            });
        },
        controllerAs: 'tab'
    };
});

var gem = {
  name:'asdasdasdasd',
  price: 123123123,
  desc:'tak jak ja',
};

app.directive('inputsSystem', function() {
    return {
        restrict: 'E',
        templateUrl: 'inputs-system.html',
        controller: function() {
            app.controller('inputController', function() {

            });
        },
        controllerAs: 'inputs'
    };
});

app.controller("StoreController", function() {
this.product = gem;
});
