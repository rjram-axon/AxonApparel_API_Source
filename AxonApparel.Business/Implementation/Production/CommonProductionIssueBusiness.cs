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
    public class CommonProductionIssueBusiness : ICommonProductionIssueBusiness
    {
        IcommonProductionIssueRepository CommonProDet = new CommonProductionIssueRepository();

        public Response<IList<CommonProductionIssue>> GetCommonProductionIssueDet(int CompanyId, int CompanyUnitId, int ProcessId, string Ordertype, string ProcessType, string RefNo, string OrdNo)
        {
            try
            {
                var CommonProdDt = CommonProDet.GetCommonProductionIssueCompDetails(CompanyId, CompanyUnitId, ProcessId, Ordertype, ProcessType, RefNo, OrdNo).ToList();

                return new Response<IList<CommonProductionIssue>>(CommonProdDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProductionIssue>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        //Load Item in Edit Mode
        public Response<IList<CommonProductionIssueDet>> GetCommProdIssueItemDetforEdit(int ProdIssueId)
        {
            try
            {
                var CommonProdItmstckDt = CommonProDet.GetCommProdIssItemDetailsforEdit(ProdIssueId).ToList();

                return new Response<IList<CommonProductionIssueDet>>(CommonProdItmstckDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProductionIssueDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        //Load Job Orders in Edit Mode
        public Response<IList<CommonProductionJobOrderDet>> GetCommonProductionJobOrderDet(int ProdIssueId)
        {
            try
            {
                var CommonProdjobordDt = CommonProDet.GetCommProdJobOrdDetailsforEdit(ProdIssueId).ToList();

                return new Response<IList<CommonProductionJobOrderDet>>(CommonProdjobordDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProductionJobOrderDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        //Load Item in Add Mode
        public Response<IList<CommonProductionIssueDet>> GetCommonProductionIssueItemStckDet(string NoofPrgId, string InorOut)
        {
            try
            {
                var CommonProdItmstckDt = CommonProDet.GetCommonProductionIssueDetails(NoofPrgId, InorOut).ToList();

                return new Response<IList<CommonProductionIssueDet>>(CommonProdItmstckDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProductionIssueDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        //Load Job Orders in Add Mode
        public Response<IList<CommonProductionJobOrderDet>> GetCommonProductionJobOrderDet(string ProdPrgId)
        {
            try
            {
                var CommonProdjobordDt = CommonProDet.GetCommonProductionJobOrdDetails(ProdPrgId).ToList();

                return new Response<IList<CommonProductionJobOrderDet>>(CommonProdjobordDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProductionJobOrderDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        //Load Stock in Add Mode
        public Response<IList<CommonProductionStckDet>> GetCommonProductionJobOrderDet(int CompanyId, string JobOrdNo, int Itemid, int Colorid, int Sizeid,string Programid,int storeid)
        {
            try
            {
                var CommonProdStckOrdDt = CommonProDet.GetCommonProductionStckDet(CompanyId, JobOrdNo, Itemid, Colorid, Sizeid, Programid,storeid).ToList();

                return new Response<IList<CommonProductionStckDet>>(CommonProdStckOrdDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProductionStckDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        //Load Stock in Edit Mode
        public Response<IList<CommonProductionStckDet>> GetCommonProductionJobOrderDetforEdit(int CompanyId, int ProdIssueId)
        {
            try
            {
                var CommonProdStckOrdDt = CommonProDet.GetCommonProductionStckDetforEdit(CompanyId, ProdIssueId).ToList();

                return new Response<IList<CommonProductionStckDet>>(CommonProdStckOrdDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProductionStckDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProductionIssueMas>> GetCommProdIssHeaderInformation(int ProdIssueId)
        {
            try
            {
                var CuttingHeaderDetails = CommonProDet.GetCommProdIssueHeaderInfo(ProdIssueId);

                return new Response<IQueryable<ProductionIssueMas>>(CuttingHeaderDetails, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProductionIssueMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateCommProdIss(Domain.CommonProductionIssue ProductionIssUpdate)
        {

            try
            {

                AxonApparel.Repository.Prod_iss_mas ProdUpd = new AxonApparel.Repository.Prod_iss_mas
              {
                  ProdIssueId = ProductionIssUpdate.ProductionId,
                  ProdIssueNo = ProductionIssUpdate.ProdOrder,
                  ProdIssueDate = ProductionIssUpdate.ProcessorDate,
                  ProcessorId = ProductionIssUpdate.ProcessorId,
                  ProcessId = ProductionIssUpdate.ProcessId,
                  CompanyUnitId = ProductionIssUpdate.CompUnitId,            
                  CompanyId = ProductionIssUpdate.CompanyId,
                  GatePassVehicle = ProductionIssUpdate.GatePassVehicle,
                  Remarks = ProductionIssUpdate.Remarks,

              };

                var ItmList = new List<Prod_iss_det>();

                foreach (var PItem in ProductionIssUpdate.ProdIssueDet)
                {
                    ItmList.Add(new Prod_iss_det
                    {
                        ProdIssueId = PItem.ProductionId,
                        ProdIssueDetId = PItem.ProductionDetId,
                        itemid = PItem.ItemId,
                        colorid = PItem.ColorId,
                        sizeid = PItem.SizeId,
                        Rate = PItem.Rate,
                        IssueQty = PItem.IssueQty,                     


                    });

                }

                var ItmstkList = new List<Prod_iss_JobDet>();

                foreach (var stk in ProductionIssUpdate.ProdIssueJobOrdDet)
                {
                    ItmstkList.Add(new Prod_iss_JobDet
                    {
                        ProdIssueId = stk.ProcessIssId,
                        ProdIssueDetId = stk.ProdDetId,
                        ProdIssueJobId = stk.ProcessJobDetId,
                        IssueQty = stk.IssQty,
                        ItemId = stk.ItemId,
                        ColorId = stk.ColorId,
                        SizeId = stk.SizeId,                       
                        Job_ord_no = stk.JobOrdNo,
                        ProdPrgNo = stk.ProdPrgNo,
                        SecQty = stk.SecQty,

                    });

                }


                var StkList = new List<Prod_Iss_Stock>();

                if (ProductionIssUpdate.ProdIssueStck != null)
                {
                    foreach (var stkdet in ProductionIssUpdate.ProdIssueStck)
                    {

                        StkList.Add(new Prod_Iss_Stock
                        {
                            ProdIssStockId = stkdet.ProdStockDetId,
                            ProdIssueJobid = stkdet.ProdJobDetId,
                            IssueQty = stkdet.Issues,
                            ItemStockId=stkdet.StockId,
                            Itemid=stkdet.ItemId,
                            Colorid=stkdet.ColorId,
                            Sizeid = stkdet.SizeId,
                        });

                    }
                }

                var result = CommonProDet.UpdateData(ProdUpd, ItmList, ItmstkList, StkList, ProductionIssUpdate.ProdIssueStck);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }

        public Common.Response<bool> CreateProductionIss(Domain.ProductionIssueMas ProductionIssAdd)
        {
            //Insert into Prod_iss_det 
            var ProdissdetList = new List<Domain.ProductionIssueDet>();

            if (ProductionIssAdd.ProdIssueDet.Count > 0)
            {
                foreach (var item in ProductionIssAdd.ProdIssueDet)
                {
                    if (item.IssueQty > 0)
                    {
                        ProdissdetList.Add(new Domain.ProductionIssueDet
                        {
                            //ProdIssueId = ProductionIssueMasId,
                            ItemId = item.ItemId,
                            ColorId = item.ColorId,
                            SizeId = item.SizeId,
                            IssueQty = item.IssueQty,
                            UomId = item.UomId,
                            IPMarkupRate = item.IPMarkupRate,
                            Rate = item.Rate
                        });
                    }
                }
            }

            //var prodissueDetresult = CommonProDet.AddProductionIssueDet(ProdissdetList, "Add", ProductionIssAdd);


            //Insert into prod_iss_jobdet and Update Issue Qty in Prod_Prg_Det
            var ProdissjoborddetList = new List<Domain.ProductionIssueJobDet>();

            if (ProductionIssAdd.ProdIssueJobOrdDet.Count > 0)
            {
                foreach (var item in ProductionIssAdd.ProdIssueJobOrdDet)
                {
                    if (item.IssQty > 0)
                    {
                        ProdissjoborddetList.Add(new Domain.ProductionIssueJobDet
                        {
                            //ProdIssueId = ProductionIssueMasId,
                            ProdIssueDetId = item.ProdIssueDetId,
                            JobOrdNo = item.JobOrdNo,
                            ProdPrgNo = item.ProdPrgNo,
                            IssQty = item.IssQty,
                            ItemId = item.ItemId,
                            ColorId = item.ColorId,
                            SizeId = item.SizeId,
                            LastProcessId = (int)ProductionIssAdd.LastProcessId,
                        });
                    }
                }
            }

            //var prodissuejobDetresult = CommonProDet.AddProductionIssueJobDet(ProdissjoborddetList, "Add");

            //Insert into prod_iss_stock
            var ProdissjobordstckdetList = new List<Domain.ProductionIssueStock>();

            if (ProductionIssAdd.ProdIssueStck.Count > 0)
            {
                foreach (var itemstck in ProductionIssAdd.ProdIssueStck)
                {
                    if (itemstck.Issues > 0)
                    {
                        ProdissjobordstckdetList.Add(new Domain.ProductionIssueStock
                        {
                            //ProdIssueId = ProductionIssueMasId,
                            ProdIssueJobId = 0,
                            StockId = itemstck.StockId,
                            Issues = itemstck.Issues,
                            ItemId = itemstck.ItemId,
                            ColorId = itemstck.ColorId,
                            SizeId = itemstck.SizeId,
                            Markuprate=itemstck.Markuprate
                        });
                    }
                }
            }

            //var prodissuestckresult = CommonProDet.AddProductionIssueStck(ProdissjobordstckdetList, "Add");

            //Insert into Prod_iss_mas
            var ProductionIssueMasId = CommonProDet.AddProductionIssue(new Domain.ProductionIssueMas
            {
                ProdIssueNo = ProductionIssAdd.ProdIssueNo,
                ProdIssueDate = ProductionIssAdd.ProdIssueDate,
                ProdOrdId = ProductionIssAdd.ProdOrdId,
                Remarks = ProductionIssAdd.Remarks,
                GatePassVehicle = ProductionIssAdd.GatePassVehicle,
                IssueStoreId = ProductionIssAdd.IssueStoreId,
                Createdby = ProductionIssAdd.Createdby,
                InterExter = ProductionIssAdd.InterExter,
                ProcessorId = ProductionIssAdd.ProcessorId,
                ProcessId = ProductionIssAdd.ProcessId,
                CompanyUnitId = ProductionIssAdd.CompanyUnitId,
                OrderType = ProductionIssAdd.OrderType,
                CompanyId = ProductionIssAdd.CompanyId,
                LastProcessId = (int)ProductionIssAdd.LastProcessId,
                ProdIssueDet = ProdissdetList,
                ProdIssueJobOrdDet = ProdissjoborddetList,
                ProdIssueStck = ProdissjobordstckdetList,
            });

            ////Insert into Item_stock_outward
            //var ProdissstckoutList = new List<Domain.ProductionStockOutward>();

            //if (ProductionIssAdd.ProdIssueStck.Count > 0)
            //{
            //    foreach (var itemprod in ProductionIssAdd.ProdIssueDet)
            //    {
            //        foreach (var item in ProductionIssAdd.ProdIssueStck)
            //        {
            //            ProdissstckoutList.Add(new Domain.ProductionStockOutward
            //            {
            //                ItemStockId = item.ItemstckId,
            //                //UnitorOther = 0,
            //                OutwardDate = ProductionIssAdd.ProdIssueDate,
            //                TransNo = ProductionIssAdd.ProdIssueNo,
            //                TransType = "CIS",
            //                Quantity = item.IssueQty,
            //                //Rate = item.SizeId,
            //                //JobOrdNo=itemprod.

            //            });
            //        }
            //    }
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
            //var cuttingdetList = new List<Domain.CuttingOrderDetail>(CuttingOrderAdd.cuttingorddet.Cast<CuttingOrderDetail>()
            //                                                                                      .Where(d => d.InOrOut == "I").ToList());

            //var cuttingIssueList = new List<Domain.CuttingOrderDetail>();

            //if (cuttingdetList.Count > 0)
            //{
            //    foreach (var item in cuttingdetList)
            //    {
            //        cuttingIssueList.Add(new Domain.CuttingOrderDetail
            //        {
            //            CuttingOrderId = CuttingIssueHeaderId,
            //            Itemid = item.Itemid,
            //            Colorid = item.Colorid,
            //            Sizeid = item.Sizeid,
            //            Issuedqty = item.issqty,
            //            rate = item.rate,
            //            SecQty = item.SecQty,
            //        });
            //    }
            //}

            //var cuttingIssueDetresult = CuttingDet.AddCuttingIssueDet(cuttingIssueList, "Add");

            ////Insert into Cutting_Issue_Stock

            //var CuttingIssueStckList = new List<Domain.CuttingOrderDetail>();

            //if (CuttingOrderAdd.cuttingordstckdet.Count > 0)
            //{
            //    foreach (var item in CuttingOrderAdd.cuttingordstckdet)
            //    {
            //        CuttingIssueStckList.Add(new Domain.CuttingOrderDetail
            //        {
            //            CuttingIssueId = CuttingIssueHeaderId,
            //            qty = item.AllotedQty,
            //            StockId = item.Stockid,
            //            Itemid = item.ItemId,
            //            Colorid = item.ColorId,
            //            Sizeid = item.SizeId,
            //        });
            //    }
            //}

            //var cuttingIssuesStock = CuttingDet.AddCuttingIssueStock(CuttingIssueStckList, "Add");


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

            return new Response<bool>(ProductionIssueMasId, Status.SUCCESS, "Saved Successfully");
        }

        public Response<bool> DeleteCommProdIssue(Domain.CommonProductionIssue ProductionIssDelete)
        {
           // return new Response<bool>(CommonProDet.DeleteCPIssue(ProdIssid), Status.SUCCESS, "Deleted Successfully");


            try
            {

                AxonApparel.Repository.Prod_iss_mas ProdUpd = new AxonApparel.Repository.Prod_iss_mas
                {
                    ProdIssueId = ProductionIssDelete.ProductionId,
                    ProdIssueNo = ProductionIssDelete.ProdOrder,
                    ProdIssueDate = ProductionIssDelete.ProcessorDate,
                    ProcessorId = ProductionIssDelete.ProcessorId,
                    ProcessId = ProductionIssDelete.ProcessId,
                    CompanyUnitId = ProductionIssDelete.CompUnitId,
                    CompanyId = ProductionIssDelete.CompanyId,


                };

                var ItmList = new List<Prod_iss_det>();

                foreach (var PItem in ProductionIssDelete.ProdIssueDet)
                {
                    ItmList.Add(new Prod_iss_det
                    {
                        ProdIssueId = PItem.ProductionId,
                        ProdIssueDetId = PItem.ProductionDetId,
                        itemid = PItem.ItemId,
                        colorid = PItem.ColorId,
                        sizeid = PItem.SizeId,
                        Rate = PItem.Rate,
                        IssueQty = PItem.IssueQty,


                    });

                }

                var ItmstkList = new List<Prod_iss_JobDet>();

                foreach (var stk in ProductionIssDelete.ProdIssueJobOrdDet)
                {
                    ItmstkList.Add(new Prod_iss_JobDet
                    {
                        ProdIssueId = stk.ProcessIssId,
                        ProdIssueDetId = stk.ProdDetId,
                        ProdIssueJobId = stk.ProcessJobDetId,
                        IssueQty = stk.IssQty,
                        ItemId = stk.ItemId,
                        ColorId = stk.ColorId,
                        SizeId = stk.SizeId,
                        Job_ord_no = stk.JobOrdNo,
                        ProdPrgNo = stk.ProdPrgNo,
                        SecQty = stk.SecQty,

                    });

                }


                var StkList = new List<Prod_Iss_Stock>();

                if (ProductionIssDelete.ProdIssueStck != null)
                {
                    foreach (var stkdet in ProductionIssDelete.ProdIssueStck)
                    {

                        StkList.Add(new Prod_Iss_Stock
                        {
                            ProdIssStockId = stkdet.ProdStockDetId,
                            ProdIssueJobid = stkdet.ProdJobDetId,
                            IssueQty = stkdet.Issues,
                            ItemStockId = stkdet.StockId,
                            Itemid = stkdet.ItemId,
                            Colorid = stkdet.ColorId,
                            Sizeid = stkdet.SizeId,


                        });

                    }
                }

                var result = CommonProDet.DeleteCPIssue(ProdUpd, ItmList, ItmstkList, StkList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }

        public Response<IList<Domain.ProductionMainGridDetails>> GetMaindt(int CompId, string Fromdate, string Todate, string OrderType, int ProcessId, int UnitId, int IssId, string Refno, string JobOrdNo, string OrdNo, string ProcessorType)
        {
            try
            {
                var getmaindt = CommonProDet.GetMainData(CompId, Fromdate, Todate, OrderType, ProcessId, UnitId, IssId, Refno, JobOrdNo, OrdNo, ProcessorType);

                return new Response<IList<Domain.ProductionMainGridDetails>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ProductionMainGridDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
