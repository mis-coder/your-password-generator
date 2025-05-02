// store popup states for each tab
const popupStates = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        // ensure the sender tab is valid
        if (!sender || !sender.tab || typeof sender.tab.id === 'undefined') {
            throw new Error("Invalid sender or tab ID.");
        }

        const tabId = sender.tab.id;

        // handle "checkPopup" action
        if (message.action === 'checkPopup') {
            try {
                // Check if the popup is already open for the tab
                const isPopupOpen = popupStates[tabId] || false;
                sendResponse({ isPopupOpen });
            } catch (error) {
                console.error("Error checking popup state:", error.message);
                sendResponse({ isPopupOpen: false, error: "Failed to check popup state." });
            }
        }

        // handle "generatePassword" action
        if (message.action === 'generatePassword') {
            try {
                if (!popupStates[tabId]) {
                    // mark popup as open for the current tab
                    popupStates[tabId] = true;

                    // open the popup
                    chrome.action.openPopup(() => {
                        if (chrome.runtime.lastError) {
                            console.error("Failed to open popup:", chrome.runtime.lastError.message);
                            popupStates[tabId] = false; 
                        }
                    });
                }
            } catch (error) {
                console.error("Error generating password:", error.message);
            }
        }

        // handle "closePopup" action
        if (message.action === 'closePopup') {
            try {
                // reset the flag when the popup is closed
                popupStates[tabId] = false;
            } catch (error) {
                console.error("Error closing popup:", error.message);
            }
        }
    } catch (error) {
        console.error("Unexpected error in message listener:", error.message);
        sendResponse({ error: "An unexpected error occurred." });
    }

    // return true to indicate async response if needed
    return true;
});
