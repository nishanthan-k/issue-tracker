"use client";
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';

interface IssueProps {
  title: string,
  description: string,
}

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueProps>();

  const createIssue = async (data: IssueProps) => {
    try {
      const resp = await axios.post('/api/issues', data);

      if (resp.status === 201) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form 
      className='max-w-xl space-y-3'
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
  )
}

export default NewIssue;
