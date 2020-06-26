<template>
  <canvas width="400" height="400" ref="canv" class="canv" @click="cl"></canvas>
</template>

<script>
const basesize = 400
export default {
  props: {
    mag: {
      type: Number,
      default: 1
    },
    lineWidth: {
      type: Number,
      default: 32
    },
    borderWidth: {
      type: Number,
      default: 2
    },
    division: {
      type: Number,
      default: 12
    },
    saturation: {
      type: Number,
      default: 0.8
    },
    val: {
      type: Number,
      default: 0.8
    },
  },
  computed: {
    size: function() {
      return this.mag * basesize;
    },
  },
  watch: {
    saturation:  function(n,o){
      this.draw()
    },
    val:  function(n,o){
      this.draw()
    }
  },
  data() {
    return {
      halfsize : this.mag * basesize / 2
    }
  },
  methods: {
    draw: function() {
      this.ctx.beginPath();
      this.ctx.clearRect(0, 0, this.size, this.size);
      this.ctx.globalCompositeOperation = "source-over"

      let outringRad = this.halfsize;
      let inringRad = this.halfsize - this.lineWidth;
      let donutringRad = this.halfsize - this.lineWidth * 2;
      let divangle = 2 / this.division

      for (let i = 0 ; i < this.division; i++) {
        let h = 360 / this.division * i

        let rgb = this.$hsv2rgb([h,this.saturation,this.val])
        let rgb1 = this.$hsv2rgb([h + (360 / this.division / 4 * 1),this.saturation,this.val])
        let rgb2 = this.$hsv2rgb([h + (360 / this.division / 4 * 2),this.saturation,this.val])
        let rgb3 = this.$hsv2rgb([h + (360 / this.division / 4 * 3),this.saturation,this.val])
        let rgb4 = this.$hsv2rgb([h + (360 / this.division),this.saturation,this.val])

        let outringStr = divangle * i * Math.PI
        let outringEnd = divangle * (i + 1) * Math.PI
        let inringStr = (divangle * i - divangle/2 ) * Math.PI
        let inringEnd = (divangle * (i + 1) - divangle/2) * Math.PI

        let grd = this.ctx.createLinearGradient(
          this.halfsize + -Math.cos(outringStr) * 100
          ,this.halfsize + -Math.sin(outringStr) * 100
          ,this.halfsize + -Math.cos(outringEnd) * 100
          ,this.halfsize + -Math.sin(outringEnd) * 100)

        grd.addColorStop(1.0 , `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`);
        grd.addColorStop(0.75 , `rgb(${rgb1[0]},${rgb1[1]},${rgb1[2]})`);
        grd.addColorStop(0.50 , `rgb(${rgb2[0]},${rgb2[1]},${rgb2[2]})`);
        grd.addColorStop(0.25 , `rgb(${rgb3[0]},${rgb3[1]},${rgb3[2]})`);
        grd.addColorStop(0.0 , `rgb(${rgb4[0]},${rgb4[1]},${rgb4[2]})`);

        // outring
        this.ctx.beginPath();
        this.ctx.arc(
          this.halfsize
          ,this.halfsize
          ,outringRad - this.borderWidth
          ,outringStr
          ,outringEnd + Math.PI / 180);
        this.ctx.arc(
          this.halfsize
          ,this.halfsize
          ,inringRad
          ,outringEnd + Math.PI / 180
          ,outringStr
          ,true );
        this.ctx.closePath();

        this.ctx.fillStyle = grd
        this.ctx.fill();

        // inring
        this.ctx.beginPath();
        this.ctx.arc(
          this.halfsize
          ,this.halfsize
          ,inringRad - this.borderWidth
          ,inringStr + Math.PI / 360
          ,inringEnd - Math.PI / 360)
        this.ctx.arc(
          this.halfsize
          ,this.halfsize
          ,donutringRad
          ,inringEnd - Math.PI / 360
          ,inringStr + Math.PI / 360
          ,true)

        this.ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        this.ctx.closePath();
        this.ctx.fill();
      }
    },
      cl: function() {
        this.saturation = 0.5
      }

  },
  mounted() {
    this.ctx = this.$refs.canv.getContext('2d')
    this.draw()
  }
}
</script>

