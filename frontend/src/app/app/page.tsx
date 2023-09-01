"use client"

import MainTitle from "@/app/components/mainTitle";
import Title from "@/app/components/title";
import GroupeType from "@/app/types/groupeType";

import {A11y, Navigation, Scrollbar} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Link from "next/link";
import TransactionType from "@/app/types/transactionType";
import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import DepenseTooltip from "@/app/components/depenseTooltip";
import LabelType from "@/app/types/labelType";

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
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
    new GroupeType(1, "Vacances 2023", "CHF", 1, []),
  ]

  let transactions: TransactionType[] = [];

  let curDate = new Date();

  // @ts-ignore
  for (const x of Array(100).keys()) {
    curDate.setFullYear(2023, 8, Math.floor(Math.random() * 30) + 1)
    transactions.push(new TransactionType(
        "Dépense",
        (Math.random() > 0.5 ? -1 : +1) * Math.floor(Math.random() * (70 - 20 + 1) + 20),
        curDate,
        Math.random() < 0.25 || Math.random().valueOf() > 0.75 ? new LabelType("Oui", "#FF00FF") : new LabelType("Non", "#FF0")));
  }

  let result: any[] = [];
  transactions.reduce(function (res, value) {
    // @ts-ignore
    if (!res[value.label?.title]) {
      // @ts-ignore
      res[value.label?.title] = {name: value.label?.title, value: 0, color: value.label?.color};
      // @ts-ignore
      result.push(res[value.label?.title])
    }
    // @ts-ignore
    res[value.label?.title].value += value.montant;
    return res;
  }, {});

  return (
      <>
        <MainTitle title={"Tableau de bord"} subtitle={"Bienvenue"}/>
        <Title title={"Vos dépenses"}/>
        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
          <div className={"col-span-1"}>
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart data={transactions}>
                <CartesianGrid/>
                <XAxis dataKey={"date"}/>
                <YAxis dataKey={"montant"}/>
                <Tooltip labelClassName={"text-secondary"} label={"name"} content={<DepenseTooltip/>}/>
                <Bar dataKey="montant">
                  {/* We have to map values in order to get the correct color depending on the amount... */}
                  {
                    transactions.map((t, index) => (
                        <Cell key={`cell-${index}`} fill={t.montant < 0 ? "#46D2A0" : "#F14668"}/>
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>

          </div>
          <div className={"col-span-1"}>
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart width={700} height={300} data={result}>
                <CartesianGrid/>
                <XAxis dataKey={"name"}/>
                <YAxis dataKey={"value"}/>
                <Bar dataKey={"value"}>
                  {result.map((r, index) => {
                    return (
                        <Cell key={`cell-${index}`} fill={r.color}/>
                    )
                  })}
                </Bar>
                <Tooltip labelClassName={"text-secondary"}/>
              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>
        <Title title={"Groupes"}/>
        <Swiper
            // install Swiper modules
            modules={[Navigation, Scrollbar, A11y]}
            spaceBetween={30}
            breakpoints={{
              0: {
                slidesPerView: 2.3,
              },
              640: {
                slidesPerView: 3.3,
              },
              1024: {
                slidesPerView: 4.3,
              },
              1280: {
                slidesPerView: 5,
              },
            }}
            loop={true}
            centeredSlidesBounds={true}
            navigation
            scrollbar={{draggable: true}}
        >
          {groupes.map((g) => {
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