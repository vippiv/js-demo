/**
 * +----------------------------------------------------------------------
 * | vue版滚动加载
 * +----------------------------------------------------------------------
 * | Author: 470211273@qq.com
 * +----------------------------------------------------------------------
 */
new Vue({
    el: '#app',
    data: {
        page: 1,
        scroll: null,
        stu_list: [
            // {
            //     name: "唐诗咏",
            //     gender: "男",
            //     age: 22
            // },{
            //     name: "宋洁涵",
            //     gender: "女",
            //     age: 21
            // },{
            //     name: "余庆长",
            //     gender: "男",
            //     age: 24
            // },{
            //     name: "冯诗云",
            //     gender: "女",
            //     age: 26
            // },{
            //     name: "宋杰",
            //     gender: "男",
            //     age: 20
            // },{
            //     name: "余彭年",
            //     gender: "男",
            //     age: 21
            // },{
            //     name: "唐明",
            //     gender: "男",
            //     age: 21
            // }
        ]
    },
    created: function () {
        this.getStuList();
    },
    methods: {
        getStuList: function () {
            var vm = this;
            axios.post('http://zwl.com/stu_list', {
                // 'page_current': vm.page
            }).then(function (res) {
                vm.stu_list = vm.stu_list.concat(res.data.data.list);
                vm.$nextTick(() => {
                    if (!vm.scroll) {
                        vm.scroll = new BScroll(vm.$refs.wrapper, {
                            click: true,
                            scrollY: true,
                            pullUpLoad: {
                                threshold: -50 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                            }
                        })
                        vm.scroll.on('finishPullUp', () => {
                            // 下拉动作
                            vm.getStuList()
                            this.scroll.finishPullUp()
                        })
                    } else {
                        vm.scroll.refresh()
                    }
                })
            }).catch(function (res) {
                console.log(res);
            });
        }
    }
});
