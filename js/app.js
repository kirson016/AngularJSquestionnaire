(function() {
    var app = angular.module('store', []);

    app.controller('personCtrl', function($scope) {
        $scope.firstName = "John",
            $scope.lastName = "Doe"
        $scope.myVar = false;
        $scope.myVarr = false;
        $scope.myVarrr = false;
        $scope.toggle = function() {
            $scope.myVar = !$scope.myVar;
            $scope.myVarr = !$scope.myVarr;
            $scope.myVarrr = !$scope.myVarrr;
        };
    });


    app.directive('optionButtons', function() {
        return {
            restrict: 'E',
            templateUrl: 'option-buttons.html',
            controller: function() {
                this.history = false;
                this.questionnaire = true;
                this.inProgress = false;

                this.isSelected = function(clicked) {
                    if (clicked == 'history') {
                        this.history = true;
                        this.questionnaire = false;
                        this.inProgress = false;
                    } else if (clicked === 'newQuestionary') {
                      this.history = false;
                      this.questionnaire = true;
                      this.inProgress = false;
                    } else {
                      this.history = false;
                      this.questionnaire = false;
                      this.inProgress = true;
                    }
                };


            },
            controllerAs: 'tab'
        };
    });

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
