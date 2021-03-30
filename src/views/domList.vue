<template>
  <div class="cover" :style="`height:${height}px;top: ${top}px;`">
    <div
      class="cover-item"
      :class="{'dash-line': index>0}"
      v-for="(value,name, index) in domList"
      :key="index"
      :style="`width:${value.length*part}px;height:${height}px;`"
    >
      <div class="category-title" v-if="showTitle">
        <p>{{ name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    domList: {
      type: Object
    },
    // 按照因子种类划分多少部分
    part: {
      type: Number
    },
    // 覆盖层的高度
    height: {
      type: Number
    },
    // 离顶部的距离
    top: {
      type: Number
    },
    // 是否展示种类标题
    showTitle: {
        type: Boolean
    }
  },
};
</script>

<style lang="scss" scoped>
.cover {
  position: absolute;

  width: 1180px;
  padding-left: 118px;
  z-index: -1;
  display: flex;
  .cover-item {
    .category-title {
      text-align: center;
      p {
        display: inline-block;
        padding: 4px 20px;
        color: #ee2f79;
        border: 1px solid #ee2f79;
        border-radius: 15px;
      }
    }
  }
  .dash-line {
    border-left: 1px dashed #ee2f79;
  }
}
</style>