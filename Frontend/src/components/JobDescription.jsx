import { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setJobDetails } from '@/redux/jobSlice';
import { JOB_API_BASE_URL } from '@/utils/constant';

const JobDescription = () => {
  const isApplied = false;
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { jobDetails } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const getJobById = async (jobId) => {
      try {
        const res = await axios.get(`${JOB_API_BASE_URL}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setJobDetails(res.data.job));
        }
      } catch (error) {
        console.error('Failed to fetch job:', error);
      }
    };

    getJobById(jobId);
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto mb-10 p-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{jobDetails?.jobTitle}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-semibold text-accent">
              {jobDetails?.openPositions} Positions
            </Badge>
            <Badge variant="outline" className="font-semibold capitalize text-destructive">
              {jobDetails?.employmentType}
            </Badge>
            <Badge variant="outline" className="font-semibold text-emerald-600 dark:text-emerald-400">
              ₹ {jobDetails?.salary?.toLocaleString()} LPA
            </Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          className={`transition-colors ${
            isApplied
              ? 'bg-accent text-accent-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <div className="bg-card text-card-foreground rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Job Description</h2>

        <p className="text-base">
          <span className="font-medium text-accent">Job Role:</span> {jobDetails?.jobTitle}
        </p>

        <p className="text-base">
          <span className="font-medium text-accent">Location:</span> {jobDetails?.jobLocation}
        </p>

        <p className="text-base">
          <span className="font-medium text-accent">Description:</span> {jobDetails?.jobDescription}
        </p>

        <p className="text-base">
          <span className="font-medium text-accent">Requirements:</span>{' '}
          {jobDetails?.jobRequirements?.length > 0
            ? jobDetails.jobRequirements.join(', ')
            : 'Not specified'}
        </p>

        <p className="text-base">
          <span className="font-medium text-accent">Min Experience:</span> {jobDetails?.minExperience} years
        </p>

        <p className="text-base">
          <span className="font-medium text-accent">Salary:</span> ₹ {jobDetails?.salary?.toLocaleString()} LPA
        </p>

        <p className="text-base">
          <span className="font-medium text-accent">Total Applicants:</span>{' '}
          {jobDetails?.applications?.length || 0}
        </p>

        <p className="text-base">
          <span className="font-medium text-accent">Posted Date:</span>{' '}
          {jobDetails?.createdAt ? new Date(jobDetails.createdAt).toLocaleDateString() : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
