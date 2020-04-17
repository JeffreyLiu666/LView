<!--
 * @Date: 2020-03-26 15:04:25
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-17 14:13:54
 * @LastEditors: junfeng.liu
 * @Description: des
 -->
<template>
    <div>
        <LButton type="primary" long debounce earlyTrigger @click="handleClick">asdf</LButton>
        <div style="padding: 20px;width: 500px;">
            <LInput v-model="num" type="text" :autosize="{minRows: 1, maxRows: 5}" prefix="md-cafe" size="x" checkChinese clearable search searchButton="search" :maxlength="500" placeholder="hhh">
                <!-- <Icon type="md-call" slot="suffix" /> -->
                <span slot="prepend">password</span>
                <!-- <Select slot="append" size="default"></Select> -->
            </LInput>
        </div>
        
        <!-- <LCell title="dddd" content="ccc">ddd</LCell>
        <LFold>
            <div>
                <div style="height: 900px;" v-if="show">asdfas</div>
            </div>
        </LFold> -->
        <!-- <LShowImg imgStyle="minWidth: 100%;" v-model="show" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3924823205,3702330510&fm=15&gp=0.jpg"></LShowImg> -->
        <!-- <LNumberInput v-model="num" controlsPosition="x" :min="0" :max="10" size="xx"></LNumberInput>
        <LNumberRange v-model="range" :max="20" :min="10"></LNumberRange> -->
        <!-- <LTable :data="data" :columns="cols" :showPage="false"></LTable> -->
        <!-- <Button @click="handleClick">add</Button> -->
        <!-- <div id="testDom" style="width: 100px; height: 1000px; overflow: auto;"> -->
            <!-- <div style="height: 2000px;">asdfas</div> -->
            <!-- <div>fdff</div> -->
        <!-- </div> -->
        <!-- <LToTop wrapper="#testDom"></LToTop> -->
        <!-- <LDateRange v-model="range"></LDateRange> -->
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            data: [{num: 10}],
            cols: [
                { title: '票名', key: 'name' },
                { title: '票种', key: 'type', width: 70 },
                { title: '单价', key: 'price', width: 70 },
                { title: '数量', key: 'num', width: 110, className: 'aa', type: 'inputNumber', config: { min: 0 },  onChange: (val, row, col, index) => {
                    console.log(val)
                    this.$set(this.data[index], col.key, val)
                } },
                { title: '数量', key: 'nums', width: 110, dataFunc: (val, row) => {
                    return row.num + 1
                } }
            ],
            num: '123456789',
            range: ['aa', 22],
            show: false
        }
    },
    mounted () {
        // console.log(this.$options)
    },
    methods: {
        handleClick () {
            // this.num = 'asdf'
            // this.show = true
            // this.range = ['asdf', 20]
            console.log('aaa')
        }
    }
}
</script>

<style lang="less">
@import '~view-design/dist/styles/iview.css';
@import '~packages/style/index.less';

// @primary-color: black;
// @red: white;

// html, body{
//     width: 100%;
//     height: 100%;
//     overflow: auto;
// }

</style>

