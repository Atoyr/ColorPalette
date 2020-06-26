export const state = () => ({
  saturation: 0.8,
  valueBrightness: 0.8,
  baseColor: [255,0,0],
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
  updateBaseColor(state, baseColor) {
    if (0 <= baseColor && baseColor <= 1){
      state.baseColor = baseColor
    }
  },
}

export const getters = {
}

export const actions = {
}
