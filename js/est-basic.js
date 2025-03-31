document.addEventListener("DOMContentLoaded", function () {
    const selectBoxes = document.querySelectorAll(".select-box");
    const resultBox = document.querySelector(".resultbox");
    const selectTypeOptions = document.querySelectorAll(".select-type .option");

    // 선택된 옵션을 구글 시트로 보내기
    selectTypeOptions.forEach((option) => {
        option.addEventListener("click", function () {
            if (option.classList.contains("selected")) {
                sendToGoogleSheet(option.textContent);
            }
        });
    });

    // 선택된 값 구글 시트로 보내기
    function sendToGoogleSheet(selectedValue) {
        fetch('https://script.google.com/macros/s/AKfycbzJsit4cZjGykOhCZCbfTNG_ZeYIvP3dJ3jRWceFE9HQSjmzyVBOkpWB79ZVB5AvgxI/exec', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                selected: selectedValue  // 선택한 값을 동적으로 보내기
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);  // 응답 데이터 처리
            searchInGoogleSheet(selectedValue);
        })
        .catch(error => console.error("전송 오류:", error));
    }

    // 구글 시트에서 값 찾기
    function searchInGoogleSheet(valueToSearch) {
        const sheetId = "YOUR_SHEET_ID";
        const range = "A2:A99";  // A열 범위

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer YOUR_ACCESS_TOKEN",  // OAuth 2.0을 통해 얻은 토큰
            }
        })
        .then(response => response.json())
        .then(data => {
            const found = data.values.find(row => row[0] === valueToSearch);
            if (found) {
                console.log("값을 찾았습니다:", found);
            } else {
                console.log("값을 찾을 수 없습니다.");
            }
        })
        .catch(error => console.error("검색 오류:", error));
    }

    // 페이지 로딩 시 resultbox는 숨김
    resultBox.style.display = "none";

    // 상품 유형 선택
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
