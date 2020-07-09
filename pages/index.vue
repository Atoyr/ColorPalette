<template>
  <div class="main">
    <ColorCircle class="color-circle" ref="colorCircle"></ColorCircle>
    <HSVSlider></HSVSlider>
    <ColorSelector 
      @updateIndex="updateIndex" 
      :index="selectColorIndex" 
      :firstColor="firstColor" 
      :secondColor="secondColor" 
      :thirdColor="thirdColor" 
      :fourthColor="fourthColor">
    </ColorSelector>
    <ColorView 
      :index="selectColorIndex" 
      :firstColor="firstColor" 
      :secondColor="secondColor" 
      :thirdColor="thirdColor" 
      :fourthColor="fourthColor">
    </ColorView>
  </div>
</template>

<script>
import ColorCircle from '@/components/ColorCircle.vue'
import HSVSlider from '@/components/HSVSlider.vue'
import ColorView from '@/components/ColorView.vue'
import ColorSelector from '@/components/ColorSelector.vue'

export default {
  components : {
    ColorCircle,
    HSVSlider,
    ColorSelector,
    ColorView
  },
  computed: {
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
