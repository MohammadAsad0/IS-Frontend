var QRCode = require('qrcode')
var { saveAs } = require('file-saver');

export const makeQRCode = (dataString) => {
    QRCode.toDataURL(dataString, function (err, url) {
        saveAs(url, 'image.jpg')
    })
}
