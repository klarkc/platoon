import { updatePlayer, updatePlayersAnimation, updatePlayerAnimation} from './player';
import {getState} from './state';

export default function update() {
    const scene = this;
    const state = getState();

    updatePlayer(scene, state);
    updatePlayerAnimation(state.player);
}