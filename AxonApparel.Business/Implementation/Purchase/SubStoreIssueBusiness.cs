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
    public class SubStoreIssueBusiness : ISubStoreIssueBusiness
    {
        ISubStoreIssueRepository strobj = new SubStoreIssueRepository();

        public Response<IEnumerable<Domain.StoreTransferDet>> GetSubStoreStockAdd(int Compid, int Styleid, string JobNo, string OrderNo, string RefNo, int Storeid, int itemid, int itemgrpid, int processid, string Ordtype)
        {

            var strlist = strobj.GetSubStoreStockAdd(Compid, Styleid, JobNo, OrderNo, RefNo, Storeid, itemid, itemgrpid, processid, Ordtype);
            return new Response<IEnumerable<Domain.StoreTransferDet>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }


        public Response<IEnumerable<Domain.StoreTransferDet>> GetSubStoreStockEdit(int Masid)
        {

            var strlist = strobj.GetSubStoreStockEdit(Masid);
            return new Response<IEnumerable<Domain.StoreTransferDet>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }


        public Response<IEnumerable<Domain.StoreTransferMas>> GetMainList(int Companyid, int IsuStoreid, int RcptStoreid, string OrderNo, string RefNo, string JobNo, int masid, string ordtype, string Frmdate, string Todate)
        {

            var strlist = strobj.GetMainList(Companyid, IsuStoreid, RcptStoreid, OrderNo, RefNo, JobNo, masid, ordtype, Frmdate, Todate);
            return new Response<IEnumerable<Domain.StoreTransferMas>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }

        public Response<IEnumerable<Domain.StoreTransferMas>> LoadIssueNo()
        {

            var strlist = strobj.LoadIssueNo();
            return new Response<IEnumerable<Domain.StoreTransferMas>>(strlist, Status.SUCCESS, "Fetched Successfully");
        }

        public Response<bool> Create(Domain.StoreTransferMas SectionAdd)
        {

            var Mas = new Repository.StoreTransferMas();

            Mas.MasID = SectionAdd.MasID;
            Mas.Transno = SectionAdd.Transno;
            Mas.TransDate = SectionAdd.TransDate;
            Mas.FromcompID = SectionAdd.FromcompID;
            Mas.Order_No = SectionAdd.Order_No;
            Mas.StyleID = SectionAdd.StyleID;
            Mas.Job_Ord_no = SectionAdd.Job_Ord_no;
            Mas.TransType = SectionAdd.TransType;
            Mas.IssueStoreID = SectionAdd.IssueStoreID;
            Mas.Item_GroupID = SectionAdd.Item_GroupID;
            Mas.ItemID = SectionAdd.ItemID;
            Mas.ToCompID = SectionAdd.ToCompID;
            Mas.ToUnitID = SectionAdd.ToUnitID;
            Mas.RecptStoreID = SectionAdd.RecptStoreID;
            Mas.Remarks = SectionAdd.Remarks;
            Mas.QualityNo = SectionAdd.QualityNo;
            Mas.QualityDate = SectionAdd.QualityDate;
            Mas.QualityMade = SectionAdd.QualityMade;
            Mas.QualityRemarks = SectionAdd.QualityRemarks;
            Mas.CreatedBy = SectionAdd.CreatedBy;
            Mas.EWayNo = SectionAdd.EWayNo;
            Mas.EWayDate = SectionAdd.EWayDate;
            Mas.LocationID = SectionAdd.LocationID;
            Mas.Vehicle_No = SectionAdd.VehicleNo;



            var Details = new List<Repository.StoreTransferDet>();

            if (SectionAdd != null)
            {
                foreach (var details in SectionAdd.StoreTransDet)
                {

                    Details.Add(new Repository.StoreTransferDet
                    {
                        DetID = details.DetID,
                        MasID = details.MasID,
                        IssueStockID = details.IssueStockID,
                        TransferQty = details.TransferQty,
                        ReceivedQty = details.ReceivedQty,
                        RejectedQty = details.RejectedQty,
                        RecptStockID = details.RecptStockID,
                        RejectedStockID = details.RejectedStockID,
                        QltyItemRemarks = details.QltyItemRemarks,
                        Rate = details.Rate,
                        Amount = details.Amount,
                        CGST = details.CGST,
                        SGST = details.SGST,
                        IGST = details.IGST,
                        CGSTAMT = details.CGSTAMT,
                        SGSTAMT = details.SGSTAMT,
                        IGSTAMT = details.IGSTAMT,
                    });
                }
            }


            var result = strobj.Create(Mas,Details);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");


        }

        public Response<bool> Update(Domain.StoreTransferMas SectionAdd)
        {
            var Type = "";
            var IType = "";
            var Mas = new Repository.StoreTransferMas();

            Mas.MasID = SectionAdd.MasID;
            Mas.Transno = SectionAdd.Transno;
            Mas.TransDate = SectionAdd.TransDate;
            Mas.FromcompID = SectionAdd.FromcompID;
            Mas.Order_No = SectionAdd.Order_No;
            Mas.StyleID = SectionAdd.StyleID;
            Mas.Job_Ord_no = SectionAdd.Job_Ord_no;
            Mas.TransType = SectionAdd.TransType;
            Mas.IssueStoreID = SectionAdd.IssueStoreID;
            Mas.Item_GroupID = SectionAdd.Item_GroupID;
            Mas.ItemID = SectionAdd.ItemID;
            Mas.ToCompID = SectionAdd.ToCompID;
            Mas.ToUnitID = SectionAdd.ToUnitID;
            Mas.RecptStoreID = SectionAdd.RecptStoreID;
            Mas.Remarks = SectionAdd.Remarks;
            Mas.QualityNo = SectionAdd.QualityNo;
            Mas.QualityDate = SectionAdd.QualityDate;
            Mas.QualityMade = SectionAdd.QualityMade;
            Mas.QualityRemarks = SectionAdd.QualityRemarks;
            Mas.CreatedBy = SectionAdd.CreatedBy;
            Mas.EWayNo = SectionAdd.EWayNo;
            Mas.EWayDate = SectionAdd.EWayDate;
            Mas.LocationID = SectionAdd.LocationID;
            Type = SectionAdd.MainType;
            IType = SectionAdd.insertype;
            Mas.Vehicle_No = SectionAdd.VehicleNo;

            var Details = new List<Repository.StoreTransferDet>();

            if (SectionAdd != null)
            {
                foreach (var details in SectionAdd.StoreTransDet)
                {

                    Details.Add(new Repository.StoreTransferDet
                    {
                        DetID = details.DetID,
                        MasID = details.MasID,
                        IssueStockID = details.IssueStockID,
                        TransferQty = details.TransferQty,
                        ReceivedQty = details.ReceivedQty,
                        RejectedQty = details.RejectedQty,
                        RecptStockID = details.RecptStockID,
                        RejectedStockID = details.RejectedStockID,
                        QltyItemRemarks = details.QltyItemRemarks,
                        Rate = details.Rate,
                        Amount = details.Amount,
                        CGST = details.CGST,
                        SGST = details.SGST,
                        IGST = details.IGST,
                        CGSTAMT = details.CGSTAMT,
                        SGSTAMT = details.SGSTAMT,
                        IGSTAMT = details.IGSTAMT,
                    });
                }
            }


            var result = strobj.Update(Mas, Details, Type, IType);

            return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");


        }

        public Response<bool> Delete(Domain.StoreTransferMas SectionAdd)
        {
            var Type = "";
            var IType = "";
            var Mas = new Repository.StoreTransferMas();

            Mas.MasID = SectionAdd.MasID;
            Mas.Transno = SectionAdd.Transno;
            Mas.TransDate = SectionAdd.TransDate;
            Mas.FromcompID = SectionAdd.FromcompID;
            Mas.Order_No = SectionAdd.Order_No;
            Mas.StyleID = SectionAdd.StyleID;
            Mas.Job_Ord_no = SectionAdd.Job_Ord_no;
            Mas.TransType = SectionAdd.TransType;
            Mas.IssueStoreID = SectionAdd.IssueStoreID;
            Mas.Item_GroupID = SectionAdd.Item_GroupID;
            Mas.ItemID = SectionAdd.ItemID;
            Mas.ToCompID = SectionAdd.ToCompID;
            Mas.ToUnitID = SectionAdd.ToUnitID;
            Mas.RecptStoreID = SectionAdd.RecptStoreID;
            Mas.Remarks = SectionAdd.Remarks;
            Mas.QualityNo = SectionAdd.QualityNo;
            Mas.QualityDate = SectionAdd.QualityDate;
            Mas.QualityMade = SectionAdd.QualityMade;
            Mas.QualityRemarks = SectionAdd.QualityRemarks;
            Mas.CreatedBy = SectionAdd.CreatedBy;
            Mas.EWayNo = SectionAdd.EWayNo;
            Mas.EWayDate = SectionAdd.EWayDate;
            Mas.LocationID = SectionAdd.LocationID;
            Type = SectionAdd.MainType;
            IType = SectionAdd.insertype;
            Mas.Vehicle_No = SectionAdd.VehicleNo;


            var Details = new List<Repository.StoreTransferDet>();

            if (SectionAdd != null)
            {
                foreach (var details in SectionAdd.StoreTransDet)
                {

                    Details.Add(new Repository.StoreTransferDet
                    {
                        DetID = details.DetID,
                        MasID = details.MasID,
                        IssueStockID = details.IssueStockID,
                        TransferQty = details.TransferQty,
                        ReceivedQty = details.ReceivedQty,
                        RejectedQty = details.RejectedQty,
                        RecptStockID = details.RecptStockID,
                        RejectedStockID = details.RejectedStockID,
                        QltyItemRemarks = details.QltyItemRemarks,
                        Rate = details.Rate,
                        Amount = details.Amount,
                        CGST = details.CGST,
                        SGST = details.SGST,
                        IGST = details.IGST,
                        CGSTAMT = details.CGSTAMT,
                        SGSTAMT = details.SGSTAMT,
                        IGSTAMT = details.IGSTAMT,
                    });
                }
            }


            var result = strobj.Delete(Mas, Details, Type, IType);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");


        }
    }
}
