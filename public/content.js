document.addEventListener('focusin', (event) => {
  try {
      // check if the focused element is a password input
      if (event.target.type === 'password') {
          // send a message to check the popup state
          chrome.runtime.sendMessage({ action: 'checkPopup' }, (response) => {
              try {
                  if (chrome.runtime.lastError) {
                      throw new Error(`Error checking popup state: ${chrome.runtime.lastError.message}`);
                  }

                  // check if the response is valid
                  if (response && typeof response.isPopupOpen !== 'undefined') {
                      // if the popup is not open, send a message to generate a password
                      if (!response.isPopupOpen) {
                          chrome.runtime.sendMessage({ action: 'generatePassword' }, () => {
                              if (chrome.runtime.lastError) {
                                  console.error(`Error generating password: ${chrome.runtime.lastError.message}`);
                              }
                          });
                      }
                  } else {
                      throw new Error("Invalid response received from 'checkPopup' action.");
                  }
              } catch (error) {
                  console.error(error.message);
              }
          });
      }
  } catch (error) {
      console.error("Error in focusin event listener:", error.message);
  }
});
