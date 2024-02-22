function createBranchLink() {
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
  branch.link(linkData, function(err, link) {
    if (link) {
      // Store the link in a button's data attribute and add an event listener to the button
      var myButton = document.getElementById("myButton"); // Ensure you have this button in your HTML
      myButton.setAttribute("data-link", link); // Store the link
      myButton.addEventListener("click", function() {
        var url = this.getAttribute("data-link");
        window.open(url, '_blank'); // Or window.location.href = url; to open in the same tab
      });
    } else {
      // Handle error, e.g., with an alert or inserting a message into the page
      alert("Error creating link: " + err);
    }
  });
};
