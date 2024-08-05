
//$(document).ready(function () {
//    var msg = new SpeechSynthesisUtterance();
//    var voices = window.speechSynthesis.getVoices();
//});


function texttospeak(txt) {
    debugger;
    var text = txt;
    var msg = new SpeechSynthesisUtterance();
   // var voices = window.speechSynthesis.getVoices();
   //// msg.voice = voices[$('#voices').val()];
   // //msg.voice = getVoices();
   //  msg.voice = voices[3];
   // //msg.rate = $('#rate').val() / 10;
   // //msg.pitch = $('#pitch').val();
   msg.rate = 8/ 10;
   // msg.pitch = 1;
    msg.text = text;
   // msg.onend = function (e) {
   //     console.log('Finished in ' + event.elapsedTime + ' seconds.');
   // };
   // debugger;
    speechSynthesis.speak(msg);

}


//function getVoices() {
//    var voices = speechSynthesis.getVoices();
//    if(!voices.length){
//        var utterance = new SpeechSynthesisUtterance("");
//        speechSynthesis.speak(utterance);
//        voices = speechSynthesis.getVoices();
//    }

   
//    var ct = 0;
//    $.each(voices, function (i) {
//        if (voices[i].name == 'Google UK English Female') {
//            ct = i;
//        }
//    })

//    return voices[ct];
//}


//function AlartMessage(Msg, Flag) {
//    debugger;
//    $.ajax({
//        url: '/AlertMsg/Index',
//        contentType: 'application/html; charset=utf-8',
//        type: 'GET',
//        dataType: 'html',
//        success: function (result) {
//            debugger;
//            //alert("tt");
//            $("#AlertModal").modal('show');

//            $('#dvUserdetails').html(result);

//            ChkReload = Flag;
//            var Avatar = 'F';
//            if (Avatar == 'M') {
//                $('#Avatar_Male_Success1').hide();
//                $('#Avatar_Male_Success2').hide();
//                $('#Avatar_Male_Delete1').hide();
//                $('#Avatar_Male_Anoncement').hide();
//                $('#Avatar_Male_Message').hide();
//                $('#Avatar_Male_Ani').hide();
//                switch (Flag) {
//                    case 1:
//                        $('#AlertMessage').show();
//                        $('#Avatar_Male_Success1').show();
//                        $('#AlertlabelMR').val(Msg).text(Msg);
//                        break;
//                    case 2:
//                        $('#AlertMessage').show();
//                        $('#Avatar_Male_Delete1').show();
//                        $('#AlertlabelMR').val(Msg).text(Msg);
//                        break;
//                    case 3:
//                        $('#AlertMessage').show();
//                        $('#Avatar_Male_Anoncement').show();
//                        $('#AlertlabelMR').val(Msg).text(Msg);
//                        break;
//                    case 4:
//                        $('#AlertMessageMaleRight').show();
//                        $('#Avatar_Male_Ani').show();
//                        $('#AlertlabelML').val(Msg).text(Msg);
//                        break;
//                }

//            } else {
//                $('#Avatar_FeMale_Success1').hide();
//                $('#Avatar_FeMale_Success2').hide();
//                $('#Avatar_FeMale_Delete1').hide();
//                $('#Avatar_FeMale_Anoncement').hide();
//                $('#Avatar_FeMale_Message').hide();
//                $('#Avatar_FeMale_Ani').hide();
//                $('#Avatar_FeMale_Failed').hide();

//                $('#AlertMessage').hide();
//                $('#AlertMessageMaleRight').hide();
//                $('#AlertMessageFemaleLeft').hide();

//                switch (Flag) {
//                    case 1:
//                        $('#AlertMessageFemaleLeft').show();
//                        $('#Avatar_FeMale_Success1').show();
//                        $('#AlertlabelFR').val(Msg).text(Msg);
//                        break;
//                    case 2:
//                        $('#AlertMessageFemaleLeft').show();
//                        $('#Avatar_FeMale_Delete1').show();
//                        $('#AlertlabelFR').val(Msg).text(Msg);
//                        break;
//                    case 3:
//                        $('#AlertMessageFemaleLeft').show();
//                        $('#Avatar_FeMale_Anoncement').show();
//                        $('#AlertlabelFR').val(Msg).text(Msg);
//                        break;
//                    case 4:
//                        $('#AlertMessageFeMaleRight').show();
//                        $('#Avatar_FeMale_Ani').show();
//                        $('#AlertlabelFL').val(Msg).text(Msg);
//                        break;
//                    case 5:
//                        $('#AlertMessageFemaleLeft').show();
//                        $('#Avatar_FeMale_Failed').show();
//                        $('#AlertlabelFR').val(Msg).text(Msg);
//                        break;
//                }
//            }

//            texttospeak(Msg);


//        }

//    })
//.success(function (result) {


//})
//.error(function (xhr, status) {
//    alert(status);
//})


//}

//function MsgModalclose() {
//    $("#AlertModal").modal('hide');
//    speechSynthesis.cancel();
//    //var msg = new SpeechSynthesisUtterance();
//    //$('#AlertMessage').hide();
//    //$('#AlertMessageMaleRight').hide();
//    //$('#AlertMessageFemaleLeft').hide();
//    //$('#AlertMessageFeMaleRight').hide();
//    //if( ChkReload == 1 ||  ChkReload == 2){
//    //    window.location.reload();
//    //}
//}
