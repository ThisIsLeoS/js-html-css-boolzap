// @ts-check

// input field in the left col's search bar
/* when a string is entered, all the chat's info boxes whose username do not contain the entered
string are hidden */
$(".left-col > header > .search-bar-container > .search-bar > input").keyup(function() {
    var searchedStr = $(this).val();
    $(".left-col > main > .chat-info-box:not(:containsCaseIns(" + searchedStr + "))").hide();
    $(".left-col > main > .chat-info-box:containsCaseIns(" + searchedStr + ")").show();
});

// input field in the right col's input bar
// when a string is entered, the microphone icon to its right changes into a send icon
$(".right-col > .input-bar > .input-field").keyup(function() {
    if ($(this).val().length > 0) {
        $(".right-col > .input-bar > .microphone-icon").hide();
        $(".right-col > .input-bar > .send-icon").show();
    }
    else {
        $(".right-col > .input-bar > .send-icon").hide();
        $(".right-col > .input-bar > .microphone-icon").show();
    }
});

// send icon in the right col's input bar
/* when it's clicked, the text entered in the input field to its left is printed in the chat
window. A computer generated message is printed afterwards */
$(".right-col > .input-bar > .send-icon").click(function() {
    // msg sent by user
    var msgByUser = $(".templates > .msg-sent").clone();
    msgByUser.addClass("msg-sent-by-user");
    msgByUser.children(".text")
        .text($(".right-col > .input-bar > .input-field").val());

    // msg sent by computer
    var msgByComputer = $(".templates > .msg-sent").clone();
    msgByComputer.addClass("msg-sent-by-computer");
    msgByComputer.children(".text")
        .text("Correct!");

    // the messages are printed in the chat's window
    $(".right-col > .chat-window").append(msgByUser);
    setTimeout(function() {
        $(".right-col > .chat-window").append(msgByComputer);
    }, 1000);

    // the input field is emptied
    $(".right-col > .input-bar > .input-field").val("");

    // the send icon is changed into the microphone icon
    $(".right-col > .input-bar > .send-icon").hide();
    $(".right-col > .input-bar > .microphone-icon").show();
});

// personal selectors

/* case insensitive contains
reference: https://stackoverflow.com/a/12113443/12253537 */
jQuery.expr[":"].containsCaseIns = jQuery.expr.createPseudo(function (arg) {
    return function (elem) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
