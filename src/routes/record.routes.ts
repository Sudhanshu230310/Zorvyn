import { Router } from 'express';
import { createRecord, getRecords, getRecordById, updateRecord, deleteRecord } from '../controllers/record.controller';
import { protect, requireRole } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { recordSchema, updateRecordSchema } from '../schemas';

const router = Router();

// Protect all routes
router.use(protect);

// Viewer cannot access individual record details and endpoints here.
// Analyst can view all records.
// Admin can do full CRUD.

router.get('/', requireRole('ANALYST', 'ADMIN'), getRecords);
router.get('/:id', requireRole('ANALYST', 'ADMIN'), getRecordById);

// Admin-only endpoints
router.post('/', requireRole('ADMIN'), validate(recordSchema), createRecord);
router.put('/:id', requireRole('ADMIN'), validate(updateRecordSchema), updateRecord);
router.delete('/:id', requireRole('ADMIN'), deleteRecord);

export default router;
