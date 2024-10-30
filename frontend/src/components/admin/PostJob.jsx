/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectGroup, SelectItem } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'


const companyArray = [];
const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }
    const selectChangleHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value)
        setInput({...input, companyId: selectedCompany._id})
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if(res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
  return (
    <div>
      <Navbar/>
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-300 shadow-lg rounded-md'>
        <div className='grid grid-cols-2 gap-2'>
        <div>
            <Label>Tên công việc</Label>
            <Input 
            type="text"
            name="title"
            value={input.title}
            onChange={changeEventHandler}
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
            />
        </div>
        <div>
            <Label>Mô tả</Label>
            <Input 
            type="text"
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
            />
        </div>
        <div>
            <Label>Yêu cầu</Label>
            <Input 
            type="text"
            name="requirements"
            value={input.requirements}
            onChange={changeEventHandler}
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
            />
        </div>
        <div>
            <Label>Lương</Label>
            <Input 
            type="text"
            name="salary"
            value={input.salary}
            onChange={changeEventHandler}
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
            />
        </div>
        <div>
            <Label>Địa điểm</Label>
            <Input 
            type="text"
            name="location"
            value={input.location}
            onChange={changeEventHandler}
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
            />
        </div>
        <div>
            <Label>Loại công việc</Label>
            <Input 
            type="text"
            name="jobType"
            value={input.jobType}
            onChange={changeEventHandler}
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
            />
        </div>
        <div>
            <Label>Năm kinh nghiệm</Label>
            <Input 
            type="text"
            name="experience"
            value={input.experience}
            onChange={changeEventHandler}
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
            />
        </div>
        <div>
            <Label>Số vị trí</Label>
            <Input 
            type="number"
            name="position"
            value={input.position}
            onChange={changeEventHandler}
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
            />
        </div>
        {
    companies.length > 0 && (
        <Select onValueChange={selectChangleHandler}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn công ty" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        companies.map((company) => {
                            return (
                                <SelectItem key={company.id} value={company?.name?.toLowerCase()}>
                                    {company?.name}
                                </SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

        </div>
        {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Đang tải </Button> : <Button type="submit" className="w-full my-4">Thêm công việc mới</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>Hãy tạo mới 1 công ty trước</p>
                    }
        </form>
      </div>
    </div>
  )
}

export default PostJob
