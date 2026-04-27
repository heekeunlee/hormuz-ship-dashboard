# Hormuz Ship Dashboard

Live AIS map dashboard for vessels around the Strait of Hormuz.

## What It Shows

- Current AIS vessel positions around the Strait of Hormuz
- Total vessels, choke point count, tanker count, cargo count, and average speed
- Direction split for eastbound, westbound, and local/cross traffic
- Filterable MapLibre map with vessel heading markers
- Clickable vessel detail panel

## Data Source

The dashboard reads public JSON endpoints exposed by `https://hormuz.now`:

- `https://hormuz.now/api/snapshot`
- `https://hormuz.now/api/region`

AIS data can be delayed, incomplete, or spoofed. This dashboard is for educational and situational-awareness use, not navigation or safety-critical decisions.

## Run Locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```
