import { path } from "framer-motion/client";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import StudentLogin from "../pages/Student/StudentLogin";
import StudentPage from "../pages/Student/StudentPage";
import About from "../pages/User/About";
import Contact from "../pages/User/Contact";
import Home from "../pages/User/Home";
import NoPage from "../pages/User/NoPage";
import UserProfile from "../pages/User/UserProfile";
import UserRoot from "../pages/User/UserRoot";
import TeacherLogin from "../pages/Teacher/TeacherLogin";
import ParentLogin from "../pages/Parent/ParentLogin";
import DirectorLogin from "../pages/Director/DirectorLogin";
import StudentRoot from "../pages/Student/StudentRoot";
import StudentMenu from "../pages/Student/StudentMenu";
import StudentDiary from "../pages/Student/StudentDiary";
import StudentLessons from "../pages/Student/StudentLessons";
import StudentResults from "../pages/Student/StudentResults";
import AdminTeachers from "../pages/Admin/AdminTeachers";
import AddTeacher from "../pages/Admin/AddTeacher";
import Parents from "../pages/Admin/Parents";
import AddParent from "../pages/Admin/AddParent";
import Director from "../pages/Admin/Director";
import Students from "../pages/Admin/Students";
import AddStudent from "../pages/Admin/AddStudent";
import Subjects from "../pages/Admin/Subjects";
import AddSubjects from "../pages/Admin/AddSubject";
import AddSubject from "../pages/Admin/AddSubject";
import Classes from "../pages/Admin/Classes";
import AddClass from "../pages/Admin/AddClass";
import AddBook from "../pages/Admin/AddBook";
import Books from "../pages/Admin/Books";
import ParentRoot from "../pages/Parent/ParentRoot";
import ParentMenu from "../pages/Parent/ParentMenu";
import ParentDiary from "../pages/Parent/ParentDiary";
import TeacherRoot from "../pages/Teacher/TeacherRoot";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import TeacherDiary from "../pages/Teacher/TeacherDiary";
import Lessons from "../pages/Teacher/Lessons";
import AddLesson from "../pages/Teacher/AddLesson";
import TeachersStudents from "../pages/Teacher/TeachersStudents";
import ForgotPassword from "../pages/Teacher/ForgotPassword";
import UpdatePassword from "../pages/Teacher/UpdatePassword";
import MemoryCardGame from "../components/User/MemoryCardGame";
import ViewLesson from "../pages/Teacher/ViewLesson";
import ResetPassword from "../pages/Teacher/ResetPassword";
import EditProfile from "../pages/Teacher/EditProfile";

export const ROUTES = [
    {
        path: "",
        element: <UserRoot />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "user-profile",
                element: <UserProfile />
            },

        ]
    },
    // deyisilecek

    {
        path: "/admin",
        element: <AdminLogin />

    },
    {
        path: "/admin-panel",
        element: <AdminRoot />,
        children: [
            {
                path: "",
                element: <AdminDashboard />
            },
            {
                path: "teachers",
                element: <AdminTeachers />
            },
            {
                path: "add-teacher",
                element: <AddTeacher />
            },
            {
                path: "parents",
                element: <Parents />
            },
            {
                path: "add-parent",
                element: <AddParent />
            },
            {
                path: "director",
                element: <Director />
            },
            {
                path: "students",
                element: <Students />
            },
            {
                path: "add-student",
                element: <AddStudent />
            },
            {
                path: "subjects",
                element: <Subjects />
            },
            {
                path: "add-subject",
                element: <AddSubject />
            },
            {
                path: "classes",
                element: <Classes />
            },
            {
                path: "add-class",
                element: <AddClass />
            },
            {
                path: "books",
                element: <Books />
            },
            {
                path: "add-book",
                element: <AddBook />
            },

        ]
    },
    {
        path: "teacher-login",
        element: <TeacherLogin />
    },
    {
        path: "/teacher-panel",
        element: <TeacherRoot />,
        children: [
            {
                path: "",
                element: <TeacherDashboard />
            },
            {
                path: "diary",
                element: <TeacherDiary />
            },
            {
                path: "my-lessons",
                element: <ViewLesson />
            },
            {
                path: "add-lesson",
                element: <AddLesson />
            },
            {
                path: "students",
                element: <TeachersStudents />
            },
            {
                path: "edit-profile",
                element: <EditProfile />
            },
        ]
    },
    {
        path: "parent-login",
        element: <ParentLogin />
    },
    {
        path: "parent-portal",
        element: <ParentRoot />,
        children: [
            {
                path: "",
                element: <ParentMenu />
            },
            {
                path: "diary",
                element: <ParentDiary />
            },
            // {
            //     path:"lessons",
            //     element:<ParentLessons/>
            // },
            // {
            //     path:"results",
            //     element:<ParentResults/>
            // },

        ]
    },
    {
        path: "director-login",
        element: <DirectorLogin />
    },
    {
        path: "student-login",
        element: <StudentLogin />
    },
    {
        path: "student-page",
        element: <StudentRoot />,
        children: [
            {
                path: "",
                element: <StudentMenu />
            },
            {
                path: "diary",
                element: <StudentDiary />
            },
            {
                path: "lessons",
                element: <StudentLessons />
            },
            {
                path: "results",
                element: <StudentResults />
            },

        ]
    },
    {
        path: "*",
        element: <NoPage />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/reset-password",
        element: <ResetPassword />
    },
    {
        path: "/update-password",
        element: <UpdatePassword />
    },
    {
        path: "/card-game",
        element: <MemoryCardGame />
    },

]