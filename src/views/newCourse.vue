<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="课程号" prop="cno">
          <el-input v-model="form.cno"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" prop="cname">
          <el-input v-model="form.cname"></el-input>
        </el-form-item>
        <el-form-item label="教师名称" prop="tname">
          <el-input v-model="form.tname"></el-input>
        </el-form-item>
        <el-form-item label="开课部门" prop="dname">
          <el-input v-model="form.dname"></el-input>
        </el-form-item>
        <el-form-item label="设置学分" prop="dname">
          <el-input v-model="form.credit"></el-input>
        </el-form-item>
        <el-form-item label="课程类别" prop="cclf">
          <el-select v-model="form.cclf" placeholder="请选择">
            <el-option key="专业选修课" label="专业选修课" value="专业选修课"></el-option>
            <el-option key="学科基础课程" label="学科基础课程" value="学科基础课程"></el-option>
            <el-option key="大类通识课程" label="大类通识课程" value="大类通识课程"></el-option>
            <el-option key="个性发展类课程" label="个性发展类课程" value="个性发展类课程"></el-option>
            <el-option key="综合素养类课程" label="综合素养类课程" value="综合素养类课程"></el-option>
            <el-option key="语言类" label="语言类" value="语言类"></el-option>
            <el-option key="专业核心课程" label="专业核心课程" value="专业核心课程"></el-option>
            <el-option key="数学与自然科学类" label="数学与自然科学类" value="数学与自然科学类"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否考试" prop="exam">
          <el-switch v-model="form.exam_"></el-switch>
        </el-form-item>
        <el-form-item label="人数上限" prop="exam">
          <el-slider v-model="form.slimit" :step="10" show-stops />
        </el-form-item>
        <el-form-item label="上课时间" prop="exam">
          <el-input type="textarea" rows="3" v-model="form.csche"></el-input>
        </el-form-item>
        <el-form-item label="开课校区" prop="campus">
          <el-radio-group v-model="form.campus">
            <el-radio label="长安校区"></el-radio>
            <el-radio label="友谊校区"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input type="textarea" rows="5" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">添加课程</el-button>
          <el-button @click="onReset(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="baseform">
import { reactive, ref } from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import {deleteCourse, insertNewCourse, selectCourseByCno, updateCourseInfo} from "../api";


const rules: FormRules = {
  cno: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  cname: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  tname: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  dname: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  cclf: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  credit: [{ required: true, message: '请输入内容', trigger: 'blur' }],
};
const formRef = ref<FormInstance>();
const form = reactive({
  cno:'',
  tname:'',
  dname:'',
  cname: '',
  cclf: '',
  credit:'',
  campus:'',
  exam_: false,
  exam:'',
  description:'',
  csche:'',
  slimit:'',

});
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
  // 表单校验
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(form);
      if(!form.exam_){
        form.exam = '考察'
      }else{
        form.exam = '考试'
      }
      selectCourseByCno(form.cno).then(res=>{
        //当前课程已经存在
          if(res.data.data.length!=0){
            ElMessageBox.confirm('当前课号已经存在，是否修改数据？', '提示', {
              type: 'warning'
            })
                .then(() => {
                  updateCourseInfo(form).then(res=>{
                    if (res.data.code == 200){
                      ElMessage.success(res.data.message);
                    }else{
                      ElMessage.error(res.data.message);
                    }
                  })
                })
                .catch(() => {});
          }else{
            insertNewCourse(form).then(res=>{
              if (res.data.code == 200){
                ElMessage.success(res.data.message);
              }else{
                ElMessage.error(res.data.message);
              }
            })
          }
      })



    } else {
      return false;
    }
  });
};
// 重置
const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>
