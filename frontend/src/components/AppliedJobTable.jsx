/* eslint-disable no-unused-vars */
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    if (!allAppliedJobs || !Array.isArray(allAppliedJobs)) {
        return <div>Bạn chưa ứng tuyển công việc nào</div>;
    }

    return (
        <div>
            <Table>
                <TableCaption>Danh sách những công ty bạn ứng tuyển</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Vị trí</TableHead>
                        <TableHead>Công ty</TableHead>
                        <TableHead className="text-right">Trạng thái</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length === 0 ? (
                            <span>Bạn chưa ứng tuyển công việc nào</span>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id}>
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                            {appliedJob.status === "rejected" ? "TỪ CHỐI"
                                                : appliedJob.status === "pending" ? "ĐANG CHỜ"
                                                    : appliedJob.status === "accepted" ? "ĐỒNG Ý"
                                                        : appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>

                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;
