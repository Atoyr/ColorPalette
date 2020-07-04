import Vue from 'vue'

export const state = () => ({
  selectColorIndex: 1,
  firstColorHSV: [0,0.8,0.8],
  secondColorHSV: [120,0.8,0.8],
  thirdColorHSV: [240,0.8,0.8],
  fourthColorHSV: [0,0.0,1.0],
})

export const mutations = {
  updateSelectColorIndex(state, index) {
    if (0 < index && index < 5){
      state.selectColorIndex = index;
    }
  },
  updateHue(state, hue) {
    switch(state.selectColorIndex) {
      case 1:
        Vue.set(state.firstColorHSV,0,hue % 360);
        break;
      case 2:
        Vue.set(state.secondColorHSV,0,hue % 360);
        break;
      case 3:
        Vue.set(state.thirdColorHSV,0,hue % 360);
        break;
      case 4:
        Vue.set(state.fourthColorHSV,0,hue % 360);
        break;
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
        Vue.set(state.firstColorHSV,1,s);
        break;
      case 2:
        Vue.set(state.secondColorHSV,1,s);
        break;
      case 3:
        Vue.set(state.thirdColorHSV,1,s);
        break;
      case 4:
        Vue.set(state.fourthColorHSV,1,s);
        break;
    }
  },
  updateValueBrightness(state, valueBrightness) {
    let v = valueBrightness;
    if ( v < 0) {
      v = 0;
    }else if ( 1 < v) {
      v = 1;
    }
    switch(state.selectColorIndex) {
      case 1:
        Vue.set(state.firstColorHSV,2,v);
        break;
      case 2:
        Vue.set(state.secondColorHSV,2,v);
        break;
      case 3:
        Vue.set(state.thirdColorHSV,2,v);
        break;
      case 4:
        Vue.set(state.fourthColorHSV,2,v);
        break;
    }
  },
}
export const getters = {
  hue(state) {
    let h = 0;
    switch(state.selectColorIndex) {
      case 1:
        h = state.firstColorHSV[0];
        break;
      case 2:
        h = state.secondColorHSV[0];
        break;
      case 3:
        h = state.thirdColorHSV[0];
        break;
      case 4:
        h = state.fourthColorHSV[0];
        break;
    }
    return h;
  },
  saturation(state) {
    let s = 0.0;
    switch(state.selectColorIndex) {
      case 1:
        s = state.firstColorHSV[1];
        break;
      case 2:
        s = state.secondColorHSV[1];
        break;
      case 3:
        s = state.thirdColorHSV[1];
        break;
      case 4:
        s = state.fourthColorHSV[1];
        break;
    }
    return s;
  },
  valueBrightness(state) {
    let v = 0.0;
    switch(state.selectColorIndex) {
      case 1:
        v = state.firstColorHSV[2];
        break;
      case 2:
        v = state.secondColorHSV[2];
        break;
      case 3:
        v = state.thirdColorHSV[2];
        break;
      case 4:
        v = state.fourthColorHSV[2];
        break;
    }
    return v;
  }
}

export const actions = {
  applySelectColorIndex({commit}, index) {
    commit('updateSelectColorIndex', index)
  },
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
