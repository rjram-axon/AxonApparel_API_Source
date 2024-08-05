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
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace AxonApparel.Repository
{
    public class AMCRepository : IAMCRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public bool UpdateUserdata(int dcompanyid)
        {
            //using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            //{
                try
                {
                    Createview();

                    CompanyLicencePeriod userview = new CompanyLicencePeriod();
                    using (SqlConnection con = new SqlConnection(connStr))
                    {
                        string sqlQuery = "select * from Vw_CompanyLicencePeriod where companyID= " + dcompanyid;
                        SqlCommand cmd = new SqlCommand(sqlQuery, con);
                        con.Open();
                        SqlDataReader rdr = cmd.ExecuteReader();
                        while (rdr.Read())
                        {
                            userview.companyID = Convert.ToInt32(rdr["companyID"]);
                            userview.COMPANY = rdr["COMPANY"].ToString();
                            userview.LicenceType = rdr["LicenceType"].ToString();
                            userview.FromDate = rdr["FromDate"].ToString();
                            userview.ToDate = rdr["ToDate"].ToString();
                            userview.Licenceusers = rdr["Licenceusers"].ToString();
                        }
                        con.Close();
                    }

                   // var userview = entities.Vw_CompanyLicencePeriod.Where(o => o.companyID == dcompanyid ).FirstOrDefault();

                    var mispath = entities.MisPath;

                     foreach(var masid in mispath){
                        
                         
                     var misid = entities.MisPath.Where(o => o.MispathId == masid.MispathId ).FirstOrDefault();

                     if (misid != null) 
                    {
                        misid.LicenceExpiryDate = Help.Encrypt(userview.ToDate);
                        misid.LicenceType = userview.LicenceType;
                        misid.Licenceusers = Help.Encrypt(userview.Licenceusers);
                        misid.LicencecompanyID = dcompanyid.ToString();
                    }                    
                        }
                    
                    entities.SaveChanges();
                    //The Transaction will be completed
                    Dropview();
                   // txscope.Complete();
                   
                    return true;

                }
                catch (Exception ex)
                {
                   // txscope.Dispose();
                    Dropview();
                    exceplogg.SendExcepToDB(ex, "");
                    return false;
                    throw ex;
                }
           // }
        }

        public IEnumerable<Domain.MisSetting> CheckUserLicence(int dcompanyid)
        {
            //var userview = entities.Vw_CompanyLicencePeriod.Where(o => o.companyID == dcompanyid).FirstOrDefault();
            Createview();
            //List<Domain.MisSetting> userdet = (from us in entities.Vw_CompanyLicencePeriod.Where(o => o.companyID == dcompanyid)
            //               select new Domain.MisSetting
            //               {
            //                   dCompanyId = us.companyID,
            //                   Company = us.COMPANY,
            //                   NoOfUser = us.Licenceusers,
            //                   Todate = us.ToDate,
            //                   Fromdate = us.FromDate

            //               }).AsQueryable().ToList();


            List<Domain.MisSetting> lstemployee = new List<Domain.MisSetting>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Vw_CompanyLicencePeriod where companyID= " + dcompanyid;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.MisSetting employee = new Domain.MisSetting();
                    employee.dCompanyId = Convert.ToInt32(rdr["companyID"]);
                    employee.Company = rdr["COMPANY"].ToString();
                    employee.NoOfUser = rdr["Licenceusers"].ToString();
                    employee.Todate = rdr["ToDate"].ToString();
                    employee.Fromdate = rdr["FromDate"].ToString();
                    var Inrid = (DateTime.Now.Date - Convert.ToDateTime(rdr["ToDate"]).Date);
                    employee.ChkLicenceexpiry = Convert.ToInt32(Inrid.Days);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
           

            Dropview();
            return lstemployee;
        }


        public IEnumerable<Domain.MisSetting> CheckAMC()
        {
            string Lcompanyid = entities.MisPath.Where(o => o.MispathId == o.MispathId).Select(d =>d.LicencecompanyID).FirstOrDefault();
            int Compid = Convert.ToInt32(Lcompanyid);

            Createview();
          
            List<Domain.MisSetting> lstemployee = new List<Domain.MisSetting>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Vw_CompanyLicencePeriod where companyID= " + Compid;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.MisSetting employee = new Domain.MisSetting();
                    employee.dCompanyId = Convert.ToInt32(rdr["companyID"]);
                    employee.Company = rdr["COMPANY"].ToString();
                    employee.NoOfUser = rdr["Licenceusers"].ToString();
                    employee.Todate = rdr["ToDate"].ToString();
                    employee.Fromdate = rdr["FromDate"].ToString();
                    var Inrid = (DateTime.Now.Date - Convert.ToDateTime(rdr["ToDate"]).Date);
                    employee.ChkLicenceexpiry = Convert.ToInt32(Inrid.Days);
                    lstemployee.Add(employee);
                }
                con.Close();
            }


            Dropview();
            return lstemployee;
        }


        public IEnumerable<Domain.MisSetting> GetCompany()
        {
            Createview(); 
            //List<Domain.MisSetting> userdet = (from us in entities.Vw_CompanyLicencePeriod                           
            //               select new Domain.MisSetting
            //               {
            //                   dCompanyId = us.companyID,
            //                   Company = us.COMPANY

            //               }).AsQueryable().ToList();

            List<Domain.MisSetting> lstemployee = new List<Domain.MisSetting>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Vw_CompanyLicencePeriod";
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.MisSetting employee = new Domain.MisSetting();
                    employee.dCompanyId = Convert.ToInt32(rdr["companyID"]);
                    employee.Company = rdr["COMPANY"].ToString();
                    employee.NoOfUser = rdr["Licenceusers"].ToString();
                    employee.Todate = rdr["ToDate"].ToString();
                    employee.Fromdate = rdr["FromDate"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
           


            Dropview();
            return lstemployee;
        }

        public void Createview (){

            Dropview();


            List<CompanyLicencePeriod> List = new List<CompanyLicencePeriod>();

              //Axon
              CompanyLicencePeriod obj = new CompanyLicencePeriod();
              obj.companyID=1;obj.COMPANY="AXON";obj.LicenceType="S";obj.FromDate="17-06-2020";obj.ToDate="12-12-2021";obj.Licenceusers="2";
              List.Add(obj);
              //AxonApparel
              CompanyLicencePeriod obj1 = new CompanyLicencePeriod();
              obj1.companyID = 2; obj1.COMPANY = "AxonApparel"; obj1.LicenceType = "S"; obj1.FromDate = "17-06-2020"; obj1.ToDate = "12-12-2020"; obj1.Licenceusers = "5";
              List.Add(obj1);

              //SESHA 
              CompanyLicencePeriod obj2 = new CompanyLicencePeriod();
              obj2.companyID = 3; obj2.COMPANY = "SESHA"; obj2.LicenceType = "S"; obj2.FromDate = "01-12-2021"; obj2.ToDate = "30-11-2022"; obj2.Licenceusers = "15";
              List.Add(obj2);

              //TAS 
              CompanyLicencePeriod obj3 = new CompanyLicencePeriod();
              obj3.companyID = 4; obj3.COMPANY = "TAS"; obj3.LicenceType = "S"; obj3.FromDate = "01-09-2023"; obj3.ToDate = "31-08-2024"; obj3.Licenceusers = "10";
              List.Add(obj3);

              //LAKKI 
              CompanyLicencePeriod obj4 = new CompanyLicencePeriod();
              obj4.companyID = 5; obj4.COMPANY = "LAKKI"; obj4.LicenceType = "S"; obj4.FromDate = "01-03-2023"; obj4.ToDate = "29-02-2024"; obj4.Licenceusers = "25";
              List.Add(obj4);


              //Add licences companies below

              StringBuilder builder = new StringBuilder();
              int count = 0;
              builder.Append("Create View Vw_CompanyLicencePeriod  as ");
              foreach(var li in List){
                  if (count == 0)
                  {
                      builder.Append("Select " + li.companyID + " as companyID," + "'" + li.COMPANY + "'" + " as COMPANY," + "'" +
                         li.LicenceType + "'" + " as LicenceType ," + "'" + li.FromDate + "'" + " as FromDate," + "'" + li.ToDate + "'" + " as ToDate," + "'" + li.Licenceusers + "'" + " as Licenceusers");
                  }
                  else {

                      builder.Append("  Union  Select " + li.companyID + " as companyID," + "'" + li.COMPANY + "'" + " as COMPANY," + "'" +
                         li.LicenceType + "'" + " as LicenceType ," + "'" + li.FromDate + "'" + " as FromDate," + "'" + li.ToDate + "'" + " as ToDate," + "'" + li.Licenceusers + "'" + " as Licenceusers");
                  
                  }
                  count++;
                }

              string viewsdet = builder.ToString();



              SqlConnection con = new SqlConnection(connStr);


              string query = viewsdet;

              SqlCommand cmd = new SqlCommand(query, con);
              try
              {
                  con.Open();
                  cmd.ExecuteNonQuery();
              }
              catch (SqlException e)
              {
                 
                 
              }
              finally
              {
                  con.Close();
              }

        }


        public void Dropview() {

            SqlConnection con = new SqlConnection(connStr);
            string query = "if exists (select * from sysobjects where name='Vw_CompanyLicencePeriod' and type='V') Begin Drop view Vw_CompanyLicencePeriod End";

            SqlCommand cmd = new SqlCommand(query, con);
            try
            {
                con.Open();
                cmd.ExecuteNonQuery();
              
            }
            catch (SqlException e)
            {
               
            }
            finally
            {
                con.Close();
            }
        
        }

    }

     public  class CompanyLicencePeriod {

        public int companyID { get; set; }
        public string COMPANY { get; set; }
        public string LicenceType { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Licenceusers { get; set; }
    }

}
