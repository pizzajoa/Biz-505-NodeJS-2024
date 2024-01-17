import mysql from "mysql2";
/*
JSON(JavaScript Object Notation) type의 객체 (JSON 데이터)
속성데이터가 '변수명 : 값' 형식으로 구성된다
Key:Value pair type 데이터라고 한다
 */

const mysql_info = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "jjh123",
  database: "schoolDB",
};
const dbCreate = {
  init: () => {
    console.log("MySQL DBMS Connection!!!");
    return mysql.createConnection(mysql_info);
  },
};

export default dbCreate;
