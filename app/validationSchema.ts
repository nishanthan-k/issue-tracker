import  { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title should be within 100 characters'),
  description: z.string().min(1, 'Description is required'),
})

export const developerSchema = z.object({
  id: z.number(),
  name: z.string(),
  issues: z.array(z.number()),
})

export const issueSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  developerId: z.string().optional(),
})

export enum Status {
  OPEN,
  IN_PROGRESS,
  CLOSED,
}

export interface ChartDataProps {
  title: string,
  issues: number,
}

export interface IssueStatProps {
  stat: ChartDataProps[],
  totalIssues: number,
}