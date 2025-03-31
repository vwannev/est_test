document.addEventListener("DOMContentLoaded", function () {
    const selectBoxes = document.querySelectorAll(".select-box");
    
    if (selectBoxes.length === 0) {
        console.error("선택한 요소가 없습니다.");
    }
async function fetchGoogleSheetData(selectedValue) {
    const apiUrl = `https://script.google.com/macros/s/AKfycbzEYPFsMnoSeKUeIBmOvuZSRvIVjK-3zErT3khvHptNrhsRjQzy9fFOLa5_9ijF2Trj/exec`;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            console.log("구글 시트 데이터:", data);
            parseSheetData(data); // 데이터를 파싱하여 셀렉트 박스에 옵션 추가
        } else {
            console.error("구글 시트 API 호출 실패", response);
        }
    } catch (error) {
        console.error("구글 시트 데이터 가져오기 실패:", error);
    }
}

    // 구글 시트 데이터 파싱 및 셀렉트 박스에 옵션 추가
    function parseSheetData(data) {
        const stageData = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
        };

        data.results.forEach((item) => {
            for (let i = 1; i <= 5; i++) {
                const depthKey = `${i}depth`;
                if (item[depthKey]) {
                    stageData[i].push(item[depthKey]);
                }
            }
        });

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

    function resetResult() {
        const resultBox = document.querySelector(".resultbox");
        resultBox.style.display = "none";
    }
});
