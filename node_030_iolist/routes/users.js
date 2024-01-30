import express from "express";
import DB from "../models/index.js";
const USER = DB.models.tbl_members;
const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/join", async (req, res) => {
  res.render("users/join");
});

/**
 * 회원가입요청이 들어오면
 * 현재 tbl_members table에서 회원전체를 조회
 * 조회된 회원이 없으면 지금 요청된 회원이 ADMIN이다
 * 그렇지 않으면 요청된 회원은 일반 USER이다
 * req.body 데이터에 m_role 이라는 속성을 생성하면서
 * 그 값에 admin 또는 user라는 문자열을 저장한다
 */
router.post("/join", async (req, res) => {
  const rows = await USER.findAll();
  if (rows.length > 0) {
    req.body.m_role = "USER";
  } else {
    req.body.m_role = "ADMIN";
  }
  const result = await USER.create(req.body);
  return res.json(result);
});

router.get("/:username/check", async (req, res) => {
  const username = req.params.username;
  const row = await USER.findByPk(username);
  if (row) {
    return res.json({ MESSAGE: "FOUND" });
  } else {
    return res.json({ MESSAGE: "NOT FOUND" });
  }
});

export default router;
/*
회원가입 정책(policy)설정
최초로 가입하는 회원은 ADMIN
ADMIN은 현재 애플리케이션의 모든 기능을 다 사용할 수 있다
두번째부터 가입하는 회원은 USER
USER은 자신의 MyPage와 외부 기능을 제한적으로 변경할 수 있다
*/
