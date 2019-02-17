import {loadPlayer} from './player';

export default function preload() {
    const scene = this;
    scene.load.setBaseURL('http://labs.phaser.io')

    loadPlayer(scene);
    loadSky(scene);
    loadGold(scene);
    loadPlatform(scene);
    loadBomb(scene);
}