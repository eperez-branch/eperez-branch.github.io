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

  // Attempt to generate the Branch link
  branch.link(linkData, function(err, link) {
    if (link) {
      // If the link successfully generated, store in data-link attribute
      var myButton = document.getElementById("myButton");
      myButton.setAttribute("data-link", link);
      // Add click event listener once
      if (!myButton.classList.contains('link-set')) {
        myButton.addEventListener("click", function() {
          var url = this.getAttribute("data-link");
          window.open(url, '_blank');
        });
        myButton.classList.add('link-set'); // Mark button as listener attached
      }
    } else {
      console.error("Error creating link: " + err);
      // handle the error with user visibility (consider alert or message)
    }
  });
});
