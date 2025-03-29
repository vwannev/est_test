document.addEventListener("DOMContentLoaded", function () {
    const selectBoxes = document.querySelectorAll(".select-box");

    async function fetchNotionData() {
        const notionToken = "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";
        const notionDatabaseId = "1c465b7c8e4d80d3a1b4f0e95a56ffe6"; 

        const apiUrl = "https://api.notion.com/v1/databases/1c465b7c8e4d80d3a1b4f0e95a56ffe6/query";
        const proxyUrl = "https://cors.makemewanne.workers.dev/?url=";

        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl), {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + notionToken,
                "Content-Type": "application/json",
                "Notion-Version": "2021-05-13"
            },
            body: JSON.stringify({})
        });

        if (response.ok) {
            const data = await response.json();
            parseNotionData(data); 
        } else {
            console.error("Notion API 호출 실패", response);
        }
    }

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

        const selectBoxes = document.querySelectorAll(".select-box");
        selectBoxes.forEach((selectBox, index) => {
            const dropdown = selectBox.querySelector(".dropdown");
            const stageNumber = index + 1;

            dropdown.innerHTML = '';

            stageData[stageNumber].forEach((optionText) => {
                const option = document.createElement("div");
                option.classList.add("option");
                option.textContent = optionText;

                option.addEventListener("click", function () {
                    selectBox.querySelector(".selected-value").textContent = optionText;
                    dropdown.style.display = "none"; 
                    resetLowerStages(index);
                    updateResult(); // 결과 업데이트
                });

                dropdown.appendChild(option);
            });
        });
    }

    fetchNotionData();

    selectBoxes.forEach((selectBox, index) => {
        const sb = selectBox.querySelector(".sb");
        const dropdown = selectBox.querySelector(".dropdown");
        const selectedValue = selectBox.querySelector(".selected-value");
        const guide = selectBox.querySelector(".guide");

        sb.addEventListener("click", function () {
            selectBoxes.forEach((otherSelectBox) => {
                if (otherSelectBox !== selectBox) {
                    otherSelectBox.querySelector(".dropdown").style.display = "none"; 
                }
            });

            if (dropdown.style.display === "none") {
                dropdown.style.display = "block"; 
            } else {
                dropdown.style.display = "none"; 
            }

            if (selectedValue.textContent.trim() !== "") {
                guide.style.display = "none"; 
            } else {
                guide.style.removeProperty("display");
            }
        });
    });

    function resetLowerStages(currentIndex) {
        selectBoxes.forEach((selectBox, index) => {
            if (index > currentIndex) {
                selectBox.querySelector(".selected-value").textContent = ""; 
                selectBox.querySelector(".selected-value").style.display = "none"; 
                selectBox.querySelector(".guide").style.removeProperty("display"); 
                selectBox.querySelector(".dropdown").style.display = "none"; 
            }
        });
    }

    // 처음부터 다시 조회하기 버튼 클릭 시 초기화
    const resetButton = document.querySelector(".textbtn");
    resetButton.addEventListener("click", function () {
        selectBoxes.forEach((selectBox) => {
            selectBox.querySelector(".dropdown").style.display = "none";
            selectBox.querySelector(".guide").style.removeProperty("display");
            selectBox.querySelector(".selected-value").textContent = ""; 
            selectBox.querySelector(".selected-value").style.display = "none"; 
        });
        resetResult();
    });

    // 견적 결과 업데이트
    function updateResult() {
        const selectedValues = Array.from(selectBoxes)
            .map((selectBox) => selectBox.querySelector(".selected-value").textContent.trim()) // trim으로 공백 제거
            .filter((text) => text !== ""); 

        console.log(selectedValues); // 디버깅을 위해 selectedValues 확인

        if (selectedValues.length === 5) {
            const resultBox = document.querySelector(".resultbox");
            resultBox.style.display = "block"; 
            const chargeNum = resultBox.querySelector(".charge-num .num");
            chargeNum.textContent = "20,000"; 
        } else {
            const resultBox = document.querySelector(".resultbox");
            resultBox.style.display = "none"; 
        }
    }

    function resetResult() {
        const resultBox = document.querySelector(".resultbox");
        resultBox.style.display = "none"; 
    }
});
