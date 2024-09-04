"use client";
import { Button, Table, TextField } from '@radix-ui/themes';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';

interface IssueProps {
  id: number,
  title: string,
  description: string,
  status: string,
  createdAt: string,
  developerName?: string,
}

const Issues = () => {
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
    return text.length >= 15 ? text.join(' ')+'...' : text.join(' ');
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

      <Table.Root>
        <Table.Header>
          <Table.Row className='text-nowrap uppercase'>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Assigned To</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created on</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {(filteredIssues.length > 0 ? filteredIssues : issues).map((issue) => (
            <Table.Row key={issue.id}>
                <Table.Cell>{issue.id}</Table.Cell>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell width="300px">{formatDesc(issue.description)}</Table.Cell>
                <Table.Cell className='text-nowrap'>{issue.developerName || 'Not Assigned'}</Table.Cell>
                <Table.Cell>{issue.status}</Table.Cell>
                <Table.Cell className='text-nowrap'>{getIssueDate(issue.createdAt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root> 
    </div>
  )
}

export default Issues;