using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
namespace AxonApparel.Business
{
    public interface IGeneralFunctionBusiness
    {
 
        //Response<IQueryable<FinYear>> GetFinyear();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Finyear"></param>
        /// <returns></returns>

        //Response<IQueryable<Cprefix>> GetCompPrefix();

        //Response<IQueryable<Fprefix>> GetDocPrefix();

        Response<string> GenerateNumberBuss(string tblname, string ColName, int CompanyID, string Doc);


        Response<string> GenerateShipNoBuss(string tblname, string ColName, string YCode);
        Response<IQueryable<Domain.ReportOption>> GenerateReportItem(string doctitle);

        
    }
}
