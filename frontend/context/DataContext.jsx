import React, { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/api`;
  const navigate = useNavigate();
  const [state, setState] = useState("login");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [token, settoken] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [resumeTitle, setresumeTitle] = useState("");
  const [allResumes, setallResumes] = useState([]);

  let handleRegistrationAndLogIn = async (e) => {
    e.preventDefault();
    if (state == "login") {
      try {
        console.log(`${backendUrl}/user/signin`);

        let res = await axios.post(`${backendUrl}/user/signin`, {
          email: userEmail,
          password: userPassword,
        });

        if (res.data.success) {
          setisLoggedIn(true);
          setuserName(res.data.user.name);
          settoken(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/app");
        }
      } catch (error) {
        console.log(error.res?.data);
      }
    } else if (state == "register") {
      try {
        console.log(`${backendUrl}/user/signin`);

        let res = await axios.post(`${backendUrl}/user/register`, {
          email: userEmail,
          name: userName,
          password: userPassword,
        });
        console.log(res.data);

        if (res.data.success) {
          setisLoggedIn(true);
          setuserName(res.data.user.name);
          settoken(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/app");
        }
      } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);
      }
    }
  };

  const handleLogOut = async () => {
    localStorage.removeItem("token");
    setisLoggedIn(false);
    settoken("");
    setuserEmail("");
    setuserPassword("");
    setuserName("");
    navigate("/");
  };

  const getUserByUserId = async (req, res) => {
    try {
      let res = await axios.get(`${backendUrl}/user/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setuserEmail(res.data.user.email);
      setuserName(res.data.user.name);
      setuserPassword(res.data.user.password);
      setisLoggedIn(true);
      getAllResumesByUserId();
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
    }
  };

  const getAllResumesByUserId = async (req, res) => {
    try {
      let res = await axios.get(`${backendUrl}/user/getResumes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setallResumes(res?.data?.resumes);
    } catch (error) {
      navigate("/login");
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      let res = await axios.post(
        `${backendUrl}/resume/create`,
        { title: resumeTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      getAllResumesByUserId();
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
    }
  };

  const value = {
    navigate,
    state,
    setState,
    token,
    settoken,
    userEmail,
    setuserEmail,
    userName,
    setuserName,
    userPassword,
    setuserPassword,
    resumeTitle,
    setresumeTitle,
    allResumes,
    setallResumes,
    handleRegistrationAndLogIn,
    handleLogOut,
    createResume,
    getAllResumesByUserId,
    getUserByUserId,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
