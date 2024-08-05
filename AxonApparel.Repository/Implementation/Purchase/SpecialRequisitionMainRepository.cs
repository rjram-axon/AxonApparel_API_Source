using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public class SpecialRequisitionMainRepository:ISpecialRequisitionMainRepository
    {
       PurchaseEntities entities = new PurchaseEntities();

       public IQueryable<Domain.SpecialReqMas> GetDataMainList(int? companyId, string type, string orderno, string refno, string jobordno, int? reqid, string reqno, int? styleid, int? unitid, string unitrother, string fromDate, string todate)
       {
           var query = (from LADD in entities.proc_Special_reqMainGrid(companyId, type, orderno, refno, jobordno, reqid, reqno, styleid, unitid, unitrother, fromDate, todate)
                        select new Domain.SpecialReqMas
                        {
                           Spl_Reqid=LADD.Spl_Reqid,
                           Spl_Req_Date=(DateTime)LADD.Spl_Req_Date,
                           Spl_Req_No=LADD.Spl_Req_No,
                           Job_Ord_No=LADD.Job_Ord_No,
                           orderno=LADD.order_no,
                           OrderType=LADD.Order_Type,
                           Unit_Or_Other=LADD.Unit_Or_Other,
                           Companyid=(int)LADD.Companyid,
                           CompanyUnitid=(int)LADD.CompanyUnitId,
                           company=LADD.company,
                           unit=LADD.unit,
                           unitid=LADD.unit_id,
                           style=LADD.style,
                           styleid=LADD.styleid,
                           Ref_Date=(DateTime)LADD.Ref_Date,
                           Ref_No=LADD.Ref_No,
                           Type=LADD.Type,
                           Auto_Manual=LADD.Auto_Manual,
                           jmasid=LADD.JMasId,
                           bmasid=LADD.BMasId,
                           Req_Remarks=LADD.Req_Remarks,
                           App_By=(int)LADD.App_By,
                           App_Date = (DateTime)LADD.App_Date,
                           Employeeid = (int)LADD.Employeeid
                        }).AsQueryable();

           return query;
       }
    }
}
