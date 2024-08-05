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
    public class LotSplitUpAddRepository : ILotSplitUpAddRepository
    {

        PurchaseEntities entities = new PurchaseEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IList<LotSplitUp> GetDataLotRepDetails(string OrderType, string StockType, int? SupplierId, int? Companyid, string TransNo, int? ProcessId)
        {


            var query = (from LADD in entities.Proc_Apparel_GetLotSplitter_ADDLIST(OrderType, StockType, SupplierId == null ? 0 : SupplierId, Companyid == null ? 0 : Companyid, string.IsNullOrEmpty(TransNo) ? "" : TransNo, ProcessId == null ? 0 : ProcessId)
                         select new LotSplitUp
                         {
                             Company = LADD.Company,
                             Companyid = LADD.Companyid,
                             TransNo = LADD.TransNo,
                             Supplier = LADD.Supplier,
                             SupplierId = LADD.SupplierId,
                             EntryDate = (DateTime)LADD.TransDate,
                             Quantity = (decimal)LADD.StockQty,
                         }).AsQueryable();

            return query.ToList();
        }



        public IQueryable<LotSplitUp> GetDataLotDropRepDetails(string OrderType, string StockType)
        {
            int CompId = 0;
            int SuppId = 0;
            int Processid = 0;
            string TransNo = "";
            IQueryable<LotSplitUp> query = (from cd1 in entities.Proc_Apparel_GetLotSplit_ADDLISTcompany(OrderType, StockType, SuppId, CompId, TransNo, Processid)
                                            select new LotSplitUp
                                            {

                                                Companyid = cd1.CompanyId,
                                                Company = cd1.Company,
                                                //TransNo = cd1.TransNo,
                                                //SupplierId = cd1.SupplierId,
                                                //Supplier = cd1.Supplier,
                                                //Process = cd1.Process,
                                                //ProcessId = cd1.ProcessId,

                                            }).AsQueryable();
            return query;
        }
        public IQueryable<LotSplitUp> GetDataLotDropSuppRepDetails(string OrderType, string StockType)
        {
            int CompId = 0;
            int SuppId = 0;
            int Processid = 0;
            string TransNo = "";
            IQueryable<LotSplitUp> query = (from cd1 in entities.Proc_Apparel_GetLotSplit_ADDLISTSupplier(OrderType, StockType, SuppId, CompId, TransNo, Processid)
                                            select new LotSplitUp
                                            {                                                                                               
                                                SupplierId = cd1.SupplierId,
                                                Supplier = cd1.Supplier,                                            

                                            }).AsQueryable();
            return query;
        }
        public IQueryable<LotSplitUp> GetDataLotDropTransNoRepDetails(string OrderType, string StockType)
        {
            int CompId = 0;
            int SuppId = 0;
            int Processid = 0;
            string TransNo = "";
            IQueryable<LotSplitUp> query = (from cd1 in entities.Proc_Apparel_GetLotSplit_ADDLISTEntryNo(OrderType, StockType, SuppId, CompId, TransNo, Processid)
                                            select new LotSplitUp
                                            {
                                                TransNo = cd1.TransNo,
                                                Companyid = cd1.CompanyId,

                                            }).AsQueryable();
            return query;
        }
    }
}
