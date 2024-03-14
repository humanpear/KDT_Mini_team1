# ** 💒 숙박 / 예약 서비스 만들기**

본 프로젝트는 숙박 예약 서비스를 완성하는 것을 목표로 합니다.
필요한 설계는 팀별로 직접 구성합니다.

### **[과제 수행 및 제출 방법]**

1. 현재 저장소를 로컬에 클론(Clone)합니다.
2. 자신의 팀명으로 브랜치를 생성합니다.(구분 가능하도록 팀명을 꼭 파스칼케이스로 표시하세요, git branch  KDT_FE7_Mini-Project_Team1)
3. 자신의 팀명 브랜치에서 과제를 수행합니다.
4. 과제 수행이 완료되면, 자신의 팀명 브랜치를 원격 저장소에 푸시(Push)합니다.(main 브랜치에 푸시하지 않도록 꼭 주의하세요, git push origin KDT_FE7_Mini-Project_Team1)
5. 저장소에서 main 브랜치를 대상으로 Pull Request 생성하면, 과제 제출이 완료됩니다!(E.g, main <== KDT_FE7_Mini-Project_Team1)
6. Pull Request 링크를 LMS로도 제출해 주셔야 합니다.
7. main 혹은 다른 사람의 브랜치로 절대 병합하지 않도록 주의하세요!
8. Pull Request에서 보이는 설명을 다른 사람들이 이해하기 쉽도록 꼼꼼하게 작성하세요!
9. Pull Request에서 과제 제출 후 절대 병합(Merge)하지 않도록 주의하세요!
10. 과제 수행 및 제출 과정에서 문제가 발생한 경우, 바로 담당 멘토나 강사님, 운영진에게 얘기하세요!

### **[필수 구현사항]**
- 회원 인증
    - 회원가입
        - 회원은 회원가입을 할 수 있습니다.
        - 기본 정보는 ID 역할로 이메일 주소와, 비밀번호, 이름 입니다.
    - 회원 로그인 기능
        - 이메일과 비밀번호로 로그인할 수 있습니다.
        - 회원 정보를 저장해둔 데이터베이스를 검색하여 해당 사용자가 유효한 사용자 인지 판단합니다.
        - 상품 조회(전체, 개별), 회원 가입은 로그인 없이 사용 가능합니다.
        - 이 외 기능은 로그인이 필요합니다.
    - 전체 상품 목록 조회
        - 데이터베이스에서 전체 상품 목록을 가져옵니다.
        - 이미지, 상품명, 상품가격을 기본으로 출력합니다.
        - 재고에 따라 품절일 경우, 출력 여부에 대해선 팀별로 결정합니다.
        - 한 페이지에 출력되는 상품 개수는 팀별로 정하여, 페이징을 수행합니다.
    - 상품 옵션 선택
      - 상품 상세 소개 페이지에서 상품 옵션을 선택할 수 있습니다.
      - 날짜, 숙박 인원은 기본으로 포함됩니다.
      - 이 외 룸 형태 등 필요한 요소는 팀별로 기획합니다.
- 결제하기
  - 주문 페이지에서 결제하기 버튼을 클릭하면, 실제 결제 로직 및 절차 없이 상품을 바로 주문한 것으로 처리합니다.
  - 주문을 저장하는 데이터베이스에 주문 정보를 저장합니다.
- 주문 결과 확인
  - 결제를 성공적으로 처리하면, 주문한 상품(들)에 대한 주문 결과를 출력해줍니다. 
 
### **[선택 구현사항]**
- 전체 상품 목록 조회
  - 카테고리를 분류하여, 상품을 출력할 수도 있습니다.
- 장바구니 담기
  - 장바구니에 담긴 상품 데이터 (이미지, 상품명, 옵션 등)에 따른 상품별 구매 금액, 전체 주문 합계 금액 등을 화면에 출력합니다.
  - 체크 박스를 통해 결제할 상품을 선택/제외할 수도 있습니다.
  - 주문하기 버튼을 통해 주문/결제 화면으로 이동합니다.
- 주문 내역 확인
  - 별도 주문 내역 페이지에 여태 주문한 모든 이력을 출력해줍니다.

