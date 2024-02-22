// Script should run after the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Define link data
  var linkData = {
    campaign: 'HP Web SDK Test',
    channel: 'Web SDK Test',
    feature: 'Web SDK',
    tags: [ 'tag1', 'tag2', 'tag3' ],
    alias: '',
    data: {
      'custom_bool': true,
      'custom_int': Date.now(),
      'custom_string': 'hello',
      '$afterclick_desktop_url': 'https://eperez-branch.github.io/previousPagePrompt/',
      '$desktop_passive_deepview': false,
      '$deeplink_path': 'learn/discover/56f15e48-f573-4821-b3da-4ffc8227de39'
    }
  }

  // Generate the Branch link
  branch.link(linkData, function(err, link) {
    if (link) {
      // Set the link for the button that opens in the current tab
      var buttonCurrentTab = document.getElementById("openLinkCurrentTab");
      buttonCurrentTab.onclick = function() {
        window.location.href = link;
      };

      // Set the link for the button that opens in a new tab
      var buttonNewTab = document.getElementById("openLinkNewTab");
      buttonNewTab.onclick = function() {
        window.open(link, '_blank');
      };
    } else {
      console.error("Error creating link: " + err);
      // Handle the error (consider displaying error to user)
    }
  });
});
