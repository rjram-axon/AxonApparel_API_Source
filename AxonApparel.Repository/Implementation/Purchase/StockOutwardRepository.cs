using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class StockOutwardRepository : IStockOutwardRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<Domain.GenIssueDet> GetUom(int itmid)
        {
            var query = (from LADD in entities.Proc_Apparel_StockoutwrdGetUom(itmid)
                         select new Domain.GenIssueDet
                         {
                             uom = LADD.uom,
                             Uomid = LADD.UomId
                         }).AsQueryable();

            return query;
        }
        public IQueryable<Domain.GenIssueDet> GetItem(int ItemGroupid)
        {
            var query = (from LADD in entities.Proc_Apparel_GetStockOutWardItem(ItemGroupid)
                         select new Domain.GenIssueDet
                         {
                             Item = LADD.Item,
                             ItemID = LADD.ItemId
                         }).AsQueryable();
            return query;
        }
        public IQueryable<Domain.GenIssueDet> GetPurUom(int itmid)
        {
            var query = (from LADD in entities.Proc_Apparel_StockoutwrdGetPurUom(itmid)
                         select new Domain.GenIssueDet
                         {
                             uom = LADD.uom,
                             Uomid = LADD.UomId
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.GenIssueStock> GetStkDet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno, int FabReqId,string Orderno,int Styleid)
        {
            var query = (from LADD in entities.proc_StockOutwardloadstkdet(type, cmpid, itmid, colorid, sizeid, uomid, issueid, procid, stunitid, itmcat, ordno, FabReqId, Orderno, Styleid)
                         select new Domain.GenIssueStock
                         {
                             Lotno = LADD.Lotno,
                             transtype = LADD.transtype,
                             Uomid = LADD.uomid,
                             rate = (decimal)LADD.rate,
                             Style = LADD.Style,
                             JobOrderNo = LADD.JobOrderNo,
                             purOrProd = LADD.purOrProd,
                             transNo = LADD.transNo,
                             transdate = (DateTime)LADD.transdate,
                             process = LADD.process,
                             balqty = (decimal)LADD.balqty,
                             uom = LADD.abbreviation,
                             supp1 = LADD.supp1,
                             stkqty = (decimal)LADD.balqty,
                             IssStkQty = LADD.IssStkQty,
                             Stockid = LADD.stockid,
                             itemid = LADD.itemid,
                             item = LADD.item,
                             colorid = LADD.colorid,
                             color = LADD.color,
                             sizeid = LADD.sizeid,
                             size = LADD.size,
                             ItemGroupId = (int)LADD.ItemGroupId,
                             ItemGroup = LADD.ItemGroup,
                             sQty = LADD.sQty
                         }).AsQueryable();

            return query;
        }


        public int AddData(GenIssueMas objEntry)
        {
            var id = entities.GenIssueMas.Add(objEntry);
            entities.SaveChanges();
            return id.IssueId;
        }


        public bool AddDetData(GenIssueMas objmas, List<GenIssueDet> objdet, List<GenIssueStock> objstk, List<GenIssueAddless> objaddls, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int Masid = 0;
            int FabReqId = 0;
            string issuedate = objmas.IssueDate.ToString();
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    int Detid = 0;
                    //if (Mode == "Update")
                    //{
                    //    if (objdet != null && objdet.Count > 0)
                    //    {
                    //        foreach (var item in objdet)
                    //        {
                    //            id = (int)item.IssueID;

                    //        }
                    //    }
                    //    else if (unitmId > 0)
                    //    {
                    //        id = unitmId;
                    //    }

                    //    var deletedet = entities.GenIssueDet.Where(d => d.IssueID == id).ToList<GenIssueDet>();

                    //    deletedet.ForEach(c => entities.GenIssueDet.Remove(c));
                    //    entities.SaveChanges();

                    //    if (objstk != null && objstk.Count > 0)
                    //    {
                    //        foreach (var item in objstk)
                    //        {
                    //            id = (int)item.IssueId;
                    //        }
                    //    }
                    //    else if (unitmId > 0)
                    //    {
                    //        id = unitmId;
                    //    }

                    //    var deletestkdet = entities.GenIssueStock.Where(d => d.IssueId == id).ToList<GenIssueStock>();

                    //    deletestkdet.ForEach(c => entities.GenIssueStock.Remove(c));
                    //    entities.SaveChanges();



                    //    if (objaddls != null && objaddls.Count > 0)
                    //    {
                    //        foreach (var item in objstk)
                    //        {
                    //            id = (int)item.IssueId;

                    //        }
                    //    }
                    //    else if (unitmId > 0)
                    //    {
                    //        id = unitmId;
                    //    }

                    //    var deleteaddkdet = entities.GenIssueAddless.Where(d => d.IssueId == id).ToList<GenIssueAddless>();

                    //    deleteaddkdet.ForEach(c => entities.GenIssueAddless.Remove(c));
                    //    entities.SaveChanges();  
                    //}

                    entities.GenIssueMas.Add(objmas);
                    entities.SaveChanges();
                    Masid = objmas.IssueId;

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Quantity > 0)
                            {
                                item.IssueID = Masid;
                                entities.GenIssueDet.Add(item);
                                entities.SaveChanges();
                                Detid = item.IssueDetId;


                                var OQueryP = entities.Fabric_Requisition_Mas.Where(b => b.Fabric_Req_no == objmas.ReqNo).FirstOrDefault();
                                if (OQueryP != null)
                                {
                                    FabReqId = OQueryP.Fabric_Req_Masid;

                                    if (FabReqId > 0)
                                    {

                                        var AppMas = entities.Fabric_Requisition_Det.Where(c => c.Fabric_Req_Masid == FabReqId && c.Itemid == item.ItemID && c.Colorid == item.ColorID && c.Sizeid == item.SizeID).FirstOrDefault();
                                        if (AppMas != null)
                                        {
                                            AppMas.OrderQty = item.Quantity;
                                        }
                                        entities.SaveChanges();
                                    }

                                }


                                foreach (var stk in objstk)
                                {
                                    if (stk.Quantity > 0)
                                    {
                                        stk.IssueDetid = Detid;
                                        stk.IssueId = Masid;
                                        entities.GenIssueStock.Add(stk);

                                    }
                                }

                                entities.SaveChanges();
                            }
                        }

                    }


                    foreach (var stk1 in objstk)
                    {
                        if (stk1.Quantity > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdItmstk(stk1.Quantity, stk1.Stockid);
                            entities.SaveChanges();


                            var Pg8 = entities.Proc_Apparel_StockCommIssueInsertstkoutward(stk1.Stockid, objmas.UnitId, issuedate, objmas.IssueNo, "GIS", stk1.Quantity, 0, "", objmas.IssueId, objmas.UnitType, objmas.storeunitid);
                            entities.SaveChanges();

                        }


                    }

                    if (objaddls != null && objaddls.Count > 0)
                    {
                        foreach (var item in objaddls)
                        {
                            item.IssueId = Masid;
                            entities.GenIssueAddless.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "StockOutward-AddDetData");
                }
            }

            return reserved;
        }




        public bool UpdateData(GenIssueMas objUpd)
        {
            try
            {
                var result = false;
                var Upd = entities.GenIssueMas.Where(c => c.IssueId == objUpd.IssueId).FirstOrDefault();
                if (Upd != null)
                {
                    Upd.IssueId = objUpd.IssueId;
                    Upd.IssueNo = objUpd.IssueNo;
                    Upd.IssueDate = objUpd.IssueDate;
                    Upd.IssueOrRecpt = objUpd.IssueOrRecpt;
                    Upd.CompanyID = objUpd.CompanyID;
                    Upd.UnitId = objUpd.UnitId;
                    Upd.InvoiceType = objUpd.InvoiceType;
                    Upd.Remarks = objUpd.Remarks;
                    Upd.UnitType = objUpd.UnitType;
                    Upd.GrossAmount = objUpd.GrossAmount;
                    Upd.NetAmount = objUpd.NetAmount;
                    Upd.VehicleNo = objUpd.VehicleNo;
                    Upd.Processid = objUpd.Processid;
                    Upd.storeunitid = objUpd.storeunitid;
                    Upd.ToDiviid = objUpd.ToDiviid;
                    Upd.CreatedBy = objUpd.CreatedBy;
                    Upd.RequestnerId = objUpd.RequestnerId;



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
        public IQueryable<Domain.GenIssueMas> GetDataMainList(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid, int? suppid, int? procid, string fromDate, string todate)
        {
            var query = (from LADD in entities.Proc_Apparel_StockOutwardLoadMainGrid(ivtype, issueid, issueno, cmpnyid, unittype, unitid, suppid, procid, fromDate, todate)
                         select new Domain.GenIssueMas
                         {
                             IssueId = LADD.IssueID,
                             IssueNo = LADD.IssueNo,
                             IssueDate = LADD.Issuedate,
                             CompanyID = LADD.companyid,
                             company = LADD.Company,
                             supplierid = LADD.supplierid,
                             supplier = LADD.supplier,
                             NetAmount = (decimal)LADD.NetAmount,
                             InvoiceType = LADD.invoicetype,
                             invoice = LADD.Invtype,
                             UnitId = LADD.unitid,
                             unit = LADD.Unit,
                             ReqMasNo = LADD.ReqNo,
                             // ReqMasNo=LADD.re

                         }).AsQueryable();

            return query;
        }




        public bool DeleteData(GenIssueMas obDjmas, List<GenIssueStock> objDstk)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    int Detid = 0;
                    int IssId = 0;

                    var OQueryP = entities.GenIssueMas.Where(b => b.ReqNo == obDjmas.ReqNo).FirstOrDefault();
                    if (OQueryP != null)
                    {
                        IssId = OQueryP.IssueId;

                        if (IssId > 0)
                        {
                            var OQueryP1 = entities.GenIssueDet.Where(b => b.IssueID == IssId).FirstOrDefault();
                            if (OQueryP1 != null)
                            {
                                if (IssId > 0)
                                {
                                    var AppMas = entities.Fabric_Requisition_Det.Where(c => c.Itemid == OQueryP1.ItemID && c.Colorid == OQueryP1.ColorID && c.Sizeid == OQueryP1.SizeID).FirstOrDefault();
                                    if (AppMas != null)
                                    {
                                        AppMas.OrderQty = AppMas.OrderQty - OQueryP1.Quantity;
                                    }
                                    entities.SaveChanges();
                                }

                            }
                        }

                    }

                    if (objDstk != null && objDstk.Count > 0)
                    {
                        foreach (var stkdet in objDstk)
                        {
                            var Py = entities.Proc_Apparel_StockDeleteItmstkOutward(stkdet.Stockid, obDjmas.IssueNo);
                            entities.SaveChanges();

                            var Pg3 = entities.Proc_Apparel_ItemStockOutUpdate(stkdet.Stockid, obDjmas.IssueId);
                            entities.SaveChanges();
                        }
                    }


                    var deleteadls = entities.GenIssueAddless.Where(d => d.IssueId == obDjmas.IssueId).ToList<GenIssueAddless>();
                    deleteadls.ForEach(c => entities.GenIssueAddless.Remove(c));
                    entities.SaveChanges();

                    var deletestk = entities.GenIssueStock.Where(d => d.IssueId == obDjmas.IssueId).ToList<GenIssueStock>();
                    deletestk.ForEach(c => entities.GenIssueStock.Remove(c));
                    entities.SaveChanges();

                    var deletedel = entities.GenIssueDet.Where(d => d.IssueID == obDjmas.IssueId).ToList<GenIssueDet>();
                    deletedel.ForEach(c => entities.GenIssueDet.Remove(c));
                    entities.SaveChanges();

                    var deleteMas = entities.GenIssueMas.Where(d => d.IssueId == obDjmas.IssueId).ToList<GenIssueMas>();
                    deleteMas.ForEach(c => entities.GenIssueMas.Remove(c));
                    entities.SaveChanges();

                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StockOutward-DeleteData");
                }
            }
            return reserved;
        }


        public IQueryable<Domain.GenIssueMas> GetDataheaderdet(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid, int? suppid, int? procid, string fromDate, string todate)
        {
            var query = (from LADD in entities.Proc_Apparel_StockOutwardLoadHeaderdet(ivtype, issueid, issueno, cmpnyid, unittype, unitid, suppid, procid, fromDate, todate)
                         select new Domain.GenIssueMas
                         {
                             IssueId = LADD.IssueID,
                             IssueNo = LADD.IssueNo,
                             IssueDate = LADD.Issuedate,
                             CompanyID = LADD.companyid,
                             company = LADD.Company,
                             supplierid = LADD.supplierid,
                             supplier = LADD.supplier,
                             NetAmount = (decimal)LADD.NetAmount,
                             InvoiceType = LADD.invoicetype,
                             invoice = LADD.Invtype,
                             UnitId = LADD.unitid,
                             unit = LADD.Unit,
                             Remarks = LADD.Remarks,
                             RequestnerId = LADD.Requestnerid,
                             GrossAmount = LADD.grossamount,
                             VehicleNo = LADD.vehicleno,
                             storeunitid = LADD.storeunitid,
                             ToDiviid = LADD.ToDiviid,
                             Processid = LADD.ProcessId,
                             UnitType = LADD.unittype,
                             ReqMasNo = LADD.ReqNo,
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.GenIssueDet> GetItmeditDet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno)
        {
            var query = (from LADD in entities.proc_StockOutwardloadstkdetforitmedit(type, cmpid, itmid, colorid, sizeid, uomid, issueid, procid, stunitid, itmcat, ordno)
                         select new Domain.GenIssueDet
                         {
                             //Lotno = LADD.Lotno,
                             //transtype = LADD.transtype,
                             Uomid = LADD.ItmUomid,
                             Rate = (decimal)LADD.rate,
                             //Style = LADD.Style,
                             //JobOrderNo = LADD.JobOrderNo,
                             //purOrProd = LADD.purOrProd,
                             //transNo = LADD.transNo,
                             transdate = (DateTime)LADD.transdate,
                             //process = LADD.process,
                             //balqty = LADD.balqty,
                             uom = LADD.ItmUom,
                             //supp1 = LADD.supp1,
                             stkqty = (decimal)LADD.quantity,
                             Quantity = LADD.quantity,
                             //slno = LADD.stockid,
                             ItemID = LADD.itemid,
                             Item = LADD.item,
                             ColorID = LADD.colorid,
                             color = LADD.color,
                             SizeID = LADD.sizeid,
                             size = LADD.size,
                             Itmgrpid = (int)LADD.ItemGroupId,
                             Itmgrp = LADD.ItemGroup,
                             sQty = LADD.sQty,
                             suom = LADD.ItmUom,
                             sUomId = LADD.ItmUomid,
                             IssueDetId = LADD.IssueDetId
                         }).AsQueryable();

            return query;
        }


        public IList<Domain.GenIssueAddless> GetStkoutEditAccLoad(int Id)
        {
            var query = (from AC in entities.Proc_Apparel_GetStkOutEditAcDetails(Id)
                         select new Domain.GenIssueAddless
                         {
                             GenIssueAddlessId = AC.GenIssueAddlessId,
                             IssueId = AC.IssueId,
                             Addlessid = (int)AC.AddLessID,
                             Percentage = (decimal)AC.Percentage,
                             Addless = AC.AddLess,
                             Amount = AC.Amount,
                             PlusOrMinus = AC.AddorLess

                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdDetData(GenIssueMas objUpd, List<GenIssueDet> objdet, List<GenIssueStock> objstk, List<GenIssueAddless> objaddls, string Mode, int unitmId = 0)
        {
            bool reserved = false;
            int IssId = 0;
            int FabReqId = 0;
            string issuedate = objUpd.IssueDate.ToString();
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    int id = 0;
                    int Detid = 0;


                    var OQueryP = entities.GenIssueMas.Where(b => b.ReqNo == objUpd.ReqNo).FirstOrDefault();
                    if (OQueryP != null)
                    {
                        IssId = OQueryP.IssueId;

                        if (IssId > 0)
                        {
                            var OQueryP1 = entities.GenIssueDet.Where(b => b.IssueID == IssId).FirstOrDefault();
                            if (OQueryP1 != null)
                            {
                                if (IssId > 0)
                                {
                                    var AppMas = entities.Fabric_Requisition_Det.Where(c => c.Itemid == OQueryP1.ItemID && c.Colorid == OQueryP1.ColorID && c.Sizeid == OQueryP1.SizeID).FirstOrDefault();
                                    if (AppMas != null)
                                    {
                                        AppMas.OrderQty = AppMas.OrderQty - OQueryP1.Quantity;
                                    }
                                    entities.SaveChanges();
                                }

                            }
                        }

                    }

                    if (objstk != null && objstk.Count > 0)
                    {
                        foreach (var stkdet in objstk)
                        {
                            var Py = entities.Proc_Apparel_StockDeleteItmstkOutward(stkdet.Stockid, objUpd.IssueNo);
                            entities.SaveChanges();

                            var Pg3 = entities.Proc_Apparel_ItemStockOutUpdate(stkdet.Stockid, objUpd.IssueId);
                            entities.SaveChanges();
                        }
                    }


                    var result = false;
                    var Upd = entities.GenIssueMas.Where(c => c.IssueId == objUpd.IssueId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.IssueId = objUpd.IssueId;
                        Upd.IssueNo = objUpd.IssueNo;
                        Upd.IssueDate = objUpd.IssueDate;
                        Upd.IssueOrRecpt = objUpd.IssueOrRecpt;
                        Upd.CompanyID = objUpd.CompanyID;
                        Upd.UnitId = objUpd.UnitId;
                        Upd.InvoiceType = objUpd.InvoiceType;
                        Upd.Remarks = objUpd.Remarks;
                        Upd.UnitType = objUpd.UnitType;
                        Upd.GrossAmount = objUpd.GrossAmount;
                        Upd.NetAmount = objUpd.NetAmount;
                        Upd.VehicleNo = objUpd.VehicleNo;
                        Upd.Processid = objUpd.Processid;
                        Upd.storeunitid = objUpd.storeunitid;
                        Upd.ToDiviid = objUpd.ToDiviid;
                        Upd.CreatedBy = objUpd.CreatedBy;
                        Upd.RequestnerId = objUpd.RequestnerId;



                        entities.SaveChanges();
                        result = true;
                    }

                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            id = (int)item.IssueID;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletedet = entities.GenIssueDet.Where(d => d.IssueID == id).ToList<GenIssueDet>();

                    deletedet.ForEach(c => entities.GenIssueDet.Remove(c));
                    entities.SaveChanges();

                    if (objstk != null && objstk.Count > 0)
                    {
                        foreach (var item in objstk)
                        {
                            id = (int)item.IssueId;
                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deletestkdet = entities.GenIssueStock.Where(d => d.IssueId == id).ToList<GenIssueStock>();

                    deletestkdet.ForEach(c => entities.GenIssueStock.Remove(c));
                    entities.SaveChanges();



                    if (objaddls != null && objaddls.Count > 0)
                    {
                        foreach (var item in objstk)
                        {
                            id = (int)item.IssueId;

                        }
                    }
                    else if (unitmId > 0)
                    {
                        id = unitmId;
                    }

                    var deleteaddkdet = entities.GenIssueAddless.Where(d => d.IssueId == id).ToList<GenIssueAddless>();

                    deleteaddkdet.ForEach(c => entities.GenIssueAddless.Remove(c));
                    entities.SaveChanges();




                    if (objdet != null && objdet.Count > 0)
                    {
                        foreach (var item in objdet)
                        {
                            if (item.Quantity > 0)
                            {
                                item.IssueID = objUpd.IssueId;
                                entities.GenIssueDet.Add(item);
                                entities.SaveChanges();
                                Detid = item.IssueDetId;

                                var OQueryP2 = entities.Fabric_Requisition_Mas.Where(b => b.Fabric_Req_no == objUpd.ReqNo).FirstOrDefault();
                                if (OQueryP2 != null)
                                {
                                    FabReqId = OQueryP2.Fabric_Req_Masid;

                                    if (FabReqId > 0)
                                    {

                                        var AppMas = entities.Fabric_Requisition_Det.Where(c => c.Fabric_Req_Masid == FabReqId && c.Itemid == item.ItemID && c.Colorid == item.ColorID && c.Sizeid == item.SizeID).FirstOrDefault();
                                        if (AppMas != null)
                                        {
                                            AppMas.OrderQty = item.Quantity;
                                        }
                                        entities.SaveChanges();
                                    }

                                }
                                foreach (var stk in objstk)
                                {
                                    if (stk.Quantity > 0)
                                    {
                                        stk.IssueDetid = Detid;
                                        stk.IssueId = objUpd.IssueId;
                                        entities.GenIssueStock.Add(stk);

                                    }
                                }

                                entities.SaveChanges();
                            }
                        }

                    }


                    foreach (var stk1 in objstk)
                    {
                        if (stk1.Quantity > 0)
                        {
                            var Pg3 = entities.Proc_Apparel_ProcIssUpdItmstk(stk1.Quantity, stk1.Stockid);
                            entities.SaveChanges();


                            var Pg8 = entities.Proc_Apparel_StockCommIssueInsertstkoutward(stk1.Stockid, objUpd.UnitId, issuedate, objUpd.IssueNo, "GIS", stk1.Quantity, 0, "", objUpd.IssueId, objUpd.UnitType, objUpd.storeunitid);
                            entities.SaveChanges();

                        }


                    }


                    if (objaddls != null && objaddls.Count > 0)
                    {
                        foreach (var item in objaddls)
                        {
                            item.IssueId = objUpd.IssueId;
                            entities.GenIssueAddless.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "StockOutward-UpdDetData");
                }
            }

            return reserved;
        }


        public IQueryable<Domain.GenIssueDet> RepItmReqDet(int ReqMasId)
        {
            var query = (from LADD in entities.Proc_Apparel_FabricReqItemLoadStockOut(ReqMasId)
                         select new Domain.GenIssueDet
                         {

                             Uomid = (int)LADD.uomid,
                             Rate = (decimal)LADD.Rate,
                             uom = LADD.uom,
                             stkqty = (decimal)LADD.Stock,
                             Quantity = (decimal)LADD.ReqWt,
                             ItemID = (int)LADD.itemid,
                             Item = LADD.item,
                             ColorID = (int)LADD.colorid,
                             color = LADD.color,
                             SizeID = (int)LADD.sizeid,
                             size = LADD.size,
                             Itmgrpid = (int)LADD.Itemgroupid,
                             Itmgrp = LADD.ItemGroup,
                             sQty = LADD.SecQty,
                             suom = LADD.Suom,
                             sUomId = (int)LADD.uomid,
                             IssueDetId = LADD.IssueDetid,
                             slno=(int)LADD.Snumb,
                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.GenIssueMas> GetDataRepReqNoList()
        {
            var query = (from LADD1 in entities.Proc_Apparel_FabricReqNoLoadStockOut()
                         select new Domain.GenIssueMas
                         {
                             ReqMasId = LADD1.Fabric_Req_Masid,
                             ReqMasNo = LADD1.Fabric_Req_no,

                         }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.GenIssueMas> GetDataEditRepReqNoList(string ReqNo)
        {
            var query = (from LADD1 in entities.Proc_Apparel_FabricReqNoEditLoadStockOut(ReqNo)
                         select new Domain.GenIssueMas
                         {
                             ReqMasId = LADD1.Fabric_Req_Masid,
                             ReqMasNo = LADD1.Fabric_Req_no,

                         }).AsQueryable();

            return query;
        }
    }
}
