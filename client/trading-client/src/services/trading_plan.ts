import { fetchWithAuth } from "./api";
import { TradingPlan, TradingPlanCreate, TradingPlanUpdate } from "@/types/trading_plan.types";

export const tradingPlanApi = {
    create: async (plan: TradingPlanCreate): Promise<TradingPlan> => {
        const response = await fetchWithAuth('/trading-plan/create', {
            method: 'POST',
            body: JSON.stringify(plan)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create trading plan');
        }

        const data = await response.json();
        return data.plan;
    },

    getPlans: async (): Promise<TradingPlan[]> => {
        const response = await fetchWithAuth('/trading-plan/get');

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to fetch trading plans');
        }

        return await response.json();
    },

    updateStatus: async (planId: number, update: TradingPlanUpdate): Promise<TradingPlan> => {
        const response = await fetchWithAuth(`/trading-plan/${planId}/status`, {
            method: 'PATCH',
            body: JSON.stringify(update)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to update trading plan status');
        }

        return await response.json();
    }
};
