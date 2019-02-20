import Phaser from 'phaser';

export function loadPlayer(scene) {
    scene.load.spritesheet('dude',
        'assets/sprites/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

export function createPlayerAnimations(scene) {
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
}

export function createPlayer(scene, state, x = 300, y = 300) {
    const player = scene.physics.add.sprite(x, y, 'dude');
    const {playerCollisions, playerOverlaps} = state;
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    playerCollisions.forEach(({target, callback}) => {
        scene.physics.add.collider(player, target, callback, null, scene);
    });
    playerOverlaps.forEach(({target, callback}) => {
        scene.physics.add.overlap(player, target, callback, null, scene);
    });
    return player;
}

export function updatePlayersAnimation(scene, {players}) {
    Object.keys(players).forEach(playerId => {
        const {body} = players[playerId];
        if(body.speed > 1) {
            // console.log(body.velocity);
        }
    })
}

export function updatePlayer(scene, {cursors, player, playerId, server}) {
    const updateServer = () => {
        const {velocity} = player.body;
        server.emit('move-player', {
            id: playerId,
            velocity,
        });
    }
    const K = Phaser.Input.Keyboard;
    const l = cursors.left;
    const r = cursors.right;
    const u = cursors.up;
    const d = cursors.down;
    
    if (l.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
        updateServer();
    }
    else if (r.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
        updateServer();
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (K.JustUp(l) || K.JustUp(r) || K.JustUp(u) || K.JustUp(d)) {
        server.emit('stop-player', {
            id: playerId,
            x: player.body.x,
            y: player.body.y,
        });
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
    }
}