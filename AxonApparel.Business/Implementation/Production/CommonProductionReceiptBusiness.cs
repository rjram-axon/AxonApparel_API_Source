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
    public class CommonProductionReceiptBusiness : ICommonProductionReceiptBusiness
    {
        ICommonProductionReceiptRepository CommonProDet = new CommonProductionReceiptRepository();

        public Response<IList<CommonProdReceipt>> GetCommonProductionIssueDet(int CompanyUnitId, int ProcessId, int WorkDivisionId, string InterorExter, string OType, string RefNo, int StyId, string OrdNo, int CompId)
        {
            try
            {
                var CommonProdDt = CommonProDet.GetCommonProductionMultipleIssueDet(CompanyUnitId, ProcessId, WorkDivisionId, InterorExter, OType, RefNo, StyId, OrdNo, CompId).ToList();

                return new Response<IList<CommonProdReceipt>>(CommonProdDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProdReceipt>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<CommonProdReceipt>> GetCommonProductionReceiptDet(string ProdIssueId)
        {
            try
            {
                var CommonProdRecptDt = CommonProDet.GetCommonProductionReceiptDet(ProdIssueId).ToList();

                return new Response<IList<CommonProdReceipt>>(CommonProdRecptDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProdReceipt>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<CommonProdReceipt>> GetCommonProdReceiptForEdit(int ProdReceiptId)
        {
            try
            {
                var CommonProdRecptDt = CommonProDet.GetReceiptDetforEditMode(ProdReceiptId).ToList();

                return new Response<IList<CommonProdReceipt>>(CommonProdRecptDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<CommonProdReceipt>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProdReceiptReason>> GetCommonProdReasonForEdit(int ProdReceiptDetId)
        {
            try
            {
                var CommonProdReasonDt = CommonProDet.GetReasonDetforEditMode(ProdReceiptDetId).ToList();

                return new Response<IList<ProdReceiptReason>>(CommonProdReasonDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<ProdReceiptReason>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<int> CreateProductionReceipt(Domain.ProdReceiptMas ProductionRecptAdd)
        {
            try
            {
                //Insert into Prod_Recpt_det and Update Prod_Prg_Det
                var ProdRecptdetList = new List<Domain.ProdReceiptDet>();

                if (ProductionRecptAdd.ProdReceiptDet.Count > 0)
                {
                    foreach (var item in ProductionRecptAdd.ProdReceiptDet)
                    {
                        if (item.ReceivedQty > 0)
                        {
                            ProdRecptdetList.Add(new Domain.ProdReceiptDet
                            {
                                //Receiptid = ProductionReciptMasId,
                                Itemid = item.Itemid,
                                ProdPrgDetid = item.ProdPrgDetid,
                                Colorid = item.Colorid,
                                Sizeid = item.Sizeid,
                                ReceivedQty = item.ReceivedQty,
                                RejectionQty = item.RejectionQty,
                                //JobOrdNo=item.JobOrdNo,
                                Uomid = item.Uomid,
                                Bundled = "N",
                                InputRate = 0,
                                OutputRate = 0,
                                Rate=item.Rate,
                                Issueid = item.Issueid,
                                ProdPrgNo = item.ProdPrgNo,
                                JobNo = item.JobOrdNo,
                                
                            });
                        }
                    }
                    //var prodissueDetresult = CommonProDet.AddProductionReceiptDet(ProdRecptdetList, "Add", ProductionRecptAdd);
                }

                //Insert into Prod_Recpt_mas
                var ProductionReciptMasId = CommonProDet.AddProductionReceipt(new Domain.ProdReceiptMas
                {
                    ReceiptNo = ProductionRecptAdd.ReceiptNo,
                    ReceiptDate = ProductionRecptAdd.ReceiptDate,
                    CompanyId = ProductionRecptAdd.CompanyId,
                    CompanyUnitId = ProductionRecptAdd.CompanyUnitId,
                    Remarks = ProductionRecptAdd.Remarks,
                    CreatedBy = ProductionRecptAdd.CreatedBy,
                    DcNumber = ProductionRecptAdd.DcNumber,
                    ProcessId = ProductionRecptAdd.ProcessId,
                    InterorExter = ProductionRecptAdd.InterorExter,
                    JobWrkSample = ProductionRecptAdd.JobWrkSample,
                    WorkDivisionId = ProductionRecptAdd.WorkDivisionId,
                    RecptType = ProductionRecptAdd.RecptType,
                    ProdReceiptDet = ProdRecptdetList,
                    ReRefDate = ProductionRecptAdd.ReRefDate,
                    StoreUnitID = ProductionRecptAdd.StoreUnitID,
                });

                ////Insert into Prod_Recpt_Reason 
                //var ProdRecptReasonList = new List<Domain.ProdReceiptReason>();

                //if (ProductionRecptAdd.ProdReceiptReason.Count > 0)
                //{
                //    foreach (var item in ProductionRecptAdd.ProdReceiptReason)
                //    {
                //        ProdRecptReasonList.Add(new Domain.ProdReceiptReason
                //            {
                //                RecptDetId = item.RecptDetId,
                //                RecptId = ProductionReciptMasId,
                //                ReasonId = item.ReasonId,
                //                Reason = item.Reason,
                //                RType = "R",
                //            });
                //    }
                //    var prodissuejobDetresult = CommonProDet.AddProductionReceiptReason(ProdRecptReasonList, "Add");
                //}

                return new Response<int>(ProductionReciptMasId, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<bool> DeleteCommProdReceipt(Domain.ProdReceiptMas ProductionReceiptUpdate)
        {
            try
            {
                var res = CommonProDet.DeleteReceipt(new Domain.ProdReceiptMas
                {
                    Receiptid = ProductionReceiptUpdate.Receiptid,
                    ReceiptNo = ProductionReceiptUpdate.ReceiptNo,
                    ReceiptDate = ProductionReceiptUpdate.ReceiptDate,
                    CompanyId = ProductionReceiptUpdate.CompanyId,
                    CompanyUnitId = ProductionReceiptUpdate.CompanyUnitId,
                    Remarks = ProductionReceiptUpdate.Remarks,
                    CreatedBy = ProductionReceiptUpdate.CreatedBy,
                    DcNumber = ProductionReceiptUpdate.DcNumber,
                    ProcessId = ProductionReceiptUpdate.ProcessId,
                    InterorExter = ProductionReceiptUpdate.InterorExter,
                    JobWrkSample = ProductionReceiptUpdate.JobWrkSample,
                    WorkDivisionId = ProductionReceiptUpdate.WorkDivisionId,
                    RecptType = ProductionReceiptUpdate.RecptType,
                    StoreUnitID = ProductionReceiptUpdate.StoreUnitID,
                    ProdReceiptDet = ProductionReceiptUpdate.ProdReceiptDet,
                    ProdReceiptReason = ProductionReceiptUpdate.ProdReceiptReason,
                    Qlty_No = ProductionReceiptUpdate.Qlty_No,
                    Qlty_date = ProductionReceiptUpdate.Qlty_date,
                    Type = ProductionReceiptUpdate.Type,
                    Mod = ProductionReceiptUpdate.Mod

                });

                return new Response<bool>(true, Status.SUCCESS, "Deleted Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }






        //public Response<bool> DeleteCommProdReceipt(int ProdReceiptid,string Type)
        //{
        //    return new Response<bool>(CommonProDet.DeleteReceipt(ProdReceiptid, Type), Status.SUCCESS, "Deleted Successfully");
        //}

        public Response<bool> UpdateCommProdReceipt(Domain.ProdReceiptMas ProductionReceiptUpdate)
        {
            try
            {
                var res = CommonProDet.UpdateData(new Domain.ProdReceiptMas
                {
                    Receiptid = ProductionReceiptUpdate.Receiptid,
                    ReceiptNo = ProductionReceiptUpdate.ReceiptNo,
                    ReceiptDate = ProductionReceiptUpdate.ReceiptDate,
                    CompanyId = ProductionReceiptUpdate.CompanyId,
                    CompanyUnitId = ProductionReceiptUpdate.CompanyUnitId,
                    Remarks = ProductionReceiptUpdate.Remarks,
                    CreatedBy = ProductionReceiptUpdate.CreatedBy,
                    DcNumber = ProductionReceiptUpdate.DcNumber,
                    ProcessId = ProductionReceiptUpdate.ProcessId,
                    InterorExter = ProductionReceiptUpdate.InterorExter,
                    JobWrkSample = ProductionReceiptUpdate.JobWrkSample,
                    WorkDivisionId = ProductionReceiptUpdate.WorkDivisionId,
                    RecptType = ProductionReceiptUpdate.RecptType,
                    StoreUnitID = ProductionReceiptUpdate.StoreUnitID,
                    ProdReceiptDet = ProductionReceiptUpdate.ProdReceiptDet,
                    ProdReceiptReason = ProductionReceiptUpdate.ProdReceiptReason,
                    Qlty_No = ProductionReceiptUpdate.Qlty_No,
                    Qlty_date = ProductionReceiptUpdate.Qlty_date,
                    Type=ProductionReceiptUpdate.Type,
                    Mod=ProductionReceiptUpdate.Mod

                });

                return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.ProductionReceiptMainDetail>> GetMaindt(int CompId, string Fromdate, string Todate, string RecptType, string InterExter, string DcNo, int Recptid, string OType, string OrdNo, string Refno, int ProcessId, int processorid)
        {
            try
            {
                var getmaindt = CommonProDet.GetMainData(CompId, Fromdate, Todate, InterExter, DcNo, Recptid, OType, OrdNo, Refno, ProcessId, processorid);

                return new Response<IList<Domain.ProductionReceiptMainDetail>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ProductionReceiptMainDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.ProductionReceiptMainDetail>> GetMaindtlist(int CompId, string Fromdate, string Todate, string RecptType, string InterExter, string DcNo, int Recptid, string OType, string OrdNo, string Refno, int ProcessId, int processorid)
        {
            try
            {
                var getmaindt = CommonProDet.GetMainDatalist(CompId, Fromdate, Todate, InterExter, DcNo, Recptid, OType, OrdNo, Refno, ProcessId, processorid);

                return new Response<IList<Domain.ProductionReceiptMainDetail>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ProductionReceiptMainDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProdReceiptMas>> GetCommProdReceiptHeaderInformation(int ProdReceptId)
        {
            try
            {
                var CuttingHeaderDetails = CommonProDet.GetCommProdReceptHeaderInfo(ProdReceptId);

                return new Response<IQueryable<ProdReceiptMas>>(CuttingHeaderDetails, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> GetCommProdReceiptItemStock(string ReceiptNo)
        {
            try
            {
                var ItemStockDet = CommonProDet.GetCommProdReceptItemstock(ReceiptNo);

                return new Response<bool>(ItemStockDet, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
