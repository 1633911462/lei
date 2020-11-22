// 操作: 右击立旗帜,左击打开方格

//                逻辑: 1、先生成10个随机雷,然后在点击的时候计算八个方位的雷的数量,得到你的数字

//                         2、如果点击到0的位置应该扩散开来,直到有边界为止

//                         3、如果将全部雷排除,或者点击到雷,将结束游戏
//              oncontextmenu鼠标右击事件
//              function(e) {
//              e.preventDefault();是阻止默认事件，后面就可以开始写上自己想执行的代码了
var map=document.getElementById('map');
var num=document.getElementById('num');
var btn1=document.getElementById('init');


var key=true;

//生成随机雷
function Lei(n){
    for(var i=0;i<n;i++){
            this.x=Math.floor(Math.random()*n+1);
            this.y=Math.floor(Math.random()*n+1);
            //当前的位置=（y-1）*列总数+x-1
            this.index=(this.y-1)*n+this.x-1;
            if(map.children[this.index].lei!==true){
                map.children[this.index].lei=true;
            }
            else{
                i--;
                continue;
            }
            
            console.log(i+":"+this.x,this.y,this.index)
    }
}


function number(n){
    
    // console.log(n);
    if(map.children[n].open){
       return;
    }
    var leiNum=0;
    // console.log(n);
        if(map.children[n+1]&&map.children[n+1].lei==true)
        {
            leiNum++;
        }
        if(map.children[n-1]&&map.children[n-1].lei==true)
        {
            leiNum++;
        }
        if(map.children[n-11]&&map.children[n-11].lei==true)
        {
            leiNum++;
        }
        if(map.children[n-10]&&map.children[n-10].lei==true)
        {
            leiNum++;
        }
        if(map.children[n-9]&&map.children[n-9].lei==true)
        {
            leiNum++;
        }
        if(map.children[n+11]&&map.children[n+11].lei==true)
        {
            leiNum++;
        }
        if(map.children[n+10]&&map.children[n+10].lei==true)
        {
            leiNum++;
        }
        if(map.children[n+9]&&map.children[n+9].lei==true)
        {
            leiNum++;
        }
    map.children[n].style.color="#fff";
    map.children[n].style.fontSize="20px";
    map.children[n].innerHTML=leiNum;
    map.children[n].open=true;
    if(leiNum==0){
        number(n+1);
        number(n-1);
        number(n+11);
        number(n+10);
        number(n+9);
        number(n-10);
        number(n-11);
        number(n-9);
    }
}





function init(n){
    if(key){
        num.innerHTML=n;
        //生成地图
        map.zha=0;
        map.style.width=n*50+'px';
        map.style.height=n*50+'px';
        for(var i=1;i<=n;i++){
            for(var j=1;j<=n;j++){
                var ge=document.createElement('div');
                ge.className="ge";
                map.appendChild(ge);
                ge.x=j;
                ge.y=i;
                ge.index=(ge.y-1)*n+ge.x-1;
            }
        }
        
        for(var i=0;i<(n*n);i++){
            //右击插入旗杆
            map.children[i].oncontextmenu=function(e){
                e.preventDefault();
                if(this.classList[1]!=="qi" && num.innerHTML>0){
                    this.classList.add("qi");
                    num.innerHTML--;
                    // if(num.innerHTML<)
                    if(this.lei){
                        map.zha++;
                        if(map.zha==10){
                            alert('通关了！');
                            setTimeout(function(){
                                window.location.reload(true)
                            },1000);
                        }
                    }
                }
                else if(this.classList[1]=="qi"){
                    this.classList.remove("qi");
                    num.innerHTML++;
                }
            }

            //左击打开方格
            map.children[i].onclick=function(){

                if(this.className.match("qi")==null){
                //判断雷否
                    if(this.lei){
                        this.classList.add("lei");
                        
                        setTimeout(function(){
                            alert('踩雷了，游戏结束!');
                            window.location.reload(true);
                        },1000);
                    }
                //给定数字
                    else{
                        // console.log(this.index)
                        number(this.index);
                    }
                }

               



            }
            
        }
        
         lei=new Lei(n);
         
    }
    key=false;
}

btn1.onclick=function(){
    init(10)
}
