<!DOCTYPE html>
<html lang="ko">
  <head>
    <style>
      @media (max-width: 768px) {
        body {
          font-size: 16px;
        }
        .title-text {
          font-size: 20px;
        }
        .info-text {
          font-size: 14px;
        }
        .resultbox {
          padding: 20px;
        }
      }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0">
    <meta charset="utf-8" />
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div class="body">
      <div class="wrap">
        <div class="title">
          <div class="title-text">AJ네트웍스 간편 견적 조회</div>
          <span class="mainimg"></span>
        </div>
        <div class="contents">
          <div class="info">
            <p class="info-text">상품 유형 선택 후, 상세 조건을 선택해주세요</p>
          </div>
          <div class="select-type">
            <div class="option">고소장비(AWP)</div>
            <div class="option">지게차(FL)</div>
            <div class="option">지게차(FL) 부품</div>
            <div class="option">고소장비(AWP) 액세서리</div>
            <div class="option">운반기기</div>
          </div>
          <div class="select-section">
            <div class="select-box">
              <div class="sb">
                <div class="guide">
                  <div class="guidebox"></div>
                  <div class="guidetext">브랜드를 선택해주세요</div>
                </div>
                <div class="selected-value"></div>
                <img class="element-chevron-down" src="img/chevron-down.png" />
              </div>
              <div class="dropdown" style="display: none;">
                <div class="option"></div>
              </div>
            </div>
            <!-- 나머지 선택 박스들 동일 -->
          </div>
          <div class="result-nbtn">
            <div class="resultbox">
              <div class="frame">
                <div class="div-wrapper"><div class="text-wrapper">선택하신 상품의 견적금액은</div></div>
                <div class="charge">
                  <div class="charge-num"><div class="num">20,000</div></div>
                  <div class="charge-sen"><div class="sen">원 입니다</div></div>
                </div>
              </div>
            </div>
            <div class="div-textbtn"><div class="refresh_btn">다시 조회하기</div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- axios CDN 추가 -->
    <script type="module">
      import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';

      // axios 사용 예시
      axios.get('API_URL')
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    </script>
  </body>
</html>
