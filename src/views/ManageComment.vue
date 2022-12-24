<template>
  <div>
    <div class="container">
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="cno" label="课号" width="55" align="center"></el-table-column>
        <el-table-column prop="cid" label="评论id"></el-table-column>
        <el-table-column prop="time" label="评论时间"></el-table-column>
        <el-table-column prop="visible" label="通过审核？"></el-table-column>
        <el-table-column prop="isselect" label="是否选课"></el-table-column>
        <el-table-column prop="sscore" label="课程成绩"></el-table-column>
        <el-table-column prop="detail" label="评论详情"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button text :icon="Delete" @click="handleDelete(scope.$index)" v-permiss="15">
              删除评论
            </el-button>
            <el-button text :icon="Pass" @click="handlePass(scope.$index)" v-permiss="15">
              通过审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import {
  deleteComment,
  fetchData,
  getCommentLimit,
  getCommentNum, passComment,
  searchCourseRegional,
  selectCourseByCno
} from '../api/index';
import {getCourseNum} from "../api/index";
import {fetchDataLimit} from "../api/index";
import {deleteCourse,searchCourse} from "../api/index";
import * as XLSX from "xlsx";
import router from "../router";

interface TableItem {
  cno: string;
  cname: string;
  cid:number;
  time:string;
  detail:string;
  visible:number;
  isselect:number;
  sscore:number;
}

const query = reactive({
  cno: '',
  cname: '',
  tname: '',
  dname: '',
  cclf:'',
  exam:'',
  pageSize:10,
  pageIndex:1
});
const tableData = ref<TableItem[]>([]);
const tableDataForExport = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
  getCommentNum().then(res=>{
    pageTotal.value = res.data.data;
    console.log(res.data.data)
  })
  getCommentLimit((0).toString(), (10).toString()).then(res => {
    tableData.value = res.data.data;
  });
};
getData();

// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val;
  getCommentLimit((query.pageSize*(val-1)).toString(), (query.pageSize).toString()).then(res=>{
    console.log(res.data.data)
    tableData.value = res.data.data;
  })
};

// 删除操作
const handleDelete = (index: number) => {
  // 二次确认删除
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        deleteComment((tableData.value[index].cno),(tableData.value[index].cid)).then(res=>{
          ElMessage.success(res.data);
          tableData.value.splice(index, 1);
          pageTotal.value = pageTotal.value-1
          getData()
        })

      })
      .catch(() => {});
};

const handlePass = (index: number) => {
  ElMessageBox.confirm('确定要通过审核吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        passComment((tableData.value[index].cno),(tableData.value[index].cid)).then(res=>{
          ElMessage.success(res.data);
          getData()
        })

      })
      .catch(() => {});
}

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
  name: '',
  address: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
  idx = index;
  form.name = row.name;
  form.address = row.address;
  editVisible.value = true;
};
/*
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].name = form.name;
	tableData.value[idx].address = form.address;
};
*/
const list = [['ID','课号', '课名', '授课教师', '校区', '考查形式', '课程类别', '开课部门']];
const exportXlsx = () => {
  fetchData().then(res=>{
    if(res.data.code == 200){
      tableDataForExport.value = res.data.data
      ElMessage.success('数据拉取成功');
    }else{
      ElMessage.error(res.data.code);
    }
    tableDataForExport.value.map((item: any, i: number) => {
      const arr: any[] = [i+1];
      arr.push(...[item.cno, item.cname, item.tname, item.campus, item.exam, item.cclf, item.dname]);
      list.push(arr);
    });
    let WorkSheet = XLSX.utils.aoa_to_sheet(list);
    let new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, WorkSheet, '第一页');
    XLSX.writeFile(new_workbook, `课程清单.xlsx`)
    ElMessage.success("数据导出成功");
  })

};

</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #F56C6C;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
