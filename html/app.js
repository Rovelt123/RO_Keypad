
function ShowKeypad(pin) {
	var enterCode = "";
    var confirmCode = "";
    var isChangingCode = 1;
	enterCode.toString();
	$("#fields .numberfield").removeClass("active");
	$("#fields .numberfield").removeClass("right");
	$("#numbers").removeClass("hide");
	$("#pincode").removeClass("hide");
	$("#anleitung p").html("<strong>Please enter the correct PIN-Code.</strong>");
	$("#numbers button").click(function() {

	var clickedNumber = $(this).text().toString();
	enterCode = enterCode + clickedNumber;
	var lengthCode = parseInt(enterCode.length);
	lengthCode--;
	$("#fields .numberfield:eq(" + lengthCode + ")").addClass("active");
	if (isChangingCode == 2) {
		if (lengthCode == 3) {
			if (!confirmCode) {
				confirmCode = enterCode;
				enterCode = "";
				$("#fields .numberfield").removeClass("active");
				$("#anleitung p").html("<strong>Confirm the new PIN-Code.</strong>");
			} else if (enterCode === confirmCode) {
				$("#fields .numberfield").addClass("right");
				$("#numbers").addClass("hide");
				$("#anleitung p").html("New PIN-Code set!");
				$("#pincode").addClass("hide");
				$.post(`https://${GetParentResourceName()}/change`, JSON.stringify({ newCode: confirmCode }));
				$('#pincode').hide();
			} else {
				$("#fields").addClass("miss");
				enterCode = "";
				setTimeout(function() {
					$("#fields .numberfield").removeClass("active");
				}, 200);
				setTimeout(function() {
					$("#fields").removeClass("miss");
				}, 500);
			}
		}
	} else if (isChangingCode == 3) {
		if (lengthCode == 3) {
			if (enterCode == pin) {
				isChangingCode = 2;
				enterCode = "";
				$("#fields .numberfield").removeClass("active");
				$("#anleitung p").html("<strong>Enter a new PIN-Code.</strong>");
			} else {

				$("#fields").addClass("miss");
				enterCode = "";
				setTimeout(function() {
					$("#fields .numberfield").removeClass("active");
				}, 200);
				setTimeout(function() {
					$("#fields").removeClass("miss");
				}, 500);
			}
		}

	} else if (isChangingCode == 1) {
		if (lengthCode == 3) {
			if (enterCode == pin) {
				$("#fields .numberfield").addClass("right");
				$("#numbers").addClass("hide");
				$("#anleitung p").html("CORRECT!");
				$("#pincode").addClass("hide");
				$.post(`https://${GetParentResourceName()}/correct`, JSON.stringify({ Correct: true }));
				$('#pincode').hide();
			} else {

			$("#fields").addClass("miss");
			enterCode = "";
			setTimeout(function() {
				$("#fields .numberfield").removeClass("active");
			}, 200);
			setTimeout(function() {
				$("#fields").removeClass("miss");
			}, 500);

			}

		} else {}

		}
	});

	$("#restartbtn").click(function(){
		enterCode = "";
		isChangingCode = 1;
		$("#fields .numberfield").removeClass("active");
		$("#fields .numberfield").removeClass("right");
		$("#numbers").removeClass("hide");
		$("#anleitung p").html("<strong>Please enter the correct PIN-Code.</strong>");
	});

	$("#editcode").click(function(){
		enterCode = "";
		isChangingCode = 3;
		$("#fields .numberfield").removeClass("active");
		$("#fields .numberfield").removeClass("right");
		$("#numbers").removeClass("hide");
		$("#anleitung p").html("<strong>Please enter old PIN-Code.</strong>");
	});
}

$(document).on('click', ".close-button", function() {
	$("#pincode").addClass("hide");
    $.post(`https://${GetParentResourceName()}/close-menu`, JSON.stringify({ }));
}); 

window.addEventListener('message', function (event) {
    if (event.data.code) {
        ShowKeypad(event.data.code);
		$('#pincode').show();
    }
});

$('#pincode').hide();