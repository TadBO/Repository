/**
 * Created by Tuber on 2017/4/24.
 */


var itcast = {   //命名空间，避免变量和命名全局污染
    tap : function (obj, callback) {
        if(typeof obj == "object") {
            var startTime = 0;
            var isMove = false;
            obj.addEventListener("touchstart", function () {
                startTime = Date.now();
            });
            obj.addEventListener("touchmove", function () {
                isMove = true;
            });
            obj.addEventListener("touchend", function (e) {
                if(Date.now() - startTime < 150 && !isMove) {
                    callback && callback(e);
                }
                startTime = 0;
                isMove = false;
            });
        }
    }
}