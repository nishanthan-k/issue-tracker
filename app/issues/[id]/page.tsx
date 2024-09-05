"use client";
import { issueSchema } from '@/app/validationSchema';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import IssueForm from '../new/page';
import Form from '@/components/Form';
import { Check } from '@/components/Check';

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
    <section>
      <Check
        // id={issueData.id}
        // title={issueData.title}
        // description={issueData.description}
        // status={issueData.status}
        // createdAt={issueData.createdAt}
        // updatedAt={issueData.updatedAt}
        // developerId={issueData.developerId}
        issueData={issueData}
        apiUrl={`/api/issues/${pathname.split('/').pop()}`}
        reDirectUrl='/issues'
      />
    </section>
  )
}

export default SpecificIssue;
