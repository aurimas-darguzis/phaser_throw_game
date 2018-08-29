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
        if(this.canThrow) {
            this.canThrow = false;
            this.tweens.add({
                targets: [this.knife],
                y: this.target.y + this.target.width / 2,
                duration: config.throwSpeed,
                callbackScope: this,
                onComplete: function(tween) {
                    let legalHit = true;
                    const children = this.knifeGroup.getChildren();
                    for(let i = 0; i < children.length; i++) {
                        // is the knife too close to the i-th knife?
                        if(Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < config.minAngle){
                            legalHit = false;
                            break;
                        }
                    }

                    if(legalHit) {
                        this.canThrow = true;
                        const knife = this.add.sprite(this.knife.x, this.knife.y, 'knife');
                        knife.impactAngle = this.target.angle;
                        this.knifeGroup.add(knife);
                        this.knife.y = this.config.height / 5 * 4;
                    } else {
                        this.tweens.add({
                            targets: [this.knife],
                            y: this.config.height + this.knife.height, // this.config think it refers to global config
                            rotation: 5,
                            duration: config.throwSpeed * 4, // config. this it refers to this class config variable
                            callbackScope: this,
                            onComplete: function(tween) {
                                this.scene.start('play'); // dbl check this <--
                            }
                        })
                    }
                }
            });
        }
    }

    update(time, delta) {
        this.target.angle += this.currentRotationSpeed;
        const children = this.knifeGroup.getChildren();
        for(let i = 0; i < children.length; i++) {
            children[i].angle += this.currentRotationSpeed;
            const radians = Phaser.Math.DegToRad(children[i].angle + 90);
            children[i].x = this.target.x + (this.target.width / 2) * Math.cos(radians);
            children[i].y = this.target.y + (this.target.width / 2) * Math.sin(radians);
        }
        this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, delta / 1000);
    }
}
