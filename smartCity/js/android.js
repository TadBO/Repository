/**
 * Created by Administrator on 2017/7/19.
 */
//打开相册的方法
function openAblum() {
    android.openAlbum();
}
//为input控件传入图片

function PreviewImage(imgFile) {
    alert(imgFile.value)
}

function showToasts(str) {
    android.showToast(str)
}

//获取UUID的方法
function queryUUID() {
    android.requestUUID();

}


//获取GPS信息方法
function queryGsyInfomation() {

    return android.requestGpsInfomation();
}

function capturePlate(){
    android.capturePlate();
}

//添加图片
function renderImg(path) {
    var li = document.createElement('li'),
        img = document.createElement('img');
    img.src = path;
    li.appendChild(img);
    li.setAttribute('class', 'weui-uploader__file');
    document.getElementById('uploaderFiles').appendChild(li);
    myScroll.refresh();
}

//获取base64
function getBase64() {
    return android.getImageBase64();
}

//获取用户信息
function getUserInfo() {
    return android.getLoginMessage();
}


//清除图片结合缓存
function clearImageArry() {
    android.clearArray();
}



//点击图像更换
function changeImg(b) {
    var img = document.getElementById('person_pic');
    img.src = b;
    b = b.replace(/\+/g, "%2B");
    b = b.replace(/\&/g, "%26");
    //图片预览后向服务器发送请求，保存图片
    getUrl(function (url) {
        url += '/snow6/mobile/personalaction?method=PersonalSaveReq&token=' + token;
        getCgData(url, {
            AVATAR: b
        }, function (rep) {
            if(rep.success == 'true') {
                alert('修改成功');
            }
        });
    });
}

