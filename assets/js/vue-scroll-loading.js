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
        loadingText: "加载中...",
        stu_list: []
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
                vm.page++
                vm.$nextTick(() => {
                    if (!vm.scroll) {
                        vm.scroll = new BScroll(vm.$refs.wrapper, {
                            click: true,
                            scrollY: true,
                            pullUpLoad: {
                                // 在上拉到超过底部 20px 时，触发 pullingUp 事件，上拉加载用负值，下拉刷新用正值
                                threshold: -20
                            }
                        })
                        vm.scroll.on('pullingUp', () => {
                            // 下拉动作
                            if(vm.page >= 5) {
                                vm.loadingText = "到底了~"
                                return
                            }
                            vm.getStuList()
                            vm.scroll.finishPullUp()
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
