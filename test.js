import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

// 可汗学院
// immutable.js

// 学习跟做笔记要同步
// 扫录笔
// learn hacks
// 难点卡片：
// 1. 拆卡片
// 2. 语言表达问题-》用自己的语言重新表达
// 3. 不理解 -》 重新学
// 做笔记不要不理解的东西，一定要是自己学过、理解透、等待复习的东西放进来复习
// 学到哪，复习到哪，anki做到哪
// 先小后大、先分后总
// 知乎：如何长时间专注 信息转化率问题  信息单位削小


Object.defineProperty(obj,key,{
    enumerable:true,
    configurable: true,
    get: function reactiveGetter() {
        const value= getter? getter.call(obj): value
        if(Dep.target) {
            dep.depend()
            if(childOb) {
                childOb.dep.depend()
                if(Array.isArray(value)) {
                    dependArray(value)
                }
            }
        }
    },
    set: function reactiveSetter(newVal) {
        const value = getter ? getter.call(obj) : val
        if(newVal === value || (newVal !== newVal && value !== value)) {
            return 
        }
        val = newVal
        childOb = !shallow && observe(newVal)
        dep.notify()
    }
})


/**
 * vue-router声明式跳转的方式
 * 1. <router-link to="detail"></router-link>
 * 2. <router-link :to="{name:'detail', params:{personId: 111}}"></router-link>
 * 3. <router-link :to="{path:'/detail', query:{personId: 111}}"></router-link>
 */

 var threeSum = function(nums) {
    if(!nums || nums.length < 3) return [];
    let result = [], second, last;
    nums.sort((a, b) => a - b);
    for(let i = 0; i < nums.length - 2; i++) {
        if(nums[i] > 0) break;
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        second = i + 1;
        last = nums.length - 1;
        while(second < last) {
            const sum = nums[i] + nums[second] + nums[last];
            if(!sum){
                result.push([nums[i], nums[second], nums[last]]);

                while(second < last && nums[second] === nums[second + 1]) second++;
                while(second < last && nums[last] === nums[last - 1]) last--;

                second++;
                last--;
            }
            else if(sum < 0) second++;
            else if(sum > 0) last--;
        }
    }
    return result;
 }

 var threeSum = function(nums) {
    if(!nums || nums.length < 3) return [];
    let result = [], second, last;
    nums.sort((a, b) => a -b);
    for(let i = 0; i < nums.length - 2; i++) {
        if(nums[i] > 0) break;
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        second = i + 1;
        last = nums.length - 1;
        while(second < last) {
            const sum = nums[i] + nums[second] + nums[last];
            if(!sum) {
                result.push([nums[i], nums[second], nums[last]]);

                while(second < last && nums[second] === nums[second + 1]) second++;
                while(second < last && nums[last] === nums[last - 1]) last--;

                second++;
                last--;
            }
            else if(sum < 0) second++;
            else if(sum > 0) last--;
        }
    }
    return result;
 }

 class Widget {
     constructor(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
     }
     render($where) {
         if(this.$elem) {
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
         }
     }
 }
 class Button extends Widget {
     constructor(width, height, label) {
         super(width, height);
         this.label = label || "Default";
         this.$elem = $("<button>").text(this.label);
     }
     render($where) {
        super($where);
        this.$elem.click(this.onClick.bind(this));
     }
     onClick(evt) {
         console.log(`Button '${this.label}' clicked!`);
     }
 }