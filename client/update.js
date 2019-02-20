import { updatePlayer, updatePlayersAnimation} from './player';
import {getState} from './state';

let unsyncTicks = 3;

export default function update() {
    const scene = this;
    const state = getState();

    updatePlayer(scene, state);
    if (--unsyncTicks < 0) {
        unsyncTicks = 3;
        updatePlayersAnimation(scene, state);
    }
}