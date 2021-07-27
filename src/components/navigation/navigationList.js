import { AiFillFire, AiFillTrophy } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

export const navigationList = [
    {
        _id: "1",
        name: "Dashboard",
        active: true,
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
]

export default navigationList;