// var htmlAddNewButton = '<label for="field3">    <span>Answer</span>    <input class="questionnaireAnswer" type="text" name="field3" required="true" />   </label>'
var arrayOfQuests = new Array;
var numberOfAnswers = 1;
var inputsPossitionHTML = $('.inputsPossition').html();
var newAnsewrHtml = $('.answerContent').html();
var numberOfQuestionnaire = 1;


$(document).ready(function() {

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    class questionnaire {
        constructor(name, question, answers, time, data, answersNumber) {
            this.name = name;
            this.question = question;
            this.answers = answers;
            this.time = time;
            this.data = data;
            this.optionsNumber = answersNumber;
            this.number = numberOfQuestionnaire;
            numberOfQuestionnaire++;
        }

        toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }

        check() {
            alert(this.name + " " + this.question + " " + this.answers + " " + this.time + " " + this.data);
        }

        dataString() {
            var dateTime = this.data.getDate() + "/" +
                (this.data.getMonth() + 1) + "/" +
                this.data.getFullYear() + " @ " +
                this.data.getHours() + ":" +
                this.data.getMinutes() + ":" +
                this.data.getSeconds();

            return (dateTime);
        }

        checkProgress() {
            let min = this.data.getMinutes();
            let hou = this.data.getHours();
            let fullTimeInMinutes = hou * 60 + min + this.time;

            let dateNow = new Date();
            let hoursNow = dateNow.getHours();
            let minutesNow = dateNow.getMinutes();
            let hoursM = hoursNow * 60 + minutesNow;

            if (fullTimeInMinutes > hoursM) {
                return (true);
            } else {
                return (false);
            }
        }

    }

    function adjust_textarea(h) {
        h.style.height = "30px";
        h.style.height = (h.scrollHeight) + "px";
    }

    $('.btnNewQuest').on('click', function() {
        $(".inputsPossition").css("visibility", "visible");
    });

    $('.createQuestionnaire').on('click', function() {
        var classAnswersArray = [];
        var className = $(".questionnaireName").val();
        var classQuestion = $(".questionnaireQuestion").val();
        var classAnswer = $(".questionnaireAnswer0").val();
        var classTime = parseInt($(".questionnaireTime").val());
        var space = " ";
        var currentDate = new Date();
        let condiction = (isNumeric(classTime));

        if (className.length != 0 && classQuestion.length != 0 && classAnswer.length != 0 && condiction === true) {
            for (let i = 0; i <= numberOfAnswers - 1; i++) {
                classAnswersArray.push($('.questionnaireAnswer' + i).val());
            }
            let questionnaireClass = new questionnaire(className, classQuestion, classAnswersArray, classTime, currentDate, numberOfAnswers);
            $(".questionnaireName").val(space);
            $(".questionnaireQuestion").val(space);
            $(".questionnaireAnswer0").val(space);
            $(".questionnaireTime").val(space);
            arrayOfQuests.push(questionnaireClass);
            $('.answerContent').html(" ");
            $('.answerContent').html(newAnsewrHtml);
            numberOfAnswers = 1;
        } else {
            alert("You need type something in input or type number in Time input");
        }
    });

    // $('.btnHistory').on('click', function() {
    //     for (let i = 0; i < arrayOfQuests.length; i++) {
    //         var x = arrayOfQuests[i].name;
    //         for (let j = 0; j < arrayOfQuests[i].answers.length; j++) {
    //             alert(arrayOfQuests[i].answers[j]+" Number: " + arrayOfQuests[i].optionsNumber);
    //         }
    //     }
    // });

    $('.addAnserButton').on('click', function() {
        let htmlAddNewButton = '<label for="field3">    <span>Answer</span>    <input class="questionnaireAnswer' + numberOfAnswers + '" type="text" name="field3" required="true" />   </label>'
        $('.newAnswer').after(htmlAddNewButton);

        numberOfAnswers++;
    });

    $('.btnNewQuest').on('click', function() {
        $(".searchHide").attr("style", "visibility: hidden");
        $(".inputsPossition").attr("style", "visibility: visible");
        $(".history").attr("style", "visibility: hidden");
    });

    $('.btnInProgress').on('click', function() {
        $(".searchHide").attr("style", "visibility: hidden");
        $(".inputsPossition").attr("style", "visibility: hidden");
        $(".history").attr("style", "visibility: visible");
        $('.theadClass').html(" ");

        var check = false;

        for (let i = 0; i < arrayOfQuests.length; i++) {
            let condiction = arrayOfQuests[i].checkProgress();
            if (condiction) {
                let table = ' <tr> <td><strong>' + arrayOfQuests[i].number + ' <td><strong>' + arrayOfQuests[i].name + '</strong></td><td>' + arrayOfQuests[i].dataString() + ' || Duration: (' + arrayOfQuests[i].time + ')' + '</td><td>' + arrayOfQuests[i].question + '</td></tr>';
                $('.theadClass').append(table);
                check = true;
            }
        }
        if (check === false) {
            $('.theadClass').append('  <tr> <td><strong>No questionnaire in progress</strong></td><td>');
        }
    });

    $('.btnHistory').on('click', function() {
        $(".inputsPossition").attr("style", "visibility: hidden");
        $(".history").attr("style", "visibility: visible");
        $(".searchHide").attr("style", "visibility: hidden");
        $('.theadClass').html(" ");
        if (arrayOfQuests.length == 0) {
            $('.theadClass').append('  <tr> <td><strong>Nothing to show in history</strong></td><td>');
        } else {
            for (let i = 0; i < arrayOfQuests.length; i++) {
                let table = ' <tr> <td><strong>' + arrayOfQuests[i].number + ' <td><strong>' + arrayOfQuests[i].name + '</strong></td><td>' + arrayOfQuests[i].dataString() + ' || Duration: (' + arrayOfQuests[i].time + 'min)' + '</td><td>' + arrayOfQuests[i].question + '</td></tr>';
                $('.theadClass').append(table);
            }
        }
    });

    $("#search").keypress(function(e) {
        if (e.which == 13) {
            var isNumber = $('#search').val();
            let condiction = (isNumeric(isNumber));
            if (condiction && arrayOfQuests.length != 0) {
                for (let i = 0; i < arrayOfQuests.length; i++) {
                    if (isNumber == arrayOfQuests[i].number) {
                        alert("YEAH!");
                        $('#search').val(" ");
                        $('.theadClass').html(" ");
                        $('.searchResult').html(" ");
                        let table = ' <tr> <td><strong>' + arrayOfQuests[i].number + ' <td><strong>' + arrayOfQuests[i].name + '</strong></td><td>' + arrayOfQuests[i].dataString() + ' || Duration: (' + arrayOfQuests[i].time + 'min)' + '</td><td>' + arrayOfQuests[i].question + '</td></tr>';
                        $('.theadClass').append(table);
                        $(".searchHide").attr("style", "visibility: visible");

                        for (let j = 0; j < arrayOfQuests[i].answers.length; j++) {
                            let number = j + 1;
                            let searchedAnswers = ' <tr> <td><strong>' + "Answer: " + number + ' <td><strong>' + arrayOfQuests[i].answers[j] + '</strong></td><tr>';
                            $('.searchResult').append(searchedAnswers);
                        }
                    } else {
                        alert("Number not found");
                        $('#search').val(" ");
                    }
                }
            } else if (arrayOfQuests.length == 0) {
                alert("No questionnaire exist");
                $('#search').val(" ");
            } else {
                alert("You need type number in input");
                $('#search').val(" ");
            }
        }
    });

});
