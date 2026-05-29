package com.your.app.name; // Ovo ostaje tvoj paket

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import com.capacitorcommunity.barcodescanner.BarcodeScanner; // OVO JE KLJUČNO

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Registruj plugin ručno ako auto-inicijalizacija zeza
        registerPlugin(com.capacitorcommunity.barcodescanner.BarcodeScanner.class);
    }
}