
    var mX = 0;
    var mY = 0;
    var tmX = 0;
    var tmY = 0;

    var far = 0;
    window.onload = function () {
        //マウス移動時のイベントをBODYタグに登録する
        document.body.addEventListener("mousemove", function (e) {

            //座標を取得する
            //mX = e.pageX;  //X座標
            //mY = e.pageY;  //Y座標
            mX = e.pageX - tmX;
            mY = e.pageY - tmY;
            tmX = e.pageX;  //X座標
            tmY = e.pageY;  //Y座標
        });
        window.onmousewheel = function (event) {
            far += event.wheelDelta / 1200;
        }

    }

    let Screen = screenElm;
    heigth = 60;
    width = 160;
    function test() {
        console.log(Screen);
    }

    function draw() {
        Screen.textContent = "";
        for (let iy = 0; iy < heigth; iy++) {
            for (let ix = 0; ix < width; ix++) {
                Screen.textContent += "A";
            }
            Screen.textContent += "\n";
        }
    }


    var pretag = screenElm;

    var tmr1 = undefined, tmr2 = undefined;
    var A = 1, B = 1;

    var H = 70, W = 260;
    var accuracy = 0.5;

    var uouo = 2;

    var offsetW = 90;
    var offsetH = 20;

    var R2 = 2;

    var texts = ".,-~:;=!*#$@asdfghj2345yujfsdufshfjjh6c47w36nc7";

    var asciiframe = function () {
        var b = [];
        var z = [];
        A += mX / 100;
        B += mY / 100;
        var cA = Math.cos(A), sA = Math.sin(A),
            cB = Math.cos(B), sB = Math.sin(B);
        for (var k = 0; k < W * H; k++) {
            b[k] = k % W == W - 1 ? "\n" : " ";
            z[k] = 0;
        }
        for (var j = 0; j < 6.28; j += 0.07 * accuracy) { // j <=> theta
            var ct = Math.cos(j), st = Math.sin(j);
            for (i = 0; i < 6.28; i += 0.02 * accuracy) {   // i <=> phi
                var sp = Math.sin(i), cp = Math.cos(i),
                    h = ct + R2, // R1 + R2*cos(theta)
                    D = 1 / (sp * h * sA + st * cA + far), // this is 1/z
                    t = sp * h * cA - st * sA; // this is a clever factoring of some of the terms in x' and y'

                var x = 0 | (W / 2 + 30 * uouo * D * (cp * h * cB - t * sB)),
                    y = 0 | (H / 2 + 15 * uouo * D * (cp * h * sB + t * cB)),
                    o = x + W * y,
                    N = 0 | ((texts.length * 2 / 3) * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
                if (y < H && y >= 0 && x >= 0 && x < W - 1 && D > z[o]) {
                    z[o] = D;
                    b[o] = texts[N > 0 ? N : 0];
                }
            }
        }
        pretag.textContent = b.join("");
    };