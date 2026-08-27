ODD FELLOW I SLAGELSE – INFOTAVLE PWA V2

Denne version er lavet til GitHub Pages + HY300 og kan køre offline efter første indlæsning.

NYT I V2 – AUTOMATISK SLIDESHOW
Du skal ikke længere redigere billeder.json.

Din arbejdsgang er:
1. Upload et nyt JPG/PNG/WEBP/GIF/AVIF-billede til mappen slideshow/ på GitHub.
2. GitHub Action kører automatisk.
3. Den scanner hele slideshow-mappen og genererer slideshow/billeder.json.
4. Projektoren opdager den nye liste næste gang den har internet.
5. De nye billeder caches og kan derefter bruges offline.

Filerne må gerne have almindelige navne, fx:
- huset.jpg
- samtale-1.jpg
- sct-michaels-nat.png

INSTALLATION PÅ HY300
1. Upload hele denne pakke til GitHub Pages-repositoriet.
2. Sørg for at GitHub Actions er tilladt for repositoriet.
3. Åbn siden på HY300 mens den har internet.
4. Installer/Føj til startskærm.
5. Lad den stå online første gang, så service worker cacher appen.
6. Test derefter med Wi-Fi slået fra.

VIGTIGT:
Projektoren kan naturligvis ikke modtage nye billeder, mens den er offline.
Men den fortsætter med at vise de senest cachede billeder. Når den igen får internet,
henter den automatisk den opdaterede billedliste og de nye billeder.

GitHub Action:
.github/workflows/update-slideshow.yml

QR-koden peger på:
https://concordia35.github.io/Oddfellow/
