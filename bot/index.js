const { ws, http } = require("./bot");
const sql = require("./service/sql");

ws.listen(async (data) => {
  if (!("message" in data)) {
    return;
  }
  if (data.message.includes("快来我的小虎市集出售吧")) {
    let text = data.message;
    let start = "【我的小虎糕今天";
    let ti = "【王者荣耀】"
    let end = "块】复制链接前往活动";
    let s = text.indexOf(start);
    let e = text.indexOf(end);
    let t = text.indexOf(ti)
    // link["id","group_id","link","price","state"]
    let link = [
      data.sender.user_id,
      data.group_id,
      text.substring(t + ti.length, s),
      text.substring(s + start.length, e),
      "有效",
    ];
    sql.insert(link);
    console.log(link);
  }
});
