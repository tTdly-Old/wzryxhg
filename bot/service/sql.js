module.exports = {
  insert(addSqlParams) {
    let mysql = require("mysql");
    let connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "wzryxhg",
    });

    connection.connect();
    // link["id","group_id","link","price","state"]
    let addSql =
      "INSERT INTO links(id,group_id,link,price,state,date) VALUES(?,?,?,?,?,?)";
    //增
    connection.query(addSql, addSqlParams, function (err, result) {
      if (err) {
        console.log("[INSERT ERROR] - ", err.message);
        return;
      }
    });
    connection.end();
  },
};
