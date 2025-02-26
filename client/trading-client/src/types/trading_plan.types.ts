export interface TradingPlan {
    id?: number;
    day: number;
    account_balance: number;
    daily_target: number;
    required_lots: number;
    rounded_lots: number;
    risk_usd: number;
    risk_percentage: number;
    stop_loss_pips: number;
    take_profit_pips: number;
    status?: string;
    reason?: string;
    user_id?: number;
}

export type TradingPlanCreate = Omit<TradingPlan, 'id' | 'user_id'>;

export type TradingPlanUpdate = {
    status: string;
};
