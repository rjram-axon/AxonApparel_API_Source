using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Data.SqlClient;
using System.Transactions;
using System.Data;
using System.Configuration;

namespace AxonApparel.Repository
{

    public class ItemTransferRepository : IItemTransferRepository
    {

        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;


        public IList<Domain.ItemTransDet> LoadItemtransList(int? compid, int? storeid, int? processid, int? itemid, int? colorid, int? sizeid, string ordtype, string Ordno, string jobno,
             string Transno, string Transtype, string Itemtype)
        {
            try
            {
                List<Domain.ItemTransDet> List = new List<Domain.ItemTransDet>();

                using (SqlConnection con = new SqlConnection(connStr))
                {
                    SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadItemTransList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@compid", SqlDbType.Int).Value = compid;
                    cmd.Parameters.Add("@Storeid", SqlDbType.Int).Value = storeid;
                    cmd.Parameters.Add("@processid", SqlDbType.Int).Value = processid;
                    cmd.Parameters.Add("@Itemid", SqlDbType.Int).Value = itemid;
                    cmd.Parameters.Add("@Colorid", SqlDbType.Int).Value = colorid;
                    cmd.Parameters.Add("@Sizeid", SqlDbType.Int).Value = sizeid;
                    cmd.Parameters.Add("@Ordtype", SqlDbType.Char, 1).Value = ordtype;
                    cmd.Parameters.Add("@Orderno", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(Ordno) ? "" : Ordno;
                    cmd.Parameters.Add("@JobOrdno", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(jobno) ? "" : jobno;
                    cmd.Parameters.Add("@Transno", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(Transno) ? "" : Transno;
                    cmd.Parameters.Add("@Transtype", SqlDbType.VarChar, 5).Value = String.IsNullOrEmpty(Transtype) ? "" : Transtype;
                    cmd.Parameters.Add("@ItemGroup", SqlDbType.VarChar, 40).Value = String.IsNullOrEmpty(Itemtype) ? "" : Itemtype;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Domain.ItemTransDet obj = new Domain.ItemTransDet();
                        obj.StockId = Convert.ToInt32(rdr["StockId"]);
                        obj.ItemCat = rdr["ItemCat"].ToString();
                        obj.OrderType = rdr["OrderType"].ToString();
                        obj.Order_no = rdr["Order_no"].ToString();
                        obj.Job_Ord_No = rdr["Job_Ord_No"].ToString();
                        obj.StockType = rdr["StockType"].ToString();
                        obj.Unit_Or_Other = rdr["Unit_Or_Other"].ToString();
                        obj.Supplierid = Convert.ToInt32(rdr["Supplierid"]);
                        obj.Supplier_Type = rdr["Supplier_Type"].ToString();
                        obj.Supplier = rdr["Supplier"].ToString();
                        obj.Company = rdr["Company"].ToString();
                        obj.ItemType = rdr["ItemType"].ToString();
                        obj.Itemgroup = rdr["Itemgroup"].ToString();
                        obj.Item = rdr["Item"].ToString();
                        obj.Size = rdr["Size"].ToString();
                        obj.Color = rdr["Color"].ToString();
                        obj.Uom = rdr["Uom"].ToString();
                        obj.Rate = Convert.ToDecimal(rdr["Rate"]);
                        obj.Qty = Convert.ToDecimal(rdr["Qty"]);
                        obj.Alloted = Convert.ToDecimal(rdr["Alloted"]);
                        obj.BalQty = Convert.ToDecimal(rdr["BalQty"]);
                        obj.sQty = Convert.ToDecimal(rdr["sQty"]);
                        obj.sUom = rdr["sUom"].ToString();
                        obj.Companyid = Convert.ToInt32(rdr["Companyid"]);
                        obj.TransType = rdr["TransType"].ToString();
                        obj.Transno = rdr["Transno"].ToString();
                        obj.TransDate = rdr["TransDate"].ToString();
                        obj.Lotno = rdr["Lotno"].ToString();
                        obj.ItemGroupid = Convert.ToInt32(rdr["ItemGroupid"]);
                        obj.FromItemId = Convert.ToInt32(rdr["Itemid"]);
                        obj.ColorId = Convert.ToInt32(rdr["Colorid"]);
                        obj.SizeId = Convert.ToInt32(rdr["Sizeid"]);
                        obj.Uomid = Convert.ToInt32(rdr["Uomid"]);
                        obj.sUomId = Convert.ToInt32(rdr["sUomId"]);
                        obj.IsDecimal = rdr["IsDecimal"].ToString();
                        obj.Mfr = rdr["Mfr"].ToString();
                        obj.Process = rdr["Process"].ToString();
                        obj.Processid = Convert.ToInt32(rdr["Processid"]);
                        obj.Mfrid = Convert.ToInt32(rdr["Mfrid"]);
                        obj.StoreUnitId = Convert.ToInt32(rdr["StoreUnitId"]);
                        obj.StoreName = rdr["StoreName"].ToString();
                        obj.ItemDesc = rdr["ItemDesc"].ToString();
                        obj.ToItemId = Convert.ToInt32(rdr["Itemid"]);
                        obj.ToSizeId = Convert.ToInt32(rdr["Sizeid"]);
                        obj.ToColorId = Convert.ToInt32(rdr["Colorid"]);
                        obj.Refno = rdr["Ref_No"].ToString();
                        obj.Style = rdr["Style"].ToString();
                        List.Add(obj);
                    }
                    con.Close();
                }
                return List;
            }
            catch (Exception ex)
            {

                List<Domain.ItemTransDet> List = new List<Domain.ItemTransDet>();
                return List;
            }
        }

        public IList<Domain.ItemTransDet> LoadItemtransMainList(int? masid, int? compid, int? fromitemid, int? Toitemid, string ordtype, string frmdate, string todate, string orderno, string refno)
        {
            try
            {
                List<Domain.ItemTransDet> List = new List<Domain.ItemTransDet>();

                using (SqlConnection con = new SqlConnection(connStr))
                {
                    SqlCommand cmd = new SqlCommand("Proc_Apparel_ItemtransferMain", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@Compid", SqlDbType.Int).Value = compid;
                    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = masid;
                    cmd.Parameters.Add("@frmitemid", SqlDbType.Int).Value = fromitemid;
                    cmd.Parameters.Add("@toitemid", SqlDbType.Int).Value = Toitemid;
                    cmd.Parameters.Add("@ordtype", SqlDbType.Char, 1).Value = ordtype;
                    cmd.Parameters.Add("@fromdate", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(frmdate) ? "" : frmdate;
                    cmd.Parameters.Add("@todate", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(todate) ? "" : todate;
                    cmd.Parameters.Add("@orderno", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(orderno) ? "" : orderno;
                    cmd.Parameters.Add("@refno", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(refno) ? "" : refno;
                 
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Domain.ItemTransDet obj = new Domain.ItemTransDet();
                        obj.TransMasId = Convert.ToInt32(rdr["TransMasId"]);
                        obj.EntryNo = rdr["EntryNo"].ToString();
                        obj.EntryDate = Convert.ToDateTime(rdr["EntryDate"]);
                        obj.OrderType = rdr["OrderType"].ToString();
                        obj.Company = rdr["Company"].ToString();
                        obj.User = rdr["Username"].ToString();
                        obj.CreatedBy = Convert.ToInt32(rdr["CreatedBy"]);
                        obj.Companyid = Convert.ToInt32(rdr["CompanyId"]);
                       

                        List.Add(obj);
                    }
                    con.Close();
                }
                return List;
            }
            catch (Exception ex)
            {

                List<Domain.ItemTransDet> List = new List<Domain.ItemTransDet>();
                return List;
            }
        }

        public IList<Domain.ItemTransMas> LoadItemtransStatementList()
        {
            try
            {
                List<Domain.ItemTransMas> List = new List<Domain.ItemTransMas>();
                List = (from LADD in entities.ItemTransMas
                        select new Domain.ItemTransMas
                        {
                            TransMasId = LADD.TransMasId,
                            EntryNo = LADD.EntryNo,

                        }).AsQueryable().ToList();
                return List;
            }
            catch (Exception ex)
            {

                List<Domain.ItemTransMas> List = new List<Domain.ItemTransMas>();
                return List;
            }
        }
        public IList<Domain.ItemTransDet> LoadItemtransEditList(int? masid)
        {
            try
            {
                List<Domain.ItemTransDet> List = new List<Domain.ItemTransDet>();

                using (SqlConnection con = new SqlConnection(connStr))
                {
                    SqlCommand cmd = new SqlCommand("Proc_Apparel_GetEditItemTransfer", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = masid;
                    //cmd.Parameters.Add("@Storeid", SqlDbType.Int).Value = storeid;
                    //cmd.Parameters.Add("@processid", SqlDbType.Int).Value = processid;
                    //cmd.Parameters.Add("@Itemid", SqlDbType.Int).Value = itemid;
                    //cmd.Parameters.Add("@Colorid", SqlDbType.Int).Value = colorid;
                    //cmd.Parameters.Add("@Sizeid", SqlDbType.Int).Value = sizeid;
                    //cmd.Parameters.Add("@Ordtype", SqlDbType.Char, 1).Value = ordtype;
                    //cmd.Parameters.Add("@Orderno", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(Ordno) ? "" : Ordno;
                    //cmd.Parameters.Add("@JobOrdno", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(jobno) ? "" : jobno;
                    //cmd.Parameters.Add("@Transno", SqlDbType.VarChar, 25).Value = String.IsNullOrEmpty(Transno) ? "" : Transno;
                    //cmd.Parameters.Add("@Transtype", SqlDbType.VarChar, 5).Value = String.IsNullOrEmpty(Transtype) ? "" : Transtype;
                    //cmd.Parameters.Add("@ItemGroup", SqlDbType.VarChar, 40).Value = String.IsNullOrEmpty(Itemtype) ? "" : Itemtype;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Domain.ItemTransDet obj = new Domain.ItemTransDet();
                        obj.StockId = Convert.ToInt32(rdr["StockId"]);
                        obj.ItemCat = rdr["ItemCat"].ToString();
                        obj.OrderType = rdr["OrderType"].ToString();
                        obj.Order_no = rdr["Order_no"].ToString();
                        obj.Job_Ord_No = rdr["Job_Ord_No"].ToString();
                        obj.StockType = rdr["StockType"].ToString();
                        obj.Unit_Or_Other = rdr["Unit_Or_Other"].ToString();
                        obj.Supplierid = Convert.ToInt32(rdr["Supplierid"]);
                        obj.Supplier_Type = rdr["Supplier_Type"].ToString();
                        obj.Supplier = rdr["Supplier"].ToString();
                        obj.Company = rdr["Company"].ToString();
                        obj.ItemType = rdr["ItemType"].ToString();
                        obj.Itemgroup = rdr["Itemgroup"].ToString();
                        obj.Item = rdr["Item"].ToString();
                        obj.Size = rdr["Size"].ToString();
                        obj.Color = rdr["Color"].ToString();
                        obj.Uom = rdr["Uom"].ToString();
                        obj.Rate = Convert.ToDecimal(rdr["Rate"]);
                        obj.Qty = Convert.ToDecimal(rdr["Qty"]);
                        obj.Alloted = Convert.ToDecimal(rdr["Alloted"]);
                        obj.BalQty = (Convert.ToDecimal(rdr["BalQty"]) + Convert.ToDecimal(rdr["TransQty"]));
                        obj.sQty = Convert.ToDecimal(rdr["sQty"]);
                        obj.sUom = rdr["sUom"].ToString();
                        obj.Companyid = Convert.ToInt32(rdr["Companyid"]);
                        obj.TransType = rdr["TransType"].ToString();
                        obj.Transno = rdr["Transno"].ToString();
                        obj.TransDate = rdr["TransDate"].ToString();
                        obj.Lotno = rdr["Lotno"].ToString();
                        obj.ItemGroupid = Convert.ToInt32(rdr["ItemGroupid"]);
                        obj.FromItemId = Convert.ToInt32(rdr["Itemid"]);
                        obj.ColorId = Convert.ToInt32(rdr["Colorid"]);
                        obj.SizeId = Convert.ToInt32(rdr["Sizeid"]);
                        obj.Uomid = Convert.ToInt32(rdr["Uomid"]);
                        obj.sUomId = Convert.ToInt32(rdr["sUomId"]);
                        obj.IsDecimal = rdr["IsDecimal"].ToString();
                        obj.Mfr = rdr["Mfr"].ToString();
                        obj.Process = rdr["Process"].ToString();
                        obj.Processid = Convert.ToInt32(rdr["Processid"]);
                        obj.Mfrid = Convert.ToInt32(rdr["Mfrid"]);
                        obj.StoreUnitId = Convert.ToInt32(rdr["StoreUnitId"]);
                        obj.StoreName = rdr["StoreName"].ToString();
                        obj.ItemDesc = rdr["ItemDesc"].ToString();
                        obj.ToItemId = Convert.ToInt32(rdr["toitemid"]);
                        obj.ToSizeId = Convert.ToInt32(rdr["ToSizeId"]);
                        obj.ToColorId = Convert.ToInt32(rdr["Tocolorid"]);
                        obj.NewStockId = Convert.ToInt32(rdr["NewStockId"]);
                        obj.TransQty = Convert.ToDecimal(rdr["TransQty"]);
                        obj.SecTransQty = Convert.ToDecimal(rdr["SecTransQty"]);
                        obj.TransMasId = Convert.ToInt32(rdr["TransMasId"]);
                        obj.EntryNo = rdr["EntryNo"].ToString();
                        obj.EntryDate = Convert.ToDateTime(rdr["EntryDate"]);
                        obj.OrderType = rdr["OrderType"].ToString();
                        obj.Remarks = rdr["Remarks"].ToString();
                        obj.Refno = rdr["Ref_No"].ToString();
                        obj.Style = rdr["Style"].ToString();
                        
                        obj.CreatedBy = Convert.ToInt32(rdr["CreatedBy"]);
                     

                        List.Add(obj);
                    }
                    con.Close();
                }
                return List;
            }
            catch (Exception ex)
            {

                List<Domain.ItemTransDet> List = new List<Domain.ItemTransDet>();
                return List;
            }
        }



        public bool AddDetData(ItemTransMas itemtransmasInsert, List<ItemTransDet> TransDet, string Mode)
        {
            bool reserved = false;
            int GrpMasid = 0;
            // int Masid = 0;
            // string Otype = "";
            string GrpNo = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    entities.ItemTransMas.Add(itemtransmasInsert);
                    entities.SaveChanges();
                    GrpMasid = itemtransmasInsert.TransMasId;
                    GrpNo = itemtransmasInsert.EntryNo;

                    if (TransDet != null && TransDet.Count > 0)
                    {
                        foreach (var item in TransDet)
                        {
                            var Pgyc = entities.Proc_Apparel_InsertItemtransdet(GrpMasid, item.StockId, item.FromItemId, item.ToItemId,
                                item.ColorId, item.ToColorId, item.SizeId, item.ToSizeId, item.TransQty, item.SecTransQty);
                            entities.SaveChanges();
                            //using (SqlConnection con = new SqlConnection(connStr))
                            //{
                            //    SqlCommand cmd = new SqlCommand("Proc_Apparel_InsertItemtransdet", con);
                            //    cmd.CommandType = CommandType.StoredProcedure;
                            //    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = GrpMasid;
                            //    cmd.Parameters.Add("@stockid", SqlDbType.Int).Value = item.StockId;
                            //    cmd.Parameters.Add("@frmitemid", SqlDbType.Int).Value = item.FromItemId;
                            //    cmd.Parameters.Add("@toitemid", SqlDbType.Int).Value = item.ToItemId;
                            //    cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = item.ColorId;

                            //    cmd.Parameters.Add("@tocolorid", SqlDbType.Int).Value = item.ToColorId;
                            //    cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = item.SizeId;
                            //    cmd.Parameters.Add("@tosizeid", SqlDbType.Int).Value = item.ToSizeId;
                            //    cmd.Parameters.Add("@transqty", SqlDbType.Int).Value = item.TransQty;
                            //    cmd.Parameters.Add("@SecTransQty", SqlDbType.Int).Value = item.SecTransQty;
                            //    con.Open();
                            //    try
                            //    {
                            //        cmd.ExecuteNonQuery();
                            //        reserved = true;
                            //    }
                            //    catch (Exception)
                            //    {
                            //        reserved = false;
                            //    }
                            //    con.Close();
                            //}
                        }
                        entities.SaveChanges();
                    }

                    var Pgyc2 = entities.Proc_Apparel_UpdateItemTransferStcok(GrpMasid);
                    entities.SaveChanges();
                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_UpdateItemTransferStcok", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = GrpMasid;
                    //    con.Open();
                    //    try
                    //    {
                    //        cmd.ExecuteNonQuery();
                    //        reserved = true;
                    //    }
                    //    catch (Exception)
                    //    {
                    //        reserved = false;
                    //    }
                    //    con.Close();
                    //}


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

        public bool UpdateDetData(ItemTransMas itemtransmasInsert, List<ItemTransDet> TransDet, string Mode)
        {
            bool reserved = false;
            int GrpMasid = 0;
            // int Masid = 0;
            // string Otype = "";
            string GrpNo = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.ItemTransMas.Where(c => c.TransMasId == itemtransmasInsert.TransMasId).FirstOrDefault();
                    if (App != null)
                    {
                        App.EntryDate = itemtransmasInsert.EntryDate;
                        App.Remarks = itemtransmasInsert.Remarks;
                    }
                    entities.SaveChanges();
                  
                    GrpMasid = itemtransmasInsert.TransMasId;
                    GrpNo = itemtransmasInsert.EntryNo;

                    var Pgyc = entities.Proc_Apparel_DeleteItemTransferStcok(GrpMasid);
                    entities.SaveChanges();

                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_DeleteItemTransferStcok", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = GrpMasid;
                    //    con.Open();
                    //    try
                    //    {
                    //        cmd.ExecuteNonQuery();
                    //        reserved = true;
                    //    }
                    //    catch (Exception)
                    //    {
                    //        reserved = false;
                    //    }
                    //    con.Close();
                    //}
                    var SDet = entities.ItemTransDet.Where(u => u.TransMasId == GrpMasid);

                    var Pgyc1 = entities.Proc_Apparel_RemoveItemtransdet(GrpMasid);
                    entities.SaveChanges();

                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_RemoveItemtransdet", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = GrpMasid;
                    //    con.Open();
                    //    try
                    //    {
                    //        cmd.ExecuteNonQuery();
                    //        reserved = true;
                    //    }
                    //    catch (Exception)
                    //    {
                    //        reserved = false;
                    //    }
                    //    con.Close();
                    //}

                    foreach (var S in TransDet)
                    {
                        var itmstk = entities.ItemStock.Where(u => u.StockId == S.NewStockId);
                        foreach (var stk in itmstk)
                        {
                            entities.ItemStock.Remove(stk);
                        }

                    }
                    entities.SaveChanges();

                    if (TransDet != null && TransDet.Count > 0)
                    {
                        foreach (var item in TransDet)
                        {
                            var Pgyc3 = entities.Proc_Apparel_InsertItemtransdet(GrpMasid, item.StockId, item.FromItemId, item.ToItemId,
                                item.ColorId, item.ToColorId, item.SizeId, item.ToSizeId, item.TransQty, item.SecTransQty);
                            entities.SaveChanges();
                            //using (SqlConnection con = new SqlConnection(connStr))
                            //{
                            //    SqlCommand cmd = new SqlCommand("Proc_Apparel_InsertItemtransdet", con);
                            //    cmd.CommandType = CommandType.StoredProcedure;
                            //    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = GrpMasid;
                            //    cmd.Parameters.Add("@stockid", SqlDbType.Int).Value = item.StockId;
                            //    cmd.Parameters.Add("@frmitemid", SqlDbType.Int).Value = item.FromItemId;
                            //    cmd.Parameters.Add("@toitemid", SqlDbType.Int).Value = item.ToItemId;
                            //    cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = item.ColorId;

                            //    cmd.Parameters.Add("@tocolorid", SqlDbType.Int).Value = item.ToColorId;
                            //    cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = item.SizeId;
                            //    cmd.Parameters.Add("@tosizeid", SqlDbType.Int).Value = item.ToSizeId;
                            //    cmd.Parameters.Add("@transqty", SqlDbType.Int).Value = item.TransQty;
                            //    cmd.Parameters.Add("@SecTransQty", SqlDbType.Int).Value = item.SecTransQty;
                            //    con.Open();
                            //    try
                            //    {
                            //        cmd.ExecuteNonQuery();
                            //        reserved = true;
                            //    }
                            //    catch (Exception)
                            //    {
                            //        reserved = false;
                            //    }
                            //    con.Close();
                            //}
                        }
                        entities.SaveChanges();
                    }
                    var Pgyc4 = entities.Proc_Apparel_UpdateItemTransferStcok(GrpMasid);
                    entities.SaveChanges();
                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_UpdateItemTransferStcok", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = GrpMasid;
                    //    con.Open();
                    //    try
                    //    {
                    //        cmd.ExecuteNonQuery();
                    //        reserved = true;
                    //    }
                    //    catch (Exception)
                    //    {
                    //        reserved = false;
                    //    }
                    //    con.Close();
                    //}



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

        public bool DeleteDetData(ItemTransMas itemtransmasInsert, List<ItemTransDet> TransDet, string Mode)
        {
            bool reserved = false;
            int GrpMasid = 0;
            // int Masid = 0;
            // string Otype = "";
            string GrpNo = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    GrpMasid = itemtransmasInsert.TransMasId;

                    var Pgyc = entities.Proc_Apparel_DeleteItemTransferStcok(GrpMasid);
                    entities.SaveChanges();

                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_DeleteItemTransferStcok", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = GrpMasid;
                    //    con.Open();
                    //    try
                    //    {
                    //        cmd.ExecuteNonQuery();
                    //        reserved = true;
                    //    }
                    //    catch (Exception)
                    //    {
                    //        reserved = false;
                    //    }
                    //    con.Close();
                    //}


                    //var SDet = entities.ItemTransDet.Where(u => u.TransMasId == GrpMasid);

                    var Pgyc1 = entities.Proc_Apparel_RemoveItemtransdet(GrpMasid);
                    entities.SaveChanges();

                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_RemoveItemtransdet", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.Add("@masid", SqlDbType.Int).Value = GrpMasid;
                    //    con.Open();
                    //    try
                    //    {
                    //        cmd.ExecuteNonQuery();
                    //        reserved = true;
                    //    }
                    //    catch (Exception)
                    //    {
                    //        reserved = false;
                    //    }
                    //    con.Close();
                    //}

                    foreach (var S in TransDet)
                    {
                        var itmstk = entities.ItemStock.Where(u => u.StockId == S.NewStockId);
                        foreach (var stk in itmstk)
                        {
                            entities.ItemStock.Remove(stk);
                        }

                    }
                    entities.SaveChanges();

                    var MDet = entities.ItemTransMas.Where(u => u.TransMasId == GrpMasid);

                    foreach (var m in MDet)
                    {
                        entities.ItemTransMas.Remove(m);
                    }
                    entities.SaveChanges();


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
    }
}
