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
    public class ProcessInvoiceBusiness : IProcessInvoiceBusiness
    {

        IProcessInvoiceRepository PRep = new ProcessInvoiceRepository();

        public Response<IQueryable<ProcessOrdMas>> GetDataPrnDetails(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            try
            {
                var ProductWO = PRep.GetDataPrnRepDetails(companyid, companyunitid, processorid, processid, processordid, ProcRecId, OrdNo, RefNo, OrderType, ProcessorType, FDate, DDate);

                return new Response<IQueryable<ProcessOrdMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessOrdMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessOrdMas>> GetDataProcOrdNoDetails(int? companyid, int? companyunitid, int? processid, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            try
            {
                var ProductWO = PRep.GetDataProcessOrdNoRepDetails(companyid, companyunitid, processid, OrderType, ProcessorType, FDate, DDate);

                return new Response<IQueryable<ProcessOrdMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessOrdMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessOrdMas>> GetDataProcIssDetails(int? companyid, int? companyunitid, int? processid, int? ProcessOrdId, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            try
            {
                var ProductWO = PRep.GetDataProcessIssNoRepDetails(companyid, companyunitid, processid, ProcessOrdId, OrderType, ProcessorType, FDate, DDate);

                return new Response<IQueryable<ProcessOrdMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessOrdMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProcessOrdMas>> ListPrnAddDetails(int? companyid, int? companyunitid, int? processorid, int? processid, int? processordid, int? ProcRecId, string OrdNo, string RefNo, string Dcno, string OrderType, string ProcessorType, string FDate, string DDate)
        {
            try
            {
                var CurGList = PRep.GetRepPrnAddLoad(companyid, companyunitid, processorid, processid, processordid, ProcRecId, OrdNo, RefNo, Dcno, OrderType, ProcessorType, FDate, DDate);

                return new Response<IList<ProcessOrdMas>>(CurGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProcessOrdMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }




        public Response<IList<ProInvDc>> ListInPrnItemDetails(string PMasId, int CompId, int SuppId, int ProcessId, int Unitid, string Ptype, string Otype)
        {
            try
            {
                var CurRGList = PRep.GetRepInvPrnItemLoad(PMasId, CompId, SuppId, ProcessId, Unitid, Ptype, Otype);

                return new Response<IList<ProInvDc>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvDc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProInvDet>> ListProInItemDetails(string PMasId, int CompId, int SuppId, int ProcessId, int Unitid, string Ptype, string Otype)
        {
            try
            {
                var CurRGList = PRep.GetRepInvProItemLoad(PMasId, CompId, SuppId, ProcessId, Unitid, Ptype, Otype);

                return new Response<IList<ProInvDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProInvJobDet>> ListProInOrderDetails(string PMasId, string Otype)
        {
            try
            {
                var CurRGList = PRep.GetRepInvProOrderLoad(PMasId, Otype);

                return new Response<IList<ProInvJobDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvJobDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateProInvEntry(ProInvMas PREntry)
        {
            int? AppByID = 0;
            int? LegId = 0;
            int? CreId = 0;
            int? VocId = 0;
            int? PDetId = 0;

            if (PREntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PREntry.ledgerid;
            }

            if (PREntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = PREntry.voucherid;
            }
            if (PREntry.CreatedBy == 0)
            {
                CreId = null;
            }
            else
            {
                CreId = PREntry.CreatedBy;
            }
            if (PREntry.ApprovedBy == 0)
            {
                AppByID = null;
            }
            else
            {
                AppByID = PREntry.ApprovedBy;
            }
            try
            {

                AxonApparel.Repository.Process_Inv_Mas ProInvInsert = new AxonApparel.Repository.Process_Inv_Mas
                {

                    OrderType = PREntry.OrderType,
                    Inv_No = PREntry.Inv_No,
                    Inv_Date = PREntry.Inv_Date,
                    Inv_Amount = PREntry.Inv_Amount,
                    Entry_No = PREntry.Entry_No,
                    Entry_Date = PREntry.Entry_Date,
                    Remarks = PREntry.Remarks,
                    Payment_Amt = PREntry.Payment_Amt,
                    DebitCredit = PREntry.DebitCredit,
                    DebtRaised = PREntry.DebtRaised,
                    Approved = PREntry.Approved,
                    SupplierId = PREntry.SupplierId,
                    InternalOrExternal = PREntry.InternalOrExternal,
                    CreatedBy = CreId,
                    ApprovedBy = AppByID,
                    MultiFlag = PREntry.MultiFlag,
                    ledgerid = LegId,
                    voucherid = VocId,

                };

      

                var PrnItmList = new List<Process_Inv_Dc>();

                foreach (var PItem in PREntry.ProInvDcDet)
                {

                    PrnItmList.Add(new Process_Inv_Dc
                    {
                        proc_recpt_masid = PItem.proc_recpt_masid,
                        Process_Inv_DcId = PItem.Process_Inv_DcId,
                        Process_invid = PItem.Process_invid,

                    });

                }

                var ItemDetails = new List<Process_Inv_Det>();

                if (PREntry.ProInvDDet != null)
                {
                    foreach (var Item in PREntry.ProInvDDet)
                    {
                        ItemDetails.Add(new Process_Inv_Det
                        {
                            Process_InvDetid = Item.Process_InvDetid,
                            Process_Invid = Item.Process_Invid,
                            Proc_Recpt_Detid = Item.Proc_Recpt_Detid,
                            Invoice_Qty = Item.Invoice_Qty,
                            Rate = Item.Rate,
                            Amount = Item.Amount,
                            closed = "",
                            IPMarkup_rate = Item.IPMarkup_rate,
                            OPMarkup_Rate = Item.OPMarkup_Rate,
                            IsSecQty = "N",
                            Proc_Recpt_masid=Item.Proc_Recpt_Masid,
                        });
                    }
                }

                var RateDiffList = new List<Process_Inv_RateDiff>();

                if (PREntry.ProInvRDiff != null)
                {
                    foreach (var PRate in PREntry.ProInvRDiff)
                    {

                        RateDiffList.Add(new Process_Inv_RateDiff
                        {
                            Proc_Recpt_detid = PRate.Proc_Recpt_Detid,
                            Process_inv_Rateid = 0,
                            Process_Invid = 0,
                            proc_recpt_no = PRate.Grnno,
                            GrnAmt = 0,
                            InvAmt = 0,
                            RateDiff = PRate.RateDiff,
                            QtyDiff = PRate.QtyDiff,
                            IsChecked = PRate.IsChecked,

                        });

                    }
                }

                var InvOrdDetails = new List<Process_Inv_JobDet>();
                if (PREntry.ProInvOrdDDet != null)
                {
                    foreach (var Ord in PREntry.ProInvOrdDDet)
                    {
                        InvOrdDetails.Add(new Process_Inv_JobDet
                        {
                            Process_Inv_JobDetID = Ord.Process_Inv_JobDetID,
                            Process_InvDetid = Ord.Process_InvDetid,
                            Job_Ord_No = Ord.Job_Ord_No,
                            InvoiceQty = Ord.InvoiceQty,
                            Process_Recpt_Detid = Ord.Process_recpt_DetId,
                            Process_Recpt_JobDetId=Ord.Process_recpt_JobDetId,
                        });
                    }
                }

                var InvAccDetails = new List<Process_Inv_AddLess>();
                if (PREntry.ProInvAL != null)
                {
                    foreach (var Ac in PREntry.ProInvAL)
                    {
                        InvAccDetails.Add(new Process_Inv_AddLess
                        {
                            Process_Inv_AddLessid = Ac.Pro_Inv_AddlessId,
                            Process_Invid = Ac.pro_invid,
                            AddLessid = Ac.addless_id,
                            Percentage = Ac.percentage,
                            Amount = Ac.amount,
                            
                        });
                    }
                }

                var result = PRep.AddDetData(ProInvInsert, PrnItmList, ItemDetails,RateDiffList, InvOrdDetails, InvAccDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProInvMas>> GetDataPrnDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataPrnRepDetails(OType, companyid, FromDate, ToDate);

                return new Response<IQueryable<ProInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProInvMas>> GetDataUnitDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataUnitRepDetails(OType, companyid, FromDate, ToDate);

                return new Response<IQueryable<ProInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProInvMas>> GetDataProcessDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataProcessRepDetails(OType, companyid, FromDate, ToDate);

                return new Response<IQueryable<ProInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProInvMas>> GetDataOrderRefDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataOrderRefRepDetails(OType, companyid, FromDate, ToDate);

                return new Response<IQueryable<ProInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProInvMas>> GetDataProcessorDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataProcessorRepDetails(OType, companyid, FromDate, ToDate);

                return new Response<IQueryable<ProInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProInvMas>> GetDataEntryNoDetails(string OType, int? companyid, string FromDate, string ToDate)
        {
            try
            {
                var ProductWO = PRep.GetDataEntryNoRepDetails(OType, companyid, FromDate, ToDate);

                return new Response<IQueryable<ProInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProInvMas>> GetDataProInvMainDetails(string OrderType, int? CompanyId, string FromDate, string ToDate, int? ProcessId, int? UnitId, int? SupplierId, int? PrnMasId, int? Process_Invid, string OrdNo, string RefNo, string MultiFlag)
        {
            try
            {
                var PWO = PRep.GetDataProMainRepDetails(OrderType, CompanyId, FromDate, ToDate, ProcessId, UnitId, SupplierId, PrnMasId, Process_Invid, OrdNo, RefNo, MultiFlag);

                return new Response<IQueryable<ProInvMas>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProInvMas>> GetProInvEditDetails(int Id)
        {
            try
            {
                var ProdutWO = PRep.GetDataRepEditProInvDetails(Id);

                return new Response<IQueryable<ProInvMas>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProInvDc>> ListInPrnEditItemDetails(int InvId, int CompId, int SuppId)
        {
            try
            {
                var CurRGList = PRep.GetRepEditInvPrnItemLoad(InvId, CompId, SuppId);

                return new Response<IList<ProInvDc>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvDc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProInvDet>> ListProInEditItemDetails(int InvId, int PrnMasId, int CompId, int SuppId)
        {
            try
            {
                var CurRGList = PRep.GetRepProInvEditItemLoad(InvId, PrnMasId, CompId, SuppId);

                return new Response<IList<ProInvDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProInvJobDet>> ListProInOrdEditDetails(int InvId, int CompId, int SuppId, int GrnDetId)
        {
            try
            {
                var CurRGList = PRep.GetRepProInvEditOrdLoad(InvId, CompId, SuppId, GrnDetId);

                return new Response<IList<ProInvJobDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvJobDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProInvAddLess>> ListProInAddLessEditDetails(int InvId)
        {
            try
            {
                var CurRGList = PRep.GetRepInvEditAddLessLoad(InvId);

                return new Response<IList<ProInvAddLess>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvAddLess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProInvRateDiff>> ListProInRateDiffEditDetails(int InvId)
        {
            try
            {
                var CurRGList = PRep.GetRepInvEditRateDiffLoad(InvId);

                return new Response<IList<ProInvRateDiff>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvRateDiff>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<bool> UpdateProInvEntry(ProInvMas PInvEEntry)
        {
            int? AppByID = 0;
            int? LegId = 0;
            int? CreId = 0;
            int? VocId = 0;
            int? PDetId = 0;

            if (PInvEEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PInvEEntry.ledgerid;
            }

            if (PInvEEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = PInvEEntry.voucherid;
            }
            if (PInvEEntry.CreatedBy == 0)
            {
                CreId = null;
            }
            else
            {
                CreId = PInvEEntry.CreatedBy;
            }
            if (PInvEEntry.ApprovedBy == 0)
            {
                AppByID = null;
            }
            else
            {
                AppByID = PInvEEntry.ApprovedBy;
            }
            try
            {

                AxonApparel.Repository.Process_Inv_Mas ProInvEdit = new AxonApparel.Repository.Process_Inv_Mas
                {

                    OrderType = PInvEEntry.OrderType,
                    Inv_No = PInvEEntry.Inv_No,
                    Inv_Date = PInvEEntry.Inv_Date,
                    Inv_Amount = PInvEEntry.Inv_Amount,
                    Entry_No = PInvEEntry.Entry_No,
                    Entry_Date = PInvEEntry.Entry_Date,
                    Remarks = PInvEEntry.Remarks,
                    Payment_Amt = PInvEEntry.Payment_Amt,
                    DebitCredit = PInvEEntry.DebitCredit,
                    DebtRaised = PInvEEntry.DebtRaised,
                    Approved = PInvEEntry.Approved,
                    SupplierId = PInvEEntry.SupplierId,
                    InternalOrExternal = PInvEEntry.InternalOrExternal,
                    CreatedBy = CreId,
                    ApprovedBy = AppByID,
                    MultiFlag = PInvEEntry.MultiFlag,
                    ledgerid = LegId,
                    voucherid = VocId,
                    Process_Invid=PInvEEntry.Process_Invid,
                };

                //AxonApparel.Repository.Pur_Inv_Debit_Credit puroInvCdrDib = new AxonApparel.Repository.Pur_Inv_Debit_Credit
                //{
                //    Pur_Inv_id = PIEntry.pur_invid,
                //    Reason = PIEntry.DReason,
                //    CreditAmount = PIEntry.CRateDiff,
                //    DebitAmount = PIEntry.DRateDiff,
                //    Head = PIEntry.DHead,

                //};
                var EPrnItmList = new List<Process_Inv_Dc>();

                foreach (var PItem in PInvEEntry.ProInvDcDet)
                {

                    EPrnItmList.Add(new Process_Inv_Dc
                    {
                        proc_recpt_masid = PItem.proc_recpt_masid,
                        Process_Inv_DcId = PItem.Process_Inv_DcId,
                        Process_invid = PItem.Process_invid,

                    });

                }

                var EItemDetails = new List<Process_Inv_Det>();

                if (PInvEEntry.ProInvDDet != null)
                {
                    foreach (var Item in PInvEEntry.ProInvDDet)
                    {
                        EItemDetails.Add(new Process_Inv_Det
                        {
                            Process_InvDetid = Item.Process_InvDetid,
                            Process_Invid = Item.Process_Invid,
                            Proc_Recpt_Detid = Item.Proc_Recpt_Detid,
                            Invoice_Qty = Item.Invoice_Qty,
                            Rate = Item.Rate,
                            Amount = Item.Amount,
                            closed = "",
                            IPMarkup_rate = Item.IPMarkup_rate,
                            OPMarkup_Rate = Item.OPMarkup_Rate,
                            IsSecQty = "N",
                            Proc_Recpt_masid = Item.Proc_Recpt_Masid,
                        });
                    }
                }

                var ERateDiffList = new List<Process_Inv_RateDiff>();
                if (PInvEEntry.ProInvRDiff != null)
                {
                    foreach (var PRate in PInvEEntry.ProInvRDiff)
                    {

                        ERateDiffList.Add(new Process_Inv_RateDiff
                        {
                            Proc_Recpt_detid = PRate.Proc_Recpt_Detid,
                            Process_inv_Rateid = PRate.Process_inv_Rateid,
                            Process_Invid = PRate.Process_Invid,
                            proc_recpt_no = PRate.Grnno,
                            GrnAmt = 0,
                            InvAmt = 0,
                            RateDiff = PRate.RateDiff,
                            QtyDiff = PRate.QtyDiff,
                            IsChecked = PRate.IsChecked,

                        });

                    }
                }

                var EInvOrdDetails = new List<Process_Inv_JobDet>();
                if (PInvEEntry.ProInvOrdDDet != null)
                {
                    foreach (var Ord in PInvEEntry.ProInvOrdDDet)
                    {
                        EInvOrdDetails.Add(new Process_Inv_JobDet
                        {
                            Process_Inv_JobDetID = Ord.Process_Inv_JobDetID,
                            Process_InvDetid = Ord.Process_InvDetid,
                            Job_Ord_No = Ord.Job_Ord_No,
                            InvoiceQty = Ord.InvoiceQty,
                            Process_Recpt_Detid = Ord.Process_recpt_DetId,
                            Process_Recpt_JobDetId = Ord.Process_recpt_JobDetId,
                        });
                    }
                }

                var EInvAccDetails = new List<Process_Inv_AddLess>();
                if (PInvEEntry.ProInvAL != null)
                {
                    foreach (var Ac in PInvEEntry.ProInvAL)
                    {
                        EInvAccDetails.Add(new Process_Inv_AddLess
                        {
                            Process_Inv_AddLessid = Ac.Pro_Inv_AddlessId,
                            Process_Invid = Ac.pro_invid,
                            AddLessid = Ac.addless_id,
                            Percentage = Ac.percentage,
                            Amount = Ac.amount,

                        });
                    }
                }

                var result = PRep.UpdateDetData(ProInvEdit, EPrnItmList, EItemDetails, ERateDiffList,EInvOrdDetails, EInvAccDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteProInvEntry(ProInvMas PInvDEntry)
        {
            int? AppByID = 0;
            int? LegId = 0;
            int? CreId = 0;
            int? VocId = 0;
            int? PDetId = 0;

            if (PInvDEntry.ledgerid == 0)
            {
                LegId = null;
            }
            else
            {
                LegId = PInvDEntry.ledgerid;
            }

            if (PInvDEntry.voucherid == 0)
            {
                VocId = null;
            }
            else
            {
                VocId = PInvDEntry.voucherid;
            }
            if (PInvDEntry.CreatedBy == 0)
            {
                CreId = null;
            }
            else
            {
                CreId = PInvDEntry.CreatedBy;
            }
            if (PInvDEntry.ApprovedBy == 0)
            {
                AppByID = null;
            }
            else
            {
                AppByID = PInvDEntry.ApprovedBy;
            }
            try
            {

                AxonApparel.Repository.Process_Inv_Mas ProInvDelete = new AxonApparel.Repository.Process_Inv_Mas
                {

                    OrderType = PInvDEntry.OrderType,
                    Inv_No = PInvDEntry.Inv_No,
                    Inv_Date = PInvDEntry.Inv_Date,
                    Inv_Amount = PInvDEntry.Inv_Amount,
                    Entry_No = PInvDEntry.Entry_No,
                    Entry_Date = PInvDEntry.Entry_Date,
                    Remarks = PInvDEntry.Remarks,
                    Payment_Amt = PInvDEntry.Payment_Amt,
                    DebitCredit = PInvDEntry.DebitCredit,
                    DebtRaised = PInvDEntry.DebtRaised,
                    Approved = PInvDEntry.Approved,
                    SupplierId = PInvDEntry.SupplierId,
                    InternalOrExternal = PInvDEntry.InternalOrExternal,
                    CreatedBy = CreId,
                    ApprovedBy = AppByID,
                    MultiFlag = PInvDEntry.MultiFlag,
                    ledgerid = LegId,
                    voucherid = VocId,
                    Process_Invid = PInvDEntry.Process_Invid,
                };

                //AxonApparel.Repository.Pur_Inv_Debit_Credit puroInvCdrDib = new AxonApparel.Repository.Pur_Inv_Debit_Credit
                //{
                //    Pur_Inv_id = PIEntry.pur_invid,
                //    Reason = PIEntry.DReason,
                //    CreditAmount = PIEntry.CRateDiff,
                //    DebitAmount = PIEntry.DRateDiff,
                //    Head = PIEntry.DHead,

                //};
                var DPrnItmList = new List<Process_Inv_Dc>();

                foreach (var PItem in PInvDEntry.ProInvDcDet)
                {

                    DPrnItmList.Add(new Process_Inv_Dc
                    {
                        proc_recpt_masid = PItem.proc_recpt_masid,
                        Process_Inv_DcId = PItem.Process_Inv_DcId,
                        Process_invid = PItem.Process_invid,

                    });

                }

                var DItemDetails = new List<Process_Inv_Det>();

                if (PInvDEntry.ProInvDDet != null)
                {
                    foreach (var Item in PInvDEntry.ProInvDDet)
                    {
                        DItemDetails.Add(new Process_Inv_Det
                        {
                            Process_InvDetid = Item.Process_InvDetid,
                            Process_Invid = Item.Process_Invid,
                            Proc_Recpt_Detid = Item.Proc_Recpt_Detid,
                            Invoice_Qty = Item.Invoice_Qty,
                            Rate = Item.Rate,
                            Amount = Item.Amount,
                            closed = "",
                            IPMarkup_rate = Item.IPMarkup_rate,
                            OPMarkup_Rate = Item.OPMarkup_Rate,
                            IsSecQty = "N",

                        });
                    }
                }


                var DInvOrdDetails = new List<Process_Inv_JobDet>();
                if (PInvDEntry.ProInvOrdDDet != null)
                {
                    foreach (var Ord in PInvDEntry.ProInvOrdDDet)
                    {
                        DInvOrdDetails.Add(new Process_Inv_JobDet
                        {
                            Process_Inv_JobDetID = Ord.Process_Inv_JobDetID,
                            Process_InvDetid = Ord.Process_InvDetid,
                            Job_Ord_No = Ord.Job_Ord_No,
                            InvoiceQty = Ord.InvoiceQty,
                            Process_Recpt_Detid=Ord.Process_recpt_DetId,
                            Process_Recpt_JobDetId = Ord.Process_recpt_JobDetId,

                        });
                    }
                }

                var DInvAccDetails = new List<Process_Inv_AddLess>();
                if (PInvDEntry.ProInvAL != null)
                {
                    foreach (var Ac in PInvDEntry.ProInvAL)
                    {
                        DInvAccDetails.Add(new Process_Inv_AddLess
                        {
                            Process_Inv_AddLessid = Ac.Pro_Inv_AddlessId,
                            Process_Invid = Ac.pro_invid,
                            AddLessid = Ac.addless_id,
                            Percentage = Ac.percentage,
                            Amount = Ac.amount,

                        });
                    }
                }

                var result = PRep.DeleteDetData(ProInvDelete, DPrnItmList, DItemDetails, DInvOrdDetails, DInvAccDetails);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProInvDc>> MultiListInPrnItemDetails(string PMasId, int CompId, int SuppId, string ProcessId, int Unitid, string Ptype, string Otype)
        {
            try
            {
                var CurRGList = PRep.MultiGetRepInvPrnItemLoad(PMasId, CompId, SuppId, ProcessId, Unitid, Ptype, Otype);

                return new Response<IList<ProInvDc>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvDc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProInvDet>> MultiListProInItemDetails(string PMasId, int CompId, int SuppId, string ProcessId, int Unitid, string Ptype, string Otype)
        {
            try
            {
                var CurRGList = PRep.MultiGetRepInvProItemLoad(PMasId, CompId, SuppId, ProcessId, Unitid, Ptype, Otype);

                return new Response<IList<ProInvDet>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProInvDc>> MultiListInPrnEditItemDetails(int InvId, int CompId, int SuppId)
        {
            try
            {
                var CurRGList = PRep.MultiGetRepEditInvPrnItemLoad(InvId, CompId, SuppId);

                return new Response<IList<ProInvDc>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<ProInvDc>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProInvMas>> GetDataBillDetails(int? CompanyId, int? SupplierId, string Inv_Date, int? BillId, string BOrdType, string BPurType, string IorE)
        {
            try
            {
                var ProductWO = PRep.GetDataBillRepDetails(CompanyId, SupplierId, Inv_Date, BillId, BOrdType, BPurType, IorE);

                return new Response<IQueryable<ProInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> BillAddInvEntry(int billId, string EntryNo, string MType)
        {
          
            try
            {
                var result = PRep.AddBillDetData(billId, EntryNo, MType);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProInvMas>> GetDataEditBillDetails(int? CompanyId, int? SupplierId, string Inv_Date, string Entry_No, string BOrdType, string BPurType)
        {
            try
            {
                var ProductWO = PRep.GetDataEditBillRepDetails(CompanyId, SupplierId, Inv_Date, Entry_No, BOrdType, BPurType);

                return new Response<IQueryable<ProInvMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<ProInvMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
