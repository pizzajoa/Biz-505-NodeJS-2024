/*
express 프레임워크를 사용하여
router 객체 생성
*/

import express from "express";
/*
mysql.js 에서 선언하고 export 한 dbCreate를 import DB라는 이름으로 사용하겟다
*/
import DB from "../config/mysql.js";
const router = express.Router();
// dbCreate 에서 선언된 init() 함수를 호출하여 return 된 정보를 dbConn 변수(객체)에 저장하라
const dbConn = DB.init();

// localhost:3000/student/
router.get("/", async (req, res) => {
  // 문자열을 아무런 가공, 디자인 없이 그대로 cliuent에서 응답하기
  //    res.send("누군가 나를 호출(req)했네");
  const sql = "SELECT * FROM tbl_student";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      //   return res.json(result);
      return res.render("student/list", { stList: result });
    }
  });
});

router.get("/insert", (req, res) => {
  res.render("student/input.pug");
});

export default router;
