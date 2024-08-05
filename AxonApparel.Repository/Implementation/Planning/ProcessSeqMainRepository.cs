using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public class ProcessSeqMainRepository:IProcessSeqMainRepository
    {
        PlanningEntities entities = new PlanningEntities();


        public IQueryable<ProcessSequenceMain> GetAddDataMainList(int? CompanyId, int? BuyerId, string Order_No, string Ref_No, string FDate, string ToDate, string OrdType)
        {
            IQueryable<ProcessSequenceMain> query = (from cd in entities.Proc_Apparel_GetProcessSeqList(CompanyId == null ? 0 : CompanyId, BuyerId == null ? 0 : BuyerId, string.IsNullOrEmpty(Order_No) ? "" : Order_No, string.IsNullOrEmpty(Ref_No) ? "" : Ref_No, FDate == null ? "" : FDate.ToString(), ToDate == null ? "" : ToDate.ToString(), OrdType)
                                                     select new ProcessSequenceMain
                                                     {
                                                         Order_No = cd.OrdNo,
                                                         BuyerId = (int)cd.BuyerId,
                                                         BuyerName = cd.buyer,
                                                         Ref_No = cd.RefNo,
                                                         JobNo = cd.JobNo,
                                                         MerchandiserId = (int)cd.Merchandiserid,
                                                         MerchandiserName = cd.Merchandiser,
                                                         OrdType = cd.orderType,
                                                         Stylerowid = (int)cd.StyRowId,
                                                        


                                                     })
                                                     //.ToList();
                                                     .AsQueryable();
            return query;
        }
        public IQueryable<ProcessSequenceMain> GetDataOrderRepDetails(string fromDate, string toDate)
        {
            IQueryable<ProcessSequenceMain> query = (from cd in entities.Proc_Apparel_GetPlanningProcSeqAddDropdownDetails(fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString())
                                                     select new ProcessSequenceMain
                                                     {

                                                         Order_No = cd.OrdNo,
                                                         Ref_No = cd.RefNo,
                                                         Style = cd.Style,
                                                         Styleid = cd.StyId,
                                                         BuyerName = cd.buyer,
                                                         BuyerId = (int)cd.BuyerId,
                                                         JobNo = cd.JobNo,
                                                         CompanyId = (int)cd.CompId,
                                                         CompanyName = cd.Company,                                                     

                                                     }).AsQueryable();
            return query;
        }

       
    }
}
