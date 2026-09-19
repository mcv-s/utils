# utils

Utility functions for web

## gameFunctions.js

A group of functions for games.

It assumes that objects are absolute/relatively positioned and uses left/top attributes for the x and y.

Import using 

`<script src="https://mcv-s.github.io/utils/web/gameFunctions.js"></script>`

<br>

Import the script and it will add these methods/properties:

### object.x

Returns the X position of an object (simple way of getting the position left in pixels.)

- Can be set and "got"

### object.y

The same thing but for the Y position.

- Can be set and "got"

<br>

## tooltips.js

Import using

`<script src="https://mcv-s.github.io/utils/web/tooltips.js"></script>`

Then you can put the attribute `data-tooltip` on any object, and upon hover, it will have a nice little popup tooltip.


## themeToggle.js

Import using

`<script src="https://mcv-s.github.io/utils/web/themeToggle.js"></script>`

Adds a little theme toggle icon to the bottom right of the screen - has three options: light, dark, and system.

Alternatively use themeToggleBubble + a slightly different import option to make the toggle use [@Hyperplexed's bubbles system](https://bubbles.hyperplexed.io/) instead:

`<script type="module" src="https://mcv-s.github.io/utils/web/themeToggleBubble.js"></script>`


## colorTheme.css

Finally standardized . . . 

Import using

`<link rel="stylesheet" href="https://mcv-s.github.io/utils/web/colorTheme.css">`

It provides all the default variables such as:

--bg
--text
--accent (That's my accent color, you might want to override it.)



## brandTheme.css

Import using

`<link rel="stylesheet" href="https://mcv-s.github.io/utils/web/brancTheme.css">`

Makes all the buttons look like buttons and colors everything according to those color vars we used earlier.



## phosphor-icons

I did not make these. But they are amazing. Import using

`<script src="https://unpkg.com/@phosphor-icons/web"></script>`
