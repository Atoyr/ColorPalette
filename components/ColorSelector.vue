<template>
  <div class="color-selector">
    <div class="color-selector__item"  v-for="(cc, i) in colorCodes" :style="colorStyle(i+1,cc)" @click="onClick(i + 1,cc)">
      <p>{{cc}}</p>
      <p>{{cc}}</p>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    firstColor: {
      type:Array,
      'default': () => [0,0,0]
    },
    secondColor: {
      type:Array,
      'default': () => [0,0,0]
    },
    thirdColor: {
      type:Array,
      'default': () => [0,0,0]
    },
    fourthColor: {
      type:Array,
      'default': () => [0,0,0]
    },
    index: {
      type:Number,
      'default': 1
    }
  },
  computed: {
    selectColorIndex: {
      get() {
        return this.index;
      },
      set(value) {
        this.$emit('updateIndex',value)
      }
    },
    colors() {
      return [
        this.firstColor,
        this.secondColor,
        this.thirdColor,
        this.fourthColor
      ]
    },
    firstColorCode() {
        return this.$toColorCode(this.firstColor)
    },
    secondColorCode() {
        return this.$toColorCode(this.secondColor)
    },
    thirdColorCode() {
        return this.$toColorCode(this.thirdColor)
    },
    fourthColorCode() {
        return this.$toColorCode(this.fourthColor)
    },
    colorCodes() {
      return[
        this.firstColorCode,
        this.secondColorCode,
        this.thirdColorCode,
        this.fourthColorCode
        ];
    },
  },
  methods: {
    colorStyle(index,colorCode) {
      if (index === this.selectColorIndex) {
        return { 
          '--bg': colorCode,
          '--width': '8rem'
        }
      }else {
        return { 
          '--bg': colorCode,
          '--width': '4rem'
        }
      }
    },
    onClick: function(index) {
      this.selectColorIndex = index;
    }
  }
}
</script>

