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
import { mapActions } from 'vuex'

const basesize = 360
let timer;

/*
 * 連続イベント間引き処理
 * @param {obj} targetFunc 処理したい関数
 * @param {num} time 何ミリ秒以内の処理をスキップするか
 */
function throttle(targetFunc, time) {
    var _time = time || 100;
    clearTimeout(timer);
    timer = setTimeout(function () {
        targetFunc();
    }, _time);
}

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
    division: {
      type: Number,
      default: 12
    },
  },
  computed: {
    size: function() {
      return this.mag * basesize;
    },
    saturation: {
      get() {
        return this.$store.state.saturation;
      },
      set(value) {
        this.$store.commit('updateSaturation', value);
      }
    },
    valueBrightness: {
      get() {
        return this.$store.state.valueBrightness;
      },
      set(value) {
        this.$store.commit('updateValueBrightness', value);
      }
    },
    selectColor: {
      get() {
        return this.$store.state.selectColor;
      },
      set(value) {
        this.$store.commit('updateSelectColor', value);
      }
    }
  },
  data() {
    return {
      halfsize : this.mag * basesize / 2,
      isMouseDown : false,
    }
  },
  methods: {
    ...mapActions([
      'applySelectColor'
      ]),
    draw: function() {
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
    drawBaseColorCircle: function(rad) {
      let outring = this.halfsize;
      rad = rad2canvas(rad)
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgb(255,255,255)'
      this.ctx.lineWidth = this.selectLineWidth
      this.ctx.arc(
        this.halfsize + Math.cos(rad) * (outring - this.lineWidth / 2 - this.borderWidth)
        ,this.halfsize + Math.sin(rad) * (outring - this.lineWidth / 2 - this.borderWidth)
        ,this.lineWidth /2 - this.selectLineWidth
        ,0
        ,2 * Math.PI)
      this.ctx.stroke()
    },
    drawAll: function(x,y) {
      let outring = this.halfsize;
      let inring = this.halfsize - this.lineWidth;
      let donutring = this.halfsize - this.lineWidth * 2;

      let z = x * x + y * y

      let outring2 = outring * outring;
      let inring2 = inring * inring;
      let donutring2 = donutring * donutring;
      let rad = atan2rad(Math.atan2(x,y));

      if (z < outring2 && inring2 <= z) {
        this.draw();
        this.drawBaseColorCircle(rad);
        this.updateSelectColor(rad);
      } else if (z < inring2 && donutring2 <= z) {
        this.draw();
        this.drawBaseColorCircle(rad);
        this.updateSelectColor(rad);
      }
    },
    onClick: function(e) {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left - this.halfsize;
      let y = e.clientY - rect.top - this.halfsize;
      this.drawAll(x,y)
    },
    // onMouseUp: function() {
    //   this.isMouseDown = false;
    // },
    // onMouseDown: function() {
    //   console.log("foo")
    //   this.isMouseDown = true;
    // },
    // onMouseMove: function(e) {
    //   if (this.isMouseDown) {
    //     throttle(() => {
    //       let rect = e.target.getBoundingClientRect();
    //       let x = e.clientX - rect.left - this.halfsize;
    //       let y = e.clientY - rect.top - this.halfsize;
    //       this.drawAll(x,y)
    //     }, 100);
    //   }
    // }
    // rad is radian
    updateSelectColor: function(rad) {
      let canvasrad = rad2canvas(rad)
      console.log(rad * 180/Math.PI, canvasrad * 180/Math.PI)
      let angle = parseInt(canvasrad * 180 / Math.PI);
      let hsv = [angle,this.saturation,this.valueBrightness]
      this.applySelectColor(hsv)
    },
  },
  mounted() {
    this.ctx = this.$refs.canv.getContext('2d');
    this.draw();
    this.updateSelectColor(0);
    this.drawBaseColorCircle(0);
  }
}
</script>

