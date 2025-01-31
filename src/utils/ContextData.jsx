import React from "react";
import temple1 from "@/assets/images/temple1.png";
import temple2 from "@/assets/images/temple2.png";
import temple3 from "@/assets/images/temple3.png";
import temple4 from "@/assets/images/temple4.png";
import temple5 from "@/assets/images/temple5.png";
import temple6 from "@/assets/images/temple6.png";

export const temples = [
  {
    id: 1,
    image: temple1,
    name: "SOMNATH",
    crowdData: [
      { label: "TOTAL CROWD", count: 620 },
      { label: "TOTAL IN", count: 750 },
      { label: "TOTAL OUT", count: 820 },
    ],
  },
  {
    id: 2,
    image: temple2,
    name: "SHAMLAJI",
    crowdData: [
      { label: "TOTAL CROWD", count: 620 },
      { label: "TOTAL IN", count: 390 },
      { label: "TOTAL OUT", count: 520 },
    ],
  },
  {
    id: 3,
    image: temple3,
    name: "BAHUCHARAJI",
    crowdData: [
      { label: "TOTAL CROWD", count: 320 },
      { label: "TOTAL IN", count: 950 },
      { label: "TOTAL OUT", count: 230 },
    ],
  },
  {
    id: 4,
    image: temple4,
    name: "GIRNAR",
    crowdData: [
      { label: "TOTAL CROWD", count: 870 },
      { label: "TOTAL IN", count: 536 },
      { label: "TOTAL OUT", count: 398 },
    ],
  },
  {
    id: 5,
    image: temple5,
    name: "PALITANA",
    crowdData: [
      { label: "TOTAL CROWD", count: 983 },
      { label: "TOTAL IN", count: 455 },
      { label: "TOTAL OUT", count: 343 },
    ],
  },
  {
    id: 6,
    image: temple6,
    name: "DAKOR",
    crowdData: [
      { label: "TOTAL CROWD", count: 454 },
      { label: "TOTAL IN", count: 454 },
      { label: "TOTAL OUT", count: 242 },
    ],
  },
];
const ContextData = () => {
  return <div>ContextData</div>;
};

export default ContextData;
