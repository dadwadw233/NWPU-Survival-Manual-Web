
## 安装步骤
> 因为使用vite3，node版本需要 14.18+

```
cd NWPU-Survival-Manual-Web    // 进入目录
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn

// 运行
npm run dev


// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

所有与后端请求直接相关的代码在``src/api``下，通过axios向后端发起请求
