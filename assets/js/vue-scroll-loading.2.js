/**
 * +----------------------------------------------------------------------
 * | vue版滚动加载
 * +----------------------------------------------------------------------
 * | Author: 470211273@qq.com
 * +----------------------------------------------------------------------
 */
/**
 * ps
 * 1、该插件第一次加载的时候会直接执行一次loadmore，因此total_page一定要写个大于2的数字
 */
new Vue({
    el: '#app',
    data: {
        page: 1,
        scroll: null,
        loadingText: "加载中...",
        busy: false,
        loadMoreHide: false,
        total_page: 2,
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
                vm.total_page = res.data.data.page.page_total
            }).catch(function (res) {
                console.log(res);
            });
        },
        loadMore: function () {
            var vm = this
            vm.busy = true
            vm.page++
            if(vm.page > vm.total_page) {
                vm.loadingText = "到底了~"
                return
            }
            setTimeout(() => {
                vm.getStuList()
                vm.busy = false
            }, 1000)
        }
    }
});
