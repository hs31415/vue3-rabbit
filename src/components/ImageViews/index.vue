<script setup>
import { ref, watch} from 'vue'
import { useMouseInElement } from '@vueuse/core';

const curIndex = ref(0)
const mouseEnterFn = (i) => curIndex.value = i

const props = defineProps({
  imageList: Array
})

const imageList = ref(props.imageList) 

const target = ref(null)
const {elementX, elementY, isOutside} = useMouseInElement(target)
const left = ref(0)
const top = ref(0)
watch([elementX, elementY, isOutside], () => {
  if(isOutside.value){
    return
  }
  elementX.value = Math.max(100, Math.min(300, elementX.value))
  elementY.value = Math.max(100, Math.min(300, elementY.value))
  left.value =  elementX.value - 100
  top.value = elementY.value - 100
})

watch(() => props.imageList, (newValue) => {
  imageList.value = newValue;
});

</script>

<template>
  <div class="goods-image">
    <div class="middle" ref="target">
      <img :src="imageList[curIndex]" alt=""/>
      <div  v-show="!isOutside" class="layer" :style="{left:`${left}px`,top:`${top}px`}"></div>
    </div>
    <ul class="small">
      <li v-for="(img, i) in imageList" 
        :key="i" 
        @mouseenter="mouseEnterFn(i)" 
        :class="{ active: i === curIndex }"
        v-show="img"
      >
        <img :src="img" alt=""/>
      </li>
    </ul>

    <div class="large" :style="[
      {
        backgroundImage:`url(${imageList[curIndex]})`,
        backgroundPositionX: `${-left*2}px`,
        backgroundPositionY: `${-top*2}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
  
</template>

<style scoped lang="scss">
.goods-image{
  width:480px;
  height:400px;
  position:relative;
  display:flex;

  .middle{
    width:400px;
    height:400px;
    background:#f5f5f5;
  }

  .large{
    position:absolute;
    top:0;
    left:412px;
    width:400px;
    height:400px;
    z-index:500;
    box-shadow:0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer{
    width:200px;
    height:200px;
    background:rgba(0, 0, 0, 0.2);
    left:0;
    top:0;
    position:absolute;
  }

  .small{
    width:80px;

    li{
      width:68px;
      height:68px;
      margin-left:12px;
      margin-bottom:15px;
      cursor:pointer;

      &:hover,
      &.active{
        border:2px solid $xtxColor;
      }
    }
  }
}
</style>