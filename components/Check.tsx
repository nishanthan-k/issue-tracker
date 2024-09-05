"use client";
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { developerSchema, issueSchema, Status } from "@/app/validationSchema";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select"; // Adjust import according to your setup
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import ToastMessage from './ToastMessage';
import ErrorMessage from './ErrorMessage';

type IssueDataProps = {
  issueData: z.infer<typeof issueSchema>,
  apiUrl: string,
  reDirectUrl: string,
};
type DeveloperProps = z.infer<typeof developerSchema>;
type IssueStatusProps = {
  text: string,
  value: string,
}

export function Check(props: IssueDataProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { id, title, description, status, developerId } = props.issueData;
  const { apiUrl, reDirectUrl } = props;
  const form = useForm({
    defaultValues: {
      title: title || '',
      description: description || '',
      status: status || 'OPEN',
      developerId: developerId || '0',
    },
  });
  const { register, handleSubmit, control, formState ,setValue } = form;
  const { errors, isSubmitting } = formState;
  const [developers, setDevelopers] = useState<DeveloperProps[]>([]);
  const [issueStatus, setIssueStatus] = useState<IssueStatusProps[]>([]);

  useEffect(() => {
    try {
        const fetchDevelopers = async () => {
          const resp = await axios.get('/api/developers');

          if (resp.status === 200) {
            setDevelopers(resp.data);
          }
        }
        
        const fetchIssueStatus = async () => {
          const resp = await axios.get('/api/status');
          
          if (resp.status === 200) {
            setIssueStatus(resp.data);
          }
        }
        
        fetchDevelopers();
        fetchIssueStatus();
      } catch (error) {
        console.log(error);
      }
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const reqJson = Object.fromEntries(
        Object.entries(data)
          .filter(([, value]) => value !== '' && value !== null && value !== '0')
          .map(([key, value]) => {
            if (key === 'developerId') {
              return [key, parseInt(value as string, 10)];
            }
            return [key, value];
          })
      );
      
      console.log('reqjson', reqJson)
      const resp = await axios.post(`${apiUrl}`, {...reqJson, id: id});
      
      if (resp.status === 201 || resp.status === 202) {
        router.push(`${reDirectUrl}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValue('title', title || '');
    setValue('description', description || '');
    setValue('status', status || 'OPEN');
    setValue('developerId', developerId?.toString() || '0');
  }, [setValue, title, description, status]);
  
  console.log('dev', developerId)

  return (
    <section className='flex justify-center'>
      <div className='max-w-xl'>
      <form
        className='space-y-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input type="text" placeholder="Title" {...register('title', { required: 'Title is required'})} />
        {errors?.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

        <Controller
          name="description"
          control={control}
          defaultValue={description}
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder="Description..."
            />
          )}
        />
        {errors?.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

        <div className='flex flex-col sm:flex-row sm:justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <label>Status: </label>
            <Controller
              name='status'
              control={control}
              defaultValue={status}
              render={({ field: { value, onChange} }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='0'>Select Status</SelectItem>
                    {issueStatus.map((ele) => (
                      <SelectItem key={ele.value} value={ele.value}>{ele.text}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>


          <div className='flex items-center gap-4'>
            <label>Developer: </label>
            <Controller
            name="developerId"
            control={control}
            defaultValue={developerId}
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}  
                onValueChange={onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Developer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='0'>
                      Select Developer
                    </SelectItem>
                  {developers.map((developer) => (
                    <SelectItem key={developer.id} value={developer.id.toString()}>
                      {developer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          </div>
        </div>

        <Button className='w-full' disabled={isSubmitting}>Submit</Button>
      </form>
    </div>
    </section>
  );
}
