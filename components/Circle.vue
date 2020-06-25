<template>
  <canvas width="400" height="400" ref="canv" class="canv"></canvas>
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
      default: 64
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
      this.ctx.clearRect(0, 0, this.size, this.size)

      for (let i = 0 ; i < this.division; i++) {

        let x = 2 / this.division
        let start = x * i - x/2
        let end = x * (i + 1) - x/2
        let h = 360 / this.division * i
        let rgb = this.$hsv2rgb([h,this.saturation,this.val])
        let rgb1 = this.$hsv2rgb([h + (360 / this.division / 4 * 1),this.saturation,this.val])
        let rgb2 = this.$hsv2rgb([h + (360 / this.division / 4 * 2),this.saturation,this.val])
        let rgb3 = this.$hsv2rgb([h + (360 / this.division / 4 * 3),this.saturation,this.val])
        let rgb4 = this.$hsv2rgb([h + (360 / this.division),this.saturation,this.val])


        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        this.ctx.arc(
          this.halfsize
          ,this.halfsize
          ,this.halfsize - this.lineWidth 
          , start * Math.PI - Math.PI/2 + Math.PI / 360
          , end * Math.PI - Math.PI/2 - Math.PI / 360)
        this.ctx.stroke();

        this.ctx.beginPath();
        let startrec = x * i * Math.PI - Math.PI/2 
        let endrec = x * (i + 1) * Math.PI - Math.PI/2 
        let grd = this.ctx.createLinearGradient(
          this.halfsize + -Math.cos(startrec) * 100
          ,this.halfsize + -Math.sin(startrec) * 100
          ,this.halfsize + -Math.cos(endrec) * 100
          ,this.halfsize + -Math.sin(endrec) * 100)

        grd.addColorStop(1.0 , `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`);
        grd.addColorStop(0.75 , `rgb(${rgb1[0]},${rgb1[1]},${rgb1[2]})`);
        grd.addColorStop(0.50 , `rgb(${rgb2[0]},${rgb2[1]},${rgb2[2]})`);
        grd.addColorStop(0.25 , `rgb(${rgb3[0]},${rgb3[1]},${rgb3[2]})`);
        grd.addColorStop(0.0 , `rgb(${rgb4[0]},${rgb4[1]},${rgb4[2]})`);

        this.ctx.lineWidth = this.lineWidth / 2
        this.ctx.strokeStyle = grd
        this.ctx.arc(
          this.halfsize
          ,this.halfsize
          ,this.halfsize - this.lineWidth / 4 
          ,startrec - Math.PI / 180
          ,endrec)
        this.ctx.stroke();
      }

      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = 'black'
      this.ctx.beginPath();
      this.ctx.arc(this.halfsize,this.halfsize,this.halfsize , 0,2 * Math.PI)
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(this.halfsize,this.halfsize,this.halfsize - this.lineWidth /2 , 0,2 * Math.PI)
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(this.halfsize,this.halfsize,this.halfsize - this.lineWidth * 1.5 , 0,2 * Math.PI)
      this.ctx.stroke();
    }

  },
  mounted() {
    this.ctx = this.$refs.canv.getContext('2d')
    this.draw()
  }
}
</script>

