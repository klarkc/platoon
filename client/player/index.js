export function loadPlayer(scene) {
    scene.load.spritesheet('dude',
        'assets/sprites/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

export function createPlayer(scene, state) {
    const player = scene.physics.add.sprite(300, 300, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    return player;
}

export function createAvatarPlayer(scene, state, data) {
    const player = scene.physics.add.sprite(data.x, data.y, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    return player;
}

export function updatePlayer(scene, {cursors, player}) {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
    }
}