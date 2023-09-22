document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("fetchButton").addEventListener("click", function () {
        const apiUrl = 'https://api2.branch.io/v2/qr-code';

        const requestBody = {
            "qr_code_settings": {
                "code_pattern": 3,
                "finder_pattern": 1,
                "image_format": "png",
                "width": 500,
                "code_color": "#000000",
                "finder_pattern_color": "#000000",
                "background_color": "#FFFFFF",
                "center_logo_url": "https://cdn.branch.io/branch-assets//1153816943598261245/Number_1-1693347048370.png",
                "margin": 1
            },
            "data": {
                "$fallback_url": "http://musicapp.amazon.com/?ref=dmm_acq_dm_az_octnewmove_2023",
                "$canonical_url": "https://musicapp.amazon.com",
                "$marketing_title": "1 – Download the App AZ",
                "~campaign": "dmm_acq_dm_az_octnewmove_2023",
                "ref": "dmm_acq_dm_az_octnewmove_2023",
                "~tags": ["1", "AZ"]
            },
            "branch_key": "key_live_ozpgeobWoV1PyOAvLLf5lomdwva66WYq"
        };

        const options = {
            method: 'POST',
            headers: {
                accept: 'image/png', // Specify that you're expecting a PNG response
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestBody) // Convert the request body to JSON string
        };

        fetch(apiUrl, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.blob(); // Get the response as a blob
            })
            .then((blob) => {
                // Create a URL for the blob response
                const imageUrl = URL.createObjectURL(blob);

                // Programmatically trigger a click event on an anchor to initiate download
                const downloadLink = document.createElement("a");
                downloadLink.href = imageUrl;
                downloadLink.download = "1DownloadTheAppAZ.png";
                downloadLink.click();

                // Revoke the object URL to release resources
                URL.revokeObjectURL(imageUrl);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});
