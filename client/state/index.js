import { createPlayer, updatePlayerAnimation } from '../player';

const state = {
    server: null,
    scene: null,
    cursors: null,
    scoreText: null,
    playerId: null,
    player: null,
    playerCollisions: [],
    playerOverlaps: [],
    players: {},
    score: 0,
    gameOver: false,
}

export function addNewPlayer(data) {
    // console.log('added-player', data);
    if (!state.players[data.id]) {
        const player = createPlayer(state.scene, state, data.x, data.y);
        state.players[data.id] = player;
    }
}

export function movePlayer(data) {
    if (state.playerId === data.id) return;
    if (!state.players[data.id]) addNewPlayer(data);

    const player = state.players[data.id];
    const {x, y} = data.velocity;
    const {oX,oY} = player.body.velocity;

    if (x === oX || y === oY) return;

    player.body.velocity.x = x;
    player.body.velocity.y = y;

    updatePlayerAnimation(player);
}

export function stopPlayer(data) {
    const { id, x, y } = data;
    

    if (state.id === id) return;
    if (!state.players[id]) addNewPlayer(data);
    const player = state.players[data.id];
    const body = player.body;
    
    body.stop();
    body.x = x;
    body.y = y;  
    
    updatePlayerAnimation(player);
}

export function setPlayerId(id) {
    // console.log('connected-player', id);
    state.playerId = id;
    state.server.emit('add-player', state.playerId);
}

export function setServerListeners() {
    const {server} = state;
    server.on('connected-player', setPlayerId);
    server.on('added-player', addNewPlayer);
    server.on('moved-player', movePlayer);
    server.on('stoped-player', stopPlayer);
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