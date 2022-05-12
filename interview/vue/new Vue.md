# new Vue做了什么？

```javascript
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

```

`Vue` 实际上是一个类，类在 Javascript 中是用 Function 来实现的，来看一下源码，在`src/core/instance/index.js` 中

```javascript
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  /*初始化*/
  this._init(options)
}
```

通过`new`创建一个对象，调用`this._init`方法，`this._init` 是挂载在`Vue`的原型上。`this._init`方法在

`src/core/instance/init.js` 中

```javascript
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-init:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    /*一个防止vm实例自身被观察的标志位*/
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    /*初始化生命周期*/
    initLifecycle(vm)
    /*初始化事件*/
    initEvents(vm)
    /*初始化render*/
    initRender(vm)
    /*调用beforeCreate钩子函数并且触发beforeCreate钩子事件*/
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    /*初始化props、methods、data、computed与watch*/
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    /*调用created钩子函数并且触发created钩子事件*/
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      /*格式化组件名*/
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      /*挂载组件*/
      vm.$mount(vm.$options.el)
    }
  }
}
```

_init主要做了这两件事：

1.合并配置，初始化化生命周期，初始化事件，初始化渲染，初始化state(data、props、computed、watcher)等

2.$mount组件。

在生命钩子beforeCreate与created之间会初始化state，在此过程中，会依次初始化props、methods、data、computed与watch，这也就是Vue.js对options中的数据进行“响应式化”（即双向绑定）的过程。



参考

> [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)

