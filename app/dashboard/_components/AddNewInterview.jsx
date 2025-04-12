"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { chatSession } from '@/utils/GeminiAI'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import {useUser} from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db'; 
import { useRouter } from 'next/navigation'



function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition,setJobPosition]=useState();
  const [jobDescription,setJobDescription]=useState();
  const [jobExp,setJobExp]=useState();
  const [loading,setLoading]=useState(false);
  const [jsonresponse,setJsonResponse]=useState([]);
  const router=useRouter();
  const  {user}=useUser();
  const onSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const inputPrompt="Job Position :"+jobPosition+"  ,Job Description:  "+jobDescription+" ,  Years of Experience:  "+jobExp+"  ,depending upon job position,description  and years of experience give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS+" interview questions along with answer in JSON format,Give me question and answer field on JSON,make sure questions are not so easy"
    const result=await chatSession.sendMessage(inputPrompt);
    const MockJSONResponse=result.response.text().replace(/```json|```/g, '');
    console.log(JSON.parse(MockJSONResponse));
setJsonResponse(MockJSONResponse);
if (MockJSONResponse){
const resp=await db.insert(MockInterview).values(
  {
    mockId:uuidv4(),
    jsonMockResp:MockJSONResponse,
    jobPosition:jobPosition,
    jobDescription:jobDescription,
    jobExp:jobExp,
    createdBy:user?.primaryEmailAddress?.emailAddress,
    createdAt:moment().format('DD-MM-YYYY')

  }).returning({mockId:MockInterview.mockId})
  console.log("inserted id:"+resp);
  if (resp){
    setOpenDialog(false);
    router.push('/dashboard/interview/'+resp[0].mockId);


  }
}else{
  console.log("Error")
}
    setLoading(false);
 
  };

  

  return (
    <div>
      <div
        className='p-10 border rounded-lg bg-gray-100 hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="text-2xl max-w-3xl w-full">
  <DialogHeader>
    <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
    <DialogDescription>
        <form onSubmit={onSubmit}>
      <div>
        <h2 className="text-base">Add details about your job position/role, job description and years of experience.</h2>
        
        <div className="mt-6">
          <label className="block mb-2 font-medium">Job Role / Job Position</label>
          <Input placeholder="Ex: Software Engineer" required onChange={(event)=>setJobPosition(event.target.value)}/>
        </div>
        <div className="mt-3">
          <label className="block mb-2 font-medium">Job Description / Tech Stack (In Short)</label>
          <Textarea placeholder="Ex: Python,C,Java,SQL" required onChange={(event)=>setJobDescription(event.target.value)}/>
        </div>
        <div className="mt-3">
          <label className="block mb-2 font-medium">Years of Experience</label>
          <Input placeholder="Ex: 5" type='number' required onChange={(event)=>setJobExp(event.target.value)}/>
        </div>
      </div>

      <div className="flex gap-5 justify-end mt-8">
        <Button  type="button" className="hover:cursor-pointer"variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button  type="submit " disabled={loading} className="bg-purple-600 text-white hover:bg-purple-700 transition-colors hover:cursor-pointer">
          {loading?
          <>
          <LoaderCircle className='animate-spin'/>Generating from AI
          </>:'Start Interview'
}

        </Button>
      </div>
      </form>
    </DialogDescription>
  </DialogHeader>
</DialogContent>

      </Dialog>
    </div>
  )
}

export default AddNewInterview;
