import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeft, Loader } from "lucide-react";

const Preview = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      // 🔥 Mock resume data (frontend only)
      setResumeData({
        _id: resumeId,
        title: "Frontend Developer Resume",
        personal_info: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+91 9876543210",
          location: "India",
        },
        professional_summary:
          "Passionate frontend developer with strong experience in building responsive and scalable web applications.",
        experience: [],
        education: [],
        project: [],
        skills: [],
        certification: [],
        template: "classic",
        accent_color: "#3b82f6",
      });

      setIsLoading(false);
    }, 800);
  }, [resumeId]);

  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-center text-6xl text-slate-400 font-medium">
            Resume not found
          </p>
          <a
            href="/"
            className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
          >
            <ArrowLeft className="mr-2 size-4" /> go to home page
          </a>
        </div>
      )}
    </div>
  );
};

export default Preview;
