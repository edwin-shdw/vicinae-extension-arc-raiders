# Arc Raiders Vicinae Extension

A helper extension for accessing Arc Raiders tools faster from Vicinae.

## Installation

Install and start [Vicinae](https://vicinae.com/), then:

```bash
git clone git@github.com:edwin-shdw/vicinae-extension-arc-raiders.git
cd vicinae-extension-arc-raiders
npm install
npm run build
```

If you want to work on the extension, simply run:

```bash
npm run dev
```

See the [Vicinae extension docs](https://docs.vicinae.com/extensions/introduction) for more details.

## Commands

| Command        | Description                                                                                                      |
|----------------|------------------------------------------------------------------------------------------------------------------|
| Map Conditions | Shows the current and upcoming Map Conditions like the [official website](https://arcraiders.com/map-conditions) |
| Maps           | Shows a list of all maps with their current map condition and a link to an interactive map                       |
| Trials         | Shows trials of the current week                                                                                 |

## Data

Data sources:

- [Official Arc Raiders website](https://arcraiders.com/map-conditions)
- [MetaForge](https://metaforge.app/arc-raiders)

Fetched data is cached in local storage. To respect the APIs, there is no manual refresh option. The data will get
re-fetched automatically at appropriate intervals or when it expires.
