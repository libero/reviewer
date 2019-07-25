# Styling

## Configuration

Styling is written using SASS which is compiled by `webpack` at build time `yarn build` or `yarn start` as with the `tsx` and `ts` files, any `scss` file is watched while in development mode (`yarn start`) and will hot reload within the browser when changes are made.

`webpack` is able to load and watch any `scss` file which is imported by a `ts` or `tsx` file.

example import:
```ts
import './index.scss'
```

Currently, an `index.scss` located in `/styles` is being used to orchestrate all `scss` files in `/styles` and is being imported into the app through `app.tsx`

## SASS variables and config

SASS variables can be found in the `_config.scss` file at the root of `/styles`. These are accessible to any other `scss` file which is imported into the top level `index.scss`.

All variables in `_config.scss` are defined with `!default` so they may be easily overridden.

## Mixins

### forSize

`forSize` can be used to wrap styling in media queries, which are important for adding responsive behaviour to the app. The mixin works off of the breakpoint variables found in `_config.scss` and can be used like so:

```scss
   @include forSize(phoneOnly) {    
      display: none;
   }
```

Parameter | Media query 
--- | --- | -----
phoneOnly | `max-width: $phone`
tabletPortraitUp | `min-width: $tabletPortrait`
tabletLandscapeUp | `min-width: $tabletLandscape`
desktopUp | `min-width: $desktop`
largeDesktopUp | `min-width: $largeDesktop`