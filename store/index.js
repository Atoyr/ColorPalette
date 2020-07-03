export const state = () => ({
  hue: 0,
  saturation: 0.8,
  valueBrightness: 0.8,
  selectColorIndex: 1,
  firstColorHSV: [0,0.8,0.8],
  secondColorHSV: [0,0.8,0.8],
  thirdColorHSV: [0,0.8,0.8],
  fourthColorHSV: [0,0.8,0.8],
})

export const mutations = {
  updateHue(state, hue) {
    switch(state.selectColorIndex) {
      case 1:
        state.firstColorHSV[0] = hue % 360;
      case 2:
        state.secondColorHSV[0] = hue % 360;
      case 3:
        state.thirdColorHSV[0] = hue % 360;
      case 4:
        state.fourthColorHSV[0] = hue % 360;
    }
  },
  updateSaturation(state, saturation) {
    let s = saturation;
    if ( s < 0) {
      s = 0;
    }else if ( 1 < s) {
      s = 1;
    }
    switch(state.selectColorIndex) {
      case 1:
        state.firstColorHSV[1] = s;
      case 2:
        state.secondColorHSV[1] = s;
      case 3:
        state.thirdColorHSV[1] = s;
      case 4:
        state.fourthColorHSV[1] = s;
    }
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
