/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { format } from 'date-fns';
import { toast } from 'sonner';
const JobDescription = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const jobId = params.id 
    const {user} = useSelector(store => store.auth)
    const {singleJob} = useSelector(store => store.job)
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied)

    const  applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials: true})
            if(res.data.success){
                setIsApplied(true)
                const updateSingleJob = {... singleJob, applications: [...singleJob.appications, {applicant: user?._id}]}
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials: true})
                if(res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.appications.some(appication => appication.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
      }, [jobId, dispatch, user?._id])

    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="font-extrabold text-3xl text-gray-900">{singleJob?.title}</h1>
                    <div className="flex items-center gap-4 mt-4">
                        <Badge className="text-blue-700 font-bold" variant="ghost">
                            {singleJob?.position} vị trí
                        </Badge>
                        <Badge className="text-[#F38002] font-bold" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-[#7290b7] font-bold" variant="ghost">
                            {singleJob?.salary}
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`px-6 py-3 rounded-lg text-white text-lg ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] transition-all duration-300'}`}>
                    {isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay'}
                </Button>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-semibold text-2xl text-gray-800 py-4'>Mô tả công việc</h1>
            <div className='my-6'>
                <h2 className='font-semibold text-lg my-2'>Vị trí: <span className='pl-4 font-normal text-gray-600'>{singleJob?.title}</span></h2>
                <h2 className='font-semibold text-lg my-2'>Địa điểm: <span className='pl-4 font-normal text-gray-600'>{singleJob?.location}</span></h2>
                <h2 className='font-semibold text-lg my-2'>Mô tả: <span className='pl-4 font-normal text-gray-600'>{singleJob?.description}</span></h2>
                <h2 className='font-semibold text-lg my-2'>Kinh nghiệm: <span className='pl-4 font-normal text-gray-600'>{singleJob?.experienceLevel} năm</span></h2>
                <h2 className='font-semibold text-lg my-2'>Lương: <span className='pl-4 font-normal text-gray-600'>{singleJob?.salary}</span></h2>
                <h2 className='font-semibold text-lg my-2'>Tổng số CV: <span className='pl-4 font-normal text-gray-600'>{singleJob?.applications?.length}</span></h2>
                <h2 className='font-semibold text-lg my-2'>
  Ngày đăng: 
  <span className='pl-4 font-normal text-gray-600'>
    {singleJob?.createdAt ? format(new Date(singleJob.createdAt), 'dd/MM/yyyy') : 'N/A'}
  </span>
</h2>            </div>

            {/* New 'Go Back to Home' button */}
            <div className="mt-8">
                <Button
                    onClick={() => navigate('/')}  // Navigate back to home
                    className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-lg transition-all duration-300">
                    Quay về trang chủ
                </Button>
            </div>
        </div>
    );
};

export default JobDescription;
