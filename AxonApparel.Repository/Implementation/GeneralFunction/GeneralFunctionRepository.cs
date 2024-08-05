using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Data.Objects;
using AxonApparel.Domain;
using System.Configuration;
namespace AxonApparel.Repository
{
    public class GeneralFunctionRepository : IGeneralFunctionRepository
    {

        public class TableList
        {
            public string TableName { get; set; }
            public string ColumnName { get; set; }
        }

        HouseKeepingEntities Finyearentities = new HouseKeepingEntities();
        HouseKeepingEntities Prefixentities = new HouseKeepingEntities();
        

        public IQueryable<Finyear> GetDataListFinyear()
        {
            return Finyearentities.Finyear.OrderBy(c => c.Finyear1);
        }

        public IQueryable<MisPathCompany> GetDataListCompany()
        {
            return Finyearentities.Company.Where(c => c.Prefix == "AXN");
        }

        //public IQueryable<Prefix> GetDataListDocPrefix()
        //{
        //    return Prefixentities.Prefixes.OrderBy(c => c.Prefix1);
        //}

        public Finyear GetDataByIdFinyear()
        {
            return Finyearentities.Finyear.Where(c => 1 == 1).FirstOrDefault();
        }

        public MisPathCompany GetDataByIdCompany()
        {
            return Prefixentities.Company.Where(c => 1 == 1).FirstOrDefault();
        }

        public string GenerateNumber(string tblname, string ColName, int CompanyID, string Doc)
        {

            string strNumSeq = "";
            string Finyearcode = "";
            string strcompPrefix = "";
            string strDocPrefix = "";
            string Ycode = "";
            string MisFinyear = "";

            var App1 = Finyearentities.MisPath.Where(c => 1 == 1).FirstOrDefault();

            if (App1 != null)
            {
                MisFinyear = App1.FINYEAR;
            }
            //finyear table Description column and MisPath table FINYEAR column should be equal

            var App = Finyearentities.Finyear.Where(c => c.Description == MisFinyear).FirstOrDefault();

            if (App != null)
            {
                Finyearcode = App.YearCode;
            }


            var DocPre = Prefixentities.Prefix.Where(c => c.Document_Name == Doc).FirstOrDefault();

            if (DocPre != null)
            {
                strDocPrefix = DocPre.Prefix1;
            }


            var Code = Prefixentities.Company.Where(c => c.CompanyId == CompanyID).FirstOrDefault();

            if (Code != null)
            {
                strcompPrefix = Code.Prefix;
            }

            var YearNumber = Prefixentities.MisPath.Where(c => 1 == 1).FirstOrDefault();

            if (YearNumber != null)
            {
                Ycode = YearNumber.ASSTYEAR;               
            }

            var result = this.Prefixentities.Database.SqlQuery<string>("exec Proc_Apparel_Front {0}, {1}, {2}, {3}, {4},{5}", tblname, ColName, strcompPrefix, Finyearcode, strDocPrefix, Ycode).FirstOrDefault();

            var result1 = this.Prefixentities.Database.SqlQuery<int>("exec Proc_Apparel_Back {0}, {1}, {2}, {3}, {4},{5}", tblname, ColName, strcompPrefix, Finyearcode, strDocPrefix, Ycode).FirstOrDefault();


            if (result != null)
            {
                string N;
                N = String.Format("{0:00000}", Convert.ToInt32(result1.ToString()));
                strNumSeq = result + N;
            }
            else
            {
                //strNumSeq = strcompPrefix + Finyearcode + strDocPrefix + "00001";
                strNumSeq = strcompPrefix + Finyearcode + strDocPrefix + Ycode + '-' + "00001";
            }

            return strNumSeq;
        }

        public string GenerateShipNo(string tblname, string ColName, string YCode)
        {
            string strShipNoSeq = "";
            string Finyearcode = "";
            string MisFinyear = "";

            var App1 = Finyearentities.MisPath.Where(c => 1 == 1).FirstOrDefault();

            if (App1 != null)
            {
                MisFinyear = App1.FINYEAR;
            }

            var App = Finyearentities.Finyear.Where(c => c.Description == MisFinyear).FirstOrDefault();

            if (App != null)
            {
                Finyearcode = App.YearCode;
            }

            var result = this.Prefixentities.Database.SqlQuery<int>("exec Proc_Apparel_ShipNoGen {0}, {1}, {2} ", tblname, ColName, Finyearcode).FirstOrDefault();

            if (result != 0)
            {
                string N;
                N = String.Format("{0:00000}", Convert.ToInt32(result.ToString()));
                strShipNoSeq = "SH" + Finyearcode + N;
            }
            else
            {
                strShipNoSeq = "SH" + Finyearcode + "00001";
            }

            return strShipNoSeq;
        }
        public IQueryable<Domain.ReportOption> GenerateReportItem(string doctitle)
        {
            int setupid = 0;
            var DocPre = Prefixentities.Report_Footer_Setup.Where(c => c.Doc_Title == doctitle).FirstOrDefault();

            if (DocPre != null)
            {
                setupid = DocPre.Rpt_Setupid;
            }
            var query = (from YD in Prefixentities.Proc_Apparel_GetReportOptions(setupid)
                         select new ReportOption
                         {
                             optionid = YD.optionid,
                             option = YD.option_name,
                             optionvalue = (bool)YD.option_value


                         }).AsQueryable();

            return query;
        }

    }
}
