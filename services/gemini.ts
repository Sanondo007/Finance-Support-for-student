
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, TransactionType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (transactions: Transaction[], currentBalance: number) => {
  const summary = transactions.reduce((acc, t) => {
    if (t.type === TransactionType.INCOME) acc.income += t.amount;
    else acc.expense += t.amount;
    return acc;
  }, { income: 0, expense: 0 });

  const prompt = `
    Act as a futuristic, cyberpunk hacker-style financial advisor named 'GRID_OPERATOR'. 
    Analyze the following student finances:
    - Monthly Total Income: ${summary.income}
    - Monthly Total Expenses: ${summary.expense}
    - Remaining Balance: ${currentBalance}
    - Recent Transactions: ${JSON.stringify(transactions.slice(-5))}

    Provide exactly 3 short, sharp, 'dangerously cool' pieces of advice for a low-income student. 
    Use cyberpunk slang like 'chummer', 'credits', 'grid', 'data-nodes'.
    Be realistic but encouraging. 
    Format your response as a JSON array of strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    return JSON.parse(response.text || '["System offline. Check grid connection."]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return ["Failed to breach data-node.", "AI advisor is recalibrating.", "Keep tracking your credits manually."];
  }
};
