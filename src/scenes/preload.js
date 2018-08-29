export default class Preload extends Phaser.Scene {
    constructor() {
        super('preload')
    }

    preload() {
        this.load.image('knife', '/images/knife.png');
        this.load.image('target', '/images/target.png');
    }

    create() {
        console.log('preload started')
        this.scene.start('game')
    }
}

