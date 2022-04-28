<template>
    <div class="HomePage">
        <!-- <div class="HomePageContent"> 主页显示</div> -->
 <!-- <div  ref="myRef" id="chinaChart"></div> -->
 <div class="HP-Up">
      <div class="HP-Up-Left" id="chinaChart">
     
 </div>
 <div class="HP-Up-Right">
     
 </div>
 </div>
 <div class="HP-Down"></div>
    </div>
</template>

<script lang="ts">
interface g{
        (ss:any,item:any, index:number): void;
}
import { reactive,ref, toRefs,defineComponent,onMounted} from 'vue'

import * as echarts from 'echarts'
export default defineComponent({
    setup (props,context) {
        const state = reactive({
            count: 0,
        })
    const myRef = ref(null);
 onMounted(() => {

showEchart();







 })

let showEchart=()=>{
const ProductEfficiencyChart =echarts.init(document?.getElementById("chinaChart") as HTMLElement);

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
            ...toRefs(state),myRef
        }
    }
})
</script>

<style scoped>



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
background-color: rgb(213, 237, 29);
box-sizing: border-box;
width:25.8%;
height: 100%;
}



.HP-Down{
border: 1px solid blue;
background-color: aquamarine;
box-sizing: border-box;
width: 100%;
height: 56%;
}
</style>