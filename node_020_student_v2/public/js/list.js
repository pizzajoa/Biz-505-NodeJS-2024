document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.student.list");
  table.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "TD") {
      // alert(target.innerText);
      const paTR = target.closest("TR"); // 클릭된 target(TD)를 감싸고 있는 가장 가까운 부모
      const tds = paTR.querySelectorAll("TD");
      const st_num = tds[1].innerText;
      // alert(st_num);
      // href = "/student/" + st_num + "/detail"
      document.location.href = `/student/${st_num}/detail`;
    }
  });
});
