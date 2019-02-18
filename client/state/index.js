import Phaser from 'phaser';
import { createAvatarPlayer } from '../player';

const state = {
    server: null,
    scene: null,
    cursors: null,
    scoreText: null,
    playerId: null,
    player: null,
    players: {},
    score: 0,
    gameOver: false,
}

export function updateServer() {
    if (state.player.body.speed > 1) {
        state.server.emit('move-player', {
            id: state.playerId,
            x: state.player.x,
            y: state.player.y,
        });
    }
}

export function addNewPlayer(data) {
    console.log('added-player', data);
    if (!state.players[data.id]) {
        const player = createAvatarPlayer(state.scene, state, data);
        state.players[data.id] = player;
    }
}

export function movePlayer(data) {
    if (state.playerId === data.id) return;
    if (!state.players[data.id]) addNewPlayer(data);
    const player = state.players[data.id];
    const distance = Phaser.Math.Distance.Between(player.x, player.y, data.x, data.y);
    if (distance > 0) {
        // console.log('moved-player', player.x, player.y, data.x, data.y, distance);
        const duration = distance*10;
        const tween = state.scene.add.tween({
            x: data.x,
            y: data.y,
            targets: player,
            duration,
        });
        tween.play();
    }
}

export function setPlayerId(id) {
    console.log('connected-player', id);
    state.playerId = id;
    state.server.emit('add-player', state.playerId);
}

export function setServerListeners() {
    const {server} = state;
    server.on('connected-player', setPlayerId);
    server.on('added-player', addNewPlayer);
    server.on('moved-player', movePlayer);
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