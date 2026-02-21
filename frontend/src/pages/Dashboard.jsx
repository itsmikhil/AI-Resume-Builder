import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";

const Dashboard = () => {
  let {
    userName,
    token,
    settoken,
    navigate,
    resumeTitle,
    setresumeTitle,
    createResume,
    allResumes,
    setallResumes,
    getUserByUserId,
  } = useContext(DataContext);

  const [showCreteResume, setShowCreteResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const uploadResume = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newResume = {
        _id: Date.now().toString(),
        title,
        updatedAt: new Date(),
      };
      setallResumes([...allResumes, newResume]);
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      setIsLoading(false);
    }, 1000);
  };

  const editTitle = (e) => {
    e.preventDefault();
    setAllResumes(
      allResumes.map((resume) =>
        resume._id === editResumeId ? { ...resume, title } : resume,
      ),
    );
    setTitle("");
    setEditResumeId("");
  };

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

  const deleteResume = (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume",
    );
    if (confirmDelete) {
      setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreteResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes &&
            allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];

              return (
                <div
                  key={resume._id}
                  className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                    borderColor: baseColor + "40",
                  }}
                >
                  <FilePenLineIcon
                    className="size-11 group-hover:scale-105 transition-all px-2 text-center"
                    style={{ color: baseColor }}
                  />

                  <p
                    className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                    style={{ color: baseColor }}
                  >
                    {resume.title}
                  </p>

                  <p
                    className="absolute bottom-1 text-[11px] px-2 text-center"
                    style={{ color: baseColor + "90" }}
                  >
                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-1 right-1 group-hover:flex items-center hidden"
                  >
                    <TrashIcon
                      onClick={() => deleteResume(resume._id)}
                      className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                    />
                    <PencilIcon
                      onClick={() => {
                        setEditResumeId(resume._id);
                        setTitle(resume.title);
                      }}
                      className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Create Modal */}
        {showCreteResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreteResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                onChange={(e) => setresumeTitle(e.target.value)}
                value={resumeTitle}
                type="text"
                placeholder="Enter resume title"
                className="w-full py-2 mb-4 px-4 focus:border-green-600 ring-green-600"
                required
              />
              <button
                onClick={() => createResume}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => setShowCreteResume(false)}
              />
            </div>
          </form>
        )}

        {/* Edit Modal */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full py-2 mb-4 px-4 focus:border-green-600 ring-green-600"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => setEditResumeId("")}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
