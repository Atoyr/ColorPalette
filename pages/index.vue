<template>
  <div class="main">
    <div class="color-circle">
      <ColorCircle :saturation="saturation" :val="val"></ColorCircle>
    </div>
    <div class="slider-wrapper">
      <p class="slider-text">S</p>
      <input 
         class="slider"
         type="range" value="1" min="0" max="1" step="0.01" v-model="saturation"></input>
      <p class="slider-text">{{vsaturation}}</p>
    </div>
    <div class="slider-wrapper">
      <p class="slider-text">V</p>
      <input 
         class="slider"
         type="range" value="1" min="0" max="1" step="0.01" v-model="val"></input>
      <p class="slider-text">{{vval}}</p>
    </div>
  </div>
</template>

<script>
import ColorCircle from '@/components/ColorCircle.vue'
export default {
  components : {
    ColorCircle
  },
  computed: {
    vsaturation: function(){
      return parseInt(this.saturation * 100)
    },
    vval: function(){
      return parseInt(this.val * 100)
    }
  },
  data() {
    return{
      saturation: 0.8,
      val: 0.8
    }
  }
}
</script>

<style>
.main {
  display: flex;
  flex-direction: column; 
  align-items: center;
}
.color-circle {
  padding: 12px;
}
.slider-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row; 
}
.slider {
  width: 200px;
  padding: 4px;
}
.slider-text {
  width: 32px;
}
</style>
