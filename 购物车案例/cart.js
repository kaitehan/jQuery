$(function () {
    // 1.全选 全不选功能模块
    // 就是把 全选按钮 的状态赋值给 三个小按钮 就可以了
    // 事件可以使用change
    $('.checkall').change(function () {
        // console.log($(this).prop('checked'))
        $('.j_checkbox,.checkall').prop('checked', $(this).prop('checked'));
        if($(this).prop('checked')){
            $('.cart_item').addClass('checked_bg');
        }else{
            $('.cart_item').removeClass('checked_bg');
        }
    });
    // 2.如果 小复选框被选中的个数 等于 复选框总个数 就应该把全选按钮选上，否则全选按钮不选
    $('.j_checkbox').change(function () {

        // $('.j_checkbox:checked').length 复选框选中的个数
        // $('.j_checkbox').length 复选框的总个数
        // $(this).parents('.cart_item').addClass('checked_bg')
        
        if ($('.j_checkbox:checked').length === $('.j_checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        if($(this).prop('checked')){
            $(this).parents('.cart_item').addClass('checked_bg');
        }else{
            $(this).parents('.cart_item').removeClass('checked_bg');
        }
        // 商品数量累计、总价
        getSum();

    });
    // 数量增加
    $('.plus').click(function () {

        var n = $(this).siblings('.num').val();
        // console.log(n);
        n++;
        $(this).siblings('.num').val(n);
        // 价格小计
        // var p = $(this).parent().parent().siblings('.p_price').html();
        var p = $(this).parents('.p_num').siblings('.p_price').html();
        // 截取字符串
        p = p.substr(1);
        $(this).parents('.p_num').siblings('.p_sum').html('￥' + (p * n).toFixed(2));
        // 商品数量累计、总价
        getSum();

    });
    // 数量减少
    $('.decrease').click(function () {
        var n = $(this).siblings('.num').val();
        // console.log(n);
        if (n <= 1) {
            return
        }
        n--;
        $(this).siblings('.num').val(n);
        // 价格小计
        // var p = $(this).parent().parent().siblings('.p_price').html();
        var p = $(this).parents('.p_num').siblings('.p_price').html();
        // 截取字符串
        p = p.substr(1);
        // toFixed(2)  保留两位小数
        $(this).parents('.p_num').siblings('.p_sum').html('￥' + (p * n).toFixed(2));
        // 商品数量累计、总价
        getSum();
    });
    // 4.用户修改文本框里的值 计算 小计模块
    $('.num').change(function () {
        // 先得到输入框的值， 乘以 当前商品的单价
        var p = $(this).parents('.p_num').siblings('.p_price').html().substr(1);
        var num = $(this).val();
        $(this).parents('.p_num').siblings('.p_sum').html('￥' + (num * p).toFixed(2));
        // 商品数量累计、总价
        getSum();
    });
    // 删除当前元素
    $('.p_del').click(function () {
        $(this).parent().remove();
        // 商品数量累计、总价
        getSum();
    });
    // 删除选中元素
    $('.del_selected').click(function () {
        // 1.利用遍历元素方法删除选中元素
        // $('.cart_item').each(function (index, ele) {
        //     // 1.查找元素是否被选中
        //     if ($(ele).find('.j_checkbox').prop('checked')) {
        //         // 删除选中元素
        //         $(this).remove();
        //         // 商品数量累计、总价
        //         getSum();
        //     }

        // })
        // 2.利用选择器删除选中元素
        // 取消全选按钮
        $('.checkall').prop('checked',false);
        $('.j_checkbox:checked').parents('.cart_item').remove();
        // 商品数量累计、总价
        getSum();

    });
    // 清空购物车
    $('.del_all').click(function(){
        // 取消全选按钮
        $('.checkall').prop('checked',false);
        // 删除购物车所有元素
        $('.cart_list').empty();
        // 商品数量累计、总价
        getSum();
    })

    // 封装计算商品总件数以及总价的函数
    function getSum() {
        // 商品数量累计
        var count = 0;
        $('.num').each(function (i, ele) {
            if ($(ele).parents('.p_num').siblings('.p_checkbox').children('.j_checkbox').prop('checked')) {
                count += parseInt($(ele).val());
            }
        });
        $('.t_num').html(count);
        // 商品总价累计
        var sum = 0;
        $('.p_sum').each(function (i, ele) {
            if ($(ele).siblings('.p_checkbox').children('.j_checkbox').prop('checked')) {
                sum += parseFloat($(ele).html().substr(1));
            }
        });
        $('.t_price').html(sum.toFixed(2));
    };
})