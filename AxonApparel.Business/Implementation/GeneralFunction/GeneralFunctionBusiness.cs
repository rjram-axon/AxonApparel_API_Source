using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;
namespace AxonApparel.Business
{
    public class GeneralFunctionBusiness : IGeneralFunctionBusiness
    {
        IGeneralFunctionRepository FinRep = new GeneralFunctionRepository();
        IGeneralFunctionRepository ComRep = new GeneralFunctionRepository();
        IGeneralFunctionRepository PreRep = new GeneralFunctionRepository();

        //ICompanyRepository ComRep = new CompanyRepository();

        public Common.Response<string> GenerateNumberBuss(string tblname, string ColName, int CompanyID, string Doc)
        {
            try
            {                
                string strNumSeq="";
                strNumSeq=FinRep.GenerateNumber(tblname,ColName,CompanyID,Doc);

                return new Response<string>(strNumSeq, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<string>("", Status.ERROR, "OOPS error occured. Plase try again");
            }            
        }

        public Common.Response<string> GenerateShipNoBuss(string tblname, string ColName, string YCode)
        {
            try
            {
                string strShipNoSeq = "";
                strShipNoSeq = FinRep.GenerateShipNo(tblname, ColName, YCode);
                return new Response<string>(strShipNoSeq, Status.SUCCESS, "Fetched Successfully");
            }
            catch(Exception)
            {
                return new Response<string>("", Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

      

        //public Response<FinYear> GetDataById()
        //{
        //    try
        //    {

        //        //YearCode
        //        var FinYList = FinRep.GetDataById();

        //        return new Response<Domain.FinYear>(new Domain.FinYear
        //        {
        //            YearCode = FinYList.YearCode,
        //            Type = FinYList.Type,
        //        }, Status.SUCCESS, "Fetched Successfully");

        //        //CompPrefix
        //        //var ComList = ComRep.GetDataById();

        //        //return new Response<Domain.FinYear>(new Domain.FinYear
        //        //{
        //        //    Prefix = ComList,
        //        //}, Status.SUCCESS, "Fetched Successfully");

        //    }
        //    catch
        //    {
        //        return new Response<Domain.FinYear>(null, Status.ERROR, "OOPS error occured. Plase try again");
        //    }

        //}

        //public Response<Cprefix> GetDataById()
        //{
        //    try
        //    {
        //        //Company Prefix
        //        var CompList = ComRep.GetDataById();

        //        return new Response<Domain.Cprefix>(new Domain.Cprefix
        //            {
        //                Prefix = CompList.Prefix,
        //            }, Status.SUCCESS, "Fetched Successfully");

        //    }
        //    catch
        //    {

        //    }
        //}

        public Response<IQueryable<ReportOption>> GenerateReportItem(string doctitle)
        {
            try
            {
                var ProductWO = PreRep.GenerateReportItem(doctitle);

                return new Response<IQueryable<Domain.ReportOption>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ReportOption>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


    }
}
