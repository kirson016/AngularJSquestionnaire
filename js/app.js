(function() {
    var isEditMode = false;
    var app = angular.module('store', [])

    app.directive('inputsSystem', function() {
        return {
            restrict: 'E',
            templateUrl: 'inputs-system.html',
            controller:($scope, $http) => {

                $scope.inputsAlert = function() {
                    alert("Please complete all required fields");
                };

                $scope.update = function() {
                    $scope.postQuestions = [];
                    $scope.postSecondAnswers = [];
                    $scope.answerValue = [];
                    $scope.postAnswers = [];
                    $scope.questiosArray = [];

                    $scope.getQuestions = function() {

                        if (isEditMode === false) {
                            $scope.questionsObject = {
                                text: $scope.question.name,
                                sequence: 1,
                                answers: $scope.postAnswers,
                            };
                            $scope.questionsObjectSecond = {
                                text: $scope.question.name1,
                                sequence: 2,
                                answers: $scope.postSecondAnswers,
                            };
                            $scope.questiosArray.push($scope.questionsObject);
                            $scope.questiosArray.push($scope.questionsObjectSecond);

                        } else {
                            $scope.questionsObject = {
                                text: $scope.question.name,
                                sequence: 1,
                                answers: $scope.postAnswers,
                                id: $scope.editDate.questions[0].id,
                                questionnaireId: $scope.editDate.questions[0].questionnaireId
                            };
                            $scope.questionsObjectSecond = {
                                text: $scope.question.name1,
                                sequence: 2,
                                answers: $scope.postSecondAnswers,
                                id: $scope.editDate.questions[1].id,
                                questionnaireId: $scope.editDate.questions[1].questionnaireId
                            };
                            $scope.questiosArray.push($scope.questionsObject);
                            $scope.questiosArray.push($scope.questionsObjectSecond);
                        }
                    };

                    $scope.getAnswers = function() {
                        var count = 1;
                        $scope.answerValue.push($scope.answer.name0);
                        $scope.answerValue.push($scope.answer.name1);
                        $scope.answerValue.push($scope.answer.name2);
                        $scope.answerValue.push($scope.answer.name3);

                        if (isEditMode === false) {
                            for (var i = 0; i < 2; i++) {
                                $scope.answerObj = {
                                    text: $scope.answerValue[i],
                                    sequence: count,
                                };
                                $scope.answerSecondObj = {
                                    text: $scope.answerValue[i + 2],
                                    sequence: count,
                                };
                                $scope.postAnswers.push($scope.answerObj);
                                $scope.postSecondAnswers.push($scope.answerSecondObj);
                                count++;
                            };
                        } else {
                            for (var i = 0; i < 2; i++) {
                                var firstId = $scope.editDate.questions[0].answers[0].id + i;
                                var secondId = $scope.editDate.questions[1].answers[0].id + i;
                                $scope.answerObj = {
                                    text: $scope.answerValue[i],
                                    sequence: count,
                                    id: firstId
                                };
                                $scope.answerSecondObj = {
                                    text: $scope.answerValue[i + 2],
                                    sequence: count,
                                    id: secondId
                                };
                                $scope.postAnswers.push($scope.answerObj);
                                $scope.postSecondAnswers.push($scope.answerSecondObj);
                                count++;
                            };
                        };
                    };

                    $scope.getAnswers();
                    $scope.getQuestions();
                    if (isEditMode === false) {
                        $http.post("http://localhost:8888/surweys/", {
                            name: $scope.user.name,
                            questions: $scope.questiosArray
                        }).then(
                            response => {
                                $scope.get();
                            });
                    } else {
                        $http.put("http://localhost:8888/surweys/", {
                            date: $scope.editDate.date,
                            id: $scope.editDate.id,
                            name: $scope.user.name,
                            questions: $scope.questiosArray
                        }).then(
                            response => {
                                $scope.get();
                                $("#btnCreate").html('Create');
                            });
                        isEditMode = false;
                    };
                    $scope.user.name = null;
                    $scope.answer = null;
                    $scope.question = null;
                };

                $scope.get = function() {
                    $http.get("http://localhost:8888/surweys/")
                        .then( response => {
                            $scope.ngModelData = response.data;
                        });
                };

                angular.element(document).ready(function() {
                    $scope.get();
                });

            },
            controllerAs: 'inputs'
        };
    });

    app.directive('optionButtons', function() {
        return {
            restrict: 'E',
            templateUrl: 'option-buttons.html',
            controller: ($scope, $http) => {
                $scope.delete = id => {
                    var deleteUrl = "http://localhost:8888/questionnaires/" + id;
                    $http.delete(deleteUrl).then(
                        response => {
                            $scope.get();
                        });
                };

                $scope.callEdit = id => {
                    var editUrl = "http://localhost:8888/surweys/" + id;
                    $http.get(editUrl)
                        .then(response => {
                            $scope.editDate = response.data;
                            $scope.user = {
                                name: $scope.editDate.name
                            };
                            $scope.question = {
                                name: $scope.editDate.questions[0].text,
                                name1: $scope.editDate.questions[1].text
                            };
                            $scope.answer = {
                                name0: $scope.editDate.questions[0].answers[0].text,
                                name1: $scope.editDate.questions[0].answers[1].text,
                                name2: $scope.editDate.questions[1].answers[0].text,
                                name3: $scope.editDate.questions[1].answers[1].text
                            };
                            isEditMode = true;
                        });
                    $("#btnCreate").html('Edit');
                };

            },
            controllerAs: 'tab'
        };
    });

})();
