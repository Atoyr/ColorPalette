<template>
  <div class="color-box" :style="styleValiables">
  </div>
</template>

<script>
export default {
  props: {
    color: [255,255,255],
    borderColor: [0,0,0]
  },
  computed: {
    styleValiables() {
      return {
        //'--colorbox-size': '30px',
        //'--colorbox-border': '7px',
        //'--colorbox-background': `#${this.color[0].toString(16)}${this.color[1].toString(16)}${this.color[2].toString(16)}`,
        //'--colorbox-borderColor': `#${this.borderColor[0].toString(16)}${this.borderColor[1].toString(16)}${this.borderColor[2].toString(16)}`
      }
    }
  }
}
</script>
<style lang="scss" module>
.color-box {
  --colorbox-size: 30px;
  --colorbox-border: 7px;
  --colorbox-background: #FFFFFF;
  --colorbox-bordercolor: #000000;
  background-color: var(--color-background);
  border-color: var(--colorbox-borderColor);
  border-width: var(--colorbox-border);
  width: var(--colorbox-size);
  height: var(--colorbox-size);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
