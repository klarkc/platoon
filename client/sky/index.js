export function loadSky(scene) {
    scene.load.image('sky', 'assets/skies/sky1.png');
}

export function createSky(scene) {
    return scene.add.image(400, 300, 'sky');
}