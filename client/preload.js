import {loadPlayer} from './player';
import {loadSky} from './sky';
import {loadGold} from './gold';
import {loadPlatform} from './platform';
import {loadBomb} from './bomb';

export default function preload() {
    const scene = this;
    scene.load.setBaseURL('http://labs.phaser.io')

    loadPlayer(scene);
    loadSky(scene);
    loadGold(scene);
    loadPlatform(scene);
    loadBomb(scene);
}