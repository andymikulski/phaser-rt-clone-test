import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import { USE_WEBGL } from './scenes/USE_WEBGL';

new Phaser.Game({
  type: USE_WEBGL ? Phaser.WEBGL : Phaser.CANVAS,
  width: 1024,
  height: 768,
  backgroundColor: 0xA1E064,
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  // Entry point
  scene: MainScene
})
