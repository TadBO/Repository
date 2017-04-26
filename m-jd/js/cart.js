/**
 * Created by Tuber on 2017/4/23.
 */
window.onload = function () {
    //1.获取操作元素
    var delBoxs = document.querySelectorAll(".del");
    var winBox = document.querySelector(".winbox");
    var removeBox = document.querySelector(".removebox");
    var cancleBtn = document.querySelector(".cancle");

    console.log(123);
    //2注册事件
    for(var i = 0; i < delBoxs.length; i++) {
         delBoxs[i].onclick = function () {
             this.classList.add("open");
             removeBox.classList.add("animated");
             removeBox.classList.add("bounceInDown");
             winBox.style.display = "block";
         }
    }

    cancleBtn.onclick = function () {
        var open = document.querySelector(".open");
        open.classList.remove("open");
        removeBox.classList.remove("animated");
        removeBox.classList.remove("bounceInDown");
        winBox.style.display = "none";
    }
};