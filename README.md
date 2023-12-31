# 삼삼오오 포트폴리오 서비스

이 프로젝트는 자기자신의 포트폴리오 작성 및 다른 사람의 포트폴리오를 확인할 수 있으며, 게시판을 통해 자신의 생각을 공유할 수 있는 웹 서비스입니다.

프로젝트의 구성은 다음과 같습니다.

- User (회원가입, 로그인 등 사용자 관련)
- Award (포트폴리오 중 상장 이력 관련)
- Certificate (포트폴리오 중 자격증 관련)
- Project (포트폴리오 중 프로젝트 관련)
- Education (포트폴리오 중 교육, 학교 관련)
- Board (게시판 관련)

## 주요 사용 기술

1. 프론트엔드

- React
- React Bootstrap
- axios

2. 백엔드

- Express
- Mongodb, Mongoose

## 필수 서비스 기능

- 회원 가입 및 로그인 기능
- 수상 이력 정보 CRUD 기능
- 자격증 정보 CRUD 기능
- 프로젝트 정보 CRUD 기능
- 학력 정보 CRUD 기능
- 네트워크 페이지를 통한 포트폴리오 공유 기능

### 기능 추가

- CKEditor를 사용한 익명 게시물 작성 기능
- Scroll 기능으로 게시물을 최근순으로 조회
- 포트폴리오 목록 Pagination 기능
- 다크 모드
- 로그인 실패 알림

### 기능 개선

- 정보 삭제 기능
- 게시물 삭제 기능
- 회원 가입 성공 시 이를 알려주는 팝업 창
- 회원 가입 중 이메일 중복 시 이를 알려주는 팝업 창

### 시연

- 로그인
  <img src='./img/login.gif' title="Login">

- 게시글 추가, 편집, 삭제
  <img src='./img/uploadUpdated.gif' title="upload&update">
  <img src='./img/uploadDelete.gif' title="upload&delete">

- 네트워크 페이지
  <img src='./img/network.gif' title="networkPage">

- 놀이터 페이지
  <img src='./img/annonymousBoard.gif' title="annonymousBoard">

- 다크모드 & 로그아웃
  <img src='./img/darkModeAndLogout.gif' title="darkModeAndLogout">

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.
