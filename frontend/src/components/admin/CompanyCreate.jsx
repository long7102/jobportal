/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate();   
  const dispatch = useDispatch()
  const [companyName, setCompanyName] = useState()
  const registerNewCompany = async() => {
    try {
        const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })  
        if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company))
            toast.success(res.data.message)
            const companyId = res?.data?.company?._id
            navigate(`/admin/companies/${companyId}`)
        }

    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Đã xảy ra lỗi khi tạo công ty. Vui lòng thử lại.");
      }
      console.log(error)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Tên công ty của bạn</h1>
          <p className="text-gray-500">Nhập tên công ty mà bạn thích</p>
        </div>
        <Label>Tên công ty</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Nhập tên công ty "
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate("/admin/companies")}>Huỷ</Button>
          <Button onClick={registerNewCompany}>Tiếp tục</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
