// Spotlight search (layouts/_partials/search.html), backed by Pagefind's JS API.
// The index is built after hugo: `npx -y pagefind@1 --site public`.
const dialog = document.getElementById("search");

if (dialog) {
  const input = dialog.querySelector("input");
  const list = dialog.querySelector(".spotlight__results");
  const status = dialog.querySelector(".spotlight__status");
  const sections = {
    blog: "Blog",
    personal_writings: "Writes",
    gallery: "Gallery",
    contact: "Contact",
  };

  let pagefind;
  let active = -1;
  let query = 0;

  // load the index on first open only. init must finish before the first
  // search, or that search can come back empty; a failed load can retry.
  const load = () =>
    (pagefind ??= import(`${dialog.dataset.pagefind}pagefind.js`)
      .then(async (pf) => {
        await pf.options({ excerptLength: 16 });
        await pf.init();
        return pf;
      })
      .catch((error) => {
        pagefind = undefined;
        throw error;
      }));

  const open = () => {
    if (!dialog.open) dialog.showModal();
    input.focus();
    input.select();
    load().catch(() => (status.textContent = "Search isn't available right now."));
  };

  const select = (index) => {
    const options = list.children;
    if (!options.length) return;
    active = (index + options.length) % options.length;
    for (const [i, option] of [...options].entries()) {
      option.setAttribute("aria-selected", i === active);
    }
    options[active].scrollIntoView({ block: "nearest" });
    input.setAttribute("aria-activedescendant", options[active].id);
  };

  const render = (results, total) => {
    list.replaceChildren(
      ...results.map((result, i) => {
        const section = new URL(result.url, location.href).pathname.split("/").filter(Boolean)[0];
        const icon = dialog.querySelector(`template[data-section="${section}"]`) ??
          dialog.querySelector('template[data-section="page"]');

        const option = document.createElement("li");
        option.id = `search-option-${i}`;
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", "false");

        const link = document.createElement("a");
        link.href = result.url;
        link.tabIndex = -1;

        const text = document.createElement("span");
        const title = document.createElement("strong");
        title.textContent = result.meta.title ?? result.url;
        const excerpt = document.createElement("span");
        // pagefind escapes the page text and only adds <mark> around matches
        excerpt.innerHTML = result.excerpt;
        text.append(title, excerpt);

        const label = document.createElement("small");
        label.textContent = sections[section] ?? "Page";

        link.append(icon.content.cloneNode(true), text, label);
        option.append(link);
        option.addEventListener("pointermove", () => active !== i && select(i));
        return option;
      }),
    );

    const hasResults = results.length > 0;
    list.hidden = !hasResults;
    input.setAttribute("aria-expanded", hasResults);
    input.removeAttribute("aria-activedescendant");
    active = -1;
    if (hasResults) select(0);

    status.textContent = !input.value.trim()
      ? ""
      : hasResults
        ? `${total} result${total === 1 ? "" : "s"}`
        : "No results";
  };

  input.addEventListener("input", async () => {
    const id = ++query;
    const term = input.value.trim();
    if (!term) return render([], 0);

    let pf;
    try {
      pf = await load();
    } catch {
      status.textContent = "Search isn't available right now.";
      return;
    }
    const search = await pf.debouncedSearch(term, {}, 120);
    if (search === null || id !== query) return; // a newer search took over

    const results = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
    if (id === query) render(results, search.results.length);
  });

  input.addEventListener("keydown", (event) => {
    // a search field's Esc clears the text first; Spotlight closes instead
    if (event.key === "Escape") {
      event.preventDefault();
      dialog.close();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      select(active + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      list.children[active].querySelector("a").click();
    }
  });

  // start fresh every time it opens
  dialog.addEventListener("close", () => {
    input.value = "";
    render([], 0);
  });

  // the buttons open it natively ([commandfor]); also warm the index then
  dialog.addEventListener("command", (event) => {
    if (event.command === "show-modal") load().catch(() => {});
  });

  // browsers without invoker commands
  if (!("commandForElement" in HTMLButtonElement.prototype)) {
    document.addEventListener("click", (event) => {
      const button = event.target.closest('[commandfor="search"]');
      if (!button) return;
      button.getAttribute("command") === "close" ? dialog.close() : open();
    });
  }

  // browsers without closedby="any": a click on the backdrop closes it
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  // ⌘K / Ctrl+K anywhere, or "/" when not already typing
  document.addEventListener("keydown", (event) => {
    const typing = event.target instanceof Element &&
      event.target.closest("input, textarea, select, [contenteditable]");
    if (((event.metaKey || event.ctrlKey) && event.key === "k") || (event.key === "/" && !typing)) {
      event.preventDefault();
      open();
    }
  });
}
