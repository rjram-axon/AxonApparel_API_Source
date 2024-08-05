using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public class StockInwardMainRepository : IStockInwardMainRepository
    {
        PurchaseEntities entities = new PurchaseEntities();


        public IQueryable<Domain.UnitGrnMas> GetDataMainList(int? companyId, int? suppid, int? processid, string jobordNo, int? unitgrnmasid, string unitgrnno, int? fromunit, int? forunit, string recptcat, string fromDate, string todate,string Otype,string Utype)
        {
            var query = (from LADD in entities.Proc_Apparel_StockInwardLoadMainGrid(companyId, suppid, processid, jobordNo, unitgrnmasid, unitgrnno, fromunit, forunit, recptcat, fromDate, todate, Otype, Utype)
                         select new Domain.UnitGrnMas
                         {
                             Unit_GRN_date=(DateTime)LADD.Unit_GRN_date,
                             Unit_GRN_Masid=LADD.Unit_Grn_masid,
                             Companyid=(int)LADD.companyid,
                             company=LADD.Company,
                             fromunitnam=LADD.From_Unit,
                             forunitnam=LADD.for_Unit,
                             Unit_GRN_No=LADD.Unit_GRN_no,
                             Job_Ord_No=LADD.Job_ord_no,
                             orderno=LADD.Order_No,
                            refno=LADD.Ref_No,
                            Process=LADD.Process,
                            style=LADD.Style,
                            reference=LADD.Reference
                            
                         }).AsQueryable();

            return query;
        }
    }
}
