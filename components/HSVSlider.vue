<template>
  <div>
    <div class="hsv-slider">
      <p class="hsv-slider__text">H</p>
      <input 
         class="hsv-slider__slider"
         type="range" value="0" min="0" max="359" step="1" v-model="hue"></input>
      <input class="hsv-slider__input-number" type="number" v-model="hue"></input>
    </div>
    <div class="hsv-slider">
      <p class="hsv-slider__text">S</p>
      <input 
         class="hsv-slider__slider"
         type="range" value="1" min="0" max="1" step="0.01" v-model="saturation"></input>
      <input class="hsv-slider__input-number" type="number" v-model="vsaturation"></input>
    </div>
    <div class="hsv-slider">
      <p class="hsv-slider__text">V</p>
      <input 
         class="hsv-slider__slider"
         type="range" value="1" min="0" max="1" step="0.01" v-model="valueBrightness"></input>
      <input class="hsv-slider__input-number" type="number" v-model="vvalueBrightness"></input>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
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
    vsaturation: {
      get() {
        return parseInt(this.saturation * 100)
      },
      set(value) {
        this.saturation = value / 100
      }
    },
    vvalueBrightness : {
      get() {
        return parseInt(this.valueBrightness * 100)
      },
      set(value) {
        this.valueBrightness = value / 100
      }
    },
  },
}
</script>
