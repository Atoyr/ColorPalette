<template>
  <div>
    <canvas 
      :width="size" 
      :height="size" 
      ref="canv" 
      class="canv" 
      @click="onClick" 
      ></canvas>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

const basesize = 320

function atan2rad(atan) {
  return atan > 0.5 * Math.PI ? atan - 0.5 * Math.PI :  atan + 1.5 * Math.PI;
}

function canvas2rad(canvas) {
  return canvas - 2.5 * Math.PI;
}

function atan2canvas(atan) {
  return atan > 0.5 * Math.PI ? 2.5 * Math.PI - atan : 0.5 * Math.PI - atan;
}

function rad2canvas(rad) {
  return 2 * Math.PI - rad;
}

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
    selectLineWidth: {
      type: Number,
      default: 2
    },
    colorSchemeHelper: {
      type: String,
      default: "none"
    },
    division: {
      type: Number,
      default: 12
    },
  },
  computed: {
    ...mapGetters([
      'hue',
      'saturation',
      'valueBrightness'
    ]),
    ...mapState([
      'firstColorHSV',
      'secondColorHSV',
      'thirdColorHSV',
      'fourthColorHSV'
    ]),
    size: function() {
      return this.mag * basesize;
    },
  },
  data() {
    return {
      halfsize : this.mag * basesize / 2,
      isMouseDown : false,
    }
  },
  methods: {
    ...mapActions([
      'applyHue'
      ]),
    drawCircle: function() {
      this.ctx.beginPath();
      this.ctx.clearRect(0, 0, this.size, this.size);
      this.ctx.globalCompositeOperation = "source-over"

      let outringRad = this.halfsize;
      let inringRad = this.halfsize - this.lineWidth;
      let donutringRad = this.halfsize - this.lineWidth * 2;
      let divangle = 2 / this.division

      for (let i = 0 ; i < this.division; i++) {
        let angle = 360 / this.division * i

        let rgb = this.$hsv2rgb([angle ,this.saturation,this.valueBrightness])
        let rgb1 = this.$hsv2rgb([angle + (360 / this.division / 4 * 1), this.saturation, this.valueBrightness])
        let rgb2 = this.$hsv2rgb([angle + (360 / this.division / 4 * 2), this.saturation, this.valueBrightness])
        let rgb3 = this.$hsv2rgb([angle + (360 / this.division / 4 * 3), this.saturation, this.valueBrightness])
        let rgb4 = this.$hsv2rgb([angle + (360 / this.division), this.saturation, this.valueBrightness])

        // canvas radian
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
    // rad is radian
    drawSelectColorCircle: function(rad) {
      let outring = this.halfsize;
      rad = rad2canvas(rad)
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgb(17,17,17)'
      this.ctx.lineWidth = this.selectLineWidth
      this.ctx.arc(
        this.halfsize + Math.cos(rad) * (outring - this.lineWidth / 2 - this.borderWidth)
        ,this.halfsize + Math.sin(rad) * (outring - this.lineWidth / 2 - this.borderWidth)
        ,this.lineWidth /2 - this.selectLineWidth
        ,0
        ,2 * Math.PI)
      this.ctx.stroke()
    },
    drawSchemeHelper: function() {
      let rad = canvas2rad(this.hue / 180 * Math.PI);
      switch(this.colorSchemeHelper) {
        case "Similar" : 
          let temprad = rad + Math.PI;
          this.ctx.beginPath();
          this.ctx.strokeStyle = 'rgb(17,17,17)';
          this.ctx.lineWidth = this.selectLineWidth;
          this.ctx.moveTo(this.halfsize + (this.halfsize - this.lineWidth) * Math.sin(rad),this.halfsize + (this.halfsize - this.lineWidth) * - - Math.cos(rad));
          this.ctx.lineTo(this.halfsize + (this.halfsize - this.lineWidth) * - Math.sin(rad),this.halfsize - (this.halfsize - this.lineWidth) * - Math.cos(rad))
          this.ctx.stroke();
          break;

      }
    },
    draw: function() {
      this.drawCircle();
      let angle = this.hue;
      // this.updateHue(rad2canvas(angle/180 * Math.PI));
      this.drawSelectColorCircle(rad2canvas(angle/180 * Math.PI));
      this.drawSchemeHelper();
    },
    onClick: function(e) {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left - this.halfsize;
      let y = e.clientY - rect.top - this.halfsize;
      let rad = atan2rad(Math.atan2(x,y));
      this.updateHue(rad)
      this.draw()
    },
    // rad is radian
    updateHue: function(rad) {
      let canvasrad = rad2canvas(rad);;
      let angle = parseInt(canvasrad * 180 / Math.PI);
      this.applyHue(angle)
    },
  },
  mounted() {
    this.ctx = this.$refs.canv.getContext('2d');
    this.drawCircle();
    this.updateHue(0);
    this.drawSelectColorCircle(0);
    this.$store.subscribeAction({
      after: (action, state) => {
        if (action.type === 'applyHue' || action.type === 'applySaturation' || action.type === 'applyValueBrightness' || action.type === 'applySelectColorIndex') {
          this.draw()
        }
      }
    })
  }
}
</script>

