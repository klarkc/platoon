import { createPlayer } from './player';
import { createPlatforms } from './platform';
import { createGolds } from './gold';
import { createSky } from './sky';
import { createBombs } from './bomb';
import { createScore } from './ui';
import setState, { collectGold, hitBomb } from './state';

export default function create() {
    const scene = this;

    const sky = createSky(scene);   
    const platforms = createPlatforms(scene);
    const golds = createGolds(scene);
    const player = createPlayer(scene);
    const bombs = createBombs(scene);
    const scoreText = createScore(scene);
    const cursors = scene.input.keyboard.createCursorKeys();

    scene.physics.add.collider(player, platforms);
    scene.physics.add.collider(platforms, golds);
    scene.physics.add.overlap(player, golds, collectGold, null, scene);


    scene.physics.add.collider(bombs, platforms);
    scene.physics.add.collider(player, bombs, hitBomb, null, scene);

    setState({scoreText, cursors, player});
}