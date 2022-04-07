import grass from '../images/grass.svg'
import poison from '../images/poison.svg'
import water from '../images/water.svg'
import bug from '../images/bug.svg'
import electric from '../images/electric.svg'
import fairy from '../images/fairy.svg'
import fire from '../images/fire.svg'
import flying from '../images/flying.svg'
import ground from '../images/ground.svg'
import normal from '../images/normal.svg'
import steel from '../images/steel.svg'
import psychic from '../images/psychic.svg'
import fighting from '../images/fighting.svg'
import rock from '../images/rock.svg'
import ice from '../images/ice.svg'
import ghost from '../images/ghost.svg'
import dragon from '../images/dragon.svg'
import dark from '../images/dark.svg'

const icons = [bug, electric, fairy, fire, flying, grass, ground, normal, poison, water, steel, psychic, fighting, rock, ice, ghost, dragon, dark];
const iconsString = ["bug", "electric", "fairy", "fire", "flying", "grass", "ground", "normal", "poison", "water", "steel", "psychic", "fighting", "rock", "ice", "ghost", "dragon", "dark"]

export function getIcon(type) {
  return  icons[iconsString.indexOf(type)]
}