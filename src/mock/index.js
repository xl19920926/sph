// 导入mock模块
import Mock from 'mockjs';
// 导入mock数据
import banner from './banner.json';
import floor from './floor.json';
import categorylist from './categorylist.json';
import login from './login.json';

Mock.mock('mock/banner', {
	code: 200,
	data: banner
})

Mock.mock('mock/floor', {
	code: 200,
	data: floor
})
Mock.mock('mock/categorylist', {
	code: 200,
	data: categorylist
})
Mock.mock('mock/login', {
	code: 200,
	data: login
})
