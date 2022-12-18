<template>
  <template v-if="show">
    <el-descriptions
        class="margin-top"
        title="课程详情"
        direction="vertical"
        :column="1"
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
            课程名称
          </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            Telephone
          </div>
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location />
            </el-icon>
            Place
          </div>
        </template>
        Suzhou
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            Remarks
          </div>
        </template>
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            Address
          </div>
        </template>
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>

    <div class="container">
      <div class="plugins-tips">
        发表评论
        <a href="https://www.wangeditor.com/doc/" target="_blank">wangEditor</a>
      </div>
      <div class="mgb20" ref="editor"></div>
      <el-button type="primary" @click="syncHTML">提交</el-button>
    </div>
  </template>
  <template v-else>加载中</template>

</template>


<script setup lang="ts" name="editor">
import WangEditor from 'wangeditor';
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, onBeforeMount} from 'vue';
import { getCurrentInstance } from "vue";
import router from "../router";
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import {fetchData, selectCourseByCno} from '../api/index';
import {getCourseNum} from "../api/index";
import {fetchDataLimit} from "../api/index";
import {deleteCourse,searchCourse} from "../api/index";
const cno = router.currentRoute.value.query['cno']

console.log(cno)





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

let tableData: any[] = []
let show = false


const getData = () => {
// @ts-ignore
  selectCourseByCno(cno.toString()).then(res => {
    console.log(res.data)
    tableData = res.data.data;
  });
};
async function waitAsync (ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}






const editor = ref(null);
const content = reactive({
  html: '',
  text: ''
});
let instance: any;
onBeforeMount(()=>{
  waitAsync(100).then(res=>{
    getData();
    waitAsync(100).then(res=>{
      console.log(tableData.length)

    })
  })
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
  content.html = instance.txt.html();
  console.log(content.html);
};
</script>

<style></style>
