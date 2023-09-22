document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("fetchButton").addEventListener("click", function () {
        const apiUrl = 'https://api2.branch.io/v2/qr-code';

        const requestBody = `{
            "qr_code_settings": {
                "code_pattern": 3,
                "finder_pattern": 1,
                "image_format": "png",
                "center_logo_url": "https://cdn.branch.io/branch-assets//1153816943598261245/Letter_A-1695340831611.png",
                "width": 500,
                "margin": 1,
                "code_color": "#000000",
                "background_color": "#FFFFFF",
                "finder_pattern_color": "#000000"
            },
            "data": {
                "$fallback_url": "http://musicapp.amazon.com",
                "$canonical_url": "http://musicapp.amazon.com",
                "$marketing_title": "1 – Download the App AZ",
                "~campaign": "1 – Download the App AZ",
                "~tags": ["1", "AZ"]
            },
            "branch_key": "key_live_ozpgeobWoV1PyOAvLLf5lomdwva66WYq"
        }`;

        const options = {
            method: 'POST',
            headers: {
                accept: 'image/png', // Specify that you're expecting a PNG response
                'content-type': 'application/json'
            },
            body: requestBody // Use the manually defined request body string
        };

        fetch(apiUrl, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.blob();
            })
            .then((blob) => {
                // Create a URL for the blob response
                const imageUrl = URL.createObjectURL(blob);

                // Create an image element and set its source
                const imageElement = document.createElement("img");
                imageElement.src = imageUrl;

                // Append the image to the specified container
                const imageContainer = document.getElementById("imageContainer");
                imageContainer.innerHTML = "";
                imageContainer.appendChild(imageElement);

                // Revoke the object URL to release resources
                URL.revokeObjectURL(imageUrl);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});
