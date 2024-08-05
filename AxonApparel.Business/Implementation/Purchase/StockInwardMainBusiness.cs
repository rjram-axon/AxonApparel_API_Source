using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class StockInwardMainBusiness:IStockInwardMainBusiness
    {
        IStockInwardMainRepository stkRep = new StockInwardMainRepository();


        public Common.Response<IQueryable<Domain.UnitGrnMas>> GetDataMainList(int? companyId, int? suppid, int? processid, string jobordNo, int? unitgrnmasid, string unitgrnno, int? fromunit, int? forunit, string recptcat, string fromDate, string todate,string Otype,string Utype)
        {
            try
            {
                var CurDetList = stkRep.GetDataMainList(companyId, suppid, processid, jobordNo, unitgrnmasid, unitgrnno, fromunit, forunit, recptcat, fromDate, todate, Otype, Utype);

                return new Response<IQueryable<Domain.UnitGrnMas>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.UnitGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
