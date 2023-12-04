// listen for click on QR button
document.getElementById('generateQRButton').addEventListener('click', function() {
    const options = {
        method: 'POST',
        headers: {accept: 'image/*', 'content-type': 'application/json'},
        body: JSON.stringify({
          // QR code data
          qr_code_settings: {
            code_pattern: 2,
            finder_pattern: 1,
            image_format: 'png',
            center_logo_url: 'https://cdn.branch.io/branch-assets//1153816943598261245/Listen_Now_2-1697049424813.png',
            width: 500,
            margin: 1,
            code_color: '#0030FF',
            background_color: '#FFFFFF',
            finder_pattern_color: '#FF0000'
          },
          data: {
            '$canonical_url': 'https://eperez-branch.github.io/',
            '$fallback_url': 'https://eperez-branch.github.io/',
            '~campaign': 'Website QR API Test',
            '~channel': 'QR API'
          },
          branch_key: 'key_live_ozpgeobWoV1PyOAvLLf5lomdwva66WYq'
        })
    };
    
    fetch('https://api2.branch.io/v2/qr-code', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            var img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            document.getElementById('qrCodeContainer').innerHTML = '';
            document.getElementById('qrCodeContainer').appendChild(img);

            // Show the download button
            document.getElementById('downloadQRButton').style.display = 'block';
        })
        .catch(err => console.error('Error:', err));
});

// listen for click on download button
document.getElementById('downloadQRButton').addEventListener('click', function() {
    var img = document.querySelector('#qrCodeContainer img');
    if (img && img.src) {
        downloadImage(img.src, 'qr-code.png');
    }
});

function downloadImage(dataUrl, filename) {
    var a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById('addLinkData').addEventListener('click', function() {
    var container = document.getElementById('linkData');
    var newPair = document.createElement('div');
    newPair.classList.add('form-group');
    newPair.innerHTML = `
        <label>Key:</label>
        <input type="text" class="form-control key-input" placeholder="Enter key">
        <label>Value:</label>
        <input type="text" class="form-control value-input" placeholder="Enter value">
    `;
    container.appendChild(newPair);
});
