const prim_nav = document.querySelector(".pnav");
const nav_toggle = document.querySelector(".mnav");
console.log(nav_toggle);

nav_toggle.addEventListener("click", () => {
	const visibility = prim_nav.getAttribute("data-visible");
	if (visibility === "false") {
		prim_nav.setAttribute("data-visible", "true");
	} else {
		prim_nav.setAttribute("data-visible", "false");
	}
});
