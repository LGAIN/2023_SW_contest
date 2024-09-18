# 2023_SW_contest

## 2023 Sungshin SW 경진대회

### 🗓️ 프로젝트 기간

2023년 05월 ~ 2023년 08월 (4M)

<br>

### 💜 Backend 설명 보러 가기

<br>

### 💙 Frontend 설명 보러 가기

<br>

### 🌳File Tree

```
📦2023_SW_contest
 ┣ 📂frontend
 ┃ ┣ 📂.github
 ┃ ┃ ┣ 📂ISSUE_TEMPLATE
 ┃ ┃ ┃ ┣ 📜♻️-refactor.md
 ┃ ┃ ┃ ┣ 📜✨-feature.md
 ┃ ┃ ┃ ┗ 📜🐞-bug-report.md
 ┃ ┃ ┗ 📜pull_request_template.md
 ┃ ┣ 📂public
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜logo192.png
 ┃ ┃ ┣ 📜logo400.png
 ┃ ┃ ┣ 📜manifest.json
 ┃ ┃ ┗ 📜robots.txt
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂assets
 ┃ ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┃ ┣ 📜banner.png
 ┃ ┃ ┃ ┃ ┣ 📜iron_locker.png
 ┃ ┃ ┃ ┃ ┣ 📜locker_img.png
 ┃ ┃ ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┃ ┃ ┣ 📜nemo_logo.png
 ┃ ┃ ┃ ┃ ┗ 📜signup_logo.png
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┃ ┣ 📜Header.css
 ┃ ┃ ┃ ┃ ┗ 📜Header.jsx
 ┃ ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┃ ┃ ┣ 📜LockerAdminModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜LockerUserModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜NoticeAdminModal.css
 ┃ ┃ ┃ ┃ ┗ 📜NoticeAdminModal.jsx
 ┃ ┃ ┃ ┗ 📂Toast
 ┃ ┃ ┃ ┃ ┣ 📜ErrorToast.jsx
 ┃ ┃ ┃ ┃ ┣ 📜InfoToast.jsx
 ┃ ┃ ┃ ┃ ┗ 📜WarningToast.jsx
 ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📂Locker
 ┃ ┃ ┃ ┃ ┣ 📜LockerInfo.css
 ┃ ┃ ┃ ┃ ┣ 📜LockerInfo.jsx
 ┃ ┃ ┃ ┃ ┣ 📜LockerNumbers.css
 ┃ ┃ ┃ ┃ ┣ 📜LockerNumbers.jsx
 ┃ ┃ ┃ ┃ ┣ 📜LockerPage.css
 ┃ ┃ ┃ ┃ ┗ 📜LockerPage.jsx
 ┃ ┃ ┃ ┣ 📂Question
 ┃ ┃ ┃ ┃ ┣ 📜Answer.jsx
 ┃ ┃ ┃ ┃ ┣ 📜AnswerView.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Notice.jsx
 ┃ ┃ ┃ ┃ ┣ 📜NoticeButton.jsx
 ┃ ┃ ┃ ┃ ┣ 📜NoticeView.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Paging.css
 ┃ ┃ ┃ ┃ ┣ 📜Question.jsx
 ┃ ┃ ┃ ┃ ┣ 📜QuestionList.css
 ┃ ┃ ┃ ┃ ┣ 📜QuestionList.jsx
 ┃ ┃ ┃ ┃ ┣ 📜QuestionPaging.jsx
 ┃ ┃ ┃ ┃ ┣ 📜QuestionView.css
 ┃ ┃ ┃ ┃ ┗ 📜QuestionView.jsx
 ┃ ┃ ┃ ┗ 📂User
 ┃ ┃ ┃ ┃ ┣ 📜Mypage.css
 ┃ ┃ ┃ ┃ ┣ 📜Mypage.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Signin.css
 ┃ ┃ ┃ ┃ ┣ 📜Signin.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Signup.css
 ┃ ┃ ┃ ┃ ┗ 📜Signup.jsx
 ┃ ┃ ┣ 📂recoil
 ┃ ┃ ┃ ┣ 📂locker
 ┃ ┃ ┃ ┃ ┗ 📜atom.js
 ┃ ┃ ┃ ┣ 📂menu
 ┃ ┃ ┃ ┃ ┣ 📜atom.js
 ┃ ┃ ┃ ┃ ┗ 📜useMenu.js
 ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┗ 📜atom.js
 ┃ ┃ ┣ 📜App.css
 ┃ ┃ ┣ 📜App.jsx
 ┃ ┃ ┣ 📜App.test.js
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┣ 📜reportWebVitals.jsx
 ┃ ┃ ┗ 📜setupTests.jsx
 ┃ ┣ 📜.env
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜Dockerfile
 ┃ ┣ 📜Makefile
 ┃ ┣ 📜README.md
 ┃ ┣ 📜docker-compose.yaml
 ┃ ┣ 📜package-lock.json
 ┃ ┗ 📜package.json
 ┣ 📂backend
 ┃ ┣ 📂.github
 ┃ ┃ ┣ 📂ISSUE_TEMPLATE
 ┃ ┃ ┃ ┣ 📜♻️-refactor.md
 ┃ ┃ ┃ ┣ 📜✨-feature.md
 ┃ ┃ ┃ ┗ 📜🐞-bug-report.md
 ┃ ┃ ┗ 📜pull_request_template.md
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜baseResponseStatus.js
 ┃ ┃ ┣ 📜express.js
 ┃ ┃ ┣ 📜jwtMiddleware.js
 ┃ ┃ ┣ 📜mailAuth.js
 ┃ ┃ ┣ 📜response.js
 ┃ ┃ ┣ 📜secret.js
 ┃ ┃ ┣ 📜secret_sms.js
 ┃ ┃ ┗ 📜winston.js
 ┃ ┣ 📂src
 ┃ ┃ ┗ 📂app
 ┃ ┃ ┃ ┣ 📂Nemo
 ┃ ┃ ┃ ┃ ┣ 📜nemoController.js
 ┃ ┃ ┃ ┃ ┣ 📜nemoDao.js
 ┃ ┃ ┃ ┃ ┣ 📜nemoProvider.js
 ┃ ┃ ┃ ┃ ┣ 📜nemoRoute.js
 ┃ ┃ ┃ ┃ ┗ 📜nemoService.js
 ┃ ┃ ┃ ┣ 📂Question
 ┃ ┃ ┃ ┃ ┣ 📜questionController.js
 ┃ ┃ ┃ ┃ ┣ 📜questionDao.js
 ┃ ┃ ┃ ┃ ┣ 📜questionProvider.js
 ┃ ┃ ┃ ┃ ┣ 📜questionRoute.js
 ┃ ┃ ┃ ┃ ┗ 📜questionService.js
 ┃ ┃ ┃ ┗ 📂User
 ┃ ┃ ┃ ┃ ┣ 📜userController.js
 ┃ ┃ ┃ ┃ ┣ 📜userDao.js
 ┃ ┃ ┃ ┃ ┣ 📜userProvider.js
 ┃ ┃ ┃ ┃ ┣ 📜userRoute.js
 ┃ ┃ ┃ ┃ ┗ 📜userService.js
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜index.js
 ┃ ┣ 📜package.json
 ┃ ┗ 📜README.md

```
