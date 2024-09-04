"use client";
import { Button, Callout, Select, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema, developerSchema } from '@/app/validationSchema';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';

type IssueProps = z.infer<typeof createIssueSchema>;
type DeveloperProps = z.infer<typeof developerSchema>;

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit,  formState: { errors, isSubmitting } } = useForm<IssueProps>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState('');
  const [developers, setDevelopers] = useState<DeveloperProps[]>([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState('');

  useEffect(() => {
    try {
        const fetchDevelopers = async () => {
          const resp = await axios.get('/api/developers');

          if (resp.status === 200) {
            console.log(resp);
            setDevelopers(resp.data);
          }
        }

        fetchDevelopers();
      } catch (error) {
        console.log(error);
      }
  }, []);

  const createIssue = async (data: IssueProps) => {
    try {
      const reqJson = selectedDeveloper ? {...data, developerId: parseInt(selectedDeveloper)} : data;
      const resp = await axios.post('/api/issues', reqJson);
      
      if (resp.status === 201) {
        router.push('/issues');
      }
    } catch (error) {
      console.log(error);
      setError('Error occured!');
    }
  }

  const updateSelectedDeveloper = (id: string) => {
    setSelectedDeveloper(id);
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
        
        <div className='flex items-center gap-2'>
          <label>Assign Developer: </label>
          <Select.Root onValueChange={(id: string) => updateSelectedDeveloper(id)}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Select Developer</Select.Label>
                {developers.map((developer) => (
                  <Select.Item key={developer.id} value={developer.id.toString()} >{developer.name}</Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>

        <Button disabled={isSubmitting} className='hover:cursor-pointer'>
          Submit
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewIssue;
