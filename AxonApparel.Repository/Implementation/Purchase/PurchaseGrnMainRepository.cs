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
    public class PurchaseGrnMainRepository : IPurchaseGrnMainRepository
    {

        PurchaseEntities entities = new PurchaseEntities();

        public IQueryable<PurchaseGrnMas> GetDataOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseGrnMas> query = (from cd in entities.Proc_Apparel_GetPurchaseGrnLoadMainOrdRefDropDown(Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                select new PurchaseGrnMas
                                               {

                                                   OrderNo = cd.Order_no,
                                                   RefNo = cd.Ref_no,
                                                   //PurOrdNo = cd.pur_ord_no,
                                                   //PurOrdId = cd.pur_ord_id,
                                                   //receipt_no = cd.receipt_no,
                                                   //Grn_MasId = cd.grn_masid,
                                                   //Supplier = cd.Supplier,
                                                   //supplierid = cd.supplierid,
                                                   //Dc_no = cd.dc_no,                                             

                                               }).AsQueryable();
            return query;
        }

        public int GetPurid(int grnid)
        {
            var getdata = (from grnmas in entities.Pur_Grn_Mas
                           join grndet in entities.Pur_Grn_Det on grnmas.Grn_MasId equals grndet.Grn_MasId
                           join grnord in entities.Pur_Grn_Order on grndet.Grn_DetId equals grnord.grn_detid
                           join purorddet in entities.Pur_Ord_Det on grnord.pur_ord_detid equals purorddet.Pur_Ord_DetId
                           //join grndet in entities.Pur_Grn_Det on grnmas.Grn_MasId equals grndet.Grn_MasId
                           where grnmas.Grn_MasId == grnid
                           select new
                           {
                               purorddet.Pur_ord_id
                           }).FirstOrDefault();

            return (getdata.Pur_ord_id == 0 ? 0 : getdata.Pur_ord_id);
        }

        public IQueryable<PurchaseGrnMas> GetDataPurGrnMainRepDetails(string OrderNo, string RefNo, string Dc_no, int? supplierid, int? companyid, int? PurOrdId, int? Grn_MasId, string pur_type, string Pur_ItemType, string FromDate, string ToDate,string PurIndType)
        {


            try
            {

                IQueryable<PurchaseGrnMas> query = (from a in entities.Proc_Apparel_GetPurchaseGRNLoadMain(string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, string.IsNullOrEmpty(Dc_no) ? "" : Dc_no, supplierid == null ? 0 : supplierid, companyid == null ? 0 : companyid, PurOrdId == null ? 0 : PurOrdId, Grn_MasId == null ? 0 : Grn_MasId, pur_type, Pur_ItemType, FromDate == null ? "" : FromDate.ToString(), ToDate == null ? "" : ToDate.ToString(), PurIndType)
                                                select new PurchaseGrnMas
                                               {
                                                   Company = a.Company,
                                                   Supplier = a.supplier,
                                                   supplierid=a.supplierid,
                                                   companyid=a.companyid,
                                                   receipt_no = a.receipt_no,
                                                   receipt_date = (DateTime)a.receipt_date,
                                                   Pur_ItemType = a.ItemType,
                                                   Grn_MasId = a.grn_masid,
                                                   Qlty_No = a.qltyno,
                                                   Dc_no=a.dc_no,
                                                   ChkAccPos=(int)a.ChkAccPs,
                                                   OrderNo=a.order_no,
                                                   RefNo=a.Ref_no,
                                                   PurOrdId=a.pur_ord_id,
                                                   PurOrdNo=a.pur_ord_no
                                               }).AsQueryable();

            return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IQueryable<PurchaseGrnMas> GetDataPoOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseGrnMas> query = (from cd in entities.Proc_Apparel_GetPurchaseGrnLoadMainPoDropDown(Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                select new PurchaseGrnMas
                                                {

                                                    //OrderNo = cd.Order_no,
                                                    //RefNo = cd.Ref_no,
                                                    PurOrdNo = cd.pur_ord_no,
                                                    PurOrdId = cd.pur_ord_id,
                                                    //receipt_no = cd.receipt_no,
                                                    //Grn_MasId = cd.grn_masid,
                                                    //Supplier = cd.Supplier,
                                                    //supplierid = cd.supplierid,
                                                    //Dc_no = cd.dc_no,

                                                }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseGrnMas> GetDataSuppOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseGrnMas> query = (from cd in entities.Proc_Apparel_GetPurchaseGrnLoadMainSuppDropDown(Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                select new PurchaseGrnMas
                                                {

                                                    Supplier = cd.Supplier,
                                                    supplierid = cd.Supplierid,                                         

                                                }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseGrnMas> GetDataDcOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseGrnMas> query = (from cd in entities.Proc_Apparel_GetPurchaseGrnLoadMainDcDropDown(Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                select new PurchaseGrnMas
                                                {

                                                    Grn_MasId = cd.grnmasid,
                                                    Dc_no = cd.Dcno,

                                                }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseGrnMas> GetDataGrnOrderRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseGrnMas> query = (from cd in entities.Proc_Apparel_GetPurchaseGrnLoadMainRecptDropDown(Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                                select new PurchaseGrnMas
                                                {

                                                    Grn_MasId = cd.grnmasid,
                                                    receipt_no = cd.Recptno,

                                                }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseGrnMas> LoadMainOrderdet(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_PurGrnLoadMaindet(pid)
                         select new PurchaseGrnMas
                         {

                             OrderNo = YD.order_no,
                             RefNo = YD.ref_no,
                             style = YD.style

                         }).AsQueryable();

            return query;
        }


        public IQueryable<PurchaseGrnMas> LoadMainOrderStkdet(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_PurGrnLoadMainStkdet(pid)
                         select new PurchaseGrnMas
                         {

                            transno=YD.TransNo

                         }).AsQueryable();

            return query;
        }

        public IQueryable<PurchaseGrnMas> LoadItemstockMovement(string GrnNo)
        {
            var query = (from YD in entities.Proc_GetItemMovement(GrnNo)
                         select new PurchaseGrnMas
                         {
                             transno = YD.TransNo,
                             Item = YD.Item,
                             Color = YD.Color,
                             Size = YD.Size,
                             Quantity = YD.Qty,
                             StockQty = (decimal)YD.BalQty,
                             Uom = YD.Abbreviation,
                             IssueNo = YD.IssueNo,
                             IssueDate = YD.IssueDate,
                             IssueQty = YD.IssueQty,
                             StoreName = YD.StoreName

                         }).AsQueryable();

            return query;
        }
        public IQueryable<PurchaseGrnMas> GetDataStkGrnOrderRepDetails()
        {
            var query = (from YD in entities.Proc_Apparel_StockLedgerReportGrnNo()
                         select new PurchaseGrnMas
                         {

                             transno = YD.Transno,
                             OrderNo = YD.OrderNo,
                             RefNo = YD.RefNo,

                         }).AsQueryable();

            return query;
        }
    }
}
