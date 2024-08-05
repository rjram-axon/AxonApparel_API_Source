using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class ProcessIssueBusiness : IProcessIssueBusiness
    {
        IProcessIssueRepository repo = new ProcessIssueRepository();


        public Common.Response<IQueryable<Domain.ProcessIssueAddgrid>> Getprocess()
        {
            try
            {
                var ProductWO = repo.Getprocess();

                return new Response<IQueryable<Domain.ProcessIssueAddgrid>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueAddgrid>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessIssueAddgrid>> Getsupp()
        {
            try
            {
                var ProductWO = repo.Getsupp();

                return new Response<IQueryable<Domain.ProcessIssueAddgrid>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueAddgrid>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessIssueAddgrid>> Loadgrid(int cmpunitid, int procid, string ordertype, string processortype, int buyerid, string refno, string ordno, int procserid)
        {
            try
            {
                var ProductWO = repo.Loadgrid(cmpunitid, procid, ordertype, processortype, buyerid, refno, ordno, procserid);

                return new Response<IQueryable<Domain.ProcessIssueAddgrid>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueAddgrid>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.ProcessIssueDet>> Loaditmsgrid(int procid)
        {
            try
            {
                var ProductWO = repo.Loaditmsgrid(procid);

                return new Response<IQueryable<Domain.ProcessIssueDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.ProcessIssueJobdet>> LoadJobdetgrid(int procid)
        {
            try
            {
                var ProductWO = repo.LoadJobdetgrid(procid);

                return new Response<IQueryable<Domain.ProcessIssueJobdet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueJobdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.ProcessIssueStock>> LoadStkdet(string jmasid, int cmpid)
        {
            try
            {
                var ProductWO = repo.LoadStkdet(jmasid, cmpid);

                return new Response<IQueryable<Domain.ProcessIssueStock>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueStock>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateIssUnitEntry(Domain.ProcessIssueMas MasEntry)
        {
            var stid = 0;

            try
            {
                if (MasEntry.IssueStoreid == null)
                {
                    stid = 0;
                }
                else
                {
                    stid = MasEntry.IssueStoreid;
                }
                 AxonApparel.Repository.Process_Issue_Mas ProcInsrt = new AxonApparel.Repository.Process_Issue_Mas

                //var ID = repo.AddIssData(new AxonApparel.Repository.Process_Issue_Mas
                {

                    ProcessIssueId = MasEntry.ProcessIssueId,
                    ProcessIssueNo = MasEntry.ProcessIssueNo,
                    ProcessIssueDate = MasEntry.ProcessIssueDate,
                    ProcessOrdId = MasEntry.ProcessOrdId,
                    Remarks = MasEntry.Remarks,
                    GatePassVehicle = "",//MasEntry.GatePassVehicle,
                    IssueStoreid = null,// MasEntry.IssueStoreid,
                    CreatedBy = MasEntry.CreatedBy,
                    EWayNo = MasEntry.EWayNo,
                    EWayDate = MasEntry.EWayDate
                };

                var ItmList = new List<Process_Issue_Det>();

                foreach (var PItem in MasEntry.ProcissDet)
                {
                    ItmList.Add(new Process_Issue_Det
                    {
                        ProcessIssueDetId = PItem.ProcessIssueDetId,
                        ProcessIssueId = PItem.ProcessIssueId,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        IssueQty = PItem.IssueQty,
                        SecQty = 1,// PItem.SecQty,
                        OutputUom = PItem.OutputUom,
                        OutputValue = 0,// PItem.OutputValue,
                        IPMarkup_Rate = 0,// PItem.IPMarkup_Rate,
                        ip_op = PItem.ip_op

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
                        SecQty = 1,// jdet.SecQty,
                        itemid = jdet.itemid,
                        colorid = jdet.colorid,
                        sizeid = jdet.sizeid,
                        ip_op = jdet.ip_op,


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
                        IssueQty=jdet.IssueQty,
                            itemid=jdet.itemid,
                        colorid=jdet.colorid,
                        sizeid=jdet.sizeid,
                        ProdPrgNo=jdet.ProdPrgNo


                    });
                }
                var result = repo.AddIssDetData(ProcInsrt,MasEntry.ProcessIssueDate, JList, MasEntry.ProcessOrdId, MasEntry.ProcessIssueNo, ItmList, ItmjobList, StkList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<ProcessIssueAddgrid>> LoadMaingrid(int? cmpid, string issueno, int processid, string ordno, int? masid, string procordno, int? unitid, string refno, string ordtype, string fromdate, string todate)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(cmpid, issueno, processid, ordno, masid, procordno, unitid, refno, ordtype, fromdate, todate);

                return new Response<IQueryable<Domain.ProcessIssueAddgrid>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueAddgrid>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateData(ProcessIssueMas objupd)
        {
            var stid = 0;

            try
            {
                if (objupd.IssueStoreid == null)
                {
                    stid = 0;
                }
                else
                {
                    stid = objupd.IssueStoreid;
                }
                AxonApparel.Repository.Process_Issue_Mas ProcIssUpd = new AxonApparel.Repository.Process_Issue_Mas

                //var ID = repo.UpdateData(new AxonApparel.Repository.Process_Issue_Mas
                {

                    ProcessIssueId = objupd.ProcessIssueId,
                    ProcessIssueNo = objupd.ProcessIssueNo,
                    ProcessIssueDate = objupd.ProcessIssueDate,
                    ProcessOrdId = objupd.ProcessOrdId,
                    Remarks = objupd.Remarks,
                    GatePassVehicle = "",//MasEntry.GatePassVehicle,
                    IssueStoreid = null,// MasEntry.IssueStoreid,
                    CreatedBy = objupd.CreatedBy,
                    EWayNo = objupd.EWayNo,
                    EWayDate = objupd.EWayDate
                };

                var ItmList = new List<Process_Issue_Det>();

                foreach (var PItem in objupd.ProcissDet)
                {
                    ItmList.Add(new Process_Issue_Det
                    {
                        ProcessIssueDetId = PItem.ProcessIssueDetId,
                        ProcessIssueId = PItem.ProcessIssueId,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        IssueQty = PItem.IssueQty,
                        SecQty = 1,// PItem.SecQty,
                        OutputUom = PItem.OutputUom,
                        OutputValue = 0,// PItem.OutputValue,
                        IPMarkup_Rate = 0,// PItem.IPMarkup_Rate,
                        ip_op = PItem.ip_op

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
                        SecQty = 1,// jdet.SecQty,
                        itemid = jdet.itemid,
                        colorid = jdet.colorid,
                        sizeid = jdet.sizeid,
                        ip_op = jdet.ip_op,


                    });

                }

                var StkList = new List<Process_Issue_Stock>();

                if (objupd.Procissstk != null)
                {
                    foreach (var stkdet in objupd.Procissstk)
                    {

                        StkList.Add(new Process_Issue_Stock
                        {
                            ProcessIssueId = stkdet.ProcessIssueId,//stkdet.ProcessIssueId,
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
                        ProdPrgNo = jdet.ProdPrgNo



                    });
                }
                var result = repo.UpdIssDetData(ProcIssUpd,objupd.ProcessIssueDate, JList, objupd.ProcessOrdId, objupd.ProcessIssueNo, ItmList, ItmjobList, StkList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }



        public Response<bool> DeleteDelEntry(ProcessIssueMas DelDEntry)
        {
            var stid = 0;

            try
            {
                if (DelDEntry.IssueStoreid == null)
                {
                    stid = 0;
                }
                else
                {
                    stid = DelDEntry.IssueStoreid;
                }
                var ID = repo.UpdateData(new AxonApparel.Repository.Process_Issue_Mas
                {

                    ProcessIssueId = DelDEntry.ProcessIssueId,
                    ProcessIssueNo = DelDEntry.ProcessIssueNo,
                    ProcessIssueDate = DelDEntry.ProcessIssueDate,
                    ProcessOrdId = DelDEntry.ProcessOrdId,
                    Remarks = DelDEntry.Remarks,
                    GatePassVehicle = "",//MasEntry.GatePassVehicle,
                    IssueStoreid = null,// MasEntry.IssueStoreid,
                    CreatedBy = DelDEntry.CreatedBy,
                    EWayNo = DelDEntry.EWayNo,
                    EWayDate = DelDEntry.EWayDate
                });

                var ItmList = new List<Process_Issue_Det>();

                foreach (var PItem in DelDEntry.ProcissDet)
                {
                    ItmList.Add(new Process_Issue_Det
                    {
                        ProcessIssueDetId = PItem.ProcessIssueDetId,
                        ProcessIssueId = PItem.ProcessIssueId,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        IssueQty = PItem.IssueQty,
                        SecQty = 1,// PItem.SecQty,
                        OutputUom = PItem.OutputUom,
                        OutputValue = 0,// PItem.OutputValue,
                        IPMarkup_Rate = 0,// PItem.IPMarkup_Rate,
                        ip_op = PItem.ip_op

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


                    });

                }

                var StkList = new List<Process_Issue_Stock>();

                if (DelDEntry.Procissstk != null)
                {
                    foreach (var stkdet in DelDEntry.Procissstk)
                    {

                        StkList.Add(new Process_Issue_Stock
                        {
                            ProcessIssueId = stkdet.ProcessIssueId,//stkdet.ProcessIssueId,
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
                        ProdPrgNo = jdet.ProdPrgNo



                    });
                }
             
                var result = repo.DeleteDetData(DelDEntry.ProcessIssueDate, JList, DelDEntry.ProcessOrdId, DelDEntry.ProcessIssueNo, ItmList, ItmjobList, StkList, "");


                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }

            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<ProcessIssueDet>> Loadedititmsgrid(int procid)
        {
            try
            {
                var ProductWO = repo.Loadedititmsgrid(procid);

                return new Response<IQueryable<Domain.ProcessIssueDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProcessIssueJobdet>> LoadeditJobdetgrid(int procid)
        {
            try
            {
                var ProductWO = repo.LoadeditJobdetgrid(procid);

                return new Response<IQueryable<Domain.ProcessIssueJobdet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueJobdet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProcessIssueStock>> LoadeditStkdet(string jmasid, int cmpid)
        {
            try
            {
                var ProductWO = repo.LoadeditStkdet(jmasid, cmpid);

                return new Response<IQueryable<Domain.ProcessIssueStock>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessIssueStock>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
