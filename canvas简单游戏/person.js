(function (g) {
    var document = g.document;
    function Person(options) {
        extend(this, personSetting, options);
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.context = this.canvas.getContext('2d');
        this.image = new Image();
        this.init();
    }
    Person.prototype = {
        constructor: Person,
        updata: function () {
            this.frame = ++this.frame % 4;
            switch (this.direction) {
               case 0 :
                    this.y += this.step;
                   if(this.y >= this.canvasHeight) {
                       this.y = -this.personHeight - 10;
                   }
                    break;
                case 1 :
                    this.x -= this.step;
                    if(this.x <= -this.personWidth) {
                        this.x = this.canvasWidth + 10;
                    }
                    break;
                case 2 :
                    this.x += this.step;
                    if(this.x >= this.canvasWidth) {
                        this.x = -this.personWidth - 10;
                    }
                    break;
                case 3 :
                    this.y -= this.step;
                    if(this.y <= -this.personHeight) {
                        this.y = this.canvasHeight + 10;
                    }
                    break;
            }
        },
        draw: function () {
            this.updata();
            var context = this.context
                self = this;
            this.image.addEventListener('load', function () {
                context.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
                context.beginPath();
                context.drawImage( self.image, self.personWidth * self.frame, self.direction * self.personHeight, self.personWidth, self.personHeight, self.x, self.y, self.personWidth, self.personHeight );
            });
            this.image.src = this.imageSrc;
        },
        bind: function () {
            var self = this;
            var time = [0];
            var key = [40];
            g.addEventListener('keydown', function (e) {
                var keyCode = e.keyCode;
                if(keyCode == 32) {
                    if(self.isWalking) {
                        self.stop();
                    }else {
                        self.start();
                    }
                }
                if(!self.isWalking) {
                    return;
                }
                switch(keyCode) {
                    case 38:
                    case 87:     //up
                        self.direction = 3;
                        time.push(e.timeStamp);
                        key.push(keyCode);
                        break;
                    case 39:
                    case 68:     //right
                        self.direction = 2;
                        time.push(e.timeStamp);
                        key.push(keyCode);
                        break;
                    case 40:
                    case 83:     //down
                        self.direction = 0;
                        time.push(e.timeStamp);
                        key.push(keyCode);
                        break;
                    case 37:
                    case 65:     //left
                        self.direction = 1;
                        time.push(e.timeStamp);
                        key.push(keyCode);
                        break;
                }
                if( key[key.length - 1] == key[key.length - 2] && time[time.length - 1] - time[time.length - 2] < 1000 ) {
                    self.step = 10;
                } else {
                    self.step = 1;
                }

            });
        },
        start: function () {
            var self = this;
            this.isWalking = true;
            this.timer = g.setInterval(function () {
                self.draw();
            }, self.speed)
        },
        stop: function () {
            this.isWalking = false;
            g.clearInterval(this.timer);
        },
        init: function () {
            var self = this,
                context = this.context;
            this.canvas.style.border = '1px solid #000';
            document.querySelector(this.target).appendChild(this.canvas);
            this.image.addEventListener('load', function () {
                context.beginPath();
                context.drawImage(self.image, self.personWidth * self.frame, self.direction * self.personHeight, self.personWidth, self.personHeight, self.x, self.y, self.personWidth, self.personHeight);
            })
            this.image.src = this.imageSrc;
            this.bind();
        }
    }
    function person(options) {
        try{
            if(!(options || options.target)) {
                throw new Error('参数异常');
            }
        }catch(err) {
            console.log(err);
            return null;
        }
        new Person(options);
    }

    function extend(target) {
        if(!target) {
            return;
        }
        var args = arguments,
            i = 1,
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
    var personSetting = {
        canvasWidth: 600,
        canvasHeight: 400,
        personWidth: 40,
        personHeight: 65,
        x: 0,
        y: 0,
        step: 1,
        frame: 0,
        direction: 0,
        isWalking: false,
        timer: null,
        speed: 120
    }
   g.person = person;
})(window)
person({
   target: '#target',
   imageSrc: 'NPC1.png'
});
