"use client";
import { developerSchema, issueSchema } from "@/app/validationSchema";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import ErrorMessage from './ErrorMessage';
import { Button } from "./ui/button";
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });


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

export function IssueForm(props: IssueDataProps) {
  const router = useRouter();
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
  }, [setValue, title, description, status, developerId]);

  return (
    <section className='flex justify-center w-full'>
      <div className='w-full max-w-[600px]'>
      <form
        className='space-y-6 w-full'
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

        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 '>
          <div className='form-select sm:w-[220px]'>
            <label className='min-w-[80px] sm:min-w-fit'>Status: </label>
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


          <div className='form-select'>
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

        <Button className='w-full flex gap-2' disabled={isSubmitting}>
          Submit
          {isSubmitting && <Spinner color="black" />}
        </Button>
      </form>
    </div>
    </section>
  );
}
