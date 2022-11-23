# LuMinD

Experiments in the usage of shadow and luminance with the theory that the emotions evoked by materials can be applied to software.

<!-- More explanation -->

[Good explanation on gamma](https://www.cambridgeincolour.com/tutorials/gamma-correction.html)

Need to convert to gamma -> luminance -> perceived luminance

Find maximum value. Which is usually 1 but important to keep track of where this is.

Since tensorflow won't let us apply a function to every element in a tensor, we have to flatten it and then unflatten.

Finding which element based on the index in a flattened array was tough.

Turns out it's x,y coordinates is (linearIndex / yLength, linearIndex % yLength)

We use the average perceived lightness as the ambient light

For the cube experiment, we use this lightness directly. We then map the maximum lightness value into 3D coordinates such that the shadows are cast as if they originate from that location.

For the todo experiment, we map the lightness location into a value <- 10px and utilize it as the x,y coordinates of the box shadow on elements. The lightness is used to alter the color of the shadow (via HSL, altering the lightness) 