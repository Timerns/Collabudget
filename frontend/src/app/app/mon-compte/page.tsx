"use client"

import MainTitle from "@/app/components/mainTitle";
import Title from "@/app/components/title";
import GroupeType from "@/app/types/groupeType";

import { Navigation, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Link from "next/link";


export default function Page() {

  return (
      <>
        <MainTitle title={"Mon compte"} subtitle={"Bienvenue"}/>
        <Title title={"Vos paramètres"}/>
        Votre devise : CHF
      </>
  )
}