// User types
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified: boolean;
  last_login_at: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: UserProfile;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

// Finance Category types
export interface FinanceCategory {
  ID: number;
  id?: number; // alias for backwards compat
  user_id: number;
  name: string;
  type: 'income' | 'expense';
  description: string;
  color: string;
  icon: string;
  is_active: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

export interface CreateCategoryRequest {
  name: string;
  type: 'income' | 'expense';
  description?: string;
  color?: string;
  icon?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  type?: 'income' | 'expense';
  description?: string;
  color?: string;
  icon?: string;
  is_active?: boolean;
}

// Finance Journal types
export interface FinanceJournal {
  ID: number;
  id?: number; // alias
  user_id: number;
  category_id: number;
  type: 'income' | 'expense';
  amount: number;
  title: string;
  description: string;
  date: string;
  payment_method: string;
  location: string;
  is_recurring: boolean;
  receipt_url: string;
  category?: FinanceCategory;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

export interface CreateJournalRequest {
  category_id: number;
  amount: number;
  title: string;
  description?: string;
  date?: string;
  payment_method?: string;
  location?: string;
  is_recurring?: boolean;
  receipt_url?: string;
}

export interface UpdateJournalRequest {
  category_id?: number;
  amount?: number;
  title?: string;
  description?: string;
  date?: string;
  payment_method?: string;
  location?: string;
  is_recurring?: boolean;
  receipt_url?: string;
}

export interface JournalListResponse {
  journals: FinanceJournal[];
  page: number;
  page_size: number;
  total_count: number;
}

export interface JournalFilters {
  start_date?: string;
  end_date?: string;
  category_id?: number;
  type?: 'income' | 'expense';
  page?: number;
  page_size?: number;
}

export interface JournalSummary {
  total_income: number;
  total_expense: number;
  net_balance: number;
  entry_count: number;
  start_date: string;
  end_date: string;
}

// API Key types
export interface APIKey {
  id: number;
  name: string;
  key: string;
  expires_at: string;
  is_active: boolean;
  last_used_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAPIKeyRequest {
  name: string;
  expires_at?: string;
}

export interface APIKeyResponse {
  id: number;
  name: string;
  key: string;
  expires_at: string;
  created_at: string;
}

// API Response types
export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

// Workout types (placeholder)
export interface Workout {
  id: number;
  name: string;
  type: string;
  duration: number; // in minutes
  calories_burned: number;
  date: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

// Food types (placeholder)
export interface FoodEntry {
  id: number;
  name: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

export interface DailyNutrition {
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  entries: FoodEntry[];
}
