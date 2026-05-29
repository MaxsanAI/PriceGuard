import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
BarcodeScanner.prepare();
const scanButton = document.getElementById('scan-button');
const resultDiv = document.getElementById('result');
const appDiv = document.getElementById('app');

const startScan = async () => {
    try {
        // 1. Check permissions (force: true triggers the request dialog)
        const status = await BarcodeScanner.checkPermission({ force: true });

        if (status.granted) {
            // Permission granted, prepare screen
            BarcodeScanner.hideBackground();
            document.querySelector('body').style.backgroundColor = 'transparent';
            appDiv.style.display = 'none';

            // Start the scanner
            const result = await BarcodeScanner.startScan();

            // Scanning finished or canceled, restore UI
            BarcodeScanner.showBackground();
            document.querySelector('body').style.backgroundColor = '#121212';
            appDiv.style.display = 'block';

            if (result.hasContent) {
                resultDiv.innerText = "Scanned: " + result.content;
            }
        } else if (status.denied) {
            alert("Camera permission denied! Go to Settings -> Apps -> PriceGuard -> Permissions and enable Camera.");
        }
    } catch (err) {
        console.error("Scanner error: ", err);
        // Ensure UI is restored if an error occurs
        BarcodeScanner.showBackground();
        document.querySelector('body').style.backgroundColor = '#121212';
        appDiv.style.display = 'block';
        alert("An error occurred while accessing the camera.");
    }
};

scanButton.addEventListener('click', startScan);