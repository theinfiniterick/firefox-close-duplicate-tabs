function closeDuplicates() {

	var found = [];

	browser.tabs
		.query({ windowType: "normal", currentWindow: true })
		.then((tabs) => {
			for (let tab of tabs) {
				let key = `${tab.url}-${tab.cookieStoreId}`;
				if (found.includes(key)) {
					browser.tabs.remove(tab.id);
				} else {
					found.push(key);
				}
			}
		});
}

browser.contextMenus.onClicked.addListener(() => {
	closeDuplicates();
});

browser.contextMenus.create({
	id: "close-duplicate-tabs",
	title: "Close Duplicate Tabs",
	contexts: ["tab"],
});