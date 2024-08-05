using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;

namespace AxonApparel.Repository
{
    public class StockAuditMainRepository:IStockAuditMainRepository
    {
        PurchaseEntities entities = new PurchaseEntities();

        public IQueryable<StockAudit> GetDataPurAudRepDetails(int? Companyid, int? Audit_MasId, string FDate, string TDate)
        {
            IQueryable<StockAudit> query = (from a in entities.Proc_Apparel_GetPurchaseAuditLoadMain(Companyid == null ? 0 : Companyid, Audit_MasId == null ? 0 : Audit_MasId, FDate == null ? "" : FDate.ToString(), TDate == null ? "" : TDate.ToString())
                                            select new StockAudit
                                                {
                                                    Company = a.Company,
                                                    Audit_MasId = a.Audit_MasId,
                                                    Companyid = a.CompanyId,
                                                    Entry_Date = (DateTime)a.Entry_Date,
                                                    Entry_No = a.Entry_No,
                                                    
                                                }).AsQueryable();

            return query;
        }


        public IQueryable<StockAudit> GetDataDropAMRepDetails(string FDate, string TDate)
        {
         
            int Companyid = 0;
            int Audit_MasId = 0;
            IQueryable<StockAudit> query = (from cd1 in entities.Proc_Apparel_GetPurchaseAuditLoadMain(Companyid == null ? 0 : Companyid, Audit_MasId == null ? 0 : Audit_MasId, FDate == null ? "" : FDate.ToString(), TDate == null ? "" : TDate.ToString())
                                            select new StockAudit
                                                {                                                    
                                                    Entry_No = cd1.Entry_No,
                                                    Audit_MasId = cd1.Audit_MasId,                                            
                                                    

                                                }).AsQueryable();
            return query;
        }
    }
}
