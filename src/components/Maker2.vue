<template>
  <div
    ref="background"
    class="background"
    :style="{ backgroundImage: `url(${url})`,width,height }"
    @dblclick="handleMapClick"
  >
    <ul class="dots">
      <li v-for="(v,i) in dots" :key="i" :style="{left:v.left,top:v.top,transform:`rotate(${v.rotate}deg)`}">
        {{v.name}}
      </li>
    </ul>
    <Moveable
      class="dot"
      :style="{
        left: currentDot.x,
        top: currentDot.y,
      }"
      v-bind="moveableOption"
      @dblclick.native.stop="() => {}"
      @drag="handleDrag"
      @rotate="handleRotate"
    >
      <el-select class="select" filterable v-model="currentDot.index" placeholder="请选择">
        <el-option
          v-for="(v,i) in dots"
          :key="i"
          :label="v.name"
          :value="i">
        </el-option>
      </el-select>
    </Moveable>
  </div>
</template>

<script>
import Moveable from 'vue-moveable';
import {mapData} from './js/data'
export default {
  name: "Maker",
  components: {
    Moveable
  },
  props: ["url","width","height"],
  data() {
    return {
      dots: [],
      currentIndex:null,
      currentDot:{},
      x: '',

      moveableOption: {
        draggable: true,
        throttleDrag: 0,
        throttleScale: 0,
        rotatable: true,
        resizable: false,
        throttleResize: 1,
        keepRatio: false,
        scalable: false,
        throttleRotate: 0,
        pinchable: false, // ["draggable", "resizable", "scalable", "rotatable"]
        origin: false,
      },
    };
  },
  computed: {
    dotEls () {
      return this.$el.querySelectorAll('.dot')
    }
  },
  watch: {
    dots: {
      immediate:true,
      deep: true,
      handler (val) {
        this.$emit('change', val)
      }
    }
  },
  mounted(){
    this.dots=mapData
  },
  methods: {
    handleMapClick(e) {
      // eslint-disable-next-line no-prototype-builtins
      if(this.currentDot.hasOwnProperty('index')){
        const {offsetWidth, offsetHeight} = this.$refs.background
        let {index,offset,rotate,left,top}=this.currentDot
        let offsetX=0, offsetY=0;
        if(offset){
          offsetX=offset.substring(0,offset.indexOf("px"))
          offsetY=offset.substring(offset.indexOf(" ")+1,offset.lastIndexOf("px"))
        }
        this.dots[index].left=((left+Number(offsetX))/offsetWidth*100).toFixed(2)+'%'
        this.dots[index].top=((top+Number(offsetY))/offsetHeight*100).toFixed(2)+'%'
        this.dots[index].rotate=rotate? rotate.toFixed(2) : 0
        console.log(index,offset,left,top,this.dots[index]);
      } 
      const { offsetX, offsetY } = e;
      console.log(offsetX, offsetY)
      this.currentDot={
        name: "",
        x: offsetX+'px',
        y: offsetY+'px',
        left: offsetX,
        top: offsetY,
      }
    },

    

    handleDrag({ target, transform }) {
      let str=transform.substring(transform.lastIndexOf("(")+1,transform.lastIndexOf(")"))
      console.log("onDrag left, top", transform,str);
      this.currentDot.offset=str
      target.style.transform = transform;
    },
    handleRotate({ target, dist, transform }) {
      console.log("onRotate", dist);
      this.currentDot.rotate=dist
      target.style.transform = transform;
    },
   
  },
};
</script>

<style lang="less" scoped>
.background {
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .dots{
    li{
      position: absolute;
      font-size: 14px;
    }
  }
}
.dot {
  position: absolute;
  // min-width: 80px;
  font-size: 14px;
  min-height: 30px;

  .select{
    width: 100px;
  }
}
</style>
