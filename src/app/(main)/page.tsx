import myImage from "@/assists/myProfile.png"
import Image from "next/image";
import Home from "./Home";
import Home2 from "./Home2";
import Profile from "./Profile";

export default function Page() {
    return (
       <div>
        {/* <Home></Home> */}
        {/* <Home2></Home2> */}
        <Profile></Profile>
       </div>
    );
}