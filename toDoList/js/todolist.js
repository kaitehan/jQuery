$(function () {
    // alert(111);
    // var todolist = [{
    //     title:'111',
    //     done:true
    // },{
    //     title:'222',
    //     done:false
    // }];
    // localStorage.setItem('todo',todolist);
    // 1.本地存储里面只能存储字符串的数据格式 把我们数据转换为字符串格式 JSON.stringify()
    // localStorage.setItem('todo',JSON.stringify(todolist));
    // var data = localStorage.getItem('todo');
    // console.log(typeof data);
    // 2.获取本地存储的字符串数据 我们需要把里面的字符串数据转换为 对象格式 JSON.parse()
    // data = JSON.parse(data);
    // console.log(data[0].title);

    // 渲染界面
    load();

    // 1.新增todo事项
    $('#title').on('keydown', function (event) {
        // 当按下回车键并且输入框内容不为空时处理事件
        if (event.which === 13&& $(this).val()) {
            var data = getData();
            data.push({
                title: $(this).val(),
                done: false
            });
            savaData(data);
            load();
            // 数据存储后清空数据框
            $(this).val('');
        }
    });

    // 2.读取本地存储数据
    function getData() {
        var data = localStorage.getItem('todo');
        if (data !== null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    };

    // 3.删除操作
    $('ol,ul').on('click','a',function(){
        // 先获取本地存储
        var data = getData();
        // 修改数据
        var index = $(this).attr('id');
        // splice(从哪个位置开始，删除几个元素)
        data.splice(index,1);
        // 保存到本地存储，更新数据
        savaData(data);
        // 渲染界面
        load();
    });
    
    // 4. toDolist 正在进行和已完成操作
    $('ol,ul').on('click','input',function(){
        // 先从本地获取数据
        var data = getData();
        // 修改数据
        var index = $(this).siblings('a').attr('id');
        data[index].done=$(this).prop('checked');
        // 保存到本地存储
        savaData(data);
        // 渲染页面
        load();
    });

    // 5.保存本地存储数据
    function savaData(data) {
        localStorage.setItem('todo', JSON.stringify(data));
    };

    // 6.将本地数据渲染到页面中
    function load(){
        // 读取本地数据
        var data = getData();
        // 进行中计数
        var todoCount = 0;
        // 已完成计数
        var doneCount = 0;
        $('ol,ul').empty();
        // 遍历数组
        $.each(data,function(i,ele){
            if(ele.done == false){
                // 进行中计数增加 1
                todoCount++;
                // 添加进行中事项
                $('ol').prepend('<li><input type="checkbox"></input><P>'+ele.title+'</P><a href="javascript:;" id='+i+'>删除</a></li>');
            }else{
                // 已完成计数增加 1
                doneCount++;
                // 添加已完成事项
                $('ul').prepend('<li><input type="checkbox" checked="true"></input><P>'+ele.title+'</P><a href="javascript:;" id='+i+'>删除</a></li>');
            }
        })
        // 显示进行中事项数量
        $('#todocount').text(todoCount);
        // 显示已完成事项数量
        $('#donecount').text(doneCount);
    };
})