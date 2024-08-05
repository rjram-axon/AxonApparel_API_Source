using AxonApparel.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository.Implementation
{
    public class StockInwardAddRepository : IStockInwardAddRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.StockInward> GetjobordernoDetails(int cmpid)
        {
            var query = (from LADD in entities.Proc_Apparel_StockinwardLoadJobordno(cmpid)
                         select new Domain.StockInward
                         {
                             orderno = LADD.Order_No,
                             jobordno = LADD.Job_Ord_No,
                             style = LADD.style,
                             refno = LADD.Ref_No,
                             jobid = LADD.ID,
                             styleid = LADD.StyleId
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.StockInward> GetordernoDetails(int cmpid)
        {
            var query = (from LADD in entities.Proc_Apparel_StockinwardLoadOrdno(cmpid)
                         select new Domain.StockInward
                         {
                             orderno = LADD.Order_No,
                             refno = LADD.Ref_No,
                             Buymasid = LADD.Buy_Ord_MasId
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.StockInward> GetrefnoDetails(int cmpid)
        {
            var query = (from LADD in entities.Proc_Apparel_StockinwardLoadRefNo(cmpid)
                         select new Domain.StockInward
                         {
                             refno = LADD.Ref_No,
                             Buymasid = LADD.Buy_Ord_MasId
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.StockInward> GetitemgrpDetails(string jobordno)
        {
            var query = (from LADD in entities.Proc_Apparel_StockinwardLoadItemgrp(jobordno)
                         select new Domain.StockInward
                         {
                             itemgrp = LADD.ItemGroup,
                             itemgrpid = (int)LADD.Id
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.UnitGrnDet> GetLoadgrid(string jobordno)
        {
            var query = (from mn in entities.Proc_Apparel_Stockinwardloadgrid(jobordno)
                         select new Domain.UnitGrnDet
                         {
                             item = mn.Item,
                             itemid = (int)mn.itemid,
                             Colorid = (int)mn.colorid,
                             color = mn.color,
                             Sizeid = (int)mn.sizeid,
                             size = mn.size,
                             sno = (long)mn.Snumb,
                             UOMid = (int)mn.unitid,
                             uom = mn.unit,
                             //balqty=(decimal)mn.BalQty,
                             returnqty = 0,//(decimal)mn.Received_qty,
                             // prgqty=mn.prg_qty,
                             SecQty = 0,
                             Rate = mn.Rate,
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.StockInward> GetLoadsupplier()
        {
            var query = (from LADD in entities.Proc_Apparel_Stockinwardgetsupplier()
                         select new Domain.StockInward
                         {
                             supp = LADD.Supplier,
                             suppid = LADD.SupplierId
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.UnitGrnDet> GetLoadonprocess(string jobordno, int pid)
        {
            var query = (from mn in entities.Proc_Apparel_Stockinwardonprocess(jobordno, pid)
                         select new Domain.UnitGrnDet
                         {
                             item = mn.Item,
                             itemid = (int)mn.itemid,
                             Colorid = (int)mn.colorid,
                             color = mn.color,
                             Sizeid = (int)mn.sizeid,
                             size = mn.size,
                             sno = (long)mn.Snumb,
                             UOMid = (int)mn.unitid,
                             uom = mn.unit,
                             //balqty = (decimal)mn.BalQty,
                             returnqty = 0,//(decimal)mn.Received_qty,
                             //prgqty = mn.prg_qty,
                             Rate = mn.Rate,
                             SecQty = 0
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.UnitGrnDet> GetLoadonitmgrp(string jobordno, int itmid)
        {
            var query = (from mn in entities.Proc_Apparel_Stockinwardonitemgrp(jobordno, itmid)
                         select new Domain.UnitGrnDet
                         {
                             item = mn.Item,
                             itemid = (int)mn.itemid,
                             Colorid = (int)mn.colorid,
                             color = mn.color,
                             Sizeid = (int)mn.sizeid,
                             size = mn.size,
                             sno = (long)mn.Snumb,
                             UOMid = (int)mn.unitid,
                             uom = mn.unit,
                             //balqty = (decimal)mn.BalQty,
                             returnqty =0,// (decimal)mn.Received_qty,
                             //prgqty = mn.prg_qty,
                             Rate = mn.Rate,
                             SecQty = 0
                         }).AsQueryable();

            return query;
        }


        public int AddData(Unit_Grn_Mas objEntry)
        {
            var id = entities.Unit_Grn_Mas.Add(objEntry);
            entities.SaveChanges();
            return id.Unit_GRN_Masid;
        }


        public bool AddDetData(Unit_Grn_Mas objEntry, List<Unit_Grn_Det> objunitgrnDet, List<ItemStock> objitmstk, string Mode, int unitmId = 0)
        // public bool AddDetData(List<Unit_Grn_Det> objunitgrnDet,  string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int GrnMasid = 0;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {

                try
                {


                    entities.Unit_Grn_Mas.Add(objEntry);
                    entities.SaveChanges();
                    GrnMasid = objEntry.Unit_GRN_Masid;
                    if (objunitgrnDet != null && objunitgrnDet.Count > 0)
                    {
                        foreach (var item in objunitgrnDet)
                        {
                            item.Unit_GRN_Masid = GrnMasid;
                            entities.Unit_Grn_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    if (objitmstk != null && objitmstk.Count > 0)
                    {
                        foreach (var item in objitmstk)
                        {
                            entities.ItemStock.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "StockInward-AddDetData");
                }
            }
            return reserved;

        }


        public bool GrnDeleteData(int id)
        {
            
            bool reserved = false;
            string UrnNo;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {   //var addl = entities.buy_ord_style.Where(c => c.StyleRowid == id).FirstOrDefault();



                    var QryMas = entities.Unit_Grn_Mas.Where(b => b.Unit_GRN_Masid == id ).FirstOrDefault();
                    if (QryMas != null)
                    {
                        UrnNo = QryMas.Unit_GRN_No;

                        var ISkDet = entities.ItemStock.Where(u => u.Transno == UrnNo);

                        foreach (var sk in ISkDet)
                        {
                            entities.ItemStock.Remove(sk);
                        }
                        entities.SaveChanges();

                    }

                   


                    //delete Pro_Prg_Det Many Rows table
                    var deletedet = entities.Unit_Grn_Det.Where(d => d.Unit_GRN_Masid == id).ToList<Unit_Grn_Det>();
                    deletedet.ForEach(c => entities.Unit_Grn_Det.Remove(c));
                    entities.SaveChanges();

                    //delete Prod_Prg_Mas Many Rows table
                    var deleteMas = entities.Unit_Grn_Mas.Where(d => d.Unit_GRN_Masid == id).ToList<Unit_Grn_Mas>();
                    deleteMas.ForEach(c => entities.Unit_Grn_Mas.Remove(c));
                    entities.SaveChanges();

                    
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StockInward-GrnDeleteData");
                }
            }
            return reserved;
        }


        public IQueryable<Domain.UnitGrnMas> GetLoadgrnnoedit(int mid)
        {
            var query = (from LADD in entities.Proc_Apparel_Stockinwardeditgrnno(mid)
                         select new Domain.UnitGrnMas
                         {
                             Unit_GRN_No = LADD.Unit_GRN_No,
                             Job_Ord_No = LADD.Job_Ord_No,
                             Unit_GRN_Masid = LADD.Unit_GRN_Masid
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.UnitGrnMas> GetDataMainList(int URNMasid)
        {
            var query = (from LADD in entities.Proc_Apparel_StockInwardLoadMainedit(URNMasid)
                         select new Domain.UnitGrnMas
                         {
                             Unit_GRN_date = (DateTime)LADD.Unit_GRN_date,
                             Unit_GRN_Masid = LADD.Unit_GRN_Masid,
                             Unit_GRN_RefNo = LADD.Unit_Grn_RefNo,
                             company = LADD.Company,
                             Companyid = (int)LADD.companyid,
                             fromunitnam = LADD.From_Unit,
                             forunitnam = LADD.For_Unit,
                             ForUnit = (int)LADD.forunit,
                             FromUnit = (int)LADD.fromunit,
                             Unit_GRN_No = LADD.unit_grn_no,
                             Job_Ord_No = LADD.job_ord_no,
                             orderno = LADD.Order_No,
                             refno = LADD.Ref_No,
                             Process = LADD.Process,
                             ProcessId = (int)LADD.processid,
                             style = LADD.Style,
                             reference = LADD.Reference,
                             FromDivision = LADD.FromDivisionid,
                             ForDivision = LADD.ForDivisionid,
                             Remarks = LADD.remarks,
                             StoreUnitID = (int)LADD.GStoreUnitId,
                             BmasId = (int)LADD.BMasId,
                             JmasId = (int)LADD.JMasId,
                             ParentUnitid = LADD.Parentstoreid,
                             Storetype = LADD.StoreType,
                             StoreName = LADD.StoreName,
                            ReceiptCat=LADD.ReceiptCat,
                            UnitOrOther=LADD.UnitOrOther


                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.UnitGrnDet> GetLoadgrid(int mid, string jobordno, string type)
        {
            var query = (from st in entities.proc_StoresInward_Edit(mid, jobordno, type)
                         select new Domain.UnitGrnDet
                         {
                             Unit_GRN_Detid = (int)st.unit_grn_detID,
                             itemid = (int)st.itemid,
                             item = st.Item,
                             itmgrp = st.ItemGroup,
                             color = st.color,
                             Colorid = (int)st.colorid,
                             size = st.size,
                             Sizeid = (int)st.sizeid,
                             Supplierid = st.supplierid,
                             supplier = st.supplier,
                             UOMid = (int)st.unitid,
                             uom = st.unit,
                             Rate = (decimal)st.Rate,
                             balqty = (decimal)st.BalQty,
                             returnqty = (decimal)st.RecptQty,
                             RecptQty=st.RecptQty,
                             ItemRemarks = st.ItemRemarks,
                             prgqty = st.prg_qty,
                             SecQty = st.SecQty

                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.UnitGrnMas> GetLoadgrneditdet(string jobordno)
        {
            var query = (from LADD in entities.Proc_Apparel_Stockinwardeditdet(jobordno)
                         select new Domain.UnitGrnMas
                         {
                             Job_Ord_No = LADD.Job_Ord_No,
                             style = LADD.Style,
                             orderno = LADD.Order_No,
                             refno = LADD.Ref_No,
                             styleid = LADD.StyleId

                         }).AsQueryable();

            return query;
        }


        public bool UpdateData(Unit_Grn_Mas objupd)
        {
            try
            {
                var result = false;
                var Upd = entities.Unit_Grn_Mas.Where(c => c.Unit_GRN_Masid == objupd.Unit_GRN_Masid).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.Unit_GRN_Masid = objupd.Unit_GRN_Masid;
                    Upd.ReceiptCat = objupd.ReceiptCat;
                    Upd.Job_Ord_No = objupd.Job_Ord_No;
                    Upd.Unit_GRN_No = objupd.Unit_GRN_No;
                    Upd.Unit_GRN_date = objupd.Unit_GRN_date;
                    Upd.Unit_GRN_RefNo = objupd.Unit_GRN_RefNo;
                    Upd.Unit_GRN_RefDate = objupd.Unit_GRN_RefDate;
                    Upd.Remarks = objupd.Remarks;
                    Upd.FromUnit = objupd.FromUnit;
                    Upd.CompanyUnitid = objupd.CompanyUnitid;
                    Upd.Companyid = objupd.Companyid;
                    Upd.CommitCancel = objupd.CommitCancel;
                    Upd.ForUnit = objupd.ForUnit;
                    Upd.RecOrRet = objupd.RecOrRet;
                    Upd.UnitOrOther = objupd.UnitOrOther;
                    Upd.ProcessId = objupd.ProcessId;
                    Upd.StoreUnitID = objupd.StoreUnitID;
                    Upd.CreatedBy = objupd.CreatedBy;
                    Upd.FromDivision = objupd.FromDivision;
                    Upd.ForDivision = objupd.ForDivision;



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




        public bool UpdDetData(Unit_Grn_Mas objupd, List<Unit_Grn_Det> objunitgrnDet, List<ItemStock> objitmstk, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int id = 0;
            string UrnNo = "";
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.Unit_Grn_Mas.Where(c => c.Unit_GRN_Masid == objupd.Unit_GRN_Masid).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.Unit_GRN_Masid = objupd.Unit_GRN_Masid;
                        Upd.ReceiptCat = objupd.ReceiptCat;
                        Upd.Job_Ord_No = objupd.Job_Ord_No;
                        Upd.Unit_GRN_No = objupd.Unit_GRN_No;
                        Upd.Unit_GRN_date = objupd.Unit_GRN_date;
                        Upd.Unit_GRN_RefNo = objupd.Unit_GRN_RefNo;
                        Upd.Unit_GRN_RefDate = objupd.Unit_GRN_RefDate;
                        Upd.Remarks = objupd.Remarks;
                        Upd.FromUnit = objupd.FromUnit;
                        Upd.CompanyUnitid = objupd.CompanyUnitid;
                        Upd.Companyid = objupd.Companyid;
                        Upd.CommitCancel = objupd.CommitCancel;
                        Upd.ForUnit = objupd.ForUnit;
                        Upd.RecOrRet = objupd.RecOrRet;
                        Upd.UnitOrOther = objupd.UnitOrOther;
                        Upd.ProcessId = objupd.ProcessId;
                        Upd.StoreUnitID = objupd.StoreUnitID;
                        Upd.CreatedBy = objupd.CreatedBy;
                        Upd.FromDivision = objupd.FromDivision;
                        Upd.ForDivision = objupd.ForDivision;

                        entities.SaveChanges();
                        result = true;
                    }

                    var QryMas = entities.Unit_Grn_Mas.Where(b => b.Unit_GRN_Masid == objupd.Unit_GRN_Masid).FirstOrDefault();
                    if (QryMas != null)
                    {
                        UrnNo = QryMas.Unit_GRN_No;

                        var ISkDet = entities.ItemStock.Where(u => u.Transno == UrnNo);

                        foreach (var sk in ISkDet)
                        {
                            entities.ItemStock.Remove(sk);
                        }
                        entities.SaveChanges();

                    }

                    if (objunitgrnDet != null && objunitgrnDet.Count > 0)
                    {
                        foreach (var item in objunitgrnDet)
                        {
                            id = (int)item.Unit_GRN_Masid;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.Unit_Grn_Det.Where(d => d.Unit_GRN_Masid == id).ToList<Unit_Grn_Det>();

                    deletedet.ForEach(c => entities.Unit_Grn_Det.Remove(c));
                    entities.SaveChanges();


                    //if (objitmstk != null && objitmstk.Count > 0)
                    //{
                    //    foreach (var item in objitmstk)
                    //    {
                    //        id = (int)item.StockId;

                    //    }
                    //}
                    //else if (unitmId > 0)
                    //{
                    //    id = unitmId;
                    //}

                    //var deletedetunit = entities.ItemStocks.Where(d => d.StockId == id).ToList<ItemStock>();

                    //deletedetunit.ForEach(c => entities.ItemStocks.Remove(c));
                    //entities.SaveChanges();

                    if (objunitgrnDet != null && objunitgrnDet.Count > 0)
                    {
                        foreach (var item in objunitgrnDet)
                        {
                            item.Unit_GRN_Masid = objupd.Unit_GRN_Masid;
                            entities.Unit_Grn_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    if (objitmstk != null && objitmstk.Count > 0)
                    {
                        foreach (var item in objitmstk)
                        {
                            entities.ItemStock.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "StockInward-UpdDetData");
                }
            }
            return reserved;
        }
    }
}
