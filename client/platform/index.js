export function loadPlatform(scene) {
    scene.load.image('ground', 'assets/sprites/platform.png');
}

export function createPlatforms(scene) {
    const platforms = scene.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    return platforms;
}