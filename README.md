- `RenderTexture.fill` uses the wrong RGB values for the Canvas renderer so it's always near-black
```
// RenderTexture.fill
// change `r, g, b` to remove the `/ 255` division
// add the `/255`s to L56170 (Utils.getTintFromFloats)

```

- `texture.add` (for adding frames to a texture) needs to be y-flipped


- `MultiPipeline.batchTextureFrame` also needs to y-flip gl textures
```
// add around L26038 in Phaser.js, inside `MultiPipeline.batchTextureFrame`
if (frame.glTexture)
{
  height *= -1;
  y += frame.height;
}
// var xw = ...
```

