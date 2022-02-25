import Phaser from 'phaser';
import { USE_WEBGL } from './USE_WEBGL';



const NUM_MARIOS = 10;
export default class MainScene extends Phaser.Scene {
  private marios: Phaser.GameObjects.Image[] = [];

  preload = () => {
    this.load.image('mario', 'https://i.imgur.com/nKgMvuj.png');
    this.load.image('background', 'https://i.imgur.com/dzpw15B.jpg');

    this.load.image('uv-grid', 'uv-grid.png');
  };
  create = () => {
    this.add.text(0, -16, USE_WEBGL ? 'WebGL' : 'Canvas', { color: '#000', fontSize: '16px' });

    this.add.image(0, 0, 'background')
      .setOrigin(0, 0) // Anchor to top left so (0,0) is flush against the corner
      .setDisplaySize(1024, 768) // Fit background image to window
      .setDepth(-1); // Behind everything

    // let mario;
    // for (let i = 0; i < NUM_MARIOS; i++) {
    //   mario = this.add.image(32, 32, 'mario')
    //     .setData('velocity', { x: Math.random() * 500, y: Math.random() * 500 })
    //     .setDisplaySize(32, 32);
    //   this.marios.push(mario);
    // }

    this.cameras.main.setZoom(3);

    const rt1 = this.add.renderTexture(10, 10, 100, 100);
    rt1.fill(0x0, 1.0);

    this.add.text(10, 110, 'RT');
    const cursor = this.add.rectangle(0, 0, 1, 1, 0xffffff).setVisible(false)
    // for (let y = 0; y <= 100; y++) {
    //   for (let x = 0; x <= 100; x++) {
    //     const u = (x / 100) * 255;
    //     const v = (y / 100) * 255;
    //     cursor.setFillStyle( v * 4);
    //     rt1.draw(cursor, x, y, 1.0, 0xFFFFFF);
    //   }
    // }

    const grid = this.add.image(0,0,'uv-grid').setDisplaySize(320, 320).setOrigin(0,0);
    rt1.draw(grid, 0,0)
    grid.destroy(true);

    const rt2 = this.add.renderTexture(120, 10, 100, 100);
    rt2.fill(0xff00ff);
    this.add.text(120, 110, 'Buffer');
    rt2.saveTexture('rt2-texture');

    const testSprite = this.add.sprite(230, 10, 'rt2-texture',).setOrigin(0, 0);
    this.add.text(230, 110, 'Frame');

    this.cameras.main.centerOn(rt2.x + 50, rt2.y + 50)


    let step = 0;
    const mario = this.add.image(0, 0, 'mario').setDisplaySize(16, 16).setVisible(false);
    this.input.keyboard.on('keydown-SPACE', (evt: KeyboardEvent) => {
      evt.preventDefault();
      switch (step) {
        default: {
          return;
        }
        case 0: {
          rt2.draw(rt1, 0, 0, 1, 0xffffff);
          step += 1;
          return;
        }
        case 1: {
          rt1.draw(mario, 50, 50);
          step += 1;
          return;
        }
        case 2: {
          rt2.draw(rt1, 0, 0, 1, 0xffffff);
          step += 1;
          return;
        }

        case 3: {
          // rt1.clear();
          // rt1.fill(0xA1E064, 1.0);
          // rt1.draw(mario, 50, 50);
          mario.setTint(0xFF00FF);
          mario.setRotation(Math.PI / 2);
          rt1.draw(mario, 50, 70);

          step += 1;
          return;
        }

        case 4: {
          rt2.clear();
          rt2.draw(rt1, 0, 0);

          let y = 70-mario.displayHeight/2;

          // if (USE_WEBGL) {
          //   y = rt2.height - 70 - mario.displayHeight/2;
          // }
          // canvas:
          rt2.texture.add('test-frame2', 0, 50 - mario.displayWidth/2, y, mario.displayWidth, mario.displayHeight)


          y = 50-mario.displayHeight/2;

          // if (USE_WEBGL) {
          //   y = rt2.height - (50 - mario.displayHeight/2);
          // }
          rt2.texture.add('test-frame', 0, 50 - mario.displayWidth/2, y, mario.displayWidth, -mario.displayHeight)

          // webgl:
          // rt2.texture.add('test-frame2', 0, 50 - mario.displayWidth/2, rt2.height - 75-mario.displayHeight/2, mario.displayWidth, mario.displayHeight)


          step += 1;
          return;
        }

        case 5: {
          testSprite.setTexture('rt2-texture', 'test-frame2');
          step += 1;
          return;
        }

        case 6: {
          rt1.clear();
          // rt1.drawFrame('rt2-texture', 'test-frame2', 16, 0, 1);
          rt1.drawFrame('rt2-texture', 'test-frame2', 0, 0, 1);
          // rt1.draw(rt2, 0,0);
          // rt2.fill(0xa1e064, 0.5);
          // rt2.texture.add('test-frame', 0, 50-8, 50-8, 16, 16);
          step += 1;
          return;
        }

      }
    });


    let colorIndex = 0;
    const spectrum = Phaser.Display.Color.ColorSpectrum(128);

    let radius = 128;
    let intensity = 0.0;
    let attenuation = 0.1;

    let light = this.add.pointlight(0, 0, 0, radius, intensity);

    let color = spectrum[colorIndex];

    light.color.setTo(color.r, color.g, color.b);

  };

  update = (time: number, delta: number) => {
    // // do something every tick here
    // let mario;
    // let velocity;
    // for (let i = 0; i < this.marios.length; i++) {
    //   mario = this.marios[i];
    //   velocity = mario.getData('velocity') as {x:number; y:number;};

    //   // Move the thing
    //   mario.x += velocity.x * delta * 0.001;
    //   mario.y += velocity.y * delta * 0.001;

    //   // Check if we hit a boundary and bounce
    //   if (mario.x > 1024 || mario.x < 0){
    //     velocity.x *= -1;
    //   }
    //   if (mario.y > 768 || mario.y < 0){
    //     velocity.y *= -1;
    //   }
    //   mario.setData('velocity', velocity)
    // }
  }
}
