using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public class SubStoreIssueRepository : ISubStoreIssueRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IEnumerable<Domain.StoreTransferDet> GetSubStoreStockAdd(int Compid, int Styleid, string JobNo, string OrderNo, string RefNo, int Storeid, int itemid, int itemgrpid, int processid, string Ordtype)
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<Domain.StoreTransferDet> lststoredewt = new List<Domain.StoreTransferDet>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadSubStoreIssueAdd", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Compid;
                cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 25).Value = OrderNo;
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 25).Value = RefNo;
                cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = Styleid;
                cmd.Parameters.Add("@JobNo", SqlDbType.VarChar, 25).Value = JobNo;
                cmd.Parameters.Add("@StoreUnitid", SqlDbType.Int).Value = Storeid;
                cmd.Parameters.Add("@Itemid", SqlDbType.Int).Value = itemid;
                cmd.Parameters.Add("@ItemGroupid", SqlDbType.Int).Value = itemgrpid;
                cmd.Parameters.Add("@Lastprocess", SqlDbType.Int).Value = processid;
                cmd.Parameters.Add("@Ordtype", SqlDbType.Char, 1).Value = Ordtype;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.StoreTransferDet store = new Domain.StoreTransferDet();
                    store.DetID = 0;
                    store.MasID = 0;
                    store.IssueStockID = Convert.ToInt32(rdr["StockId"]);
                    store.TransferQty = 0;
                    store.ReceivedQty = 0;
                    store.RejectedQty =0;
                    store.RecptStockID = 0;
                    store.RejectedStockID =0; 
                    store.QltyItemRemarks = "";
                    store.Rate = Convert.ToDecimal(rdr["MRate"]);
                    store.Amount = 0;
                    store.CGST = 0;
                    store.SGST = 0;
                    store.IGST = 0;
                    store.CGSTAMT = 0;
                    store.SGSTAMT = 0;
                    store.IGSTAMT =0;
                    store.Item = rdr["Item"].ToString();
                    store.Color = rdr["Color"].ToString();
                    store.Size = rdr["Size"].ToString();
                    store.Lotno = rdr["LotNo"].ToString();
                    store.UOM = rdr["Uom"].ToString();
                    store.StockQty = Convert.ToDecimal(rdr["StockQty"]);
                    store.ProgramQty = Convert.ToDecimal(rdr["Prg_Qty"]);
                    store.HSNcode = rdr["hsncode"].ToString();

                    store.Itemid = Convert.ToInt32(rdr["ItemID"]);
                    store.Colorid = Convert.ToInt32(rdr["ColorID"]);
                    store.Sizeid = Convert.ToInt32(rdr["SizeID"]);


                    lststoredewt.Add(store);
                }
                con.Close();
            }
            return lststoredewt;
        }

        public IEnumerable<Domain.StoreTransferDet> GetSubStoreStockEdit(int Masid)
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<Domain.StoreTransferDet> lststoredewt = new List<Domain.StoreTransferDet>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_SubStoreIssueEditDet", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Masid", SqlDbType.Int).Value = Masid;
               
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.StoreTransferDet store = new Domain.StoreTransferDet();
                    store.DetID = Convert.ToInt32(rdr["DetID"]); 
                   // store.MasID = Convert.ToInt32(rdr["StockId"]); 
                    store.IssueStockID = Convert.ToInt32(rdr["StockId"]);
                    store.TransferQty = Convert.ToDecimal(rdr["TransferQty"]);
                    store.ReceivedQty = Convert.ToDecimal(rdr["ReceivedQty"]);
                    store.RejectedQty = Convert.ToDecimal(rdr["RejectedQty"]);
                    store.RecptStockID = Convert.ToInt32(rdr["RecptStockID"]);
                    store.RejectedStockID = Convert.ToInt32(rdr["RejectedStockID"]);
                    store.QltyItemRemarks = rdr["QualityRemarks"].ToString();
                    store.Rate = Convert.ToDecimal(rdr["MRate"]);
                    store.Amount = Convert.ToDecimal(rdr["Amount"]);
                    store.CGST = Convert.ToDecimal(rdr["CGST"]);
                    store.SGST = Convert.ToDecimal(rdr["SGST"]);
                    store.IGST = Convert.ToDecimal(rdr["IGST"]);
                    store.CGSTAMT = Convert.ToDecimal(rdr["CGSTAMT"]);
                    store.SGSTAMT = Convert.ToDecimal(rdr["SGSTAMT"]);
                    store.IGSTAMT = Convert.ToDecimal(rdr["IGSTAMT"]);
                    store.Item = rdr["Item"].ToString();
                    store.Color = rdr["Color"].ToString();
                    store.Size = rdr["Size"].ToString();
                    store.Lotno = rdr["LotNo"].ToString();
                    store.UOM = rdr["Uom"].ToString();
                    store.StockQty = Convert.ToDecimal(rdr["StockQty"]) + Convert.ToDecimal(rdr["ReceivedQty"]);
                    store.ProgramQty = Convert.ToDecimal(rdr["Prg_Qty"]);
                    store.HSNcode = rdr["hsncode"].ToString();

                    store.Itemid = Convert.ToInt32(rdr["ItemID"]);
                    store.Colorid = Convert.ToInt32(rdr["ColorID"]);
                    store.Sizeid = Convert.ToInt32(rdr["SizeID"]);
                    store.FrmCompID = Convert.ToInt32(rdr["FromcompID"]);
                    store.ToCompID = Convert.ToInt32(rdr["ToCompID"]);
                    store.ToUnitID = Convert.ToInt32(rdr["ToUnitID"]);
                    store.IssueStoreid = Convert.ToInt32(rdr["IssueStoreid"]);
                    store.RecptStoreID = Convert.ToInt32(rdr["RecptStoreID"]);
                    store.RefNo = rdr["Ref_No"].ToString();
                    store.OrderNo = rdr["Order_No"].ToString();
                    store.JobordNo = rdr["Job_Ord_no"].ToString();
                    store.TransNo = rdr["Transno"].ToString();
                    store.TransDate = rdr["TransDate"].ToString();
                    store.Styleid = Convert.ToInt32(rdr["Styleid"]);
                    store.Style = rdr["Style"].ToString();
                   
                    store.OrderType = rdr["TransType"].ToString();
                    store.BmasID = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
                    store.JmasID = Convert.ToInt32(rdr["JmasID"]);
                    store.StoreType = rdr["StoreType"].ToString();
                    store.ParentUnitid = Convert.ToInt32(rdr["ParentUnit"]);
                    store.Remarks = rdr["Remarks"].ToString();
                    store.QualityNo = rdr["QualityNo"].ToString();
                    store.QualityDate = rdr["QualityDate"].ToString();
                    store.Vehicle_No = rdr["Vehicle_No"].ToString();

                    lststoredewt.Add(store);
                }
                con.Close();
            }
            return lststoredewt;
        }

        public IEnumerable<Domain.StoreTransferMas> LoadIssueNo()
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<Domain.StoreTransferMas> lststoredewt = new List<Domain.StoreTransferMas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from StoreTransferMas";
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.StoreTransferMas store = new Domain.StoreTransferMas();
                    store.MasID = Convert.ToInt32(rdr["MasID"]);              
                    store.Transno = rdr["Transno"].ToString();
                   
                    lststoredewt.Add(store);
                }
                con.Close();
            }
            return lststoredewt;
        }

        public IEnumerable<Domain.StoreTransferMas> GetMainList(int Companyid, int IsuStoreid, int RcptStoreid, string OrderNo, string RefNo, string JobNo, int masid, string ordtype, string Frmdate, string Todate)
        {
            //return entities.StoreSections.OrderBy(s => s.SectionName);
            List<Domain.StoreTransferMas> lststoredewt = new List<Domain.StoreTransferMas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_SubStoreIssueMainList", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Companyid", SqlDbType.Int).Value = Companyid;
                cmd.Parameters.Add("@IsuStoreid", SqlDbType.Int).Value = IsuStoreid;
                cmd.Parameters.Add("@Recptstoreid", SqlDbType.Int).Value = RcptStoreid;
                cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 25).Value = OrderNo;
                cmd.Parameters.Add("@RefNo", SqlDbType.VarChar, 25).Value = RefNo;
                cmd.Parameters.Add("@JobNo", SqlDbType.VarChar, 25).Value = JobNo;
                cmd.Parameters.Add("@IssueNo", SqlDbType.Int).Value = masid;
                cmd.Parameters.Add("@Ordertype", SqlDbType.Char,1).Value = ordtype;
                cmd.Parameters.Add("@Fromdate", SqlDbType.VarChar, 25).Value = Frmdate;
                cmd.Parameters.Add("@Todate", SqlDbType.VarChar, 25).Value = Todate;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.StoreTransferMas store = new Domain.StoreTransferMas();
                    store.MasID = Convert.ToInt32(rdr["MasID"]);
                    store.Transno = rdr["Transno"].ToString();
                    store.Order_No = rdr["Order_No"].ToString();
                    store.Job_Ord_no = rdr["Job_Ord_no"].ToString();
                    store.IssueStoreID = Convert.ToInt32(rdr["IssueStoreID"]);
                    store.IssueStore = rdr["IsuStore"].ToString();
                    store.RecptStoreID = Convert.ToInt32(rdr["RecptStoreID"]);
                    store.ReceiptStore = rdr["RcptStore"].ToString();
                    store.RefNo = rdr["Ref_No"].ToString();
                    store.TransDate = (DateTime)rdr["TransDate"];
                    store.ChkRecpt = Convert.ToInt32(rdr["ChkRecpt"]);

                    lststoredewt.Add(store);
                }
                con.Close();
            }
            return lststoredewt;
        }

        public bool Create(StoreTransferMas Mas, List<StoreTransferDet> Storedet)
        {

            bool reserved = false;
            var masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (Mas != null) {

                        var mas = entities.StoreTransferMas.Add(Mas);
                        
                        entities.SaveChanges();
                        masid = Mas.MasID;
                    }

                    foreach (var st in Storedet)
                    {
                        if (st.DetID ==0 && st.TransferQty >0)
                        {
                            st.MasID = masid;
                            entities.StoreTransferDet.Add(st);                          
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
                }
            }
            return reserved;
        }

        public bool Update(StoreTransferMas Mas, List<StoreTransferDet> Storedet, string Type,string IType)
        {

            bool reserved = false;
            var masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (Mas.MasID >0)
                    {
                       
                        var masedit = entities.StoreTransferMas.Where(a => a.MasID == Mas.MasID).FirstOrDefault();

                        if (masedit != null) {
                            if (Type == "Issue")
                            {
                                masedit.RecptStoreID = Mas.RecptStoreID;
                                masedit.Remarks = Mas.Remarks;
                                masedit.ToCompID = Mas.ToCompID;
                                masedit.ToUnitID = Mas.ToUnitID;
                                masedit.Vehicle_No = Mas.Vehicle_No;
                            }
                            else if (Type == "Receipt") {

                                masedit.QualityNo = Mas.QualityNo;
                                masedit.QualityDate = Mas.QualityDate;
                                masedit.QualityMade = Mas.QualityMade;
                                masedit.QualityRemarks = Mas.QualityRemarks;
                            }
                        }

                       // var mas = entities.StoreTransferMas.Add(Mas);

                        entities.SaveChanges();
                        masid = Mas.MasID;
                    }

                    if (Type == "Issue")
                    {
                        var CDet = entities.StoreTransferDet.Where(u => u.MasID == Mas.MasID);

                        foreach (var v in CDet)
                        {
                            entities.StoreTransferDet.Remove(v);
                        }
                        entities.SaveChanges();


                        foreach (var st in Storedet)
                        {
                            if (st.TransferQty > 0)
                            {
                                st.MasID = masid;
                                entities.StoreTransferDet.Add(st);
                            }
                        }
                        entities.SaveChanges();
                    }
                    else if (Type == "Receipt" && IType =="Add")
                    {

                        foreach (var st in Storedet)
                        {
                            if (st.ReceivedQty > 0)
                            {
                                var CDet = entities.StoreTransferDet.Where(u => u.DetID == st.DetID);

                                foreach (var v in CDet)
                                {
                                    //entities.StoreTransferDet.Remove(v);
                                    v.ReceivedQty = st.ReceivedQty;
                                    v.RejectedQty = st.RejectedQty;
                                    v.QltyItemRemarks = st.QltyItemRemarks;
                                    v.Rate = st.Rate;
                                }
                                entities.SaveChanges();
                                var Pgyc4 = entities.Proc_Apparel_UpdateStoreTransferStcok(st.DetID);
                                entities.SaveChanges();
                            }
                            else if (st.RejectedQty > 0) {

                                var CDet = entities.StoreTransferDet.Where(u => u.DetID == st.DetID);

                                foreach (var v in CDet)
                                {
                                    //entities.StoreTransferDet.Remove(v);
                                    v.ReceivedQty = st.ReceivedQty;
                                    v.RejectedQty = st.RejectedQty;
                                    v.QltyItemRemarks = st.QltyItemRemarks;
                                    v.Rate = st.Rate;
                                }
                                entities.SaveChanges();
                                var Pgyc4 = entities.Proc_Apparel_UpdateRejectStoreTransferStcok(st.DetID);
                                entities.SaveChanges();
                            
                            }

                        }
                    
                    
                    }
                    else if (Type == "Receipt" && IType == "Update")
                    {

                        foreach (var st in Storedet)
                        {
                            var Pgyc = entities.Proc_Apparel_DeleteStoreTransferStcok(st.DetID);
                            
                        }
                        entities.SaveChanges();

                        foreach (var S in Storedet)
                        {
                            var itmstk = entities.ItemStock.Where(u => u.StockId == S.RecptStockID);
                            foreach (var stk in itmstk)
                            {
                                entities.ItemStock.Remove(stk);
                            }

                        }
                        entities.SaveChanges();

                        foreach (var st in Storedet)
                        {
                            if (st.ReceivedQty > 0)
                            {
                                var CDet = entities.StoreTransferDet.Where(u => u.DetID == st.DetID);

                                foreach (var v in CDet)
                                {
                                    //entities.StoreTransferDet.Remove(v);
                                    v.ReceivedQty = st.ReceivedQty;
                                    v.RejectedQty = st.RejectedQty;
                                    v.QltyItemRemarks = st.QltyItemRemarks;
                                    v.Rate = st.Rate;
                                }
                                entities.SaveChanges();
                                var Pgyc4 = entities.Proc_Apparel_UpdateStoreTransferStcok(st.DetID);
                                entities.SaveChanges();
                            }
                            else if (st.RejectedQty > 0)
                            {

                                var CDet = entities.StoreTransferDet.Where(u => u.DetID == st.DetID);

                                foreach (var v in CDet)
                                {
                                    //entities.StoreTransferDet.Remove(v);
                                    v.ReceivedQty = st.ReceivedQty;
                                    v.RejectedQty = st.RejectedQty;
                                    v.QltyItemRemarks = st.QltyItemRemarks;
                                    v.Rate = st.Rate;
                                }
                                entities.SaveChanges();
                                var Pgyc4 = entities.Proc_Apparel_UpdateRejectStoreTransferStcok(st.DetID);
                                entities.SaveChanges();

                            }

                        }


                        var masedit = entities.StoreTransferMas.Where(a => a.MasID == Mas.MasID).FirstOrDefault();

                        if (masedit != null)
                        {
                            if (Type == "Receipt")
                            {

                                //masedit.QualityNo = Mas.QualityNo;
                                //masedit.QualityDate = Mas.QualityDate;
                                //masedit.QualityMade = Mas.QualityMade;
                                masedit.QualityRemarks = Mas.QualityRemarks;
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

        public bool Delete(StoreTransferMas Mas, List<StoreTransferDet> Storedet, string Type, string IType)
        {

            bool reserved = false;
            var masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    if (Type == "Issue")
                    {
                        if (Mas.MasID > 0)
                        {
                            var CDet = entities.StoreTransferDet.Where(u => u.MasID == Mas.MasID);

                            foreach (var v in CDet)
                            {
                                entities.StoreTransferDet.Remove(v);
                            }
                            entities.SaveChanges();

                            masid = Mas.MasID;

                            var MDet = entities.StoreTransferMas.Where(u => u.MasID == masid);

                            foreach (var v in MDet)
                            {
                                entities.StoreTransferMas.Remove(v);
                            }
                            entities.SaveChanges();

                        }
                    }
                    else if (Type == "Receipt" && IType == "Delete")
                    {

                        foreach (var st in Storedet)
                        {
                            var Pgyc = entities.Proc_Apparel_DeleteStoreTransferStcok(st.DetID);

                        }
                        entities.SaveChanges();

                        foreach (var S in Storedet)
                        {
                            var itmstk = entities.ItemStock.Where(u => u.StockId == S.RecptStockID);
                            foreach (var stk in itmstk)
                            {
                                entities.ItemStock.Remove(stk);
                            }

                        }
                        entities.SaveChanges();




                        foreach (var st in Storedet)
                        {
                            //if (st.ReceivedQty > 0)
                            //{
                                var CDet = entities.StoreTransferDet.Where(u => u.DetID == st.DetID);

                                foreach (var v in CDet)
                                {
                                    //entities.StoreTransferDet.Remove(v);
                                    v.ReceivedQty = 0;
                                    v.RejectedQty = 0;
                                    v.QltyItemRemarks = "";
                                    //v.Rate = 0;
                                }
                                entities.SaveChanges();
                                //var Pgyc4 = entities.Proc_Apparel_UpdateStoreTransferStcok(st.DetID);
                                //entities.SaveChanges();
                           // }
                          

                        }

                        var masedit = entities.StoreTransferMas.Where(a => a.MasID == Mas.MasID).FirstOrDefault();

                        if (masedit != null)
                        {
                            if (Type == "Receipt")
                            {

                                masedit.QualityNo = "";
                                masedit.QualityDate = null;
                                masedit.QualityMade = "";
                                masedit.QualityRemarks = Mas.QualityRemarks;
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
    }
}
