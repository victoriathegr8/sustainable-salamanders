// Inform the background page that 
// this tab should have a page-action.
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
  });
  
// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
// First, validate the message's structure.
if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data. 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`.)
    let spanElems = document.querySelectorAll("span");
    let manufacturer;
    for (let i = 0; i < spanElems.length; i++) {
        if (spanElems[i].innerText === "Manufacturer ‏ : ‎ ") {
            manufacturer = spanElems[i].nextElementSibling.innerText;
            break;
        }
    }
    var domInfo = {
    total: document.querySelectorAll('*').length,
    inputs: document.querySelectorAll('input').length,
    buttons: document.querySelectorAll('button').length,
    manufacturer: manufacturer
    };

    // Directly respond to the sender (popup), 
    // through the specified callback.
    response(domInfo);
}
});