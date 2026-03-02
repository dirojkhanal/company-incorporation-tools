import {
  ApiResponse,
  Company,
  CreateCompanyPayload,
  ShareholderInput,
  UpdateCompanyPayload,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const createCompany = (payload: CreateCompanyPayload) =>
  request<Company>("/companies", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateCompany = (id: string, payload: UpdateCompanyPayload) =>
  request<Company>(`/companies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const getCompanyById = (id: string) =>
  request<Company>(`/companies/${id}`);

export const getAllCompanies = () => request<Company[]>("/companies");

export const saveShareholders = (
  companyId: string,
  shareholders: ShareholderInput[]
) =>
  request(`/companies/${companyId}/shareholders/bulk`, {
    method: "POST",
    body: JSON.stringify({ shareholders }),
  });