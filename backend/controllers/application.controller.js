import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Khong tim thay id cong viec",
        success: false,
      });
    }
    //kiem tra xem user da apply cong viec hay chua
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "Bạn đã ứng tuyển công việc này rồi",
        success: false,
      });
    }
    //kiem tra xem cong viec co ton tai hay khong
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Công việc không tồn tại",
        success: false,
      });
    }
    //Tạo mới đơn xin gia nhập
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Ứng tuyển công việc thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { creaatedAt: -1 } },
        populate: {
            path: 'company',
            options: { sort: { creaatedAt: -1 } },

        }
      });
      if(!application) {
        return res.status(404).json({
            message: "Không có đơn ứng tuyển nào",
            success: false,
        })
      }
      return res.status(200).json({
        application,
        success: true
      })
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async(req, res) => {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
          path:'applications',
          options:{sort:{createdAt:-1}},
          populate:{
              path:'applicant'
          }
        })
    if(!job) {
        return res.status(400).json({
            message: "Không tìm thấy công việc",
            success: false
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

export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'Không được bỏ trống trạng thái',
                success:false
            })
        };

        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Không tìm thấy",
                success:false
            })
        };

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Cập nhật trạng thái thành công",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}