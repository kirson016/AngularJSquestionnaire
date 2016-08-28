(function() {
    var app = angular.module('store', [])

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

                this.x = function() {
                    $http.post('http://localhost:8888/questionnaires', '{"name":"TEST22222222","date":"2016-08-18T22:22:00"}').success(function() {
                        alert("ok!");
                    });
                };


            },
            controllerAs: 'tab'
        };
    });

    app.directive('inputsSystem', function() {
        return {
            restrict: 'E',
            templateUrl: 'inputs-system.html',
            controller: function($scope, $http) {

                $scope.asd = new Array;
                $scope.master = {};

                $scope.update = function(user) {
                    $scope.master = angular.copy(user);
                    $http.post("http://localhost:8888/questionnaires", {
                        name: user.name,
                        date: "2016-08-18T22:22:00"
                    });
                    user.name = null;
                };

                $scope.get = function() {
                    $http.get("http://localhost:8888/questionnaires")
                        .then(function(response) {
                            $scope.asd = response.data;
                            $scope.xxx = angular.fromJson($scope.asd);
                            $scope.zzz = angular.fromJson($scope.asd._embedded.questionnaires[0]);
                            // alert($scope.zzz.length);
                             alert($scope.zzz.name);
                        });
                };
            },
            controllerAs: 'inputs'
        };
    });

})();
