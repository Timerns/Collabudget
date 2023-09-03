import { request } from "./database";

export function getStatus() {  
  return request<string | null>("/api/status", "GET");
}