document.addEventListener("DOMContentLoaded", function () {
    const selectBoxes = document.querySelectorAll(".select-box");

    // Notion API에서 데이터를 가져오기
    async function fetchNotionData() {
        const notionToken = "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"; // 주어진 토큰
        const notionDatabaseId = "1c465b7c8e4d80d3a1b4f0e95a56ffe6"; // 실제 데이터베이스 ID

        const apiUrl = `https://api.notion.com/v1/databases/${notionDatabaseId}/query`;
        const proxyUrl = "https://cors.makemewanne.workers.dev/?url="; // 프록시 서버 주소

        const response = await fetch(proxyUrl + apiUrl, { // 프록시 서버를 통해 API 요청
            method: "POST",
            headers: {
                "Authorization": `Bearer ${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}`,
                "Content-Type": "application/json",
                "Notion-Version": "2021-05-13" // 최신 버전 확인
            },
            body: JSON.stringify({})
        });

        if (response.ok) {
            const data = await response.json();
            parseNotionData(data); // 데이터를 파싱하여 단계별로 옵션을 추가
        } else {
            console.error("Notion API 호출 실패", response);
        }
    }

    // Notion 데이터 파싱 및 셀렉트 박스에 옵션 추가
    function parseNotionData(data) {
        let stageData = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
        };

        data.results.forEach((item) => {
            for (let i = 1; i <= 5; i++) {
                const depthKey = `${i}depth`;
                if (item.properties[depthKey] && item.properties[depthKey].rich_text) {
                    stageData[i].push(...item.properties[depthKey].rich_text.map((text) => text.text.content));
                }
            }
        });

        // 각 단계에 맞게 셀렉트 박스에 옵션 추가
        const selectBoxes = document.querySelectorAll(".select-box");
        selectBoxes.forEach((selectBox, index) => {
            const dropdown = selectBox.querySelector(".dropdown");
            const stageNumber = index + 1;

            // 기존 옵션 초기화
            dropdown.innerHTML = '';

            // 해당 단계의 옵션 추가
            stageData[stageNumber].forEach((optionText) => {
                const option = document.createElement("div");
                option.classList.add("option");
                option.textContent = optionText;

                option.addEventListener("click", function () {
                    selectBox.querySelector(".selected-value").textContent = optionText;
                    dropdown.style.display = "none"; // 드롭다운 닫기
                    resetLowerStages(index);
                    updateResult(); // 선택값에 따라 결과 업데이트
                });

                dropdown.appendChild(option);
            });
        });
    }

    // Notion 데이터 가져오기
    fetchNotionData();

    selectBoxes.forEach((selectBox, index) => {
        const sb = selectBox.querySelector(".sb");
        const dropdown = selectBox.querySelector(".dropdown");
        const selectedValue = selectBox.querySelector(".selected-value");
        const guide = selectBox.querySelector(".guide");

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

        // 모든 단계를 선택해야 결과 박스가 보임
        if (selectedValues.length === 5) {
            const resultBox = document.querySelector(".resultbox");
            resultBox.style.display = "block";
            const chargeNum = resultBox.querySelector(".charge-num .num");
            chargeNum.textContent = "20,000"; // 예시 견적값
        } else {
            const resultBox = document.querySelector(".resultbox");
            resultBox.style.display = "none"; // 5단계 선택하지 않으면 결과 박스 숨기기
        }
    }

    // 견적 정보 초기화
    function resetResult() {
        const resultBox = document.querySelector(".resultbox");
        resultBox.style.display = "none"; // 초기화 시 결과 박스 숨기기
    }
});
