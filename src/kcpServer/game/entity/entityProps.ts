import { PlayerPropEnum } from '@/types/enum/player'
import { PropPair, PropValue } from '@/types/game/prop'
import PropsUserData from '@/types/user/PropsUserData'
import Entity from '.'

export default class EntityProps {
  entity: Entity

  propMap: { [type: number]: number }

  constructor(entity: Entity) {
    this.entity = entity

    this.propMap = {}
  }

  init(userData: PropsUserData) {
    for (let type in userData) {
      if (isNaN(parseInt(type))) continue
      this.set(parseInt(type), userData[type])
    }
  }

  initNew() {
    this.set(PlayerPropEnum.PROP_EXP, 0)
    this.set(PlayerPropEnum.PROP_BREAK_LEVEL, 0)
    this.set(PlayerPropEnum.PROP_SATIATION_VAL, 0)
    this.set(PlayerPropEnum.PROP_SATIATION_PENALTY_TIME, 0)
    this.set(PlayerPropEnum.PROP_LEVEL, 1)
  }

  get(type: number) {
    return this.propMap[type] || 0
  }

  set(type: number, val: number | boolean) {
    const { propMap } = this
    propMap[type] = Number(val) || 0
  }

  clear() {
    const { propMap } = this
    for (let type in PlayerPropEnum) {
      if (!isNaN(Number(type))) continue
      propMap[PlayerPropEnum[type]] = 0
    }
  }

  exportPropMap(): { [id: number]: PropValue } {
    const { propMap } = this
    const map: { [type: number]: PropValue } = {}

    for (let type in propMap) {
      map[type] = this.exportPropValue(parseInt(type))
    }

    return map
  }

  exportPropPair(type: number): PropPair {
    const propValue = this.exportPropValue(type)
    return {
      type: propValue.type,
      propValue
    }
  }

  exportPropValue(type: number): PropValue {
    const value = this.get(type)
    return {
      type,
      ival: value,
      val: value
    }
  }

  exportUserData(): PropsUserData {
    return Object.assign({}, this.propMap)
  }
}