import express from "express";
import DB from "../config/mysql.js";
const router = express.Router();

/**
 * DB 연결을 시도하는 DB.init() 함수는 asyne 키워드가 부착되었다
 * 이 함수는 동기방식으로 실행되는데
 * 일반적인 변수 = DB.init() 방식으로 return값을 받을 수 없다
 * DB.init() 함수의 return 값은 .then() 함수를 통해서 받아야한다
 */

let dbConn = null;
/* init() 함수에 async가 설정되어 동기식으로 작동된다
이 함수의 return 값을 받기 위해서는 .then() 함수를 통하여 받아야한다 */
DB.init().then((connection) => {
  dbConn = connection;
});
console.log("dbConn", dbConn);

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_books";
  dbConn
    // query() 함수를 동기방식으로 실행
    .query(sql)
    // query() 함수 실행이 완료되면 .then() 함수에게 결과를 전달한다
    .then((rows) => {
      console.log(rows);
      return res.render("books/list", {
        books: rows[0],
      });
    })
    // 만약 실행중에 오류가 발생하면 .catch() 함수에게 결과를 전달한다
    .catch((err) => {
      return res.render("db_error", err);
      // return res.json(err);
    });
});

router.get("/insert", (req, res) => {
  return res.render("books/input");
});

router.post("/insert", (req, res) => {
  // mysql2 dependency 도구가 지원하는 확장된 INSERT 구문
  // 이 SQL은 표준 SQL이 아님
  const sql = "INSERT INTO tbl_books SET ?";
  const params = {
    isbn: req.body.isbn,
    title: req.body.title,
    publisher: req.body.publisher,
    author: req.body.author,
    price: Number(req.body.price),
    discount: Number(req.body.discount),
  };
  // return res.json(params);
  dbConn
    .query(sql, params)
    .then((_) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/:isbn/detail", (req, res) => {
  const isbn = req.params.isbn;
  const sql = "SELECT * FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((rows) => {
      // return res.json(rows[0][0]);
      return res.render("books/detail1", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.json(err);
    });
  // console.log(isbn);
});
router.get(`/:isbn/delete`, (req, res) => {
  const isbn = req.params.isbn;
  const sql = "DELETE FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((_) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db.error", err);
    });
});
/**
 * 도서정보 자세히 보기에서 수정하기를 클릭했을때
 * 브라우저의 주소창에 /books/isbn/update 라고 입력했을때
 * GET / books/ 0003/ update 라고 요청을 했을 때
 *
 * 이 router가 요청을 받아서 처리한다
 * 이 요청은 0003 도서의 정보를 input 화면에 보여주고 수정할 수 있도록
 * 화면을 보여달라 라는 요청
 *
 * 스토리텔링을 통해 코드를 익혀보자
 */
router.get("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const sql = "SELECT FROM tbl_books WHERE isbn = ? ";
  dnConn
    .query(sql.isbn)
    .then((rows) => {
      return res.render("books/input", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

/**
 * 수정하기 화면에서 input box에 값을 입력하고
 * 수정하기 버튼을 클릴했을때 post 방식으로 데이터가 전달된다
 * POST /book / 0003/update로 요청을 할때
 */

router.post("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const params = {
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    price: Number(req.body.price),
    discount: Number(req.body.discount),
  };
  /**
   * mysql2/promise 도구에서는 UPDATE SQL 문이 매우 간소해진다
   * UPDATE tbl_books SET title = ?, author = ? .. 와 같이 작성해야 하는데
   * mysql2/promise에서는 SET 키워와 함께 JSON type으로 만들어진 데이터를 통해 Update SQL 문이 매우 간소해진다
   *
   * 다만, Update를 실행할때 WHERE 절에 isbn = ? 가 필수항목으로 사용해야 하므로
   * query()함수에 절달하는 값은 배열로 2가지를전달해야한다 [params, isbn]
   */

  const sql = "UPDATE tbl_books SET ? WHERE isbn = ?";
  dbConn
    .query(sql, [params, isbn])
    .then((_) => {
      return res.redirect(`/books/${isbn}/detail`);
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

export default router;
