// @ts-check

// input field in the left col's search bar

/* when a string is entered, all the chat's info boxes whose username do not contain the entered
string are hidden */
$(".left-col > header > .search-bar-container > .search-bar > input").keyup(function() {
    var searchedStr = $(this).val();
    $(".left-col > main > .chat-info-box:not(:containsCaseIns(" + searchedStr + "))").hide();
    $(".left-col > main > .chat-info-box:containsCaseIns(" + searchedStr + ")").show();
});

// boxes with chats info in the left col

$(".left-col > main > .chat-info-box").click(function() {
    $(".left-col > main > .chat-info-box.clicked").removeClass("clicked");
    $(this).addClass("clicked");

    // the chat window corresponding to the clicked chat info box is opened
    var chatWindowContainer = $(".right-col > .chat-windows-container");
    chatWindowContainer.children(".chat-window.opened").removeClass("opened");
    var contactName = $(this).find(".contact-name").text();
    /* add the .opened class to the box whose data-name attribute has the same name as the one in
    the clicked chat info box as value */
    chatWindowContainer.children(".chat-window[data-name=\"" + contactName + "\"]").addClass("opened");

    // the profile photo in the right col's header is updated
    var profilePhotoURL = $(this).find(".profile-photo").attr("src");
    $(".right-col > header > nav .profile-photo").attr("src", profilePhotoURL);

    // the name in the right col's header is updated
    var name = $(this).find(".contact-name").text();
    $(".right-col > header > nav .contact-name").text(name);
});

// input field in the right col's input bar

/* when a string is entered, the microphone icon to its right changes into a send icon. If the
newline character is entered, the printMsgs method is called */
$(".right-col > .input-bar > .input-field").keyup(function(key) {
    if ($(this).val().length > 0) {
        $(".right-col > .input-bar > .microphone-icon").hide();
        $(".right-col > .input-bar > .send-icon").show();

        // if the newline character has been entered
        if (key.keyCode === 13) {
            printMsgs();
        }
    }
    else {
        $(".right-col > .input-bar > .send-icon").hide();
        $(".right-col > .input-bar > .microphone-icon").show();
    }
});

// send icon in the right col's input bar

/* when it's clicked, the printMsgs method is called */
$(".right-col > .input-bar > .send-icon").click(function() {
    printMsgs();
});

// functions

/* This function:
1) creates a box containing the user's message and a box containing the computer's message and
prints them to the chat window
2) empties the input field
3) changes the send icon on the right of the input field into the microphone icon */
var timeout;
function printMsgs() {
    /* the timeout set at the end of this method is cleared. This way, if the user sends multiple
    messages in a second, only one computer's message is printed after the last user's message.
    Note: the first time this method is called, timeout is undefined, but passing an undefined
    variable to clearTimeout does nothing (no exception is thrown) */
    clearTimeout(timeout);

    /* the opened chat window is selected only one time and stored in a variable. This is done
    to avoid callback functions selecting different chat windows */
    var chatWindow = $(".right-col > .chat-windows-container > .chat-window.opened");

    // msg sent by user
    var msgByUser = $(".templates > .msg-sent").clone();
    msgByUser.addClass("msg-sent-by-user");
    msgByUser.children(".text")
        .text($(".right-col > .input-bar > .input-field").val());

    // msg sent by computer
    var msgByComputer = $(".templates > .msg-sent").clone();
    msgByComputer.addClass("msg-sent-by-computer");
    msgByComputer.children(".text")
        .text("Ok!");

    // the user's message is printed to the chat window
    chatWindow.append(msgByUser);

    // the chat window is scrolled to the bottom to make the message visible
    scrollChatWindowToBottom(chatWindow);

    // the input field is emptied
    $(".right-col > .input-bar > .input-field").val("");

    // the send icon is changed into the microphone icon
    $(".right-col > .input-bar > .send-icon").hide();
    $(".right-col > .input-bar > .microphone-icon").show();

    // the computer's message is printed to the chat window
    timeout = setTimeout(function() {
        chatWindow.append(msgByComputer);

        // the chat window is scrolled to the bottom to make the message visible
        scrollChatWindowToBottom(chatWindow);
    }, 1000);
}

// this function scrolls the chat window to the bottom
function scrollChatWindowToBottom(chatWindow) {
    chatWindow.scrollTop(chatWindow.prop("scrollHeight"));
}

// personal selectors

/* case insensitive contains
reference: https://stackoverflow.com/a/12113443/12253537 */
jQuery.expr[":"].containsCaseIns = jQuery.expr.createPseudo(function (arg) {
    return function (elem) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
