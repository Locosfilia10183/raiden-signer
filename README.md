# RAIDEN SIGNER – iPhone-only starter

Dies ist eine installierbare **PWA/Web-App**, kein nativer iOS-Signer.

## Was bereits funktioniert
- iPhone-optimierte RAIDEN-Oberfläche
- IPA/TIPA-Dateien aus der Dateien-App importieren
- Lokale Bibliothek mit IndexedDB (Dateien bleiben im Browser-Speicher dieses Geräts)
- Dateien über das iOS-Teilen-Menü weitergeben
- Offline-Caching der App-Oberfläche

## Was NICHT implementiert ist
- Kein Erzeugen oder Hosten von Apple-Signaturzertifikaten
- Kein direktes Signieren oder Installieren beliebiger IPA-Dateien aus Safari
- Kein automatischer Download fremder IPA-Dateien
- Kein Umgehen von Apples Signatur- oder Sicherheitsprüfungen

Für echtes On-device-Signieren kann eine kompatible App wie Feather verwendet werden. Feather benötigt ein gültiges Zertifikatspaar und ein passendes Provisioning-Profil. Die PWA kann diese Berechtigungen nicht erzeugen.

## Veröffentlichung ohne PC – direkt am iPhone
1. Lege auf GitHub im Safari-Browser ein neues öffentliches oder privates Repository `raiden-signer` an.
2. Lade die Dateien aus diesem ZIP in das Repository hoch (GitHub-Weboberfläche → Add file → Upload files).
3. Öffne Repository → Settings → Pages.
4. Wähle `Deploy from a branch`, Branch `main`, Ordner `/root`, speichere.
5. Warte auf die GitHub-Pages-Adresse, öffne sie in Safari.
6. Safari → Teilen → **Zum Home-Bildschirm**.

Alternativ kannst du die Dateien in einen statischen Hosting-Dienst hochladen, der HTTPS unterstützt. Service Worker/PWA-Funktionen benötigen HTTPS oder localhost.

## Datenschutz / Speicher
IPA-Dateien werden lokal im Browser-IndexedDB gespeichert. Löschen von Website-Daten, privatem Browsing oder Speicherdruck durch iOS kann die lokale Bibliothek entfernen. Bewahre Originaldateien zusätzlich in der Dateien-App/iCloud Drive auf.

## Sicherheit
Importiere nur IPA-Dateien aus Quellen, denen du vertraust. Eine IPA kann schädlichen Code enthalten. Teile niemals deine Apple-ID, Passwörter, Zertifikate oder privaten Schlüssel mit unbekannten Signierdiensten.
