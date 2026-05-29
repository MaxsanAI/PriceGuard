import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Geolocation } from '@capacitor/geolocation';

const scanButton = document.getElementById('scan-button');

const startScan = async () => {
    // 1. Traži dozvolu za kameru
    const { camera } = await BarcodeScanner.requestPermissions();
    if (camera !== 'granted') {
        alert('Dozvola za kameru je neophodna!');
        return;
    }

    // 2. Traži dozvolu za lokaciju
    const status = await Geolocation.requestPermissions();
    if (status.location !== 'granted') {
        alert('Dozvola za lokaciju je neophodna!');
        return;
    }

    // Ako je sve odobreno, pokreni skener i uzmi lokaciju
    const { barcodes } = await BarcodeScanner.scan();
    const coordinates = await Geolocation.getCurrentPosition();

    if (barcodes.length > 0) {
        alert("Skenirano: " + barcodes[0].rawValue + "\nLokacija: " + coordinates.coords.latitude + ", " + coordinates.coords.longitude);
    }
};

scanButton.addEventListener('click', startScan);