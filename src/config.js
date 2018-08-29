import Boot from './scenes/boot'
import Preload from './scenes/preload'
import Game from './scenes/game'

export default {
    width: 750,
    height: 1134,
    backgroundColor: 'rgb(68, 68, 68)',
    scene: [ Boot, Preload, Game ]
}

