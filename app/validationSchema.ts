import  { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title should be within 100 characters'),
  description: z.string().min(1, 'Description is required'),
})