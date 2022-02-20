import React from 'react';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as BiIcons from "react-icons/bi"
export const SidebarData = [{
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
},
{
    title: "Posts",
    path: "/view_posts",
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
},
{
    title: "Comments",
    path: "/view_comments",
    icon: <AiIcons.AiOutlineComment />,
    cName: 'nav-text'
},
{
    title: "Categories",
    path: "/view_categories",
    icon: <BiIcons.BiCategoryAlt />,
    cName: 'nav-text'
},

{
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
},
{
    title: "ManageDocs",
    path: "/view_delegates",
    icon: <IoIcons.IoMdPaper />,
    cName: 'nav-text'
},
{
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
},

]