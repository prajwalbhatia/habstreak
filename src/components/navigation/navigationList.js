import { AiFillFire, AiFillTrophy } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { FiActivity } from "react-icons/fi";


export const navigationList = [
    {
        _id: "1",
        name: "Dashboard",
        active: false,
        url: '/dashboard',
    },
    {
        _id: "2",
        name: "Streak",
        active: false,
        url: "/streak-list",
    },
    {
        _id: "3",
        name: "Rewards",
        active: false,
        url: "/reward-list",
    },
    {
        _id: "4",
        name: "Activities",
        active: false,
        url: "/recent-activities",
    },
]

export const navigationIcons = [
    {
        _id: "1",
        iconClass: 'icon-home',
    },
    {
        _id: "2",
        iconClass: 'icon-streak',
    },
    {
        _id: "3",
        iconClass: 'icon-reward',
    },
    {
        _id: "4",
        iconClass: 'icon-activity',
    },
]

export default navigationList;