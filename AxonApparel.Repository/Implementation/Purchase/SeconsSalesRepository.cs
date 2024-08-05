using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
namespace AxonApparel.Repository
{
    public class SecondsSalesRepository : ISecondsSalesRepository
    {
        PurchaseEntities entities = new PurchaseEntities();

        public IList<Domain.FABRIC_SALES_DET> LoadStockItemDetails(int? CompId, int? unitid, string OrderNo, string Refno, string styleid, int? itemgrpid, string Itemid, string Ordertype)
        {
            //int Sizeid = 0;
            var query = (from ID in entities.Proc_Apparel_GetStockDetforSecondsSales(CompId, unitid, OrderNo, Refno, styleid, itemgrpid, Itemid, Ordertype)
                         select new Domain.FABRIC_SALES_DET
                         {
                             FabDetid = 0,
                             Fabmasid = 0,
                             Order_no = ID.Order_No,
                             Styleid = ID.StyleId,
                             Transno = ID.Transno,
                             Itemid = ID.itemid,
                             colorid = ID.colorid,
                             sizeid = ID.sizeid,
                             hsncode = ID.hsncode,
                             StockQty = ID.balQty,
                             SalesQty = 0,
                             rate = 0,
                             amount = 0,
                             cgst = ID.CGST,
                             sgst = ID.SGST,
                             igst = ID.IGST,
                             Totaltaxamount = 0,
                             Stockid = ID.StockId,
                             scolorid = 0,
                             SecSalQty = 0,
                             uomid = ID.UomId,
                             Sec_saluomid = 0,
                             SecQty = ID.SecQty,
                             Color = ID.color,
                             Item = ID.item,
                             Size = ID.size,
                             CompanyId = ID.CompanyId,
                             ItemCat = ID.ItemCat,
                             Ref_No = ID.Ref_No,
                             Job_Ord_No = ID.Job_Ord_No,
                             Style = ID.Style,
                             ItemGroupId = ID.ItemGroupId,
                             StoreUnitID = ID.StoreUnitID,
                             Markup_Rate = ID.Markup_Rate,
                             // stocktype = ID.
                             Uom = ID.Uom,
                             Supplier = ID.Supplier,
                             Buy_Ord_MasId = ID.Buy_Ord_MasId,

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<Domain.FABRIC_SALES_MAS> GetMainLoad(string FromDate, string ToDate, string OrderNo, string Refno, int? Styid, int? masid, int? compid, string Otype)
        {
            //int Sizeid = 0;
            var query = (from ID in entities.Proc_Apparel_GetSecondsSalesMainlist(compid, OrderNo, Styid, Refno, masid, FromDate, ToDate, Otype)
                         select new Domain.FABRIC_SALES_MAS
                         {
                            
                             Fabmasid = ID.Fabmasid,
                             Entryno = ID.Entryno,
                             EntryDate = ID.EntryDate,
                             dcno = ID.dcno,
                             Supplierid = ID.SupplierId,
                             Supplier = ID.Supplier,
                             currencyid = ID.currencyid,
                             exchangerate = ID.exchangerate,
                             invtype = ID.invtype,
                           

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<Domain.FABRIC_SALES_MAS> LoadSSentryno()
        {
            var list = entities.FABRIC_SALES_MAS.ToList();

            IList<Domain.FABRIC_SALES_MAS> checklist = new List<Domain.FABRIC_SALES_MAS>();
            if (list != null)
            {
                foreach (var mas in list)
                {
                    Domain.FABRIC_SALES_MAS det = new Domain.FABRIC_SALES_MAS
                    {
                        Entryno = mas.Entryno,
                        Fabmasid = mas.Fabmasid,
                    };
                    checklist.Add(det);
                }
            }

            return checklist;
        }

        public IList<Domain.FABRIC_SALES_DET> LoadEditDetDetails(int masid)
        {
            //int Sizeid = 0;
            var query = (from ID in entities.Proc_Apparel_GetSecondsSalesDetEdit(masid)
                         select new Domain.FABRIC_SALES_DET
                         {
                             FabDetid = ID.FabDetid,
                             Fabmasid = ID.Fabmasid,
                             Order_no = ID.Order_no,
                             Styleid = ID.Styleid,
                             Transno = ID.Transno,
                             Itemid = ID.itemid,
                             colorid = ID.colorid,
                             sizeid = ID.sizeid,
                             
                             StockQty = ID.balQty,
                             SalesQty = ID.SalesQty,
                             rate =ID.rate,
                             amount =ID.amount,
                             cgst = ID.cgst,
                             sgst = ID.sgst,
                             igst = ID.igst,
                             Totaltaxamount = ID.Totaltaxamount,
                             Stockid = ID.StockId,
                          
                             uomid = ID.UomId,
                           
                             SecQty = ID.SecQty,
                             Color = ID.color,
                             Item = ID.item,
                             Size = ID.size,
                           
                             Ref_No = ID.Ref_No,
                          
                             Style = ID.Style,
                             Uom = ID.Abbreviation,
                             Markup_Rate=ID.Markup_Rate
                             //Supplier = ID.Supplier,
                           

                         }).AsQueryable();

            return query.ToList();
        }

        public Domain.FABRIC_SALES_DET LoadStateDetails(int Companyid,int Supplierid)
        {

            var sdet = entities.Proc_Apparel_ChkSupplierGstState(Supplierid).FirstOrDefault();
            int s = sdet.Stateid;

            var cdet = entities.Proc_Apparel_ChkCompGstState(Companyid).FirstOrDefault();
            int c = cdet.Stateid;

            Domain.FABRIC_SALES_DET det = new Domain.FABRIC_SALES_DET();

            string Chk = "";
            if (s == c)
            {
                Chk = "Y";
            }
            else {
                Chk = "N";
            }
            det.ChkStateid = Chk;
            return det;
        }

        public Domain.FABRIC_SALES_MAS LoadEditMasDetails(int masid)
        {
            //int Sizeid = 0;
            var ID =  entities.Proc_Apparel_GetSecondsSalesMasEdit(masid).FirstOrDefault();

            var  addleslist = entities.Proc_Apparel_GetSecondsSalesEditAddlessDetails(masid).ToList();



            var list = new List<Domain.FabricSales_AddLess>();

            foreach (var wer in addleslist) {

                Domain.FabricSales_AddLess det = new Domain.FabricSales_AddLess
                { 
                    Addless=wer.AddLess,
                    Type=wer.Type,
                    Fabmasid=wer.Fabmasid,
                    FabricsaleAddLessid=wer.FabricsaleAddLessid,
                    AddLessid=wer.AddLessid,
                    Percentage=wer.Percentage,
                    Amount=wer.Amount,
                    aorl=wer.aorl
                };
                list.Add(det);
            }
           


                Domain.FABRIC_SALES_MAS set=new Domain.FABRIC_SALES_MAS(){
                            
                             Fabmasid = ID.Fabmasid,
                             Entryno = ID.Entryno,
                             EntryDate = ID.EntryDate,
                             dcno = ID.dcno,
                             Supplier = ID.Supplier,
                             Supplierid = ID.SupplierId,
                             currencyid = ID.currencyid,
                             Remarks=ID.Remarks,
                             Companyid=ID.Companyid,
                             exchangerate = ID.exchangerate,
                             invtype = ID.invtype,
                             FabricSales_AddLess = list
                };





                return set;
        }

        public bool AddDetData(FABRIC_SALES_MAS StkTfrInsertmas, List<FABRIC_SALES_DET> ItmList, List<FabricSales_AddLess> ALList)
        {
            bool reserved = false;
            int TfrId = 0;
            string Transno="";
            string Transdate="";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.FABRIC_SALES_MAS.Add(StkTfrInsertmas);
                    entities.SaveChanges();
                    TfrId = StkTfrInsertmas.Fabmasid;
                    Transno=StkTfrInsertmas.Entryno;
                    Transdate=StkTfrInsertmas.EntryDate.ToString();

                    foreach (var Stk in ItmList)
                    {
                        Stk.Fabmasid=TfrId;
                        var det = entities.FABRIC_SALES_DET.Add(Stk);

                        //var Pg1 = entities.Proc_Apparel_GetStockTransferItemStkUpdate(Stk.qty, Stk.StockId, TransDate, TransNo, FOrdNo, TOrdNo, FJOrdNo, TJOrdNo, ToCompId, FromStyleid, ToStyleid, TfrId, Stk.Itemid, Stk.Colorid, Stk.sizeid, Stk.Markup_Rate, Stk.processId, Processid, FOType, TOType, ToStoreUnitID, Stk.ShipRowId);
                        entities.SaveChanges();
                    }
                    foreach (var Acc in ALList)
                    {
                        Acc.Fabmasid = TfrId;
                        var det = entities.FabricSales_AddLess.Add(Acc);
                        entities.SaveChanges();
                    }

                    var wer = entities.Proc_Apparel_AddStockinSecondsSales(TfrId, StkTfrInsertmas.Entryno, StkTfrInsertmas.EntryDate);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public bool UpdateDetData(FABRIC_SALES_MAS StkTfrInsertmas, List<FABRIC_SALES_DET> ItmList, List<FabricSales_AddLess> ALList)
        {
            bool reserved = false;
            int TfrId = 0;
            string Transno = "";
            string Transdate = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var remove = entities.Proc_Apparel_UpdateStockinSecondsSales(StkTfrInsertmas.Fabmasid, StkTfrInsertmas.Entryno);
                    entities.SaveChanges();

                    var id = entities.FABRIC_SALES_MAS.Where(c => c.Fabmasid == StkTfrInsertmas.Fabmasid).FirstOrDefault();
                    id.ActGrossamt = StkTfrInsertmas.ActGrossamt;
                    id.currencyid = StkTfrInsertmas.currencyid;
                    id.Dcdate = StkTfrInsertmas.Dcdate;
                    id.dcno = StkTfrInsertmas.dcno;
                    id.EntryDate = StkTfrInsertmas.EntryDate;
                    id.exchangerate = StkTfrInsertmas.exchangerate;
                    id.GrossAmt = StkTfrInsertmas.GrossAmt;
                    id.NetAmt = StkTfrInsertmas.NetAmt;
                    id.Remarks = StkTfrInsertmas.Remarks;
                    id.shipto = StkTfrInsertmas.shipto;
                    id.Supplierid = StkTfrInsertmas.Supplierid;

                    entities.SaveChanges();
                    TfrId = StkTfrInsertmas.Fabmasid;
                    Transno = StkTfrInsertmas.Entryno;
                    Transdate = StkTfrInsertmas.EntryDate.ToString();

                    var det = entities.FABRIC_SALES_DET.Where(c => c.Fabmasid == StkTfrInsertmas.Fabmasid).ToList();

                    foreach (var d in det)
                    {
                        entities.FABRIC_SALES_DET.Remove(d);
                        entities.SaveChanges();
                    }
                    var adet = entities.FabricSales_AddLess.Where(c => c.Fabmasid == StkTfrInsertmas.Fabmasid).ToList();


                    foreach (var d in adet)
                    {
                        entities.FabricSales_AddLess.Remove(d);
                        entities.SaveChanges();
                    }


                    foreach (var Stk in ItmList)
                    {
                        Stk.Fabmasid = TfrId;
                        var idet = entities.FABRIC_SALES_DET.Add(Stk);

                        //var Pg1 = entities.Proc_Apparel_GetStockTransferItemStkUpdate(Stk.qty, Stk.StockId, TransDate, TransNo, FOrdNo, TOrdNo, FJOrdNo, TJOrdNo, ToCompId, FromStyleid, ToStyleid, TfrId, Stk.Itemid, Stk.Colorid, Stk.sizeid, Stk.Markup_Rate, Stk.processId, Processid, FOType, TOType, ToStoreUnitID, Stk.ShipRowId);
                        entities.SaveChanges();
                    }

                    foreach (var Acc in ALList)
                    {
                        Acc.Fabmasid = TfrId;
                        var sidet = entities.FabricSales_AddLess.Add(Acc);
                        entities.SaveChanges();
                    }



                    var wer = entities.Proc_Apparel_AddStockinSecondsSales(TfrId, StkTfrInsertmas.Entryno, StkTfrInsertmas.EntryDate);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }

        public bool DeleteDetData(FABRIC_SALES_MAS StkTfrInsertmas, List<FABRIC_SALES_DET> ItmList, List<FabricSales_AddLess> ALList)
        {
            bool reserved = false;
            int TfrId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    TfrId = StkTfrInsertmas.Fabmasid;

                    var remove = entities.Proc_Apparel_UpdateStockinSecondsSales(StkTfrInsertmas.Fabmasid, StkTfrInsertmas.Entryno);
                    entities.SaveChanges();

                    var det = entities.FABRIC_SALES_DET.Where(c => c.Fabmasid == StkTfrInsertmas.Fabmasid).ToList();

                    foreach (var d in det)
                    {
                        entities.FABRIC_SALES_DET.Remove(d);
                        entities.SaveChanges();
                    }
                    var adet = entities.FabricSales_AddLess.Where(c => c.Fabmasid == StkTfrInsertmas.Fabmasid).ToList();
                    foreach (var d in adet)
                    {
                        entities.FabricSales_AddLess.Remove(d);
                        entities.SaveChanges();
                    }

                    var id = entities.FABRIC_SALES_MAS.Where(c => c.Fabmasid == StkTfrInsertmas.Fabmasid).FirstOrDefault();

                    entities.FABRIC_SALES_MAS.Remove(id);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }

    }
}
