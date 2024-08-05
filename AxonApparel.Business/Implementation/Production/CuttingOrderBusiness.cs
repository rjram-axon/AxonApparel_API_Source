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
    public class CuttingOrderBusiness : ICuttingOrderBusiness
    {
        ICuttingOrderRepository CuttingDet = new CuttingOrderRepository();

        public Response<IQueryable<CuttingOrder>> GetCuttingOrderInfo()
        {
            try
            {
                var CuttingHeaderDt = CuttingDet.GetCuttingOrderInf();

                return new Response<IQueryable<CuttingOrder>>(CuttingHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingOrder>> GetCuttingOrderDetails(int CompanyId, int CompanyUnitId, string OrderType, string refno, int styleid, string ordo,int Buyerid)
        {
            try
            {
                var CuttingOrderDt = CuttingDet.GetTrimsDetails(CompanyId, CompanyUnitId, OrderType, refno, styleid, ordo,Buyerid);

                return new Response<IQueryable<CuttingOrder>>(CuttingOrderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingOrder>> GetCuttingHeaderDetails(string JobOrdNo)
        {
            try
            {
                var CuttingHeaderDt = CuttingDet.GetCuttingHeaderDet(JobOrdNo);

                return new Response<IQueryable<CuttingOrder>>(CuttingHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingOrder>> GetCuttingHeaderInformation(int CuttingOrdID)
        {
            try
            {
                var CuttingHeaderDetails = CuttingDet.GetCuttingHeaderInfo(CuttingOrdID);

                return new Response<IQueryable<CuttingOrder>>(CuttingHeaderDetails, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingOrderStockProperties>> GetInputItemStockInfo(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId, int Supplierid, string Processortype)
        {
            try
            {
                var ItemStockDt = CuttingDet.GetItemStockInfo(JobOrdNo, CompanyId, IssueStoreId, StyleId, ColorId, ItemId, SizeId, Supplierid, Processortype);

                return new Response<IQueryable<CuttingOrderStockProperties>>(ItemStockDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingOrderStockProperties>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingOrderStockProperties>> GetInputItemStockInfoEditMode(int CuttingOrdId, int ItemID, int ColorID, int SizeID)
        {
            try
            {
                var ItemStockDt = CuttingDet.GetItemStockInfoEditMode(CuttingOrdId, ItemID, ColorID, SizeID);

                return new Response<IQueryable<CuttingOrderStockProperties>>(ItemStockDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingOrderStockProperties>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        //public Response<IList<Domain.CuttingOrder>> GetMaindt(int Id, string Fromdate, string Todate)
        //{
        //    try
        //    {
        //        var getmaindt = CuttingDet.GetMainData(Id, Fromdate, Todate);

        //        return new Response<IList<Domain.CuttingOrder>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
        //        //return res;
        //    }
        //    catch (Exception)
        //    {
        //        return new Response<IList<Domain.CuttingOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
        //    }
        //}

        public Response<IList<Domain.CuttingOrder>> GetMaindt(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string cuttingordno, string jobordno, string FromDate, string ToDate,int supplierid)
        {
            try
            {
                var getmaindt = CuttingDet.GetMainData(compid, unitid, buyerid, masid, empid, refno, orderno, supptype, ordtype, cuttingordno, jobordno, FromDate, ToDate,supplierid);

                return new Response<IList<Domain.CuttingOrder>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.CuttingOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.CuttingOrder>> GetInputOutDet(int Prodprgid, string JobOrdNo, string Ordertype)
        {
            try
            {
                var getmaindt = CuttingDet.GetInputOutputDetails(Prodprgid, JobOrdNo, Ordertype);

                return new Response<IList<Domain.CuttingOrder>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.CuttingOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.CuttingOrder>> GetAllIssueNo()
        {
            try
            {
                var getmaindt = CuttingDet.GetAllIssueNo();

                return new Response<IList<Domain.CuttingOrder>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.CuttingOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.CuttingOrder>> GetInputOutDetEdit(int CuttingOrdMasId, int Prodprgid)
        {
            try
            {
                var getmaindt = CuttingDet.GetInputOutputEdit(CuttingOrdMasId, Prodprgid);

                return new Response<IList<Domain.CuttingOrder>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.CuttingOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateCuttingOrder(Domain.CuttingOrder CuttingOrderUpd)
        {
            var res = CuttingDet.UpdateData(new Domain.CuttingOrder
            {
                CuttingOrdId = CuttingOrderUpd.CuttingOrdId,
                EmployeeId = CuttingOrderUpd.EmployeeId,
                Remarks = CuttingOrderUpd.Remarks,
                LossPer = CuttingOrderUpd.LossPer,
                cuttingorddet = CuttingOrderUpd.cuttingorddet,
                cuttingordstckdet = CuttingOrderUpd.cuttingordstckdet,
            });

            return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> CreateCuttingOrder(Domain.CuttingOrder CuttingOrderAdd)
        {
            //Insert into Cutting_Order_Mas
            var CuttingOrderHeaderId = CuttingDet.AddData(new Domain.CuttingOrder
            {
                CuttingOrdNo = CuttingOrderAdd.CuttingOrdNo,
                OrderNo = CuttingOrderAdd.OrderNo,
                CuttingOrdDate = CuttingOrderAdd.CuttingOrdDate,
                EmployeeId = CuttingOrderAdd.EmployeeId,
                Remarks = CuttingOrderAdd.Remarks,
                OrderCumIssue = CuttingOrderAdd.OrderCumIssue,
                CompanyUnitId = CuttingOrderAdd.CompanyUnitId,
                CompanyId = CuttingOrderAdd.CompanyId,
                InorOut = CuttingOrderAdd.InorOut,
                OrderType = CuttingOrderAdd.OrderType,
                WorkDivisionId = CuttingOrderAdd.WorkDivisionId,
                LossPer = CuttingOrderAdd.LossPer,
                ProdPrgId = CuttingOrderAdd.ProdPrgId,
                Convtype = CuttingOrderAdd.Convtype,
                DeliverDate = CuttingOrderAdd.DeliverDate,
                CreatedBy = CuttingOrderAdd.CreatedBy,
                Saccode = CuttingOrderAdd.Saccode,
                cuttingorddet = CuttingOrderAdd.cuttingorddet,
                cuttingordstckdet = CuttingOrderAdd.cuttingordstckdet,
                FromStoreId = CuttingOrderAdd.FromStoreId,
                Type = CuttingOrderAdd.Type
            });

            ////Insert into Cutting_Order_Det and Updating OrderQty in Prod_prg_Det
            //var cuttingList = new List<Domain.CuttingOrderDetail>();
            //if (CuttingOrderAdd.cuttingorddet != null)
            //{
            //    if (CuttingOrderAdd.cuttingorddet.Count > 0)
            //    {
            //        foreach (var item in CuttingOrderAdd.cuttingorddet)
            //        {
            //            cuttingList.Add(new Domain.CuttingOrderDetail
            //            {
            //                CuttingOrderId = CuttingOrderHeaderId,
            //                Itemid = item.Itemid,
            //                Colorid = item.Colorid,
            //                Sizeid = item.Sizeid,
            //                PlannedSizeid = item.Sizeid,
            //                Inp_op = item.InOrOut,
            //                Consumption = item.Consumption,
            //                weight = item.weight,
            //                OrderQty = item.ordqty,
            //                Issuedqty = item.issqty,
            //                rate = item.rate,
            //                MarkupRate=item.MarkupRate,
            //            });
            //        }
            //    }
            //    var cuttingDetresult = CuttingDet.AddCuttingOrdDet(cuttingList, "Add", CuttingOrderAdd.ProdPrgId);
            //}

            ////Insert into Cutting_Issue_Mas 
            //var CuttingIssueHeaderId = CuttingDet.AddCuttingIssue(new Domain.CuttingOrder
            //{
            //    CuttingOrdId = CuttingOrderHeaderId,
            //    OrderCumIssue = CuttingOrderAdd.OrderCumIssue,
            //    CuttingOrdDate = CuttingOrderAdd.CuttingOrdDate,
            //    FromStoreId = CuttingOrderAdd.FromStoreId,
            //    Remarks = CuttingOrderAdd.Remarks,
            //    CreatedBy = CuttingOrderAdd.CreatedBy,
            //    IsApproved = 1,
            //});

            ////Insert into Cutting_Issue_Det
            ////Filtering in Arraylist
            //if (CuttingOrderAdd.cuttingorddet != null)
            //{
            //    var cuttingdetList = new List<Domain.CuttingOrderDetail>(CuttingOrderAdd.cuttingorddet.Cast<CuttingOrderDetail>()
            //                                                                                          .Where(d => d.InOrOut == "I").ToList());

            //    var cuttingIssueList = new List<Domain.CuttingOrderDetail>();

            //    if (cuttingdetList.Count > 0)
            //    {
            //        foreach (var item in cuttingdetList)
            //        {
            //            cuttingIssueList.Add(new Domain.CuttingOrderDetail
            //            {
            //                CuttingOrderId = CuttingIssueHeaderId,
            //                Itemid = item.Itemid,
            //                Colorid = item.Colorid,
            //                Sizeid = item.Sizeid,
            //                Issuedqty = item.issqty,
            //                rate = item.rate,
            //                SecQty = item.SecQty,
            //            });
            //        }
            //    }

            //    var cuttingIssueDetresult = CuttingDet.AddCuttingIssueDet(cuttingIssueList, "Add");
            //}

            ////Insert into Cutting_Issue_Stock
            //if (CuttingOrderAdd.cuttingordstckdet != null)
            //{
            //    var CuttingIssueStckList = new List<Domain.CuttingOrderDetail>();

            //    if (CuttingOrderAdd.cuttingordstckdet.Count > 0)
            //    {
            //        foreach (var item in CuttingOrderAdd.cuttingordstckdet)
            //        {
            //            CuttingIssueStckList.Add(new Domain.CuttingOrderDetail
            //            {
            //                CuttingIssueId = CuttingIssueHeaderId,
            //                qty = item.AllotedQty,
            //                StockId = item.Stockid,
            //                Itemid = item.ItemId,
            //                Colorid = item.ColorId,
            //                Sizeid = item.SizeId,                            
            //            });
            //        }
            //    }

            //    var cuttingIssuesStock = CuttingDet.AddCuttingIssueStock(CuttingIssueStckList, "Add");
            //}

            ////Insert into Item_Stock_Outward

            //var cuttingIssuestckoutwardList = new List<Domain.CuttingOrderDetail>();
            //if (CuttingOrderAdd.cuttingordstckdet != null)
            //{
            //    if (CuttingOrderAdd.cuttingordstckdet.Count > 0)
            //    {
            //        foreach (var item in CuttingOrderAdd.cuttingordstckdet)
            //        {
            //            cuttingIssuestckoutwardList.Add(new Domain.CuttingOrderDetail
            //            {
            //                CuttingIssueId = CuttingIssueHeaderId,
            //                Outwardate = CuttingOrderAdd.CuttingOrdDate,
            //                TransNo = CuttingOrderAdd.OrderCumIssue,
            //                TransType = "CIS",
            //                JobOrderNo = CuttingOrderAdd.OrderNo,
            //                CuttingOrderId = CuttingIssueHeaderId,
            //                UnitOrOther = "O",
            //                qty = item.AllotedQty,
            //                StockId = item.Stockid,
            //                CuttingIssueDetId = 0,
            //                Itemid = item.ItemId,
            //                Colorid = item.ColorId,
            //                Sizeid = item.SizeId,
            //            });
            //        }
            //    }
            //    var cuttingIssuestockoutward = CuttingDet.AddCuttingStockOutward(cuttingIssuestckoutwardList, "Add");
            //}

            //bool UCMR = CuttingDet.MarkUpRateUpdation(CuttingOrderHeaderId);

            return new Response<bool>(CuttingOrderHeaderId, Status.SUCCESS, "Saved Successfully");
        }

        public Response<bool> DeleteCuttingOrder(int CuttingOrdId)
        {
            return new Response<bool>(CuttingDet.DeleteData(CuttingOrdId), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
