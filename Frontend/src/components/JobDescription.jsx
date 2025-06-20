import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setJobDetails } from '@/redux/jobSlice';
import { APPLICATION_API_BASE_URL, JOB_API_BASE_URL } from '@/utils/constant';
import { toast } from 'sonner';

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { jobDetails } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.auth);

  const hasAlreadyApplied =
    jobDetails?.applications?.some((application) => application.applicantId === user?._id) || false;

  const [isApplied, setIsApplied] = useState(hasAlreadyApplied);

  useEffect(() => {
    const fetchJobDetailsById = async (jobId) => {
      try {
        const response = await axios.get(`${JOB_API_BASE_URL}/get/${jobId}`);

        if (response.data.success) {
          dispatch(setJobDetails(response?.data?.job));
          setIsApplied(
            response.data.job.applications.some(
              (application) => application.applicantId === user?._id
            )
          );
        }
      } catch (error) {
        console.error('Failed to fetch job:', error);
      }
    };

    fetchJobDetailsById(jobId);
  }, [jobId, dispatch, user?._id]);

  const handleJobApplication = async () => {
    try {
      const response = await axios.get(
        `${APPLICATION_API_BASE_URL}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsApplied(true);

        const updatedApplications = [
          ...jobDetails.applications,
          { applicantId: user?._id },
        ];

        const updatedJobDetails = {
          ...jobDetails,
          applications: updatedApplications,
        };

        dispatch(setJobDetails(updatedJobDetails));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Application failed');
    }
  };

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
          onClick={hasAlreadyApplied ? null : handleJobApplication}
          disabled={hasAlreadyApplied}
          className={`transition-colors cursor-pointer ${
            hasAlreadyApplied
              ? 'bg-accent text-accent-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          {hasAlreadyApplied ? 'Already Applied' : 'Apply Now'}
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
