var width = 500;
var height = 400;
var canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");


var a = 1;
var dadt = 0;
var l = 300;
var g = 3000;

var step = function(dt){
    dadt += -dt*g/l*a;
    a += dt*dadt;
    dadt += -0.1*(dadt**3)*dt;
};



var render = function(){
    ctx.clearRect(0,0,width,height);
    ctx.beginPath();
    ctx.moveTo(width/2,0);
    ctx.lineTo(width/2+l*Math.sin(a),0+l*Math.cos(a));
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(width/2+l*Math.sin(a),0+l*Math.cos(a),10,0,6.28);
    ctx.closePath();
    ctx.fill();
    
    ctx.font = "30px Serif";
    ctx.fillStyle = "#000";
    ctx.fillText("π="+pi,10,30);
}

var N = 0;
var pi = 4;
var peaka = 1;

var start = 0;
var animate = function(t){
    t /= 1000;
    if(start === 0)start = t;
    var dt = t-start;
    start = t;
    
    var a0 = a;
    var dadt0 = dadt;
    step(dt);
    render();
    
    if(t > 0.1){
        t -= 0.1;
        if(dadt*dadt0 < 0){
            N++;
            peaka = a;
        }
        if(a*a0 < 0){
            var period = t/N;
            pi = -(dadt*period)/peaka;
            console.log(pi);
        }
    }
    
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);