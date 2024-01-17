import mysql from "mysql2";
/*
사용하는 MySQL의 database, user, password를 입력한 후
이 파일(mysql_sample.js)를 mysql.js로 이름 변경한 후 프로젝트를 실행하시오
 */

const mysql_info = {
  host: "localhost",
  port: "3336",
  user: "****",
  password: "*****",
  database: "*****",
};

const dbCreat = {
  init: () => {
    console.log("MySQL DBMS Connection!!!");
    return mysql.createConnection(mysql_info);
  },
};

export default dbCreate;
