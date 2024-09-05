import { issueSchema } from '@/app/validationSchema';
import { Button, Select, Spinner, TextField } from '@radix-ui/themes';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import ForwardedSelect from './ForwardedSelect'; // Import your forward ref component

type IssueDataProps = z.infer<typeof issueSchema>;

const developers = [
  { id: '1', name: 'Dev1' },
  { id: '2', name: 'Dev2' },
  { id: '3', name: 'Dev3' },
  { id: '4', name: 'Dev4' },
  { id: '5', name: 'Dev5' },
];

const Form = (props: IssueDataProps) => {
  const { id, title, description, status, createdAt, updatedAt, developerId } = props;
  const [state, setState] = useState({
    id: id,
    title: title,
    description: description,
    status: status,
    createdAt: createdAt,
    updatedAt: updatedAt,
    developerId: developerId || '0',
  });
  const form = useForm({
    defaultValues: {
      ...state,
      username: "Username",
      email: "email@gmail.com",
      password: "password",
      phoneNumber: [],
    },
  });
  const { register, handleSubmit, control, formState } = form;
  const { errors, isSubmitting } = formState;
  const ref = useRef(null);

  return (
    <div className='max-w-xl'>
      <form
        className='space-y-3'
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <TextField.Root defaultValue={title} {...register('title')} />
        <TextField.Root defaultValue={description} {...register('description')} />
        <TextField.Root defaultValue={status} {...register('status')} />
        <TextField.Root defaultValue={createdAt} {...register('createdAt')} />
        <TextField.Root defaultValue={developerId} {...register('developerId')} />

        <div className='flex items-center gap-2'>
          <label>Assign Developer: </label>
          <Controller
            name='developerId'
            control={control}
            render={({ field }) => (
              <ForwardedSelect {...field} ref={ref}>
                <Select.Item value='0'>Select Developer</Select.Item>
                {developers.map((developer) => (
                  <Select.Item key={developer.id} value={developer.id.toString()}>
                    {developer.name}
                  </Select.Item>
                ))}
              </ForwardedSelect>
            )}
          />
        </div>

        <Button disabled={isSubmitting} className='hover:cursor-pointer'>
          Submit
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default Form;
