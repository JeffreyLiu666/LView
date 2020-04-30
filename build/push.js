/*
 * @Date: 2020-04-17 14:57:08
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-30 11:26:27
 * @LastEditors: junfeng.liu
 * @Description: npm run test && npm run build && npm publish
 */
const { versionToInt } = require('./util.js')
const packageConfig = require('../package.json')
const { exec, spawn  } = require('child_process')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const readline = require('readline')
const { componentEntries } = require('./util')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function log (fn) {
    return function (str) {
        return fn(str + '\n')
    }
}
const error = log(chalk.white.bgRed.bold)
const success = log(chalk.green.bold)
const warning = log(chalk.yellow.bold)

const localVersion = versionToInt(packageConfig.version)

// 比较线上版本和package.json中的版本
function checkVersion () {
    return new Promise((resolve, reject) => {
        exec('npm search --json l-view-vue', (err, stdout, stderr) => {
            if (err) {
                reject(err)
                console.log(
                    error(`执行的错误: ${err}`)
                )
                return exit()
            }
            try {
                let result = false
                let lists = JSON.parse(stdout)
                for (let item of lists) {
                    if (item.name !== 'l-view-vue') continue
                    let lineVersion = versionToInt(item.version)
                    if (lineVersion < localVersion) result = true
                    break
                }
                resolve(result)
            } catch (err) {
                reject(err)
                console.log(
                    error('解析npm search结果失败', err)
                )
            }
        })
    })
}

// 比较package.json的版本和入口文件的版本
function checkLocalVersion () {
    return new Promise((resolve, reject) => {
        let data = fs.readFileSync(path.resolve('packages/index.js'), { encoding: 'utf-8' })
        const entryVersion = data.match(/\d{1,3}\.\d{1,3}\.\d{1,3}/g)[0]
        const entryVersionInt = versionToInt(entryVersion)
        if (entryVersionInt !== localVersion) return resolve(false)
        resolve(true)
    })
}

// 比较components.js中的组件数和packages下的组件数是否对应
// function checkComponentsSize () {
//     return new Promise((resolve, reject) => {
//         const files = fs.readdirSync(path.resolve('packages'))
//         const count = files.reduce((total, file) => {
//             if (file.charAt(0) !== 'L') return total
//             return ++total
//         }, 0)
//         const registerCompLength = Object.keys(componentEntries()).length
//         resolve(count === registerCompLength)
//     })
// }

function build () {
    const child = spawn('npm run test && npm run build', {
        shell: true
    })

    child.stdout.on('data', (data) => {
        console.log(data.toString('utf-8'))
    })
    
    child.stderr.on('data', (data) => {
        console.log(error(data.toString('utf-8')))
    })
    
    child.on('close', (code) => {
        console.log(success(code))
        rl.question('Are you sure you want to push?  ', (input) => {
            if (input === 'y' || input === 'yes') push()
            rl.close()
        })
    })
}

function push () {
    exec('npm publish', (err, stdout, stderr) => {
        if (err) {
            console.log(
                error(`执行的错误: ${err}`)
            )
            return exit()
        }
        // push成功会从这里出来，奇怪
        // if (stderr) {
        //     console.log(
        //         error(`结果的错误: ${stderr}`)
        //     )
        //     return
        // }
        console.log('stdout', stdout)
        console.log('stderr', stderr)
        console.log(
            success('上传成功！')
        )
    })
}

function exit () {
    process.exit()
}

function fail (msg) {
    console.log(
        warning(msg)
    )
    exit()
}

async function start () {
    const checkLocalVersionPass = await checkLocalVersion()
    if (!checkLocalVersionPass) return fail('入口文件的版本和package.json上的版本不对应')
    console.log(
        success('本地版本校验通过')
    )

    const checkVersionPass = await checkVersion()
    if (!checkVersionPass) return fail('本地版本没有线上版本高')
    console.log(
        success('线上版本校验通过')
    )

    // const checkComponentsSizePass = await checkComponentsSize()
    // if (!checkComponentsSizePass) return fail('注册在components.js中组件数和在packages中的组件数对不上')
    // console.log(
    //     success('组件数目校验通过')
    // )

    build()
}
start()
