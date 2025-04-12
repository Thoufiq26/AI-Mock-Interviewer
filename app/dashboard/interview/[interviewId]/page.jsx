import InterviewClient from "./InterviewClient";

export default function Page({ params }) {
  return <InterviewClient interviewId={params.interviewId} />;
}
