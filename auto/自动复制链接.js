// 当前获取到的信息序号
var currentIndex = -1;
// 获取数据
let r = http.get("http://wz.152527.xyz/kk/data.php?do=get");
var data = r.body.json();

var window = floaty.window(
    <vertical bg="#a5000000">
      <vertical margin="10">
        <text id="mark" text="无效" textColor="#ffffff" padding="20 10" bg="#ff0000"/>
        <text id="skip" text="有效" textColor="#ffffff" padding="20 10" bg="#00ff00" marginTop="3"/>
        <text id="text" textColor="#f44336" marginTop="3"/>
      </vertical>
    </vertical>
);
setInterval(() => {}, 1000);
window.mark.on('click',()=>{
  markIt();
})
window.skip.on('click',()=>{
  skipIt();
})
function setMsg(mm){
  ui.run(function(){
    let uid = data[currentIndex].uid;
    let price = data[currentIndex].price;
    let link = data[currentIndex].link;
    let msg = 'index:'+currentIndex+'\nuid:'+uid+"\n"+"price:"+price+"\nlink:"+link+"\n"+mm;
    window.text.setText(msg);
  });
}
function getLink (){
  if(home()){
    setClip(data[currentIndex].link);
    setTimeout(()=>{
      launch("com.tencent.tmgp.sgame");
    }, 1000);
  };
}
function markIt(){
  setMsg('');
  let uid = data[currentIndex].uid;
  let res = http.get("http://wz.152527.xyz/kk/data.php?do=update&id="+uid);
  currentIndex++;
  setMsg(res.body.string());
  getLink();
}
function skipIt(){
  toast("index"+currentIndex+"有效")
  currentIndex++;
  getLink();
  setMsg('');
  
}

