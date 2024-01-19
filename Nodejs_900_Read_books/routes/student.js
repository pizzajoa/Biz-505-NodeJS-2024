/**
 * express 프레임워크를 사용하여
 * router 객체 생성
 */
import express from "express";
/**
 * mysql.js 에서 선언하고 export 한 dbCreate 를
 * import DB 라는 이름으로 사용하겠다
 */
import DB from "../config/mysql.js";
const router = express.Router();
// dbCreate 에서 선언된 init() 함수를 호출하여
// return 된 정보를 dbConn 변수(객체)에 저장하라
const dbConn = DB.init();

// localhost:3000/student/
router.get("/", (req, res) => {
  // 문자열을 아무런 가공, 디자인 없이 그대로 client 에서 응답하기
  // res.send("누군가 나를 호출(req) 했네");
  const sql = "SELECT * FROM tbl_books";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // return res.json(result);
      return res.render("student/list", { stList: result });
    }
  });
});

// localhost:3000/student/insert
// GET: localhost:3000/student/insert
router.get("/insert", (req, res) => {
  res.render("student/input.pug");
});

// POST: localhost:3000/student/insert
router.post("/insert", (req, res) => {
  // form 을 통해 전달된(전송된) 데이터를 (임시)변수에 저장해 두기
  const isbn = req.body.isbn;
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const price = req.body.price;
  const discount = req.body.discount;

  // DB에 insert 하기 위해 배열type 으로 변환
  // const params = [req.body.st_num, req.body.st_name, req.body.st_dept]
  const params = [isbn, title, author, publisher, price, discount];
  const sql =
    " INSERT INTO tbl_books(isbn, title, author, publisher, price, discount) " +
    " VALUES( ?,?,?,?,?,? )";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // INSERT(추가)가 성공한 경우 List 를 보여주는 화면으로
      // 화면 전환하라
      return res.redirect("/student/");
    }
  });
});

// GET: localhost:3000/student/이몽룡/detail
// GET: localhost:3000/student/홍길동/detail
// GET: localhost:3000/student/학번/detail 요청을 하면
// 주소 중간에 끼워넣어진 학번을 st_num 변수를 통하여 받아라
router.get("/:isbn/detail", (req, res) => {
  // 주소에 포함되어 전달된 값을 변수에 저장학
  const isbn = req.params.isbn;
  console.log(isbn);
  const params = [isbn];
  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // return res.json(result);
      return res.render("student/detail", { STD: result[0] });
    }
  });
});

router.get("/:isbn/check", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " SELECT isbn FROM tbl_books WHERE isbn = ? ";
  dbConn.query(sql, [st_num], (err, result) => {
    if (err) {
      return res.json({ result: "ERROR", message: err });
    } else {
      if (result.length > 0) {
        return res.json({ result: "있다", STD: result[0] });
      } else {
        return res.json({ result: "없다", STD: null });
      }
    }
  });
});

router.get("/:isbn/delete", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " DELETE FROM tbl_books WHERE isbn = ? ";
  dbConn.query(sql, [isbn], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect("/student/");
    }
  });
});

// localhost:3000/student/학번/update
// form tag 의 action 이 자동으로 URL 이 설정된다
router.get("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";
  dbConn.query(sql, [st_num], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("student/input", { STD: result[0] });
    }
  });
});

router.post("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const price = req.body.price;
  const discount = req.body.discount;

  const params = [isbn, title, author, publisher, price, discount];
  const sql =
    " UPDATE tbl_books " +
    " SET title = ?, " +
    "   author = ?, " +
    "   publisher= ?, " +
    "   price = ?, " +
    "   discount = ? " +
    " WHERE isbn = ? ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect(`/student/${isbn}/detail`);
    }
  });
});

// router 객체를 다른곳에서 import 할수 있도록 export 하기
export default router;
