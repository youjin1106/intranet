# 직원들을 위한 인트라넷 페이지

직원들을 위한 인트라넷 페이지 입니다.
<br>
로그인을 하면 마이페이지에 들어가 나의 프로필 관리, 근태 관리, 연차 관리등을 신청하고 확인할 수 있습니다.
<br>
또한 공지사항페이지에서 공지사항을 확인할 수 있습니다.

<br>

🗂️ 배포한 사이트

https://intranet-dun-ten.vercel.app/login

<br>

🗂️ 프로젝트 기간

2024.01.25 ~ 2024.02.08

<br>

🗂️ 사용 기술

React.js / TypeScript / tailwindcss / jotai / JSON -SERVER

<br>

### ❗ 필수

- [x] 마이페이지 구현
- [x] 사진, 직무, 이름이 표기된 프로필 구현
- [x] 시간 관리 페이지 개발
- [x] 현 시각을 표시하는 시계 (타이머) 구현
- [x] 토글 형태의 근무 시작 / 종료 스위치 구현
- [x] 모달을 활용한 근무 시작 / 종료 확인 창 구현
- [x] 연차/ 반차/시간 조정 등 부재 신청 창 구현
- [x] 부재 신청 내역 확인 창 구현
- [x] 부재 항목에 따른 카테고리 메뉴로 데이터 필터링 가능 구현
- [x] 기업 공지 모음 갤러리 구현
- [x] netlify 등을 이용한 정적 페이지 배포
- [x] 과제에 대한 설명을 포함한 README.md 파일 작성

### ❔ 선택

- [x] React / TypeScript 사용은 선택
- [x] 마이페이지의 사진 업로드 기능
- [x] 로그인 기능
- [x] 부재 신청시, 사유 기재 기능
- [ ] 기타 동작이 완료되기 전에 로딩 애니메이션 구현
- [x] 페이지네이션
- [x] 관련된 기타 기능도 고려
- [x] eslint 설정, 커밋컨벤션, 문서화 등 팀프로젝트시 필요한 추가 작업들

<br>

💻 로그인
<br>
id : ej1212@gmail.com / password : 1111
<br>
id : yj3@gmail.com / password : 1112
<br>
id : sm@gmail.com / password : 1113
<br>
id : yd1@gmail.com / password : 1114

<br>

### 이은주

로그인 페이지

- JSON SERVER 데이터를 이용한 로그인 기능 구현
- 데이터에 등록된 유저 이메일, 비밀번호를 사용하여 로그인
- 재사용할 수 있는 인풋박스 컴포넌트 생성

<br>

마이페이지

- 세션스토리지를 이용해 로그인 시 저장된 이메일로 해당 유저 프로필 생성
- 세션스토리지에 상태를 저장해서 새로고침 시 해당 페이지 저장
- navbar 로그아웃 버튼 
- 프로필 이미지 업로드 가능
- 재사용할 수 있는 header 컴포넌트 생성
- header에 현재 날짜, 시간을 나타내는 타이머 기능 구현
- react-swiper를 이용한 간단한 공지사항 기능 구현

<br>

### 장유진

마이페이지(근무 관리 및 연차 관리)

- 출근과 퇴근 타이머로 기록
- 타임라인 차트로 근무기록 표현
- 사용예정일에 대한 정보 확인
- 남은 연차와 연차 소멸 D-Day 확인

<br>

### 심소망

마이페이지 (멤버)

- 로그인멤버 제외한 나머지 멤버 정보 불러오기
- 온라인, 오프라인 상태에 따른 필터링
- 재사용 프로필 컴포넌트 생성

NavBar

- 메뉴와 페이지 일치시 react-router-dom 활용 색상 변경

게시판, 게시글 상세 페이지

- 페이지네이션 기능 구현
- 개별 공지사항 클릭시 상세페이지로 이동

<br>

### 전유덕

생산성 향상을 위한 재사용 컴포넌트 구현
- 버튼 : 프롭스에 따른 레이블, 사이즈, 기능추가
- 셀렉트박스 : 프롭스에 따라 옵션목록, 크기, 기능추가
- 모달 : 모달자체는 하나의 컴포넌트를 사용하고 상황에 따라 내부 표시되는 컴포넌트를 교체

마이페이지
- 투두리스트 생성 및 삭제
- 연차신청 : 데이터픽커를 사용하여 기간선택 및 사유입력
- 반차신청 : 데이터픽커를 사용하여 날짜 및 오전, 오후 선택
