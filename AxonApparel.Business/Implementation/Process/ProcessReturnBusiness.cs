using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class ProcessReturnBusiness : IProcessReturnBusiness
    {
        IProcessReturnRepository repo = new ProcessReturnRepository();

        public Common.Response<IQueryable<Domain.ProcessReturn>> Getprocess(int cmpid, int cmunitid)
        {
            try
            {
                var ProductWO = repo.Getprocess(cmpid, cmunitid);

                return new Response<IQueryable<Domain.ProcessReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IQueryable<Domain.ProcessReturn>> Getsupp()
        {
            try
            {
                var ProductWO = repo.Getsupp();

                return new Response<IQueryable<Domain.ProcessReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.ProcessReturn>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, int colorid, string ordtype, string ProcessorType, string OrderNo, string ReferNo, int StyleId, int BuyerId)
        {
            try
            {
                var ProductWO = repo.Loadaddgrid(cmpid, cmunitid, processid, processorid, colorid, ordtype, ProcessorType, OrderNo, ReferNo, StyleId, BuyerId);

                return new Response<IQueryable<Domain.ProcessReturn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessReturn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.ProcessReturnItemDet>> LoadItmdet(string prodord)
        {
            try
            {
                var ProductWO = repo.LoadItmdet(prodord);

                return new Response<IQueryable<Domain.ProcessReturnItemDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessReturnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateUnitEntry(Domain.ProcessReceiptMas MasEntry)
        {
            try
            {

                //var ItmList = new List<Repository.Process_Recpt_Return>();

                //foreach (var PItem in MasEntry.ProcRetItmDet)
                //{
                //    ItmList.Add(new Repository.Process_Recpt_Return
                //    {
                //        Process_Recpt_masid = PItem.Process_Recpt_masid,
                //        ProcessJobDetid = PItem.procjobdetid,
                //        LossQty = PItem.lossqty,
                //        Returnqty = PItem.retqty,
                //        Process_Recpt_Retid = PItem.Process_Recpt_Retid,
                //        Proc_Iss_Stockid = PItem.Proc_Iss_Stockid,
                //        ProcessOrdId = PItem.procordid,
                //        CreatedBy = PItem.CreatedBy
                //    });
                //}

                //var Itm = new List<Domain.ProcessReturnItemDet>();

                //foreach (var Item in MasEntry.ProcRetItmDet)
                //{
                //    Itm.Add(new Domain.ProcessReturnItemDet
                //    {

                //        procjobdetid = Item.procjobdetid,
                //        procorddetid = Item.procorddetid,
                //        procordid = Item.procordid,
                //        //productionord = Item.productionord,
                //        //prodprgno = Item.prodprgno,
                //        //jobordno = Item.jobordno,
                //        prodprgdetid = Item.prodprgdetid,
                //        retqty = Item.retqty,
                //        lossqty = Item.lossqty,
                //        itmid = Item.itmid,
                //        colorid = Item.colorid,
                //        sizeid = Item.sizeid,
                //        jobordno = Item.jobordno,
                //        lotno = Item.lotno,
                //        suppid = Item.suppid,
                //        styleid = Item.styleid,
                //        proissmasid = Item.proissmasid,
                //        proissdetid = Item.proissdetid,
                //        proissjobid = Item.proissjobid,
                //        proissstkid = Item.proissstkid

                //    });

                //}

                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Process_Recpt_Mas ProcInsert = new AxonApparel.Repository.Process_Recpt_Mas

                {
                    proc_recpt_masid = MasEntry.proc_recpt_masid,
                    proc_recpt_no = MasEntry.proc_recpt_no,
                    proc_recpt_date = MasEntry.proc_recpt_date,
                    Recpt_Ref_date = MasEntry.Recpt_Ref_date,
                    Recpt_Ref_no = MasEntry.Recpt_Ref_no,
                    remarks = MasEntry.remarks,
                    OrderType = MasEntry.OrderType,
                    StoreUnitID = MasEntry.StoreUnitID,
                    CreatedBy = MasEntry.CreatedBy,
                    InwardNo = MasEntry.InwardNo,
                    SupplierInvoiceNo = MasEntry.SupplierInvoiceNo,
                    ExcldetoInv = MasEntry.ExcldetoInv,
                    InspDate = MasEntry.InspDate,
                    InspNo = MasEntry.InspNo,
                    EWayDate = MasEntry.EWayDate,
                    EWayNo = MasEntry.EWayNo,


                    //Process_Recpt_Return = ItmList

                };

                var ItmList = new List<Process_Recpt_Return>();

                foreach (var PItem in MasEntry.ProcRetItmDet)
                {
                    ItmList.Add(new Process_Recpt_Return
                    {

                        Process_Recpt_masid = PItem.Process_Recpt_masid,
                        ProcessJobDetid = PItem.procjobdetid,
                        LossQty = PItem.lossqty,
                        Returnqty = PItem.retqty,
                        Process_Recpt_Retid = PItem.Process_Recpt_Retid,
                        Proc_Iss_Stockid = PItem.Proc_Iss_Stockid,
                        ProcessOrdId = PItem.procordid,
                        CreatedBy = PItem.CreatedBy
                    });
                }

                var Itm = new List<Domain.ProcessReturnItemDet>();
                foreach (var Item in MasEntry.ProcRetItmDet)
                {
                    Itm.Add(new Domain.ProcessReturnItemDet
                    {
                        procjobdetid = Item.procjobdetid,
                        procorddetid = Item.procorddetid,
                        procordid = Item.procordid,
                        //productionord = Item.productionord,
                        //prodprgno = Item.prodprgno,
                        //jobordno = Item.jobordno,
                        prodprgdetid = Item.prodprgdetid,
                        retqty = Item.retqty,
                        lossqty = Item.lossqty,
                        itmid = Item.itmid,
                        colorid = Item.colorid,
                        sizeid = Item.sizeid,
                        uomid = Item.uomid,
                        jobordno = Item.jobordno,
                        lotno = Item.lotno,
                        suppid = Item.suppid,
                        styleid = Item.styleid,
                        proissmasid = Item.proissmasid,
                        proissdetid = Item.proissdetid,
                        proissjobid = Item.proissjobid,
                        proissstkid = Item.proissstkid,
                        Maruprate = Item.Maruprate,
                        plansizeid=Item.plansizeid,

                    });
                }

                var result = repo.AddDetData(ProcInsert, MasEntry.proc_recpt_no, MasEntry.processid, MasEntry.proc_recpt_date, MasEntry.companyid, MasEntry.remarks, MasEntry.StoreUnitID, MasEntry.CreatedBy, Itm, ItmList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<Domain.ProcessReceiptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate, int? Processorid, int Userid)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(cmpid, processid, unitid, buyerid, masid, prodordid, processortype, type, dcno, recptno, fromdate, todate, Processorid, Userid);

                return new Response<IQueryable<Domain.ProcessReceiptMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessReceiptMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.ProcessReturnItemDet>> LoadEditItmdet(int masid, string prodord)
        {
            try
            {
                var ProductWO = repo.LoadEditItmdet(masid, prodord);

                return new Response<IQueryable<Domain.ProcessReturnItemDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessReturnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateData(Domain.ProcessReceiptMas objupd)
        {
            try
            {
                AxonApparel.Repository.Process_Recpt_Mas ProcUpd = new AxonApparel.Repository.Process_Recpt_Mas

             //var ID = repo.UpdateData(new AxonApparel.Repository.Process_Recpt_Mas
             {
                 proc_recpt_masid = objupd.proc_recpt_masid,
                 proc_recpt_no = objupd.proc_recpt_no,
                 proc_recpt_date = objupd.proc_recpt_date,
                 Recpt_Ref_date = objupd.Recpt_Ref_date,
                 Recpt_Ref_no = objupd.Recpt_Ref_no,
                 remarks = objupd.remarks,
                 OrderType = objupd.OrderType,
                 StoreUnitID = objupd.StoreUnitID,
                 CreatedBy = objupd.CreatedBy,
                 InwardNo = objupd.InwardNo,
                 SupplierInvoiceNo = objupd.SupplierInvoiceNo,
                 ExcldetoInv = objupd.ExcldetoInv,
                 InspDate = objupd.InspDate,
                 InspNo = objupd.InspNo,
                 EWayDate = objupd.EWayDate,
                 EWayNo = objupd.EWayNo

             };

                var ItmList = new List<Process_Recpt_Return>();

                foreach (var PItem in objupd.ProcRetItmDet)
                {
                    ItmList.Add(new Process_Recpt_Return
                    {

                        Process_Recpt_masid = PItem.Process_Recpt_masid,
                        ProcessJobDetid = PItem.procjobdetid,
                        LossQty = PItem.lossqty,
                        Returnqty = PItem.retqty,
                        Process_Recpt_Retid = PItem.Process_Recpt_Retid,
                        Proc_Iss_Stockid = PItem.Proc_Iss_Stockid,
                        ProcessOrdId = PItem.procordid,
                        CreatedBy = PItem.CreatedBy



                    });

                }



                var Itm = new List<Domain.ProcessReturnItemDet>();

                foreach (var Item in objupd.ProcRetItmDet)
                {
                    Itm.Add(new Domain.ProcessReturnItemDet
                    {

                        procjobdetid = Item.procjobdetid,
                        procorddetid = Item.procorddetid,
                        procordid = Item.procordid,
                        //productionord = Item.productionord,
                        //prodprgno = Item.prodprgno,
                        //jobordno = Item.jobordno,
                        prodprgdetid = Item.prodprgdetid,
                        retqty = Item.retqty,
                        lossqty = Item.lossqty,
                        itmid = Item.itmid,
                        colorid = Item.colorid,
                        sizeid = Item.sizeid,
                        plansizeid=Item.plansizeid,
                        jobordno = Item.jobordno,
                        lotno = Item.lotno,
                        suppid = Item.suppid,
                        styleid = Item.styleid,
                        proissmasid = Item.proissmasid,
                        proissdetid = Item.proissdetid,
                        proissjobid = Item.proissjobid,
                        proissstkid = Item.proissstkid,
                        uomid = Item.uomid,
                        Maruprate=Item.Maruprate,



                    });

                }

                var result = repo.UpdDetData(ProcUpd, objupd.proc_recpt_no, objupd.processid, objupd.proc_recpt_date, objupd.companyid, objupd.remarks, objupd.StoreUnitID, objupd.CreatedBy, Itm, ItmList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<bool> DeleteDelEntry(Domain.ProcessReceiptMas DelDEntry)
        {
            var List = new List<Process_Recpt_Mas>();

            //foreach (var PItem in DelDEntry.ProdDet)
            //{
            List.Add(new Process_Recpt_Mas
            {

                proc_recpt_masid = DelDEntry.proc_recpt_masid,
                proc_recpt_no = DelDEntry.proc_recpt_no,
                proc_recpt_date = DelDEntry.proc_recpt_date,
                Recpt_Ref_date = DelDEntry.Recpt_Ref_date,
                Recpt_Ref_no = DelDEntry.Recpt_Ref_no,
                remarks = DelDEntry.remarks,
                OrderType = DelDEntry.OrderType,
                StoreUnitID = DelDEntry.StoreUnitID,
                CreatedBy = DelDEntry.CreatedBy,




            });
            var ItmList = new List<Process_Recpt_Return>();

            foreach (var PItem in DelDEntry.ProcRetItmDet)
            {
                ItmList.Add(new Process_Recpt_Return
                {

                    Process_Recpt_masid = PItem.Process_Recpt_masid,
                    ProcessJobDetid = PItem.procjobdetid,
                    LossQty = PItem.lossqty,
                    Returnqty = PItem.retqty,
                    Process_Recpt_Retid = PItem.Process_Recpt_Retid,
                    Proc_Iss_Stockid = PItem.Proc_Iss_Stockid,
                    ProcessOrdId = PItem.procordid,
                    CreatedBy = PItem.CreatedBy



                });

            }



            var Itm = new List<Domain.ProcessReturnItemDet>();

            foreach (var Item in DelDEntry.ProcRetItmDet)
            {
                Itm.Add(new Domain.ProcessReturnItemDet
                {

                    procjobdetid = Item.procjobdetid,
                    procorddetid = Item.procorddetid,
                    procordid = Item.procordid,
                    //productionord = Item.productionord,
                    //prodprgno = Item.prodprgno,
                    //jobordno = Item.jobordno,
                    prodprgdetid = Item.prodprgdetid,
                    retqty = Item.retqty,
                    lossqty = Item.lossqty,
                    itmid = Item.itmid,
                    colorid = Item.colorid,
                    sizeid = Item.sizeid,
                    jobordno = Item.jobordno,
                    lotno = Item.lotno,
                    suppid = Item.suppid,
                    styleid = Item.styleid,
                    Maruprate=Item.Maruprate,
                    plansizeid=Item.plansizeid,

                    proissmasid = Item.proissmasid,
                    proissdetid = Item.proissdetid,
                    proissjobid = Item.proissjobid,
                    proissstkid = Item.proissstkid,
                    uomid = Item.uomid,
                  



                });

            }

            var result = repo.DeleteDetData(DelDEntry.proc_recpt_no, DelDEntry.processid, DelDEntry.proc_recpt_date, DelDEntry.companyid, DelDEntry.remarks, DelDEntry.StoreUnitID, DelDEntry.CreatedBy, Itm, ItmList, "Update");

            return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
        }


        public Response<IQueryable<Domain.ProcessReturnItemDet>> LoadOpItmdet(string prodord)
        {
            try
            {
                var ProductWO = repo.LoadOpItmdet(prodord);

                return new Response<IQueryable<Domain.ProcessReturnItemDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessReturnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateCancelEntry(Domain.ProcessCancelMas MasEntry)
        {
            try
            {


                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Process_Cancel_mas ProcInsert = new AxonApparel.Repository.Process_Cancel_mas

                {
                    Process_Cancel_masid = MasEntry.Process_Cancel_masid,
                    process_Cancel_no = MasEntry.process_Cancel_no,
                    process_Cancel_date = MasEntry.process_Cancel_date,
                    OrderType = MasEntry.OrderType,
                    Cancel_Ref_date = MasEntry.Cancel_Ref_date,
                    Cancel_Ref_no = MasEntry.Cancel_Ref_no,
                    CancelOrClose = MasEntry.CancelOrClose,
                    Remarks = MasEntry.Remarks


                    //Process_Recpt_Return = ItmList

                };

                var ItmList = new List<Process_Cancel_det>();

                if (MasEntry.ProcDet != null)
                {
                    foreach (var PItem in MasEntry.ProcDet)
                    {

                        int? PSID = 0;

                        if (PItem.plansizeid == 0)
                        {
                            PSID = null;
                        }
                        else
                        {
                            PSID = PItem.plansizeid;
                        }

                        ItmList.Add(new Process_Cancel_det
                        {

                            Process_Cancel_Detid = PItem.Process_Cancel_Detid,
                            Process_Cancel_Masid = PItem.Process_Cancel_Masid,
                            ProcessOrdId = PItem.ProcessOrdId,
                            itemid = PItem.itemid,
                            colorid = PItem.colorid,
                            sizeid = PItem.sizeid,
                            Canceled_qty = PItem.Canceled_qty,
                            Sec_Qty = PItem.Sec_Qty,
                            InorOut = PItem.InorOut,
                            PlannedSizeid = PSID,//PItem.plansizeid,
                            ProcessOrdDetid = PItem.ProcessOrdDetid,
                        });
                    }

                }

                var jobItmList = new List<Process_Cancel_jobdet>();

                if (MasEntry.ProcJobDet != null)
                {
                    foreach (var PItem in MasEntry.ProcJobDet)
                    {

                        int? PSID = 0;

                        if (PItem.plansizeid == 0)
                        {
                            PSID = null;
                        }
                        else
                        {
                            PSID = PItem.plansizeid;
                        }

                        jobItmList.Add(new Process_Cancel_jobdet
                        {

                            Process_Cancel_Detid = PItem.Process_Cancel_Detid,
                            Process_Cancel_JobDetid = PItem.Process_Cancel_JobDetid,
                            ProcessOrdDetid = PItem.ProcessOrdDetid,
                            ProcessOrdJobDetid = PItem.ProcessOrdJobDetid,
                            Job_Ord_No = PItem.Job_Ord_No,
                            ProdPrgNo = PItem.ProdPrgNo,
                            Cancel_Qty = PItem.Cancel_Qty,
                            SequenceNo = PItem.SequenceNo,
                            ItemId = PItem.ItemId,
                            ColorId = PItem.ColorId,
                            SizeId = PItem.SizeId,
                            InOrOut = PItem.InorOut,
                            PlannedSizeid = PSID,//PItem.plansizeid,
                        });
                    }
                }
                var ObjList = new List<Domain.ProcessCancel>();

                foreach (var PItem in MasEntry.ProcObj)
                {


                    ObjList.Add(new Domain.ProcessCancel
                    {

                        Process_Cancel_Detid = PItem.Process_Cancel_Detid,
                        Process_Cancel_Masid = PItem.Process_Cancel_Masid,
                        ProcessOrdId = PItem.ProcessOrdId,
                        itemid = PItem.itemid,
                        colorid = PItem.colorid,
                        sizeid = PItem.sizeid,
                        Canceled_qty = PItem.Canceled_qty,
                        Sec_Qty = PItem.Sec_Qty,
                        InorOut = PItem.InorOut,
                        Process_Cancel_JobDetid = PItem.Process_Cancel_JobDetid,
                        ProcessOrdDetid = PItem.ProcessOrdDetid,
                        ProcessOrdJobDetid = PItem.ProcessOrdJobDetid,
                        Job_Ord_No = PItem.Job_Ord_No,
                        ProdPrgNo = PItem.ProdPrgNo,
                        Cancel_Qty = PItem.Cancel_Qty,
                        SequenceNo = PItem.SequenceNo,
                        
                    });
                }

                var result = repo.AddDetCancelData(ProcInsert, ItmList, jobItmList, ObjList, "Add", MasEntry.process_return_no);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<Domain.ProcessReturnItemDet>> GetOutProcCan(int masid)
        {
            try
            {
                var ProductWO = repo.LoadRepEditOutdet(masid);

                return new Response<IQueryable<Domain.ProcessReturnItemDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ProcessReturnItemDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateCancelEntry(Domain.ProcessCancelMas UpdateEntry)
        {
            try
            {


                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Process_Cancel_mas Procupdate = new AxonApparel.Repository.Process_Cancel_mas

                {
                    Process_Cancel_masid = UpdateEntry.Process_Cancel_masid,
                    process_Cancel_no = UpdateEntry.process_Cancel_no,
                    process_Cancel_date = UpdateEntry.process_Cancel_date,
                    OrderType = UpdateEntry.OrderType,
                    Cancel_Ref_date = UpdateEntry.Cancel_Ref_date,
                    Cancel_Ref_no = UpdateEntry.Cancel_Ref_no,
                    CancelOrClose = UpdateEntry.CancelOrClose,
                    Remarks = UpdateEntry.Remarks,
                    proc_recpt_masid = UpdateEntry.proc_recpt_masid,



                    //Process_Recpt_Return = ItmList

                };

                var EItmList = new List<Process_Cancel_det>();

                if (UpdateEntry.ProcDet != null)
                {
                    foreach (var EPItem in UpdateEntry.ProcDet)
                    {
                        int? PSID = 0;

                        if (EPItem.plansizeid == 0)
                        {
                            PSID = null;
                        }
                        else
                        {
                            PSID = EPItem.plansizeid;
                        }

                        EItmList.Add(new Process_Cancel_det
                        {

                            Process_Cancel_Detid = EPItem.Process_Cancel_Detid,
                            Process_Cancel_Masid = UpdateEntry.Process_Cancel_masid,
                            ProcessOrdId = EPItem.ProcessOrdId,
                            itemid = EPItem.itemid,
                            colorid = EPItem.colorid,
                            sizeid = EPItem.sizeid,
                            Canceled_qty = EPItem.Canceled_qty,
                            Sec_Qty = EPItem.Sec_Qty,
                            InorOut = EPItem.InorOut,
                            PlannedSizeid = PSID,//EPItem.plansizeid,
                            ProcessOrdDetid = EPItem.ProcessOrdDetid,
                        });
                    }

                }

                var EjobItmList = new List<Process_Cancel_jobdet>();

                if (UpdateEntry.ProcJobDet != null)
                {
                    foreach (var JPItem in UpdateEntry.ProcJobDet)
                    {
                        int? PSID = 0;

                        if (JPItem.plansizeid == 0)
                        {
                            PSID = null;
                        }
                        else
                        {
                            PSID = JPItem.plansizeid;
                        }

                        EjobItmList.Add(new Process_Cancel_jobdet
                        {

                            Process_Cancel_Detid = JPItem.Process_Cancel_Detid,
                            Process_Cancel_JobDetid = JPItem.Process_Cancel_JobDetid,
                            ProcessOrdDetid = JPItem.ProcessOrdDetid,
                            ProcessOrdJobDetid = JPItem.ProcessOrdJobDetid,
                            Job_Ord_No = JPItem.Job_Ord_No,
                            ProdPrgNo = JPItem.ProdPrgNo,
                            Cancel_Qty = JPItem.Cancel_Qty,
                            PlannedSizeid = PSID,//JPItem.plansizeid,
                            SequenceNo = JPItem.SequenceNo,
                            ItemId = JPItem.ItemId,
                            ColorId = JPItem.ColorId,
                            SizeId = JPItem.SizeId,
                            InOrOut = JPItem.InorOut,
                        });
                    }
                }
                var EObjList = new List<Domain.ProcessCancel>();

                foreach (var EJPItem in UpdateEntry.ProcObj)
                {
                    EObjList.Add(new Domain.ProcessCancel
                    {

                        Process_Cancel_Detid = EJPItem.Process_Cancel_Detid,
                        Process_Cancel_Masid = EJPItem.Process_Cancel_Masid,
                        ProcessOrdId = EJPItem.ProcessOrdId,
                        itemid = EJPItem.itemid,
                        colorid = EJPItem.colorid,
                        sizeid = EJPItem.sizeid,
                        Canceled_qty = EJPItem.Canceled_qty,
                        Sec_Qty = EJPItem.Sec_Qty,
                        InorOut = EJPItem.InorOut,
                        Process_Cancel_JobDetid = EJPItem.Process_Cancel_JobDetid,
                        ProcessOrdDetid = EJPItem.ProcessOrdDetid,
                        ProcessOrdJobDetid = EJPItem.ProcessOrdJobDetid,
                        Job_Ord_No = EJPItem.Job_Ord_No,
                        ProdPrgNo = EJPItem.ProdPrgNo,
                        Cancel_Qty = EJPItem.Cancel_Qty,
                        SequenceNo = EJPItem.SequenceNo
                    });
                }

                var result = repo.UpdateDetCancelData(Procupdate, EItmList, EjobItmList, EObjList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<bool> DeleteCancelEntry(Domain.ProcessCancelMas DelEntry)
        {
            try
            {


                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Process_Cancel_mas ProDelete = new AxonApparel.Repository.Process_Cancel_mas

                {
                    Process_Cancel_masid = DelEntry.Process_Cancel_masid,
                    process_Cancel_no = DelEntry.process_Cancel_no,
                    process_Cancel_date = DelEntry.process_Cancel_date,
                    OrderType = DelEntry.OrderType,
                    Cancel_Ref_date = DelEntry.Cancel_Ref_date,
                    Cancel_Ref_no = DelEntry.Cancel_Ref_no,
                    CancelOrClose = DelEntry.CancelOrClose,
                    Remarks = DelEntry.Remarks,
                    proc_recpt_masid = DelEntry.proc_recpt_masid,



                    //Process_Recpt_Return = ItmList

                };

                var DItmList = new List<Process_Cancel_det>();

                if (DelEntry.ProcDet != null)
                {
                    foreach (var DPItem in DelEntry.ProcDet)
                    {
                        int? PSID = 0;

                        if (DPItem.plansizeid == 0)
                        {
                            PSID = null;
                        }
                        else
                        {
                            PSID = DPItem.plansizeid;
                        }
                        DItmList.Add(new Process_Cancel_det
                        {

                            Process_Cancel_Detid = DPItem.Process_Cancel_Detid,
                            Process_Cancel_Masid = DelEntry.Process_Cancel_masid,
                            ProcessOrdId = DPItem.ProcessOrdId,
                            itemid = DPItem.itemid,
                            colorid = DPItem.colorid,
                            sizeid = DPItem.sizeid,
                            Canceled_qty = DPItem.Canceled_qty,
                            Sec_Qty = DPItem.Sec_Qty,
                            InorOut = DPItem.InorOut,
                            PlannedSizeid = PSID,//DPItem.plansizeid,
                            ProcessOrdDetid = DPItem.ProcessOrdDetid,
                        });
                    }

                }

                var DjobItmList = new List<Process_Cancel_jobdet>();

                if (DelEntry.ProcJobDet != null)
                {
                    foreach (var DJPItem in DelEntry.ProcJobDet)
                    {
                        int? PSID = 0;

                        if (DJPItem.plansizeid == 0)
                        {
                            PSID = null;
                        }
                        else
                        {
                            PSID = DJPItem.plansizeid;
                        }

                        DjobItmList.Add(new Process_Cancel_jobdet
                        {

                            Process_Cancel_Detid = DJPItem.Process_Cancel_Detid,
                            Process_Cancel_JobDetid = DJPItem.Process_Cancel_JobDetid,
                            ProcessOrdDetid = DJPItem.ProcessOrdDetid,
                            ProcessOrdJobDetid = DJPItem.ProcessOrdJobDetid,
                            Job_Ord_No = DJPItem.Job_Ord_No,
                            ProdPrgNo = DJPItem.ProdPrgNo,
                            Cancel_Qty = DJPItem.Cancel_Qty,
                            SequenceNo = DJPItem.SequenceNo,
                            ItemId = DJPItem.ItemId,
                            ColorId = DJPItem.ColorId,
                            SizeId = DJPItem.SizeId,
                            PlannedSizeid = PSID,//DJPItem.plansizeid,
                            InOrOut = DJPItem.InorOut,
                        });
                    }
                }
                var DObjList = new List<Domain.ProcessCancel>();

                foreach (var DJPItem in DelEntry.ProcObj)
                {
                    DObjList.Add(new Domain.ProcessCancel
                    {

                        Process_Cancel_Detid = DJPItem.Process_Cancel_Detid,
                        Process_Cancel_Masid = DJPItem.Process_Cancel_Masid,
                        ProcessOrdId = DJPItem.ProcessOrdId,
                        itemid = DJPItem.itemid,
                        colorid = DJPItem.colorid,
                        sizeid = DJPItem.sizeid,
                        Canceled_qty = DJPItem.Canceled_qty,
                        Sec_Qty = DJPItem.Sec_Qty,
                        InorOut = DJPItem.InorOut,
                        Process_Cancel_JobDetid = DJPItem.Process_Cancel_JobDetid,
                        ProcessOrdDetid = DJPItem.ProcessOrdDetid,
                        ProcessOrdJobDetid = DJPItem.ProcessOrdJobDetid,
                        Job_Ord_No = DJPItem.Job_Ord_No,
                        ProdPrgNo = DJPItem.ProdPrgNo,
                        Cancel_Qty = DJPItem.Cancel_Qty,
                        SequenceNo = DJPItem.SequenceNo
                    });
                }

                var result = repo.DeleteDetCancelData(ProDelete, DItmList, DjobItmList, DObjList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }
    }
}
