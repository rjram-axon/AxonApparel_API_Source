using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class PaymentRepository : IPaymentRepository
    {

        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();



        public IEnumerable<Domain.Bill_Adj_det> AddList(int Supplierid, int Companyid, string Type)
        {
            string typ = "";
            List<Domain.Bill_Adj_det> List = new List<Domain.Bill_Adj_det>();
            try
            {
                if (Type == "P")
                {
                    typ = "Purchase";
                }
                else if (Type == "R")
                {
                    typ = "Process";
                }


                List = (from LADD in entities.Proc_Apparel_GetPaymentAddList(Supplierid, Companyid, Type)
                        select new Domain.Bill_Adj_det
                        {
                            Trans_Detid = 0,
                            Trans_Masid = 0,
                            Type = typ,
                            Pur_Inv_Id = LADD.ID,
                            Inv_Amount = LADD.Invoice_Value,
                            Adj_Amt = 0,
                            BalanceAmount = LADD.BalanceAmount,
                            InvoiceDate = LADD.supp_inv_date.ToString(),
                            SupplierInvoiceNo = LADD.supp_inv_no,
                            InvoiceNo = LADD.invoice_no
                        }).AsQueryable().ToList();

                return List;
            }
            catch (Exception ex)
            {
                return List;
            }

        }

        public IEnumerable<Domain.Bill_Adj_mas> GetmainList(int Supplierid, int Companyid, string Paymentno, string FromDate, string ToDate, string advance)
        {
            List<Domain.Bill_Adj_mas> List = new List<Domain.Bill_Adj_mas>();
            try
            {
                List = (from LADD in entities.Proc_Apparel_GetPaymentMainList(Supplierid, Companyid, Paymentno, FromDate, ToDate)
                        select new Domain.Bill_Adj_mas
                        {
                            Trans_masid = LADD.Trans_masid,
                            Trans_No = LADD.Trans_No,
                            Trans_Date = LADD.Trans_Date,
                            Cheque_Date = LADD.Cheque_Date,
                            Company = LADD.Company,
                            Supplier = LADD.Supplier,
                            Remarks = LADD.Remarks,
                            Cheque_Amt = LADD.Cheque_Amt
                        }).AsQueryable().ToList();

                return List;
            }
            catch (Exception ex)
            {
                return List;
            }

        }


        public IEnumerable<Domain.Bill_Adj_mas> GetEditMas(int Transid)
        {
            List<Domain.Bill_Adj_mas> List = new List<Domain.Bill_Adj_mas>();
            try
            {
                List = (from LADD in entities.Proc_Apparel_GetPaymentMasEditbyid(Transid)
                        select new Domain.Bill_Adj_mas
                        {
                            Trans_masid = LADD.Trans_masid,
                            Trans_No = LADD.Trans_No,
                            Trans_Date = LADD.Trans_Date,
                            Cheque_Date = LADD.Cheque_Date,
                            Companyid = LADD.CompanyId,
                            Supplierid = LADD.SupplierId,
                            Type = LADD.Type,
                            Mode = LADD.Mode,
                            Trans_Type = LADD.Trans_Type,
                            Advance_Amt = LADD.Advance_Amt,
                            Bankid = LADD.Bankid,
                            Cheque_Amt = LADD.Cheque_Amt,
                            Cheque_No = LADD.Cheque_No,
                            Narration = LADD.Narration,
                            Remarks = LADD.Remarks,

                        }).AsQueryable().ToList();

                return List;
            }
            catch (Exception ex)
            {
                return List;
            }

        }

        public IEnumerable<Domain.Bill_Adj_det> GetEditDet(int Transid)
        {
            List<Domain.Bill_Adj_det> List = new List<Domain.Bill_Adj_det>();
            try
            {
                var App = entities.BIll_ADJ_mas.Where(c => c.Trans_masid == Transid).FirstOrDefault();

                var typ = App.Trans_Type;
                if (typ == "P")
                {
                    typ = "Purchase";
                }
                else if (typ == "R")
                {
                    typ = "Process";
                }


                List = (from LADD in entities.Proc_Apparel_GetPaymentDetEditbyid(Transid)
                        select new Domain.Bill_Adj_det
                        {
                            Trans_Detid = LADD.Trans_Detid,
                            Trans_Masid = LADD.Trans_Masid,
                            Type = typ,
                            Pur_Inv_Id = LADD.ID,
                            Inv_Amount = LADD.Invoice_Value,
                            Adj_Amt = LADD.Adj_Amt,
                            BalanceAmount = LADD.BalanceAmount + LADD.Adj_Amt,
                            InvoiceDate = LADD.supp_inv_date.ToString(),
                            SupplierInvoiceNo = LADD.supp_inv_no,
                            InvoiceNo = LADD.invoice_no
                        }).AsQueryable().ToList();

                return List;
            }
            catch (Exception ex)
            {
                return List;
            }

        }


        public bool AddDetData(BIll_ADJ_mas objAd, List<BIll_Adj_Det> objPDet)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var id = entities.BIll_ADJ_mas.Add(objAd);
                    entities.SaveChanges();
                    int masid = objAd.Trans_masid;

                    foreach (var pp in objPDet)
                    {
                        pp.Trans_Masid = masid;
                        if (pp.Type == "Purchase")
                        {
                            pp.Type = "P";
                        }
                        else if (pp.Type == "Process")
                        {
                            pp.Type = "R";
                        }

                        entities.BIll_Adj_Det.Add(pp);
                    }

                    entities.SaveChanges();


                    var CDet = entities.BIll_Adj_Det.Where(u => u.Trans_Masid == objAd.Trans_masid);

                    foreach (var v in CDet)
                    {
                        int Pg = entities.Proc_Apparel_UpdatePayment(v.Type, v.Trans_Detid);
                        entities.SaveChanges();
                    }
                    entities.SaveChanges();




                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BulkOrder-AddDetData");
                }

            }
            return reserved;
        }

        public bool Update(BIll_ADJ_mas objAd, List<BIll_Adj_Det> objPDet)
        {
            int masid = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    if (objAd.Trans_masid != 0)
                    {

                        foreach (var v in objPDet)
                        {
                            if (v.Type == "Purchase")
                            {
                                v.Type = "P";
                            }
                            else if (v.Type == "Process")
                            {
                                v.Type = "R";
                            }


                            int Pg = entities.Proc_Apparel_RevertPayment(v.Type, v.Trans_Detid);
                            entities.SaveChanges();
                        }
                        entities.SaveChanges();


                        var App = entities.BIll_ADJ_mas.Where(c => c.Trans_masid == objAd.Trans_masid).FirstOrDefault();
                        if (App != null)
                        {
                            App.Advance_Amt = objAd.Advance_Amt;
                            App.Bankid = objAd.Bankid;
                            App.Cheque_Amt = objAd.Cheque_Amt;
                            App.Cheque_Date = objAd.Cheque_Date;
                            App.Cheque_No = objAd.Cheque_No;
                            App.Companyid = objAd.Companyid;
                            App.Mode = objAd.Mode;
                            App.Narration = objAd.Narration;
                            App.Remarks = objAd.Remarks;
                            App.Supplierid = objAd.Supplierid;
                            App.Trans_Date = objAd.Trans_Date;
                            App.Trans_Type = objAd.Trans_Type;
                            App.Type = objAd.Type;

                        }
                        entities.SaveChanges();
                        masid = objAd.Trans_masid;

                    }



                    var CDet = entities.BIll_Adj_Det.Where(u => u.Trans_Masid == objAd.Trans_masid);

                    foreach (var v in CDet)
                    {
                        entities.BIll_Adj_Det.Remove(v);
                    }
                    entities.SaveChanges();


                    foreach (var pp in objPDet)
                    {
                        pp.Trans_Masid = masid;
                        if (pp.Type == "Purchase")
                        {
                            pp.Type = "P";
                        }
                        else if (pp.Type == "Process")
                        {
                            pp.Type = "R";
                        }

                        entities.BIll_Adj_Det.Add(pp);
                    }

                    entities.SaveChanges();

                    var UDet = entities.BIll_Adj_Det.Where(u => u.Trans_Masid == objAd.Trans_masid);

                    foreach (var v in UDet)
                    {
                        int Pg = entities.Proc_Apparel_UpdatePayment(v.Type, v.Trans_Detid);
                        entities.SaveChanges();
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Payemnt-Update");
                }

            }
            return reserved;
        }

        public bool Delete(BIll_ADJ_mas objAd, List<BIll_Adj_Det> objPDet)
        {
            int masid = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    if (objAd.Trans_masid != 0)
                    {

                        foreach (var v in objPDet)
                        {
                            if (v.Type == "Purchase")
                            {
                                v.Type = "P";
                            }
                            else if (v.Type == "Process")
                            {
                                v.Type = "R";
                            }

                            int Pg = entities.Proc_Apparel_RevertPayment(v.Type, v.Trans_Detid);
                            entities.SaveChanges();
                        }
                        entities.SaveChanges();

                        var CDet = entities.BIll_Adj_Det.Where(u => u.Trans_Masid == objAd.Trans_masid);

                        foreach (var v in CDet)
                        {
                            entities.BIll_Adj_Det.Remove(v);
                        }
                        entities.SaveChanges();

                        var CDet1 = entities.BIll_ADJ_mas.Where(u => u.Trans_masid == objAd.Trans_masid);

                        foreach (var v in CDet1)
                        {
                            entities.BIll_ADJ_mas.Remove(v);
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
                    exceplogg.SendExcepToDB(ex, "Payement-Delete");
                }

            }
            return reserved;
        }

        public IEnumerable<Domain.Bill_Adj_mas> GetPaymentNo(int Companyid)
        {
            List<Domain.Bill_Adj_mas> List = new List<Domain.Bill_Adj_mas>();

            // List<Domain.Bill_Adj_mas> List = new List<Domain.Bill_Adj_mas>();
            try
            {
                List = (from LADD in entities.BIll_ADJ_mas.Where(c => c.Companyid == Companyid)
                        select new Domain.Bill_Adj_mas
                        {
                            Trans_masid = LADD.Trans_masid,
                            Trans_No = LADD.Trans_No,
                            Trans_Date = LADD.Trans_Date,
                            Cheque_Date = LADD.Cheque_Date,
                            //Companyid = LADD.CompanyId,
                            //Supplierid = LADD.SupplierId,
                            Type = LADD.Type,
                            Mode = LADD.Mode,
                            Trans_Type = LADD.Trans_Type,
                            Advance_Amt = LADD.Advance_Amt,
                            Bankid = LADD.Bankid,
                            Cheque_Amt = LADD.Cheque_Amt,
                            Cheque_No = LADD.Cheque_No,
                            Narration = LADD.Narration,
                            Remarks = LADD.Remarks,

                        }).AsQueryable().ToList();

                return List;
            }
            catch (Exception ex)
            {
                return List;
            }


        }

    }
}