import Player from '../objects/player'
import config from '../config'

export default class Game extends Phaser.Scene {
    
    constructor() {
        super('game')
    }

    preload() {}

    create() {
        console.log('game started');
        const config = {
            rotationSpeed: 3,
            throwSpeed: 150,
            minAngle: 15,
            rotationVariation: 2,
            changeTime: 2000,
            maxRotationSpeed: 6}

        this.currentRotationSpeed = config.rotationSpeed;
        this.newRotationSpeed = config.rotationSpeed;
        this.canThrow = true;
        this.knifeGroup = this.add.group();
        // this.knife = this.add.sprite(200, 200, 'knife');
        // this.target = this.add.sprite(200, 400, 'target');
        this.knife = this.add.sprite(this.width / 2, this.height, 'knife');
        this.target = this.add.sprite(this.width / 2, 400, 'target');
        this.target.depth = 1;

        this.input.on('pointerdown', this.throwKnife, this);

        const timeEvent = this.time.addEvent({
            delay: config.changeTime,
            callback: this.changeSpeed,
            callbackScope: this,
            loop: true
        });
    }

    changeSpeed() {
        const sign = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
        const variation = Phaser.Math.FloatBetween(-config.rotationVariation, config.rotationVariation);
        this.rotationSpeed = (this.currentRotationSpeed + variation) * sign;
        this.newRotationSpeed = Phaser.Math.Clamp(this.newRotationSpeed, -config.maxRotationSpeed, config.maxRotationSpeed);
    }

    throwKnife() {

    }
}
