<template>
  <div class="flex-column align-items-center">
    <div class="my-3">
      <ColorCircle ref="colorCircle"></ColorCircle>
    </div>
    <div class="flex-row align-items-center">
      <p class="slider-text">H</p>
      <input 
         class="slider"
         type="range" value="0" min="0" max="359" step="1" v-model="hue"></input>
      <p class="slider-text">{{hue}}</p>
    </div>
    <div class="flex-row align-items-center">
      <p class="slider-text">S</p>
      <input 
         class="slider"
         type="range" value="1" min="0" max="1" step="0.01" v-model="saturation"></input>
      <p class="slider-text">{{vsaturation}}</p>
    </div>
    <div class="flex-row align-items-center">
      <p class="slider-text">V</p>
      <input 
         class="slider"
         type="range" value="1" min="0" max="1" step="0.01" v-model="valueBrightness"></input>
      <p class="slider-text">{{vvalueBrightness}}</p>
    </div>
    <ColorSelector @updateIndex="updateIndex" :index="selectColorIndex" :firstColor="firstColor" :secondColor="secondColor" :thirdColor="thirdColor" :fourthColor="fourthColor"></ColorSelector>
    <ColorView @updateIndex="updateIndex" :index="selectColorIndex" :firstColor="firstColor" :secondColor="secondColor" :thirdColor="thirdColor" :fourthColor="fourthColor"></ColorView>
  </div>
</template>

<script>
import ColorCircle from '@/components/ColorCircle.vue'
import ColorView from '@/components/ColorView.vue'
import ColorSelector from '@/components/ColorSelector.vue'

export default {
  components : {
    ColorCircle,
    ColorSelector,
    ColorView
  },
  computed: {
    size: function() {
      return this.mag * basesize;
    },
    hue: {
      get() {
        return this.$store.getters.hue;
      },
      set(value) {
        this.$store.dispatch('applyHue', value);
      }
    },
    saturation: {
      get() {
        return this.$store.getters.saturation;
      },
      set(value) {
        this.$store.dispatch('applySaturation', value);
      }
    },
    valueBrightness: {
      get() {
        return this.$store.getters.valueBrightness;
      },
      set(value) {
        this.$store.dispatch('applyValueBrightness', value);
      }
    },
    selectColorIndex: {
      get() {
        return this.$store.state.selectColorIndex;
      },
      set(value) {
        this.$store.dispatch('applySelectColorIndex',value);
      }
    },
    firstColor: {
      get() {
        return this.$hsv2rgb(this.$store.state.firstColorHSV);
      }
    },
    secondColor: {
      get() {
        return this.$hsv2rgb(this.$store.state.secondColorHSV);
      }
    },
    thirdColor: {
      get() {
        return this.$hsv2rgb(this.$store.state.thirdColorHSV);
      }
    },
    fourthColor: {
      get() {
        return this.$hsv2rgb(this.$store.state.fourthColorHSV);
      }
    },
    vsaturation: function(){
      return parseInt(this.saturation * 100)
    },
    vvalueBrightness : function(){
      return parseInt(this.valueBrightness * 100)
    },
  },
  data() {
    return{
    }
  },
  methods: {
    updateIndex(index) {
      this.selectColorIndex = index;
    }
  }
}
</script>

<style lang="scss">
.slider {
  width: 200px;
}
.slider-text {
  width: 32px;
}
</style>
