using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Data.SqlClient;
using System.Transactions;
using System.Data;
using System.Configuration;

namespace AxonApparel.Repository
{
    public class PurchaseOrderMainRepository:IPurchaseOrderMainRepository  
    {
        PurchaseEntities entities = new PurchaseEntities();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IQueryable<PurchaseOrder> GetDataPurMainRepDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string PurIndType, string IsApproved)
        {
            try
            {
                IQueryable<PurchaseOrder> query = (from a in entities.Proc_Apparel_GetPurchaseOrderLoadMain(string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, SupplierId == null ? 0 : SupplierId, companyid == null ? 0 : companyid, pur_ord_id == null ? 0 : pur_ord_id, StyleId == null ? 0 : StyleId, Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString(), LocalImport, PurIndType, IsApproved)
                                                   select new PurchaseOrder
                                                   {
                                                       company = a.Company,
                                                       Supplier = a.supplier,
                                                       pur_ord_no = a.pur_ord_no,
                                                       orddate = (DateTime)a.Orddate,
                                                       Reference = a.Reference,
                                                       LocalImport = a.POType,
                                                       pur_ord_id = a.pur_ord_id,
                                                       cancel = a.Cancel,
                                                       Style=a.Style,
                                                       StyleId=a.StyleId,
                                                       OrderNo=a.Order_no,
                                                       RefNo=a.Ref_no,
                                                       SupplierId=a.supplierid,
                                                       IsApproved=a.IsApproved,

                                                   }).AsQueryable();
                return query;
            }
            catch (Exception ex) {
                IQueryable<PurchaseOrder> query = (from a in entities.Proc_Apparel_GetPurchaseOrderLoadMain(string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, SupplierId == null ? 0 : SupplierId, companyid == null ? 0 : companyid, pur_ord_id == null ? 0 : pur_ord_id, StyleId == null ? 0 : StyleId, Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString(), LocalImport, PurIndType, IsApproved)
                                                   select new PurchaseOrder
                                                   {
                                                       company = a.Company,
                                                       Supplier = a.supplier,
                                                       pur_ord_no = a.pur_ord_no,
                                                       orddate = (DateTime)a.Orddate,
                                                       Reference = a.Reference,
                                                       LocalImport = a.POType,
                                                       pur_ord_id = a.pur_ord_id,
                                                       cancel = a.Cancel,

                                                   }).AsQueryable();
                return query;
            }
        }


        public IQueryable<PurchaseOrder> GetDataStyleRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurOrderLoadMainStyleDropDown(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                               select new PurchaseOrder
                                              {                                              
                                                  StyleId=cd.StyleId,
                                                  Style=cd.Style,

                                              }).AsQueryable();
            return query;
        }



        public IQueryable<PurchaseOrder> GetSuppdet(int Id)
        {
            IQueryable<PurchaseOrder> query = (from a in entities.Proc_Apparel_GetPOMailDet(Id)
                                               select new PurchaseOrder
                                               {
                                                   Supplier = a.Supplier,
                                                   SupplierEmail = a.E_Mail,
                                                   pur_ord_no = a.pur_ord_no,
                                               }).AsQueryable();

            return query;
        }

        public IList<PurchaseOrder> GetDataOrdeRefRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            //IList<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurOrderLoadMainOrdRefDropDown(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
            //                                   select new PurchaseOrder
            //                                   {
            //                                       OrderNo = cd.OrdNo,
            //                                       RefNo = cd.RefNo,                                               

            //                                   }).AsQueryable();
            //return query;

            List<Domain.PurchaseOrder> List = new List<Domain.PurchaseOrder>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPurOrderLoadMainOrdRefDropDown", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@LorIm", SqlDbType.Char, 1).Value = LocalImport;
                cmd.Parameters.Add("@OType", SqlDbType.Char, 1).Value = Purchase_Type;
                cmd.Parameters.Add("@PoType", SqlDbType.Char, 1).Value = Purchase_ItemType;
                cmd.Parameters.Add("@FromDate", SqlDbType.VarChar, 20).Value = FrmDate;
                cmd.Parameters.Add("@ToDate", SqlDbType.VarChar, 20).Value = ToDate;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PurchaseOrder obj = new Domain.PurchaseOrder();

                    obj.OrderNo = rdr["OrdNo"].ToString();
                    obj.RefNo = rdr["RefNo"].ToString();
                    obj.BMasId = Convert.ToInt32(rdr["Buy_Ord_MasId"]);
               
                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

                

        public IQueryable<PurchaseOrder> GetDataPOrderRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurOrderLoadMainPOrderDropDown(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                               select new PurchaseOrder
                                               {
                                                   pur_ord_no = cd.PoNo,
                                                   pur_ord_id = cd.PoId,

                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> GetPoNoTrack()
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Pur_Ord_Mas
                                               select new PurchaseOrder
                                               {
                                                   pur_ord_no = cd.pur_ord_no,
                                                   pur_ord_id = cd.pur_ord_id,

                                               }).AsQueryable();
            return query;
        }

        public IQueryable<PurchaseOrder> GetRecNoTrack()
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Pur_Grn_Mas
                                               select new PurchaseOrder
                                               {
                                                   pur_ord_no = cd.receipt_no,
                                                   pur_ord_id = cd.Grn_MasId,

                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> GetDataSupplierRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate)
        {
            IQueryable<PurchaseOrder> query = (from cd in entities.Proc_Apparel_GetPurOrderLoadMainSuppDropDown(LocalImport, Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString())
                                               select new PurchaseOrder
                                               {
                                                   Supplier = cd.supplier,
                                                   SupplierId = cd.SuppId,

                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> GetDataPurMainAppDetails(string OrderNo, string RefNo, int? SupplierId, int? companyid, int? pur_ord_id, int? StyleId, string LocalImport, string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate, string Type, int ToApprove)
        {
            IQueryable<PurchaseOrder> query = (from a in entities.Proc_Apparel_GetPurOrderAppLoadMain(Type, string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, SupplierId == null ? 0 : SupplierId, companyid == null ? 0 : companyid, pur_ord_id == null ? 0 : pur_ord_id, StyleId == null ? 0 : StyleId, Purchase_Type, Purchase_ItemType, FrmDate == null ? "" : FrmDate.ToString(), ToDate == null ? "" : ToDate.ToString(), LocalImport, ToApprove == null ? 0 : ToApprove)
                                               select new PurchaseOrder
                                               {
                                                   company = a.Company,
                                                   Supplier = a.supplier,
                                                   pur_ord_no = a.pur_ord_no,
                                                   orddate = (DateTime)a.Orddate,
                                                   Reference = a.Reference,
                                                   LocalImport = a.POType,
                                                   pur_ord_id = a.pur_ord_id,
                                                   cancel = a.Cancel,

                                               }).AsQueryable();
            return query;
        }


        public IQueryable<PurchaseOrder> LoadMainOrderdet(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_PurOrdLoadMaindet(pid)
                         select new PurchaseOrder
                         {

                            OrderNo=YD.order_no,
                            RefNo=YD.ref_no,
                            Style=YD.style

                         }).AsQueryable();

            return query;
        }


        public IQueryable<PurchaseOrder> LoadPreOrderdet(int Itemid, int Sizeid, int Colorid)
        {
            var query = (from YD in entities.Proc_Apparel_PrePODetails(Itemid, Sizeid, Colorid)
                         select new PurchaseOrder
                         {
                             OrderNo = YD.order_no,
                             RefNo = YD.ref_no,
                             Style = YD.style,
                             Supplier=YD.Supplier,
                             PreRate=(decimal)YD.Rate,
                             pur_ord_no=YD.POno,
                             orddate=YD.PODate
                         }).AsQueryable();

            return query;
        }
    }
}
