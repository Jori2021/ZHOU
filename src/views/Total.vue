<template>
  <div id="main" style="width: 1000px;height: 600px"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "Total",
  data(){
    return{
      inNumber:[],
      outNumber:[],
      inPrice:[],
      outPrice:[],
      profit:[]
    }
  },
  mounted(){
    var app = {};

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    this.request.post("http://localhost:98/total").then(res=>{
      for(var i=0;i<res.data.length;i++){
        option.series[0].data[i]=res.data[i].inNumber
        option.series[1].data[i]=res.data[i].outNumber
        option.series[2].data[i]=res.data[i].inPrice
        option.series[3].data[i]=res.data[i].outPrice
        option.series[4].data[i]=res.data[i].profit

      }
      option && myChart.setOption(option);

    })
    const posList = [
      'left',
      'right',
      'top',
      'bottom',
      'inside',
      'insideTop',
      'insideLeft',
      'insideRight',
      'insideBottom',
      'insideTopLeft',
      'insideTopRight',
      'insideBottomLeft',
      'insideBottomRight'
    ];
    app.configParameters = {
      rotate: {
        min: -90,
        max: 90
      },
      align: {
        options: {
          left: 'left',
          center: 'center',
          right: 'right'
        }
      },
      verticalAlign: {
        options: {
          top: 'top',
          middle: 'middle',
          bottom: 'bottom'
        }
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos;
          return map;
        }, {})
      },
      distance: {
        min: 0,
        max: 100
      }
    };
    app.config = {
      rotate: 90,
      align: 'left',
      verticalAlign: 'middle',
      position: 'insideBottom',
      distance: 15,
      onChange: function () {
        const labelOption = {
          rotate: app.config.rotate,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          position: app.config.position,
          distance: app.config.distance
        };
        myChart.setOption({
          series: [
            {
              label: labelOption
            },
            {
              label: labelOption
            },
            {
              label: labelOption
            },
            {
              label: labelOption
            }
          ]
        });
      }
    };
    const labelOption = {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {}
      }
    };
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['入库总数', '出库总数', '入库总金额', '出库总金额','利润']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['第一季度', '第二季度', '第三季度', '第四季度 ']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],

      series: [
        {
          name: '入库总数',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '出库总数',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '入库总金额',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '出库总金额',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        },
        {
          name: '利润',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: []
        }
      ]
    };


  }
}
</script>

<style>

</style>