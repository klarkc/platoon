export function loadBomb(scene) {
    scene.load.spritesheet('bomb',
        'assets/sprites/xenon2_bomb.png',
        { frameWidth: 16, frameHeight: 16 }
    );
}

export function createBombs(scene) {
    const bombs = scene.physics.add.group();
    scene.anims.create({
        key: 'bomb',
        frames: scene.anims.generateFrameNumbers('bomb', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    return bombs;
}