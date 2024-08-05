using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AxonApparel.Domain;
using System.Data.Objects;
using System.Data.Entity.Validation;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class CuttingOrderReturnRepository : ICuttingOrderReturnRepository
    {
        ProductionEntities entities = new ProductionEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<CuttingReturn> GetCuttingReturnDetails(int CompanyId, int CompanyUnitId, string OrdType, string refno, int styleid, string OrderNo, int buyerid, string jobordno, string inorext)
        {
            IQueryable<CuttingReturn> query = (from T in entities.Proc_Apparel_GetCuttingReturnDetails(CompanyId, CompanyUnitId, OrdType, refno, styleid, OrderNo, buyerid, jobordno, inorext)
                                               select new CuttingReturn
                                               {
                                                   JobOrderNo = T.joborderno,
                                                   CuttingOrdid = T.CuttingOrdid,
                                                   CuttingOrderNo = T.CuttingOrderNo,
                                                   Cuttingissueid = T.CutIssid,
                                                   CuttingIssueNo = T.CutIssNo,
                                                   CuttingIssueDate = (DateTime)T.CuttingIssueDate,
                                                   OrderType = T.OrderType,
                                                   style = T.Style,
                                                   Processor = T.Processor,
                                                   IssueQty = (decimal)T.IssueQty,
                                                   Balance = (decimal)T.Balance,
                                               }).AsQueryable();
            return query;
        }

        public IQueryable<CuttingReturn> GetCuttingReturnHeaderDetails(string JobOrdNo)
        {
            IQueryable<CuttingReturn> query = (from T in entities.Proc_Apparel_GetCuttingReturnInnerDetails(JobOrdNo)
                                               select new CuttingReturn
                                               {
                                                   Company = T.company,
                                                   CompanyUnit = T.CompanyUnit,
                                                   style = T.Style,
                                                   OrderNo = T.Order_No,
                                                   RefNo = T.Ref_No,
                                               }).AsQueryable();
            return query;
        }

        public IQueryable<CuttingReturnDetail> GetCuttingReturnDetDetails(int IssueId)
        {
            IQueryable<CuttingReturnDetail> query = (from T in entities.Proc_Apparel_GetReturnInnerDetail(IssueId)
                                                     select new CuttingReturnDetail
                                                     {
                                                         CuttingIssueId = T.CuttingIssueId,
                                                         Item = T.Item,
                                                         Itemid = T.Itemid,
                                                         Color = T.Color,
                                                         Colorid = T.Colorid,
                                                         Size = T.Size,
                                                         Sizeid = T.sizeid,
                                                         Uom = T.UOM,
                                                         Balanceqty = (decimal)T.Balance,
                                                         Issueqty = T.IssueQty,
                                                         CuttingIssueDetid = T.CuttingIssueDetid,
                                                         CuttingIssueStckid = T.CuttingIssueStockid,
                                                         Allotedqty = T.Allotedqty,
                                                         Returnqty = T.Returnqty,
                                                         Lossqty = T.Lossqty,
                                                         CancelQty = T.CancelQty,
                                                         Secqty = T.SecQty,
                                                         InorOut = "I",
                                                         CuttingOrdDetid = T.CuttingOrdDetid,
                                                         RecQty = T.Recptqty
                                                     }).AsQueryable();
            return query;
        }


        public IQueryable<Domain.Cutting_Wastage_Det> ListCuttingReturnWastageDetailsEdit(int RetId)
        {

            var cuttingordid = 0;


            IQueryable<Domain.Cutting_Wastage_Det> query = (from T in entities.Proc_Apparel_GetCuttingWastageEditdet(RetId)
                                                            select new Domain.Cutting_Wastage_Det
                                                     {
                                                         WastageDetId = T.WastageDetId,
                                                         CuttingIsuuedetId = T.CuttingIsuuedetId,
                                                         ItemId = T.ItemId,
                                                         ColorId = T.ColorId,
                                                         UOMId = T.UOMId,
                                                         SizeId = T.SizeId,
                                                         Quantity = T.Quantity,
                                                         Rate = T.Rate,
                                                         CuttingReturnid = T.CuttingReturnid,
                                                         NewStockId = T.NewStockId,
                                                         Item = T.item,
                                                         Color = T.color,
                                                         UOM = T.Uom,
                                                         Size = T.size,
                                                     }).AsQueryable();
            return query;
        }



        public IQueryable<CuttingReturnDetail> GetCuttingReturnOpDetDetails(int IssueId)
        {

            var cuttingordid = 0;
            var OQuery = entities.Cutting_Issue_Mas.Where(b => b.CuttingIssueId == IssueId).FirstOrDefault();
            if (OQuery != null)
            {
                cuttingordid = (int)OQuery.CuttingOrdid;
            }

            IQueryable<CuttingReturnDetail> query = (from T in entities.Proc_Apparel_GetCuttingRetOpAdd(cuttingordid)
                                                     select new CuttingReturnDetail
                                                     {
                                                         CuttingOrdid = T.CuttingOrdId,
                                                         Item = T.Item,
                                                         Itemid = (int)T.ItemId,
                                                         Color = T.Color,
                                                         Colorid = (int)T.Colorid,
                                                         Size = T.Size,
                                                         Sizeid = (int)T.Sizeid,
                                                         Balanceqty = (decimal)T.BalQty,
                                                         RecQty = T.RecQty,
                                                         CuttingOrdDetid = T.CuttingOrdDetid,
                                                         CancelQty = T.CancelQty,
                                                         Secqty = T.SecQty,
                                                         OrdQty = (decimal)T.OrderQty,
                                                         InorOut = "O"
                                                     }).AsQueryable();
            return query;
        }

        public IQueryable<CuttingReturnDetail> GetCuttingReturnOpDetEditDetails(int IssueId, int RetId)
        {
            var cuttingordid = 0;
            var OQuery = entities.Cutting_Issue_Mas.Where(b => b.CuttingIssueId == IssueId).FirstOrDefault();
            if (OQuery != null)
            {
                cuttingordid = (int)OQuery.CuttingOrdid;
            }


            IQueryable<CuttingReturnDetail> query = (from T in entities.Proc_Apparel_GetCuttingRetOpEdit(cuttingordid, RetId)
                                                     select new CuttingReturnDetail
                                                     {
                                                         CuttingOrdid = T.CuttingOrdId,
                                                         Item = T.Item,
                                                         Itemid = (int)T.ItemId,
                                                         Color = T.Color,
                                                         Colorid = (int)T.Colorid,
                                                         Size = T.Size,
                                                         Sizeid = (int)T.Sizeid,
                                                         OrdQty = (decimal)T.OrderQty,
                                                         Balanceqty = (decimal)T.BalQty,
                                                         RecQty = T.RecQty,
                                                         CuttingOrdDetid = T.CuttingOrdDetid,
                                                         CancelQty = (decimal)T.CancelQty,
                                                         Secqty = (decimal)T.SecQty,
                                                         InorOut = "O",
                                                         Cutting_Cancel_Detid = T.Cutting_Cancel_Detid
                                                     }).AsQueryable();
            return query;
        }



        public int AddData(CuttingReturn objAdd, List<Domain.CuttingReturnDetail> ReturnDet, List<Cutting_Wastage_Det> Wastedet)
        {

            bool reserved = false;
            int ReturnMasid = 0;
            string ReturnNo = "";
            int cuttingordid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {


                try
                {


                    cuttingordid = objAdd.CuttingOrdid;


                    ObjectParameter objParam = new ObjectParameter("LastInsertedRecordID", typeof(int));

                    var id = entities.Proc_Apparel_CuttingReturnMasInsert(objAdd.Cuttingissueid, objAdd.CuttingOrdid, objAdd.CuttingReturnNo, objAdd.CuttingReturnDate, objAdd.Remarks,
                                                                        objAdd.ToLocation, objAdd.RetLocType, objAdd.Createdby, objParam);

                    entities.SaveChanges();

                    id = Convert.ToInt16(objParam.Value);

                    Cutting_Cancel_mas cancel = new Cutting_Cancel_mas()
                    {
                        Cutting_Cancel_no = objAdd.Cutting_Cancel_no,
                        Cutting_Cancel_date = Convert.ToDateTime(objAdd.Cutting_Cancel_date),
                        Cancel_Ref_no = objAdd.Cancel_Ref_no,
                        Cancel_Ref_date = Convert.ToDateTime(objAdd.Cancel_Ref_date),
                        CancelOrClose = objAdd.CancelOrClose,
                        CuttingReturnId = id,

                    };

                    var cd = entities.Cutting_Cancel_mas.Add(cancel);
                    entities.SaveChanges();

                    ReturnMasid = id;


                    // var cuttingreturnresult = AddCuttingReceiptDet(ReturnDet, "Add");

                    //foreach (var item in ReturnDet)
                    //{
                    // retid = ReturnMasid;
                    //}
                    var CuttingdetList = new List<Cutting_Return_det>();

                    var CanceldetList = new List<Cutting_Cancel_det>();

                    foreach (var item in ReturnDet)
                    {
                        if (item.InorOut == "I")
                        {
                            CuttingdetList.Add(new Repository.Cutting_Return_det
                            {
                                CuttingReturnId = ReturnMasid,
                                CuttingIssueDetId = item.CuttingIssueDetid,
                                itemid = item.Itemid,
                                colorid = item.Colorid,
                                sizeid = item.Sizeid,
                                ReturnQty = item.Returnqty,
                                LossQty = item.Lossqty,
                                CuttingIssueStockid = item.CuttingIssueStckid,
                                SecQty = item.Secqty,
                            });
                        }
                    }

                    foreach (var issuelst in CuttingdetList)
                    {
                        entities.Cutting_Return_det.Add(issuelst);
                    }
                    entities.SaveChanges();

                    var masid = entities.Cutting_Cancel_mas.Where(c => c.CuttingReturnId == ReturnMasid).FirstOrDefault();
                    if (masid != null)
                    {

                        foreach (var item in ReturnDet)
                        {
                            CanceldetList.Add(new Repository.Cutting_Cancel_det
                            {

                                Cutting_Cancel_Detid = item.Cutting_Cancel_Detid,
                                Cutting_Cancel_Masid = item.Cutting_Cancel_Masid,
                                CuttingOrdId = objAdd.CuttingOrdid,
                                itemid = item.Itemid,
                                sizeid = item.Sizeid,
                                colorid = item.Colorid,
                                Canceled_qty = item.CancelQty,
                                Sec_Qty = item.Secqty,
                                InorOut = item.InorOut,
                                PlannedSizeid = item.Sizeid,
                                CuttingOrdDetid = item.CuttingOrdDetid,

                            });
                        }
                    }


                    foreach (var issuelst2 in CanceldetList)
                    {
                        issuelst2.Cutting_Cancel_Masid = masid.Cutting_Cancel_masid;
                        entities.Cutting_Cancel_det.Add(issuelst2);
                    }

                    entities.SaveChanges();



                    //var cuttingreturnresult =AddCuttingWastageDet(wasteList, "Add");

                    foreach (var list in Wastedet)
                    {
                        list.CuttingReturnid = ReturnMasid;
                        entities.Cutting_Wastage_Det.Add(list);
                    }

                    entities.SaveChanges();


                    //Stock Updation
                    // StockStatus = UpdateCuttingReturnTables(CuttingReturnAdd.CuttingReturnNo, "Add");
                    var cuttingreturnno = entities.Cutting_Return_Mas.Where(c => c.CuttingReturnId == id).Select(d => d.CuttingReturnNo).First();
                    var updatebundleqty = entities.Proc_Apparel_UpdateCuttingReturn(cuttingreturnno, "A");
                    var updatecancelqty = entities.Proc_Apparel_UpdateCuttingCancel(cuttingreturnno, "A");
                    var updatewasteqty = entities.Proc_Apparel_UpdateCuttingReturnWastage(cuttingreturnno, "A");

                    entities.SaveChanges();
                    txscope.Complete();
                    return ReturnMasid;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CuttingRetrunr-AddDetData");
                    return ReturnMasid = 0; ;
                    // throw ex;
                }
            }
        }


        public int UpdateData(CuttingReturn objUpd, List<Cutting_Wastage_Det> Wastedet)
        {

            bool reserved = false;
            int ReturnMasid = 0;
            string ReturnNo = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {


                try
                {
                    ReturnNo = objUpd.CuttingReturnNo;
                    ReturnMasid = objUpd.CuttingReturnid;
                    //Stock Updation
                    // StockStatus = UpdateCuttingReturnTables(CuttingOrderUpd.CuttingReturnNo, "Edit");

                    var updatebundleqtyD = entities.Proc_Apparel_UpdateCuttingReturn(ReturnNo, "D");
                    var updatecancelqty = entities.Proc_Apparel_UpdateCuttingCancel(ReturnNo, "D");
                    entities.SaveChanges();



                    //Update Cutting_Return_Mas and Cutting_Return_Det Begin
                    var App = entities.Cutting_Return_Mas.Where(c => c.CuttingReturnId == objUpd.CuttingReturnid).FirstOrDefault();
                    if (App != null)
                    {
                        App.Remarks = objUpd.Remarks;
                        App.ToLocation = objUpd.ToLocation;
                        App.RetLocType = objUpd.RetLocType;
                    }
                    entities.SaveChanges();

                    var cuttingList = new List<Cutting_Return_det>();

                    cuttingList = entities.Cutting_Return_det.Where(c => c.CuttingReturnId == objUpd.CuttingReturnid).ToList();

                    if (cuttingList != null)
                    {
                        foreach (var item in cuttingList)
                        {
                            //foreach (var newitem in objUpd.cuttingorddet.Where(e => e.CuttingOrderDetId == e.CuttingOrderDetId))
                            foreach (var newitem in (objUpd.CuttingReturnDetail.Where(e => e.CuttingReturnDetId == item.CuttingReturnDetId)))
                            {
                                item.ReturnQty = (decimal)newitem.Returnqty;
                                item.LossQty = newitem.Lossqty;
                            }
                        }
                    }
                    entities.SaveChanges();
                    //Update Cutting_Return_Mas and Cutting_Return_Det End

                    //Delete ItemStock Many Rows table
                    var ItSout = entities.ItemStock.Where(c => c.Transno == objUpd.CuttingReturnNo).FirstOrDefault();
                    if (ItSout != null)
                    {
                        var deleteitemstock = entities.ItemStock.Where(d => d.Transno == objUpd.CuttingReturnNo && d.qty == 0 && d.balQty == 0 && d.alloted == 0).ToList<ProductionItemStock>();
                        deleteitemstock.ForEach(c => entities.ItemStock.Remove(c));
                        entities.SaveChanges();
                    }


                    //delete Cutting_Wastage_Det Many Rows table

                    var wasteList = new List<Cutting_Wastage_Det>();

                    var CWD2 = entities.Cutting_Wastage_Det.Where(c => c.CuttingReturnid == objUpd.CuttingReturnid);

                    foreach (var yt in CWD2)
                    {
                        Cutting_Wastage_Det wst = new Cutting_Wastage_Det();
                        wst.NewStockId = yt.NewStockId;
                        wasteList.Add(wst);
                    }
                    var CWD = entities.Cutting_Wastage_Det.Where(c => c.CuttingReturnid == objUpd.CuttingReturnid).FirstOrDefault();

                    if (CWD != null)
                    {
                        var deletecuttingwastedet = entities.Cutting_Wastage_Det.Where(d => d.CuttingReturnid == objUpd.CuttingReturnid).ToList<Cutting_Wastage_Det>();
                        deletecuttingwastedet.ForEach(c => entities.Cutting_Wastage_Det.Remove(c));
                        entities.SaveChanges();
                    }


                    if (wasteList != null)
                    {
                        foreach (var bv in wasteList)
                        {
                            var deletecuttingwastedetst = entities.ItemStock.Where(d => d.StockId == bv.NewStockId).ToList<ProductionItemStock>();
                            deletecuttingwastedetst.ForEach(c => entities.ItemStock.Remove(c));
                            entities.SaveChanges();
                        }
                    }


                    //if (objUpd.CuttingReturnNo != null)
                    //{
                    //    var updatewasteqty = entities.Proc_Apparel_UpdateCuttingReturnWastage(objUpd.CuttingReturnNo, "D");
                    //}

                    //Update Cutting_Cancel_Mas and Cutting_Cancel_Det Begin
                    var App2 = entities.Cutting_Cancel_mas.Where(c => c.CuttingReturnId == objUpd.CuttingReturnid).FirstOrDefault();
                    if (App2 != null)
                    {
                        App2.Cutting_Cancel_date = Convert.ToDateTime(objUpd.Cutting_Cancel_date);
                        App2.Cancel_Ref_no = objUpd.Cancel_Ref_no;
                        App2.Cancel_Ref_date = Convert.ToDateTime(objUpd.Cancel_Ref_date);
                    }
                    entities.SaveChanges();

                    int cuttingcancelid = entities.Cutting_Cancel_mas.Where(c => c.CuttingReturnId == objUpd.CuttingReturnid).Select(d => d.Cutting_Cancel_masid).First();


                    var cancelList = new List<Cutting_Cancel_det>();

                    cancelList = entities.Cutting_Cancel_det.Where(c => c.Cutting_Cancel_Masid == cuttingcancelid).ToList();

                    if (cancelList != null)
                    {
                        foreach (var item in cancelList)
                        {
                            //foreach (var newitem in objUpd.cuttingorddet.Where(e => e.CuttingOrderDetId == e.CuttingOrderDetId))
                            foreach (var newitem in (objUpd.CuttingReturnDetail.Where(e => e.Cutting_Cancel_Detid == item.Cutting_Cancel_Detid)))
                            {
                                item.Canceled_qty = (decimal)newitem.CancelQty;
                                item.Sec_Qty = newitem.Secqty;
                            }
                        }
                    }
                    entities.SaveChanges();
                    //Update Cutting_Return_Mas and Cutting_Return_Det End




                    //  var cuttingreturnresult2 = AddCuttingWastageDet(wasteList2, "Add");

                    //foreach (var list in Wastedet)
                    //{
                    //    retid = (int)list.CuttingReturnid;
                    //}


                    var listdet = entities.Cutting_Wastage_Det.Where(c => c.CuttingReturnid == ReturnMasid);

                    foreach (var listd in listdet)
                    {
                        entities.Cutting_Wastage_Det.Remove(listd);
                    }
                    // var cuttingreturnresult2 = AddCuttingWastageDet(wasteList2, "Add");
                    foreach (var list in Wastedet)
                    {
                        list.CuttingReturnid = ReturnMasid;
                        entities.Cutting_Wastage_Det.Add(list);
                    }

                    entities.SaveChanges();



                    //Stock Updation
                    // StockStatus =UpdateCuttingReturnTables(CuttingOrderUpd.CuttingReturnNo, "Add");

                    var updatebundleqty = entities.Proc_Apparel_UpdateCuttingReturn(ReturnNo, "A");
                    var updatecancelqty2 = entities.Proc_Apparel_UpdateCuttingCancel(ReturnNo, "A");
                    var updatewasteqty = entities.Proc_Apparel_UpdateCuttingReturnWastage(ReturnNo, "A");


                    entities.SaveChanges();
                    txscope.Complete();
                    return ReturnMasid;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CuttingRetrunr-AddDetData");
                    return ReturnMasid = 0; ;
                    // throw ex;
                }
            }
        }




        public bool DeleteData(int id)
        {

            bool reserved = false;
            int ReturnMasid = 0;
            string ReturnNo = "";
            int cuttingordid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {


                try
                {


                    var cuttingreturnno = entities.Cutting_Return_Mas.Where(c => c.CuttingReturnId == id).Select(d => d.CuttingReturnNo).First();

                    if (cuttingreturnno != null)
                    {
                        var updatebundleqtyD = entities.Proc_Apparel_UpdateCuttingReturn(cuttingreturnno, "D");
                        var updatecancelqty = entities.Proc_Apparel_UpdateCuttingCancel(cuttingreturnno, "D");

                    }

                    //delete Cutting_cancel_det 
                    var CCD1 = entities.Cutting_Cancel_mas.Where(c => c.CuttingReturnId == id).FirstOrDefault();
                    if (CCD1 != null)
                    {
                        int cuttingcancelid = entities.Cutting_Cancel_mas.Where(c => c.CuttingReturnId == id).Select(d => d.Cutting_Cancel_masid).First();
                        var CCD = entities.Cutting_Cancel_det.Where(c => c.Cutting_Cancel_Masid == cuttingcancelid).FirstOrDefault();
                        if (CCD != null)
                        {
                            var deletecuttingcanceldet = entities.Cutting_Cancel_det.Where(d => d.Cutting_Cancel_Masid == cuttingcancelid).ToList<Cutting_Cancel_det>();
                            deletecuttingcanceldet.ForEach(c => entities.Cutting_Cancel_det.Remove(c));
                            entities.SaveChanges();
                        }
                    }

                    //delete Cutting_Return_det Many Rows table
                    var CRD = entities.Cutting_Return_det.Where(c => c.CuttingReturnId == id).FirstOrDefault();
                    if (CRD != null)
                    {
                        var deletecuttingreturndet = entities.Cutting_Return_det.Where(d => d.CuttingReturnId == id).ToList<Cutting_Return_det>();
                        deletecuttingreturndet.ForEach(c => entities.Cutting_Return_det.Remove(c));
                        entities.SaveChanges();
                    }

                    //delete Cutting_Wastage_Det Many Rows table
                    var CWD = entities.Cutting_Wastage_Det.Where(c => c.CuttingReturnid == id).FirstOrDefault();
                    if (CWD != null)
                    {
                        var deletecuttingwastedet = entities.Cutting_Wastage_Det.Where(d => d.CuttingReturnid == id).ToList<Cutting_Wastage_Det>();
                        deletecuttingwastedet.ForEach(c => entities.Cutting_Wastage_Det.Remove(c));
                        entities.SaveChanges();
                    }


                    if (cuttingreturnno != null)
                    {
                        var updatewasteqty = entities.Proc_Apparel_UpdateCuttingReturnWastage(cuttingreturnno, "D");
                    }


                    //delete Cutting_Cancel_Mas Many Rows table
                    var CCM = entities.Cutting_Cancel_mas.Where(c => c.CuttingReturnId == id).FirstOrDefault();
                    if (CCM != null)
                    {
                        var deletecuttingcanmasdet = entities.Cutting_Cancel_mas.Where(d => d.CuttingReturnId == id).ToList<Cutting_Cancel_mas>();
                        deletecuttingcanmasdet.ForEach(c => entities.Cutting_Cancel_mas.Remove(c));
                        entities.SaveChanges();
                    }

                    //delete Cutting_Return_Mas Many Rows table
                    var CRM = entities.Cutting_Return_Mas.Where(c => c.CuttingReturnId == id).FirstOrDefault();
                    if (CRM != null)
                    {
                        var deletecuttingreturnmas = entities.Cutting_Return_Mas.Where(d => d.CuttingReturnId == id).ToList<Cutting_Return_Mas>();
                        deletecuttingreturnmas.ForEach(c => entities.Cutting_Return_Mas.Remove(c));
                        entities.SaveChanges();
                    }

                    //delete Itemstock Many Rows table
                    var ITSCK = entities.ItemStock.Where(c => c.Transno == cuttingreturnno && c.alloted == 0).FirstOrDefault();
                    if (ITSCK != null)
                    {
                        var deleteitemstck = entities.ItemStock.Where(d => d.Transno == cuttingreturnno).ToList<ProductionItemStock>();
                        deleteitemstck.ForEach(c => entities.ItemStock.Remove(c));
                        entities.SaveChanges();
                    }

                    entities.SaveChanges();
                    txscope.Complete();
                    return true;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "CuttingRetrunr-DelDetData");
                    return false;
                    // throw ex;
                }
            }

        }

        public bool UpdateData(CuttingReturn objUpd)
        {
            var result = false;

            //Update Cutting_Return_Mas and Cutting_Return_Det Begin
            var App = entities.Cutting_Return_Mas.Where(c => c.CuttingReturnId == objUpd.CuttingReturnid).FirstOrDefault();
            if (App != null)
            {
                App.Remarks = objUpd.Remarks;
                App.ToLocation = objUpd.ToLocation;
                App.RetLocType = objUpd.RetLocType;
            }
            entities.SaveChanges();

            var cuttingList = new List<Cutting_Return_det>();

            cuttingList = entities.Cutting_Return_det.Where(c => c.CuttingReturnId == objUpd.CuttingReturnid).ToList();

            if (cuttingList != null)
            {
                foreach (var item in cuttingList)
                {
                    //foreach (var newitem in objUpd.cuttingorddet.Where(e => e.CuttingOrderDetId == e.CuttingOrderDetId))
                    foreach (var newitem in (objUpd.CuttingReturnDetail.Where(e => e.CuttingReturnDetId == item.CuttingReturnDetId)))
                    {
                        item.ReturnQty = (decimal)newitem.Returnqty;
                        item.LossQty = newitem.Lossqty;
                    }
                }
            }
            entities.SaveChanges();
            //Update Cutting_Return_Mas and Cutting_Return_Det End

            //Delete ItemStock Many Rows table
            var ItSout = entities.ItemStock.Where(c => c.Transno == objUpd.CuttingReturnNo).FirstOrDefault();
            if (ItSout != null)
            {
                var deleteitemstock = entities.ItemStock.Where(d => d.Transno == objUpd.CuttingReturnNo && d.qty == 0 && d.balQty == 0 && d.alloted == 0).ToList<ProductionItemStock>();
                deleteitemstock.ForEach(c => entities.ItemStock.Remove(c));
                entities.SaveChanges();
            }


            //delete Cutting_Wastage_Det Many Rows table

            var wasteList = new List<Cutting_Wastage_Det>();

            var CWD2 = entities.Cutting_Wastage_Det.Where(c => c.CuttingReturnid == objUpd.CuttingReturnid);

            foreach (var yt in CWD2)
            {
                Cutting_Wastage_Det wst = new Cutting_Wastage_Det();
                wst.NewStockId = yt.NewStockId;
                wasteList.Add(wst);
            }
            var CWD = entities.Cutting_Wastage_Det.Where(c => c.CuttingReturnid == objUpd.CuttingReturnid).FirstOrDefault();

            if (CWD != null)
            {
                var deletecuttingwastedet = entities.Cutting_Wastage_Det.Where(d => d.CuttingReturnid == objUpd.CuttingReturnid).ToList<Cutting_Wastage_Det>();
                deletecuttingwastedet.ForEach(c => entities.Cutting_Wastage_Det.Remove(c));
                entities.SaveChanges();
            }


            if (wasteList != null)
            {
                foreach (var bv in wasteList)
                {
                    var deletecuttingwastedetst = entities.ItemStock.Where(d => d.StockId == bv.NewStockId).ToList<ProductionItemStock>();
                    deletecuttingwastedetst.ForEach(c => entities.ItemStock.Remove(c));
                    entities.SaveChanges();
                }
            }


            //if (objUpd.CuttingReturnNo != null)
            //{
            //    var updatewasteqty = entities.Proc_Apparel_UpdateCuttingReturnWastage(objUpd.CuttingReturnNo, "D");
            //}

            //Update Cutting_Cancel_Mas and Cutting_Cancel_Det Begin
            var App2 = entities.Cutting_Cancel_mas.Where(c => c.CuttingReturnId == objUpd.CuttingReturnid).FirstOrDefault();
            if (App2 != null)
            {
                App2.Cutting_Cancel_date = Convert.ToDateTime(objUpd.Cutting_Cancel_date);
                App2.Cancel_Ref_no = objUpd.Cancel_Ref_no;
                App2.Cancel_Ref_date = Convert.ToDateTime(objUpd.Cancel_Ref_date);
            }
            entities.SaveChanges();

            int cuttingcancelid = entities.Cutting_Cancel_mas.Where(c => c.CuttingReturnId == objUpd.CuttingReturnid).Select(d => d.Cutting_Cancel_masid).First();


            var cancelList = new List<Cutting_Cancel_det>();

            cancelList = entities.Cutting_Cancel_det.Where(c => c.Cutting_Cancel_Masid == cuttingcancelid).ToList();

            if (cancelList != null)
            {
                foreach (var item in cancelList)
                {
                    //foreach (var newitem in objUpd.cuttingorddet.Where(e => e.CuttingOrderDetId == e.CuttingOrderDetId))
                    foreach (var newitem in (objUpd.CuttingReturnDetail.Where(e => e.Cutting_Cancel_Detid == item.Cutting_Cancel_Detid)))
                    {
                        item.Canceled_qty = (decimal)newitem.CancelQty;
                        item.Sec_Qty = newitem.Secqty;
                    }
                }
            }
            entities.SaveChanges();
            //Update Cutting_Return_Mas and Cutting_Return_Det End



            result = true;
            return result;
        }

        public bool AddCuttingReceiptDet(List<CuttingReturnDetail> objCuttingreturnDet, string Mode)
        {
            var CuttingdetList = new List<Cutting_Return_det>();

            var CanceldetList = new List<Cutting_Cancel_det>();

            var retid = 0;

            try
            {
                foreach (var item in objCuttingreturnDet)
                {
                    retid = item.CuttingReturnId;
                }

                foreach (var item in objCuttingreturnDet)
                {
                    if (item.InorOut == "I")
                    {
                        CuttingdetList.Add(new Repository.Cutting_Return_det
                        {
                            CuttingReturnId = item.CuttingReturnId,
                            CuttingIssueDetId = item.CuttingIssueDetid,
                            itemid = item.Itemid,
                            colorid = item.Colorid,
                            sizeid = item.Sizeid,
                            ReturnQty = item.Returnqty,
                            LossQty = item.Lossqty,
                            CuttingIssueStockid = item.CuttingIssueStckid,
                            SecQty = item.Secqty,
                        });
                    }
                }

                foreach (var issuelst in CuttingdetList)
                {
                    entities.Cutting_Return_det.Add(issuelst);
                }
                entities.SaveChanges();

                var masid = entities.Cutting_Cancel_mas.Where(c => c.CuttingReturnId == retid).FirstOrDefault();
                if (masid != null)
                {

                    foreach (var item in objCuttingreturnDet)
                    {
                        CanceldetList.Add(new Repository.Cutting_Cancel_det
                        {

                            Cutting_Cancel_Detid = item.Cutting_Cancel_Detid,
                            Cutting_Cancel_Masid = item.Cutting_Cancel_Masid,
                            CuttingOrdId = item.CuttingOrdid,
                            itemid = item.Itemid,
                            sizeid = item.Sizeid,
                            colorid = item.Colorid,
                            Canceled_qty = item.CancelQty,
                            Sec_Qty = item.Secqty,
                            InorOut = item.InorOut,
                            PlannedSizeid = item.Sizeid,
                            CuttingOrdDetid = item.CuttingOrdDetid,

                        });
                    }
                }


                foreach (var issuelst2 in CanceldetList)
                {
                    issuelst2.Cutting_Cancel_Masid = masid.Cutting_Cancel_masid;
                    entities.Cutting_Cancel_det.Add(issuelst2);
                }

                entities.SaveChanges();


                return true;
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
        }


        public bool AddCuttingWastageDet(List<Cutting_Wastage_Det> objCuttingreturnDet, string Mode)
        {
            int retid = 0;
            try
            {
                if (Mode == "Add")
                {
                    foreach (var list in objCuttingreturnDet)
                    {
                        entities.Cutting_Wastage_Det.Add(list);
                    }

                    entities.SaveChanges();
                }
                else
                {

                    foreach (var list in objCuttingreturnDet)
                    {
                        retid = (int)list.CuttingReturnid;
                    }


                    var listdet = entities.Cutting_Wastage_Det.Where(c => c.CuttingReturnid == retid);

                    foreach (var listd in listdet)
                    {
                        entities.Cutting_Wastage_Det.Remove(listd);
                    }


                }
                return true;
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = string.Join("; ", errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
            }
        }



        public bool UpdateCuttingReturnTables(string CuttingRetNo, string Mode)
        {
            try
            {
                if (Mode == "Add")
                {
                    var updatebundleqty = entities.Proc_Apparel_UpdateCuttingReturn(CuttingRetNo, "A");
                    var updatecancelqty = entities.Proc_Apparel_UpdateCuttingCancel(CuttingRetNo, "A");
                    var updatewasteqty = entities.Proc_Apparel_UpdateCuttingReturnWastage(CuttingRetNo, "A");
                }
                else if (Mode == "Edit")
                {

                    var updatebundleqtyD = entities.Proc_Apparel_UpdateCuttingReturn(CuttingRetNo, "D");
                    var updatecancelqty = entities.Proc_Apparel_UpdateCuttingCancel(CuttingRetNo, "D");
                    //  var updatewasteqty = entities.Proc_Apparel_UpdateCuttingReturnWastage(CuttingRetNo, "D");
                }

                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public IList<CuttingReturn> GetMainData(int ID, string OrderType, string InterExternal, string FromDate, string ToDate, string jobordno, string orderno, string RefNo, int Supplierid, int employeeid)
        {
            var query = (from a in entities.Proc_Apparel_GetCuttingReturnMainDetails(ID, InterExternal, OrderType, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), jobordno, orderno, RefNo, Supplierid, employeeid)
                         select new CuttingReturn
                         {
                             CuttingReturnid = a.CuttingReturnid,
                             CuttingReturnNo = a.CuttingReturnNo,
                             CuttingReturnDate = (DateTime)a.CuttingReturnDate,
                             Cuttingissueid = (int)a.CuttingIssueid,
                             CuttingIssueNo = a.CuttingIssueno,
                             Incharge = a.Incharge,
                             OrdType = a.ordertype,
                             JobOrderNo = a.joborderno,
                             OrderNo = a.order_no,
                             RefNo = a.ref_no,
                             Inchargeid = (int)a.employeeid,
                             Processorid = (int)a.Processorid,
                             Processor = a.Processor
                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<CuttingReturn> GetCuttingReturnHeaderInfo(int ReturnID, string JobOrdNo, string CuttingRetNo, int CuttIssueId)
        {

            string CuttNo = "";
            int CuttOrdId = 0;
            string IntorExt = "";
            int WorDivId = 0;
            string Processor = "";
            int parentunitid = 0;
            string storetype = "";
            string storename = "";
            int storeunitid = 0;


            var CuttingReturnValue = entities.Cutting_Return_Mas.Where(e => e.CuttingReturnId == ReturnID).FirstOrDefault();

            var CancelValue = entities.Cutting_Cancel_mas.Where(e => e.CuttingReturnId == ReturnID).FirstOrDefault();

            var StoreValue = entities.Proc_Apparel_GetCuttingRetStore(ReturnID);

            foreach (var sr in StoreValue)
            {
                parentunitid = sr.Parentstoreid;
                storetype = sr.StoreType;
                storename = sr.StoreName;
                storeunitid = sr.StoreUnitId;

            }


            var OQuery = entities.Cutting_Return_Mas.Where(b => b.CuttingReturnId == ReturnID).FirstOrDefault();
            if (OQuery != null)
            {
                CuttOrdId = (int)OQuery.CuttingOrdid;
            }

            var OQuery1 = entities.Cutting_Order_Mas.Where(b => b.CuttingOrdid == CuttOrdId).FirstOrDefault();
            if (OQuery1 != null)
            {
                CuttNo = OQuery1.CuttingOrderNo;
                IntorExt = OQuery1.internalorexternal;
                WorDivId = (int)OQuery1.WorkDivisionid;
            }

            if (IntorExt == "E")
            {
                var OQuery2 = entities.Supplier.Where(b => b.SupplierId == WorDivId).FirstOrDefault();
                if (OQuery2 != null)
                {
                    Processor = OQuery2.Supplier1;
                }

            }
            else
            {
                var OQuery2 = entities.WorkDivision.Where(b => b.WorkDivisionId == WorDivId).FirstOrDefault();
                if (OQuery2 != null)
                {
                    Processor = OQuery2.WorkDivision1;
                }
            }

            IQueryable<CuttingReturn> query = (from T in entities.Proc_Apparel_GetCuttingReturnMasDetailsForEdit(JobOrdNo)
                                               select new CuttingReturn
                                               {
                                                   Company = T.company,
                                                   OrderNo = T.Order_No,
                                                   style = T.Style,
                                                   CompanyUnit = T.CompanyUnit,
                                                   RefNo = T.Ref_No,
                                                   CuttingOrderNo = CuttNo,
                                                   Processor = Processor,
                                                   Remarks = (CuttingReturnValue != null ? CuttingReturnValue.Remarks : null),
                                                   ToLocation = (int)(CuttingReturnValue != null ? CuttingReturnValue.ToLocation : 0),
                                                   RetLocType = (CuttingReturnValue != null ? CuttingReturnValue.RetLocType : null),
                                                   CuttingReturnDetail = GetCuttingReturnDetForEdit(CuttingRetNo, CuttIssueId),
                                                   Cutting_Cancel_masid = (int)(CancelValue.Cutting_Cancel_masid != null ? CancelValue.Cutting_Cancel_masid : 0),
                                                   Cutting_Cancel_no = CancelValue.Cutting_Cancel_no != null ? CancelValue.Cutting_Cancel_no : "",
                                                   Cutting_Cancel_date = CancelValue.Cutting_Cancel_date.ToString() != null ? CancelValue.Cutting_Cancel_date.ToString() : "",

                                                   Cancel_Ref_no = CancelValue.Cancel_Ref_no != null ? CancelValue.Cancel_Ref_no : "",

                                                   Cancel_Ref_date = CancelValue.Cancel_Ref_date.ToString() != null ? CancelValue.Cancel_Ref_date.ToString() : "",


                                                   ParentUnitid = parentunitid,
                                                   Storetype = storetype,
                                                   StoreName = storename,
                                                   StoreUnitID = storeunitid,

                                               }).AsQueryable();
            return query;
        }

        public List<CuttingReturnDetail> GetCuttingReturnDetForEdit(string CuttingRetNo, int CuttIssueId)
        {
            List<CuttingReturnDetail> query = (from T in entities.Proc_Apparel_GetReturnInnerDetailForEdit(CuttIssueId, CuttingRetNo)
                                               select new CuttingReturnDetail
                                               {
                                                   CuttingReturnDetId = T.CuttingReturnDetid,
                                                   CuttingIssueId = CuttIssueId,
                                                   Item = T.Item,
                                                   Itemid = T.Itemid,
                                                   Color = T.Color,
                                                   Colorid = T.Colorid,
                                                   Size = T.Size,
                                                   Sizeid = T.Sizeid,
                                                   Uom = T.UOM,
                                                   Balanceqty = (decimal)T.Balanceqty + T.Returnqty + T.Lossqty,
                                                   Issueqty = T.Issueqty,
                                                   CuttingIssueDetid = T.CuttingIssueDetid,
                                                   CuttingIssueStckid = T.CuttingIssueStockid,
                                                   Allotedqty = T.Allotedqty,
                                                   Returnqty = T.Returnqty,
                                                   Lossqty = T.Lossqty,
                                                   CancelQty = (decimal)T.CancelQty,
                                                   Secqty = (decimal)T.SecQty,
                                                   InorOut = "I",
                                                   CuttingOrdDetid = (int)T.CuttingOrdDetid,
                                                   Cutting_Cancel_Detid = (int)T.Cutting_Cancel_Detid,
                                                   RecQty = T.Recptqty
                                               }).AsQueryable().ToList();
            return query;
        }
    }
}
