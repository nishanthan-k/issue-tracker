"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
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
  const [filteredIssues, setFilteredIssues] = useState<IssueProps[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const resp = await axios.get('/api/issues');

      if (resp.status === 200) {
        setIssues(resp.data);
      }
    }

    fetchIssues();
  }, []);

  const searchIssues = (input: string) => {
    if (input) {
      const filterIssues = issues.filter((issue) => issue.title.includes(input) || issue.description.includes(input) || issue.developerName?.includes(input))

      setFilteredIssues(filterIssues);
    } else {
      setFilteredIssues([]);
    }
  }

  const getIssueDate = (e: string) => {
    const date = new Date(e);

    return `${date.getDay().toString().padStart(2, '0')}-${date.getMonth().toString().padStart(2, '0')}-${date.getFullYear()}`;
  }

  const formatDesc = (a: string, count: number = 10) => {
    let text = a.split(" ").splice(0, count);
    return text.length >= count ? text.join(' ')+'...' : text.join(' ');
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4 self-end mr-7'>
        <TextField.Root placeholder="Search the issue" onChange={(e) => searchIssues(e.target.value)}>
          <TextField.Slot>
            <BiSearch height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className='text-nowrap uppercase'>
            <TableHead className='text-center'>Id</TableHead>
            <TableHead className='text-center'>Issue</TableHead>
            <TableHead className='text-center'>Description</TableHead>
            <TableHead className='text-center'>Assigned To</TableHead>
            <TableHead className='text-center'>Status</TableHead>
            <TableHead className='text-center'>Created on</TableHead>
            <TableHead className='text-center'>updated on</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {(filteredIssues.length > 0 ? filteredIssues : issues).map((issue) => (
            <TableRow 
              key={issue.id}
              onClick={() => router.push(`/issues/${issue.id}`)}
              className='hover:cursor-pointer hover:bg-gray-100 text-center'
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
          ))}
        </TableBody>
      </Table> 
    </div>
  )
}

export default Issues;