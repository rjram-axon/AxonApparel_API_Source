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
    public class VendorRepository:IVendorRepository
    {
        PlanningEntities entities = new PlanningEntities();



        public IQueryable<Vendor> GetDataMainList(int? companyId, string orderNo, string RefNo, string EntryNo, int? SupId, string fromDate, string toDate, string OType)
        {
            IQueryable<Vendor> query = (from cd1 in entities.Proc_Apparel_GetVendorMainDetails(companyId == null ? 0 : companyId, string.IsNullOrEmpty(orderNo) ? "" : orderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(EntryNo) ? "" : EntryNo, SupId == null ? 0 : SupId, fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString(), OType)
                                       select new Vendor
                                          {

                                           
                                              Quoteid=cd1.Quoteid,
                                              QuoteNo=cd1.QuoteNo,
                                              EntryNo=cd1.EntryNo,
                                              EntryDate=(DateTime)cd1.Entrydate,
                                              QuoteDate=(DateTime)cd1.QuoteDate,
                                              Supplier=cd1.supplier,
                                              BuyOrdGeneral=cd1.BuyOrdGeneral,
                                             
                                              


                                          }).AsQueryable();
            return query;
        }


        public IQueryable<VendorQuoteMas> GetDataList()
        {
            return entities.VendorQuoteMas.OrderBy(c => c.EntryNo);
        }


        public bool DeleteData(int Id)
        {
            var result = false;
            var Det = entities.VendorQuoteDet.Where(u => u.Quoteid == Id);

            foreach (var u in Det)
            {
                entities.VendorQuoteDet.Remove(u);
            }


            var Mas = entities.VendorQuoteMas.Where(c => c.Quoteid == Id).FirstOrDefault();
            if (Mas != null)
            {
                entities.VendorQuoteMas.Remove(Mas);
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
    }
}
