"use client";
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/searchInput';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

interface IssueProps {
  id: number,
  title: string,
  description: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  developerName?: string,
}

const Issues = () => {
  const router = useRouter();
  const [issues, setIssues] = useState<IssueProps[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<IssueProps[]>(issues);
  const [loading, setLoading] = useState(true);

  const searchIssues = useCallback((input: string) => {
    if (input) {
      const filterIssues = issues.filter((issue) => issue.title.includes(input) || issue.description.includes(input) || issue.developerName?.includes(input))

      setFilteredIssues(filterIssues);
    } else {
      setFilteredIssues(issues);
    }
  }, [issues])

  const getIssueDate = (e: string) => {
    const date = new Date(e);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  

  const formatDesc = (a: string, count: number = 10) => {
    let text = a.split(" ").splice(0, count);
    return text.length >= count ? text.join(' ')+'...' : text.join(' ');
  }

  useEffect(() => {
    setFilteredIssues(issues);
  }, [issues]);

  useEffect(() => {
    setLoading(true);
    const fetchIssues = async () => {
        try {
          const resp = await axios.get('/api/issues');
      
          if (resp.status === 200) {
            setIssues(resp.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
    }

    fetchIssues();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center gap-6 pb-10'>
      <div className='flex flex-wrap justify-end gap-4 self-end md:mr-7'>
        <SearchInput 
          icon={<BiSearch size={16} />}
          placeholder='Search the issue'
          onChange={(text: string) => searchIssues(text)}
        />

        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className='text-nowrap uppercase bg-gray-800'>
            <TableHead className='text-center'>Id</TableHead>
            <TableHead className='text-center'>Issue</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>Assigned To</TableHead>
            <TableHead className='text-center'>Status</TableHead>
            <TableHead className='text-center'>Created on</TableHead>
            <TableHead className='text-center'>updated on</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className='bg-gray-900'>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className='text-center h-20'>
                <Spinner h={1.3} w={1.3} />
              </TableCell>
            </TableRow>
          ) : (
            filteredIssues.length <= 0 ? (
              <TableRow className=''>
                <TableCell colSpan={7} className='text-center text-base h-20'>No issues found!</TableCell>
              </TableRow>
            ) : (
              filteredIssues.map((issue) => (
                <TableRow 
                  key={issue.id}
                  onClick={() => router.push(`/issues/${issue.id}`)}
                  className='hover:cursor-pointer hover:bg-row-hover text-center'
                >
                  <TableCell className='px-2 ml-4' >
                    {issue.id}
                  </TableCell>
                  <TableCell >
                    {issue.title}
                  </TableCell>
                  <TableCell className='w-[250px]'>
                    {formatDesc(issue.description)}
                  </TableCell>
                  <TableCell className='text-nowrap px-2'>
                    {issue.developerName || 'Not Assigned'}
                  </TableCell>
                  <TableCell className='text-nowrap px-2'>
                    {issue.status.replace('_', ' ')}
                  </TableCell>
                  <TableCell className='text-nowrap px-2'>
                    {getIssueDate(issue.createdAt)}
                  </TableCell>
                  <TableCell className='text-nowrap px-2'>
                    {getIssueDate(issue.updatedAt)}
                  </TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table> 
    </div>
  )
}

export default Issues;