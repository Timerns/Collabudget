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

  const groupes: GroupeType[] = [
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
  ]

  return (
      <>
        <MainTitle title={"Tableau de bord"} subtitle={"Bienvenue"}/>
        <Title title={"Vos dépenses"}/>
        TODO graphs
        <Title title={"Groupes"}/>
        <Swiper
            // install Swiper modules
            modules={[Navigation, Scrollbar, A11y]}
            spaceBetween={30}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            loop={true}
            navigation
            hashNavigation={true}
            scrollbar={{ draggable: true }}
        >
          {groupes.map((g, i) => {
            return (
                <SwiperSlide className={"mb-5"}>
                  <Link href={`/app/groupe/${g.id}`} className={"text-center"}>
                    <img src={`/app/groupe/${g.id}.png`}/>
                    <div className={"text-lg"}>{g.name}</div>
                    <div className={"text-xs"}>TODO Dernière modif</div>
                    <div className={"text-xs"}>TODO participants</div>
                  </Link>
                </SwiperSlide>
            )
          })}
        </Swiper>
      </>
  )
}