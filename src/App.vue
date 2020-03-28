<!--
 * @Date: 2020-03-26 15:04:25
 * @Author: junfeng.liu
 * @LastEditTime: 2020-03-28 21:39:32
 * @LastEditors: junfeng.liu
 * @Description: des
 -->
<template>
    <div>
        <!-- <LFold>
            <div style="height: 900px;">asdfas</div>
        </!-->
        <!-- <LShowImg imgStyle="minWidth: 100%;" :value="true" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3924823205,3702330510&fm=15&gp=0.jpg" transfer></LShowImg> -->
        <LNumberInput v-model="num" controlsPosition="right"></LNumberInput>
        <Button @click="handleClick">add</Button>
        <LTable :data="data" :columns="cols" :showPage="false"></LTable>
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
            num: 0
        }
    },
    mounted () {},
    methods: {
        handleClick () {
            this.num = 'asdf'
        }
    }
}
</script>

<style lang="less">
@import '~view-design/dist/styles/iview.css';

</style>

