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
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class BulkOrderRepository : IBulkOrderRepository
    {
        OrderEntities entities = new OrderEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        int BuyMasId = 0;

        public IEnumerable<Buy_Ord_Mas> GetDataListAll()
        {
            //return entities.Buy_Ord_Mas.OrderBy(c => c.Order_No);
            List<Buy_Ord_Mas> lstemployee = new List<Buy_Ord_Mas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrderProcessLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Buy_Ord_Mas employee = new Buy_Ord_Mas();

                    employee.Buy_Ord_MasId = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
                    employee.Order_No = rdr["Order_No"].ToString();
                    employee.Order_Date = Convert.ToDateTime(rdr["Order_Date"]);
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.Buyer_AddId = Convert.ToInt32(rdr["Buyer_AddId"]);
                    employee.ManagerId = Convert.ToInt32(rdr["ManagerId"]);
                    employee.MerchandiserId = Convert.ToInt32(rdr["MerchandiserId"]);
                    employee.Ref_No = rdr["Ref_No"].ToString();
                    employee.Ref_Date = Convert.ToDateTime(rdr["Ref_Date"]);
                    employee.Pay_SystemId = Convert.ToInt32(rdr["Pay_SystemId"]);
                    employee.SystemId = Convert.ToInt32(rdr["SystemId"]);
                    employee.Payment_ModeId = Convert.ToInt32(rdr["Payment_ModeId"]);
                    employee.AgentId = Convert.ToInt32(rdr["AgentId"]);
                    employee.Agent_AddId = Convert.ToInt32(rdr["Agent_AddId"]);
                    employee.ShipAgentId = Convert.ToInt32(rdr["ShipAgentId"]);
                    employee.ShipAgent_AddId = Convert.ToInt32(rdr["ShipAgent_AddId"]);
                    employee.CurrencyId = Convert.ToInt32(rdr["CurrencyId"]);
                    employee.Exchange = Convert.ToDecimal(rdr["Exchange"]);
                    employee.Cancel = Convert.ToBoolean(rdr["Cancel"]);
                    employee.Comit = Convert.ToBoolean(rdr["Comit"]);
                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.Closed = rdr["Closed"].ToString();
                    employee.CloseDate = Convert.ToDateTime(rdr["CloseDate"]);
                    employee.Quantity = Convert.ToInt32(rdr["Quantity"]);
                    employee.Cost_def = rdr["Cost_def"].ToString();
                    employee.GuomId = Convert.ToInt32(rdr["GuomId"]);
                    employee.Guom_Conv = Convert.ToInt16(rdr["Guom_Conv"]);
                    employee.Agency_Per = Convert.ToDecimal(rdr["Agency_Per"]);
                    employee.Bas_Unit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.Remarks = rdr["Remarks"].ToString();
                    employee.ClaimType = rdr["ClaimType"].ToString();
                    employee.NominatedForwarder = rdr["NominatedForwarder"].ToString();
                    employee.CSP = rdr["CSP"].ToString();
                    employee.Buyer_Ref_No = rdr["Buyer_Ref_No"].ToString();
                    employee.TransAmend = rdr["TransAmend"].ToString();
                    employee.ConsigneeId = Convert.ToInt32(rdr["ConsigneeId"]);
                    employee.CreatedBy = Convert.ToInt32(rdr["CreatedBy"]);
                    employee.OrdType = rdr["OrdType"].ToString();
                    employee.Consignee_AddId = Convert.ToInt32(rdr["Consignee_AddId"]);
                    employee.RevQuoteId = Convert.ToInt32(rdr["RevQuoteId"]);
                    employee.RevQuoteNo = rdr["RevQuoteNo"].ToString();
                    employee.Rev = rdr["Rev"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<Buy_Ord_Mas> GetDataListTest(string Ref_No)
        {
            //return entities.Buy_Ord_Mas.Where(c => c.Ref_No == Ref_No);


            List<Buy_Ord_Mas> lstemployee = new List<Buy_Ord_Mas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrderProcessRefnoLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Refno", Ref_No);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Buy_Ord_Mas employee = new Buy_Ord_Mas();

                    employee.Buy_Ord_MasId = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
                    employee.Order_No = rdr["Order_No"].ToString();
                    employee.Order_Date = Convert.ToDateTime(rdr["Order_Date"]);
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.Buyer_AddId = Convert.ToInt32(rdr["Buyer_AddId"]);
                    employee.ManagerId = Convert.ToInt32(rdr["ManagerId"]);
                    employee.MerchandiserId = Convert.ToInt32(rdr["MerchandiserId"]);
                    employee.Ref_No = rdr["Ref_No"].ToString();
                    employee.Ref_Date = Convert.ToDateTime(rdr["Ref_Date"]);
                    employee.Pay_SystemId = Convert.ToInt32(rdr["Pay_SystemId"]);
                    employee.SystemId = Convert.ToInt32(rdr["SystemId"]);
                    employee.Payment_ModeId = Convert.ToInt32(rdr["Payment_ModeId"]);
                    employee.AgentId = Convert.ToInt32(rdr["AgentId"]);
                    employee.Agent_AddId = Convert.ToInt32(rdr["Agent_AddId"]);
                    employee.ShipAgentId = Convert.ToInt32(rdr["ShipAgentId"]);
                    employee.ShipAgent_AddId = Convert.ToInt32(rdr["ShipAgent_AddId"]);
                    employee.CurrencyId = Convert.ToInt32(rdr["CurrencyId"]);
                    employee.Exchange = Convert.ToDecimal(rdr["Agency_Per"]);
                    employee.Cancel = Convert.ToBoolean(rdr["Cancel"]);
                    employee.Comit = Convert.ToBoolean(rdr["Comit"]);
                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.Closed = rdr["Closed"].ToString();
                    employee.CloseDate = Convert.ToDateTime(rdr["CloseDate"]);
                    employee.Quantity = Convert.ToInt32(rdr["Quantity"]);
                    employee.Cost_def = rdr["Cost_def"].ToString();
                    employee.GuomId = Convert.ToInt32(rdr["GuomId"]);
                    employee.Guom_Conv = Convert.ToInt16(rdr["Guom_Conv"]);
                    employee.Agency_Per = Convert.ToDecimal(rdr["Agency_Per"]);
                    employee.Bas_Unit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.Remarks = rdr["Remarks"].ToString();
                    employee.ClaimType = rdr["ClaimType"].ToString();
                    employee.NominatedForwarder = rdr["NominatedForwarder"].ToString();
                    employee.CSP = rdr["CSP"].ToString();
                    employee.Buyer_Ref_No = rdr["Buyer_Ref_No"].ToString();
                    employee.TransAmend = rdr["TransAmend"].ToString();
                    employee.ConsigneeId = Convert.ToInt32(rdr["ConsigneeId"]);
                    employee.CreatedBy = Convert.ToInt32(rdr["CreatedBy"]);
                    employee.OrdType = rdr["OrdType"].ToString();
                    employee.Consignee_AddId = Convert.ToInt32(rdr["Consignee_AddId"]);
                    employee.RevQuoteId = Convert.ToInt32(rdr["RevQuoteId"]);
                    employee.RevQuoteNo = rdr["RevQuoteNo"].ToString();
                    employee.Rev = rdr["Rev"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;

        }
        public Buy_Ord_Mas GetDataById(int id)
        {

            //return entities.Buy_Ord_Mas.Where(c => c.Buy_Ord_MasId == id).FirstOrDefault();

            Buy_Ord_Mas employee = new Buy_Ord_Mas();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrderProcessGetbyIdLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@BMasId", id);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Buy_Ord_MasId = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
                    employee.Order_No = rdr["Order_No"].ToString();
                    employee.Order_Date = Convert.ToDateTime(rdr["Order_Date"]);
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.Buyer_AddId = Convert.ToInt32(rdr["Buyer_AddId"]);
                    employee.ManagerId = Convert.ToInt32(rdr["ManagerId"]);
                    employee.MerchandiserId = Convert.ToInt32(rdr["MerchandiserId"]);
                    employee.Ref_No = rdr["Ref_No"].ToString();
                    employee.Ref_Date = Convert.ToDateTime(rdr["Ref_Date"]);
                    employee.Pay_SystemId = Convert.ToInt32(rdr["Pay_SystemId"]);
                    employee.SystemId = Convert.ToInt32(rdr["SystemId"]);
                    employee.Payment_ModeId = Convert.ToInt32(rdr["Payment_ModeId"]);
                    employee.AgentId = Convert.ToInt32(rdr["AgentId"]);
                    employee.Agent_AddId = Convert.ToInt32(rdr["Agent_AddId"]);
                    employee.ShipAgentId = Convert.ToInt32(rdr["ShipAgentId"]);
                    employee.ShipAgent_AddId = Convert.ToInt32(rdr["ShipAgent_AddId"]);
                    employee.CurrencyId = Convert.ToInt32(rdr["CurrencyId"]);
                    employee.Exchange = Convert.ToDecimal(rdr["Agency_Per"]);
                    employee.Cancel = Convert.ToBoolean(rdr["Cancel"]);
                    employee.Comit = Convert.ToBoolean(rdr["Comit"]);
                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.Closed = rdr["Closed"].ToString();
                    employee.CloseDate = Convert.ToDateTime(rdr["CloseDate"]);
                    employee.Quantity = Convert.ToInt32(rdr["Quantity"]);
                    employee.Cost_def = rdr["Cost_def"].ToString();
                    employee.GuomId = Convert.ToInt32(rdr["GuomId"]);
                    employee.Guom_Conv = Convert.ToInt16(rdr["Guom_Conv"]);
                    employee.Agency_Per = Convert.ToDecimal(rdr["Agency_Per"]);
                    employee.Bas_Unit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.Remarks = rdr["Remarks"].ToString();
                    employee.ClaimType = rdr["ClaimType"].ToString();
                    employee.NominatedForwarder = rdr["NominatedForwarder"].ToString();
                    employee.CSP = rdr["CSP"].ToString();
                    employee.Buyer_Ref_No = rdr["Buyer_Ref_No"].ToString();
                    employee.TransAmend = rdr["TransAmend"].ToString();
                    employee.ConsigneeId = Convert.ToInt32(rdr["ConsigneeId"]);
                    employee.CreatedBy = Convert.ToInt32(rdr["CreatedBy"]);
                    employee.OrdType = rdr["OrdType"].ToString();
                    employee.Consignee_AddId = Convert.ToInt32(rdr["Consignee_AddId"]);
                    employee.RevQuoteId = Convert.ToInt32(rdr["RevQuoteId"]);
                    employee.RevQuoteNo = rdr["RevQuoteNo"].ToString();
                    employee.Rev = rdr["Rev"].ToString();
                    employee.OrdPost = rdr["OrdPost"].ToString();
                    employee.PlanPost = rdr["PlanPost"].ToString();
                    employee.ParentOrderId = Convert.ToInt32(rdr["ParentOrderId"]);
                    employee.Sam_Ord_Type = entities.Sam_Ord_Type.Where(d => d.Buy_ord_masid == id).ToList();

                }
            }
            return employee;
        }

        public IQueryable<BulkOrder> MainGetTargetBulkOrder(int? companyId, string orderNo, string RefNo, int? BuyerId, string fromDate, string toDate, string OrderType)
        {
            string OType = "";

            if (OrderType == "0")
            {
                OType = "B";
            }
            else
            {
                OType = OrderType;
            }

            IQueryable<BulkOrder> query = (from cd1 in entities.Proc_Apparel_GetBulkOrderTargetMainDetails(companyId == null ? 0 : companyId, string.IsNullOrEmpty(orderNo) ? "" : orderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, BuyerId == null ? 0 : BuyerId, fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString(), OType)
                                           select new BulkOrder
                                           {

                                               CompanyId = (int)cd1.companyid,
                                               Company = cd1.Company,
                                               Buyer = cd1.Buyer,
                                               BuyerId = (int)cd1.BuyerId,
                                               Order_No = cd1.order_no,
                                               Order_Date = (DateTime)cd1.Order_date,
                                               Ref_No = cd1.Ref_no,
                                               Quantity = (int)cd1.Quantity,
                                               Buy_Ord_MasId = (int)cd1.Buy_Ord_MasId,
                                               StyleCount = (int)cd1.StyleCount,
                                               OrdApp = cd1.Approved,
                                               GCount = (int)cd1.GCount,
                                               OICount = (int)cd1.OICount

                                           }).AsQueryable();
            return query;
        }

        public IQueryable<BulkOrder> GetDataMainList(int? companyId, string orderNo, string RefNo, int? BuyerId, string fromDate, string toDate, string OrderType, string DispatchClosed)
        {
            try
            {
                string OType = "";

                if (OrderType == "0")
                {
                    OType = "B";
                }
                else
                {
                    OType = OrderType;
                }

                IQueryable<BulkOrder> query = (from cd1 in entities.Proc_Apparel_GetBulkOrderMainDetails(companyId == null ? 0 : companyId, string.IsNullOrEmpty(orderNo) ? "" : orderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, BuyerId == null ? 0 : BuyerId, fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString(), OType, DispatchClosed)
                                               select new BulkOrder
                                               {

                                                   CompanyId = (int)cd1.companyid,
                                                   Company = cd1.Company,
                                                   Buyer = cd1.Buyer,
                                                   BuyerId = (int)cd1.BuyerId,
                                                   Order_No = cd1.order_no,
                                                   Order_Date = (DateTime)cd1.Order_date,
                                                   Ref_No = cd1.Ref_no,
                                                   Quantity = (int)cd1.Quantity,
                                                   Buy_Ord_MasId = (int)cd1.Buy_Ord_MasId,
                                                   StyleCount = (int)cd1.StyleCount,
                                                   OrdApp = cd1.Approved,
                                                   GCount = (int)cd1.GCount,
                                                   OICount = (int)cd1.OICount

                                               }).AsQueryable();
                return query;
            }

            catch (Exception Ex)
            {
                string OType = "";

                if (OrderType == "0")
                {
                    OType = "B";
                }
                else
                {
                    OType = OrderType;
                }

                IQueryable<BulkOrder> query = (from cd1 in entities.Proc_Apparel_GetBulkOrderMainDetails(companyId == null ? 0 : companyId, string.IsNullOrEmpty(orderNo) ? "" : orderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, BuyerId == null ? 0 : BuyerId, fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString(), OType, DispatchClosed)
                                               select new BulkOrder
                                               {

                                                   CompanyId = (int)cd1.companyid,
                                                   Company = cd1.Company,
                                                   Buyer = cd1.Buyer,
                                                   BuyerId = (int)cd1.BuyerId,
                                                   Order_No = cd1.order_no,
                                                   Order_Date = (DateTime)cd1.Order_date,
                                                   Ref_No = cd1.Ref_no,
                                                   Quantity = (int)cd1.Quantity,
                                                   Buy_Ord_MasId = (int)cd1.Buy_Ord_MasId,
                                                   StyleCount = (int)cd1.StyleCount,
                                                   OrdApp = cd1.Approved,
                                                   GCount = (int)cd1.GCount,
                                                   OICount = (int)cd1.OICount

                                               }).AsQueryable();
                return query;
            }

        }



        public bool UpdateDetData(Buy_Ord_Mas objAd, List<NominatedSupplier> objPDet, List<Sam_Ord_Type> samTypeObj, string buyordNo, BuyerAmendDetails objAmdAd)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var App = entities.Buy_Ord_Mas.Where(c => c.Buy_Ord_MasId == objAd.Buy_Ord_MasId).FirstOrDefault();
                    if (App != null)
                    {

                        App.Order_No = objAd.Order_No;
                        App.Order_Date = objAd.Order_Date;
                        App.BuyerId = objAd.BuyerId;
                        App.Buyer_AddId = objAd.Buyer_AddId;
                        App.ManagerId = objAd.ManagerId;
                        App.MerchandiserId = objAd.MerchandiserId;
                        App.Ref_No = objAd.Ref_No;
                        App.Ref_Date = objAd.Ref_Date;
                        App.Pay_SystemId = objAd.Pay_SystemId;
                        App.SystemId = objAd.SystemId;
                        App.Payment_ModeId = objAd.Payment_ModeId;
                        App.AgentId = objAd.AgentId;
                        App.Agent_AddId = objAd.AgentId;
                        App.ShipAgentId = objAd.ShipAgentId;
                        App.ShipAgent_AddId = objAd.ShipAgentId;
                        App.CurrencyId = null;
                        App.Exchange = objAd.Exchange;
                        App.Cancel = objAd.Cancel;
                        App.Comit = objAd.Comit;
                        App.CompanyId = objAd.CompanyId;
                        App.Closed = objAd.Closed;
                        App.CloseDate = objAd.CloseDate;
                        App.Quantity = objAd.Quantity;
                        App.Cost_def = objAd.Cost_def;
                        App.GuomId = objAd.GuomId;
                        App.Guom_Conv = objAd.Guom_Conv;
                        App.Agency_Per = 1;
                        App.Bas_Unit = objAd.Bas_Unit;
                        App.Remarks = "";
                        App.ClaimType = objAd.ClaimType;
                        App.NominatedForwarder = objAd.NominatedForwarder;
                        App.CSP = objAd.CSP;
                        App.Buyer_Ref_No = objAd.Buyer_Ref_No;
                        App.TransAmend = objAd.TransAmend;
                        App.ConsigneeId = objAd.ConsigneeId;
                        App.CreatedBy = objAd.CreatedBy;
                        App.OrdType = objAd.OrdType;
                        App.Consignee_AddId = objAd.ConsigneeId;
                        App.ParentOrderId = objAd.ParentOrderId;
                        App.QuoteId = objAd.QuoteId;
                        App.Modify_Date = DateTime.Now;//.ToString("hh:mm dddd, dd MMMM yyyy");
                        App.ModifyBy = objAd.CreatedBy;
                        App.PA = objAd.PA;
                        App.RevQuoteId = (int)objAd.RevQuoteId;
                        App.RevQuoteNo = objAd.RevQuoteNo;
                        App.Rev = objAd.Rev;
                    }
                    entities.SaveChanges();


                    int Pgc = entities.Proc_Apparel_InsertBuyOrdAmdDetails(objAmdAd.Order_no, objAmdAd.Styleid, objAmdAd.AmendQty, objAmdAd.amendDate);
                    entities.SaveChanges();


                    //var AppMas = entities.BuyerAmendDetails.Where(c => c.Order_no == objAmdAd.Order_no).FirstOrDefault();
                    //if (AppMas != null)
                    //{
                    //    AppMas.amendDate = objAmdAd.amendDate;                      
                    //}
                    //entities.SaveChanges();


                    var Det = entities.NominatedSupplier.Where(u => u.Order_no == buyordNo);

                    foreach (var u in Det)
                    {
                        if (u.NomSupId > 0)
                        {
                            entities.NominatedSupplier.Remove(u);
                        }
                    }
                    entities.SaveChanges();

                    foreach (var supp in objPDet)
                    {
                        supp.Order_no = buyordNo;
                        entities.NominatedSupplier.Add(supp);
                    }
                    entities.SaveChanges();

                    //Delete & Add Sample Type on Edit Mode Begin
                    var SamTypeDet = entities.Sam_Ord_Type.Where(u => u.Buy_ord_masid == objAd.Buy_Ord_MasId);

                    foreach (var u in SamTypeDet)
                    {
                        entities.Sam_Ord_Type.Remove(u);
                    }
                    entities.SaveChanges();

                    foreach (var samp in samTypeObj)
                    {
                        entities.Sam_Ord_Type.Add(samp);
                    }
                    entities.SaveChanges();
                    //Delete & Add Sample Type on Edit Mode End

                    var result = AmendData(objAd, objPDet, samTypeObj, buyordNo, objAd.Buy_Ord_MasId, "Upd");
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BulkOrder-UpdateDetData");
                }

            }
            return reserved;
        }
        public bool DeleteData(int Id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //delete nomi
                    var OrderNo = "";
                    var OQuery = entities.Buy_Ord_Mas.Where(b => b.Buy_Ord_MasId == Id).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OrderNo = OQuery.Order_No;
                    }

                    //delete Sam_Ord_Type Many Rows table
                    var deleteSampleOrderType = entities.Sam_Ord_Type.Where(d => d.Buy_ord_masid == Id).ToList<Sam_Ord_Type>();
                    deleteSampleOrderType.ForEach(c => entities.Sam_Ord_Type.Remove(c));
                    entities.SaveChanges();

                    var Det2 = entities.NominatedSupplier.Where(w => w.Order_no == OrderNo);
                    foreach (var w in Det2)
                    {
                        entities.NominatedSupplier.Remove(w);
                    }
                    entities.SaveChanges();
                    //
                    var addl = entities.Buy_Ord_Mas.Where(c => c.Buy_Ord_MasId == Id).FirstOrDefault();
                    if (addl != null)
                    {
                        entities.Buy_Ord_Mas.Remove(addl);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BulkOrder-DeleteData");
                }

            }
            return reserved;
        }


        public Buy_Ord_Mas ListMainGrid(string RefNo)
        {
            //return entities.Buy_Ord_Mas.Where(c => c.Ref_No == RefNo).FirstOrDefault();

            Buy_Ord_Mas employee = new Buy_Ord_Mas();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrderProcessRefnoLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Refno", RefNo);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Buy_Ord_MasId = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
                    employee.Order_No = rdr["Order_No"].ToString();
                    employee.Order_Date = Convert.ToDateTime(rdr["Order_Date"]);
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.Buyer_AddId = Convert.ToInt32(rdr["Buyer_AddId"]);
                    employee.ManagerId = Convert.ToInt32(rdr["ManagerId"]);
                    employee.MerchandiserId = Convert.ToInt32(rdr["MerchandiserId"]);
                    employee.Ref_No = rdr["Ref_No"].ToString();
                    employee.Ref_Date = Convert.ToDateTime(rdr["Ref_Date"]);
                    employee.Pay_SystemId = Convert.ToInt32(rdr["Pay_SystemId"]);
                    employee.SystemId = Convert.ToInt32(rdr["SystemId"]);
                    employee.Payment_ModeId = Convert.ToInt32(rdr["Payment_ModeId"]);
                    employee.AgentId = Convert.ToInt32(rdr["AgentId"]);
                    employee.Agent_AddId = Convert.ToInt32(rdr["Agent_AddId"]);
                    employee.ShipAgentId = Convert.ToInt32(rdr["ShipAgentId"]);
                    employee.ShipAgent_AddId = Convert.ToInt32(rdr["ShipAgent_AddId"]);
                    employee.CurrencyId = Convert.ToInt32(rdr["CurrencyId"]);
                    employee.Exchange = Convert.ToDecimal(rdr["Agency_Per"]);
                    employee.Cancel = Convert.ToBoolean(rdr["Cancel"]);
                    employee.Comit = Convert.ToBoolean(rdr["Comit"]);
                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.Closed = rdr["Closed"].ToString();
                    employee.CloseDate = Convert.ToDateTime(rdr["CloseDate"]);
                    employee.Quantity = Convert.ToInt32(rdr["Quantity"]);
                    employee.Cost_def = rdr["Cost_def"].ToString();
                    employee.GuomId = Convert.ToInt32(rdr["GuomId"]);
                    employee.Guom_Conv = Convert.ToInt16(rdr["Guom_Conv"]);
                    employee.Agency_Per = Convert.ToDecimal(rdr["Agency_Per"]);
                    employee.Bas_Unit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.Remarks = rdr["Remarks"].ToString();
                    employee.ClaimType = rdr["ClaimType"].ToString();
                    employee.NominatedForwarder = rdr["NominatedForwarder"].ToString();
                    employee.CSP = rdr["CSP"].ToString();
                    employee.Buyer_Ref_No = rdr["Buyer_Ref_No"].ToString();
                    employee.TransAmend = rdr["TransAmend"].ToString();
                    employee.ConsigneeId = Convert.ToInt32(rdr["ConsigneeId"]);
                    employee.CreatedBy = Convert.ToInt32(rdr["CreatedBy"]);
                    employee.OrdType = rdr["OrdType"].ToString();
                    employee.Consignee_AddId = Convert.ToInt32(rdr["Consignee_AddId"]);
                    employee.RevQuoteId = Convert.ToInt32(rdr["RevQuoteId"]);
                    employee.RevQuoteNo = rdr["RevQuoteNo"].ToString();
                    employee.ParentOrderId = Convert.ToInt32(rdr["ParentOrderId"]);
                    employee.Rev = rdr["Rev"].ToString();
                }
            }
            return employee;
        }



        public bool AddDetData(Buy_Ord_Mas objAd, List<NominatedSupplier> objPDet, List<Sam_Ord_Type> samTypeObj, string buyordNo)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var id = entities.Buy_Ord_Mas.Add(objAd);
                    entities.SaveChanges();
                    int masid = objAd.Buy_Ord_MasId;

                    if (objAd.OrdPost == "P")
                    {
                        if (objAd.OrdType == "B")
                        {
                            int Pgc = entities.Proc_Apparel_CopyOrder(objAd.FOrderNo, objAd.Order_No);
                            entities.SaveChanges();
                        }
                        if (objAd.OrdType == "S")
                        {
                            int Pgc = entities.Proc_Apparel_SampleCopyOrder(objAd.FOrderNo, objAd.Order_No);
                            entities.SaveChanges();
                        }
                    }
                    if (objAd.PlanPost == "P")
                    {
                        if (objAd.OrdType == "B")
                        {
                            int Pgc1 = entities.Proc_Apparel_CopyOrderPlanning(objAd.FOrderNo, objAd.Order_No);
                            entities.SaveChanges();
                        }
                        if (objAd.OrdType == "S")
                        {
                            int Pgc = entities.Proc_Apparel_CopySampleOrderPlanning(objAd.FOrderNo, objAd.Order_No);
                            entities.SaveChanges();
                        }
                    }


                    foreach (var supp in objPDet)
                    {
                        supp.Order_no = buyordNo;
                        entities.NominatedSupplier.Add(supp);
                    }

                    foreach (var samp in samTypeObj)
                    {
                        samp.Buy_ord_masid = masid;
                        entities.Sam_Ord_Type.Add(samp);
                    }

                    var result = AmendData(objAd, objPDet, samTypeObj, buyordNo, masid, "Add");

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


        public IList<BulkOrder> GetRepGetNomSupplier(int BMasId)
        {

            BuyMasId = BMasId;
            var query = (from Ec in entities.Proc_Apparel_GetOrderNomSupList(BMasId)
                         select new BulkOrder
                         {

                             Supplier = Ec.Supplier,
                             SupplierId = Ec.SupplierId,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<BulkOrder> GetRepGetNomItemSupplier(string Supplier, int BID)
        {
            var query = (from Ec in entities.Proc_Apparel_GetOrderNomItmList(Supplier, BID)
                         select new BulkOrder
                         {

                             Item = Ec.Item,
                             Supplier = Ec.Supplier,
                             Order_No = Ec.Order_no,
                             ItemId = (int)Ec.ItemID,
                             SupplierId = Ec.SupplierId,
                             NomSupId = Ec.NomSupId,

                         }).AsQueryable();

            return query.ToList();
        }



        public Buy_Ord_Mas CheckRefRep(string RefNo)
        {
            //return entities.Buy_Ord_Mas.Where(c => c.Ref_No == RefNo).FirstOrDefault();
            Buy_Ord_Mas employee = new Buy_Ord_Mas();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrderProcessRefnoLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Refno", RefNo);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Buy_Ord_MasId = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
                    employee.Order_No = rdr["Order_No"].ToString();
                    employee.Order_Date = Convert.ToDateTime(rdr["Order_Date"]);
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.Buyer_AddId = Convert.ToInt32(rdr["Buyer_AddId"]);
                    employee.ManagerId = Convert.ToInt32(rdr["ManagerId"]);
                    employee.MerchandiserId = Convert.ToInt32(rdr["MerchandiserId"]);
                    employee.Ref_No = rdr["Ref_No"].ToString();
                    employee.Ref_Date = Convert.ToDateTime(rdr["Ref_Date"]);
                    employee.Pay_SystemId = Convert.ToInt32(rdr["Pay_SystemId"]);
                    employee.SystemId = Convert.ToInt32(rdr["SystemId"]);
                    employee.Payment_ModeId = Convert.ToInt32(rdr["Payment_ModeId"]);
                    employee.AgentId = Convert.ToInt32(rdr["AgentId"]);
                    employee.Agent_AddId = Convert.ToInt32(rdr["Agent_AddId"]);
                    employee.ShipAgentId = Convert.ToInt32(rdr["ShipAgentId"]);
                    employee.ShipAgent_AddId = Convert.ToInt32(rdr["ShipAgent_AddId"]);
                    employee.CurrencyId = Convert.ToInt32(rdr["CurrencyId"]);
                    employee.Exchange = Convert.ToDecimal(rdr["Agency_Per"]);
                    employee.Cancel = Convert.ToBoolean(rdr["Cancel"]);
                    employee.Comit = Convert.ToBoolean(rdr["Comit"]);
                    employee.CompanyId = Convert.ToInt32(rdr["CompanyId"]);
                    employee.Closed = rdr["Closed"].ToString();
                    employee.CloseDate = Convert.ToDateTime(rdr["CloseDate"]);
                    employee.Quantity = Convert.ToInt32(rdr["Quantity"]);
                    employee.Cost_def = rdr["Cost_def"].ToString();
                    employee.GuomId = Convert.ToInt32(rdr["GuomId"]);
                    employee.Guom_Conv = Convert.ToInt16(rdr["Guom_Conv"]);
                    employee.Agency_Per = Convert.ToDecimal(rdr["Agency_Per"]);
                    employee.Bas_Unit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.Remarks = rdr["Remarks"].ToString();
                    employee.ClaimType = rdr["ClaimType"].ToString();
                    employee.NominatedForwarder = rdr["NominatedForwarder"].ToString();
                    employee.CSP = rdr["CSP"].ToString();
                    employee.Buyer_Ref_No = rdr["Buyer_Ref_No"].ToString();
                    employee.TransAmend = rdr["TransAmend"].ToString();
                    employee.ConsigneeId = Convert.ToInt32(rdr["ConsigneeId"]);
                    employee.CreatedBy = Convert.ToInt32(rdr["CreatedBy"]);
                    employee.OrdType = rdr["OrdType"].ToString();
                    employee.Consignee_AddId = Convert.ToInt32(rdr["Consignee_AddId"]);
                    employee.RevQuoteId = Convert.ToInt32(rdr["RevQuoteId"]);
                    employee.RevQuoteNo = rdr["RevQuoteNo"].ToString();
                    employee.Rev = rdr["Rev"].ToString();
                }
            }
            return employee;
        }


        public IQueryable<BulkOrder> GetDataRepCheckPlanJobDetails(string OrdNo)
        {
            IQueryable<BulkOrder> query = (from a in entities.Proc_Apparel_GetBulkOrderCheckBomJob(OrdNo)
                                           select new BulkOrder
                                           {

                                               CheckBom = (int)a.CheckBom,
                                               CheckJob = (int)a.CheckJob,


                                           }).AsQueryable();

            return query;
        }


        public bool AmendData(Buy_Ord_Mas objAd, List<NominatedSupplier> objPDet, List<Sam_Ord_Type> samTypeObj, string buyordNo, int masid, string Mode)
        {

            bool reserved = false;

            try
            {
                Repository.Buy_Ord_Mas_Amend buyordamd = new Repository.Buy_Ord_Mas_Amend();
                if (objAd != null)
                {
                    buyordamd.Buy_Ord_MasId = masid;
                    buyordamd.Order_No = objAd.Order_No;
                    if (Mode == "Add")
                    {
                        buyordamd.Order_Date = objAd.Order_Date;
                    }
                    if (Mode == "Upd")
                    {
                        buyordamd.Order_Date = DateTime.Now;
                    }
                    buyordamd.BuyerId = objAd.BuyerId;
                    buyordamd.Buyer_AddId = objAd.Buyer_AddId;
                    buyordamd.ManagerId = objAd.ManagerId;
                    buyordamd.MerchandiserId = objAd.MerchandiserId;
                    buyordamd.Ref_No = objAd.Ref_No;
                    buyordamd.Ref_Date = objAd.Ref_Date;
                    buyordamd.Pay_SystemId = objAd.Pay_SystemId;
                    buyordamd.SystemId = objAd.SystemId;
                    buyordamd.Payment_ModeId = objAd.Payment_ModeId;
                    buyordamd.AgentId = objAd.AgentId;
                    buyordamd.Agent_AddId = objAd.Agent_AddId;
                    buyordamd.ShipAgentId = objAd.ShipAgentId;
                    buyordamd.ShipAgent_AddId = objAd.ShipAgent_AddId;
                    buyordamd.CurrencyId = objAd.CurrencyId;
                    buyordamd.Exchange = objAd.Exchange;
                    buyordamd.Cancel = objAd.Cancel;
                    buyordamd.Comit = objAd.Comit;
                    buyordamd.CompanyId = objAd.CompanyId;
                    buyordamd.Closed = objAd.Closed;
                    buyordamd.CloseDate = objAd.CloseDate;
                    buyordamd.Quantity = objAd.Quantity;
                    buyordamd.Cost_def = objAd.Cost_def;
                    buyordamd.GuomId = objAd.GuomId;
                    buyordamd.Guom_Conv = objAd.Guom_Conv;
                    buyordamd.Agency_Per = objAd.Agency_Per;
                    buyordamd.Bas_Unit = objAd.Bas_Unit;
                    buyordamd.Remarks = objAd.Remarks;
                    buyordamd.ClaimType = objAd.ClaimType;
                    buyordamd.NominatedForwarder = objAd.NominatedForwarder;
                    buyordamd.CSP = objAd.CSP;
                    buyordamd.Buyer_Ref_No = objAd.Buyer_Ref_No;
                    buyordamd.TransAmend = objAd.TransAmend;
                    buyordamd.ConsigneeId = objAd.ConsigneeId;
                    buyordamd.CreatedBy = objAd.CreatedBy;
                    buyordamd.OrdType = objAd.OrdType;
                    buyordamd.Consignee_AddId = objAd.Consignee_AddId;
                    buyordamd.ParentOrderId = objAd.ParentOrderId;
                    buyordamd.EnquiryId = objAd.EnquiryId;
                    buyordamd.QuoteId = objAd.QuoteId;
                    buyordamd.PA = objAd.PA;

                }

                entities.Buy_Ord_Mas_Amend.Add(buyordamd);

                entities.SaveChanges();

                var List = new List<Repository.NominatedSupplier_Amend>();
                foreach (var ad in objPDet)
                {
                    List.Add(new Repository.NominatedSupplier_Amend
                    {
                        NomSupId = ad.NomSupId,
                        //Order_no = ad.Order_no,
                        Supplierid = ad.Supplierid,
                        Itemid = ad.Itemid,
                        ORDERTYPE = ad.ORDERTYPE
                    });
                }

                foreach (var supp in List)
                {
                    supp.Order_no = buyordNo;
                    entities.NominatedSupplier_Amend.Add(supp);
                }

                var sampList = new List<Repository.Sam_Ord_Type_Amend>();
                foreach (var samp in samTypeObj)
                {
                    sampList.Add(new Repository.Sam_Ord_Type_Amend
                    {
                        Buy_ord_masid = samp.Buy_ord_masid,
                        SamRecId = samp.RecId,
                        SamTypeId = samp.SamTypeId,
                        SamTypeQty = samp.SamTypeQty,
                    });
                }

                foreach (var suamtype in sampList)
                {
                    entities.Sam_Ord_Type_Amend.Add(suamtype);
                }

                reserved = true;

                entities.SaveChanges();


            }
            catch (Exception ex)
            {

                exceplogg.SendExcepToDB(ex, "BulkOrder-AddDetData");
            }

            return reserved;
        }
    }
}
