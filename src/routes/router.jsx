import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import ParentPortal from "../pages/Parent/ParentPortal";
import ParentSidebar from "../pages/Parent/ParentSidebar";
import StudentLogin from "../pages/Student/StudentLogin";
import StudentPage from "../pages/Student/StudentPage";
import StudentSidebar from "../pages/Student/StudentSidebar";
import TeacherPanel from "../pages/Teacher/TeacherPanel";
import TeacherSidebar from "../pages/Teacher/TeacherSidebar";
import About from "../pages/User/About";
import Contact from "../pages/User/Contact";
import Home from "../pages/User/Home";
import NoPage from "../pages/User/NoPage";
import UserProfile from "../pages/User/UserProfile";
import UserRoot from "../pages/User/UserRoot";

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
        path:"/adminn",
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
        path:"student-login",
        element:<StudentLogin/>
    },
    {
        path:"student-page",
        element:<StudentPage/>,
        children:[
            {
                path:"",
                element:<StudentSidebar/>
            }
        ]
    }

]