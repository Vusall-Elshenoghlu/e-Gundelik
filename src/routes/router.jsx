import { path } from "framer-motion/client";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import ParentPortal from "../pages/Parent/ParentPortal";
import ParentSidebar from "../pages/Parent/ParentSidebar";
import StudentLogin from "../pages/Student/StudentLogin";
import StudentPage from "../pages/Student/StudentPage";
import TeacherPanel from "../pages/Teacher/TeacherPanel";
import TeacherSidebar from "../pages/Teacher/TeacherSidebar";
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

export const ROUTES = [
    {
        path:"",
        element:<UserRoot/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"about",
                element:<About/>
            },
            {
                path:"contact",
                element:<Contact/>
            },
            {
                path:"user-profile",
                element:<UserProfile/>
            },
            {
                path:"*",
                element:<NoPage/>
            },
        ]
    },
    // deyisilecek

    {
        path:"/admin",
        element:<AdminLogin/>

    },
    {
        path:"/admin",
        element:<AdminRoot/>
    },
    {
        path:"/dashboard",
        element:<AdminRoot/>,
        children:[
            {
                path:'',
                element:<AdminDashboard/>
            }
        ]
    },
    {
        path:"teacher-login",
        element:<TeacherLogin/>
    },
    {
        path: "/teacher-panel",
        element:<TeacherPanel/>,
        children:[
            {
                path:"",
                element:<TeacherSidebar/>
            }
        ]
    },
    {
        path:"parent-login",
        element:<ParentLogin/>
    },
    {
        path:"parent-portal",
        element:<ParentPortal/>,
        children:[
            {
                path:"",
                element:<ParentSidebar/>
            }
        ]
    },
    {
        path:"director-login",
        element:<DirectorLogin/>
    },
    {
        path:"student-login",
        element:<StudentLogin/>
    },
    {
        path:"student-page",
        element:<StudentRoot/>,
        children:[
            {
                path:"",
                element:<StudentMenu/>
            },
            {
                path:"diary",
                element:<StudentDiary/>
            },
            {
                path:"lessons",
                element:<StudentLessons/>
            },
            {
                path:"results",
                element:<StudentResults/>
            },

        ]
    }

]