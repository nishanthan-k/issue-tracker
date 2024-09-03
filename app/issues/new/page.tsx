"use client";
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';

type IssueProps = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit,  formState: { errors, isSubmitting } } = useForm<IssueProps>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState('');

  const createIssue = async (data: IssueProps) => {
    try {
      const resp = await axios.post('/api/issues', data);

      if (resp.status === 201) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      setError('Error occured!');
    }
  }

  return (
    <div className='max-w-xl '>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <form 
        className='space-y-3'
        onSubmit={handleSubmit((data) => createIssue(data))}
        >
        <TextField.Root placeholder='Title' {...register('title')}/>
        {errors?.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        {errors?.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        <Button disabled={isSubmitting} className='hover:cursor-pointer'>
          Submit
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewIssue;
