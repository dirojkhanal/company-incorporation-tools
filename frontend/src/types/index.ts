export interface Shareholder {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  nationality: string;
}

export interface Company {
  id: string;
  name: string;
  shareholders_count: number;
  total_capital: number;
  status: "draft" | "completed";
  created_at: string;
  updated_at: string;
  shareholders: Shareholder[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CreateCompanyPayload {
  name: string;
  shareholders_count: number;
  total_capital: number;
}

export interface UpdateCompanyPayload {
  name?: string;
  shareholders_count?: number;
  total_capital?: number;
  status?: "draft" | "completed";
}

export interface ShareholderInput {
  first_name: string;
  last_name: string;
  nationality: string;
}