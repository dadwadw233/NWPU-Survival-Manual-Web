<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="24">
          <el-card shadow="hover" class="mgb20" style="height: 100%">
            <div id="myChart" :style="{width: '1600px', height: '1080px'}"></div>
          </el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import Schart from 'vue-schart';
import { reactive, ref } from 'vue';
import imgurl from '../assets/img/img.jpg';
import {onMounted} from 'vue';
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import {ECharts, EChartsOption, init} from 'echarts';
import {getRelationByNames, selectCourseByLabel} from "../api";
import {ElMessage} from "element-plus";
import { ElLoading } from 'element-plus'
let loading = true
const name = localStorage.getItem('ms_username');
const role: string = name === 'admin' ? '超级管理员' : '普通用户';

async function waitAsync (ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}
onMounted(() => {
  const labels = ['计算机视觉', '机器人', '数学基础'];
  const course_with_labels: any[] = []
  const edges_with_labels: any[] = []
  const loadingInstance=ElLoading.service({fullscreen:true})
  for(let i = 0; i<labels.length; i++){
      selectCourseByLabel(labels[i]).then(res=>{
        if(res.data.code==200){
          course_with_labels.push(...res.data.data)
        }else{
          ElMessage.error(res.data.message);
        }
      })
  }

  waitAsync(500).then(res=>{
    for(let i = 0;i<course_with_labels.length;i++){
      for(let j=0;j<course_with_labels.length;j++){
        if(i == j){
          continue;
        }else{
          getRelationByNames(course_with_labels[i]['name'], course_with_labels[j]['name']).then(res=>{
            if(res.data.code==404){
            }else{
              console.log(res.data)
              edges_with_labels.push({source:course_with_labels[i]['name'], target:course_with_labels[j]['name'],lineStyle:{
                  width: res.data.data,
                }})
            }
          })
        }
      }
    }
    waitAsync(3000).then(res=>{
      loadingInstance.close()
      //console.log(edges_with_labels)
      const myChart = document.getElementById('myChart') as HTMLElement;

      const charEch:ECharts=init(myChart);
      const option:EChartsOption = {
        backgroundColor: '#ffffff',
        color: [
          '#8ECFC9',
          '#FFBE7A',
          '#FA7F6F',
          '#82B0D2'
        ],
        title: {
          text: '课程关系图',
          textStyle: {
            color: '#00ccff',
            fontWeight: 700,
            fontSize: 30,
          }
        }, // 标题及标题颜色、尺寸、位置
        legend: [ // 增加图示标签，我们可以点击图示隐藏相关节点
          {
            show: true,
            data: labels
          }],
        series: [
          {
            type: 'graph', // 类型设置为关系图
            legendHoverLink: true,  // 可以点击图例来隐藏一个组
            layout: 'force',
            categories: [
              {name: '计算机视觉', symbolSize: 60},
              {name: '机器人', symbolSize: 60},
              {name: '数学基础', symbolSize: 60},
            ],
            force: {
              repulsion: [1000, 1200], //每个节点之间的斥力因子，越大离的越远
              layoutAnimation: true,
              friction: 0.3, //刷新时节点的移动速度，越大越快，0 - 1 之间
              edgeLength: [100, 130] //两节点之间的距离
            },

            label: {
              show: true, // 节点圆盘上的文字
              fontStyle: 'italic', //文字风格，normal，italic，oblique 三种可选
              fontSize: 12,
              color: '#000000',
            },
            symbolSize: 60, //全局节点尺寸
            itemStyle: {  // 给节点加上阴影，显着立体
              shadowColor: '#C0C0C0',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            //让节点可以通过鼠标拖拽和移动的设置
            roam: true, //开启鼠标平移及缩放
            draggable: true, //节点是否支持鼠标拖拽。
            edgeSymbol: ['circle', 'arrow'],//两节点连线的样式
            edgeSymbolSize: [5, 10],
            cursor: 'pointer', //鼠标悬浮时在图形元素上时鼠标的样式
            labelLayout: {
              moveOverlap: 'shiftX', //标签重叠时，挪动标签防止重叠
              draggable: true //节点标签是否允许鼠标拖拽定位
            },
            emphasis: {
              scale: true, //节点放大效果
              focus: 'adjacency'
            },
            lineStyle: {
              color: '#3d3d3f',
              width: 2,
              curveness: 0 //节点连线的曲率，0-1 越大越弯。
            },

            data: course_with_labels,
            links: edges_with_labels
          }
        ]
      };
      charEch.setOption(option)
    })

    // 绘制图表
  })
  // course_with_labels.push({name:'计算机视觉', category:'计算机视觉'})


});

</script>

<style scoped>
.el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
	color: rgb(242, 94, 67);
}

.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.schart {
	width: 100%;
	height: 300px;
}
</style>
