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
import {Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import DepenseTooltip from "@/app/components/depenseTooltip";
import LabelType from "@/app/types/labelType";
import { useEffect, useState } from "react";
import { request } from "../utils/database";
import { toast } from "react-toastify";
import LabelTooltip from "../components/labelTooltip";
import SoldeType from "../types/soldeType";

export default function Page() {
  type Data = {
    groups: GroupeType[],
    transactions: TransactionType[],
    labels: [LabelType[], any]
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<Data>({
    groups: [],
    transactions: [],
    labels: [[], {}]
  });

  useEffect(() => {
    const fetchData = async () => {
      let groups = await request<GroupeType[]>("/api/groups", "GET");

      for (let i = 0; i < groups.length; ++i) {
        groups[i].soldes = await request<SoldeType[]>("/api/groups/solde", "POST", { groupId: groups[i].id });
      }

      let transactions = await request<TransactionType[]>("/api/transactions", "GET");
      transactions = transactions.map(v => {
        v.date = new Date(v.date);
        return v;
      });
      let labels = await request<LabelType[]>("/api/labels", "GET");

      let result: any = {};
      transactions.forEach(function (value) {
        if (value.GroupId) {

        }
        var label: {id: string, name: string, color: string} = (value.GroupId !== null ? {id: "g" + value.GroupId, name: groups.find(g => g.id === parseInt(value.GroupId as string))?.name, color: "#FF9B05"} : (labels.find(p => p.id.toString() == (value.LabelId ?? "")) as any ?? { id: -1, name: "Aucun label", color: "#000000" }));
        if (!result[label.id]) {
          result[label.id] = {label: label, value: Number(value.value)};
        } else {
          result[label.id].value += Number(value.value);
        }
      }, {});

      setData({
        groups: groups, 
        transactions: transactions, 
        labels: [labels, result]
      });
      setIsLoaded(true);
    }

    fetchData()
      .catch(e => toast.error(e));
  }, []);

  const showUsers = (users: string[]) => {
    var str = "";

    var usersCopy = users;
    if (usersCopy.length > 2) {
      usersCopy = [usersCopy[0], usersCopy[1]];
    }

    str += usersCopy.join(", ");

    if (users.length >= 3) {
      str += " et " + (users.length === 3 ? "1 autre" : (users.length - 2) + " autres");
    }

    return str;
  }

  return (
    <>
      <MainTitle title={"Tableau de bord"} subtitle={"Bienvenue"}/>
      <Title title={"Vos dépenses"}/>
      <div className={"grid grid-cols-1 lg:grid-cols-2"}>
        <div className={"col-span-1"}>
          {
            !isLoaded && <p>Chargement...</p>
          }
          {
            isLoaded &&
            data.transactions.length === 0 ?
            (<p>Aucune transaction</p>) : 
            (
              <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={data.transactions}>
                  <CartesianGrid/>
                  <XAxis dataKey={"date"} tickFormatter={d => new Date(d).toLocaleDateString()}/>
                  <YAxis dataKey={"value"}/>
                  <Tooltip labelClassName={"text-secondary"} content={<DepenseTooltip/>}/>
                  <Bar dataKey="value">
                    {/* We have to map values in order to get the correct color depending on the amount... */}
                    {
                      data.transactions.map((t, index) => (
                        <Cell key={`cell-${index}`} fill={t.value < 0 ? "#46D2A0" : "#F14668"}/>
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )
          }
        </div>
        <div className={"col-span-1"}>
          {
            !isLoaded && <p>Chargement...</p>
          }
          {
            isLoaded &&
            Object.keys(data.labels[1]).length === 0 ? 
            (<p>Aucune transaction</p>) : 
            (
              <ResponsiveContainer width={"100%"} height={300}>
                <PieChart width={700} height={300}>
                  <Tooltip labelClassName={"text-secondary"} content={<LabelTooltip/>}/>
                  <Pie data={Object.entries(data.labels[1]).map(([a, b]) => b)} dataKey="value">
                    {Object.keys(data.labels[1]).map((r) => {
                      return (
                        <Cell key={`cell-${r}`} fill={data.labels[1][r].label.color} />
                      )
                    })}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )
          }
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
          loop={false}
          centeredSlidesBounds={false}
          navigation
          scrollbar={{draggable: true}}
      >
        {
          !isLoaded && <p>Chargement...</p>
        }
        {
          isLoaded && 
          data.groups.length === 0 ? 
            (<p>Aucun groupe</p>) : 
            (data.groups.map((g) => {
              return (
                <SwiperSlide className={"mb-5"} key={`ss-${g.id}`}>
                  <Link href={`/app/groupe/${g.id}`} className={"text-center"}>
                    <img src={g.image}/>
                    <div className={"text-lg"}>{g.name}</div>
                    <div className={"text-xs"}>{g.description || "Pas de description"}</div>
                    <div className={"text-xs"}>{showUsers(g.soldes.map(s => s.UserUsername)) || "Personne dans ce groupe"}</div>
                  </Link>
                </SwiperSlide>
              )
            }))
        }
      </Swiper>
    </>
  )
}