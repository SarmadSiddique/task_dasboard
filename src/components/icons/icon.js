import { Box, Disc, Home, Layers } from "react-feather";
import blog1 from "../assets/blog/01.jpg";
import blog9 from "../assets/blog/01.jpg";
import blog2 from "../assets/blog/02.jpg";
import blog3 from "../assets/blog/03.jpg";
import blog4 from "../assets/blog/04.jpg";
import blog5 from "../assets/blog/05.jpg";
import blog6 from "../assets/blog/06.jpg";
import blog7 from "../assets/blog/07.jpg";
import blog8 from "../assets/blog/08.jpg";
import bgMobile from "../assets/png/Visuals.png";
import access_1 from "../assets/svg/access_1.svg";
import access_2 from "../assets/svg/access_2.svg";
import mosque from "../assets/svg/mosque.svg";
import one from "../assets/svg/1.svg";
import hands from "../assets/png/hands.png";
import profile1 from "../assets/png/profile1.png";
import profile2 from "../assets/png/profile2.png";
import rating from "../assets/png/rating.png";
import mockup from "../assets/png/Mockup.png";
import social1 from "../assets/png/social1.png";
import social2 from "../assets/png/social2.png";
import mail_ from "../assets/png/mail_.png";
import tik_tok from "../assets/png/tik_tok.png";
import x from "../assets/png/x.png";
import contact_ from "../assets/png/contact_.png";
import Loc_ from "../assets/png/Loc_.png";
import facebook from "../assets/png/fb_zikr.png";















import two from "../assets/svg/2.svg";
import four from "../assets/svg/4.svg";

const menuItems = [
  {
    icon: <Home size={20} />,
    label: "Home",
    path: "/",
    exact: true,
  },
  {
    label: "Patient",
    icon: <Box size={20} />,
    submenu: [
      {
        label: "Patient List",
        path: "/list-patient",
        icon: <Disc size={20} />,
        exact: false,
      },
      {
        label: "Checked Patient",
        path: "/checked-patient",
        icon: <Disc size={20} />,
        exact: false,
      },
    ],
  },
  {
    label: "Patient Info",
    icon: <Layers size={20} />,
    submenu: [
      {
        label: "Manage Patient",
        icon: <Disc size={20} />,
        path: "/manage-patient",
        exact: false,
      },
    ],
  },
];

export {
  blog1,
  one,
  mail_,
  tik_tok,
  x,
  contact_,
  Loc_,
  facebook,
  two,
  four,
  blog9,
  blog2,
  profile1,
  rating,
  profile2,
  blog3,
  mockup,
  blog4,
  social1,
  social2,
  hands,
  blog5,
  mosque,
  blog6,
  access_1,
  access_2,
  blog7,
  blog8,
  menuItems,
  bgMobile,
};
