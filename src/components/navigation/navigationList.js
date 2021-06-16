import { AiFillHeart , AiFillFire , AiFillTrophy } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

const navigationList = [
    {
        _id : "1",
        name: "Dashboard",
        active: true,
        iconJsx: <RiDashboardFill/> ,
    },
    {
        _id : "2",
        name: "Streak",
        active: false,
        iconJsx: <AiFillFire/> ,
    },
    {
        _id : "3",
        name: "Rewards",
        active: false,
        iconJsx: <AiFillTrophy/> ,
    }, 
]

export default navigationList;