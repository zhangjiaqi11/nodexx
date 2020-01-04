$(function(){
    $('.submit').click(function(){
        if($('.bu').text()=='请选择所属部门'||$('#name').val()==''||$('#account').val()==''){
            alert('上面三个都要填!');
            return;
        }
        let departmentd=$('.bu').text();
        let name=$('#name').val();
        let account=$('#account').val();
        $.ajax({
            url:'http://localhost:3000/api',
            data:{departmentd,name,account},
            dataType:'json',
            success:function(res){
                $('.bu').text('请选择所属部门');
                $('#name').val('');
                $('#account').val('');
               if(res.status==1){
                showMessage('提交成功','success',1000);
               }
            }
        })
    })
    function showMessage(message,type,time) {
        let str = ''
        switch (type) {
            case 'success':
                str = '<div class="success-message" style="width: 300px;height: 50px;text-align: center;background-color:#daf5eb;;color: rgba(59,128,58,0.7);position: fixed;left: 50%;top: 20%;transform:translate(-50%,-50%);line-height: 40px;border-radius: 5px;z-index: 9999">\n' +
                    '    <span class="mes-text">'+message+'</span></div>'
                break;
            case 'error':
                str = '<div class="error-message" style="width: 300px;height: 50px;text-align: center;background-color: #f5f0e5;color: rgba(238,99,99,0.8);position: fixed;left: 50%;top: 20%;transform:translate(-50%,-50%);line-height: 40px;border-radius: 5px;;z-index: 9999">\n' +
                    '    <span class="mes-text">'+message+'</span></div>'
        }
        $('body').append(str)
        setTimeout(function () {
            $('.'+type+'-message').remove()
        },time)
    }
})