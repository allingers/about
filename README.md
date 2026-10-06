# Amanda Allinger – om mig

En personlig sida byggd med semantisk HTML, separat CSS och vanilla JavaScript.
Öppna `index.html` i webbläsaren. Inga ramverk eller installationer behövs.

## Innehåll

- Hero med namn, porträtt och titlarna UX-student och webbutvecklare.
- Kort presentation med möjlighet att läsa mer.
- Flikar för kunskaper, styrkor och utvecklingsområden.
- Tidslinje: utbildningsstart 2022, examen 2024 och UX Engineer-studier 2026.
- Sidfot med en länk till GitHub.

## Interaktioner och kurskrav

JavaScript laddas med `defer` och alla händelser kopplas med `addEventListener`.

- **Klassväxling:** ”Mer om mig” använder `classList.toggle` för `is-open`.
- **Rörelse och förändring:** texten i heron skrivs och suddas ut. Utfällningen
  animerar höjd och opacitet, och knappens plus roterar till ett kryss.
- **If/else:** utfällningens läge styr knapptexten ”Mer om mig”/”Visa mindre”.
- **Flikar:** visar ett område åt gången. Piltangenterna, Home och End byter
  flik; Tab går vidare till det valda innehållet.
- **Paus:** skrivanimationen kan pausas och återupptas. Den stannar även när
  webbläsarfliken inte är synlig.
- **Scroll:** innehåll tonas in med en liten rörelse uppåt när det kommer in
  i bild. `IntersectionObserver` aktiverar effekten en gång per element.
  Innehåll som redan syns vid start påverkas inte. Tangentbordsfokus visar
  innehållet direkt, och minskad rörelse stänger av effekten.

## Tillgänglighet

Kontaktsektionen har en mejllänk utformad som en knapp. Den öppnar besökarens
mejlprogram med adressen `amanda-allinger@student.chasacademy.se`.
Länken fungerar utan JavaScript. Ett konfigurerat mejlprogram behövs.

Semantiska element, en `h1`, rubriknivåer i ordning, riktiga knappar/länkar,
listor och alt-texter på båda bilderna. Synliga fokusramar och en hopplänk
underlättar tangentbordsnavigation.

Utfällningen använder `aria-expanded`, `aria-controls` och
`inert`. Flikarna använder `tablist`, `tab`, `tabpanel` och `aria-selected`.
Skärmläsare får en fast version av yrkestitlarna i stället för varje bokstav.
`prefers-reduced-motion` ger statiska titlar och tar bort animationer.

Utan JavaScript visas all presentationstext och samtliga kunskapsområden.
Interaktionsknapparna visas först när JavaScript körs. Layouten går över till
en kolumn på smala skärmar.

## Före inlämning

Kontrollera layout, bilder och interaktioner i webbläsaren på mobil och dator.
Läs igenom texterna, särskilt styrkor och utvecklingsområden, så att de
beskriver dig med dina egna ord. Se till att alla filer och bilder finns i
det publika GitHub-repot.

Skriv din egen processreflektion i Canvas: vad var svårast, vad ändrade du
utifrån kodgranskningen (och vad valde du bort), och vad skulle du göra härnäst?
