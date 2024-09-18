## 서버

### ec2 인스턴스 1대(벡엔드)

벡엔드 서버로 ec2 인스턴스를 사용하였다. ssh로 원격접속할 수 있다. elastic ip를 연결시켜 인스턴스에 하나의 고정 IP를 할당받았다. backend 서버를 돌리기 위해 ec2 인스턴스(ubuntu)에 backend 깃 레포지토리를 clone 받고, <strong>npm run dev</strong>로 벡엔드 서버를 실행시켰다. 작업으로 backend 코드에 수정사항이 생기면 git pull을 받기만 하면 되므로 서버 실행은 어려운 작업이 아니었다.<br/>

### rds 인스턴스 1대(DB)

mysql DB서버로 aws의 rds 인스턴스를 사용하였다. ec2와 (정말 열심히)연동하고 mysql 쿼리문으로 우리 서비스에 필요한 DB를 구축하였다. rds 서버는 로컬의 workbench에서도 원격 접속이 가능하여 서버의 DB를 조정할 수 있다.<br/>

### 프론트엔드의 API 호출

```jsx
axios.patch(`${process.env.REACT_APP_API_URL}/logout`);
```

.env파일에 환경변수로 ec2의 ip주소를 등록하여 process.env변수로 프론트엔드에서 벡엔드 서버의 API를 호출할 수 있도록 하였다.<br/>

## REST API

백엔드에서 제공할 CRUD API는 다음과 같은 HTTP Method를 이용한다.

-   Create : POST <br/>
-   Read : GET <br/>
-   Update : PATCH / PUT <br/>
-   Delete : Delete <br/>

```jsx
// 회원가입 api: Create
app.post("/signup", user.signUp);
```

따라서 네모의 꿈은 HTTP URI를 통해 자원의 이름을 명시하고, 자원의 상태를 주고 받는 HTTP Method를 통해서 CRUD를 적용한다. HTTP Method를 이용한 REST API로 JSON 등의 데이터를 프론트엔드와 통신하여 주고 받는다.

## 기술

### 1. 학번 메일인증

```js
await transporter
    .sendMail({
        from: mailAuth_config.user,
        to: studentId + "@sungshin.ac.kr",
        subject: "네모의 꿈 회원가입 인증번호",
        html: mailText,
    })
    .then(() => {
        transporter.close();
    })
    .catch((error) => {
        console.log(error);
        return res.send(errResponse(baseResponse.SEND_MAIL_FAILED));
    });
```

nodemailer를 활용하여 <strong>학번 메일인증</strong>을 구현하였다. 사용자가 회원가입을 위해 학번을 입력하면 성신 도메인으로 6자리의 random number를 발송하였다. 발송한 random number를 변수로 저장하여 사용자가 입력한 값과 일치하는지 확인하는 로직을 구현하였다.<br/>

### 2. 공지 문자메시지 발송

```js
axios({
    method: method,
    json: true,
    url: url,
    headers: {
        "Content-Type": "application/json",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
    },
    data: {
        type: "SMS",
        contentType: "COMM",
        countryCode: "82",
        from: secret_key.MASTER_PHONE,
        content: `${smsContent[0].sms_content}`,
        messages: phones,
    },
});
```

네이버에서 제공하는 simple & easy notification service API를 사용하여 관리자가 작성한 <strong>공지</strong>를 해당 학과의 모든 사용자에게 SMS를 보낼 수 있도록 하였다. 보안을 위해 config/에 관련 설정들을 넣었고 url 호출을 통해 간단하게 메시지를 전송할 수 있었기에 사용하게 되었다.<br/>

### 3. JWT 인증

```js
// jwt middleware: verify
jwt.verify(token, secret_config.jwtsecret, (err, verifiedToken) => {
    if (err) reject(err);
    resolve(verifiedToken);
});

// signin: token 발급
const token = await jwt.sign(
    {
        userid: userid,
    },
    secret_config.jwtsecret, // 비밀키
    {
        expiresIn: "",
        subject: "userid",
    }
);
```

네모의 꿈은 자체적인 회원가입 서비스를 제공하고 있다. 로그인 시 <strong>jwt</strong> 토큰을 발급하고, 헤더로 토큰 값을 전달하도록 한다. jwt middleware를 이용하여 api들을 호출할 때 해당 토큰 값이 유효한지 verify 한다. 이 과정을 통해 서비스에 접근하고 있는 사용자가 서비스를 제공받을 우리 서비스의 사용자인지를 확인하여 접근을 제한한다. <br/>

### 4. 비밀번호 암호화

```
const crypto = require("crypto");

const hashedPassword = await crypto.createHash("").update(password).digest("hex");
```

네모의 꿈은 모든 사용자의 비밀번호를 해시 알고리즘으로 암호화해서 저장하고 있다. cryto의 createHash() 알고리즘을 이용해 회원가입시 사용자가 입력한 비밀번호를 암호화한 상태로 database에 저장한다. 로그인시 사용자가 입력한 비밀번호를 암호화한 값과 database에 저장되어있는 값을 비교해 로그인을 처리한다. <br/>

## 파일 형식

-   baseResponseStatus: res.send로 API의 결과를 반환하는 포멧을 저장하였다. {isSuccess, code, message}로 return 받는 곳에서 isSuccess로는 성공 여부를, code와 message로 어떤 에러가 발생했는지를 확인할 수 있도록 하였다. 주로 modal에서 사용된다. Dao에 작성된 query의 반환값인 result를 함께 사용하기도 한다.<br/>
-   Route: API의 router를 담당
-   Controller: router가 호출하는 함수를 선언, Provider 또는 Service 호출
-   Provider: DB의 read 처리를 담당, Dao 호출
-   Service: DB의 create, update, delete 처리를 담당, Dao 호출
-   Dao: 실제 쿼리를 선언하고 실행하여 DB에 접근

```bash
📦backend
 ┣ 📂.github
 ┃ ┣ 📂ISSUE_TEMPLATE : 이슈별 템플릿
 ┃ ┃ ┣ 📜♻️-refactor.md
 ┃ ┃ ┣ 📜✨-feature.md
 ┃ ┃ ┗ 📜🐞-bug-report.md
 ┃ ┗ 📜pull_request_template.md : 풀 리퀘스트 템플릿
 ┣ 📂config
 ┃ ┣ 📜baseResponseStatus.js: 응답 포멧 정의 {isSuccess, code, message}
 ┃ ┣ 📜express.js
 ┃ ┣ 📜jwtMiddleware.js: 헤더의 토큰을 읽어 사용자 식별
 ┃ ┣ 📜mailAuth.js: 회원가입 메일 인증 설정
 ┃ ┣ 📜response.js: 에러와 일반 response 포멧 정의
 ┃ ┣ 📜secret.js: jwt 토큰 시크릿키
 ┃ ┣ 📜secret_sms.js: SMS 서비스 설정
 ┃ ┗ 📜winston.js
 ┣ 📂src
 ┃ ┗ 📂app
 ┃ ┃ ┣ 📂Nemo
 ┃ ┃ ┃ ┣ 📜nemoController.js : Route에서 호출하는 함수 선언
 ┃ ┃ ┃ ┣ 📜nemoDao.js : DB 쿼리문 정의
 ┃ ┃ ┃ ┣ 📜nemoProvider.js : Dao의 Read 로직 처리
 ┃ ┃ ┃ ┣ 📜nemoRoute.js : Routing 선언
 ┃ ┃ ┃ ┗ 📜nemoService.js : Create, Update, Delete 로직 처리
 ┃ ┃ ┣ 📂Question
 ┃ ┃ ┃ ┣ 📜questionController.js
 ┃ ┃ ┃ ┣ 📜questionDao.js
 ┃ ┃ ┃ ┣ 📜questionProvider.js
 ┃ ┃ ┃ ┣ 📜questionRoute.js
 ┃ ┃ ┃ ┗ 📜questionService.js
 ┃ ┃ ┗ 📂User
 ┃ ┃ ┃ ┣ 📜userController.js
 ┃ ┃ ┃ ┣ 📜userDao.js
 ┃ ┃ ┃ ┣ 📜userProvider.js
 ┃ ┃ ┃ ┣ 📜userRoute.js
 ┃ ┃ ┃ ┗ 📜userService.js
 ┣ 📜.gitignore
 ┣ 📜index.js
 ┣ 📜package.json
 ┗ 📜README.md
```

## ERD

### ERD Cloud

네모의 꿈 서버에 필요한 DB 구조는 다음과 같다.

erd cloud를 이용하여 ERD(Entity Relationship Diagram)를 설계하였다. 테이블 정규화와 auto_increment, cascade 등의 제약조건을 추가하여 DB 설계를 마무리하였다.
