//面向对象的思想编程：根据需求，抽象出相关对象，总结对象的特征和行为，把特征变成属性，行为变成方法，然后定义(js)构造函数，实例化对象，通过对象调用相应的属性和方法，完成相应需求的编程思想
//-----------食物对象-----------------------
(function (window) {
    var elements = [];

    //分析：食物对象有宽、高、颜色、横纵坐标，先定义构造函数，再创建
    function Food(x, y, width, height, color) {
        //横纵坐标
        this.x = x || 0;
        this.y = y || 0;
        //宽和高
        this.width = width || 20;
        this.height = height || 20;
        //背景色
        this.color = color || "green";
    }

    //为原型添加初始化方法
    Food.prototype.init = function (map) {
        //初始化之前先删除之前食物，保证地图上只有一个食物，之前的都被删除了
        remove();

        // 创建食物DIV
        var div = document.createElement("div");
        //将div加入到地图
        map.appendChild(div);
        //设置样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.borderRadius = "10px";
        div.style.backgroundColor = this.color;
        //先脱离文档流
        div.style.position = "absolute";
        //随机横纵坐标
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;

        div.style.left = this.x + "px";
        div.style.top = this.y + "px";

        //把食物加入到数组中elements保存起来，方便后面找到他删除
        elements.push(div);
    }

    //私有函数，删除食物，外部无法访问
    function remove() {
        //elements
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到这个子元素的父级元素，然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //再次把elements中的这个元素也删除
            elements.splice(i, 1);
        }
    }

    //把Food暴露给window，外部就可以使用
    window.Food = Food;
}(window));//分号必须要加

//-----------蛇对象-------------------------
(function () {
    var elements = [];

    //蛇的构造函数
    function Snake(width, height, direction) {
        //小蛇每个部分的宽高
        this.width = width || 20;
        this.height = height || 20;
        //蛇的身体
        this.body = [
            {x: 3, y: 2, color: "red"},//头
            {x: 2, y: 2, color: "orange"},//身体
            {x: 1, y: 2, color: "orange"},//身体
        ];
        //蛇的方向
        this.direction = direction || "right";
    }

    //初始化
    Snake.prototype.init = function (map) {
        //小蛇走一步，要先删除之前的小蛇，再画一个新的小蛇
        remove();
        //循环遍历
        for (var i = 0; i < this.body.length; i++) {
            var obj = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            //设置样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";

            //横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            //背景色
            div.style.backgroundColor = obj.color;
            //方向暂时不定

            //加入elements数组
            elements.push(div);
        }
    };
    var count=0;
    //小蛇移动
    Snake.prototype.move = function (food, map) {
        //改变小蛇身体的坐标
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向，改变小蛇头的坐标
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        //判断有没有吃到食物
        //蛇头的横纵坐标
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        //判断食物横纵坐标和蛇头横纵坐标

        var score = document.querySelector(".nav p");
        if (headX == food.x && headY == food.y) {
            count++;
            //获取小蛇最后的尾巴
            var last = this.body[this.body.length - 1];
            //把小蛇最后一个复制一个，加到身体
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            food.init(map);
        }
        score.innerHTML = `得分：${count}`;
    };

    //删除小蛇
    function remove() {
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            //先从当前子元素中找到该子元素的父级
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    window.Snake = Snake;
}());

//----------游戏对象-------------------------
(function () {
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
    }

    //初始化
    Game.prototype.init = function () {
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food, this.map);
        this.bindKey();
    };

    Game.prototype.pause = function () {
        clearInterval(timer);
    };
    Game.prototype.again = function () {
        this.runSnake(this.food, this.map);
    };
    //小蛇可以自动跑起来
    Game.prototype.runSnake = function (food, map) {
        var timer = setInterval(function () {
            this.snake.move(food, map);
            this.snake.init(map);
            //横坐标的最大值
            var maxX = map.offsetWidth / this.snake.width;
            //纵坐标的最大值
            var maxY = map.offsetHeight / this.snake.height;
            //获取蛇头坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            //横坐标
            if (headX < 0 || headX >= maxX) {
                clearInterval(timer);
                //alert("游戏失败了");
                gameFail();
            }
            //纵坐标
            if (headY < 0 || headY >= maxY) {
                clearInterval(timer);
                gameFail();
                //alert("游戏失败了");

            }

        }.bind(this), 150);
        window.timer = timer;
    };

    //游戏失败弹窗
    function gameFail() {

        var dv = document.querySelector(".dv");
        var mask = document.querySelector(".mask");
        var score = document.querySelector(".info p:last-child");
        dv.style.display = "block";
        mask.style.display = "block";
        var count = document.querySelector(".nav p").innerHTML;
        score.innerHTML = `${count}`;
    }

    //设置小蛇移动方向
    Game.prototype.bindKey = function () {
        //获取按键
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(this));
    };

    window.Game = Game;
}());




