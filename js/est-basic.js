document.addEventListener("DOMContentLoaded", function () {
    const selectBoxes = document.querySelectorAll(".select-box");

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
