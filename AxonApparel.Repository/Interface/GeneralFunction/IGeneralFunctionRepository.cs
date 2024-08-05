using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IGeneralFunctionRepository
    {
        //IQueryable<Finyear> GetDataListFinyear();
        //IQueryable<Company> GetDataListCompany();
        //IQueryable<Prefix> GetDataListDocPrefix();
        string GenerateNumber(string tblname, string ColName, int CompanyID, string Doc);
        string GenerateShipNo(string tblname, string ColName,string YCode);
        IQueryable<Domain.ReportOption> GenerateReportItem(string doctitle);
    }

}
