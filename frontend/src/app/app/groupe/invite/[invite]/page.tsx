"use client"
import { request } from "@/app/utils/database";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Page({params}: { params: { invite: string } }) {
  
  useEffect(() => {
    const fetchData = async () => {
      const invitation = await request<number>("/api/groups/invite/" + params.invite, "GET");
      window.location.href = "/app/groupe/" + invitation;
    }

    fetchData()
      .catch(e => toast.error(e));
  }, [])
}