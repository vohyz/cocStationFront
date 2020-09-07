// anime.js
import anime from 'animejs'

const install = (Vue, options) => {
    Vue.prototype.$animejs = anime
    console.log(options)
}

export default install