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
    public class PurchaseReturnMainRepository : IPurchaseReturnRepositoryMain
    {
        PurchaseEntities entities = new PurchaseEntities();

        public IQueryable<PurchaseReturn> GetDataPurRetRepDetails(string OrderNo, string RefNo, int? SupplierID, int? CompanyID, int? Return_ID, string Ordtype, string FrmDate, string ToDate)
        {

            string OType = "";

            if (Ordtype == "O")
            {
                OType = "B";
            }
            else
            {
                OType = Ordtype;
            }

            IQueryable<PurchaseReturn> query = (from a in entities.Proc_Apparel_GetPurchaseReturnLoadMain(string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, SupplierID == null ? 0 : SupplierID, CompanyID == null ? 0 : CompanyID, Return_ID == null ? 0 : Return_ID, OType, "O", FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                select new PurchaseReturn
                                               {
                                                   Company = a.Company,
                                                   Supplier = a.Supplier,
                                                   Return_no = a.Return_no,
                                                   Return_date = (DateTime)a.Return_date,
                                                   Return_ID = a.Return_id,
                                                   ReturnType = a.Returntype,


                                               }).AsQueryable();

            return query;
        }

        public IQueryable<PurchaseReturn> GetDataDropRepDetails(string Ordtype, string FrmDate, string ToDate)
        {

            string OrderNo = "";
            string RefNo = "";
            int SupplierID = 0;
            int CompanyID = 0;
            int Return_ID = 0;

            string OType = "";

            if (Ordtype == "O")
            {
                OType = "B";
            }
            else
            {
                OType = Ordtype;
            }


         

            IQueryable<PurchaseReturn> query = (from cd in entities.Proc_Apparel_GetPurchaseReturnLoadMain(string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, SupplierID == null ? 0 : SupplierID, CompanyID == null ? 0 : CompanyID, Return_ID == null ? 0 : Return_ID, OType, "O", FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                select new PurchaseReturn
                                                {


                                                    SupplierID = cd.pSupplierid,
                                                    Supplier = cd.Supplier,
                                                    Company = cd.Company,
                                                    CompanyID = cd.pCompanyid,
                                                    Return_no = cd.Return_no,
                                                    Return_ID = cd.Return_id,
                                                    OrderNo = cd.OrderNo,
                                                    RefNo = cd.RefNo,

                                                }).AsQueryable();
            return query;
        }
    }
}
