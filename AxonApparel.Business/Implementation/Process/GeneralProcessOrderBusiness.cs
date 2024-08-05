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
    public class GeneralProcessOrderBusiness : IGeneralProcessOrderBusiness
    {
        IGeneralProcessOrderRepository repo = new GeneralProcessOrderRepository();

        public Common.Response<IQueryable<Domain.GeneralProcOrdStk>> Getstkdet(int itmid, int clrid, int sizeid, int cmpid, int strunitid)
        {
            try
            {
                var ProductWO = repo.Getstkdet(itmid, clrid, sizeid, cmpid, strunitid);

                return new Response<IQueryable<Domain.GeneralProcOrdStk>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GeneralProcOrdStk>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateIss(Domain.ProcessOrdMas MasEntry)
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


                //Process Ord Add
                AxonApparel.Repository.Process_Ord_Mas ProcInsert = new AxonApparel.Repository.Process_Ord_Mas

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
                    StoreUnitId = StrUnit,//MasEntry.StoreUnitId,
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
                    Vehicleno=MasEntry.Vehicleno,
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


                    int? ISSID = 0;

                    if (PItem.IssueSizeID == 0)
                    {
                        ISSID = 0;
                    }
                    else
                    {
                        ISSID = PItem.IssueSizeID;
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
                        IssueSizeID = ISSID,//PItem.IssueSizeID,
                        ReqDate = PItem.ReqDate,
                        Loop_Len = PItem.Loop_Len,
                        Gauge = PItem.Gauge,
                        AllowPer = PItem.AllowPer,
                        QtywithoutAllow = PItem.QtywithoutAllow,

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
                        PlannedSizeID = stk.sizeid,


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
                        PlannedSizeID = PItem.sizeid,

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
                        Job_ord_no = "",//jdet.Job_ord_no,
                        ProdPrgNo = "",//jdet.ProdPrgNo,
                        IssueQty = jdet.IssueQty,
                        ReturnQty = 0,// jdet.ReturnQty,
                        LossQty = 0,// jdet.LossQty,
                        SecQty = jdet.SecQty,
                        itemid = jdet.itemid,
                        colorid = jdet.colorid,
                        sizeid = jdet.sizeid,
                        ip_op = jdet.ip_op,
                        PlannedSizeID = jdet.sizeid,

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
                        PlannedSizeID = jdet.sizeid,


                    });
                }

                var result = repo.AddIss(ProcInsert, ItmList, ItmstkList, AddlessList, JList, MasList, ItmissList, ItmjobList, StkList, "Add");
                //var result = repo.AddDetData(ItmList, ItmstkList, AddlessList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<ProcessOrderAddScreen>> LoadMaingrid(int? cmpid, string closed, string buyrsamp, string processortype, int? prodordid, string prodord, string type, int? processorid, int? unitid, int? processid, string fromdate, string todate)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(cmpid, closed, buyrsamp, processortype, prodordid, prodord, type, processorid, unitid, processid, fromdate, todate);

                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessOrderAddScreen>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProcessOrderDetInfo>> LoadEditOutputitmsgrid(int prodid)
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

        public Response<IQueryable<ProcessOrderDetInfo>> LoadEditInputitmsgrid(int prodid)
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


        public Response<IQueryable<GeneralProcOrdStk>> Getstkdetedit(int processordid)
        {
            try
            {
                var ProductWO = repo.Getstkdetedit(processordid);

                return new Response<IQueryable<Domain.GeneralProcOrdStk>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GeneralProcOrdStk>>(null, Status.ERROR, "OOPS error occured. Plase try again");
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
                AxonApparel.Repository.Process_Ord_Mas procUpd = new AxonApparel.Repository.Process_Ord_Mas

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
                        StoreUnitId = StrUnit,//objupd.StoreUnitId,
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
                        Vehicleno = objupd.Vehicleno,
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


                    int? ISSID = 0;

                    if (PItem.IssueSizeID == 0)
                    {
                        ISSID = null;
                    }
                    else
                    {
                        ISSID = PItem.IssueSizeID;
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
                        IssueSizeID = ISSID,//PItem.IssueSizeID,
                        ReqDate = PItem.ReqDate,
                        Loop_Len = PItem.Loop_Len,
                        Gauge = PItem.Gauge,
                        AllowPer = PItem.AllowPer,
                        QtywithoutAllow = PItem.QtywithoutAllow,

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
                        PlannedSizeID = stk.sizeid,

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
                        PlannedSizeID = PItem.sizeid,

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
                        Job_ord_no = "",//jdet.Job_ord_no,
                        ProdPrgNo = "",//jdet.ProdPrgNo,
                        IssueQty = jdet.IssueQty,
                        ReturnQty = 0,// jdet.ReturnQty,
                        LossQty = 0,// jdet.LossQty,
                        SecQty = jdet.SecQty,
                        itemid = jdet.itemid,
                        colorid = jdet.colorid,
                        sizeid = jdet.sizeid,
                        ip_op = jdet.ip_op,
                        PlannedSizeID = jdet.sizeid,

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


                        });

                    }
                }

                var JList = new List<Domain.ProcessIssueJobdet>();
                foreach (var jdet in objupd.ProcissJobDet)
                {
                    JList.Add(new ProcessIssueJobdet
                    {

                        processordjobdetid = jdet.processordjobdetid,
                        IssueQty = jdet.IssueQty,
                        itemid = jdet.itemid,
                        colorid = jdet.colorid,
                        sizeid = jdet.sizeid,
                        ProdPrgNo = jdet.ProdPrgNo,
                        PlannedSizeID = jdet.sizeid,


                    });
                }

                var result = repo.UpdIss(procUpd, ItmList, ItmstkList, AddlessList, JList, MasList, ItmissList, ItmjobList, StkList, "Update");
                //var result = repo.AddDetData(ItmList, ItmstkList, AddlessList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<bool> DeleteIssDelEntry(ProcessOrdMas DelDEntry)
        {
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
                     AllowPer = PItem.AllowPer,
                    QtywithoutAllow = PItem.QtywithoutAllow,
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
                    PlannedSizeID = stk.sizeid,

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
                    SecQty = 1,// PItem.SecQty,
                    OutputUom = null,//PItem.OutputUom,
                    OutputValue = 0,// PItem.OutputValue,
                    IPMarkup_Rate = 0,// PItem.IPMarkup_Rate,
                    ip_op = PItem.ip_op,
                    PlannedSizeID = PItem.sizeid,

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
                    SecQty = 1,// jdet.SecQty,
                    itemid = jdet.itemid,
                    colorid = jdet.colorid,
                    sizeid = jdet.sizeid,
                    ip_op = jdet.ip_op,
                    PlannedSizeID = jdet.sizeid,

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


                    });

                }
            }

            var JList = new List<Domain.ProcessIssueJobdet>();
            foreach (var jdet in DelDEntry.ProcissJobDet)
            {
                JList.Add(new ProcessIssueJobdet
                {

                    processordjobdetid = jdet.processordjobdetid,
                    IssueQty = jdet.IssueQty,
                    itemid = jdet.itemid,
                    colorid = jdet.colorid,
                    sizeid = jdet.sizeid,
                    ProdPrgNo = jdet.ProdPrgNo,
                    PlannedSizeID = jdet.sizeid,



                });
            }

            var result = repo.DeleteIssueDetData(ItmList, ItmstkList, AddlessList, JList, MasList, ItmissList, ItmjobList, StkList, "");
            //var result = repo.AddDetData(ItmList, ItmstkList, AddlessList, "Add");

            return new Response<bool>(result, Status.SUCCESS, "Deleted Successfully");
        }


        public Response<IQueryable<GeneralProcOrdStk>> LoadProcess()
        {
            try
            {
                var ProductWO = repo.LoadProcess();

                return new Response<IQueryable<Domain.GeneralProcOrdStk>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GeneralProcOrdStk>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
