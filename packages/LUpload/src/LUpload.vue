<!--
 * @Date: 2020-06-28 14:28:03
 * @Author: junfeng.liu
 * @LastEditTime: 2020-11-16 17:02:38
 * @LastEditors: junfeng.liu
 * @Description: 文件上传组件

    props:
        value：         绑定的值(支持v-model)
        maxLength：     最大文件数，无法限制multiple和value传入
        headers：       请求头
        name：          上传的文件字段名
        data：          上传的附带额外参数
        action：        上传地址
        accept：        限制文件类型
        format：        支持的文件类型
        maxSize：       限制文件大小，单位 kb
        multiple：      是否可以多选
        disabled：      是否禁用
        type：          设置value的格式
        checkReqFn:     用于判断请求是否成功，以及返回指定格式的data数据

    emit：
        success：       文件上传成功时触发
        on-change：     文件变动时触发
-->
<template>
    <div class="l-upload">
        <div class="l-upload-file-list">
            <div class="l-upload-file-item" v-for="(item,index) in fileListCom" :key="item.fileName">
                <div class="l-upload-img-box" :class="{'onlyImg': !showFileName}" @click="imgClick(item.path)" v-if="isImage"><img :src="item.path" /></div>
                <Icon type="ios-paper-outline" v-else />
                <div class="l-upload-file-name" :title="item.fileName" v-if="showFileName">{{item.fileName}}</div>
                <div class="l-upload-del-btn" @click="delFile(index)" v-if="!disabled">
					<Icon type="md-close-circle" />
				</div>
            </div>
            <l-do-upload
                v-if="showUpload && !disabled"
                :headers="headers"
                :name="name"
                :data="data"
                :action="action"
                :accept="accept"
                :format="format"
                :maxSize="maxSize"
                :multiple="multiple"
                :on-success="handleSuccess"
                :on-error="handleError"
                :on-progress="handleProgress"
                :on-exceeded-size="handleExcSize"
                :on-format-error="handleFormatErr"
                :after-choose="afterChoose"
                v-bind="$attrs"
                >
                <div class="l-upload-btn">
                    <Icon type="md-cloud-upload" />
                    <div class="l-upload-btn-text">点击上传</div>
                    <div class="l-upload-progress" :style="{width: progressWidth}"></div>
                </div>
            </l-do-upload>
            <div class="l-upload-btn disabled" v-else-if="showUpload && disabled">
                <Icon type="md-cloud-upload" />
                <div class="l-upload-btn-text">点击上传</div>
            </div>
        </div>
        <LShowImg v-model="show" :src="imgSrc" imgStyle="maxWidth: 60%; maxHeight: 80%" transfer></LShowImg>
    </div>
</template>

<script>
import LShowImg from 'packages/LShowImg'
import { isEmpty } from '@/utils/check.js'
import LDoUpload from './LDoUpload.vue'

export default {
    name: 'l-upload',
    components: { LShowImg, LDoUpload },
    props: {
        value: {
            type: [String, Array]
        },
        maxLength: {
            type: Number,
            default: Infinity
        },
        beforeRemove: Function,
        type: {
            type: Object,
            default: () => {
                return {
                    type: 'array', // 'array','nameAndPath','name','path','nameArray','pathArray'
                    nameKey: 'fileName',
                    pathKey: 'path'
                    // nameSeparator: ':',
                    // fileSeparator: '|'
                }
            }
        },
        headers: {
            type: Object,
            default: () => {
                return {}
            }
        },
        name: {
            type: [String, Number],
            default: 'file'
        },
        data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        action: {
            type: String,
            default: '/upload'
        },
        accept: {
            type: String, // image/jpeg,image/bmp,image/gif,image/png
            default: 'image/*'
        },
        format: {
            type: Array,
            default () {
                return []
            }
        },
        maxSize: {
            type: Number,
            default: Infinity
        },
        multiple: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showUploadBtn: {
            type: Boolean,
            default: true
        },
        showFileName: {
            type: Boolean,
            default: true
        },
        APIUrl: {
            type: String,
            default: ''
        },
        checkReqFn: Function
    },
    data () {
        return {
            show: false,
            imgSrc: '',
            fileList: [],
            progressWidth: 0
        }
    },
    computed: {
        isImage () {
            return this.accept.indexOf('image') !== -1
        },
        isMax () {
            return this.fileList.length >= this.maxLength
        },
        showUpload () {
            if (!this.showUploadBtn) return false
            if (this.isMax && this.fileList.length >= 1) {
                return false
            }
            return true
        },
        fileListCom () { // 调整文件列表
            if (!this.isImage || !this.fileList) return this.fileList
            let list = []
            for (let item of this.fileList) {
                let obj = Object.assign({}, item)
                obj.path = (this.APIUrl || '') + obj.path
                list.push(obj)
            }
            return list
        }
    },
    mounted () {
        this.filterValue(this.value)
    },
    methods: {
        afterChoose (files = []) {
            let len = this.fileList.length + files.length
            if (len <= this.maxLength) return files
            return Array.prototype.slice.call(files, 0, this.maxLength - this.fileList.length)
        },
        imgClick (src) {
            this.imgSrc = src
            this.show = true
        },
        filterValue (val) {
            if (isEmpty(val)) {
                this.fileList = []
                return
            }
            let nameKey = this.type.nameKey
            let pathKey = this.type.pathKey
            let nameSeparator = this.type.nameSeparator ? this.type.nameSeparator : ':'
            let fileSeparator = this.type.fileSeparator ? this.type.fileSeparator : '|'
            let arr = []
            this.fileList = []
            switch (this.type.type) {
                case 'array':
                    if (!Array.isArray(val)) return
                    for (let item of val) {
                        let obj = { fileName: item[nameKey], path: item[pathKey] }
                        this.fileList.push(obj)
                    }
                    break
                case 'pathArray':
                case 'nameArray':
                    if (!Array.isArray(val)) return
                    for (let item of val) {
                        let obj = { fileName: item, path: item }
                        this.fileList.push(obj)
                    }
                    break
                case 'path':
                case 'name':
                    if (typeof val !== 'string') return
                    if (isEmpty(fileSeparator)) {
                        this.fileList.push({ fileName: val, path: val })
                        return
                    }
                    arr = val.split(fileSeparator)
                    for (let item of arr) {
                        let obj = { fileName: item, path: item }
                        this.fileList.push(obj)
                    }
                    break
                case 'nameAndPath':
                    if (typeof val !== 'string') return
                    if (isEmpty(fileSeparator)) {
                        let a = val.split(nameSeparator)
                        this.fileList.push({ fileName: a[0], path: a[1] ? a[1] : a[0] })
                        return
                    }
                    arr = val.split(fileSeparator)
                    for (let item of arr) {
                        let a = item.split(nameSeparator)
                        this.fileList.push({ fileName: a[0], path: a[1] ? a[1] : a[0] })
                    }
                    break
            }
        },
        filterResult () {
            let nameKey = this.type.nameKey
            let pathKey = this.type.pathKey
            let nameSeparator = this.type.nameSeparator ? this.type.nameSeparator : ':'
            let fileSeparator = this.type.fileSeparator ? this.type.fileSeparator : '|'
            let type = this.type.type
            let result = type.indexOf('rray') !== -1 ? [] : ''
            for (let item of this.fileList) {
                let obj = {}
                switch (type) {
                    case 'array':
                        obj[nameKey] = item.fileName
                        obj[pathKey] = item.path
                        result.push(obj)
                        break
                    case 'pathArray':
                        result.push(item.path)
                        break
                    case 'nameArray':
                        result.push(item.fileName)
                        break
                    case 'path':
                        result += item.path + fileSeparator
                        break
                    case 'name':
                        result += item.fileName + fileSeparator
                        break
                    case 'nameAndPath':
                        result += item.fileName + nameSeparator + item.path + fileSeparator
                        break
                }
            }
            return type.indexOf('rray') !== -1 ? result : result.substring(0, result.length - fileSeparator.length)
        },
        reset () {
            this.progressWidth = 0
        },
        async handleSuccess (res) { // 设定返回格式为{ fileName：name, path: path }
            this.reset()

            let data = res.data
            // 当有checkReaFn时由该函数返回data
            if (this.checkReqFn) {
                data = await this.checkReqFn(res)
            }
            if (this.maxLength === 1) {
                this.fileList = []
            }
            this.fileList.push(data)
            let result = this.filterResult()
            this.$emit('input', result)
            this.$emit('success', result)
            this.$emit('on-change', result)
        },
        handleError (err) {
            this.reset()
            this.$Message.error(`出错啦!${err}`)
            this.$emit('error', err)
        },
        handleProgress (e) {
            this.progressWidth = e.percent + '%'
        },
        handleExcSize () {
            this.$Message.error(`文件大小不得超过${this.maxSize}Kb`)
        },
        handleFormatErr () {
            this.$Message.error('请上传指定格式文件')
        },
        delFile (i) {
            if (!this.beforeRemove) {
                this.doDelFile(i)
                return
            }
            let before = this.beforeRemove(i)
            if (before && before.then) {
                before.then(() => (this.doDelFile(i)))
            } else if (before !== false) {
                this.doDelFile(i)
            }
        },
        doDelFile (i) {
            this.fileList.splice(i, 1)
            let result = this.filterResult()
            this.$emit('input', result)
            this.$emit('on-change', result)
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.filterValue(val)
            },
            deep: true
        }
    }
}
</script>

