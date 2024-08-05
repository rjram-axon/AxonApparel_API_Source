using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace AxonApparel.Repository
{
    public class OrderDashRepository : IOrderDashRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;


        public IList<OrderDash> GetDataDashRep(string frmDate, string ToDate)
        {


            var query = (from ID in entities.Proc_Apparel_GetOrderWiseDashDetails(frmDate, ToDate)
                         select new OrderDash
                         {
                             OPerCent = (decimal)ID.Percentage,
                             OrderNo = ID.Order_NO,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<OrderDash> GetDataDashDetRep(string frmDate, string ToDate)
        {
            var query = (from ID1 in entities.Proc_Apparel_GetOrderWiseDashInvDetails(frmDate, ToDate)
                         select new OrderDash
                         {
                             DPerCent = (decimal)ID1.Percentage,
                             OrderNo = ID1.Order_NO,
                             Process = ID1.ItemGroup,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<OrderDash> GetDataDashBalRep()
        {
            var query = (from ID2 in entities.Proc_Apparel_GetOrderDespDetails()
                         select new OrderDash
                         {
                             TotDesQty = (decimal)ID2.DesOrder,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<OrderDash> GetDataDashRunRep()
        {
            var query = (from ID2 in entities.Proc_Apparel_GetOrderRunDetails()
                         select new OrderDash
                         {
                             TotProdRunQty = (decimal)ID2.CRunOrder,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<OrderDash> GetDataStyleDashRep(string FDt, string TDt)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetStyleWiseDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = FDt;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = TDt;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.stlyeid = Convert.ToInt32(rdr["styleid"]);
                    obj.stlye = rdr["style"].ToString();
                    //obj.Process = rdr["Process"].ToString();


                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<OrderDash> GetDataStyleDashDetRep(string FDt, string TDt)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetStyleWiseProcessDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = FDt;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = TDt;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.DStyleQty = Convert.ToInt32(rdr["RecQty"]);
                    obj.Process = rdr["Process"].ToString();
                    obj.stlye = rdr["style"].ToString();


                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }


        public IList<OrderDash> GetDataBuyDashRep(string FDt, string TDt)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetBuyerWiseDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = FDt;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = TDt;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.Buyerid = Convert.ToInt32(rdr["buyerid"]);
                    obj.Buyer = rdr["Buyer"].ToString();


                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<OrderDash> GetDataBuyDashDetRep(string FDt, string TDt)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetBuyerWiseDetailsDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = FDt;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = TDt;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.BuyQty = Convert.ToInt32(rdr["BQty"]);
                    obj.Buyer = rdr["Buyer"].ToString();


                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }


        public IList<OrderDash> GetDataYarnDashRep(string FDt, string TDt)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetYarnWiseDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = FDt;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = TDt;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.ItemId = Convert.ToInt32(rdr["ItemId"]);
                    obj.Item = rdr["Item"].ToString();


                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<OrderDash> GetDataYarnDashDetRep(string FDt, string TDt)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetYarnDetWiseDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = FDt;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = TDt;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.ItemId = Convert.ToInt32(rdr["ItemId"]);
                    obj.Item = rdr["Item"].ToString();
                    obj.ItmStkQty = Convert.ToInt32(rdr["YarnStk"]);

                    List.Add(obj);
                }
                con.Close();
            }

            return List;
        }


        public IList<OrderDash> GetDataOrderDashRep(string frmDate, string ToDate)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrdWiseStockDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = frmDate;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = ToDate;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.OrdStkQty = Convert.ToInt32(rdr["Stock"]);
                    obj.OrderNo = rdr["Ref_No"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }

            return List;
        }

        public IList<OrderDash> GetDataOrderDashDetRep(string frmDate, string ToDate)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrdWiseStockDetDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = frmDate;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = ToDate;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.OrderNo = rdr["Ref_No"].ToString();
                    obj.OrdStkItem = rdr["item"].ToString();
                    obj.OrdStkQty = Convert.ToInt32(rdr["Stock"]);

                    List.Add(obj);
                }
                con.Close();
            }

            return List;
        }




        public IList<OrderDash> GetDataDetDashRep(string frmDate, string ToDate)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrdDesWiseDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = frmDate;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = ToDate;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.RefNo = rdr["Ref_No"].ToString();
                    obj.OrderNo = rdr["Order_No"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }

            return List;
        }

        public IList<OrderDash> GetDataDetDashDetRep(string frmDate, string ToDate)
        {
            List<Domain.OrderDash> List = new List<Domain.OrderDash>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrdDesDetWiseDashDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 20).Value = frmDate;
                cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 20).Value = ToDate;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.OrderDash obj = new Domain.OrderDash();

                    obj.TotBalQty = Convert.ToInt32(rdr["BQty"]);
                    obj.TotDesQty = Convert.ToInt32(rdr["Dqty"]);
                    obj.TotProdRunQty = Convert.ToInt32(rdr["PQty"]);
                    obj.RefNo = rdr["Ref_No"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }

            return List;
        }

        public IEnumerable<OrderDash> LoadChatUsers(int FromUserId)
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<OrderDash> lstdashboard = new List<OrderDash>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_TandA_LoadChatUsers", con);
                cmd.Parameters.Add("@FromUserId", SqlDbType.Int, 20).Value = FromUserId;
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    OrderDash employee = new OrderDash();
                    employee.Chat_UserId = Convert.ToInt32(rdr["UserId"]);
                    employee.Chat_Username = rdr["Username"].ToString();
                    employee.Chat_Message = rdr["Chat_Message"].ToString();
                    employee.Chat_Time = rdr["Chat_Time"].ToString();

                    lstdashboard.Add(employee);
                }
                con.Close();
            }
            return lstdashboard;
        }

        public IEnumerable<OrderDash> LoadChatUsers_NewMessage(int FromUserId)
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<OrderDash> lstdashboard = new List<OrderDash>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_TandA_LoadChatUsers_NewMessage", con);
                cmd.Parameters.Add("@FromUserId", SqlDbType.Int, 20).Value = FromUserId;
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    OrderDash employee = new OrderDash();
                    employee.Chat_UserId = Convert.ToInt32(rdr["UserId"]);
                    employee.Chat_Username = rdr["Username"].ToString();
                    employee.Chat_Message = rdr["Chat_Message"].ToString();
                    employee.Chat_Time = rdr["Chat_Time"].ToString();
                    employee.TimeTaken = rdr["TimeTaken"].ToString();

                    lstdashboard.Add(employee);
                }
                con.Close();
            }
            return lstdashboard;
        }

        public IEnumerable<OrderDash> LoadChatUsers_GetNewMessageCount(int FromUserId)
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<OrderDash> lstdashboard = new List<OrderDash>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_TandA_GetNewMessageCount", con);
                cmd.Parameters.Add("@FromUserId", SqlDbType.Int, 20).Value = FromUserId;
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    OrderDash employee = new OrderDash();
                    employee.Chat_NewMsgCnt = Convert.ToInt32(rdr["NewMsgCnt"]);

                    lstdashboard.Add(employee);
                }
                con.Close();
            }
            return lstdashboard;
        }

        public IEnumerable<OrderDash> LoadChatMsg(int FromUserId, int ToUserId)
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<OrderDash> lstdashboard = new List<OrderDash>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_TandA_LoadChatMsg", con);
                cmd.Parameters.Add("@FromUserId", SqlDbType.Int, 20).Value = FromUserId;
                cmd.Parameters.Add("@ToUserId", SqlDbType.Int, 20).Value = ToUserId;
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    OrderDash employee = new OrderDash();
                    employee.Chat_UserId = Convert.ToInt32(rdr["UserId"]);
                    employee.Chat_Username = rdr["Username"].ToString();
                    employee.Chat_Message = rdr["Chat_Message"].ToString();
                    employee.Chat_Time = rdr["ChatTime"].ToString();
                    employee.Chat_Isfromuser = Convert.ToInt32(rdr["Isfromuser"]);

                    employee.Chat_ToUsername = rdr["ToUsername"].ToString();

                    lstdashboard.Add(employee);
                }
                con.Close();
            }
            return lstdashboard;
        }

        public IEnumerable<OrderDash> LoadAllMsg(int FromUserId)
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<OrderDash> lstdashboard = new List<OrderDash>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_TandA_LoadAllMsg", con);
                cmd.Parameters.Add("@FromUserId", SqlDbType.Int, 20).Value = FromUserId;
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    OrderDash employee = new OrderDash();
                    employee.Chat_UserId = Convert.ToInt32(rdr["UserId"]);
                    employee.Chat_Username = rdr["Username"].ToString();
                    employee.Chat_Message = rdr["Chat_Message"].ToString();
                    employee.Chat_Time = rdr["ChatTime"].ToString();
                    employee.Chat_Isfromuser = Convert.ToInt32(rdr["Isfromuser"]);

                    employee.Chat_ToUsername = rdr["ToUsername"].ToString();

                    lstdashboard.Add(employee);
                }
                con.Close();
            }
            return lstdashboard;
        }

        public bool AddDetData(TandA_Chat obj)
        {
            bool reserved = false;
            int Masid = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    entities.TandA_Chat.Add(obj);
                    entities.SaveChanges();
                    Masid = obj.Id;

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    //  exceplogg.SendExcepToDB(ex, "ProcessOrder-AddDetData");
                }
            }
            return reserved;
        }

        public bool Update_IsRead(TandA_Chat objupd)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //var Upd = entities.TandA_Chat.Where(c => c.From_Id == objupd.To_Id && c.To_Id == objupd.From_Id).FirstOrDefault();

                    var Upd = entities.TandA_Chat.Where(c => c.From_Id == objupd.To_Id && c.To_Id == objupd.From_Id && c.IsRead == false);
                    if (Upd != null)
                    {
                        foreach (var item in Upd)
                        {
                            var UpdDet = entities.TandA_Chat.Where(c => c.Id == item.Id).FirstOrDefault();

                            UpdDet.IsRead = Convert.ToBoolean(1);

                            entities.SaveChanges();
                        }


                        //if(Upd.)
                        // Upd.IsRead = Convert.ToBoolean(1);

                        //entities.SaveChanges();
                    }

                    //bool UCMR = MarkUpRateOrdUpdation(objupd.processordid);

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    // exceplogg.SendExcepToDB(ex, "ProcessOrder-UpdDetData");
                }
            }
            return reserved;
        }
    }
}
