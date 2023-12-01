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
        .then(response => response.blob()) // Assuming the response is an image blob
        .then(blob => {
            var img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            document.getElementById('qrCodeContainer').innerHTML = '';
            document.getElementById('qrCodeContainer').appendChild(img);
        })
        .catch(err => console.error('Error generating QR Code:', err));
});
