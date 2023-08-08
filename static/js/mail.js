window.onload = function () {
	document
		.getElementById("contact_form")
		.addEventListener("submit", function (event) {
			event.preventDefault();
			emailjs.sendForm("service_c0lkcza", "template_4xv57y7", this).then(
				function () {
					document.getElementById("contact_form").reset();
					console.log("Mail Sent Succesfully!");
					alert("Mail Sent Successfully!. Will get back to you shortly...");
				},
				function (error) {
					console.log("MAIL FAILED...", error);
				},
			);
		});
};
