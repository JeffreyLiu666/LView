/*
 * @Date: 2020-03-26 10:20:48
 * @Author: junfeng.liu
 * @LastEditTime: 2020-04-02 15:43:10
 * @LastEditors: junfeng.liu
 * @Description: des
 */

import { regExp, IDPROVINCECODE } from '@/constant'

export function isEmpty (val) {
    if (val === null ||
        val === undefined ||
        val.toString() === '') {
        return true
    }
    return false
}

export function isNull (val) {
    if (val === null || val === undefined) { return true }
    return false
}

export function isEmptyObject (val) {
    if (!isObject(val)) return false
    return !Object.keys(val).length
}

export function isString (val) {
    return Object.prototype.toString.call(val) === '[object String]'
}

export function isObject (val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}

export function isArray (val) {
    return Object.prototype.toString.call(val) === '[object Array]'
}

export function isNumber (val) {
    return Object.prototype.toString.call(val) === '[object Number]'
}

export function isFunction (val) {
    return Object.prototype.toString.call(val) === '[object Function]'
}

// 是否为数值字符串
export function isNumberString (str) {
    if (isEmpty(str)) {
        return false
    }
    return !Number.isNaN(Number(str))
}

export function isMobile (val) {
    return regExp.mobilePhone.test(val)
}

export function isPhone (val) {
    return regExp.phoneNumber.test(val)
}

export function is400 (val) {
    return regExp.phoneNumber400.test(val)
}

export function isContact (val) {
    return isMobile(val) || isPhone(val) || is400(val)
}

export function isEmail (val) {
    return regExp.email.test(val)
}

export function isIP (val) {
    return regExp.IP.test(val)
}

export function isUrl (val) {
    return regExp.url.test(val)
}

export function isCNChar (val) {
    return regExp.chinese.test(val)
}

export function isBankCardID (val) {
    return regExp.BankCardID.test(val)
}

export function isCNCode (code, sex = null) {
    code = code.toString()
    let tip = ''
    let pass = true
    if (!code || !regExp.ID.test(code)) {
        tip = '身份证号格式错误'
        pass = false
    } else if (!IDPROVINCECODE[code.substr(0, 2)]) {
        tip = '地址编码错误'
        pass = false
    } else {
        let sexCode = code.substr(-1, 1)
        if (code.length == 18) {
            sexCode = code.substr(-2, 1)
            code = code.split('')
            let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
            let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
            let sum = 0
            let ai = 0
            let wi = 0
            for (let i = 0; i < 17; i++) {
                ai = code[i]
                wi = factor[i]
                sum += ai * wi
            }
            if (parity[sum % 11] != code[17]) {
                tip = '校验位错误'
                pass = false
            }
        }
        if (!isEmpty(sex) && (sexCode % 2 != sex)) {
            tip = '性别错误'
            pass = false
        }
    }
    if (!pass) {
        console.log(tip, code)
    }
    return { pass, tip }
}

export function isIDCard (val, sex) {
    return isCNCode(val, sex).pass
}

/**
 * @description: 深层比较是否相等
 * @param {any} val1 需要比较的值
 * @param {any} val2 需要比较的值
 * @return: {boolean} 是否相等
 */
export function isDeepEqual (val1, val2) {
    const type1 = Object.prototype.toString.call(val1)
    const type2 = Object.prototype.toString.call(val2)

    if (
        !val1 ||
        !val2 ||
        type1 !== type2 ||
        typeof val1 !== 'object'
    ) {
        return val1 === val2
    }

    // 处理数组
    if (isArray(val1)) {
        if (val1.length !== val2.length) return false
        for (let i = 0; i < val1.length; i++) {
            if (!isDeepEqual(val1[i], val2[i])) return false
        }
    }

    // 处理Object
    const keys1 = Object.keys(val1)
    const keys2 = Object.keys(val2)
    if (keys1.length !== keys2.length) return false
    for (let k in val1) {
        if (!isDeepEqual(val1[k], val2[k])) return false
    }
    return true
}
