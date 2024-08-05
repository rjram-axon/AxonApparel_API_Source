using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class SpecialRequisitionAddRepository : ISpecialRequisitionAddRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.SpecialRequisition> GetordernoDetails(int cmpid, string unit)
        {
            var query = (from LADD in entities.Proc_Apparel_Specialreqloadordno(cmpid, unit)
                         select new Domain.SpecialRequisition
                         {
                             orderno = LADD.Order_No,
                             buymasid = LADD.Buy_Ord_MasId
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.SpecialRequisition> GetrefnoDetails(int cmpid, string orderno, string unit)
        {
            var query = (from LADD in entities.Proc_Apparel_Specialreqloadrefno(cmpid, orderno, unit)
                         select new Domain.SpecialRequisition
                         {
                             refno = LADD.Ref_No,
                             buymasid = LADD.Buy_Ord_MasId
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.SpecialRequisition> GetstyleDetails(int cmpid, string orderno, string refno, string unit)
        {
            var query = (from LADD in entities.Proc_Apparel_Specialreqloadstyle(cmpid, orderno, refno, unit)
                         select new Domain.SpecialRequisition
                         {
                             styleid = LADD.StyleId,
                             style = LADD.Style
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.SpecialRequisition> GetwrknoDetails(int cmpid, string orderno, string refno, int styleid, string unit)
        {
            var query = (from LADD in entities.Proc_Apparel_Specialreqloadwrkordno(cmpid, orderno, refno, styleid, unit)
                         select new Domain.SpecialRequisition
                         {
                             jobid = LADD.ID,
                             jobordno = LADD.Job_ord_No
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.SpecialRequisition> GetitmgrpDetails(string jbno)
        {
            var query = (from LADD in entities.Proc_Apparel_Specialreqloaditemgrp(jbno)
                         select new Domain.SpecialRequisition
                         {
                             itmgrp = LADD.ItemGroup,
                             itmgrpid = LADD.Id
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.SpecialReqDet> GetgridDetails(string jborderno, string orderno, string refno, int styleid)
        {
            var query = (from LADD in entities.Proc_Apparel_Specialreqloadgrid(jborderno, orderno, refno, styleid)
                         select new Domain.SpecialReqDet
                         {
                             sno = (long)LADD.Snumb,
                             Itemid = LADD.itemid,
                             item = LADD.Item,
                             Colorid = LADD.colorid,
                             color = LADD.Color,
                             Sizeid = LADD.sizeid,
                             size = LADD.Size,
                             UOMid = (int)LADD.uomid,
                             uom = LADD.uom,
                             Quantity = LADD.Quantity,
                             itmgrpid = (int)LADD.ItemGroupId,
                             itmgrp = LADD.ItemType,
                             Spl_Req_Detid = LADD.Spl_Req_Detid,
                             ToPurUOM = (decimal)LADD.ToPurUom,
                             Pur_UOMid = (int)LADD.Pur_Uomid,
                             puruom = LADD.puruom,
                             Conv_Mode = LADD.Conv_mode,
                             planned="P"
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.SpecialReqDet> GetjobgridDetails(string jborderno, string orderno, string refno, int styleid)
        {
            var query = (from LADD in entities.Proc_Apparel_Specialreqloadgridjob(jborderno, orderno, refno, styleid)
                         select new Domain.SpecialReqDet
                         {
                             sno = (long)LADD.Snumb,
                             Itemid = LADD.itemid,
                             item = LADD.Item,
                             Colorid = LADD.colorid,
                             color = LADD.Color,
                             Sizeid = LADD.sizeid,
                             size = LADD.Size,
                             UOMid = (int)LADD.uomid,
                             uom = LADD.uom,
                             Quantity = LADD.Quantity,
                             itmgrpid = (int)LADD.ItemGroupId,
                             itmgrp = LADD.ItemType,
                             Spl_Req_Detid = LADD.Spl_Req_Detid,
                             ToPurUOM = (decimal)LADD.ToPurUom,
                             Pur_UOMid = (int)LADD.Pur_Uomid,
                             puruom = LADD.puruom,
                             Conv_Mode = LADD.Conv_mode,
                             planned ="P"
                         }).AsQueryable();

            return query;
        }


        public int AddData(Special_Req_Mas objEntry)
        {
            var id = entities.Special_Req_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.Spl_Reqid;
        }

        public bool AddDetData(Special_Req_Mas objEntry, List<Special_Req_Det> objsplDet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    //if (Mode == "Update")
                    //{
                    //    if (objsplDet != null && objsplDet.Count > 0)
                    //    {
                    //        foreach (var item in objsplDet)
                    //        {
                    //            id = (int)item.Spl_Reqid;

                    //        }
                    //    }
                    //    else if (unitmId > 0)
                    //    {
                    //        id = unitmId;
                    //    }

                    //    var deletedet = entities.Special_Req_Det.Where(d => d.Spl_Reqid == id).ToList<Special_Req_Det>();

                    //    deletedet.ForEach(c => entities.Special_Req_Det.Remove(c));
                    //    entities.SaveChanges();
                    //}

                    entities.Special_Req_Mas.Add(objEntry);
                    entities.SaveChanges();
                    Masid = objEntry.Spl_Reqid;
                    if (objsplDet != null && objsplDet.Count > 0)
                    {
                        foreach (var item in objsplDet)
                        {
                            item.Spl_Reqid = Masid;
                            entities.Special_Req_Det.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "SpecialRequisition-AddDetData");
                }
            }
            return reserved;
        }


        public bool UpdateData(Special_Req_Mas objupd)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.Special_Req_Mas.Where(c => c.Spl_Reqid == objupd.Spl_Reqid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Spl_Reqid = objupd.Spl_Reqid;
                        Upd.Spl_Req_No = objupd.Spl_Req_No;
                        Upd.Spl_Req_Date = objupd.Spl_Req_Date;
                        Upd.Ref_Date = objupd.Ref_Date;
                        Upd.Ref_No = objupd.Ref_No;
                        Upd.Job_Ord_No = objupd.Job_Ord_No;
                        Upd.Companyid = objupd.Companyid;
                        Upd.CompanyUnitid = objupd.CompanyUnitid;
                        Upd.Req_Remarks = objupd.Req_Remarks;
                        Upd.Req_Commit_Cancel = objupd.Req_Commit_Cancel;
                        Upd.App_Amend = objupd.App_Amend;
                        Upd.App_By = objupd.App_By;
                        Upd.App_Commit_Cancel = objupd.App_Commit_Cancel;
                        Upd.App_Date = objupd.App_Date;
                        Upd.App_Remarks = objupd.App_Remarks;
                        Upd.Auto_Manual = objupd.Auto_Manual;
                        Upd.OrderType = objupd.OrderType;
                        Upd.Unit_Or_Other = objupd.Unit_Or_Other;
                        Upd.Type = objupd.Type;
                        Upd.CreatedBy = objupd.CreatedBy;


                        entities.SaveChanges();
                        result = true;
                    }





                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return reserved;
        }


        public bool DeleteData(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var deletedet = entities.Special_Req_Det.Where(d => d.Spl_Reqid == id).ToList<Special_Req_Det>();
                    deletedet.ForEach(c => entities.Special_Req_Det.Remove(c));
                    entities.SaveChanges();


                    var deleteMas = entities.Special_Req_Mas.Where(d => d.Spl_Reqid == id).ToList<Special_Req_Mas>();
                    deleteMas.ForEach(c => entities.Special_Req_Mas.Remove(c));
                    entities.SaveChanges();

                    entities.SaveChanges();
                    reserved = true; txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "SpecialRequisition-DeleteData");
                }
            }
            return reserved;
        }





        public IQueryable<Domain.SpecialReqDet> GeteditgridDetails(int reqid)
        {
            var query = (from LADD in entities.Proc_Splreqeditgrid(reqid)
                         select new Domain.SpecialReqDet
                         {
                             sno = (long)LADD.Spl_Req_Detid,
                             Itemid = LADD.itemid,
                             item = LADD.Item,
                             Colorid = LADD.colorid,
                             color = LADD.Color,
                             Sizeid = LADD.sizeid,
                             size = LADD.Size,
                             UOMid = (int)LADD.uomid,
                             uom = LADD.uom,
                             Quantity = (decimal)LADD.Quantity,
                             itmgrpid = (int)LADD.ItemGroupId,
                             itmgrp = LADD.ItemType,
                             Spl_Req_Detid = LADD.Spl_Req_Detid,
                             ToPurUOM = (decimal)LADD.ToPurUom,
                             Pur_UOMid = (int)LADD.Pur_Uomid,
                             puruom = LADD.puruom,
                             Conv_Mode = LADD.Conv_mode,
                             App_Qty = LADD.appqty,
                             Order_Qty = LADD.OrderQty,
                             planned=LADD.planned

                         }).AsQueryable();

            return query;
        }


        public bool UpdDetData(Special_Req_Mas objupd, List<Special_Req_Det> objsplDet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.Special_Req_Mas.Where(c => c.Spl_Reqid == objupd.Spl_Reqid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Spl_Reqid = objupd.Spl_Reqid;
                        Upd.Spl_Req_No = objupd.Spl_Req_No;
                        Upd.Spl_Req_Date = objupd.Spl_Req_Date;
                        Upd.Ref_Date = objupd.Ref_Date;
                        Upd.Ref_No = objupd.Ref_No;
                        Upd.Job_Ord_No = objupd.Job_Ord_No;
                        Upd.Companyid = objupd.Companyid;
                        Upd.CompanyUnitid = objupd.CompanyUnitid;
                        Upd.Req_Remarks = objupd.Req_Remarks;
                        Upd.Req_Commit_Cancel = objupd.Req_Commit_Cancel;
                        Upd.App_Amend = objupd.App_Amend;
                        Upd.App_By = objupd.App_By;
                        Upd.App_Commit_Cancel = objupd.App_Commit_Cancel;
                        Upd.App_Date = objupd.App_Date;
                        Upd.App_Remarks = objupd.App_Remarks;
                        Upd.Auto_Manual = objupd.Auto_Manual;
                        Upd.OrderType = objupd.OrderType;
                        Upd.Unit_Or_Other = objupd.Unit_Or_Other;
                        Upd.Type = objupd.Type;
                        Upd.CreatedBy = objupd.CreatedBy;
                        Upd.Employeeid = objupd.Employeeid;

                        entities.SaveChanges();
                        result = true;
                    }


                    //Delete det
                    if (objsplDet != null && objsplDet.Count > 0)
                    {
                        foreach (var item in objsplDet)
                        {
                            id = (int)item.Spl_Reqid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Special_Req_Det.Where(d => d.Spl_Reqid == id).ToList<Special_Req_Det>();

                    deletedet.ForEach(c => entities.Special_Req_Det.Remove(c));
                    entities.SaveChanges();

                    //Add
                    if (objsplDet != null && objsplDet.Count > 0)
                    {
                        foreach (var item in objsplDet)
                        {
                            item.Spl_Reqid = objupd.Spl_Reqid;
                            entities.Special_Req_Det.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "SpecialRequisition-UpdDetData");
                }
            }
            return reserved;
        }
        public bool AppUpdDetData(Special_Req_Mas objupd, List<Special_Req_Det> objsplDet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.Special_Req_Mas.Where(c => c.Spl_Reqid == objupd.Spl_Reqid).FirstOrDefault();
                    if (Upd != null)
                    {
                        //Upd.Spl_Reqid = objupd.Spl_Reqid;
                        //Upd.Spl_Req_No = objupd.Spl_Req_No;
                        // Upd.Spl_Req_Date = objupd.Spl_Req_Date;
                        //Upd.Ref_Date = objupd.Ref_Date;
                        //Upd.Ref_No = objupd.Ref_No;
                        //Upd.Job_Ord_No = objupd.Job_Ord_No;
                        //Upd.Companyid = objupd.Companyid;
                        //Upd.CompanyUnitid = objupd.CompanyUnitid;
                        // Upd.Req_Remarks = objupd.Req_Remarks;
                        //Upd.Req_Commit_Cancel = objupd.Req_Commit_Cancel;
                        // Upd.App_Amend = objupd.App_Amend;
                        Upd.App_By = objupd.App_By;
                        // Upd.App_Commit_Cancel = objupd.App_Commit_Cancel;
                        Upd.App_Date = objupd.App_Date;
                        Upd.App_Remarks = objupd.App_Remarks;
                        //Upd.Auto_Manual = objupd.Auto_Manual;
                        //Upd.OrderType = objupd.OrderType;
                        // Upd.Unit_Or_Other = objupd.Unit_Or_Other;
                        //Upd.Type = objupd.Type;
                        //Upd.CreatedBy = objupd.CreatedBy;


                        entities.SaveChanges();
                        result = true;
                    }


                    //Delete det
                    if (objsplDet != null && objsplDet.Count > 0)
                    {
                        foreach (var item in objsplDet)
                        {
                            id = (int)item.Spl_Reqid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    //var deletedet = entities.Special_Req_Det.Where(d => d.Spl_Reqid == id).ToList<Special_Req_Det>();

                    //deletedet.ForEach(c => entities.Special_Req_Det.Remove(c));
                    //entities.SaveChanges();

                    ////Add
                    //if (objsplDet != null && objsplDet.Count > 0)
                    //{
                    //    foreach (var item in objsplDet)
                    //    {
                    //        item.Spl_Reqid = objupd.Spl_Reqid;
                    //        entities.Special_Req_Det.Add(item);
                    //    }
                    //    entities.SaveChanges();
                    //}


                    foreach (var j in objsplDet)
                    {
                        var d = entities.Special_Req_Det.Where(a => a.Spl_Req_Detid.Equals(j.Spl_Req_Detid)).FirstOrDefault();
                        if (d != null)
                        {

                            d.App_Qty = j.App_Qty;

                        }
                    }


                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "SpecialRequisition-UpdDetData");
                }
            }
            return reserved;
        }

        public bool AppDelDetData(Special_Req_Mas objupd, List<Special_Req_Det> objsplDet, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.Special_Req_Mas.Where(c => c.Spl_Reqid == objupd.Spl_Reqid).FirstOrDefault();
                    if (Upd != null)
                    {
                        //Upd.Spl_Reqid = objupd.Spl_Reqid;
                        //Upd.Spl_Req_No = objupd.Spl_Req_No;
                        // Upd.Spl_Req_Date = objupd.Spl_Req_Date;
                        //Upd.Ref_Date = objupd.Ref_Date;
                        //Upd.Ref_No = objupd.Ref_No;
                        //Upd.Job_Ord_No = objupd.Job_Ord_No;
                        //Upd.Companyid = objupd.Companyid;
                        //Upd.CompanyUnitid = objupd.CompanyUnitid;
                        // Upd.Req_Remarks = objupd.Req_Remarks;
                        //Upd.Req_Commit_Cancel = objupd.Req_Commit_Cancel;
                        // Upd.App_Amend = objupd.App_Amend;
                        Upd.App_By = null;
                        // Upd.App_Commit_Cancel = objupd.App_Commit_Cancel;
                        Upd.App_Date = null;
                        Upd.App_Remarks = objupd.App_Remarks;
                        //Upd.Auto_Manual = objupd.Auto_Manual;
                        //Upd.OrderType = objupd.OrderType;
                        // Upd.Unit_Or_Other = objupd.Unit_Or_Other;
                        //Upd.Type = objupd.Type;
                        //Upd.CreatedBy = objupd.CreatedBy;


                        entities.SaveChanges();
                        result = true;
                    }


                    //Delete det
                    if (objsplDet != null && objsplDet.Count > 0)
                    {
                        foreach (var item in objsplDet)
                        {
                            id = (int)item.Spl_Reqid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    //var deletedet = entities.Special_Req_Det.Where(d => d.Spl_Reqid == id).ToList<Special_Req_Det>();

                    //deletedet.ForEach(c => entities.Special_Req_Det.Remove(c));
                    //entities.SaveChanges();

                    ////Add
                    //if (objsplDet != null && objsplDet.Count > 0)
                    //{
                    //    foreach (var item in objsplDet)
                    //    {
                    //        item.Spl_Reqid = objupd.Spl_Reqid;
                    //        entities.Special_Req_Det.Add(item);
                    //    }
                    //    entities.SaveChanges();
                    //}


                    foreach (var j in objsplDet)
                    {
                        var d = entities.Special_Req_Det.Where(a => a.Spl_Req_Detid.Equals(j.Spl_Req_Detid)).FirstOrDefault();
                        if (d != null)
                        {

                            d.App_Qty = 0;

                        }
                    }


                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "SpecialRequisition-UpdDetData");
                }
            }
            return reserved;
        }
    }
}
