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
    public class ProcessOrderBusiness : IProcessOrderBusiness
    {
        IProcessOrderRepository repo = new ProcessOrderRepository();

        public Common.Response<IQueryable<Domain.ProcessOrderAddScreen>> Getrefno(int cmpid, int cmunitid)
        {
            try
            {
                var ProductWO = repo.Getrefno(cmpid, cmunitid);

                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Common.Response<IQueryable<Domain.ProcessOrderAddScreen>> GetProcessSupplier(int procordid)
        {
            try
            {
                var ProductWO = repo.GetProcessSupplier(procordid);

                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public String GetUserGroup(int procordid)
        {
            try
            {
                String ProductWO = repo.GetUserGroup(procordid).ToString();

                return ProductWO;
                //return res;
            }
            catch (Exception)
            {
                return "";
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderAddScreen>> Loadgrid(int cmpid, string closed, string amend, int cmpunitid, int procid, string ordertype, int buyerid, string refno, int stylid, string orderno)
        {
            try
            {
                var ProductWO = repo.Loadgrid(cmpid, closed, amend, cmpunitid, procid, ordertype, buyerid, refno, stylid, orderno);

                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOutputitmsgrid(string closed, string jobordno, int procid)
        {
            try
            {
                var ProductWO = repo.LoadOutputitmsgrid(closed, jobordno, procid);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadOutputjoborddetgrid(string closed, string jobordno, int procid, string OpenPgAp)
        {
            try
            {
                var ProductWO = repo.LoadOutputJobdetgrid(closed, jobordno, procid, OpenPgAp);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputitmsgrid(string closed, string jobordno, int procid)
        {
            try
            {
                var ProductWO = repo.LoadInputitmsgrid(closed, jobordno, procid);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputjoborddetgrid(string closed, string jobordno, int procid, string OpenPgAp)
        {
            try
            {
                var ProductWO = repo.LoadInputJobdetgrid(closed, jobordno, procid, OpenPgAp);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadInputStkWgrid(string itmcat, int itmid, int clrid, int sizeid, string jobordno, string transtype, int cmpid, int procid,int Storeid)
        {
            try
            {
                var ProductWO = repo.LoadInputStkWgrid(itmcat, itmid, clrid, sizeid, jobordno, transtype, cmpid, procid, Storeid);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> CreateUnitEntry(Domain.ProcessOrdMas MasEntry)
        {

            string IRem = "";
            try
            {
                int? StrUnit = 0;

                if (MasEntry.StoreUnitId == 0)
                {
                    StrUnit = null;
                }
                else
                {
                    StrUnit = MasEntry.StoreUnitId;
                }
                AxonApparel.Repository.Process_Ord_Mas ProcIns = new AxonApparel.Repository.Process_Ord_Mas


                 //var ID = repo.AddData(new AxonApparel.Repository.Process_Ord_Mas
                 {
                     processordid = MasEntry.processordid,
                     processorder = MasEntry.processorder,
                     processordate = MasEntry.processordate,
                     processorid = MasEntry.processorid,
                     processid = MasEntry.processid,
                     remarks = MasEntry.remarks,
                     companyunitid = MasEntry.companyunitid,
                     companyid = MasEntry.companyid,
                     ProcessorType = MasEntry.ProcessorType,
                     OrderType = MasEntry.OrderType,
                     Closed = MasEntry.Closed,
                     OrderCumIssue = MasEntry.OrderCumIssue,
                     DelidateTime = MasEntry.DelidateTime,
                     ComboIds = "",//MasEntry.ComboIds,
                     DispLocType = MasEntry.DispLocType,
                     DispLoc = MasEntry.DispLoc,
                     IssueLocType = MasEntry.IssueLocType,
                     IssueLoc = MasEntry.IssueLoc,
                     Teamid = MasEntry.Teamid,
                     StoreUnitId = StrUnit,
                     CreatedBy = MasEntry.CreatedBy,
                     Phoneno = MasEntry.Phoneno,
                     contactperson = MasEntry.contactperson,
                     amount = MasEntry.amount,
                     taxamount = MasEntry.taxamount,
                     saccode = MasEntry.saccode,
                     IGST = MasEntry.IGST,
                     SGST = MasEntry.SGST,
                     TotCGST = MasEntry.TotCGST,
                     TotIGST = MasEntry.TotIGST,
                     TotSGST = MasEntry.TotSGST,
                     CGST = MasEntry.CGST,
                     ModuleType = MasEntry.moduletype,
                     YarnLoc = MasEntry.YarnLoc,
                     KnitLoc = MasEntry.KnitLoc,
                     Approved = "P",
                     FinalProcess = MasEntry.fintype,

                 };

                var ItmList = new List<Process_Ord_Det>();

                foreach (var PItem in MasEntry.ProdDet)
                {


                    if (PItem.ItemRemarks == "")
                    {
                        IRem = "";
                    }
                    else
                    {
                        IRem = PItem.ItemRemarks;
                    }
                    int? FDID = 0;
                    if (PItem.FinDiaid == 0)
                    {
                        FDID = null;
                    }
                    else
                    {
                        FDID = PItem.FinDiaid;
                    }

                    ItmList.Add(new Process_Ord_Det
                    {
                        processordid = PItem.processordid,
                        processorddetid = PItem.processorddetid,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        inp_op = PItem.inp_op,
                        order_output_qty = PItem.order_output_qty,
                        issued_qty = PItem.issued_qty,
                        rate = PItem.rate,
                        received_qty = PItem.received_qty,
                        Return_Qty = PItem.Return_Qty,
                        Returnable_Qty = PItem.Returnable_Qty,
                        Damage_qty = PItem.Damage_qty,
                        Cancel_Qty = PItem.Cancel_Qty,
                        Inp_CancelQty = PItem.Inp_CancelQty,
                        Markup_Rate = PItem.Markup_Rate,
                        Markup_Value = PItem.Markup_Value,
                        PlannedSizeID = PItem.PlannedSizeID,
                        OrdSecQty = PItem.OrdSecQty,
                        ItemRemarks = "",//PItem.ItemRemarks,
                        Loss_Qty = PItem.Loss_Qty,
                        IN_OUT_UOMID = PItem.IN_OUT_UOMID,
                        IssueSizeID = PItem.IssueSizeID,
                        ReqDate = PItem.ReqDate,
                        Loop_Len = PItem.Loop_Len,
                        Gauge = PItem.Gauge,
                        TaxAppVal = PItem.TaxAppVal,
                        FinDiaid = FDID,
                        FinGsm = PItem.FinGsm,
                        OpItemId = PItem.opitemid,
                        OpColorId = PItem.opcolorid,
                        OpSizeId = PItem.opsizeid,

                    });

                }

                var ItmstkList = new List<Process_Ord_JobDet>();

                foreach (var stk in MasEntry.ProdJobDet)
                {
                    ItmstkList.Add(new Process_Ord_JobDet
                    {
                        ProcessOrdid = stk.ProcessnOrdid,
                        ProcessOrddetid = stk.ProcessOrddetid,
                        ProcessJobDetid = stk.ProcessJobDetid,
                        ProgQty = stk.ProgQty,
                        OrderQty = stk.OrderQty,
                        issued_qty = stk.issued_qty,
                        received_qty = stk.received_qty,
                        Return_Qty = stk.Return_Qty,
                        Damage_qty = stk.Damage_qty,
                        Cancel_Qty = stk.Cancel_Qty,
                        Job_ord_no = stk.Job_ord_no,
                        ProdPrgNo = stk.ProdPrgNo,
                        Returnable_Qty = stk.Returnable_Qty,
                        Closed = stk.Closed,
                        Inp_CancelQty = stk.Inp_CancelQty,
                        OrdSecQty = stk.OrdSecQty,
                        Loss_Qty = stk.Loss_Qty,
                        buy_ord_ship = stk.buy_ord_ship,
                        Itemid = stk.itemid,
                        Colorid = stk.colorid,
                        Sizeid = stk.sizeid,
                        ip_op = stk.ipop,
                        PlannedSizeID = stk.PlannedSizeID,
                        OpItemId = stk.opitemid,
                        OpColorId = stk.opcolorid,
                        OpSizeId = stk.opsizeid,
                    });

                }

                //var StkList = new List<Production_Ord_Stock>();

                //if (MasEntry.ProdStkDet != null)
                //{
                //    foreach (var stkdet in MasEntry.ProdStkDet)
                //    {

                //        StkList.Add(new Production_Ord_Stock
                //        {
                //            ProductionOrdStockId = stkdet.ProductionOrdStockId,
                //            ProductionOrdJobid = stkdet.ProductionOrdJobid,
                //            Productionordid = ID,
                //            IssueQty = stkdet.IssueQty,
                //            LossQty = stkdet.LossQty,
                //            LotNo = "",//stkdet.LotNo,
                //            Returnable_Qty = stkdet.Returnable_Qty,
                //            ReturnQty = stkdet.ReturnQty,
                //            ItemStockId = stkdet.ItemStockId,
                //            Itemid = stkdet.Itemid,
                //            Colorid = stkdet.Colorid,
                //            Sizeid = stkdet.Sizeid,
                //            Markup_Rate = stkdet.Markup_Rate,
                //            Job_ord_no = stkdet.jobordno,
                //            Productionorder = stkdet.Productionorder

                //        });

                //    }
                //}

                var AddlessList = new List<Process_Ord_AddLess>();

                if (MasEntry.ProdAddLess != null)
                {
                    foreach (var addless in MasEntry.ProdAddLess)
                    {

                        AddlessList.Add(new Process_Ord_AddLess
                        {
                            Process_Ord_id = addless.Process_Ord_id,
                            Process_Ord_Discountid = addless.Process_Ord_Discountid,
                            Addlessid = addless.Addlessid,
                            Amount = addless.Amount,
                            PlusOrMinus = addless.PlusOrMinus,
                            Percentage = addless.Percentage

                        });

                    }
                }

                var result = repo.AddDetData(ProcIns, ItmList, ItmstkList, AddlessList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }

        public Common.Response<bool> UpdateData(Domain.ProcessOrdMas objupd)
        {
            string IRem = "";
            try
            {
                int? StrUnit = 0;

                if (objupd.StoreUnitId == 0)
                {
                    StrUnit = null;
                }
                else
                {
                    StrUnit = objupd.StoreUnitId;
                }

                AxonApparel.Repository.Process_Ord_Mas ProcUpd = new AxonApparel.Repository.Process_Ord_Mas

               //var ID = repo.UpdateData(new AxonApparel.Repository.Process_Ord_Mas
               {
                   processordid = objupd.processordid,
                   processorder = objupd.processorder,
                   processordate = objupd.processordate,
                   processorid = objupd.processorid,
                   processid = objupd.processid,
                   remarks = objupd.remarks,
                   companyunitid = objupd.companyunitid,
                   companyid = objupd.companyid,
                   ProcessorType = objupd.ProcessorType,
                   OrderType = objupd.OrderType,
                   Closed = objupd.Closed,
                   OrderCumIssue = objupd.OrderCumIssue,
                   DelidateTime = objupd.DelidateTime,
                   ComboIds = "",//MasEntry.ComboIds,
                   DispLocType = objupd.DispLocType,
                   DispLoc = objupd.DispLoc,
                   IssueLocType = objupd.IssueLocType,
                   IssueLoc = objupd.IssueLoc,
                   Teamid = objupd.Teamid,
                   StoreUnitId = StrUnit,
                   CreatedBy = objupd.CreatedBy,
                   Phoneno = objupd.Phoneno,
                   contactperson = objupd.contactperson,
                   amount = objupd.amount,
                   taxamount = objupd.taxamount,
                   saccode = objupd.saccode,
                   IGST = objupd.IGST,
                   SGST = objupd.SGST,
                   TotCGST = objupd.TotCGST,
                   TotIGST = objupd.TotIGST,
                   TotSGST = objupd.TotSGST,
                   CGST = objupd.CGST,
                   ModuleType = objupd.moduletype,
                   YarnLoc = objupd.YarnLoc,
                   KnitLoc = objupd.KnitLoc,
                   Approved = "P",
                   FinalProcess = objupd.fintype,
               };

                var ItmList = new List<Process_Ord_Det>();

                foreach (var PItem in objupd.ProdDet)
                {


                    if (PItem.ItemRemarks == "")
                    {
                        IRem = "";
                    }
                    else
                    {
                        IRem = PItem.ItemRemarks;
                    }

                    int? FDID = 0;
                    if (PItem.FinDiaid == 0)
                    {
                        FDID = null;
                    }
                    else
                    {
                        FDID = PItem.FinDiaid;
                    }
                    ItmList.Add(new Process_Ord_Det
                    {
                        processordid = PItem.processordid,
                        processorddetid = PItem.processorddetid,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        inp_op = PItem.inp_op,
                        order_output_qty = PItem.order_output_qty,
                        issued_qty = PItem.issued_qty,
                        rate = PItem.rate,
                        received_qty = PItem.received_qty,
                        Return_Qty = PItem.Return_Qty,
                        Returnable_Qty = PItem.Returnable_Qty,
                        Damage_qty = PItem.Damage_qty,
                        Cancel_Qty = PItem.Cancel_Qty,
                        Inp_CancelQty = PItem.Inp_CancelQty,
                        Markup_Rate = PItem.Markup_Rate,
                        Markup_Value = PItem.Markup_Value,
                        PlannedSizeID = PItem.PlannedSizeID,
                        OrdSecQty = PItem.OrdSecQty,
                        ItemRemarks = "",//PItem.ItemRemarks,
                        Loss_Qty = PItem.Loss_Qty,
                        IN_OUT_UOMID = PItem.IN_OUT_UOMID,
                        IssueSizeID = PItem.IssueSizeID,
                        ReqDate = PItem.ReqDate,
                        Loop_Len = PItem.Loop_Len,
                        Gauge = PItem.Gauge,
                        TaxAppVal = PItem.TaxAppVal,
                        FinDiaid = FDID,
                        FinGsm = PItem.FinGsm,
                        OpItemId = PItem.opitemid,
                        OpColorId = PItem.opcolorid,
                        OpSizeId = PItem.opsizeid,

                    });

                }

                var ItmstkList = new List<Process_Ord_JobDet>();

                foreach (var stk in objupd.ProdJobDet)
                {
                    ItmstkList.Add(new Process_Ord_JobDet
                    {
                        ProcessOrdid = stk.ProcessnOrdid,
                        ProcessOrddetid = stk.ProcessOrddetid,
                        ProcessJobDetid = stk.ProcessJobDetid,
                        ProgQty = stk.ProgQty,
                        OrderQty = stk.OrderQty,
                        issued_qty = stk.issued_qty,
                        received_qty = stk.received_qty,
                        Return_Qty = stk.Return_Qty,
                        Damage_qty = stk.Damage_qty,
                        Cancel_Qty = stk.Cancel_Qty,
                        Job_ord_no = stk.Job_ord_no,
                        ProdPrgNo = stk.ProdPrgNo,
                        Returnable_Qty = stk.Returnable_Qty,
                        Closed = stk.Closed,
                        Inp_CancelQty = stk.Inp_CancelQty,
                        OrdSecQty = stk.OrdSecQty,
                        Loss_Qty = stk.Loss_Qty,
                        buy_ord_ship = stk.buy_ord_ship,
                        Itemid = stk.itemid,
                        Colorid = stk.colorid,
                        Sizeid = stk.sizeid,
                        ip_op = stk.ipop,
                        PlannedSizeID = stk.PlannedSizeID,
                        OpItemId = stk.opitemid,
                        OpColorId = stk.opcolorid,
                        OpSizeId = stk.opsizeid,
                    });

                }

                //var StkList = new List<Production_Ord_Stock>();

                //if (MasEntry.ProdStkDet != null)
                //{
                //    foreach (var stkdet in MasEntry.ProdStkDet)
                //    {

                //        StkList.Add(new Production_Ord_Stock
                //        {
                //            ProductionOrdStockId = stkdet.ProductionOrdStockId,
                //            ProductionOrdJobid = stkdet.ProductionOrdJobid,
                //            Productionordid = ID,
                //            IssueQty = stkdet.IssueQty,
                //            LossQty = stkdet.LossQty,
                //            LotNo = "",//stkdet.LotNo,
                //            Returnable_Qty = stkdet.Returnable_Qty,
                //            ReturnQty = stkdet.ReturnQty,
                //            ItemStockId = stkdet.ItemStockId,
                //            Itemid = stkdet.Itemid,
                //            Colorid = stkdet.Colorid,
                //            Sizeid = stkdet.Sizeid,
                //            Markup_Rate = stkdet.Markup_Rate,
                //            Job_ord_no = stkdet.jobordno,
                //            Productionorder = stkdet.Productionorder

                //        });

                //    }
                //}

                var AddlessList = new List<Process_Ord_AddLess>();

                if (objupd.ProdAddLess != null)
                {
                    foreach (var addless in objupd.ProdAddLess)
                    {

                        AddlessList.Add(new Process_Ord_AddLess
                        {
                            Process_Ord_id = addless.Process_Ord_id,
                            Process_Ord_Discountid = addless.Process_Ord_Discountid,
                            Addlessid = addless.Addlessid,
                            Amount = addless.Amount,
                            PlusOrMinus = addless.PlusOrMinus,
                            Percentage = addless.Percentage

                        });

                    }
                }

                var result = repo.UpdDetData(ProcUpd, ItmList, ItmstkList, AddlessList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }



        public Common.Response<IQueryable<Domain.ProcessOrderAddScreen>> LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType , int Userid)
        {

            try
            {
                var ProductWO = repo.LoadMaingrid(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate, orderno, refno, styleid, AppType, Userid);

                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderAddScreen>> LoadMaingriddet(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate, string orderno, string refno, int styleid, string AppType, int Userid)
        {

            try
            {
                var ProductWO = repo.LoadMaingriddet(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate, orderno, refno, styleid, AppType, Userid);

                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditOutputitmsgrid(int prodid)
        {
            try
            {
                var ProductWO = repo.LoadEditOutputitmsgrid(prodid);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputitmsgrid(int prodid)
        {
            try
            {
                var ProductWO = repo.LoadEditInputitmsgrid(prodid);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditOutputJobDetgrid(int prodid)
        {
            try
            {
                var ProductWO = repo.LoadEditOutputJobdetgrid(prodid);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputJobDetgrid(int prodid)
        {
            try
            {
                var ProductWO = repo.LoadEditInputJobdetgrid(prodid);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessOrderDetInfo>> LoadEditInputStkdet(int cmpid, int prodid, string prodordno)
        {
            try
            {
                var ProductWO = repo.LoadEditInputStkdet(cmpid, prodid, prodordno);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> DeleteIssDelEntry(Domain.ProcessOrdMas DelDEntry)
        {


            //Process Ord Add


            //var ID = repo.UpdateData(new AxonApparel.Repository.Process_Ord_Mas
            //{
            //    processordid = objupd.processordid,
            //    processorder = objupd.processorder,
            //    processordate = objupd.processordate,
            //    processorid = objupd.processorid,
            //    processid = objupd.processid,
            //    remarks = objupd.remarks,
            //    companyunitid = objupd.companyunitid,
            //    companyid = objupd.companyid,
            //    ProcessorType = objupd.ProcessorType,
            //    OrderType = objupd.OrderType,
            //    Closed = objupd.Closed,
            //    OrderCumIssue = objupd.OrderCumIssue,
            //    DelidateTime = objupd.DelidateTime,
            //    ComboIds = "",//MasEntry.ComboIds,
            //    DispLocType = objupd.DispLocType,
            //    DispLoc = objupd.DispLoc,
            //    IssueLocType = objupd.IssueLocType,
            //    IssueLoc = objupd.IssueLoc,
            //    Teamid = objupd.Teamid,
            //    StoreUnitId = objupd.StoreUnitId,
            //    CreatedBy = objupd.CreatedBy,
            //    Phoneno = objupd.Phoneno,
            //    contactperson = objupd.contactperson,
            //    amount = objupd.amount,
            //    taxamount = objupd.taxamount,
            //    saccode = objupd.saccode,
            //    IGST = objupd.IGST,
            //    SGST = objupd.SGST,
            //    TotCGST = objupd.TotCGST,
            //    TotIGST = objupd.TotIGST,
            //    TotSGST = objupd.TotSGST,
            //    CGST = objupd.CGST,
            //    ModuleType = objupd.moduletype

            //});

            var ItmList = new List<Process_Ord_Det>();

            foreach (var PItem in DelDEntry.ProdDet)
            {



                ItmList.Add(new Process_Ord_Det
                {
                    processordid = PItem.processordid,
                    processorddetid = PItem.processorddetid,
                    itemid = PItem.itemid,
                    colorid = PItem.colorid,
                    sizeid = PItem.sizeid,
                    inp_op = PItem.inp_op,
                    order_output_qty = PItem.order_output_qty,
                    issued_qty = PItem.issued_qty,
                    rate = PItem.rate,
                    received_qty = PItem.received_qty,
                    Return_Qty = PItem.Return_Qty,
                    Returnable_Qty = PItem.Returnable_Qty,
                    Damage_qty = PItem.Damage_qty,
                    Cancel_Qty = PItem.Cancel_Qty,
                    Inp_CancelQty = PItem.Inp_CancelQty,
                    Markup_Rate = PItem.Markup_Rate,
                    Markup_Value = PItem.Markup_Value,
                    PlannedSizeID = PItem.PlannedSizeID,
                    OrdSecQty = PItem.OrdSecQty,
                    ItemRemarks = "",//PItem.ItemRemarks,
                    Loss_Qty = PItem.Loss_Qty,
                    IN_OUT_UOMID = PItem.IN_OUT_UOMID,
                    IssueSizeID = PItem.IssueSizeID,
                    ReqDate = PItem.ReqDate,
                    Loop_Len = PItem.Loop_Len,
                    Gauge = PItem.Gauge,
                    OpItemId = PItem.opitemid,
                    OpSizeId = PItem.opsizeid,
                    OpColorId = PItem.opcolorid,

                });

            }

            var ItmstkList = new List<Process_Ord_JobDet>();

            foreach (var stk in DelDEntry.ProdJobDet)
            {
                ItmstkList.Add(new Process_Ord_JobDet
                {
                    ProcessOrdid = stk.ProcessnOrdid,
                    ProcessOrddetid = stk.ProcessOrddetid,
                    ProcessJobDetid = stk.ProcessJobDetid,
                    ProgQty = stk.ProgQty,
                    OrderQty = stk.OrderQty,
                    issued_qty = stk.issued_qty,
                    received_qty = stk.received_qty,
                    Return_Qty = stk.Return_Qty,
                    Damage_qty = stk.Damage_qty,
                    Cancel_Qty = stk.Cancel_Qty,
                    Job_ord_no = stk.Job_ord_no,
                    ProdPrgNo = stk.ProdPrgNo,
                    Returnable_Qty = stk.Returnable_Qty,
                    Closed = stk.Closed,
                    Inp_CancelQty = stk.Inp_CancelQty,
                    OrdSecQty = stk.OrdSecQty,
                    Loss_Qty = stk.Loss_Qty,
                    buy_ord_ship = stk.buy_ord_ship,
                    Itemid = stk.itemid,
                    Colorid = stk.colorid,
                    Sizeid = stk.sizeid,
                    ip_op = stk.ipop,
                    PlannedSizeID = stk.PlannedSizeID,
                    OpItemId = stk.opitemid,
                    OpSizeId = stk.opsizeid,
                    OpColorId = stk.opcolorid,

                });

            }


            var AddlessList = new List<Process_Ord_AddLess>();

            if (DelDEntry.ProdAddLess != null)
            {
                foreach (var addless in DelDEntry.ProdAddLess)
                {

                    AddlessList.Add(new Process_Ord_AddLess
                    {
                        Process_Ord_id = addless.Process_Ord_id,
                        Process_Ord_Discountid = addless.Process_Ord_Discountid,
                        Addlessid = addless.Addlessid,
                        Amount = addless.Amount,
                        PlusOrMinus = addless.PlusOrMinus,
                        Percentage = addless.Percentage

                    });

                }
            }

            //Process Issue Add


            var MasList = new List<Process_Issue_Mas>();

            foreach (var Pim in DelDEntry.ProcissMas)
            {
                MasList.Add(new Process_Issue_Mas
                {

                    ProcessIssueId = Pim.ProcessIssueId,
                    ProcessIssueNo = Pim.ProcessIssueNo,
                    ProcessIssueDate = Pim.ProcessIssueDate,
                    ProcessOrdId = Pim.ProcessOrdId,
                    Remarks = Pim.Remarks,
                    GatePassVehicle = "",//MasEntry.GatePassVehicle,
                    IssueStoreid = null,// MasEntry.IssueStoreid,
                    CreatedBy = Pim.CreatedBy,
                    EWayNo = Pim.EWayNo,
                    EWayDate = Pim.EWayDate
                });
            }

            var ItmissList = new List<Process_Issue_Det>();

            foreach (var PItem in DelDEntry.ProcissDet)
            {
                ItmissList.Add(new Process_Issue_Det
                {
                    ProcessIssueDetId = PItem.ProcessIssueDetId,
                    ProcessIssueId = PItem.ProcessIssueId,
                    itemid = PItem.itemid,
                    colorid = PItem.colorid,
                    sizeid = PItem.sizeid,
                    IssueQty = PItem.IssueQty,
                    SecQty = PItem.SecQty,
                    OutputUom = null,//PItem.OutputUom,
                    OutputValue = 0,// PItem.OutputValue,
                    IPMarkup_Rate = 0,// PItem.IPMarkup_Rate,
                    ip_op = PItem.ip_op,
                    PlannedSizeID = PItem.PlannedSizeID,
                    OpItemId = PItem.opitemid,
                    OpSizeId = PItem.opsizeid,
                    OpColorId = PItem.opcolorid,
                });

            }

            var ItmjobList = new List<Process_Issue_Jobdet>();

            foreach (var jdet in DelDEntry.ProcissJobDet)
            {
                ItmjobList.Add(new Process_Issue_Jobdet
                {
                    ProcessIssueId = jdet.ProcessIssueId,
                    ProcessIssueJobId = jdet.ProcessIssueJobId,
                    ProcessIssueDetId = jdet.ProcessIssueDetId,
                    LastProcessid = jdet.LastProcessid,
                    Job_ord_no = jdet.Job_ord_no,
                    ProdPrgNo = jdet.ProdPrgNo,
                    IssueQty = jdet.IssueQty,
                    ReturnQty = 0,// jdet.ReturnQty,
                    LossQty = 0,// jdet.LossQty,
                    SecQty = jdet.SecQty,
                    itemid = jdet.itemid,
                    colorid = jdet.colorid,
                    sizeid = jdet.sizeid,
                    ip_op = jdet.ip_op,
                    PlannedSizeID = jdet.PlannedSizeID,
                    OpItemId = jdet.opitemid,
                    OpSizeId = jdet.opsizeid,
                    OpColorId = jdet.opcolorid,

                });

            }

            var StkList = new List<Process_Issue_Stock>();

            if (DelDEntry.Procissstk != null)
            {
                foreach (var stkdet in DelDEntry.Procissstk)
                {

                    StkList.Add(new Process_Issue_Stock
                    {
                        ProcessIssueId = stkdet.ProcessIssueId,
                        ProcessIssueJobid = stkdet.ProcessIssueJobid,
                        ProcessIssStockId = stkdet.ProcessIssStockId,
                        ProcessIssueNo = stkdet.ProcessIssueNo,
                        IssueQty = stkdet.IssueQty,
                        LossQty = 0,//stkdet.LossQty,
                        LotNo = "",//stkdet.LotNo,
                        Returnable_Qty = 0,// stkdet.Returnable_Qty,
                        ReturnQty = 0,//stkdet.ReturnQty,
                        ItemStockId = stkdet.ItemStockId,
                        Itemid = stkdet.Itemid,
                        Colorid = stkdet.Colorid,
                        Sizeid = stkdet.Sizeid,
                        Markup_Rate = 0,// stkdet.Markup_Rate,
                        Job_ord_no = stkdet.Job_ord_no,
                        OpItemId = stkdet.opitemid,
                        OpSizeId = stkdet.opsizeid,
                        OpColorId = stkdet.opcolorid,

                    });

                }
            }

            var JList = new List<Domain.ProcessIssueJobdet>();
            foreach (var jdet in DelDEntry.ProcissJobDet)
            {
                JList.Add(new ProcessIssueJobdet
                {

                    processordjobdetid = jdet.processordjobdetid,
                    processorddetid = jdet.processorddetid,
                    ProcessIssueDetId = jdet.ProcessIssueDetId,
                    ProcessIssueJobId = jdet.ProcessIssueJobId,
                    IssueQty = jdet.IssueQty,
                    itemid = jdet.itemid,
                    colorid = jdet.colorid,
                    sizeid = jdet.sizeid,
                    ProdPrgNo = jdet.ProdPrgNo,
                    PlannedSizeID = jdet.PlannedSizeID,
                    ip_op = jdet.ip_op,
                    opitemid = jdet.opitemid,
                    opsizeid = jdet.opsizeid,
                    opcolorid = jdet.opcolorid,

                });
            }

            var result = repo.DeleteIssueDetData(ItmList, ItmstkList, AddlessList, JList, MasList, ItmissList, ItmjobList, StkList, "");
            //var result = repo.AddDetData(ItmList, ItmstkList, AddlessList, "Add");

            return new Response<bool>(result, Status.SUCCESS, "Deleted Successfully");
            // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");

        }


        //public Response<bool> CreateIssUnitEntry(Domain.ProcessIssueMas MasEntry)
        //{

        //    var stid = 0;

        //    try
        //    {
        //        if (MasEntry.IssueStoreid == null)
        //        {
        //            stid = 0;
        //        }
        //        else
        //        {
        //            stid = MasEntry.IssueStoreid;
        //        }
        //        var ID = repo.AddIssData(new AxonApparel.Repository.Process_Issue_Mas
        //        {

        //            ProcessIssueId = MasEntry.ProcessIssueId,
        //            ProcessIssueNo = MasEntry.ProcessIssueNo,
        //            ProcessIssueDate = MasEntry.ProcessIssueDate,
        //            ProcessOrdId = MasEntry.ProcessOrdId,
        //            Remarks = MasEntry.Remarks,
        //            GatePassVehicle = "",//MasEntry.GatePassVehicle,
        //            IssueStoreid = null,// MasEntry.IssueStoreid,
        //            CreatedBy = MasEntry.CreatedBy,
        //            EWayNo = MasEntry.EWayNo,
        //            EWayDate = MasEntry.EWayDate
        //        });

        //        var ItmList = new List<Process_Issue_Det>();

        //        foreach (var PItem in MasEntry.ProcissDet)
        //        {
        //            ItmList.Add(new Process_Issue_Det
        //            {
        //                ProcessIssueDetId = PItem.ProcessIssueDetId,
        //                ProcessIssueId = ID,//PItem.ProcessIssueId,
        //                itemid = PItem.itemid,
        //                colorid = PItem.colorid,
        //                sizeid = PItem.sizeid,
        //                IssueQty = PItem.IssueQty,
        //                SecQty = 1,// PItem.SecQty,
        //                OutputUom = PItem.OutputUom,
        //                OutputValue = 0,// PItem.OutputValue,
        //                IPMarkup_Rate = 0,// PItem.IPMarkup_Rate,
        //                ip_op = PItem.ip_op

        //            });

        //        }

        //        var ItmjobList = new List<Process_Issue_Jobdet>();

        //        foreach (var jdet in MasEntry.ProcissJobDet)
        //        {
        //            ItmjobList.Add(new Process_Issue_Jobdet
        //            {
        //                ProcessIssueId = ID,
        //                ProcessIssueJobId = jdet.ProcessIssueJobId,
        //                ProcessIssueDetId = jdet.ProcessIssueDetId,
        //                LastProcessid = jdet.LastProcessid,
        //                Job_ord_no = jdet.Job_ord_no,
        //                ProdPrgNo = jdet.ProdPrgNo,
        //                IssueQty = jdet.IssueQty,
        //                ReturnQty = 0,// jdet.ReturnQty,
        //                LossQty = 0,// jdet.LossQty,
        //                SecQty = 1,// jdet.SecQty,
        //                itemid = jdet.itemid,
        //                colorid = jdet.colorid,
        //                sizeid = jdet.sizeid,
        //                ip_op = jdet.ip_op,


        //            });

        //        }

        //        var StkList = new List<Process_Issue_Stock>();

        //        if (MasEntry.Procissstk != null)
        //        {
        //            foreach (var stkdet in MasEntry.Procissstk)
        //            {

        //                StkList.Add(new Process_Issue_Stock
        //                {
        //                    ProcessIssueId = ID,//stkdet.ProcessIssueId,
        //                    ProcessIssueJobid = stkdet.ProcessIssueJobid,
        //                    ProcessIssStockId = stkdet.ProcessIssStockId,
        //                    ProcessIssueNo = stkdet.ProcessIssueNo,
        //                    IssueQty = stkdet.IssueQty,
        //                    LossQty = 0,//stkdet.LossQty,
        //                    LotNo = "",//stkdet.LotNo,
        //                    Returnable_Qty = 0,// stkdet.Returnable_Qty,
        //                    ReturnQty = 0,//stkdet.ReturnQty,
        //                    ItemStockId = stkdet.ItemStockId,
        //                    Itemid = stkdet.Itemid,
        //                    Colorid = stkdet.Colorid,
        //                    Sizeid = stkdet.Sizeid,
        //                    Markup_Rate = 0,// stkdet.Markup_Rate,
        //                    Job_ord_no = stkdet.Job_ord_no,


        //                });

        //            }
        //        }

        //        var JList = new List<Domain.ProcessIssueJobdet>();
        //        foreach (var jdet in MasEntry.ProcissJobDet)
        //        {
        //            JList.Add(new ProcessIssueJobdet
        //            {

        //                processordjobdetid = jdet.processordjobdetid,
        //                IssueQty = jdet.IssueQty



        //            });
        //        }
        //        var result = repo.AddIssDetData(MasEntry.ProcessIssueDate, JList, MasEntry.ProcessOrdId, MasEntry.ProcessIssueNo, ItmList, ItmjobList, StkList, "Add");

        //        return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
        //        // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        //    }
        //    catch (Exception)
        //    {
        //        return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

        //    }
        //}


        public Response<bool> CreateIss(ProcessOrdMas MasEntry)
        {
            string IRem = "";
            try
            {
                Nullable<int> storeid = null;
                //Process Ord Add
                AxonApparel.Repository.Process_Ord_Mas ProcIns = new AxonApparel.Repository.Process_Ord_Mas

                //var ID = repo.AddData(new AxonApparel.Repository.Process_Ord_Mas
                {
                    processordid = MasEntry.processordid,
                    processorder = MasEntry.processorder,
                    processordate = MasEntry.processordate,
                    processorid = MasEntry.processorid,
                    processid = MasEntry.processid,
                    remarks = MasEntry.remarks,
                    companyunitid = MasEntry.companyunitid,
                    companyid = MasEntry.companyid,
                    ProcessorType = MasEntry.ProcessorType,
                    OrderType = MasEntry.OrderType,
                    Closed = MasEntry.Closed,
                    OrderCumIssue = MasEntry.OrderCumIssue,
                    DelidateTime = MasEntry.DelidateTime,
                    ComboIds = "",//MasEntry.ComboIds,
                    DispLocType = MasEntry.DispLocType,
                    DispLoc = MasEntry.DispLoc,
                    IssueLocType = MasEntry.IssueLocType,
                    IssueLoc = MasEntry.IssueLoc,
                    Teamid = MasEntry.Teamid,
                    StoreUnitId = (MasEntry.StoreUnitId == 0 ? storeid : MasEntry.StoreUnitId),
                    CreatedBy = MasEntry.CreatedBy,
                    Phoneno = MasEntry.Phoneno,
                    contactperson = MasEntry.contactperson,
                    amount = MasEntry.amount,
                    taxamount = MasEntry.taxamount,
                    saccode = MasEntry.saccode,
                    IGST = MasEntry.IGST,
                    SGST = MasEntry.SGST,
                    TotCGST = MasEntry.TotCGST,
                    TotIGST = MasEntry.TotIGST,
                    TotSGST = MasEntry.TotSGST,
                    CGST = MasEntry.CGST,
                    ModuleType = MasEntry.moduletype,
                    YarnLoc = MasEntry.YarnLoc,
                    KnitLoc = MasEntry.KnitLoc,
                    SubProcess = MasEntry.subtype,
                    Approved = "P",
                    FinalProcess = MasEntry.fintype,
                    Vehicleno=MasEntry.Vehicleno                };

                var ItmList = new List<Process_Ord_Det>();

                foreach (var PItem in MasEntry.ProdDet)
                {


                    if (PItem.ItemRemarks == "")
                    {
                        IRem = "";
                    }
                    else
                    {
                        IRem = PItem.ItemRemarks;
                    }

                    int? FDID = 0;

                    if (PItem.FinDiaid == 0)
                    {
                        FDID = null;
                    }
                    else
                    {
                        FDID = PItem.FinDiaid;
                    }

                    ItmList.Add(new Process_Ord_Det
                    {
                        processordid = PItem.processordid,
                        processorddetid = PItem.processorddetid,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        inp_op = PItem.inp_op,
                        order_output_qty = PItem.order_output_qty,
                        issued_qty = PItem.issued_qty,
                        rate = PItem.rate,
                        received_qty = PItem.received_qty,
                        Return_Qty = PItem.Return_Qty,
                        Returnable_Qty = PItem.Returnable_Qty,
                        Damage_qty = PItem.Damage_qty,
                        Cancel_Qty = PItem.Cancel_Qty,
                        Inp_CancelQty = PItem.Inp_CancelQty,
                        Markup_Rate = PItem.Markup_Rate,
                        Markup_Value = PItem.Markup_Value,
                        PlannedSizeID = PItem.PlannedSizeID,
                        OrdSecQty = PItem.OrdSecQty,
                        ItemRemarks = "",//PItem.ItemRemarks,
                        Loss_Qty = PItem.Loss_Qty,
                        IN_OUT_UOMID = PItem.IN_OUT_UOMID,
                        IssueSizeID = PItem.IssueSizeID,
                        ReqDate = PItem.ReqDate,
                        Loop_Len = PItem.Loop_Len,
                        Gauge = PItem.Gauge,
                        TaxAppVal = PItem.TaxAppVal,
                        FinDiaid = FDID,
                        FinGsm = PItem.FinGsm,
                        OpItemId = PItem.opitemid,
                        OpColorId = PItem.opcolorid,
                        OpSizeId = PItem.opsizeid,

                    });

                }

                var ItmstkList = new List<Process_Ord_JobDet>();

                foreach (var stk in MasEntry.ProdJobDet)
                {
                    ItmstkList.Add(new Process_Ord_JobDet
                    {
                        ProcessOrdid = stk.ProcessnOrdid,
                        ProcessOrddetid = stk.ProcessOrddetid,
                        ProcessJobDetid = stk.ProcessJobDetid,
                        ProgQty = stk.ProgQty,
                        OrderQty = stk.OrderQty,
                        issued_qty = stk.issued_qty,
                        received_qty = stk.received_qty,
                        Return_Qty = stk.Return_Qty,
                        Damage_qty = stk.Damage_qty,
                        Cancel_Qty = stk.Cancel_Qty,
                        Job_ord_no = stk.Job_ord_no,
                        ProdPrgNo = stk.ProdPrgNo,
                        Returnable_Qty = stk.Returnable_Qty,
                        Closed = stk.Closed,
                        Inp_CancelQty = stk.Inp_CancelQty,
                        OrdSecQty = stk.OrdSecQty,
                        Loss_Qty = stk.Loss_Qty,
                        buy_ord_ship = stk.buy_ord_ship,
                        Itemid = stk.itemid,
                        Colorid = stk.colorid,
                        Sizeid = stk.sizeid,
                        ip_op = stk.ipop,
                        PlannedSizeID = stk.PlannedSizeID,
                        OpItemId = stk.opitemid,
                        OpColorId = stk.opcolorid,
                        OpSizeId = stk.opsizeid,
                        rate = stk.rate,



                    });

                }


                var AddlessList = new List<Process_Ord_AddLess>();

                if (MasEntry.ProdAddLess != null)
                {
                    foreach (var addless in MasEntry.ProdAddLess)
                    {

                        AddlessList.Add(new Process_Ord_AddLess
                        {
                            Process_Ord_id = addless.Process_Ord_id,
                            Process_Ord_Discountid = addless.Process_Ord_Discountid,
                            Addlessid = addless.Addlessid,
                            Amount = addless.Amount,
                            PlusOrMinus = addless.PlusOrMinus,
                            Percentage = addless.Percentage

                        });

                    }
                }

                //Process Issue Add


                var MasList = new List<Process_Issue_Mas>();

                foreach (var Pim in MasEntry.ProcissMas)
                {
                    MasList.Add(new Process_Issue_Mas
                    {

                        ProcessIssueId = Pim.ProcessIssueId,
                        ProcessIssueNo = Pim.ProcessIssueNo,
                        ProcessIssueDate = Pim.ProcessIssueDate,
                        ProcessOrdId = Pim.ProcessOrdId,
                        Remarks = Pim.Remarks,
                        GatePassVehicle = "",//MasEntry.GatePassVehicle,
                        IssueStoreid = null,// MasEntry.IssueStoreid,
                        CreatedBy = Pim.CreatedBy,
                        EWayNo = Pim.EWayNo,
                        EWayDate = Pim.EWayDate
                    });
                }

                var ItmissList = new List<Process_Issue_Det>();

                foreach (var PItem in MasEntry.ProcissDet)
                {
                    ItmissList.Add(new Process_Issue_Det
                    {
                        ProcessIssueDetId = PItem.ProcessIssueDetId,
                        ProcessIssueId = PItem.ProcessIssueId,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        IssueQty = PItem.IssueQty,
                        SecQty = PItem.SecQty,
                        OutputUom = null,//PItem.OutputUom,
                        OutputValue = 0,// PItem.OutputValue,
                        IPMarkup_Rate = 0,// PItem.IPMarkup_Rate,
                        ip_op = PItem.ip_op,
                        PlannedSizeID = PItem.PlannedSizeID,
                        OpItemId = PItem.opitemid,
                        OpColorId = PItem.opcolorid,
                        OpSizeId = PItem.opsizeid,
                    });

                }

                var ItmjobList = new List<Process_Issue_Jobdet>();

                foreach (var jdet in MasEntry.ProcissJobDet)
                {
                    ItmjobList.Add(new Process_Issue_Jobdet
                    {
                        ProcessIssueId = jdet.ProcessIssueId,
                        ProcessIssueJobId = jdet.ProcessIssueJobId,
                        ProcessIssueDetId = jdet.ProcessIssueDetId,
                        LastProcessid = jdet.LastProcessid,
                        Job_ord_no = jdet.Job_ord_no,
                        ProdPrgNo = jdet.ProdPrgNo,
                        IssueQty = jdet.IssueQty,
                        ReturnQty = 0,// jdet.ReturnQty,
                        LossQty = 0,// jdet.LossQty,
                        SecQty = jdet.SecQty,
                        itemid = jdet.itemid,
                        colorid = jdet.colorid,
                        sizeid = jdet.sizeid,
                        ip_op = jdet.ip_op,
                        PlannedSizeID = jdet.PlannedSizeID,
                        OpItemId = jdet.opitemid,
                        OpColorId = jdet.opcolorid,
                        OpSizeId = jdet.opsizeid,


                    });

                }

                var StkList = new List<Process_Issue_Stock>();

                if (MasEntry.Procissstk != null)
                {
                    foreach (var stkdet in MasEntry.Procissstk)
                    {

                        StkList.Add(new Process_Issue_Stock
                        {
                            ProcessIssueId = stkdet.ProcessIssueId,
                            ProcessIssueJobid = stkdet.ProcessIssueJobid,
                            ProcessIssStockId = stkdet.ProcessIssStockId,
                            ProcessIssueNo = stkdet.ProcessIssueNo,
                            IssueQty = stkdet.IssueQty,
                            LossQty = 0,//stkdet.LossQty,
                            LotNo = "",//stkdet.LotNo,
                            Returnable_Qty = 0,// stkdet.Returnable_Qty,
                            ReturnQty = 0,//stkdet.ReturnQty,
                            ItemStockId = stkdet.ItemStockId,
                            Itemid = stkdet.Itemid,
                            Colorid = stkdet.Colorid,
                            Sizeid = stkdet.Sizeid,
                            Markup_Rate = 0,// stkdet.Markup_Rate,
                            Job_ord_no = stkdet.Job_ord_no,
                            OpItemId = stkdet.opitemid,
                            OpColorId = stkdet.opcolorid,
                            OpSizeId = stkdet.opsizeid,
                            ProdPrgNo = stkdet.ProdPrgNo
                        });

                    }
                }

                var JList = new List<Domain.ProcessIssueJobdet>();
                foreach (var jdet in MasEntry.ProcissJobDet)
                {
                    JList.Add(new ProcessIssueJobdet
                    {

                        processordjobdetid = jdet.processordjobdetid,
                        IssueQty = jdet.IssueQty,
                        itemid = jdet.itemid,
                        colorid = jdet.colorid,
                        sizeid = jdet.sizeid,
                        ProdPrgNo = jdet.ProdPrgNo,
                        ip_op = jdet.ip_op,
                        PlannedSizeID = jdet.PlannedSizeID,
                        opitemid = jdet.opitemid,
                        opcolorid = jdet.opcolorid,
                        opsizeid = jdet.opsizeid,
                    });
                }

                var result = repo.AddIss(ProcIns, ItmList, ItmstkList, AddlessList, JList, MasList, ItmissList, ItmjobList, StkList, "Add");
                //var result = repo.AddDetData(ItmList, ItmstkList, AddlessList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<bool> UpdateIss(ProcessOrdMas objupd)
        {
            string IRem = "";
            try
            {
                int? StrUnit = 0;

                if (objupd.StoreUnitId == 0)
                {
                    StrUnit = null;
                }
                else
                {
                    StrUnit = objupd.StoreUnitId;
                }
                //Process Ord Add
                //var ID = repo.UpdateData(new AxonApparel.Repository.Process_Ord_Mas
                AxonApparel.Repository.Process_Ord_Mas ProcUpd = new AxonApparel.Repository.Process_Ord_Mas

                {
                    processordid = objupd.processordid,
                    processorder = objupd.processorder,
                    processordate = objupd.processordate,
                    processorid = objupd.processorid,
                    processid = objupd.processid,
                    remarks = objupd.remarks,
                    companyunitid = objupd.companyunitid,
                    companyid = objupd.companyid,
                    ProcessorType = objupd.ProcessorType,
                    OrderType = objupd.OrderType,
                    Closed = objupd.Closed,
                    OrderCumIssue = objupd.OrderCumIssue,
                    DelidateTime = objupd.DelidateTime,
                    ComboIds = "",//MasEntry.ComboIds,
                    DispLocType = objupd.DispLocType,
                    DispLoc = objupd.DispLoc,
                    IssueLocType = objupd.IssueLocType,
                    IssueLoc = objupd.IssueLoc,
                    Teamid = objupd.Teamid,
                    StoreUnitId = StrUnit,
                    CreatedBy = objupd.CreatedBy,
                    Phoneno = objupd.Phoneno,
                    contactperson = objupd.contactperson,
                    amount = objupd.amount,
                    taxamount = objupd.taxamount,
                    saccode = objupd.saccode,
                    IGST = objupd.IGST,
                    SGST = objupd.SGST,
                    TotCGST = objupd.TotCGST,
                    TotIGST = objupd.TotIGST,
                    TotSGST = objupd.TotSGST,
                    CGST = objupd.CGST,
                    ModuleType = objupd.moduletype,
                    YarnLoc = objupd.YarnLoc,
                    KnitLoc = objupd.KnitLoc,
                    SubProcess = objupd.subtype,
                    FinalProcess = objupd.fintype,
                    Vehicleno = objupd.Vehicleno       
                };

                var ItmList = new List<Process_Ord_Det>();

                foreach (var PItem in objupd.ProdDet)
                {


                    if (PItem.ItemRemarks == "")
                    {
                        IRem = "";
                    }
                    else
                    {
                        IRem = PItem.ItemRemarks;
                    }
                    int? FDID = 0;

                    if (PItem.FinDiaid == 0)
                    {
                        FDID = null;
                    }
                    else
                    {
                        FDID = PItem.FinDiaid;
                    }
                    ItmList.Add(new Process_Ord_Det
                    {
                        processordid = PItem.processordid,
                        processorddetid = PItem.processorddetid,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        inp_op = PItem.inp_op,
                        order_output_qty = PItem.order_output_qty,
                        issued_qty = PItem.issued_qty,
                        rate = PItem.rate,
                        received_qty = PItem.received_qty,
                        Return_Qty = PItem.Return_Qty,
                        Returnable_Qty = PItem.Returnable_Qty,
                        Damage_qty = PItem.Damage_qty,
                        Cancel_Qty = PItem.Cancel_Qty,
                        Inp_CancelQty = PItem.Inp_CancelQty,
                        Markup_Rate = PItem.Markup_Rate,
                        Markup_Value = PItem.Markup_Value,
                        PlannedSizeID = PItem.PlannedSizeID,
                        OrdSecQty = PItem.OrdSecQty,
                        ItemRemarks = "",//PItem.ItemRemarks,
                        Loss_Qty = PItem.Loss_Qty,
                        IN_OUT_UOMID = PItem.IN_OUT_UOMID,
                        IssueSizeID = PItem.IssueSizeID,
                        ReqDate = PItem.ReqDate,
                        Loop_Len = PItem.Loop_Len,
                        Gauge = PItem.Gauge,
                        TaxAppVal = PItem.TaxAppVal,
                        FinDiaid = FDID,
                        FinGsm = PItem.FinGsm,
                        OpItemId = PItem.opitemid,
                        OpColorId = PItem.opcolorid,
                        OpSizeId = PItem.opsizeid,

                    });

                }

                var ItmstkList = new List<Process_Ord_JobDet>();

                foreach (var stk in objupd.ProdJobDet)
                {
                    ItmstkList.Add(new Process_Ord_JobDet
                    {
                        ProcessOrdid = stk.ProcessnOrdid,
                        ProcessOrddetid = stk.ProcessOrddetid,
                        ProcessJobDetid = stk.ProcessJobDetid,
                        ProgQty = stk.ProgQty,
                        OrderQty = stk.OrderQty,
                        issued_qty = stk.issued_qty,
                        received_qty = stk.received_qty,
                        Return_Qty = stk.Return_Qty,
                        Damage_qty = stk.Damage_qty,
                        Cancel_Qty = stk.Cancel_Qty,
                        Job_ord_no = stk.Job_ord_no,
                        ProdPrgNo = stk.ProdPrgNo,
                        Returnable_Qty = stk.Returnable_Qty,
                        Closed = stk.Closed,
                        Inp_CancelQty = stk.Inp_CancelQty,
                        OrdSecQty = stk.OrdSecQty,
                        Loss_Qty = stk.Loss_Qty,
                        buy_ord_ship = stk.buy_ord_ship,
                        Itemid = stk.itemid,
                        Colorid = stk.colorid,
                        Sizeid = stk.sizeid,
                        ip_op = stk.ipop,
                        PlannedSizeID = stk.PlannedSizeID,
                        OpItemId = stk.opitemid,
                        OpColorId = stk.opcolorid,
                        OpSizeId = stk.opsizeid,
                        rate = stk.rate,
                    });

                }


                var AddlessList = new List<Process_Ord_AddLess>();

                if (objupd.ProdAddLess != null)
                {
                    foreach (var addless in objupd.ProdAddLess)
                    {

                        AddlessList.Add(new Process_Ord_AddLess
                        {
                            Process_Ord_id = addless.Process_Ord_id,
                            Process_Ord_Discountid = addless.Process_Ord_Discountid,
                            Addlessid = addless.Addlessid,
                            Amount = addless.Amount,
                            PlusOrMinus = addless.PlusOrMinus,
                            Percentage = addless.Percentage

                        });

                    }
                }

                //Process Issue Add


                var MasList = new List<Process_Issue_Mas>();

                foreach (var Pim in objupd.ProcissMas)
                {
                    MasList.Add(new Process_Issue_Mas
                    {

                        ProcessIssueId = Pim.ProcessIssueId,
                        ProcessIssueNo = Pim.ProcessIssueNo,
                        ProcessIssueDate = Pim.ProcessIssueDate,
                        ProcessOrdId = Pim.ProcessOrdId,
                        Remarks = Pim.Remarks,
                        GatePassVehicle = "",//MasEntry.GatePassVehicle,
                        IssueStoreid = null,// MasEntry.IssueStoreid,
                        CreatedBy = Pim.CreatedBy,
                        EWayNo = Pim.EWayNo,
                        EWayDate = Pim.EWayDate
                    });
                }

                var ItmissList = new List<Process_Issue_Det>();

                foreach (var PItem in objupd.ProcissDet)
                {
                    ItmissList.Add(new Process_Issue_Det
                    {
                        ProcessIssueDetId = PItem.ProcessIssueDetId,
                        ProcessIssueId = PItem.ProcessIssueId,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        IssueQty = PItem.IssueQty,
                        SecQty = PItem.SecQty,
                        OutputUom = null,//PItem.OutputUom,
                        OutputValue = 0,// PItem.OutputValue,
                        IPMarkup_Rate = 0,// PItem.IPMarkup_Rate,
                        ip_op = PItem.ip_op,
                        PlannedSizeID = PItem.PlannedSizeID,
                        OpItemId = PItem.opitemid,
                        OpColorId = PItem.opcolorid,
                        OpSizeId = PItem.opsizeid

                    });

                }

                var ItmjobList = new List<Process_Issue_Jobdet>();

                foreach (var jdet in objupd.ProcissJobDet)
                {
                    ItmjobList.Add(new Process_Issue_Jobdet
                    {
                        ProcessIssueId = jdet.ProcessIssueId,
                        ProcessIssueJobId = jdet.ProcessIssueJobId,
                        ProcessIssueDetId = jdet.ProcessIssueDetId,
                        LastProcessid = jdet.LastProcessid,
                        Job_ord_no = jdet.Job_ord_no,
                        ProdPrgNo = jdet.ProdPrgNo,
                        IssueQty = jdet.IssueQty,
                        ReturnQty = 0,// jdet.ReturnQty,
                        LossQty = 0,// jdet.LossQty,
                        SecQty = jdet.SecQty,
                        itemid = jdet.itemid,
                        colorid = jdet.colorid,
                        sizeid = jdet.sizeid,
                        ip_op = jdet.ip_op,
                        PlannedSizeID = jdet.PlannedSizeID,
                        OpItemId = jdet.opitemid,
                        OpColorId = jdet.opcolorid,
                        OpSizeId = jdet.opsizeid

                    });

                }

                var StkList = new List<Process_Issue_Stock>();

                if (objupd.Procissstk != null)
                {
                    foreach (var stkdet in objupd.Procissstk)
                    {

                        StkList.Add(new Process_Issue_Stock
                        {
                            ProcessIssueId = stkdet.ProcessIssueId,
                            ProcessIssueJobid = stkdet.ProcessIssueJobid,
                            ProcessIssStockId = stkdet.ProcessIssStockId,
                            ProcessIssueNo = stkdet.ProcessIssueNo,
                            IssueQty = stkdet.IssueQty,
                            LossQty = 0,//stkdet.LossQty,
                            LotNo = "",//stkdet.LotNo,
                            Returnable_Qty = 0,// stkdet.Returnable_Qty,
                            ReturnQty = 0,//stkdet.ReturnQty,
                            ItemStockId = stkdet.ItemStockId,
                            Itemid = stkdet.Itemid,
                            Colorid = stkdet.Colorid,
                            Sizeid = stkdet.Sizeid,
                            Markup_Rate = 0,// stkdet.Markup_Rate,
                            Job_ord_no = stkdet.Job_ord_no,
                            OpItemId = stkdet.opitemid,
                            OpColorId = stkdet.opcolorid,
                            OpSizeId = stkdet.opsizeid,
                            ProdPrgNo = stkdet.ProdPrgNo
                        });

                    }
                }

                var JList = new List<Domain.ProcessIssueJobdet>();
                foreach (var jdet in objupd.ProcissJobDet)
                {
                    JList.Add(new ProcessIssueJobdet
                    {


                        processordjobdetid = jdet.processordjobdetid,
                        processorddetid = jdet.processorddetid,
                        ProcessIssueDetId = jdet.ProcessIssueDetId,
                        ProcessIssueJobId = jdet.ProcessIssueJobId,
                        IssueQty = jdet.IssueQty,
                        itemid = jdet.itemid,
                        colorid = jdet.colorid,
                        sizeid = jdet.sizeid,
                        ProdPrgNo = jdet.ProdPrgNo,
                        PlannedSizeID = jdet.PlannedSizeID,
                        ip_op = jdet.ip_op,
                        opitemid = jdet.opitemid,
                        opcolorid = jdet.opcolorid,
                        opsizeid = jdet.opsizeid

                    });
                }

                var result = repo.UpdIss(ProcUpd, ItmList, ItmstkList, AddlessList, JList, MasList, ItmissList, ItmjobList, StkList, "Update");
                //var result = repo.AddDetData(ItmList, ItmstkList, AddlessList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<ProcessIssueMas>> LoadIssueNo(int ordid)
        {
            try
            {
                var ProductWO = repo.LoadIssueNo(ordid);

                return new Response<IQueryable<Domain.ProcessIssueMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteDelEntry(ProcessOrdMas DelDEntry)
        {
            var ItmList = new List<Process_Ord_Det>();

            foreach (var PItem in DelDEntry.ProdDet)
            {
                string IRem = "";
                if (PItem.ItemRemarks == "")
                {
                    IRem = "";
                }
                else
                {
                    IRem = PItem.ItemRemarks;
                }

                int? FDID = 0;

                if (PItem.FinDiaid == 0)
                {
                    FDID = null;
                }
                else
                {
                    FDID = PItem.FinDiaid;
                }

                ItmList.Add(new Process_Ord_Det
                {
                    processordid = PItem.processordid,
                    processorddetid = PItem.processorddetid,
                    itemid = PItem.itemid,
                    colorid = PItem.colorid,
                    sizeid = PItem.sizeid,
                    inp_op = PItem.inp_op,
                    order_output_qty = PItem.order_output_qty,
                    issued_qty = PItem.issued_qty,
                    rate = PItem.rate,
                    received_qty = PItem.received_qty,
                    Return_Qty = PItem.Return_Qty,
                    Returnable_Qty = PItem.Returnable_Qty,
                    Damage_qty = PItem.Damage_qty,
                    Cancel_Qty = PItem.Cancel_Qty,
                    Inp_CancelQty = PItem.Inp_CancelQty,
                    Markup_Rate = PItem.Markup_Rate,
                    Markup_Value = PItem.Markup_Value,
                    PlannedSizeID = PItem.PlannedSizeID,
                    OrdSecQty = PItem.OrdSecQty,
                    ItemRemarks = PItem.ItemRemarks,
                    Loss_Qty = PItem.Loss_Qty,
                    IN_OUT_UOMID = PItem.IN_OUT_UOMID,
                    IssueSizeID = PItem.IssueSizeID,
                    ReqDate = PItem.ReqDate,
                    Loop_Len = PItem.Loop_Len,
                    Gauge = PItem.Gauge,
                    OpItemId = PItem.opitemid,
                    OpColorId = PItem.opcolorid,
                    OpSizeId = PItem.opsizeid

                });

            }

            var ItmstkList = new List<Process_Ord_JobDet>();

            foreach (var stk in DelDEntry.ProdJobDet)
            {
                ItmstkList.Add(new Process_Ord_JobDet
                {
                    ProcessOrdid = stk.ProcessnOrdid,
                    ProcessOrddetid = stk.ProcessOrddetid,
                    ProcessJobDetid = stk.ProcessJobDetid,
                    ProgQty = stk.ProgQty,
                    OrderQty = stk.OrderQty,
                    issued_qty = stk.issued_qty,
                    received_qty = stk.received_qty,
                    Return_Qty = stk.Return_Qty,
                    Damage_qty = stk.Damage_qty,
                    Cancel_Qty = stk.Cancel_Qty,
                    Job_ord_no = stk.Job_ord_no,
                    ProdPrgNo = stk.ProdPrgNo,
                    Returnable_Qty = stk.Returnable_Qty,
                    Closed = stk.Closed,
                    Inp_CancelQty = stk.Inp_CancelQty,
                    OrdSecQty = stk.OrdSecQty,
                    Loss_Qty = stk.Loss_Qty,
                    buy_ord_ship = stk.buy_ord_ship,
                    Itemid = stk.itemid,
                    Colorid = stk.colorid,
                    Sizeid = stk.sizeid,
                    ip_op = stk.ipop,
                    PlannedSizeID = stk.PlannedSizeID,
                    OpItemId = stk.opitemid,
                    OpColorId = stk.opcolorid,
                    OpSizeId = stk.opsizeid

                });

            }




            var AddlessList = new List<Process_Ord_AddLess>();

            if (DelDEntry.ProdAddLess != null)
            {
                foreach (var addless in DelDEntry.ProdAddLess)
                {

                    AddlessList.Add(new Process_Ord_AddLess
                    {
                        Process_Ord_id = addless.Process_Ord_id,
                        Process_Ord_Discountid = addless.Process_Ord_Discountid,
                        Addlessid = addless.Addlessid,
                        Amount = addless.Amount,
                        PlusOrMinus = addless.PlusOrMinus,
                        Percentage = addless.Percentage

                    });

                }
            }

            var result = repo.DeleteDetData(ItmList, ItmstkList, AddlessList, "");

            return new Response<bool>(result, Status.SUCCESS, "Deleted Successfully");


        }

        public Response<bool> CreateIssUnitEntry(ProcessIssueMas MasEntry)
        {
            throw new NotImplementedException();
        }


        public Response<IQueryable<ProcessOrdAddLess>> LoadEditAddlessgrid(int prodid)
        {
            try
            {
                var ProductWO = repo.LoadEditAddlessgrid(prodid);

                return new Response<IQueryable<Domain.ProcessOrdAddLess>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrdAddLess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessOrderDetInfo>> LoadOrderMaindetails(int prodid)
        {
            try
            {
                var ProductWO = repo.LoadOrderMaindetails(prodid);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessOrderDetInfo>> LoadOrderMaindetailsforProd(int prodid,string type)
        {
            try
            {
                var ProductWO = repo.LoadOrderMaindetailsforProd(prodid, type);

                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderDetInfo>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProcessOrdDet>> GetProEntryCheckEditItemDetails(string TransNo)
        {
            try
            {
                var ProductEWO = repo.GetDataProcessRepEditCheckItemDetails(TransNo);

                return new Response<IList<ProcessOrdDet>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProcessOrdDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessOrderAddScreen>> GetDataOrderRefDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = repo.GetDataOrdeRefRepDetails(Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProcessOrderAddScreen>> GetDataStyleDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            try
            {
                var ProductWO = repo.GetDataStyleRepDetails(Purchase_Type, Purchase_ItemType, FrmDate, ToDate);

                return new Response<IQueryable<ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> AppUpdateData(ProcessOrdMas objaupd)
        {

            try
            {

                AxonApparel.Repository.Process_Ord_Mas ProcAppIns = new AxonApparel.Repository.Process_Ord_Mas

                {
                    processordid = objaupd.processordid,
                    Approved = "A",
                    ApprovedBy = objaupd.CreatedBy,
                    ApproveddateTime = DateTime.UtcNow.Date,

                };




                var result = repo.AppUpdateDetData(ProcAppIns, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<bool> RevUpdateData(ProcessOrdMas objrupd)
        {
            try
            {

                AxonApparel.Repository.Process_Ord_Mas ProcRevIns = new AxonApparel.Repository.Process_Ord_Mas

                {
                    processordid = objrupd.processordid,
                    Approved = "P",
                    ApprovedBy = objrupd.CreatedBy,
                    ApproveddateTime = DateTime.UtcNow.Date,

                };




                var result = repo.RevUpdateDetData(ProcRevIns, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<bool> RevClosureData(ProcessOrdMas objrupd)
        {
            try
            {

                AxonApparel.Repository.Process_Ord_Mas ProcAppIns = new AxonApparel.Repository.Process_Ord_Mas

                {
                    processordid = objrupd.processordid,
                    Closed = objrupd.Closed,

                };
                var result = repo.AppClosureDetData(ProcAppIns, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }
    }
}
