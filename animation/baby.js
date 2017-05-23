(function (g) {
    var document = g.document;
    function Baby(options) {
       extend(this ,babySetting, options);
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = '1px solid #000';
        this.image = new Image();
        this.image.src = this.imgSrc;
        this.init();
    };
    Baby.prototype = {
        constructor : Baby,
        updata: function () {
            this.frame = ++this.frame % 4;
            switch (this.direction) {
                case 0:
                    this.y += this.step;
                    if(this.y >= this.canvasHeight) {
                        this.y = -this.babyHeight - 10;
                    }
                    break;
                case 1:
                    this.x -= this.step;
                    if(this.x <= -this.babyWidth) {
                        this.x = this.canvasWidth + 10;
                    }
                    break;
                case 2:
                    this.x += this.step;
                    if(this.x >= this.canvasWidth) {
                        this.x = -this.babyWidth - 10;
                    }
                    break;
                case 3:
                    this.y -= this.step;
                    if(this.y <= -this.babyHeight) {
                        this.y = this.canvasHeight + 10;
                    }
                    break;
            }
        },
        draw: function () {
            var context = this.context,
                self = this;
                context.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
                context.drawImage( self.image, self.frame * self.babyWidth, self.babyHeight * self.direction,self.babyWidth ,self.babyHeight, self.x, self.y,self.babyWidth, self.babyHeight );
        },
        start: function () {
            var self = this;
            this.isWalking = true;
            this.timer = g.setInterval(function () {
                self.updata();
                self.draw();
            }, 120)
        },
        stop: function () {
            this.isWalking = false;
            g.clearInterval(this.timer);
        },
        bind: function () {
            var self = this;
            g.document.addEventListener( 'keydown',function (e) {
                var time = new Date();
                self.time = time.getTime();
                var keyCode = e.keyCode;
                if( keyCode == 32) {
                    if(self.isWalking) {
                        self.stop();
                    }else {
                        self.start();
                    }
                }
                if(!self.isWalking) {
                    return;
                }
                switch (keyCode) {
                   case 38:
                   case 87:
                        self.direction = 3;// up
                        break;
                   case 39:
                   case 68:
                        self.direction = 2//right
                        break;
                   case 40:  //down
                   case 83:
                        self.direction = 0;
                        break;
                   case 37:
                   case 65:
                        self.direction = 1;//left
                        break;
                }
            })
        },
        init: function () {
            var self = this;
            var context = this.context;
            this.image.addEventListener('load', function () {
                context.drawImage( self.image, self.frame * self.babyWidth, self.babyHeight * self.direction,self.babyWidth ,self.babyHeight, self.x, self.y,self.babyWidth, self.babyHeight );
            })
            document.querySelector(this.target).appendChild(this.canvas);
            this.bind();
        }
    }
    function baby(options) {
        try {
         if(!(options || options.target)) {
             throw new Error('参数异常');
         }
        }catch(err) {
            console.log(err);
            return null;
        }
        return new Baby(options);
    }


    var babySetting = {
        babyWidth: 40,
        babyHeight: 65,
        canvasWidth: 600,
        canvasHeight: 400,
        frame: 0,
        direction: 0,
        isWalking: false,
        x : 0,
        y: 0,
        timer: null,
        step: 2,
        imgSrc: 'NPC1.png',
        time: null

    }
    function extend(target) {
        if(!target) {
            return;
        }
        var i = 1,
            args = arguments,
            l = args.length,
            k,
            obj;
        for(; i < l; i++) {
            obj = args[i];
            if(obj.hasOwnProperty) {
                for( k in obj) {
                    target[k] = obj[k];
                }
            }
        }
        return target;
    }


    g.baby = baby;
})(window);

var obj = baby({
    target: '#baby'
})
