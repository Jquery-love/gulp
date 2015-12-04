端口88 配置文件可以改
	gcf.port=88

启动后按路径访问，如：http://localhost:88/user/html/test.html

开发目录：public/
	项目目录，如：user/
生产目录：dist/
	对应于开发的项目目录

js 打包 是webpack 配置：
	webpack.config.js

开发环境启动：gulp user --env dev

生产环境启动：gulp user --env prod