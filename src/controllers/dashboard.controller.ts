import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';

export const getDashboardSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DashboardService.getSummary(req.query);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};
