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
    public class CuttingOrderReceiptBusiness : ICuttingOrderReceiptBusiness
    {
        ICuttingOrderReceiptRepository CuttingDet = new CuttingOrderReceiptRepository();

        public Response<IQueryable<CuttingReceipt>> GetCuttingReceiptInfo()
        {
            try
            {
                var CuttingHeaderDt = CuttingDet.GetCuttingReceiptInf();

                return new Response<IQueryable<CuttingReceipt>>(CuttingHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReceipt>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingReceipt>> ReceiptHeaderInformation(int CuttingReceiptID, int CuttingOrderID)
        {
            try
            {
                var CuttingHeaderDt = CuttingDet.GetCuttingReceiptHeaderInfo(CuttingReceiptID, CuttingOrderID);

                return new Response<IQueryable<CuttingReceipt>>(CuttingHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReceipt>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingReceipt>> GetCuttingOrderDetails(int CompanyId, int CompanyUnitId, string OrdType, string refno, int styleid, string ordo, int buyerid, string jobordno, string inorext)
        {
            try
            {
                var CuttingOrderrecDt = CuttingDet.GetCuttingRecptDetails(CompanyId, CompanyUnitId, OrdType, refno, styleid, ordo, buyerid, jobordno, inorext);

                return new Response<IQueryable<CuttingReceipt>>(CuttingOrderrecDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReceipt>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingReceiptDetails>> GetCuttingDetails(int CuttingOrdId)
        {
            try
            {
                var CuttingOrderrecDt = CuttingDet.GetCuttingRcptDet(CuttingOrdId);

                return new Response<IQueryable<CuttingReceiptDetails>>(CuttingOrderrecDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReceiptDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingReceiptDetails>> GetCuttingGrammageDet(string OrderNo, int StyleId, string JobNo)
        {
            try
            {
                var Cuttinggrammage = CuttingDet.GetCuttingGrammagePer(OrderNo, StyleId, JobNo);

                return new Response<IQueryable<CuttingReceiptDetails>>(Cuttinggrammage, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingReceiptDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> CreateCuttingReceipt(Domain.CuttingReceipt CuttingReceiptAdd)
        {
            bool StockStatus = false;

            //Insert into Cutting_Recpt_Mas

            var CuttingReceiptHeaderId = CuttingDet.AddData(new Domain.CuttingReceipt
            {
                CuttingReceiptNo = CuttingReceiptAdd.CuttingReceiptNo,
                CuttingReceiptDate = CuttingReceiptAdd.CuttingReceiptDate,
                RefNo = CuttingReceiptAdd.RefNo,
                RefDate = CuttingReceiptAdd.RefDate,
                CuttingOrdId = CuttingReceiptAdd.CuttingOrdId,
                ShiftId = CuttingReceiptAdd.ShiftId,
                Remarks = CuttingReceiptAdd.Remarks,
                ConvType = CuttingReceiptAdd.ConvType,
                ToStoreId = CuttingReceiptAdd.ToStoreId,
                CreatedBy = CuttingReceiptAdd.CreatedBy,
                cuttingreceiptdet = CuttingReceiptAdd.cuttingreceiptdet,
                cuttingbundle = CuttingReceiptAdd.cuttingbundle,
            });

            ////Insert into Cutting_Recpt_Det 
            //var cuttingList = new List<Domain.CuttingReceiptDetails>();
            ////var receiptbundlecount = 0;

            //if (CuttingReceiptAdd.cuttingreceiptdet != null)
            //{
            //    if (CuttingReceiptAdd.cuttingreceiptdet.Count > 0)
            //    {
            //        //if (CuttingReceiptAdd.cuttingbundle != null)
            //        //{
            //        //    receiptbundlecount = CuttingReceiptAdd.cuttingbundle.Count;
            //        //}
            //        //else
            //        //{
            //        //    receiptbundlecount = 0;
            //        //}

            //        foreach (var item in CuttingReceiptAdd.cuttingreceiptdet)
            //        {
            //            cuttingList.Add(new Domain.CuttingReceiptDetails
            //            {
            //                CuttingReceiptId = CuttingReceiptHeaderId,
            //                ItemId = item.ItemId,
            //                ColorId = item.ColorId,
            //                SizeId = item.SizeId,
            //                Recqty = item.Recqty,
            //                Rate = item.Rate,
            //                CuttingOrdDetId = item.CuttingOrdDetId,
            //                Nobundle = item.Nobundle,
            //                Grammage = item.Grammage,
            //                Weight = item.Weight,
            //            });
            //        }
            //    }
            //    var cuttingIssueDetresult = CuttingDet.AddCuttingReceiptDet(cuttingList, "Add");
            //}

            //Insert into Cutting_Recpt_Bundle
            //Filtering in Arraylist

            //var cuttingBundleList = new List<Domain.CuttingBundle>();
            //if (CuttingReceiptAdd.cuttingbundle != null)
            //{
            //    if (CuttingReceiptAdd.cuttingbundle.Count > 0)
            //    {
            //        foreach (var item in CuttingReceiptAdd.cuttingbundle)
            //        {
            //            cuttingBundleList.Add(new Domain.CuttingBundle
            //            {
            //                CuttingOrddetid = item.CuttingOrddetid,
            //                BundleNo = item.BundleNo,
            //                Bundleqty = item.Bundleqty,
            //                Employeeid = item.Employeeid,
            //            });
            //        }
            //    }
            //    var cuttingRecptbundleresult = CuttingDet.AddCuttingBundle(cuttingBundleList, "Add");
            //}

            ////Update Markup Rate
            //var MarkUpRate = CuttingDet.UpdateMarkUpRate(CuttingReceiptAdd.CuttingOrdId);

            ////Stock Updation
            //StockStatus = CuttingDet.UpdateStockTable(CuttingReceiptAdd, "Add");

            return new Response<bool>(CuttingReceiptHeaderId, Status.SUCCESS, "Saved Successfully");
        }

        public Response<IList<Domain.CuttingReceipt>> GetMaindt(int Id, string OrderType, string InterExternal, string Fromdate, string Todate, int companyid, string jobordno,
            string orderno, string refno, int employeeid, int unitid)
        {
            try
            {
                var getmaindt = CuttingDet.GetMainData(Id, OrderType, InterExternal, Fromdate, Todate, companyid, jobordno, orderno, refno, employeeid, unitid);

                return new Response<IList<Domain.CuttingReceipt>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.CuttingReceipt>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateCuttingReceipt(Domain.CuttingReceipt CuttingReceiptUpd)
        {
            var res = CuttingDet.UpdateData(new Domain.CuttingReceipt
            {
                CuttingReceiptId = CuttingReceiptUpd.CuttingReceiptId,
                CuttingOrdId = CuttingReceiptUpd.CuttingOrdId,
                CuttingReceiptNo=CuttingReceiptUpd.CuttingReceiptNo,
                ShiftId = CuttingReceiptUpd.ShiftId,
                RefNo = CuttingReceiptUpd.RefNo,
                Remarks = CuttingReceiptUpd.Remarks,
                cuttingbundle = CuttingReceiptUpd.cuttingbundle,
                cuttingreceiptdet = CuttingReceiptUpd.cuttingreceiptdet,
            });

            return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteCuttingOrderReceipt(int CuttingRecptId, int Styleid, string CuttRcptno, string OrderNo)
        {
            return new Response<bool>(CuttingDet.DeleteData(CuttingRecptId, Styleid, CuttRcptno, OrderNo), Status.SUCCESS, "Deleted Successfully");
        }

    }
}
