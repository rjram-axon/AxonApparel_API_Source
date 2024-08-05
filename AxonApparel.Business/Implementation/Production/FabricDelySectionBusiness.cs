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
    public class FabricDelySectionBusiness : IFabricDelySectionBusiness
    {
        IFabricDelySectionRepository Fabrep = new FabricDelySectionRepository();

        public Response<IQueryable<FabricDelySection>> GetFaricDelySectionOrderList(int CompanyId, int CompanyUnitId, string OrderType, string refno, int styleid, string ordo, int Buyerid)
        {
            try
            {
                var CuttingOrderDt = Fabrep.GetFaricDelySectionOrderList(CompanyId, CompanyUnitId, OrderType, refno, styleid, ordo, Buyerid);

                return new Response<IQueryable<FabricDelySection>>(CuttingOrderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<FabricDelySection>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.FabricDelySection>> GetInputOutDet(int Prodprgid, string JobOrdNo, string Ordertype)
        {
            try
            {
                var getmaindt = Fabrep.GetInputOutputDetails(Prodprgid, JobOrdNo, Ordertype);

                return new Response<IList<Domain.FabricDelySection>>(getmaindt, Status.SUCCESS, "Fetched Successfully");               
            }
            catch (Exception)
            {
                return new Response<IList<Domain.FabricDelySection>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<CuttingOrderStockProperties>> GetInputItemStockInfo(string JobOrdNo, int CompanyId, int IssueStoreId, int StyleId, int ColorId, int ItemId, int SizeId)
        {
            try
            {
                var ItemStockDt = Fabrep.GetItemStockInfo(JobOrdNo, CompanyId, IssueStoreId, StyleId, ColorId, ItemId, SizeId);

                return new Response<IQueryable<CuttingOrderStockProperties>>(ItemStockDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CuttingOrderStockProperties>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<FabricDelyStockProperties>> GetFabricInputItemStockInfoEditMode(int FabDelyIssueId, int ItemID, int ColorID, int SizeID)
        {
            try
            {
                var ItemStockDt = Fabrep.GetFabricItemStockInfoEditMode(FabDelyIssueId, ItemID, ColorID, SizeID);

                return new Response<IQueryable<FabricDelyStockProperties>>(ItemStockDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<FabricDelyStockProperties>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }        

        public Response<IEnumerable<Domain.FabricDelySection>> GetMaindt(int compid, int unitid, int buyerid, int masid, int empid, string refno, string orderno, string supptype, string ordtype, string cuttingordno, string jobordno, string FromDate, string ToDate, int supplierid)
        {

            var getmaindt = Fabrep.GetMainData(compid, unitid, buyerid, masid, empid, refno, orderno, supptype, ordtype, cuttingordno, jobordno, FromDate, ToDate, supplierid);
            return new Response<IEnumerable<Domain.FabricDelySection>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
        }

        public Response<IQueryable<FabricDelySection>> GetFabricHeaderInformation(int FabricDelyIssueId)
        {
            try
            {
                var CuttingHeaderDetails = Fabrep.GetFabricHeaderInfo(FabricDelyIssueId);

                return new Response<IQueryable<FabricDelySection>>(CuttingHeaderDetails, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<FabricDelySection>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.FabricDelySection>> GetInputOutDetEdit(int FabricDelyIssueId, int Prodprgid)
        {
            try
            {
                var getmaindt = Fabrep.GetInputOutputEdit(FabricDelyIssueId, Prodprgid);

                return new Response<IList<Domain.FabricDelySection>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.FabricDelySection>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> CreateFabricDelySection(Domain.FabricDelySection_Mas FabDelySecAdd)
        {            
            try
            {
                AxonApparel.Repository.FabDelySec_Issue_Mas ProcIns = new AxonApparel.Repository.FabDelySec_Issue_Mas

                //var ID = repo.AddData(new AxonApparel.Repository.Process_Ord_Mas
                {
                    FabDelyIssueId = FabDelySecAdd.FabDelyIssueId,
                    FabDelyIssueNo = FabDelySecAdd.FabDelyIssueNo,
                    FabDelyIssueDate = FabDelySecAdd.FabDelyIssueDate,
                    Joborderno = FabDelySecAdd.Joborderno,
                    Employeeid = FabDelySecAdd.EmployeeId,
                    Remarks = FabDelySecAdd.Remarks,
                    companyunitid = FabDelySecAdd.CompanyUnitId,
                    Companyid = FabDelySecAdd.CompanyId,
                    internalorexternal = FabDelySecAdd.InorOut,
                    OrderType = FabDelySecAdd.OrderType,
                    WorkDivisionid = FabDelySecAdd.WorkDivisionId,
                    ProdPrgid = FabDelySecAdd.ProdPrgId,
                    FromStoreid = FabDelySecAdd.FromStoreid,
                    CreatedBy = FabDelySecAdd.CreatedBy,
                    FLineId = FabDelySecAdd.FLineId,
                    IsApproved = FabDelySecAdd.IsApproved,
                    //ApprovedBy = FabDelySecAdd.ApprovedBy,
                    //ApprovedDate = FabDelySecAdd.ApprovedDate,
                    //VehicleNo = FabDelySecAdd.VehicleNo,
                };

                var ItmList = new List<FabDelySec_Issue_Det>();

                foreach (var PItem in FabDelySecAdd.FabricDelySectionDet)  //.TemplateDet
                {
                    if (PItem.issqty > 0)
                    {
                        ItmList.Add(new FabDelySec_Issue_Det
                        {
                            FabDelyIssueDetId = PItem.FabDelyIssueDetId,
                            FabDelyIssueId = PItem.FabDelyIssueId,
                            itemid = PItem.ItemId,
                            colorid = PItem.ColorId,
                            sizeid = PItem.SizeId,
                            //inp_op = PItem.Inp_op,
                            inp_op = PItem.InorOut,
                            PlannedSizeid = PItem.SizeId,
                            Consumption = PItem.Grammage,
                            Weight = PItem.weight,
                            OrderQty = PItem.ordqty,
                            rate = PItem.rate,
                            IssueQty = PItem.issqty,
                            SecQty = PItem.secqty,
                            receivedqty = PItem.receivedqty,
                            ReturnQty = PItem.ReturnQty,
                            LossQty = PItem.LossQty,
                            Markup_rate = PItem.MarkupRate,
                            Markup_Value = PItem.Markupvalue,
                            CancelQty = PItem.CancelQty,
                            LastProcessid = PItem.ProcessId
                        });
                    }
                }

                var ItmListStock = new List<FabDelySec_Issue_Stock>();               

                var result = Fabrep.AddData1(ProcIns, ItmList, ItmListStock, FabDelySecAdd);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");                
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }

        public Common.Response<bool> UpdateDetData(Domain.FabricDelySection_Mas FabDelySecAdd)
        {            
            try
            {
                AxonApparel.Repository.FabDelySec_Issue_Mas ProcIns = new AxonApparel.Repository.FabDelySec_Issue_Mas

                //var ID = repo.AddData(new AxonApparel.Repository.Process_Ord_Mas
                {
                    FabDelyIssueId = FabDelySecAdd.FabDelyIssueId,
                    FabDelyIssueNo = FabDelySecAdd.FabDelyIssueNo,
                    FabDelyIssueDate = FabDelySecAdd.FabDelyIssueDate,
                    Joborderno = FabDelySecAdd.Joborderno,
                    Employeeid = FabDelySecAdd.EmployeeId,
                    Remarks = FabDelySecAdd.Remarks,
                    companyunitid = FabDelySecAdd.CompanyUnitId,
                    Companyid = FabDelySecAdd.CompanyId,
                    internalorexternal = FabDelySecAdd.InorOut,
                    OrderType = FabDelySecAdd.OrderType,
                    WorkDivisionid = FabDelySecAdd.WorkDivisionId,
                    ProdPrgid = FabDelySecAdd.ProdPrgId,
                    FromStoreid = FabDelySecAdd.FromStoreid,
                    CreatedBy = FabDelySecAdd.CreatedBy,
                    FLineId = FabDelySecAdd.FLineId,
                    IsApproved = FabDelySecAdd.IsApproved,
                    //ApprovedBy = FabDelySecAdd.ApprovedBy,
                    //ApprovedDate = FabDelySecAdd.ApprovedDate,
                    //VehicleNo = FabDelySecAdd.VehicleNo,
                };

                var ItmList = new List<FabDelySec_Issue_Det>();

                foreach (var PItem in FabDelySecAdd.FabricDelySectionDet)  //.TemplateDet
                {
                    if (PItem.issqty > 0)
                    {
                        ItmList.Add(new FabDelySec_Issue_Det
                        {
                            FabDelyIssueDetId = PItem.FabDelyIssueDetId,
                            FabDelyIssueId = PItem.FabDelyIssueId,
                            itemid = PItem.ItemId,
                            colorid = PItem.ColorId,
                            sizeid = PItem.SizeId,
                            //inp_op = PItem.Inp_op,
                            inp_op = PItem.InorOut,
                            PlannedSizeid = PItem.SizeId,
                            Consumption = PItem.Grammage,
                            Weight = PItem.weight,
                            OrderQty = PItem.ordqty,
                            rate = PItem.rate,
                            IssueQty = PItem.issqty,
                            SecQty = PItem.secqty,
                            receivedqty = PItem.receivedqty,
                            ReturnQty = PItem.ReturnQty,
                            LossQty = PItem.LossQty,
                            Markup_rate = PItem.MarkupRate,
                            Markup_Value = PItem.Markupvalue,
                            CancelQty = PItem.CancelQty,
                            LastProcessid = PItem.ProcessId

                        });
                    }
                }

                var ItmListStock = new List<FabDelySec_Issue_Stock>();              

                var result = Fabrep.UpdDetData(ProcIns, ItmList, ItmListStock,  FabDelySecAdd);

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");                
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Common.Response<bool> UpdateReceipt(Domain.FabricDelySection_Mas FabDelySecAdd)
        {
            try
            {
                AxonApparel.Repository.FabDelySec_Issue_Mas ProcIns = new AxonApparel.Repository.FabDelySec_Issue_Mas

                //var ID = repo.AddData(new AxonApparel.Repository.Process_Ord_Mas
                {
                    FabDelyIssueId = FabDelySecAdd.FabDelyIssueId,
                    ToStoreid = FabDelySecAdd.ToStoreid,
                    Remarks = FabDelySecAdd.Remarks,
                };

                var ItmList = new List<FabDelySec_Issue_Det>();

                foreach (var PItem in FabDelySecAdd.FabricDelySectionDet)
                {
                    if (PItem.receivedqty > 0)
                    {
                        ItmList.Add(new FabDelySec_Issue_Det
                        {
                            FabDelyIssueDetId = PItem.FabDelyIssueDetId,
                            FabDelyIssueId = PItem.FabDelyIssueId,
                            itemid = PItem.ItemId,
                            colorid = PItem.ColorId,
                            sizeid = PItem.SizeId,
                            receivedqty = PItem.receivedqty,
                            ReturnQty = PItem.ReturnQty,
                        });
                    }
                }

                var ItmListStock = new List<FabDelySec_Issue_Stock>();

                foreach (var PItem in FabDelySecAdd.FabricDelySectionStock)
                {
                    if (PItem.ReturnQty > 0)
                    {
                        ItmListStock.Add(new FabDelySec_Issue_Stock
                        {
                            FabDelyIssueStockId = PItem.FabDelyIssueStockId,
                            FabDelyIssueDetId = PItem.FabDelyIssueDetId,
                            FabDelyIssueId = PItem.FabDelyIssueId,                            
                            ReturnQty = PItem.ReturnQty,
                        });
                    }
                }

                var result = Fabrep.UpdateReceipt(ProcIns, ItmList, ItmListStock, FabDelySecAdd);

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");                
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }

        public Common.Response<bool> DeleteReceipt(Domain.FabricDelySection_Mas FabDelySecAdd)
        {
            try
            {
                AxonApparel.Repository.FabDelySec_Issue_Mas ProcIns = new AxonApparel.Repository.FabDelySec_Issue_Mas

                //var ID = repo.AddData(new AxonApparel.Repository.Process_Ord_Mas
                {
                    FabDelyIssueId = FabDelySecAdd.FabDelyIssueId,
                    ToStoreid = FabDelySecAdd.ToStoreid,
                    Remarks = FabDelySecAdd.Remarks,
                };

                var ItmList = new List<FabDelySec_Issue_Det>();

                foreach (var PItem in FabDelySecAdd.FabricDelySectionDet)
                {
                    //if (PItem.receivedqty > 0)
                    //{
                        ItmList.Add(new FabDelySec_Issue_Det
                        {
                            FabDelyIssueDetId = PItem.FabDelyIssueDetId,
                            FabDelyIssueId = PItem.FabDelyIssueId,
                            itemid = PItem.ItemId,
                            colorid = PItem.ColorId,
                            sizeid = PItem.SizeId,
                            receivedqty = PItem.receivedqty,
                            ReturnQty = PItem.ReturnQty,
                        });
                    //}
                }

                var ItmListStock = new List<FabDelySec_Issue_Stock>();

                foreach (var PItem in FabDelySecAdd.FabricDelySectionStock)
                {
                    //if (PItem.ReturnQty > 0)
                    //{
                        ItmListStock.Add(new FabDelySec_Issue_Stock
                        {
                            FabDelyIssueStockId = PItem.FabDelyIssueStockId,
                            FabDelyIssueDetId = PItem.FabDelyIssueDetId,
                            FabDelyIssueId = PItem.FabDelyIssueId,
                            ReturnQty = PItem.ReturnQty,
                        });
                    //}
                }

                var result = Fabrep.UpdateReceipt(ProcIns, ItmList, ItmListStock, FabDelySecAdd);

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");                
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }

        public Response<bool> Delete(int Id, string FabDelyIssueNo)
        {
            return new Response<bool>(Fabrep.Delete(Id, FabDelyIssueNo), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
