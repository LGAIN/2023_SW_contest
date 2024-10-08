import "./Signin.css";
import React, { useEffect } from "react";
import logo from "../../assets/images/nemo_logo.png";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { lockerInfoAtom, userAtom } from "../../recoil/locker/atom";
import { userjwtAtom } from "../../recoil/user/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

export default function Signin() {
  const [user, setUser] = useRecoilState(userAtom);
  const [userjwt, setUserjwt] = useRecoilState(userjwtAtom);
  const [userId, setUserId] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const navigate = useNavigate();

  const setLockerInfo = useSetRecoilState(lockerInfoAtom);

  function goSignUp() {
    navigate("/signup");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const signInResponse = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, { id: userId, password: userPassword });

      const data = signInResponse.data;

      if (data.isSuccess) {
        Swal.fire("성공", "로그인이 완료되었습니다.", "success");
        setUserjwt(data.result.jwt);
        const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/app/user`, {
          headers: {
            "nemo-access-token": data.result.jwt,
          },
        });
        setUser(userRes.data.result);
        const lockersInfoResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/nemo/lockers-info?department=${userRes.data.result.department}`
        );
        if (lockersInfoResponse.data.isSuccess) {
          setLockerInfo(lockersInfoResponse.data.result);
          navigate("/locker");
        } else {
          if (userRes.data.result.permission === 1) {
            setLockerInfo({ location: "", deposit: 0, row: 0, col: 0, order: "" });
            navigate("/lockerinfo");
          } else {
            setUserjwt(null);
            navigate("/signin");
            Swal.fire("실패", "학과의 사물함이 존재하지 않습니다. 관리자에게 문의해주십시오", "error");
          }
        }
      } else {
        Swal.fire("에러", data.message, "error");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }

  function handleUserId(event) {
    setUserId(event.target.value);
  }

  function handleUserPassword(event) {
    setUserPassword(event.target.value);
  }

  function validateForm() {
    return userId.length > 0 && userPassword.length > 0;
  }

  return (
    <>
      <div className="Signin">
        <Helmet>
          <title>로그인 - 네모의 꿈</title>
        </Helmet>
        <Form className="signin_class" onSubmit={handleSubmit}>
          <img src={logo} alt="logo" width="450" height="250" />
          <div className="id">
            <Form.Label>학번</Form.Label>
            <input className="input_id" type="text" value={userId} onChange={handleUserId} />
          </div>

          <div className="password">
            <Form.Group controlId="userPassword">
              <Form.Label>비밀번호</Form.Label>
              <input className="input_password" type="password" value={userPassword} onChange={handleUserPassword} />
            </Form.Group>
          </div>
          <div className="buttons">
            <div className="signup_button">
              <button className="white_button" type="reset" onClick={goSignUp}>
                회원가입
              </button>
            </div>
            <div className="login_button">
              <button className="submit_login_button" type="submit" disabled={!validateForm()}>
                로그인
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
