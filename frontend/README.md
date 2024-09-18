## 사용방법
### 1. 프론트엔드 실행
```` bash
$ git clone https://github.com/DreamOfNemo/frontend.git
$ cd frontend
$ npm start  또는 $ sudo make
````
프론트엔드를 실행하면 다음과 같은 네모의 꿈 서비스를 이용할 수 있다. 제공되는 기능은 관리자와 사용자로 나눌 수 있다.
### 2. 회원가입 
> #### 1) 관리자 
>　① 'sswu-' 로 시작하는 아이디로 회원가입 <br/>
>　② sswudreamofnemo@gmail.com 으로 관리자 승인 요청 메일 전송 (학과, 아이디, 재학 증명서 등) <br/>
>　③ 관리자 승인 이후 로그인 가능 <br/>

> #### 2) 일반 학생
>　① 학교 지메일 인증 <br/>
>　② 학번, 학과 등 인적사항 기입  <br/>
>　③ 해당 학과 사물함이 존재해야 회원가입 성공 <br/>

### 3. 사물함
> #### 1) 관리자
>　① 첫 로그인 시 사물함 정보 입력 및 생성 (사물함 위치, 보증금, 사물함 개수(행/열), 번호 부여 방법(가로/세로)) <br/>
>　② 각 사물함 클릭시 상태 변경 가능 (사용자없음 / 대여 신청 / 반납 신청 / 사용중 / 사용 불가) <br/>

> #### 2) 일반 학생
>　① 이용 가능한 사물함 클릭 → 대여 신청 <br/>
>　② 본인이 대여한 사물함 클릭 →  반납 신청 <br/>

### 4. Q&A
> #### 1) 관리자
>　① 공지: 공지 작성 → 공지 알림 문자 발송 (문자 발송 선택사항) <br/>
>　② 답변: 문의 관리 및 답변 <br/>

> #### 2) 일반 학생
>　① 문의 : 문의 작성 및 삭제 <br/>
>　② 본인이 대여한 사물함 클릭 →  반납 신청 <br/>

### 5. 마이페이지
> #### 1) 관리자
>　① 관리중인 사물함 정보(사물함 위치, 보증금) 확인 <br/>
>　② 사물함 전체 삭제 <br/>

> #### 2) 일반 학생
>　① 전화번호 변경  <br/>
>　② 대여중인 사물함 정보 확인 → 사물함 반납 <br/>
>　③ 회원탈퇴  → 탈퇴 성공 / 사물함 대여 미반납 → 탈퇴 불가<br/>
<br/>


## 기술
### 1. react, JSX
프론트엔드 개발도구로 [React](https://ko.legacy.reactjs.org/docs/getting-started.html)를 사용하였다. 다양한 라이브러리들을 사용하여 동적인 화면 개발이 가능하고, 사용하는 사람들이 많아 참고할 수 있는 개발자료가 많기 때문에 선택하였다.<br/>
프론트엔드는 .jsx와 .css로 이루어져있다. css는 스타일을 정의하는 파일이라는 것은 저명한 사실이다. [JSX](https://ko.legacy.reactjs.org/docs/introducing-jsx.html)는 자바스크립트의 모든 기능을 포함하면ㄴ서 JSX라 하며 JavaScript를 확장한 문법이다.
```jsx
 return (
    <button className="submit-button qna-button qna-list-write-button" onClick={navigateToWrite}>
      공지 쓰기
    </button>
  );
```
JS 내부에 HTML을 사용할 수 있는 문법을 제공한다. return을 통해 리액트 엘리먼트(element, 가장 작은 단위)가 생성된다

### 2. Axios
```jsx
axios
    .get(`${process.env.REACT_APP_API_URL}/app/user`, {
      headers: {
        "nemo-access-token": userjwt,
      },
    })
    .then((res) => {})
    .catch((error) => {});
```
백엔드의 API를 호출하기 위해 [Axois](https://axios-http.com/kr/docs/intro)라이브러리를 사용하였다. 프론트에서 http request 요청을 생성하고 response를 받을 수 있다.

### 3. recoil
```js
export const lockerInfoAtom = atom({
  key: "info",
  default: { location: "", deposit: 0, row: 0, col: 0, order: "" },
  effects_UNSTABLE: [persistAtom],
});
```
React의 전역적인 상태관리를 사용하기 위해 [Recoil](https://recoiljs.org/ko/)을 도입하였다. 기존 React의 useState도 상태관리를 할 수 있지만 다른 컴포넌트로 전달할 때는 인자로 넘기는 방식뿐이다. 따라서 모든 파일에서 jwt토큰 값 등을 전역에서 사용하기 위해 recoil을 사용하였다. 또한, 새로고침 시에도 값을 유지시키기 위해 recoilPersist를 활용하여 sessionStorage에 값을 저장하는 방식을 사용하였다.

### 4. sweet alert
<img aligh="left" width="300" alt="sweet alert 성공" src="https://github.com/DreamOfNemo/frontend/assets/101935265/6709bd4f-c133-4162-8b41-93bfe6ba7de6">
<img aligh="left" width="300" alt="sweet alert 실패" src="https://github.com/DreamOfNemo/frontend/assets/101935265/42fe9c1f-fc76-4e4e-88c3-bd375095d4d6">

```jsx
import Swal from "sweetalert2";

Swal.fire("확인", "로그인이 완료되었습니다", "success");
Swal.fire("에러", res.data.message, "error");
```
기존의 alert는 제목으로 localhost:3000이런식으로 표현되어서 외양을 헤친다는 생각이 들었다. 처음에는 alert의 title 부분을 바꾸고자 하였는데 '바꿀 수 없다'라는 검색 결과를 확인하고, 다른 라이브러리를 사용하여 알림을 띄우기로 하였다. 라이브러리 중에서도 import만 하면 적용할 수 있는 sweet alert를 선택하여 더 멋진 UI를 제공하고자 하였다.

### 5. react-bootstrap
```jsx
import { Button, Modal, Form } from "react-bootstrap";
// Button https://react-bootstrap.netlify.app/docs/components/buttons/
// Modal https://react-bootstrap.netlify.app/docs/components/modal/
// Form https://react-bootstrap.netlify.app/docs/forms/overview/

<Button variant="primary" type="submit" className="searchSubmit">검색</Button>
```
<img width="495" alt="버튼+폼+모달" src="https://github.com/DreamOfNemo/frontend/assets/101935265/8c3c9c0a-64bd-4b21-b694-c6414ed6404f">

css 작업 시간을 대폭 줄여준 유용한 라이브러리이다. react에서 Bootstrap을 사용할 수 있는 기능을 제공한다.
다양한 컴포넌트가 [react-bootstrap](https://react-bootstrap.netlify.app/docs/components/accordion)에 이미 구현되어있기 때문에 태그를 사용하여 공식문서에서 제공된 속성값으로 자유롭게 디자인을 적용할 수 있다.

### 6. docker
```dockerfile
FROM node:alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

CMD [ "npm", "start" ]
```
팀원 중 2명은 맥북을, 1명은 삼성노트북을 사용하기 때문에 OS가 달랐다. OS와 같은 개발환경을 통일하기 위해 docker를 build하여 그 위에서 작업을 하고자 Dockerfile을 만들었다. 또한 명령어의 사용이 익숙하지 않은 팀원들을 위해 makefile에 build, remove할 수 있는 명령어들을 미리 선언하여 <strong>sudo make, sudo make clean</strong>와 같이 make명령어로 도커를 사용할 수 있도록 준비하였다.

### 7. pagination
```jsx
<Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={10} // 한 페이지당 보여줄 리스트 아이템 개수
      totalItemsCount={totalPage} // 총 아이템 개수
      pageRangeDisplayed={5} // Paginator 페이지 범위
      prevPageText={'‹'} // 이전 텍스트
      nextPageText={'›'} // 다음 텍스트
      onChange={setPage} // 페이지 변동 시 핸들링 함수
    />
```
페이징 작업을 거치지 않으면 한 화면에 모든 게시물이 반환되는 문제가 발생한다. 기본적인 게시판 기능을 위해서 페이징 작업이 필요하다. 또한, 게시판 하단에 Paginator가 보여야 한다. Pagination을 하는 방법은 다양하다. 네모의 꿈은 <strong>react-js-pagination</strong>을 사용하여 Paginatior를 만들고, 핸들링 함수를 통해 페이징이 가능하도록 구현하였다. 게시물 검색 및 삭제를 통해 변할 수 있는 게시물과 페이지는 백에서 구현해놓은 게시물 api를 사용하여 실시간으로 변할 수 있도록 하였다. react-js-pagination의 사용법은 [react-js-pagination](https://www.npmjs.com/package/react-js-pagination) 에 제공되어 있다.

### 8. react-helmet-async
```jsx
// index.jsx
import { HelmetProvider } from "react-helmet-async";
<HelmetProvider>
      <App />
</HelmetProvider>

// Signin.jsx
<Helmet>
        <title>로그인 - 네모의 꿈</title>
</Helmet>
```
우리가 리액트를 이용하여 만든 웹 애플리케이션은 기본적으로 상단에 React App이라는 제목이 보인다. meta 태그를 설정해야만 이를 바꿀 수 있다. 따라서 리액트에서 meta 태그를 설정하기 위하여 react-helmet-async 라이브러리를 설치하고, 이를 설정하고 싶은 위치에 해당 태그를 집어넣어 사용하였다.

## 디렉토리 구조
```bash
📦frontend
 ┣ 📂.github
 ┃ ┣ 📂ISSUE_TEMPLATE
 ┃ ┃ ┣ 📜♻️-refactor.md
 ┃ ┃ ┣ 📜✨-feature.md
 ┃ ┃ ┗ 📜🐞-bug-report.md
 ┃ ┗ 📜pull_request_template.md
 ┣ 📂public
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜logo192.png
 ┃ ┣ 📜logo400.png
 ┃ ┣ 📜manifest.json
 ┃ ┗ 📜robots.txt
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┣ 📜banner.png
 ┃ ┃ ┃ ┣ 📜iron_locker.png
 ┃ ┃ ┃ ┣ 📜locker_img.png
 ┃ ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┃ ┣ 📜nemo_logo.png
 ┃ ┃ ┃ ┗ 📜signup_logo.png
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Header : 현재 로그인한 사용자와 페이지 이동을 할 수 있는 헤더 정의
 ┃ ┃ ┃ ┣ 📜Header.css
 ┃ ┃ ┃ ┗ 📜Header.jsx
 ┃ ┃ ┣ 📂Modal : 화면에 표시되는 모달을 정의
 ┃ ┃ ┃ ┣ 📜LockerAdminModal.jsx
 ┃ ┃ ┃ ┣ 📜LockerUserModal.jsx
 ┃ ┃ ┃ ┣ 📜NoticeAdminModal.css
 ┃ ┃ ┃ ┗ 📜NoticeAdminModal.jsx
 ┃ ┃ ┗ 📂Toast : 사용자에게 정보를 제공하는 토스트(alert 비슷한) 정의
 ┃ ┃ ┃ ┣ 📜ErrorToast.jsx
 ┃ ┃ ┃ ┣ 📜InfoToast.jsx
 ┃ ┃ ┃ ┗ 📜WarningToast.jsx
 ┃ ┣ 📂pages : 페이지에 필요한 코드를 나눈 디렉토리
 ┃ ┃ ┣ 📂Locker : 사물함 페이지
 ┃ ┃ ┃ ┣ 📜LockerInfo.css
 ┃ ┃ ┃ ┣ 📜LockerInfo.jsx
 ┃ ┃ ┃ ┣ 📜LockerNumbers.css
 ┃ ┃ ┃ ┣ 📜LockerNumbers.jsx
 ┃ ┃ ┃ ┣ 📜LockerPage.css
 ┃ ┃ ┃ ┗ 📜LockerPage.jsx
 ┃ ┃ ┣ 📂Question : Q&A 페이지
 ┃ ┃ ┃ ┣ 📜Answer.jsx
 ┃ ┃ ┃ ┣ 📜AnswerView.jsx
 ┃ ┃ ┃ ┣ 📜Notice.jsx
 ┃ ┃ ┃ ┣ 📜NoticeButton.jsx
 ┃ ┃ ┃ ┣ 📜NoticeView.jsx
 ┃ ┃ ┃ ┣ 📜Paging.css
 ┃ ┃ ┃ ┣ 📜Question.jsx
 ┃ ┃ ┃ ┣ 📜QuestionList.css
 ┃ ┃ ┃ ┣ 📜QuestionList.jsx
 ┃ ┃ ┃ ┣ 📜QuestionPaging.jsx
 ┃ ┃ ┃ ┣ 📜QuestionView.css
 ┃ ┃ ┃ ┣ 📜QuestionView.jsx
 ┃ ┃ ┃ ┗ 📜WriteButton.jsx
 ┃ ┃ ┗ 📂User : 회원가입, 로그인, 마이페이지
 ┃ ┃ ┃ ┣ 📜Mypage.css
 ┃ ┃ ┃ ┣ 📜Mypage.jsx
 ┃ ┃ ┃ ┣ 📜Signin.css
 ┃ ┃ ┃ ┣ 📜Signin.jsx
 ┃ ┃ ┃ ┣ 📜Signup.css
 ┃ ┃ ┃ ┗ 📜Signup.jsx
 ┃ ┣ 📂recoil : 상태관리 recoil 변수를 저장
 ┃ ┃ ┣ 📂locker : 사물함 관련 변수
 ┃ ┃ ┃ ┗ 📜atom.js
 ┃ ┃ ┣ 📂menu : 헤더 관련 변수
 ┃ ┃ ┃ ┣ 📜atom.js
 ┃ ┃ ┃ ┗ 📜useMenu.js
 ┃ ┃ ┗ 📂user : 사용자 관련 변수
 ┃ ┃ ┃ ┗ 📜atom.js
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.jsx
 ┃ ┣ 📜App.test.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.jsx
 ┃ ┣ 📜logo.svg
 ┃ ┣ 📜reportWebVitals.jsx
 ┃ ┗ 📜setupTests.jsx
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜Dockerfile : 도커파일
 ┣ 📜Makefile : Makefile
 ┣ 📜README.md
 ┣ 📜docker-compose.yaml : volume을 연동하기 위해 docker-compose파일 생성
 ┣ 📜package-lock.json
 ┗ 📜package.json
```
