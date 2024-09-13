"use client";
import "easymde/dist/easymde.min.css";
import { IssueForm } from '@/components/IssueForm';



const page = () => {
  
  return (
    <IssueForm 
      issueData={{title: '', description:''}}
      apiUrl='/api/issues/new'
      reDirectUrl='/issues'
    />
  )
}

export default page;
