export default class Preload extends Phaser.Scene {
    constructor() {
        super('preload')
    }

    preload() {
        this.load.image('engineer', '/images/knife.png');
        this.load.image('engineer', '/images/target.png');
    }

    create() {
        console.log('preload started')
        this.scene.start('game')
    }
}

