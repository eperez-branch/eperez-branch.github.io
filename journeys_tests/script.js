// Function to update the journey
function updateJourney() {
    // Close the current Branch journey
    branch.closeJourney();

    // Optional: Update link data if needed
    var linkData = {
        data: {
            'ECID': 'MyTestECID',
            'custom_int': Date.now(),
            'custom_string': 'testing JS!'
        }
    };
    branch.setBranchViewData(linkData);

    // Track a pageview event, which could reload the banner
    branch.track('pageview');
}
