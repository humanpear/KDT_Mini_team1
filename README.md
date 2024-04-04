# minibnb
숙박시설 예약 서비스


<br>

## 프로젝트 소개

🗂️ 배포한 사이트

[minibnb](https://minibnb.shop/)

🚨 주의! 회원가입 시 이미지를 지정 안하시면 기본 이미지는  "피카츄"입니다. 오류가 아니니 놀라지 마세요!

<br>

🗂️ 프로젝트 기간

24.03.18 ~ 24.04.05


<br>

🗂️ 사용 기술

React.js / TypeScript / tailwind css / React Query / zustand

<br>

🗂️ 팀원 소개
<table>
  <tr>
    <td align="center">
        <img src="https://github.com/humanpear/KDT_Mini_team1/assets/102540636/7d0db36f-57eb-414b-a6e6-6031c70429b0" width="150px;" alt=""/><br />
        <sub><b>임현성</b><br></sub>
    </td>
    <td align="center">
        <img src="https://github.com/dmswnlee/pay-system/blob/feat-eunjoo/src/assets/img/lej.png?raw=true" width="150px;" alt=""/><br />
        <sub><b>이은주</b><br></sub>
    </td>
    <td align="center">
        <img src="https://cdn.discordapp.com/attachments/1218113005179637810/1224932077363924992/f25991550ff571c3.png?ex=661f49e5&is=660cd4e5&hm=ab8fe4e4079337bf621eb2102e1c93f85148d320e356c0cfe79ee392b839f88b&" width="150px;" alt=""/><br />
        <sub><b>박인배</b><br></sub>
    </td>
  </tr>
</table>

<br>

🗂️ 디렉토리 구조
```react
src
|-- components
|    |-- 기능A   
|      |-- file a
|-- utils  
|-- types   
|   |-- product.ts
|-- UI
|   |-- Modal.tsx
|   |-- Button.tsx
|-- pages
|   |-- HomePage.tsx
|   |-- SignupPage.tsx
|   |-- LoginPage.tsx
|   |-- ProductDetailPage.tsx
|   |-- CartPage.tsx
|   |-- MyPage.tsx
|   |-- OrderDetailPage.tsx
|   |-- PaymentPage.tsx
|   |-- OrderCompletePage.tsx
|-- store
|-- hooks
|-- icons
|-- context
```

<br>

## 기능구현

<br>

<table>
   <tr>
      <td align="center">로그인</td>
      <td align="center">홈페이지</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://github.com/humanpear/KDT_Mini_team1/assets/102540636/8eeab8b5-825b-48cd-b8a0-dbdf423ce324" width="400" height="300"/> </td>
      <td  align="center"><img src="https://cdn.discordapp.com/attachments/1218113005179637810/1224945508993339442/2024-04-03124431-ezgif.com-video-to-gif-converter.gif?ex=661f5667&is=660ce167&hm=e524262dc8d049234dc42b91950d5248b6e75219ff4777e908d315903c1389c9&" width="400" height="300"/> </td>
   </tr>
   <tr>
      <td  align="center">로그인 폼을 통해 로그인 및 회원가입</td>
      <td  align="center">숙박시설 전체조회 및 카테고리 필터링</td>
   </tr>
</table>

<table>
   <tr>
      <td align="center">숙박시설 상세페이지</td>
      <td align="center">예약요청 페이지</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://cdn.discordapp.com/attachments/1218113005179637810/1224926711536160890/b5fb3daca2c47a44.gif?ex=661f44e6&is=660ccfe6&hm=b675ffeb11ce7bfad6438477ad3c34f644dd4ec07fa247e300a11973a307ae1c&" width="400" height="300"/> </td>
      <td  align="center"><img src="https://cdn.discordapp.com/attachments/1218113005179637810/1224925633994297364/2024-04-03123430-ezgif.com-video-to-gif-converter.gif?ex=661f43e5&is=660ccee5&hm=5cdf6f7c7a5d1203d800bc953468ee56552a5f33f7c1748b036047260e179ad2&" width="400" height="300"/></td>
   </tr>
   <tr>
      <td  align="center">객실형태, 체크인, 체크아웃, 인원 옵션 선택 후 예약하기 혹은 장바구니 담기 가능</td>
      <td  align="center">선택한 옵션 내역 확인 및 수정 가능, 약관 동의 후 예약요청</td>
   </tr>
</table>

<table>
   <tr>
      <td align="center">예약완료 페이지</td>
      <td align="center">장바구니 페이지</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://cdn.discordapp.com/attachments/1218113005179637810/1224925633994297364/2024-04-03123430-ezgif.com-video-to-gif-converter.gif?ex=661f43e5&is=660ccee5&hm=5cdf6f7c7a5d1203d800bc953468ee56552a5f33f7c1748b036047260e179ad2&" width="400" height="300"/></td>
      <td  align="center"><img src="https://github.com/humanpear/KDT_Mini_team1/assets/102540636/b6a6d213-3605-4d1a-ad60-aded656a6f76" width="400" height="300"/></td>
   </tr>
   <tr>
      <td  align="center">예약 확정 및 예약 내역 확인</td>
      <td  align="center">장바구니 담기 한 숙박시설 리스트 확인 및 주문 가능</td>
   </tr>
</table>

<table>
   <tr>
      <td align="center">마이페이지</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://cdn.discordapp.com/attachments/1218113005179637810/1224928084285849670/d95a275b1e90595f.gif?ex=661f462d&is=660cd12d&hm=eee6d664fd3dccb41a594e720dd8e71be69cb11eeeb98b1f8edb4d9b20feff35&" width="400" height="300"/></td>
   <tr>
      <td  align="center">내 정보, 예약내역 확인 가능</td>
   </tr>
</table>

<br>

## 팀원 별 구현기능

<br>

<img src="https://img.shields.io/badge/임현성-FF4154?style=flat&logo=&logoColor=white" />

- SignupPage - /signup
  - 회원가입
- LoginPage - /login
  - 로그인
- PaymentPage - /payment/:id
  - 만 14세 이상 이용 동의 ~~
  - 결제하기 ⇒ 상품 주문 처리
- OrderCompletePage - /payment/:id/complete
  - 결제 성공 시 주문 결과 출력
- OrderDetailPage - /order/:id
  - 주문 내역 페이지를 통해 내역 확인 (상세)
- CartPage - /cart
  - 장바구니 항목 조회
  - 장바구니 항목 삭제
- 기타
  - 라우트 관리 

<br>

<img src="https://img.shields.io/badge/이은주-764ABC?style=flat&logo=&logoColor=white" />

- homePage - /home
  - 전체 숙박 상품 목록 조회
  - 카테고리 분류
  - 무한 스크롤
- ProductDetailPage - /product:id
  - 개별 숙박 상품 상세 소개
  - 상품 선택 시 장바구니 담기 선택
  - 숙박 상품 옵션 선택
  - 바로 결제

<br>

<img src="https://img.shields.io/badge/박인배-F24E1E?style=flat&logo=&logoColor=white" />

- MyPage - /mypage
  - 회원 정보 조회
  - 예약 내역(주문 내역) 조회
- 기타
  - 깃허브 레파지토리 관리
  - 배포 및 환경변수 설정

<br>

## 브랜치 컨벤션
- main
    - develop
        - feature/a
        - feature/b
        - feature/c

<br>

## 커밋 컨벤션

- Add : 파일 생성
    - ex) Add : Member Entity 생성
- Feat : 기능 추가
    - ex) Feat : 회원가입 기능 추가
- Modify : 해당 기능 코드 수정
    - ex) Modify : 회원가입 검증 수정
- Fix : 버그 수정 (디버깅)
    - ex) Fix : 로그아웃 후 이동하는 페이지 변경
- Comment : 주석만 건드렸을 때
- Rename : 파일, 폴더명 수정 or 이동만 했을 때
- Remove : 파일 삭제만 했을 때
- Build : 빌드 관련 수정 (dependency 수정 등)
- Chore : import 정리, 포맷 정리 등 (필요하면 마지막에 쭉 돌리면 될 듯)
- Layout : Layout 구조 변경
- Lib : Library 변경 사항

