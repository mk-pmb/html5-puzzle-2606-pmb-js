
<!--#echo json="package.json" key="name" underline="=" -->
html5-puzzle-2606-pmb
=====================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
A simple minimalistic HTML5 puzzle game. Basically just an element-dragging
demo.
<!--/#echo -->



Usage
-----

see [test/boxes01.html](test/boxes01.html).



Gameplay
--------

Drag pieces to move them.
Touching a piece makes it "most recent", i.e. you'll see it displayed
"above" or "through" the others, independent of actual geometry.

Hotkeys for the most recent piece:

* `b`: Mark as least recent.
  This is useful if the most recent piece is blocking your view of others.
* `c`: Clone the piece, in the exact same spot.
* `D` (Shift+`d`): Discard the piece.
* `r`: Rotate clockwise around the camera's line of sight.
  * `R` (Shift+`r`): Rotate counter-clockwise.




Puzzle syntax
-------------

### Geometry

* Axes: +X = east, +Y = up, +Z = south.
* All lengths are in mm (millimeter).


### Puzzle areas

`<div class="puzzle-area">`

The puzzle area is the declaration for one game scenario ("level").
You can have multiple in the same document.

Default options:

* `data-camera="top"`: Perspective.
  * `top` (default): Camera looks down.
  * `side`: Camera looks north.
* `data-scale="0.2"`: Pixels per millimeter.
* `data-viewbox="0 0 10e3 5e3"`:
  Visible area, given as distance left of, above, right of, and below
  the origin point after camera perspective is applied.
  * For `data-camera="top"`: maxWest, maxNorth, maxEast, maxSouth.
  * For `data-camera="side"`: maxWest, maxUp, maxEast, maxDown.
* `data-corner-len="0"`:
  Default leg length for the L-shaped corner markings inside puzzle pieces.


### Autorun

`<body class="puzzle-autorun">`

Having the `puzzle-autorun` class on your `<body>` instructs the game library
to automatically activate all puzzle areas.


### Puzzle pieces

Inside `<div class="puzzle-area">`, `<p>` is for "piece".

Attributes (all optional):

* `x`, `y`, `z`, `w`, `d`, `h`:
  Initial position and size (width, depth, height). Default: 0
  * Numbers support the JSON exponent syntax.
  * Value can start with `_+` or `_-` to indicate that the number is
    meant relative to the homonymous value in the previous piece.
* `bgc`: Background color. Default: unspecified, style sheet applies.
* `data-corner-len`: Override the default corner length.
* `n`:
  (⚠ Not implemented yet.)
  How many identical pieces are crammed into each other;
  for a zero-thin rectangle you can think of this as the "initial stack size".
* `n-remain`:
  (⚠ Not implemented yet.)
  How many identical pieces *still* are crammed into each other.
  Usually this should only ever occurr in savegames, not in level descriptions.
  Defaults to `n`.


### Phantoms

Inside `<div class="puzzle-area">`, `<del>` tags trigger all the preparations
and calculations that a regular piece would cause, but the resulting piece
is never added to the puzzle area.
You can use this to skip a step in a chain where pieces calculate their
geometry based on their predecessor.


### Attribute inheritance

Inside `<div class="puzzle-area">`, `<var>` and `<ins>` tags
can be used to set attributes for multiple pieces:

* All attributes of empty `<var>` tags
  are used as defaults for all later sibling elements.
* All attributes of `<var>` tags with elements inside them
  are used as defaults for only their child elements.
  * `<ins>` with children behaves the same, but first inherits all attributes
    of the previously inserted piece. After it is fully processed,
    it also restores the notion of "the previously inserted piece"
    to what it had been before. This allows sub-chaining in chains where
    pieces refer to the geometry of their predecessor.







Known issues
------------

* Needs more/better tests and docs.





<!--#toc stop="scan" -->

&nbsp;


License
-------
<!--#echo json="package.json" key="license" -->
ISC
<!--/#echo -->
