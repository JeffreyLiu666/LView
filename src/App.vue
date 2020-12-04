<!--
 * @Date: 2020-03-26 15:04:25
 * @Author: junfeng.liu
 * @LastEditTime: 2020-12-01 22:45:45
 * @LastEditors: junfeng.liu
 * @Description: des
 -->
<template>
    <div>
        <!-- <div style="padding: 20px;width: 500px;height: 300px;background: #f6f6f6;position: relative;"> -->
            <!-- <Sider v-model="collapsed" :width="256" :collapsed-width="64" style="overflow: hidden;"> -->
                <!-- <LMenuConfig :config="routes" @on-select="handleSelect"></LMenuConfig> -->
            <!-- </Sider> -->
            <!-- <LLoading transfer></LLoading> -->
            <!-- <LButtonGroup shape="circles" vertical size="small">
                <LButton type="dashed" icon="logo-facebook" disabled></LButton>
                <LButton type="primary" icon="ios-sunny-outline" disabled></LButton>
                <LButton type="primary" icon="ios-crop" disabled></LButton>
                <LButton type="dashed" icon="ios-color-filter-outline" disabled></LButton>
            </LButtonGroup> -->
            <!-- <LButtonGroup shape="circle" size="large" :disabled="disabled">
                <LButton icon="ios-search" type="primary" disabled></LButton>
                <LButton icon="ios-sunny-outline" type="primary" :disabled="false"></LButton>
                <LButton icon="ios-crop"></LButton>
                <LButton icon="ios-color-filter-outline"></LButton>
            </LButtonGroup> -->
            <!-- <LInput v-model="num" type="number" :autosize="{minRows: 1, maxRows: 5}" prefix="md-cafe" :floatLength="2" size="x" checkChinese clearable search searchButton="search" :maxlength="500" placeholder="hhh">
                <Icon type="md-call" slot="suffix" />
                <span slot="prepend">password</span>
                <Select slot="append" size="default"></Select>
            </LInput> -->
            <!-- <LButton type="info" shape="circles" icon="ios-crop" size="small" to="/hello" target="_blank" debounce earlyTrigger @click="handleClick">sadf</LButton> -->
            <!-- <LButton type="cool-hover" shape="circle" icon="ios-crop" size="" debounce earlyTrigger @click="handleClick">sadf</LButton> -->
        <!-- </div> -->
        <!-- <LLoading ref="loading" transfer :mask="false"></LLoading> -->
        <!-- <LInput v-model="val" type="number" :floatLength="2"></LInput> -->
        <!-- <LInput type="textarea" :autosize="{minRows: 2}" :maxlength="100"></LInput> -->

        <!-- <LCell title="dddd" content="ccc">ddd</LCell> -->
        <!-- <LFold needHide>
            <div>
                <div style="height: 900px;">asdfas</div>
            </div>
        </LFold> -->
        <!-- <LUpload v-model="info.imgs" action="http://localhost:8080/upload" :headers="headers" :max-length="2" multiple :checkReqFn="statusCheck" APIUrl="http://localhost:8080"></LUpload> -->
        <!-- <LShowImg imgStyle="minWidth: 70%;" v-model="show" src="https://pic4.zhimg.com/v2-3da9053461b0a9cecba82eb65186d6d3_r.jpeg"></LShowImg> -->
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
        <LForm v-model="formData" :config="config" :labelPosition="'left'" :labelWidth="80"></LForm>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            val: '',
            headers: {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjIsImlhdCI6MTU5MzMzOTI2MSwiZXhwIjoxNTkzMzQ2NDYxfQ.2pVTaHuIX7iSDk-JlT5f3cVUfVnffONoITovHcB6pbA'
            },
            files: [],
            info: {
                imgs: []
            },
            data: [{ num: 10 }],
            cols: [
                { title: '票名', key: 'name' },
                { title: '票种', key: 'type', width: 70 },
                { title: '单价', key: 'price', width: 70 },
                { title: '数量', key: 'num', width: 110, className: 'aa', type: 'inputNumber', config: { min: 0 }, onChange: (val, row, col, index) => {
                    console.log(val)
                    this.$set(this.data[index], col.key, val)
                    // this.$nextTick(() => {
                    //     this.$set(this.data[index], col.key, 10)
                    // })
                } },
                { title: '数量', key: 'nums', width: 110, dataFunc: (val, row) => {
                    return row.num + 1
                }
                },
                { title: '操作', minWidth: 130,
                    links: [
                        { label: '编辑', action: 'edit' },
                        { label: '删除1', action: 'del', type: 'error', show: ({ row }) => {
                            return row.num > 8
                        } },
                        { label: '删除2', action: 'del', type: 'error', show: ({ row }) => {
                            return row.num <= 8
                        } }
                    ],
                    onClick: this.handleClick
                }
            ],
            formData: { num: 1, num2: 10 },
            show: false,
            config: [
                // { label: '选择售票日期：', key: 'date', type: 'datePicker', show: this },
                { label: '数量:', key: 'num', type: 'numberInput', config: { min: 0 } },
                { label: '数量2:', key: 'num2', type: 'input', config: { type: 'number' } }
            ],
            num: undefined,
            range: ['aa', 22],
            disabled: false,
            collapsed: false,
            routes: [
                {
                    path: '/home',
                    name: 'home',
                    meta: {
                        title: '首页',
                        icon: 'md-heart'
                    },
                    children: [
                        {
                            path: '/home11',
                            name: 'home11',
                            meta: {
                                title: '首页',
                                icon: 'md-heart'
                            },
                            children: [
                                {
                                    path: '/home121',
                                    name: 'home121',
                                    meta: {
                                        title: '首页',
                                        icon: 'md-heart'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/home2',
                    name: 'home2',
                    meta: {
                        title: '首页',
                        customIcon: 'md-heart'
                    },
                    children: [
                        {
                            path: '/home21',
                            name: 'home21',
                            meta: {
                                title: '首页',
                                icon: 'md-heart'
                            }
                        }
                    ]
                },
                {
                    path: '/home1',
                    name: 'home1',
                    meta: {
                        title: '首页',
                        customIcon: 'md-heart'
                    }
                }
            ],
            statusCheck: function (res) {
                return Promise.resolve({ fileName: res.path, path: res.path })
                // let { data, status, code, msg } = res
                // if (status === 1) {
                //     return Promise.resolve(data)
                // } else if (code === '10001') {
                //     this.$Modal.warning({
                //         title: '登录过期',
                //         content: '您的登录信息已过期，请重新登录',
                //         onOk: () => {
                //             console.log('logout')
                //             // store.dispatch('logout')
                //         }
                //     })
                // } else {
                //     this.$Message.error(msg || '未知错误')
                // }
                // return Promise.reject(res)
            }
        }
    },
    created () {
        // this.config = [
        //     { label: '标题', key: 'title1', type: 'title' },
        //     { label: '选择售票日期：', key: 'date', type: 'datePicker', show: () => (this.show) },
        //     {
        //         label: '选择售票日期：',
        //         key: 'date',
        //         type: 'select',
        //         config: {
        //             type: 'textarea',
        //             remote: true,
        //             filterable: true,
        //             requestParam: {
        //                 urlParam: {
        //                     url: 'User/userList',
        //                     method: 'post'
        //                 }
        //             }
        //         }
        //     }
        // ]
    },
    mounted () {
        // console.log(this.$options)
    },
    methods: {
        handleClick () {
            // this.val = 'ffffffffffffffa'
            // this.num = 'asdf'
            this.show = !this.show
            // this.range = ['asdf', 20]
            // console.log('aaa')
            // this.disabled = !this.disabled
            // this.collapsed = !this.collapsed
            // this.$refs.loading.$destroy()
        },
        handleSelect (item) {
            console.log(item)
        },
        judgeShow () {
            return this.show
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

