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
    public class CuttingOrderReturnBusiness : ICuttingOrderReturnBusiness
    {
        ICuttingOrderReturnRepository CuttingRetDet = new CuttingOrderReturnRepository();

        public Response<IQueryable<CuttingReturn>> GetCuttingReturnDetails(int CompanyId, int CompanyUnitId, string OrdType, string refno, int styleid, string OrderNo, int buyerid, string jobordno, string inorext)
        {
            try
            {
                var CuttingOrderReturnDT = CuttingRetDet.GetCuttingReturnDetails(CompanyId, CompanyUnitId, OrdType, refno, styleid, OrderNo, buyerid, jobordno, inorext);

                return new Response<IQueryable<CuttingReturn>>(CuttingOrderReturnDT, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingReturn>> GetCuttingReturnHeadDetails(string JobOrdNo)
        {
            try
            {
                var CuttingOrderReturnDT = CuttingRetDet.GetCuttingReturnHeaderDetails(JobOrdNo);

                return new Response<IQueryable<CuttingReturn>>(CuttingOrderReturnDT, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingReturnDetail>> GetCuttingReturnDetDetails(int Issueid)
        {
            try
            {
                var CuttingOrderReturnDT = CuttingRetDet.GetCuttingReturnDetDetails(Issueid);

                return new Response<IQueryable<CuttingReturnDetail>>(CuttingOrderReturnDT, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReturnDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.Cutting_Wastage_Det>> ListCuttingReturnWastageDetailsEdit(int RetId)
        {
            try
            {
                var CuttingOrderReturnDT = CuttingRetDet.ListCuttingReturnWastageDetailsEdit(RetId);

                return new Response<IQueryable<Domain.Cutting_Wastage_Det>>(CuttingOrderReturnDT, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Cutting_Wastage_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<CuttingReturnDetail>> GetCuttingReturnOpDetDetails(int Issueid)
        {
            try
            {
                var CuttingOrderReturnDT = CuttingRetDet.GetCuttingReturnOpDetDetails(Issueid);

                return new Response<IQueryable<CuttingReturnDetail>>(CuttingOrderReturnDT, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReturnDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<CuttingReturnDetail>> GetCuttingReturnOpDetEditDetails(int IssueId, int RetId)
        {
            try
            {
                var CuttingOrderReturnDT = CuttingRetDet.GetCuttingReturnOpDetEditDetails( IssueId, RetId);

                return new Response<IQueryable<CuttingReturnDetail>>(CuttingOrderReturnDT, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReturnDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<bool> UpdateCuttingOrderReturn(Domain.CuttingReturn CuttingOrderUpd)
        {
            bool StockStatus = true; ;



            Domain.CuttingReturn Cuttingmas = new Domain.CuttingReturn()
            {
                CuttingReturnid = CuttingOrderUpd.CuttingReturnid,
                Cuttingissueid = CuttingOrderUpd.Cuttingissueid,
                CuttingOrdid = CuttingOrderUpd.CuttingOrdid,
                CuttingReturnNo = CuttingOrderUpd.CuttingReturnNo,
                CuttingReturnDate = CuttingOrderUpd.CuttingReturnDate,
                Remarks = CuttingOrderUpd.Remarks,
                ToLocation = CuttingOrderUpd.ToLocation,
                RetLocType = CuttingOrderUpd.RetLocType,
                Createdby = CuttingOrderUpd.Createdby,
                CuttingReturnDetail = CuttingOrderUpd.CuttingReturnDetail,

                Cutting_Cancel_masid = CuttingOrderUpd.Cutting_Cancel_masid,
                Cutting_Cancel_no = CuttingOrderUpd.Cutting_Cancel_no,
                Cutting_Cancel_date = CuttingOrderUpd.Cutting_Cancel_date,
                Cancel_Ref_no = CuttingOrderUpd.Cancel_Ref_no,
                Cancel_Ref_date = CuttingOrderUpd.Cancel_Ref_date,
                CancelOrClose = CuttingOrderUpd.CancelOrClose,
                WstageList = CuttingOrderUpd.WstageList


            };


            var wasteList2 = new List<Repository.Cutting_Wastage_Det>();

            if (CuttingOrderUpd.WstageList != null)
            {
                if (CuttingOrderUpd.WstageList.Count > 0)
                {
                    foreach (var item in CuttingOrderUpd.WstageList)
                    {
                        wasteList2.Add(new Repository.Cutting_Wastage_Det
                        {
                            WastageDetId = item.WastageDetId,
                            CuttingIsuuedetId = item.CuttingIsuuedetId,
                            ItemId = item.ItemId,
                            ColorId = item.ColorId,
                            UOMId = item.UOMId,
                            SizeId = item.SizeId,
                            Quantity = item.Quantity,
                            Rate = item.Rate,
                            CuttingReturnid = CuttingOrderUpd.CuttingReturnid
                        });
                    }
                }
                //var cuttingreturnresult2 = CuttingRetDet.AddCuttingWastageDet(wasteList2, "Add");
            }



            var CuttingReturnHeaderId = CuttingRetDet.UpdateData(Cuttingmas, wasteList2);


            //Stock Updation
           // StockStatus = CuttingRetDet.UpdateCuttingReturnTables(CuttingOrderUpd.CuttingReturnNo, "Edit");

            ////Update into Cutting_Wastage_Det 
            //var wasteList = new List<Repository.Cutting_Wastage_Det>();
           
            // wasteList.Add(new Repository.Cutting_Wastage_Det
            //   {
            //      CuttingReturnid = CuttingOrderUpd.CuttingReturnid
            //   });
                   
            //var cuttingreturnresult = CuttingRetDet.AddCuttingWastageDet(wasteList, "Edit");

            //var res = CuttingRetDet.UpdateData(new Domain.CuttingReturn
            //{
            //    CuttingReturnid = CuttingOrderUpd.CuttingReturnid,
            //    Cuttingissueid = CuttingOrderUpd.Cuttingissueid,
            //    CuttingOrdid = CuttingOrderUpd.CuttingOrdid,
            //    CuttingReturnNo = CuttingOrderUpd.CuttingReturnNo,
            //    CuttingReturnDate = CuttingOrderUpd.CuttingReturnDate,
            //    Remarks = CuttingOrderUpd.Remarks,
            //    ToLocation = CuttingOrderUpd.ToLocation,
            //    RetLocType = CuttingOrderUpd.RetLocType,
            //    Createdby = CuttingOrderUpd.Createdby,
            //    CuttingReturnDetail = CuttingOrderUpd.CuttingReturnDetail,

            //    Cutting_Cancel_masid = CuttingOrderUpd.Cutting_Cancel_masid,
            //    Cutting_Cancel_no = CuttingOrderUpd.Cutting_Cancel_no,
            //    Cutting_Cancel_date = CuttingOrderUpd.Cutting_Cancel_date,
            //    Cancel_Ref_no = CuttingOrderUpd.Cancel_Ref_no,
            //    Cancel_Ref_date = CuttingOrderUpd.Cancel_Ref_date,
            //    CancelOrClose = CuttingOrderUpd.CancelOrClose,
            //    WstageList = CuttingOrderUpd.WstageList
            //});

            //var wasteList2 = new List<Repository.Cutting_Wastage_Det>();

            //if (CuttingOrderUpd.WstageList != null)
            //{
            //    if (CuttingOrderUpd.WstageList.Count > 0)
            //    {
            //        foreach (var item in CuttingOrderUpd.WstageList)
            //        {
            //            wasteList2.Add(new Repository.Cutting_Wastage_Det
            //            {
            //                WastageDetId = item.WastageDetId,
            //                CuttingIsuuedetId = item.CuttingIsuuedetId,
            //                ItemId = item.ItemId,
            //                ColorId = item.ColorId,
            //                UOMId = item.UOMId,
            //                SizeId = item.SizeId,
            //                Quantity = item.Quantity,
            //                Rate = item.Rate,
            //                CuttingReturnid = CuttingOrderUpd.CuttingReturnid
            //            });
            //        }
            //    }
            //    var cuttingreturnresult2 = CuttingRetDet.AddCuttingWastageDet(wasteList2, "Add");
            //}



            ////Stock Updation
            //StockStatus = CuttingRetDet.UpdateCuttingReturnTables(CuttingOrderUpd.CuttingReturnNo, "Add");

            string sucess = "Updated Successfully";
            if (CuttingReturnHeaderId > 0)
            {
                sucess = "Updated Successfully";
                StockStatus = true;
            }
            else
            {
                sucess = "Updated Failed..";
                StockStatus = false;
            }


            return new Response<bool>(StockStatus, Status.SUCCESS, sucess);
        }

        public Common.Response<int> CreateCuttingReturn(Domain.CuttingReturn CuttingReturnAdd)
        {
            bool StockStatus = false;

            int cutordid = 0;

            Domain.CuttingReturn Cuttingmas = new Domain.CuttingReturn()
            {
                Cuttingissueid = CuttingReturnAdd.Cuttingissueid,
                CuttingOrdid = CuttingReturnAdd.CuttingOrdid,
                CuttingReturnNo = CuttingReturnAdd.CuttingReturnNo,
                CuttingReturnDate = CuttingReturnAdd.CuttingReturnDate,
                Remarks = CuttingReturnAdd.Remarks,
                ToLocation = CuttingReturnAdd.ToLocation,
                RetLocType = CuttingReturnAdd.RetLocType,
                Createdby = CuttingReturnAdd.Createdby,

                Cutting_Cancel_masid = CuttingReturnAdd.Cutting_Cancel_masid,
                Cutting_Cancel_no = CuttingReturnAdd.Cutting_Cancel_no,
                Cutting_Cancel_date = CuttingReturnAdd.Cutting_Cancel_date,
                Cancel_Ref_no = CuttingReturnAdd.Cancel_Ref_no,
                Cancel_Ref_date = CuttingReturnAdd.Cancel_Ref_date,
                CancelOrClose = CuttingReturnAdd.CancelOrClose,
                CuttingReturnid = CuttingReturnAdd.CuttingReturnid,


            };


            var cuttingList = new List<Domain.CuttingReturnDetail>();
            if (CuttingReturnAdd.CuttingReturnDetail != null)
            {
                if (CuttingReturnAdd.CuttingReturnDetail.Count > 0)
                {
                    foreach (var item in CuttingReturnAdd.CuttingReturnDetail)
                    {
                        cuttingList.Add(new Domain.CuttingReturnDetail
                        {
                            CuttingReturnId = item.CuttingReturnId,
                            CuttingIssueDetid = item.CuttingIssueDetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            Returnqty = item.Returnqty,
                            Lossqty = item.Lossqty,
                            CuttingIssueStckid = item.CuttingIssueStckid,
                            Secqty = item.Secqty,
                            CancelQty = item.CancelQty,
                            CuttingOrdid = cutordid,
                            RecQty = item.RecQty,
                            CuttingOrdDetid = item.CuttingOrdDetid,
                            OrdQty = item.OrdQty,
                            InorOut = item.InorOut,
                        });
                    }
                }
               // var cuttingreturnresult = CuttingRetDet.AddCuttingReceiptDet(cuttingList, "Add");
            }


            var wasteList = new List<Repository.Cutting_Wastage_Det>();
            if (CuttingReturnAdd.WstageList != null)
            {
                if (CuttingReturnAdd.WstageList.Count > 0)
                {
                    foreach (var item in CuttingReturnAdd.WstageList)
                    {
                        wasteList.Add(new Repository.Cutting_Wastage_Det
                        {
                            WastageDetId = item.WastageDetId,
                            CuttingIsuuedetId = item.CuttingIsuuedetId,
                            ItemId = item.ItemId,
                            ColorId = item.ColorId,
                            UOMId = item.UOMId,
                            SizeId = item.SizeId,
                            Quantity = item.Quantity,
                            Rate = item.Rate,
                            CuttingReturnid = item.CuttingReturnid
                        });
                    }
                }
              //  var cuttingreturnresult = CuttingRetDet.AddCuttingWastageDet(wasteList, "Add");
            }

            var CuttingReturnHeaderId = CuttingRetDet.AddData(Cuttingmas, cuttingList, wasteList);

           


            //Insert into Cutting_Return_mas
            //var CuttingReturnHeaderId = CuttingRetDet.AddData(new Domain.CuttingReturn
            //{
            //    Cuttingissueid = CuttingReturnAdd.Cuttingissueid,
            //    CuttingOrdid = CuttingReturnAdd.CuttingOrdid,
            //    CuttingReturnNo = CuttingReturnAdd.CuttingReturnNo,
            //    CuttingReturnDate = CuttingReturnAdd.CuttingReturnDate,
            //    Remarks = CuttingReturnAdd.Remarks,
            //    ToLocation = CuttingReturnAdd.ToLocation,
            //    RetLocType = CuttingReturnAdd.RetLocType,
            //    Createdby = CuttingReturnAdd.Createdby,

            //    Cutting_Cancel_masid = CuttingReturnAdd.Cutting_Cancel_masid,
            //    Cutting_Cancel_no =CuttingReturnAdd.Cutting_Cancel_no,
            //    Cutting_Cancel_date = CuttingReturnAdd.Cutting_Cancel_date,
            //    Cancel_Ref_no = CuttingReturnAdd.Cancel_Ref_no,
            //    Cancel_Ref_date = CuttingReturnAdd.Cancel_Ref_date,
            //    CancelOrClose = CuttingReturnAdd.CancelOrClose,
            //    CuttingReturnid = CuttingReturnAdd.CuttingReturnid,

            //});

            //cutordid=CuttingReturnAdd.CuttingOrdid;


            //Insert into Cutting_Return_Det 
            //var cuttingList = new List<Domain.CuttingReturnDetail>();
            //if (CuttingReturnAdd.CuttingReturnDetail != null)
            //{
            //    if (CuttingReturnAdd.CuttingReturnDetail.Count > 0)
            //    {
            //        foreach (var item in CuttingReturnAdd.CuttingReturnDetail)
            //        {
            //            cuttingList.Add(new Domain.CuttingReturnDetail
            //            {
            //                CuttingReturnId = CuttingReturnHeaderId,
            //                CuttingIssueDetid = item.CuttingIssueDetid,
            //                Itemid = item.Itemid,
            //                Colorid = item.Colorid,
            //                Sizeid = item.Sizeid,
            //                Returnqty = item.Returnqty,
            //                Lossqty = item.Lossqty,
            //                CuttingIssueStckid = item.CuttingIssueStckid,
            //                Secqty = item.Secqty,
            //                CancelQty =item.CancelQty,
            //                CuttingOrdid = cutordid,
            //                RecQty = item.RecQty,
            //                CuttingOrdDetid = item.CuttingOrdDetid,
            //                OrdQty = item.OrdQty,
            //                InorOut = item.InorOut,
            //            });
            //        }
            //    }
            //    var cuttingreturnresult = CuttingRetDet.AddCuttingReceiptDet(cuttingList, "Add");
            //}

            //Insert into Cutting_Wastage_Det 
            //var wasteList = new List<Repository.Cutting_Wastage_Det>();
            //if (CuttingReturnAdd.WstageList != null)
            //{
            //    if (CuttingReturnAdd.WstageList.Count > 0)
            //    {
            //        foreach (var item in CuttingReturnAdd.WstageList)
            //        {
            //            wasteList.Add(new Repository.Cutting_Wastage_Det
            //            {
            //                WastageDetId =item.WastageDetId,
            //                CuttingIsuuedetId =item.CuttingIsuuedetId,
            //                ItemId =item.ItemId,
            //                ColorId =item.ColorId,
            //                UOMId =item.UOMId,
            //                SizeId =item.SizeId,
            //                Quantity =item.Quantity,
            //                Rate =item.Rate,
            //                CuttingReturnid = CuttingReturnHeaderId
            //            });
            //        }
            //    }
            //    var cuttingreturnresult = CuttingRetDet.AddCuttingWastageDet(wasteList, "Add");
            //}

            //Stock Updation
            //StockStatus = CuttingRetDet.UpdateCuttingReturnTables(CuttingReturnAdd.CuttingReturnNo, "Add");
            string sucess="Saved Successfully";
            if (CuttingReturnHeaderId > 0) {
                sucess = "Saved Successfully";
            }else{
                sucess = "Insert Failed..";
            }

            return new Response<int>(CuttingReturnHeaderId, Status.SUCCESS, sucess);
        }

        public Response<IList<Domain.CuttingReturn>> GetMaindt(int Id, string OrderType, string InterExternal, string Fromdate, string Todate, string jobordno, string orderno, string refno, int Supplierid,int employeeid)
        {
            try
            {
                var getmaindt = CuttingRetDet.GetMainData(Id, OrderType, InterExternal, Fromdate, Todate, jobordno, orderno, refno, Supplierid, employeeid);

                return new Response<IList<Domain.CuttingReturn>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.CuttingReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingReturn>> ReturnHeaderInformation(int ReturnID, string JobOrdNo, string CuttingRetNo, int CuttIssueId)
        {
            try
            {
                var CuttingHeaderDt = CuttingRetDet.GetCuttingReturnHeaderInfo(ReturnID, JobOrdNo, CuttingRetNo, CuttIssueId);

                return new Response<IQueryable<CuttingReturn>>(CuttingHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteCuttingOrder(int CuttingReturnId)
        {
            return new Response<bool>(CuttingRetDet.DeleteData(CuttingReturnId), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
