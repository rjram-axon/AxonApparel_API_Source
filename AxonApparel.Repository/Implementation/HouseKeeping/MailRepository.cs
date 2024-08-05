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
using System.Data.Entity.Validation;
using System.Transactions;
using System.Data.SqlClient;
using System.Transactions;
using System.Data;
using System.Configuration;

namespace AxonApparel.Repository
{
    public class MailRepository :IMailRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        string connStr = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;


        public IList<Domain.MailModel> LoadMailMainList(string FromName, string ToName, string frmdate, string todate)
        {
            try
            {
                List<Domain.MailModel> List = new List<Domain.MailModel>();

                using (SqlConnection con = new SqlConnection(connStr))
                {
                    SqlCommand cmd = new SqlCommand("Proc_Apparel_Mail_Mainload", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@FromName", SqlDbType.VarChar, 50).Value = FromName;
                    cmd.Parameters.Add("@ToName", SqlDbType.VarChar, 50).Value = ToName;
                    cmd.Parameters.Add("@FromOrderDate", SqlDbType.VarChar, 25).Value = frmdate;
                    cmd.Parameters.Add("@ToOrderDate", SqlDbType.VarChar, 25).Value = todate;
                 

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Domain.MailModel obj = new Domain.MailModel();
                        obj.ID = Convert.ToInt32(rdr["ID"]);
                        obj.Email = rdr["FromMail"].ToString();
                        obj.FromName = rdr["FromName"].ToString();
                        obj.To = rdr["ToMail"].ToString();
                        obj.ToName = rdr["ToName"].ToString();
                        obj.Date = Convert.ToDateTime(rdr["Date"]);
                        obj.Pending = rdr["Pending"].ToString();
                        obj.Active = rdr["Active"].ToString();
                        List.Add(obj);
                    }
                    con.Close();
                }
                return List;
            }
            catch (Exception ex)
            {

                List<Domain.MailModel> List = new List<Domain.MailModel>();
                return List;
            }
        }


        public IList<Domain.MailModel> LoadMailEdit(int? masid)
        {
            try
            {
                List<Domain.MailModel> List = new List<Domain.MailModel>();

                using (SqlConnection con = new SqlConnection(connStr))
                {
                    SqlCommand cmd = new SqlCommand("Proc_Apparel_MailGetById", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add("@mailid", SqlDbType.Int).Value = masid;
                  

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Domain.MailModel obj = new Domain.MailModel();
                        obj.ID = Convert.ToInt32(rdr["ID"]);
                        obj.Email = rdr["FromMail"].ToString();
                        obj.FromName = rdr["FromName"].ToString();
                        obj.To = rdr["ToMail"].ToString();
                        obj.ToName = rdr["ToName"].ToString();
                        obj.Date = Convert.ToDateTime(rdr["Date"]);
                        obj.Pending = rdr["Pending"].ToString();
                        obj.Active = rdr["Active"].ToString();
                        obj.Subject = rdr["Subject"].ToString();
                        obj.Body = rdr["Body"].ToString();
                        List.Add(obj);
                    }
                    con.Close();
                }
                return List;
            }
            catch (Exception ex)
            {

                List<Domain.MailModel> List = new List<Domain.MailModel>();
                return List;
            }
        }

        public IList<Domain.Mail_Attachments> LoadMailFileEdit(int? masid)
        {
            try
            {
                List<Domain.Mail_Attachments> List = new List<Domain.Mail_Attachments>();

                using (SqlConnection con = new SqlConnection(connStr))
                {
                    string sqlQuery = "select * from Mail_Attachments where MailId= " + masid;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);
                  
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Domain.Mail_Attachments obj = new Domain.Mail_Attachments();
                        obj.ID = Convert.ToInt32(rdr["ID"]);
                        obj.FileId = Convert.ToInt32(rdr["FileId"]);
                        obj.FileName = rdr["FileName"].ToString();
                        obj.FailPath = rdr["FailPath"].ToString();
                      
                        List.Add(obj);
                    }
                    con.Close();
                }
                return List;
            }
            catch (Exception ex)
            {

                List<Domain.Mail_Attachments> List = new List<Domain.Mail_Attachments>();
                return List;
            }
        }




        public bool AddMail(Mail MailmasInsert, List<Repository.Mail_Attachments> AttachDet, string Mode)
        {
            bool reserved = false;
            int Masid = 0;
       
           
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    MailmasInsert.Pending = "N";
                    MailmasInsert.Active = "Y";
                    MailmasInsert.Date = DateTime.Now;
                    entities.Mail.Add(MailmasInsert);
                    entities.SaveChanges();
                    Masid = MailmasInsert.ID;


                    if (AttachDet != null && AttachDet.Count > 0)
                    {
                        foreach (var item in AttachDet)
                        {
                            item.MailId = Masid;
                            entities.Mail_Attachments.Add(item);
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
                    exceplogg.SendExcepToDB(ex, "ProcessProgram-AddDetData");
                }
            }
            return reserved;


        }





    }
}
