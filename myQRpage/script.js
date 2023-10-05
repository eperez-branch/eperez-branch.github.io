document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("fetchButton").addEventListener("click", function () {
        const apiUrl = 'https://api2.branch.io/v2/qr-code';

        const requestBody = {
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
