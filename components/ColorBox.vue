<template>
  <div class="color-box" :style="styleValiables">
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type:Array,
      'default': () => [0,0,0]
    },
    borderColor: {
      type:Array,
      'default': () => [0,0,0]
    },
  },
  computed: {
    styleValiables() {
      return {
        '--colorbox-size': '2rem',
        '--colorbox-border': '0.5rem',
        '--colorbox-background': `#${this.$toPaddedHexString(this.color[0],2)}${this.$toPaddedHexString(this.color[1],2)}${this.$toPaddedHexString(this.color[2],2)}`,
        '--colorbox-borderColor': `#${this.$toPaddedHexString(this.borderColor[0],2)}${this.$toPaddedHexString(this.borderColor[1],2)}${this.$toPaddedHexString(this.borderColor[2],2)}`
      }
    }
  }
}
</script>
<style lang="scss">
.color-box {
  --colorbox-size: 30px;
  --colorbox-border: 7px;
  --colorbox-background: #FFFFFF;
  --colorbox-bordercolor: #000000;
  background-color: var(--colorbox-background);
  border: {
    style: solid;
    color: var(--colorbox-borderColor);
    width: var(--colorbox-border);
  }
  width: var(--colorbox-size);
  height: var(--colorbox-size);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
