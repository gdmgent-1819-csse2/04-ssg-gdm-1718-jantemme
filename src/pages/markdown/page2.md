---
path: "/page2"
date: "2017-11-03"
title: "My second blog post"
---

# GROVEPI

GrovePi+ is een board met 15 Grove 4-pin connectoren welke de Grove sensoren naar de Raspberry Pi brengen. Het is een eenvoudig aan te sluiten en te gebruiken modulair systeem voor hardware hacking met de Raspberry Pi. Solderen of breadboards zijn overbodig, plug je Grove sensoren simpelweg in de GrovePi+ en je kunt direct beginnen met programmeren.

## Wat is het? 

De GrovePi+ is een uitbreidingsboard voor de raspberryPi. Het board bevat 15(!) connectoren om sensoren en andere hardware aan te sluiten. De externe hardware is apart verkrijgbaar. 

## Poorten

Het board bestaat uit 7 digitale poorten, 3 analoge, 3 I2C poorten, 1 seriële poort voor de grovepi en 1 voor de rapsberryPi. Dan heb je ook nog 1 poort die 5V output geeft.

## Connecteren met pi

We connecteren ze door de GrovePi op de raspberry te zetten. Pas op en plaats de connector met zorg op de pinnetjes.

## Hardware

Je kan sensoren en andere hardware apart verkrijgen of samen met de GrovePi bestellen. Deze connecteer je dan met de GrovePi via de 4-pin connectoren. Je mag de hardware niet zomaar connecteren want zoals boven vermeld zijn niet al de poorten hetzelfde. 

### Connecteren 

Wanneer we de hardware gaan connecteren moeten we opletten wat we waar aansluiten. Bij elke aansluiting staat wat voor poort het is. 
De A-poorten zijn analoog, D-poorten zijn digitaal, verder heb je nog de seriële poort en de I2C-poorten.

## Software setup

Op je raspberry, navigeer naar een map waar je de GrovePi files wilt installeren.

In die map clone je de GrovePi github repo door volgend commando uit te voeren:
```
git clone https://github.com/DexterInd/GrovePi
```

Dan krijg je volgende response:

Er is nu een GrovePi map aangemaakt, navigeer naar deze map door volgende commando’s uit te voeren: 

```
cd GrovePi
```

Installeer de GrovePi library door volgend commando uit te voeren:

```
curl -kL dexterindustries.com/update_grovepi | bash
```

Navigeer naar de Python map en voer de grovepi.py applicatie uit:

```
cd Software/Python
python grovepi.py
```

Als alles goed is verlopen krijg je bovenstaande response.

## Writing python

Hieronder vind je een voorbeeld programma om het ledje aan te sturen, sluit de led aan op poort D4. 

```python
import time
from grovepi import *

led = 4

pinMode(led,"OUTPUT")
time.sleep(1)

while True:
    try:
        digitalWrite(led,1)
        time.sleep(1)

        digitalWrite(led,0)
        time.sleep(1)

    except KeyboardInterrupt:
        digitalWrite(led,0)
        break
```

de bovenstaande code zet je in een file met .py als extentie. In je terminal navigeer je dan naar waar dit bestand staat en voer je het volgende commando uit om het programma te runnen. 

```shell
Python led_blink.py
```