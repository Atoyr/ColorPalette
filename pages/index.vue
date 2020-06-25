<template>
  <div align="center">
      <Cl :saturation="saturation" :val="val"></Cl>
      <input type="range" value="1" min="0" max="1" step="0.01" v-model="saturation"></input>
      <input type="range" value="1" min="0" max="1" step="0.01" v-model="val"></input>
  </div>
</template>

<script>
import Cl from '@/components/Circle.vue'
export default {
  components : {
    Cl
  },
  data() {
    return{
      saturation: 0.8,
      val: 0.8
    }
  }
}
</script>

