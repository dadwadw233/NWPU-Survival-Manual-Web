<template>
  <el-descriptions
        class="margin-top"
        title="课程详情"
        direction="vertical"
        :column="2"
        border
    >
      <template #extra>
        <el-button type="primary">Operation</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            课程号
          </div>
        </template>
        {{detail[0]['cno']}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            课程名称
          </div>
        </template>
        {{detail[0]['cname']}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location />
            </el-icon>
            授课教师
          </div>
        </template>
        {{detail[0]['tname']}}
      </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          课程类别
        </div>
      </template>
      {{detail[0]['cclf']}}
    </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            开课部门
          </div>
        </template>
        {{detail[0]['dname']}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            学分
          </div>
        </template>
        {{detail[0]['credit']}}
      </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          开课校区
        </div>
      </template>
      {{detail[0]['campus']}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          人数上限
        </div>
      </template>
      {{detail[0]['slimit']}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          学时
        </div>
      </template>
      {{detail[0]['length']}}
    </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            上课时间安排
          </div>
        </template>
        {{detail[0]['csche']}}
      </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          详细介绍
        </div>
      </template>
      {{detail[0]['description']}}
    </el-descriptions-item>
    </el-descriptions>

    <div class="container">
      <div class="plugins-tips">
        发表评论
      </div>
      <div class="mgb20" ref="editor"></div>
      <el-button type="primary" @click="syncHTML">提交</el-button>
    </div>

</template>


<script setup lang="ts" name="editor">
import WangEditor from 'wangeditor';
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, onBeforeMount} from 'vue';
import { getCurrentInstance } from "vue";
import router from "../router";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import {addNewComment, fetchData, passComment, selectCourseByCno} from '../api/index';
import {getCourseNum} from "../api/index";
import {fetchDataLimit} from "../api/index";
import {deleteCourse,searchCourse, getCommentNumByCno} from "../api/index";
// @ts-ignore
const detail = JSON.parse(router.currentRoute.value.query['detail'])
console.log(detail)






interface TableItem {
  cno: string;
  cname: string;
  tname: string;
  dname: string;
  cclf: string;
  credit: number;
  csche: string;
  exam: string;
  length: number;
  slimit: number;
  campus: string;
  description: string;
}


/*
const getData = () => {
// @ts-ignore
  selectCourseByCno(cno.toString()).then(res => {
    console.log(res.data)
    tableData = res.data.data;
  });
};
*/

async function waitAsync (ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}






const editor = ref(null);
const content = reactive({
  detail: '',
  cno:'',
  cid:'',
  sno:'2020303030',
  time:'',
  isselect:0,
  sscore:0,
  visible:0,
});
let instance: any;
onBeforeMount(()=>{
  /*
  waitAsync(100).then(res=>{
    getData();
    waitAsync(100).then(res=>{
      console.log(tableData.length)

    })
  })*/
})
onMounted(() => {

  instance = new WangEditor(editor.value);
  instance.config.zIndex = 1;
  instance.create();
});
onBeforeUnmount(() => {
  instance.destroy();
  instance = null;
});
const syncHTML = () => {
  content.detail =  instance.txt.text()
  content.cno = detail[0]['cno']
  var date = new Date()
  console.log(date.toLocaleDateString())
  content.time = date.toLocaleDateString()
  getCommentNumByCno(content.cno).then(res=>{
    content.cid = res.data.data+1
    console.log(content.cid)
  })
  ElMessageBox.confirm('确定提交评论吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        addNewComment(content).then(res=>{
          if (res.data.code == 200){
            ElMessage.success(res.data.message);
          }
          console.log(res.data)
        })
      })
      .catch(() => {});
};
</script>

<style></style>
