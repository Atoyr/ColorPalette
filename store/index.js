export const state = () => ({
  hue: 0,
  saturation: 0.8,
  valueBrightness: 0.8,
  selectColorNo: 1,
})

export const mutations = {
  updateHue(state, hue) {
    state.hue = hue % 360
  },
  updateSaturation(state, saturation) {
    let s = saturation;
    if ( s < 0) {
      s = 0;
    }else if ( 1 < s) {
      s = 1;
    }
    state.saturation = s;
  },
  updateValueBrightness(state, valueBrightness) {
    let v = valueBrightness;
    if ( v < 0) {
      v = 0;
    }else if ( 1 < v) {
      v = 1;
    }
    state.valueBrightness = v;
  },
}

export const getters = {
}

export const actions = {
  applyHue({commit}, hue) {
    commit('updateHue', hue)
  },
  applySaturation({commit}, saturation) {
    commit('updateSaturation', saturation)
  },
  applyValueBrightness({commit}, valueBrightness) {
    commit('updateValueBrightness', valueBrightness)
  },
}
