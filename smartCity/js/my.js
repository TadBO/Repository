
/**
 * Created by Tuber on 2017/8/9.
 */
//更改用户信息部分
$(function () {
    var src = getUserInfo().Avatar;
    var src = '';
    if(src != '') {
        //如果不为空就显示照片
        $('.touxiang img').attr('src', src);
    }
    //点击跟换图片
});
