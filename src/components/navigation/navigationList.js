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
        url: "/reward",
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
        iconJsx: <RiDashboardFill />,
    },
    {
        _id: "2",
        iconJsx: <AiFillFire />,
    },
    {
        _id: "3",
        iconJsx: <AiFillTrophy />,
    },
    {
        _id: "4",
        iconJsx: <FiActivity />,
    },
]

export default navigationList;