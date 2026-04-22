# board-project

SQLite와 Express를 사용한 간단한 게시판 프로젝트입니다.

이 프로젝트는 초보 학습용 구조를 목표로 만들었고, 아래 기능을 포함합니다.

- 회원가입
- 로그인 / 로그아웃
- 로그인 유지
- 아이디 찾기
- 비밀번호 변경
- 게시글 목록 / 상세 / 등록 / 수정 / 삭제
- 로그인한 사용자만 게시글 등록 가능
- 본인 게시글만 수정 / 삭제 가능

## 실행 방법

### 1. 패키지 설치

```bash
npm install
```

### 2. 서버 실행

```bash
npm start
```

### 3. 브라우저 접속

- 기본 주소: `http://localhost:3000`
- 게시판 목록: `http://localhost:3000/pages/list.html`

## 사용 패키지

- `express`: 서버 실행
- `sqlite3`: SQLite 데이터베이스 사용
- `express-session`: 세션 로그인 처리
- `connect-sqlite3`: 세션을 SQLite에 저장
- `bcrypt`: 비밀번호 해시 처리

## 프로젝트 구조

```text
board-project/
├─ public/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  ├─ api/
│  │  │  ├─ postsApi.js
│  │  │  └─ usersApi.js
│  │  ├─ pages/
│  │  │  ├─ change-password.js
│  │  │  ├─ create.js
│  │  │  ├─ detail.js
│  │  │  ├─ edit.js
│  │  │  ├─ find-id.js
│  │  │  ├─ list.js
│  │  │  ├─ login.js
│  │  │  └─ signup.js
│  │  └─ utils/
│  │     ├─ auth.js
│  │     └─ url.js
│  └─ pages/
│     ├─ change-password.html
│     ├─ create.html
│     ├─ detail.html
│     ├─ edit.html
│     ├─ find-id.html
│     ├─ list.html
│     ├─ login.html
│     └─ signup.html
├─ server/
│  ├─ controllers/
│  │  ├─ postsController.js
│  │  └─ usersController.js
│  ├─ db/
│  │  ├─ index.js
│  │  └─ init.js
│  ├─ middlewares/
│  │  └─ auth.js
│  ├─ repositories/
│  │  ├─ postsRepository.js
│  │  └─ usersRepository.js
│  ├─ routes/
│  │  ├─ posts.js
│  │  └─ users.js
│  ├─ data/
│  │  ├─ board.sqlite3
│  │  └─ sessions.sqlite3
│  └─ app.js
├─ package.json
└─ README.md
```

## 폴더 설명

### `public/`

브라우저에서 직접 사용하는 정적 파일입니다.

- `pages/`: HTML 화면 파일
- `js/api/`: 서버 API 호출 전용 파일
- `js/pages/`: 화면별 동작 처리
- `js/utils/`: 공통 유틸 함수
- `css/`: 스타일 파일

### `server/`

서버 로직을 역할별로 나눈 폴더입니다.

- `routes/`: URL 연결
- `controllers/`: 요청 처리와 응답 생성
- `repositories/`: SQLite SQL 실행
- `db/`: DB 연결과 초기화
- `middlewares/`: 로그인 검사 같은 공통 미들웨어
- `data/`: 실제 SQLite 파일 저장 위치

## 주요 파일 설명

### 서버

- `server/app.js`
  - Express 서버 시작
  - 세션 설정
  - 정적 파일 제공
  - `posts`, `users` 라우터 연결

- `server/db/index.js`
  - SQLite 연결
  - `run`, `get`, `all` 함수 제공

- `server/db/init.js`
  - `users`, `posts` 테이블 생성
  - 처음 실행 시 샘플 게시글 추가

- `server/routes/posts.js`
  - 게시글 API URL 연결

- `server/routes/users.js`
  - 회원 API URL 연결

- `server/controllers/postsController.js`
  - 게시글 목록 / 상세 / 등록 / 수정 / 삭제 처리
  - 로그인 사용자 권한 검사

- `server/controllers/usersController.js`
  - 회원가입 / 로그인 / 로그아웃 / 아이디 찾기 / 비밀번호 변경 처리

- `server/repositories/postsRepository.js`
  - 게시글 관련 SQL 실행

- `server/repositories/usersRepository.js`
  - 회원 관련 SQL 실행

- `server/middlewares/auth.js`
  - 로그인 여부 검사

### 프론트

- `public/pages/list.html`
  - 게시글 목록 화면

- `public/pages/detail.html`
  - 게시글 상세 화면

- `public/pages/create.html`
  - 게시글 등록 화면

- `public/pages/edit.html`
  - 게시글 수정 화면

- `public/pages/signup.html`
  - 회원가입 화면

- `public/pages/login.html`
  - 로그인 화면

- `public/pages/find-id.html`
  - 아이디 찾기 화면

- `public/pages/change-password.html`
  - 비밀번호 변경 화면

- `public/js/api/postsApi.js`
  - 게시글 API 호출

- `public/js/api/usersApi.js`
  - 회원 API 호출

- `public/js/utils/auth.js`
  - 로그인 상태 확인
  - 상단 인증 영역 렌더링
  - 로그아웃 처리

- `public/js/utils/url.js`
  - URL의 `id` 값 읽기

## 데이터베이스 구조

### users 테이블

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  last_login_at TEXT
)
```

### posts 테이블

```sql
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  writer TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0
)
```

## 인증 방식

이 프로젝트는 세션 기반 로그인을 사용합니다.

흐름은 아래와 같습니다.

1. 사용자가 로그인하면 서버가 세션을 생성합니다.
2. 브라우저는 세션 쿠키를 저장합니다.
3. 이후 요청마다 쿠키를 자동으로 보냅니다.
4. 서버는 세션으로 로그인 여부를 확인합니다.

로그인 유지 체크를 하면 세션 쿠키 유지 시간이 더 길어집니다.

## 게시글 권한 규칙

- 로그인하지 않으면 게시글 등록 불가
- 로그인하지 않으면 게시글 수정 / 삭제 불가
- 본인 게시글만 수정 가능
- 본인 게시글만 삭제 가능

서버에서 권한을 검사하므로, 브라우저에서 직접 요청해도 차단됩니다.

## 보안 관련 정리

- 비밀번호는 `bcrypt` 해시로 저장합니다.
- 비밀번호 원문은 DB에 저장하지 않습니다.
- 프론트에서 게시글 제목 / 내용은 `textContent` 기반으로 렌더링하여 XSS 위험을 줄였습니다.

## API 개요

### 회원 API

- `POST /api/users/signup`
- `POST /api/users/login`
- `POST /api/users/logout`
- `GET /api/users/me`
- `POST /api/users/find-id`
- `PUT /api/users/password`

### 게시글 API

- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`
- `POST /api/posts/:id/view`

## 테스트 순서

### 1. 기본 실행 확인

1. `npm install`
2. `npm start`
3. `http://localhost:3000` 접속

### 2. 회원 기능 테스트

1. 회원가입 페이지에서 새 계정 생성
2. 같은 아이디로 다시 가입 시도
3. 로그인 페이지에서 로그인
4. 로그인 유지 체크 후 새로고침
5. 로그아웃
6. 아이디 찾기
7. 로그인 후 비밀번호 변경
8. 새 비밀번호로 다시 로그인

### 3. 게시글 권한 테스트

1. 비로그인 상태에서 `create.html` 접속
2. 로그인 후 게시글 등록
3. 본인 글 상세 보기
4. 본인 글 수정 / 삭제
5. 다른 계정으로 로그인 후 남의 글 수정 / 삭제 시도

### 4. XSS 테스트

1. 제목 또는 내용에 `<script>alert(1)</script>` 입력
2. 목록 / 상세 페이지에서 스크립트 실행 없이 문자열 그대로 보이는지 확인

## 참고

이 프로젝트는 학습용으로 최대한 단순한 구조를 유지하고 있습니다.

다음 단계로 확장하고 싶다면 아래 순서를 추천합니다.

- `service` 계층 추가
- 게시글 작성자를 `writer` 문자열 대신 `user_id`로 연결
- 이메일 인증 기반 비밀번호 재설정 추가
- 댓글 기능 추가
- 페이지 공통 레이아웃 분리
