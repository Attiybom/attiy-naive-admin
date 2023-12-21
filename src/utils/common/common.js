import dayjs from 'dayjs'

/**
 * @desc  格式化时间
 * @param {(Object|string|number)} time
 * @param {string} format
 * @returns {string | null}
 */
export function formatDateTime(time = undefined, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function formatDate(date = undefined, format = 'YYYY-MM-DD') {
  return formatDateTime(date, format)
}

/**
 * @desc  函数节流
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */
export function throttle(fn, wait) {
  var context, args
  var previous = 0

  return function () {
    var now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

/**
 * @desc  函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(method, wait, immediate) {
  let timeout
  return function (...args) {
    let context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      /**
       * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
       * 这样确保立即执行后wait毫秒内不会被再次触发
       */
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        method.apply(context, args)
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        /**
         * args是一个类数组对象，所以使用fn.apply
         * 也可写作method.call(context, ...args)
         */
        method.apply(context, args)
      }, wait)
    }
  }
}

/**
 *
 * @param {HTMLElement} el
 * @param {Function} cb
 * @return {ResizeObserver}
 */
export function useResize(el, cb) {
  const observer = new ResizeObserver((entries) => {
    cb(entries[0].contentRect)
  })
  observer.observe(el)
  return observer
}

/**
 * @description 时间计算函数
 * @returns {string}
 */

export function getTimeOfDay() {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  if (currentHour >= 5 && currentHour < 12) {
    return '早上好！'
  } else if (currentHour >= 12 && currentHour < 18) {
    return '下午好！'
  } else {
    return '晚上好！'
  }
}

/**
 * @description 判断邮箱格式是否有效
 * @returns {boolean}
 */

export function isValidEmail(email) {
  // 这个正则表达式覆盖了大多数常见的电子邮件格式
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
