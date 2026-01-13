
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  FIXED_CHARGE = 'FIXED_CHARGE'
}

export type Category = 
  | 'Food' | 'Transport' | 'Education' | 'Mobile' | 'Internet' 
  | 'Rent' | 'Utilities' | 'Entertainment' | 'Medical' | 'Personal' | 'Other'
  | 'Family' | 'Salary' | 'Freelance' | 'Scholarship' | 'Coaching';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: Category;
  amount: number;
  date: string; // ISO String
  description: string;
  isFixed?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  dailyBudgetInput?: number;
}

export interface FinanceState {
  user: User | null;
  transactions: Transaction[];
  isAuthenticated: boolean;
}
