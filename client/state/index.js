import { createAvatarPlayer } from '../player';

const state = {
    server: null,
    scene: null,
    cursors: null,
    scoreText: null,
    player: null,
    players: {},
    score: 0,
    gameOver: false,
}

export function addNewPlayer(data) {
    console.log('added-player', data);
    if (!state.players[data.id]) {
        const player = createAvatarPlayer(state.scene, state, data);
        state.players[data.id] = player;
    }
}

export function setServerListeners() {
    const {server} = state;
    server.on('hey', (socket) => {
        console.log('hey!');
    })
    server.on('added-player', addNewPlayer);
}

export function collectGold(player, gold) {
    gold.disableBody(true, true);
    state.score += 10;
    state.scoreText.setText('Score: ' + state.score);
}

export function hitBomb(player, bomb) {
    scene.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    state.gameOver = true;
}

export function getState() {
    return state;
}

export default function setState(st) {
    Object.keys(st).forEach(key => {
        state[key] = st[key];
    });
};