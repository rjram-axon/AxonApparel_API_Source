using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class ProcessProgramRepository : IProcessProgramRepository
    {
        PlanningEntities entities = new PlanningEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IList<ProcessProgram> GetProcessProgram(string FromDate, string ToDate, int? CompanyId, int? buyerid, string orderno, int? cmpnyunitid, string refno, string prgmtype, string Ordertype, string DispatchClosed)
        {
            //IList<ProcessProgram> query = (from T in entities.Proc_Apparel_ProdProgram(FromDate, ToDate, CompanyId)
            //                               select new ProcessProgram
            //                               {
            //                                   JMasId = T.ID,
            //                                   CompanyId = (int)T.companyid,
            //                                   CompanyUnitId = (int)T.Company_Unitid,
            //                                   JobOrderNo = T.Job_Ord_No,
            //                                   RefNo = T.ref_no,
            //                                   Programtype = T.ProgramType,
            //                                   Ordertype = T.OrderType,
            //                                   Style = T.Style,
            //                                   CompanyUnit = T.CompanyUnit,
            //                                   Buyer = T.Buyer,
            //                                   Quantity = (decimal)T.Quantity,
            //                                   orderno = T.order_no

            //                               }).ToList();

            //return query.ToList();
            IList<ProcessProgram> query = (from T in entities.Proc_Apparel_NProdProgramLoadgrid(FromDate, ToDate, CompanyId, buyerid, orderno, cmpnyunitid, refno, Ordertype, prgmtype, DispatchClosed)
                                           select new ProcessProgram
                                           {
                                               JMasId = T.ID,
                                               CompanyId = (int)T.companyid,
                                               company = T.company,
                                               CompanyUnitId = (int)T.Company_Unitid,
                                               JobOrderNo = T.Job_Ord_No,
                                               RefNo = T.ref_no,
                                               Programtype = T.ProgramType,
                                               Ordertype = T.OrderType,
                                               Style = T.Style,
                                               CompanyUnit = T.CompanyUnit,
                                               Buyer = T.Buyer,
                                               Quantity = (decimal)T.Quantity,
                                               orderno = T.order_no,
                                               Buyordmasid = T.Buy_Ord_MasId,
                                               Buyerid = (int)T.buyerid,
                                               Approved = T.Approved,
                                               ProcSeqMNo = T.Prog_Seq_No,

                                           }).ToList();

            return query.ToList();
        }

        public IQueryable<Process> GetLastProcess(string JobOrderNo)
        {
            IQueryable<Process> query = (from P in entities.Proc_Apparel_GetLastProcess(JobOrderNo)
                                         select new Process
                                         {
                                             ProcessId = P.ProcessId,
                                             Process1 = P.Process,
                                             Description = P.Description,
                                         }).AsQueryable();
            return query;
        }

        public IQueryable<Process> GetCopyProcessList(string Orderno, int Styleid)
        {
            IQueryable<Process> query = (from P in entities.Proc_Apparel_CopyProcSeq(Orderno, Styleid)
                                         select new Process
                                         {
                                             ProcessId = P.processid,
                                             Process1 = P.process,
                                         }).AsQueryable();
            return query;
        }

        public IQueryable<Domain.Process> GetLastProcessdllList(string JobOrdNo, int ProdPgmNo)
        {
            IQueryable<Domain.Process> query = (from P in entities.Proc_Apparel_GetLastPrgmProcess(JobOrdNo, ProdPgmNo)
                                                select new Domain.Process
                                                {
                                                    ProcessId = P.ProcessId,
                                                    ProcessName = P.Process,
                                                    SeqNo = P.ProdPrgid,
                                                }).AsQueryable();
            return query;
        }

        public IQueryable<ProductionProgramming> GetProductionProgramming(string JobOrderNo, string Ordertype, string Programtype)
        {
            IQueryable<ProductionProgramming> query = (from P in entities.Proc_Apparel_ProdProgramming(JobOrderNo, Ordertype, Programtype)
                                                       select new ProductionProgramming
                                                       {
                                                           Id = P.id,
                                                           JobOrderNo = P.Job_Ord_No,
                                                           RefNo = P.Ref_No,
                                                           Style = P.Style,
                                                           StyleId = (int)P.Styleid,
                                                           CompanyUnit = P.CompanyUnit,
                                                           CompanyUnitId = P.CompUnitId,
                                                           Buyer = P.Buyer,
                                                           Quantity = (decimal)P.quantity,
                                                           Process = P.Process,
                                                           ProcessId = P.Processid,
                                                           ProProgNo = (P.ProdPrgNo == null ? string.Empty : P.ProdPrgNo),
                                                           ProProgId = P.ProdPrgId,
                                                           //ProProgDate = (DateTime)(P.progdate.HasValue != null ? P.progdate.Value : ((DateTime)P.progdate).Date == DateTime.Now.Date),                                                           
                                                           ProProgDate = (DateTime)(P.progdate == null ? DateTime.Now.Date : P.progdate),
                                                           Iscomp = P.IsComponentProcess,
                                                           DcChk = 0,
                                                           MaxChk = (int)P.MaxSeqNo,
                                                       }).AsQueryable();
            return query;
        }

        public IQueryable<IOTableProcess> GetIOTableProcess(string OrderNo, string ioType)
        {
            IQueryable<IOTableProcess> query = (from P in entities.Proc_Apparel_GetIOTableProcess(OrderNo, ioType)
                                                select new IOTableProcess
                                                       {
                                                           PSId = P.Program_SummaryID,
                                                           CatType = P.Type,
                                                           ItemId = (int)P.itemid,
                                                           Item = P.Item,
                                                           Color = P.Color,
                                                           ColorId = (int)P.colorid,
                                                           Size = P.Size,
                                                           SizeId = (int)P.sizeid,
                                                           uom = P.uom,
                                                           Required = "Yes",
                                                           Quantity = (decimal)P.Quantity,
                                                           Sno = (long)P.Snumb,
                                                           SecQty=P.SecQty
                                                       }).AsQueryable();
            return query;
        }



        public int AddProductionprgMas(Prod_Prg_Mas objaddmas)
        {
            var result = entities.Prod_Prg_Mas.Add(objaddmas);
            entities.SaveChanges();
            return result.ProdPrgid;
        }

        //public bool AddDetData(List<Prod_Prg_Det> objCDet, string Mode, int ProdId = 0)
        //{
        //    try
        //    {
        //        int id = 0;
        //        //int itemid=0;

        //        if (Mode == "Update")
        //        {
        //            if (objCDet != null && objCDet.Count > 0)
        //            {
        //                foreach (var item in objCDet)
        //                {
        //                    id = (int)item.Prodprgid;

        //                }
        //            }
        //            else if (ProdId > 0)
        //            {
        //                id = ProdId;
        //            }
        //            var deletedet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == id).ToList<Prod_Prg_Det>();

        //            deletedet.ForEach(c => entities.Prod_Prg_Det.Remove(c));
        //            entities.SaveChanges();
        //        }

        //        if (objCDet != null && objCDet.Count > 0)
        //        {
        //            foreach (var item in objCDet)
        //            {
        //                entities.Prod_Prg_Det.Add(item);
        //            }
        //            entities.SaveChanges();
        //        }

        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        public bool AddDetData(Prod_Prg_Mas objaddmas, List<Prod_Prg_Det> objCDet, List<Prod_Prg_Det> objopDet, List<Prod_OpenPrg_Remarks> objrem, string Mode, int ProdId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            string Otype = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    //int itemid=0;
                    int ids = 0;


                    var OQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == objaddmas.Job_ord_no).FirstOrDefault();
                    if (OQuery != null)
                    {
                        Otype = OQuery.JobOrWork;
                    }

                    objaddmas.OrderType = Otype;
                    entities.Prod_Prg_Mas.Add(objaddmas);
                    entities.SaveChanges();
                    Masid = objaddmas.ProdPrgid;



                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in objCDet)
                        {
                            item.Prodprgid = Masid;
                            entities.Prod_Prg_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    if (objopDet != null && objopDet.Count > 0)
                    {
                        foreach (var item in objopDet)
                        {
                            item.Prodprgid = Masid;
                            entities.Prod_Prg_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    if (objrem != null && objrem.Count > 0)
                    {
                        foreach (var item in objrem)
                        {
                            item.ProdPrgId = Masid;
                            entities.Prod_OpenPrg_Remarks.Add(item);
                        }
                        entities.SaveChanges();
                    }


                    //var res = AmendData(objaddmas, objCDet, objopDet, objrem, Mode, ProdId);
                    //entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessProgram-AddDetData");
                }
            }
            return reserved;


        }

        public bool AmendData(Prod_Prg_Mas objaddmas, List<Prod_Prg_Det> objCDet, List<Prod_Prg_Det> objopDet, List<Prod_OpenPrg_Remarks> objrem, string Mode, int ProdId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            string Otype = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    int AmdPrgId = 0;
                    //int itemid=0;
                    int ids = 0;


                    var OQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == objaddmas.Job_ord_no).FirstOrDefault();
                    if (OQuery != null)
                    {
                        Otype = OQuery.JobOrWork;
                    }

                    Repository.Prod_Prg_Mas_Amend masamd = new Repository.Prod_Prg_Mas_Amend();
                    if (objaddmas != null)
                    {

                        masamd.ProdPrgNo = objaddmas.ProdPrgNo;
                        masamd.ProcessId = objaddmas.ProcessId;
                        masamd.companyid = objaddmas.companyid;
                        masamd.companyunitid = objaddmas.companyunitid;
                        masamd.OrderType = Otype;
                        masamd.ProgramType = (objaddmas.ProgramType == null ? "" : objaddmas.ProgramType);
                        masamd.Prog_Seq_No = objaddmas.Prog_Seq_No;
                        masamd.remarks = objaddmas.remarks;
                        masamd.Job_ord_no = objaddmas.Job_ord_no;
                        masamd.ProgDate = objaddmas.ProgDate;
                        masamd.Closed = "N";
                        masamd.IsProportion = objaddmas.IsProportion;
                        masamd.Amend = objaddmas.Amend;
                        masamd.Approved = objaddmas.Approved;
                        masamd.CreatedBy = objaddmas.CreatedBy;
                        masamd.ApprovedBy = objaddmas.ApprovedBy;
                        masamd.FinalizeAutoPost = objaddmas.FinalizeAutoPost;
                    }

                    var aid = entities.Prod_Prg_Mas_Amend.Add(masamd);
                    entities.SaveChanges();
                    AmdPrgId = masamd.AmdProdPrgid;


                    var List = new List<Repository.Prod_Prg_Det_Amend>();
                    foreach (var ad in objCDet)
                    {
                        List.Add(new Repository.Prod_Prg_Det_Amend
                        {

                            AmdProdPrgid = AmdPrgId,
                            AmdProdprgdetid = ad.Prodprgdetid,
                            Itemid = ad.Itemid,
                            Colorid = ad.Colorid,
                            Sizeid = ad.Sizeid,
                            InorOut = ad.InorOut,
                            CatType = ad.CatType,
                            ActualPlan_Qty = ad.ActualPlan_Qty,
                            Prog_Op_Qty = ad.Prog_Op_Qty,
                            AltItem = ad.AltItem,
                            Amended = ad.Amended,
                            SecQty = ad.SecQty,
                            Issue_qty = ad.Issue_qty,
                            order_qty = ad.order_qty
                        });
                    }

                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in List)
                        {
                            item.AmdProdPrgid = Masid;
                            entities.Prod_Prg_Det_Amend.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    var OList = new List<Repository.Prod_Prg_Det_Amend>();
                    foreach (var ad1 in objopDet)
                    {
                        OList.Add(new Repository.Prod_Prg_Det_Amend
                        {

                            AmdProdPrgid = AmdPrgId,
                            AmdProdprgdetid = ad1.Prodprgdetid,
                            Itemid = ad1.Itemid,
                            Colorid = ad1.Colorid,
                            Sizeid = ad1.Sizeid,
                            InorOut = ad1.InorOut,
                            CatType = ad1.CatType,
                            ActualPlan_Qty = ad1.ActualPlan_Qty,
                            Prog_Op_Qty = ad1.Prog_Op_Qty,
                            AltItem = ad1.AltItem,
                            Amended = ad1.Amended,
                            SecQty = ad1.SecQty,
                            Issue_qty = ad1.Issue_qty,
                            order_qty = ad1.order_qty
                        });
                    }

                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var Oitem in OList)
                        {

                            entities.Prod_Prg_Det_Amend.Add(Oitem);
                        }
                        entities.SaveChanges();
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessProgram-AddDetData");
                }
            }
            return reserved;


        }

        public IQueryable<ProductionProgramming> GetProductionProgrammingEdit(int id)
        {

            string OType = "";

            var OQuery = entities.Job_Ord_Mas.Where(b => b.ID == id).FirstOrDefault();
            if (OQuery != null)
            {
                OType = OQuery.JobOrWork;
            }

            IQueryable<ProductionProgramming> query = (from P in entities.Proc_Apparel_ProdProgrammingEdit(id, OType)
                                                       select new ProductionProgramming
                                                       {
                                                           Id = P.id,
                                                           JobOrderNo = P.Job_Ord_No,
                                                           RefNo = P.Ref_No,
                                                           Style = P.Style,
                                                           StyleId = (int)P.Styleid,
                                                           CompanyUnit = P.CompanyUnit,
                                                           CompanyUnitId = P.CompUnitId,
                                                           Buyer = P.Buyer,
                                                           Quantity = (decimal)P.quantity,
                                                           Process = P.Process,
                                                           ProcessId = P.Processid,
                                                           ProProgNo = (P.ProdPrgNo == null ? string.Empty : P.ProdPrgNo),
                                                           ProProgId = P.ProdPrgId,
                                                           //ProProgDate = (DateTime)(P.progdate.HasValue != null ? P.progdate.Value : ((DateTime)P.progdate).Date == DateTime.Now.Date),                                                           
                                                           ProProgDate = (DateTime)(P.progdate == null ? DateTime.Now.Date : P.progdate),
                                                           //ProProgDate=P.progdate,
                                                           Iscomp = P.IsComponentProcess,
                                                           Ordertype = OType,
                                                           DcChk = (int)P.DcChk,
                                                           Approved = P.Approved,
                                                           MaxChk = P.MaxChk,
                                                       }).AsQueryable();
            return query;
        }


        public int AddComponentprgMas(Comp_prg_mas objaddmas)
        {
            var result = entities.Comp_prg_mas.Add(objaddmas);
            entities.SaveChanges();
            return result.ProdPrgid;
        }

        public bool AddCompDetData(List<Comp_Prg_det> objCDet, string Mode, int ProdId = 0)
        {
            try
            {
                int id = 0;
                if (Mode == "Update")
                {
                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in objCDet)
                        {
                            id = (int)item.Prodprgid;

                        }
                    }
                    else if (ProdId > 0)
                    {
                        id = ProdId;
                    }
                    var deletedet = entities.Comp_Prg_det.Where(d => d.Prodprgid == id).ToList<Comp_Prg_det>();

                    deletedet.ForEach(c => entities.Comp_Prg_det.Remove(c));
                    entities.SaveChanges();
                }

                if (objCDet != null && objCDet.Count > 0)
                {
                    foreach (var item in objCDet)
                    {
                        entities.Comp_Prg_det.Add(item);
                    }
                    entities.SaveChanges();
                }

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }





        public IQueryable<CompList> GetItem(string JobOrderNo, int styleid, string JoborWrk)
        {
            IQueryable<CompList> query = (from P in entities.Proc_Apparel_GetItem(JobOrderNo, styleid, JoborWrk)
                                          select new CompList
                                          {
                                              item = P.Item,
                                              itemid = P.ItemId
                                          }).AsQueryable();
            return query;
        }


        public IQueryable<CompList> GetColor(string JobOrderNo, int styleid, string JoborWrk, int itemid)
        {
            IQueryable<CompList> query = (from P in entities.Proc_Apparel_GetColor(JobOrderNo, styleid, JoborWrk, itemid)
                                          select new CompList
                                          {
                                              color = P.Color,
                                              colorid = P.Colorid
                                          }).AsQueryable();
            return query;
        }


        public IQueryable<CompList> GetComponent(string JobOrderNo, int styleid, string JoborWrk, int itemid, int colorid)
        {
            IQueryable<CompList> query = (from P in entities.Proc_Apparel_GetComponent(JobOrderNo, styleid, JoborWrk, itemid, colorid)
                                          select new CompList
                                          {
                                              component = P.component,
                                              componentid = P.componentid
                                          }).AsQueryable();
            return query;
        }


        public IQueryable<CompList> GetComponentDet(string JobOrderNo, int styleid, int itemid, int colorid, int componentid)
        {
            IQueryable<CompList> query = (from P in entities.Proc_GetCompdetails(JobOrderNo, styleid, itemid, colorid, componentid)
                                          select new CompList
                                          {
                                              item = P.Item,
                                              itemid = P.Itemid,
                                              componentid = P.ComponentId,
                                              component = P.Component,
                                              color = P.Color,
                                              colorid = P.Colorid,
                                              CColor = P.Ccolor,
                                              CColorid = P.CColorID,
                                              size = P.Size,
                                              sizeid = P.Sizeid,
                                              sizerow = (int)P.SizeRow,
                                              prodqty = (decimal)P.Prdn_Qty,
                                              nocomps = (decimal)P.NoComponents,
                                              noparts = P.NoParts,
                                              required = "Yes"

                                          }).AsQueryable();
            return query;
        }


        public IQueryable<ProdPrgDet> GetProdprgedit(int prodprgid)
        {
            IQueryable<ProdPrgDet> query = (from P in entities.Proc_Apparel_ProdProgramEdit(prodprgid)
                                            select new ProdPrgDet
                                            {
                                                Colorid = P.Colorid,
                                                Sizeid = P.Sizeid,
                                                Itemid = P.Itemid,
                                                color = P.color,
                                                size = P.size,
                                                item = P.item,
                                                Prodprgid = P.ProdPrgid,
                                                Prodprgdetid = P.Prodprgdetid,
                                                prodno = P.ProdPrgNo,
                                                ActualPlan_Qty = P.ActualPlan_Qty,
                                                InorOut = P.InorOut,
                                                Prog_Op_Qty = P.Prog_Op_Qty,
                                                order_qty = P.Order_Qty,
                                                Issue_qty = P.Issue_qty,
                                                Receipt_Qty = P.Receipt_qty,
                                                itemgrpid = (int)P.ItemGroupId,
                                                uom = P.UOM,
                                                uomid = P.uomid


                                            }).AsQueryable();
            return query;
        }


        public IQueryable<IOTableProcess> GetProdprgeditlist(int prodprgid)
        {
            IQueryable<IOTableProcess> query = (from P in entities.Proc_Apparel_ProdProgrammingEditList(prodprgid)
                                                select new IOTableProcess
                                            {
                                                //Colorid = P.Colorid,
                                                //Sizeid = P.Sizeid,
                                                //Itemid = P.Itemid,
                                                //color = P.color,
                                                //size = P.size,
                                                //item = P.item,
                                                //Prodprgid = P.ProdPrgid,
                                                //Prodprgdetid = P.Prodprgdetid,
                                                //prodno = P.ProdPrgNo,
                                                //ActualPlan_Qty = P.ActualPlan_Qty,
                                                //InorOut = P.InorOut,
                                                //Prog_Op_Qty = P.Prog_Op_Qty,
                                                //order_qty = P.Order_Qty,
                                                //Issue_qty = P.Issue_qty,
                                                //Receipt_Qty = P.Receipt_qty,
                                                //itemgrpid = (int)P.ItemGroupId,
                                                //uom = P.UOM,
                                                //uomid = P.uomid,
                                                //required="Yes",
                                                //CatType=P.CatType,
                                                //SecQty=P.SecQty
                                                ColorId = (int)P.Colorid,
                                                SizeId = (int)P.Sizeid,
                                                ItemId = (int)P.Itemid,
                                                Color = P.color,
                                                Size = P.size,
                                                Item = P.item,
                                                PSId = P.Prodprgdetid,
                                                Prodprgid = P.ProdPrgid,
                                                //Prodprgdetid = P.Prodprgdetid,
                                                prodno = P.ProdPrgNo,
                                                ActualPlan_Qty = P.ActualPlan_Qty,
                                                InorOut = P.InorOut,
                                                Prog_Op_Qty = P.Prog_Op_Qty,
                                                Quantity = P.Prog_Op_Qty,
                                                order_qty = P.Order_Qty,
                                                Issue_qty = P.Issue_qty,
                                                Receipt_Qty = P.Receipt_qty,
                                                ItemGroupId = (int)P.ItemGroupId,
                                                uom = P.UOM,
                                                UomId = P.uomid,
                                                Required = "Yes",
                                                CatType = P.CatType,
                                                SecQty = P.SecQty,
                                                prodpgmdate =P.Progdate,
                                                Reason = P.Reason,
                                                Remarks = P.Remarks,

                                                Despatch_Closed = P.Despatch_Closed


                                            }).AsQueryable();
            return query;
        }

        public IQueryable<IOTableProcess> GetlastProcessPgmList(int ProdPgmNo, string ioType)
        {
            IQueryable<IOTableProcess> query = (from P in entities.Proc_Apparel_GetLastProdProgrammingList(ProdPgmNo, ioType)
                                                select new IOTableProcess
                                                {
                                                    //Colorid = P.Colorid,
                                                    //Sizeid = P.Sizeid,
                                                    //Itemid = P.Itemid,
                                                    //color = P.color,
                                                    //size = P.size,
                                                    //item = P.item,
                                                    //Prodprgid = P.ProdPrgid,
                                                    //Prodprgdetid = P.Prodprgdetid,
                                                    //prodno = P.ProdPrgNo,
                                                    //ActualPlan_Qty = P.ActualPlan_Qty,
                                                    //InorOut = P.InorOut,
                                                    //Prog_Op_Qty = P.Prog_Op_Qty,
                                                    //order_qty = P.Order_Qty,
                                                    //Issue_qty = P.Issue_qty,
                                                    //Receipt_Qty = P.Receipt_qty,
                                                    //itemgrpid = (int)P.ItemGroupId,
                                                    //uom = P.UOM,
                                                    //uomid = P.uomid,
                                                    //required="Yes",
                                                    //CatType=P.CatType,
                                                    //SecQty=P.SecQty
                                                    ColorId = (int)P.Colorid,
                                                    SizeId = (int)P.Sizeid,
                                                    ItemId = (int)P.Itemid,
                                                    Color = P.color,
                                                    Size = P.size,
                                                    Item = P.item,
                                                    PSId = P.Prodprgdetid,
                                                    Prodprgid = P.ProdPrgid,
                                                    //Prodprgdetid = P.Prodprgdetid,
                                                    prodno = P.ProdPrgNo,
                                                    ActualPlan_Qty = P.ActualPlan_Qty,
                                                    InorOut = P.InorOut,
                                                    Prog_Op_Qty = P.Prog_Op_Qty,
                                                    Quantity = P.Prog_Op_Qty,
                                                    //order_qty = P.Order_Qty,
                                                    //Issue_qty = P.Issue_qty,
                                                    //Receipt_Qty = P.Receipt_qty,

                                                    order_qty = 0,
                                                    Issue_qty = 0,
                                                    Receipt_Qty = 0,
                                                    ItemGroupId = (int)P.ItemGroupId,
                                                    uom = P.UOM,
                                                    UomId = P.uomid,
                                                    Required = "Yes",
                                                    CatType = P.CatType,
                                                    SecQty = P.SecQty,
                                                    prodpgmdate = (DateTime)P.Progdate,
                                                    Reason = P.Reason,
                                                    Remarks = P.Remarks



                                                }).AsQueryable();
            return query;
        }


        public bool UpdateProd(Prod_Prg_Mas objAd, List<Prod_Prg_Det> objCDet, List<Prod_Prg_Det> objopDet, List<Prod_OpenPrg_Remarks> objrem, string Mode, int ProdId = 0)
        {
            bool reserved = false;
            int id = 0;
            int ids = 0;
            string Otype = "";
            string PrgType = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    var OQuery = entities.Prod_Prg_Mas.Where(b => b.ProdPrgid == objAd.ProdPrgid).FirstOrDefault();
                    if (OQuery != null)
                    {
                        Otype = OQuery.OrderType;
                        PrgType = OQuery.ProgramType;
                    }

                    var Upd = entities.Prod_Prg_Mas.Where(c => c.ProdPrgid == objAd.ProdPrgid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.ProdPrgid = objAd.ProdPrgid;
                        Upd.ProdPrgNo = objAd.ProdPrgNo;
                        Upd.ProgDate = objAd.ProgDate;
                        Upd.companyid = objAd.companyid;
                        Upd.companyunitid = objAd.companyunitid;
                        Upd.ProcessId = objAd.ProcessId;
                        Upd.Job_ord_no = objAd.Job_ord_no;
                        // Upd.Process = objAd.Process;
                        Upd.CreatedBy = objAd.CreatedBy;
                        Upd.Amend = "N";
                        Upd.Approved = objAd.Approved;
                        Upd.ApprovedBy = objAd.ApprovedBy;
                        Upd.OrderType = Otype;//objAd.OrderType;
                        Upd.Closed = "N";
                        Upd.remarks = objAd.remarks;
                        Upd.Prog_Seq_No = objAd.Prog_Seq_No;
                        Upd.ProgramType = PrgType;

                        entities.SaveChanges();

                    }

                    if (Mode == "Update")
                    {
                        //if (objCDet != null && objCDet.Count > 0)
                        //{
                        //    foreach (var item in objCDet)
                        //    {
                        //        id = (int)item.Prodprgid;

                        //    }
                        //}
                        //else if (ProdId > 0)
                        //{
                        //    id = ProdId;
                        //}



                        var deleteopdet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && d.order_qty == 0 && (d.transferIn == null ? 0 : d.transferIn )== 0 && d.InorOut == "O").ToList<Prod_Prg_Det>();

                        deleteopdet.ForEach(c => entities.Prod_Prg_Det.Remove(c));
                        entities.SaveChanges();

                        var deleteipdet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && d.Issue_qty == 0 && d.InorOut == "I").ToList<Prod_Prg_Det>();

                        deleteipdet.ForEach(c => entities.Prod_Prg_Det.Remove(c));
                        entities.SaveChanges();


                        var deleteopdet2 = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && d.order_qty == null && d.transferIn==null && d.InorOut == "O").ToList<Prod_Prg_Det>();

                        deleteopdet2.ForEach(c => entities.Prod_Prg_Det.Remove(c));
                        entities.SaveChanges();

                        var deleteipdet2 = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && d.Issue_qty == null && d.InorOut == "I").ToList<Prod_Prg_Det>();

                        deleteipdet2.ForEach(c => entities.Prod_Prg_Det.Remove(c));
                        entities.SaveChanges();






                        //if (objopDet != null && objopDet.Count > 0)
                        //{
                        //    foreach (var item in objopDet)
                        //    {
                        //        ids = (int)item.Prodprgid;

                        //    }
                        //}
                        //else if (ProdId > 0)
                        //{
                        //    ids = ProdId;
                        //}
                        //var delete = entities.Prod_Prg_Det.Where(d => d.Prodprgid == ids).ToList<Prod_Prg_Det>();

                        //delete.ForEach(c => entities.Prod_Prg_Det.Remove(c));
                        //entities.SaveChanges();

                        //if (objrem != null && objrem.Count > 0)
                        //{
                        //    foreach (var item in objrem)
                        //    {
                        //        ids = (int)item.ProdPrgId;

                        //    }
                        //}
                        //else if (ProdId > 0)
                        //{
                        //    ids = ProdId;
                        //}
                        var deleterem = entities.Prod_OpenPrg_Remarks.Where(d => d.ProdPrgId == objAd.ProdPrgid).ToList<Prod_OpenPrg_Remarks>();

                        deleterem.ForEach(c => entities.Prod_OpenPrg_Remarks.Remove(c));
                        entities.SaveChanges();
                    }

                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in objCDet)
                        {
                            item.Prodprgid = objAd.ProdPrgid;

                            if (0 < item.Issue_qty)
                            {
                                var UpdateIPdet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && d.Issue_qty > 0
                                                  && d.Itemid == item.Itemid && d.Colorid == item.Colorid && d.Sizeid == item.Sizeid && d.InorOut == "I").FirstOrDefault();

                                if (UpdateIPdet != null && UpdateIPdet.Issue_qty > 0)
                                {

                                    if (item.Prog_Op_Qty < UpdateIPdet.Issue_qty)
                                    {
                                        UpdateIPdet.Prog_Op_Qty = (decimal)UpdateIPdet.Prog_Op_Qty;
                                        UpdateIPdet.ActualPlan_Qty = (decimal)UpdateIPdet.ActualPlan_Qty;
                                    }
                                    else
                                    {
                                        UpdateIPdet.Prog_Op_Qty = (decimal)item.Prog_Op_Qty;
                                        UpdateIPdet.ActualPlan_Qty = (decimal)item.ActualPlan_Qty;
                                    }

                                    entities.SaveChanges();
                                }
                                else {
                                    item.order_qty = 0;
                                    item.Issue_qty = 0;
                                    entities.Prod_Prg_Det.Add(item);
                                    entities.SaveChanges();
                                }

                            }
                            else {
                                //var deleteipdet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && d.InorOut=="I" && d.Issue_qty==0).ToList<Prod_Prg_Det>();

                                //deleteipdet.ForEach(c => entities.Prod_Prg_Det.Remove(c));
                                //entities.SaveChanges();
                                var UpdateOPdet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && d.Issue_qty > 0
                                                  && d.Itemid == item.Itemid && d.Colorid == item.Colorid && d.Sizeid == item.Sizeid && d.InorOut == "I").FirstOrDefault();

                                if (UpdateOPdet == null)
                                {
                                    entities.Prod_Prg_Det.Add(item);
                                    entities.SaveChanges();
                                }
                            }

                           

                           
                        }
                        entities.SaveChanges();
                    }





                    if (objopDet != null && objopDet.Count > 0)
                    {
                        foreach (var item in objopDet)
                        {
                            item.Prodprgid = objAd.ProdPrgid;


                            if (0 < item.order_qty)
                            {
                                var UpdateOPdet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && (d.order_qty + (d.transferIn == null ? 0 : d.transferIn)) > 0
                                                  && d.Itemid == item.Itemid && d.Colorid == item.Colorid && d.Sizeid == item.Sizeid && d.InorOut == "O" ).FirstOrDefault();

                                if (UpdateOPdet != null && (UpdateOPdet.order_qty + (UpdateOPdet.transferIn == null ? 0 : UpdateOPdet.transferIn)) > 0)
                                {

                                    if (item.Prog_Op_Qty < (UpdateOPdet.order_qty + (UpdateOPdet.transferIn == null ? 0 : UpdateOPdet.transferIn)))
                                    {
                                        UpdateOPdet.Prog_Op_Qty = (decimal)UpdateOPdet.Prog_Op_Qty;
                                        UpdateOPdet.ActualPlan_Qty = (decimal)UpdateOPdet.ActualPlan_Qty;
                                    }
                                    else
                                    {
                                        UpdateOPdet.Prog_Op_Qty = (decimal)item.Prog_Op_Qty;
                                        UpdateOPdet.ActualPlan_Qty = (decimal)item.ActualPlan_Qty;
                                    }

                                    entities.SaveChanges();
                                }
                                else {
                                    item.order_qty = 0;
                                    item.Issue_qty = 0;
                                    entities.Prod_Prg_Det.Add(item);
                                    entities.SaveChanges();
                                }
                            }
                            else
                            {
                                //var deleteopdet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && d.InorOut == "O" && d.order_qty == 0).ToList<Prod_Prg_Det>();

                                //deleteopdet.ForEach(c => entities.Prod_Prg_Det.Remove(c));
                                //entities.SaveChanges();
                                var UpdateOPdet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == objAd.ProdPrgid && (d.order_qty + (d.transferIn == null ? 0 : d.transferIn)) > 0
                                                  && d.Itemid == item.Itemid && d.Colorid == item.Colorid && d.Sizeid == item.Sizeid && d.InorOut == "O").FirstOrDefault();

                                 if (UpdateOPdet == null )
                                 {
                                     entities.Prod_Prg_Det.Add(item);
                                     entities.SaveChanges();
                                 }
                            }

                        }
                        entities.SaveChanges();
                    }



                    if (objrem != null && objrem.Count > 0)
                    {
                        foreach (var item in objrem)
                        {
                            item.ProdPrgId = objAd.ProdPrgid;
                            entities.Prod_OpenPrg_Remarks.Add(item);
                        }
                        entities.SaveChanges();
                    }
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessProgram-UpdateProd");
                }
            }
            return reserved;
        }

        public bool UpdateProdApp(Prod_Prg_Mas objAd, List<Prod_Prg_Det> objCDet, List<Prod_Prg_Det> objopDet, List<Prod_OpenPrg_Remarks> objrem, string Mode, int ProdId = 0)
        {
            bool reserved = false;
            int id = 0;
            int ids = 0;
            string Otype = "";
            string PrgType = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    var OQuery = entities.Prod_Prg_Mas.Where(b => b.ProdPrgid == objAd.ProdPrgid).FirstOrDefault();
                    if (OQuery != null)
                    {
                        Otype = OQuery.OrderType;
                        PrgType = OQuery.ProgramType;
                    }

                    var Upd = entities.Prod_Prg_Mas.Where(c => c.ProdPrgid == objAd.ProdPrgid).FirstOrDefault();
                    if (Upd != null)
                    {
                        //Upd.ProdPrgid = objAd.ProdPrgid;
                        //Upd.ProdPrgNo = objAd.ProdPrgNo;
                        //Upd.ProgDate = objAd.ProgDate;
                        //Upd.companyid = objAd.companyid;
                        //Upd.companyunitid = objAd.companyunitid;
                        //Upd.ProcessId = objAd.ProcessId;
                        //Upd.Job_ord_no = objAd.Job_ord_no;
                        //// Upd.Process = objAd.Process;
                        //Upd.CreatedBy = objAd.CreatedBy;
                        //Upd.Amend = "N";
                        Upd.Approved = objAd.Approved;
                        Upd.ApprovedBy = objAd.ApprovedBy;
                        //Upd.OrderType = Otype;//objAd.OrderType;
                        //Upd.Closed = "N";
                        //Upd.remarks = objAd.remarks;
                        //Upd.Prog_Seq_No = objAd.Prog_Seq_No;
                        //Upd.ProgramType = PrgType;

                        entities.SaveChanges();

                    }


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessProgram-UpdateProd");
                }
            }
            return reserved;
        }


        public bool UpdateComp(Comp_prg_mas objAd)
        {
            try
            {
                var result = false;
                var Upd = entities.Comp_prg_mas.Where(c => c.ProdPrgid == objAd.ProdPrgid).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.ProdPrgid = objAd.ProdPrgid;
                    Upd.Prodprgno = objAd.Prodprgno;
                    Upd.ProgDate = objAd.ProgDate;
                    Upd.companyid = objAd.companyid;
                    Upd.companyunitid = objAd.companyunitid;
                    Upd.ProcessId = objAd.ProcessId;
                    Upd.Job_ordno = objAd.Job_ordno;
                    ///Upd.Process = objAd.Process;
                    Upd.CreatedBy = objAd.CreatedBy;
                    Upd.Amend = objAd.Amend;
                    Upd.Approved = objAd.Approved;

                    Upd.OrderType = objAd.OrderType;
                    Upd.Closed = objAd.Closed;


                    entities.SaveChanges();
                    result = true;
                }
                else { result = false; }

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IQueryable<CompPrgDet> GetCompprgeditlist(int prodprgid)
        {
            IQueryable<CompPrgDet> query = (from P in entities.Proc_Apparel_CompProgramEdit(prodprgid)
                                            select new CompPrgDet
                                            {
                                                Colorid = (int)P.Colorid,
                                                Sizeid = (int)P.Sizeid,
                                                Itemid = (int)P.Itemid,
                                                item = P.item,
                                                color = P.color,
                                                size = P.size,
                                                CColorID = (int)P.CColorID,
                                                CatType = P.CatType,
                                                process = P.Process,
                                                processid = P.Processid,
                                                Prodprgid = P.ProdPrgid,
                                                Prodprgdetid = P.Prodprgdetid,
                                                prodpgmno = P.ProdPrgNo,
                                                ActualPlan_Qty = P.ActualPlan_Qty,
                                                Prog_Op_Qty = P.Prog_Op_Qty,
                                                Issue_qty = P.IssueQty,
                                                Componentid = (int)P.Componentid,
                                                Required = "Yes",
                                                remarks = P.Remarks




                                            }).AsQueryable();
            return query;
        }


        public IList<ProcessProgram> GetProcessProgramRepAddList(int? compnyid, int? buyerid, int? cmpnyunitid, string orderno, string refno, string ordertype, string prgmtype, int? mode)
        {
            string OType = "";
            //if (ordertype == "")
            //{
            //    OType = "W";
            //}else
            //{

            //    OType = "S";
            //}

            IList<ProcessProgram> query = (from T in entities.proc_ProductionPrg_AddListDet(compnyid, buyerid, cmpnyunitid, orderno, refno, ordertype, prgmtype, mode)
                                           select new ProcessProgram
                                           {
                                               //JMasId = T.,
                                               CompanyId = (int)T.companyid,
                                               CompanyUnitId = (int)T.Company_Unitid,
                                               JobOrderNo = T.Job_Ord_No,
                                               RefNo = T.ref_no,
                                               Programtype = T.ProgramType,
                                               Ordertype = T.OrderType,
                                               Style = T.Style,
                                               CompanyUnit = T.CompanyUnit,
                                               Buyer = T.Buyer,
                                               Quantity = (decimal)T.Quantity
                                           }).ToList();

            return query.ToList();
        }

        public bool ProdDeleteData(int id)
        {
            bool reserved = false;
            int ids = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    //var addl = entities.buy_ord_style.Where(c => c.StyleRowid == id).FirstOrDefault();

                    //delete Pro_Prg_Det Many Rows table
                    var deleteprodprgdet = entities.Prod_Prg_Det.Where(d => d.Prodprgid == id).ToList<Prod_Prg_Det>();
                    deleteprodprgdet.ForEach(c => entities.Prod_Prg_Det.Remove(c));
                    entities.SaveChanges();

                    //delete Prod_Prg_Mas Many Rows table
                    var deleteProdPrgMas = entities.Prod_Prg_Mas.Where(d => d.ProdPrgid == id).ToList<Prod_Prg_Mas>();
                    deleteProdPrgMas.ForEach(c => entities.Prod_Prg_Mas.Remove(c));
                    entities.SaveChanges();


                    var deleteProdPrgrem = entities.Prod_OpenPrg_Remarks.Where(d => d.ProdPrgId == id).ToList<Prod_OpenPrg_Remarks>();
                    deleteProdPrgrem.ForEach(c => entities.Prod_OpenPrg_Remarks.Remove(c));
                    entities.SaveChanges();

                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessProgram-ProdDeleteData");
                }
            }
            return reserved;
        }

        public bool CompDeleteData(int id)
        {
            var result = false;

            //delete Comp_prg_det Many Rows table
            var deleteCompprgdet = entities.Comp_Prg_det.Where(d => d.Prodprgid == id).ToList<Comp_Prg_det>();
            deleteCompprgdet.ForEach(c => entities.Comp_Prg_det.Remove(c));
            entities.SaveChanges();

            //delete Comp_prg_mas Many Rows table
            var deleteCompPrgMas = entities.Comp_prg_mas.Where(d => d.ProdPrgid == id).ToList<Comp_prg_mas>();
            deleteCompPrgMas.ForEach(c => entities.Comp_prg_mas.Remove(c));
            entities.SaveChanges();

            entities.SaveChanges();
            result = true;

            return result;
        }



        public IQueryable<ProductionProgramming> GetProductionProgrammingEditOpen(int id)
        {
            IQueryable<ProductionProgramming> query = (from P in entities.Proc_Apparel_ProdProgrammingEditOpen(id)
                                                       select new ProductionProgramming
                                                       {
                                                           Id = P.id,
                                                           JobOrderNo = P.Job_Ord_No,
                                                           RefNo = P.Ref_No,
                                                           Style = P.Style,
                                                           StyleId = (int)P.Styleid,
                                                           CompanyUnit = P.CompanyUnit,
                                                           CompanyUnitId = P.CompUnitId,
                                                           Buyer = P.Buyer,
                                                           Quantity = (decimal)P.quantity,
                                                           Process = P.Process,
                                                           ProcessId = P.Processid,
                                                           ProProgNo = (P.ProdPrgNo == null ? string.Empty : P.ProdPrgNo),
                                                           ProProgId = P.ProdPrgId,
                                                           //ProProgDate = (DateTime)(P.progdate.HasValue != null ? P.progdate.Value : ((DateTime)P.progdate).Date == DateTime.Now.Date),                                                           
                                                           ProProgDate = (DateTime)(P.progdate == null ? DateTime.Now.Date : P.progdate),
                                                           //ProProgDate=P.progdate,
                                                           Iscomp = P.IsComponentProcess,
                                                           reason = P.Remarks,
                                                           PrgEdittype = P.ProgramType,
                                                           Ordertype = P.OrderType,
                                                           MaxChk = P.MaxSeqNo,
                                                           Approved=P.Approved,
                                                       }).AsQueryable();
            return query;
        }



        public IQueryable<ProductionProgramming> GetProductionProgrammingEditOpenmax(int id,int maxid)
        {
            IQueryable<ProductionProgramming> query = (from P in entities.Proc_Apparel_ProdProgrammingEditOpenmax(id, maxid)
                                                       select new ProductionProgramming
                                                       {
                                                           Id = P.id,
                                                           JobOrderNo = P.Job_Ord_No,
                                                           RefNo = P.Ref_No,
                                                           Style = P.Style,
                                                           StyleId = (int)P.Styleid,
                                                           CompanyUnit = P.CompanyUnit,
                                                           CompanyUnitId = P.CompUnitId,
                                                           Buyer = P.Buyer,
                                                           Quantity = (decimal)P.quantity,
                                                           Process = P.Process,
                                                           ProcessId = P.Processid,
                                                           ProProgNo = (P.ProdPrgNo == null ? string.Empty : P.ProdPrgNo),
                                                           ProProgId = P.ProdPrgId,
                                                           //ProProgDate = (DateTime)(P.progdate.HasValue != null ? P.progdate.Value : ((DateTime)P.progdate).Date == DateTime.Now.Date),                                                           
                                                           ProProgDate = (DateTime)(P.progdate == null ? DateTime.Now.Date : P.progdate),
                                                           //ProProgDate=P.progdate,
                                                           Iscomp = P.IsComponentProcess,
                                                           reason = P.Remarks,
                                                           PrgEdittype = P.ProgramType,
                                                           Ordertype = P.OrderType,
                                                           MaxChk = (int)P.MaxSeqNo,
                                                           Approved = P.Approved,
                                                       }).AsQueryable();
            return query;
        }



        public IQueryable<ProdPrgMas> ChkProcessOrd(int prodprgid)
        {
            IQueryable<ProdPrgMas> query = (from P in entities.Proc_Apparel_ChkProcessOrd(prodprgid)
                                            select new ProdPrgMas
                                         {
                                             ProdPrgid = (int)P.Prodprgid,
                                             ProdPrgdetid = P.Prodprgdetid
                                         }).AsQueryable();
            return query;
        }


        public IList<ProdPrgMas> GetDataRepCheckPrgIndDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetPlanPrgEntryChkDetails(ProdPrgNo, Job_ord_no, ProcessId, Itemid, Colorid, Sizeid)
                         select new ProdPrgMas
                         {
                             ProdPrgNo = YD1.processorder,
                             ProdPrgid = YD1.processordid,


                         }).AsQueryable();

            return query.ToList();
        }

        public IList<ProdPrgMas> GetDataRepCheckPrgOutDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetPlanPrgOutEntryChkDetails(ProdPrgNo, Job_ord_no, ProcessId, Itemid, Colorid, Sizeid)
                         select new ProdPrgMas
                         {
                             ProdPrgNo = YD1.processorder,
                             ProdPrgid = YD1.processordid,


                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<IOTableProcess> GetProdprgautolist(int processid, string JobNo)
        {
            IQueryable<IOTableProcess> query = (from P in entities.Proc_Apparel_ProdProgrammingAutoPrgList(processid, JobNo)
                                                select new IOTableProcess
                                                {

                                                    ColorId = (int)P.Colorid,
                                                    SizeId = (int)P.Sizeid,
                                                    ItemId = (int)P.Itemid,
                                                    Color = P.color,
                                                    Size = P.size,
                                                    Item = P.item,
                                                    PSId = P.Prodprgdetid,
                                                    Prodprgid = P.ProdPrgid,
                                                    //Prodprgdetid = P.Prodprgdetid,
                                                    prodno = P.ProdPrgNo,
                                                    ActualPlan_Qty = P.ActualPlan_Qty,
                                                    InorOut = P.InorOut,
                                                    Prog_Op_Qty = P.Prog_Op_Qty,
                                                    Quantity = P.Prog_Op_Qty,
                                                    order_qty = P.Order_Qty,
                                                    Issue_qty = P.Issue_qty,
                                                    Receipt_Qty = P.Receipt_qty,
                                                    ItemGroupId = (int)P.ItemGroupId,
                                                    uom = P.UOM,
                                                    UomId = P.uomid,
                                                    Required = "Yes",
                                                    CatType = P.CatType,
                                                    SecQty = P.SecQty,
                                                    prodpgmdate = (DateTime)P.Progdate,
                                                    Reason = P.Reason,
                                                    Remarks = P.Remarks


                                                }).AsQueryable();
            return query;
        }
    }
}
