import React, { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOff,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
  Award,
} from "lucide-react";

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
  // for showing and hiding create resume form
  const [showCreteResume, setShowCreteResume] = useState(false);
  const [showEditResumeTitle, setshowEditResumeTitle] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [titleOfResumeToBeEdited, settitleOfResumeToBeEdited] = useState("");
  const [idOfResumeToBeEdited, setidOfResumeToBeEdited] = useState("");
  // below states are used in resumeBuilder
  const [resumeData, setresumeData] = useState({
    _id: "",
    title: "Untitled Resume",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    certification: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });
  const [activeSectionIndex, setactiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "certification", name: "Certification", icon: Award },
  ];

  const activeSection = sections[activeSectionIndex];
  const [idOfResumeToBeUpdated, setidOfResumeToBeUpdated] = useState();

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

  const getUserByUserId = async () => {
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
      navigate("/login");
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
      setShowCreteResume(false);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      let res = await axios.delete(`${backendUrl}/resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getAllResumesByUserId();
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
    }
  };

  const editResumeTitle = async (e, resumeId, newTitle) => {
    try {
      e.preventDefault();

      let res = await axios.put(
        `${backendUrl}/resume/update-title`,
        { resumeId, title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await getAllResumesByUserId();
      setshowEditResumeTitle(false);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
    }
  };

  const getResumeByResumeId = async (resumeId) => {
    try {
      console.log(token);

      let res = await axios.get(`${backendUrl}/resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setresumeData(res.data.result);
      navigate(`/app/builder/${resumeId}`);
      setidOfResumeToBeEdited(resumeId);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
    }
  };

  const updateResume = async () => {
    try {
      console.log(token);

      let res = await axios.put(
        `${backendUrl}/resume/update`,
        { resumeData, resumeId: idOfResumeToBeEdited, removeBackground },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res.data);
      setresumeData(res.data.resume);
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
    showCreteResume,
    setShowCreteResume,
    showUploadResume,
    setShowUploadResume,
    titleOfResumeToBeEdited,
    settitleOfResumeToBeEdited,
    idOfResumeToBeEdited,
    setidOfResumeToBeEdited,
    showEditResumeTitle,
    setshowEditResumeTitle,
    resumeData,
    setresumeData,
    activeSectionIndex,
    setactiveSectionIndex,
    removeBackground,
    setRemoveBackground,
    sections,
    activeSection,
    idOfResumeToBeUpdated,
    setidOfResumeToBeUpdated,
    handleRegistrationAndLogIn,
    handleLogOut,
    createResume,
    getAllResumesByUserId,
    getUserByUserId,
    deleteResume,
    editResumeTitle,
    updateResume,
    getResumeByResumeId,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
