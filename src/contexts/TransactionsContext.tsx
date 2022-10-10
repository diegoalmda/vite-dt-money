import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface TransactionProps {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: TransactionProps[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext({} as TransactionContextType);

function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  
  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])
  
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      { children }
    </TransactionsContext.Provider>
  )
}

function useTransactions() {
  const transactions = useContext(TransactionsContext);

  return transactions;
}

export { TransactionsProvider, useTransactions }