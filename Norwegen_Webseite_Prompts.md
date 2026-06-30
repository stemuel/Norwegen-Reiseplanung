# Prompts für Claude Code: Norwegen-Reiseplan als Webseite

So wie bei deinem Südostasien-Plan: mehrere aufeinanderfolgende Prompts, weil eine komplette Webseite mit allen Inhalten in einem Rutsch das Output-Limit sprengt. Reihenfolge einhalten, jeden Prompt erst abschließen lassen, bevor der nächste kommt.

**Vorbereitung:** Lege `Norwegen_Reiseplan_2026_Eltern.md` ins Projektverzeichnis, das du in VS Code mit Claude Code öffnest. Alle Prompts unten gehst du nacheinander durch.

---

## Prompt 1 — Grundgerüst

```
Ich habe eine Markdown-Datei "Norwegen_Reiseplan_2026_Eltern.md" mit einem
vollständigen Camper-Reiseplan (Hamburg–Norwegen–Marktoberdorf, 31 Tage,
11. Aug–11. Sept 2026). Baue daraus eine interaktive, statische Webseite
(HTML/CSS/JS, kein Framework nötig, soll auf GitHub Pages laufen).

Grundgerüst in diesem Schritt:
- index.html als Startseite mit Gesamtübersicht: eine chronologische Liste/
  Zeitleiste aller Stopps entlang der Route (Hirtshals, Kristiansand,
  Lillesand, Arendal, Stavanger, Hardangerfjord/Lofthus/Odda, Bergen, Flåm,
  Geiranger, Romsdal/Åndalsnes, Jotunheimen, Oslo, Göteborg,
  Dänemark-Rückweg, Marktoberdorf), jeweils mit Ortsname, Datum/Tag-Nummer
  und einem "Mehr erfahren"-Link zur jeweiligen Unterseite (siehe Prompt 2+).
- Keine Karte einbauen — die Übersicht soll rein über diese Zeitleiste/Liste
  funktionieren.
- Navigation: Sidebar oder Top-Nav mit allen Stopps in chronologischer
  Reihenfolge, klickbar.
- Lege für jeden Stopp eine eigene Unterseite an (z.B. kristiansand.html),
  aber befülle in diesem Schritt erstmal nur mit Platzhalter-Struktur:
  Überschrift, leere Sections für "Sehenswürdigkeiten", "Natur & Aktivitäten",
  "Essen & Lokales", "Geheimtipps", "Praktisches" — die Inhalte kommen in
  den nächsten Schritten.
- Sauberes, cleanes Grunddesign: helle Farben, viel Weißraum, eine Akzentfarbe
  passend zu Norwegen (z.B. ein Fjord-Blau oder Tannengrün), gut lesbare
  Schrift (Systemfont oder Google Font wie "Inter" oder "Outfit"),
  responsive für Handy (die Eltern nutzen das vermutlich offline auf dem
  Smartphone unterwegs).
- Erstelle eine einfache Ordnerstruktur: /css, /js, /pages (oder ähnlich),
  sauber organisiert für GitHub Pages.

Committe noch keine Inhalte aus der Markdown-Datei in die Unterseiten —
das machen wir in den nächsten Prompts Stopp für Stopp, wegen Output-Länge.
```

---

## Prompt 2 — Stopp 1–4 befüllen (Hirtshals, Kristiansand, Lillesand & Arendal, Stavanger)

```
Befülle jetzt die Unterseiten für die ersten vier Stopps mit den vollständigen
Inhalten aus "Norwegen_Reiseplan_2026_Eltern.md":
1. Hirtshals
2. Kristiansand
3. Lillesand & Arendal
4. Stavanger & Lysefjord

Für jeden Stopp:
- Alle Abschnitte übernehmen (Sehenswürdigkeiten, Natur & Aktivitäten,
  Essen & Lokales, Geheimtipps, Praktisches/KI-Prompts).
- Sterne-Bewertungen (⭐/⭐⭐/⭐⭐⭐) aus der Markdown-Datei als kleine visuelle
  Badges/Icons darstellen, nicht nur als Text.
- Aufklappbare Kategorien (Accordion/Collapsible Sections), damit man auf
  dem Handy nicht endlos scrollen muss — Standardzustand: "Sehenswürdigkeiten"
  offen, Rest eingeklappt.
- Füge zu jedem Ort, wo sinnvoll, ein passendes Bild von Wikimedia Commons
  ein (über die Wikimedia Commons API oder direkte stabile URLs, KEINE
  Bilder von anderen Quellen wegen Urheberrecht). Ein Hero-Bild oben auf
  jeder Seite reicht, keine Bilderflut.
- Datum/Tag-Nummer der Reise prominent anzeigen (z.B. "Tag 2–3, 12.–13. August").
- Zurück-Button zur Gesamtübersicht/Zeitleiste und Vor/Zurück-Navigation zum
  nächsten/vorherigen Stopp.
```

---

## Prompt 3 — Stopp 5–8 befüllen (Hardangerfjord, Bergen, Flåm & Sognefjord, Geiranger)

```
Befülle jetzt die Unterseiten für die nächsten vier Stopps aus
"Norwegen_Reiseplan_2026_Eltern.md", im selben Stil wie die vorherigen
(Accordion-Sections, Sterne-Badges, Wikimedia-Bild, Tag-Anzeige, Navigation):
5. Hardangerfjord (Lofthus/Odda)
6. Bergen
7. Flåm & Sognefjord
8. Geiranger

Bitte konsistent zum bisherigen Design bleiben, keine neuen Stilelemente
einführen.
```

---

## Prompt 4 — Stopp 9–12 befüllen (Romsdal, Jotunheimen, Oslo, Göteborg)

```
Befülle jetzt die Unterseiten für die restlichen Stopps aus
"Norwegen_Reiseplan_2026_Eltern.md", im selben Stil:
9. Romsdal (Trollstigen/Åndalsnes)
10. Jotunheimen-Randgebiet
11. Oslo
12. Göteborg-Region & Dänemark-Rückweg (können auf einer gemeinsamen,
    kürzeren Seite zusammengefasst werden, da reine Etappen-Stopps)

Ergänze außerdem eine "Praktische Infos"-Seite mit den allgemeinen
Hinweisen aus der Markdown-Datei (Maut/AutoPASS, freies Campen,
Wetter, nützliche Apps) sowie eine Seite mit der kompletten
"Master KI-Prompt-Liste" zum Nachschlagen unterwegs.
```

---

## Prompt 5 — Verpflegungs- & Einkaufsplan integrieren

```
Aus der Originaldatei "Norwegen_Reise_Gesamtplan.md" (liegt auch im Projekt)
gibt es zusätzlich einen Verpflegungsplan fürs Abendessen (10 Grundgerichte
im Wechsel, Wochenübersicht) und einen Einkaufsplan Deutschland (Mengentabellen
für Trockenwaren, Frühstück, Notfallvorrat).

Erstelle dafür zwei weitere Seiten:
- "Essen unterwegs": die 10 Grundgerichte als Kartenraster, die
  Wochenrotation als einfache Tages-Tabelle oder Zeitleiste, dazu die
  Einkaufsstrategie (was in Deutschland/Dänemark kaufen vs. was erst in
  Norwegen).
- "Einkaufsliste": die Mengentabellen aus der Datei als saubere,
  gut lesbare Tabellen (ggf. mit Checkbox-Funktion zum Abhaken beim
  Einkaufen, rein clientseitig mit localStorage — falls localStorage
  nicht unterstützt wird, einfache visuelle Checkboxen ohne Speicherung).

Verlinke beide neuen Seiten von der Hauptnavigation aus.
```

---

## Prompt 6 — Premium-Redesign (am Ende, wenn alle Inhalte drin sind)

```
Jetzt wo alle Inhalte vollständig sind: Überarbeite das komplette Design der
Webseite zu einem Premium-Look im Stil von TripAdvisor/Booking.com —
hochwertig, vertrauenswürdig, aber nicht überladen. Konkret:

- Klare visuelle Hierarchie: große, ruhige Hero-Bereiche pro Seite,
  Karten/Cards mit dezenten Schatten und abgerundeten Ecken für
  Sehenswürdigkeiten-Einträge statt reiner Textblöcke.
- Konsistentes Farbschema: eine Hauptfarbe (Fjord-Blau), eine Akzentfarbe
  für Sterne/Highlights (z.B. warmes Gold/Orange wie bei Bewertungssternen),
  neutrale Grautöne für Text und Hintergrund.
- Hochwertige Typografie: klare Schriftgrößen-Hierarchie (große Headlines,
  gut lesbarer Fließtext), ausreichend Zeilenabstand.
- Sticky Top-Navigation mit Fortschrittsanzeige ("Tag X von 31") und
  Schnellzugriff zurück zur Gesamtübersicht/Zeitleiste.
- Auf der Übersichtsseite: die Zeitleiste/Liste der Stopps als ansprechende
  Card-Reihe gestalten (statt reiner Textliste), mit Hover-Effekten.
- Badges/Tags für Kategorien (z.B. "⭐ Highlight", "🥾 Wanderung",
  "🍽️ Essen", "💡 Geheimtipp") konsistent über alle Seiten.
- Micro-Interactions: sanfte Übergänge beim Auf-/Zuklappen der Accordion-
  Sections, sanftes Hover auf Cards und Buttons.
- Dark-Mode ist NICHT nötig — Fokus auf ein helles, frisches, "outdoor"-
  passendes Design.
- Wichtig: Performance und Offline-Tauglichkeit nicht verschlechtern
  (die Seite soll weiterhin als einfache statische Seite auf dem Handy
  unterwegs gut funktionieren, auch bei schlechtem Empfang in den Fjorden).

Gehe die Seite einmal komplett durch und sorge für volle Konsistenz
zwischen allen Unterseiten.
```

---

## Hinweise zur Nutzung

- Reihenfolge wichtig, da Claude Code sich beim Befüllen auf die bereits
  bestehende Struktur aus Prompt 1 bezieht.
- Nach jedem Prompt kurz im Browser/Live-Server prüfen, ob alles passt,
  bevor der nächste Prompt kommt — spart Korrekturschleifen.
- Für GitHub Pages am Ende: Repo erstellen, Inhalt pushen, in den
  Repo-Settings "Pages" auf den main-Branch (oder /docs-Ordner) zeigen lassen.
- Falls du später noch die offenen Laos-Zusatzstopps aus deinem eigenen
  Südostasien-Plan ergänzen willst, kannst du dort nach demselben Muster
  vorgehen: erst Markdown-Recherche, dann dieselbe Prompt-Kette.
