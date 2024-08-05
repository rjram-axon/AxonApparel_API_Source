using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class BillPassRepository : IBillPassRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ProductionEntities prodentities = new ProductionEntities();
        PurchaseEntities purentities = new PurchaseEntities();
        ProcessEntities Procentities = new ProcessEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IEnumerable<Domain.BillPass> Grnview(String GrnNo, int Itemid, int Colorid, int sizeid, string Type)
        {
            List<Domain.BillPass> List = new List<Domain.BillPass>();
            try
            {
                if (Type == "P")
                {
                    List = (from LADD in purentities.Proc_Apparel_GrnViewTableDetails(GrnNo, Itemid, Colorid, sizeid)
                            select new Domain.BillPass
                            {

                                GrnRate = LADD.Rate,
                                Order_QTY = LADD.quantity,
                                PODate = (DateTime)LADD.orddate,
                                PONo = LADD.pur_ord_no

                            }).AsQueryable().ToList();
                }
                if (Type == "R")
                {
                    List = (from LADD in purentities.Proc_Apparel_GrnViewTableDetailsProc(GrnNo, Itemid, Colorid, sizeid)
                            select new Domain.BillPass
                            {

                                GrnRate = (decimal)LADD.rate,
                                Order_QTY = LADD.order_output_qty,
                                PODate = (DateTime)LADD.processordate,
                                PONo = LADD.processorder

                            }).AsQueryable().ToList();
                }
                if (Type == "D")
                {
                    List = (from LADD in purentities.Proc_Apparel_GrnViewTableDetailsProd(GrnNo, Itemid, Colorid, sizeid)
                            select new Domain.BillPass
                            {

                                GrnRate = (decimal)LADD.Rate,
                                Order_QTY = LADD.QTY,
                                PODate = (DateTime)LADD.OrdDate,
                                PONo = LADD.OrderNo

                            }).AsQueryable().ToList();
                }
                
                return List;
            }
            catch (Exception ex)
            {
                return List;
            }
        }
        public IEnumerable<Domain.BillPass> LoadListData(int CmpId, string Order_No, string Ref_No, string SuppInvNo, int BuyId, int Suppid, string frmDate, string ToDate, string OrderType, string POType, string OSType, string OPType)
        {
            

            List<Domain.BillPass> List=new List<Domain.BillPass>();
            try
            {

                if (OrderType == "R")
                {
                    List = (from LADD in entities.Proc_Apparel_BillPassforProcess(CmpId, Order_No, Ref_No, SuppInvNo, BuyId, Suppid, frmDate, ToDate, POType, OSType, OPType)
                            select new Domain.BillPass
                            {
                                //Approved = LADD.Approved,
                                //type = LADD.type,
                                process = LADD.process,
                                company = "",
                                //grnvalue = LADD.grnvalue,
                                supplier = LADD.supplier,
                                receipt_no = LADD.ReceptNo,
                                //job_ord_no = LADD.job_ord_no,
                                pur_invid = LADD.pur_invid,
                                invoice_no = LADD.invoice_no,
                                invoice_date = LADD.invoice_date,
                                supp_inv_no = LADD.supp_inv_no,
                                //supp_inv_date = LADD.supp_inv_date,
                                netamount = (decimal)LADD.netamount,
                                passed = LADD.passed.ToString(),
                                Payment_amt = LADD.paymentamt,
                                //advance = (decimal)LADD.advance,
                                //companyunit = LADD.companyunit,
                                //companyunitid = LADD.companyunitid,
                                //processid = LADD.processid,
                                //ordertype = LADD.ordertype,
                                order_no = LADD.order_no,
                                ref_no = LADD.ref_no,
                                //processor = LADD.processor,
                                OType = "R",
                                //prodinvid = 0,
                                //invoicetype = "",
                                //internalorexternal = "",
                                //invno = "",
                                ////invdate =  "",
                                //refno = "",
                                //invamount = 0,
                                //Abbreviation = "",
                                //GrnRate =  LADD.grnvalue,
                                // Payment_amt =  LADD.Payment_amt,
                                // pur_ord_detid =  LADD.pur_ord_detid
                                Hold_OR_Ret=LADD.Hold_Or_Ret,

                            }).AsQueryable().ToList();


                }

                if (OrderType == "P")
                {
                    if (OSType == "H" || OSType == "R")
                    {
                        List = (from LADD in entities.Proc_Apparel_BillPassPurchaseHold_Ret(CmpId, Order_No, Ref_No, SuppInvNo, BuyId, Suppid, frmDate, ToDate, POType, OSType, OPType)
                                select new Domain.BillPass
                                {
                                    ////Approved = LADD.Approved,
                                    //type = LADD.Type,
                                    ////  process = LADD.pr,
                                    //company = LADD.Company,
                                    //grnvalue = LADD.GrnValue,
                                    supplier = LADD.Supplier,
                                    receipt_no = LADD.ReceptNo,
                                    ////job_ord_no = LADD.job_ord_no,
                                    pur_invid = LADD.pur_invid,
                                    invoice_no = LADD.invoice_no,
                                    invoice_date = LADD.invoice_date,
                                    supp_inv_no = LADD.supp_inv_no,
                                    //supp_inv_date = LADD.supp_inv_date,
                                    netamount = LADD.invoice_value,
                                    passed = LADD.Passed.ToString(),
                                    //paymentamt = string.IsNullOrEmpty(LADD.Payment_amt.ToString()) ? 0 : (Decimal)LADD.Payment_amt,
                                    //advance = string.IsNullOrEmpty(LADD.Advance.ToString()) ? 0 : LADD.Advance,
                                    ////companyunit = LADD.companyunit,
                                    ////companyunitid = LADD.companyunitid,
                                    ////processid = LADD.processid,
                                    ////ordertype = LADD.ordertype,
                                    order_no = string.IsNullOrEmpty(LADD.OrderNo) ? "" : LADD.OrderNo,
                                    ref_no = string.IsNullOrEmpty(LADD.Style) ? "" : LADD.Style,
                                    ////processor = LADD.processor,
                                    ////prodinvid = LADD.prodinvid,
                                    ////invoicetype = LADD.invoicetype,
                                    ////internalorexternal = LADD.internalorexternal,
                                    ////invno = LADD.invno,
                                    ////invdate = LADD.invdate,
                                    ////refno = LADD.refno,
                                    ////invamount = LADD.invamount,
                                    Abbreviation = LADD.Currency,
                                    //GrnRate = LADD.GrnRate,
                                    Payment_amt = LADD.paymentamt,
                                    //pur_ord_detid = LADD.pur_ord_detid,
                                    OType = "P",
                                    Hold_OR_Ret = LADD.Hold_Or_Ret,

                                }).AsQueryable().ToList();
                    }
                    else
                    {
                        List = (from LADD in entities.Proc_Apparel_BillPassPurchase(CmpId, Order_No, Ref_No, SuppInvNo, BuyId, Suppid, frmDate, ToDate, POType, OSType, OPType)
                                select new Domain.BillPass
                                {
                                    ////Approved = LADD.Approved,
                                    //type = LADD.Type,
                                    ////  process = LADD.pr,
                                    //company = LADD.Company,
                                    //grnvalue = LADD.GrnValue,
                                    supplier = LADD.Supplier,
                                    receipt_no = LADD.ReceptNo,
                                    ////job_ord_no = LADD.job_ord_no,
                                    pur_invid = LADD.pur_invid,
                                    invoice_no = LADD.invoice_no,
                                    invoice_date = LADD.invoice_date,
                                    supp_inv_no = LADD.supp_inv_no,
                                    //supp_inv_date = LADD.supp_inv_date,
                                    netamount = LADD.invoice_value,
                                    passed = LADD.Passed.ToString(),
                                    //paymentamt = string.IsNullOrEmpty(LADD.Payment_amt.ToString()) ? 0 : (Decimal)LADD.Payment_amt,
                                    //advance = string.IsNullOrEmpty(LADD.Advance.ToString()) ? 0 : LADD.Advance,
                                    ////companyunit = LADD.companyunit,
                                    ////companyunitid = LADD.companyunitid,
                                    ////processid = LADD.processid,
                                    ////ordertype = LADD.ordertype,
                                    order_no = string.IsNullOrEmpty(LADD.OrderNo) ? "" : LADD.OrderNo,
                                    ref_no = string.IsNullOrEmpty(LADD.Style) ? "" : LADD.Style,
                                    ////processor = LADD.processor,
                                    ////prodinvid = LADD.prodinvid,
                                    ////invoicetype = LADD.invoicetype,
                                    ////internalorexternal = LADD.internalorexternal,
                                    ////invno = LADD.invno,
                                    ////invdate = LADD.invdate,
                                    ////refno = LADD.refno,
                                    ////invamount = LADD.invamount,
                                    Abbreviation = LADD.Currency,
                                    //GrnRate = LADD.GrnRate,
                                    Payment_amt = LADD.paymentamt,
                                    //pur_ord_detid = LADD.pur_ord_detid,
                                    OType = "P",
                                    Hold_OR_Ret = LADD.Hold_Or_Ret,

                                }).AsQueryable().ToList();
                    }
                }

                if (OrderType == "D")
                {

                    List = (from LADD in entities.Proc_Apparel_BillPassforProduction(CmpId, Order_No, Ref_No, SuppInvNo, BuyId, Suppid, frmDate, ToDate, POType, OSType, OPType)
                            select new Domain.BillPass
                            {
                                ////Approved = LADD.Approved,
                                //type = LADD.Type,
                                ////  process = LADD.pr,
                                //company = LADD.Company,
                                //grnvalue = LADD.GrnValue,
                                supplier = LADD.supplier,
                                receipt_no = LADD.ReceptNo,
                                ////job_ord_no = LADD.job_ord_no,
                                pur_invid = LADD.pur_invid,
                                invoice_no = LADD.InvNo,
                                invoice_date = LADD.InvDate,
                                supp_inv_no = LADD.supp_inv_no,
                                //supp_inv_date = LADD.supp_inv_date,
                                netamount = LADD.netamount,
                                passed = LADD.passed.ToString(),
                                //paymentamt = string.IsNullOrEmpty(LADD.Payment_amt.ToString()) ? 0 : (Decimal)LADD.Payment_amt,
                                //advance = string.IsNullOrEmpty(LADD.Advance.ToString()) ? 0 : LADD.Advance,
                                ////companyunit = LADD.companyunit,
                                ////companyunitid = LADD.companyunitid,
                                ////processid = LADD.processid,
                                ////ordertype = LADD.ordertype,
                                order_no = string.IsNullOrEmpty(LADD.order_no) ? "" : LADD.order_no,
                                ref_no = string.IsNullOrEmpty(LADD.ref_no) ? "" : LADD.ref_no,
                                ////processor = LADD.processor,
                                ////prodinvid = LADD.prodinvid,
                                ////invoicetype = LADD.invoicetype,
                                ////internalorexternal = LADD.internalorexternal,
                                ////invno = LADD.invno,
                                ////invdate = LADD.invdate,
                                ////refno = LADD.refno,
                                ////invamount = LADD.invamount,
                                Abbreviation = LADD.Currency,
                                //GrnRate = LADD.GrnRate,
                                Payment_amt = LADD.paymentamt,
                                //pur_ord_detid = LADD.pur_ord_detid,
                                OType = "D",

                            }).AsQueryable().ToList();



                }
                if (OrderType == "I")
                {

                    List = (from LADD in entities.Proc_Apparel_BillPassforOpenInvoice(CmpId, Order_No, Ref_No, SuppInvNo, BuyId, Suppid, frmDate, ToDate, POType, OSType, OPType)
                            select new Domain.BillPass
                            {
                                supplier = LADD.Supplier,
                                pur_invid = LADD.Open_InvID,
                                invoice_no = LADD.EntryNo,
                                invoice_date = LADD.EntryDate,
                                supp_inv_no = LADD.Supinvno,
                                netamount = LADD.netamount,
                                passed = LADD.passed.ToString(),
                                order_no = string.IsNullOrEmpty(LADD.orderno) ? "" : LADD.orderno,
                                ref_no = string.IsNullOrEmpty(LADD.asRefno) ? "" : LADD.asRefno,
                                Abbreviation = LADD.Currency,
                                Payment_amt = LADD.paymentamt,
                                OType = "I",

                            }).AsQueryable().ToList();



                }

                if (OrderType == "C")
                {

                    List = (from LADD in entities.Proc_Apparel_BillPassforCommercialInvoice(CmpId, Order_No, Ref_No, SuppInvNo, BuyId, Suppid, frmDate, ToDate, POType, OSType, OPType)
                            select new Domain.BillPass
                            {
                                supplier = LADD.Supplier,
                                pur_invid = LADD.Invmasid,
                                invoice_no = LADD.EntryNo,
                                invoice_date = LADD.EntryDate,
                                supp_inv_no = LADD.Supinvno,
                                netamount = LADD.netamount,
                                passed = LADD.passed.ToString(),
                                order_no = string.IsNullOrEmpty(LADD.orderno) ? "" : LADD.orderno,
                                ref_no = string.IsNullOrEmpty(LADD.Refno) ? "" : LADD.Refno,
                                Abbreviation = LADD.Currency,
                                Payment_amt = LADD.paymentamt,
                                OType = "C",
                                Hold_OR_Ret = LADD.Hold_Or_Ret
                            }).AsQueryable().ToList();



                }
                return List;
            }
            catch (Exception ex) {
                return List;
            }

        }


        public bool Update(Domain.BillPass Det)
        {
            int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;
            var Date = DateTime.Now;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (Det.DetList.Count >0)
                    {

                        foreach (var list in Det.DetList)
                        {

                            if (list.OType == "R") {

                                if (list.passed == "True")
                                {
                                    var App = entities.Process_Inv_Mas.Where(c => c.Process_Invid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = true;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "N";
                                    }
                                    entities.SaveChanges();

                                }
                                else if (list.Hold_OR_Ret == "H")
                                {
                                    var App = entities.Process_Inv_Mas.Where(c => c.Process_Invid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = false;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "H";
                                    }
                                    entities.SaveChanges();
                                }
                                else if (list.Hold_OR_Ret == "R")
                                {
                                    var App = entities.Process_Inv_Mas.Where(c => c.Process_Invid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = false;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "R";
                                    }
                                    entities.SaveChanges();
                                }
                                else 
                                {
                                    var App = entities.Process_Inv_Mas.Where(c => c.Process_Invid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = false;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "N";
                                    }
                                    entities.SaveChanges();
                                }

                            
                            }


                            if (list.OType == "P")
                            {
                                if (list.passed == "True")
                                {
                                    var App = entities.Pur_Inv_Mas.Where(c => c.pur_invid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = true;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "N";
                                    }
                                    entities.SaveChanges();

                                }
                                else if (list.Hold_OR_Ret == "H")
                                {
                                    var App = entities.Pur_Inv_Mas.Where(c => c.pur_invid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = false;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "H";
                                    }
                                    entities.SaveChanges();
                                }
                                else if (list.Hold_OR_Ret == "R")
                                {
                                    var App = entities.Pur_Inv_Mas.Where(c => c.pur_invid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = false;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "R";
                                    }
                                    entities.SaveChanges();
                                }
                                else
                                {
                                    var App = entities.Pur_Inv_Mas.Where(c => c.pur_invid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = false;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "N";
                                    }
                                    entities.SaveChanges();
                                }
                            }

                            if (list.OType == "D")
                            {
                                if (list.passed == "Y")
                                {
                                    var App = prodentities.ProductionInvoiceMas.Where(c => c.ProdInvid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = "Y";
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                    }
                                    prodentities.SaveChanges();

                                }
                                else if (list.passed == "H")
                                {
                                    var App = prodentities.ProductionInvoiceMas.Where(c => c.ProdInvid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = "H";
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                    }
                                    prodentities.SaveChanges();

                                }
                                else if (list.passed == "R")
                                {
                                    var App = prodentities.ProductionInvoiceMas.Where(c => c.ProdInvid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = "R";
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                    }
                                    prodentities.SaveChanges();

                                }
                                else
                                {
                                    var App = prodentities.ProductionInvoiceMas.Where(c => c.ProdInvid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = "N";
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                    }
                                    prodentities.SaveChanges();
                                }

                            }
                            if (list.OType == "I")
                            {
                                if (list.passed == "1")
                                {
                                    var App = purentities.OpenInvoice_Mas.Where(c => c.Open_InvID == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.passed = 1;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                    }
                                    purentities.SaveChanges();

                                }
                                else if (list.passed == "2")
                                {
                                    var App = purentities.OpenInvoice_Mas.Where(c => c.Open_InvID == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.passed = 2;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                    }
                                    purentities.SaveChanges();

                                }
                                else if (list.passed == "3")
                                {
                                    var App = purentities.OpenInvoice_Mas.Where(c => c.Open_InvID == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.passed = 3;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                    }
                                    purentities.SaveChanges();

                                }
                                else
                                {
                                    var App = purentities.OpenInvoice_Mas.Where(c => c.Open_InvID == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.passed = 0;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                    }
                                    purentities.SaveChanges();
                                }

                            }


                            if (list.OType == "C")
                            {
                                if (list.passed == "True")
                                {
                                    var App = entities.Commercial_Invmas.Where(c => c.Invmasid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = true;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "N";
                                    }
                                    entities.SaveChanges();

                                }
                                else if (list.Hold_OR_Ret == "H")
                                {
                                    var App = entities.Commercial_Invmas.Where(c => c.Invmasid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = false;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "H";
                                    }
                                    entities.SaveChanges();
                                }
                                else if (list.Hold_OR_Ret == "R")
                                {
                                    var App = entities.Commercial_Invmas.Where(c => c.Invmasid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = false;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "R";
                                    }
                                    entities.SaveChanges();
                                }
                                else
                                {
                                    var App = entities.Commercial_Invmas.Where(c => c.Invmasid == list.pur_invid).FirstOrDefault();
                                    if (App != null)
                                    {
                                        App.Passed = false;
                                        App.EmpId = list.UserId;
                                        App.BillPassDate = Date;
                                        App.Hold_Or_Ret = "N";
                                    }
                                    entities.SaveChanges();
                                }
                            }


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
                }
            }
            return reserved;
        }

        public IEnumerable<Domain.BillPass> GetSupplierInvNo(string Type)
        {
            IEnumerable<Domain.BillPass> query = (from a in entities.Proc_Apparel_SuppInvNoList(Type)
                                                  select new Domain.BillPass
                                           {

                                               supp_inv_no = a.supp_inv_no,
                                                pur_invid=a.pur_invid


                                           }).AsQueryable();

            return query;
        }
    }
}
