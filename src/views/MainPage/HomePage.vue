<template>

    <div class="HomePage">
        <!-- <div class="HomePageContent"> 主页显示</div> -->

 <div class="HP-Up">
      <div class="HP-Up-Left" id="chinaChart">
     
 </div>
 <div class="HP-Up-Right">
     <div :style="{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px' }">
     <a-calendar v-model:value="value" :fullscreen="true" :locale="locale"   @select="onSelect" @panelChange="onPanelChange"  >   
    <template #dateCellRender="{ current }">
      <ul class="events">
        <li v-for="item in getListData(current)" :key="item.content">
          <a-badge :status="item.type" :text="item.content"/>
        </li>
      </ul>
    </template>
    <template #monthCellRender="{ current }">
      <div v-if="getMonthData(current)" class="notes-month">
        <section>{{ getMonthData(current) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </a-calendar>
     </div>
 </div>
 </div>
 <div class="HP-Down">

   








 </div>
    </div>
</template>

<script lang="ts">

import { reactive,ref,watch, toRefs,defineComponent,onMounted,computed } from 'vue'
 import 'moment/locale/zh-cn';
import * as echarts from 'echarts'
export default defineComponent({
    components: {
      //vueSeamlessScroll
    },
    setup (props,context) {
        const state = reactive({
            count: 0,
               
        })
        //https://ant.design/components/calendar-cn/
//https://blog.csdn.net/qq_41619796/article/details/104795405
         const value = ref<any>();
 let listData:any[]|undefined=undefined;
    const getListData = (value: any) => {
 listData=[];
      switch (value.date()) {
           case 3:
          listData = [
            { type: 'success', content: '总部视频会议.' },
            //{ type: 'success', content: 'This is usual event.' },
          ];
          break;
           case 19:
          listData = [
            { type: 'success', content: '拟定排产初步方案.' },
            //{ type: 'success', content: 'This is usual event.' },
          ];
          break;
        case 8:
          listData = [
            { type: 'success', content: '生产会议.' },
            //{ type: 'success', content: 'This is usual event.' },
          ];
          break;
        case 10:
          listData = [
            { type: 'warning', content: '提交采购合同.' },
          //  { type: 'success', content: 'This is usual event.' },
            //{ type: 'error', content: 'This is error event.' },
          ];
          break;
        case 15:
          listData = [
            { type: 'warning', content: '预定酒店' },
          //  { type: 'success', content: 'This is very long usual event。。....' },
          //  { type: 'error', content: 'This is error event 1.' },
           // { type: 'error', content: 'This is error event 2.' },
           // { type: 'error', content: 'This is error event 3.' },
           // { type: 'error', content: 'This is error event 4.' },
          ];
          break;
        default:
      }         
 return listData || [];
    }

const getMonthData = (value: any) => {
      if (value.month() === 8) {
        return "约见重要客人";
      }
    };
 const onSelect = (value: any) => {
     console.log(value)
    };
    const onPanelChange = (value: any) => {
     value
    };
  let ProductEfficiencyChart:any=undefined;
 onMounted(() => {

     


 
showEchart();
setTimeout(()=>{ProductEfficiencyChart.resize();},100);






 })

let showEchart=()=>{
 ProductEfficiencyChart =echarts.init(document?.getElementById("chinaChart") as HTMLElement);

    let ProductEfficiencyOption;
  
    // 统计百分比
    var data1 = [14, 15, 65, 24, 75, 23, 24, 43, 27, 72, 12, 53];
    var data2 = [45, 65, 24, 74, 25, 53, 42, 54, 13, 32, 52, 23];
    var json:any = {
        chart0: {
            xcategory: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            low: data1,
            lowLine: [],
        }
    };
    var json2 = {
        chart0: {
            xcategory: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            low: data2,
            lowLine: [],
        }
    };



    var zrUtil = echarts.util;
    zrUtil.each(json.chart0.xcategory, function(item:any, index:any) {
        json.chart0.lowLine.push([{
            coord: [index,json.chart0.low[index]]
        }, {
            coord: [index + 1, json.chart0?.low[index + 1]]
        }]);
});






    ProductEfficiencyOption = {
        title: {
            text: '生产效率统计量比',
            textStyle: {
                align: 'center',
                color: 'black',
                //fontSize: 20,
            },
            top: '3%',
            left: '2%',
        },
        //backgroundColor: '#fff',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#15ecf4'
                }
            },
            backgroundColor: 'rgba(0,0,0,.8)',
            extraCssText: 'box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);',
            // formatter: function(params) {
            //     var result = params[0].name + '<br>';
            //     params.forEach(function(item) {
            //         result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>';
            //         // 判断设置增长还是降低
            //         if (parseFloat(item.data) >= 50) {
            //             result += item.seriesName + ": " + '<span class="growth">增长' + item.data + "%</span><br>"
            //         } else if (parseFloat(item.data) < 50) {
            //             result += item.seriesName + ": " + '<span class="reduce">降低' + item.data + "%</span><br>"
            //         }
            //     });
            //     return result;
            // }
        },
        legend: {
            data: ['目标', '实际'],
            textStyle: {
                fontSize: 12,
                //color: 'rgb(0,253,255,0.6)'
                color: 'black'
            },
            top: '5%',
            right: '5%'
        },
        grid: {
            bottom: 40,
            left: 60,
            right: 20,
        },
        xAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    //color: '#15faff',
                    color: 'black'
                },

            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        },
        yAxis: {
            max: 100,
            splitNumber: 4,
            interval: 25,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#4b4d64'
                }
            },
            axisLabel: {
                formatter: '{value} %',
                textStyle: { //改变刻度字体样式
                    // color: '#ffffff'
                    color: 'black'
                }
            },
        },
        series: [{
                name: '目标',
                type: 'line',
                // smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255, 204,1, .9)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(255, 204,1,.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ffcb00'
                    }
                },
                data: data1
            }, {
                name: '目标',
                type: 'lines',
                coordinateSystem: 'cartesian2d',
                zlevel: 1,
                smooth: true,
                symbol: 'circle',
                effect: {
                    show: true,
                    smooth: true,
                    period: 3,
                    symbolSize: 5
                },
                lineStyle: {
                    normal: {
                        color: '#ffcb00',
                        width: 0,
                        opacity: 0,
                        curveness: 0,
                    }
                },
                data: json.chart0.lowLine
            }, {
                name: '实际',
                type: 'line',
                // smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                // areaStyle: {
                //     normal: {
                //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //             offset: 0,
                //             color: 'rgba(21, 250, 255,.9)'
                //         }, {
                //             offset: 0.8,
                //             color: 'rgba(21, 250, 255,.1)'
                //         }], false),
                //         shadowColor: 'rgba(0, 0, 0, 0.1)',
                //         shadowBlur: 10
                //     }
                // },
                itemStyle: {
                    normal: {
                        color: '#15faff'
                    }
                },
                data: data2
            },
            // {
            //     name: '同比',
            //     type: 'lines',
            //     coordinateSystem: 'cartesian2d',
            //     zlevel: 1,
            //     smooth: true,
            //     symbol: 'circle',
            //     effect: {
            //         show: true,
            //         smooth: true,
            //         period: 2,
            //         symbolSize: 8
            //     },
            //     lineStyle: {
            //         normal: {
            //             color: '#15faff',
            //             width: 0,
            //             opacity: 0,
            //             curveness: 0,
            //         }
            //     },
            //     data: json2.chart0.lowLine
            // }, 



        ]
    };

    // 3. 把配置给实例对象
    ProductEfficiencyChart.setOption(ProductEfficiencyOption);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
        ProductEfficiencyChart.resize();
    });



}

        return {
            ...toRefs(state),value,
      getListData,
      getMonthData,locale: {
          lang: {
            month: '月',
            year: '年',
          },
        }, onSelect,
      onPanelChange,

        }
    }

    
})
</script>

<style scoped>

 .warp {
    height: 370px;
    width: 360px;
    margin: 0 auto;
 
    border:1px solid rgb(21, 51, 221);
    padding:3px
    
  }
  .warp ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      
    }
 .warp ul li,a {
        display: block;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;border:1px solid red
      }
.HomePageContent{
    border:1px solid rgb(19, 92, 201);
    box-sizing: border-box;
   
      min-width:1000px;
     min-height: 675px;
      height: calc(100vh - 92px);
    /* background-image: url("../../assets/bgHome.png");
    background-repeat: no-repeat; 
    background-origin: border-box;
    background-size: cover; */
    background-color: darkgray;
     
}
.HomePage{
    border:1px solid red;
    box-sizing: border-box;
   padding:1px;
    height: calc(100vh - 92px);
   overflow: auto;
   display: flex;
   flex-direction: column;
   justify-content:space-around;
   align-items: center;
    
    
}

.HP-Up{
border: 1px solid blue;

box-sizing: border-box;
width: 100%;
height: 43.8%;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
}
.HP-Up-Left
{
    border: 1px solid blue;

box-sizing: border-box;
width:74%;
height: 100%;
}
.HP-Up-Right
{
    border: 1px solid blue;

box-sizing: border-box;
width:25.8%;
height: 100%;
overflow: auto;
}



.HP-Down{
border: 1px solid blue;
background-color: aquamarine;
box-sizing: border-box;
width: 100%;
height: 56%;
}



.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: auto;
  white-space: wrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 23px;
}
.notes-month section {
  font-size: 23px;
}
.ant-badge-status-text{
    color: blue!important;
}
</style>