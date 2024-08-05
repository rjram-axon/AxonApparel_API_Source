using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
namespace AxonApparel.Business
{
    public class GeneralProcessReturnBusiness:IGeneralProcessReturnBusiness
    {
        IGeneralProcessReturnRepository repo = new GeneralProcessReturnRepository();

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

        public Common.Response<IQueryable<Domain.ProcessReturn>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid)
        {
            try
            {
                var ProductWO = repo.Loadaddgrid(cmpid, cmunitid, processid, processorid);

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
                AxonApparel.Repository.Process_Recpt_Mas ProcInsert = new AxonApparel.Repository.Process_Recpt_Mas
                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
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
                    EWayNo = MasEntry.EWayNo

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
                        jobordno = Item.jobordno,
                        lotno = Item.lotno,
                        suppid = Item.suppid,
                        styleid = Item.styleid,
                        proissmasid = Item.proissmasid,
                        proissdetid = Item.proissdetid,
                        proissjobid = Item.proissjobid,
                        proissstkid = Item.proissstkid,
                        uomid = Item.uomid,
                        Maruprate = Item.Maruprate,
                        plansizeid = Item.plansizeid,




                    });

                }

                var result = repo.AddDetData(ProcInsert,MasEntry.proc_recpt_no, MasEntry.processid, MasEntry.proc_recpt_date, MasEntry.companyid, MasEntry.remarks, MasEntry.StoreUnitID, MasEntry.CreatedBy, Itm, ItmList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<Domain.ProcessReceiptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string processortype, string type, string dcno, string recptno, string fromdate, string todate)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(cmpid, processid, unitid, buyerid, masid, prodordid, processortype, type, dcno, recptno, fromdate, todate);

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
                        jobordno = Item.jobordno,
                        lotno = Item.lotno,
                        suppid = Item.suppid,
                        styleid = Item.styleid,
                        proissmasid = Item.proissmasid,
                        proissdetid = Item.proissdetid,
                        proissjobid = Item.proissjobid,
                        proissstkid = Item.proissstkid,
                        uomid = Item.uomid,
                        Maruprate = Item.Maruprate,
                        plansizeid = Item.plansizeid,




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
                    uomid = Item.uomid,
                    proissmasid = Item.proissmasid,
                    proissdetid = Item.proissdetid,
                    proissjobid = Item.proissjobid,
                    proissstkid = Item.proissstkid,
                    Maruprate = Item.Maruprate,
                    plansizeid = Item.plansizeid,


                });

            }

            var result = repo.DeleteDetData(DelDEntry.proc_recpt_no, DelDEntry.processid, DelDEntry.proc_recpt_date, DelDEntry.companyid, DelDEntry.remarks, DelDEntry.StoreUnitID, DelDEntry.CreatedBy, Itm, ItmList, "Update");

            return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
        }
    }
}
