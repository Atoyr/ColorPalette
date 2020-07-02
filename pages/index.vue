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
         class="slider py-4"
         type="range" value="1" min="0" max="1" step="0.01" v-model="valueBrightness"></input>
      <p class="slider-text">{{vvalueBrightness}}</p>
    </div>
    <div>
      <p>HSV : {{hue}} {{saturation}} {{valueBrightness}}</p>
      <p>RGB : {{myColor[0]}} {{myColor[1]}} {{myColor[2]}}</p>
    </div>
    <ColorView :firstColor="myColor" :secondColor="[255,255,255]"></ColorView>
  </div>
</template>

<script>
import ColorCircle from '@/components/ColorCircle.vue'
import ColorView from '@/components/ColorView.vue'

export default {
  components : {
    ColorCircle,
    ColorView
  },
  computed: {
    size: function() {
      return this.mag * basesize;
    },
    hue: {
      get() {
        return this.$store.state.hue;
      },
      set(value) {
        this.$store.dispatch('applyHue', value);
        this.$refs.colorCircle.draw();
      }
    },
    saturation: {
      get() {
        return this.$store.state.saturation;
      },
      set(value) {
        this.$store.dispatch('applySaturation', value);
        this.$refs.colorCircle.draw();
      }
    },
    valueBrightness: {
      get() {
        return this.$store.state.valueBrightness;
      },
      set(value) {
        this.$store.dispatch('applyValueBrightness', value);
        this.$refs.colorCircle.draw();
      }
    },
    myColor: {
      get() {
        return this.$hsv2rgb([this.hue,this.saturation,this.valueBrightness]);
      }
    },
    myColorCode: {
      get() {
        return this.$toColorCode(this.myColor);
      }
    },
    vsaturation: function(){
      return parseInt(this.saturation * 100)
    },
    vvalueBrightness : function(){
      return parseInt(this.valueBrightness * 100)
    },
    myColorStyle() {
      return {
        '--bg': this.myColorCode
      }
    },
  },
  data() {
    return{
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
