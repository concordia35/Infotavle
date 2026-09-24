V6 online slideshow fix

Fejlen var i slideshow/billeder.json. Online-versionen læser denne fil først, og den indeholdt kun:
01.png
02.png

Derfor virkede alle billeder lokalt via fallback-listen, mens GitHub Pages kun viste to.

V6:
- billeder.json indeholder nu alle slideshowbilleder.
- billeder.txt er synkroniseret med samme liste.
- alle billeder precaches i service workeren.
- cache-navnet er hævet til V6.
