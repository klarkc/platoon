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

export function updatePlayer(scene, {cursors, player, playerId, server}) {
    const movePlayer = () => {
        const {velocity} = player.body;
        server.emit('move-player', {
            id: playerId,
            velocity,
        });
    }

    const stopPlayer = () => {
        server.emit('stop-player', {
            id: playerId,
            x: player.body.x,
            y: player.body.y,
        });
    }

    const K = Phaser.Input.Keyboard;
    const l = cursors.left;
    const r = cursors.right;
    const u = cursors.up;
    
    if (l.isDown) {
        player.setVelocityX(-160);
        movePlayer();
    } else if (r.isDown) {
        player.setVelocityX(160);
        movePlayer();
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-300);
        movePlayer();
    }
    
    if (K.JustUp(l) || K.JustUp(r)) {
        stopPlayer();
    }

    if (K.JustUp(u)) {
        const fn = setInterval(() => {
            if (player.body.speed < 1) {
                stopPlayer();
                clearInterval(fn);
            }
        }, 100);
    }
}

export function updatePlayerAnimation(player) {
    const {x, y} = player.body.velocity;
    if (x < -1) {
        player.anims.play('left', true);
    } else if (x > 1) {
        player.anims.play('right', true);
    } else {
        player.anims.play('turn', true);
    }
}