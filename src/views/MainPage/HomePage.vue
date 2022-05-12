<template>

    <div class="HomePage">
        <!-- <div class="HomePageContent"> 主页显示</div> -->

 <div class="HP-Up">
      <div class="HP-Up-Left" id="chinaChart">
     
 </div>
 <div class="HP-Up-Right">
     <!-- <div :style="{ width: '700px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
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
     </div> -->
     <a-card title="本月消息通知" headStyle="font-size:21px;font-weight:600" style="width: 100%;height:100%">
    <template #extra><a href="#" @click="ShowSchedule">更多</a></template>
    <p>1.总部视频会议，主要讨论第三季生产部产能消耗问题.</p>
    <p>2.拟定排产初步方案.</p>
      <p>3.生产会议，针对第三产线生产设备优化等相关问题.</p>
    <p>4.提交采购合同，并对相关附件信息进行审核，签字确认.</p>
    
  </a-card>
 </div>
 </div>
 <div class="HP-Down">

   


 <a-row style="width:100%;height:100%;border:0px solid red">
    <a-col  :span="6"><div style="width:100%;height:85%;" id="pinA"></div>
    <div style="width:100%;height:15%;text-align:center;font-size:18px;font-weight:700;color:#83757E" >设备号ED0001</div></a-col>
    <a-col :span="6" style="border-left:1px dotted #dedede"><div style="width:100%;height:85%;" id="pinB"></div>
     <div style="width:100%;height:15%;text-align:center;font-size:18px;font-weight:700;color:#83757E" >设备号ED0002</div></a-col>
    <a-col :span="6" style="border-left:1px dotted #dedede"><div style="width:100%;height:85%;" id="pinC"></div>
     <div style="width:100%;height:15%;text-align:center;font-size:18px;font-weight:700;color:#83757E" >设备号ED0003</div></a-col>
    <a-col :span="6" style="border-left:1px dotted #dedede"><div style="width:100%;height:85%;" id="pinD"></div>
     <div style="width:100%;height:15%;text-align:center;font-size:18px;font-weight:700;color:#83757E" >设备号ED0004</div></a-col>
  </a-row>





 </div>
    </div>


    <ShowScheduleModal
    :visible="visibleShowSchedule"
    :modalTitle="modalTitleShowSchedule"
  @CloseSetingMoadl="CloseSchedule"
  />
</template>

<script lang="ts">

import { reactive,ref,watch, toRefs,defineComponent,onMounted,computed } from 'vue'

import ShowScheduleModal from "../../components/ShowScheduleModal.vue";




 import 'moment/locale/zh-cn';
import * as echarts from 'echarts'
export default defineComponent({
    components: {
    ShowScheduleModal
    },
    setup (props,context) {
        const state = reactive({
            count: 0,
               
        })
let visibleShowSchedule = ref<boolean>(false);
    let modalTitleShowSchedule = ref<string>("");
 const ShowSchedule = () => {
      visibleShowSchedule.value = true;
      modalTitleShowSchedule.value = "待办事项计划时间表";
     console.log(visibleShowSchedule.value);

      
    };

 const CloseSchedule = () => {
      visibleShowSchedule.value = false;
         modalTitleShowSchedule.value= "";
    };


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
    let showPinAChart:any=undefined;
       let showPinBChart:any=undefined;
          let showPinCChart:any=undefined;
             let showPinDChart:any=undefined;
 onMounted(() => {

     


 
showEchart();
showPinA();
showPinB();
showPinC();
showPinD();

setTimeout(()=>{ProductEfficiencyChart.resize();

showPinAChart.resize();
showPinBChart.resize();
showPinCChart.resize();
showPinDChart.resize();
},200);






 })


let showPinA=()=>{
    const handred = 100;
let point = 66;
 showPinAChart =echarts.init(document?.getElementById("pinA") as HTMLElement);

    let showPinAOption;
showPinAOption = {
  title: {
    text: point + "%",
    x: "center",
    y: "center",
    textStyle: {
      fontWeight: "normal",
      color: "#29EEF3",
      fontSize: "60",
    },
  },
  tooltip: {
    formatter: function (params:any) {
      return params.name + "：" + params.percent + " %";
    },
  },
  legend: {
    show: true,
    itemGap: 12,
    data: ["产能", "剩余"], 
  },

  series: [
    {
      name: "circle",
      type: "pie",
      clockWise: true,
      radius: ["50%", "66%"],
      itemStyle: {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
      },
      hoverAnimation: false,
      data: [
        {
          value: point,
          name: "产能",
          itemStyle: {
            normal: {
              color: {
                // 颜色渐变
                colorStops: [
                  {
                    offset: 0,
                    color: "#4FADFD", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#28E8FA", // 100% 处的颜色1
                  },
                ],
              },
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
        {
          name: "剩余",
          value: handred - point,
          itemStyle: {
            normal: {
              color: "#E1E8EE",
            },
          },
        },
      ],
    },
  ],
};

// 3. 把配置给实例对象
    showPinAChart.setOption(showPinAOption);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
        showPinAChart.resize();
    });



}

let showPinD=()=>{
    const handred = 100;
let point = 70;
 showPinDChart =echarts.init(document?.getElementById("pinD") as HTMLElement);

    let showPinDOption;
showPinDOption = {
  title: {
    text: point + "%",
    x: "center",
    y: "center",
    textStyle: {
      fontWeight: "normal",
      color: "#29EEF3",
      fontSize: "60",
    },
  },
  tooltip: {
    formatter: function (params:any) {
      return params.name + "：" + params.percent + " %";
    },
  },
  legend: {
    show: true,
    itemGap: 12,
    data: ["产能", "剩余"],
  },

  series: [
    {
      name: "circle",
      type: "pie",
      clockWise: true,
      radius: ["50%", "66%"],
      itemStyle: {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
      },
      hoverAnimation: false,
      data: [
        {
          value: point,
          name: "产能",
          itemStyle: {
            normal: {
              color: {
                // 颜色渐变
                colorStops: [
                  {
                    offset: 0,
                    color: "#D5D81A", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#F0F290", // 100% 处的颜色1
                  },
                ],
              },
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
        {
          name: "剩余",
          value: handred - point,
          itemStyle: {
            normal: {
              color: "#E1E8EE",
            },
          },
        },
      ],
    },
  ],
};

// 3. 把配置给实例对象
    showPinDChart.setOption(showPinDOption);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
        showPinDChart.resize();
    });



}
let showPinC=()=>{
    const handred = 100;
let point = 77;
 showPinCChart =echarts.init(document?.getElementById("pinC") as HTMLElement);

    let showPinCOption;
showPinCOption = {
  title: {
    text: point + "%",
    x: "center",
    y: "center",
    textStyle: {
      fontWeight: "normal",
      color: "#29EEF3",
      fontSize: "60",
    },
  },
  tooltip: {
    formatter: function (params:any) {
      return params.name + "：" + params.percent + " %";
    },
  },
  legend: {
    show: true,
    itemGap: 12,
    data: ["产能", "剩余"],
  },

  series: [
    {
      name: "circle",
      type: "pie",
      clockWise: true,
      radius: ["50%", "66%"],
      itemStyle: {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
      },
      hoverAnimation: false,
      data: [
        {
          value: point,
          name: "产能",
          itemStyle: {
            normal: {
              color: {
                // 颜色渐变
                colorStops: [
                  {
                    offset: 0,
                    color: "#56E11B", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ADF290", // 100% 处的颜色1
                  },
                ],
              },
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
        {
          name: "剩余",
          value: handred - point,
          itemStyle: {
            normal: {
              color: "#E1E8EE",
            },
          },
        },
      ],
    },
  ],
};

// 3. 把配置给实例对象
    showPinCChart.setOption(showPinCOption);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
        showPinCChart.resize();
    });



}
let showPinB=()=>{
    const handred = 100;
let point = 38;
 showPinBChart =echarts.init(document?.getElementById("pinB") as HTMLElement);

    let showPinBOption;
showPinBOption = {
  title: {
    text: point + "%",
    x: "center",
    y: "center",
    textStyle: {
      fontWeight: "normal",
      color: "#29EEF3",
      fontSize: "60",
    },
  },
  tooltip: {
    formatter: function (params:any) {
      return params.name + "：" + params.percent + " %";
    },
  },
  legend: {
    show: true,
    itemGap: 12,
    data: ["产能", "剩余"],
  },

  series: [
    {
      name: "circle",
      type: "pie",
      clockWise: true,
      radius: ["50%", "66%"],
      itemStyle: {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
      },
      hoverAnimation: false,
      data: [
        {
          value: point,
          name: "产能",
          itemStyle: {
            normal: {
              color: {
                // 颜色渐变
                colorStops: [
                  {
                    offset: 0,
                    color: "#CE45E3", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#EFC0F6", // 100% 处的颜色1
                  },
                ],
              },
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
        },
        {
          name: "剩余",
          value: handred - point,
          itemStyle: {
            normal: {
              color: "#E1E8EE",
            },
          },
        },
      ],
    },
  ],
};

// 3. 把配置给实例对象
    showPinBChart.setOption(showPinBOption);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
        showPinBChart.resize();
    });



}




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
            text: '设备产能利用率',
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
visibleShowSchedule,modalTitleShowSchedule,ShowSchedule,CloseSchedule
        }
    }

    
})
</script>

<style scoped>

 /* .warp {
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
      } */
.HomePageContent{
    border:0px solid rgb(19, 92, 201);
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
    border:0px solid red;
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
border: 0px solid blue;

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
    border:1px solid #dedede;

box-sizing: border-box;
width:70%;
height: 100%;
}
.HP-Up-Right
{
    border: 1px solid #dedede;

box-sizing: border-box;
width:29.8%;
height: 100%;
overflow: auto;
}



.HP-Down{
border: 1px solid #dedede;

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