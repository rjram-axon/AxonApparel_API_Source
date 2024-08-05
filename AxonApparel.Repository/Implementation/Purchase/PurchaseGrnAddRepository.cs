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
using System.Data;
using System.Configuration;

namespace AxonApparel.Repository
{
    public class PurchaseGrnAddRepository:IPurchaseGrnAddRepository
    {
        PurchaseEntities entities = new PurchaseEntities();
        string PType = "";

        string connStr = ConfigurationManager.ConnectionStrings["AxonApparelConnectionString"].ConnectionString;

        public IList<PurchaseGrnMas> GetDataGrnOrderRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType, string OrderNo, string RefNo, int? SupplierId, int? companyid, string PurIndType)
        {
            if (Purchase_ItemType == "L")
            {
                PType = "";
            }
            else
            {
                PType = Purchase_ItemType;
            }

            var query = (from YD in entities.Proc_Apparel_GetPurchaseGrnAddLoadDetails(LocalImport, Purchase_Type, PType, string.IsNullOrEmpty(OrderNo) ? "" : OrderNo, string.IsNullOrEmpty(RefNo) ? "" : RefNo, SupplierId == null ? 0 : SupplierId, companyid == null ? 0 : companyid, PurIndType)
                         select new PurchaseGrnMas
                         {
                             //OrderNo = YD.Order_No,
                             //RefNo = YD.ref_no,
                             PurOrdNo = YD.pur_ord_no,
                             pur_type = YD.Purchase_Type,
                             PurOrdId = YD.pur_ord_id,
                             OrdDate = (DateTime)YD.orddate,
                             Amount = YD.Amount,
                             companyid = YD.companyid,
                             supplierid = YD.SupplierId,
                             Supplier = YD.Supplier,
                             IsApproved=YD.IsApproved
                         }).AsQueryable();

            return query.ToList();
        }

        public IEnumerable<Domain.PurchaseGrnMas> GetDataGrnOrderRepDetails_Barcode(string LocalImport, string Purchase_Type, string Purchase_ItemType, string OrderNo, string RefNo, int? SupplierId, int? companyid, string PurIndType)
        {
            //return entities.Employee.OrderBy(e => e.Employee1);

            List<Domain.PurchaseGrnMas> lstPurGrn = new List<Domain.PurchaseGrnMas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPurchaseGrnAddLoadDetails", con);  //Proc_Apparel_GetPurchaseGrnAddLoadDetails_Barcode
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@LorIm", SqlDbType.Char).Value = LocalImport;
                cmd.Parameters.Add("@OType", SqlDbType.Char).Value = Purchase_Type;
                cmd.Parameters.Add("@PIType", SqlDbType.Char).Value = Purchase_ItemType;
                cmd.Parameters.Add("@Ordno", SqlDbType.VarChar).Value = OrderNo;
                cmd.Parameters.Add("@Refno", SqlDbType.VarChar).Value = RefNo;
                cmd.Parameters.Add("@SuppId", SqlDbType.Int).Value = SupplierId;
                cmd.Parameters.Add("@CompId", SqlDbType.Int).Value = companyid;
                cmd.Parameters.Add("@PurIndType", SqlDbType.Char).Value = PurIndType;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PurchaseGrnMas PurGrn = new Domain.PurchaseGrnMas();
                    PurGrn.PurOrdNo = rdr["pur_ord_no"].ToString();
                    PurGrn.pur_type = rdr["Purchase_Type"].ToString();
                    PurGrn.PurOrdId = Convert.ToInt32(rdr["pur_ord_id"]);
                    PurGrn.OrdDate = Convert.ToDateTime(rdr["orddate"]);
                    PurGrn.Amount = Convert.ToDecimal(rdr["Amount"]);
                    PurGrn.companyid = Convert.ToInt32(rdr["companyid"]);
                    PurGrn.supplierid = Convert.ToInt32(rdr["SupplierId"]);
                    PurGrn.Supplier = rdr["Supplier"].ToString();
                    PurGrn.IsApproved = rdr["IsApproved"].ToString();

                    lstPurGrn.Add(PurGrn);
                }
                con.Close();
            }
            return lstPurGrn;
        }

        public IQueryable<PurchaseGrnMas> GetDataGrnOrderDropRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType)
        {
            IQueryable<PurchaseGrnMas> query = (from cd1 in entities.Proc_Apparel_GetPurchaseGrnAddOrdDropDown(LocalImport, Purchase_Type, Purchase_ItemType)
                                                select new PurchaseGrnMas
                                               {

                                                  OrderNo= cd1.order_no,                           

                                               }).AsQueryable();
            return query;
        }
        public IQueryable<PurchaseGrnMas> GetDataGrnRefDropRepDetails(string LocalImport, string Purchase_Type, string Purchase_ItemType)
        {
            IQueryable<PurchaseGrnMas> query = (from cd in entities.Proc_Apparel_GetPurchaseGrnAddRefDropDown(LocalImport, Purchase_Type, Purchase_ItemType)
                                                select new PurchaseGrnMas
                                                {
                                                                                               
                                                    RefNo = cd.ref_no,                                                  

                                                }).AsQueryable();
            return query;
        }
        public IQueryable<PurchaseGrnMas> LoadMainOrderdet(int pid)
        {
            var query = (from YD in entities.Proc_Apparel_PurRecptAddLoadOrddet(pid)
                         select new PurchaseGrnMas
                         {

                             OrderNo = YD.order_no,
                             RefNo = YD.ref_no,
                             style = YD.style

                         }).AsQueryable();

            return query;
        }
    }
}
