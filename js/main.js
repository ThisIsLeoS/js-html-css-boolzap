// input field in the right col's footer
// when one or more characters are entered, the microphone icon to its left changes into a send icon
$(".right-col > footer > .input-box").keyup(function() {
    if ($(this).val().length > 0) {
        $(".right-col > footer > .microphone-icon").hide();
        $(".right-col > footer > .send-icon").show();
    }
    else {
        $(".right-col > footer > .send-icon").hide();
        $(".right-col > footer > .microphone-icon").show();
    }
});

// send icon in the right col's footer
/* when it's clicked, the text entered in the input field to its right is printed in the chat
window. A computer generated message is printed afterwards */
$(".right-col > footer > .send-icon").click(function() {
    // msg sent by user
    var msgByUser = $(".templates > .msg-sent").clone();
    msgByUser.addClass("msg-sent-by-user");
    msgByUser.children(".text")
        .text($(".right-col > footer > input").val());

    // msg sent by computer
    var msgByComputer = $(".templates > .msg-sent").clone();
    msgByComputer.addClass("msg-sent-by-computer");
    msgByComputer.children(".text")
        .text("Correct!");

    // the messages are printed in widnow chat
    $(".right-col > .chat-window").append(msgByUser);
    setTimeout(function() {
        $(".right-col > .chat-window").append(msgByComputer);
    }, 1000);

    // the input field is emptied
    $(".right-col > footer > input").val("");

    // the send icon is changed into the microphone icon
    $(".right-col > footer > .send-icon").hide();
    $(".right-col > footer > .microphone-icon").show();
});
