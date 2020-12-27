## typeof原理

## instanceof原理

`instanceof`可以准确的判断复杂数据类型，但是不能正确判断基本数据类型。

 `instanceof ` 是通过原型链判断的， `L instanceof R `, 在L的原型链中层层查找，是否有原型等于 `R.prototype `，如果一直找到A的原型链的顶端( `null `;即`Object.prototype.__proto__`),仍然不等于 `R.prototype `，那么返回 `false `，否则返回 `true `。

```javascript
function instance_of (L, R) {
  var O = R.prototype,
      L = L.__proto__;
  while (true) {
    if (L === null) return false
    if (O === L) return true
    L = L.__proto__;
  }
}
```



## constructoer原理

## Object.prototype.toString()原理

