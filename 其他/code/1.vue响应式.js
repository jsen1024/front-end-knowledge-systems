
var uid = 0;
class Dep {
    constructor() {
        this.id = uid++
        // 用数组存订阅者 这个数组里面方的是Watcher的实例
        this.subs = []
    }
    // 添加订阅
    addSub(sub) {
        this.subs.push(sub)
    }
    // 添加依赖
    depend() {
        // Dep.target 实际上就是我们指定的全局位置，你用window.target也行，重要是全局唯一，没有歧义就行
        if (Dep.target) {
            this.addSub(Dep.target);
        }
    }
    notify() {
        console.log('dep.notify被执行了')
        // 浅克隆一份
        const subs = this.subs.slice(); 
        // 遍历
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

function parsePath(str) {
    var segments = str.split('.')
    return (obj) => {
        for (let i = 0; i < segments.length; i++) {
            obj = obj[segments[i]]
        } 
        return obj;
    }
}
$vm.$watch('a.b.c.d', ()=> {})
var uuid = 0;
class Watcher {
    constructor(target, expression, callback) {
        console.log('我是Watcher类的构造函数');
        this.id = uuid ++;
        this.target = this.target;
        this.getter = parsePath(expression);
        this.callback = callback
        this.value = this.get()
    }
    update() {
        this.run()
    }
    get() {
        // 进入依赖收集阶段.让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
        Dep.target = this;
        const obj = this.target;
        var value;
        // 只要能找就一只找
        try {
            value = this.getter(obj)
        } finally{
            Dep.target = null
        }
        
    }
    run() {
        this.getAndInvoke(this.callback)
    }

    getAndInvoke(cb) {
        const value = this.get();
        if (value !== this.value || typeof value === 'object') {
            const oldValue = this.value;
            this.value = value;
            cb.call(this.target, value, oldValue)
        }
    }



}

function defineReactive(data, key, val) {
    const dep = new Dep()
    // 子元素要进行observe，至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用。
    if (arguments.length === 2) {
        val = data[key]
    }
    let childOb = obvserve(val)
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            console.log('get值',val)
            // 如果处于处于依赖收集阶段
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            return val
        },
        set(newValue) { 
            if (val === newValue) return;
            console.log('set值',newValue)
            val = newValue;
            // 当设置了新值，这个新值也要被observe
            childOb  = obvserve(newValue)
            // 发布订阅模式，通知dep
            dep.notify()
        }
    })
}

const def = function(obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        value: value,
        enumerable,
        writable: true,
        configurable: true
    })
}

// [push,pop,shift,unshift,splice,sort,reserve ]

// 得到数组的原型
const arrayPrototype = Array.prototype;
// 以数组为原型创造一个对象
// 以Array.propotype为原型创建arrayMthods对象
const arrayMethods = Object.create(arrayPrototype);
const methodsNeedChange = ['push','pop','shift','unshift','splice','sort','reserve'];

methodsNeedChange.forEach(methodName => {
    // 备份原来的方法
    const original = arrayPrototype[methodName];
    
    // 定义新的方法
    def(arrayMethods, methodName, function() {
         // 恢复之前的方法(原有的功能)
         let result = original.apply(this, arguments)

         // 把类数组变数组
         let args = [...arguments]
        // 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了？
        // 因为数组肯定不是最高，比如obi.g属性是数组，obj不能是数组，第一遍历obj这个对象的第一层的时候，已经给g属性（就是一个数组）添加了__ob__属性
        const ob = this.__ob__;

        // 有三种方法 push\unshift\splice能够插入新项，现在要把插入的新项变更为observe的
        let inserted = [];
        switch(methodName) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice': 
                // splice格式是splice(下标，数量，插入的新项)
                inserted = args.slice(2);
                break;
            
        }
        // 判断有没有要插入的新项，让新项变为响应式的
        if (inserted) {
            ob.observeArray(inserted)
        }
        // 判断有没有要插入的新项目
        console.log('a-a-a')
        ob.dep.notify()
        return result;
    }, false)
})

// 将一个正常的object转换成为每个层级的属性都是响应式（可以被侦测的）object
class Observer { // Observer单词的意思是观察 
    constructor(value) {
        // 每一个Observer的实例身上，都有一个dep  每一次都有一个dep 
        this.dep = new Dep();
        console.log('构造器', value)
        // 给实例，构造函数的this是指向实例，不是指向类。给实例添加了一个__ob__属性，值是这次new的实例
        def(value, '__ob__', this, false)
        // Observer的目的将一个正常的object转换成为每个层级的属性都是响应式（可以被侦测的）object
        if (Array.isArray(value)) {
            // 如果是数组，要非常强行的蛮干：将这个数组的原型指向arrayMethods
            Object.setPrototypeOf(value, arrayMethods)
            // 让这个数组变成observe
            this.observeArray(value)
        } else {
            this.walk(value)
        }
       
    }
    // 遍历value的key属性，把每个key都设置成defineProperty
    walk(obj) {
        const keys = Object.keys(obj)
        /*walk方法会遍历对象的每一个属性进行defineReactive绑定*/
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        } 
    }
    // 数组的特殊遍历
    observeArray(arr) {
        for (let i = 0, l = arr.length; i < l;i++) {
            obvserve(arr[i])
        }

    }
}


// 创建observe函数，注意函数的名字没有r，辅助函数
function obvserve(value) {
    // 如果不是对象
    if (typeof value !== 'object') return
    let ob; // 存Observer的实例

    // __x__不希望和其他变量重名
    if (typeof value.__ob__ !== 'undefined') {
        ob = value.__ob__;
    } else {
        ob = new Observer(value)
    }
    return ob;
}


/* Observer 将一个正常的Object转换成每个层级的属性都是响应式（可以被侦测的）object */
/* 
    observe(obj) -> 看obj身上有没有__ob__ -> new Observer(),将产生的实例添加__ob__上
    -> 遍历下一层属性,逐个defineReactive
    -> 当设置某个属性时，会触发set，里面有newValue。这个newValue也得被observe()一下
*/


// 4个dep  分别obj,a,b,f
var obj = {
    a: {
        b: {
            c: 1
        } 
    },
    d: 20,
    f: [1,2]
};
obvserve(obj);

obj.f.push('123')
console.log(obj )

// 观察数组 push、pop、shift、unshift、splice、sort、reserve 七种方法被改写

/**
 * ### 什么是依赖？ ###
 * - 需要用到数据的地方，称为依赖
 * - vue1.x，细颗粒依赖，用到数据的DOM都是依赖
 * - vue2.x,中等颗粒依赖，用到数据的组件就是依赖
 * 
 * - 在getter中收集依赖，在setter中触发依赖
 * 
 */

 /**
  * ### Dep类和Watch类
  * - 把依赖收集的代码封装成一个Dep类，它专门用来管理依赖，每个Observer的实例，成员中都有一个Dep实例；
  * - Watcher中一个中介，数据发生变化时通过Watcher中转，通知组件 
  * - 依赖就是Watcher。只有Watcher触发的getter才会收集依赖，哪个Watcher出发了getter，就把哪个Watcher收集到Dep中。
  * - Dep使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的Watcher都通知一遍。
  * - 代码实现的巧妙之处：Watcher把自己设置到全局的一个指定位置，然后读取数据，因为读取了数据，所以会触发这个数据的getter。
  * - 在getter中就能得到当前正在读取的数据的Watcher，并把这个Watcher收集到Dep中
  * 
  */