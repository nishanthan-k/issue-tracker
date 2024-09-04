"use client";
import { Button, Table } from '@radix-ui/themes';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    const fetchIssues = async () => {
      const resp = await axios.get('/api/issues');

      if (resp.status === 200) {
        setIssues(resp.data);
      }
    }

    fetchIssues();
  }, []);

  const getIssueDate = (e: string) => {
    const date = new Date(e);

    return `${date.getDay().toString().padStart(2, '0')}-${date.getMonth().toString().padStart(2, '0')}-${date.getFullYear()}`;
  }

  const formatDesc = (a: string, count: number = 10) => {
    let text = a.split(" ").splice(0, count);
    return text.length >= 15 ? text.join(' ')+'...' : text.join(' ');
  }

  return (
    <div className='flex flex-col'>
      <div className='self-end mr-7'>
        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>

      <Table.Root>
        <Table.Header>
          <Table.Row className='text-nowrap'>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Assigned To</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created on</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {issues.map((issue) => (
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