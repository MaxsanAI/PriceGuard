import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const scanButton = document.getElementById('scan-button');
const resultDiv = document.getElementById('result');

const startScan = async () => {
    // 1. Provera dozvola
    const status = await BarcodeScanner.checkPermission({ force: true });
    
    if (status.granted) {
        // 2. Priprema ekrana (providnost da se vidi kamera)
        BarcodeScanner.hideBackground();
        document.querySelector('body').style.backgroundColor = 'transparent';
        document.getElementById('app').style.display = 'none';

        // 3. Pokretanje kamere
        const result = await BarcodeScanner.startScan();
        
        // 4. Vraćanje UI-a nakon skeniranja
        document.querySelector('body').style.backgroundColor = '#121212';
        document.getElementById('app').style.display = 'block';

        if (result.hasContent) {
            resultDiv.innerText = "Scanned Code: " + result.content;
            // OVDE ČEKAŠ API POZIV
        }
    } else {
        alert("Camera permission denied!");
    }
};

scanButton.addEventListener('click', startScan);