import Phaser from 'phaser';
import preload from 'preload';
import create from 'create';
import update from 'update';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },
    scene: {
        preload,
        create,
        update,
    }
};

new Phaser.Game(config);