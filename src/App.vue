<!--
 * @Date: 2020-03-26 15:04:25
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-03 12:41:16
 * @LastEditors: junfeng.liu
 * @Description: des
 -->
<template>
    <div class="l-view-bg-red">
        <LFold>
            <div>
                <div style="height: 900px;" v-if="show">asdfas</div>
            </div>
        </LFold>
        <LShowImg imgStyle="minWidth: 100%;" v-model="show" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3924823205,3702330510&fm=15&gp=0.jpg"></LShowImg>
        <!-- <LNumberInput v-model="num" controlsPosition="right" :max="10"></LNumberInput> -->
        <!-- <LNumberRange v-model="range" :max="20" :min="10"></LNumberRange> -->
        <!-- <LTable :data="data" :columns="cols" :showPage="false"></LTable> -->
        <Button @click="handleClick">add</Button>
        <div id="testDom" style="width: 100px; height: 1000px; overflow: auto;">
            <div style="height: 2000px;">asdfas</div>
            <!-- <div>fdff</div> -->
        </div>
        <LToTop wrapper="#testDom" />
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            data: [{}],
            cols: [
                { title: '票名', key: 'name' },
                { title: '票种', key: 'type', width: 70 },
                { title: '单价', key: 'price', width: 70 },
                { title: '数量', key: 'num', width: 110, className: 'aa', type: 'inputNumber', min: 0, onChange: (val, index, col) => {
                    this.$set(this.data[index], col.key, val)
                } }
            ],
            num: 10,
            range: ['aa', 22],
            show: false
        }
    },
    mounted () {},
    methods: {
        handleClick () {
            // this.num = 'asdf'
            this.show = true
            // this.range = ['asdf', 122]
        }
    }
}
</script>

<style lang="less">
@import '~view-design/dist/styles/iview.css';
@import '~packages/style/index.less';

@primary-color: black;
@red: white;

// html, body{
//     width: 100%;
//     height: 100%;
//     overflow: auto;
// }

</style>

