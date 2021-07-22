<template>
  <div
    ref="background"
    class="background"
    :style="{ backgroundImage: `url(${url})` }"
    @dblclick="handleMapClcik"
  >
    <Moveable
      class="dot"
      :class="{ active: index === activeIndex }"
      :style="{
        left: x,
        top: y,
      }"
      v-for="({ text, x, y }, index) in dots"
      :key="index"
      v-bind="moveable"
      @click.native.stop="handleDotClick($event, index)"
      @dblclick.native.stop="() => {}"
      @drag="handleDrag"
      @resize="handleResize"
      @scale="handleScale"
      @rotate="handleRotate"
      @warp="handleWarp"
      @pinch="handlePinch"
    >
      <el-input
        ref="input"
        class="dot-input"
        :value="text"
        @input="dots[index].text = $event"
      />
    </Moveable>
  </div>
</template>

<script>
import Moveable from 'vue-moveable';

export default {
  name: "Maker",
  components: {
    Moveable
  },
  props: ["url"],
  data() {
    return {
      dots: [],
      activeIndex: -1,
      x: '',

      moveable: {
        draggable: true,
        throttleDrag: 0,
        resizable: false,
        throttleResize: 1,
        keepRatio: false,
        scalable: true,
        throttleScale: 0,
        rotatable: true,
        throttleRotate: 0,
        pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
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
      deep: true,
      handler (val) {
        this.$emit('change', val.filter(v => v.text))
      }
    }
  },
  methods: {
    handleMapClcik(e) {
      const { offsetX, offsetY } = e;

      const {offsetWidth, offsetHeight} = this.$refs.background

      // console.log(offsetX)

      let len = this.dots.push({
        text: "",
        x: `${offsetX / offsetWidth * 100}%`,
        y: `${offsetY / offsetHeight * 100}%`,
      });
      this.activeIndex = len - 1;
    },

    handleDotClick (e, index) {
      this.activeIndex = index

      this.$refs.input[index].focus()
    },

    handleDrag({ target, transform }) {
      console.log("onDrag left, top", transform);
      target.style.transform = transform;
    },
    handleResize({ target, width, height, delta }) {
      console.log("onResize", width, height);
      delta[0] && (target.style.width = `${width}px`);
      delta[1] && (target.style.height = `${height}px`);
    },
    handleScale({ target, transform, scale }) {
      console.log("onScale scale", scale);
      target.style.transform = transform;
    },
    handleRotate({ target, dist, transform }) {
      console.log("onRotate", dist);
      target.style.transform = transform;
    },
    handleWarp({ target, transform }) {
      console.log("onWarp", transform);
      target.style.transform = transform;
    },
    handlePinch({ target }) {
      console.log("onPinch", target);
    },
  },
};
</script>

<style lang="less" scoped>
.background {
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.dot {
  position: absolute;
  // min-width: 80px;
  font-size: 12px;
  min-height: 30px;

  &.active {
    border: 1px solid #ccc;
  }

  &-input {
    width: 100px;
  }
}
</style>
