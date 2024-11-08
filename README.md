# javascript-convenience-store-precourse

할인 혜택과 재고 상황을 고려하여
최종 결제 금액을 계산하고 안내하는 결제 시스템

1. 각 상품별로 관리할것인가? 전체로 관리할 것인가? : 상품별로 구현

상품 class

- field : 이름, 가격, 일반 수량, 프로모션 수량, 프로모션 종류
- 일반 재고 수량 확인
- 프로모션 재고 수량 확인
- 일반 재고 차감
- 프로모션 재고 차감
- 결제 가능 여부 확인
- 프로모션 적용 가능한 수량보다 적게 가져왔는지 알려줌
- 프로모션 재고가 부족한지 알려줌

-> 상품 class를 모은 products 객체 만듬

- produst.md 읽어오는 유틸 함수 구현
- 읽어온 파일 한줄씩 읽는 함수 구현
- 상품의 name별로 product만들어서 저장

2. products class

- 입력받은 상품과 상품class 매핑
- 상품 존재 여부 확인

2. 프로모션 class

- field : 이름, buy ,get, start_Date, end_date
- 오늘 날짜에 프로모션 적용 가능한지 확인
- 상품 개수 입력시 몇 개를 증정할지 알려줌

  -> 프로모션 class를 모은 promitions 객체 만듬

- 프로모션 name별로 pomotion 만들어서 저장
- 프로모션 이름따라 매핑

3. 멤버십

- 30% 할인된 금액 반환
- 30%가 8000원 이상일시 8000원 할인된 금액 반환

4. 계산대 class

- field: 가져온 상품-수량

- 할인 관련 전체 로직 처리
- 프로모션 기간 중이라면 프로모션 재고를 우선적으로 차감하며, 프로모션 재고가 부족할 경우에는 일반 재고를 사용한다.
- 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량보다 적게 가져온 경우, 필요한 수량을 추가로 가져오면 혜택을 받을 수 있음을 안내한다.
- 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우, 일부 수량에 대해 정가로 결제하게 됨을 안내한다.

5. 영수증 class가 꼭 필요한가? 계산대에서 다 구할 수 있는 것들아닌가?

- field : 구매한 상품-수량, 행사할인, 멤버십 할인, 내실돈

총구매액 = 사용자가 입력한 상품의 가격 x 수량
최종 결제 금액 = 프로모션 및 멤버십 할인 정책(사용자가 입력한 상품의 가격 x 수량)

6. output class

- 환영인사 출력
- 상품목록 출력
- 혜택 안내 메세지 출력
- 정가 결제 안내 메세지 출력
- 멤버십 할인 여부 안내 메세지 출력
- 영수증 출력
- 추가 구매여부 출력
- Error 출력

7. input class

- 구매할 상품, 수량 입력받기
- Y,N 입력받기
- 잘못된 값 입력시 해당 지점부터 입력받음
