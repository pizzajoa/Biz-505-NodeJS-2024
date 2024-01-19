document.addEventListener("DOMContentLoaded", () => {
  const ST_INDEX = {
    ISBN: 0,
    TITLE: 1,
    AUTHOR: 2,
    PUBLISHER: 3,
    PRICE: 4,
    DISCOUNT: 5,
  };

  const isbn_check = async (isbn) => {
    // 서버에 GET: /student/학번/check 로 요청하기
    // 서버에서 response 한 정보를 response 변수에 받기(저장)
    const response = await fetch(`/student/${isbn}/check`);

    // response 정보에서 json type 의 값(데이터) 만 추출하여 json 에 저장
    // {result:"ERROR", message:""},
    // 또는 {result : "있다",STD:"학번"}
    // 또는 {result : "없다", STD:null }
    const json = await response.json();
    console.log(json);
    // json 데이터 중에서 result 변수만 추출하여 return
    // ERROR, 있다, 없다 중에 한가지를 return
    return json.result;
  };

  // const st_num = document.querySelector("input[name='st_num']")
  //   const st_num = document.querySelector("#st_num");
  //   const st_name = document.querySelector("#st_name");
  //   const st_dept = document.querySelector("#st_dept");
  //   const btn_submit = document.querySelector("form.student button");

  const form = document.querySelector("form.student");
  //   const st_num = form.querySelector("#st_num")
  //   const st_name = form.querySelector("#st_name")
  //   const st_dept = form.querySelector("#st_dept")

  const btn_submit = form.querySelector("button");
  const inputs = form.querySelectorAll("input");
  const isbn = inputs[ST_INDEX.ISBN];
  const title = inputs[ST_INDEX.title];
  const author = inputs[ST_INDEX.author];
  const publisher = inputs[ST_INDEX.publisher];
  const price = inputs[ST_INDEX.price];
  const discount = inputs[ST_INDEX.discount];

  // 여러개의 tag 묶음을 배열로 만들기
  const error_divs = document.querySelectorAll("div.student.error");

  const isbn_valid = async (target) => {
    // result 에는 ERROR, 있다, 없다 중의 한가지 문자열이 저장된다
    const result = await isbn_check(target.value);
    let message = "";
    let color = "red";
    if (result === "ERROR") {
      message = " * DB 오류";
    } else if (result === "있다") {
      message = " * 이미 등록된 학번입니다";
    } else if (result === "없다") {
      message = " * 사용가능한 학번입니다";
      color = "blue";
    }
    error_divs[ST_INDEX.ISBN].innerHTML = message;
    error_divs[ST_INDEX.ISBN].style.color = color;
    // if (color === "red") {
    //   st_num.select();
    //   return false;
    // }
    // return true;
    // color 값이 "red" 이면 true, 아니면 false return 한다
    return color === "red";
  };

  /**
   * 먼저 btn_submit(button) 의 click event 를 최소한으로 테스트를 하고
   * 이후에 btn_submit null pointer exception 을 일으키는 현상을 방지하기 위하여
   * btn_submit? 형식으로 이후 코드를 사용한다
   */
  btn_submit?.addEventListener("click", async () => {
    // 표시되었던 error 메시지를 모두 clear
    error_divs.forEach((item) => (item.innerHTML = ""));

    // alert("전송");
    if (!isbn.value) {
      error_divs[ST_INDEX.ISBN].innerHTML =
        "* 도서명은 반드시 입력하세요";
      isbn.select();
      return false;
    } else {
      const bRedYes = isbn_valid(isbn);
      if (bRedYes) {
        isbn.select();
        return false;
      }
    }
    if (!title.value) {
      error_divs[ST_INDEX.TITLE].innerHTML =
        "* 학생의 이름은 반드시 입력해야 합니다";
      title.select();
      return false;
    }
    if (!author.value) {
      error_divs[ST_INDEX.AUTHOR].innerHTML =
        "* 학과는 반드시 입력하세요";
      author.select();
      return false;
    }
    if (!publisher.value) {
      error_divs[ST_INDEX.PUBLISHER].innerHTML =
        "* 학과는 반드시 입력하세요";
      publisher.select();
      return false;
    }
    if (!price.value) {
      error_divs[ST_INDEX.PRICE].innerHTML =
        "* 학과는 반드시 입력하세요";
      price.select();
      return false;
    }
    if (!discount.value) {
      error_divs[ST_INDEX.DISCOUNT].innerHTML =
        "* 학과는 반드시 입력하세요";
      discount.select();
      return false;
    }

    // 유효성 검사를 마치면 서버로 데이터 보내기
    form.submit();
  });

  // 학번을 입력받은 input box 에 event 걸기
  /**
   * blur event
   * 보통은 input box 에서 사용하는 event
   * input box 에 focus() 가 있다가 다른 곳으로 focus() 이동하는 순간
   * 발생하는 event
   */
  let EVENT_ISBN = false;
  isbn?.addEventListener("blur", async (event) => {
    const target = event.target;
    const value = target.value;
    if (!value) {
      error_divs[ST_INDEX.ISBN].innerText = "* 학번을 입력해 주세요";
      // alert("학번은 반드시 입력하세요");
      target.select();
      return false;
    } else {
      const bRedYes = await isbn_valid(target);
      if (bRedYes) {
        target.select();
        return false;
      }
    }
    // ST_NUM 에서 유효성 검사가 모두 끝났다 라는 flag 변수
    EVENT_ISBN = true;
  });

  title.addEventListener("blur", (event) => {
    // ST_NUM 에서 유효성 검사가 끝나지 않았으면(false) 더 진행하지 말라
    if (!EVENT_ISBN) return false;
    const target = event.target;
    const value = target.value;
    if (!value) {
      error_divs[ST_INDEX.TITLE].innerText =
        " * 이름은 반드시 입력해야 합니다";
      title.select();
      return false;
    }
  });

  isbn.focus();
});
