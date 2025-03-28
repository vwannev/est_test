document.addEventListener("DOMContentLoaded", function () {
    const selectBoxes = document.querySelectorAll(".select-box");
  
    selectBoxes.forEach((selectBox, index) => {
      const sb = selectBox.querySelector(".sb");
      const dropdown = selectBox.querySelector(".dropdown");
      const selectedValue = selectBox.querySelector(".selected-value");
      const guide = selectBox.querySelector(".guide");
      const options = dropdown.querySelectorAll(".option");
  
      sb.addEventListener("click", function () {
        // 다른 셀렉트 박스 닫기
        selectBoxes.forEach((otherSelectBox) => {
          if (otherSelectBox !== selectBox) {
            otherSelectBox.querySelector(".dropdown").style.display = "none"; // 드롭다운 숨기기
          }
        });
  
        // 선택된 셀렉트박스를 토글
        if (dropdown.style.display === "none") {
          dropdown.style.display = "block"; // 드롭다운 보이기
        } else {
          dropdown.style.display = "none"; // 드롭다운 숨기기
        }
  
        // 선택된 값이 있으면 guide 숨기기
        if (selectedValue.textContent.trim() !== "") {
          guide.style.display = "none"; // 선택된 값이 있으면 guide 숨기기
        } else {
          guide.style.removeProperty("display"); // guide display 속성 없애기
        }
      });
  
      options.forEach((option) => {
        option.addEventListener("click", function () {
          const selectedOptionText = option.textContent;
          selectedValue.textContent = selectedOptionText; // 선택한 값 표시
  
          // 선택된 값 표시하고, 가이드 숨기기
          guide.style.display = "none"; // 가이드 숨기기
          selectedValue.style.display = "block"; // 선택된 값 표시
  
          // 드롭다운 닫기
          dropdown.style.display = "none"; 
  
          // 상위 단계 선택 시 하위 단계 초기화
          resetLowerStages(index);
  
          // 5단계까지 선택했으면 견적 표시
          updateResult();
        });
      });
    });
  
    // 상위 단계 선택 시 하위 단계 초기화
    function resetLowerStages(currentIndex) {
      selectBoxes.forEach((selectBox, index) => {
        if (index > currentIndex) {
          selectBox.querySelector(".selected-value").textContent = ""; // 선택값 초기화
          selectBox.querySelector(".selected-value").style.display = "none"; // 선택값 숨기기
          selectBox.querySelector(".guide").style.removeProperty("display"); // guide display 초기화
          selectBox.querySelector(".dropdown").style.display = "none"; // 드롭다운 닫기
        }
      });
    }
  
    // 처음부터 다시 조회하기 버튼 클릭 시 초기화
    const resetButton = document.querySelector(".textbtn");
    resetButton.addEventListener("click", function () {
      selectBoxes.forEach((selectBox) => {
        selectBox.querySelector(".dropdown").style.display = "none";
        selectBox.querySelector(".guide").style.removeProperty("display"); // guide display 초기화
        selectBox.querySelector(".selected-value").textContent = ""; // 선택된 값 초기화
        selectBox.querySelector(".selected-value").style.display = "none"; // 선택된 값 숨기기
      });
      // 견적 정보 초기화
      resetResult();
    });
  
    // 견적 결과 업데이트
    function updateResult() {
      const selectedValues = Array.from(selectBoxes)
        .map((selectBox) => selectBox.querySelector(".selected-value").textContent)
        .filter((text) => text !== "");
  
      if (selectedValues.length === 5) {
        const resultBox = document.querySelector(".resultbox");
        resultBox.style.display = "block";
        const chargeNum = resultBox.querySelector(".charge-num .num");
        chargeNum.textContent = "20,000"; // 예시 견적값
      } else {
        const resultBox = document.querySelector(".resultbox");
        resultBox.style.display = "none";
      }
    }
  
    // 견적 정보 초기화
    function resetResult() {
      const resultBox = document.querySelector(".resultbox");
      resultBox.style.display = "none";
    }
  });