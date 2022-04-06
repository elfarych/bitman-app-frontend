import Vue from 'vue'
import dayjs from 'dayjs'

require('dayjs/locale/ru')
dayjs.locale('ru')

// импортируем плагины
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

// подключаем плагины
dayjs.extend(customParseFormat)
dayjs.extend(utc)

Vue.prototype.$dayjs = dayjs

export { dayjs }
