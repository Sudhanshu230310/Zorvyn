import { Response, NextFunction } from 'express';
import { RecordService } from '../services/record.service';
import { AuthRequest } from '../middlewares/auth';

export const createRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await RecordService.create(req.body, req.user!.id);
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const getRecords = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await RecordService.findAll(req.query);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const getRecordById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await RecordService.findById(req.params.id as string);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const updateRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const result = await RecordService.update(req.params.id as string, req.body);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await RecordService.delete(req.params.id as string);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};
