document.addEventListener("DOMContentLoaded", () => {
  const btn_list = document.querySelector("button.btn_list");
  const btn_update = document.querySelector("button.btn_update");
  const btn_delete = document.querySelector("button.btn_delete");

  btn_list?.addEventListener("click", () => {
    document.location.href = "/student";
  });
  btn_delete.addEventListener("click", (e) => {
    if (
      confirm("삭제된 데이터는 복구 할수 없습니다\n정말 삭제할까요?")
    ) {
      const target = e.target;
      /**
       * html tag 에 data-변수명="값" 형식으로 지정한 속성은
       * html 에서 JS 로 변수를 전달하는 방법중의 하나이다
       * 이 값을 JS 에서 추출할때는 저장변수 = tag.dataset.변수 와 같이 사용한다
       * target.dataset.num : 현재 클릭된 tag 에 data-num 로 설정된 값을 가져와라
       */
      const isbn = target.dataset.num;
      // alert(st_num);
      document.location.replace(`/student/${isbn}/delete`);
    }
  });

  btn_update.addEventListener("click", (e) => {
    const isbn = e.target.dataset.num;
    if (isbn) {
      document.location.replace(`/student/${isbn}/update`);
    } else {
      alert("isbn 정보가 잘못되었습니다");
    }
  });
});
