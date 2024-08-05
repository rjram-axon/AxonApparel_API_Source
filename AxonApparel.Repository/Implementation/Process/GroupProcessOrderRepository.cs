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
    public class GroupProcessOrderRepository : IGroupProcessOrderRepository
    {

        ProcessEntities entities = new ProcessEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IQueryable<Domain.Group_Prod_Prg_Det> LoadInputitmsgrid(string closed, string jobordno, string procid)
        {
            string Id = "";
            if (jobordno != "")
            {
                Id = jobordno;
            }
            else
            {
                Id = "";
            }
            var query = (from YD in entities.Proc_Apparel_LoadGroupProcessInputitem(closed, string.IsNullOrEmpty(Id) ? "" : Id, procid)
                         select new Domain.Group_Prod_Prg_Det
                         {

                             Itemid = (int)YD.itemid,
                             Item = YD.item,
                             Colorid = (int)YD.colorid,
                             Color = YD.color,
                             Sizeid = (int)YD.sizeid,
                             Size = YD.size,

                             BalanceQty = (decimal)YD.Bal,
                             Prog_Op_Qty = (decimal)YD.prog_op_qty,
                             InorOut = YD.InorOut,

                             rate = 0,

                             Processid = YD.processid,
                             Process = YD.process,
                             Prodprgid = YD.ProdPrgid,
                             ProdPrgNo = YD.ProdPrgNo,
                             GrpQty = 0,
                             GrpProdPrgid = 0,
                             GrpProdPgmdetid = 0,
                             Prodprgdetid = 0,
                         }).AsQueryable();

            return query;
        }

        public IList<Domain.Group_Prod_Prg_Det> LoadOutputitmsgrid(string closed, string jobordno, string procid)
        {
            string Id = "";
            if (jobordno != "")
            {
                Id = jobordno;
            }
            else
            {
                Id = "";
            }


            List<Domain.Group_Prod_Prg_Det> List = new List<Domain.Group_Prod_Prg_Det>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_LoadGroupProcessOutputitem", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@closed", SqlDbType.VarChar, 1).Value = closed;
                cmd.Parameters.Add("@jmasid", SqlDbType.VarChar, 20).Value = Id;
                cmd.Parameters.Add("@procid", SqlDbType.VarChar, 50).Value = procid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Group_Prod_Prg_Det obj = new Domain.Group_Prod_Prg_Det();

                    obj.Itemid = Convert.ToInt32(rdr["itemid"]);
                    obj.Item = rdr["item"].ToString();
                    obj.Colorid = Convert.ToInt32(rdr["colorid"]);
                    obj.Color = rdr["color"].ToString();
                    obj.Sizeid = Convert.ToInt32(rdr["sizeid"]);
                    obj.Size = rdr["size"].ToString();
                    obj.Prodprgdetid = 0;
                    obj.BalanceQty = Convert.ToDecimal(rdr["Bal"]);
                    obj.Prog_Op_Qty = Convert.ToDecimal(rdr["prog_op_qty"]);
                    obj.InorOut = rdr["InorOut"].ToString();
                    obj.rate = Convert.ToDecimal(rdr["AppRate"]);
                    obj.Grprate = Convert.ToDecimal(rdr["GrpRate"]);
                    obj.Processid = Convert.ToInt32(rdr["processid"]);
                    obj.Process = rdr["process"].ToString();
                    obj.Prodprgid = Convert.ToInt32(rdr["ProdPrgid"]);
                    obj.ProdPrgNo = rdr["ProdPrgNo"].ToString();
                    obj.GrpQty = 0;
                    obj.GrpProdPrgid = 0;
                    obj.GrpProdPgmdetid = 0;

                    //obj.GrpProdPrgid = Convert.ToInt32(rdr["GrpProdPrgid"]);
                    //obj.GrpProdPgmdetid = Convert.ToInt32(rdr["GrpProdPgmdetid"]);
                    //obj.ProdPrgNo = rdr["ProdPrgNo"].ToString();
                    //obj.Processid = Convert.ToInt32(rdr["ProcessId"]);
                    //obj.Process = rdr["Process"].ToString();
                    //obj.Itemid = Convert.ToInt32(rdr["Itemid"]);
                    //obj.Item = rdr["Item"].ToString();
                    //obj.Colorid = Convert.ToInt32(rdr["Colorid"]);
                    //obj.Color = rdr["Color"].ToString();
                    //obj.Sizeid = Convert.ToInt32(rdr["Sizeid"]);
                    //obj.Size = rdr["Size"].ToString();
                    //obj.Prog_Op_Qty = Convert.ToDecimal(rdr["Prog_Op_Qty"]);
                    //obj.BalanceQty = Convert.ToDecimal(rdr["BalanceQty"]);
                    //obj.GrpQty = Convert.ToDecimal(rdr["GrpQty"]);
                    //obj.InorOut = rdr["InorOut"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }
            return List;


            //var query = (from YD in entities.Proc_Apparel_LoadGroupProcessOutputitem(closed, string.IsNullOrEmpty(Id) ? "" : Id, procid)
            //             select new Domain.Group_Prod_Prg_Det
            //             {

            //                 Itemid = (int)YD.itemid,
            //                 Item = YD.item,
            //                 Colorid = (int)YD.colorid,
            //                 Color = YD.color,
            //                 Sizeid = (int)YD.sizeid,
            //                 Size = YD.size,
            //                 Prodprgdetid = 0,
            //                 BalanceQty = (decimal)YD.Bal,
            //                 Prog_Op_Qty = (decimal)YD.prog_op_qty,
            //                 InorOut = YD.InorOut,
            //                 rate = YD.AppRate,
            //                 Grprate=YD.GrpRate,
            //                 Processid = YD.processid,
            //                 Process = YD.process,
            //                 Prodprgid = YD.ProdPrgid,
            //                 ProdPrgNo = YD.ProdPrgNo,
            //                 GrpQty = 0,
            //                 GrpProdPrgid = 0,
            //                 GrpProdPgmdetid = 0,
            //             }).AsQueryable();

            //return query;
        }

        public IList<Domain.Group_Prod_Prg_Mas> LoadMain(int? Ordid, int? Refid, int? Style, int? Process, int? Groupid, string FDt, string TDt)
        {

            List<Domain.Group_Prod_Prg_Mas> List = new List<Domain.Group_Prod_Prg_Mas>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetGrpProcmainlist", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Ordid", SqlDbType.Int).Value = Ordid;
                cmd.Parameters.Add("@Refid", SqlDbType.Int).Value = Refid;
                cmd.Parameters.Add("@Style", SqlDbType.Int).Value = Style;
                cmd.Parameters.Add("@Process", SqlDbType.Int).Value = Process;
                cmd.Parameters.Add("@Groupid", SqlDbType.Int).Value = Groupid;
                cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 20).Value = FDt;
                cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 20).Value = TDt;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Group_Prod_Prg_Mas obj = new Domain.Group_Prod_Prg_Mas();

                    obj.GrpProdPrgid = Convert.ToInt32(rdr["GrpProdPrgid"]);
                    obj.GrpProdPrgNo = rdr["GrpProdPrgNo"].ToString();
                    obj.GrpProgDate = Convert.ToDateTime(rdr["GrpProgDate"]);
                    obj.ProdPrgid = Convert.ToInt32(rdr["ProdPrgid"]);
                    obj.ProdPrgNo = rdr["ProdPrgNo"].ToString();
                    obj.Buy_Ord_MasId = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
                    obj.Order_No = rdr["Order_No"].ToString();
                    obj.Ref_No = rdr["Ref_No"].ToString();
                    obj.Processid = Convert.ToInt32(rdr["ProcessId"]);
                    obj.Process = rdr["Process"].ToString();
                    obj.chkprc = Convert.ToInt32(rdr["ProcessOrder"]);
                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<Domain.Group_Prod_Prg_Mas> GetGrpProcMas(int masid)
        {

            List<Domain.Group_Prod_Prg_Mas> List = new List<Domain.Group_Prod_Prg_Mas>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetEditGroupProcessMas", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@masid", SqlDbType.Int).Value = masid;
                //cmd.Parameters.Add("@SizeId", SqlDbType.Int).Value = item.SizeId;
                //cmd.Parameters.Add("@ColId", SqlDbType.Int).Value = item.ColorID;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Group_Prod_Prg_Mas obj = new Domain.Group_Prod_Prg_Mas();

                    obj.GrpProdPrgid = Convert.ToInt32(rdr["GrpProdPrgid"]);
                    obj.GrpProdPrgNo = rdr["GrpProdPrgNo"].ToString();
                    obj.GrpProgDate = Convert.ToDateTime(rdr["GrpProgDate"]); ;
                    obj.Companyid = Convert.ToInt32(rdr["Companyid"]);
                    obj.Styleid = Convert.ToInt32(rdr["Styleid"]);
                    obj.Job_ord_no = rdr["Job_ord_no"].ToString();
                    obj.Buy_Ord_MasId = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
                    obj.Jobid = Convert.ToInt32(rdr["Jobid"]);
                    obj.ProdPrgNo = rdr["ProdPrgNo"].ToString();
                    obj.GrpProcessid = Convert.ToInt32(rdr["Processid"]);
                    obj.GrpProcess = rdr["Process"].ToString();
                    obj.ProdPrgid = Convert.ToInt32(rdr["ProdPrgid"]);
                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }


        public IList<Domain.Group_Prod_Prg_Det> GetIpGrpProc(int masid)
        {

            List<Domain.Group_Prod_Prg_Det> List = new List<Domain.Group_Prod_Prg_Det>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetEditGroupIpPgmdet", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@masid", SqlDbType.Int).Value = masid;
                //cmd.Parameters.Add("@SizeId", SqlDbType.Int).Value = item.SizeId;
                //cmd.Parameters.Add("@ColId", SqlDbType.Int).Value = item.ColorID;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Group_Prod_Prg_Det obj = new Domain.Group_Prod_Prg_Det();

                    obj.GrpProdPrgid = Convert.ToInt32(rdr["GrpProdPrgid"]);
                    obj.GrpProdPgmdetid = Convert.ToInt32(rdr["GrpProdPgmdetid"]);
                    obj.ProdPrgNo = rdr["ProdPrgNo"].ToString();
                    obj.Processid = Convert.ToInt32(rdr["ProcessId"]);
                    obj.Process = rdr["Process"].ToString();
                    obj.Itemid = Convert.ToInt32(rdr["Itemid"]);
                    obj.Item = rdr["Item"].ToString();
                    obj.Colorid = Convert.ToInt32(rdr["Colorid"]);
                    obj.Color = rdr["Color"].ToString();
                    obj.Sizeid = Convert.ToInt32(rdr["Sizeid"]);
                    obj.Size = rdr["Size"].ToString();
                    obj.Prog_Op_Qty = Convert.ToDecimal(rdr["Prog_Op_Qty"]);
                    obj.BalanceQty = Convert.ToDecimal(rdr["BalanceQty"]);
                    obj.GrpQty = Convert.ToDecimal(rdr["GrpQty"]);
                    obj.InorOut = rdr["InorOut"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<Domain.Group_Prod_Prg_Det> GetOpGrpProc(int masid)
        {

            List<Domain.Group_Prod_Prg_Det> List = new List<Domain.Group_Prod_Prg_Det>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetEditGroupOpPgmdet", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@masid", SqlDbType.Int).Value = masid;
                //cmd.Parameters.Add("@SizeId", SqlDbType.Int).Value = item.SizeId;
                //cmd.Parameters.Add("@ColId", SqlDbType.Int).Value = item.ColorID;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Group_Prod_Prg_Det obj = new Domain.Group_Prod_Prg_Det();

                    obj.GrpProdPrgid = Convert.ToInt32(rdr["GrpProdPrgid"]);
                    obj.GrpProdPgmdetid = Convert.ToInt32(rdr["GrpProdPgmdetid"]);
                    obj.ProdPrgNo = rdr["ProdPrgNo"].ToString();
                    obj.Processid = Convert.ToInt32(rdr["ProcessId"]);
                    obj.Process = rdr["Process"].ToString(); ;
                    obj.Itemid = Convert.ToInt32(rdr["Itemid"]);
                    obj.Item = rdr["Item"].ToString();
                    obj.Colorid = Convert.ToInt32(rdr["Colorid"]);
                    obj.Color = rdr["Color"].ToString();
                    obj.Sizeid = Convert.ToInt32(rdr["Sizeid"]);
                    obj.Size = rdr["Size"].ToString();
                    obj.Prog_Op_Qty = Convert.ToDecimal(rdr["Prog_Op_Qty"]);
                    obj.BalanceQty = Convert.ToDecimal(rdr["BalanceQty"]);
                    obj.GrpQty = Convert.ToDecimal(rdr["GrpQty"]);
                    obj.InorOut = rdr["InorOut"].ToString();
                    obj.rate = Convert.ToDecimal(rdr["rate"]);
                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<Domain.Group_Prod_Prg_Det> GetIpPrgdet(int masid)
        {

            List<Domain.Group_Prod_Prg_Det> List = new List<Domain.Group_Prod_Prg_Det>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetEditIpGrpPrgdet", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@masid", SqlDbType.Int).Value = masid;
                //cmd.Parameters.Add("@SizeId", SqlDbType.Int).Value = item.SizeId;
                //cmd.Parameters.Add("@ColId", SqlDbType.Int).Value = item.ColorID;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Group_Prod_Prg_Det obj = new Domain.Group_Prod_Prg_Det();

                    //obj.GrpProdPrgid = Convert.ToInt32(rdr["GrpProdPrgid"]);
                    obj.Prodprgid = Convert.ToInt32(rdr["ProdPrgid"]);
                    obj.Prodprgdetid = Convert.ToInt32(rdr["Prodprgdetid"]);
                    obj.ProdPrgNo = rdr["ProdPrgNo"].ToString();
                    obj.Processid = Convert.ToInt32(rdr["Processid"]);
                    obj.Process = rdr["Process"].ToString(); ;
                    obj.Itemid = Convert.ToInt32(rdr["Itemid"]);
                    obj.Item = rdr["Item"].ToString();
                    obj.Colorid = Convert.ToInt32(rdr["Colorid"]);
                    obj.Color = rdr["Color"].ToString();
                    obj.Sizeid = Convert.ToInt32(rdr["Sizeid"]);
                    obj.Size = rdr["Size"].ToString();
                    obj.Prog_Op_Qty = Convert.ToDecimal(rdr["Prog_Op_Qty"]);
                    obj.BalanceQty = Convert.ToDecimal(rdr["BalanceQty"]);
                    obj.GrpQty = Convert.ToDecimal(rdr["GrpQty"]);
                    obj.rate = Convert.ToDecimal(rdr["rate"]);
                    obj.InorOut = rdr["InorOut"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }
        public IList<Domain.Group_Prod_Prg_Det> GetOpPrgdet(int masid)
        {

            List<Domain.Group_Prod_Prg_Det> List = new List<Domain.Group_Prod_Prg_Det>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetEditOpGrpPrgdet", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@masid", SqlDbType.Int).Value = masid;
                //cmd.Parameters.Add("@SizeId", SqlDbType.Int).Value = item.SizeId;
                //cmd.Parameters.Add("@ColId", SqlDbType.Int).Value = item.ColorID;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Group_Prod_Prg_Det obj = new Domain.Group_Prod_Prg_Det();

                    //obj.GrpProdPrgid = Convert.ToInt32(rdr["GrpProdPrgid"]);
                    obj.Prodprgid = Convert.ToInt32(rdr["ProdPrgid"]);
                    obj.Prodprgdetid = Convert.ToInt32(rdr["Prodprgdetid"]);
                    obj.ProdPrgNo = rdr["ProdPrgNo"].ToString();
                    obj.Processid = Convert.ToInt32(rdr["Processid"]);
                    obj.Process = rdr["Process"].ToString(); ;
                    obj.Itemid = Convert.ToInt32(rdr["Itemid"]);
                    obj.Item = rdr["Item"].ToString();
                    obj.Colorid = Convert.ToInt32(rdr["Colorid"]);
                    obj.Color = rdr["Color"].ToString();
                    obj.Sizeid = Convert.ToInt32(rdr["Sizeid"]);
                    obj.Size = rdr["Size"].ToString();
                    obj.Prog_Op_Qty = Convert.ToDecimal(rdr["Prog_Op_Qty"]);
                    obj.BalanceQty = Convert.ToDecimal(rdr["BalanceQty"]);
                    obj.GrpQty = Convert.ToDecimal(rdr["GrpQty"]);
                    obj.rate = Convert.ToDecimal(rdr["rate"]);
                    obj.InorOut = rdr["InorOut"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<Domain.StockAudit> GetGroupDropdwon(int? BMasId, int? JobId, int? Styleid, int? RefNo)
        {

            List<Domain.StockAudit> List = new List<Domain.StockAudit>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetOrderStyleRefnoJoborder", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@BMasId", SqlDbType.Int).Value = BMasId;
                cmd.Parameters.Add("@StyleId", SqlDbType.Int).Value = Styleid;
                cmd.Parameters.Add("@JobId", SqlDbType.Int).Value = JobId;
                cmd.Parameters.Add("@RefNo", SqlDbType.Int).Value = RefNo;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.StockAudit obj = new Domain.StockAudit();

                    obj.RefNo = rdr["RefNo"].ToString();
                    obj.Styleid = Convert.ToInt32(rdr["StyleId"]);
                    obj.Style = rdr["Style"].ToString();
                    obj.Job_Ord_no = rdr["JobNo"].ToString();
                    obj.JobId = Convert.ToInt32(rdr["JobId"]);
                    obj.BMasId = Convert.ToInt32(rdr["BMasID"]);
                    obj.Buy_Ord_no = rdr["OrdNo"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<Domain.StockAudit> GetProcessDropdwon(int? JobId)
        {

            List<Domain.StockAudit> List = new List<Domain.StockAudit>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetJoborderwiseProcess", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Jobid", SqlDbType.Int).Value = JobId;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.StockAudit obj = new Domain.StockAudit();
                    obj.ProcessId = Convert.ToInt32(rdr["Processid"]);
                    obj.Process = rdr["Process"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }


        public bool AddDetData(Group_Prod_Prg_Mas GrpmasInsert, List<Group_Prod_Prg_Det> IpGrpDetInsert, List<Group_Prod_Prg_Det> OpGrpDetInsert, ProcessProd_Prg_Mas objaddmas, List<ProcessProd_Prg_Det> objCDet, List<ProcessProd_Prg_Det> objopDet, string Mode)
        {
            bool reserved = false;
            int GrpMasid = 0;
            int Masid = 0;
            string Otype = "";
            string GrpNo = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    //int itemid=0;
                    int ids = 0;

                    entities.Group_Prod_Prg_Mas.Add(GrpmasInsert);
                    entities.SaveChanges();
                    GrpMasid = GrpmasInsert.GrpProdPrgid;
                    GrpNo = GrpmasInsert.GrpProdPrgNo;

                    if (IpGrpDetInsert != null && IpGrpDetInsert.Count > 0)
                    {
                        foreach (var item in IpGrpDetInsert)
                        {
                            item.GrpProdPrgid = GrpMasid;
                            item.InorOut = "I";
                            entities.Group_Prod_Prg_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    if (OpGrpDetInsert != null && OpGrpDetInsert.Count > 0)
                    {
                        foreach (var item in OpGrpDetInsert)
                        {
                            item.GrpProdPrgid = GrpMasid;
                            item.InorOut = "O";
                            entities.Group_Prod_Prg_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }




                    var OQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == objaddmas.Job_ord_no).FirstOrDefault();
                    if (OQuery != null)
                    {
                        Otype = OQuery.JobOrWork;
                    }

                    objaddmas.OrderType = Otype;
                    objaddmas.GrpProdPrgNo = GrpNo;
                    objaddmas.ProgramType = "P";
                    entities.Prod_Prg_Mas.Add(objaddmas);
                    entities.SaveChanges();
                    Masid = objaddmas.ProdPrgid;



                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in objCDet)
                        {
                            item.Prodprgid = Masid;
                            entities.Prod_Prg_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    if (objopDet != null && objopDet.Count > 0)
                    {
                        foreach (var item in objopDet)
                        {
                            item.Prodprgid = Masid;
                            entities.Prod_Prg_Det.Add(item);
                        }
                        entities.SaveChanges();
                    }
                    string Ordno = "";
                    var Orderno = entities.Buy_Ord_Mas.Where(c => c.Buy_Ord_MasId == GrpmasInsert.Buy_Ord_MasId);

                    foreach (var O in Orderno)
                    {
                        Ordno = O.Order_No;
                    }

                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_GetGroupProcessCostInsert", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Ordno;
                    //    cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = GrpmasInsert.Styleid;
                    //    cmd.Parameters.Add("@CompId", SqlDbType.Int).Value = GrpmasInsert.Companyid;
                    //    cmd.Parameters.Add("@processid", SqlDbType.Int).Value = objaddmas.ProcessId;
                    //    cmd.Parameters.Add("@Grpmasid", SqlDbType.Int).Value = GrpMasid;
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

                    var result4 = entities.Proc_Apparel_GetGroupProcessCostInsert(Ordno, GrpmasInsert.Styleid, GrpmasInsert.Companyid, objaddmas.ProcessId, GrpMasid);
                    entities.SaveChanges();


                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_InsertProdPrgGrpQty", con);
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

                    var result5 = entities.Proc_Apparel_InsertProdPrgGrpQty(GrpMasid);
                    entities.SaveChanges();

                    //reserved = true;
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

        public bool UpdateProdMas(Group_Prod_Prg_Mas GrpmasInsert, List<Group_Prod_Prg_Det> IpGrpDetInsert, List<Group_Prod_Prg_Det> OpGrpDetInsert, ProcessProd_Prg_Mas objaddmas, List<ProcessProd_Prg_Det> objCDet, List<ProcessProd_Prg_Det> objopDet, string Mode)
        {
            bool reserved = false;
            int GrpMasid = 0;
            int Masid = 0;
            string Otype = "";
            string GrpNo = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    //int itemid=0;
                    int ids = 0;

                    //entities.Group_Prod_Prg_Mas.Add(GrpmasInsert);
                    //entities.SaveChanges();
                    GrpMasid = GrpmasInsert.GrpProdPrgid;
                    GrpNo = GrpmasInsert.GrpProdPrgNo;

                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_UpdateProdPrgGrpQty", con);
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



                    var result3 = entities.Proc_Apparel_UpdateProdPrgGrpQty(GrpMasid);
                    entities.SaveChanges();



                    if (IpGrpDetInsert != null && IpGrpDetInsert.Count > 0)
                    {
                        foreach (var item in IpGrpDetInsert)
                        {
                            var OQuery = entities.Group_Prod_Prg_Det.Where(b => b.GrpProdPgmdetid == item.GrpProdPgmdetid);

                            foreach (var O in OQuery)
                            {
                                O.GrpQty = item.GrpQty;
                            }

                        }
                        entities.SaveChanges();
                    }

                    if (OpGrpDetInsert != null && OpGrpDetInsert.Count > 0)
                    {
                        foreach (var item in OpGrpDetInsert)
                        {
                            var OQuery = entities.Group_Prod_Prg_Det.Where(b => b.GrpProdPgmdetid == item.GrpProdPgmdetid);

                            foreach (var O in OQuery)
                            {
                                O.GrpQty = item.GrpQty;
                            }
                        }
                        entities.SaveChanges();
                    }




                    //var OQuery = entities.Job_Ord_Mas.Where(b => b.Job_Ord_No == objaddmas.Job_ord_no).FirstOrDefault();
                    //if (OQuery != null)
                    //{
                    //    Otype = OQuery.JobOrWork;
                    //}

                    //objaddmas.OrderType = Otype;
                    //objaddmas.GrpProdPrgNo = GrpNo;
                    //entities.Prod_Prg_Mas.Add(objaddmas);
                    //entities.SaveChanges();
                    Masid = objaddmas.ProdPrgid;



                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in objCDet)
                        {
                            var OQuery = entities.Prod_Prg_Det.Where(b => b.Prodprgdetid == item.Prodprgdetid);

                            foreach (var O in OQuery)
                            {
                                O.GrpQty = item.GrpQty;
                                O.ActualPlan_Qty = item.ActualPlan_Qty;
                                O.BalanceQty = 0;
                                O.Prog_Op_Qty = item.Prog_Op_Qty;
                            }
                        }
                        entities.SaveChanges();
                    }

                    if (objopDet != null && objopDet.Count > 0)
                    {
                        foreach (var item in objopDet)
                        {
                            var OQuery = entities.Prod_Prg_Det.Where(b => b.Prodprgdetid == item.Prodprgdetid);

                            foreach (var O in OQuery)
                            {
                                O.GrpQty = item.GrpQty;
                                O.ActualPlan_Qty = item.ActualPlan_Qty;
                                O.BalanceQty = 0;
                                O.Prog_Op_Qty = item.Prog_Op_Qty;
                            }
                        }
                        entities.SaveChanges();
                    }

                    string Ordno = "";
                    var Orderno = entities.Buy_Ord_Mas.Where(c => c.Buy_Ord_MasId == GrpmasInsert.Buy_Ord_MasId);

                    foreach (var O in Orderno)
                    {
                        Ordno = O.Order_No;
                    }

                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_GetGroupProcessCostInsert", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Ordno;
                    //    cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = GrpmasInsert.Styleid;
                    //    cmd.Parameters.Add("@CompId", SqlDbType.Int).Value = GrpmasInsert.Companyid;
                    //    cmd.Parameters.Add("@processid", SqlDbType.Int).Value = objaddmas.ProcessId;
                    //    cmd.Parameters.Add("@Grpmasid", SqlDbType.Int).Value = GrpMasid;
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

                    var result4 = entities.Proc_Apparel_GetGroupProcessCostInsert(Ordno, GrpmasInsert.Styleid, GrpmasInsert.Companyid, objaddmas.ProcessId, GrpMasid);
                    entities.SaveChanges();




                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_InsertProdPrgGrpQty", con);
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

                    var result6 = entities.Proc_Apparel_InsertProdPrgGrpQty(GrpMasid);
                    entities.SaveChanges();


                    //reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessProgram-UpdateDetData");
                }
            }
            return reserved;


        }

        public bool DeleteProdMas(Group_Prod_Prg_Mas GrpmasInsert, List<Group_Prod_Prg_Det> IpGrpDetInsert, List<Group_Prod_Prg_Det> OpGrpDetInsert, ProcessProd_Prg_Mas objaddmas, List<ProcessProd_Prg_Det> objCDet, List<ProcessProd_Prg_Det> objopDet, string Mode)
        {
            bool reserved = false;
            int GrpMasid = 0;
            int Masid = 0;
            string Otype = "";
            string GrpNo = "";
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int id = 0;
                    //int itemid=0;
                    int ids = 0;


                    GrpMasid = GrpmasInsert.GrpProdPrgid;
                    GrpNo = GrpmasInsert.GrpProdPrgNo;

                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_UpdateProdPrgGrpQty", con);
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



                    var result3 = entities.Proc_Apparel_UpdateProdPrgGrpQty(GrpMasid);
                    entities.SaveChanges();


                    var CDet = entities.Group_Prod_Prg_Det.Where(u => u.GrpProdPrgid == GrpmasInsert.GrpProdPrgid);
                    foreach (var v in CDet)
                    {
                        entities.Group_Prod_Prg_Det.Remove(v);
                    }
                    entities.SaveChanges();

                    var MDet = entities.Group_Prod_Prg_Mas.Where(u => u.GrpProdPrgid == GrpmasInsert.GrpProdPrgid);

                    foreach (var m in MDet)
                    {
                        entities.Group_Prod_Prg_Mas.Remove(m);
                    }
                    entities.SaveChanges();



                    Masid = objaddmas.ProdPrgid;



                    var SDet = entities.Prod_Prg_Det.Where(u => u.Prodprgid == objaddmas.ProdPrgid);
                    foreach (var v in SDet)
                    {
                        entities.Prod_Prg_Det.Remove(v);
                    }
                    entities.SaveChanges();

                    var WDet = entities.Prod_Prg_Mas.Where(u => u.ProdPrgid == objaddmas.ProdPrgid);

                    foreach (var m in WDet)
                    {
                        entities.Prod_Prg_Mas.Remove(m);
                    }
                    entities.SaveChanges();



                    //if (objCDet != null && objCDet.Count > 0)
                    //{
                    //    foreach (var item in objCDet)
                    //    {
                    //        var OQuery = entities.Prod_Prg_Det.Where(b => b.Prodprgdetid == item.Prodprgdetid).FirstOrDefault();

                    //        OQuery.GrpQty = item.GrpQty;
                    //    }
                    //    entities.SaveChanges();
                    //}

                    //if (objopDet != null && objopDet.Count > 0)
                    //{
                    //    foreach (var item in objopDet)
                    //    {
                    //        var OQuery = entities.Prod_Prg_Det.Where(b => b.Prodprgdetid == item.Prodprgdetid).FirstOrDefault();

                    //        OQuery.GrpQty = item.GrpQty;
                    //    }
                    //    entities.SaveChanges();
                    //}

                    string Ordno = "";
                    var Orderno = entities.Buy_Ord_Mas.Where(c => c.Buy_Ord_MasId == GrpmasInsert.Buy_Ord_MasId);

                    foreach (var O in Orderno)
                    {
                        Ordno = O.Order_No;
                    }

                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_GetGroupProcessCostInsert", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.Add("@OrderNo", SqlDbType.VarChar, 20).Value = Ordno;
                    //    cmd.Parameters.Add("@Styleid", SqlDbType.Int).Value = GrpmasInsert.Styleid;
                    //    cmd.Parameters.Add("@CompId", SqlDbType.Int).Value = GrpmasInsert.Companyid;
                    //    cmd.Parameters.Add("@processid", SqlDbType.Int).Value = objaddmas.ProcessId;
                    //    cmd.Parameters.Add("@Grpmasid", SqlDbType.Int).Value = GrpMasid;
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

                    var result4 = entities.Proc_Apparel_GetGroupProcessCostInsert(Ordno, GrpmasInsert.Styleid, GrpmasInsert.Companyid, objaddmas.ProcessId, GrpMasid);
                    entities.SaveChanges();


                    //reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessProgram-DeleteDetData");
                }
            }
            return reserved;


        }


        public int AddGrpProc(List<Domain.Group_Prod_Prg_Det> IpGrpDetInsert, string procid)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //List<Process> lstemployee = new List<Process>();
                    //using (SqlConnection con = new SqlConnection(connStr))
                    //{
                    //    SqlCommand cmd = new SqlCommand("Proc_Apparel_GetProcessLoadinGrpProc", con);
                    //    cmd.CommandType = CommandType.StoredProcedure;
                    //    cmd.Parameters.AddWithValue("@processid", procid);
                    //    con.Open();
                    //    SqlDataReader rdr = cmd.ExecuteReader();
                    //    while (rdr.Read())
                    //    {
                    //        Process employee = new Process();
                    //        employee.ProcessId = Convert.ToInt32(rdr["ProcessId"]);
                    //        employee.Process1 = rdr["Process"].ToString();
                    //        employee.Description = rdr["Description"].ToString();
                    //        employee.Stage_Schedule = Convert.ToByte(rdr["Stage_Schedule"]);
                    //        employee.IsProportion = Convert.ToBoolean(rdr["IsProportion"]);
                    //        employee.IsComponentProcess = Convert.ToBoolean(rdr["IsComponentProcess"]);
                    //        employee.AllowLotNumGen = Convert.ToBoolean(rdr["AllowLotNumGen"]);
                    //        employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    //        employee.SeqNo = Convert.ToInt32(rdr["SeqNo"]);
                    //        employee.Prc_Allowance = Convert.ToDecimal(rdr["Prc_Allowance"]);
                    //        employee.Program_input = rdr["Program_input"].ToString();
                    //        employee.Program_output = rdr["Program_output"].ToString();
                    //        employee.GSTTaxCode = rdr["GSTTaxCode"].ToString();
                    //        employee.IGSTTaxCode = rdr["IGSTTaxCode"].ToString();
                    //        employee.ProcessLoss = Convert.ToDecimal(rdr["ProcessLoss"]);
                    //        lstemployee.Add(employee);
                    //    }
                    //    con.Close();
                    //}




                    List<Process> lstemployee = (from YD in entities.Proc_Apparel_GetProcessLoadinGrpProc(procid)
                                 select new Repository.Process
                                 {

                                     ProcessId = YD.processid,
                                     Process1 = YD.Process,
                                     Description = YD.Description,
                                     Stage_Schedule = YD.Stage_Schedule,
                                     IsProportion = YD.IsProportion,
                                     IsComponentProcess = YD.IsComponentProcess,
                                     AllowLotNumGen = YD.AllowLotNumGen,
                                     IsActive = YD.IsActive,
                                     SeqNo =YD.SeqNo,
                                     Program_input = YD.Program_input,
                                     Program_output = YD.Program_output,
                                     GSTTaxCode = YD.GSTTaxCode,
                                     IGSTTaxCode = YD.IGSTTaxCode,
                                     ProcessLoss = YD.ProcessLoss,
                                   
                                 }).AsQueryable().ToList();



                    List<Process> sortedlist = new List<Process>();

                    if (IpGrpDetInsert.Count > 0)
                    {
                        foreach (var O in IpGrpDetInsert)
                        {
                            foreach (var I in lstemployee)
                            {
                                if (O.Processid == I.ProcessId)
                                {

                                    Process det = new Process();

                                    det.ProcessId = I.ProcessId;
                                    det.Process1 = I.Process1;
                                    det.Description = I.Description;
                                    det.Stage_Schedule = I.Stage_Schedule;
                                    det.IsProportion = I.IsProportion;
                                    det.IsComponentProcess = I.IsComponentProcess;
                                    det.AllowLotNumGen = I.AllowLotNumGen;
                                    det.IsActive = I.IsActive;
                                    det.SeqNo = I.SeqNo;
                                    det.Prc_Allowance = I.Prc_Allowance;
                                    det.Program_input = I.Program_input;
                                    det.Program_output = I.Program_output;
                                    det.GSTTaxCode = I.GSTTaxCode;
                                    det.IGSTTaxCode = I.IGSTTaxCode;
                                    det.ProcessLoss = I.ProcessLoss;

                                    sortedlist.Add(det);
                                }
                            }
                        }
                    }


                    int last = sortedlist.Count;
                    List<Process> lastlist = new List<Process>();

                    int count = 0;
                    string prgip = "";
                    string processname = "";
                    foreach (var S in sortedlist)
                    {
                        if (count == 0)
                        {
                            prgip = S.Program_input;
                            processname = S.Process1;
                        }
                        else
                        {
                            processname = processname + "+" + S.Process1;

                        }


                        count++;

                        if (count == last)
                        {
                            lastlist.Add(S);

                        }

                    }
                    var OQuery = entities.Process.Where(b => b.Process1 == processname);
                    var processid = 0;
                    foreach (var Q in OQuery)
                    {
                        processid = Q.ProcessId;
                    }


                    if (processid > 0)
                    {
                        reserved = processid;
                    }
                    else
                    {
                        foreach (var L in lastlist)
                        {
                            L.Process1 = processname;
                            L.Program_input = prgip;


                            var result4 = entities.Proc_Apparel_InsertGroupProcessinProcessMas(L.Process1, L.Description,L.Stage_Schedule,
                                L.IsProportion, L.IsComponentProcess, L.AllowLotNumGen, L.IsActive, L.SeqNo, L.Prc_Allowance, L.Program_input,
                                L.Program_output, L.GSTTaxCode, L.IGSTTaxCode, L.ProcessLoss,  L.IsValidateProcessOrdQty, L.IsEmblishmentProcess);
                            entities.SaveChanges();

                            //Process det = new Process();

                            //det.ProcessId = L.ProcessId;
                            //det.Process1 = L.Process1;
                            //det.Description = L.Description;
                            //det.Stage_Schedule = L.Stage_Schedule;
                            //det.IsProportion = L.IsProportion;
                            //det.IsComponentProcess = L.IsComponentProcess;
                            //det.AllowLotNumGen = L.AllowLotNumGen;
                            //det.IsActive = L.IsActive;
                            //det.SeqNo = L.SeqNo;
                            //det.Prc_Allowance = L.Prc_Allowance;
                            //det.Program_input = L.Program_input;
                            //det.Program_output = L.Program_output;
                            //det.GSTTaxCode = L.GSTTaxCode;
                            //det.IGSTTaxCode = L.IGSTTaxCode;
                            //det.ProcessLoss = L.ProcessLoss;
                            //det.IsValidateProcessOrdQty = L.IsValidateProcessOrdQty;
                            //det.IsEmblishmentProcess = L.IsEmblishmentProcess;

                            //entities.Process.Add(det);
                            //entities.SaveChanges();

                            var OQuery1 = entities.Process.Where(b => b.Process1 == processname);
                            var processid2 = 0;
                            foreach (var Q in OQuery)
                            {
                                processid2 = Q.ProcessId;
                            }


                            if (processid2> 0)
                            {
                                reserved = processid2;
                            }

                        }
                    }


                    //return reserved;

                    //reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    reserved = 0;

                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ProcessProgram-AddDetData");
                }
                return reserved;
            }



        }


    }
}



