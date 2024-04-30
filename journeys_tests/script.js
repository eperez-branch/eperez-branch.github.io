// Utility function to check if the Branch journey (banner) exists on the page
function doesJourneyExistOnPage() {
    var elem = document.getElementById("branch-banner-iframe");
    return !!elem; // Converts the element's existence to a boolean
}

// Function to update the journey with race condition handling
function updateJourney() {
    if (doesJourneyExistOnPage()) {
        // Option 2: Use callback of closeJourney to ensure sequence
        branch.closeJourney(function() {
            setTimeout(function() { // Adds a slight delay to avoid race condition
                setBranchDataAndTrack();
            }, 500); // 500 ms delay
        });
    } else {
        setBranchDataAndTrack();
    }
}

// Sets Branch view data and tracks page view
function setBranchDataAndTrack() {
    var linkData = {
        data: {
            'ECID': 'MyECID987',
            'custom_int': Date.now(),
            'custom_string': 'Scripting Test'
        }
    };
    branch.setBranchViewData(linkData);
    branch.track('pageview');
}

// Function to setup Branch event listeners
function setupBranchListeners() {
    // Subscribe to Journey events
    branch.addListener('willShowJourney', function() {
        console.log('Journey is about to be shown.');
    });
    branch.addListener('didShowJourney', function() {
        console.log('Journey has been shown to the user.');
    });
    branch.addListener('willNotShowJourney', function() {
        console.log('Journey will not be shown.');
    });
    branch.addListener('didClickJourneyCTA', function() {
        console.log('User clicked on Journey\'s CTA button.');
    });
    branch.addListener('didClickJourneyClose', function() {
        console.log('User clicked on Journey\'s close button.');
    });
    branch.addListener('willCloseJourney', function() {
        console.log('Journey close animation has started.');
    });
    branch.addListener('didCloseJourney', function() {
        console.log('Journey\'s close animation has completed and it is no longer visible.');
    });
    branch.addListener('didCallJourneyClose', function() {
        console.log('developer has called branch.closeJourney() to dismiss Journey.');
    });

    // Example of how to unsubscribe to an event if needed
    // branch.removeListener('willShowJourney', listener); // Pass the specific listener function if you ever need to remove it
}

// Call this function when the page loads to setup listeners
document.addEventListener('DOMContentLoaded', setupBranchListeners);
