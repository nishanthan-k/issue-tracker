"use client";
import { Button, Callout, Select, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema, developerSchema, issueSchema } from '@/app/validationSchema';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';
// import Form from '@/components/Form';
import { IssueForm } from '@/components/IssueForm';

// type IssueProps = z.infer<typeof issueSchema>;
// type DeveloperProps = z.infer<typeof developerSchema>;



const page = () => {
  // const { id, title, description, status, createdAt, updatedAt, developerId } = props;
  // const router = useRouter();
  // const initialValues = {
  //   id: id?.toString() || '',
  //   title: title || '',
  //   description: description || '',
  //   status: status || '',
  //   createdAt: createdAt || '',
  //   updatedAt: updatedAt || '',
  //   developerId: developerId?.toString() || '0',
  // };

  // const { register, control, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<IssueProps>({
  //   resolver: zodResolver(createIssueSchema),
  //   defaultValues: initialValues,
  // });

  // const [error, setError] = useState('');
  // const [developers, setDevelopers] = useState<DeveloperProps[]>([]);
  // const [selectedDeveloper, setSelectedDeveloper] = useState<string>(initialValues.developerId || '0');

  // useEffect(() => {
  //   setValue('id', id);
  //   setValue('title', title);
  //   setValue('description', description);
  //   setValue('status', status);
  //   setValue('createdAt', createdAt);
  //   setValue('updatedAt', updatedAt);
  //   setValue('developerId', developerId || '0');
  // }, [setValue, id, title, description, status, createdAt, updatedAt, developerId])

  // useEffect(() => {
  //   try {
  //       const fetchDevelopers = async () => {
  //         const resp = await axios.get('/api/developers');

  //         if (resp.status === 200) {
  //           setDevelopers(resp.data);
  //         }
  //       }

  //       fetchDevelopers();
  //     } catch (error) {
  //       console.log(error);
  //     }
  // }, []);

  // const createIssue = async (data: IssueProps) => {
  //   console.log('data',data)
  //   // try {
  //   //   const reqJson = selectedDeveloper !== '0' ? {...data, developerId: parseInt(selectedDeveloper)} : data;
  //   //   const resp = await axios.post('/api/issues/new', reqJson);
      
  //   //   if (resp.status === 201) {
  //   //     router.push('/issues');
  //   //   }
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   setError('Error occured!');
  //   // }
  // }

  // const updateSelectedDeveloper = (id: string) => {
  //   setSelectedDeveloper(id);
  // }

  return (
    <IssueForm 
      issueData={{title: '', description:''}}
      apiUrl='/api/issues/new'
      reDirectUrl='/issues'
    />
  )
}

export default page;
