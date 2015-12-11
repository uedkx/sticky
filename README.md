# sticky


##简介


[sticky](baidu.com)是一个针对移动端轻量极的原生javascript插件，兼容了AMD、CMD规范。在支持 *postion: sticky;* 情况下使用 *css sticky* 在安卓下不支持时使用 *scroll* 事件模拟 *sticky* 效果。（但因为移动端滚动屏幕时不执行javascript效果并不好）

###作用方法

``` html
<div class="sticky-wrap">
	<div class="js-nav"></div>
	<div class="main"></div>
</div>
```


``` js
var sticky = new Sticky({
    wrap: '.sticky-wrap',
    bar: '.js-nav',
    top: 45
});
```