function displayPhrase()
{
    var linkData = {
        campaign: 'content 123',
        channel: 'facebook',
        feature: 'dashboard',
        stage: 'new user',
        tags: [ 'tag1', 'tag2', 'tag3' ],
        alias: '',
        data: {
            'custom_bool': true,
            'custom_int': Date.now(),
            'custom_string': 'hello',
            '$fallback_url_uk': 'https://music.amazon.co.uk/genres/zEy210aB',
            '$desktop_url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
    }
    branch.link(linkData, function(err, link) {
        var demoElement = document.getElementById("demo");

        if (link) {
            // Create a new anchor element
            var linkElement = document.createElement('a');
            linkElement.href = link; // Set the href attribute
            linkElement.textContent = link; // Set the link text
            linkElement.target = "_blank"; // Open in new tab

            // Replace the existing span with this new anchor element
            demoElement.replaceWith(linkElement);
        } else {
            // If there's an error, just display the error message
            demoElement.textContent = err;
        }
    });
};

function customEvent() {
   var custom_data = {
      "Web Event Property Key 1": "Web Event Property Val 1",
      "Web Event Property Key 2": "Web Event Property Val 2",
   };

   branch.logEvent(
      "Web Event",
      custom_data,
      function(err) { console.log(err); }
      );
};

function completedRegistration() {
   var event_and_custom_data = {
      "transaction_id": "tras_Id_1234",
      "description": "Preferred purchase",
      "registration_id": "12345"
   };

   var customer_event_alias = "my custom alias";

   branch.logEvent(
      "COMPLETE_REGISTRATION",
      event_and_custom_data,
      customer_event_alias,
      function(err) { console.log(err); }
      );
};

function addToCart() {
   var event_and_custom_data = {
      "transaction_id": "tras_Id_1232343434",
      "currency": "USD",
      "revenue": 180.2,
      "shipping": 10.5,
      "tax": 13.5,
      "coupon": "promo-1234",
      "affiliation": "high_fi",
      "description": "Preferred purchase",
      "purchase_loc": "San Francisco",
      "store_pickup": "unavailable"
   };

   var content_items = {
      "$content_schema": "COMMERCE_PRODUCT",
      "$og_title": "MadLib Story",
      "$og_description": "Start loving your stories",
      "$canonical_identifier": "MadLib/1234",
      "$publicly_indexable": false,
      "$price": 101.2,
      "$locally_indexable": true,
      "$quantity": 1,
      "$sku": "1101123445",
      "$product_name": "MadLib Word",
      "$product_brand": "MadLib",
      "$product_category": "Story",
      "$product_variant": "XL",
      "$rating_average": 4.2,
      "$rating_count": 5,
      "$rating_max": 2.2,
   };

   var customer_event_alias = "Add to Cart alias";

   branch.logEvent(
      "ADD_TO_CART",
      event_and_custom_data,
      content_items,
      customer_event_alias,
      function(err) { console.log(err); }
      );
};


function purchaseComplete() {
   var event_and_custom_data = {
      "transaction_id": "tras_Id_1232343434",
      "currency": "USD",
      "revenue": 180.2,
      "shipping": 10.5,
      "tax": 13.5,
      "coupon": "promo-1234",
      "affiliation": "high_fi",
      "description": "Preferred purchase",
      "purchase_loc": "San Francisco",
      "store_pickup": "maybe"
   };

   var content_items = {
      "$content_schema": "COMMERCE_PRODUCT",
      "$og_title": "MadLib Story",
      "$og_description": "Start loving your stories",
      "$canonical_identifier": "MadLib/1234",
      "$publicly_indexable": false,
      "$price": 101.2,
      "$locally_indexable": true,
      "$quantity": 1,
      "$sku": "1101123445",
      "$product_name": "MadLib Word",
      "$product_brand": "MadLib",
      "$product_category": "Story",
      "$product_variant": "XL",
      "$rating_average": 4.2,
      "$rating_count": 5,
      "$rating_max": 2.2,
   };

   var customer_event_alias = "Complete Purchase: MadLib Story";

   branch.logEvent(
      "PURCHASE",
      event_and_custom_data,
      content_items,
      customer_event_alias,
      function(err) { console.log(err); }
      );
}

function readDeeplinkData() {
    branch.data(function(err, data) {
        console.log(err, data);
    });
}

function doLogin() {
    branch.setIdentity('123456', function (err, data) {
        console.log(err, data);
    });
}

function doLogout() {
    branch.logout(function(err, data) {
        console.log(err, data);
    });
}

// Function to extract query parameters
function getQueryParams() {
    var params = {};
    var parser = document.createElement('a');
    parser.href = window.location.href;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return params;
}

// Function to build query string from parameters
function buildQueryString(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

// Append query parameters to the button's URL
window.onload = function() {
    var queryParams = getQueryParams();
    var queryString = buildQueryString(queryParams);
    var button = document.getElementById('longLinkButton');
    button.onclick = function() {
        location.href = 'https://eduardo.app.link/' + (queryString ? '?' + queryString : '');
    };
};

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("launchBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal and load content from a URL
btn.onclick = function() {
  fetch('https://eperez-branch.github.io/clientqrgeneration/') // Replace with the URL you want to load
    .then(response => {
      // Check if the request was successful
      if (response.ok) {
        return response.text(); // Or `.json()` if the URL returns JSON data
      }
      throw new Error('Network response was not ok.');
    })
    .then(html => {
      document.getElementById('myModal').innerHTML = html; // Insert the content into the modal body
      modal.style.display = "block";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)"; // Dim background
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      document.getElementById('myModal').innerHTML = '<p>Error loading content. Please try again later.</p>'; // Provide an error message in the modal
      modal.style.display = "block";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)"; // Dim background
    });
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.body.style.backgroundColor = ""; // Undim background
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.backgroundColor = ""; // Undim background
  }
}
