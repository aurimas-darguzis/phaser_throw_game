import Player from '../objects/player'

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload() {}

    create() {
        console.log('game started')

        let config = {
            rotationSpeed: 3,
            throwSpeed: 150,
            minAngle: 15,
            rotationVariation: 2,
            changeTime: 2000,
            maxRotationSpeed: 6
        }

        
    }
}
