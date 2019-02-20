import io from 'socket.io-client';

import { createPlayer, createPlayerAnimations } from './player';
import { createPlatforms } from './platform';
import { createGolds } from './gold';
import { createSky } from './sky';
import { createBombs } from './bomb';
import { createScore } from './ui';
import setState, { collectGold, hitBomb, getState, setServerListeners } from './state';

export default function create() {
    const scene = this;
    const state = getState();

    const server = io.connect();
    setState({server});

    createPlayerAnimations(scene);

    const sky = createSky(scene, state);   
    const platforms = createPlatforms(scene, state);
    const golds = createGolds(scene, state);
    const playerCollisions = [
        { target: platforms },
        { target: bombs, callback: hitBomb },
    ];
    const playerOverlaps = [
        { target: golds, callback: collectGold },
    ];
    setState({playerCollisions, playerOverlaps});
    const player = createPlayer(scene, state);
    const bombs = createBombs(scene, state);
    const scoreText = createScore(scene, state);
    const cursors = scene.input.keyboard.createCursorKeys();
    
    scene.physics.add.collider(platforms, golds);


    scene.physics.add.collider(bombs, platforms);

    setState({scoreText, cursors, player, server, scene});

    setServerListeners();
}