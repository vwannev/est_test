document.addEventListener("DOMContentLoaded", function () {
    const selectBoxes = document.querySelectorAll(".select-box");
    const resultBox = document.querySelector(".resultbox");

    // 페이지 로딩 시 resultbox는 숨김
    resultBox.style.display = "none";

    // 상품 유형 선택
    const selectTypeOptions = document.querySelectorAll(".select-type .option");
    selectTypeOptions.forEach((option) => {
        option.addEventListener("click", function () {
            selectTypeOptions.forEach((opt) => opt.classList.remove("selected"));
            option.classList.add("selected");
            updateResult();
        });
    });

    // 각 드롭다운의 선택값을 업데이트하고 조건을 확인
    selectBoxes.forEach((selectBox) => {
        const dropdown = selectBox.querySelector(".dropdown");
        const selectedValue = selectBox.querySelector(".selected-value");

        dropdown.addEventListener("click", function (event) {
            const option = event.target;
            if (option.classList.contains("option")) {
                selectedValue.textContent = option.textContent;
                dropdown.style.display = "none"; // 드롭다운 숨기기
                updateResult(); // 조건 충족 여부에 따른 결과 업데이트
            }
        });

        // 드롭다운 열기/닫기
        const sb = selectBox.querySelector(".sb");
        sb.addEventListener("click", function () {
            dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
        });
    });

    function updateResult() {
        // selectType의 선택 여부 확인
        const isTypeSelected = document.querySelector(".select-type .option.selected") !== null;

        // 모든 select-box의 선택값이 비어있지 않은지 확인
        const areAllSelected = Array.from(selectBoxes).every((selectBox) => {
            return selectBox.querySelector(".selected-value").textContent.trim() !== "";
        });

        // 조건 충족 여부에 따른 resultbox 표시
        if (isTypeSelected && areAllSelected) {
            resultBox.style.display = "block"; // 결과 박스 표시
        } else {
            resultBox.style.display = "none"; // 결과 박스 숨김
        }
    }

    // 리셋 버튼 클릭 시 모든 선택값 초기화
    const resetButton = document.querySelector(".refresh_btn");
    resetButton.addEventListener("click", function () {
        selectBoxes.forEach((selectBox) => {
            selectBox.querySelector(".selected-value").textContent = "";
            selectBox.querySelector(".dropdown").style.display = "none";
        });
        document.querySelector(".select-type .option.selected")?.classList.remove("selected");
        resultBox.style.display = "none"; // 결과 박스 숨기기
    });
});
