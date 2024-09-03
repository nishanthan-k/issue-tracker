"use client";
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';

interface IssueProps {
  title: string,
  description: string,
}

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueProps>();
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
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
          />
        <Button className='hover:cursor-pointer'>Submit</Button>
      </form>
    </div>
  )
}

export default NewIssue;
