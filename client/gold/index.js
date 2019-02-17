export function loadGold(scene) {
    scene.load.image('gold', 'assets/particles/gold.png');
}

export function createGolds(scene) {
    const golds = scene.physics.add.group({
        key: 'gold',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 100 }
    });
    golds.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    return golds;
}