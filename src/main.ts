import Phaser from 'phaser';


const makeGame = (USE_WEBGL: boolean) => (
  new Phaser.Game({
    width: 512,
    height: 512,
    type: USE_WEBGL ? Phaser.WEBGL : Phaser.CANVAS,
    backgroundColor: 0xFFFFFF,
    scene: {
      preload: function () {
        this.load.image('mario', 'https://i.imgur.com/nKgMvuj.png');
      },
      create: function () {
        const origin = this.add.renderTexture(0, 0, 256, 256);
        // Add content
        origin.draw('mario', 0, 0);

        // Save texture for key reference later
        origin.saveTexture('test-texture');

        // Set a 256x256 frame at 0,0 (the entire image)
        origin.texture.add('test-frame', 0, 0, 0, 256, 256);

        // Other RT to test against
        const dest = this.add.renderTexture(256, 0, 256, 256);
        // dest.texture.source[0]?.setFlipY(true);


        // Here's the bug:
        dest.drawFrame('test-texture', 'test-frame', 0, 0);
        // BUG: observe mario is y-flipped on the `dest` RT!


        const sqSize = 512 / 4;
        origin.fill(0xff0000, 0.33, 0, 0, sqSize, sqSize);
        origin.fill(0x00ff00, 0.33, sqSize, 0, sqSize, sqSize);
        origin.fill(0x0000ff, 0.33, 0, sqSize, sqSize, sqSize);
        origin.fill(0xff00ff, 0.33, sqSize, sqSize, sqSize, sqSize);

        origin.texture.add('square-1', 0, 0, 0, sqSize, sqSize);
        origin.texture.add('square-2', 0, sqSize, 0, sqSize, sqSize);
        origin.texture.add('square-3', 0, 0, sqSize, sqSize, sqSize);
        origin.texture.add('square-4', 0, sqSize, sqSize, sqSize, sqSize);

        console.log('here', origin.texture);

        origin.setAlpha(0.25);

        // Create an `Image` for each frame
        this.add.image(0, 256, 'test-texture', 'square-1').setOrigin(0,0);
        this.add.image(sqSize, 256, 'test-texture', 'square-2').setOrigin(0,0);
        this.add.image(0, 256 + sqSize, 'test-texture', 'square-3').setOrigin(0,0);
        this.add.image(sqSize, 256 + sqSize, 'test-texture', 'square-4').setOrigin(0,0);

        dest.drawFrame('test-texture', 'test-frame', 0, 0);

        // // Draw random frame to another RT
        // dest.clear();
        // dest.drawFrame('test-texture', 'square-4', 0,0);

        // Blitters!
        const blitter = this.add.blitter(0, 0, 'test-texture');
        blitter.create(256, 256,  'square-1');
        blitter.create(256 + sqSize, 256,  'square-2');
        blitter.create(256, 256 + sqSize,  'square-3');
        blitter.create(256 + sqSize, 256 + sqSize,  'square-4');


        this.add.text(0,0, USE_WEBGL ? "WebGL" : "Canvas", { color: '#000' }).setOrigin(0,0);
        this.add.text(0,this.scale.height, 'GameObject.Image', { color: '#000' }).setOrigin(0,1)
        this.add.text(this.scale.width,0, 'Destination RenderTexture', { color: '#000' }).setOrigin(1,0)
        this.add.text(this.scale.width,this.scale.height, 'Blitter', { color: '#000' }).setOrigin(1,1)

      }
    }
  })
);


makeGame(true);
makeGame(false);