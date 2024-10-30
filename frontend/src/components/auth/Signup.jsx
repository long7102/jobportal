/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  })
  const {loading, user} = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }
  const submitHandler = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if(input.file){
      formData.append("file", input.file)

    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
    });
      if(res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
      } 
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(setLoading(false))
    }
  }
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} action='' className='w-1/2 border border-gray-300 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Đăng ký tài khoản</h1>
          <div className='my-2'>
            <Label>Tên đầy đủ</Label>
            <Input type='text'
            placeholder='Nhập họ và tên' 
            value={input.fullname} 
            name="fullname" 
            onChange={changeEventHandler} />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input type='email' 
            placeholder='Nhập email'
            value={input.email} 
            name="email" 
            onChange={changeEventHandler} />
          </div>
          <div className='my-2'>
            <Label>Số điện thoại</Label>
            <Input type='number' 
            placeholder='Nhập số điện thoại'
            value={input.phoneNumber} 
            name="phoneNumber" 
            onChange={changeEventHandler} />
          </div>
          <div className='my-2'>
            <Label>Mật khẩu</Label>
            <Input type='password' 
            placeholder='Nhập mật khẩu'
            value={input.password} 
            name="password" 
            onChange={changeEventHandler} />
          </div>
          <Label>Vai trò</Label>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input type="radio" 
                name="role" 
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler} 
                className="cursor-pointer" />
                <Label htmlFor="r1" className="w-1/2">Học sinh</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" 
                name="role" 
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler} 
                className="cursor-pointer" />
                <Label htmlFor="r2">Nhà tuyển dụng</Label>
              </div>
            </RadioGroup>

          </div>
          <div className='flex items-center gap-2'>
            <Label className="w-1/5">Ảnh đại diện</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Chờ xíu nha</Button> :  <Button types="submit" className="w-full my-4">Đăng ký</Button>

          }
          <span className='text-sm'>Đã có tài khoản, <Link to="/login" className='text-blue-600'>Đăng nhập ngay</Link></span>
        </form>
      </div>
    </div>

  )
}

export default Signup