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
    public class LotSplitUpMainRepository:ILotSplitUpMainRepository
    {
        PurchaseEntities entities = new PurchaseEntities();

        public IQueryable<LotSplitUp> GetDataLotMainRepDetails(int? Companyid, int? SupplierId, string TransNo, string EntryNo, string MLotNo, string FromDate, string ToDate)
        {
            IQueryable<LotSplitUp> query = (from a in entities.Proc_Apparel_GetLotLoadMainDetails(Companyid == null ? 0 : Companyid, SupplierId == null ? 0 : SupplierId, string.IsNullOrEmpty(TransNo) ? "" : TransNo, string.IsNullOrEmpty(EntryNo) ? "" : EntryNo, string.IsNullOrEmpty(MLotNo) ? "" : MLotNo, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                            select new LotSplitUp
                                                {
                                                    EntryNo = a.Entryno,
                                                    LotSplitMasId = a.LotSplitMasId,
                                                    RefNo = a.RefNo,
                                                    TransNo = a.TransNo,
                                                    EntryDate = (DateTime)a.entrydate,
                                                    Supplier = a.Supplier,
                                                   


                                                }).AsQueryable();

            return query;
        }


        public IQueryable<LotSplitUp> GetDataOrderRepDetails(string FrmDate, string ToDate)
        {
            int CompanyId = 0;
            int SupplierId = 0;
            string TransNo = "";
            string EntryNo = "";
            string MLotNo = "";

            IQueryable<LotSplitUp> query = (from a in entities.Proc_Apparel_GetLotLoadMainDetails(CompanyId, SupplierId, string.IsNullOrEmpty(TransNo) ? "" : TransNo, string.IsNullOrEmpty(EntryNo) ? "" : EntryNo, string.IsNullOrEmpty(MLotNo) ? "" : MLotNo, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                            select new LotSplitUp
                                            {
                                                EntryNo = a.Entryno,
                                                LotSplitMasId = a.LotSplitMasId,
                                                RefNo = a.RefNo,
                                                TransNo = a.TransNo,                                               
                                                Supplier = a.Supplier,
                                                SupplierId=a.SupplierId,
                                                Company=a.Company,
                                                Companyid=(int)a.Companyid,



                                            }).AsQueryable();

            return query;
        }
    }
}
