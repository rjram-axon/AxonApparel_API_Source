using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public class ProductionInvoiceBusiness:IProductionInvoiceBusiness
    {

        IProductionInvoiceRepository PRep = new ProductionInvoiceRepository();

        public Response<IList<ProdInvMas>> ListPrdAddDetails(int? Companyid, int? CompanyUnitId, int? Processorid, string Processid, int? BuyerId, string OrdNo, string OrdRefNo, string OrderType, string InternalOrExternal)
        {
            try
            {
                var CurGList = PRep.GetRepPrdAddLoad(Companyid, CompanyUnitId, Processorid, Processid, BuyerId, OrdNo, OrdRefNo, OrderType, InternalOrExternal);

                return new Response<IList<ProdInvMas>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProdInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProdInvDc>> ListInPrdItemDetails(string PMasId,int SuppId, int ProcessId)
        {
            try
            {
                var CurRGList = PRep.GetRepInvPrdItemLoad(PMasId, SuppId, ProcessId);

                return new Response<IList<ProdInvDc>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProdInvDc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProdInvDet>> ListProdEntryItemDetails(string PMasId, int SuppId, int ProcessId)
        {
            try
            {
                var CurRGList = PRep.GetRepInvPrdEntryItemLoad(PMasId, SuppId, ProcessId);

                return new Response<IList<ProdInvDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProdInvDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProdInvJobDet>> ListProdInOrderDetails(string PMasId, int SuppId, int ProcessId)
        {
            try
            {
                var CurRGList = PRep.GetRepInvPrdEntryOrderLoad(PMasId, SuppId, ProcessId);

                return new Response<IList<ProdInvJobDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProdInvJobDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateProdInvEntry(ProdInvMas PRDEntry)
        {
            int? AppByID = 0;
            int? LegId = 0;
            int? CreId = 0;
            int? VocId = 0;
            int? PDetId = 0;
            string Remarks = "";
            string LotNo = "";
            string JobNo = "";
            decimal IpRate = 0;
            decimal OpRate = 0;
            decimal InvRate = 0;
            if (PRDEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PRDEntry.ledgerid;
            }

            if (PRDEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = PRDEntry.voucherid;
            }
            if (PRDEntry.CreatedBy == 0)
            {
                CreId = null;
            }
            else
            {
                CreId = PRDEntry.CreatedBy;
            }
            if (PRDEntry.ApprovedBy == 0)
            {
                AppByID = null;
            }
            else
            {
                AppByID = PRDEntry.ApprovedBy;
            }
            if (PRDEntry.Remarks == null)
            {
                Remarks = "";
            }
            else
            {
                Remarks = PRDEntry.Remarks;
            }
   
            try
            {

                AxonApparel.Repository.ProductionInvoiceMas ProdInvInsert = new AxonApparel.Repository.ProductionInvoiceMas
                {

                    OrderType = PRDEntry.OrderType,
                    RefNo = PRDEntry.RefNo,
                    InvNo = PRDEntry.InvNo,
                    InvDate = PRDEntry.InvDate,
                    RefDate = PRDEntry.RefDate,
                    InvAmount = PRDEntry.InvAmount,
                    Remarks = Remarks,
                    PaymentAmt = PRDEntry.PaymentAmt,
                    Paid = PRDEntry.Paid,
                    Passed = PRDEntry.Passed,
                    Approved = PRDEntry.Approved,
                    Processorid = PRDEntry.Processorid,
                    Processid=PRDEntry.Processid,
                    Companyid=PRDEntry.Companyid,
                    CompanyUnitId=PRDEntry.CompanyUnitId,
                    InternalOrExternal = PRDEntry.InternalOrExternal,
                    CreatedBy = CreId,
                    ApprovedBy = AppByID,                   
                    ledgerid = LegId,
                    voucherid = VocId,
                    InvoiceType=PRDEntry.InvoiceType,

                };



                var PrdItmList = new List<ProductionInvoiceDc>();

                foreach (var PItem in PRDEntry.ProdInvDcDet)
                {

                    PrdItmList.Add(new ProductionInvoiceDc
                    {
                        prod_recpt_masid = PItem.prod_recpt_masid,
                        ProdInvDcId = PItem.ProdInvDcId,
                        Prodinvid = PItem.Prodinvid,

                    });

                }

                var ItemDetails = new List<ProductionInvoiceDet>();

                if (PRDEntry.ProdInvDDet != null)
                {
                    foreach (var Item in PRDEntry.ProdInvDDet)
                    {

                        if (Item.LotNo == null)
                        {
                            LotNo = "";
                        }
                        else
                        {
                            LotNo = Item.LotNo;
                        }
                        if (Item.Job_Ord_No == null)
                        {
                            JobNo = "";
                        }
                        else
                        {
                            JobNo = Item.Job_Ord_No;
                        }

                        if (Item.IPMarkup_Rate == null)
                        {
                            IpRate = 0;
                        }
                        else
                        {
                            IpRate = Item.IPMarkup_Rate;
                        }
                        if (Item.OPMarkup_Rate == null)
                        {
                            OpRate = 0;
                        }
                        else
                        {
                            OpRate = Item.OPMarkup_Rate;
                        }
                        if (Item.InvoiceRate == null)
                        {
                            InvRate = 0;
                        }
                        else
                        {
                            InvRate = Item.InvoiceRate;
                        }
                        ItemDetails.Add(new ProductionInvoiceDet
                        {
                            ProdInvDetid = Item.ProdInvDetid,
                            ProdInvId = Item.ProdInvId,
                            Grndetid = Item.Grndetid,
                            Grnmasid=Item.GrnMasid,
                            InvoiceQty = Item.InvoiceQty,
                            InvoiceRate = InvRate,
                            Amount = Item.Amount,
                            Closed = "",
                            IPMarkup_Rate = IpRate,
                            OPMarkup_Rate = OpRate,
                            LotNo = LotNo,
                            Itemid=Item.ItemId,
                            Colorid=Item.ColorId,
                            Sizeid=Item.SizeId,
                            Job_Ord_No = JobNo,
                            BundleNo=Item.BundleNo,
                            RejectdQty=Item.RejectdQty,
                            RejectdRate=Item.RejectdRate,
                            design=Item.design,
                            NoOfStiches=Item.NoOfStiches,
                            Processid=Item.Processid
                        });
                    }
                }

                var RateDiffList = new List<ProductionInvoiceRateDiff>();
                if (PRDEntry.ProdInvRDiff != null)
                {
                    foreach (var PRate in PRDEntry.ProdInvRDiff)
                    {

                        RateDiffList.Add(new ProductionInvoiceRateDiff
                        {
                            Grndetid = PRate.Proc_Recpt_Detid,
                            ProdinvRateid = 0,
                            ProdInvId = 0,
                            Grnno = PRate.Grnno,
                            GrnAmt = PRate.GrnAmt,
                            InvAmt = PRate.InvAmt,
                            RateDiff = PRate.RateDiff,
                            QtyDiff = PRate.QtyDiff,


                        });

                    }
                }

                var InvOrdDetails = new List<ProductionInvoiceOrdDet>();
                if (PRDEntry.ProdInvOrdDDet != null)
                {
                    foreach (var Ord in PRDEntry.ProdInvOrdDDet)
                    {
                        InvOrdDetails.Add(new ProductionInvoiceOrdDet
                        {
                            ProdInvJobDetID = Ord.Prood_Inv_JobDetID,
                            ProdInvDetid = Ord.Prod_InvDetid,
                            Job_Ord_No = Ord.Job_Ord_No,
                            InvoiceQty = Ord.InvoiceQty,
                            Prod_Recpt_Detid = Ord.Prod_recpt_DetId,
                            ProdInvid=Ord.Prod_InvId,
                        });
                    }
                }

                var InvAccDetails = new List<ProductionInvoiceAddless>();
                if (PRDEntry.ProdInvAL != null)
                {
                    foreach (var Ac in PRDEntry.ProdInvAL)
                    {
                        InvAccDetails.Add(new ProductionInvoiceAddless
                        {
                            ProdInvAddLessid = Ac.ProdInvAddLessid,
                            ProdInvId = Ac.ProdInvId,
                            AddLessid = Ac.addless_id,
                            Percentage = Ac.percentage,
                            Amount = Ac.amount,

                        });
                    }
                }

                var result = PRep.AddDetData(ProdInvInsert, PrdItmList, ItemDetails, RateDiffList, InvOrdDetails, InvAccDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProdInvMas>> GetDataEntryDetails(int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataEntryRepDetails(companyid, FromDate, ToDate);

                return new Response<IQueryable<ProdInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProdInvMas>> GetDataUnitDetails(int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataUnitRepDetails(companyid, FromDate, ToDate);

                return new Response<IQueryable<ProdInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProdInvMas>> GetDataOrderRefDetails(int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataOrderRefRepDetails(companyid, FromDate, ToDate);

                return new Response<IQueryable<ProdInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProdInvMas>> GetDataWkDivDetails(int? companyid, string PType, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataWkDivRepDetails(companyid,PType, FromDate, ToDate);

                return new Response<IQueryable<ProdInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProdInvMas>> GetDataWkOrderDetails(int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataWkOrderRepDetails(companyid, FromDate, ToDate);

                return new Response<IQueryable<ProdInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProdInvMas>> GetDataProcessDetails(int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataProcessRepDetails( companyid, FromDate, ToDate);

                return new Response<IQueryable<ProdInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProdInvMas>> GetDataProdInvMainDetails(string OrderType, string Ptype, int? CompanyId, string FromDate, string ToDate, int? ProcessId, int? UnitId, int? SupplierId, int? PrdMasId, string OrdNo, string RefNo, string JobNo)
        {
            try
            {
                var PWO = PRep.GetDataProdMainRepDetails(OrderType, Ptype, CompanyId, FromDate, ToDate, ProcessId, UnitId, SupplierId, PrdMasId, OrdNo, RefNo, JobNo);

                return new Response<IQueryable<ProdInvMas>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProdInvMas>> GetProdInvEditDetails(int Id)
        {
            try
            {
                var ProdutWO = PRep.GetDataRepEditProdInvDetails(Id);

                return new Response<IQueryable<ProdInvMas>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProdInvDc>> ListInPrdEditItemDetails(int InvId, int CompId, int SuppId)
        {
            try
            {
                var CurRGList = PRep.GetRepEditInvItemLoad(InvId, CompId, SuppId);

                return new Response<IList<ProdInvDc>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProdInvDc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProdInvDet>> ListProdInEditItemDetails(int InvId, int GrnMasId, int CompId, int SuppId)
        {
            try
            {
                var CurRGList = PRep.GetRepInvPrdEntryEditItemLoad(InvId, GrnMasId, CompId, SuppId);

                return new Response<IList<ProdInvDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProdInvDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProdInvJobDet>> ListProdInOrdEditDetails(int InvId, int CompId, int SuppId, int ProdRecptDetId)
        {
            try
            {
                var CurRGList = PRep.GetRepInvPrdEntryEditOrderLoad(InvId, CompId, SuppId, ProdRecptDetId);

                return new Response<IList<ProdInvJobDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProdInvJobDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProdInvRatediff>> ListProdInRateDiffEditDetails(int InvId)
        {
            try
            {
                var CurRGList = PRep.GetRepInvPrdEntryEditRateDiffLoad(InvId);

                return new Response<IList<ProdInvRatediff>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProdInvRatediff>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProdInvAddless>> ListProdInAddLessEditDetails(int InvId)
        {
            try
            {
                var CurRGList = PRep.GetRepInvPrdEntryEditAddlessLoad(InvId);

                return new Response<IList<ProdInvAddless>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProdInvAddless>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateProdInvEntry(ProdInvMas PdInvEEntry)
        {
            int? AppByID = 0;
            int? LegId = 0;
            int? CreId = 0;
            int? VocId = 0;
            int? PDetId = 0;
            string Remarks = "";
            string LotNo = "";
            string JobNo = "";
            decimal IpRate = 0;
            decimal OpRate = 0;
            decimal InvRate = 0;
            if (PdInvEEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PdInvEEntry.ledgerid;
            }

            if (PdInvEEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = PdInvEEntry.voucherid;
            }
            if (PdInvEEntry.CreatedBy == 0)
            {
                CreId = null;
            }
            else
            {
                CreId = PdInvEEntry.CreatedBy;
            }
            if (PdInvEEntry.ApprovedBy == 0)
            {
                AppByID = null;
            }
            else
            {
                AppByID = PdInvEEntry.ApprovedBy;
            }
            if (PdInvEEntry.Remarks == null)
            {
                Remarks = "";
            }
            else
            {
                Remarks = PdInvEEntry.Remarks;
            }

            try
            {

                AxonApparel.Repository.ProductionInvoiceMas ProdInvEdit = new AxonApparel.Repository.ProductionInvoiceMas
                {

                    OrderType = PdInvEEntry.OrderType,
                    RefNo = PdInvEEntry.RefNo,
                    InvNo = PdInvEEntry.InvNo,
                    InvDate = PdInvEEntry.InvDate,
                    RefDate = PdInvEEntry.RefDate,
                    InvAmount = PdInvEEntry.InvAmount,
                    Remarks = Remarks,
                    PaymentAmt = PdInvEEntry.PaymentAmt,
                    Paid = PdInvEEntry.Paid,
                    Passed = PdInvEEntry.Passed,
                    Approved = PdInvEEntry.Approved,
                    Processorid = PdInvEEntry.Processorid,
                    Processid = PdInvEEntry.Processid,
                    Companyid = PdInvEEntry.Companyid,
                    CompanyUnitId = PdInvEEntry.CompanyUnitId,
                    InternalOrExternal = PdInvEEntry.InternalOrExternal,
                    CreatedBy = CreId,
                    ApprovedBy = AppByID,
                    ledgerid = LegId,
                    voucherid = VocId,
                    InvoiceType = PdInvEEntry.InvoiceType,
                    ProdInvid=PdInvEEntry.ProdInvid,

                };



                var EPrdItmList = new List<ProductionInvoiceDc>();

                foreach (var PItem in PdInvEEntry.ProdInvDcDet)
                {

                    EPrdItmList.Add(new ProductionInvoiceDc
                    {
                        prod_recpt_masid = PItem.prod_recpt_masid,
                        ProdInvDcId = PItem.ProdInvDcId,
                        Prodinvid = PItem.Prodinvid,
                        
                    });

                }

                var EItemDetails = new List<ProductionInvoiceDet>();

                if (PdInvEEntry.ProdInvDDet != null)
                {
                    foreach (var Item in PdInvEEntry.ProdInvDDet)
                    {

                        if (Item.LotNo == null)
                        {
                            LotNo = "";
                        }
                        else
                        {
                            LotNo = Item.LotNo;
                        }
                        if (Item.Job_Ord_No == null)
                        {
                            JobNo = "";
                        }
                        else
                        {
                            JobNo = Item.Job_Ord_No;
                        }

                        if (Item.IPMarkup_Rate == null)
                        {
                            IpRate = 0;
                        }
                        else
                        {
                            IpRate = Item.IPMarkup_Rate;
                        }
                        if (Item.OPMarkup_Rate == null)
                        {
                            OpRate = 0;
                        }
                        else
                        {
                            OpRate = Item.OPMarkup_Rate;
                        }
                        if (Item.InvoiceRate == null)
                        {
                            InvRate = 0;
                        }
                        else
                        {
                            InvRate = Item.InvoiceRate;
                        }
                        EItemDetails.Add(new ProductionInvoiceDet
                        {
                            ProdInvDetid = Item.ProdInvDetid,
                            ProdInvId = Item.ProdInvId,
                            Grndetid = Item.Grndetid,
                            Grnmasid = Item.GrnMasid,
                            InvoiceQty = Item.InvoiceQty,
                            InvoiceRate = InvRate,
                            Amount = Item.Amount,
                            Closed = "",
                            IPMarkup_Rate = IpRate,
                            OPMarkup_Rate = OpRate,
                            LotNo = LotNo,
                            Itemid = Item.ItemId,
                            Colorid = Item.ColorId,
                            Sizeid = Item.SizeId,
                            Job_Ord_No = JobNo,
                            BundleNo = Item.BundleNo,
                            RejectdQty = Item.RejectdQty,
                            RejectdRate = Item.RejectdRate,
                            design = Item.design,
                            NoOfStiches = Item.NoOfStiches,
                            Processid=Item.Processid
                        });
                    }
                }

                var ERateDiffList = new List<ProductionInvoiceRateDiff>();
                if (PdInvEEntry.ProdInvRDiff != null)
                {
                    foreach (var PRate in PdInvEEntry.ProdInvRDiff)
                    {

                        ERateDiffList.Add(new ProductionInvoiceRateDiff
                        {
                            Grndetid = PRate.Proc_Recpt_Detid,
                            ProdinvRateid = PRate.ProdinvRateid,
                            ProdInvId = PRate.ProdInvId,
                            Grnno = PRate.Grnno,
                            GrnAmt = PRate.GrnAmt,
                            InvAmt = PRate.InvAmt,
                            RateDiff = PRate.RateDiff,
                            QtyDiff = PRate.QtyDiff,


                        });

                    }
                }

                var EInvOrdDetails = new List<ProductionInvoiceOrdDet>();
                if (PdInvEEntry.ProdInvOrdDDet != null)
                {
                    foreach (var Ord in PdInvEEntry.ProdInvOrdDDet)
                    {
                        EInvOrdDetails.Add(new ProductionInvoiceOrdDet
                        {
                            ProdInvJobDetID = Ord.Prood_Inv_JobDetID,
                            ProdInvDetid = Ord.Prod_InvDetid,
                            Job_Ord_No = Ord.Job_Ord_No,
                            InvoiceQty = Ord.InvoiceQty,
                            Prod_Recpt_Detid = Ord.Prod_recpt_DetId,
                            ProdInvid = Ord.Prod_InvId,
                        });
                    }
                }

                var EInvAccDetails = new List<ProductionInvoiceAddless>();
                if (PdInvEEntry.ProdInvAL != null)
                {
                    foreach (var Ac in PdInvEEntry.ProdInvAL)
                    {
                        EInvAccDetails.Add(new ProductionInvoiceAddless
                        {
                            ProdInvAddLessid = Ac.ProdInvAddLessid,
                            ProdInvId = Ac.ProdInvId,
                            AddLessid = Ac.addless_id,
                            Percentage = Ac.percentage,
                            Amount = Ac.amount,

                        });
                    }
                }

                var result = PRep.UpdateDetData(ProdInvEdit, EPrdItmList, EItemDetails, ERateDiffList, EInvOrdDetails, EInvAccDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteProdInvEntry(ProdInvMas PdInvDEntry)
        {
            int? AppByID = 0;
            int? LegId = 0;
            int? CreId = 0;
            int? VocId = 0;
            int? PDetId = 0;
            string Remarks = "";
            string LotNo = "";
            string JobNo = "";
            decimal IpRate = 0;
            decimal OpRate = 0;
            decimal InvRate = 0;
            if (PdInvDEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PdInvDEntry.ledgerid;
            }

            if (PdInvDEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = PdInvDEntry.voucherid;
            }
            if (PdInvDEntry.CreatedBy == 0)
            {
                CreId = null;
            }
            else
            {
                CreId = PdInvDEntry.CreatedBy;
            }
            if (PdInvDEntry.ApprovedBy == 0)
            {
                AppByID = null;
            }
            else
            {
                AppByID = PdInvDEntry.ApprovedBy;
            }
            if (PdInvDEntry.Remarks == null)
            {
                Remarks = "";
            }
            else
            {
                Remarks = PdInvDEntry.Remarks;
            }

            try
            {

                AxonApparel.Repository.ProductionInvoiceMas ProdInvEdit = new AxonApparel.Repository.ProductionInvoiceMas
                {

                    OrderType = PdInvDEntry.OrderType,
                    RefNo = PdInvDEntry.RefNo,
                    InvNo = PdInvDEntry.InvNo,
                    InvDate = PdInvDEntry.InvDate,
                    RefDate = PdInvDEntry.RefDate,
                    InvAmount = PdInvDEntry.InvAmount,
                    Remarks = Remarks,
                    PaymentAmt = PdInvDEntry.PaymentAmt,
                    Paid = PdInvDEntry.Paid,
                    Passed = PdInvDEntry.Passed,
                    Approved = PdInvDEntry.Approved,
                    Processorid = PdInvDEntry.Processorid,
                    Processid = PdInvDEntry.Processid,
                    Companyid = PdInvDEntry.Companyid,
                    CompanyUnitId = PdInvDEntry.CompanyUnitId,
                    InternalOrExternal = PdInvDEntry.InternalOrExternal,
                    CreatedBy = CreId,
                    ApprovedBy = AppByID,
                    ledgerid = LegId,
                    voucherid = VocId,
                    InvoiceType = PdInvDEntry.InvoiceType,
                    ProdInvid = PdInvDEntry.ProdInvid,

                };



                var EPrdItmList = new List<ProductionInvoiceDc>();

                foreach (var PItem in PdInvDEntry.ProdInvDcDet)
                {

                    EPrdItmList.Add(new ProductionInvoiceDc
                    {
                        prod_recpt_masid = PItem.prod_recpt_masid,
                        ProdInvDcId = PItem.ProdInvDcId,
                        Prodinvid = PItem.Prodinvid,

                    });

                }

                var EItemDetails = new List<ProductionInvoiceDet>();

                if (PdInvDEntry.ProdInvDDet != null)
                {
                    foreach (var Item in PdInvDEntry.ProdInvDDet)
                    {

                        if (Item.LotNo == null)
                        {
                            LotNo = "";
                        }
                        else
                        {
                            LotNo = Item.LotNo;
                        }
                        if (Item.Job_Ord_No == null)
                        {
                            JobNo = "";
                        }
                        else
                        {
                            JobNo = Item.Job_Ord_No;
                        }

                        if (Item.IPMarkup_Rate == null)
                        {
                            IpRate = 0;
                        }
                        else
                        {
                            IpRate = Item.IPMarkup_Rate;
                        }
                        if (Item.OPMarkup_Rate == null)
                        {
                            OpRate = 0;
                        }
                        else
                        {
                            OpRate = Item.OPMarkup_Rate;
                        }
                        if (Item.InvoiceRate == null)
                        {
                            InvRate = 0;
                        }
                        else
                        {
                            InvRate = Item.InvoiceRate;
                        }
                        EItemDetails.Add(new ProductionInvoiceDet
                        {
                            ProdInvDetid = Item.ProdInvDetid,
                            ProdInvId = Item.ProdInvId,
                            Grndetid = Item.Grndetid,
                            Grnmasid = Item.GrnMasid,
                            InvoiceQty = Item.InvoiceQty,
                            InvoiceRate = InvRate,
                            Amount = Item.Amount,
                            Closed = "",
                            IPMarkup_Rate = IpRate,
                            OPMarkup_Rate = OpRate,
                            LotNo = LotNo,
                            Itemid = Item.ItemId,
                            Colorid = Item.ColorId,
                            Sizeid = Item.SizeId,
                            Job_Ord_No = JobNo,
                            BundleNo = Item.BundleNo,
                            RejectdQty = Item.RejectdQty,
                            RejectdRate = Item.RejectdRate,
                            design = Item.design,
                            NoOfStiches = Item.NoOfStiches,
                            Processid=Item.Processid
                        });
                    }
                }

                var ERateDiffList = new List<ProductionInvoiceRateDiff>();
                if (PdInvDEntry.ProdInvRDiff != null)
                {
                    foreach (var PRate in PdInvDEntry.ProdInvRDiff)
                    {

                        ERateDiffList.Add(new ProductionInvoiceRateDiff
                        {
                            Grndetid = PRate.Proc_Recpt_Detid,
                            ProdinvRateid = PRate.ProdinvRateid,
                            ProdInvId = PRate.ProdInvId,
                            Grnno = PRate.Grnno,
                            GrnAmt = PRate.GrnAmt,
                            InvAmt = PRate.InvAmt,
                            RateDiff = PRate.RateDiff,
                            QtyDiff = PRate.QtyDiff,


                        });

                    }
                }

                var EInvOrdDetails = new List<ProductionInvoiceOrdDet>();
                if (PdInvDEntry.ProdInvOrdDDet != null)
                {
                    foreach (var Ord in PdInvDEntry.ProdInvOrdDDet)
                    {
                        EInvOrdDetails.Add(new ProductionInvoiceOrdDet
                        {
                            ProdInvJobDetID = Ord.Prood_Inv_JobDetID,
                            ProdInvDetid = Ord.Prod_InvDetid,
                            Job_Ord_No = Ord.Job_Ord_No,
                            InvoiceQty = Ord.InvoiceQty,
                            Prod_Recpt_Detid = Ord.Prod_recpt_DetId,
                            ProdInvid = Ord.Prod_InvId,
                        });
                    }
                }

                var EInvAccDetails = new List<ProductionInvoiceAddless>();
                if (PdInvDEntry.ProdInvAL != null)
                {
                    foreach (var Ac in PdInvDEntry.ProdInvAL)
                    {
                        EInvAccDetails.Add(new ProductionInvoiceAddless
                        {
                            ProdInvAddLessid = Ac.ProdInvAddLessid,
                            ProdInvId = Ac.ProdInvId,
                            AddLessid = Ac.addless_id,
                            Percentage = Ac.percentage,
                            Amount = Ac.amount,

                        });
                    }
                }

                var result = PRep.DeleteDetData(ProdInvEdit, EPrdItmList, EItemDetails, ERateDiffList, EInvOrdDetails, EInvAccDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
