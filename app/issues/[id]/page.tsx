"use client";
import { issueSchema } from '@/app/validationSchema';
import { IssueForm } from '@/components/IssueForm';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
// import {IssueForm}  from '@/components/IssueForm';

type IssueDataProps = z.infer<typeof issueSchema>;

const SpecificIssue = () => {
  const pathname = usePathname();
  const [issueData, setIssueData] = useState<IssueDataProps>({
    id: '',
    title: '',
    description: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    developerId: '',
  });

  useEffect(() => {
    try {
        const fetchDevelopers = async () => {
          const resp = await axios.get(`/api/issues/${pathname.split('/').pop()}`);

          if (resp.status === 200) {
            setIssueData({
              id: resp.data?.id,
              title: resp.data?.title,
              description: resp.data?.description,
              status: resp.data?.status,
              createdAt: resp.data?.createdAt,
              updatedAt:  resp.data?.updatedAt,
              developerId: resp.data?.developerId || ''
            });
          }
        }

        fetchDevelopers();
      } catch (error) {
        console.log(error);
      }
  }, [pathname]);
  
  return (
      <IssueForm
        issueData={issueData}
        apiUrl={`/api/issues/${pathname.split('/').pop()}`}
        reDirectUrl='/issues'
      />
  )
}

export default SpecificIssue;
