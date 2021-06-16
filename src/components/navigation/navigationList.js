import { AiFillHeart , AiFillFire , AiFillTrophy } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

const navigationList = [
    {
        _id : "1",
        name: "Dashboard",
        active: true,
        url : '/dashboard',
        iconJsx: <RiDashboardFill/> ,
    },
    {
        _id : "2",
        name: "Streak",
        active: false,
        url : "/streak",
        iconJsx: <AiFillFire/> ,
    },
    {
        _id : "3",
        name: "Rewards",
        active: false,
        url : "/rewards",
        iconJsx: <AiFillTrophy/> ,
    }, 
]

export default navigationList;