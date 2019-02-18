import {updatePlayer} from './player';
import {getState, updateServer} from './state';

let unsyncTicks = 10;

export default function update() {
    const scene = this;
    updatePlayer(scene, getState());
    if (--unsyncTicks < 0) {
        unsyncTicks = 10;
        updateServer();
    }
}