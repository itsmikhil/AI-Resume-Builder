import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import CertificationForm from "../components/CertificationForm";
import { DataContext } from "../../context/DataContext";

const ResumeBuilder = () => {
  let {
    token,
    settoken,
    navigate,
    resumeData,
    setresumeData,
    activeSectionIndex,
    setactiveSectionIndex,
    removeBackground,
    setRemoveBackground,
    savedResume,
    setsavedResume,
    sections,
    activeSection,
    updateResume,
    getUserByUserId,
  } = useContext(DataContext);

  const changeResumeVisibility = () => {
    setresumeData((prev) => ({
      ...prev,
      public: !prev.public,
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        url: window.location.href,
        text: "My Resume",
      });
    } else {
      alert("Share not supported on this browser.");
    }
  };
  useEffect(() => {
    console.log(resumeData);
  }, [resumeData]);

  const downloadResume = () => {
    window.print();
  };

  useEffect(() => {
    document.title = resumeData.title;
  }, [resumeData.title]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      navigate("/login");
    } else {
      settoken(storedToken);
    }
  }, []);

  // a seperate use effect becuase if i was calling function immediately after setting then it was
  // showing to login again
  // but this way function is called as soon as token is set
  useEffect(() => {
    if (token) {
      getUserByUserId();
    }
  }, [token]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          onClick={async () => {
            await updateResume();
          }}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="relative lg:col-span-5 rounded-lg">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-3 mt-6">
                <div className="flex items-center gap-3">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setresumeData((prev) => ({ ...prev, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setresumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setactiveSectionIndex((prev) => Math.max(prev - 1, 0))
                      }
                      className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={async () => {
                      await updateResume();
                      setactiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1),
                      );
                    }}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition 
                    }`}
                  >
                    {activeSectionIndex === sections.length - 1
                      ? "Finish"
                      : "Next"}
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setresumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setresumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setresumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setresumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setresumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setresumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "certification" && (
                  <CertificationForm
                    data={resumeData.certification}
                    onChange={(data) =>
                      setresumeData((prev) => ({
                        ...prev,
                        certification: data,
                      }))
                    }
                  />
                )}
              </div>

              <button
                onClick={updateResume}
                className="bg-gradient-to-r from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition rounded-md px-6 py-2 mt-6 text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}

                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                <button
                  onClick={downloadResume}
                  className="flex items-center p-2 px-6 gap-2 text-xs bg-gradient-to-r from-green-100 to-green-200 text-green-600 ring-green-300 rounded-lg hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
