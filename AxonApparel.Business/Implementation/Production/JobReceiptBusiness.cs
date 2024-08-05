using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class JobReceiptBusiness : IJobReceiptBusiness
    {
        IJobReceiptRepository Jobrecpt = new JobReceiptRepository();

        public Response<IList<Domain.JobReceiptMain>> GetMaindt(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string dcno, string refno, int styleid, string entryno, string fromdate, string todate, string UnitorOther)
        {
            try
            {
                var getmaindt = Jobrecpt.GetMainData(compid, orderno, jobordno, jobrecptno, supplierid, dcno, refno, styleid, entryno, fromdate, todate, UnitorOther);

                return new Response<IList<Domain.JobReceiptMain>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.JobReceiptMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteJobRecpt(int ReceiptId) 
        {
            try
            {
                return new Response<bool>(Jobrecpt.DeleteJobReceipt(ReceiptId), Status.SUCCESS, "Deleted Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "Delete failed...");
            }
        }

        public Response<IList<Domain.JobReceiptMain>> GetSndGridDet(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string UnitorOther, string refno)
        {
            try
            {
                var getmaindt = Jobrecpt.GetSndGridDetails(compid, orderno, jobordno, jobrecptno, supplierid, UnitorOther, refno);

                return new Response<IList<Domain.JobReceiptMain>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.JobReceiptMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.JobReceiptMain>> GetthirdGridDet(string jobordno, string UnitorOther)
        {
            try
            {
                var getmaindt = Jobrecpt.GetthirdGridDetails(jobordno, UnitorOther);

                return new Response<IList<Domain.JobReceiptMain>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.JobReceiptMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.JobReceiptMain>> GetthirdGridDetonEditMode(int JobRecptId)
        {
            try
            {
                var getmaindt = Jobrecpt.GetthirdGridDetailsonEditMode(JobRecptId);

                return new Response<IList<Domain.JobReceiptMain>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.JobReceiptMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.JobReceiptMain>> GetthirdGridDespatchDet(string Ordno)
        {
            try
            {
                var getmaindt = Jobrecpt.GetthirdGridDespatchDetails(Ordno);

                return new Response<IList<Domain.JobReceiptMain>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.JobReceiptMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateJobRecpt(Domain.JobReceiptMain JobReceptAdd)
        {
            try
            {
                //Insert into Job_recpt_mas
                var JobRecept = Jobrecpt.AddData(new Domain.JobReceiptMain
                {
                    JobRecptno = JobReceptAdd.JobRecptno,
                    JobRecptDate = JobReceptAdd.JobRecptDate,
                    DcNo = JobReceptAdd.DcNo,
                    DcDate = JobReceptAdd.DcDate,
                    SupplierId = JobReceptAdd.SupplierId,
                    UnitorOther = JobReceptAdd.UnitorOther,
                    Jobno = JobReceptAdd.Jobno,
                    CompanyId = JobReceptAdd.CompanyId,
                    Orderno = JobReceptAdd.Orderno,
                    StyleId = JobReceptAdd.StyleId,
                    Remarks = JobReceptAdd.Remarks,
                    StoreUnitID = JobReceptAdd.StoreUnitID,
                    //QualityMade: Processorid,// $('#ddlheaderwrkdiv').val(),
                    //QualityRemarks: $('#txtheaderloss').val(),
                    //QualityDate: Prodprgid,
                    DespatchNo = JobReceptAdd.DespatchNo,
                    BuyOrdShip = JobReceptAdd.BuyOrdShip,
                    ShipModeId = JobReceptAdd.ShipModeId,
                    SystemId = JobReceptAdd.SystemId,
                    DocRefNo = JobReceptAdd.DocRefNo,
                    DocRefDate = JobReceptAdd.DocRefDate,
                    InvRefNo = JobReceptAdd.InvRefNo,
                    InvRefDate = JobReceptAdd.InvRefDate,
                    ShipType = JobReceptAdd.ShipType,
                    CreatedBy = JobReceptAdd.CreatedBy,
                    JobRecptDet = JobReceptAdd.JobRecptDet,
                });

                if (JobRecept)
                {
                    return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
                }
                else
                {
                    return new Response<bool>(false, Status.SUCCESS, "Saved failed");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public Response<bool> UpdateJobRecpt(Domain.JobReceiptMain JobReceptUpd)
        {
            try
            {
                //Insert into Job_recpt_mas
                var JobRecept = Jobrecpt.UpdateData(new Domain.JobReceiptMain
                {
                    JobRecptno = JobReceptUpd.JobRecptno,
                    JobReceiptId=JobReceptUpd.JobReceiptId,
                    JobRecptDate = JobReceptUpd.JobRecptDate,
                    DcNo = JobReceptUpd.DcNo,
                    DcDate = JobReceptUpd.DcDate,
                    SupplierId = JobReceptUpd.SupplierId,
                    UnitorOther = JobReceptUpd.UnitorOther,
                    Jobno = JobReceptUpd.Jobno,
                    CompanyId = JobReceptUpd.CompanyId,
                    Orderno = JobReceptUpd.Orderno,
                    StyleId = JobReceptUpd.StyleId,
                    Remarks = JobReceptUpd.Remarks,
                    StoreUnitID = JobReceptUpd.StoreUnitID,
                    //QualityMade: Processorid,// $('#ddlheaderwrkdiv').val(),
                    //QualityRemarks: $('#txtheaderloss').val(),
                    //QualityDate: Prodprgid,
                    DespatchNo = JobReceptUpd.DespatchNo,
                    BuyOrdShip = JobReceptUpd.BuyOrdShip,
                    ShipModeId = JobReceptUpd.ShipModeId,
                    SystemId = JobReceptUpd.SystemId,
                    DocRefNo = JobReceptUpd.DocRefNo,
                    DocRefDate = JobReceptUpd.DocRefDate,
                    InvRefNo = JobReceptUpd.InvRefNo,
                    InvRefDate = JobReceptUpd.InvRefDate,
                    ShipType = JobReceptUpd.ShipType,
                    CreatedBy = JobReceptUpd.CreatedBy,
                    JobRecptDet = JobReceptUpd.JobRecptDet,
                });

                if (JobRecept)
                {
                    return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
                }
                else
                {
                    return new Response<bool>(false, Status.SUCCESS, "Updated failed");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
