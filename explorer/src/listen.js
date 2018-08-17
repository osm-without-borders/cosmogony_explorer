/**
 * Event communication wrapper
 */

export default (function Listen() {
  window.fire = function(name, params, options) {
    let event = new CustomEvent(name, {detail : {params : params, options : options}})
    window.dispatchEvent(event)
  }
  window.listen = function(name, cb) {
    window.addEventListener(name, ({detail}) => {
      cb(detail.params, detail.options)
    })
  }
})()