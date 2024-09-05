import { useToast } from '@/hooks/use-toast';
import React, { useEffect } from 'react'
import { ToastAction } from './ui/toast';

const ToastMessage = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }, [])

  return (
    <></>
  )
}

export default ToastMessage