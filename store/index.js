export const state = () => ({
  saturation: 0.8,
  valueBrightness: 0.8,
  selectColor: [255,0.8,0.8]
})

export const mutations = {
  updateSaturation(state, saturation) {
    if (0 <= saturation && saturation <= 1){
      state.saturation = saturation
    }
  },
  updateValueBrightness(state, valueBrightness) {
    if (0 <= valueBrightness && valueBrightness <= 1){
      state.valueBrightness = valueBrightness
    }
  },
  updateSelectColor(state, selectColor) {
    let sc = selectColor
    if (sc.length == 3){
      sc[0] = sc[0] % 360
      for (let i = 1; i < 3; i++) {
        if (sc[i] < 0 ) {
          sc[i] = 0.0
        }else if (1 < sc[i] ) {
          sc[i] = 1.0
        }
      }
    }
    state.selectColor = sc;
  },
}

export const getters = {
}

export const actions = {
  applySelectColor({commit}, selectColor) {
    commit('updateSelectColor', selectColor)
  },
}
