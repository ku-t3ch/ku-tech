export interface BudgetResponseInterface {
    [key: string]: any
    remaining_budget: number
    budget_all: number
    expenses_all: number
    budget_from_income: number
    budget_from_subsidize: number
    expenses_from_income: number
    expanses_from_subsidize: number
    refund: number
    budget_list_from_income: BudgetListFromIncome[]
    budget_list_form_subsidize: BudgetListFormSubsidize[]
    expenses_list_from_income: ExpensesListFromIncome[]
    expenses_list_from_subsidize: ExpensesListFromSubsidize[]
    refund_list: RefundList[]
  }
  
  export interface BudgetListFromIncome {
    name: string
    amount: number
  }
  
  export interface BudgetListFormSubsidize {
    name: string
    amount: number
  }
  
  export interface ExpensesListFromIncome {
    name: string
    amount: number
  }
  
  export interface ExpensesListFromSubsidize {
    name: string
    amount: number
  }
  
  export interface RefundList {
    name: string
    amount: number
  }
  