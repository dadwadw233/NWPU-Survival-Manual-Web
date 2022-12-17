<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-card shadow="hover" class="mgb20" style="height: 100%">
          <div id="myChart" :style="{width: '1000px', height: '700px'}"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import Schart from 'vue-schart';
import { reactive } from 'vue';
import imgurl from '../assets/img/img.jpg';
import {onMounted} from 'vue';
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import {ECharts, EChartsOption, init} from 'echarts';

const name = localStorage.getItem('ms_username');
const role: string = name === 'admin' ? '超级管理员' : '普通用户';

onMounted(() => {
  const labels = ['计算机视觉', '机器人', '大数据'];
  const course_with_labels = []
  for(var i = 0;i<labels.length;i++){

  }
  const myChart = document.getElementById('myChart') as HTMLElement;

  const charEch:ECharts=init(myChart);
  const option:EChartsOption = {
    backgroundColor: '#f6f5f3',
    color: [
      '#02c9c9',
      '#bccf3d',
      '#ffc300'
    ],
    title: {
      text: '课程关系图',
      textStyle: {
        color: '#368cbf',
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
          {name: '大数据', symbolSize: 60}
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

        data: [
          {
            name: '机器学习与人工智能',
            symbolSize: 80,
            category: '计算机视觉'
          },
          {
            name: '图解深度学习',
            category: '计算机视觉'
          },


        ],
        links: [
          {
            source:'机器学习与人工智能',
            target:'图解深度学习'
          }
        ]
      }
    ]
  };
  charEch.setOption(option)
  // 绘制图表

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
