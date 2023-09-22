// script.js
document.getElementById("apiForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    const apiUrlInput = document.getElementById("apiUrl");
    const apiUrl = apiUrlInput.value;

    const options = {
        method: 'POST',
        headers: {
            accept: 'image/*',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            qr_code_settings: {
                code_pattern: 3,
                finder_pattern: 1,
                image_format: 'png',
                center_logo_url: apiUrl, // Use the user-provided API URL
                width: 500,
                margin: 1,
                code_color: '#000000',
                background_color: '#FFFFFF',
                finder_pattern_color: '#000000'
            },
            data: {
                $fallback_url: 'http://musicapp.amazon.com',
                $canonical_url: 'http://musicapp.amazon.com',
                $marketing_title: '1 – Download the App AZ',
                ~campaign: '1 – Download the App AZ',
                ~tags: ['1', 'AZ']
            },
            branch_key: 'key_live_ozpgeobWoV1PyOAvLLf5lomdwva66WYq'
        })
    };

    fetch('https://api2.branch.io/v2/qr-code', options)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.blob();
        })
        .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;

            const imageContainer = document.getElementById("imageContainer");
            imageContainer.innerHTML = "";
            imageContainer.appendChild(imageElement);

            URL.revokeObjectURL(imageUrl);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});