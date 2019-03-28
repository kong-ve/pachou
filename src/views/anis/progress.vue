<template>
	<div id='myChart'></div>
</template>
<script>
	import echarts from 'echarts/lib/echarts';
	import 'echarts/lib/chart/bar'
	import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'
	import { get_progress } from "../../api/anis/progress";
	export default {
		data() {
			return {
				echarts1_list:[],
				loading:false
			}
		},
    	//挂载前初始化echarts实例
    	mounted: function () {

    	},
    	methods:{
    		getlist(){
    			get_progress()
    			.then(response => {
    				if(response.item.length>0){
    					this.loading = false;
				// let array = [
				// {name:'总ASIN数量',value:response.item[0]},
				// {name:'当日完成ASIN数量',value:response.item[1]}
				// ];
				// this.echarts1_list = array || [];
				let i = response.item[0]>response.item[1]?response.item[0]:response.item[1];
				this.echarts1_list = response.item || [];
				this.echartsOption(response.item,i);
			}

			if(response.item.length == 0){
				this.$message.error(response.message);
			}
                    // this.total = response.item.length || 0;
                })
    			.catch(() => {
    				this.loading = false;
    				this.echarts1_list = [];
    			});
    		},
    		echartsOption(list,i){
		// 基于准备好的dom，初始化echarts实例
		let myChart = echarts.init(document.getElementById('myChart'))
		// 绘制图表，this.echarts1_option是数据
		myChart.setOption({
			color: ['#618FC8'],
                    backgroundColor:'#F8F8F8',
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：‘line‘ | ‘shadow‘
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top:20,
                        containLabel: true
                    },
			xAxis: {
				data: ["总ASIN数量","当日完成ASIN数量"]
			},
			yAxis: [
			{
				type : 'value',
				min:0,
				max:i,
				interval: 5,
			}
			],
			series: [{
				name: '完成',
				type: 'bar',
				data: list
			}]
		})
	}
},
created() {
        // 加载表格数据
        this.getlist();
    }
}

</script>
<style scoped>
#myChart{
	width: 100%;
	height: 600px;
}
</style>