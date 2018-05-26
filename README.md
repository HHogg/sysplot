# SysPlot

A library that systematically generates a plane for plotting shapes, with a variety of algorithms to choose from.

## Install

```
$ yarn add sysplot
```

## Usage

SysPlot is used for generating XY coordinates for placing shapes. It is agnostic about the approach used for the visualisation, be it HTML, SVG, Canvas, WebGL.. etc.

Positions will be given starting from the center and will attempt to fill as much
space as possible.

```js
import SysPlot, { VogelSpiral /* any provided algorithm */ } from 'sysplot';

const sysPlot = new SysPlot();

sysPlot.setConfig({
  algorithm: VogelSpiral,
  padding: 10,
  proportional: true,
  spread: 0.25,
});

sysPlot.setBounds(1000, 500);

const shapes = [{
  radius: 20,
}, {
  width: 30,
  height: 50,
}]

/** Give it the shapes to calculate the position for. */
sysPlot.setShape(shapes);

/** Get the positions for those shapes */
const positions = sysPlot.getPositions();

/** Shapes that were unable to be placed will have no position */
const shapesWithValidPositions = zip(positions, shapes).filter(([, p]) => p);
```

## Algorithms

#### `ArchimedesSpiral`

> The Archimedean spiral (also known as the arithmetic spiral) is a spiral named after the 3rd century BC Greek mathematician Archimedes. It is the locus of points corresponding to the locations over time of a point moving away from a fixed point with a constant speed along a line which rotates with constant angular velocity.
>
> [Wikipedia - Archimedes Spiral](https://en.wikipedia.org/wiki/Archimedean_spiral)

#### `ConcentricCircles`

>  In geometry, two or more objects are said to be concentric, coaxal, or coaxial when they share the same center or axis.
>
> [Wikipedia - Concentric Circles](https://en.wikipedia.org/wiki/Concentric_objects)

#### `FermatSpiral`

> Fermat's spiral (also known as a [parabolic spiral](https://en.wikipedia.org/wiki/Parabola)) was first discovered by Pierre de Fermat. It is a type of Archimedean spiral
>
> [Wikipedia - Fermat Spiral](https://en.wikipedia.org/wiki/Fermat%27s_spiral)

#### `UlamSpiral`

> The Ulam spiral or prime spiral (in other languages also called the Ulam cloth) is a graphical depiction of the set of [prime numbers](https://en.wikipedia.org/wiki/Prime_number)...  It is constructed by writing the positive integers in a square spiral and specially marking the prime numbers.
>
> [Wikipedia - Ulam Spiral](https://en.wikipedia.org/wiki/Ulam_spiral)

#### `VogelSpiral`

> In disc [phyllotaxis](https://en.wikipedia.org/wiki/Phyllotaxis), as in the sunflower and daisy, the mesh of spirals occurs in [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number) because divergence (angle of succession in a single spiral arrangement) approaches the [golden ratio](https://en.wikipedia.org/wiki/Golden_ratio).
>
> [Wikipedia - Vogel Spiral](https://en.wikipedia.org/wiki/Fermat%27s_spiral)

## API

#### Config Object

```js
const config = {
  /**
   * One of the exported algorithm functions mentioned above.
   */
  algorithm: Function,

  /**
   * The amount of padding to be used around the shapes when
   * positioning.
   */
  padding: Number,

  /**
   * Retains the aspect ratio for plotting the vector points.
   */
  proportional: Boolean,

  /**
   * A number between 0.1 and 1 that affects the density of the
   * vector points. 0.1 being very dense and 1 being very spread
   * apart.
   */
  spread: Number,
}
```

#### SysPlot()

The main class for storing the environment and generating vectors and positions.

```js
new SysPlot();
```

#### Sysplot.setConfig(configObject)

Updates the config and sets a flag to regenerate the plotting vectors and/or the positions on next `getPositions()` call.

```js
sysPlot.setConfig(configObject);
```

#### SysPlot.setBounds(width, height)

Sets the bounds to generate the plotting vectors for.

```js
const width = 1000;
const height = 500;

sysPlot.setBounds(width, height);
```

#### SysPlot.setShapes(shapes)

Sets the shapes and sets a flag to regenerate positions on next `getPositions()` call.

```js
const shapes = [{
  radius: 20,
}, {
  width: 30,
  height: 50,
}]

sysPlot.setShapes(shapes);
```

#### SysPlot.getPositions()

Gets the positions for the set shapes. Returns XY coordinates in order of the shapes that were set. Any shapes they were unable to be positioned will be null.

```js
const shapes = [...];
const positions = sysPlot.getPositions();

const shapesWithValidPositions = zip(positions, shapes).filter(([, p]) => p);
```


#### SysPlot.getVectors()

Gets the vector points used for positioning (as XY coordinates) that the algorithm generated, radiating out from the center.

```js
sysPlot.getVectors(); // [[x, y], [x, y] ...etc]
```

## Performance

Generating the vector points and positioning the shapes can be intensive depending on the algorithm used, the number of shapes and the spread option. **SysPlot will only generate new vectors and positions if it needs to**, which is determined when certain parts of the config, bounds or shapes change.

Use the `setBounds`, `setConfig` and `setShapes` methods when the environment changes.
