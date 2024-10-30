import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Không được bỏ trông thông tin",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "Them moi cong viec thanh cong.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}


export const getAllJobs = async(req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}

            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1})
        if(!jobs) {
            return res.status(404).json({
                message: "Khong tim thay cong viec nay",
                success: false,
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
//employee
export const getJobById = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        })
        if(!job) {
            return res.status(404).json({
                message: "Khong tim thay cong viec nay",
                success: false,
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAdminJobs = async(req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by: adminId}).populate({
            path: 'company',
            createdAt: -1
        })
        
        if(!jobs) {
            return res.status(404).json({
                message: "Khong tim thay cong viec nay",
                success: false,
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}