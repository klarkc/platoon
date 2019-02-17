import {updatePlayer} from './player';
import {getState} from './state';

export default function update() {
    const scene = this;
    updatePlayer(scene, getState());
}