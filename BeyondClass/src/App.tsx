import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Activities }  from "./pages/ParentPage";
import TeacherPage from "./pages/TeacherPage";
import AdminPage from "./pages/AdminPage";


async function mockFetchActivities(student: string, filter: string): Promise<string[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        `Activity for ${student}: Soccer practice`,
        `Activity for ${student}: Math club`,
        `Filtered by: ${filter}`
      ]);
    }, 800)
  );
}


const students = ["Liam Smith", "Emma Johnson", "Noah Davis"];

const fetchActivities = async (student: string, filter: string) => {
  return [
    {
      id: "1",
      title: "Activity 1",
      description: "Description of Activity 1",
      level: 1,
      imageUrl: "/src/assets/activity.jpg"
    },
    {
      id: "2",
      title: "Activity 2",
      description: "Description of Activity 2",
      level: 2,
      imageUrl: "/src/assets/activity.jpg"
    },
    {
      id: "3",
      title: "Activity 3",
      description: "Description of Activity 2",
      level: 2,
      imageUrl: "/src/assets/activity.jpg"
    },
    {
      id: "4",
      title: "Activity 1",
      description: "Description of Activity 1",
      level: 1,
      imageUrl: "/src/assets/activity.jpg"
    },
    {
      id: "5",
      title: "Activity 2",
      description: "Description of Activity 2",
      level: 2,
      imageUrl: "/src/assets/activity.jpg"
    },
    {
      id: "6",
      title: "Activity 3",
      description: "Description of Activity 2",
      level: 2,
      imageUrl: "/src/assets/activity.jpg"
    }
  ];
};


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route
        path="/parent"
        element={
          <Activities
            students={students}
            fetchActivities={fetchActivities}
          />
        }
      />

      
      </Routes>
    </BrowserRouter>
  );
}