import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Bootcamp',
    path: '/overview',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Show bootcamps',
        path: '/bootcamps',
     
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Add Bootcamp',
        path: '/addBootcamps',
     
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Single Bootcamp',
        path: '/singleBootcamp',
   
        icon: <IoIcons.IoIosPaper />
      }
     
    ]
  },
  {
    title: 'courses',
    path: '/addCourse',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add courses',
        path: '/addCourse',
       
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
      
    ]
  }
  
];
