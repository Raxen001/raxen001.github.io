window.onload = function () {
	document
		.getElementById("contact_form")
		.addEventListener("submit", function (event) {
			event.preventDefault();
			emailjs.sendForm("service_c0lkcza", "template_4xv57y7", this).then(
				function () {
					console.log("Mail Sent Succesfully!");
					document.getElementById("contact_form").reset();
				},
				function (error) {
					console.log("MAIL FAILED...", error);
				},
			);
		});
};
